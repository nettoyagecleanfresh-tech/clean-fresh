/**
 * EmailService — Tous les emails envoyés via Nodemailer (Gmail)
 * 100% gratuit — 500 emails/jour — aucun service tiers
 *
 * Variables d'environnement requises :
 *   VITE_GMAIL_USER          — nettoyagecleanfresh@gmail.com
 *   VITE_GMAIL_APP_PASSWORD  — mot de passe d'application Google (16 lettres)
 */

import { sendNodemailerServerFn } from "@/lib/nodemailerServerFn";

// ─── Tips par service ────────────────────────────────────────────────────────

const SERVICE_TIP: Record<string, string> = {
  auto: "🚗 Pensez à vider un maximum de vos effets personnels du véhicule avant notre passage. Cela nous permettra de nettoyer chaque recoin efficacement.",
  canape:
    "🛋️ Si votre canapé présente des tâches importantes (vin, sang, encre…), notre technicien pourra vous proposer un traitement détachage intensif sur place (+19 € selon l'intensité).",
  matelas:
    "🛏️ Si votre matelas présente des auréoles ou tâches prononcées, notre technicien pourra vous proposer un traitement intensif sur place (+19 € selon l'intensité).",
  tapis: "",
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

// ─── Helper: envoi via Nodemailer ────────────────────────────────────────────

async function sendGmail(to: string, subject: string, html: string) {
  await sendNodemailerServerFn({ data: { to, subject, html } }).catch(console.error);
}

// ─── Helper: générer items HTML pour le recap commande ───────────────────────

function buildItemsHtml(items: BookingPayload["items"]): string {
  return items.map(item => {
    let html = `
    <tr>
      <td width="70%" style="padding:12px 8px 4px 20px; font-family:Helvetica, Arial, sans-serif; font-size:15px; color:#0f2c3f; vertical-align:top;">
        <strong>${item.formule_name}</strong>
      </td>
      <td width="30%" align="right" style="padding:12px 20px 4px 8px; font-family:Helvetica, Arial, sans-serif; font-size:15px; color:#0f2c3f; vertical-align:top;">
        <strong>${item.formule_price} &euro;</strong>
      </td>
    </tr>`;
    item.options.forEach(opt => {
      html += `
      <tr>
        <td width="70%" style="padding:2px 8px 2px 30px; font-family:Helvetica, Arial, sans-serif; font-size:13px; color:#5b7b8e; vertical-align:top;">
          + ${opt.name}
        </td>
        <td width="30%" align="right" style="padding:2px 20px 2px 8px; font-family:Helvetica, Arial, sans-serif; font-size:13px; color:#5b7b8e; vertical-align:top;">
          +${opt.price} &euro;
        </td>
      </tr>`;
    });
    return html;
  }).join("");
}

// ─── Email de confirmation de réservation (client) ───────────────────────────

export async function sendBookingEmails(b: BookingPayload): Promise<string> {
  const ownerPhone = import.meta.env["VITE_OWNER_PHONE"] ?? "07 67 12 75 00";
  const ownerEmail = import.meta.env["VITE_OWNER_EMAIL"] ?? "nettoyagecleanfresh@gmail.com";
  const fullAddress = `${b.client_street}, ${b.client_zip} ${b.client_city}`;
  const tip = b.items.map(i => SERVICE_TIP[i.service_id]).filter(Boolean).join("\n\n") || "";
  const itemsHtml = buildItemsHtml(b.items);
  const orderNumber = Math.floor(Math.random() * 90000) + 10000;
  const firstService = b.items[0];
  const formuleName = b.items.length > 1
    ? `${firstService.formule_name} + ${b.items.length - 1} autre(s)`
    : firstService.formule_name;
  const duration = b.estimated_duration ?? `${Math.ceil(b.total_price / 40) * 30} min environ`;

  // ── Email CLIENT ──────────────────────────────────────────────────────────
  const clientHtml = `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Confirmation de votre demande — Clean&amp;Fresh</title>
  <style>
    img { max-width: 100% !important; height: auto !important; }
    table { border-collapse: collapse; }
    @media only screen and (max-width: 620px) {
      .container { width: 100% !important; }
      .px { padding-left: 16px !important; padding-right: 16px !important; }
    }
  </style>
</head>
<body style="margin:0; padding:0; background-color:#eef4f9;">
<table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color:#eef4f9;">
<tr><td align="center" style="padding:32px 12px;">
  <table role="presentation" class="container" border="0" cellpadding="0" cellspacing="0" width="100%" style="width:100%; max-width:600px; background-color:#ffffff; border:1px solid #d7e3ee; border-radius:14px; overflow:hidden; font-family:Helvetica, Arial, sans-serif;">

    <!-- En-tête -->
    <tr>
      <td style="background-color:#00b8ff; padding:22px 28px; border-bottom:3px solid #0093cc;">
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
          <tr>
            <td width="60%" align="left" style="vertical-align:middle;">
              <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                <tr>
                  <td bgcolor="#ffffff" style="border-radius:8px; padding:5px 10px;">
                    <img src="https://www.cleanetfresh.fr/logo.png" width="110" alt="Clean&amp;Fresh" style="display:block; width:110px; height:auto; border:0;">
                  </td>
                </tr>
              </table>
            </td>
            <td width="40%" align="right" style="vertical-align:middle;">
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" align="right">
                <tr>
                  <td bgcolor="#ffffff" style="border-radius:30px; padding:7px 15px; font-family:Helvetica, Arial, sans-serif; font-size:11px; font-weight:bold; letter-spacing:0.6px; color:#0093cc; white-space:nowrap;">DEMANDE CONFIRM&Eacute;E</td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <!-- Corps -->
    <tr>
      <td class="px" style="padding:32px 28px 8px 28px;">
        <h1 style="margin:0 0 10px 0; font-size:23px; font-weight:bold; color:#0f2c3f;">Bonjour ${b.client_name},</h1>
        <p style="margin:0; font-size:15px; line-height:24px; color:#2f4d64;">
          Nous vous confirmons que votre demande pour la prestation <strong style="color:#0f2c3f;">${formuleName}</strong> a bien été prise en compte. Voici le récapitulatif de votre commande&nbsp;<strong style="color:#0f2c3f;">n°${orderNumber}</strong>.
        </p>
      </td>
    </tr>

    <!-- Détails intervention -->
    <tr>
      <td class="px" style="padding:24px 28px 0 28px;">
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color:#f6faff; border:1px solid #dce7f2; border-radius:12px;">
          <tr><td style="padding:18px 20px 4px 20px; font-size:11px; font-weight:bold; letter-spacing:1.2px; text-transform:uppercase; color:#3b6a7c;">Détails de l'intervention</td></tr>
          <tr>
            <td style="padding:0 20px 18px 20px;">
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td width="150" style="padding:10px 0; border-bottom:1px solid #e7eef6; font-size:13px; color:#5b7b8e;">Date et heure</td>
                  <td style="padding:10px 0; border-bottom:1px solid #e7eef6; font-size:15px; color:#0f2c3f;"><strong>${b.booking_date} à ${b.booking_time}</strong></td>
                </tr>
                <tr>
                  <td width="150" style="padding:10px 0; border-bottom:1px solid #e7eef6; font-size:13px; color:#5b7b8e;">Durée estimée</td>
                  <td style="padding:10px 0; border-bottom:1px solid #e7eef6; font-size:14px; color:#0f2c3f;">${duration}</td>
                </tr>
                <tr>
                  <td width="150" style="padding:10px 0; border-bottom:1px solid #e7eef6; font-size:13px; color:#5b7b8e;">Lieu d'intervention</td>
                  <td style="padding:10px 0; border-bottom:1px solid #e7eef6; font-size:14px; color:#0f2c3f;">${fullAddress}</td>
                </tr>
                <tr>
                  <td width="150" style="padding:10px 0 0 0; font-size:13px; color:#5b7b8e;">Contact</td>
                  <td style="padding:10px 0 0 0; font-size:14px; color:#0f2c3f;">${b.client_phone}</td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <!-- Récap commande -->
    <tr>
      <td class="px" style="padding:16px 28px 0 28px;">
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="border:1px solid #dce7f2; border-radius:12px;">
          <tr><td colspan="2" style="padding:18px 20px 12px 20px; font-size:11px; font-weight:bold; letter-spacing:1.2px; text-transform:uppercase; color:#3b6a7c;">Récapitulatif de la commande</td></tr>
          ${itemsHtml}
          <tr><td colspan="2" style="padding:12px 20px 0 20px;"><div style="height:1px; background-color:#e7eef6; line-height:1px; font-size:0;">&nbsp;</div></td></tr>
          <tr>
            <td width="70%" style="padding:16px 8px 16px 20px; border-top:1px solid #dce7f2; font-size:14px; color:#0f2c3f; background-color:#f6faff;"><strong>Montant total estimé</strong></td>
            <td width="30%" align="right" style="padding:16px 20px 16px 8px; border-top:1px solid #dce7f2; font-size:20px; color:#0093cc; background-color:#f6faff;"><strong>${b.total_price} &euro;</strong></td>
          </tr>
          <tr><td colspan="2" style="padding:0 20px 16px 20px; font-size:11px; color:#6b8ba0; background-color:#f6faff;">Paiement après l'intervention. Montant susceptible d'évoluer si l'état du bien diffère des informations transmises.</td></tr>
        </table>
      </td>
    </tr>

    ${tip ? `
    <!-- Conseil -->
    <tr>
      <td class="px" style="padding:26px 28px 0 28px;">
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
          <tr>
            <td style="padding:14px 18px; background-color:#f6faff; border-left:3px solid #00b8ff; border-radius:6px; font-size:14px; line-height:22px; color:#1e3f55; font-style:italic;">${tip}</td>
          </tr>
        </table>
      </td>
    </tr>` : ""}

    <!-- Action annulation -->
    <tr>
      <td class="px" style="padding:26px 28px 32px 28px;">
        <table role="presentation" border="0" cellpadding="0" cellspacing="0">
          <tr>
            <td bgcolor="#ffffff" style="border:1px solid #e0a8ae; border-radius:40px;">
              <a href="${b.cancel_url}" style="display:block; padding:12px 24px; font-family:Helvetica, Arial, sans-serif; font-size:13px; font-weight:bold; color:#c22a38; text-decoration:none;">Gérer mon rendez-vous</a>
            </td>
          </tr>
        </table>
        <p style="margin:12px 0 0 0; font-size:12px; line-height:19px; color:#6b8ba0;">En cas d'imprévu, vous pouvez reprogrammer ou annuler depuis ce bouton.</p>
      </td>
    </tr>

    <!-- Pied -->
    <tr>
      <td style="background-color:#f6faff; padding:22px 28px; border-top:1px solid #dce7f2; text-align:center; font-size:13px; line-height:21px; color:#12364d;">
        À très bientôt,<br>
        <strong style="color:#0093cc;">L'équipe Clean&amp;Fresh</strong><br>
        <span style="font-size:12px; color:#527a92;">Toulouse et Haute-Garonne</span><br>
        <span style="font-size:12px; color:#527a92;"><a href="https://www.cleanetfresh.fr" style="color:#0093cc; text-decoration:none;">cleanetfresh.fr</a></span>
      </td>
    </tr>
  </table>
</td></tr>
</table>
</body>
</html>`;

  // ── Email PROPRIÉTAIRE (version simplifiée) ────────────────────────────────
  const ownerHtml = `<!DOCTYPE html>
<html lang="fr">
<head><meta charset="utf-8"><title>Nouvelle réservation</title></head>
<body style="margin:0; padding:20px; background:#f0f4f8; font-family:Helvetica,Arial,sans-serif;">
  <div style="max-width:560px; margin:0 auto; background:#fff; border-radius:12px; overflow:hidden; border:1px solid #d7e3ee;">
    <div style="background:#0093cc; padding:20px 24px;">
      <h1 style="margin:0; color:#fff; font-size:20px;">🆕 Nouvelle réservation</h1>
    </div>
    <div style="padding:24px;">
      <table width="100%" style="font-size:14px; color:#1e3f55; border-collapse:collapse;">
        <tr><td style="padding:6px 0; color:#5b7b8e; width:140px;">Client</td><td style="padding:6px 0;"><strong>${b.client_name}</strong></td></tr>
        <tr><td style="padding:6px 0; color:#5b7b8e;">Téléphone</td><td style="padding:6px 0;">${b.client_phone}</td></tr>
        <tr><td style="padding:6px 0; color:#5b7b8e;">Email</td><td style="padding:6px 0;">${b.client_email}</td></tr>
        <tr><td style="padding:6px 0; color:#5b7b8e;">Adresse</td><td style="padding:6px 0;">${fullAddress}</td></tr>
        <tr><td colspan="2" style="padding:12px 0 4px;"><hr style="border:none; border-top:1px solid #e7eef6;"></td></tr>
        <tr><td style="padding:6px 0; color:#5b7b8e;">Prestation</td><td style="padding:6px 0;"><strong>${formuleName}</strong></td></tr>
        <tr><td style="padding:6px 0; color:#5b7b8e;">Date</td><td style="padding:6px 0;"><strong style="color:#0093cc;">${b.booking_date} à ${b.booking_time}</strong></td></tr>
        <tr><td style="padding:6px 0; color:#5b7b8e;">Total</td><td style="padding:6px 0;"><strong style="color:#0093cc;">${b.total_price} €</strong></td></tr>
      </table>
      ${itemsHtml ? `<div style="margin-top:16px; padding:14px; background:#f6faff; border-radius:8px; font-size:13px; color:#2f4d64;"><table width="100%">${itemsHtml}</table></div>` : ""}
    </div>
  </div>
</body>
</html>`;

  await sendGmail(b.client_email, `✅ Confirmation de votre réservation — ${formuleName}`, clientHtml);
  await sendGmail(ownerEmail, `[PRO] Nouvelle réservation : ${b.client_name} — ${b.booking_date}`, ownerHtml);

  return "";
}

// ─── Email d'annulation (propriétaire) ──────────────────────────────────────

export async function sendCancellationEmail(info: {
  client_name: string;
  client_phone: string;
  client_email: string;
  formule: string;
  date: string;
  time: string;
}) {
  const ownerEmail = import.meta.env["VITE_OWNER_EMAIL"] ?? "nettoyagecleanfresh@gmail.com";
  const html = `<!DOCTYPE html>
<html lang="fr">
<head><meta charset="utf-8"><title>Annulation</title></head>
<body style="margin:0; padding:20px; background:#f0f4f8; font-family:Helvetica,Arial,sans-serif;">
  <div style="max-width:560px; margin:0 auto; background:#fff; border-radius:12px; overflow:hidden; border:1px solid #f0c0c5;">
    <div style="background:#c22a38; padding:20px 24px;">
      <h1 style="margin:0; color:#fff; font-size:20px;">❌ Annulation de rendez-vous</h1>
    </div>
    <div style="padding:24px;">
      <table width="100%" style="font-size:14px; color:#1e3f55; border-collapse:collapse;">
        <tr><td style="padding:6px 0; color:#5b7b8e; width:140px;">Client</td><td style="padding:6px 0;"><strong>${info.client_name}</strong></td></tr>
        <tr><td style="padding:6px 0; color:#5b7b8e;">Téléphone</td><td style="padding:6px 0;">${info.client_phone}</td></tr>
        <tr><td style="padding:6px 0; color:#5b7b8e;">Email</td><td style="padding:6px 0;">${info.client_email}</td></tr>
        <tr><td style="padding:6px 0; color:#5b7b8e;">Prestation</td><td style="padding:6px 0;">${info.formule}</td></tr>
        <tr><td style="padding:6px 0; color:#5b7b8e;">Date annulée</td><td style="padding:6px 0;"><strong style="color:#c22a38;">${info.date} à ${info.time}</strong></td></tr>
      </table>
    </div>
  </div>
</body>
</html>`;

  await sendGmail(ownerEmail, `[PRO] ❌ Annulation : ${info.client_name} — ${info.date}`, html);
}

// ─── Email de rappel 24h (client) ────────────────────────────────────────────

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
  const html = `<!DOCTYPE html>
<html lang="fr">
<head><meta charset="utf-8"><title>Rappel rendez-vous</title></head>
<body style="margin:0; padding:20px; background:#eef4f9; font-family:Helvetica,Arial,sans-serif;">
  <div style="max-width:560px; margin:0 auto; background:#fff; border-radius:12px; overflow:hidden; border:1px solid #d7e3ee;">
    <div style="background:#00b8ff; padding:20px 24px; text-align:center;">
      <h1 style="margin:0; color:#fff; font-size:20px;">⏰ Rappel — Votre rendez-vous demain</h1>
    </div>
    <div style="padding:24px;">
      <p style="font-size:16px; color:#0f2c3f;">Bonjour <strong>${params.client_name}</strong>,</p>
      <p style="font-size:15px; color:#2f4d64; line-height:1.6;">
        Nous vous rappelons votre prestation <strong>${params.formule_name}</strong> prévue demain :
      </p>
      <div style="background:#f6faff; border:1px solid #dce7f2; border-radius:10px; padding:18px; margin:16px 0;">
        <table width="100%" style="font-size:14px; color:#1e3f55; border-collapse:collapse;">
          <tr><td style="padding:4px 0; color:#5b7b8e; width:120px;">Date</td><td><strong style="color:#0093cc;">${params.booking_date} à ${params.booking_time}</strong></td></tr>
          <tr><td style="padding:4px 0; color:#5b7b8e;">Adresse</td><td>${params.client_address}</td></tr>
        </table>
      </div>
      <div style="text-align:center; margin:24px 0 8px;">
        <a href="${params.cancel_url}" style="display:inline-block; padding:12px 24px; background:#f1f5f9; color:#64748b; border-radius:40px; font-weight:bold; font-size:13px; text-decoration:none;">Gérer mon rendez-vous</a>
      </div>
    </div>
    <div style="background:#f6faff; padding:18px 24px; border-top:1px solid #dce7f2; text-align:center; font-size:13px; color:#12364d;">
      À demain,<br><strong style="color:#0093cc;">L'équipe Clean&amp;Fresh</strong>
    </div>
  </div>
</body>
</html>`;

  await sendGmail(params.client_email, `⏰ Rappel : votre prestation ${params.formule_name} est demain`, html);
}

