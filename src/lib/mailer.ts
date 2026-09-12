import nodemailer from "nodemailer";

type MailResult = {
  success: boolean;
  messageId?: string;
  error?: string;
};

function htmlToText(html: string): string {
  return html
    .replace(/<style[\s\S]*?<\/style>/gi, "")
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

export async function sendMailRaw({ to, subject, html }: { to: string; subject: string; html: string }): Promise<MailResult> {
  // Variables serveur privilégiées. Compatibilité conservée avec les anciens noms VITE_*.
  const user = process.env.GMAIL_USER ?? process.env.VITE_GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD ?? process.env.VITE_GMAIL_APP_PASSWORD;

  if (!user || !pass) {
    console.error("[Nodemailer] GMAIL_USER ou GMAIL_APP_PASSWORD manquant.");
    return { success: false, error: "Identifiants Gmail manquants" };
  }

  const recipient = to.trim().toLowerCase();
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: { user, pass },
    tls: { minVersion: "TLSv1.2" },
  });

  try {
    const info = await transporter.sendMail({
      from: { name: "Clean&Fresh Toulouse", address: user },
      replyTo: { name: "Clean&Fresh Toulouse", address: user },
      envelope: { from: user, to: recipient },
      to: recipient,
      subject,
      html,
      text: htmlToText(html),
      headers: {
        "X-Auto-Response-Suppress": "OOF, AutoReply",
      },
      disableFileAccess: true,
      disableUrlAccess: true,
    });

    console.log("[Nodemailer] Email accepté", {
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
