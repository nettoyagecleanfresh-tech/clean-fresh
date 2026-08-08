import nodemailer from "nodemailer";

export async function sendMailRaw({ to, subject, html }: { to: string; subject: string; html: string }) {
  // GMAIL_USER / GMAIL_APP_PASSWORD sans préfixe VITE_ → jamais exposés dans le bundle client
  const user = process.env.GMAIL_USER ?? process.env.VITE_GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD ?? process.env.VITE_GMAIL_APP_PASSWORD;

  if (!user || !pass) {
    console.warn("[Nodemailer] GMAIL_USER ou GMAIL_APP_PASSWORD manquant.");
    return { success: false, error: "Identifiants manquants" };
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user,
      pass,
    },
  });

  try {
    await transporter.sendMail({
      from: `"Clean&Fresh" <${user}>`,
      to,
      subject,
      html,
    });
    return { success: true };
  } catch (err: any) {
    console.error("[Nodemailer] Erreur envoi email :", err);
    return { success: false, error: err.message };
  }
}
