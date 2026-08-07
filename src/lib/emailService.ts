/**
 * EmailService — Tous les emails via Nodemailer (Gmail)
 * 100% gratuit — 500 emails/jour
 *
 * Emails envoyés :
 *  - sendBookingEmails()     : confirmation → client + admin
 *  - sendReminderEmail()     : rappel 24h   → client + admin
 *  - sendCancellationEmail() : annulation   → client + admin
 *  - sendRescheduleEmail()   : reprog       → client + admin
 *  - sendContactMessage()    : contact      → admin
 */

import { sendNodemailerServerFn } from "@/lib/nodemailerServerFn";

// ─── Tips par service ─────────────────────────────────────────────────────────
const SERVICE_TIP: Record<string, string> = {
  auto:    "🚗 Pensez à vider un maximum de vos effets personnels du véhicule avant notre passage. Cela permet de traiter chaque recoin efficacement.",
  canape:  "🛋️ Si votre canapé présente des tâches importantes (vin, sang, encre…), notre technicien pourra proposer un traitement détachage intensif sur place (+19 € selon l'intensité).",
  matelas: "🛏️ Si votre matelas présente des auréoles ou tâches prononcées, notre technicien pourra proposer un traitement intensif sur place (+19 € selon l'intensité).",
  tapis:   "🧶 Veillez à dégager l'espace autour du tapis pour faciliter l'intervention de notre technicien.",
  "fin-de-bail": "🏠 Assurez-vous que tous vos meubles et affaires sont retirés des pièces avant notre passage pour un nettoyage complet.",
};

// ─── Types ───────────────────────────────────────────────────────────────────
export type BookingPayload = {
  items: {
    service_id: string;
    service_name: string;
    formule_name: string;
    formule_price: number;
    options: { name: string; price: number }[];
  }[];
  total_price: number;
  booking_date: string;
  booking_time: string;
  client_name: string;
  client_phone: string;
  client_email: string;
  client_street: string;
  client_zip: string;
  client_city: string;
  cancel_url: string;
  estimated_duration?: string;
};

export type ContactPayload = {
  nom: string;
  telephone: string;
  email: string;
  service: string;
  message: string;
};

// ─── Helper: envoi Gmail ──────────────────────────────────────────────────────
async function sendGmail(to: string, subject: string, html: string) {
  await sendNodemailerServerFn({ data: { to, subject, html } }).catch(console.error);
}

// ─── Helper: ligne de prestation HTML ────────────────────────────────────────
function buildItemsHtml(items: BookingPayload["items"]): string {
  return items.map(item => {
    let html = `
    <tr>
      <td width="70%" style="padding:10px 8px 4px 20px;font-family:Helvetica,Arial,sans-serif;font-size:15px;color:#0f2c3f;vertical-align:top;">
        <strong>${item.service_name}</strong><br>
        <span style="font-size:13px;color:#5b7b8e;">${item.formule_name}</span>
      </td>
      <td width="30%" align="right" style="padding:10px 20px 4px 8px;font-family:Helvetica,Arial,sans-serif;font-size:15px;color:#0f2c3f;vertical-align:top;">
        <strong>${item.formule_price}&nbsp;&euro;</strong>
      </td>
    </tr>`;
    item.options.forEach(opt => {
      html += `
      <tr>
        <td width="70%" style="padding:2px 8px 2px 30px;font-family:Helvetica,Arial,sans-serif;font-size:13px;color:#5b7b8e;vertical-align:top;">
          &plus;&nbsp;${opt.name}
        </td>
        <td width="30%" align="right" style="padding:2px 20px 2px 8px;font-family:Helvetica,Arial,sans-serif;font-size:13px;color:#5b7b8e;vertical-align:top;">
          +${opt.price}&nbsp;&euro;
        </td>
      </tr>`;
    });
    return html;
  }).join("");
}

// ─── Helper: tableau texte des items (pour emails admin) ─────────────────────
function buildItemsText(items: BookingPayload["items"]): string {
  return items.map(item => {
    let text = `• <strong>${item.service_name}</strong> — ${item.formule_name} : <strong>${item.formule_price} €</strong>`;
    if (item.options.length > 0) {
      text += item.options.map(o => `<br>&nbsp;&nbsp;&nbsp;+ ${o.name} : +${o.price} €`).join("");
    }
    return text;
  }).join("<br><br>");
}

// ─── Styles partagés ─────────────────────────────────────────────────────────
const CSS = `
  <style>
    img{max-width:100%!important;height:auto!important}
    table{border-collapse:collapse}
    @media only screen and (max-width:620px){
      .container{width:100%!important}
      .px{padding-left:16px!important;padding-right:16px!important}
      .stack{display:block!important;width:100%!important}
    }
  </style>`;

// ─── Header HTML réutilisable ─────────────────────────────────────────────────
function emailHeader(badgeText: string, color = "#00b8ff") {
  return `
    <tr>
      <td style="background-color:${color};padding:22px 28px;border-bottom:3px solid ${color === "#00b8ff" ? "#0093cc" : color};">
        <table border="0" cellpadding="0" cellspacing="0" width="100%">
          <tr>
            <td width="60%" align="left" style="vertical-align:middle;">
              <table border="0" cellpadding="0" cellspacing="0">
                <tr>
                  <td bgcolor="#ffffff" style="border-radius:8px;padding:5px 10px;">
                    <img src="https://www.cleanetfresh.fr/logo.png" width="110" alt="Clean&amp;Fresh" style="display:block;width:110px;height:auto;border:0;">
                  </td>
                </tr>
              </table>
            </td>
            <td width="40%" align="right" style="vertical-align:middle;">
              <table border="0" cellpadding="0" cellspacing="0" align="right">
                <tr>
                  <td bgcolor="#ffffff" style="border-radius:30px;padding:7px 15px;font-family:Helvetica,Arial,sans-serif;font-size:11px;font-weight:bold;letter-spacing:0.6px;color:${color === "#00b8ff" ? "#0093cc" : color};white-space:nowrap;">${badgeText}</td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>`;
}

