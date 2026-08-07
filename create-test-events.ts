import { createCalendarEvent, buildEventDescription } from "./src/lib/gcal-server";

async function main() {
  const cancelUrl = "https://fresh-sparkle-toulouse-6hqe.vercel.app/annuler?token=test-nico";
  const ownerPhone = "07 67 12 75 00";
  
  console.log("Creating Test Event for Nicolas Cherki on August 16th...");
  
  const desc = buildEventDescription({
    client_name: "Nicolas Cherki test",
    client_phone: "06 12 34 56 78",
    client_email: "nicolas.cherki@example.com",
    client_street: "15 Rue d'Alsace Lorraine",
    client_zip: "31000",
    client_city: "Toulouse",
    total_price: 120,
    cancel_url: cancelUrl,
    owner_phone: ownerPhone,
    items: [
      {
        service_name: "Nettoyage Canapé",
        formule_name: "Pack Or",
        formule_price: 129,
        options: [
          { name: "Traitement anti-acariens et bactériens", price: 19 },
          { name: "Détachage intensif — siège très taché", price: 19 }
        ]
      },
      {
        service_name: "Nettoyage Tapis",
        formule_name: "3 Tapis",
        formule_price: 99,
        options: [
          { name: "Traitement anti-odeur", price: 15 }
        ]
      }
    ]
  });

  await createCalendarEvent({
    summary: "🛋️ Pack Or + 3 Tapis — Nicolas Cherki test",
    description: desc,
    location: "15 Rue d'Alsace Lorraine, 31000 Toulouse",
    start: { dateTime: "2026-08-16T18:00:00", timeZone: "Europe/Paris" },
    end: { dateTime: "2026-08-16T19:00:00", timeZone: "Europe/Paris" }
  });

  const descAuto = buildEventDescription({
    client_name: "Client Auto",
    client_phone: "06 00 00 00 00",
    client_email: "test@example.com",
    client_street: "123 Rue",
    client_zip: "31000",
    client_city: "Toulouse",
    total_price: 69,
    cancel_url: cancelUrl,
    owner_phone: ownerPhone,
    items: [
      {
        service_name: "Nettoyage Auto",
        formule_name: "Pack Bronze",
        formule_price: 69,
        options: []
      }
    ]
  });

  await createCalendarEvent({
    summary: "🚗 Pack Bronze — Client Auto",
    description: descAuto,
    location: "123 Rue, 31000 Toulouse",
    start: { dateTime: "2026-08-17T10:00:00", timeZone: "Europe/Paris" },
    end: { dateTime: "2026-08-17T11:00:00", timeZone: "Europe/Paris" }
  });

  console.log("Test Events created!");
}

main().catch(console.error);
