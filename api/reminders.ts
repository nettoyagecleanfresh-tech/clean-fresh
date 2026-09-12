import { getGCalAccessToken } from "../src/lib/gcal-server";
import { sendReminderEmailRaw } from "../src/lib/emailService";

type CalendarEvent = {
  id?: string;
  status?: string;
  summary?: string;
  description?: string;
  start?: { dateTime?: string; date?: string };
  extendedProperties?: { private?: Record<string, string> };
};

const PARIS_TIME_ZONE = "Europe/Paris";
const REMINDER_MARKER = "cleanfreshReminder24hSentAt";

function parisDate(date: Date): string {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: PARIS_TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);
  const values = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  return `${values.year}-${values.month}-${values.day}`;
}

function parisTime(date: Date): string {
  return new Intl.DateTimeFormat("fr-FR", {
    timeZone: PARIS_TIME_ZONE,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(date);
}

function extractLine(description: string, label: string): string {
  const line = description.split("\n").find((value) => value.includes(label));
  return line ? line.slice(line.indexOf(label) + label.length).trim() : "";
}

async function listTomorrowEvents(token: string, calendarId: string): Promise<CalendarEvent[]> {
  const now = Date.now();
  const params = new URLSearchParams({
    timeMin: new Date(now + 12 * 60 * 60 * 1000).toISOString(),
    timeMax: new Date(now + 42 * 60 * 60 * 1000).toISOString(),
    singleEvents: "true",
    orderBy: "startTime",
    maxResults: "50",
  });
  const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events?${params}`;
  const response = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
  if (!response.ok) throw new Error(`Google Calendar list: ${response.status} ${await response.text()}`);
  const body = (await response.json()) as { items?: CalendarEvent[] };
  return body.items ?? [];
}

async function markReminderSent(token: string, calendarId: string, event: CalendarEvent): Promise<void> {
  if (!event.id) return;
  const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events/${encodeURIComponent(event.id)}`;
  const privateProperties = {
    ...(event.extendedProperties?.private ?? {}),
    [REMINDER_MARKER]: new Date().toISOString(),
  };
  const response = await fetch(url, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ extendedProperties: { private: privateProperties } }),
  });
  if (!response.ok) throw new Error(`Google Calendar mark: ${response.status} ${await response.text()}`);
}

export default async function handler(request: any, response: any) {
  if (request.method !== "GET") return response.status(405).json({ error: "Method not allowed" });

  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret && request.headers.authorization !== `Bearer ${cronSecret}`) {
    return response.status(401).json({ error: "Unauthorized" });
  }

  const calendarId = process.env.GCAL_CALENDAR_ID;
  const token = await getGCalAccessToken();
  if (!calendarId || !token) {
    console.error("[reminders] Configuration Google Calendar manquante");
    return response.status(500).json({ error: "Calendar configuration missing" });
  }

  const targetDate = parisDate(new Date(Date.now() + 24 * 60 * 60 * 1000));
  let sent = 0;
  let skipped = 0;
  const failures: string[] = [];

  try {
    const events = await listTomorrowEvents(token, calendarId);
    for (const event of events) {
      try {
        if (event.status === "cancelled" || event.extendedProperties?.private?.[REMINDER_MARKER]) {
          skipped++;
          continue;
        }

        const startValue = event.start?.dateTime ?? event.start?.date;
        if (!startValue || parisDate(new Date(startValue)) !== targetDate) {
          skipped++;
          continue;
        }

        const description = event.description ?? "";
        const clientEmail = extractLine(description, "Email :");
        const clientName = extractLine(description, "Client :");
        const clientPhone = extractLine(description, "Téléphone :");
        const clientAddress = extractLine(description, "Lieu :");
        const cancelUrl = description.match(/https:\/\/www\.cleanetfresh\.fr\/annuler\?token=[^"'<\s]+/)?.[0] ?? "https://www.cleanetfresh.fr/contactez-nous";
        const formula = (event.summary?.split(" — ")[0] ?? "Nettoyage professionnel").replace(/^[^\p{L}\p{N}]+/u, "").trim();

        if (!clientEmail || !clientName || !clientEmail.includes("@")) {
          skipped++;
          console.warn("[reminders] Événement ignoré: données client incomplètes", { eventId: event.id });
          continue;
        }

        await sendReminderEmailRaw({
          client_name: clientName,
          client_phone: clientPhone,
          client_email: clientEmail,
          formule_name: formula,
          booking_date: targetDate,
          booking_time: parisTime(new Date(startValue)),
          client_address: clientAddress,
          cancel_url: cancelUrl,
        });
        await markReminderSent(token, calendarId, event);
        sent++;
        console.log("[reminders] Rappel envoyé", { eventId: event.id });
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        failures.push(`${event.id ?? "unknown"}: ${message}`);
        console.error("[reminders] Échec rappel", { eventId: event.id, error: message });
      }
    }

    return response.status(failures.length ? 207 : 200).json({ targetDate, sent, skipped, failures: failures.length });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("[reminders] Échec du traitement", message);
    return response.status(500).json({ error: "Reminder job failed" });
  }
}
