import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import nodemailer from "nodemailer";

const NodemailerInputSchema = z.object({
  to: z.string().email(),
  subject: z.string(),
  html: z.string(),
});

export type NodemailerInput = z.infer<typeof NodemailerInputSchema>;

export const sendNodemailerServerFn = createServerFn({ method: "POST" })
  .validator((data: NodemailerInput) => NodemailerInputSchema.parse(data))
  .handler(async ({ data }) => {
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
        to: data.to,
        subject: data.subject,
        html: data.html,
      });
      return { success: true };
    } catch (err: any) {
      console.error("[Nodemailer] Erreur envoi email :", err);
      return { success: false, error: err.message };
    }
  });