// ─── Footer HTML réutilisable ─────────────────────────────────────────────────
function emailFooter() {
  return `
    <tr>
      <td style="background-color:#f6faff;padding:22px 28px;border-top:1px solid #dce7f2;text-align:center;font-family:Helvetica,Arial,sans-serif;font-size:13px;line-height:21px;color:#12364d;">
        À très bientôt,<br>
        <strong style="color:#0093cc;">L'équipe Clean&amp;Fresh</strong><br>
        <span style="font-size:12px;color:#527a92;">Toulouse et Haute-Garonne</span><br>
        <span style="font-size:12px;"><a href="https://www.cleanetfresh.fr" style="color:#0093cc;text-decoration:none;">cleanetfresh.fr</a></span><br>
        <span style="font-size:12px;color:#527a92;"><a href="tel:0767127500" style="color:#527a92;text-decoration:none;">📞 07 67 12 75 00</a></span>
      </td>
    </tr>`;
}

// ─── Wrapper email complet ────────────────────────────────────────────────────
function wrapEmail(content: string): string {
  return `<!DOCTYPE html>
<html lang="fr">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">${CSS}</head>
<body style="margin:0;padding:0;background-color:#eef4f9;">
<table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color:#eef4f9;">
<tr><td align="center" style="padding:32px 12px;">
  <table class="container" border="0" cellpadding="0" cellspacing="0" width="100%" style="width:100%;max-width:600px;background-color:#ffffff;border:1px solid #d7e3ee;border-radius:14px;overflow:hidden;font-family:Helvetica,Arial,sans-serif;">
    ${content}
  </table>
</td></tr>
</table>
</body>
</html>`;
}

// ═══════════════════════════════════════════════════════════════════════════════
// 1. CONFIRMATION DE RÉSERVATION
// ═══════════════════════════════════════════════════════════════════════════════

