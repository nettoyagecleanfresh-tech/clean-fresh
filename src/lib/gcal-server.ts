/**
 * Google Calendar — Écriture d'événements (côté serveur uniquement)
 *
 * Utilise un Service Account Google avec JWT signé via Web Crypto API.
 * Compatible Node.js 18+ et Cloudflare Workers.
 *
 * Variables d'environnement requises (côté serveur, sans VITE_ prefix) :
 *   GCAL_SERVICE_ACCOUNT_EMAIL   ex: cleanfresh-booking@xxx.iam.gserviceaccount.com
 *   GCAL_SERVICE_ACCOUNT_KEY     La clé privée PEM (-----BEGIN PRIVATE KEY-----)
 *   GCAL_CALENDAR_ID             ex: votreadresse@gmail.com
 */

// ─── Types ───────────────────────────────────────────────────────────────────

export type GCalEvent = {
  id?: string;
  summary: string;
  description: string;
  start: { dateTime: string; timeZone: string };
  end: { dateTime: string; timeZone: string };
  attendees?: { email: string }[];
  reminders?: {
    useDefault: boolean;
    overrides?: { method: string; minutes: number }[];
  };
};

// ─── Helpers JWT (Web Crypto API — pas de dépendances) ───────────────────────

function base64url(input: ArrayBuffer | string): string {
  let bytes: Uint8Array;
  if (typeof input === "string") {
    bytes = new TextEncoder().encode(input);
  } else {
    bytes = new Uint8Array(input);
  }
  let binary = "";
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i] ?? 0);
  }
  return btoa(binary)
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

async function importRsaPrivateKey(pem: string): Promise<CryptoKey> {
  const pemBody = pem
    .replace(/-----BEGIN PRIVATE KEY-----/g, "")
    .replace(/-----END PRIVATE KEY-----/g, "")
    .replace(/\s+/g, "");

  const binary = Uint8Array.from(atob(pemBody), (c) => c.charCodeAt(0));

  return crypto.subtle.importKey(
    "pkcs8",
    binary.buffer,
    { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
    false,
    ["sign"],
  );
}

async function createJwt(
  serviceAccountEmail: string,
  privateKeyPem: string,
  scope: string,
): Promise<string> {
  const now = Math.floor(Date.now() / 1000);

  const header = { alg: "RS256", typ: "JWT" };
  const payload = {
    iss: serviceAccountEmail,
    scope,
    aud: "https://oauth2.googleapis.com/token",
    exp: now + 3600,
    iat: now,
  };

  const headerB64 = base64url(JSON.stringify(header));
  const payloadB64 = base64url(JSON.stringify(payload));
  const signingInput = `${headerB64}.${payloadB64}`;

  const privateKey = await importRsaPrivateKey(privateKeyPem);
  const signatureBuffer = await crypto.subtle.sign(
    "RSASSA-PKCS1-v1_5",
    privateKey,
    new TextEncoder().encode(signingInput),
  );

  const signatureB64 = base64url(signatureBuffer);
  return `${signingInput}.${signatureB64}`;
}

async function getAccessToken(
  serviceAccountEmail: string,
  privateKeyPem: string,
): Promise<string> {
  const jwt = await createJwt(
    serviceAccountEmail,
    privateKeyPem,
    "https://www.googleapis.com/auth/calendar",
  );

  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: jwt,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`[GCal] Erreur token OAuth: ${err}`);
  }

  const data = (await res.json()) as { access_token: string };
  return data.access_token;
}

// ─── Token partagé ───────────────────────────────────────────────────────────
import { config as dotenvConfig } from "dotenv";
import { resolve } from "path";

