export const SITE_URL = "https://cleanetfresh.fr";
export const OG_IMAGE = `${SITE_URL}/realisations/photo-02.webp`;
export const GOOGLE_REVIEWS_URL = "https://www.google.com/search?q=clean+fresh+toulouse+avis";

/** Nombre d'avis Google — à mettre à jour ici pour propager partout */
export const GOOGLE_REVIEW_COUNT = 139;
export const GOOGLE_REVIEW_RATING = 4.9;

export const COMPANY = {
  name: "Clean&Fresh",
  slogan: "On redonne vie à vos intérieurs et extérieurs",
  phone: "07 67 12 75 00",
  phoneHref: "tel:+33767127500",
  email: "nettoyagecleanfresh@gmail.com",
  city: "Toulouse",
  streetAddress: "173 avenue Jean Chaubet",
  postalCode: "31500",
  region: "Haute-Garonne",
  booking: "https://app.dispoo.fr/website/385-clean-fresh",
};

export const DISPLACEMENT_RULES = {
  freeKm: 20, // Offert jusqu'à 20 km
  baseFee: 10, // 10€ de 21 à 34 km
  extraFeePerTier: 10, // +10€ chaque tranche de 15km (ex: 35-49km = 20€)
  tierSizeKm: 15,
};

export const COMMUNES = [
  "Toulouse",
  "Colomiers",
  "Tournefeuille",
  "Blagnac",
  "Muret",
  "Cugnaux",
  "Balma",
  "Ramonville-Saint-Agne",
  "Castanet-Tolosan",
  "Plaisance-du-Touch",
  "Saint-Orens-de-Gameville",
  "L'Union",
  "Fonsorbes",
  "Villeneuve-Tolosane",
  "Portet-sur-Garonne",
  "Aucamville",
  "Castelginest",
  "Launaguet",
  "Saint-Jean",
  "Frouzins",
  "Seysses",
  "Cornebarrieu",
  "Beauzelle",
  "Aussonne",
  "Pibrac",
  "Léguevin",
  "Escalquens",
  "Labège",
  "Saint-Alban",
  "Fenouillet",
  "Quint-Fonsegrives",
  "Saint-Lys",
  "Eaunes",
  "Roques",
  "Bruguières",
  "La Salvetat-Saint-Gilles",
  "Castelmaurou",
  "Auzeville-Tolosane",
  "Pins-Justaret",
  "Gratentour",
];

export type PriceRow = { label: string; price: string; items?: string[]; note?: string; formuleId?: string };

export type FaqItem = { q: string; a: string };

export type Service = {
  slug: string;
  navLabel: string;
  h1: string;
  short: string;
  subtitle: string;
  metaTitle: string;
  metaDescription: string;
  group: "textile" | "batiment";
  detailTitle: string;
  methodTitle: string;
  relatedSlugs: string[];
  booking?: boolean;
  intro: string[];
  treated: string[];
  problems: string[];
  prices?: PriceRow[];
  priceNote?: string;
  soils?: string[];
  method: string[];
  faq?: FaqItem[];
};

