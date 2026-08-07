import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { CalendarCheck, X } from "lucide-react";
import { COMPANY } from "@/data/site";

export function TopBanner() {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;

  return (
    <div className="relative z-50 bg-accent-gradient text-accent-foreground">
      <div className="flex items-center justify-center gap-3 px-4 py-2 pr-10">
        <CalendarCheck className="size-4 shrink-0" />
        <p className="text-sm font-semibold hidden sm:block">
          Consultez les prochains créneaux disponibles — réservez votre nettoyage en ligne en 2 minutes
        </p>
        <p className="text-sm font-semibold sm:hidden">
          Réservez votre nettoyage en ligne
        </p>
        <Link
          to="/formules"
          className="shrink-0 rounded-full border border-accent-foreground/40 bg-accent-foreground/20 px-3 py-1 text-xs font-bold uppercase tracking-wider hover:bg-accent-foreground/30 transition-colors"
        >
          Réserver →
        </Link>
      </div>
      <button
        onClick={() => setVisible(false)}
        aria-label="Fermer"
        className="absolute right-3 top-1/2 -translate-y-1/2 rounded p-0.5 opacity-70 hover:opacity-100 transition-opacity"
      >
        <X className="size-3.5" />
      </button>
    </div>
  );
}
