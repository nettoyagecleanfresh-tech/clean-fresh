import { useState, type ReactNode } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  CalendarCheck, Phone, Star, ArrowRight, Armchair, Car,
  CheckCircle2, Info, Layers, BedDouble, MapPin, Zap, Shield, Leaf, ChevronRight, Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { COMPANY, SITE_URL } from "@/data/site";
import { FadeIn } from "@/components/ui/fade-in";

const TITLE = "Réserver un Nettoyage à Toulouse — Canapé, Matelas, Auto | Clean&Fresh";
const DESC = "Réservez votre nettoyage en ligne : canapé dès 79 €, matelas dès 59 €, auto dès 69 €. Intervention à domicile à Toulouse et agglomération. Simple et rapide.";

type FormulesSearch = {
  service?: string;
};

export const Route = createFileRoute("/formules")({
  validateSearch: (search: Record<string, unknown>): FormulesSearch => {
    return {
      service: search.service as string | undefined,
    };
  },
  head: () => ({
    meta: [
      { title: `Réserver un Nettoyage à Toulouse — Canapé, Matelas, Auto | Clean&Fresh` },
      { name: "description", content: `Réservez votre nettoyage en ligne : canapé dès 79 €, matelas dès 59 €, auto dès 69 €. Intervention à domicile à Toulouse et agglomération. Simple et rapide.` },
      { property: "og:title", content: `Réserver un Nettoyage à Toulouse — Canapé, Matelas, Auto | Clean&Fresh` },
      { property: "og:description", content: `Réservez votre nettoyage en ligne : canapé dès 79 €, matelas dès 59 €, auto dès 69 €. Intervention à domicile à Toulouse et agglomération. Simple et rapide.` },
      { property: "og:url", content: `https://cleanetfresh.fr/formules` },
      { name: "twitter:title", content: `Réserver un Nettoyage à Toulouse — Canapé, Matelas, Auto | Clean&Fresh` },
      { name: "twitter:description", content: `Réservez votre nettoyage en ligne : canapé dès 79 €, matelas dès 59 €, auto dès 69 €. Intervention à domicile à Toulouse et agglomération. Simple et rapide.` },
    ],
    links: [{ rel: "canonical", href: `https://cleanetfresh.fr/formules` }],
  }),
  component: FormulesPage,
});

// ─── DATA ─────────────────────────────────────────────────────────────────────

const CANAPE_ITEMS = [
  { id: "fauteuil",  label: "Fauteuil",           price: "49 €",        duration: "45 min", desc: "Injection-extraction de l'assise et du dossier. Résultat visible en moins d'1h." },
  { id: "canape-2",  label: "Canapé 2 / 3 places", price: "79 €",       duration: "1h",     popular: true, desc: "Notre prestation la plus demandée. Assise, dossier et coussins amovibles traités en profondeur." },
  { id: "canape-45", label: "Canapé 4 / 5 places", price: "99 €",       duration: "1h",     desc: "Grande surface traitée intégralement. Idéal même pour les canapés très encrassés." },
  { id: "canape-u",  label: "Canapé U / Angle",    price: "99 €",       duration: "1h",     desc: "Tous les modules y compris la partie angle. Aucun recoin oublié." },
  { id: "pouf",      label: "Pouf",                price: "19 €",       duration: "30 min", desc: "Tissu, velours, toutes matières. Idéal à combiner avec le nettoyage canapé." },
  { id: "chaise",    label: "Chaise rembourrée",   price: "15 € / pièce", duration: "20 min", desc: "Propre et désinfectée en quelques minutes. Tarif dégressif à partir de 4 chaises." },
];

const CANAPE_OPTIONS = [
  { name: "Traitement anti-acariens et bactériens", price: 19, desc: "Élimination des acariens et bactéries (traitement professionnel). Recommandé pour les personnes sensibles.", popular: true },
  { name: "Élimination des poils d'animaux", price: 15, desc: "Brossage mécanique spécifique avant l'injection-extraction.", popular: true },
  { name: "Détachage intensif", price: 19, desc: "Traitement ciblé pour les tâches anciennes (sang, vin, encre, café).", popular: false },
  { name: "Traitement anti-odeur", price: 15, desc: "Neutralisation moléculaire des mauvaises odeurs incrustées.", popular: true },
];

const CUIR_ITEMS = [
  { id: "cuir-fauteuil",  label: "Fauteuil",           price: "49 €",        duration: "45 min", desc: "Nettoyage manuel doux et respectueux." },
  { id: "cuir-canape-2",  label: "Canapé 2/3 places",  price: "79 €",       duration: "1h",     popular: true, desc: "Soin complet et nettoyage à la main." },
  { id: "cuir-canape-angle", label: "Canapé d'angle",  price: "99 €",       duration: "1h",     desc: "Nettoyage intégral grand format." },
  { id: "cuir-auto",      label: "Sièges auto",        price: "69 €",       duration: "1h",     desc: "Habitacle complet, nettoyage cuir auto." },
];

const CUIR_OPTIONS = [
  { name: "Soin nourrissant & protecteur cuir", price: 35, desc: "Hydrate, assouplit et protège le cuir contre le craquèlement.", popular: true },
  { name: "Détachage intensif", price: 19, desc: "Traitement ciblé pour les taches spécifiques.", popular: false },
  { name: "Traitement anti-odeur", price: 15, desc: "Neutralisation moléculaire des mauvaises odeurs incrustées.", popular: false },
];

const TAPIS_OPTIONS = [
  { name: "Traitement anti-acariens et bactériens", price: 19, desc: "Élimination des acariens et bactéries (traitement professionnel) dans les fibres du tapis.", popular: true },
  { name: "Nettoyage recto-verso", price: 25, desc: "Nettoyage des deux faces du tapis pour un résultat total." },
  { name: "Détachage intensif", price: 19, desc: "Traitement ciblé pour les tâches anciennes (sang, vin, encre, café)." },
  { name: "Traitement anti-odeur", price: 15, desc: "Neutralisation moléculaire des mauvaises odeurs incrustées.", popular: true },
];

const MATELAS_OPTIONS = [
  { name: "Traitement anti-acariens et bactériens", price: 19, desc: "Élimination des acariens et bactéries (traitement professionnel). Indispensable pour les allergiques.", popular: true },
  { name: "Détachage intensif", price: 19, desc: "Traitement ciblé pour les tâches résistantes (transpiration, sang…)." },
  { name: "Traitement anti-odeur", price: 15, desc: "Neutralisation moléculaire des mauvaises odeurs incrustées.", popular: true },
];

