import { sendReminderEmail } from "./src/lib/emailService";
import { config } from "dotenv";

// Charge le .env
config();

async function main() {
  console.log("Envoi du mail de rappel test...");
  
  await sendReminderEmail({
    client_name: "Nicolas Cherki (Test)",
    client_phone: "06 12 34 56 78",
    client_email: "cherkinicolas@gmail.com",
    formule_name: "Nettoyage Canapé 3 places + Traitement Anti-acariens",
    booking_date: new Date(Date.now() + 86400000).toISOString().split('T')[0], // Demain
    booking_time: "10:00",
    client_address: "12 Rue de la Paix, 31000 Toulouse",
    cancel_url: "https://www.cleanetfresh.fr/annuler?token=test_token_123"
  });

  console.log("✅ Mail de rappel envoyé avec succès !");
  console.log("Le client (cherkinicolas@gmail.com) ET l'admin l'ont reçu.");
}

main().catch(console.error);
