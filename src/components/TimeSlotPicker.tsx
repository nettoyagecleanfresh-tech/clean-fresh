import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { fetchBusySlots, buildSlots } from "@/lib/gcal";

export function TimeSlotPicker({
  date,
  totalDuration,
  selected,
  onSelect,
}: {
  date: Date;
  totalDuration: number;
  selected: string | null;
  onSelect: (t: string) => void;
}) {
  const [slots, setSlots] = useState<{ time: string; available: boolean }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      const busy = await fetchBusySlots(date);
      const s = buildSlots(date, totalDuration, busy);
      if (!cancelled) { setSlots(s); setLoading(false); }
    }
    load();
    return () => { cancelled = true; };
  }, [date, totalDuration]);

  const formatted = date.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" });

  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
      <p className="text-sm font-bold capitalize text-foreground mb-3">{formatted}</p>
      {loading ? (
        <div className="flex items-center justify-center py-6 gap-2 text-sm text-muted-foreground">
          <Loader2 className="size-4 animate-spin" /> Vérification des disponibilités…
        </div>
      ) : (
        <div className={`grid gap-2 ${slots.length <= 6 ? "grid-cols-3 sm:grid-cols-4" : slots.length <= 10 ? "grid-cols-3 sm:grid-cols-5" : "grid-cols-4 sm:grid-cols-6"}`}>
          {slots.map(slot => (
            <button
              key={slot.time}
              disabled={!slot.available}
              onClick={() => onSelect(slot.time)}
              className={`
                flex flex-col items-center rounded-xl border-2 py-2.5 text-sm font-semibold transition-all
                ${!slot.available
                  ? "border-border bg-secondary/40 text-muted-foreground/40 cursor-not-allowed line-through"
                  : selected === slot.time
                    ? "border-primary bg-primary text-primary-foreground shadow-sm"
                    : "border-border hover:border-primary/40 hover:text-primary cursor-pointer"
                }
              `}
            >
              {slot.time}
              {slot.available && (
                <span className="text-[9px] font-normal opacity-60">Dispo</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
