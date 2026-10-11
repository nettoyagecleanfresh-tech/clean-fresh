import { getGCalAccessToken, signManagementToken } from './gcal-server.js';
import { sendMailRaw } from './mailer.js';
import { euroCents, reservationAmounts, formatEuros } from './reservationSummary.js';

export type ServiceEvent = {
  id?: string; status?: string; summary?: string; description?: string; location?: string; created?: string;
  start?: { dateTime?: string; date?: string }; end?: { dateTime?: string };
  extendedProperties?: { private?: Record<string, string> };
};
const SITE = 'https://cleanetfresh.fr';
export const LIFECYCLE_START = '2026-10-09T01:15:00Z';
export const escapeHtml = (s: string) => s.replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]!));
export function eventClient(event: ServiceEvent) {
  const plain = (event.description ?? '').replace(/<br\s*\/?\s*>/gi, '\n').replace(/<\/p>/gi, '\n').replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&');
  const line = (label: string) => plain.match(new RegExp(`(?:^|\\n)[^\\n\\p{L}]*(?:${label})\\s*:\\s*([^\\n]+)`, 'iu'))?.[1]?.trim() ?? '';
  return { name: line('Client|Nom'), email: line('(?:E-?mail|Courriel)').toLowerCase(), phone: line('Téléphone'), address: event.location || line('Lieu|Adresse'), plain };
}
export function reminderDue(event: ServiceEvent, now: number) {
  const start = event.start?.dateTime;
  const until = Date.parse(start ?? '') - now;
  return !!start && until > 0 && until <= 86400000 && event.extendedProperties?.private?.cfReminderStart !== start;
}
export function brandedEmail(title: string, content: string) {
  return `<!doctype html><html lang="fr"><body style="margin:0;background:#eef4f9;font-family:Arial,sans-serif;color:#12364d"><table role="presentation" style="width:100%;max-width:600px;margin:24px auto;background:white;border-radius:16px"><tr><td style="padding:24px;background:#083b54"><img src="${SITE}/logo-email.png" width="140" alt="Clean&amp;Fresh Toulouse" style="display:block;background:white;padding:8px;border-radius:8px"></td></tr><tr><td style="padding:28px"><h1 style="font-size:23px">${escapeHtml(title)}</h1>${content}<p>Clean&amp;Fresh Toulouse<br><a href="tel:0767127500">07 67 12 75 00</a> · <a href="${SITE}">cleanetfresh.fr</a></p></td></tr></table></body></html>`;
}
// Dedicated review layout: do not alter reservation, reminder or deposit templates.
export function reviewEmail(name: string) {
  return `<!doctype html><html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="margin:0;padding:0;background-color:#eef4f9;font-family:Helvetica,Arial,sans-serif;color:#12364d;">
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="width:100%;background-color:#eef4f9;"><tr><td align="center" style="padding:16px 10px;">
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="width:100%;max-width:600px;background-color:#ffffff;border:1px solid #d7e3ee;border-radius:14px;overflow:hidden;">
<tr><td style="padding:16px 20px;background-color:#0093cc;border-bottom:3px solid #0093cc;">
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0"><tr>
<td width="120" style="width:120px;vertical-align:middle;"><table role="presentation" cellspacing="0" cellpadding="0" border="0"><tr><td style="padding:6px;background-color:#ffffff;border-radius:8px;"><img src="${SITE}/logo-email.png" width="108" alt="Clean&amp;Fresh" style="display:block;width:108px;max-width:108px;height:auto;border:0;"></td></tr></table></td>
<td align="right" style="padding-left:12px;vertical-align:middle;"><span style="display:inline-block;padding:7px 12px;background-color:#ffffff;border-radius:30px;font-size:11px;line-height:16px;font-weight:bold;color:#0093cc;">VOTRE AVIS</span></td>
</tr></table></td></tr>
<tr><td style="padding:20px;font-size:15px;line-height:22px;">
<h1 style="margin:0 0 14px;font-size:20px;line-height:26px;color:#0f2c3f;font-weight:bold;">Merci pour votre confiance</h1>
<p style="margin:0 0 10px;">Bonjour ${escapeHtml(name)},</p>
<p style="margin:0 0 18px;">Comment s’est passée votre prestation ? Vous pouvez partager votre expérience sur Google en quelques mots.</p>
<table role="presentation" cellspacing="0" cellpadding="0" border="0"><tr><td bgcolor="#0093cc" style="border-radius:8px;text-align:center;"><a href="https://g.page/r/CaKxSyOiBkq8EBE/review" style="display:inline-block;padding:13px 18px;font-size:15px;line-height:20px;font-weight:bold;color:#ffffff;text-decoration:none;">Partager mon avis sur Google</a></td></tr></table>
<p style="margin:16px 0 0;font-size:13px;line-height:19px;color:#527a92;">Une question sur la prestation ? Répondez simplement à cet e-mail.</p>
</td></tr>
<tr><td style="padding:14px 20px;background-color:#f6faff;border-top:1px solid #dce7f2;font-size:13px;line-height:19px;color:#12364d;">L’équipe <strong style="color:#0093cc;">Clean&amp;Fresh Toulouse</strong><br>07 67 12 75 00</td></tr>
</table></td></tr></table></body></html>`;
}
export async function calendarRequest(path = '', init: RequestInit = {}) {
  const token = await getGCalAccessToken();
  const calendar = process.env.GCAL_CALENDAR_ID;
  if (!token || !calendar) throw new Error('CALENDAR_UNAVAILABLE');
  const result = await fetch(`https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendar)}/events${path}`, {
    ...init, headers: { Authorization: `Bearer ${token}`, 'Content-Type':'application/json', ...init.headers },
  });
  if (!result.ok) throw new Error(`CALENDAR_${result.status}`);
  return result.json();
}
export async function patchEvent(event: ServiceEvent, properties: Record<string,string>, description?: string) {
  const privateProps = { ...event.extendedProperties?.private, ...properties };
  await calendarRequest(`/${encodeURIComponent(event.id!)}`, { method:'PATCH', body:JSON.stringify({extendedProperties:{private:privateProps}, ...(description === undefined ? {} : {description})}) });
  event.extendedProperties = {private:privateProps};
  if (description !== undefined) event.description = description;
}
export async function actionToken(id: string, kind = 'review') { return signManagementToken(`prestation-${kind}:${id}`); }
export async function getActionEvent(token: string, kind = 'review'): Promise<ServiceEvent> {
  const payload = token.split('.')[0] ?? '';
  const prefix = `prestation-${kind}:`;
  const id = payload.slice(prefix.length);
  if (!payload.startsWith(prefix) || !/^[a-zA-Z0-9_]{5,1024}$/.test(id) || await actionToken(id, kind) !== token) throw new Error('INVALID_LINK');
  const event = await calendarRequest(`/${encodeURIComponent(id)}`) as ServiceEvent;
  if (event.status === 'cancelled') throw new Error('EVENT_CANCELLED');
  return event;
}
export async function eventLinks(event: ServiceEvent) {
  const c = eventClient(event);
  const token = await actionToken(event.id!);
  const q = new URLSearchParams({n:c.name,e:c.email,f:event.summary ?? 'Nettoyage professionnel',d:event.start?.dateTime?.slice(0,10) ?? '',token});
  return { review:`${SITE}/envoyer-avis?${q}`, deposit:`${SITE}/api/prestation?token=${encodeURIComponent(await actionToken(event.id!, 'deposit'))}` };
}
export async function ensureEventActions(event: ServiceEvent) {
  if ((event.description ?? '').includes('data-cleanfresh-actions="v1"')) return;
  const links = await eventLinks(event);
  await patchEvent(event, {}, `${event.description ?? ''}\n\n<div data-cleanfresh-actions="v1"><b>GESTION CLEAN&amp;FRESH — liens privés</b><br><a href="${escapeHtml(links.review)}">⭐ Envoyer une demande d’avis</a></div>`);
}
function details(event: ServiceEvent, received?: string) {
  const c = eventClient(event);
  const date = new Date(event.start?.dateTime ?? '');
  const when = date.toLocaleString('fr-FR', {timeZone:'Europe/Paris',dateStyle:'full',timeStyle:'short'});
  const amounts = reservationAmounts(c.plain, event.extendedProperties?.private, received);
  // Keep only the labelled service/access block, never internal notes or owner actions.
  const serviceBlock = c.plain.match(/PRESTATIONS\s*:\s*([\s\S]*?)(?=💶|(?:^|\n)[^\p{L}\n]*TOTAL\s*:|❌|GESTION CLEAN|$)/iu)?.[1]?.trim();
  const rows = [
    ['Date et heure', when], ['Lieu d’intervention', c.address],
    ...(amounts.total === null ? [] : [['Montant total', formatEuros(amounts.total)]]),
    ...(amounts.deposit === null ? [] : [['Acompte reçu', formatEuros(amounts.deposit)]]),
    ...(amounts.balance === null ? [] : [['Reste à régler', formatEuros(amounts.balance)]]),
  ].map(([label, value]) => `<tr><td style="padding:10px;border-bottom:1px solid #dbe7ef">${escapeHtml(label!)}</td><td style="padding:10px;border-bottom:1px solid #dbe7ef;font-weight:bold">${escapeHtml(value!)}</td></tr>`).join('');
  return `<p>Bonjour ${escapeHtml(c.name)},</p><h2 style="font-size:18px">${escapeHtml(event.summary ?? 'Votre prestation')}</h2><table role="presentation" style="width:100%;border-collapse:collapse;background:#f3f8fb">${rows}</table>${serviceBlock ? `<h2 style="font-size:17px">Prestations et options</h2><p style="white-space:pre-line">${escapeHtml(serviceBlock)}</p>` : ''}<p>${amounts.total === null ? 'Le montant et les modalités de règlement sont ceux de votre devis accepté.' : amounts.balance === null ? 'Les paiements déjà reçus et le solde seront confirmés selon votre devis.' : 'Règlement du solde à la fin de la prestation.'}</p>`;
}
export async function sendEventEmail(event: ServiceEvent, kind: 'confirmation'|'reminder'|'deposit'|'review', amount?: string, reviewRequestId?: string) {
  const c = eventClient(event);
  if (!c.name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(c.email) || !event.start?.dateTime) throw new Error('CLIENT_DETAILS_MISSING');
  const start = event.start.dateTime;
  const props = event.extendedProperties?.private ?? {};
  const marker = {confirmation:'cfConfirmationStart',reminder:'cfReminderStart',deposit:'cfDepositReceipt',review:'cfReviewSent'}[kind];
  if (kind === 'deposit') {
    const cents = euroCents(amount);
    const total = reservationAmounts(c.plain, props).total;
    if (cents === null || cents <= 0 || (total !== null && cents > total)) throw new Error('INVALID_DEPOSIT_AMOUNT');
    if (props.cfDepositReceipt && props.cfDepositReceipt !== amount) throw new Error('DEPOSIT_ALREADY_RECORDED');
  }
  const value = kind === 'deposit' ? (amount ?? '') : kind === 'review' ? (reviewRequestId ?? 'sent') : start;
  if (props[marker] === value) return {success:true,alreadySent:true};
  const title = {confirmation:'Votre rendez-vous est confirmé',reminder:'Rappel de votre rendez-vous',deposit:'Votre acompte a bien été reçu',review:'Votre retour sur notre prestation'}[kind];
  let content = details(event, kind === 'deposit' ? amount : undefined);
  const managementUrl = (event.description ?? '').match(/https:\/\/(?:www\.)?cleanetfresh\.fr\/annuler\?token=[^"'<>\s]+/)?.[0];
  if (managementUrl && kind !== 'review') content += `<p><a href="${escapeHtml(managementUrl.replace(/&amp;/g,'&'))}">Gérer mon rendez-vous</a></p>`;
  if (kind === 'confirmation') content += '<p>Votre prestation est bien enregistrée dans notre agenda. Un rappel vous sera envoyé avant notre passage.</p>';
  if (kind === 'reminder') content += '<p>Nous vous rappelons votre prochain rendez-vous. Merci de prévoir les accès nécessaires à l’intervention.</p>';
  if (kind === 'deposit') content += `<p>Nous confirmons la réception de votre acompte de <strong>${escapeHtml(amount!)} €</strong> et votre rendez-vous. Le solde prévu au devis sera à régler à la fin de la prestation.</p>`;
  const html = kind === 'review' ? reviewEmail(c.name) : brandedEmail(title,content);
  const result = await sendMailRaw({to:c.email,subject:`Clean&Fresh Toulouse — ${title}`,html,idempotencyKey:`cf-${event.id}-${kind}-${value}`});
  if (!result.success) throw new Error('EMAIL_SEND_FAILED');
  await patchEvent(event, {[marker]:value, ...(kind === 'confirmation' ? {cfConfirmationPending:'false'} : {})});
  return {success:true,alreadySent:false};
}
export async function notifyOwner(event: ServiceEvent) {
  if (event.extendedProperties?.private?.cfOwnerSent) return;
  const links = await eventLinks(event);
  const result = await sendMailRaw({to:process.env.VITE_OWNER_EMAIL ?? 'nettoyagecleanfresh@gmail.com',subject:`Réservation — ${event.summary}`,html:brandedEmail('Prestation enregistrée', `${details(event)}<p><a href="${escapeHtml(links.review)}">⭐ Envoyer une demande d’avis</a></p><p><a href="${escapeHtml(links.deposit)}">Confirmer un acompte reçu</a></p>`),idempotencyKey:`cf-${event.id}-owner`});
  if (!result.success) throw new Error('OWNER_EMAIL_FAILED');
  await patchEvent(event,{cfOwnerSent:'true'});
}