function getConfig() {
  // Essaie de charger le .env depuis le répertoire de travail courant
  const cwd = typeof process !== "undefined" ? process.cwd() : "";
  dotenvConfig({ path: resolve(cwd, ".env") });

  const email = process.env["GCAL_SERVICE_ACCOUNT_EMAIL"];
  const key   = process.env["GCAL_SERVICE_ACCOUNT_KEY"];
  const calId = process.env["GCAL_CALENDAR_ID"];

  console.log("[GCal] getConfig →", {
    cwd,
    email: email ? `${email.slice(0, 20)}...` : "⚠️ MANQUANT",
    key:   key   ? `${key.slice(0, 30)}...`   : "⚠️ MANQUANT",
    calId: calId ? calId                       : "⚠️ MANQUANT",
  });

  // Supporte les clés stockées avec des \n littéraux
  return { email, key: key?.replace(/\\n/g, "\n"), calId };
}

/**
 * Retourne un access token OAuth pour le service account configuré.
 * Retourne null si les variables d'environnement ne sont pas définies.
 */
export async function getGCalAccessToken(): Promise<string | null> {
  const { email, key } = getConfig();
  if (!email || !key) return null;
  try {
    return await getAccessToken(email, key);
  } catch {
    return null;
  }
}

/**
 * Crée un événement dans Google Calendar.
 * Retourne l'ID de l'événement créé, ou null si non configuré.
 */
