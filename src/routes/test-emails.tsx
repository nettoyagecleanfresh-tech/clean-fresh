import { createFileRoute } from '@tanstack/react-router';
import { createServerFn } from '@tanstack/react-start';
import { 
  sendBookingEmails, 
  sendReminderEmail, 
  sendCancellationEmail, 
  sendRescheduleEmail 
} from '@/lib/emailService';
import { sendNodemailerServerFn } from '@/lib/nodemailerServerFn';
import { useState } from 'react';

const testAllEmailsFn = createServerFn({ method: "POST" })
  .handler(async () => {
    const siteUrl = process.env["VITE_SITE_URL"] ?? "https://www.cleanetfresh.fr";
    const targetEmail = "cherkinicolas@gmail.com"; // The user's email for testing

    const testDate = new Date();
    testDate.setDate(testDate.getDate() + 5);
    const dateStr = testDate.toISOString().split('T')[0];
    const newDate = new Date(testDate);
    newDate.setDate(newDate.getDate() + 2);
    const newDateStr = newDate.toISOString().split('T')[0];

    const cancelUrl = `${siteUrl}/annuler?token=test_token_123`;

    // 1. CONFIRMATION DE RÉSERVATION (envoie client + admin)
    await sendBookingEmails({
      gcal_event_id: "test_event_123",
      client_name: "Nicolas Cherki (Test)",
      client_email: targetEmail,
      client_phone: "06 12 34 56 78",
      client_street: "12 Rue de la Paix",
      client_city: "Toulouse",
      client_zip: "31000",
      booking_date: dateStr,
      booking_time: "10:00",
      estimated_duration: "1h30",
      total_price: 99,
      cancel_url: cancelUrl,
      items: [
        { service_id: "canape", formule_id: "canape-3", formule_name: "Canapé 3 places" },
        { service_id: "canape", formule_id: "anti-acariens", formule_name: "Traitement Anti-acariens" }
      ]
    });

    // 2. RAPPEL 24H (envoie client + admin)
    await sendReminderEmail({
      client_name: "Nicolas Cherki (Test)",
      client_phone: "06 12 34 56 78",
      client_email: targetEmail,
      formule_name: "Canapé 3 places + Traitement Anti-acariens",
      booking_date: dateStr,
      booking_time: "10:00",
      client_address: "12 Rue de la Paix, 31000 Toulouse",
      cancel_url: cancelUrl
    });

    // 3. ANNULATION (envoie client + admin)
    await sendCancellationEmail({
      client_name: "Nicolas Cherki (Test)",
      client_phone: "06 12 34 56 78",
      client_email: targetEmail,
      formule: "Canapé 3 places + Traitement Anti-acariens",
      date: dateStr,
      time: "10:00",
    });

    // 4. REPROGRAMMATION (envoie client + admin)
    await sendRescheduleEmail({
      client_name: "Nicolas Cherki (Test)",
      client_email: targetEmail,
      formule: "Canapé 3 places + Traitement Anti-acariens",
      new_date: newDateStr,
      new_time: "14:00",
      cancel_url: cancelUrl
    });

    // 5. AVIS GOOGLE (envoie client uniquement)
    const reviewHtml = `<!DOCTYPE html>
<html lang="fr">
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background-color:#eef4f9;font-family:sans-serif;">
<table border="0" width="100%"><tr><td align="center" style="padding:32px;">
  <table border="0" width="600" style="background:#fff;border-radius:14px;overflow:hidden;">
    <tr><td style="background:#00b8ff;padding:20px;">
      <img src="${siteUrl}/logo-email.png" width="110" style="background:#fff;padding:5px;border-radius:8px;">
    </td></tr>
    <tr><td style="padding:30px;">
      <h2>Bonjour Nicolas, merci pour votre confiance ! 🙏</h2>
      <p>Nous espérons que votre prestation <strong>Canapé 3 places</strong> vous a entièrement satisfait.</p>
      <a href="https://g.page/r/CaKxSyOiBkq8EBE/review" style="display:inline-block;padding:15px 30px;background:#fbbc04;color:#000;text-decoration:none;font-weight:bold;border-radius:40px;margin-top:20px;">
        ⭐ Laisser un avis sur Google
      </a>
    </td></tr>
  </table>
</td></tr></table>
</body></html>`;

    await sendNodemailerServerFn({
      data: {
        to: targetEmail,
        subject: "⭐ Nicolas Cherki (Test), votre avis nous est précieux !",
        html: reviewHtml,
      }
    });

    return { success: true };
  });

export const Route = createFileRoute('/test-emails')({
  component: TestEmails,
});

function TestEmails() {
  const [status, setStatus] = useState("idle");

  const sendTest = async () => {
    setStatus("sending");
    try {
      await testAllEmailsFn();
      setStatus("success");
    } catch (e) {
      console.error(e);
      setStatus("error");
    }
  };

  return (
    <div style={{ padding: 40, fontFamily: "system-ui, sans-serif", minHeight: "100vh", backgroundColor: "#f8fafc" }}>
      <div style={{ maxWidth: 600, margin: "0 auto", backgroundColor: "white", padding: 40, borderRadius: 16, boxShadow: "0 10px 30px rgba(0,0,0,0.05)" }}>
        <h1 style={{ color: "#0f2c3f", marginTop: 0 }}>Tester tous les emails</h1>
        <p style={{ color: "#475569", lineHeight: 1.6 }}>
          Ce bouton va générer et envoyer <strong>9 emails au total</strong> vers l'adresse <code>cherkinicolas@gmail.com</code> :
        </p>
        <ul style={{ color: "#475569", lineHeight: 1.6, marginBottom: 30 }}>
          <li>1x Confirmation de réservation (Client)</li>
          <li>1x Nouvelle réservation (Admin)</li>
          <li>1x Rappel 24h (Client)</li>
          <li>1x Rappel 24h (Admin)</li>
          <li>1x Annulation confirmée (Client)</li>
          <li>1x Annulation reçue (Admin)</li>
          <li>1x Reprogrammation confirmée (Client)</li>
          <li>1x Reprogrammation info (Admin)</li>
          <li>1x Demande d'avis (Client)</li>
        </ul>

        <button 
          onClick={sendTest}
          disabled={status === "sending"}
          style={{ 
            padding: "16px 24px", 
            fontSize: 16, 
            cursor: status === "sending" ? "not-allowed" : "pointer",
            backgroundColor: status === "sending" ? "#cbd5e1" : "#0093cc",
            color: "white",
            border: "none",
            borderRadius: 8,
            fontWeight: "bold",
            width: "100%",
            display: "flex",
            justifyContent: "center"
          }}
        >
          {status === "sending" ? "Envoi de 9 emails en cours... ⏳" : "📬 Lancer le test complet"}
        </button>
        
        {status === "success" && (
          <div style={{ marginTop: 24, padding: 16, backgroundColor: "#dcfce7", color: "#166534", borderRadius: 8, fontWeight: "bold", textAlign: "center" }}>
            ✅ Tous les emails ont été envoyés avec succès ! Vérifiez votre boîte de réception.
          </div>
        )}
        {status === "error" && (
          <div style={{ marginTop: 24, padding: 16, backgroundColor: "#fee2e2", color: "#991b1b", borderRadius: 8, fontWeight: "bold", textAlign: "center" }}>
            ❌ Erreur lors de l'envoi. Consultez la console.
          </div>
        )}
      </div>
    </div>
  );
}
