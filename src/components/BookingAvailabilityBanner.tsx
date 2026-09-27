import { useEffect, useState } from "react";
import { CalendarCheck, CreditCard } from "lucide-react";
import { buildSlots, fetchBusySlots } from "@/lib/gcal";

type NextSlot = { date: Date; time: string };

export function BookingAvailabilityBanner({ durationMin = 60 }: { durationMin?: number }) {
  const [nextSlot, setNextSlot] = useState<NextSlot | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const findNextSlot = async () => {
      setLoading(true);
      setNextSlot(null);

      const start = new Date();
      start.setHours(0, 0, 0, 0);

      // Recherche sur 45 jours. buildSlots applique aussi le délai minimum de 24 h.
      for (let offset = 0; offset < 45 && !cancelled; offset += 1) {
        const date = new Date(start);
        date.setDate(start.getDate() + offset);
        const busy = await fetchBusySlots(date);
        const available = buildSlots(date, durationMin, busy).find((slot) => slot.available);

        if (available) {
          if (!cancelled) setNextSlot({ date, time: available.time });
          break;
        }
      }

      if (!cancelled) setLoading(false);
    };

    void findNextSlot();
    return () => { cancelled = true; };
  }, [durationMin]);

  const formattedDate = nextSlot?.date.toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  return (
    <div className="grid gap-2 sm:grid-cols-2" aria-live="polite">
      <div className="flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-emerald-950">
        <CalendarCheck className="size-5 shrink-0 text-emerald-600" />
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-emerald-700">Disponibilité en temps réel</p>
          <p className="text-sm font-bold">
            {loading
              ? "Recherche du prochain créneau…"
              : nextSlot
                ? <>Prochain créneau : <span className="capitalize">{formattedDate}</span> à {nextSlot.time}</>
                : "Contactez-nous pour le prochain créneau"}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3 rounded-xl border border-sky-200 bg-sky-50 px-4 py-3 text-sky-950">
        <CreditCard className="size-5 shrink-0 text-sky-600" />
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-sky-700">Aucun paiement en ligne</p>
          <p className="text-sm font-bold">Paiement à la fin de la prestation, après votre satisfaction.</p>
        </div>
      </div>
    </div>
  );
}