export async function sendBookingEmails(b: BookingPayload): Promise<string> {
  const ownerEmail = import.meta.env["VITE_OWNER_EMAIL"] ?? "nettoyagecleanfresh@gmail.com";
  const fullAddress = `${b.client_street}, ${b.client_zip} ${b.client_city}`;
  const tip = b.items.map(i => SERVICE_TIP[i.service_id]).filter(Boolean).join("<br><br>") || "";
  const itemsHtml = buildItemsHtml(b.items);
  const itemsText = buildItemsText(b.items);
  const orderNumber = Math.floor(Math.random() * 90000) + 10000;
  const firstService = b.items[0];
  const formuleName = b.items.length > 1
    ? `${firstService?.formule_name} + ${b.items.length - 1} autre(s)`
    : firstService?.formule_name ?? "";
  const duration = b.estimated_duration ?? `${Math.ceil(b.total_price / 40) * 30} min environ`;
  const formattedDate = (() => {
    try {
      const d = new Date(b.booking_date);
      return d.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
    } catch { return b.booking_date; }
  })();

  // ── EMAIL CLIENT ────────────────────────────────────────────────────────────
  const clientContent = `
    ${emailHeader("RÉSERVATION CONFIRMÉE")}
    <tr><td class="px" style="padding:32px 28px 8px 28px;">
      <h1 style="margin:0 0 10px 0;font-size:22px;font-weight:bold;color:#0f2c3f;">Bonjour ${b.client_name},</h1>
      <p style="margin:0;font-size:15px;line-height:24px;color:#2f4d64;">
        Votre demande pour la prestation <strong style="color:#0f2c3f;">${formuleName}</strong> a bien été enregistrée.<br>
        Voici le récapitulatif complet de votre commande&nbsp;<strong>n°${orderNumber}</strong>.
      </p>
    </td></tr>

    <!-- Détails intervention -->
    <tr><td class="px" style="padding:20px 28px 0 28px;">
      <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color:#f6faff;border:1px solid #dce7f2;border-radius:12px;">
        <tr><td style="padding:16px 20px 4px 20px;font-size:11px;font-weight:bold;letter-spacing:1.2px;text-transform:uppercase;color:#3b6a7c;">📅 Détails de l'intervention</td></tr>
        <tr><td style="padding:0 20px 16px 20px;">
          <table border="0" cellpadding="0" cellspacing="0" width="100%">
            <tr>
              <td class="stack" width="160" style="padding:8px 0;border-bottom:1px solid #e7eef6;font-size:13px;color:#5b7b8e;vertical-align:top;">Date</td>
              <td class="stack" style="padding:8px 0;border-bottom:1px solid #e7eef6;font-size:15px;color:#0f2c3f;vertical-align:top;"><strong>${formattedDate}</strong></td>
            </tr>
            <tr>
              <td class="stack" width="160" style="padding:8px 0;border-bottom:1px solid #e7eef6;font-size:13px;color:#5b7b8e;vertical-align:top;">Heure d'arrivée</td>
              <td class="stack" style="padding:8px 0;border-bottom:1px solid #e7eef6;font-size:15px;color:#0093cc;vertical-align:top;"><strong>${b.booking_time}</strong></td>
            </tr>
            <tr>
              <td class="stack" width="160" style="padding:8px 0;border-bottom:1px solid #e7eef6;font-size:13px;color:#5b7b8e;vertical-align:top;">Durée estimée</td>
              <td class="stack" style="padding:8px 0;border-bottom:1px solid #e7eef6;font-size:14px;color:#0f2c3f;vertical-align:top;">${duration}</td>
            </tr>
            <tr>
              <td class="stack" width="160" style="padding:8px 0;border-bottom:1px solid #e7eef6;font-size:13px;color:#5b7b8e;vertical-align:top;">Adresse</td>
              <td class="stack" style="padding:8px 0;border-bottom:1px solid #e7eef6;font-size:14px;color:#0f2c3f;vertical-align:top;">${fullAddress}</td>
            </tr>
            <tr>
              <td class="stack" width="160" style="padding:8px 0;font-size:13px;color:#5b7b8e;vertical-align:top;">Téléphone client</td>
              <td class="stack" style="padding:8px 0;font-size:14px;color:#0f2c3f;vertical-align:top;">${b.client_phone}</td>
            </tr>
          </table>
        </td></tr>
      </table>
    </td></tr>

    <!-- Récap commande -->
    <tr><td class="px" style="padding:16px 28px 0 28px;">
      <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border:1px solid #dce7f2;border-radius:12px;">
        <tr><td colspan="2" style="padding:16px 20px 10px 20px;font-size:11px;font-weight:bold;letter-spacing:1.2px;text-transform:uppercase;color:#3b6a7c;">🧾 Récapitulatif de la commande</td></tr>
        ${itemsHtml}
        <tr><td colspan="2" style="padding:10px 20px 0 20px;"><div style="height:1px;background-color:#e7eef6;font-size:0;">&nbsp;</div></td></tr>
        <tr>
          <td width="70%" style="padding:14px 8px 14px 20px;border-top:1px solid #dce7f2;font-size:14px;color:#0f2c3f;background-color:#f6faff;"><strong>Total estimé</strong></td>
          <td width="30%" align="right" style="padding:14px 20px 14px 8px;border-top:1px solid #dce7f2;font-size:20px;color:#0093cc;background-color:#f6faff;"><strong>${b.total_price}&nbsp;&euro;</strong></td>
        </tr>
        <tr><td colspan="2" style="padding:0 20px 14px 20px;font-size:11px;color:#6b8ba0;background-color:#f6faff;">Paiement après l'intervention. Montant susceptible d'évoluer si l'état du bien diffère des informations transmises.</td></tr>
      </table>
    </td></tr>

    ${tip ? `
    <!-- Conseil -->
    <tr><td class="px" style="padding:20px 28px 0 28px;">
      <div style="padding:14px 18px;background-color:#f6faff;border-left:3px solid #00b8ff;border-radius:6px;font-size:14px;line-height:22px;color:#1e3f55;font-style:italic;">${tip}</div>
    </td></tr>` : ""}

    <!-- Action -->
    <tr><td class="px" style="padding:24px 28px 32px 28px;">
      <p style="margin:0 0 16px 0;font-size:14px;line-height:22px;color:#2f4d64;">
        Si vous avez un imprévu ou souhaitez modifier votre rendez-vous, vous pouvez le faire depuis le lien ci-dessous.<br>
        En cas de question, n'hésitez pas à nous appeler ou à répondre à cet email.
      </p>
      <table border="0" cellpadding="0" cellspacing="0">
        <tr>
          <td bgcolor="#ffffff" style="border:1px solid #e0a8ae;border-radius:40px;margin-right:10px;">
            <a href="${b.cancel_url}" style="display:block;padding:12px 24px;font-family:Helvetica,Arial,sans-serif;font-size:13px;font-weight:bold;color:#c22a38;text-decoration:none;">📅 Gérer mon rendez-vous</a>
          </td>
        </tr>
      </table>
      <p style="margin:10px 0 0 0;font-size:12px;color:#6b8ba0;">Depuis ce lien, vous pouvez reprogrammer ou annuler votre rendez-vous.</p>
    </td></tr>
    ${emailFooter()}`;

  // ── EMAIL ADMIN ─────────────────────────────────────────────────────────────
  const adminContent = `
    ${emailHeader("🆕 NOUVELLE RÉSERVATION", "#0093cc")}
    <tr><td class="px" style="padding:28px 28px 8px 28px;">
      <h1 style="margin:0 0 6px 0;font-size:20px;font-weight:bold;color:#0f2c3f;">Nouvelle réservation reçue</h1>
      <p style="margin:0;font-size:14px;color:#5b7b8e;">Commande n°${orderNumber} — ${b.items.length} prestation(s)</p>
    </td></tr>

    <!-- Contact client -->
    <tr><td class="px" style="padding:16px 28px 0 28px;">
      <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color:#f6faff;border:1px solid #dce7f2;border-radius:12px;">
        <tr><td style="padding:14px 20px 4px 20px;font-size:11px;font-weight:bold;letter-spacing:1.2px;text-transform:uppercase;color:#3b6a7c;">👤 Client</td></tr>
        <tr><td style="padding:0 20px 14px 20px;">
          <table border="0" cellpadding="0" cellspacing="0" width="100%">
            <tr>
              <td width="140" style="padding:6px 0;border-bottom:1px solid #e7eef6;font-size:13px;color:#5b7b8e;">Nom</td>
              <td style="padding:6px 0;border-bottom:1px solid #e7eef6;font-size:14px;color:#0f2c3f;"><strong>${b.client_name}</strong></td>
            </tr>
            <tr>
              <td width="140" style="padding:6px 0;border-bottom:1px solid #e7eef6;font-size:13px;color:#5b7b8e;">Téléphone</td>
              <td style="padding:6px 0;border-bottom:1px solid #e7eef6;font-size:14px;color:#0f2c3f;"><a href="tel:${b.client_phone.replace(/\s/g,'')}" style="color:#0093cc;text-decoration:none;">${b.client_phone}</a></td>
            </tr>
            <tr>
              <td width="140" style="padding:6px 0;border-bottom:1px solid #e7eef6;font-size:13px;color:#5b7b8e;">Email</td>
              <td style="padding:6px 0;border-bottom:1px solid #e7eef6;font-size:14px;color:#0f2c3f;"><a href="mailto:${b.client_email}" style="color:#0093cc;text-decoration:none;">${b.client_email}</a></td>
            </tr>
            <tr>
              <td width="140" style="padding:6px 0;font-size:13px;color:#5b7b8e;">Adresse</td>
              <td style="padding:6px 0;font-size:14px;color:#0f2c3f;">${fullAddress}</td>
            </tr>
          </table>
        </td></tr>
      </table>
    </td></tr>

    <!-- Intervention -->
    <tr><td class="px" style="padding:14px 28px 0 28px;">
      <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color:#e8f4ff;border:1px solid #b3d9f7;border-radius:12px;">
        <tr><td style="padding:14px 20px 4px 20px;font-size:11px;font-weight:bold;letter-spacing:1.2px;text-transform:uppercase;color:#0066aa;">📅 Intervention</td></tr>
        <tr><td style="padding:0 20px 14px 20px;">
          <table border="0" cellpadding="0" cellspacing="0" width="100%">
            <tr>
              <td width="140" style="padding:6px 0;border-bottom:1px solid #cde7f5;font-size:13px;color:#336699;">Date</td>
              <td style="padding:6px 0;border-bottom:1px solid #cde7f5;font-size:15px;color:#003d70;"><strong>${formattedDate}</strong></td>
            </tr>
            <tr>
              <td width="140" style="padding:6px 0;border-bottom:1px solid #cde7f5;font-size:13px;color:#336699;">Heure</td>
              <td style="padding:6px 0;border-bottom:1px solid #cde7f5;font-size:15px;color:#0093cc;"><strong>${b.booking_time}</strong></td>
            </tr>
            <tr>
              <td width="140" style="padding:6px 0;font-size:13px;color:#336699;">Durée estimée</td>
              <td style="padding:6px 0;font-size:14px;color:#003d70;">${duration}</td>
            </tr>
          </table>
        </td></tr>
      </table>
    </td></tr>

    <!-- Commande -->
    <tr><td class="px" style="padding:14px 28px 0 28px;">
      <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border:1px solid #dce7f2;border-radius:12px;">
        <tr><td colspan="2" style="padding:14px 20px 10px 20px;font-size:11px;font-weight:bold;letter-spacing:1.2px;text-transform:uppercase;color:#3b6a7c;">🧾 Commande détaillée</td></tr>
        ${itemsHtml}
        <tr><td colspan="2" style="padding:10px 20px 0 20px;"><div style="height:1px;background-color:#e7eef6;font-size:0;">&nbsp;</div></td></tr>
        <tr>
          <td width="70%" style="padding:14px 8px 14px 20px;border-top:1px solid #dce7f2;background-color:#f6faff;font-size:14px;color:#0f2c3f;"><strong>💶 Total estimé</strong></td>
          <td width="30%" align="right" style="padding:14px 20px 14px 8px;border-top:1px solid #dce7f2;background-color:#f6faff;font-size:20px;color:#0093cc;"><strong>${b.total_price}&nbsp;&euro;</strong></td>
        </tr>
      </table>
    </td></tr>

    <!-- Actions Admin -->
    <tr><td class="px" style="padding:20px 28px 32px 28px;">
      <table border="0" cellpadding="0" cellspacing="0" width="100%">
        <tr>
          <td bgcolor="#fbbc04" style="border-radius:8px;padding:14px 20px;text-align:center;box-shadow:0 3px 10px rgba(251,188,4,0.3);margin-bottom:12px;display:block;">
            <a href="${process.env["VITE_SITE_URL"] ?? "https://www.cleanetfresh.fr"}/envoyer-avis?n=${encodeURIComponent(b.client_name)}&e=${encodeURIComponent(b.client_email)}&f=${encodeURIComponent(formuleName)}&d=${encodeURIComponent(b.booking_date)}" style="color:#1a1a1a;font-weight:bold;text-decoration:none;font-size:15px;display:block;">
              ⭐ Envoyer une demande d'avis à ce client
            </a>
          </td>
        </tr>
        <tr>
          <td bgcolor="#e8f4ff" style="border-radius:8px;padding:12px 20px;font-size:13px;color:#0066aa;text-align:center;">
            <a href="${b.cancel_url}" style="color:#0066aa;font-weight:bold;text-decoration:underline;">📎 Voir le lien de gestion du RDV (Reprog/Annuler)</a>
          </td>
        </tr>
      </table>
    </td></tr>
    ${emailFooter()}`;

  await sendGmail(b.client_email, `✅ Confirmation de votre réservation — ${formuleName}`, wrapEmail(clientContent));
  await sendGmail(ownerEmail, `🆕 [Réservation] ${b.client_name} — ${formattedDate} à ${b.booking_time}`, wrapEmail(adminContent));

  return "";
}

