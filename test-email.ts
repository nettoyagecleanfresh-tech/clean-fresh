import { config } from "dotenv";
import nodemailer from "nodemailer";

// Charger les variables du fichier .env
config();

const user = process.env.VITE_GMAIL_USER;
const pass = process.env.VITE_GMAIL_APP_PASSWORD;

if (!user || !pass) {
  console.error("❌ ERREUR : VITE_GMAIL_USER ou VITE_GMAIL_APP_PASSWORD introuvable dans le .env");
  process.exit(1);
}

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: { user, pass },
});

async function main() {
  console.log(`Envoi de l'email de test à cherkinicolas@gmail.com via ${user}...`);
  try {
    const info = await transporter.sendMail({
      from: `"Clean&Fresh Test" <${user}>`,
      to: "cherkinicolas@gmail.com",
      subject: "Test du système d'email gratuit (Nodemailer)",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2 style="color: #00b8ff;">Succès ! 🎉</h2>
          <p>Ceci est un email de test généré par le nouveau système Nodemailer.</p>
          <p>Le mot de passe d'application fonctionne parfaitement ! Les emails de reprogrammation s'enverront de cette façon.</p>
        </div>
      `,
    });
    console.log("✅ Succès ! Email envoyé avec l'ID :", info.messageId);
    console.log("Allez vérifier la boîte mail de cherkinicolas@gmail.com !");
  } catch (err) {
    console.error("❌ Erreur lors de l'envoi :", err);
  }
}

main();
