/**
 * Server Function — Lecture des créneaux occupés (freeBusy)
 *
 * Utilise le service account Google (même que pour la création d'événements)
 * afin d'accéder au calendrier privé.
 */
import { createServerFn } from "@tanstack/react-start";
import { getGCalAccessToken } from "@/lib/gcal-server";
import { config as dotenvConfig } from "dotenv";
import { resolve } from "path";

export type BusySlot = { start: string; end: string };

export const fetchBusySlotsServerFn = createServerFn({ method: "POST" })
  .validator((data: { timeMin: string; timeMax: string }) => data)
  .handler(async ({ data }): Promise<BusySlot[]> => {
    const cwd = typeof process !== "undefined" ? process.cwd() : "";
    dotenvConfig({ path: resolve(cwd, ".env") });

    const calId = process.env["GCAL_CALENDAR_ID"];
    if (!calId) return [];

    try {
      const token = await getGCalAccessToken();
      if (!token) {
        console.warn("[GCal freeBusy] Service account non configuré — créneaux tous libres.");
        return [];
      }

      const res = await fetch("https://www.googleapis.com/calendar/v3/freeBusy", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          timeMin: data.timeMin,
          timeMax: data.timeMax,
          items: [{ id: calId }],
        }),
      });

      if (!res.ok) {
        console.error("[GCal freeBusy]", res.status, await res.text());
        return [];
      }

      const json = (await res.json()) as {
        calendars?: Record<string, { busy?: BusySlot[] }>;
      };
      const cals = json.calendars || {};
      return cals[calId]?.busy || Object.values(cals)[0]?.busy || [];
    } catch (err) {
      console.error("[GCal freeBusy]", err);
      return [];
    }
  });