// ═══════════════════════════════════════════════════════════════════════════════
// 2. RAPPEL 24H AVANT
// ═══════════════════════════════════════════════════════════════════════════════

export async function sendReminderEmail(params: {
  client_name: string;
  client_phone: string;
  client_email: string;
  formule_name: string;
  booking_date: string;
  booking_time: string;
  client_address: string;
  cancel_url: string;
}) {
  const ownerEmail = import.meta.env["VITE_OWNER_EMAIL"] ?? "nettoyagecleanfresh@gmail.com";
  const formattedDate = (() => {
    try {
      const d = new Date(params.booking_date);
      return d.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
    } catch { return params.booking_date; }
  })();

  // ── EMAIL CLIENT ────────────────────────────────────────────────────────────
  const clientContent = `
    ${emailHeader("⏰ RAPPEL — DEMAIN", "#f59e0b")}
    <tr><td class="px" style="padding:32px 28px 8px 28px;">
      <h1 style="margin:0 0 10px 0;font-size:22px;font-weight:bold;color:#0f2c3f;">Votre rendez-vous est demain !</h1>
      <p style="margin:0;font-size:15px;line-height:24px;color:#2f4d64;">
        Bonjour <strong>${params.client_name}</strong>,<br>
        Nous vous rappelons votre prestation <strong>${params.formule_name}</strong> programmée pour demain.
      </p>
    </td></tr>

    <!-- Détails -->
    <tr><td class="px" style="padding:20px 28px 0 28px;">
      <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color:#fffbf0;border:1px solid #fde68a;border-radius:12px;">
        <tr><td style="padding:14px 20px 4px 20px;font-size:11px;font-weight:bold;letter-spacing:1.2px;text-transform:uppercase;color:#92400e;">📅 Votre rendez-vous</td></tr>
        <tr><td style="padding:0 20px 16px 20px;">
          <table border="0" cellpadding="0" cellspacing="0" width="100%">
            <tr>
              <td width="140" style="padding:8px 0;border-bottom:1px solid #fde68a;font-size:13px;color:#78350f;">Date</td>
              <td style="padding:8px 0;border-bottom:1px solid #fde68a;font-size:15px;color:#0f2c3f;"><strong>${formattedDate}</strong></td>
            </tr>
            <tr>
              <td width="140" style="padding:8px 0;border-bottom:1px solid #fde68a;font-size:13px;color:#78350f;">Heure d'arrivée</td>
              <td style="padding:8px 0;border-bottom:1px solid #fde68a;font-size:15px;color:#d97706;"><strong>${params.booking_time}</strong></td>
            </tr>
            <tr>
              <td width="140" style="padding:8px 0;border-bottom:1px solid #fde68a;font-size:13px;color:#78350f;">Prestation</td>
              <td style="padding:8px 0;border-bottom:1px solid #fde68a;font-size:14px;color:#0f2c3f;">${params.formule_name}</td>
            </tr>
            <tr>
              <td width="140" style="padding:8px 0;font-size:13px;color:#78350f;">Adresse</td>
              <td style="padding:8px 0;font-size:14px;color:#0f2c3f;">${params.client_address}</td>
            </tr>
          </table>
        </td></tr>
      </table>
    </td></tr>

    <!-- À préparer -->
    <tr><td class="px" style="padding:16px 28px 0 28px;">
      <div style="padding:16px 20px;background-color:#f6faff;border-left:3px solid #00b8ff;border-radius:6px;font-size:14px;line-height:22px;color:#1e3f55;">
        <strong>Quelques conseils pour demain :</strong><br>
        &bull; Dégagez l'espace autour du bien à nettoyer<br>
        &bull; Prévoyez un accès facilité à votre domicile<br>
        &bull; En cas d'imprévu, contactez-nous au plus tôt
      </div>
    </td></tr>

    <!-- Contact -->
    <tr><td class="px" style="padding:16px 28px 0 28px;">
      <div style="padding:14px 20px;background-color:#f0fdf4;border:1px solid #bbf7d0;border-radius:10px;font-size:14px;color:#065f46;">
        <strong>Besoin d'aide ?</strong><br>
        📞 <a href="tel:0767127500" style="color:#059669;text-decoration:none;">07 67 12 75 00</a>&nbsp;&nbsp;|&nbsp;&nbsp;
        ✉️ <a href="mailto:nettoyagecleanfresh@gmail.com" style="color:#059669;text-decoration:none;">nettoyagecleanfresh@gmail.com</a>
      </div>
    </td></tr>

    <!-- Action -->
    <tr><td class="px" style="padding:24px 28px 32px 28px;">
      <table border="0" cellpadding="0" cellspacing="0">
        <tr>
          <td bgcolor="#ffffff" style="border:1px solid #e0a8ae;border-radius:40px;">
            <a href="${params.cancel_url}" style="display:block;padding:12px 24px;font-size:13px;font-weight:bold;color:#c22a38;text-decoration:none;">📅 Modifier ou annuler mon rendez-vous</a>
          </td>
        </tr>
      </table>
      <p style="margin:10px 0 0 0;font-size:12px;color:#6b8ba0;">En cas d'imprévu de dernière minute, vous pouvez reprogrammer depuis ce lien.</p>
    </td></tr>
    ${emailFooter()}`;

  // ── EMAIL ADMIN ─────────────────────────────────────────────────────────────
  const adminContent = `
    ${emailHeader("⏰ RAPPEL — RDV DEMAIN", "#f59e0b")}
    <tr><td class="px" style="padding:28px 28px 8px 28px;">
      <h1 style="margin:0 0 6px 0;font-size:20px;font-weight:bold;color:#0f2c3f;">Rappel : intervention prévue demain</h1>
      <p style="margin:0;font-size:14px;color:#5b7b8e;">Voici le récapitulatif de votre rendez-vous de demain.</p>
    </td></tr>

    <tr><td class="px" style="padding:16px 28px 0 28px;">
      <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color:#fffbf0;border:1px solid #fde68a;border-radius:12px;">
        <tr><td style="padding:14px 20px 4px 20px;font-size:11px;font-weight:bold;letter-spacing:1.2px;text-transform:uppercase;color:#92400e;">📅 Détails du rendez-vous</td></tr>
        <tr><td style="padding:0 20px 14px 20px;">
          <table border="0" cellpadding="0" cellspacing="0" width="100%">
            <tr>
              <td width="140" style="padding:6px 0;border-bottom:1px solid #fde68a;font-size:13px;color:#78350f;">Date</td>
              <td style="padding:6px 0;border-bottom:1px solid #fde68a;font-size:15px;color:#0f2c3f;"><strong>${formattedDate}</strong></td>
            </tr>
            <tr>
              <td width="140" style="padding:6px 0;border-bottom:1px solid #fde68a;font-size:13px;color:#78350f;">Heure</td>
              <td style="padding:6px 0;border-bottom:1px solid #fde68a;font-size:15px;color:#d97706;"><strong>${params.booking_time}</strong></td>
            </tr>
            <tr>
              <td width="140" style="padding:6px 0;border-bottom:1px solid #fde68a;font-size:13px;color:#78350f;">Prestation</td>
              <td style="padding:6px 0;border-bottom:1px solid #fde68a;font-size:14px;color:#0f2c3f;">${params.formule_name}</td>
            </tr>
            <tr>
              <td width="140" style="padding:6px 0;border-bottom:1px solid #fde68a;font-size:13px;color:#78350f;">Client</td>
              <td style="padding:6px 0;border-bottom:1px solid #fde68a;font-size:14px;color:#0f2c3f;"><strong>${params.client_name}</strong></td>
            </tr>
            <tr>
              <td width="140" style="padding:6px 0;border-bottom:1px solid #fde68a;font-size:13px;color:#78350f;">Téléphone</td>
              <td style="padding:6px 0;border-bottom:1px solid #fde68a;font-size:14px;color:#0f2c3f;"><a href="tel:${params.client_phone.replace(/\s/g,'')}" style="color:#0093cc;text-decoration:none;">${params.client_phone}</a></td>
            </tr>
            <tr>
              <td width="140" style="padding:6px 0;font-size:13px;color:#78350f;">Adresse</td>
              <td style="padding:6px 0;font-size:14px;color:#0f2c3f;">${params.client_address}</td>
            </tr>
          </table>
        </td></tr>
      </table>
    </td></tr>
    <tr><td style="padding:24px 28px;"><p style="margin:0;font-size:14px;color:#2f4d64;">Bon courage pour l'intervention de demain ! 💪</p></td></tr>
    ${emailFooter()}`;

  await sendGmail(params.client_email, `⏰ Rappel : votre prestation ${params.formule_name} est demain à ${params.booking_time}`, wrapEmail(clientContent));
  await sendGmail(ownerEmail, `⏰ [Rappel] Intervention demain : ${params.client_name} — ${params.booking_time}`, wrapEmail(adminContent));
}