// ─── Email de contact (formulaire) ──────────────────────────────────────────

export async function sendContactMessage(c: ContactPayload) {
  const ownerEmail = import.meta.env["VITE_OWNER_EMAIL"] ?? "nettoyagecleanfresh@gmail.com";
  const html = `<!DOCTYPE html>
<html lang="fr">
<head><meta charset="utf-8"><title>Nouveau message</title></head>
<body style="margin:0; padding:20px; background:#f0f4f8; font-family:Helvetica,Arial,sans-serif;">
  <div style="max-width:560px; margin:0 auto; background:#fff; border-radius:12px; overflow:hidden; border:1px solid #d7e3ee;">
    <div style="background:#0093cc; padding:20px 24px;">
      <h1 style="margin:0; color:#fff; font-size:20px;">💬 Nouveau message de contact</h1>
    </div>
    <div style="padding:24px;">
      <table width="100%" style="font-size:14px; color:#1e3f55; border-collapse:collapse;">
        <tr><td style="padding:6px 0; color:#5b7b8e; width:120px;">Nom</td><td><strong>${c.nom}</strong></td></tr>
        <tr><td style="padding:6px 0; color:#5b7b8e;">Téléphone</td><td>${c.telephone}</td></tr>
        <tr><td style="padding:6px 0; color:#5b7b8e;">Email</td><td>${c.email}</td></tr>
        <tr><td style="padding:6px 0; color:#5b7b8e;">Service</td><td>${c.service}</td></tr>
      </table>
      <div style="margin-top:16px; padding:14px; background:#f6faff; border-left:3px solid #00b8ff; border-radius:4px; font-size:14px; color:#2f4d64; line-height:1.6;">
        ${c.message.replace(/\n/g, "<br>")}
      </div>
    </div>
  </div>
</body>
</html>`;

  await sendGmail(ownerEmail, `💬 Nouveau contact : ${c.nom} — ${c.service}`, html);
}

