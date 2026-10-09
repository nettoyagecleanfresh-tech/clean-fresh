import { brandedEmail, escapeHtml, eventClient, getActionEvent, sendEventEmail } from '../src/lib/calendarLifecycle';

export default async function handler(request: any, response: any) {
  response.setHeader('Cache-Control','no-store');
  response.setHeader('Referrer-Policy','no-referrer');
  response.setHeader('X-Robots-Tag','noindex, nofollow');
  if (!['GET','POST'].includes(request.method)) return response.status(405).end();
  try {
    const token = typeof request.query.token === 'string' ? request.query.token : '';
    const event = await getActionEvent(token, 'deposit');
    const c = eventClient(event);
    if (request.method === 'POST') {
      const body = typeof request.body === 'string' ? Object.fromEntries(new URLSearchParams(request.body)) : request.body;
      const amount = Number(String(body?.amount ?? '').replace(',','.'));
      if (body?.confirmed !== 'yes' || !Number.isFinite(amount) || amount <= 0 || amount > 100000) throw new Error('Montant et confirmation de réception obligatoires.');
      await sendEventEmail(event,'deposit',amount.toFixed(2));
      return response.status(200).send(brandedEmail('Acompte confirmé',`<p>La confirmation a été transmise à ${escapeHtml(c.email)}.</p>`));
    }
    return response.status(200).send(brandedEmail('Confirmer un acompte reçu',`<p>${escapeHtml(c.name)} — ${escapeHtml(event.summary ?? '')}</p><p>À utiliser uniquement pour une prestation sur devis, après vérification du paiement sur votre compte.</p><form method="post"><label>Montant reçu (€)<br><input name="amount" type="number" min="0.01" max="100000" step="0.01" required></label><p><label><input type="checkbox" name="confirmed" value="yes" required> Je confirme avoir réellement reçu cet acompte.</label></p><button type="submit" style="padding:16px;background:#00b8ff;border:0;border-radius:8px">Envoyer la confirmation au client</button></form>`));
  } catch (error) {
    const message = error instanceof Error && error.message.startsWith('Montant') ? error.message : 'Le lien est invalide, le rendez-vous est annulé ou l’envoi a échoué. Aucun envoi n’est confirmé. Réessayez depuis Google Agenda.';
    return response.status(400).send(brandedEmail('Action non confirmée',`<p>${escapeHtml(message)}</p>`));
  }
}
