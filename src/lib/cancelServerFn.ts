/**
 * Server Function — Annulation d'une réservation
 *
 * Appelée depuis annuler.tsx lors de la confirmation d'annulation.
 * Supprime l'événement dans Google Calendar.
 */

import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { deleteCalendarEvent } from "@/lib/gcal-server";

const CancelInputSchema = z.object({
  gcal_event_id: z.string().optional().nullable(),
  client_name: z.string(),
  client_phone: z.string().optional(),
  client_email: z.string().optional(),
  formule: z.string(),
  date: z.string(),
  time: z.string(),
});

export type CancelInput = z.infer<typeof CancelInputSchema>;

export type CancelResult = {
  success: boolean;
  gcal_deleted: boolean;
};

export const cancelBookingServerFn = createServerFn({ method: "POST" })
  .validator((data: CancelInput) => CancelInputSchema.parse(data))
  .handler(async ({ data }): Promise<CancelResult> => {
    let gcal_deleted = false;

    // Supprimer l'événement Google Calendar si on a l'ID
    if (data.gcal_event_id) {
      gcal_deleted = await deleteCalendarEvent(data.gcal_event_id);
    }

    return { success: true, gcal_deleted };
  });