export async function createCalendarEvent(
  event: GCalEvent,
): Promise<string | null> {
  const { email, key, calId } = getConfig();
  if (!email || !key || !calId) {
    console.warn("[GCal] ⚠️ Variables serveur manquantes — événement non créé. Vérifiez le fichier .env");
    return null;
  }

  try {
    const token = await getAccessToken(email, key);
    const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calId)}/events?sendUpdates=all`;

    const res = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(event),
    });

    if (!res.ok) {
      const err = await res.text();
      throw new Error(`[GCal] Erreur création événement: ${err}`);
    }

    const data = (await res.json()) as { id: string };
    console.log("[GCal] Événement créé :", data.id);
    return data.id;
  } catch (err) {
    console.error("[GCal] createCalendarEvent :", err);
    return null;
  }
}

// ─── Helpers timezone ────────────────────────────────────────────────────────

/**
 * Convertit une heure locale Paris (year, month1, day, hour, minute)
 * en objet Date UTC en utilisant l'API Intl (gère CET/CEST automatiquement).
 */
function parisLocalToUtc(
  year: number, month1: number, day: number, hour: number, minute: number,
): Date {
  // On crée une date candidate en UTC (en supposant heure Paris = heure UTC)
  const candidate = new Date(Date.UTC(year, month1 - 1, day, hour, minute, 0));
  // On lit ce que Paris affiche pour cette date UTC
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: "Europe/Paris",
    hour: "2-digit", minute: "2-digit", hour12: false,
  });
  const parts = formatter.formatToParts(candidate);
  const pMap: Record<string, string> = {};
  parts.forEach(p => { pMap[p.type] = p.value; });
  const parisH = parseInt(pMap["hour"] ?? "0", 10);
  const parisM = parseInt(pMap["minute"] ?? "0", 10);
  // offset Paris (en minutes) = heure affichée - heure UTC de la candidate
  let offsetMin = (parisH * 60 + parisM) - (hour * 60 + minute);
  if (offsetMin > 720) offsetMin -= 1440;
  if (offsetMin < -720) offsetMin += 1440;
  // UTC réel = heure Paris - offset
  return new Date(Date.UTC(year, month1 - 1, day, hour, minute, 0) - offsetMin * 60_000);
}

/**
 * Vérifie que le créneau (booking_date + booking_time + duration_min)
 * est encore disponible dans Google Calendar, via le service account.
 * Retourne true si libre, false si occupé.
 * Fail-open : retourne true si Google Calendar n'est pas configuré ou en cas d'erreur.
 */
export async function checkSlotAvailable(
  booking_date: string,   // "2026-09-15"
  booking_time: string,   // "10:00"
  duration_min: number,
): Promise<boolean> {
  const { email, key, calId } = getConfig();
  if (!email || !key || !calId) return true; // non configuré → on laisse passer

  try {
    const token = await getAccessToken(email, key);

    const [y, mo, d] = booking_date.split("-").map(Number);
    const [h, mi] = booking_time.split(":").map(Number);
    const slotStart = parisLocalToUtc(y!, mo!, d!, h!, mi!);
    const slotEnd   = new Date(slotStart.getTime() + duration_min * 60_000);

    // Fenêtre de requête : la journée entière en UTC (+marge)
    const timeMin = new Date(Date.UTC(y!, mo! - 1, d!, 0, 0, 0)).toISOString();
    const timeMax = new Date(Date.UTC(y!, mo! - 1, d!, 23, 59, 59)).toISOString();

    const res = await fetch("https://www.googleapis.com/calendar/v3/freeBusy", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ timeMin, timeMax, items: [{ id: calId }] }),
    });

    if (!res.ok) return true; // Fail open

    const json = (await res.json()) as {
      calendars?: Record<string, { busy?: { start: string; end: string }[] }>;
    };
    const busy = json.calendars?.[calId]?.busy ?? [];

    const BUFFER_MS = 20 * 60_000; // 20 min marge trajet
    const slotStartMs = slotStart.getTime();
    const slotEndMs   = slotEnd.getTime();
    const conflict = busy.some(b => {
      const bs = new Date(b.start).getTime();
      const be = new Date(b.end).getTime();
      return slotStartMs < be + BUFFER_MS && slotEndMs + BUFFER_MS > bs;
    });

    return !conflict;
  } catch {
    return true; // Fail open
  }
}

/**
 * Supprime un événement Google Calendar par son ID.
 * Utilisé lors d'une annulation.
 */
export async function deleteCalendarEvent(
  eventId: string,
): Promise<boolean> {
  const { email, key, calId } = getConfig();
  if (!email || !key || !calId || !eventId) {
    console.warn("[GCal] Variables serveur manquantes — événement non supprimé.");
    return false;
  }

  try {
    const token = await getAccessToken(email, key);
    const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calId)}/events/${eventId}?sendUpdates=all`;

    const res = await fetch(url, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res.status === 204 || res.status === 200) {
      console.log("[GCal] Événement supprimé :", eventId);
      return true;
    }
    if (res.status === 404) {
      console.warn("[GCal] Événement introuvable (déjà supprimé ?) :", eventId);
      return true; // Considéré comme succès
    }

    const err = await res.text();
    throw new Error(`[GCal] Erreur suppression: ${err}`);
  } catch (err) {
    console.error("[GCal] deleteCalendarEvent :", err);
    return false;
  }
}

export function buildEventDescription(params: {
  client_name: string;
  client_phone: string;
  client_email: string;
  client_street: string;
  client_zip: string;
  client_city: string;
  items: {
    service_name: string;
    formule_name: string;
    formule_price: number;
    options: { name: string; price: number }[];
  }[];
  total_price: number;
  cancel_url: string;
  owner_phone: string;
}): string {
  const address = `${params.client_street}, ${params.client_zip} ${params.client_city}`;

  const itemsDetails = params.items.map((item) => {
    let text = `• ${item.service_name} : ${item.formule_name} — ${item.formule_price} €`;
    if (item.options && item.options.length > 0) {
      const opts = item.options.map(o => `   + ${o.name} (+${o.price} €)`).join("\n");
      text += `\n${opts}`;
    }
    return text;
  }).join("\n\n");

  return `
👤 Client : ${params.client_name}
📞 Téléphone : ${params.client_phone}
✉️ Email : ${params.client_email}
📍 Lieu : ${address}

🛠 PRESTATIONS :
${itemsDetails}

💶 TOTAL : ${params.total_price} €

❌ <a href="${params.cancel_url}">Cliquez ici pour annuler le rendez-vous</a>
`.trim();
}
