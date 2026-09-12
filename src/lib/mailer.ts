import nodemailer from "nodemailer";

type MailResult = {
  success: boolean;
  messageId?: string;
  error?: string;
};

function htmlToText(html: string): string {
  return html
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<br\s*[\/]?>/gi, "\n")
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

export async function sendMailRaw({ to, subject, html }: { to: string; subject: string; html: string }): Promise<MailResult> {
  const recipient = to.trim().toLowerCase();
  const text = htmlToText(html);
  const resendApiKey = process.env.RESEND_API_KEY;
  const resendDomain = process.env.RESEND_EMAIL_DOMAIN ?? "cleanetfresh.fr";
  const gmailUser = process.env.GMAIL_USER ?? process.env.VITE_GMAIL_USER;
  const gmailPass = process.env.GMAIL_APP_PASSWORD ?? process.env.VITE_GMAIL_APP_PASSWORD;
  const replyTo = gmailUser ?? "nettoyagecleanfresh@gmail.com";
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
      replyTo: { name: "Clean&Fresh Toulouse", address: gmailUser },
      envelope: { from: gmailUser, to: recipient },
      to: recipient,
      subject,
      html,
      text,
      headers: { "X-Auto-Response-Suppress": "OOF, AutoReply" },
      disableFileAccess: true,
      disableUrlAccess: true,
    });

    console.log("[Nodemailer] Email de secours accepté", {
      messageId: info.messageId,
      accepted: info.accepted,
      rejected: info.rejected,
    });
    return { success: true, messageId: info.messageId };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[Nodemailer] Erreur envoi email :", message);
    return { success: false, error: message };
  } finally {
    transporter.close();
  }
}