// ═══════════════════════════════════════════════════════════════════════════════
// 3. ANNULATION
// ═══════════════════════════════════════════════════════════════════════════════

export async function sendCancellationEmail(info: {
  client_name: string;
  client_phone: string;
  client_email: string;
  formule: string;
  date: string;
  time: string;
}) {
  const ownerEmail = import.meta.env["VITE_OWNER_EMAIL"] ?? "nettoyagecleanfresh@gmail.com";
  const siteUrl = import.meta.env["VITE_SITE_URL"] ?? "https://www.cleanetfresh.fr";
  const formattedDate = (() => {
    try {
      const d = new Date(info.date);
      return d.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
    } catch { return info.date; }
  })();

  // ── EMAIL CLIENT ────────────────────────────────────────────────────────────
  const clientContent = `
    ${emailHeader("❌ ANNULATION CONFIRMÉE", "#c22a38")}
    <tr><td class="px" style="padding:32px 28px 8px 28px;">
      <h1 style="margin:0 0 10px 0;font-size:22px;font-weight:bold;color:#0f2c3f;">Votre annulation est prise en compte</h1>
      <p style="margin:0;font-size:15px;line-height:24px;color:#2f4d64;">
        Bonjour <strong>${info.client_name}</strong>,<br>
        Nous vous confirmons l'annulation de votre rendez-vous. Voici le récapitulatif.
      </p>
    </td></tr>

    <!-- Détails annulés -->
    <tr><td class="px" style="padding:20px 28px 0 28px;">
      <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color:#fdf2f2;border:1px solid #fca5a5;border-radius:12px;">
        <tr><td style="padding:14px 20px 4px 20px;font-size:11px;font-weight:bold;letter-spacing:1.2px;text-transform:uppercase;color:#991b1b;">❌ Rendez-vous annulé</td></tr>
        <tr><td style="padding:0 20px 16px 20px;">
          <table border="0" cellpadding="0" cellspacing="0" width="100%">
            <tr>
              <td width="140" style="padding:8px 0;border-bottom:1px solid #fca5a5;font-size:13px;color:#991b1b;">Prestation</td>
              <td style="padding:8px 0;border-bottom:1px solid #fca5a5;font-size:14px;color:#0f2c3f;"><strong>${info.formule}</strong></td>
            </tr>
            <tr>
              <td width="140" style="padding:8px 0;border-bottom:1px solid #fca5a5;font-size:13px;color:#991b1b;">Date annulée</td>
              <td style="padding:8px 0;border-bottom:1px solid #fca5a5;font-size:15px;color:#dc2626;"><strong>${formattedDate}</strong></td>
            </tr>
            <tr>
              <td width="140" style="padding:8px 0;font-size:13px;color:#991b1b;">Heure annulée</td>
              <td style="padding:8px 0;font-size:15px;color:#dc2626;"><strong>${info.time}</strong></td>
            </tr>
          </table>
        </td></tr>
      </table>
    </td></tr>

    <!-- Invitation à re-réserver -->
    <tr><td class="px" style="padding:20px 28px 0 28px;">
      <div style="padding:16px 20px;background-color:#f0fdf4;border:1px solid #bbf7d0;border-radius:10px;font-size:14px;line-height:22px;color:#065f46;">
        <strong>Vous souhaitez planifier une nouvelle date ?</strong><br>
        Retrouvez-nous sur notre site pour réserver un nouveau créneau à votre convenance. Nous serons ravis de vous accueillir !
      </div>
    </td></tr>

    <!-- Bouton re-réserver -->
    <tr><td class="px" style="padding:24px 28px 32px 28px;">
      <table border="0" cellpadding="0" cellspacing="0">
        <tr>
          <td bgcolor="#0093cc" style="border-radius:40px;">
            <a href="${siteUrl}/reserver" style="display:block;padding:14px 28px;font-size:14px;font-weight:bold;color:#ffffff;text-decoration:none;">📅 Réserver un nouveau créneau</a>
          </td>
        </tr>
      </table>
      <p style="margin:12px 0 0 0;font-size:12px;color:#6b8ba0;">
        Des questions ? Appelez-nous au <a href="tel:0767127500" style="color:#0093cc;text-decoration:none;">07 67 12 75 00</a>
      </p>
    </td></tr>
    ${emailFooter()}`;

  // ── EMAIL ADMIN ─────────────────────────────────────────────────────────────
  const adminContent = `
    ${emailHeader("❌ ANNULATION REÇUE", "#c22a38")}
    <tr><td class="px" style="padding:28px 28px 8px 28px;">
      <h1 style="margin:0 0 6px 0;font-size:20px;font-weight:bold;color:#0f2c3f;">Un client vient d'annuler son rendez-vous</h1>
      <p style="margin:0;font-size:14px;color:#5b7b8e;">Ce créneau est maintenant libéré dans votre agenda.</p>
    </td></tr>

    <tr><td class="px" style="padding:16px 28px 0 28px;">
      <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color:#fdf2f2;border:1px solid #fca5a5;border-radius:12px;">
        <tr><td style="padding:14px 20px 4px 20px;font-size:11px;font-weight:bold;letter-spacing:1.2px;text-transform:uppercase;color:#991b1b;">❌ Annulation</td></tr>
        <tr><td style="padding:0 20px 14px 20px;">
          <table border="0" cellpadding="0" cellspacing="0" width="100%">
            <tr>
              <td width="140" style="padding:6px 0;border-bottom:1px solid #fca5a5;font-size:13px;color:#991b1b;">Client</td>
              <td style="padding:6px 0;border-bottom:1px solid #fca5a5;font-size:14px;color:#0f2c3f;"><strong>${info.client_name}</strong></td>
            </tr>
            <tr>
              <td width="140" style="padding:6px 0;border-bottom:1px solid #fca5a5;font-size:13px;color:#991b1b;">Téléphone</td>
              <td style="padding:6px 0;border-bottom:1px solid #fca5a5;font-size:14px;"><a href="tel:${info.client_phone.replace(/\s/g,'')}" style="color:#0093cc;text-decoration:none;">${info.client_phone}</a></td>
            </tr>
            <tr>
              <td width="140" style="padding:6px 0;border-bottom:1px solid #fca5a5;font-size:13px;color:#991b1b;">Email</td>
              <td style="padding:6px 0;border-bottom:1px solid #fca5a5;font-size:14px;"><a href="mailto:${info.client_email}" style="color:#0093cc;text-decoration:none;">${info.client_email}</a></td>
            </tr>
            <tr>
              <td width="140" style="padding:6px 0;border-bottom:1px solid #fca5a5;font-size:13px;color:#991b1b;">Prestation</td>
              <td style="padding:6px 0;border-bottom:1px solid #fca5a5;font-size:14px;color:#0f2c3f;">${info.formule}</td>
            </tr>
            <tr>
              <td width="140" style="padding:6px 0;border-bottom:1px solid #fca5a5;font-size:13px;color:#991b1b;">Date libérée</td>
              <td style="padding:6px 0;border-bottom:1px solid #fca5a5;font-size:15px;color:#dc2626;"><strong>${formattedDate}</strong></td>
            </tr>
            <tr>
              <td width="140" style="padding:6px 0;font-size:13px;color:#991b1b;">Heure libérée</td>
              <td style="padding:6px 0;font-size:15px;color:#dc2626;"><strong>${info.time}</strong></td>
            </tr>
          </table>
        </td></tr>
      </table>
    </td></tr>
    <tr><td style="padding:20px 28px 28px 28px;"><p style="margin:0;font-size:13px;color:#5b7b8e;">Ce créneau est maintenant disponible dans votre agenda Google Calendar.</p></td></tr>
    ${emailFooter()}`;

  await sendGmail(info.client_email, `❌ Annulation confirmée — ${info.formule} du ${formattedDate}`, wrapEmail(clientContent));
  await sendGmail(ownerEmail, `❌ [Annulation] ${info.client_name} — ${formattedDate} à ${info.time}`, wrapEmail(adminContent));
}

