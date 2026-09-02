/**
 * Google Calendar — Vérification des créneaux disponibles
 *
 * La lecture freeBusy passe par une server function (src/lib/gcalFreeBusy.functions.ts)
 * afin que la clé API Google (secret GOOGLE_API_KEY) reste côté serveur.
 *
 * NOTE : Pour l'écriture des événements (création/suppression), voir gcal-server.ts
 */

import { fetchBusySlotsServerFn } from "@/lib/gcalFreeBusy.functions";

export type BusySlot = { start: string; end: string };

/**
 * Récupère les créneaux occupés pour une journée donnée via l'API freebusy.
 * Retourne [] si la configuration n'est pas définie (→ tous les créneaux affichés comme dispo).
 */
export async function fetchBusySlots(date: Date): Promise<BusySlot[]> {
  const timeMin = new Date(date);
  timeMin.setHours(0, 0, 0, 0);
  const timeMax = new Date(date);
  timeMax.setHours(23, 59, 59, 999);

  try {
    return await fetchBusySlotsServerFn({
      data: {
        timeMin: timeMin.toISOString(),
        timeMax: timeMax.toISOString(),
      },
    });
  } catch {
    return []; // en cas d'erreur réseau → tout libre (fail open)
  }
}

/** Marge de trajet entre deux prestations (20 min) */
export const TRAVEL_BUFFER_MS = 20 * 60_000;

/**
 * Vérifie si un créneau de `durationMin` minutes à `slotStart` est libre,
 * en tenant compte d'une marge de trajet de 1h20 avant et après chaque prestation.
 */
export function isSlotFree(
  slotStart: Date,
  durationMin: number,
  busy: BusySlot[],
): boolean {
  const slotStartMs = slotStart.getTime();
  const slotEndMs = slotStartMs + durationMin * 60_000;
  
  const debutDuCreneau = slotStartMs - TRAVEL_BUFFER_MS;
  const finDuCreneau = slotEndMs + TRAVEL_BUFFER_MS;

  return !busy.some((b) => {
    const bs = new Date(b.start).getTime();
    const be = new Date(b.end).getTime();
    
    // Règle de conflit stricte : "débutDuCréneau < finDeLEvénement" ET "finDuCréneau > débutDeLEvénement"
    return debutDuCreneau < be && finDuCreneau > bs;
  });
}

/**
 * Retourne les créneaux d'une journée avec leur statut disponible/indisponible.
 *
 * Les créneaux sont générés dynamiquement selon la durée de la prestation :
 * intervalle = durée + 20 min de trajet, arrondi au 30 min supérieur.
 *
 * Exemples (intervalle = durée + 20 min trajet) :
 *   Chaise 20min          → toutes les 40min  : 08h00, 08h40, 09h20…
 *   Fauteuil 45min        → toutes les 65min  : 08h00, 09h05, 10h10…
 *   Canapé 1h             → toutes les 80min  : 08h00, 09h20, 10h40…
 *   Pack or 2h            → toutes les 140min : 08h00, 10h20, 12h40…
 *   Chaise+Auto 110min    → toutes les 130min : 08h00, 10h10, 12h20…
 */
export function buildSlots(
  date: Date,
  durationMin: number,
  busy: BusySlot[],
): { time: string; available: boolean }[] {
  // Intervalle exact = durée totale prestation(s) + 20 min trajet
  // Exemple : chaise 20min → toutes les 40min | chaise+auto 110min → toutes les 130min
  const intervalMin = durationMin + 20;

  const START_MIN = 8 * 60;   // 08:00
  const END_MIN   = 21 * 60;  // dernier créneau au plus tard 21:00

  // Limite : pas de réservation à moins de 24h à l'avance
  const minBookingTime = new Date(Date.now() + 24 * 60 * 60 * 1000);

  const pad = (n: number) => String(n).padStart(2, "0");
  const slots: { time: string; available: boolean }[] = [];

  for (let cur = START_MIN; cur <= END_MIN; cur += intervalMin) {
    const h = Math.floor(cur / 60);
    const m = cur % 60;
    const time = `${pad(h)}:${pad(m)}`;

    const slotStart = new Date(date);
    slotStart.setHours(h, m, 0, 0);

    if (slotStart <= minBookingTime) {
      slots.push({ time, available: false });
    } else {
      slots.push({ time, available: isSlotFree(slotStart, durationMin, busy) });
    }
  }

  return slots;
}
