import type React from "react";
import { Armchair, BedDouble, Layers, Car, Shield, Dog, Droplets, Wind, Sparkles, Sun } from "lucide-react";
export type Option = { id: string; name: string; desc: string; price: number; popular?: boolean; icon?: React.ReactNode };
export type Formule = { id: string; name: string; desc?: string; price: number; duration: string; durationMin: number; options: Option[]; additionalChairs?: number };
export type ServiceDef = { id: string; label: string; shortLabel: string; desc: string; from: number; icon: React.ReactNode; formules: Formule[]; features: string[]; badge?: string };
export type CartItem = { service: ServiceDef; formule: Formule; options: string[] };

// ─── OPTIONS PARTAGÉES ───────────────────────────────────────────────────────

const OA: Option = { id: "acariens",  name: "Traitement anti-acariens et bactériens",  desc: "Traitement complémentaire des sièges, moquettes, textiles et principales surfaces compatibles.", price: 19, popular: true, icon: <Shield className="size-5" /> };
const OP: Option = { id: "poils",     name: "Élimination des poils d'animaux",          desc: "Brossage mécanique spécifique avant l'injection-extraction.",                                           price: 15, popular: true, icon: <Dog className="size-5" /> };
const OPA: Option= { id: "poils",     name: "Élimination des poils d'animaux",          desc: "Brossage spécifique avant nettoyage des sièges et moquettes.",                                          price: 25, icon: <Dog className="size-5" /> };
const OD: Option = { id: "detachage", name: "Détachage intensif",                        desc: "Traitement ciblé pour les tâches anciennes (sang, vin, encre, café).",                                  price: 19, icon: <Droplets className="size-5" /> };
const ODA:Option = { id: "detachage", name: "Détachage intensif — siège très taché",    desc: "Traitement ciblé pour les tâches résistantes sur sièges.",                                               price: 19, icon: <Droplets className="size-5" /> };
const OO: Option = { id: "odeur",     name: "Traitement anti-odeur",                     desc: "Neutralisation moléculaire des mauvaises odeurs incrustées.",                                            price: 15, popular: true, icon: <Wind className="size-5" /> };
const ORV:Option = { id: "rectoverso",name: "Nettoyage recto-verso",                     desc: "Nettoyage des deux faces du tapis pour un résultat total.",                                              price: 25, icon: <Layers className="size-5" /> };
const OV: Option = { id: "vitres",    name: "Vitres sans traces",                        desc: "Nettoyage intérieur des vitres, sans auréoles.",                                                         price: 9, icon: <Sparkles className="size-5" />  };
const OTS:Option = { id: "tapis-sol", name: "Shampouinage des tapis de sol",             desc: "Nettoyage injection-extraction des tapis de sol du véhicule.",                                          price: 15, icon: <Droplets className="size-5" /> };
const OC: Option = { id: "ciel",      name: "Nettoyage du ciel de toit",                 desc: "Nettoyage en profondeur du revêtement du plafond de l'habitacle.",                                      price: 29, icon: <Sparkles className="size-5" /> };
const OSA:Option = { id: "sieges",    name: "Nettoyage des sièges auto",              desc: "Nettoyage complet des sièges : injection-extraction pour les sièges en tissu ou Alcantara compatibles, ou nettoyage manuel professionnel adapté pour les sièges en cuir.", price: 39, icon: <Droplets className="size-5" /> };