const AUTO_PACKS = [
  {
    id: "bronze", emoji: "🥉", name: "Pack Bronze", price: "69 €", tagline: "Entretien régulier", duration: "1h",
    badge: null as string | null, featured: false,
    included: ["Aspiration complète de l'habitacle", "Nettoyage des plastiques et tableau de bord", "Nettoyage des vitres intérieures", "Nettoyage des tapis de sol"],
    options: [
      { name: "Protection UV & antistatique plastiques", price: 19, popular: true },
      { name: "Traitement anti-acariens et bactériens", price: 19, popular: false },
      { name: "Élimination des poils d'animaux", price: 25, popular: false },
      { name: "Traitement anti-odeur (tabac, animaux)", price: 15, popular: true },
      { name: "Nettoyage du ciel de toit", price: 29, popular: false },
      { name: "Shampouinage des sièges auto", price: 39, popular: false },
    ],
  },
  {
    id: "argent", emoji: "🥈", name: "Pack Argent", price: "99 €", tagline: "Nettoyage complet", duration: "1h30",
    badge: "⭐ Le + vendu" as string | null, featured: true,
    included: ["Tout le Pack Bronze inclus", "Injection-extraction des sièges tissu", "Vitres sans traces (intérieur + extérieur)", "Joints et recoins traités en détail"],
    options: [
      { name: "Traitement hydrophobe & anti-taches", price: 55, popular: true },
      { name: "Traitement enzymatique intensif", price: 19, popular: false },
      { name: "Protection UV & antistatique plastiques", price: 19, popular: false },
      { name: "Traitement anti-acariens et bactériens", price: 19, popular: false },
      { name: "Élimination des poils d'animaux", price: 25, popular: false },
      { name: "Détachage intensif — siège très taché", price: 19, popular: false },
      { name: "Traitement anti-odeur (tabac, animaux)", price: 15, popular: true },
      { name: "Nettoyage du ciel de toit", price: 29, popular: false },
      { name: "Shampouinage des tapis de sol", price: 15, popular: false },
    ],
  },
  {
    id: "or", emoji: "🥇", name: "Pack Or", price: "129 €", tagline: "État showroom", duration: "2h",
    badge: "✨ Premium" as string | null, featured: false,
    included: ["Tout le Pack Argent inclus", "Shampouinage injection-extraction moquettes", "Nettoyage complet du coffre", "Nettoyage contour et bas de porte"],
    options: [
      { name: "Traitement hydrophobe & anti-taches", price: 99, popular: true },
      { name: "Traitement enzymatique intensif", price: 19, popular: false },
      { name: "Protection UV & antistatique plastiques", price: 19, popular: false },
      { name: "Traitement anti-acariens et bactériens", price: 19, popular: false },
      { name: "Élimination des poils d'animaux", price: 25, popular: false },
      { name: "Détachage intensif — tâche résistante", price: 19, popular: false },
      { name: "Traitement anti-odeur (tabac, animaux)", price: 15, popular: true },
      { name: "Nettoyage du ciel de toit", price: 29, popular: false },
    ],
  },
  {
    id: "siege", emoji: "💺", name: "Rénovation siège", price: "59 €", tagline: "Ciblé", duration: "45 min",
    badge: null as string | null, featured: false,
    included: ["Injection-extraction d'un siège", "Élimination des taches tenaces", "Traitement des auréoles", "Résultat visible immédiatement"],
    options: [
      { name: "Traitement enzymatique intensif", price: 19, popular: false },
      { name: "Traitement anti-acariens et bactériens", price: 19, popular: true },
      { name: "Élimination des poils d'animaux", price: 25, popular: false },
      { name: "Détachage intensif — siège très taché", price: 19, popular: false },
      { name: "Traitement anti-odeur (tabac, animaux)", price: 15, popular: true },
    ],
  },
];

// ─── SHARED COMPONENTS ────────────────────────────────────────────────────────

function MiniPriceCard({ title, price, items, badge, featured, icon }: {
  title: string; price: string; items: string[]; badge?: string; featured?: boolean; icon?: ReactNode;
}) {
  return (
    <div className={[
      "relative flex flex-col rounded-2xl p-5 shadow-sm",
      featured ? "bg-primary text-white ring-2 ring-primary scale-[1.02]" : "border border-border bg-white",
    ].join(" ")}>
      {badge && (
        <span className={[
          "absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full px-3 py-1 text-[10px] font-bold shadow",
          featured ? "bg-white text-primary" : "bg-primary text-white",
        ].join(" ")}>{badge}</span>
      )}
      {icon && (
        <div className={`w-16 h-11 mb-3 ${featured ? "text-white/80" : "text-primary/70"}`}>{icon}</div>
      )}
      <h3 className={`text-sm font-bold ${featured ? "text-white" : "text-foreground"}`}>{title}</h3>
      <p className={`mt-1.5 text-3xl font-bold leading-none ${featured ? "text-white" : "text-primary"}`}>{price}</p>
      <ul className="mt-3 flex-1 space-y-1.5">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-2 text-xs">
            <CheckCircle2 className={`size-3.5 shrink-0 mt-0.5 ${featured ? "text-white/80" : "text-primary"}`} />
            <span className={featured ? "text-white/90" : "text-muted-foreground"}>{item}</span>
          </li>
        ))}
      </ul>
      <Link to="/reserver" search={{ from: "formules" }}
        className={[
          "mt-4 inline-flex w-full items-center justify-center gap-1.5 rounded-xl py-2.5 text-xs font-bold transition-opacity hover:opacity-90",
          featured ? "bg-white text-primary" : "bg-primary text-white",
        ].join(" ")}>
        <CalendarCheck className="size-3.5" /> Je réserve
      </Link>
    </div>
  );
}