// ═══════════════════════════════════════════════════════════════════════════════
// 4. REPROGRAMMATION
// ═══════════════════════════════════════════════════════════════════════════════

export async function sendRescheduleEmail(info: {
  client_name: string;
  client_email: string;
  formule: string;
  new_date: string;
  new_time: string;
  cancel_url: string;
}) {
  const ownerEmail = import.meta.env["VITE_OWNER_EMAIL"] ?? "nettoyagecleanfresh@gmail.com";
  const formattedDate = (() => {
    try {
      const d = new Date(info.new_date);
      return d.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
    } catch { return info.new_date; }
  })();

  const html = wrapEmail(`
    ${emailHeader("📅 RENDEZ-VOUS REPROGRAMMÉ", "#00b8ff")}
    <tr><td class="px" style="padding:32px 28px 8px 28px;">
      <h1 style="margin:0 0 10px 0;font-size:22px;font-weight:bold;color:#0f2c3f;">Rendez-vous reprogrammé avec succès !</h1>
      <p style="margin:0;font-size:15px;line-height:24px;color:#2f4d64;">
        Bonjour <strong>${info.client_name}</strong>,<br>
        Nous vous confirmons que votre prestation <strong>${info.formule}</strong> a bien été reprogrammée à une nouvelle date.
      </p>
    </td></tr>

    <!-- Nouvelle date -->
    <tr><td class="px" style="padding:20px 28px 0 28px;">
      <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color:#f0f9ff;border:1px solid #bae6fd;border-radius:12px;">
        <tr><td style="padding:14px 20px 4px 20px;font-size:11px;font-weight:bold;letter-spacing:1.2px;text-transform:uppercase;color:#0369a1;">📅 Nouveau rendez-vous</td></tr>
        <tr><td style="padding:0 20px 16px 20px;">
          <table border="0" cellpadding="0" cellspacing="0" width="100%">
            <tr>
              <td width="140" style="padding:8px 0;border-bottom:1px solid #bae6fd;font-size:13px;color:#0369a1;">Prestation</td>
              <td style="padding:8px 0;border-bottom:1px solid #bae6fd;font-size:14px;color:#0f2c3f;"><strong>${info.formule}</strong></td>
            </tr>
            <tr>
              <td width="140" style="padding:8px 0;border-bottom:1px solid #bae6fd;font-size:13px;color:#0369a1;">Nouvelle date</td>
              <td style="padding:8px 0;border-bottom:1px solid #bae6fd;font-size:15px;color:#0f2c3f;"><strong>${formattedDate}</strong></td>
            </tr>
            <tr>
              <td width="140" style="padding:8px 0;font-size:13px;color:#0369a1;">Nouvelle heure</td>
              <td style="padding:8px 0;font-size:15px;color:#0093cc;"><strong>${info.new_time}</strong></td>
            </tr>
          </table>
        </td></tr>
      </table>
    </td></tr>

    <!-- Action -->
    <tr><td class="px" style="padding:24px 28px 32px 28px;">
      <p style="margin:0 0 16px 0;font-size:14px;line-height:22px;color:#2f4d64;">
        Si vous avez encore un imprévu, vous pouvez de nouveau reprogrammer ou annuler depuis le lien ci-dessous.
      </p>
      <table border="0" cellpadding="0" cellspacing="0">
        <tr>
          <td bgcolor="#ffffff" style="border:1px solid #bae6fd;border-radius:40px;">
            <a href="${info.cancel_url}" style="display:block;padding:12px 24px;font-size:13px;font-weight:bold;color:#0369a1;text-decoration:none;">📅 Gérer mon rendez-vous</a>
          </td>
        </tr>
      </table>
    </td></tr>
    ${emailFooter()}`);

  const adminHtml = wrapEmail(`
    ${emailHeader("📅 REPROGRAMMATION", "#00b8ff")}
    <tr><td class="px" style="padding:28px 28px 8px 28px;">
      <h1 style="margin:0 0 6px 0;font-size:20px;font-weight:bold;color:#0f2c3f;">Un client a reprogrammé son rendez-vous</h1>
    </td></tr>
    <tr><td class="px" style="padding:16px 28px 28px 28px;">
      <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color:#f0f9ff;border:1px solid #bae6fd;border-radius:12px;">
        <tr><td style="padding:14px 20px 4px 20px;font-size:11px;font-weight:bold;letter-spacing:1.2px;text-transform:uppercase;color:#0369a1;">📅 Détails</td></tr>
        <tr><td style="padding:0 20px 14px 20px;">
          <table border="0" cellpadding="0" cellspacing="0" width="100%">
            <tr><td width="140" style="padding:6px 0;border-bottom:1px solid #bae6fd;font-size:13px;color:#0369a1;">Client</td><td style="padding:6px 0;border-bottom:1px solid #bae6fd;font-size:14px;color:#0f2c3f;"><strong>${info.client_name}</strong></td></tr>
            <tr><td width="140" style="padding:6px 0;border-bottom:1px solid #bae6fd;font-size:13px;color:#0369a1;">Email</td><td style="padding:6px 0;border-bottom:1px solid #bae6fd;font-size:14px;"><a href="mailto:${info.client_email}" style="color:#0093cc;text-decoration:none;">${info.client_email}</a></td></tr>
            <tr><td width="140" style="padding:6px 0;border-bottom:1px solid #bae6fd;font-size:13px;color:#0369a1;">Prestation</td><td style="padding:6px 0;border-bottom:1px solid #bae6fd;font-size:14px;color:#0f2c3f;">${info.formule}</td></tr>
            <tr><td width="140" style="padding:6px 0;border-bottom:1px solid #bae6fd;font-size:13px;color:#0369a1;">Nouvelle date</td><td style="padding:6px 0;border-bottom:1px solid #bae6fd;font-size:15px;color:#0f2c3f;"><strong>${formattedDate}</strong></td></tr>
            <tr><td width="140" style="padding:6px 0;font-size:13px;color:#0369a1;">Nouvelle heure</td><td style="padding:6px 0;font-size:15px;color:#0093cc;"><strong>${info.new_time}</strong></td></tr>
          </table>
        </td></tr>
      </table>
    </td></tr>
    ${emailFooter()}`);

  await sendGmail(info.client_email, `📅 Rendez-vous reprogrammé : ${info.formule} — ${formattedDate}`, html);
  await sendGmail(ownerEmail, `📅 [Reprog] ${info.client_name} → ${formattedDate} à ${info.new_time}`, adminHtml);
}