// ── NOUVELLES OPTIONS PREMIUM ──
const OE: Option = { id: "enzyme", name: "Traitement enzymatique intensif", desc: "Traitement ciblé des résidus organiques responsables des odeurs tenaces : urine, vomi, transpiration, animaux et autres contaminations organiques sur textiles compatibles.", price: 19, icon: <Droplets className="size-5" /> };
const OUV: Option = { id: "uv", name: "Protection UV & antistatique plastiques", desc: "Aide à protéger les plastiques intérieurs contre les UV et le ternissement, avec finition satinée et effet antistatique limitant l'adhérence de la poussière.", price: 19, icon: <Sun className="size-5" /> };
// Cuir protecteur
const OC_DESC = "Soin professionnel appliqué après le nettoyage du cuir afin d'aider à préserver sa souplesse, son aspect naturel et sa protection contre le dessèchement et l'usure quotidienne.";
const OC_15: Option = { id: "cuir_prot", name: "Soin nourrissant & protecteur du cuir", desc: OC_DESC, price: 15, icon: <Shield className="size-5" /> };
const OC_19: Option = { id: "cuir_prot", name: "Soin nourrissant & protecteur du cuir", desc: OC_DESC, price: 19, icon: <Shield className="size-5" /> };
const OC_25: Option = { id: "cuir_prot", name: "Soin nourrissant & protecteur du cuir", desc: OC_DESC, price: 25, icon: <Shield className="size-5" /> };
const OC_29: Option = { id: "cuir_prot", name: "Soin nourrissant & protecteur du cuir", desc: OC_DESC, price: 29, icon: <Shield className="size-5" /> };

const CAN = [OA, OP, OD, OO, OE];
const TAP = [OA, ORV, OD, OO, OE];
const MAT = [OA, OD, OO, OE];
const MOQ = [OA, OP, OD, OO, OE];

