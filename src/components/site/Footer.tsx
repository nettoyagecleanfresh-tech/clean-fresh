import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { CalendarCheck, Mail, Phone, Instagram, Facebook, ChevronDown } from "lucide-react";
import { COMPANY, MENU_BATIMENT, MENU_TEXTILE } from "@/data/site";

export function Footer() {
  const [textileOpen, setTextileOpen] = useState(false);
  const [batimentOpen, setBatimentOpen] = useState(false);

  return (
    <footer className="mt-20 bg-ink text-ink-foreground">
      {/* Top accent */}
      <div className="h-1 w-full bg-primary-gradient" />

      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 grid-cols-2 md:grid-cols-4">
        {/* Brand */}
        <div className="col-span-2 md:col-span-1">
          <Link to="/" className="inline-block">
            <img src="/logo.png" alt="Clean & Fresh Logo" className="h-20 w-auto object-contain" />
          </Link>
          <p className="mt-3 text-sm text-ink-foreground/70 leading-relaxed">{COMPANY.slogan}</p>
          <p className="mt-4 text-sm text-ink-foreground/50 leading-relaxed">
            Entreprise de nettoyage à Toulouse et dans toute la Haute-Garonne, pour les particuliers
            et les professionnels.
          </p>
          <Link
            to="/formules"
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-accent-gradient px-4 py-2.5 text-sm font-bold text-accent-foreground hover:opacity-90 transition-opacity"
          >
            <CalendarCheck className="size-4" /> Réserver en ligne
          </Link>
        </div>

        {/* Textile & auto */}
        <div className="col-span-2 md:col-span-1 border-b border-ink-foreground/10 md:border-none pb-4 md:pb-0">
          <button
            onClick={() => setTextileOpen(!textileOpen)}
            className="flex w-full items-center justify-between text-left md:pointer-events-none md:block"
          >
            <h2 className="text-[10px] font-bold uppercase tracking-widest text-ink-foreground/50">
              Textile & auto
            </h2>
            <ChevronDown className={`size-4 text-ink-foreground/50 transition-transform md:hidden ${textileOpen ? "rotate-180" : ""}`} />
          </button>
          <ul className={`mt-4 space-y-2.5 text-sm text-ink-foreground/65 md:block ${textileOpen ? "block" : "hidden"}`}>
            {MENU_TEXTILE.map((s) => (
              <li key={s.slug}>
                <Link to={s.slug} className="hover:text-ink-foreground transition-colors">
                  {s.navLabel}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Bâtiment */}
        <div className="col-span-2 md:col-span-1 border-b border-ink-foreground/10 md:border-none pb-4 md:pb-0">
          <button
            onClick={() => setBatimentOpen(!batimentOpen)}
            className="flex w-full items-center justify-between text-left md:pointer-events-none md:block"
          >
            <h2 className="text-[10px] font-bold uppercase tracking-widest text-ink-foreground/50">
              Nettoyage bâtiment
            </h2>
            <ChevronDown className={`size-4 text-ink-foreground/50 transition-transform md:hidden ${batimentOpen ? "rotate-180" : ""}`} />
          </button>
          <ul className={`mt-4 grid grid-cols-2 gap-x-4 gap-y-2.5 md:grid-cols-1 md:block text-sm text-ink-foreground/65 ${batimentOpen ? "grid" : "hidden"}`}>
            {MENU_BATIMENT.map((s) => (
              <li key={s.slug}>
                <Link to={s.slug} className="hover:text-ink-foreground transition-colors">
                  {s.navLabel}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div className="col-span-2 md:col-span-1">
          <h2 className="text-[10px] font-bold uppercase tracking-widest text-ink-foreground/50">
            Contact
          </h2>
          <ul className="mt-4 space-y-3 text-sm text-ink-foreground/65">
            <li>
              <a
                href={COMPANY.phoneHref}
                className="inline-flex items-center gap-2 hover:text-ink-foreground transition-colors font-semibold"
              >
                <Phone className="size-4" /> {COMPANY.phone}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${COMPANY.email}`}
                className="inline-flex items-center gap-2 break-all hover:text-ink-foreground transition-colors"
              >
                <Mail className="size-4 shrink-0" /> {COMPANY.email}
              </a>
            </li>
            <li className="text-ink-foreground/45">Toulouse & agglomération (31)</li>
            <li>
              <Link
                to="/tarifs"
                className="hover:text-ink-foreground transition-colors font-medium"
              >
                → Tarifs & prix
              </Link>
            </li>
            <li>
              <Link
                to="/formules"
                className="hover:text-ink-foreground transition-colors font-medium"
              >
                → Réserver en ligne
              </Link>
            </li>
            <li>
              <Link
                to="/contactez-nous"
                className="hover:text-ink-foreground transition-colors font-medium"
              >
                → Devis gratuit sous 24h
              </Link>
            </li>
            <li className="pt-2 flex items-center gap-4 text-ink-foreground/60">
              <a href="https://www.instagram.com/cleanetfresh31" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-[#E1306C] hover:opacity-80 transition-opacity">
                <Instagram className="size-5" />
              </a>
              <a href="https://www.facebook.com/profile.php?id=61579620873055" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-[#1877F2] hover:opacity-80 transition-opacity">
                <Facebook className="size-5" />
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-ink-foreground/10 py-6 text-center text-xs text-ink-foreground/40 space-y-2">
        <p>© 2026 Clean&Fresh — Tous droits réservés — Toulouse, Haute-Garonne</p>
        <div className="flex flex-wrap justify-center gap-4 text-ink-foreground/50">
          <Link to="/a-propos" className="hover:text-ink-foreground transition-colors">À Propos</Link>
          <Link to="/mentions-legales" className="hover:text-ink-foreground transition-colors">Mentions Légales</Link>
          <Link to="/politique-confidentialite" className="hover:text-ink-foreground transition-colors">Confidentialité</Link>
          <Link to="/cgv" className="hover:text-ink-foreground transition-colors">CGV</Link>
        </div>
      </div>
    </footer>
  );
}

import { useLocation } from "@tanstack/react-router";

export function StickyCallCta() {
  const location = useLocation();
  
  if (location.pathname === "/reserver") {
    return null;
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-border/60 bg-background/97 p-3 backdrop-blur lg:hidden">
      <div className="flex gap-2">
        <a
          href={COMPANY.phoneHref}
          className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-primary-gradient text-sm font-bold text-primary-foreground shadow-[var(--shadow-soft)]"
        >
          <Phone className="size-4" /> {COMPANY.phone}
        </a>
        <Link
          to="/formules"
          className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-accent-gradient px-4 text-sm font-bold text-accent-foreground shadow-[var(--shadow-soft)]"
        >
          <CalendarCheck className="size-4" /> Je réserve
        </Link>
      </div>
    </div>
  );
}
