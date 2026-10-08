import { useEffect, useState } from "react";
import { CalendarCheck, CreditCard } from "lucide-react";
import { savePreferredSlot } from "@/lib/preferredSlot";
import { buildSlots, fetchBusySlots } from "@/lib/gcal";

type NextSlot = { date: Date; time: string };

export function BookingAvailabilityBanner({
  durationMin = 60,
  bookingHref = "/reserver",
  onReserveSlot,
}: {
  durationMin?: number;
  bookingHref?: string;
  onReserveSlot?: (slot: NextSlot) => void;
}) {
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
        // Évite un appel Agenda pour les jours exclus par le délai minimum.
        if (!buildSlots(date, durationMin, []).some(slot => slot.available)) continue;
        const busy = await fetchBusySlots(date, true);
        const available = buildSlots(date, durationMin, busy).find((slot) => slot.available);

        if (available) {
          if (!cancelled) setNextSlot({ date, time: available.time });
          break;
        }
      }

      if (!cancelled) setLoading(false);
    };

    void findNextSlot().catch(() => {
      if (!cancelled) { setNextSlot(null); setLoading(false); }
    });
    return () => { cancelled = true; };
  }, [durationMin]);

  const formattedDate = nextSlot?.date.toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  const handleReserveSlot = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (!nextSlot) { event.preventDefault(); return; }
    savePreferredSlot(nextSlot);
    if (onReserveSlot) {
      event.preventDefault();
      onReserveSlot({ date: new Date(nextSlot.date), time: nextSlot.time });
    }
  };

  return (
    <div
      className="flex flex-col gap-2 rounded-xl border border-primary/15 bg-white px-3 py-2.5 text-xs shadow-sm sm:flex-row sm:items-center sm:justify-center sm:gap-4"
      aria-live="polite"
    >
      <a href={bookingHref} onClick={handleReserveSlot} className="flex items-center gap-2 rounded-md text-emerald-900 hover:text-emerald-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
        <CalendarCheck className="size-4 shrink-0 text-emerald-600" />
        <p className="font-bold leading-tight">
            {loading
              ? "Recherche du prochain créneau…"
              : nextSlot
                ? <>Prochain créneau : <span className="capitalize">{formattedDate}</span> à {nextSlot.time}</>
                : "Contactez-nous pour le prochain créneau"}
        </p>
      </a>

      <span className="hidden h-4 w-px bg-border sm:block" aria-hidden="true" />

      <div className="flex items-center gap-2 text-sky-950">
        <CreditCard className="size-4 shrink-0 text-sky-600" />
        <p className="font-bold leading-tight">
          Aucun paiement en ligne <span className="font-medium text-muted-foreground">· Paiement à la fin, après votre satisfaction</span>
        </p>
      </div>

      <a
        href={bookingHref}
        onClick={handleReserveSlot}
        aria-disabled={!nextSlot}
        className="inline-flex items-center justify-center rounded-lg bg-primary px-3 py-2 text-xs font-bold text-white shadow-sm transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 sm:ml-1"
      >
        Réserver ce créneau
      </a>
    </div>
  );
}
