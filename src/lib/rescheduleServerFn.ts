/**
 * Server Function — Reprogrammation d'une réservation
 *
 * Appelée depuis annuler.tsx lors de la confirmation de reprogrammation.
 * Modifie l'événement dans Google Calendar.
 */

import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { checkSlotAvailable, updateCalendarEvent } from "@/lib/gcal-server";

const RescheduleInputSchema = z.object({
  gcal_event_id: z.string(),
  new_date: z.string(), // "2026-09-15"
  new_time: z.string(), // "10:00"
  duration_min: z.number(),
});

export type RescheduleInput = z.infer<typeof RescheduleInputSchema>;

export type RescheduleResult = {
  success: boolean;
  gcal_updated: boolean;
  error?: string;
};

export const rescheduleBookingServerFn = createServerFn({ method: "POST" })
  .validator((data: RescheduleInput) => RescheduleInputSchema.parse(data))
  .handler(async ({ data }): Promise<RescheduleResult> => {
    // 1. Vérifier que le nouveau créneau est libre
    const slotFree = await checkSlotAvailable(data.new_date, data.new_time, data.duration_min);
    if (!slotFree) {
      return { success: false, gcal_updated: false, error: "SLOT_TAKEN" };
    }

    // 2. Calculer le nouveau start et end en heure locale
    const dateParts = data.new_date.split("-").map(Number);
    const timeParts = data.new_time.split(":").map(Number);
    const year   = dateParts[0] ?? 2026;
    const month  = dateParts[1] ?? 1;
    const day    = dateParts[2] ?? 1;
    const hour   = timeParts[0] ?? 8;
    const minute = timeParts[1] ?? 0;

    const pad = (n: number) => String(n).padStart(2, "0");
    const startLocalStr = `${year}-${pad(month)}-${pad(day)}T${pad(hour)}:${pad(minute)}:00`;

    const startMs = new Date(startLocalStr).getTime();
    const endMs = startMs + data.duration_min * 60_000;
    const endDate = new Date(endMs);
    const endLocalStr = `${endDate.getFullYear()}-${pad(endDate.getMonth() + 1)}-${pad(endDate.getDate())}T${pad(endDate.getHours())}:${pad(endDate.getMinutes())}:00`;

    // 3. Mettre à jour dans Google Agenda
    const gcal_updated = await updateCalendarEvent(data.gcal_event_id, {
      start: { dateTime: startLocalStr, timeZone: "Europe/Paris" },
      end: { dateTime: endLocalStr, timeZone: "Europe/Paris" },
    });

    return { success: true, gcal_updated };
  });
