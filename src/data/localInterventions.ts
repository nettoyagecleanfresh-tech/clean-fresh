/**
 * Anonymised completed work, checked against the appointment and a subsequent
 * Google review or invoice. Booking requests alone are not completion evidence.
 * No gallery photo is assigned to these cases without a verified match.
 */
export type LocalIntervention = {
  title: string;
  description: string;
  evidence: string;
  servicePath:
    | "/nettoyage-auto-a-domicile-toulouse"
    | "/nettoyage-moquette-toulouse"
    | "/nettoyage-canape-toulouse";
};

export const LOCAL_INTERVENTIONS: Partial<Record<string, LocalIntervention>> = {
  "nettoyage-colomiers": {
    title: "Un intérieur automobile nettoyé à Colomiers",
    description:
      "En septembre 2026, nous avons réalisé un nettoyage intérieur automobile à Colomiers.",
    evidence: "Cette intervention a fait l’objet d’un avis Google 5 étoiles.",
    servicePath: "/nettoyage-auto-a-domicile-toulouse",
  },
  "nettoyage-balma": {
    title: "Une petite moquette nettoyée à Balma",
    description: "En octobre 2026, nous avons réalisé le nettoyage d’une petite moquette à Balma.",
    evidence: "Cette intervention a fait l’objet d’un avis Google 5 étoiles.",
    servicePath: "/nettoyage-moquette-toulouse",
  },
  "nettoyage-saint-jean": {
    title: "Six chaises rembourrées nettoyées à Saint-Jean",
    description:
      "En octobre 2026, nous sommes intervenus à Saint-Jean pour le nettoyage de six chaises rembourrées.",
    evidence: "Un avis Google 5 étoiles a été publié après cette intervention.",
    servicePath: "/nettoyage-canape-toulouse",
  },
  "nettoyage-tournefeuille": {
    title: "Un nettoyage intérieur automobile à Tournefeuille",
    description:
      "En octobre 2026, nous avons réalisé un nettoyage intérieur automobile à Tournefeuille.",
    evidence: "Un avis Google 5 étoiles a été publié après cette intervention.",
    servicePath: "/nettoyage-auto-a-domicile-toulouse",
  },
  "nettoyage-saint-orens-de-gameville": {
    title: "Un véhicule nettoyé à domicile à Saint-Orens-de-Gameville",
    description:
      "Un client témoigne de notre intervention à domicile pour le nettoyage de son véhicule à Saint-Orens-de-Gameville.",
    evidence: "Son avis Google 5 étoiles a été publié en août 2026.",
    servicePath: "/nettoyage-auto-a-domicile-toulouse",
  },
};
