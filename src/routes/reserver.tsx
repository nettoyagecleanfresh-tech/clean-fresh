import { useState, useEffect } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import {
  Armchair, BedDouble, Layers, Car,
  Check, ArrowRight, ChevronLeft, ChevronRight,
  CalendarCheck, Info, Clock, Phone, Mail, User,
  Loader2, CheckCircle2, Shield, Dog, Droplets, Wind, Sparkles, MapPin, Hash, Building2, Sun,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { COMPANY } from "@/data/site";
import { fetchBusySlots, buildSlots } from "@/lib/gcal";
import { CalendarPicker } from "@/components/CalendarPicker";
import { TimeSlotPicker } from "@/components/TimeSlotPicker";
import { sendBookingEmailsFn } from "@/lib/emailServerFns";
import { createBookingServerFn } from "@/lib/bookingServerFn";

export const Route = createFileRoute("/reserver")({
  validateSearch: (search: Record<string, unknown>) => ({
    service: (search["service"] as string) ?? "",
    formule: (search["formule"] as string) ?? "",
    from: (search["from"] as string) ?? "",
  }),
  head: () => ({
    meta: [
      { title: "Réserver — Clean&Fresh Toulouse" },
      { name: "description", content: "Réservez votre nettoyage à domicile à Toulouse en 2 minutes." },
    ],
  }),
  component: ReserverPage,
});

// ─── TYPES ───────────────────────────────────────────────────────────────────

type Option = { id: string; name: string; desc: string; price: number; popular?: boolean; icon?: React.ReactNode };
type Formule = { id: string; name: string; desc?: string; price: number; duration: string; durationMin: number; options: Option[] };
type ServiceDef = { id: string; label: string; shortLabel: string; desc: string; from: number; icon: React.ReactNode; formules: Formule[]; features: string[]; badge?: string };
type CartItem = { service: ServiceDef; formule: Formule; options: string[] };

// ─── OPTIONS PARTAGÉES ───────────────────────────────────────────────────────

const OA: Option = { id: "acariens",  name: "Traitement anti-acariens et bactériens",  desc: "Élimination des acariens et bactéries (traitement professionnel). Idéal pour les personnes sensibles.",                      price: 19, popular: true, icon: <Shield className="size-5" /> };
const OP: Option = { id: "poils",     name: "Élimination des poils d'animaux",          desc: "Brossage mécanique spécifique avant l'injection-extraction.",                                           price: 15, popular: true, icon: <Dog className="size-5" /> };
const OPA: Option= { id: "poils",     name: "Élimination des poils d'animaux",          desc: "Brossage spécifique avant nettoyage des sièges et moquettes.",                                          price: 25, icon: <Dog className="size-5" /> };
const OD: Option = { id: "detachage", name: "Détachage intensif",                        desc: "Traitement ciblé pour les tâches anciennes (sang, vin, encre, café).",                                  price: 19, icon: <Droplets className="size-5" /> };
const ODA:Option = { id: "detachage", name: "Détachage intensif — siège très taché",    desc: "Traitement ciblé pour les tâches résistantes sur sièges.",                                               price: 19, icon: <Droplets className="size-5" /> };
const OO: Option = { id: "odeur",     name: "Traitement anti-odeur",                     desc: "Neutralisation moléculaire des mauvaises odeurs incrustées.",                                            price: 15, popular: true, icon: <Wind className="size-5" /> };
const ORV:Option = { id: "rectoverso",name: "Nettoyage recto-verso",                     desc: "Nettoyage des deux faces du tapis pour un résultat total.",                                              price: 25, icon: <Layers className="size-5" /> };
const OV: Option = { id: "vitres",    name: "Vitres sans traces",                        desc: "Nettoyage intérieur des vitres, sans auréoles.",                                                         price: 9, icon: <Sparkles className="size-5" />  };
const OTS:Option = { id: "tapis-sol", name: "Shampouinage des tapis de sol",             desc: "Nettoyage injection-extraction des tapis de sol du véhicule.",                                          price: 15, icon: <Droplets className="size-5" /> };
const OC: Option = { id: "ciel",      name: "Nettoyage du ciel de toit",                 desc: "Nettoyage en profondeur du revêtement du plafond de l'habitacle.",                                      price: 29, icon: <Sparkles className="size-5" /> };
const OSA:Option = { id: "sieges",    name: "Shampouinage des sièges auto",              desc: "Injection-extraction complète des sièges tissu ou Alcantara.",                                           price: 39, icon: <Droplets className="size-5" /> };

// ── NOUVELLES OPTIONS PREMIUM ──
const OE: Option = { id: "enzyme", name: "Traitement enzymatique intensif", desc: "Élimination des taches organiques coriaces (sang, urine, vomi).", price: 19, icon: <Droplets className="size-5" /> };
const OUV: Option = { id: "uv", name: "Protection UV & antistatique plastiques", desc: "Protège les plastiques intérieurs du ternissement et repousse la poussière.", price: 19, icon: <Sun className="size-5" /> };
// Hydrophobe
const OH_35: Option = { id: "hydro", name: "Traitement hydrophobe & anti-taches", desc: "Imperméabilisation des fibres, effet déperlant et protection longue durée.", price: 35, icon: <Shield className="size-5" /> };
const OH_45: Option = { id: "hydro", name: "Traitement hydrophobe & anti-taches", desc: "Imperméabilisation des fibres, effet déperlant et protection longue durée.", price: 45, icon: <Shield className="size-5" /> };
const OH_55: Option = { id: "hydro", name: "Traitement hydrophobe & anti-taches", desc: "Imperméabilisation des fibres, effet déperlant et protection longue durée.", price: 55, icon: <Shield className="size-5" /> };
const OH_65: Option = { id: "hydro", name: "Traitement hydrophobe & anti-taches", desc: "Imperméabilisation des fibres, effet déperlant et protection longue durée.", price: 65, icon: <Shield className="size-5" /> };
const OH_69: Option = { id: "hydro", name: "Traitement hydrophobe & anti-taches", desc: "Imperméabilisation des fibres, effet déperlant et protection longue durée.", price: 69, icon: <Shield className="size-5" /> };
const OH_75: Option = { id: "hydro", name: "Traitement hydrophobe & anti-taches", desc: "Imperméabilisation des fibres, effet déperlant et protection longue durée.", price: 75, icon: <Shield className="size-5" /> };
const OH_85: Option = { id: "hydro", name: "Traitement hydrophobe & anti-taches", desc: "Imperméabilisation des fibres, effet déperlant et protection longue durée.", price: 85, icon: <Shield className="size-5" /> };
const OH_99: Option = { id: "hydro", name: "Traitement hydrophobe & anti-taches", desc: "Imperméabilisation des fibres, effet déperlant et protection longue durée.", price: 99, icon: <Shield className="size-5" /> };
// Cuir protecteur
const OC_35: Option = { id: "cuir_prot", name: "Soin nourrissant & protecteur cuir", desc: "Hydrate, assouplit et protège le cuir contre le craquèlement.", price: 35, icon: <Shield className="size-5" /> };
const OC_55: Option = { id: "cuir_prot", name: "Soin nourrissant & protecteur cuir", desc: "Hydrate, assouplit et protège le cuir contre le craquèlement.", price: 55, icon: <Shield className="size-5" /> };
const OC_75: Option = { id: "cuir_prot", name: "Soin nourrissant & protecteur cuir", desc: "Hydrate, assouplit et protège le cuir contre le craquèlement.", price: 75, icon: <Shield className="size-5" /> };

const CAN = [OA, OP, OD, OO, OE];
const TAP = [OA, ORV, OD, OO, OE];
const MAT = [OA, OD, OO, OE];

const SERVICES: ServiceDef[] = [
  {
    id: "canape", label: "Textiles d'ameublement", shortLabel: "Textiles",
    desc: "Nettoyage en profondeur par injection-extraction, élimination des tâches et ravivement des couleurs.",
    from: 15, icon: <Armchair className="size-8" strokeWidth={1.5} />,
    features: ["Fauteuil, canapé 2/3, 4/5 places", "Canapé U/angle, pouf, chaise", "Options anti-acariens, anti-odeur"],
    formules: [
      { id: "fauteuil",     name: "Fauteuil",                       desc: "Nettoyage complet 1 place.", price: 49,  duration: "45 min",  durationMin: 45,  options: [...CAN, OH_35] },
      { id: "canape-2",     name: "Canapé 2/3 places",              desc: "Nettoyage complet pour 2 à 3 assises.", price: 79,  duration: "1h",      durationMin: 60,  options: [...CAN, OH_55] },
      { id: "canape-angle", name: "Canapé d'angle",                  desc: "Méridienne incluse.", price: 99,  duration: "1h",      durationMin: 60,  options: [...CAN, OH_75] },
      { id: "canape-45",    name: "Canapé 4/5 places",               desc: "Idéal grand format.", price: 99,  duration: "1h",      durationMin: 60,  options: [...CAN, OH_75] },
      { id: "canape-u",     name: "Canapé en U",                     desc: "Format panoramique XXL.", price: 99,  duration: "1h",      durationMin: 60,  options: [...CAN, OH_75] },
      { id: "pouf",         name: "Pouf",                            desc: "Nettoyage d'appoint.", price: 19,  duration: "30 min",  durationMin: 30,  options: CAN },
      { id: "chaise",       name: "Chaise rembourrée",               desc: "À l'unité.", price: 15,  duration: "20 min",  durationMin: 20,  options: CAN },
    ],
  },
  {
    id: "cuir", label: "Nettoyage Cuir", shortLabel: "Cuir",
    desc: "Nettoyage manuel doux et respectueux, suivi d'un soin nourrissant protecteur pour vos cuirs.",
    from: 49, icon: <Armchair className="size-8" strokeWidth={1.5} />,
    features: ["Fauteuil, canapé 2/3, 4/5 places", "Sièges auto cuir", "Traitement nourrissant en option"],
    formules: [
      { id: "cuir-fauteuil",     name: "Fauteuil cuir",             desc: "Nettoyage manuel 1 place.", price: 49,  duration: "45 min",  durationMin: 45,  options: [OC_35, OD, OO] },
      { id: "cuir-canape-2",     name: "Canapé cuir 2/3 places",    desc: "Nettoyage manuel pour 2 à 3 assises.", price: 79,  duration: "1h",      durationMin: 60,  options: [OC_55, OD, OO] },
      { id: "cuir-canape-angle", name: "Canapé cuir angle ou 4/5",  desc: "Nettoyage manuel grand format.", price: 99,  duration: "1h",      durationMin: 60,  options: [OC_75, OD, OO] },
      { id: "cuir-pouf",         name: "Pouf cuir",                 desc: "Nettoyage manuel.",         price: 19,  duration: "30 min",  durationMin: 30,  options: [OC_35, OD, OO] },
      { id: "cuir-chaise",       name: "Chaise cuir",               desc: "Nettoyage manuel à l'unité.",price: 15,  duration: "20 min",  durationMin: 20,  options: [OC_35, OD, OO] },
      { id: "cuir-auto",         name: "Sièges auto cuir",          desc: "Nettoyage complet sièges habitacle.", price: 59,  duration: "1h",      durationMin: 60,  options: [OC_55, OD, OO] },
    ],
  },
  {
    id: "tapis", label: "Shampouinage Tapis & Moquette", shortLabel: "Tapis",
    desc: "Restauration des fibres, traitement anti-tâches et désodorisation en profondeur.",
    from: 49, icon: <Layers className="size-8" strokeWidth={1.5} />,
    features: ["1 tapis, 2 tapis, 3 tapis", "Toutes tailles et matières", "Options anti-acariens, recto-verso"],
    formules: [
      { id: "tapis-1", name: "1 Tapis", desc: "Toutes tailles confondues.", price: 49, duration: "45 min", durationMin: 45, options: [...TAP, OH_35] },
      { id: "tapis-2", name: "2 Tapis", desc: "Toutes tailles confondues.", price: 79, duration: "1h",     durationMin: 60, options: [...TAP, OH_69] },
      { id: "tapis-3", name: "3 Tapis", desc: "Toutes tailles confondues.", price: 99, duration: "1h15",   durationMin: 75, options: [...TAP, OH_99] },
    ],
  },
  {
    id: "auto", label: "Nettoyage Intérieur Auto", shortLabel: "Intérieur auto",
    desc: "Shampouinage des sièges, moquettes et plastiques pour un habitacle comme neuf.",
    from: 69, icon: <Car className="size-8" strokeWidth={1.5} />,
    features: ["Pack Bronze, Argent, Or", "Sièges, plastiques, vitres, coffre", "Options poils, anti-odeur, ciel de toit"],
    formules: [
      { id: "bronze", name: "Pack Bronze", desc: "Aspiration habitacle + coffre + nettoyage plastiques.",          price: 69,  duration: "1h",    durationMin: 60,  options: [OUV, OA, OPA, OV, OTS, OC, OSA, OO] },
      { id: "argent", name: "Pack Argent", desc: "Pack Bronze + shampouinage sièges + vitres sans traces.",        price: 99,  duration: "1h30",  durationMin: 90,  options: [OUV, OH_55, OE, OA, ODA, OPA, OTS, OC, OO] },
      { id: "or",     name: "Pack Or",     desc: "Pack Argent + shampouinage tapis de sol et moquettes.",          price: 129, duration: "2h",    durationMin: 120, options: [OUV, OH_99, OE, OA, ODA, OPA, OC, OO] },
      { id: "siege",  name: "Rénovation siège auto", desc: "Injection-extraction des sièges ou nettoyage intégral du cuir.",  price: 59,  duration: "45 min",durationMin: 45,  options: [OE, OA, ODA, OPA, OO] },
    ],
  },
  {
    id: "matelas", label: "Nettoyage Matelas", shortLabel: "Matelas",
    desc: "Assainissement complet, éradication des acariens et auréoles de transpiration.",
    from: 39, icon: <BedDouble className="size-8" strokeWidth={1.5} />,
    features: ["Matelas enfant, 1 place, 2 places", "Traitement anti-acariens en option", "Recommandé pour les allergiques"],
    formules: [
      { id: "matelas-enfant", name: "Matelas enfant",   desc: "Jusqu'à 90x190cm.", price: 39,  duration: "30 min", durationMin: 30, options: [...MAT, OH_45] },
      { id: "matelas-1",      name: "Matelas 1 place",  desc: "De 90x190 à 120x190cm.", price: 59,  duration: "1h",     durationMin: 60, options: [...MAT, OH_65] },
      { id: "matelas-2",      name: "Matelas 2 places", desc: "À partir de 140x190cm.", price: 99,  duration: "1h",     durationMin: 60, options: [...MAT, OH_85] },
    ],
  },
];

const SLUG_TO_SERVICE: Record<string, string> = { canape: "canape", tapis: "tapis", matelas: "matelas", auto: "auto", cuir: "cuir" };

// ─── IMAGES PAR FORMULE ──────────────────────────────────────────────────────

const FORMULE_IMAGES: Record<string, Record<string, string>> = {
  canape: {
    "fauteuil":     "/images/canape/fauteuil.png",
    "canape-2":     "/images/canape/canape-2-3.png",
    "canape-3":     "/images/canape/canape-2-3.png",
    "canape-angle": "/images/canape/canape-u.png",
    "canape-45":    "/images/canape/canape-4-5.png",
    "canape-u":     "/images/canape/canape-u.png",
    "pouf":         "/images/canape/pouf.png",
    "chaise":       "/images/canape/chaise.png",
  },
  tapis: {
    "tapis-1": "/images/tapis/1-tapis.png",
    "tapis-2": "/images/tapis/2-tapis.png",
    "tapis-3": "/images/tapis/3-tapis.png",
  },
  auto: {
    "bronze": "/images/auto/bronze.png",
    "argent": "/images/auto/argent.png",
    "or":     "/images/auto/or.png",
    "siege":  "/images/auto/renov.png",
  },
  matelas: {
    "matelas-enfant": "/images/matelas/enfant.png",
    "matelas-1":      "/images/matelas/1-place.png",
    "matelas-2":      "/images/matelas/2-places.png",
  },
  cuir: {
    "cuir-fauteuil":     "/images/canape/fauteuil.png",
    "cuir-canape-2":     "/images/canape/canape-2-3.png",
    "cuir-canape-angle": "/images/canape/canape-u.png",
    "cuir-auto":         "/images/auto/renov.png",
  },
};

// ─── BARRE D'ÉTAPES ──────────────────────────────────────────────────────────

const STEP_LABELS = ["FORMULE", "OPTIONS", "CRÉNEAU", "CONFIRMATION"];

function StepBar({ current }: { current: number }) {
  return (
    <div className="flex items-center mb-10">
      {STEP_LABELS.map((label, i) => {
        const n = i + 1;
        const done = n < current;
        const active = n === current;
        return (
          <div key={label} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center gap-1 shrink-0">
              <div className={`flex size-8 items-center justify-center rounded-full border-2 text-sm font-bold transition-all ${
                done || active ? "border-primary bg-primary text-primary-foreground" : "border-border bg-background text-muted-foreground"
              }`}>
                {done ? <Check className="size-4" /> : n}
              </div>
              <span className={`hidden sm:block text-[9px] font-bold uppercase tracking-wider ${active || done ? "text-primary" : "text-muted-foreground"}`}>
                {label}
              </span>
            </div>
            {i < STEP_LABELS.length - 1 && (
              <div className={`h-0.5 flex-1 mx-2 mb-4 ${done ? "bg-primary" : "bg-border"}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── SIDEBAR RÉCAP ───────────────────────────────────────────────────────────

function Sidebar({
  cart, formule, selectedOptions, selectedDate, selectedTime, onContinue, step, onAddAnother,
}: {
  cart: CartItem[];
  formule: Formule | null;
  selectedOptions: string[];
  selectedDate: Date | null;
  selectedTime: string | null;
  onContinue: () => void;
  onAddAnother: () => void;
  step: number;
}) {
  const currentOptTotal = formule
    ? formule.options.filter(o => selectedOptions.includes(o.id)).reduce((s, o) => s + o.price, 0)
    : 0;
  const currentTotal = formule ? formule.price + currentOptTotal : 0;
  
  const cartTotal = cart.reduce((acc, item) => {
    const optTotal = item.formule.options.filter(o => item.options.includes(o.id)).reduce((s, o) => s + o.price, 0);
    return acc + item.formule.price + optTotal;
  }, 0);

  const total = currentTotal + cartTotal;

  const canContinue =
    step === 1 ? !!formule :
    step === 2 ? !!formule :
    step === 3 ? !!(selectedDate && selectedTime) :
    false;

  const continuLabel =
    step === 1 ? "Je réserve" :
    step === 2 ? "Choisir mon créneau" :
    step === 3 ? "Finaliser ma réservation" :
    "";

  return (
    <aside className="sticky top-24 rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)] hidden lg:block max-h-[calc(100vh-8rem)] overflow-y-auto">
      <h2 className="text-lg font-bold">Votre réservation</h2>

      <div className="mt-4 border-t border-border pt-4 space-y-3">
        {cart.map((item, idx) => (
          <div key={idx} className="pb-3 border-b border-border/50 last:border-0 last:pb-0">
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="font-semibold text-sm">{item.formule.name}</p>
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <Clock className="size-3" /> {item.formule.duration}
                </p>
              </div>
              <span className="font-bold text-sm shrink-0">{item.formule.price} €</span>
            </div>
            {item.formule.options.filter(o => item.options.includes(o.id)).map(o => (
              <div key={o.id} className="flex items-center justify-between gap-2 text-xs mt-1">
                <span className="text-muted-foreground truncate">{o.name}</span>
                <span className="font-semibold text-primary shrink-0">+{o.price} €</span>
              </div>
            ))}
          </div>
        ))}

        {formule ? (
          <div className="pb-3">
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="font-semibold text-sm">{formule.name}</p>
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <Clock className="size-3" /> {formule.duration}
                </p>
              </div>
              <span className="font-bold text-sm shrink-0">{formule.price} €</span>
            </div>
            {formule.options.filter(o => selectedOptions.includes(o.id)).map(o => (
              <div key={o.id} className="flex items-center justify-between gap-2 text-xs mt-1">
                <span className="text-muted-foreground truncate">{o.name}</span>
                <span className="font-semibold text-primary shrink-0">+{o.price} €</span>
              </div>
            ))}
          </div>
        ) : (
          cart.length === 0 && <p className="text-sm text-muted-foreground">Sélectionnez une prestation.</p>
        )}

        {selectedDate && (
          <div className="rounded-lg bg-secondary/60 px-3 py-2 text-xs">
            <p className="font-semibold text-foreground">
              {selectedDate.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" })}
            </p>
            {selectedTime && <p className="text-primary font-bold mt-0.5">{selectedTime}</p>}
          </div>
        )}
      </div>

      {total > 0 && (
        <div className="mt-4 flex items-baseline justify-between border-t border-border pt-4">
          <span className="text-sm text-muted-foreground">Total estimé</span>
          <span className="font-display text-3xl font-bold">{total} €</span>
        </div>
      )}

      {step === 2 && formule && (
        <Button
          onClick={onAddAnother}
          variant="outline"
          className="mt-5 w-full font-bold hidden lg:inline-flex"
        >
          Ajouter une autre prestation
        </Button>
      )}

      {step < 4 && (step !== 1 || !!formule) && (
        <Button
          onClick={onContinue}
          disabled={!canContinue}
          size="lg"
          className="mt-3 w-full bg-accent-gradient text-accent-foreground font-bold hover:opacity-90 disabled:opacity-40 hidden lg:inline-flex"
        >
          {continuLabel} <ArrowRight className="size-4" />
        </Button>
      )}

      <p className="mt-3 text-center text-[11px] text-muted-foreground">
        Paiement sur place · Annulation gratuite 24h avant
      </p>
    </aside>
  );
}

// ─── PAGE PRINCIPALE ─────────────────────────────────────────────────────────

function ReserverPage() {
  const navigate = useNavigate();
  const { service: serviceParam, formule: formuleParam, from } = Route.useSearch();
  const preselected = SERVICES.find(s => s.id === SLUG_TO_SERVICE[serviceParam]) ?? null;
  const preselectedFormule = preselected?.formules.find(f => f.id === formuleParam) ?? null;

  const [cart, setCart] = useState<CartItem[]>([]);
  const [step, setStep] = useState<1 | 2 | 3 | 4>(preselectedFormule ? 2 : 1);
  const [done, setDone] = useState(false);
  const [service, setService] = useState<ServiceDef | null>(preselected);
  const [formule, setFormule] = useState<Formule | null>(preselectedFormule);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [showCategories, setShowCategories] = useState(!preselected);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", phone: "", email: "", street: "", zip: "", city: "" });
  const [submitting, setSubmitting] = useState(false);
  const [slotTaken, setSlotTaken] = useState(false);
  const [cancelToken, setCancelToken] = useState<string>("");
  const [gcalEventId, setGcalEventId] = useState<string | null>(null);
  const [showSummaryMobile, setShowSummaryMobile] = useState(false);

  const toggleOption = (id: string) =>
    setSelectedOptions(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);

  const handleSelectFormule = (f: Formule) => {
    if (typeof window !== "undefined") {
      (window as any).dataLayer = (window as any).dataLayer || [];
      (window as any).dataLayer.push({
        event: "view_item",
        ecommerce: {
          items: [{ item_name: f.name, price: f.price }]
        }
      });
    }
    setFormule(f);
    setSelectedOptions([]);
    setStep(2);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const handleSelectDate = (d: Date) => { setSelectedDate(d); setSelectedTime(null); setSlotTaken(false); };

  const handleContinue = () => {
    if (step === 2) {
      if (typeof window !== "undefined") {
        (window as any).dataLayer = (window as any).dataLayer || [];
        (window as any).dataLayer.push({
          event: "add_to_cart",
          ecommerce: {
            items: [
              { item_name: formule?.name, price: formule?.price },
              ...selectedOptions.map(optId => {
                const opt = formule?.options.find(o => o.id === optId);
                return { item_name: opt?.name, price: opt?.price };
              })
            ]
          }
        });
      }
    }
    setStep(s => (s < 4 ? (s + 1) as 1|2|3|4 : s));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleAddAnother = () => {
    if (service && formule) {
      setCart(prev => [...prev, { service, formule, options: selectedOptions }]);
    }
    setStep(1);
    setService(null);
    setFormule(null);
    setSelectedOptions([]);
    setShowCategories(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBack = () => {
    if (step > 2) {
      setStep(s => (s - 1) as 1|2|3|4);
    } else if (step === 2) {
      if (preselected && serviceParam) {
        if (from === "formules") {
          navigate({ to: "/formules" });
        } else {
          const SERVICE_URLS: Record<string, string> = {
            canape: "/nettoyage-canape-toulouse",
            tapis: "/nettoyage-tapis-toulouse",
            matelas: "/nettoyage-matelas-toulouse",
            auto: "/nettoyage-auto-a-domicile-toulouse",
            cuir: "/nettoyage-cuir-toulouse",
          };
          const targetUrl = SERVICE_URLS[serviceParam] || "/formules";
          navigate({ to: targetUrl });
        }
      } else {
        setStep(1);
      }
    } else if (step === 1) {
      if (preselected && serviceParam) {
        if (from === "formules") {
          navigate({ to: "/formules" });
        } else {
          const SERVICE_URLS: Record<string, string> = {
            canape: "/nettoyage-canape-toulouse",
            tapis: "/nettoyage-tapis-toulouse",
            matelas: "/nettoyage-matelas-toulouse",
            auto: "/nettoyage-auto-a-domicile-toulouse",
            cuir: "/nettoyage-cuir-toulouse",
          };
          const targetUrl = SERVICE_URLS[serviceParam] || "/formules";
          navigate({ to: targetUrl });
        }
      } else if (!preselected && !showCategories && cart.length === 0) {
        setShowCategories(true); setService(null); setFormule(null);
      } else {
        window.history.back();
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formule || !selectedDate || !selectedTime || !service) return;
    setSubmitting(true);

    const allItems = [...cart, { service, formule, options: selectedOptions }];
    const bookingDate = `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}`;
    
    // Map array to flat structure for server/email
    const mappedItems = allItems.map(item => ({
      service_id: item.service.id,
      service_name: item.service.label,
      formule_id: item.formule.id,
      formule_name: item.formule.name,
      formule_price: item.formule.price,
      options: item.formule.options
        .filter(o => item.options.includes(o.id))
        .map(o => ({ name: o.name, price: o.price })),
    }));

    // Generate a summary for the token and cancel URL
    const formuleSummary = mappedItems.map(i => i.formule_name).join(" + ");
    
    // Generate valid GCal ID (base32hex)
    const generateGcalId = () => {
      const chars = '0123456789abcdefghijklmnopqrstuv';
      let id = '';
      for (let i = 0; i < 32; i++) {
        id += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return id;
    };
    const preGeneratedGcalId = generateGcalId();
    
    const totalDuration = currentDuration + cartDuration;
    
    const shortTokenData = {
      i: preGeneratedGcalId,
      n: form.name.substring(0, 30),
      e: form.email,
      d: bookingDate,
      t: selectedTime,
      f: formuleSummary.substring(0, 30),
      dur: totalDuration
    };
    const cancelToken = btoa(unescape(encodeURIComponent(JSON.stringify(shortTokenData))));

    const siteUrl = "https://www.cleanetfresh.fr";

    let gcalId: string | null = null;
    try {
      const serverResult = await createBookingServerFn({
        data: {
          items: mappedItems,
          total_price:  total,
          duration_min: totalDuration,
          booking_date: bookingDate,
          booking_time: selectedTime,
          client_name:  form.name,
          client_phone: form.phone,
          client_email: form.email,
          client_street: form.street,
          client_zip:   form.zip,
          client_city:  form.city,
          cancel_token: cancelToken,
          gcal_event_id: preGeneratedGcalId,
        },
      });

      // Créneau déjà pris → retour étape 3 avec message d'erreur
      if (serverResult?.error === "SLOT_TAKEN") {
        setSlotTaken(true);
        setSelectedTime(null);
        setStep(3);
        setSubmitting(false);
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }

      gcalId = serverResult?.gcal_event_id ?? preGeneratedGcalId;
      if (gcalId) setGcalEventId(gcalId);
    } catch (gcalErr) {
      console.error("[GCal] Erreur création calendrier :", gcalErr);
    }

    // ⚠️ IMPORTANT : Regénérer le token avec le VRAI ID de l'événement GCal
    // Sinon la reprogrammation ne peut pas fonctionner (PATCH sur mauvais ID)
    const finalGcalId = gcalId ?? preGeneratedGcalId;
    const finalTokenData = {
      i: finalGcalId,
      n: form.name.substring(0, 30),
      e: form.email,
      d: bookingDate,
      t: selectedTime,
      f: formuleSummary.substring(0, 30),
      dur: totalDuration
    };
    const finalCancelToken = btoa(unescape(encodeURIComponent(JSON.stringify(finalTokenData))));

    const cancelUrl = `${siteUrl}/annuler?token=${finalCancelToken}`;

    try {
      await sendBookingEmailsFn({
        data: {
          items: mappedItems,
        total_price:  total,
        booking_date: bookingDate,
        booking_time: selectedTime,
        client_name:  form.name,
        client_phone: form.phone,
        client_email: form.email,
        client_street: form.street,
        client_zip:   form.zip,
        client_city:  form.city,
        cancel_url:   cancelUrl,
        }
      });
    } catch (emailErr) {
      console.error("[Email] Erreur envoi email :", emailErr);
    }

    setCancelToken(finalCancelToken);
    setDone(true);
    setSubmitting(false);

    if (typeof window !== "undefined") {
      (window as any).dataLayer = (window as any).dataLayer || [];
      (window as any).dataLayer.push({
        event: "purchase",
        ecommerce: {
          transaction_id: finalCancelToken,
          value: total,
          currency: "EUR",
          items: mappedItems.map(item => ({
            item_name: item.formule_name,
            price: item.formule_price
          }))
        }
      });
    }
  };

  const currentOptTotal = formule ? formule.options.filter(o => selectedOptions.includes(o.id)).reduce((s, o) => s + o.price, 0) : 0;
  const currentTotal = formule ? formule.price + currentOptTotal : 0;
  const currentDuration = formule ? formule.durationMin : 0;

  const cartTotal = cart.reduce((acc, item) => {
    const optTotal = item.formule.options.filter(o => item.options.includes(o.id)).reduce((s, o) => s + o.price, 0);
    return acc + item.formule.price + optTotal;
  }, 0);
  const cartDuration = cart.reduce((acc, item) => acc + item.formule.durationMin, 0);

  const cartOptTotal = cart.reduce((acc, item) => {
    const oTotal = item.formule.options.filter(o => item.options.includes(o.id)).reduce((s, o) => s + o.price, 0);
    return acc + oTotal;
  }, 0);
  const optTotal = currentOptTotal + cartOptTotal;

  const total = currentTotal + cartTotal;
  const totalDuration = currentDuration + cartDuration;

  const canContinue =
    step === 1 ? !!formule :
    step === 2 ? !!formule :
    step === 3 ? !!(selectedDate && selectedTime) :
    false;

  const continuLabel =
    step === 1 ? "Je réserve" :
    step === 2 ? "Choisir mon créneau" :
    step === 3 ? "Finaliser ma réservation" :
    "";

  // ── CONFIRMATION ──────────────────────────────────────────────────────────
  if (done) {
    const siteUrl = "https://www.cleanetfresh.fr";
    const cancelUrl = cancelToken ? `${siteUrl}/annuler?token=${cancelToken}` : null;
    const fullAddress = `${form.street}, ${form.zip} ${form.city}`;

    return (
      <div className="min-h-screen bg-[#f9f9f7] flex items-center justify-center px-4 py-16">
        <div className="max-w-md w-full text-center">
          <div className="flex size-20 items-center justify-center rounded-full bg-primary/10 text-primary mx-auto">
            <CheckCircle2 className="size-10" />
          </div>
          <h1 className="mt-6 text-3xl font-bold">Réservation confirmée !</h1>
          <p className="mt-3 text-muted-foreground leading-relaxed">
            Un email de confirmation vient d'être envoyé à <strong>{form.email}</strong>.
            Vous recevrez un <strong>rappel 24h avant</strong> votre rendez-vous.
          </p>

          {/* Récap complet */}
          <div className="mt-6 rounded-2xl border border-border bg-card p-5 text-left space-y-3">
            <div className="flex justify-between text-sm border-b border-border/40 pb-2">
              <span className="text-muted-foreground">Client</span>
              <span className="font-semibold">{form.name}</span>
            </div>
            
            <div className="py-2 border-b border-border/40 space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1 block">Prestations réservées</span>
              {cart.map((item, idx) => (
                <div key={idx} className="pb-1.5">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium text-foreground">{item.formule.name}</span>
                    <span className="font-semibold">{item.formule.price} €</span>
                  </div>
                  {item.formule.options.filter(o => item.options.includes(o.id)).map(o => (
                    <div key={o.id} className="flex justify-between text-xs mt-0.5 text-muted-foreground pl-2">
                      <span>+ {o.name}</span>
                      <span>+{o.price} €</span>
                    </div>
                  ))}
                </div>
              ))}
              <div className="pb-1.5">
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-foreground">{formule?.name}</span>
                  <span className="font-semibold">{formule?.price} €</span>
                </div>
                {formule?.options.filter(o => selectedOptions.includes(o.id)).map(o => (
                  <div key={o.id} className="flex justify-between text-xs mt-0.5 text-muted-foreground pl-2">
                    <span>+ {o.name}</span>
                    <span>+{o.price} €</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-between text-sm pt-2">
              <span className="text-muted-foreground">Date</span>
              <span className="font-semibold text-primary text-right">
                {selectedDate?.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" })}<br/>à {selectedTime}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Lieu</span>
              <span className="font-semibold text-right max-w-[60%]">{fullAddress}</span>
            </div>
            
            <div className="flex justify-between text-sm border-t border-border pt-3 mt-3">
              <span className="font-bold text-lg">Total</span>
              <span className="font-bold text-lg text-primary">{total} €</span>
            </div>
            <p className="text-[10px] text-muted-foreground mt-1">
              * Frais de déplacement offerts jusqu'à 20 km. Au-delà : +10 € par tranche de 15 km (réglable sur place).
            </p>
          </div>

          {/* Contact propriétaire */}
          <div className="mt-4 rounded-xl bg-primary/5 border border-primary/20 px-4 py-3">
            <p className="text-xs text-muted-foreground mb-2">Une question ? Contactez-nous :</p>
            <div className="flex justify-center gap-4">
              <a href={COMPANY.phoneHref} className="flex items-center gap-1.5 font-bold text-primary hover:underline">
                <Phone className="size-4" /> {COMPANY.phone}
              </a>
              <a href={`mailto:${COMPANY.email}`} className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors">
                <Mail className="size-4" /> Email
              </a>
            </div>
          </div>

          {/* Annulation */}
          {cancelUrl && (
            <div className="mt-4 rounded-xl border border-border bg-secondary/40 px-5 py-4">
              <p className="text-xs text-muted-foreground mb-2">Vous souhaitez annuler ce rendez-vous ?</p>
              <a
                href={cancelUrl}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-destructive hover:underline"
              >
                <CalendarCheck className="size-4" /> Annuler mon rendez-vous
              </a>
            </div>
          )}

          <Link to="/" className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground">
            <ChevronLeft className="size-4" /> Retour à l'accueil
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f9f9f7] pb-24 lg:pb-0">

      {/* Top bar */}
      <div className="border-b border-border bg-background px-4 py-3 flex items-center justify-between">
        <button onClick={handleBack} className="flex items-center gap-1.5 text-sm font-medium text-foreground hover:text-primary transition-colors">
          <ChevronLeft className="size-5" /> <span className="font-bold">Retour</span>
        </button>
      </div>

      <div className="mx-auto max-w-5xl px-4 py-10">
        <StepBar current={step} />

        <div className={`grid gap-8 items-start ${!showCategories && step < 4 ? "lg:grid-cols-[1fr_300px]" : "grid-cols-1"}`}>

          {/* ── CONTENU PRINCIPAL ── */}
          <div className="relative overflow-hidden w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${step}-${showCategories}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="w-full"
              >

            {/* ─ ÉTAPE 1 : Catégorie ─ */}
            {step === 1 && showCategories && (
              <>
                <h1 className="text-3xl font-bold text-center">CHOISISSEZ UNE PRESTATION POUR VOIR TOUTES LES FORMULES</h1>
                <div className="mt-4 grid grid-cols-4 gap-1.5 md:mt-8 md:gap-4 md:grid-cols-4">
                  {SERVICES.map(s => (
                    <button key={s.id} onClick={() => { setService(s); setShowCategories(false); }}
                      className="group relative flex flex-col items-center rounded-xl md:rounded-2xl border border-border bg-white p-2 md:p-6 text-center shadow-sm transition-all hover:border-primary/50 hover:shadow-md">
                      {s.badge && (
                        <span className="absolute -top-2 left-1/2 -translate-x-1/2 rounded-full bg-[#0055ff] px-1.5 py-0.5 text-[8px] font-bold text-white shadow-md whitespace-nowrap scale-90 md:scale-100">
                          {s.badge}
                        </span>
                      )}
                      <div className="flex size-8 md:size-14 items-center justify-center rounded-lg md:rounded-2xl bg-primary/10 text-primary mb-2 md:mb-6 transition-colors group-hover:bg-primary group-hover:text-white [&_svg]:size-5 md:[&_svg]:size-8">
                        {s.icon}
                      </div>
                      <p className="text-[8px] md:text-[10px] font-bold uppercase tracking-wider md:tracking-widest text-muted-foreground/80 mb-0.5">
                        À partir de
                      </p>
                      <p className="text-sm md:text-4xl font-bold text-primary mb-1 md:mb-4">
                        {s.from} €
                      </p>
                      <h3 className="text-[10px] md:text-lg font-bold text-foreground mb-1 md:mb-4 leading-tight line-clamp-1 w-full text-center">
                        {s.shortLabel || s.label}
                      </h3>
                      <ul className="space-y-2.5 mb-6 flex-1 text-sm text-muted-foreground hidden md:block w-full text-left">
                        {s.features.map(f => (
                          <li key={f} className="flex gap-2 items-start">
                            <CheckCircle2 className="size-4 shrink-0 mt-0.5 text-primary" />
                            <span className="leading-snug">{f}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="mt-auto hidden md:flex w-full items-center justify-center gap-1.5 rounded-xl bg-primary/10 px-4 py-3 text-sm font-bold text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                        <ChevronRight className="size-4" /> Voir les formules
                      </div>
                    </button>
                  ))}
                </div>
              </>
            )}

            {/* ─ ÉTAPE 1 : Formules ─ */}
            {step === 1 && !showCategories && service && (
              <>
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">{service.icon}</div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-primary">Étape 1 — Choisir la prestation</p>
                    <h1 className="text-2xl font-bold">{service.label}</h1>
                  </div>
                  {!preselected && (
                    <button onClick={() => setShowCategories(true)} className="ml-auto text-xs text-muted-foreground underline underline-offset-2 hover:text-foreground">
                      Changer
                    </button>
                  )}
                </div>
                <div className={`grid gap-3 sm:gap-4 ${
                  service.formules.length === 3 ? "grid-cols-1 sm:grid-cols-3" :
                  service.formules.length === 4 ? "grid-cols-2 lg:grid-cols-4" :
                  "grid-cols-2 lg:grid-cols-4"
                }`}>
                  {service.formules.map(f => {
                    const active = formule?.id === f.id;
                    const imgSrc = FORMULE_IMAGES[service.id]?.[f.id];
                    return (
                      <button
                        key={f.id}
                        onClick={() => handleSelectFormule(f)}
                        className={`relative flex flex-col items-center rounded-[20px] border-2 px-3 py-4 text-center transition-all duration-200 hover:-translate-y-1 ${
                          active
                            ? "border-[#7cdcdc] bg-[#d0ebeb]/70 shadow-[0_0_20px_-5px_rgba(124,220,220,0.5)]"
                            : "border-transparent bg-[#e5e9f0]/60 hover:shadow-lg hover:border-primary/20"
                        }`}
                      >
                        {/* Image ou icône */}
                        <div className={`flex items-center justify-center w-full h-20 mb-2 mt-1 ${active ? "text-[#1a2b4c]" : "text-primary/70"}`}>
                          {imgSrc ? (
                            <img
                              src={imgSrc}
                              alt={f.name}
                              className="w-full h-full object-contain mix-blend-multiply scale-110"
                              loading="lazy"
                            />
                          ) : (
                            <div className="flex size-12 items-center justify-center opacity-60">{service.icon}</div>
                          )}
                        </div>
                        <p className="text-[10px] md:text-xs font-semibold uppercase tracking-widest text-muted-foreground/80 leading-none mt-1">Dès</p>
                        <p className={`text-lg md:text-2xl font-bold leading-tight mt-1.5 ${active ? "text-[#1a2b4c]" : "text-foreground"}`}>
                          {f.price} €
                        </p>
                        <p className="text-sm md:text-base font-bold text-foreground/90 leading-snug mt-2 px-1 w-full text-center">{f.name}</p>
                        {f.desc && (
                          <p className="text-xs md:text-sm text-muted-foreground mt-1.5 px-2 leading-snug w-full text-center">{f.desc}</p>
                        )}
                      </button>
                    );
                  })}
                </div>
              </>
            )}

            {/* ─ ÉTAPE 2 : Options ─ */}
            {step === 2 && service && formule && (
              <>
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">{service.icon}</div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-primary">Étape 2 — Options</p>
                    <h2 className="text-2xl font-bold">Options pour <span className="text-accent">{formule.name}</span></h2>
                  </div>
                </div>
                <div className="divide-y divide-border rounded-2xl border border-border bg-card overflow-hidden">
                  {formule.options.map(opt => {
                    const checked = selectedOptions.includes(opt.id);
                    return (
                      <label key={opt.id} className={`flex cursor-pointer items-start gap-4 px-5 py-4 transition-colors hover:bg-secondary/40 ${checked ? "bg-primary/5" : ""}`}>
                        <div className={`mt-2 flex size-5 shrink-0 items-center justify-center rounded border-2 transition-colors ${checked ? "border-primary bg-primary" : "border-border bg-background"}`}>
                          {checked && <Check className="size-3 text-primary-foreground" />}
                        </div>
                        <input type="checkbox" className="sr-only" checked={checked} onChange={() => toggleOption(opt.id)} />
                        
                        <div className={`flex size-10 shrink-0 items-center justify-center rounded-xl transition-colors ${checked ? "bg-primary text-white" : "bg-primary/10 text-primary"}`}>
                          {opt.icon}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-semibold text-sm">{opt.name}</span>
                            {opt.popular && (
                              <span className="rounded-full bg-accent/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-accent">Populaire</span>
                            )}
                          </div>
                          <p className="mt-0.5 text-xs text-muted-foreground leading-relaxed">{opt.desc}</p>
                        </div>
                        <span className="shrink-0 font-bold text-sm text-primary mt-1">+{opt.price} €</span>
                      </label>
                    );
                  })}
                </div>
                <div className="mt-4 flex items-start gap-2 rounded-xl border border-border bg-card px-4 py-3">
                  <Info className="size-4 shrink-0 text-muted-foreground mt-0.5" />
                  <p className="text-xs text-muted-foreground">Les options peuvent aussi être ajustées le jour de l'intervention.</p>
                </div>
              </>
            )}

            {/* ─ ÉTAPE 3 : Calendrier ─ */}
            {step === 3 && formule && (
              <>
                <div className="mb-6">
                  <p className="text-xs font-bold uppercase tracking-widest text-primary">Étape 3 — Choisir votre créneau</p>
                  <h2 className="mt-1 text-2xl font-bold">Quand souhaitez-vous votre intervention ?</h2>
                  <p className="mt-1 text-sm text-muted-foreground">Les créneaux grisés sont déjà réservés.</p>
                </div>

                {/* Bandeau créneau pris */}
                {slotTaken && (
                  <div className="mb-5 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    <Info className="mt-0.5 size-4 shrink-0 text-red-500" />
                    <div>
                      <p className="font-semibold">Ce créneau vient d'être réservé.</p>
                      <p className="mt-0.5 text-red-600/80">Choisissez un autre horaire pour finaliser votre réservation.</p>
                    </div>
                  </div>
                )}

                <CalendarPicker
                  totalDuration={totalDuration}
                  selectedDate={selectedDate}
                  onSelect={handleSelectDate}
                />

                {selectedDate && (
                  <div className="mt-4">
                    <TimeSlotPicker
                      date={selectedDate}
                      totalDuration={totalDuration}
                      selected={selectedTime}
                      onSelect={(t) => { setSelectedTime(t); setSlotTaken(false); }}
                    />
                  </div>
                )}
              </>
            )}

            {/* ─ ÉTAPE 4 : Coordonnées ─ */}
            {step === 4 && formule && selectedDate && selectedTime && (
              <>
                <div className="mb-6">
                  <p className="text-xs font-bold uppercase tracking-widest text-primary">Étape 4 — Vos coordonnées</p>
                  <h2 className="mt-1 text-2xl font-bold">Finaliser la réservation</h2>
                  <p className="mt-1 text-sm text-muted-foreground">Nous vous confirmons par SMS sous 1h.</p>
                </div>

                <form id="booking-form" onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <Label htmlFor="name" className="text-sm font-semibold">Nom complet *</Label>
                    <div className="relative mt-1.5">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                      <Input id="name" required autoComplete="off" placeholder="Jean Dupont" value={form.name}
                        onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                        className="pl-9" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="phone" className="text-sm font-semibold">Téléphone *</Label>
                    <div className="relative mt-1.5">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                      <Input id="phone" required type="tel" autoComplete="off" placeholder="06 12 34 56 78" value={form.phone}
                        onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                        className="pl-9" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-sm font-semibold">Email *</Label>
                    <div className="relative mt-1.5">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                      <Input id="email" required type="email" autoComplete="off" placeholder="jean@exemple.fr" value={form.email}
                        onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                        className="pl-9" />
                    </div>
                  </div>

                  {/* Adresse décomposée */}
                  <div>
                    <Label htmlFor="street" className="text-sm font-semibold">Numéro et nom de rue *</Label>
                    <div className="relative mt-1.5">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                      <Input id="street" required autoComplete="off" placeholder="12 rue de la Paix" value={form.street}
                        onChange={e => setForm(f => ({ ...f, street: e.target.value }))}
                        className="pl-9" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label htmlFor="zip" className="text-sm font-semibold">Code postal *</Label>
                      <div className="relative mt-1.5">
                        <Hash className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                        <Input id="zip" required autoComplete="off" placeholder="31000" value={form.zip}
                          onChange={e => setForm(f => ({ ...f, zip: e.target.value }))}
                          className="pl-9" inputMode="numeric" maxLength={5} />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="city" className="text-sm font-semibold">Ville *</Label>
                      <div className="relative mt-1.5">
                        <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                        <Input id="city" required autoComplete="off" placeholder="Toulouse" value={form.city}
                          onChange={e => setForm(f => ({ ...f, city: e.target.value }))}
                          className="pl-9" />
                      </div>
                    </div>
                  </div>

                  {/* Récap final */}
                  <div className="rounded-2xl border border-border bg-secondary/40 p-5 space-y-2">
                    <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">Récapitulatif</p>
                    
                    {cart.map((item, idx) => (
                      <div key={idx} className="pb-2 mb-2 border-b border-border/30">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground font-semibold">{item.formule.name}</span>
                          <span className="font-semibold">{item.formule.price} €</span>
                        </div>
                        {item.formule.options.filter(o => item.options.includes(o.id)).map(o => (
                          <div key={o.id} className="flex justify-between text-xs mt-1 pl-2">
                            <span className="text-muted-foreground">+ {o.name}</span>
                            <span className="font-semibold text-primary">+{o.price} €</span>
                          </div>
                        ))}
                      </div>
                    ))}
                    
                    <div className="pb-2 mb-2 border-b border-border/30">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground font-semibold">{formule.name}</span>
                        <span className="font-semibold">{formule.price} €</span>
                      </div>
                      {formule.options.filter(o => selectedOptions.includes(o.id)).map(o => (
                        <div key={o.id} className="flex justify-between text-xs mt-1 pl-2">
                          <span className="text-muted-foreground">+ {o.name}</span>
                          <span className="font-semibold text-primary">+{o.price} €</span>
                        </div>
                      ))}
                    </div>
                    <div className="border-t border-border pt-2 flex justify-between">
                      <span className="font-bold">Total estimé</span>
                      <span className="font-bold text-lg">{total} €</span>
                    </div>
                    <p className="text-[10px] text-muted-foreground mt-0">
                      * Frais de déplacement offerts jusqu'à 20 km. Au-delà : +10 € par tranche de 15 km.
                    </p>
                    <p className="text-xs text-muted-foreground">
                      📅 {selectedDate.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" })} à {selectedTime}
                    </p>
                  </div>

                  <Button type="submit" disabled={submitting} size="xl"
                    className="w-full bg-accent-gradient text-accent-foreground font-bold hover:opacity-90 disabled:opacity-60 hidden lg:flex">
                    {submitting
                      ? <><Loader2 className="size-4 animate-spin" /> Envoi en cours…</>
                      : <><CalendarCheck className="size-4" /> Confirmer la réservation</>}
                  </Button>
                  <p className="text-center text-xs text-muted-foreground">
                    Annulation gratuite jusqu'à 24h avant · Paiement sur place
                  </p>
                </form>
              </>
            )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ── SIDEBAR ── */}
          {!showCategories && step < 4 && (
            <Sidebar
              cart={cart}
              formule={formule}
              selectedOptions={selectedOptions}
              selectedDate={selectedDate}
              selectedTime={selectedTime}
              onContinue={handleContinue}
              onAddAnother={handleAddAnother}
              step={step}
            />
          )}
        </div>
      </div>

      {/* ── FOOTER MOBILE — Steps 2 & 3 ── */}
      {step >= 2 && step < 4 && !showCategories && (
        <div className="fixed inset-x-0 bottom-0 z-40 lg:hidden border-t border-white/20 bg-white/80 backdrop-blur-md shadow-[0_-4px_20px_rgba(0,0,0,0.08)] px-4 py-3 flex flex-col gap-2 transition-all duration-300">

          {/* Récap extensible */}
          {showSummaryMobile && (
            <div className="border-b border-border/40 pb-3 max-h-52 overflow-y-auto space-y-2 text-xs">
              <div className="flex justify-between items-center border-b border-border/30 pb-1.5">
                <span className="font-bold text-sm text-foreground">Votre réservation</span>
                <button onClick={() => setShowSummaryMobile(false)} className="text-[10px] text-muted-foreground underline">Fermer</button>
              </div>
              {cart.map((item, idx) => (
                <div key={idx} className="pb-1.5 border-b border-border/30 last:border-0 last:pb-0">
                  <div className="flex justify-between font-semibold">
                    <span>{item.formule.name}</span><span>{item.formule.price} €</span>
                  </div>
                  {item.formule.options.filter(o => item.options.includes(o.id)).map(o => (
                    <div key={o.id} className="flex justify-between text-muted-foreground pl-2 text-[10px]">
                      <span>+ {o.name}</span><span>+{o.price} €</span>
                    </div>
                  ))}
                </div>
              ))}
              {formule && (
                <div>
                  <div className="flex justify-between font-semibold">
                    <span>{formule.name}</span><span>{formule.price} €</span>
                  </div>
                  {formule.options.filter(o => selectedOptions.includes(o.id)).map(o => (
                    <div key={o.id} className="flex justify-between text-muted-foreground pl-2 text-[10px]">
                      <span>+ {o.name}</span><span>+{o.price} €</span>
                    </div>
                  ))}
                </div>
              )}
              {selectedDate && (
                <div className="rounded bg-secondary/60 px-2 py-1.5 text-[10px]">
                  <p className="font-semibold text-foreground">
                    📅 {selectedDate.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" })}
                  </p>
                  {selectedTime && <p className="text-primary font-bold">{selectedTime}</p>}
                </div>
              )}
            </div>
          )}

          {/* Ligne total cliquable */}
          <div
            onClick={() => setShowSummaryMobile(!showSummaryMobile)}
            className="flex justify-between items-center cursor-pointer py-0.5"
          >
            <span className="text-xs text-muted-foreground font-medium flex items-center gap-1">
              Total {showSummaryMobile ? "▼" : "▲ voir le détail"}
            </span>
            <span className="font-bold text-primary">{total} €</span>
          </div>

          {/* Boutons */}
          <div className="flex gap-2">
            {step === 2 && formule && (
              <Button
                onClick={handleAddAnother}
                variant="outline"
                className="flex-1 font-bold h-11 text-[11px] px-2 leading-tight"
              >
                + Prestation
              </Button>
            )}
            <Button
              onClick={handleContinue}
              disabled={!canContinue}
              className="flex-1 bg-accent-gradient text-accent-foreground font-bold h-11 text-[11px] hover:opacity-90 disabled:opacity-40"
            >
              {continuLabel} <ArrowRight className="size-3.5 ml-1" />
            </Button>
          </div>
        </div>
      )}

      {/* ── FOOTER MOBILE — Step 4 ── */}
      {step === 4 && (
        <div className="fixed inset-x-0 bottom-0 z-40 lg:hidden border-t border-white/20 bg-white/80 backdrop-blur-md shadow-[0_-4px_20px_rgba(0,0,0,0.08)] px-4 py-3 flex flex-col gap-2">
          <div className="flex justify-between items-center text-[10px] text-muted-foreground">
            <span>💳 Paiement sur place</span>
            <span>🔓 Annulation gratuite jusqu'à 24h avant</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Total estimé</span>
            <span className="font-bold text-primary">{total} €</span>
          </div>
          <Button
            type="submit"
            form="booking-form"
            disabled={submitting}
            className="w-full bg-accent-gradient text-accent-foreground font-bold h-12 text-sm hover:opacity-90 disabled:opacity-60"
          >
            {submitting
              ? <><Loader2 className="size-4 animate-spin mr-1" /> Envoi en cours…</>
              : <><CalendarCheck className="size-4 mr-1" /> Confirmer la réservation</>}
          </Button>
        </div>
      )}
    </div>
  );
}
