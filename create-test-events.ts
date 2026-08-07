import { createCalendarEvent } from "./src/lib/gcal-server";
import { config } from "dotenv";
import { resolve } from "path";

// Charger le fichier .env
config({ path: resolve(process.cwd(), ".env") });

function generateCancelToken(
  name: string,
  email: string,
  phone: string,
  formule: string,
  date: string,
  time: string,
  gcal_event_id: string,
  dur: number
) {
  const shortTokenData = {
    i: gcal_event_id,
    n: name.substring(0, 30),
    e: email,
    d: date,
    t: time.substring(0, 5),
    f: formule.substring(0, 30),
    dur: dur
  };
  return Buffer.from(JSON.stringify(shortTokenData)).toString('base64');
}

async function main() {
  const dateStr = "2026-08-10"; // Date fixée manuellement pour être sûr

  console.log(`Creating Test Event for cherkinicolas@gmail.com on ${dateStr}...`);
  
  const clientEmail = "cherkinicolas@gmail.com";
  const formuleName = "Test Client Complet";
  const time = "14:00";
  const durationMin = 120;
  
  const tempGcalId = "temp_" + Math.random().toString(36).substring(2, 15);
  
  const cancelToken = generateCancelToken(
    "Nicolas Cherki",
    clientEmail,
    "06 12 34 56 78",
    formuleName,
    dateStr,
    time,
    tempGcalId,
    durationMin
  );
  
  const cancelUrl = `https://fresh-sparkle-toulouse-6hqe.vercel.app/annuler?token=${cancelToken}`;
  
  const startObj = new Date(`${dateStr}T${time}:00+02:00`);
  const endObj = new Date(startObj.getTime() + durationMin * 60_000);
  
  const descriptionHtml = `
Client: Nicolas Cherki
Téléphone: 06 12 34 56 78
Email: ${clientEmail}
Adresse: 12 Rue du Test, 31000 Toulouse

<a href="${cancelUrl}">❌ Annuler ou Gérer le rendez-vous</a>
  `;
  
  const gcalId = await createCalendarEvent({
    summary: `[TEST] ${formuleName} - Nicolas Cherki`,
    description: descriptionHtml,
    start: {
      dateTime: startObj.toISOString(),
      timeZone: "Europe/Paris",
    },
    end: {
      dateTime: endObj.toISOString(),
      timeZone: "Europe/Paris",
    },
  });
  
  console.log("All Test Events created! Check your Google Calendar on", dateStr);
}

main().catch(console.error);
