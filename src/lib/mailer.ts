import nodemailer from "nodemailer";

export async function sendMailRaw({ to, subject, html }: { to: string; subject: string; html: string }) {
  const user = process.env.VITE_GMAIL_USER;
  const pass = process.env.VITE_GMAIL_APP_PASSWORD;

  if (!user || !pass) {
    console.warn("[Nodemailer] VITE_GMAIL_USER ou VITE_GMAIL_APP_PASSWORD manquant.");
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