function OptionsBlock({ options }: { options: { name: string; price: number; desc: string; popular?: boolean }[] }) {
  return (
    <div className="mt-5 rounded-2xl border border-dashed border-border bg-secondary/30 p-5">
      <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">
        Options disponibles <span className="normal-case font-normal opacity-60">(à ajouter lors de la réservation)</span>
      </p>
      <div className="grid gap-2.5 sm:grid-cols-2">
        {options.map((opt) => (
          <div key={opt.name} className="flex items-start gap-3 rounded-xl border border-border bg-white p-3">
            <CheckCircle2 className="size-4 shrink-0 mt-0.5 text-primary" />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-semibold">{opt.name}</span>
                {opt.popular && (
                  <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-primary">Populaire</span>
                )}
              </div>
              <p className="mt-0.5 text-xs text-muted-foreground leading-snug">{opt.desc}</p>
            </div>
            <span className="shrink-0 font-bold text-xs text-primary whitespace-nowrap">+{opt.price} €</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── CANAPÉ DETAIL ────────────────────────────────────────────────────────────

const CANAPE_IMAGES: Record<string, string> = {
  "fauteuil": "/images/canape/fauteuil.png",
  "canape-2": "/images/canape/canape-2-3.png",
  "canape-45": "/images/canape/canape-4-5.png",
  "canape-u": "/images/canape/canape-u.png",
  "pouf": "/images/canape/pouf.png",
  "chaise": "/images/canape/chaise.png",
};


const CARD_UNSELECTED_CLASS = "relative flex flex-col items-center rounded-[20px] border border-transparent bg-[#e5e9f0]/60 px-2 py-4 text-center transition-all duration-300 shadow-[0_4px_20px_-5px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_25px_-5px_rgba(0,0,0,0.1)] hover:-translate-y-1";
const CARD_SELECTED_CLASS = "relative flex flex-col items-center rounded-[20px] border-2 border-[#7cdcdc] bg-[#d0ebeb]/80 px-2 py-4 text-center transition-all duration-300 shadow-[0_0_30px_-5px_rgba(124,220,220,0.7)]";
const BADGE_CLASS = "absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg border border-[#d4af37] bg-[#1a2b4c] px-3 py-0.5 text-[9px] font-bold uppercase tracking-wider text-[#d4af37] shadow-lg";

function CanapeDetail() {
  const [selected, setSelected] = useState("canape-2");
  const item = CANAPE_ITEMS.find((i) => i.id === selected)!;

  return (
    <div>
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-4 mb-6">
        {CANAPE_ITEMS.map((c) => {
          const isSelected = selected === c.id;
          return (
            <button
              key={c.id}
              onClick={() => setSelected(c.id)}
              className={isSelected ? CARD_SELECTED_CLASS : CARD_UNSELECTED_CLASS}
            >

              <div className={`flex items-center justify-center w-full h-24 sm:h-32 mb-3 mt-1 px-0 transition-colors ${isSelected ? "text-[#1a2b4c]" : "text-primary/70"}`}>
                <img src={CANAPE_IMAGES[c.id]} alt={c.label} className="w-full h-full object-contain mix-blend-multiply scale-125 sm:scale-[1.35]" loading="lazy" />
              </div>

              <p className="text-[9px] font-semibold uppercase tracking-widest text-muted-foreground/80 leading-none">Dès</p>
              <p className={`text-lg font-bold leading-tight mt-1 ${isSelected ? "text-[#1a2b4c]" : "text-foreground"}`}>
                {c.price}
              </p>
              <p className="text-[11px] font-medium text-muted-foreground leading-snug mt-1.5 text-center px-1">
                {c.label}
              </p>
              {"duration" in c && c.duration && (
                <p className="mt-1 flex items-center justify-center gap-1 text-[10px] text-muted-foreground/60 leading-none">
                  <Clock className="size-2.5 shrink-0" /> {(c as { duration: string }).duration}
                </p>
              )}
            </button>
          );
        })}
      </div>

      {/* Detail panel */}
      <div className="rounded-[24px] border border-primary/10 bg-white p-7 shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-start gap-8">
          <div className="flex-1">
            
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
            <div className="mt-5 space-y-2.5">
              {["Injection-extraction professionnelle", "Traitement des taches, auréoles et odeurs", "Résultat visible immédiatement", "Résultat professionnel"].map((pt) => (
                <div key={pt} className="flex items-center gap-3 text-sm text-foreground/80 font-medium">
                  <CheckCircle2 className="size-4.5 shrink-0 text-primary" /> {pt}
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col items-start sm:items-end shrink-0 gap-4 bg-secondary/30 p-5 rounded-2xl w-full sm:w-auto">
            <div className="sm:text-right">
              <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold">À partir de</p>
              <p className="text-5xl font-black text-primary leading-none mt-1">{item.price}</p>
              {"duration" in item && item.duration && (
                <p className="flex items-center gap-1.5 sm:justify-end text-xs text-muted-foreground font-medium mt-1.5">
                  <Clock className="size-3.5 shrink-0" /> {(item as { duration: string }).duration} d'intervention
                </p>
              )}
            </div>
            <Link to="/reserver" search={{ service: "canape", formule: selected, from: "formules" }} onClick={() => window.scrollTo(0,0)}
              className="inline-flex items-center justify-center gap-2 w-full rounded-xl bg-primary px-6 py-3.5 text-sm font-bold text-white shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all">
              <CalendarCheck className="size-4" /> Je réserve
            </Link>
            <p className="text-xs text-muted-foreground/80 font-medium">Déplacement gratuit · Paiement sur place</p>
          </div>
        </div>
      </div>

      <OptionsBlock options={CANAPE_OPTIONS} />
    </div>
  );
}

// ─── CUIR DETAIL ──────────────────────────────────────────────────────────────

const CUIR_IMAGES: Record<string, string> = {
  "cuir-fauteuil": "/images/canape/fauteuil.png",
  "cuir-canape-2": "/images/canape/canape-2-3.png",
  "cuir-canape-angle": "/images/canape/canape-u.png",
  "cuir-auto": "/images/auto/renov.png",
};

function CuirDetail() {
  const [selected, setSelected] = useState("cuir-canape-2");
  const item = CUIR_ITEMS.find((i) => i.id === selected)!;

  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        {CUIR_ITEMS.map((c) => {
          const isSelected = selected === c.id;
          return (
            <button
              key={c.id}
              onClick={() => setSelected(c.id)}
              className={isSelected ? CARD_SELECTED_CLASS : CARD_UNSELECTED_CLASS}
            >

              <div className={`flex items-center justify-center w-full h-24 sm:h-32 mb-3 mt-1 px-0 transition-colors ${isSelected ? "text-[#1a2b4c]" : "text-primary/70"}`}>
                <img src={CUIR_IMAGES[c.id]} alt={c.label} className="w-full h-full object-contain mix-blend-multiply scale-125 sm:scale-[1.35]" loading="lazy" />
              </div>

              <p className="text-[9px] font-semibold uppercase tracking-widest text-muted-foreground/80 leading-none">Dès</p>
              <p className={`text-lg font-bold leading-tight mt-1 ${isSelected ? "text-[#1a2b4c]" : "text-foreground"}`}>
                {c.price}
              </p>
              <p className="text-[11px] font-medium text-muted-foreground leading-snug mt-1.5 text-center px-1">
                {c.label}
              </p>
              {"duration" in c && c.duration && (
                <p className="mt-1 flex items-center justify-center gap-1 text-[10px] text-muted-foreground/60 leading-none">
                  <Clock className="size-2.5 shrink-0" /> {(c as { duration: string }).duration}
                </p>
              )}
            </button>
          );
        })}
      </div>

      <div className="rounded-[24px] border border-primary/10 bg-white p-7 shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-start gap-8">
          <div className="flex-1">
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
            <div className="mt-5 space-y-2.5">
              {["Nettoyage manuel professionnel", "Respect du cuir (pH neutre)", "Résultat immédiat", "Option nourrissante disponible"].map((pt) => (
                <div key={pt} className="flex items-center gap-3 text-sm text-foreground/80 font-medium">
                  <CheckCircle2 className="size-4.5 shrink-0 text-primary" /> {pt}
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col items-start sm:items-end shrink-0 gap-4 bg-secondary/30 p-5 rounded-2xl w-full sm:w-auto">
            <div className="sm:text-right">
              <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold">À partir de</p>
              <p className="text-5xl font-black text-primary leading-none mt-1">{item.price}</p>
              {"duration" in item && item.duration && (
                <p className="flex items-center gap-1.5 sm:justify-end text-xs text-muted-foreground font-medium mt-1.5">
                  <Clock className="size-3.5 shrink-0" /> {(item as { duration: string }).duration} d'intervention
                </p>
              )}
            </div>
            <Link to="/reserver" search={{ service: "cuir", formule: selected, from: "formules" }} onClick={() => window.scrollTo(0,0)}
              className="inline-flex items-center justify-center gap-2 w-full rounded-xl bg-primary px-6 py-3.5 text-sm font-bold text-white shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all">
              <CalendarCheck className="size-4" /> Je réserve
            </Link>
            <p className="text-xs text-muted-foreground/80 font-medium">Déplacement gratuit · Paiement sur place</p>
          </div>
        </div>
      </div>

      <OptionsBlock options={CUIR_OPTIONS} />
    </div>
  );
}

// ─── TAPIS / AUTO / MATELAS SVGs ──────────────────────────────────────────────

const SVG_1_TAPIS = (
  <svg viewBox="0 0 90 58" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    {/* fringe left */}
    {[12,20,28,36,44].map((y) => <rect key={y} x="4" y={y} width="6" height="4" rx="2" fill="currentColor" opacity="0.4"/>)}
    {/* fringe right */}
    {[12,20,28,36,44].map((y) => <rect key={y} x="80" y={y} width="6" height="4" rx="2" fill="currentColor" opacity="0.4"/>)}
    {/* rug body */}
    <rect x="10" y="6" width="70" height="46" rx="5" fill="currentColor"/>
    {/* inner border */}
    <rect x="16" y="12" width="58" height="34" rx="3" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.25"/>
    {/* pattern lines */}
    <line x1="22" y1="12" x2="22" y2="46" stroke="currentColor" strokeWidth="1" opacity="0.15"/>
    <line x1="45" y1="12" x2="45" y2="46" stroke="currentColor" strokeWidth="1" opacity="0.15"/>
    <line x1="68" y1="12" x2="68" y2="46" stroke="currentColor" strokeWidth="1" opacity="0.15"/>
    <line x1="16" y1="29" x2="74" y2="29" stroke="currentColor" strokeWidth="1" opacity="0.15"/>
  </svg>
);

const SVG_2_TAPIS = (
  <svg viewBox="0 0 90 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    {/* back rug */}
    <rect x="14" y="4" width="66" height="40" rx="5" fill="currentColor" opacity="0.45"/>
    <rect x="20" y="10" width="54" height="28" rx="3" fill="none" stroke="currentColor" strokeWidth="1.2" opacity="0.2"/>
    {/* front rug */}
    {[14,22,30,38].map((y) => <rect key={y} x="4" y={y} width="5" height="4" rx="2" fill="currentColor" opacity="0.4"/>)}
    {[14,22,30,38].map((y) => <rect key={y} x="76" y={y} width="5" height="4" rx="2" fill="currentColor" opacity="0.4"/>)}
    <rect x="9" y="16" width="68" height="40" rx="5" fill="currentColor"/>
    <rect x="15" y="22" width="56" height="28" rx="3" fill="none" stroke="currentColor" strokeWidth="1.2" opacity="0.2"/>
    <line x1="15" y1="36" x2="71" y2="36" stroke="currentColor" strokeWidth="1" opacity="0.15"/>
  </svg>
);

const SVG_3_TAPIS = (
  <svg viewBox="0 0 90 62" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    {/* rug 1 (back) */}
    <rect x="16" y="2" width="62" height="34" rx="4" fill="currentColor" opacity="0.3"/>
    {/* rug 2 (middle) */}
    <rect x="10" y="12" width="64" height="36" rx="4" fill="currentColor" opacity="0.5"/>
    <rect x="16" y="18" width="52" height="24" rx="3" fill="none" stroke="currentColor" strokeWidth="1.2" opacity="0.2"/>
    {/* rug 3 (front) */}
    {[22,30,38,46].map((y) => <rect key={y} x="3" y={y} width="5" height="4" rx="2" fill="currentColor" opacity="0.4"/>)}
    {[22,30,38,46].map((y) => <rect key={y} x="78" y={y} width="5" height="4" rx="2" fill="currentColor" opacity="0.4"/>)}
    <rect x="8" y="24" width="70" height="36" rx="5" fill="currentColor"/>
    <rect x="14" y="30" width="58" height="24" rx="3" fill="none" stroke="currentColor" strokeWidth="1.2" opacity="0.2"/>
    <line x1="14" y1="42" x2="72" y2="42" stroke="currentColor" strokeWidth="1" opacity="0.15"/>
  </svg>
);

const SVG_AUTO = (
  <svg viewBox="0 0 110 62" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    {/* car shadow */}
    <ellipse cx="55" cy="58" rx="44" ry="4" fill="currentColor" opacity="0.12"/>
    {/* car body lower */}
    <rect x="6" y="30" width="98" height="22" rx="6" fill="currentColor"/>
    {/* car roof */}
    <path d="M28 30 Q34 10 46 8 L72 8 Q84 10 86 30Z" fill="currentColor" opacity="0.7"/>
    {/* windshield */}
    <path d="M34 30 Q38 15 48 12 L64 12 Q72 15 74 30Z" fill="currentColor" opacity="0.25"/>
    {/* side window */}
    <rect x="76" y="13" width="10" height="17" rx="3" fill="currentColor" opacity="0.25"/>
    {/* door line */}
    <line x1="76" y1="10" x2="76" y2="52" stroke="currentColor" strokeWidth="1" opacity="0.2"/>
    {/* front details */}
    <rect x="6" y="33" width="8" height="5" rx="2" fill="currentColor" opacity="0.4"/>
    <rect x="96" y="33" width="8" height="5" rx="2" fill="currentColor" opacity="0.4"/>
    {/* wheel arches */}
    <ellipse cx="27" cy="52" rx="14" ry="10" fill="currentColor" opacity="0.8"/>
    <ellipse cx="27" cy="52" rx="8" ry="6" fill="currentColor" opacity="0.3"/>
    <ellipse cx="27" cy="52" rx="3" ry="3" fill="currentColor" opacity="0.6"/>
    <ellipse cx="83" cy="52" rx="14" ry="10" fill="currentColor" opacity="0.8"/>
    <ellipse cx="83" cy="52" rx="8" ry="6" fill="currentColor" opacity="0.3"/>
    <ellipse cx="83" cy="52" rx="3" ry="3" fill="currentColor" opacity="0.6"/>
  </svg>
);

const SVG_MATELAS_ENFANT = (
  <svg viewBox="0 0 70 58" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    {/* base */}
    <rect x="6" y="44" width="58" height="10" rx="4" fill="currentColor" opacity="0.45"/>
    {/* mattress */}
    <rect x="6" y="20" width="58" height="26" rx="6" fill="currentColor"/>
    {/* tufting */}
    <line x1="25" y1="20" x2="25" y2="46" stroke="currentColor" strokeWidth="1" opacity="0.2"/>
    <line x1="45" y1="20" x2="45" y2="46" stroke="currentColor" strokeWidth="1" opacity="0.2"/>
    {/* pillow */}
    <rect x="10" y="10" width="50" height="14" rx="6" fill="currentColor" opacity="0.6"/>
    {/* pillow crease */}
    <line x1="35" y1="10" x2="35" y2="24" stroke="currentColor" strokeWidth="1" opacity="0.2"/>
  </svg>
);

const SVG_MATELAS_1PLACE = (
  <svg viewBox="0 0 82 58" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    {/* base */}
    <rect x="4" y="44" width="74" height="10" rx="4" fill="currentColor" opacity="0.45"/>
    {/* mattress */}
    <rect x="4" y="20" width="74" height="26" rx="6" fill="currentColor"/>
    {/* tufting */}
    <line x1="28" y1="20" x2="28" y2="46" stroke="currentColor" strokeWidth="1" opacity="0.2"/>
    <line x1="54" y1="20" x2="54" y2="46" stroke="currentColor" strokeWidth="1" opacity="0.2"/>
    {/* pillow */}
    <rect x="10" y="10" width="62" height="14" rx="6" fill="currentColor" opacity="0.6"/>
    <line x1="41" y1="10" x2="41" y2="24" stroke="currentColor" strokeWidth="1" opacity="0.2"/>
  </svg>
);

const SVG_MATELAS_2PLACES = (
  <svg viewBox="0 0 110 58" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    {/* base */}
    <rect x="4" y="44" width="102" height="10" rx="4" fill="currentColor" opacity="0.45"/>
    {/* mattress */}
    <rect x="4" y="20" width="102" height="26" rx="6" fill="currentColor"/>
    {/* tufting */}
    <line x1="55" y1="20" x2="55" y2="46" stroke="currentColor" strokeWidth="1.5" opacity="0.25"/>
    <line x1="30" y1="20" x2="30" y2="46" stroke="currentColor" strokeWidth="1" opacity="0.15"/>
    <line x1="80" y1="20" x2="80" y2="46" stroke="currentColor" strokeWidth="1" opacity="0.15"/>
    {/* 2 pillows */}
    <rect x="8" y="10" width="44" height="14" rx="6" fill="currentColor" opacity="0.6"/>
    <rect x="58" y="10" width="44" height="14" rx="6" fill="currentColor" opacity="0.6"/>
  </svg>
);

// ─── TAPIS DETAIL ─────────────────────────────────────────────────────────────

const TAPIS_ITEMS = [
  { id: "tapis-1", label: "1 tapis", price: "49 €", duration: "45 min", desc: "Fibres et couleurs ravivées, Traitement des taches et odeurs. Résultat professionnel." },
  { id: "tapis-2", label: "2 tapis", price: "79 €", duration: "1h",     desc: "Économisez 19 € vs 2 × 1 tapis. Traitement des taches et odeurs. Résultat professionnel." },
  { id: "tapis-3", label: "3 tapis", price: "99 €", duration: "1h15",   desc: "Toute la maison en 1 visite. Traitement des taches et odeurs. Résultat professionnel." },
];

function TapisDetail() {
  const [selected, setSelected] = useState("tapis-2");
  const item = TAPIS_ITEMS.find((i) => i.id === selected)!;

  const TAPIS_IMAGES: Record<string, string> = {
    "tapis-1": "/images/tapis/1-tapis.png",
    "tapis-2": "/images/tapis/2-tapis.png",
    "tapis-3": "/images/tapis/3-tapis.png",
  };

  return (
    <div>
      <div className="grid grid-cols-3 gap-3 mb-6">
        {TAPIS_ITEMS.map((c) => {
          const isSelected = selected === c.id;
          return (
            <button
              key={c.id}
              onClick={() => setSelected(c.id)}
              className={isSelected ? CARD_SELECTED_CLASS : CARD_UNSELECTED_CLASS}
            >

              <div className={`flex items-center justify-center w-full h-32 sm:h-48 mb-3 mt-1 px-0 transition-colors ${isSelected ? "text-[#1a2b4c]" : "text-primary/70"}`}>
                <img src={TAPIS_IMAGES[c.id]} alt={c.label} className="w-full h-full object-contain mix-blend-multiply scale-125 sm:scale-150" loading="lazy" />
              </div>

              <p className="text-[9px] font-semibold uppercase tracking-widest text-muted-foreground/80 leading-none">Dès</p>
              <p className={`text-lg font-bold leading-tight mt-1 ${isSelected ? "text-[#1a2b4c]" : "text-foreground"}`}>
                {c.price}
              </p>
              <p className="text-[11px] font-medium text-muted-foreground leading-snug mt-1.5 text-center px-1">
                {c.label}
              </p>
              {"duration" in c && c.duration && (
                <p className="mt-1 flex items-center justify-center gap-1 text-[10px] text-muted-foreground/60 leading-none">
                  <Clock className="size-2.5 shrink-0" /> {(c as { duration: string }).duration}
                </p>
              )}
            </button>
          );
        })}
      </div>

      {/* Detail panel */}
      <div className="rounded-[24px] border border-primary/10 bg-white p-7 shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-start gap-8">
          <div className="flex-1">
            
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
            <div className="mt-5 space-y-2.5">
              {["Injection-extraction professionnelle", "Traitement des taches, auréoles et odeurs", "Résultat visible immédiatement", "Résultat professionnel"].map((pt) => (
                <div key={pt} className="flex items-center gap-3 text-sm text-foreground/80 font-medium">
                  <CheckCircle2 className="size-4.5 shrink-0 text-primary" /> {pt}
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col items-start sm:items-end shrink-0 gap-4 bg-secondary/30 p-5 rounded-2xl w-full sm:w-auto">
            <div className="sm:text-right">
              <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold">À partir de</p>
              <p className="text-5xl font-black text-primary leading-none mt-1">{item.price}</p>
              {"duration" in item && item.duration && (
                <p className="flex items-center gap-1.5 sm:justify-end text-xs text-muted-foreground font-medium mt-1.5">
                  <Clock className="size-3.5 shrink-0" /> {(item as { duration: string }).duration} d'intervention
                </p>
              )}
            </div>
            <Link to="/reserver" search={{ service: "tapis", formule: selected, from: "formules" }} onClick={() => window.scrollTo(0,0)}
              className="inline-flex items-center justify-center gap-2 w-full rounded-xl bg-primary px-6 py-3.5 text-sm font-bold text-white shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all">
              <CalendarCheck className="size-4" /> Je réserve
            </Link>
            <p className="text-xs text-muted-foreground/80 font-medium">Déplacement gratuit · Paiement sur place</p>
          </div>
        </div>
      </div>

      <OptionsBlock options={TAPIS_OPTIONS} />
    </div>
  );
}

// ─── AUTO DETAIL ──────────────────────────────────────────────────────────────

const AUTO_IMAGES: Record<string, string> = {
  "bronze": "/images/auto/bronze.png",
  "argent": "/images/auto/argent.png",
  "or": "/images/auto/or.png",
  "siege": "/images/auto/renov.png",
};

const AUTO_GRID_ITEMS = [
  ...AUTO_PACKS
];

function AutoDetail() {
  const [selected, setSelected] = useState("argent");
  const item = AUTO_GRID_ITEMS.find((i) => i.id === selected)!;

  return (
    <div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {AUTO_GRID_ITEMS.map((c) => {
          const isSelected = selected === c.id;
          return (
            <button
              key={c.id}
              onClick={() => setSelected(c.id)}
              className={isSelected ? CARD_SELECTED_CLASS : CARD_UNSELECTED_CLASS}
            >
              {c.badge && (
                <span className={BADGE_CLASS}>
                  {c.badge.replace("⭐ ", "").replace("✨ ", "")}
                </span>
              )}

              <div className={`flex items-center justify-center w-full h-24 sm:h-32 mb-3 mt-1 px-2 transition-colors ${isSelected ? "text-[#1a2b4c]" : "text-primary/70"}`}>
                <img src={AUTO_IMAGES[c.id]} alt={c.name} className="w-full h-full object-contain mix-blend-multiply scale-110" loading="lazy" />
              </div>

              <p className="text-[9px] font-semibold uppercase tracking-widest text-muted-foreground/80 leading-none">{c.tagline}</p>
              <p className={`text-lg font-bold leading-tight mt-1 ${isSelected ? "text-[#1a2b4c]" : "text-foreground"}`}>
                {c.price}
              </p>
              <p className="text-[11px] font-medium text-muted-foreground leading-snug mt-1.5 text-center px-1">
                {c.name}
              </p>
              {"duration" in c && c.duration && (
                <p className="mt-1 flex items-center justify-center gap-1 text-[10px] text-muted-foreground/60 leading-none">
                  <Clock className="size-2.5 shrink-0" /> {(c as { duration: string }).duration}
                </p>
              )}
            </button>
          );
        })}
      </div>

      {/* Detail panel */}
      <div className="rounded-[24px] border border-primary/10 bg-white p-7 shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-start gap-8">
          <div className="flex-1">
            
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{item.tagline}</p>
            <div className="mt-5 space-y-2.5">
              {item.included.map((pt) => (
                <div key={pt} className="flex items-center gap-3 text-sm text-foreground/80 font-medium">
                  <CheckCircle2 className="size-4.5 shrink-0 text-primary" /> {pt}
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col items-start sm:items-end shrink-0 gap-4 bg-secondary/30 p-5 rounded-2xl w-full sm:w-auto">
            <div className="sm:text-right">
              <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold">Tarif</p>
              <p className="text-5xl font-black text-primary leading-none mt-1">{item.price}</p>
              {"duration" in item && item.duration && (
                <p className="flex items-center gap-1.5 sm:justify-end text-xs text-muted-foreground font-medium mt-1.5">
                  <Clock className="size-3.5 shrink-0" /> {(item as { duration: string }).duration} d'intervention
                </p>
              )}
            </div>
            <Link to="/reserver" search={{ service: "auto", formule: selected, from: "formules" }} onClick={() => window.scrollTo(0,0)}
              className="inline-flex items-center justify-center gap-2 w-full rounded-xl bg-primary px-6 py-3.5 text-sm font-bold text-white shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all">
              <CalendarCheck className="size-4" /> Je réserve
            </Link>
            <p className="text-xs text-muted-foreground/80 font-medium">Déplacement gratuit · Paiement sur place</p>
          </div>
        </div>
      </div>

      {item.options && item.options.length > 0 && (
        <OptionsBlock options={item.options.map(o => ({...o, desc: "S'ajoute au tarif de base lors de la réservation."}))} />
      )}
    </div>
  );
}

// ─── MATELAS DETAIL ───────────────────────────────────────────────────────────

const MATELAS_ITEMS = [
  { id: "matelas-enfant", label: "Matelas enfant",   price: "39 €", duration: "30 min", desc: "Votre enfant dort dans un lit sain. Traitement des taches et odeurs, 2 côtés. Traitement anti-acariens en option. Résultat professionnel." },
  { id: "matelas-1",      label: "Matelas 1 place",  price: "59 €", duration: "1h",     desc: "Dormez dans un matelas comme neuf. Traitement des taches et odeurs, 2 côtés. Traitement anti-acariens en option. Résultat professionnel." },
  { id: "matelas-2",      label: "Matelas 2 places", price: "99 €", duration: "1h",     desc: "Chambre entièrement assainie. Traitement des taches et odeurs, 2 côtés. Traitement anti-acariens en option. Résultat professionnel." },
];

function MatelasDetail() {
  const [selected, setSelected] = useState("matelas-1");
  const item = MATELAS_ITEMS.find((i) => i.id === selected)!;

  const MATELAS_IMAGES: Record<string, string> = {
    "matelas-enfant": "/images/matelas/enfant.png",
    "matelas-1": "/images/matelas/1-place.png",
    "matelas-2": "/images/matelas/2-places.png",
  };

  return (
    <div>
      <div className="grid grid-cols-3 gap-3 mb-6">
        {MATELAS_ITEMS.map((c) => {
          const isSelected = selected === c.id;
          return (
            <button
              key={c.id}
              onClick={() => setSelected(c.id)}
              className={isSelected ? CARD_SELECTED_CLASS : CARD_UNSELECTED_CLASS}
            >
              {"popular" in c && (c as { popular?: boolean }).popular ? (
                <span className={BADGE_CLASS}>Recommandé</span>
              ) : null}

              <div className={`flex items-center justify-center w-full h-32 sm:h-48 mb-3 mt-1 px-0 transition-colors ${isSelected ? "text-[#1a2b4c]" : "text-primary/70"}`}>
                <img src={MATELAS_IMAGES[c.id]} alt={c.label} className="w-full h-full object-contain mix-blend-multiply scale-125 sm:scale-150" loading="lazy" />
              </div>

              <p className="text-[9px] font-semibold uppercase tracking-widest text-muted-foreground/80 leading-none">Dès</p>
              <p className={`text-lg font-bold leading-tight mt-1 ${isSelected ? "text-[#1a2b4c]" : "text-foreground"}`}>
                {c.price}
              </p>
              <p className="text-[11px] font-medium text-muted-foreground leading-snug mt-1.5 text-center px-1">
                {c.label}
              </p>
              {"duration" in c && c.duration && (
                <p className="mt-1 flex items-center justify-center gap-1 text-[10px] text-muted-foreground/60 leading-none">
                  <Clock className="size-2.5 shrink-0" /> {(c as { duration: string }).duration}
                </p>
              )}
            </button>
          );
        })}
      </div>

      {/* Detail panel */}
      <div className="rounded-[24px] border border-primary/10 bg-white p-7 shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-start gap-8">
          <div className="flex-1">
            
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
            <div className="mt-5 space-y-2.5">
              {["Injection-extraction professionnelle", "Traitement des taches, auréoles et odeurs", "Résultat visible immédiatement", "Résultat professionnel"].map((pt) => (
                <div key={pt} className="flex items-center gap-3 text-sm text-foreground/80 font-medium">
                  <CheckCircle2 className="size-4.5 shrink-0 text-primary" /> {pt}
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col items-start sm:items-end shrink-0 gap-4 bg-secondary/30 p-5 rounded-2xl w-full sm:w-auto">
            <div className="sm:text-right">
              <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold">À partir de</p>
              <p className="text-5xl font-black text-primary leading-none mt-1">{item.price}</p>
              {"duration" in item && item.duration && (
                <p className="flex items-center gap-1.5 sm:justify-end text-xs text-muted-foreground font-medium mt-1.5">
                  <Clock className="size-3.5 shrink-0" /> {(item as { duration: string }).duration} d'intervention
                </p>
              )}
            </div>
            <Link to="/reserver" search={{ service: "matelas", formule: selected, from: "formules" }} onClick={() => window.scrollTo(0,0)}
              className="inline-flex items-center justify-center gap-2 w-full rounded-xl bg-primary px-6 py-3.5 text-sm font-bold text-white shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all">
              <CalendarCheck className="size-4" /> Je réserve
            </Link>
            <p className="text-xs text-muted-foreground/80 font-medium">Déplacement gratuit · Paiement sur place</p>
          </div>
        </div>
      </div>

      <OptionsBlock options={MATELAS_OPTIONS} />
    </div>
  );
}

// ─── CATEGORY GRID ────────────────────────────────────────────────────────────

const CATEGORIES = [
  {
    id: "canape",
    icon: <Armchair className="size-7" />,
    title: "Nettoyage Canapé & Fauteuil",
    sub: "Injection-extraction · Séchage rapide",
    priceFrom: "49 €",
    bullets: ["Fauteuil, canapé 2/3, 4/5 places", "Canapé U/angle, pouf, chaise", "Options anti-acariens, anti-odeur"],
    recommended: false,
    content: <CanapeDetail />,
  },
  {
    id: "cuir",
    icon: <Armchair className="size-7" />,
    title: "Nettoyage Cuir",
    sub: "Nettoyage manuel doux · Soin nourrissant",
    priceFrom: "49 €",
    bullets: ["Fauteuil, canapé 2/3, 4/5 places", "Sièges auto cuir", "Traitement nourrissant en option"],
    recommended: false,
    content: <CuirDetail />,
  },
  {
    id: "tapis",
    icon: <Layers className="size-7" />,
    title: "Shampouinage Tapis & Moquette",
    sub: "Fibres ravivées · Séchage dans la journée",
    priceFrom: "49 €",
    bullets: ["1 tapis, 2 tapis, 3 tapis", "Toutes tailles et matières", "Options anti-acariens, recto-verso"],
    recommended: false,
    content: <TapisDetail />,
  },
  {
    id: "auto",
    icon: <Car className="size-7" />,
    title: "Nettoyage Intérieur Auto",
    sub: "À domicile ou sur parking · Tous véhicules",
    priceFrom: "69 €",
    bullets: ["Pack Bronze, Argent, Or", "Sièges, plastiques, vitres, coffre", "Options poils, anti-odeur, ciel de toit"],
    recommended: false,
    content: <AutoDetail />,
  },
  {
    id: "matelas",
    icon: <BedDouble className="size-7" />,
    title: "Nettoyage Matelas",
    sub: "Option anti-acariens · 2 côtés traités · Allergiques",
    priceFrom: "39 €",
    bullets: ["Matelas enfant, 1 place, 2 places", "Traitement anti-acariens en option", "Idéal pour les allergiques"],
    recommended: false,
    content: <MatelasDetail />,
  },
];

// ─── PAGE ─────────────────────────────────────────────────────────────────────

function FormulesPage() {
  const search = Route.useSearch();
  const selectedService = search.service;

  const displayCategories = selectedService 
    ? CATEGORIES.filter(c => c.id === selectedService)
    : CATEGORIES;

  return (
    <div className="bg-[#f4f6f9] pb-24 lg:pb-0">

      {/* ── CATEGORY GRID ── */}
      {!selectedService && (
        <FadeIn delay={0.1}>
          <div className="mx-auto max-w-5xl px-4 pt-16 mb-12">
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-6 text-center">
              Choisissez une prestation pour réserver en ligne
            </p>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {CATEGORIES.map((cat) => (
                <Link
                  key={cat.id}
                  to="/reserver"
                  search={{ service: cat.id, formule: "", from: "formules" }}
                  onClick={() => window.scrollTo(0, 0)}
                  className="relative flex flex-col rounded-2xl border border-border bg-white p-4 md:p-5 text-left transition-all shadow-sm hover:shadow-md hover:border-primary/40 hover:-translate-y-0.5 group"
                >
                  {cat.recommended && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-primary px-3 py-1 text-[10px] font-bold text-white shadow">
                      ★ Recommandé
                    </span>
                  )}
                  <div className="flex size-10 md:size-12 items-center justify-center rounded-xl bg-primary/10 text-primary mb-3 transition-colors group-hover:bg-primary group-hover:text-white">
                    {cat.icon}
                  </div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">
                    À partir de
                  </p>
                  <p className="text-2xl md:text-3xl font-bold text-primary leading-none mb-2">{cat.priceFrom}</p>
                  <h2 className="text-xs md:text-sm font-bold leading-snug mb-2 text-foreground">{cat.title}</h2>
                  <ul className="flex-1 space-y-1 mb-4 hidden md:block">
                    {cat.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-1.5 text-xs text-muted-foreground">
                        <CheckCircle2 className="size-3 shrink-0 mt-0.5 text-primary" /> {b}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto flex items-center justify-center gap-1 rounded-xl bg-primary/10 text-primary py-2 md:py-2.5 text-[11px] md:text-xs font-bold group-hover:bg-primary group-hover:text-white transition-colors">
                    <ChevronRight className="size-3 md:size-3.5" /> Voir les formules
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </FadeIn>
      )}

      {/* ── DÉTAIL FORMULES PAR SERVICE ── */}
      <div className={selectedService ? "pt-16" : ""}>
        {displayCategories.map((cat) => (
          <FadeIn key={cat.id} delay={0.1}>
            <section id={cat.id} className="mx-auto max-w-5xl px-4 mb-14">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary shrink-0">
                  {cat.icon}
                </div>
                <div>
                  <h2 className="text-xl font-bold leading-tight">{cat.title}</h2>
                  <p className="text-xs text-muted-foreground mt-0.5">{cat.sub}</p>
                </div>
              </div>
              {cat.content}
            </section>
          </FadeIn>
        ))}
      </div>

      {/* ── AUTRES SERVICES ── */}
      <FadeIn delay={0.1}>
        <section className="mx-auto max-w-5xl px-4 mb-12">
          <div className="rounded-2xl border border-border bg-white p-8 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-widest text-primary mb-2">Sur devis</p>
          <h2 className="text-2xl font-bold tracking-tight">Autres prestations de nettoyage à Toulouse</h2>
          <p className="mt-2 text-sm text-muted-foreground max-w-2xl">
            Nettoyage de toiture, façade, terrasse, vitrages, appartement, fin de bail, fin de chantier
            et logement insalubre (syndrome de Diogène). Devis gratuit sous 24h.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild variant="outline">
              <Link to="/contactez-nous">Demander un devis gratuit <ArrowRight className="size-4" /></Link>
            </Button>
            <Button asChild>
              <a href={COMPANY.phoneHref}><Phone className="size-4" /> {COMPANY.phone}</a>
            </Button>
          </div>
          </div>
        </section>
      </FadeIn>

      {/* ── SEO GÉO ── */}
      <FadeIn delay={0.1}>
        <section className="mx-auto max-w-5xl px-4 mb-12">
          <div className="rounded-2xl bg-secondary/40 border border-border px-8 py-10">
          <div className="flex items-center gap-2 text-primary mb-3">
            <MapPin className="size-4" />
            <span className="text-xs font-bold uppercase tracking-widest">Zone d'intervention</span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight mb-3">Nettoyage à domicile Toulouse et agglomération</h2>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-3xl">
            Clean&Fresh intervient pour le nettoyage de canapé, matelas, tapis, moquette et intérieur auto à{" "}
            <strong className="text-foreground">Toulouse</strong>,{" "}
            <strong className="text-foreground">Blagnac</strong>,{" "}
            <strong className="text-foreground">Colomiers</strong>,{" "}
            <strong className="text-foreground">Tournefeuille</strong>,{" "}
            <strong className="text-foreground">Balma</strong>,{" "}
            <strong className="text-foreground">Ramonville-Saint-Agne</strong>,{" "}
            <strong className="text-foreground">Cugnaux</strong>,{" "}
            <strong className="text-foreground">L'Union</strong>,{" "}
            <strong className="text-foreground">Muret</strong>,{" "}
            <strong className="text-foreground">Saint-Orens</strong> et dans toute la{" "}
            <strong className="text-foreground">Haute-Garonne (31)</strong>.
            Nos techniciens se déplacent chez vous avec tout le matériel — aucun déplacement de votre part.
          </p>
          <p className="mt-3 text-sm text-muted-foreground">
            📞 Devis gratuit sous 24h · 7j/7 · Intervention rapide · Produits certifiés Écolabel européen
          </p>
          </div>
        </section>
      </FadeIn>

      {/* ── CTA FINAL ── */}
      <FadeIn delay={0.2}>
        <div className="mx-auto max-w-xl px-4 pb-16 text-center">
          <p className="text-lg font-bold">Prêt à retrouver un intérieur comme neuf ?</p>
        <p className="mt-1 text-sm text-muted-foreground">Réservation en ligne en 2 minutes, confirmation immédiate.</p>
        <div className="mt-5 flex flex-wrap gap-3 justify-center">
          <Button asChild size="xl" className="font-bold">
            <Link to="/reserver" search={{ from: "formules" }}><CalendarCheck className="size-5" /> Réserver maintenant</Link>
          </Button>
          <Button asChild variant="outline" size="xl">
            <a href={COMPANY.phoneHref}><Phone className="size-4" /> {COMPANY.phone}</a>
          </Button>
        </div>
        <p className="mt-3 text-xs text-muted-foreground flex items-center justify-center gap-1">
          <CheckCircle2 className="size-3 text-primary" /> Sans engagement, annulation gratuite.
        </p>
      </div>
      </FadeIn>
    </div>
  );
}