export const SERVICES: Service[] = [
  {
    slug: "/nettoyage-canape-toulouse",
    navLabel: "Nettoyage canapé Toulouse",
    h1: "Nettoyage canapé à Toulouse",
    short: "Nettoyage canapés, fauteuils et chaises Toulouse",
    subtitle:
      "Nettoyage en profondeur de vos canapés, fauteuils et chaises à domicile. À Toulouse et dans toute l'agglomération.",
    metaTitle: "Nettoyage canapé à domicile Toulouse dès 79 € | Clean&Fresh",
    metaDescription: "Nettoyage de canapé à domicile à Toulouse : 2/3 places 79 €, angle ou U 99 €. Taches, assises et coussins compatibles. Créneaux et réservation en ligne.",
    group: "textile",
    booking: true,
    detailTitle: "Un nettoyage adapté à votre canapé",
    methodTitle: "Les étapes du nettoyage de votre canapé",
    relatedSlugs: ["/nettoyage-cuir-toulouse", "/nettoyage-tapis-toulouse", "/nettoyage-matelas-toulouse", "/nettoyage-moquette-toulouse", "/nettoyage-auto-a-domicile-toulouse", "/nettoyage-dappartement-ou-maison"],
    intro: [
      "Retrouvez un canapé propre sans le transporter : Clean&Fresh nettoie à domicile les canapés, fauteuils et chaises rembourrées à Toulouse et dans son agglomération. L'assise, le dossier et les coussins compatibles sont traités avec une méthode adaptée à leur revêtement.",
      "Un canapé non déhoussable peut être nettoyé sur place lorsque son revêtement le permet. Précisez le nombre de places, la présence d’une méridienne et l’état des coussins pour choisir la bonne formule. Pour des auréoles apparues après un nettoyage maison, signalez les produits utilisés : un traitement homogène de la zone peut être préférable à un détachage ponctuel.",
      "Choisissez le format de votre canapé, puis les options utiles : poils d'animaux, détachage intensif, traitement anti-odeur ou anti-acariens. Le prix de la formule et des suppléments est visible avant de réserver ; le règlement s'effectue en fin de prestation.",
      "Sur les tissus compatibles, l'injection-extraction associe une solution nettoyante et l'aspiration des salissures. La fibre, les couleurs et l'étiquette d'entretien sont vérifiées au préalable. La vapeur est un complément réservé aux matières qui la supportent. Un canapé en cuir reçoit un nettoyage manuel spécifique.",
      "Les photos avant/après présentent des assises, dossiers et méridiennes nettoyés lors de nos interventions. Une tache ancienne, une décoloration ou une usure peuvent rester visibles : nous expliquons les possibilités de traitement après diagnostic, sans promettre un résultat identique sur tous les meubles.",
      "Préparez l'accès au canapé, retirez les objets et prévoyez de l'eau et une prise électrique. Le séchage demande généralement 2 à 4 heures, parfois davantage selon le tissu et l'aération. Les créneaux disponibles à Toulouse, Blagnac, Colomiers, Balma et alentours se consultent directement en ligne."
    ],
    treated: [
      "Canapés 2, 3, 4 et 5 places",
      "Canapés d'angle, en U, modulables et convertibles",
      "Fauteuils et banquettes",
      "Chaises rembourrées et poufs",
      "Microfibre, velours, coton, lin et mélanges",
    ],
    problems: [
      "Taches incrustées et auréoles",
      "Acariens et allergènes",
      "Mauvaises odeurs persistantes",
      "Tissu terni par l'usage quotidien",
    ],
    prices: [
      { label: "Fauteuil", price: "49 €", items: ["Nettoyage assise, dossier et coussin", "Traitement courant des taches et auréoles", "Nettoyage courant des odeurs ; traitement intensif en option", "Séchage variable selon la matière et l’aération"], formuleId: "fauteuil" },
      { label: "Canapé 2/3 places", price: "79 €", items: ["Nettoyage assise, dossier et coussins", "Traitement courant des taches et auréoles", "Nettoyage courant des odeurs ; traitement intensif en option", "Séchage variable selon la matière et l’aération"], formuleId: "canape-2" },
      { label: "Canapé 4/5 places", price: "99 €", items: ["Nettoyage assise, dossier et coussins", "Traitement courant des taches et auréoles", "Nettoyage courant des odeurs ; traitement intensif en option", "Séchage variable selon la matière et l’aération"], formuleId: "canape-45" },
      { label: "Canapé textile d’angle ou en U", price: "99 €", note: "Par canapé, d’angle ou en U. Options en supplément.", items: ["Grande surface traitée en profondeur", "Traitement courant des taches et auréoles", "Nettoyage courant des odeurs ; traitement intensif en option", "Séchage variable selon la matière et l’aération"], formuleId: "canape-angle" },
      { label: "Pouf", price: "19 €", items: ["Tissu et velours compatibles après diagnostic", "Traitement courant des taches et auréoles", "Nettoyage courant des odeurs ; traitement intensif en option"], formuleId: "pouf" },
      { label: "Lot de 4 chaises rembourrées", price: "69 €", items: ["Assises et dossiers traités en profondeur", "Traitement courant des taches et auréoles", "1 h d’intervention"], formuleId: "chaise" },
      { label: "Lot de 5 chaises rembourrées", price: "79 €", items: ["Assises et dossiers traités en profondeur", "Traitement courant des taches et auréoles", "1 h d’intervention"], formuleId: "chaises-5" },
      { label: "Lot de 6 chaises rembourrées", price: "89 €", items: ["Assises et dossiers traités en profondeur", "Traitement courant des taches et auréoles", "1 h d’intervention", "Chaise supplémentaire : +15 €"], formuleId: "chaises-6" },
    ],
    priceNote:
      "Inclus : nettoyage courant de l'assise, du dossier et des coussins compatibles. Les traitements intensifs des taches anciennes, odeurs persistantes, poils et résidus organiques sont proposés en option selon l'état du support.",
    soils: [
      "Pipi de chat et de chien",
      "Transpiration",
      "Nourriture et boissons",
      "Odeur de cigarette",
      "Taches incrustées",
    ],
    method: [
      "Diagnostic du tissu et test de compatibilité avant traitement.",
      "Détachage ciblé des zones les plus marquées.",
      "Injection-extraction : la solution nettoyante est injectée dans la fibre puis aspirée avec les salissures.",
      "Extraction de l’humidité et conseils de séchage. Les odeurs incrustées peuvent nécessiter un traitement complémentaire.",
    ],
    faq: [
      { q: "Peut-on nettoyer un canapé non déhoussable à domicile ?", a: "Oui, si la matière et les consignes du fabricant le permettent. Le nettoyage porte sur les parties accessibles, sans avoir à laver les housses en machine. Envoyez une photo de l’ensemble et de l’étiquette en cas de doute sur le tissu." },
      { q: "Faut-il choisir la vapeur ou le shampouinage du canapé ?", a: "Le choix dépend du revêtement. L’injection-extraction sert à retirer la solution de nettoyage et les salissures des tissus compatibles ; la vapeur peut être un complément. Une matière fragile ou un canapé en cuir demande une autre méthode." },
      {
        "q": "Combien coûte un nettoyage de canapé à Toulouse ?",
        "a": "Le fauteuil est à 49 €, le canapé 2/3 places à 79 €, le canapé 4/5 places ou d'angle/en U à 99 €. Les options et les éventuels frais de déplacement s'ajoutent au prix affiché avant confirmation."
      },
      {
        "q": "Que comprend le nettoyage du canapé ?",
        "a": "La formule comprend le nettoyage courant de l'assise, du dossier et des coussins compatibles. Les poils d'animaux, les taches anciennes et les odeurs persistantes peuvent demander une option spécifique, choisie avant la confirmation."
      },
      {
        "q": "Combien de temps dure l'intervention et le séchage ?",
        "a": "Prévoyez environ 45 minutes à 1 h 30 selon le format et l'état. Le séchage prend généralement 2 à 4 heures, parfois davantage. Aérez la pièce et attendez que le textile soit complètement sec avant de vous asseoir."
      },
      {
        "q": "Une ancienne tache de café, de vin ou d'urine peut-elle disparaître ?",
        "a": "Un détachage ciblé peut atténuer ou retirer la tache selon sa nature, son ancienneté et les produits déjà utilisés. Certaines marques restent fixées dans la fibre. Des photos permettent d'évaluer le besoin d'un détachage intensif ou d'un traitement enzymatique."
      },
      {
        "q": "Nettoyez-vous les canapés en cuir ?",
        "a": "Oui, avec un nettoyage manuel adapté au cuir, sans injection-extraction. Le soin nourrissant et protecteur est proposé en option. Cette prestation traite les salissures, mais ne recolore pas les zones usées et ne répare pas les craquelures."
      },
      {
        "q": "Puis-je ajouter un matelas ou un tapis à ma réservation ?",
        "a": "Oui, vous pouvez ajouter plusieurs prestations à votre réservation. Vérifiez le récapitulatif, les options et la durée totale avant de choisir votre créneau."
      }
    ],
  },
  {
    slug: "/nettoyage-matelas-toulouse",
    navLabel: "Nettoyage matelas Toulouse",
    h1: "Nettoyage matelas à Toulouse",
    short: "Nettoyage matelas Toulouse",
    subtitle:
      "Nettoyage en profondeur du matelas par injection-extraction, avec les deux faces toujours incluses. Options anti-acariens, anti-odeur et traitement enzymatique.",
    metaTitle: "Nettoyage matelas Toulouse : 2 faces dès 49 € | Clean&Fresh",
    metaDescription: "Nettoyage de matelas à Toulouse : enfant 49 €, 1 place 69 €, 2 places 99 €. Deux faces incluses, options selon les taches et réservation à domicile.",
    group: "textile",
    booking: true,
    detailTitle: "Nettoyer les deux faces de votre matelas",
    methodTitle: "Notre méthode pour les matelas",
    relatedSlugs: ["/nettoyage-canape-toulouse", "/nettoyage-tapis-toulouse", "/nettoyage-moquette-toulouse", "/nettoyage-cuir-toulouse", "/nettoyage-dappartement-ou-maison", "/nettoyage-fin-de-bail-toulouse"],
    intro: [
      "Clean&Fresh nettoie votre matelas à domicile à Toulouse, avec les deux faces incluses pour chaque format : enfant, une place ou deux places. Nous traitons les poussières et les salissures du couchage après vérification du revêtement et des recommandations d'entretien.",
      "Pour un matelas jauni ou marqué par la transpiration, l’objectif est de nettoyer le textile compatible et de traiter les salissures, pas de blanchir la matière à tout prix. Une trace visible peut persister même après le nettoyage. Prévoyez le passage assez tôt et une pièce aérée pour laisser sécher les deux faces avant de remettre une alèse et les draps.",
      "La formule comprend l'injection-extraction des textiles compatibles et le traitement courant des taches et auréoles. Vous pouvez ajouter un détachage intensif, un traitement anti-odeur, anti-acariens ou enzymatique selon le besoin. Les options sélectionnées figurent dans le récapitulatif de réservation.",
      "Pour les traces d'urine ou de transpiration, précisez l'ancienneté de la tache et les produits déjà appliqués. Le traitement dépend de la fibre et de la profondeur des salissures. Les photos avant/après de matelas présentées sur cette page illustrent des résultats obtenus, sans garantir la disparition de toutes les auréoles.",
      "Un nettoyage aide à retirer les poussières et allergènes accumulés. Il ne répare pas une mousse affaissée et ne suffit pas à rendre utilisable un matelas dont l'intérieur est dégradé ou contaminé. En cas de moisissures importantes, envoyez des photos avant de réserver pour vérifier si la prestation convient.",
      "Dégagez les côtés du lit pour permettre le retournement du matelas et prévoyez de l'eau et une prise électrique. Le séchage prend généralement 3 à 6 heures, parfois davantage selon l'épaisseur et l'aération. Réservez de préférence assez tôt pour laisser le couchage sécher complètement avant la nuit."
    ],
    treated: [
      "Matelas enfant, une place et deux places",
      "Grands formats après vérification des dimensions",
      "Matelas mousse, ressorts ou latex compatibles après diagnostic",
      "Sommiers tapissiers et têtes de lit sur demande distincte"
    ],
    problems: [
      "Poussières et allergènes accumulés",
      "Auréoles de transpiration et d'urine",
      "Taches du quotidien",
      "Odeurs selon leur origine et la profondeur des salissures"
    ],
    prices: [
      { label: "Matelas enfant (< 90 cm)", price: "49 €", note: "Deux faces incluses", items: ["Nettoyage des deux faces inclus", "Séchage généralement dans la journée", "Traitement courant des taches et auréoles", "Option anti-odeur disponible"], formuleId: "matelas-enfant" },
      { label: "Matelas 1 place", price: "69 €", note: "Deux faces incluses", items: ["Nettoyage des deux faces inclus", "Réutilisation après séchage complet", "Traitement courant des taches et auréoles", "Nettoyage courant des odeurs ; traitement intensif en option"], formuleId: "matelas-1" },
      { label: "Matelas 2 places", price: "99 €", note: "Deux faces incluses", items: ["Nettoyage des deux faces inclus", "Réutilisation après séchage complet", "Traitement courant des taches et auréoles", "Nettoyage courant des odeurs ; traitement intensif en option"], formuleId: "matelas-2" },
    ],
    priceNote: "Tarifs applicables aux formats indiqués et à un état standard. Format hors catégorie ou état exceptionnel : estimation préalable sur photos.",
    soils: [
      "Urine",
      "Transpiration",
      "Sang",
      "Taches de boissons",
      "Odeurs de renfermé"
    ],
    method: [
      "Vérification de la matière et de l'état du matelas, puis aspiration des salissures de surface.",
      "Traitement courant des taches ; application des options choisies sur les textiles compatibles.",
      "Injection-extraction des deux faces avec maîtrise de l'humidité.",
      "Extraction finale, contrôle du résultat et conseils de séchage avant réutilisation."
    ],
    faq: [
      { q: "Peut-on nettoyer un matelas jauni par la transpiration ?", a: "Les auréoles peuvent être atténuées par un traitement adapté après diagnostic. Le résultat dépend de l’ancienneté des traces, du tissu et des produits déjà utilisés. Le nettoyage ne garantit pas le retour à une couleur blanche uniforme." },
      { q: "Nettoyez-vous un matelas de canapé convertible ?", a: "La possibilité dépend de son format, de son épaisseur et de son accessibilité. Indiquez qu’il s’agit d’un convertible et transmettez une photo avant de choisir une formule. Le nettoyage de l’assise du canapé est une prestation distincte." },
      {
        "q": "Quel est le prix d'un nettoyage de matelas à Toulouse ?",
        "a": "Le matelas enfant de moins de 90 cm est à 49 €, le matelas 1 place à 69 € et le matelas 2 places à 99 €. Les deux faces sont incluses. Les options et éventuels frais de déplacement sont précisés avant confirmation."
      },
      {
        "q": "Les deux faces du matelas sont-elles comprises ?",
        "a": "Oui, le nettoyage des deux faces est inclus pour chaque format. Dégagez l'accès autour du lit ; signalez un matelas très lourd ou difficile à retourner afin de préparer l'intervention."
      },
      {
        "q": "Quel traitement choisir pour une tache d'urine ?",
        "a": "Un traitement enzymatique peut être ajouté après vérification de la matière. Il complète le nettoyage pour les résidus organiques ; un détachage intensif peut aussi être utile. Une auréole ancienne peut subsister malgré le traitement."
      },
      {
        "q": "Quand puis-je dormir à nouveau sur mon matelas ?",
        "a": "Attendez le séchage complet, généralement 3 à 6 heures et parfois davantage selon la matière, l'épaisseur et la ventilation. Privilégiez un créneau en matinée si vous souhaitez réutiliser le lit le soir."
      },
      {
        "q": "Le traitement anti-acariens est-il compris ?",
        "a": "Le nettoyage courant est inclus ; le traitement complémentaire anti-acariens est une option. Il est appliqué uniquement sur les matières compatibles. Le nettoyage du matelas ne remplace pas les conseils de votre professionnel de santé."
      },
      {
        "q": "Faut-il enlever les draps et protéger le sommier ?",
        "a": "Retirez les draps, alèses, oreillers et objets autour du lit avant l'arrivée. Le technicien vérifie l'installation pour travailler sur les deux faces. Le nettoyage du sommier ou de la tête de lit doit être demandé séparément."
      }
    ],
  },
  {
    slug: "/nettoyage-tapis-toulouse",
    navLabel: "Nettoyage tapis Toulouse",
    h1: "Nettoyage de tapis à domicile à Toulouse",
    short: "Nettoyage tapis Toulouse",
    subtitle: "Nettoyage de tapis à domicile à Toulouse : 1, 2 ou 3 tapis jusqu'à 4 m² chacun. Méthode adaptée à la fibre après diagnostic.",
    metaTitle: "Nettoyage tapis à domicile Toulouse dès 49 € | Clean&Fresh",
    metaDescription: "Faites nettoyer vos tapis à domicile à Toulouse : 1 tapis 49 €, 2 tapis 79 €, 3 tapis 99 €, jusqu’à 4 m² chacun. Matière vérifiée, options au choix.",
    group: "textile",
    booking: true,
    detailTitle: "Le nettoyage de tapis selon la fibre",
    methodTitle: "Les étapes du nettoyage de vos tapis",
    relatedSlugs: ["/nettoyage-moquette-toulouse", "/nettoyage-canape-toulouse", "/nettoyage-matelas-toulouse", "/nettoyage-cuir-toulouse", "/nettoyage-dappartement-ou-maison", "/nettoyage-fin-de-bail-toulouse"],
    intro: [
      "Clean&Fresh nettoie vos tapis de salon, descentes de lit et tapis d'entrée directement à domicile à Toulouse. Les formules couvrent 1, 2 ou 3 tapis jusqu'à 4 m² chacun, avec un diagnostic préalable de la fibre, des couleurs et de l'envers.",
      "Un tapis amovible se distingue d’une moquette fixée au sol : son envers, ses franges et le sol situé dessous doivent être examinés. Pour un tapis à poils longs, signalez l’épaisseur et les zones tassées. Les formules par quantité concernent des tapis standards ; un tapis ancien, fragile ou de grande valeur nécessite une évaluation avant toute réservation.",
      "Le nettoyage courant traite les poussières et les salissures du tapis. Le détachage intensif, le traitement anti-odeur ou anti-acariens et le nettoyage recto-verso sont proposés en option selon la compatibilité. Les grands formats et les fibres délicates demandent une estimation sur photos.",
      "L'injection-extraction est utilisée sur les tapis qui la supportent : une solution nettoyante est appliquée puis aspirée avec les salissures. La laine, la viscose, la soie ou un tapis artisanal exigent une attention particulière. Nous ne confirmons pas une méthode uniquement à partir de l'apparence du tapis.",
      "Pour les traces de café, de nourriture ou d'urine d'animaux, indiquez leur origine et les produits déjà utilisés. Une odeur présente dans l'envers ou le sol peut nécessiter un traitement complémentaire ; une décoloration ou une fibre usée ne disparaît pas avec le nettoyage.",
      "Dégagez le tapis avant notre arrivée et prévoyez un espace ventilé pour le séchage, dont la durée dépend de l'épaisseur et de la matière. Vous pouvez ajouter un canapé ou un matelas à votre réservation. Pour une moquette fixée au sol, choisissez la prestation dédiée au nettoyage de moquette."
    ],
    treated: [
      "Tapis synthétiques et fibres compatibles après diagnostic",
      "Tapis de salon, descentes de lit et tapis d'entrée",
      "Formats standards jusqu'à 4 m² par tapis",
      "Grands formats, laine et fibres délicates sur estimation"
    ],
    problems: [
      "Taches alimentaires et boissons",
      "Fibres tassées et ternies",
      "Acariens et poussière incrustée",
      "Odeurs d'animaux",
    ],
    prices: [
      { label: "1 tapis", price: "49 €", items: ["Nettoyage en profondeur par injection-extraction", "Fibres et couleurs ravivées", "Traitement courant des taches et auréoles", "Nettoyage courant des odeurs ; traitement intensif en option"], formuleId: "tapis-1" },
      { label: "2 tapis", price: "79 €", items: ["Nettoyage en profondeur par injection-extraction", "Fibres et couleurs ravivées", "Traitement courant des taches et auréoles", "Nettoyage courant des odeurs ; traitement intensif en option"], formuleId: "tapis-2" },
      { label: "3 tapis", price: "99 €", items: ["Nettoyage en profondeur par injection-extraction", "Fibres et couleurs ravivées", "Traitement courant des taches et auréoles", "Nettoyage courant des odeurs ; traitement intensif en option"], formuleId: "tapis-3" },
    ],
    priceNote: "Les formules couvrent respectivement 1, 2 ou 3 tapis, jusqu'à 4 m² chacun. Grand format, fibre délicate ou état exceptionnel : estimation préalable sur photos.",
    soils: ["Pipi d'animaux", "Café et vin", "Nourriture", "Boue et terre", "Tabac"],
    method: [
      "Identification de la fibre, vérification des couleurs et de l'envers, puis dépoussiérage.",
      "Traitement des taches et application des options retenues selon la matière.",
      "Injection-extraction ou méthode adaptée sur les supports compatibles.",
      "Extraction de l'humidité, finition et conseils pour un séchage complet."
    ],
    faq: [
      { q: "Nettoyez-vous les tapis à poils longs ?", a: "La faisabilité dépend de la fibre, de la densité et de l’envers. Un tapis épais retient davantage l’humidité et peut demander un séchage plus long. Une photo et l’étiquette permettent de vérifier si la formule standard convient." },
      { q: "Quelle prestation choisir pour une moquette fixée au sol ?", a: "Choisissez le nettoyage de moquette, tarifé selon la surface accessible. Les formules 1, 2 ou 3 tapis concernent des tapis amovibles jusqu’à 4 m² chacun ; elles ne correspondent pas au nettoyage d’une pièce entièrement moquettée." },
      {
        "q": "Combien coûte un nettoyage de tapis à Toulouse ?",
        "a": "La formule 1 tapis est à 49 €, 2 tapis à 79 € et 3 tapis à 99 €, jusqu'à 4 m² chacun. Les grands formats, les fibres délicates et les états exceptionnels nécessitent une estimation préalable. Les options sont en supplément."
      },
      {
        "q": "Pouvez-vous nettoyer un tapis en laine, en viscose ou en soie ?",
        "a": "Envoyez une photo du tapis et, si possible, de son étiquette. Nous vérifions la matière, les couleurs et l'envers. Certaines fibres ou finitions ne conviennent pas à l'injection-extraction ni au nettoyage à domicile."
      },
      {
        "q": "Le nettoyage des deux faces est-il inclus ?",
        "a": "Le nettoyage recto-verso est une option à 25 €, lorsque la matière et l'envers du tapis le permettent. Il est distinct de la formule courante et doit être sélectionné ou confirmé avant l'intervention."
      },
      {
        "q": "Comment traiter une odeur d'urine sur un tapis ?",
        "a": "Précisez la zone concernée et les produits déjà utilisés. Un traitement anti-odeur ou enzymatique peut compléter le nettoyage selon le diagnostic. Une contamination de l'envers ou du sol peut empêcher la disparition complète de l'odeur."
      },
      {
        "q": "Combien de temps dure le nettoyage et le séchage ?",
        "a": "Le temps d'intervention dépend du nombre, du format et de l'état des tapis. Le séchage demande généralement plusieurs heures et varie selon la fibre, l'épaisseur et l'aération. Attendez qu'il soit complet avant de replacer du mobilier."
      },
      {
        "q": "Faut-il vous déposer le tapis ?",
        "a": "Non, la prestation est réalisée à votre adresse à Toulouse ou dans l'agglomération. Dégagez le tapis, prévoyez un accès à l'eau et à l'électricité et signalez un sol fragile pour préparer l'installation."
      }
    ],
  },
  {
    slug: "/nettoyage-auto-a-domicile-toulouse",
    navLabel: "Nettoyage auto à domicile Toulouse",
    h1: "Nettoyage intérieur auto à domicile à Toulouse",
    short: "Nettoyage auto Toulouse",
    subtitle:
      "Nettoyage complet de l'habitacle de votre véhicule, chez vous ou sur votre lieu de travail, à Toulouse et son agglomération.",
    metaTitle: "Nettoyage intérieur voiture Toulouse dès 69 € | Clean&Fresh",
    metaDescription: "Nettoyage intérieur auto à domicile à Toulouse : Bronze 69 €, Argent 99 €, Or 129 €. Sièges, plastiques et moquettes selon le pack. Réservez en ligne.",
    group: "textile",
    booking: true,
    detailTitle: "Choisir le nettoyage intérieur de votre voiture",
    methodTitle: "Les étapes du nettoyage de l’habitacle",
    relatedSlugs: ["/nettoyage-cuir-toulouse", "/nettoyage-canape-toulouse", "/nettoyage-tapis-toulouse", "/nettoyage-matelas-toulouse", "/nettoyage-moquette-toulouse", "/nettoyage-dappartement-ou-maison"],
    intro: [
      "Clean&Fresh réalise le nettoyage intérieur de votre voiture à domicile ou sur votre lieu de travail à Toulouse. Le véhicule reste sur place, dans un espace où l'intervention est autorisée et où les portes peuvent être ouvertes facilement.",
      "Cette prestation concerne l’intérieur du véhicule, et non un passage en station de lavage extérieur. Pour préparer une vente, choisissez les zones à remettre au propre : sièges, plastiques, coffre, moquettes et tapis selon le pack. Signalez les poils incrustés et les odeurs avant le rendez-vous pour prévoir les options et le temps nécessaires.",
      "Comparez les trois packs : Bronze pour l'aspiration et les plastiques, Argent pour ajouter les sièges et les vitres, Or pour ajouter les moquettes, les tapis et les contours de portes et de coffre. Les options permettent de traiter les poils d'animaux, les taches tenaces, les odeurs ou le ciel de toit.",
      "Les sièges en tissu compatibles sont traités par injection-extraction. Le cuir bénéficie d'un nettoyage manuel adapté, avec un soin nourrissant proposé en option. La formule de nettoyage des sièges ne comprend pas de réparation des coutures, de recoloration ni de restauration des revêtements usés.",
      "Avant une vente, après des trajets avec des animaux ou pour entretenir l'habitacle, choisissez le pack selon les zones à nettoyer. Une odeur de tabac ou d'urine peut avoir plusieurs sources : le traitement complète le nettoyage des surfaces accessibles et son efficacité dépend de l'état des matériaux.",
      "Videz les objets personnels et prévoyez un accès à l'eau ainsi qu'une prise électrique à moins de 60 mètres. Signalez un SUV, un utilitaire ou un état particulièrement encrassé pour une estimation adaptée. Après un shampouinage, laissez les textiles sécher complètement avant utilisation."
    ],
    treated: [
      "Habitacle et coffre : aspiration selon le pack",
      "Sièges textiles ou cuir avec méthode adaptée",
      "Plastiques, tableau de bord et contre-portes",
      "Vitres, moquettes, tapis et contours selon la formule",
      "Véhicules particuliers ; SUV, utilitaires et flottes sur estimation"
    ],
    problems: [
      "Taches de nourriture et boissons",
      "Odeurs de tabac et d'animaux",
      "Poils d'animaux incrustés",
      "Poussière et sable dans les moquettes",
    ],
    prices: [
      { label: "🥉 Pack Bronze", price: "69 €", items: ["Aspiration complète de l'habitacle", "Aspiration complète du coffre", "Nettoyage et dégraissage de tous les plastiques", "Plastiques du coffre compris"], formuleId: "bronze" },
      { label: "🥈 Pack Argent", price: "99 €", items: ["Tout le Pack Bronze inclus", "Shampouinage de tous les sièges du véhicule", "Méthode adaptée au revêtement", "Nettoyage des vitres sans traces"], formuleId: "argent" },
      { label: "🥇 Pack Or", price: "129 €", items: ["Tout le Pack Argent inclus", "Shampouinage de toute la moquette de l'habitacle et du coffre", "Shampouinage des tapis", "Contours et bas de portes et contour de coffre"], formuleId: "or" },
      { label: "Rénovation sièges auto", price: "59 €", items: ["Shampouinage de tous les sièges", "Méthode et produits adaptés au revêtement", "Tissu, Alcantara, cuir, velours et matières compatibles", "Traitement courant des taches et auréoles"], formuleId: "siege" },
    ],
    priceNote: "Tarifs applicables aux véhicules particuliers en état standard. SUV, utilitaire, volume important ou état exceptionnel : estimation préalable sur photos.",
    soils: ["Nourriture et boissons", "Tabac", "Poils d'animaux", "Transpiration", "Boue"],
    method: [
      "Vérification du véhicule, du revêtement et des zones comprises dans le pack choisi.",
      "Aspiration de l'habitacle et du coffre, puis nettoyage des plastiques selon la formule.",
      "Nettoyage des sièges, vitres, moquettes et tapis prévus au récapitulatif ; options selon le besoin.",
      "Contrôle avec vous et conseils de séchage pour les textiles nettoyés."
    ],
    faq: [
      { q: "Le lavage extérieur de la voiture est-il compris ?", a: "Les packs présentés ici concernent le nettoyage intérieur. Ils ne comprennent pas un lavage de carrosserie, un polissage ou une rénovation de peinture. Le récapitulatif décrit les zones de l’habitacle prises en charge." },
      { q: "Quelle formule choisir avant de vendre ma voiture ?", a: "Argent convient si vous souhaitez ajouter les sièges et les vitres à l’aspiration et aux plastiques. Or comprend aussi les moquettes, tapis et contours prévus dans la formule. Les poils ou odeurs persistantes peuvent nécessiter une option ; le choix dépend de l’état du véhicule." },
      {
        "q": "Que comprend le Pack Bronze à 69 € ?",
        "a": "Il comprend l'aspiration complète de l'habitacle et du coffre ainsi que le nettoyage et le dégraissage des plastiques, coffre compris. Le nettoyage des sièges et des vitres ne fait pas partie de ce pack de base."
      },
      {
        "q": "Quelle différence entre les Packs Argent et Or ?",
        "a": "Le Pack Argent à 99 € ajoute au Bronze le nettoyage de tous les sièges avec une méthode adaptée et les vitres. Le Pack Or à 129 € ajoute les moquettes de l'habitacle et du coffre, les tapis, les contours et bas de portes et le contour de coffre."
      },
      {
        "q": "Nettoyez-vous les sièges en cuir ou en Alcantara ?",
        "a": "La méthode dépend du revêtement et de son état. Le cuir est nettoyé manuellement ; les textiles et l'Alcantara sont traités après vérification de leur compatibilité. Le soin nourrissant du cuir est une option distincte."
      },
      {
        "q": "Que faut-il prévoir pour un nettoyage auto à domicile ?",
        "a": "Un stationnement autorisé avec assez de place autour du véhicule, un accès à l'eau et une prise électrique à moins de 60 mètres. Retirez les objets personnels et signalez toute difficulté d'accès avant l'intervention."
      },
      {
        "q": "Le traitement anti-odeur enlève-t-il toujours le tabac ou les odeurs d'animaux ?",
        "a": "Il aide à réduire les odeurs présentes sur les surfaces traitées. Le résultat dépend de leur origine et de leur profondeur : une source non accessible ou un matériau fortement imprégné peut conserver une odeur. Le traitement adapté est confirmé selon le diagnostic."
      },
      {
        "q": "Combien de temps dure le nettoyage de la voiture ?",
        "a": "Les durées indicatives sont de 1 h pour Bronze, 1 h 30 pour Argent et 2 h pour Or, hors besoins particuliers. Si des textiles sont shampouinés, prévoyez ensuite leur séchage complet ; le délai varie avec la matière et la ventilation."
      },
      {
        "q": "Les utilitaires et les flottes peuvent-ils être nettoyés ?",
        "a": "Oui, sur estimation selon le volume, l'état et le nombre de véhicules. Envoyez des photos et les informations utiles pour recevoir un devis et organiser les passages."
      }
    ],
  },
  {
    slug: "/nettoyage-de-vitres-toulouse",
    navLabel: "Nettoyage de vitres Toulouse",
    h1: "Nettoyage de vitres à Toulouse",
    short: "Nettoyage vitres Toulouse",
    subtitle: "Nettoyage de fenêtres, baies vitrées et vitrines à Toulouse. Faces accessibles, encadrements et rails selon le devis.",
    metaTitle: "Nettoyage vitres et vitrines Toulouse | Clean&Fresh",
    metaDescription: "Lavage de fenêtres, baies vitrées et vitrines à Toulouse. Faces accessibles, rails et encadrements selon devis. Passage ponctuel ou entretien régulier.",
    group: "batiment",
    detailTitle: "Fenêtres, baies vitrées et vitrines",
    methodTitle: "Notre méthode de lavage des vitres",
    relatedSlugs: ["/nettoyage-dappartement-ou-maison", "/nettoyage-fin-de-bail-toulouse", "/nettoyage-de-fin-de-chantier-toulouse", "/nettoyage-facade-toulouse", "/nettoyage-terrasse-toulouse", "/nettoyage-moquette-toulouse"],
    intro: [
      "Clean&Fresh réalise le nettoyage de vitres à Toulouse pour les appartements, maisons, commerces et bureaux. Fenêtres, baies vitrées et vitrines sont nettoyées avec du matériel professionnel adapté à leur état et à leur accessibilité.",
      "Pour une vitrine de commerce, un passage régulier peut limiter l’accumulation de traces et s’organiser selon les horaires d’ouverture. Dans un logement, précisez si vous souhaitez seulement les vitrages ou aussi les rails et encadrements. Les doubles vitrages présentant des traces entre les deux parois ne peuvent pas être nettoyés à cet endroit par un lavage de surface.",
      "Le devis précise les faces à traiter ainsi que les encadrements, rails et rebords inclus. Pour une petite demande, quelques photos d'ensemble et l'adresse suffisent pour commencer l'estimation ; nous vous indiquons si une précision supplémentaire est nécessaire.",
      "Traces de doigts, poussières et dépôts courants sont traités par lavage et essuyage adaptés au vitrage. Les traces de calcaire anciennes, résidus d'adhésif ou salissures de fin de travaux demandent un diagnostic, car un verre rayé ou altéré ne se répare pas par un nettoyage.",
      "Une intervention ponctuelle peut préparer un état des lieux ou remettre une vitrine au propre. Pour un entretien régulier, la fréquence et les horaires sont définis selon votre activité. Les accès et la hauteur sont vérifiés avant confirmation ; les travaux à plus de 3 mètres ne sont pas proposés.",
      "Nous intervenons à Toulouse et dans les communes voisines, notamment Blagnac, Colomiers, Balma et Ramonville. Dégagez l'accès aux fenêtres et signalez les vitrages difficiles à atteindre lors de votre demande de devis."
    ],
    treated: [
      "Fenêtres, baies vitrées et vérandas",
      "Vitrines de commerces et devantures",
      "Cloisons et vitrages de bureaux",
      "Encadrements, rails et rebords",
    ],
    problems: [
      "Traces de pluie et calcaire",
      "Pollution et poussière urbaine",
      "Traces de doigts sur les vitrines",
      "Résidus de travaux",
    ],
    priceNote: "Sur devis selon les vitrages, les faces à nettoyer, l'accès et la fréquence. Périmètre confirmé avant intervention.",
    method: [
      "Repérage des vitrages, de la hauteur et des faces accessibles.",
      "Lavage avec du matériel adapté à la nature et à l'état du verre.",
      "Traitement des encadrements, rails et rebords prévus au devis.",
      "Essuyage des finitions et contrôle des traces résiduelles."
    ],
    faq: [
      { q: "Nettoyez-vous les baies vitrées d’un appartement occupé ?", a: "Oui, si les faces concernées sont accessibles. Dégagez les abords et signalez les meubles, stores ou objets fragiles. Quelques photos d’ensemble permettent de préciser le périmètre sans demander systématiquement les dimensions de chaque fenêtre." },
      { q: "Les traces entre les deux parois d’un double vitrage peuvent-elles partir ?", a: "Non, un lavage traite les faces accessibles du vitrage. Une buée ou des marques situées à l’intérieur du double vitrage relèvent d’un problème distinct à faire examiner par un professionnel de la menuiserie ou du vitrage." },
      {
        "q": "Quel est le tarif d'un nettoyage de vitres à Toulouse ?",
        "a": "Le devis dépend des vitrages, du nombre de faces à nettoyer, de l'accès et de l'état initial. Envoyez quelques photos et l'adresse pour une première estimation gratuite sous 24 h."
      },
      {
        "q": "Les rails et encadrements sont-ils compris ?",
        "a": "Ils peuvent être inclus avec les rebords et menuiseries. Le devis détaille le périmètre pour distinguer un lavage des vitres seules d'un nettoyage complet des fenêtres."
      },
      {
        "q": "Nettoyez-vous les faces intérieures et extérieures ?",
        "a": "Oui lorsque les deux faces sont accessibles dans de bonnes conditions. Précisez les accès particuliers et la hauteur ; les travaux à plus de 3 mètres ne sont pas proposés."
      },
      {
        "q": "Peut-on enlever des traces de calcaire ou de peinture ?",
        "a": "Un traitement adapté peut être étudié après examen. Certaines marques sont liées à une altération ou à des rayures du verre ; elles ne disparaissent pas avec un lavage. Les résidus de chantier sont à signaler avant l'estimation."
      },
      {
        "q": "Peut-on prévoir un passage régulier pour une vitrine ?",
        "a": "Oui, nous pouvons établir un devis pour un passage ponctuel ou régulier à Toulouse et dans l'agglomération, avec des horaires convenus selon l'ouverture du commerce."
      }
    ],
  },
  {
    slug: "/nettoyage-terrasse-toulouse",
    navLabel: "Nettoyage terrasse Toulouse",
    h1: "Nettoyage de terrasse à Toulouse",
    short: "Nettoyage terrasse Toulouse",
    subtitle: "Nettoyage de terrasses, dalles et sols extérieurs à Toulouse. Pression et méthode choisies selon le revêtement.",
    metaTitle: "Nettoyage terrasse et dalles Toulouse | Clean&Fresh",
    metaDescription: "Nettoyage de terrasse, dalles et allées à Toulouse. Bois, carrelage ou béton : méthode adaptée au support et à ses joints. Devis gratuit sur photos.",
    group: "batiment",
    detailTitle: "Un nettoyage adapté à votre sol extérieur",
    methodTitle: "Préparation et nettoyage de la terrasse",
    relatedSlugs: ["/nettoyage-facade-toulouse", "/nettoyage-toiture-toulouse", "/nettoyage-de-vitres-toulouse", "/nettoyage-dappartement-ou-maison", "/nettoyage-de-fin-de-chantier-toulouse", "/nettoyage-fin-de-bail-toulouse"],
    intro: [
      "Redonnez un aspect propre à votre terrasse, votre cour ou vos allées avec un nettoyage adapté au revêtement. Clean&Fresh intervient à Toulouse pour retirer les salissures, traces de végétaux et dépôts présents sur les sols extérieurs compatibles.",
      "Une terrasse ombragée peut accumuler des dépôts verts, tandis qu’une allée très passante retient davantage la terre et les traces d’usage. La surface visible ne suffit donc pas à fixer le tarif : les joints, la pente et l’écoulement des eaux comptent aussi. Le résultat et l’entretien à prévoir sont expliqués selon le matériau, sans promettre une protection permanente contre les mousses.",
      "Le devis tient compte de la surface, de l'état des joints, de l'accès à l'eau et de l'évacuation des eaux de lavage. Dalles, béton, carrelage, bois ou composite ne se nettoient pas tous avec la même pression ni les mêmes produits.",
      "Avant l'intervention, nous vérifions le support et choisissons une méthode appropriée. Une pression excessive peut marquer le bois, fragiliser les joints ou altérer une surface : le nettoyage haute pression n'est donc pas systématique.",
      "Un traitement complémentaire anti-mousse ou hydrofuge peut être étudié selon le matériau et sera précisé dans le devis. Sa durée d'action dépend de l'exposition, de l'humidité et de l'entretien ; le nettoyage ne répare pas les dalles fissurées ni les joints abîmés.",
      "Envoyez des photos d'ensemble et des zones les plus marquées pour une estimation à Toulouse, Muret, Cugnaux, Tournefeuille ou alentours. Dégagez le mobilier et signalez les plantations, prises ou équipements à protéger."
    ],
    treated: [
      "Dalles et pavés",
      "Béton et béton désactivé",
      "Carrelage extérieur et grès cérame",
      "Terrasses bois et composite",
      "Allées, cours et abords de piscine",
    ],
    problems: [
      "Mousses, lichens et algues vertes",
      "Noircissement et sol glissant",
      "Traces de terre et de végétaux",
      "Salissures incrustées dans les joints",
    ],
    priceNote: "Sur devis selon la surface et l'état du support — réponse gratuite sous 24h.",
    method: [
      "Diagnostic du revêtement, des joints, des accès et de l'évacuation des eaux.",
      "Protection des abords et préparation des zones à nettoyer.",
      "Nettoyage avec une méthode et une pression adaptées au support.",
      "Rinçage ou finition selon la méthode, puis contrôle du résultat."
    ],
    faq: [
      { q: "Peut-on nettoyer une terrasse en bois sans l’abîmer ?", a: "La méthode dépend de l’essence, de la finition et de l’état des lames. Une haute pression mal adaptée peut marquer le bois : le support est examiné avant de confirmer la prestation. Le nettoyage ne remplace pas un ponçage ou une remise en état des lames." },
      { q: "Que faut-il préciser pour le nettoyage d’une allée ou d’une cour ?", a: "Indiquez la surface approximative, le matériau, les accès, la présence d’un point d’eau et l’endroit où les eaux de lavage peuvent s’écouler. Ajoutez une vue d’ensemble et une photo des zones les plus encrassées." },
      {
        "q": "Combien coûte le nettoyage d'une terrasse à Toulouse ?",
        "a": "Le tarif est établi sur devis selon la surface, le matériau, l'état, l'accès et les traitements éventuels. Des photos d'ensemble permettent de préparer une estimation gratuite sous 24 h."
      },
      {
        "q": "Utilisez-vous toujours un nettoyeur haute pression ?",
        "a": "Non. La pression et la méthode sont choisies après diagnostic. Le bois, les joints fragiles, certains carrelages et les surfaces dégradées nécessitent des précautions particulières ou une autre méthode."
      },
      {
        "q": "Le traitement anti-mousse est-il compris ?",
        "a": "Il est inclus uniquement lorsqu'il figure au devis. Son choix dépend du revêtement et des dépôts observés ; les conditions d'application et d'entretien sont précisées avant intervention."
      },
      {
        "q": "Le nettoyage répare-t-il les joints ou le bois grisé ?",
        "a": "Le nettoyage retire les salissures compatibles avec la méthode retenue. Il ne refait pas les joints, ne répare pas les fissures et ne constitue pas une rénovation du bois. Les éventuelles limites sont expliquées après examen."
      },
      {
        "q": "Comment préparer la terrasse avant votre venue ?",
        "a": "Retirez le mobilier et les objets, rendez l'accès à l'eau disponible et indiquez les surfaces ou équipements fragiles. La possibilité d'évacuer les eaux de lavage est vérifiée avant confirmation."
      }
    ],
  },
  {
    slug: "/nettoyage-toiture-toulouse",
    navLabel: "Nettoyage toiture Toulouse",
    h1: "Nettoyage de toiture à Toulouse",
    short: "Nettoyage toiture Toulouse",
    subtitle: "Nettoyage et démoussage de couvertures accessibles jusqu'à 3 mètres à Toulouse, après vérification du support et des accès.",
    metaTitle: "Nettoyage toiture Toulouse jusqu’à 3 m | Clean&Fresh",
    metaDescription: "Nettoyage et démoussage de petites toitures à Toulouse, jusqu’à 3 m. Garages et dépendances : accès et matériau vérifiés avant devis sur photos.",
    group: "batiment",
    detailTitle: "Petites toitures et couvertures accessibles",
    methodTitle: "Les étapes de l’entretien de couverture",
    relatedSlugs: ["/nettoyage-facade-toulouse", "/nettoyage-terrasse-toulouse", "/nettoyage-de-vitres-toulouse", "/nettoyage-de-fin-de-chantier-toulouse", "/nettoyage-dappartement-ou-maison", "/nettoyage-fin-de-bail-toulouse"],
    intro: [
      "Clean&Fresh propose le nettoyage de petites couvertures et toitures accessibles à Toulouse, dans la limite de 3 mètres de hauteur. Garages et dépendances peuvent être étudiés sur photos, selon la pente, l'accès et l'état du matériau.",
      "La hauteur et les conditions d’accès sont vérifiées avant de proposer un démoussage. Une couverture de garage ou d’abri ne relève pas automatiquement d’une intervention possible : la pente, la fragilité du matériau et les abords doivent aussi convenir. Pour une toiture de maison hors de notre limite de hauteur, adressez-vous à un professionnel équipé pour ces travaux.",
      "Le diagnostic détermine si le nettoyage peut être réalisé et avec quelle méthode. La haute pression n'est pas systématique. Les surfaces fragiles ou dégradées et les interventions au-delà de 3 mètres ne sont pas prises en charge.",
      "Le devis précise les zones à traiter, le retrait des dépôts et tout éventuel traitement anti-mousse. La présence de végétation, les gouttières et les écoulements sont examinés pour préparer l'intervention et protéger les abords.",
      "Le nettoyage porte sur les salissures et les dépôts accessibles ; il ne remplace pas une réparation de couverture, une recherche de fuite ou des travaux d'étanchéité. Une tuile cassée ou un défaut repéré doit être traité par le professionnel compétent.",
      "Pour une demande à Toulouse ou dans l'agglomération, envoyez une vue d'ensemble, des photos des dépôts et une indication de hauteur et d'accès. Nous confirmons la faisabilité avant d'établir le devis et le créneau."
    ],
    treated: [
      "Couvertures accessibles jusqu'à 3 mètres",
      "Toitures de garages et dépendances compatibles",
      "Tuiles ou autres matériaux après diagnostic",
      "Gouttières accessibles, si prévues au devis"
    ],
    problems: [
      "Mousses et dépôts végétaux accessibles",
      "Salissures et noircissement de surface",
      "Feuilles et débris dans les zones convenues",
      "Besoin d'entretien d'une petite couverture"
    ],
    priceNote: "Sur devis après contrôle de la hauteur, des accès et du support. Interventions limitées à 3 mètres maximum.",
    method: [
      "Vérification de la hauteur (3 m maximum), des accès et de l'état de la couverture.",
      "Protection des abords et choix d'une méthode compatible.",
      "Retrait des dépôts et nettoyage des zones prévues au devis.",
      "Traitement éventuel et finition selon le produit et le périmètre retenus."
    ],
    faq: [
      { q: "Peut-on nettoyer la toiture d’un garage ou d’un abri ?", a: "La demande est étudiée si la couverture est accessible et ne dépasse pas 3 mètres de hauteur. Envoyez des vues de la toiture et de ses abords. La compatibilité du matériau, son état et les conditions d’accès déterminent la faisabilité." },
      { q: "Que faire si la couverture semble fragile ou endommagée ?", a: "Signalez-le dès la demande et évitez de monter dessus. Un nettoyage ne corrige pas un défaut de couverture ; une réparation ou une expertise du matériau peut être nécessaire avant toute intervention. Le devis n’est établi qu’après vérification du périmètre réalisable." },
      {
        "q": "Quelles toitures pouvez-vous nettoyer à Toulouse ?",
        "a": "Nous étudions les petites couvertures accessibles, notamment de garages et dépendances, jusqu'à 3 mètres de hauteur. La prise en charge dépend de la pente, de l'accès et de l'état du matériau. Les travaux au-delà de 3 mètres sont exclus."
      },
      {
        "q": "Quel est le tarif du démoussage ?",
        "a": "Le prix dépend de la surface, de l'accès, de l'état et de la méthode retenue. Envoyez des photos et une indication de hauteur pour une estimation gratuite sous 24 h, après vérification de la faisabilité."
      },
      {
        "q": "Le nettoyage haute pression est-il systématique ?",
        "a": "Non. Une pression inadaptée peut détériorer une couverture. Nous choisissons la méthode après examen et écartons une intervention si le support ou les accès ne permettent pas de travailler dans de bonnes conditions."
      },
      {
        "q": "Le traitement anti-mousse est-il inclus ?",
        "a": "Son éventuelle inclusion et ses conditions d'application sont indiquées au devis. Sa durée d'action dépend du produit, du matériau et de l'exposition ; aucun délai uniforme n'est promis."
      },
      {
        "q": "Le nettoyage résout-il une infiltration ?",
        "a": "Non, la prestation ne comprend pas de réparation de toiture ni de travaux d'étanchéité. Une fuite, une tuile cassée ou un défaut de couverture nécessitent une évaluation par un professionnel de la couverture."
      }
    ],
  },
  {
    slug: "/nettoyage-facade-toulouse",
    navLabel: "Nettoyage façade Toulouse",
    h1: "Nettoyage de façade à Toulouse",
    short: "Nettoyage façade Toulouse",
    subtitle: "Nettoyage de façades basses, murs de clôture et piliers à Toulouse, jusqu'à 3 mètres de hauteur et sur supports compatibles.",
    metaTitle: "Nettoyage façade et murs Toulouse jusqu’à 3 m | Clean&Fresh",
    metaDescription: "Nettoyage de façades basses, crépis et murs de clôture à Toulouse jusqu’à 3 m. Test du support, méthode adaptée et devis gratuit sur photos.",
    group: "batiment",
    detailTitle: "Façades basses, crépis et murs de clôture",
    methodTitle: "Notre méthode pour les murs extérieurs",
    relatedSlugs: ["/nettoyage-terrasse-toulouse", "/nettoyage-toiture-toulouse", "/nettoyage-de-vitres-toulouse", "/nettoyage-de-fin-de-chantier-toulouse", "/nettoyage-dappartement-ou-maison", "/nettoyage-fin-de-bail-toulouse"],
    intro: [
      "Clean&Fresh nettoie les façades basses, murs de clôture et piliers à Toulouse, jusqu'à 3 mètres de hauteur. Le traitement vise les salissures, coulures et dépôts présents sur les supports compatibles, après examen de leur état.",
      "Pour nettoyer un mur de clôture ou le bas d’une façade, nous distinguons les dépôts de surface des dégradations de l’enduit. Les traces sombres ou vertes ne demandent pas toutes le même traitement. Précisez les zones proches de fenêtres, portails et plantations afin d’organiser les protections et de chiffrer uniquement les surfaces accessibles.",
      "Crépi, enduit, brique, pierre et béton demandent des méthodes différentes. Un test sur une zone discrète permet de vérifier la réaction du matériau ; la pression et les produits sont ensuite adaptés. Les travaux à plus de 3 mètres ne sont pas proposés.",
      "Les menuiseries, plantations et abords sont pris en compte dans la préparation du chantier. Le devis indique les zones accessibles, le nettoyage retenu et tout traitement complémentaire éventuel, selon la nature des dépôts et l'exposition du mur.",
      "La prestation ne constitue pas un ravalement : elle ne répare pas les fissures, les enduits qui se décollent ou les défauts de peinture. Certaines traces anciennes ou décolorations peuvent rester visibles après retrait des salissures.",
      "Envoyez des photos d'ensemble et des détails des zones à nettoyer, avec une indication de hauteur, pour votre maison, votre mur de clôture ou les parties basses d'une copropriété à Toulouse et alentours. La faisabilité et le périmètre sont confirmés avant intervention."
    ],
    treated: [
      "Façades et murs accessibles jusqu'à 3 mètres",
      "Crépi et enduit en état compatible",
      "Brique, pierre et béton après test",
      "Murs de clôture, piliers et parties basses de bâtiments"
    ],
    problems: [
      "Traces noires et salissures de surface",
      "Mousses et dépôts végétaux",
      "Coulures et traces de pluie",
      "Encrassement de murs de clôture et piliers"
    ],
    priceNote: "Sur devis selon la surface, l'accès et le support. Hauteur d'intervention limitée à 3 mètres maximum.",
    method: [
      "Contrôle du support, des accès et de la hauteur, puis test sur une zone discrète.",
      "Protection des menuiseries, plantations et abords concernés.",
      "Nettoyage avec méthode et pression adaptées aux surfaces prévues au devis.",
      "Finition, traitement complémentaire éventuel et contrôle du résultat."
    ],
    faq: [
      { q: "Nettoyez-vous les murs de clôture et les piliers de portail ?", a: "Oui, dans la limite de 3 mètres et après vérification du matériau et des accès. Précisez les deux faces éventuelles du mur, les éléments à protéger et les salissures visibles. Le devis décrit les surfaces retenues." },
      { q: "Peut-on retirer des traces noires sur un crépi ?", a: "Un nettoyage peut traiter les dépôts de surface si le crépi est compatible et en bon état. Un test permet d’adapter la méthode. Une coloration ancienne, une infiltration ou un enduit dégradé peuvent laisser des traces et demander des travaux distincts." },
      {
        "q": "Combien coûte un nettoyage de façade à Toulouse ?",
        "a": "Le tarif dépend de la surface, du matériau, de l'état et de l'accessibilité. Envoyez des photos et une indication de hauteur pour une estimation gratuite. Les interventions sont limitées à 3 mètres maximum."
      },
      {
        "q": "Nettoyez-vous les façades d'immeubles ?",
        "a": "Nous pouvons étudier les parties basses accessibles, jusqu'à 3 mètres, ainsi que les murs de clôture et piliers. Le nettoyage en hauteur au-delà de cette limite n'est pas proposé."
      },
      {
        "q": "La haute pression convient-elle à tous les enduits ?",
        "a": "Non. Un test et un examen du support sont nécessaires. La pression, le produit et la méthode sont adaptés à l'état de l'enduit, de la brique ou de la pierre ; un support trop fragile peut ne pas être nettoyable."
      },
      {
        "q": "Le nettoyage remplace-t-il un ravalement ?",
        "a": "Non. Il traite les salissures compatibles avec la méthode choisie, mais ne répare pas les fissures, l'enduit décollé ou les peintures abîmées. Les décolorations anciennes peuvent rester visibles."
      },
      {
        "q": "Le traitement anti-mousse ou hydrofuge est-il compris ?",
        "a": "Un traitement complémentaire est étudié selon le support et figure au devis lorsqu'il est retenu. Son effet et sa durée dépendent du produit, de l'exposition et de l'entretien."
      }
    ],
  },
  {
    slug: "/nettoyage-dappartement-ou-maison",
    navLabel: "Nettoyage d'appartement ou maison Toulouse",
    h1: "Nettoyage d'appartement ou de maison à Toulouse",
    short: "Nettoyage Appartement / maison Toulouse",
    subtitle:
      "Grand ménage ponctuel ou entretien régulier de votre logement, à Toulouse et dans toute l'agglomération.",
    metaTitle: "Grand nettoyage appartement et maison Toulouse | Clean&Fresh",
    metaDescription: "Grand ménage et nettoyage d’appartement ou maison à Toulouse. Cuisine, sanitaires, sols et vitres selon devis. Photos, surface et date pour un chiffrage précis.",
    group: "batiment",
    detailTitle: "Un grand ménage défini pièce par pièce",
    methodTitle: "Notre organisation du nettoyage de logement",
    relatedSlugs: ["/nettoyage-fin-de-bail-toulouse", "/nettoyage-de-fin-de-chantier-toulouse", "/nettoyage-de-vitres-toulouse", "/nettoyage-canape-toulouse", "/nettoyage-matelas-toulouse", "/nettoyage-extreme-toulouse"],
    intro: [
      "Grand ménage ponctuel, entrée dans un logement ou entretien régulier : Clean&Fresh nettoie les appartements et maisons à Toulouse selon un périmètre défini avec vous. La surface, l'état des pièces et vos priorités permettent de préparer une prestation adaptée.",
      "Un grand nettoyage ponctuel vise les zones que l’entretien habituel ne suffit plus à remettre au propre : graisses de cuisine, calcaire des sanitaires ou poussières accumulées. Il se distingue d’un ménage régulier, d’un nettoyage après travaux et d’une remise en état avant un état des lieux. Préciser votre objectif permet de prévoir les tâches utiles et le temps nécessaire.",
      "Le devis détaille les zones à nettoyer : sols, surfaces accessibles, cuisine, salle de bain, WC, vitres et intérieur des placards selon le besoin. Les équipements à dégraisser ou détartrer sont précisés pour connaître exactement les prestations comprises.",
      "Le nettoyage de murs et plafonds est proposé uniquement en option après vérification de la compatibilité du revêtement. Canapés, matelas, tapis et moquettes nécessitent une prestation textile distincte, que vous pouvez ajouter à votre demande.",
      "Un logement peut rester meublé si les zones à traiter sont accessibles. Pour une remise en état plus complète, retirez les objets fragiles et videz les placards ou appareils dont vous souhaitez faire nettoyer l'intérieur. L'accès à l'eau et à l'électricité doit être maintenu.",
      "Nous établissons des devis à Toulouse et dans les communes voisines pour les particuliers comme pour des bureaux et locaux professionnels compatibles. Indiquez l'adresse, la surface approximative, la date souhaitée et joignez quelques photos pour recevoir une proposition claire."
    ],
    treated: [
      "Cuisine : surfaces, évier, placards et appareils prévus au devis",
      "Salle de bain et WC : nettoyage et détartrage adaptés",
      "Sols, plinthes, portes et interrupteurs accessibles",
      "Vitres et menuiseries selon le périmètre retenu",
      "Bureaux et locaux professionnels compatibles sur devis"
    ],
    problems: [
      "Calcaire et graisses accumulées",
      "Poussière et allergènes",
      "Logement laissé sale par un locataire",
      "Manque de temps pour l'entretien régulier",
    ],
    priceNote: "Sur devis selon la surface et le niveau de prestation — ponctuel ou récurrent.",
    method: [
      "Visite ou échange détaillé pour cadrer le périmètre.",
      "Nettoyage pièce par pièce, du haut vers le bas.",
      "Détartrage et dégraissage des points sensibles.",
      "Contrôle qualité final avec vous.",
    ],
    faq: [
      { q: "Quelle différence entre un grand ménage et une fin de bail ?", a: "Le grand ménage répond aux besoins d’un logement occupé ou à préparer avant une installation. La fin de bail s’organise autour de l’état des lieux et du départ de l’occupant. Dans les deux cas, le devis définit les surfaces et équipements réellement inclus." },
      { q: "Peut-on adapter le nettoyage à des priorités et à un budget ?", a: "Oui, précisez les pièces et les tâches prioritaires, par exemple la cuisine et la salle de bain. Nous pouvons établir un périmètre adapté plutôt qu’annoncer un nettoyage intégral impossible à réaliser dans le budget disponible." },
      {
        "q": "Quel est le prix d'un nettoyage d'appartement à Toulouse ?",
        "a": "Le tarif dépend de la surface, de l'état et des prestations souhaitées. Un grand ménage ponctuel et un entretien régulier n'ont pas le même périmètre. Envoyez quelques photos pour un devis gratuit sous 24 h."
      },
      {
        "q": "Les murs, plafonds et textiles sont-ils inclus ?",
        "a": "Les murs et plafonds sont exclus du nettoyage standard ; une option peut être étudiée après contrôle de compatibilité. Canapés, matelas, tapis et moquettes font l'objet de prestations distinctes à préciser dans la demande."
      },
      {
        "q": "Faut-il vider le logement avant le nettoyage ?",
        "a": "Pas nécessairement. Dégagez les surfaces et les sols à traiter, retirez les objets fragiles et videz les placards ou appareils si leur intérieur doit être nettoyé. Les meubles lourds ne sont pas déplacés sans accord préalable."
      },
      {
        "q": "Intervenez-vous avant une entrée ou après un déménagement ?",
        "a": "Oui. Nous pouvons préparer un logement avant votre installation ou nettoyer après le départ d'un occupant. Pour un état des lieux de sortie, précisez la date et les priorités afin d'établir le devis fin de bail adapté."
      },
      {
        "q": "Proposez-vous un ménage régulier ?",
        "a": "Un entretien régulier peut être étudié selon l'adresse, la fréquence, les tâches et les disponibilités. Le devis précise la durée et le contenu de chaque passage."
      },
      {
        "q": "Comment confirmer un créneau pour un nettoyage sur devis ?",
        "a": "Après accord sur le devis et l'horaire, l'acompte demandé permet de bloquer définitivement le créneau. Le solde est réglé en fin de prestation selon les conditions indiquées sur le devis."
      }
    ],
  },
  {
    slug: "/nettoyage-de-fin-de-chantier-toulouse",
    navLabel: "Nettoyage de fin de chantier Toulouse",
    h1: "Nettoyage de fin de chantier à Toulouse",
    short: "Nettoyage Fin de chantier Toulouse",
    subtitle: "Nettoyage après travaux à Toulouse : poussières, sols, vitres et surfaces accessibles, avec un périmètre précisé sur devis.",
    metaTitle: "Nettoyage après travaux Toulouse | Fin de chantier",
    metaDescription: "Nettoyage de fin de chantier à Toulouse après rénovation : poussières, sols, vitres et résidus compatibles. Devis détaillé pour particuliers et professionnels.",
    group: "batiment",
    detailTitle: "La remise au propre après vos travaux",
    methodTitle: "Les étapes du nettoyage de fin de chantier",
    relatedSlugs: ["/nettoyage-de-vitres-toulouse", "/nettoyage-dappartement-ou-maison", "/nettoyage-fin-de-bail-toulouse", "/nettoyage-moquette-toulouse", "/nettoyage-terrasse-toulouse", "/nettoyage-facade-toulouse"],
    intro: [
      "Après une rénovation, Clean&Fresh réalise le nettoyage de fin de chantier à Toulouse pour préparer les pièces à leur utilisation. Nous traitons les poussières de travaux, sols, vitres et surfaces accessibles selon le périmètre retenu au devis.",
      "Un nettoyage après travaux ne se limite pas au lavage des sols : la poussière peut se redéposer depuis les rebords, les plinthes et les surfaces hautes accessibles prévues au devis. Nous préparons l’ordre de passage selon les matériaux et les travaux effectués. Mentionnez les consignes des artisans concernant les peintures, les joints et les sols récemment posés.",
      "Cuisine, salle de bain, placards, plinthes, radiateurs et rails de fenêtres sont repérés avec vous. Les résidus de colle, peinture ou enduit font l'objet d'un diagnostic pour choisir une méthode compatible avec le revêtement neuf.",
      "Le nettoyage est organisé après le départ des artisans afin de limiter les nouveaux dépôts de poussière. Les gravats, déchets lourds et travaux inachevés ne relèvent pas d'un nettoyage courant : leur prise en charge éventuelle doit être précisée séparément.",
      "Un test est réalisé avant de traiter une trace adhérente. Le nettoyage ne corrige pas une rayure, un défaut de pose ou un dommage sur le sol ou le vitrage. Murs et plafonds ne sont traités que si une option compatible a été convenue au devis.",
      "Pour estimer l'intervention à Toulouse et alentours, transmettez la surface, la nature des travaux, des photos et la date de livraison souhaitée. Nous confirmons les disponibilités et les besoins d'accès à l'eau et à l'électricité avant de fixer le créneau."
    ],
    treated: [
      "Sols : carrelage, parquet, béton ciré",
      "Vitres, menuiseries et garde-corps",
      "Sanitaires et cuisine neufs",
      "Placards, plinthes et radiateurs",
      "Parties communes et locaux professionnels",
    ],
    problems: [
      "Poussière de plâtre et de ponçage",
      "Traces de peinture et d'enduit",
      "Résidus de colle et d'adhésif",
      "Étiquettes et films de protection",
    ],
    priceNote: "Sur devis selon la surface, les résidus à traiter et les accès. Date d'intervention confirmée selon les disponibilités.",
    method: [
      "Repérage des surfaces, des résidus et du périmètre après la fin des travaux.",
      "Aspiration et dépoussiérage des zones accessibles, du haut vers le bas.",
      "Traitement compatible des sols et des traces prévues au devis, après test.",
      "Nettoyage des vitres et finitions, puis contrôle avec vous avant restitution."
    ],
    faq: [
      { q: "Quand prévoir le nettoyage après une rénovation ?", a: "Lorsque les travaux salissants sont terminés et les pièces libérées. Vérifiez avec les artisans les délais de séchage des peintures, joints et revêtements. Une intervention avant la fin des travaux peut nécessiter un nouveau passage, à chiffrer séparément." },
      { q: "Le nettoyage enlève-t-il un voile de ciment sur le carrelage ?", a: "La possibilité dépend du résidu et du matériau. Envoyez des photos et les références du revêtement si vous les avez. Un test est nécessaire : certains produits adaptés au ciment peuvent endommager une pierre naturelle ou des joints fragiles." },
      {
        "q": "Quel est le prix d'un nettoyage de fin de chantier à Toulouse ?",
        "a": "Le devis dépend de la surface, du type de travaux, de la quantité de poussière et des résidus à retirer. Des photos des pièces et des zones les plus marquées permettent une estimation gratuite sous 24 h."
      },
      {
        "q": "Quand faut-il programmer le nettoyage après travaux ?",
        "a": "Prévoyez le passage après la fin des travaux et le départ des artisans, avant l'installation du mobilier si possible. Indiquez la date de livraison souhaitée ; le créneau est confirmé selon les disponibilités."
      },
      {
        "q": "Pouvez-vous retirer les traces de peinture ou de colle ?",
        "a": "Nous étudions les traces selon leur nature et le support. Un test de compatibilité précède le traitement. Les marques qui nécessiteraient d'abîmer le revêtement ou qui correspondent à un défaut de surface ne peuvent pas être garanties comme éliminables."
      },
      {
        "q": "Les gravats, murs et plafonds sont-ils compris ?",
        "a": "Les gravats et déchets lourds ne sont pas inclus dans le nettoyage courant. Murs et plafonds ne sont traités que sur option après contrôle de compatibilité. Le devis précise les zones et les prestations retenues."
      },
      {
        "q": "Quels accès faut-il prévoir sur le chantier ?",
        "a": "Les pièces doivent être accessibles et les travaux terminés. Maintenez l'eau et l'électricité, dégagez les surfaces à nettoyer et signalez les matériaux fragiles ou les consignes des poseurs."
      },
      {
        "q": "Intervenez-vous pour les artisans et les agences ?",
        "a": "Oui, une prestation peut être organisée pour un particulier, un artisan, une agence ou un gestionnaire de locaux. Nous définissons le périmètre et les conditions d'accès avec la personne responsable du chantier."
      }
    ],
  },
  {
    slug: "/nettoyage-fin-de-bail-toulouse",
    navLabel: "Nettoyage fin de bail Toulouse",
    h1: "Nettoyage fin de bail à Toulouse",
    short: "Nettoyage Fin de bail Toulouse",
    subtitle: "Nettoyage avant état des lieux à Toulouse : cuisine, sanitaires, sols, surfaces et vitres selon devis. Murs et plafonds en option après vérification.",
    metaTitle: "Nettoyage fin de bail Toulouse | Avant état des lieux",
    metaDescription: "Nettoyage avant état des lieux à Toulouse : cuisine, sanitaires, placards, sols et vitres selon devis. Murs et plafonds en option. Devis gratuit sous 24 h.",
    group: "batiment",
    detailTitle: "Le nettoyage avant votre état des lieux",
    methodTitle: "Les étapes de votre nettoyage de fin de bail",
    relatedSlugs: ["/nettoyage-dappartement-ou-maison", "/nettoyage-de-vitres-toulouse", "/nettoyage-canape-toulouse", "/nettoyage-matelas-toulouse", "/nettoyage-moquette-toulouse", "/nettoyage-de-fin-de-chantier-toulouse"],
    intro: [
      "Préparez votre état des lieux de sortie avec un nettoyage de fin de bail à Toulouse. Clean&Fresh intervient dans les appartements et maisons pour remettre au propre les zones prévues au devis, selon la surface, l'état du logement et votre date de départ.",
      "Pour un studio, un T2 ou une maison, organisez si possible le nettoyage après le déménagement et avant la remise des clés. Les surfaces libérées sont plus accessibles et les appareils peuvent être traités selon le devis. Signalez un logement meublé, un électroménager à nettoyer ou une date de sortie proche pour définir le périmètre et vérifier les disponibilités.",
      "Le périmètre standard comprend les sols, surfaces accessibles, cuisine, salle de bain, WC, vitres, interrupteurs, radiateurs et intérieur des placards. Le devis précise les appareils et équipements à nettoyer, notamment le four, la hotte ou le réfrigérateur lorsqu'ils sont concernés.",
      "Les murs et plafonds sont exclus de la prestation standard. Leur nettoyage peut être ajouté en option après vérification de la matière et de la tenue de la peinture. Les textiles — canapé, matelas, tapis ou moquette — sont à signaler pour une prestation distincte.",
      "Nous traitons les graisses, le calcaire et les salissures avec des méthodes adaptées aux supports. Le nettoyage ne répare pas les rayures du parquet, les trous, les joints dégradés ou les peintures abîmées. La restitution du dépôt de garantie reste une décision du bailleur, indépendante de la seule propreté.",
      "Envoyez la surface approximative, quelques photos, l'adresse et la date de l'état des lieux. Prévoyez un logement dégagé, l'eau et l'électricité disponibles. Après accord et réception de l'acompte, le créneau convenu est définitivement bloqué."
    ],
    treated: [
      "Cuisine : évier, surfaces et équipements précisés au devis",
      "Salle de bain et WC : nettoyage et détartrage compatibles",
      "Sols, plinthes et surfaces accessibles",
      "Vitres, menuiseries intérieures et interrupteurs",
      "Radiateurs et intérieur des placards accessibles"
    ],
    problems: [
      "Graisses et calcaire avant l'état des lieux",
      "Cuisine et salle de bain encrassées",
      "Traces et salissures sur les sols",
      "Logement à remettre au propre après un déménagement"
    ],
    priceNote: "Devis détaillé selon la surface et l'état. Murs et plafonds exclus ; option possible après vérification de compatibilité.",
    method: [
      "Évaluation sur photos ou visite et définition des prestations comprises au devis.",
      "Nettoyage des pièces et surfaces convenues, avec respect des revêtements.",
      "Dégraissage et détartrage des équipements compatibles ; options uniquement si retenues.",
      "Contrôle final avec vous et signalement des traces ou dégradations restantes."
    ],
    faq: [
      { q: "Nettoyez-vous les studios et petits appartements avant remise des clés ?", a: "Oui. Le devis dépend de l’état et des tâches, pas seulement du nombre de mètres carrés. Précisez si le logement est vide ou meublé et envoyez quelques photos de la cuisine, des sanitaires et des pièces principales." },
      { q: "Le four, la hotte et le réfrigérateur sont-ils inclus ?", a: "Le devis précise quels appareils et quelles parties doivent être nettoyés. Signalez-les lors de la demande. Videz les équipements concernés et organisez, si nécessaire, le dégivrage du réfrigérateur avant le passage." },
      {
        "q": "Quel est le prix d'un nettoyage de fin de bail à Toulouse ?",
        "a": "Il dépend de la surface, de l'état et des équipements à traiter. Envoyez quelques photos, la surface approximative et la date souhaitée pour recevoir un devis détaillé gratuit sous 24 h."
      },
      {
        "q": "Que comprend le nettoyage avant état des lieux ?",
        "a": "Le périmètre standard comprend sols, surfaces accessibles, cuisine, salle de bain, WC, vitres, interrupteurs, radiateurs et intérieur des placards. Le devis détaille les équipements, notamment l'électroménager, et les prestations effectivement retenues."
      },
      {
        "q": "Le nettoyage des murs et plafonds est-il inclus ?",
        "a": "Non, les murs et plafonds sont exclus de la formule standard. Une option peut être étudiée après vérification de la compatibilité du revêtement et de la peinture. Elle doit figurer au devis avant l'intervention."
      },
      {
        "q": "Nettoyez-vous aussi le canapé, le matelas ou les tapis ?",
        "a": "Ces textiles font l'objet d'une prestation distincte. Mentionnez-les dans votre demande avec leur format et leur état pour les intégrer au devis si vous le souhaitez."
      },
      {
        "q": "Le nettoyage garantit-il la restitution de ma caution ?",
        "a": "La prestation prépare le logement sur le plan de la propreté, mais la décision appartient au bailleur. Les rayures, l'usure, les peintures abîmées et les réparations ne sont pas corrigées par le nettoyage."
      },
      {
        "q": "Comment préparer le logement et confirmer le créneau ?",
        "a": "Dégagez les surfaces, videz les placards et appareils concernés et maintenez l'eau et l'électricité. Après accord sur le devis et réception de l'acompte, le créneau convenu est définitivement bloqué ; le solde est payé en fin de prestation."
      }
    ],
  },
  {
    slug: "/nettoyage-diogene-toulouse",
    navLabel: "Nettoyage Diogène Toulouse",
    h1: "Nettoyage Diogène à Toulouse",
    short: "Nettoyage Syndrome de Diogène Toulouse",
    subtitle:
      "Désencombrement, débarras et remise en état de logements en syndrome de Diogène, à Toulouse et en Haute-Garonne.",
    metaTitle: "Nettoyage Diogène et débarras Toulouse | Clean&Fresh",
    metaDescription: "Nettoyage Diogène à Toulouse : tri, débarras et nettoyage selon l’état du logement. Objets à conserver définis avec vous, devis confidentiel et sans jugement.",
    group: "batiment",
    detailTitle: "Tri et nettoyage d’un logement encombré",
    methodTitle: "Une intervention Diogène préparée avec vous",
    relatedSlugs: ["/nettoyage-extreme-toulouse", "/nettoyage-dappartement-ou-maison", "/nettoyage-fin-de-bail-toulouse", "/nettoyage-de-vitres-toulouse", "/nettoyage-moquette-toulouse", "/nettoyage-de-fin-de-chantier-toulouse"],
    intro: [
      "Clean&Fresh accompagne les demandes de nettoyage de logements en situation de Diogène à Toulouse avec discrétion et sans jugement. L'intervention est préparée avec la personne concernée ou son représentant afin de définir les zones à traiter et les objets à conserver.",
      "Le tri et la remise au propre sont deux étapes distinctes. Avant d’estimer le nettoyage, il faut connaître le volume des objets à évacuer et l’accès aux sols et sanitaires. L’étage, l’ascenseur et la possibilité de stationner influencent l’organisation. Les documents et objets à préserver sont identifiés avec la personne concernée ou son représentant, sans décision de débarras prise à sa place.",
      "Le devis distingue le tri, le débarras, l'évacuation, le nettoyage des surfaces compatibles et les traitements complémentaires nécessaires. Le volume, l'accessibilité et l'état du logement déterminent l'organisation et la durée du chantier.",
      "Avant tout enlèvement, les consignes concernant les documents, souvenirs et effets personnels sont convenues avec vous. Nous avançons selon ce périmètre ; un logement très encombré peut demander plusieurs étapes avant le nettoyage proprement dit.",
      "La désinfection et le traitement des odeurs sont définis selon le diagnostic et les surfaces accessibles. Les murs et plafonds nécessitent une vérification et un accord au devis. En présence de nuisibles, de déchets particuliers ou de supports dégradés, un traitement spécialisé ou des travaux distincts peuvent être nécessaires.",
      "Pour une première évaluation à Toulouse ou alentours, indiquez la surface, les accès, le volume approximatif et joignez des photos. Les informations sont utilisées pour préparer le devis et organiser une intervention adaptée à la situation."
    ],
    treated: [
      "Logements fortement encombrés après évaluation",
      "Tri et débarras selon les consignes convenues",
      "Évacuation des encombrants identifiés au devis",
      "Nettoyage des sols, sanitaires et surfaces compatibles",
      "Désinfection et traitement des odeurs selon le besoin"
    ],
    problems: [
      "Accumulation d'objets et de déchets",
      "Zones de vie difficiles d'accès",
      "Salissures importantes et odeurs persistantes",
      "Logement à préparer avant une remise en usage"
    ],
    priceNote: "Sur devis confidentiel après évaluation — intervention rapide et discrète.",
    method: [
      "Évaluation confidentielle et définition des objets à conserver et du périmètre.",
      "Tri, débarras et évacuation des éléments prévus au devis.",
      "Nettoyage progressif des zones accessibles et compatibles.",
      "Traitements complémentaires retenus, contrôle et bilan des besoins restants."
    ],
    faq: [
      { q: "Faut-il trier soi-même avant une intervention Diogène ?", a: "Ce n’est pas une condition systématique. Le devis peut prévoir un tri selon vos consignes. Identifiez autant que possible les papiers, objets personnels et souvenirs à conserver ; les étapes sont convenues avant de commencer." },
      { q: "Pourquoi le volume à évacuer compte-t-il autant que la surface ?", a: "Deux logements de même surface peuvent nécessiter des interventions très différentes selon l’encombrement, l’accès et les salissures. Le volume à trier et à transporter permet de préparer les moyens, les étapes et un devis adapté." },
      {
        "q": "Comment commence une intervention Diogène à Toulouse ?",
        "a": "Nous échangeons sur la situation, les accès et les priorités, à partir de photos ou d'une visite. Un devis précise les étapes, le tri, le volume à évacuer et les zones à nettoyer avant de confirmer l'intervention."
      },
      {
        "q": "Comment sont gérés les objets à conserver ?",
        "a": "Les documents, effets personnels et objets à garder sont identifiés avec la personne concernée ou son représentant avant le débarras. Les consignes sont définies en amont pour distinguer ce qui doit être conservé de ce qui peut être évacué."
      },
      {
        "q": "Le nettoyage comprend-il les murs et plafonds ?",
        "a": "Uniquement si leur traitement est prévu au devis et compatible avec les revêtements. Un mur dégradé, une peinture fragile ou une contamination profonde peuvent nécessiter un autre traitement ou des travaux."
      },
      {
        "q": "Pouvez-vous traiter les odeurs et les nuisibles ?",
        "a": "Le traitement des odeurs peut être inclus selon le diagnostic. La présence de nuisibles doit être signalée avant l'intervention : une désinsectisation ou dératisation spécialisée peut être nécessaire séparément du nettoyage."
      },
      {
        "q": "Quel est le prix d'un nettoyage Diogène ?",
        "a": "Le prix dépend de la surface, du volume à trier et à évacuer, de l'accès et de l'état des supports. Une évaluation confidentielle permet de préparer un devis adapté, sans tarif forfaitaire annoncé avant examen."
      },
      {
        "q": "Puis-je organiser l'intervention pour un proche ?",
        "a": "Oui, nous pouvons échanger avec la famille ou le représentant chargé du logement, avec les accords nécessaires. Les décisions sur les biens à conserver et les accès sont clarifiées avant le début du chantier."
      }
    ],
  },
  {
    slug: "/nettoyage-extreme-toulouse",
    navLabel: "Nettoyage extrême Toulouse",
    h1: "Nettoyage extrême à Toulouse",
    short: "Nettoyage extrême Toulouse",
    subtitle:
      "Intervention lourde sur logement très dégradé, insalubre ou encombré, à Toulouse et alentours.",
    metaTitle: "Nettoyage logement insalubre Toulouse | Clean&Fresh",
    metaDescription: "Nettoyage extrême d’appartement très sale ou de logement insalubre à Toulouse. Débarras, surfaces et traitements selon diagnostic. Devis discret sur photos.",
    group: "batiment",
    detailTitle: "La remise au propre d’un logement très sale",
    methodTitle: "Les étapes d’un nettoyage extrême",
    relatedSlugs: ["/nettoyage-diogene-toulouse", "/nettoyage-dappartement-ou-maison", "/nettoyage-fin-de-bail-toulouse", "/nettoyage-de-fin-de-chantier-toulouse", "/nettoyage-de-vitres-toulouse", "/nettoyage-moquette-toulouse"],
    intro: [
      "Un appartement très sale, abandonné ou fortement encombré demande une préparation différente d'un ménage courant. Clean&Fresh réalise le nettoyage extrême à Toulouse après évaluation de l'état des pièces, des accès et des surfaces à remettre au propre.",
      "Une remise au propre après une longue période sans entretien demande d’évaluer séparément l’encombrement, les graisses, le calcaire et les surfaces dégradées. Nous distinguons ce qui peut être nettoyé de ce qui nécessite une réparation ou un remplacement. Signalez les accès difficiles, nuisibles et déchets particuliers avant la visite pour éviter de sous-estimer les besoins du chantier.",
      "La prestation peut associer débarras, dégraissage, détartrage et nettoyage approfondi des zones compatibles. Le devis distingue chaque étape, l'évacuation éventuelle et les traitements complémentaires pour adapter l'intervention à votre besoin réel.",
      "Après un départ de locataire ou une période d'inoccupation, les priorités sont définies avec le propriétaire ou la personne responsable du logement. Les biens à conserver sont identifiés avant tout débarras. L'eau, l'électricité et un accès sûr doivent être disponibles pour les opérations prévues.",
      "Le nettoyage ne constitue pas une rénovation du bâtiment. Les surfaces dégradées, moisissures profondes, nuisibles ou déchets particuliers doivent être signalés dès la demande : une intervention spécialisée ou des réparations peuvent être nécessaires. Les murs et plafonds sont étudiés séparément selon leur compatibilité.",
      "Adresse, surface approximative, photos et contraintes d'accès permettent de préparer un devis confidentiel à Toulouse et dans l'agglomération. Le créneau et la durée sont confirmés après examen de la situation et accord sur les prestations."
    ],
    treated: [
      "Appartements très encrassés ou laissés à l'abandon",
      "Logements encombrés après évaluation",
      "Débarras des éléments prévus au devis",
      "Cuisine, sanitaires, sols et surfaces compatibles",
      "Désinfection et traitement des odeurs selon diagnostic"
    ],
    problems: [
      "Accumulation importante de déchets et d'objets",
      "Graisses et dépôts fortement incrustés",
      "Odeurs persistantes selon leur origine",
      "Logement à remettre au propre avant travaux ou réutilisation"
    ],
    priceNote: "Sur devis après évaluation confidentielle — intervention rapide et discrète.",
    method: [
      "Évaluation confidentielle des accès, supports et besoins particuliers.",
      "Tri et évacuation des éléments convenus avec la personne responsable.",
      "Nettoyage approfondi des surfaces compatibles prévues au devis.",
      "Traitements complémentaires retenus et contrôle des zones nettoyées."
    ],
    faq: [
      { q: "Quelle différence entre nettoyage extrême et nettoyage Diogène ?", a: "Le nettoyage extrême concerne un niveau important de salissures ou un logement très dégradé. Une situation de Diogène peut aussi impliquer un encombrement et un tri à organiser avec la personne concernée. Le diagnostic détermine les étapes nécessaires, sans déduire la situation personnelle de l’état du logement." },
      { q: "Un logement très sale peut-il être remis en usage en un passage ?", a: "Cela dépend de son état et des opérations nécessaires. Un nettoyage ne remet pas en état une installation défectueuse ni un revêtement irrécupérable. Le devis indique les travaux de nettoyage retenus et les éventuels besoins distincts à traiter avant la remise en usage." },
      {
        "q": "Quelle différence entre grand ménage et nettoyage extrême ?",
        "a": "Le nettoyage extrême concerne un état d'encrassement ou d'encombrement qui demande davantage de préparation, de matériel et de temps. Une évaluation permet de distinguer nettoyage, débarras et traitements spécifiques."
      },
      {
        "q": "Intervenez-vous dans un logement abandonné ou après un départ difficile ?",
        "a": "Oui, après vérification des accès, de la situation et du périmètre. La personne responsable du logement doit pouvoir autoriser l'accès et préciser les objets à conserver avant toute évacuation."
      },
      {
        "q": "Comment obtenir un devis à Toulouse ?",
        "a": "Envoyez la surface approximative, l'adresse, des photos représentatives et les contraintes d'accès. Le montant dépend de l'état, du volume éventuel à évacuer et des surfaces à traiter."
      },
      {
        "q": "Le nettoyage suffit-il pour rendre le logement habitable ?",
        "a": "Cela dépend de son état. Le nettoyage traite les salissures prévues au devis ; il ne corrige pas les défauts du bâtiment ni les dégradations. Des travaux ou un traitement spécialisé peuvent rester nécessaires."
      },
      {
        "q": "Les murs, plafonds et nuisibles sont-ils pris en charge ?",
        "a": "Les murs et plafonds sont étudiés après vérification de compatibilité et uniquement selon le devis. Les nuisibles doivent être signalés : leur traitement peut nécessiter un prestataire spécialisé distinct du nettoyage."
      },
      {
        "q": "L'évaluation est-elle confidentielle ?",
        "a": "Nous traitons la demande avec discrétion et utilisons les informations et photos pour préparer l'intervention. Les modalités d'accès et les personnes à contacter sont définies avec vous."
      }
    ],
  },
  {
    slug: "/nettoyage-moquette-toulouse",
    navLabel: "Nettoyage moquette Toulouse",
    h1: "Nettoyage moquette à Toulouse",
    short: "Nettoyage moquette Toulouse",
    subtitle:
      "Shampouinage et nettoyage en profondeur de moquettes et sols textiles à domicile à Toulouse et dans toute la Haute-Garonne.",
    metaTitle: "Nettoyage moquette Toulouse : domicile et bureaux | Clean&Fresh",
    metaDescription: "Nettoyage de moquette à Toulouse dès 99 € : pièces, bureaux et sols textiles compatibles. Formule selon la surface, détachage et conseils de séchage.",
    group: "textile",
    booking: true,
    detailTitle: "Le nettoyage de vos sols en moquette",
    methodTitle: "Notre méthode d’entretien des moquettes",
    relatedSlugs: ["/nettoyage-tapis-toulouse", "/nettoyage-canape-toulouse", "/nettoyage-matelas-toulouse", "/nettoyage-dappartement-ou-maison", "/nettoyage-de-fin-de-chantier-toulouse", "/nettoyage-fin-de-bail-toulouse"],
    intro: [
      "Clean&Fresh nettoie les moquettes d'appartements, maisons et bureaux à Toulouse pour retirer les salissures accumulées dans les fibres. Choisissez la formule selon la surface à traiter, puis les options utiles avant de réserver votre créneau.",
      "La prestation concerne la moquette posée au sol et se choisit selon les mètres carrés accessibles, contrairement aux formules par nombre de tapis. Dans un bureau, les passages près des postes de travail peuvent être plus marqués que le reste de la pièce. Signalez les zones de circulation, les dalles décollées et le mobilier fixe pour préparer un nettoyage cohérent avec l’usage des locaux.",
      "L'injection-extraction est réalisée sur les moquettes compatibles après examen de la fibre, du dossier et de l'état de pose. Le nettoyage courant des taches est compris ; les traitements intensifs, anti-odeur ou autres compléments sont choisis selon le besoin.",
      "Une zone de passage encrassée, des traces de café ou des salissures d'animaux ne demandent pas toujours le même traitement. Indiquez l'origine des taches et les produits déjà utilisés. L'usure, les décolorations et certaines marques anciennes ne peuvent pas être réparées par le nettoyage.",
      "La surface accessible doit être dégagée avant l'arrivée. Signalez les meubles lourds, les raccords fragiles et les fibres naturelles comme le sisal : leur compatibilité avec un nettoyage humide doit être vérifiée et une autre solution peut être nécessaire.",
      "Le séchage prend généralement 2 à 5 heures, parfois davantage selon l'épaisseur, le support et l'aération. Pour un bureau ou un commerce, prévoyez un créneau permettant de limiter le passage sur la moquette humide. Les grandes surfaces et besoins particuliers sont vérifiés sur photos."
    ],
    treated: [
      "Moquettes velours ras et bouclées compatibles",
      "Dalles de moquette de bureaux et commerces",
      "Moquettes en rouleau après contrôle du support",
      "Fibres délicates ou naturelles sur diagnostic préalable"
    ],
    problems: [
      "Taches de café, boissons ou urine",
      "Odeurs et salissures des zones de passage",
      "Poussières accumulées dans les fibres",
      "Encrassement et aspect terni par l'usage"
    ],
    prices: [
      { label: "Petite surface (< 12 m²)", price: "99 €", items: ["Nettoyage par injection-extraction", "Traitement courant des taches et auréoles", "Séchage généralement en 2 à 5h"], formuleId: "moquette-petite" },
      { label: "Surface standard (12–20 m²)", price: "149 €", items: ["Nettoyage par injection-extraction", "Traitement courant des taches et auréoles", "Séchage généralement en 2 à 5h"], formuleId: "moquette-standard" },
      { label: "Grande surface (> 20 m²)", price: "199 €", items: ["Nettoyage par injection-extraction", "Traitement courant des taches et auréoles", "Diagnostic de la surface avant intervention"], formuleId: "moquette-grande" },
    ],
    priceNote: "Tarifs pour moquettes standards compatibles. Surface atypique, fibre délicate ou état exceptionnel : vérification préalable sur photos.",
    soils: ["Café et thé", "Vin et jus", "Urine", "Graisses", "Sable et boue"],
    method: [
      "Diagnostic de la fibre et du support, puis aspiration des zones accessibles.",
      "Traitement ciblé des taches et application des options retenues.",
      "Injection-extraction sur les surfaces compatibles, avec maîtrise de l'humidité.",
      "Extraction finale, contrôle et conseils de séchage avant remise en circulation."
    ],
    faq: [
      { q: "Comment estimer la surface de moquette à nettoyer ?", a: "Indiquez la surface des pièces concernées et les zones rendues inaccessibles par du mobilier fixe. Pour plusieurs pièces ou un bureau, joignez un plan simple ou des photos. Une surface atypique est vérifiée avant confirmation de la formule." },
      { q: "Peut-on nettoyer des dalles de moquette sans les déposer ?", a: "Oui, lorsque la fibre, l’envers et la pose sont compatibles. Les dalles sont examinées avant le nettoyage ; signalez celles qui se décollent ou dont les raccords sont fragiles. La prestation ne comprend pas la réparation de la pose." },
      {
        "q": "Combien coûte un nettoyage de moquette à Toulouse ?",
        "a": "La petite surface de moins de 12 m² est à 99 €, la surface standard de 12 à 20 m² à 149 € et la grande surface de plus de 20 m² à 199 €. Une surface atypique, une fibre délicate ou un état exceptionnel nécessite une vérification préalable sur photos."
      },
      {
        "q": "Faut-il déplacer les meubles avant l'intervention ?",
        "a": "Dégagez la surface à nettoyer et retirez les objets au sol. Signalez les meubles lourds ou fixes pour définir la zone accessible et l'organisation ; leur déplacement n'est pas présumé inclus."
      },
      {
        "q": "Quand peut-on remarcher sur la moquette ?",
        "a": "Attendez le séchage complet, généralement 2 à 5 heures et parfois davantage selon l'épaisseur, le support et la ventilation. Limitez les passages pendant le séchage pour éviter de redéposer des salissures."
      },
      {
        "q": "Les anciennes taches de café ou de vin vont-elles disparaître ?",
        "a": "Le résultat dépend de l'ancienneté de la tache, de la fibre et des produits déjà appliqués. Un détachage ciblé peut être utile, mais une décoloration ou une marque fixée peut rester visible."
      },
      {
        "q": "Nettoyez-vous les moquettes de bureaux et de commerces ?",
        "a": "Oui, selon la surface, l'état et les contraintes d'accès. Pour une grande surface ou des passages réguliers, envoyez des photos et vos horaires afin d'établir un devis adapté."
      },
      {
        "q": "Le sisal et les fibres naturelles peuvent-ils être nettoyés à l'eau ?",
        "a": "Pas systématiquement. Ces supports peuvent réagir à l'humidité ; envoyez des photos et les informations de matière avant de réserver. La méthode est confirmée après diagnostic et certaines fibres ne conviennent pas à l'injection-extraction."
      }
    ],
  },
  {
    slug: "/nettoyage-cuir-toulouse",
    navLabel: "Nettoyage cuir Toulouse",
    h1: "Nettoyage de cuir à domicile à Toulouse",
    short: "Nettoyage cuir Toulouse",
    subtitle:
      "Nettoyage manuel doux de vos canapés, fauteuils et sièges auto en cuir. Soin nourrissant et protecteur en option.",
    metaTitle: "Nettoyage canapé et fauteuil cuir Toulouse | Clean&Fresh",
    metaDescription: "Nettoyage de canapé, fauteuil et sièges en cuir à domicile à Toulouse dès 49 €. Méthode manuelle adaptée, soin protecteur en option et réservation en ligne.",
    group: "textile",
    booking: true,
    detailTitle: "Un nettoyage manuel adapté au cuir",
    methodTitle: "Notre méthode de nettoyage du cuir",
    relatedSlugs: ["/nettoyage-canape-toulouse", "/nettoyage-auto-a-domicile-toulouse", "/nettoyage-tapis-toulouse", "/nettoyage-matelas-toulouse", "/nettoyage-moquette-toulouse", "/nettoyage-dappartement-ou-maison"],
    intro: [
      "Clean&Fresh nettoie à domicile les canapés, fauteuils, chaises et sièges auto en cuir à Toulouse. La prestation retire les salissures de surface avec une méthode manuelle, une brosse adaptée et des produits choisis selon la finition du revêtement.",
      "Un cuir encrassé peut présenter un aspect brillant et des traces grasses sur les accoudoirs ou les assises. Le nettoyage vise ces dépôts, tandis qu’une perte de couleur ou une surface qui pèle relève d’une dégradation du revêtement. Cette distinction permet de choisir un entretien adapté et d’éviter de confondre nettoyage, soin et rénovation du cuir.",
      "Choisissez le format de votre mobilier puis, si vous le souhaitez, le soin nourrissant et protecteur proposé en option. Le nettoyage du cuir est distinct du shampouinage des textiles : nous n'utilisons pas l'injection-extraction sur le cuir véritable.",
      "Avant de commencer, nous vérifions la matière, les coutures et les zones usées, puis réalisons un test discret. Un cuir pigmenté, un revêtement synthétique et une finition délicate ne réagissent pas de la même façon. Signalez tout traitement antérieur et envoyez des photos si la surface pèle ou se décolore.",
      "Le nettoyage vise les traces de gras, les salissures et l'aspect encrassé. Il ne répare pas les craquelures, les déchirures ou les zones dépigmentées et ne comprend pas de recoloration. Le soin complémentaire est appliqué uniquement lorsqu'il convient à la matière.",
      "Dégagez l'accès au canapé ou aux fauteuils, puis laissez les surfaces sécher avant de les réutiliser. Vous pouvez regrouper plusieurs éléments dans une réservation à Toulouse et dans l'agglomération ; le récapitulatif précise les formules et options choisies."
    ],
    treated: [
      "Canapés et fauteuils en cuir compatible",
      "Chaises et poufs en cuir",
      "Sièges automobiles en cuir",
      "Simili-cuir et autres finitions après diagnostic"
    ],
    problems: [
      "Salissures de surface et aspect encrassé",
      "Traces de transpiration et de gras",
      "Dépôts sur les zones de contact",
      "Besoin d'entretien du revêtement"
    ],
    prices: [
      { label: "Fauteuil cuir", price: "49 €", items: ["Nettoyage manuel doux", "Brosse adaptée", "Réutilisation après séchage du cuir"], formuleId: "cuir-fauteuil" },
      { label: "Canapé cuir 2/3 places", price: "79 €", items: ["Nettoyage manuel doux", "Brosse adaptée", "Réutilisation après séchage du cuir"], formuleId: "cuir-canape-2" },
      { label: "Canapé cuir 4–5 places", price: "99 €", items: ["Nettoyage manuel doux", "Brosse adaptée", "Réutilisation après séchage du cuir"], formuleId: "cuir-canape-4" },
      { label: "Canapé cuir en U ou en angle", price: "99 €", items: ["Nettoyage manuel doux", "Brosse adaptée", "Réutilisation après séchage du cuir"], formuleId: "cuir-canape-angle" },
      { label: "Pouf cuir", price: "19 €", items: ["Nettoyage manuel doux", "Brosse adaptée", "Réutilisation après séchage du cuir"], formuleId: "cuir-pouf" },
      { label: "Lot de 4 chaises en cuir", price: "69 €", items: ["Nettoyage manuel doux des assises et dossiers", "Produits adaptés au cuir", "1 h d’intervention"], formuleId: "cuir-chaise" },
      { label: "Lot de 5 chaises en cuir", price: "79 €", items: ["Nettoyage manuel doux des assises et dossiers", "Produits adaptés au cuir", "1 h d’intervention"], formuleId: "cuir-chaises-5" },
      { label: "Lot de 6 chaises en cuir", price: "89 €", items: ["Nettoyage manuel doux des assises et dossiers", "Produits adaptés au cuir", "1 h d’intervention", "Chaise supplémentaire : +15 €"], formuleId: "cuir-chaises-6" },
      { label: "Sièges auto cuir", price: "59 €", items: ["Nettoyage manuel doux", "Brosse adaptée", "Réutilisation après séchage du cuir", "Tous les sièges du véhicule en cuir sont nettoyés"], formuleId: "cuir-auto" },
    ],
    priceNote:
      "Inclus : nettoyage manuel sans injection-extraction. Un traitement nourrissant et protecteur est fortement recommandé en option.",
    soils: [
      "Salissures incrustées",
      "Traces de stylo légères",
      "Résidus gras",
    ],
    method: [
      "Identification du revêtement, examen de l'usure et test sur une zone discrète.",
      "Nettoyage manuel avec une brosse et un produit adaptés.",
      "Essuyage des salissures avec des microfibres propres.",
      "Soin nourrissant et protecteur si choisi et compatible, puis conseils de séchage."
    ],
    faq: [
      { q: "Le nettoyage peut-il réparer un canapé en cuir craquelé ?", a: "Non. Il retire les salissures compatibles avec la méthode retenue, mais ne répare pas les craquelures, les déchirures ou les pertes de couleur. Envoyez des photos des zones usées afin de vérifier si un nettoyage reste approprié." },
      { q: "Un canapé en simili cuir se nettoie-t-il comme du cuir véritable ?", a: "Pas systématiquement. Le matériau et sa finition doivent être identifiés, surtout si la surface pèle. Un soin destiné au cuir véritable n’est pas appliqué automatiquement sur un revêtement synthétique ; la méthode est confirmée après diagnostic." },
      {
        "q": "Combien coûte un nettoyage de canapé en cuir à Toulouse ?",
        "a": "Le fauteuil est à 49 €, le canapé cuir 2/3 places à 79 €, le canapé 4/5 places ou d'angle/en U à 99 €. Les chaises, poufs et sièges auto disposent de formules dédiées. Le soin nourrissant et protecteur est en option."
      },
      {
        "q": "Le soin du cuir est-il inclus dans le nettoyage ?",
        "a": "La formule comprend le nettoyage manuel doux. Le soin nourrissant et protecteur est une option distincte, appliquée après nettoyage si elle est choisie et adaptée au revêtement."
      },
      {
        "q": "Pourquoi ne pas utiliser une shampouineuse sur le cuir ?",
        "a": "L'injection-extraction apporte une humidité inadaptée au cuir véritable. Nous privilégions un nettoyage de surface manuel et contrôlé, après test, avec un produit adapté à la finition."
      },
      {
        "q": "Pouvez-vous réparer les craquelures ou recolorer le cuir ?",
        "a": "Non. La prestation nettoie les salissures et peut inclure un soin d'entretien, mais ne répare pas les craquelures, les déchirures ou les pertes de couleur. Une restauration spécialisée est nécessaire pour ces défauts."
      },
      {
        "q": "Nettoyez-vous le simili-cuir et les cuirs délicats ?",
        "a": "La prise en charge dépend de leur état et de leur finition. Envoyez des photos si le revêtement pèle, se décolore ou présente une usure marquée ; un diagnostic et un test déterminent la méthode possible."
      },
      {
        "q": "Quand puis-je réutiliser mon canapé en cuir ?",
        "a": "Après séchage complet du nettoyage et, le cas échéant, du soin appliqué. Le délai dépend du revêtement et du produit ; les conseils sont donnés à la fin de l'intervention."
      }
    ],
  },
];

