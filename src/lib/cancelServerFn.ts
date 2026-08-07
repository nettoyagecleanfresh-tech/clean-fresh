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

    // Envoyer l'email d'annulation (au client ET à l'admin)
    try {
      const { sendCancellationEmail } = await import("@/lib/emailService");
      await sendCancellationEmail({
        client_name: data.client_name,
        client_phone: data.client_phone ?? "",
        client_email: data.client_email ?? "",
        formule: data.formule,
        date: data.date,
        time: data.time,
      });
    } catch (e) {
      console.error("Erreur envoi email annulation:", e);
    }

    return { success: true, gcal_deleted };
  });
