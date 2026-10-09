/**
 * Server Function — Création d'une réservation
 *
 * Appelée depuis reserver.tsx lors de la soumission du formulaire.
 * Exécutée côté serveur (Cloudflare Workers / Node.js).
 * Crée l'événement dans Google Calendar + envoie les emails.
 */

import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { SERVICES } from "@/data/bookingCatalogue";
import { signManagementToken, createCalendarEvent, buildEventDescription, checkSlotAvailable } from "@/lib/gcal-server";

// ─── Schéma de validation ────────────────────────────────────────────────────

export const BookingInputSchema = z.object({
  items: z.array(z.object({
    service_id: z.string(),
    service_name: z.string(),
    formule_id: z.string(),
    formule_name: z.string(),
    formule_price: z.number(),
    options: z.array(z.object({ name: z.string(), price: z.number() })),
  })),
  total_price: z.number(),
  duration_min: z.number(),
  booking_date: z.string(), // "2026-09-15"
  booking_time: z.string(), // "10:00"
  client_name: z.string(),
  client_phone: z.string(),
  client_email: z.string().email(),
  client_street: z.string(),
  client_zip: z.string(),
  client_city: z.string(),
  auto_access: z.object({ electricity: z.boolean(), water: z.boolean() }).optional(),
  cancel_token: z.string().min(1).max(3000), // token base64 déjà généré côté client
  gcal_event_id: z.string().regex(/^[a-v0-9]{5,1024}$/),
});

export type BookingInput = z.infer<typeof BookingInputSchema>;

export type BookingResult = {
  success: boolean;
  gcal_event_id: string | null;
  cancel_token: string;
  error?: string;
};

// ─── Server Function ─────────────────────────────────────────────────────────

// ─── Rate limiting basique (anti-spam) ───────────────────────────────────────
// Max 3 réservations par email toutes les 10 minutes
const _rateMap = new Map<string, { count: number; resetAt: number }>();
function isRateLimited(email: string): boolean {
  const now = Date.now();
  const entry = _rateMap.get(email);
  if (!entry || now > entry.resetAt) {
    _rateMap.set(email, { count: 1, resetAt: now + 10 * 60_000 });
    return false;
  }
  if (entry.count >= 3) return true;
  entry.count++;
  return false;
}