export const getService = (slug: string) => SERVICES.find((s) => s.slug === slug)!;

export const MENU_TEXTILE = SERVICES.filter((s) => s.group === "textile");
export const MENU_BATIMENT = SERVICES.filter((s) => s.group === "batiment");

export const TESTIMONIALS = [
  {
    name: "Marion L.",
    city: "Toulouse",
    service: "Nettoyage canapé",
    text: "Canapé en tissu clair récupéré alors que je pensais le jeter. Résultat impeccable, plus une tache ni d'odeur. Je recommande les yeux fermés.",
  },
  {
    name: "Julien D.",
    city: "Blagnac",
    service: "Nettoyage matelas",
    text: "Très professionnel et ponctuel. Le matelas de mon fils a été traité anti-acariens, il dort beaucoup mieux depuis. Prix annoncé respecté.",
  },
  {
    name: "Sabrina M.",
    city: "Colomiers",
    service: "Intérieur auto",
    text: "Réactivité au top : devis le matin, intervention le lendemain devant chez moi. La voiture est comme neuve à l'intérieur.",
  },
  {
    name: "Antoine R.",
    city: "Toulouse",
    service: "Fin de chantier",
    text: "Appartement livré nickel après nos travaux. Équipe sérieuse, rien n'a été oublié, même les rails de fenêtres.",
  },
  {
    name: "Claire B.",
    city: "Tournefeuille",
    service: "Nettoyage tapis",
    text: "Un grand tapis de salon très encrassé retrouvé comme au premier jour. Travail soigné et conseils utiles pour l'entretien.",
  },
];
