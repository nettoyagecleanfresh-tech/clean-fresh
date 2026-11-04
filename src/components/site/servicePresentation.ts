import { SERVICES as BOOKING_SERVICES } from "@/data/bookingCatalogue";

export const SERVICE_ESSENTIALS: Record<string, {
  title: string;
  included: string;
  options: string;
  preparation: string;
}> = {
  matelas: {
    title: "Un nettoyage adapté à votre matelas",
    included: "Les deux faces sont incluses, ainsi que le nettoyage courant des taches sur les textiles compatibles. Choisissez le format enfant, une place ou deux places.",
    options: "Anti-acariens par vapeur, détachage intensif, anti-odeur ou traitement enzymatique : les compléments se choisissent selon l’état du matelas.",
    preparation: "Retirez le linge de lit et prévoyez une pièce aérée. Attendez le séchage complet avant de remettre les draps ; le délai dépend de la matière et de la ventilation.",
  },
  tapis: {
    title: "Le bon soin pour les fibres de votre tapis",
    included: "Les formules couvrent un, deux ou trois tapis, jusqu’à 4 m² chacun. La matière et la tenue des couleurs sont vérifiées avant le nettoyage.",
    options: "Le recto-verso est proposé en supplément sur les tapis compatibles. Les traitements des taches tenaces et des odeurs sont choisis séparément.",
    preparation: "Libérez l’accès au tapis et signalez les matières délicates, les anciennes taches ou les produits déjà appliqués. Pour un grand format, contactez-nous avant de réserver.",
  },
  moquette: {
    title: "Une intervention pensée pour votre pièce",
    included: "Le nettoyage par injection-extraction concerne la moquette accessible et compatible. Choisissez la formule correspondant à la surface de votre pièce.",
    options: "Poils d’animaux, taches résistantes, odeurs ou résidus organiques : ajoutez uniquement les traitements adaptés à votre besoin.",
    preparation: "Dégagez les petits objets et les zones à nettoyer. Signalez les meubles lourds et prévoyez de limiter le passage jusqu’au séchage complet.",
  },
  cuir: {
    title: "Le cuir mérite une méthode dédiée",
    included: "Un nettoyage manuel doux des surfaces compatibles, avec vérification du revêtement. La formule correspond à votre fauteuil, canapé, lot de chaises ou sièges auto.",
    options: "Le soin nourrissant et protecteur est facultatif. Son prix dépend du mobilier sélectionné et apparaît dans les options avant la réservation.",
    preparation: "Signalez les zones décolorées ou craquelées et les produits déjà utilisés. Le nettoyage ne répare pas les déchirures et ne remplace pas une recoloration.",
  },
};

const HERO_FORMULAS: Record<string, string[]> = {
  matelas: ["matelas-enfant", "matelas-1", "matelas-2"],
  tapis: ["tapis-1", "tapis-2", "tapis-3"],
  moquette: ["moquette-petite", "moquette-standard", "moquette-grande"],
  cuir: ["cuir-fauteuil", "cuir-canape-2", "cuir-canape-angle"],
};

/** Presentation reads the booking catalogue so prices cannot drift between the two. */
export function serviceHeroPrices(serviceId: string | null) {
  const selectedIds = serviceId ? HERO_FORMULAS[serviceId] : undefined;
  const catalogue = BOOKING_SERVICES.find(service => service.id === serviceId);
  if (!selectedIds || !catalogue) return null;
  return selectedIds.map(id => catalogue.formules.find(formule => formule.id === id))
    .filter(formule => formule !== undefined)
    .map(formule => ({
      label: serviceId === "moquette" ? formule.desc?.replace(/^Surface /, "") ?? formule.name : formule.name,
      price: `${formule.price} €`,
    }));
}

export function serviceDisplayOptions(serviceId: string | null) {
  if (!serviceId || !SERVICE_ESSENTIALS[serviceId]) return null;
  const catalogue = BOOKING_SERVICES.find(service => service.id === serviceId);
  const allOptions = catalogue?.formules.flatMap(formule => formule.options) ?? [];
  return [...new Map(allOptions.map(option => [option.id, option])).values()].map(option => {
    const prices = allOptions.filter(candidate => candidate.id === option.id).map(candidate => candidate.price);
    const minimum = Math.min(...prices);
    const maximum = Math.max(...prices);
    return { ...option, price: minimum === maximum ? String(minimum) : `${minimum} à ${maximum}` };
  });
}