// ═══════════════════════════════════════════════════════════════════════════════
// 5. FORMULAIRE DE CONTACT
// ═══════════════════════════════════════════════════════════════════════════════

export async function sendContactMessage(c: ContactPayload) {
  const ownerEmail = import.meta.env["VITE_OWNER_EMAIL"] ?? "nettoyagecleanfresh@gmail.com";
  const html = wrapEmail(`
    ${emailHeader("💬 NOUVEAU MESSAGE", "#0093cc")}
    <tr><td class="px" style="padding:28px 28px 8px 28px;">
      <h1 style="margin:0 0 6px 0;font-size:20px;font-weight:bold;color:#0f2c3f;">Nouveau message via le formulaire de contact</h1>
    </td></tr>
    <tr><td class="px" style="padding:16px 28px 0 28px;">
      <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color:#f6faff;border:1px solid #dce7f2;border-radius:12px;">
        <tr><td style="padding:14px 20px 4px 20px;font-size:11px;font-weight:bold;letter-spacing:1.2px;text-transform:uppercase;color:#3b6a7c;">👤 Expéditeur</td></tr>
        <tr><td style="padding:0 20px 14px 20px;">
          <table border="0" cellpadding="0" cellspacing="0" width="100%">
            <tr><td width="140" style="padding:6px 0;border-bottom:1px solid #e7eef6;font-size:13px;color:#5b7b8e;">Nom</td><td style="padding:6px 0;border-bottom:1px solid #e7eef6;font-size:14px;color:#0f2c3f;"><strong>${c.nom}</strong></td></tr>
            <tr><td width="140" style="padding:6px 0;border-bottom:1px solid #e7eef6;font-size:13px;color:#5b7b8e;">Téléphone</td><td style="padding:6px 0;border-bottom:1px solid #e7eef6;font-size:14px;"><a href="tel:${c.telephone.replace(/\s/g,'')}" style="color:#0093cc;text-decoration:none;">${c.telephone}</a></td></tr>
            <tr><td width="140" style="padding:6px 0;border-bottom:1px solid #e7eef6;font-size:13px;color:#5b7b8e;">Email</td><td style="padding:6px 0;border-bottom:1px solid #e7eef6;font-size:14px;"><a href="mailto:${c.email}" style="color:#0093cc;text-decoration:none;">${c.email}</a></td></tr>
            <tr><td width="140" style="padding:6px 0;font-size:13px;color:#5b7b8e;">Service</td><td style="padding:6px 0;font-size:14px;color:#0f2c3f;">${c.service}</td></tr>
          </table>
        </td></tr>
      </table>
    </td></tr>
    <tr><td class="px" style="padding:14px 28px 28px 28px;">
      <div style="padding:16px 20px;background-color:#f6faff;border-left:3px solid #00b8ff;border-radius:6px;font-size:14px;line-height:22px;color:#1e3f55;">
        <strong>Message :</strong><br><br>
        ${c.message.replace(/\n/g, "<br>")}
      </div>
      <p style="margin:14px 0 0 0;font-size:13px;color:#5b7b8e;">
        Répondez directement à cet email ou appelez : <a href="tel:${c.telephone.replace(/\s/g,'')}" style="color:#0093cc;">${c.telephone}</a>
      </p>
    </td></tr>
    ${emailFooter()}`);

  await sendGmail(ownerEmail, `💬 [Contact] ${c.nom} — ${c.service}`, html);
}
