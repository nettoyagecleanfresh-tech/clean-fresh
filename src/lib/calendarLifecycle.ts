import { getGCalAccessToken, signManagementToken } from './gcal-server';
import { sendMailRaw } from './mailer';

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
function details(event: ServiceEvent) {
  const c = eventClient(event);
  const date = new Date(event.start?.dateTime ?? '');
  const when = date.toLocaleString('fr-FR', {timeZone:'Europe/Paris',dateStyle:'full',timeStyle:'short'});
  const services = c.plain.split(/GESTION CLEAN/)[0]?.split(/❌/)[0]?.trim() ?? '';
  return `<p>Bonjour ${escapeHtml(c.name)},</p><p><strong>${escapeHtml(event.summary ?? 'Votre prestation')}</strong><br>${escapeHtml(when)}<br>${escapeHtml(c.address)}</p><p style="white-space:pre-line">${escapeHtml(services)}</p>`;
}
export async function sendEventEmail(event: ServiceEvent, kind: 'confirmation'|'reminder'|'deposit'|'review', amount?: string) {
  const c = eventClient(event);
  if (!c.name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(c.email) || !event.start?.dateTime) throw new Error('CLIENT_DETAILS_MISSING');
  const start = event.start.dateTime;
  const props = event.extendedProperties?.private ?? {};
  const marker = {confirmation:'cfConfirmationStart',reminder:'cfReminderStart',deposit:'cfDepositReceipt',review:'cfReviewSent'}[kind];
  const value = kind === 'deposit' ? (amount ?? '') : kind === 'review' ? 'sent' : start;
  if (props[marker] === value) return {success:true,alreadySent:true};
  if (kind === 'review' && Date.parse(event.end?.dateTime ?? start) > Date.now()) throw new Error('PRESTATION_NOT_FINISHED');
  const title = {confirmation:'Votre rendez-vous est confirmé',reminder:'Rappel de votre rendez-vous',deposit:'Votre acompte a bien été reçu',review:'Votre avis nous est précieux'}[kind];
  let content = details(event);
  const managementUrl = (event.description ?? '').match(/https:\/\/(?:www\.)?cleanetfresh\.fr\/annuler\?token=[^"'<>\s]+/)?.[0];
  if (managementUrl && kind !== 'review') content += `<p><a href="${escapeHtml(managementUrl.replace(/&amp;/g,'&'))}">Gérer mon rendez-vous</a></p>`;
  if (kind === 'confirmation') content += '<p>Votre prestation est bien enregistrée dans notre agenda. Un rappel vous sera envoyé avant notre passage.</p>';
  if (kind === 'reminder') content += '<p>Nous vous rappelons votre prochain rendez-vous. Merci de prévoir les accès nécessaires à l’intervention.</p>';
  if (kind === 'deposit') content += `<p>Nous confirmons la réception de votre acompte de <strong>${escapeHtml(amount!)} €</strong> et votre rendez-vous. Le solde prévu au devis sera à régler à la fin de la prestation.</p>`;
  if (kind === 'review') content = `<p>Bonjour ${escapeHtml(c.name)},</p><p>Merci de nous avoir confié votre prestation ${escapeHtml(event.summary ?? '')}. Partagez votre expérience sur Google : votre retour nous aide à améliorer nos services.</p><p><a href="https://g.page/r/CaKxSyOiBkq8EBE/review" style="display:inline-block;padding:16px 24px;background:#00b8ff;border-radius:8px;color:#082f49;font-weight:bold;text-decoration:none">Laisser un avis sur Google</a></p>`;
  const result = await sendMailRaw({to:c.email,subject:`Clean&Fresh Toulouse — ${title}`,html:brandedEmail(title,content),idempotencyKey:`cf-${event.id}-${kind}-${value}`});
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
