import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { fetchBusySlots, buildSlots } from "@/lib/gcal";

const MOIS = ["Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Août","Septembre","Octobre","Novembre","Décembre"];
const JOURS = ["Lu","Ma","Me","Je","Ve","Sa","Di"];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}
function getFirstDayOfMonth(year: number, month: number) {
  const d = new Date(year, month, 1).getDay();
  return d === 0 ? 6 : d - 1;
}

export function CalendarPicker({
  totalDuration,
  selectedDate,
  onSelect,
}: {
  totalDuration: number;
  selectedDate: Date | null;
  onSelect: (d: Date) => void;
}) {
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [busyByDay, setBusyByDay] = useState<Record<string, boolean>>({});
  const [loadingMonth, setLoadingMonth] = useState(false);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoadingMonth(true);
      const days = getDaysInMonth(viewYear, viewMonth);
      const newBusy: Record<string, boolean> = {};
      const minBooking = new Date(Date.now() + 24 * 60 * 60 * 1000);
      const pad2 = (n: number) => String(n).padStart(2, "0");

      const promises = Array.from({ length: days }, async (_, i) => {
        const d = new Date(viewYear, viewMonth, i + 1);
        if (d < today) return;
        const lastSlot = new Date(viewYear, viewMonth, i + 1);
        lastSlot.setHours(21, 0, 0, 0);
        if (lastSlot <= minBooking) return;

        const busy = await fetchBusySlots(d);
        const slotsWithout24h = buildSlots(d, totalDuration, busy).filter(
          s => { const [h, m] = s.time.split(":").map(Number); const sd = new Date(d); sd.setHours(h!, m!, 0, 0); return sd > minBooking; }
        );
        const key = `${viewYear}-${pad2(viewMonth + 1)}-${pad2(i + 1)}`;
        newBusy[key] = slotsWithout24h.length > 0 && slotsWithout24h.every(s => !s.available);
      });
      await Promise.all(promises);
      if (!cancelled) {
        setBusyByDay(newBusy);
        setLoadingMonth(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, [viewYear, viewMonth, totalDuration]);

  const prevMonth = () => {
    if (viewMonth === 0) { setViewYear(y => y - 1); setViewMonth(11); }
    else setViewMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (viewMonth === 11) { setViewYear(y => y + 1); setViewMonth(0); }
    else setViewMonth(m => m + 1);
  };

  const days = getDaysInMonth(viewYear, viewMonth);
  const firstDay = getFirstDayOfMonth(viewYear, viewMonth);
  const cells: (number | null)[] = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: days }, (_, i) => i + 1),
  ];
  while (cells.length % 7 !== 0) cells.push(null);

  const isTodayOrPast = (day: number) => {
    const lastSlot = new Date(viewYear, viewMonth, day);
    lastSlot.setHours(21, 0, 0, 0);
    const minBooking = new Date(Date.now() + 24 * 60 * 60 * 1000);
    return lastSlot <= minBooking;
  };
  const isFullyBooked = (day: number) => {
    const pad2 = (n: number) => String(n).padStart(2, "0");
    const key = `${viewYear}-${pad2(viewMonth + 1)}-${pad2(day)}`;
    return busyByDay[key] === true;
  };
  const isSelected = (day: number) => {
    if (!selectedDate) return false;
    return selectedDate.getFullYear() === viewYear &&
      selectedDate.getMonth() === viewMonth &&
      selectedDate.getDate() === day;
  };

  const canGoPrev = viewYear > today.getFullYear() || viewMonth > today.getMonth();

  return (
    <div className="rounded-xl md:rounded-2xl border border-border bg-card p-3 md:p-5 shadow-sm">
      <div className="flex items-center justify-between mb-2 md:mb-4">
        <button
          onClick={prevMonth}
          disabled={!canGoPrev}
          className="flex size-7 md:size-8 items-center justify-center rounded-lg border border-border text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="size-3.5 md:size-4" />
        </button>
        <span className="text-sm md:text-base font-bold capitalize">
          {MOIS[viewMonth]} {viewYear}
          {loadingMonth && <Loader2 className="inline ml-2 size-3 animate-spin text-muted-foreground" />}
        </span>
        <button
          onClick={nextMonth}
          className="flex size-7 md:size-8 items-center justify-center rounded-lg border border-border text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
        >
          <ChevronRight className="size-3.5 md:size-4" />
        </button>
      </div>

      <div className="grid grid-cols-7 mb-1">
        {JOURS.map(j => (
          <div key={j} className={`text-center text-[9px] md:text-[10px] font-bold uppercase tracking-wider py-1 ${j === "Di" ? "text-muted-foreground/40" : "text-muted-foreground"}`}>
            {j}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-0.5">
        {cells.map((day, i) => {
          if (!day) return <div key={i} />;
          const past = isTodayOrPast(day);
          const full = isFullyBooked(day);
          const disabled = past || full;
          const sel = isSelected(day);

          return (
            <button
              key={day}
              disabled={disabled}
              onClick={() => onSelect(new Date(viewYear, viewMonth, day))}
              className={`
                relative flex items-center justify-center rounded-md md:rounded-lg text-xs md:text-sm font-medium h-8 md:h-9 transition-all
                ${sel
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : disabled
                    ? "text-muted-foreground/30 cursor-not-allowed"
                    : "text-foreground hover:bg-primary/10 hover:text-primary cursor-pointer"
                }
                ${full && !past ? "line-through" : ""}
              `}
            >
              {day}
            </button>
          );
        })}
      </div>

      <p className="mt-2.5 text-[10px] md:text-[11px] text-center text-muted-foreground">
        Lundi – Dimanche · 08h00 – 21h00 · Réservation 24h à l'avance
      </p>
    </div>
  );
}