const SERVICE_CATALOG: ServiceDef[] = [
  {
    id: "canape", label: "Nettoyage Canapés, Fauteuils & Chaises", shortLabel: "Canapés, fauteuils & chaises",
    desc: "Nettoyage des textiles compatibles par injection-extraction. Traitement intensif des taches et odeurs en option.",
    from: 49, icon: <Armchair className="size-8" strokeWidth={1.5} />,
    features: ["Fauteuil, canapé 2/3, 4/5 places", "Canapé U/angle, pouf, chaise", "Options anti-acariens, anti-odeur"],
    formules: [
      { id: "fauteuil",     name: "Fauteuil",                       desc: "Nettoyage complet 1 place.", price: 49,  duration: "45 min",  durationMin: 45,  options: CAN },
      { id: "canape-2",     name: "Canapé 2/3 places",              desc: "Nettoyage complet pour 2 à 3 assises.", price: 79,  duration: "1h",      durationMin: 60,  options: CAN },
      { id: "canape-angle", name: "Canapé textile d’angle ou en U", desc: "99 € par canapé, d’angle ou en U. Méridienne incluse. Options en supplément.", price: 99, duration: "1h", durationMin: 60, options: CAN },
      { id: "canape-45",    name: "Canapé 4/5 places",               desc: "Idéal grand format.", price: 99,  duration: "1h",      durationMin: 60,  options: CAN },
      { id: "pouf",         name: "Pouf",                            desc: "Nettoyage d'appoint.", price: 19,  duration: "30 min",  durationMin: 30,  options: CAN },
      { id: "chaise", name: "Lot de 4 chaises rembourrées", desc: "Assises et dossiers nettoyés en profondeur. Intervention de 1 h.", price: 69, duration: "1h", durationMin: 60, options: CAN },
      { id: "chaises-5", name: "Lot de 5 chaises rembourrées", desc: "Assises et dossiers nettoyés en profondeur. Intervention de 1 h.", price: 79, duration: "1h", durationMin: 60, options: CAN },
      { id: "chaises-6", name: "Lot de 6 chaises rembourrées", desc: "Assises et dossiers nettoyés en profondeur. Chaise supplémentaire : +15 €.", price: 89, duration: "1h", durationMin: 60, options: CAN },
    ],
  },
  {
    id: "matelas", label: "Nettoyage Matelas", shortLabel: "Matelas",
    desc: "Nettoyage en profondeur des deux faces inclus. Traitements anti-acariens, anti-odeur et détachage intensif en option.",
    from: 49, icon: <BedDouble className="size-8" strokeWidth={1.5} />,
    features: ["Matelas enfant, 1 place, 2 places", "Nettoyage des deux faces toujours inclus", "Traitement anti-acariens en option"],
    formules: [
      { id: "matelas-enfant", name: "Matelas enfant",   desc: "Largeur inférieure à 90 cm.", price: 49, duration: "30 min", durationMin: 30, options: MAT },
      { id: "matelas-1",      name: "Matelas 1 place",  desc: "Largeur de 90 à 130 cm.", price: 69, duration: "1h", durationMin: 60, options: MAT },
      { id: "matelas-2",      name: "Matelas 2 places", desc: "Largeur à partir de 140 cm.", price: 99, duration: "1h", durationMin: 60, options: MAT },
    ],
  },
  {
    id: "tapis", label: "Nettoyage Tapis", shortLabel: "Tapis",
    desc: "Nettoyage des tapis compatibles jusqu'à 4 m² chacun. Recto-verso et traitements intensifs en option.",
    from: 49, icon: <Layers className="size-8" strokeWidth={1.5} />,
    features: ["1 tapis, 2 tapis, 3 tapis", "Format standard jusqu'à 4 m² par tapis", "Options anti-acariens, recto-verso"],
    formules: [
      { id: "tapis-1", name: "1 Tapis", desc: "Format standard jusqu'à 4 m².", price: 49, duration: "45 min", durationMin: 45, options: TAP },
      { id: "tapis-2", name: "2 Tapis", desc: "Formats standards jusqu'à 4 m² chacun.", price: 79, duration: "1h",     durationMin: 60, options: TAP },
      { id: "tapis-3", name: "3 Tapis", desc: "Formats standards jusqu'à 4 m² chacun.", price: 99, duration: "1h15",   durationMin: 75, options: TAP },
    ],
  },
  {
    id: "moquette", label: "Nettoyage Moquette", shortLabel: "Moquette",
    desc: "Nettoyage en profondeur des moquettes compatibles par injection-extraction.",
    from: 99, icon: <Layers className="size-8" strokeWidth={1.5} />,
    features: ["Petite, moyenne ou grande pièce", "Injection-extraction professionnelle", "Options détachage et anti-odeur"],
    formules: [
      { id: "moquette-petite", name: "Petite moquette", desc: "Surface inférieure à 12 m².", price: 99, duration: "1h", durationMin: 60, options: MOQ },
      { id: "moquette-standard", name: "Moquette moyenne", desc: "Surface de 12 à 20 m².", price: 149, duration: "1h30", durationMin: 90, options: MOQ },
      { id: "moquette-grande", name: "Grande moquette", desc: "Surface supérieure à 20 m².", price: 199, duration: "2h", durationMin: 120, options: MOQ },
    ],
  },
  {
    id: "auto", label: "Nettoyage Auto", shortLabel: "Nettoyage auto",
    desc: "Aspiration, plastiques, sièges, vitres et moquettes selon la formule choisie.",
    from: 69, icon: <Car className="size-8" strokeWidth={1.5} />,
    features: ["Pack Bronze, Argent, Or", "Sièges, plastiques, vitres, coffre", "Options poils, anti-odeur, ciel de toit"],
    formules: [
      { id: "bronze", name: "Pack Bronze", desc: "Aspiration complète de l'habitacle et du coffre, puis nettoyage et dégraissage de tous les plastiques du véhicule, coffre compris.", price: 69, duration: "1h", durationMin: 60, options: [OUV, OA, OPA, OV, OTS, OC, OSA, OO, OC_25] },
      { id: "argent", name: "Pack Argent", desc: "Tout le Pack Bronze, plus le nettoyage de tous les sièges du véhicule (injection-extraction sur textiles compatibles, méthode manuelle adaptée au cuir) et le nettoyage des vitres.", price: 99, duration: "1h30", durationMin: 90, options: [OUV, OE, OA, ODA, OPA, OTS, OC, OO, OC_25] },
      { id: "or", name: "Pack Or", desc: "Tout le Pack Argent, plus le shampouinage de toute la moquette de l'habitacle et du coffre, des tapis, des contours et bas de portes et du contour de coffre.", price: 129, duration: "2h", durationMin: 120, options: [OUV, OE, OA, ODA, OPA, OC, OO, OC_25] },
      { id: "siege", name: "Rénovation sièges auto", desc: "Nettoyage de tous les sièges : injection-extraction sur textiles compatibles, nettoyage manuel adapté sur cuir. Méthode choisie après diagnostic.", price: 59, duration: "45 min", durationMin: 45, options: [OE, OA, ODA, OPA, OO, OC_25] },
    ],
  },
  {
    id: "cuir", label: "Nettoyage Cuir — Canapés, Fauteuils & Chaises", shortLabel: "Cuir",
    desc: "Nettoyage manuel doux des cuirs compatibles. Soin nourrissant et protecteur proposé en option.",
    from: 49, icon: <Armchair className="size-8" strokeWidth={1.5} />,
    features: ["Fauteuil, canapé 2/3, 4/5 places", "Chaises et sièges auto cuir", "Traitement nourrissant en option"],
    formules: [
      { id: "cuir-fauteuil",     name: "Fauteuil cuir",             desc: "Nettoyage manuel 1 place.", price: 49,  duration: "45 min",  durationMin: 45,  options: [OC_19, OD, OO] },
      { id: "cuir-canape-2",     name: "Canapé cuir 2/3 places",    desc: "Nettoyage manuel pour 2 à 3 assises.", price: 79,  duration: "1h",      durationMin: 60,  options: [OC_25, OD, OO] },
      { id: "cuir-canape-4",     name: "Canapé cuir 4/5 places",    desc: "Nettoyage manuel pour 4 à 5 assises.", price: 99,  duration: "1h",      durationMin: 60,  options: [OC_29, OD, OO] },
      { id: "cuir-canape-angle", name: "Canapé cuir en U ou en angle",  desc: "Nettoyage manuel grand format.", price: 99,  duration: "1h",      durationMin: 60,  options: [OC_29, OD, OO] },
      { id: "cuir-pouf",         name: "Pouf cuir",                 desc: "Nettoyage manuel.",         price: 19,  duration: "30 min",  durationMin: 30,  options: [OC_15, OD, OO] },
      { id: "cuir-chaise", name: "Lot de 4 chaises en cuir", desc: "Nettoyage manuel des assises et dossiers. Intervention de 1 h.", price: 69, duration: "1h", durationMin: 60, options: [OC_15, OD, OO] },
      { id: "cuir-chaises-5", name: "Lot de 5 chaises en cuir", desc: "Nettoyage manuel des assises et dossiers. Intervention de 1 h.", price: 79, duration: "1h", durationMin: 60, options: [OC_15, OD, OO] },
      { id: "cuir-chaises-6", name: "Lot de 6 chaises en cuir", desc: "Nettoyage manuel des assises et dossiers. Chaise supplémentaire : +15 €.", price: 89, duration: "1h", durationMin: 60, options: [OC_15, OD, OO] },
      { id: "cuir-auto",         name: "Sièges auto cuir",          desc: "Nettoyage complet sièges habitacle.", price: 59,  duration: "1h",      durationMin: 60,  options: [OC_25, OD, OO] },
    ],
  },
];

