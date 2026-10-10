import { quoteSchema } from '../src/lib/quoteSchema.js';
import { sendQuoteMail } from '../src/lib/quoteMailer.js';

const escape = (value: string) => value.replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]!);
const attempts = new Map<string, { count: number; until: number }>();
export default async function handler(request: any, response: any) {
  response.setHeader('Cache-Control', 'no-store');
  if (request.method !== 'POST') return response.status(405).json({ success: false });
  const origin = request.headers.origin;
  if (origin && !['https://cleanetfresh.fr', 'https://www.cleanetfresh.fr'].includes(origin)) return response.status(403).json({ success: false });
  const ip = String(request.headers['x-forwarded-for'] ?? request.socket?.remoteAddress ?? 'unknown').split(',')[0]!;
  const now = Date.now();
  for (const [key, value] of attempts) if (value.until < now) attempts.delete(key);
  const attempt = attempts.get(ip) ?? { count: 0, until: now + 600_000 };
  if (attempt.count >= 8) return response.status(429).json({ success: false, message: 'Veuillez patienter avant de réessayer.' });
  attempts.set(ip, { ...attempt, count: attempt.count + 1 });
  try {
    const body = typeof request.body === 'string' ? JSON.parse(request.body) : request.body;
    const parsed = quoteSchema.safeParse(body);
    if (!parsed.success) return response.status(400).json({ success: false, message: 'Informations incomplètes.' });
    const count = body.photoCount ?? 0;
    if (!Number.isInteger(count) || count < 0 || count > 10) return response.status(400).json({ success: false });
    let attachment: Buffer | undefined;
    if (count > 0) {
      if (typeof body.pdf !== 'string' || body.pdf.length > 2_800_000 || !/^[A-Za-z0-9+/]+={0,2}$/.test(body.pdf)) return response.status(400).json({ success: false });
      attachment = Buffer.from(body.pdf, 'base64');
      if (attachment.length > 2_100_000 || attachment.subarray(0, 8).toString() !== '%PDF-1.4' || !attachment.subarray(-10).toString().includes('%%EOF')) return response.status(400).json({ success: false });
    } else if (body.pdf) return response.status(400).json({ success: false });
    const labels: Record<string, string> = { nom: 'Nom', telephone: 'Téléphone', email: 'Email', service: 'Prestation', adresse: 'Adresse d’intervention', surface: 'Surface ou dimensions', dateSouhaitee: 'Date souhaitée', acces: 'Accès et besoins techniques', message: 'Message' };
    const html = `<div style="font-family:Arial,sans-serif;color:#102a43;max-width:650px;margin:auto"><h1>Nouvelle demande de devis</h1>${Object.entries(parsed.data).map(([key, value]) => `<p><strong>${labels[key]}</strong><br>${escape(value).replace(/\n/g, '<br>')}</p>`).join('')}<p>${count} photo(s) jointe(s)${count ? ' dans le PDF.' : '.'}</p><hr><p>Clean&Fresh Toulouse</p></div>`;
    const result = await sendQuoteMail({ to: process.env.VITE_OWNER_EMAIL ?? 'nettoyagecleanfresh@gmail.com', subject: `Demande de devis — ${parsed.data.nom.replace(/[\r\n]/g, ' ')}`, html, clientEmail: parsed.data.email, attachment });
    if (!result.success) return response.status(502).json({ success: false, message: 'Envoi non confirmé. Vos informations sont conservées.' });
    return response.status(200).json({ success: true });
  } catch {
    return response.status(500).json({ success: false, message: 'Envoi non confirmé. Veuillez réessayer.' });
  }
}
