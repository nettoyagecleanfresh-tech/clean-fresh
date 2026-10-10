import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { CalendarCheck, X } from "lucide-react";


export function TopBanner() {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;

  return (
    <div className="relative z-50 bg-accent-gradient text-accent-foreground">
      <div className="flex items-center justify-center gap-2 px-3 py-1 pr-12 sm:gap-3 sm:px-4 sm:py-2 sm:pr-12">
        <CalendarCheck className="size-4 shrink-0" />
        <p className="text-sm font-semibold hidden sm:block">
          Consultez les prochains créneaux disponibles — réservez votre nettoyage en ligne en 2 minutes
        </p>
        <p className="text-xs font-semibold sm:hidden">
          Nettoyage à domicile
        </p>
        <Link
          to="/formules"
          className="inline-flex min-h-9 items-center shrink-0 rounded-full border border-accent-foreground/40 bg-accent-foreground/20 px-3 py-1 text-xs font-bold uppercase tracking-wider hover:bg-accent-foreground/30 transition-colors"
        >
          Réserver →
        </Link>
      </div>
      <button
        onClick={() => setVisible(false)}
        aria-label="Fermer"
        className="absolute right-1 top-1/2 flex size-11 -translate-y-1/2 items-center justify-center rounded opacity-70 hover:opacity-100 transition-opacity"
      >
        <X className="size-3.5" />
      </button>
    </div>
  );
}
