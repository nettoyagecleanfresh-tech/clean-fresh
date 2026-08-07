import { createFileRoute } from '@tanstack/react-router';
import { createServerFn } from '@tanstack/react-start';
import { sendReminderEmail } from '@/lib/emailService';
import { useState } from 'react';

const testReminderFn = createServerFn({ method: "POST" })
  .handler(async () => {
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

    return { success: true };
  });

export const Route = createFileRoute('/test-rappel')({
  component: TestRappel,
});

function TestRappel() {
  const [status, setStatus] = useState("idle");

  const sendTest = async () => {
    setStatus("sending");
    try {
      await testReminderFn();
      setStatus("success");
    } catch (e) {
      console.error(e);
      setStatus("error");
    }
  };

  return (
    <div style={{ padding: 40, fontFamily: "system-ui, sans-serif" }}>
      <h1>Test Envoi Email Rappel 24h</h1>
      <button 
        onClick={sendTest}
        disabled={status === "sending"}
        style={{ padding: "10px 20px", fontSize: 16, cursor: "pointer" }}
      >
        {status === "sending" ? "Envoi en cours..." : "Envoyer le mail de test"}
      </button>
      
      {status === "success" && <p style={{ color: "green" }}>✅ Emails envoyés avec succès à cherkinicolas@gmail.com !</p>}
      {status === "error" && <p style={{ color: "red" }}>❌ Erreur lors de l'envoi.</p>}
    </div>
  );
}
