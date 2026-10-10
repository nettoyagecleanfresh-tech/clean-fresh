import nodemailer from "nodemailer";
import { EMAIL_LOGO_BASE64 } from "./emailLogo.js";

type MailResult = {
  success: boolean;
  messageId?: string;
  error?: string;
};

function htmlToText(html: string): string {
  return html
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<a\b[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi, "$2 ($1)")
    .replace(/<br\s*[/]?>/gi, "\n")
    .replace(/<\/p>/gi, "\n\n")
    .replace(/<\/tr>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&euro;/g, "€")
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export async function sendQuoteMail({ to, subject, html, attachment, clientEmail }: { to: string; subject: string; html: string; attachment?: Buffer; clientEmail: string }): Promise<MailResult> {
  const recipient = to.trim().toLowerCase();
  const text = htmlToText(html);
  const hasLogo = /https:\/\/(?:www\.)?cleanetfresh\.fr\/logo-email\.png/.test(html);
  if (hasLogo) html = html.replace(/https:\/\/(?:www\.)?cleanetfresh\.fr\/logo-email\.png/g, "cid:cleanfresh-logo");
  const resendApiKey = process.env.RESEND_API_KEY;
  const resendDomain = process.env.RESEND_EMAIL_DOMAIN ?? "cleanetfresh.fr";
  const gmailUser = process.env.GMAIL_USER ?? process.env.VITE_GMAIL_USER;
  const gmailPass = process.env.GMAIL_APP_PASSWORD ?? process.env.VITE_GMAIL_APP_PASSWORD;
  const replyTo = clientEmail;
  let resendError: string | undefined;

  if (resendApiKey) {
    try {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: `Clean&Fresh Toulouse <reservations@${resendDomain}>`,
          reply_to: replyTo,
          to: [recipient],
          subject,
          html,
          text,
          attachments: [...(hasLogo ? [{ filename: "logo-cleanfresh.png", content: EMAIL_LOGO_BASE64, content_id: "cleanfresh-logo", content_type: "image/png" }] : []), ...(attachment ? [{ filename: "photos-demande-devis.pdf", content: attachment.toString("base64"), content_type: "application/pdf" }] : [])],
          headers: { "X-Auto-Response-Suppress": "OOF, AutoReply" },
        }),
      });

      const result = (await response.json()) as { id?: string; message?: string };
      if (response.ok && result.id) {
        console.log("[Resend] Email accepté", { messageId: result.id, recipient });
        return { success: true, messageId: result.id };
      }

      resendError = result.message ?? `Erreur Resend ${response.status}`;
      console.error("[Resend] Échec, bascule vers Gmail :", resendError);
    } catch (err) {
      resendError = err instanceof Error ? err.message : String(err);
      console.error("[Resend] Erreur, bascule vers Gmail :", resendError);
    }
  }

  if (!gmailUser || !gmailPass) {
    return { success: false, error: resendError ?? "Configuration d'envoi manquante" };
  }

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: { user: gmailUser, pass: gmailPass },
    tls: { minVersion: "TLSv1.2" },
  });

  try {
    const info = await transporter.sendMail({
      from: { name: "Clean&Fresh Toulouse", address: gmailUser },
      replyTo: clientEmail,
      envelope: { from: gmailUser, to: recipient },
      to: recipient,
      subject,
      html,
      text,
      attachments: [...(hasLogo ? [{ filename: "logo-cleanfresh.png", content: Buffer.from(EMAIL_LOGO_BASE64, "base64"), cid: "cleanfresh-logo", contentDisposition: "inline" as const }] : []), ...(attachment ? [{ filename: "photos-demande-devis.pdf", content: attachment, contentType: "application/pdf" }] : [])],
      headers: { "X-Auto-Response-Suppress": "OOF, AutoReply" },
      disableFileAccess: true,
      disableUrlAccess: true,
    });

    console.log("[Nodemailer] Email de secours accepté", {
      messageId: info.messageId,
      accepted: info.accepted,
      rejected: info.rejected,
    });
    if (!info.accepted?.length || info.rejected?.length) return { success: false, error: "Recipient rejected" };
    return { success: true, messageId: info.messageId };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[Nodemailer] Erreur envoi email :", message);
    return { success: false, error: message };
  } finally {
    transporter.close();
  }
}