// ─── Email de reprogrammation ────────────────────────────────────────────────

export async function sendRescheduleEmail(info: {
  client_name: string;
  client_email: string;
  formule: string;
  new_date: string;
  new_time: string;
  cancel_url: string;
}) {
  const ownerEmail = import.meta.env["VITE_OWNER_EMAIL"] ?? "nettoyagecleanfresh@gmail.com";

  const html = `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Votre rendez-vous a été reprogrammé</title>
</head>
<body style="margin:0; padding:0; background-color:#f6faff;">
  <div style="background-color:#ffffff; max-width:600px; margin:20px auto; border-radius:12px; font-family:Helvetica, Arial, sans-serif; box-shadow:0 4px 20px rgba(0,0,0,0.05); overflow:hidden;">
    <div style="background-color:#00b8ff; padding:40px 20px; text-align:center;">
      <h1 style="color:#ffffff; font-size:24px; margin:0;">Rendez-vous reprogrammé ! 📅</h1>
      <p style="color:rgba(255,255,255,0.9); font-size:16px; margin:10px 0 0 0;">Votre nouvelle date a bien été prise en compte.</p>
    </div>
    <div style="padding:40px 30px;">
      <p style="margin:0 0 20px 0; font-size:16px; color:#1e3f55; line-height:1.5;">Bonjour <strong>${info.client_name}</strong>,</p>
      <p style="margin:0 0 30px 0; font-size:16px; color:#1e3f55; line-height:1.5;">
        Nous vous confirmons que votre prestation <strong>${info.formule}</strong> a bien été reprogrammée.
      </p>
      <div style="background-color:#f8fafc; border:1px solid #e2e8f0; border-radius:8px; padding:20px; margin-bottom:30px;">
        <h2 style="margin:0 0 15px 0; font-size:14px; text-transform:uppercase; color:#64748b; letter-spacing:1px;">Nouveau rendez-vous</h2>
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="font-size:15px; color:#1e3f55;">
          <tr>
            <td style="padding-bottom:10px; width:40%;"><strong>Date :</strong></td>
            <td style="padding-bottom:10px; color:#00b8ff; font-weight:bold;">${info.new_date}</td>
          </tr>
          <tr>
            <td><strong>Heure d'arrivée :</strong></td>
            <td style="color:#00b8ff; font-weight:bold;">${info.new_time}</td>
          </tr>
        </table>
      </div>
      <div style="text-align:center;">
        <a href="${info.cancel_url}" style="display:inline-block; padding:12px 24px; background-color:#f1f5f9; color:#64748b; text-decoration:none; border-radius:6px; font-weight:bold; font-size:14px;">Gérer mon rendez-vous</a>
      </div>
    </div>
    <div style="background:#f6faff; padding:18px 24px; border-top:1px solid #dce7f2; text-align:center; font-size:13px; color:#12364d;">
      À très bientôt,<br><strong style="color:#0093cc;">L'équipe Clean&amp;Fresh</strong>
    </div>
  </div>
</body>
</html>`;

  await sendGmail(info.client_email, `Rendez-vous reprogrammé : ${info.formule}`, html);
  await sendGmail(ownerEmail, `[PRO] Reprogrammation : ${info.client_name} → ${info.new_date}`, html);
}