export const createBookingServerFn = createServerFn({ method: "POST" })
  .validator((data: BookingInput) => BookingInputSchema.parse(data))
  .handler(async ({ data }): Promise<BookingResult> => {
    try {
      // Les montants et durées sont reconstruits depuis le catalogue partagé.
      if (!data.items.length || data.items.length > 20) throw new Error("INVALID_ITEMS");
      let duration = 0;
      let total = 0;
      data.items = data.items.map(item => {
        const service = SERVICES.find(s => s.id === item.service_id);
        const formule = service?.formules.find(f => f.id === item.formule_id);
        if (!service || !formule) throw new Error("INVALID_FORMULA");
        const selected = new Set<string>();
        const options = item.options.map(option => {
          const canonical = formule.options.find(o => o.name === option.name);
          if (!canonical || selected.has(canonical.id)) throw new Error("INVALID_OPTION");
          selected.add(canonical.id);
          return { name: canonical.name, price: canonical.price };
        });
        duration += formule.durationMin;
        total += formule.price + options.reduce((sum, o) => sum + o.price, 0);
        return { ...item, service_name: service.label, formule_name: formule.name, formule_price: formule.price, options };
      });
      data.duration_min = duration;
      data.total_price = total;
      // ── 0. Rate limiting anti-spam ──
      if (isRateLimited(data.client_email.toLowerCase())) {
        return {
          success: false,
          gcal_event_id: null,
          cancel_token: data.cancel_token,
          error: "RATE_LIMITED",
        };
      }

      // ── 1. Vérifier que le créneau est encore libre ──
      const slotFree = await checkSlotAvailable(
        data.booking_date,
        data.booking_time,
        data.duration_min,
      );
      if (!slotFree) {
        return {
          success: false,
          gcal_event_id: null,
          cancel_token: data.cancel_token,
          error: "SLOT_TAKEN",
        };
      }

      const siteUrl =
        process.env["VITE_SITE_URL"] ?? "https://cleanetfresh.fr";
      const ownerPhone =
        process.env["VITE_OWNER_PHONE"] ?? "07 67 12 75 00";
      // Le lien reflète exclusivement les informations validées côté serveur.
      const payload = btoa(unescape(encodeURIComponent(JSON.stringify({
        i: data.gcal_event_id, n: data.client_name.substring(0, 30), e: data.client_email,
        d: data.booking_date, t: data.booking_time,
        f: data.items.map(item => item.formule_name).join(" + ").substring(0, 30), dur: duration,
      }))));
      data.cancel_token = await signManagementToken(payload);
      const cancelUrl = `${siteUrl}/annuler?token=${encodeURIComponent(data.cancel_token)}`;

      // ── 1. Construire l'événement Google Calendar ──
      const description = buildEventDescription({
        client_name: data.client_name,
        client_phone: data.client_phone,
        client_email: data.client_email,
        client_street: data.client_street,
        client_zip: data.client_zip,
        client_city: data.client_city,
        auto_access: data.auto_access,
        items: data.items,
        total_price: data.total_price,
        cancel_url: cancelUrl,
        owner_phone: ownerPhone,
      });

      // ── 2. Calculer start / end ──
      // On envoie l'heure LOCALE (ex: "2026-08-30T18:30:00") SANS offset
      // + timeZone:"Europe/Paris" → Google Calendar gère lui-même la conversion UTC
      const dateParts = data.booking_date.split("-").map(Number);
      const timeParts = data.booking_time.split(":").map(Number);
      const year   = dateParts[0] ?? 2026;
      const month  = dateParts[1] ?? 1;
      const day    = dateParts[2] ?? 1;
      const hour   = timeParts[0] ?? 8;
      const minute = timeParts[1] ?? 0;

      const pad = (n: number) => String(n).padStart(2, "0");
      const startLocalStr = `${year}-${pad(month)}-${pad(day)}T${pad(hour)}:${pad(minute)}:00`;

      // Durée en millisecondes pour calculer l'heure de fin
      const startMs = new Date(startLocalStr).getTime();
      const endMs = startMs + data.duration_min * 60_000;
      const endDate = new Date(endMs);
      const endLocalStr = `${endDate.getFullYear()}-${pad(endDate.getMonth() + 1)}-${pad(endDate.getDate())}T${pad(endDate.getHours())}:${pad(endDate.getMinutes())}:00`;

      const fullAddress = `${data.client_street}, ${data.client_zip} ${data.client_city}`;

      const getEmoji = (serviceId: string) => {
        switch (serviceId) {
          case "auto": return "🚗";
          case "canape": return "🛋️";
          case "matelas": return "🛏️";
          case "tapis": return "🧶";
          case "fin-de-bail": return "🏠";
          default: return "🧹";
        }
      };

      const firstItem = data.items[0];
      const emoji = firstItem ? getEmoji(firstItem.service_id) : "🧹";
      const summaryTitle = data.items.length > 1 ? `${firstItem?.formule_name} + ${data.items.length - 1} autre(s)` : firstItem?.formule_name;
      
      const gcalEvent = {
        id: data.gcal_event_id,
        summary: `${emoji} ${summaryTitle} — ${data.client_name}`,
        description,
        location: fullAddress,
        start: {
          dateTime: startLocalStr,
          timeZone: "Europe/Paris",
        },
        end: {
          dateTime: endLocalStr,
          timeZone: "Europe/Paris",
        },
        reminders: {
          useDefault: false,
          overrides: [
            { method: "email", minutes: 24 * 60 }, // rappel 24h
            { method: "popup", minutes: 60 },       // rappel 1h (propriétaire)
          ],
        },
      };

      // ── 3. Créer l'événement ──
      const gcal_event_id = await createCalendarEvent(gcalEvent);

      if (!gcal_event_id) throw new Error("CALENDAR_UNAVAILABLE");
      return {
        success: true,
        gcal_event_id,
        cancel_token: data.cancel_token,
      };
    } catch (err) {
      console.error("[booking server fn] :", err);
      return {
        success: false,
        gcal_event_id: null,
        cancel_token: data.cancel_token,
        error: "BOOKING_FAILED",
      };
    }
  });