export const SLUG_TO_SERVICE: Record<string, string> = { canape: "canape", tapis: "tapis", moquette: "moquette", matelas: "matelas", auto: "auto", cuir: "cuir" };
export const SERVICES = ["canape", "matelas", "tapis", "auto", "cuir", "moquette"]
  .map((id) => SERVICE_CATALOG.find((service) => service.id === id))
  .filter((service): service is ServiceDef => Boolean(service));


// Le supplément est reconstruit côté serveur, comme le prix du lot.
export function withAdditionalChairs(base: Formule, count: number): Formule {
  if (!Number.isSafeInteger(count) || count < 0 || count > 100 || (count > 0 && !["chaises-6", "cuir-chaises-6"].includes(base.id))) {
    throw new Error("INVALID_CHAIR_QUANTITY");
  }
  if (!count) return { ...base, additionalChairs: 0 };
  const durationMin = base.durationMin + count * 20;
  const hours = Math.floor(durationMin / 60);
  const minutes = durationMin % 60;
  return {
    ...base,
    additionalChairs: count,
    name: `${base.name} + ${count} chaise${count > 1 ? "s" : ""} supplémentaire${count > 1 ? "s" : ""}`,
    price: base.price + count * 15,
    durationMin,
    duration: `${hours}h${minutes ? String(minutes).padStart(2, "0") : ""}`,
  };
}
