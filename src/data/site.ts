export const SITE_URL = "https://cleanetfresh.fr";
export const OG_IMAGE = `${SITE_URL}/realisations/photo-02.webp`;

/** Nombre d'avis Google — à mettre à jour ici pour propager partout */
export const GOOGLE_REVIEW_COUNT = 103;

export const COMPANY = {
  name: "Clean&Fresh",
  slogan: "On redonne vie à vos intérieurs et extérieurs",
  phone: "07 67 12 75 00",
  phoneHref: "tel:+33767127500",
  email: "nettoyagecleanfresh@gmail.com",
  city: "Toulouse",
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
    short: "Nettoyage canapé Toulouse",
    subtitle:
      "Nettoyage en profondeur de vos canapés et fauteuils à domicile. À Toulouse et dans toute l'agglomération.",
    metaTitle: "Nettoyage Canapé Toulouse — dès 49 € à domicile | Clean&Fresh",
    metaDescription:
      "Nettoyage canapé tissu, cuir et microfibre à Toulouse. Traitement anti-acariens, séchage 2-4h. À domicile. 4.9★ sur Google. Devis gratuit sous 24h !",
    group: "textile",
    booking: true,
    intro: [
      "Votre canapé concentre poussière, acariens, transpiration et taches du quotidien. Notre équipe de nettoyage canapé à Toulouse intervient directement chez vous, sans déplacer vos meubles, avec un matériel professionnel d'injection-extraction et des produits certifiés Écolabel européen.",
      "Chaque prestation comprend le nettoyage en profondeur de l'assise, du dossier et des coussins, l'élimination des taches et auréoles ainsi que la neutralisation des mauvaises odeurs. Tissu, microfibre, velours ou cuir : nous adaptons notre méthode à chaque matière pour un résultat impeccable dans le respect du revêtement.",
      "Le nettoyage canapé cuir à Toulouse est l'une de nos spécialités. Contrairement au tissu, le cuir ne supporte pas l'injection-extraction : nous utilisons des nettoyants pH neutre spécifiques, appliqués manuellement, suivis d'un nourrissant protecteur qui restaure la souplesse et l'éclat du revêtement. Le procédé élimine les traces grasses, les auréoles et les micro-rayures sans assécher la surface. Cuir naturel, cuir synthétique ou éco-cuir — le résultat est visible dès la première intervention.",
      "Un canapé en tissu ou en velours se nettoie idéalement une à deux fois par an, ou dès l'apparition d'une tache incrustée. Pour les familles avec enfants ou animaux, un nettoyage régulier élimine les allergènes accumulés dans les fibres et prolonge la durée de vie du meuble. Notre traitement anti-acariens en option est particulièrement recommandé pour les personnes souffrant d'allergies respiratoires.",
      "Pour les textiles, Clean&Fresh utilise principalement l’injection-extraction afin d’extraire les salissures incrustées. Les surfaces en cuir bénéficient d’un nettoyage manuel professionnel spécifique afin de respecter la matière.",
      "Beaucoup de clients recherchent une shampouineuse canapé à louer ou un nettoyage canapé à la vapeur. Notre injecteur extracteur professionnel va bien au-delà : contrairement à une shampouineuse canapé classique ou à un nettoyeur vapeur canapé, il extrait réellement les salissures incrustées dans les fibres plutôt que de les repousser en profondeur. Le shampouinage canapé par injecteur extracteur donne un résultat visible dès la première intervention, sur tissu comme sur microfibre.",
      "Nous intervenons à Toulouse et dans toute la Haute-Garonne — Blagnac, Colomiers, Tournefeuille, Balma, Cugnaux, Muret, Ramonville-Saint-Agne, Castanet-Tolosan, Plaisance-du-Touch et dans l'ensemble des communes du 31. Devis gratuit sous 24h, intervention possible dès le lendemain.",
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
      { label: "Fauteuil", price: "49 €", items: ["Nettoyage assise, dossier et coussin", "Élimination des taches et auréoles", "Neutralisation des mauvaises odeurs", "Séchage rapide — réutilisable le jour même"], formuleId: "fauteuil" },
      { label: "Canapé 2/3 places", price: "79 €", items: ["Nettoyage assise, dossier et coussins", "Élimination des taches et auréoles", "Neutralisation des mauvaises odeurs", "Séchage rapide — réutilisable le jour même"], formuleId: "canape-2" },
      { label: "Canapé 4/5 places", price: "99 €", items: ["Nettoyage assise, dossier et coussins", "Élimination des taches et auréoles", "Neutralisation des mauvaises odeurs", "Séchage rapide — réutilisable le jour même"], formuleId: "canape-45" },
      { label: "Canapé en U / Angle", price: "99 €", items: ["Grande surface traitée en profondeur", "Élimination des taches et auréoles", "Neutralisation des mauvaises odeurs", "Séchage rapide — réutilisable le jour même"], formuleId: "canape-angle" },
      { label: "Pouf", price: "19 €", items: ["Tissu, velours, toutes matières", "Élimination des taches et auréoles", "Neutralisation des mauvaises odeurs"], formuleId: "pouf" },
      { label: "Chaise rembourrée (à la pièce)", price: "15 €", items: ["Assise et dossier traités en profondeur", "Élimination des taches et auréoles", "Tarif dégressif à partir de 4 chaises"], formuleId: "chaise" },
    ],
    priceNote:
      "Inclus dans toutes les prestations : nettoyage en profondeur, assise + dossier + coussin, élimination des taches et auréoles, neutralisation des mauvaises odeurs.",
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
      "Neutralisation des odeurs et séchage accéléré : votre canapé est réutilisable en quelques heures.",
    ],
    faq: [
      { q: "Combien coûte un nettoyage de canapé à Toulouse ?", a: "Le tarif part de 49 € pour un fauteuil, 79 € pour un canapé 2/3 places et 99 € pour un canapé 4/5 places ou d'angle. Devis gratuit, réponse sous 24h." },
      { q: "Combien de temps faut-il pour nettoyer un canapé ?", a: "Une intervention dure entre 45 minutes et 1h30 selon la taille et l'état. Le technicien apporte tout le matériel — vous pouvez rester chez vous pendant l'intervention." },
      { q: "Combien de temps met un canapé à sécher ?", a: "Le séchage prend généralement 2 à 4 heures. Votre canapé est réutilisable le jour même. En cas d'humidité élevée, aérez la pièce ou activez le chauffage pour accélérer." },
      { q: "Peut-on enlever une ancienne tache de café, vin ou urine sur un canapé ?", a: "Oui, dans la plupart des cas. Nos produits professionnels traitent les taches incrustées de café, vin, urine, sang et graisses. Plus la tache est ancienne, plus le traitement est intensif — les résultats sont souvent remarquables." },
      { q: "Nettoyez-vous les canapés en cuir à Toulouse ?", a: "Oui. Le nettoyage canapé cuir demande des produits et une technique spécifiques pour ne pas assécher ni craqueler le revêtement. Nous utilisons des nettoyants pH neutre adaptés au cuir naturel, synthétique et éco-cuir, suivis d'un nourrissant protecteur. Le résultat est immédiat : le cuir retrouve son éclat et sa souplesse." },
      { q: "Intervenez-vous le week-end à Toulouse et dans l'agglomération ?", a: "Oui, nous intervenons en semaine et le week-end à Toulouse, Blagnac, Colomiers, Tournefeuille, Balma, Cugnaux et dans tout le 31. Contactez-nous pour vérifier les disponibilités." },
    ],
  },
  {
    slug: "/nettoyage-matelas-toulouse",
    navLabel: "Nettoyage matelas Toulouse",
    h1: "Nettoyage matelas à Toulouse",
    short: "Nettoyage matelas Toulouse",
    subtitle:
      "Nettoyage en profondeur du matelas par injection-extraction. Traitements complémentaires disponibles en option : anti-acariens, anti-odeur, enzymatique et protection textile.",
    metaTitle: "Nettoyage Matelas Toulouse — Anti-acariens à domicile | Clean&Fresh",
    metaDescription:
      "Nettoyage de matelas à domicile à Toulouse. Traitements complémentaires disponibles en option : anti-acariens, anti-odeur, enzymatique et protection textile. 4.9★ Google. Devis gratuit sous 24h.",
    group: "textile",
    booking: true,
    intro: [
      "Un matelas absorbe chaque nuit transpiration, cellules mortes et humidité : c'est le terrain idéal pour les acariens. Notre service de nettoyage matelas à Toulouse intervient directement dans votre chambre, sans le déplacer, avec une machine professionnelle et des produits écologiques certifiés Écolabel.",
      "Le résultat : un couchage assaini, désodorisé et sain pour toute la famille. Particulièrement recommandé aux personnes allergiques, aux familles avec enfants en bas âge et en cas d'auréoles d'urine ou de transpiration incrustées.",
      "Un nettoyage de matelas professionnel est recommandé tous les 6 à 12 mois. Pour les personnes souffrant d'allergies aux acariens, de rhinites ou d'eczéma, notre traitement anti-acariens en option élimine les allergènes responsables des crises. Les médecins allergologues recommandent un entretien bi-annuel des couchages pour les sujets sensibles.",
      "Notre méthode d'injection-extraction traite en profondeur les deux faces du matelas : elle élimine les cellules mortes, la poussière, les moisissures et les bactéries sans laisser de résidu. Contrairement à une shampouineuse classique qui reste en surface, notre équipement professionnel injecte la solution nettoyante dans les fibres du matelas puis l'aspire avec les impuretés — un résultat bien supérieur au nettoyage matelas shampouineuse standard disponible en location. Le matelas sèche en 3 à 6 heures selon son épaisseur et peut être utilisé le soir même. Les produits certifiés Écolabel utilisés sont sans danger pour les enfants et les animaux.",
      "Beaucoup de clients cherchent un nettoyeur matelas ou une shampouineuse pour matelas en location. Notre équipement professionnel d'injection-extraction va bien au-delà : il réalise un nettoyage acariens en profondeur que les appareils grand public ne peuvent pas atteindre, en extrayant les allergènes, les cellules mortes et les bactéries logées au cœur des fibres.",
      "Clean&Fresh intervient sur tous types de matelas — mousse, latex, ressorts, mémoire de forme — à Toulouse, Blagnac, Colomiers, Tournefeuille, Balma, Cugnaux, Muret, Ramonville-Saint-Agne et dans tout le département 31. Réponse sous 24h, tarifs clairs et sans surprise.",
    ],
    treated: [
      "Matelas 1 place, 2 places, king size",
      "Matelas enfant et lits superposés",
      "Sommiers tapissiers et têtes de lit",
      "Mousse, ressorts, latex et mémoire de forme",
    ],
    problems: [
      "Acariens et allergènes",
      "Auréoles de transpiration et d'urine",
      "Moisissures liées à l'humidité",
      "Odeurs persistantes",
    ],
    prices: [
      { label: "Matelas enfant", price: "39 €", items: ["Nettoyage 2 côtés en profondeur", "Réutilisable le même jour", "Élimination des taches et auréoles", "Neutralisation des mauvaises odeurs"], formuleId: "matelas-enfant" },
      { label: "Matelas 1 place", price: "59 €", items: ["Nettoyage 2 côtés en profondeur", "Réutilisable le même jour", "Élimination des taches et auréoles", "Neutralisation des mauvaises odeurs"], formuleId: "matelas-1" },
      { label: "Matelas 2 places", price: "99 €", items: ["Nettoyage 2 côtés en profondeur", "Réutilisable le même jour", "Élimination des taches et auréoles", "Neutralisation des mauvaises odeurs"], formuleId: "matelas-2" },
    ],
    priceNote: "Tarifs sur devis selon la taille et l'état du matelas — réponse gratuite sous 24h.",
    soils: ["Urine", "Transpiration", "Sang", "Moisissures", "Odeurs de renfermé"],
    method: [
      "Aspiration haute puissance des poussières et allergènes de surface.",
      "Détachage des auréoles et traitement anti-acariens.",
      "Injection-extraction en profondeur des fibres.",
      "Désinfection, neutralisation des odeurs et séchage accéléré.",
    ],
    faq: [
      { q: "Combien coûte un nettoyage de matelas à Toulouse ?", a: "Le tarif démarre à 39 € pour un matelas enfant, 59 € pour un matelas 1 place et 99 € pour un matelas 2 places. Devis gratuit, réponse sous 24h." },
      { q: "Peut-on enlever une ancienne tache d'urine sur un matelas ?", a: "Oui, dans la grande majorité des cas. Nous appliquons un détachage enzymatique ciblé avant l'injection-extraction. Les auréoles d'urine, même anciennes, sont éliminées ou très atténuées." },
      { q: "Combien de temps met un matelas à sécher ?", a: "Entre 3 et 6 heures selon l'épaisseur et le type de matelas. Pour accélérer, aérez la chambre ou activez le chauffage. Votre lit est utilisable le soir même." },
      { q: "Quels produits utilisez-vous pour le nettoyage de matelas ?", a: "Des produits certifiés Écolabel européen, sans danger pour les enfants, les personnes allergiques et les animaux. Aucun solvant agressif ni résidu chimique après séchage." },
      { q: "Le nettoyage de matelas est-il recommandé pour les personnes allergiques ?", a: "Absolument. Le traitement anti-acariens disponible en option élimine les allergènes responsables des rhinites, eczémas et troubles du sommeil. Une intervention annuelle est idéale pour les personnes sensibles." },
    ],
  },
  {
    slug: "/nettoyage-tapis-toulouse",
    navLabel: "Nettoyage tapis Toulouse",
    h1: "Nettoyage tapis et moquette à Toulouse",
    short: "Nettoyage tapis Toulouse",
    subtitle:
      "Nettoyage professionnel de tapis et moquettes à domicile, à Toulouse et dans toute la Haute-Garonne.",
    metaTitle: "Nettoyage Tapis & Moquette Toulouse — À domicile | Clean&Fresh",
    metaDescription:
      "Shampouinage et nettoyage professionnel de tapis à Toulouse. Toutes fibres, toutes tailles. Taches, odeurs, poils d'animaux éliminés. Devis gratuit sous 24h.",
    group: "textile",
    booking: true,
    intro: [
      "Tapis de salon, descentes de lit, moquettes de bureaux : les fibres retiennent la poussière, les acariens et les taches. Notre service de nettoyage tapis à Toulouse intervient sur place avec du matériel professionnel adapté à chaque type de fibre.",
      "Les couleurs sont ravivées, les odeurs neutralisées et le tapis reste utilisable dans la journée. Que votre tapis soit en laine, synthétique, shaggy ou berbère, nous appliquons la technique d'injection-extraction avec des produits certifiés Écolabel.",
      "Le shampouinage de tapis à Toulouse est souvent confondu avec un simple lavage. Chez Clean&Fresh, nous utilisons l'injection-extraction : le produit nettoyant est injecté sous pression dans les fibres puis aspiré avec les salissures. Cette méthode est plus efficace que le shampouinage classique — pas de résidu de mousse, pas de sur-mouillage, séchage en 2 à 4 heures. Elle convient aussi bien aux tapis en laine délicate qu'aux tapis shaggy, berbère, viscose ou synthétique.",
      "Pour le nettoyage de moquette à Toulouse, la même technique s'applique aux moquettes collées d'appartements et aux moquettes de bureaux ou d'espaces professionnels. Nous intervenons pour les particuliers comme pour les entreprises, les hôtels, les agences immobilières et les cabinets médicaux. Un tapis ou une moquette se nettoie en profondeur 1 à 2 fois par an selon le trafic et la présence d'animaux.",
      "Certains clients recherchent un pressing de tapis à Toulouse, un lavage de tapis à domicile ou une shampouineuse tapis en location. Ces termes désignent tous la même prestation que nous proposons sous forme de nettoyage professionnel par injecteur extracteur. Nettoyeur tapis, pressing tapis, lavage tapis ou shampouinage tapis : quelle que soit la formulation, le résultat est identique — fibres nettoyées en profondeur, couleurs ravivées et tapis utilisable le jour même.",
      "Nous nous déplaçons à domicile dans toute l'agglomération toulousaine — Toulouse, Blagnac, Colomiers, Tournefeuille, Cugnaux, Balma, Muret, Ramonville-Saint-Agne, Castanet-Tolosan et plus de 30 autres communes du 31. Devis gratuit, intervention rapide sous 24h.",
    ],
    treated: [
      "Tapis en laine, synthétique, shaggy, berbère",
      "Grands tapis de salon et descentes de lit",
      "Moquettes d'appartements et de bureaux",
      "Paillassons et tapis d'entrée professionnels",
    ],
    problems: [
      "Taches alimentaires et boissons",
      "Fibres tassées et ternies",
      "Acariens et poussière incrustée",
      "Odeurs d'animaux",
    ],
    prices: [
      { label: "1 tapis", price: "49 €", items: ["Nettoyage en profondeur par injection-extraction", "Fibres et couleurs ravivées", "Élimination des taches et auréoles", "Neutralisation des mauvaises odeurs"], formuleId: "tapis-1" },
      { label: "2 tapis", price: "79 €", items: ["Nettoyage en profondeur par injection-extraction", "Fibres et couleurs ravivées", "Élimination des taches et auréoles", "Neutralisation des mauvaises odeurs"], formuleId: "tapis-2" },
      { label: "3 tapis", price: "99 €", items: ["Nettoyage en profondeur par injection-extraction", "Fibres et couleurs ravivées", "Élimination des taches et auréoles", "Neutralisation des mauvaises odeurs"], formuleId: "tapis-3" },
    ],
    priceNote: "Tarifs sur devis selon la surface et la nature de la fibre — réponse sous 24h.",
    soils: ["Pipi d'animaux", "Café et vin", "Nourriture", "Boue et terre", "Tabac"],
    method: [
      "Identification de la fibre et dépoussiérage mécanique.",
      "Prétraitement des taches localisées.",
      "Injection-extraction avec produits Écolabel.",
      "Brossage de finition et séchage accéléré.",
    ],
    faq: [
      { q: "Combien coûte un nettoyage de tapis à Toulouse ?", a: "À partir de 49 € pour 1 tapis, 79 € pour 2 tapis et 99 € pour 3 tapis. Tarif sur devis selon la surface et la nature de la fibre. Réponse gratuite sous 24h." },
      { q: "Nettoyez-vous tous les types de tapis ?", a: "Oui : laine, synthétique, shaggy, berbère, viscose, soie artificielle. Nous testons la compatibilité du produit sur une zone cachée avant chaque intervention pour préserver votre tapis." },
      { q: "Pouvez-vous nettoyer les deux faces du tapis ?", a: "Oui, le nettoyage recto-verso est disponible en option à +25 €. Recommandé pour les tapis très épais ou très encrassés." },
      { q: "Comment éliminer l'odeur d'urine de chat ou de chien sur un tapis ?", a: "Nous appliquons un détachage enzymatique ciblé, suivi d'un traitement anti-odeur par neutralisation moléculaire. Les odeurs d'urine animale sont éliminées en profondeur, pas simplement masquées." },
      { q: "Combien de temps faut-il pour nettoyer un tapis ?", a: "Entre 30 et 60 minutes par tapis selon sa taille et son état. Le tapis est utilisable après 2 à 4 heures de séchage." },
    ],
  },
  {
    slug: "/nettoyage-auto-a-domicile-toulouse",
    navLabel: "Nettoyage auto à domicile Toulouse",
    h1: "Nettoyage intérieur auto à domicile à Toulouse",
    short: "Nettoyage auto Toulouse",
    subtitle:
      "Nettoyage complet de l'habitacle de votre véhicule, chez vous ou sur votre lieu de travail, à Toulouse et son agglomération.",
    metaTitle: "Nettoyage Auto à Domicile Toulouse — Intérieur complet | Clean&Fresh",
    metaDescription:
      "Nettoyage intérieur voiture à domicile à Toulouse. Sièges, moquette, tableau de bord, vitres. Résultat showroom. Particuliers et professionnels. Devis gratuit sous 24h.",
    group: "textile",
    booking: true,
    intro: [
      "Nous venons nettoyer l'intérieur de votre véhicule là où il est garé : domicile, parking d'entreprise ou copropriété. Aucun déplacement, aucune perte de temps. Notre service de nettoyage auto à domicile à Toulouse s'adapte à vos contraintes horaires.",
      "Sièges, moquettes, coffre, plastiques et plafonnier : l'habitacle retrouve un état proche du neuf, sans odeur. Nous traitons les véhicules particuliers, les utilitaires et les flottes d'entreprise avec des produits professionnels certifiés Écolabel.",
      "Le nettoyage intérieur de voiture à Toulouse est particulièrement recommandé avant une revente, après un déménagement avec des enfants ou des animaux, ou pour éliminer une odeur de tabac incrustée dans les textiles de l'habitacle. Notre traitement anti-odeur par neutralisation moléculaire élimine les mauvaises odeurs à la source — pas simplement masquées avec un désodorisant.",
      "Nous proposons trois formules adaptées à tous les besoins : le Pack Bronze pour un entretien rapide (aspiration + plastiques), le Pack Argent pour un habitacle transformé incluant l'injection-extraction des sièges tissu, et le Pack Or pour un résultat showroom avec traitement complet des moquettes. Pour les SUV, utilitaires ou flottes d'entreprise, un devis personnalisé est établi sous 24h.",
      "Intervention possible partout dans l'agglomération toulousaine et le département 31 — Blagnac, Colomiers, Tournefeuille, Muret, Balma, Cugnaux, Labège, Portet-sur-Garonne et alentours. Devis gratuit sous 24h selon la taille du véhicule et la formule choisie — Bronze, Argent ou Or.",
    ],
    treated: [
      "Sièges tissu et moquettes de sol",
      "Coffre et passages de roue intérieurs",
      "Plastiques, tableau de bord et contre-portes",
      "Nettoyage des bas de porte et contour de porte",
      "Véhicules particuliers, utilitaires et flottes d'entreprise",
    ],
    problems: [
      "Taches de nourriture et boissons",
      "Odeurs de tabac et d'animaux",
      "Poils d'animaux incrustés",
      "Poussière et sable dans les moquettes",
    ],
    prices: [
      { label: "🥉 Pack Bronze", price: "69 €", items: ["Aspiration complète de l'habitacle", "Nettoyage des plastiques et tableau de bord", "Nettoyage des vitres intérieures", "Nettoyage des tapis de sol"], formuleId: "bronze" },
      { label: "🥈 Pack Argent", price: "99 €", items: ["Tout le Pack Bronze inclus", "Injection-extraction des sièges tissu", "Vitres sans traces (intérieur + extérieur)", "Joints et recoins traités en détail"], formuleId: "argent" },
      { label: "🥇 Pack Or", price: "129 €", items: ["Tout le Pack Argent inclus", "Shampouinage injection-extraction moquettes", "Nettoyage complet du coffre", "Nettoyage contour et bas de porte"], formuleId: "or" },
      { label: "Rénovation siège auto", price: "59 €", items: ["Injection-extraction d'un siège ou nettoyage intégral du cuir", "Élimination des taches tenaces", "Traitement des auréoles", "Résultat visible immédiatement"], formuleId: "siege" },
      { label: "Soin nourrissant et protecteur cuir", price: "55 €", items: ["Application manuelle du soin spécial cuir", "Nourrit et protège la surface", "Prolonge la durée de vie du cuir"], formuleId: "cuir-care" },
    ],
    priceNote: "Tarifs sur devis selon la taille du véhicule et son état — réponse sous 24h.",
    soils: ["Nourriture et boissons", "Tabac", "Poils d'animaux", "Transpiration", "Boue"],
    method: [
      "Aspiration complète de l'habitacle et du coffre.",
      "Détachage des sièges et moquettes.",
      "Injection-extraction des textiles.",
      "Nettoyage des plastiques, vitres intérieures et désodorisation.",
    ],
    faq: [
      { q: "Combien coûte un nettoyage intérieur de voiture à domicile à Toulouse ?", a: "À partir de 69 € (Pack Bronze), 99 € (Pack Argent) ou 129 € (Pack Or) pour les véhicules standards. Pour les SUV, utilitaires ou gros volumes, contactez-nous pour un tarif personnalisé." },
      { q: "Faut-il amener la voiture quelque part pour le nettoyage ?", a: "Non, nous venons directement à votre adresse — domicile, parking de bureau ou copropriété. Il suffit d'une prise électrique à proximité du véhicule." },
      { q: "Pouvez-vous éliminer l'odeur de tabac ou de chien dans une voiture ?", a: "Oui, nous proposons un traitement anti-odeur par neutralisation moléculaire qui élimine les odeurs de tabac, d'animaux et de transpiration incrustées dans les textiles de l'habitacle." },
      { q: "Combien de temps dure un nettoyage intérieur de voiture ?", a: "Entre 1h (Pack Bronze) et 2h30 (Pack Or) selon la formule et l'état du véhicule. Vous pouvez reprendre votre voiture dès la fin de l'intervention." },
      { q: "Nettoyez-vous aussi les véhicules utilitaires et les flottes d'entreprise ?", a: "Oui, nous intervenons sur tous types de véhicules : particuliers, SUV, utilitaires, camionnettes et flottes d'entreprise. Tarifs dégressifs pour les flottes, contactez-nous pour un devis." },
    ],
  },
  {
    slug: "/nettoyage-de-vitres-toulouse",
    navLabel: "Nettoyage de vitres Toulouse",
    h1: "Nettoyage de vitres à Toulouse",
    short: "Nettoyage vitres Toulouse",
    subtitle:
      "Vitres d'habitations, vitrines de commerces et baies de bureaux nettoyées sans traces, à Toulouse et alentours.",
    metaTitle: "Nettoyage de Vitres Toulouse — Sans traces, pro & particuliers | Clean&Fresh",
    metaDescription:
      "Nettoyage vitres et vitrines à Toulouse : habitations, commerces, bureaux. Résultat sans traces garanti. Entretien ponctuel ou contrat régulier. Devis gratuit sous 24h.",
    group: "batiment",
    intro: [
      "Des vitres impeccables, c'est une image soignée pour votre domicile ou votre commerce. Notre service de nettoyage de vitres à Toulouse intervient chez les particuliers comme chez les professionnels avec un matériel adapté, garantissant un résultat sans traces.",
      "Nous nettoyons vos fenêtres, baies vitrées, vitrines de commerces et cloisons de bureaux — encadrements, rails et rebords compris. Intervention ponctuelle ou contrat d'entretien régulier à tarif dégressif, aux horaires qui vous arrangent.",
      "Pour les commerces et les professionnels à Toulouse, un lavage de vitres régulier est essentiel à l'image de votre enseigne. Nous intervenons tôt le matin, en dehors des heures d'ouverture ou le week-end pour ne pas perturber votre activité. Les restaurants, agences immobilières, salons et boutiques font partie de nos clients réguliers dans l'agglomération toulousaine.",
      "Nous utilisons la raclette professionnelle et l'eau osmosée sur les surfaces calcaires pour un résultat vitres sans traces garanti. Nettoyeur vitre, lavage de vitres ou nettoyage des vitres à domicile : nos techniciens interviennent avec le matériel adapté pour un résultat nettoyage vitres sans traces, même sur les grandes baies vitrées et les vitrines de commerces. Encadrements, rails et appuis de fenêtres sont inclus dans chaque prestation — aucun détail n'est laissé de côté.",
      "Clean&Fresh intervient dans toute l'agglomération toulousaine et en Haute-Garonne — Blagnac, Colomiers, Tournefeuille, Balma, Muret, Ramonville-Saint-Agne, Labège, Portet-sur-Garonne, Castelginest et l'ensemble des communes du 31. Contactez-nous pour un devis gratuit adapté à votre surface et à votre fréquence d'entretien.",
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
    priceNote: "Sur devis — tarif dégressif pour les contrats d'entretien réguliers.",
    method: [
      "Repérage des vitrages et des accès.",
      "Lavage à la raclette professionnelle et eau osmosée si nécessaire.",
      "Nettoyage des encadrements, rails et rebords.",
      "Contrôle final anti-traces.",
    ],
    faq: [
      { q: "Faites-vous le nettoyage de vitres pour les particuliers et les professionnels ?", a: "Oui, nous intervenons chez les particuliers (maisons, appartements) comme chez les professionnels (vitrines de commerces, bureaux, restaurants). Intervention ponctuelle ou contrat d'entretien régulier." },
      { q: "Quel est le tarif pour le nettoyage de vitres à Toulouse ?", a: "Le tarif est calculé sur devis selon la surface vitrée et la fréquence. Un tarif dégressif est appliqué pour les contrats d'entretien régulier. Contactez-nous pour une estimation gratuite sous 24h." },
      { q: "Nettoyez-vous les encadrements, rails et rebords de fenêtres ?", a: "Oui, notre prestation comprend systématiquement le nettoyage des encadrements, rails et rebords. Le résultat est impeccable sur toute la menuiserie." },
      { q: "Pouvez-vous intervenir en dehors des heures d'ouverture pour les commerces ?", a: "Oui, nous nous adaptons à vos horaires, y compris tôt le matin, le soir ou le week-end pour éviter les perturbations de votre activité." },
      { q: "Dans quelles villes autour de Toulouse intervenez-vous pour le nettoyage de vitres ?", a: "Nous couvrons toute l'agglomération toulousaine et la Haute-Garonne : Colomiers, Tournefeuille, Blagnac, Cugnaux, Balma, Ramonville, Muret, Castanet-Tolosan, L'Union et plus de 30 autres communes du 31." },
    ],
  },
  {
    slug: "/nettoyage-terrasse-toulouse",
    navLabel: "Nettoyage terrasse Toulouse",
    h1: "Nettoyage de terrasse à Toulouse",
    short: "Nettoyage terrasse Toulouse",
    subtitle:
      "Dalles, béton, carrelage extérieur et bois : nettoyage haute pression de votre terrasse à Toulouse.",
    metaTitle: "Nettoyage Terrasse Toulouse — Haute pression, dalles & bois | Clean&Fresh",
    metaDescription:
      "Nettoyage de terrasse à haute pression à Toulouse. Dalles, béton, carrelage, bois. Mousse et salissures éliminées. Traitement anti-mousse inclus. Devis gratuit sous 24h.",
    group: "batiment",
    intro: [
      "Mousses, lichens et noircissement rendent votre terrasse glissante et terne. Notre service de nettoyage de terrasse à Toulouse intervient au nettoyeur haute pression, avec un réglage adapté à chaque support pour ne pas l'endommager.",
      "Une intervention idéale avant l'été ou après l'hiver, pour retrouver un extérieur net, sécurisé et esthétique. Nous appliquons si nécessaire un traitement anti-mousse préventif pour prolonger l'effet dans le temps.",
      "Le nettoyage de terrasse à Toulouse se fait idéalement au printemps avant la saison estivale, ou à l'automne après les pluies et les chutes de feuilles. Un entretien régulier évite l'encrassement profond des joints et réduit les risques de glissade sur les dalles humides. Nous adaptons la pression du nettoyeur selon la nature du revêtement : forte pression pour le béton et la pierre, pression modérée pour le bois et le carrelage extérieur.",
      "Après le nettoyage haute pression, nous appliquons un traitement anti-mousse préventif qui protège votre terrasse contre le retour des mousses et lichens pendant plusieurs saisons. Pour les dalles en pierre naturelle ou les terrasses bois, un traitement hydrofuge peut être envisagé pour une protection optimale contre les intempéries.",
      "Nous intervenons à Toulouse et dans toute la Haute-Garonne — dalles, pavés, béton désactivé, carrelage extérieur, bois et composite. Devis gratuit selon la surface et l'état du support, réponse sous 24h.",
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
      "Protection des abords et des plantations.",
      "Application d'un traitement anti-mousse si nécessaire.",
      "Nettoyage haute pression à réglage adapté au support.",
      "Rinçage complet et évacuation des résidus.",
    ],
    faq: [
      { q: "Quel est le prix d'un nettoyage de terrasse à Toulouse ?", a: "Le tarif est calculé sur devis selon la surface, le type de revêtement et l'état de la terrasse. Contactez-nous pour une estimation gratuite, réponse sous 24h." },
      { q: "Nettoyez-vous tous les types de terrasse ?", a: "Oui : dalles en pierre, béton, béton désactivé, carrelage extérieur et terrasses en bois naturel ou composite. Nous ajustons la pression en fonction du support pour ne pas l'endommager." },
      { q: "Le traitement anti-mousse est-il inclus dans le nettoyage de terrasse ?", a: "Nous l'appliquons si nécessaire après le nettoyage haute pression. Il protège votre terrasse contre le retour des mousses et lichens pendant plusieurs saisons." },
      { q: "Quand faut-il nettoyer sa terrasse à Toulouse ?", a: "Idéalement au printemps avant la saison estivale et à l'automne après les pluies. Un nettoyage régulier évite l'encrassement profond et réduit le risque de glissade." },
      { q: "Intervenez-vous dans toute l'agglomération toulousaine pour le nettoyage de terrasse ?", a: "Oui, nous couvrons Toulouse et toutes les communes du 31 : Muret, Cugnaux, Colomiers, Tournefeuille, Plaisance-du-Touch, Villeneuve-Tolosane, Portet-sur-Garonne et bien d'autres." },
    ],
  },
  {
    slug: "/nettoyage-toiture-toulouse",
    navLabel: "Nettoyage toiture Toulouse",
    h1: "Nettoyage de toiture à Toulouse",
    short: "Nettoyage toiture Toulouse",
    subtitle:
      "Démoussage et nettoyage haute pression de votre toiture à Toulouse et en Haute-Garonne.",
    metaTitle: "Nettoyage Toiture Toulouse — Démoussage haute pression | Clean&Fresh",
    metaDescription:
      "Démoussage et nettoyage de toiture à Toulouse. Tuiles, ardoises, gouttières. Traitement anti-mousse durable inclus. Devis gratuit sur photos sous 24h.",
    group: "batiment",
    intro: [
      "La mousse retient l'humidité, fragilise les tuiles et bouche les gouttières. Un démoussage régulier prolonge la durée de vie de votre toiture et évite des réparations coûteuses. Notre service de nettoyage toiture à Toulouse intervient en toute sécurité avec du matériel professionnel.",
      "Après le nettoyage haute pression, nous appliquons un traitement anti-mousse préventif pour protéger votre couverture plusieurs années. Tuiles terre cuite, béton ou ardoises : nous adaptons notre intervention à chaque support.",
      "Un démoussage de toiture tous les 3 à 5 ans est généralement recommandé à Toulouse et en Haute-Garonne, où le climat humide favorise le développement des mousses et lichens. Une toiture encrassée retient l'humidité qui s'infiltre sous les tuiles, accélère leur vieillissement et peut provoquer des infiltrations coûteuses. Intervenir en prévention coûte bien moins cher qu'une réparation de charpente.",
      "Notre équipe intervient en sécurité totale avec les équipements de protection individuelle et les harnais adaptés. Nous contrôlons l'état de la couverture avant l'intervention et signalons toute tuile cassée ou gouttière obstruée. Le démoussage est suivi d'un rinçage complet et de l'évacuation des déchets verts.",
      "Clean&Fresh se déplace à Toulouse et dans tout le département 31 pour le nettoyage et le démoussage de toitures. Devis gratuit après envoi de photos ou visite sur place, réponse sous 24h.",
    ],
    treated: [
      "Tuiles terre cuite et béton",
      "Ardoises",
      "Toitures de garages et dépendances",
      "Gouttières et descentes d'eau",
    ],
    problems: [
      "Mousses et lichens",
      "Gouttières obstruées",
      "Infiltrations liées à l'humidité",
      "Tuiles noircies",
    ],
    priceNote: "Sur devis après visite ou photos — réponse sous 24h.",
    method: [
      "Inspection de la couverture et repérage des points fragiles.",
      "Nettoyage haute pression maîtrisé, du faîtage vers l'égout.",
      "Application d'un traitement anti-mousse préventif.",
      "Dégagement des gouttières et évacuation des déchets.",
    ],
    faq: [
      { q: "Quel est le prix d'un nettoyage de toiture à Toulouse ?", a: "Le tarif est calculé sur devis après envoi de photos ou visite, selon la surface, la pente et l'état de la toiture. Devis gratuit, réponse sous 24h." },
      { q: "À quelle fréquence faut-il nettoyer sa toiture ?", a: "Un démoussage tous les 3 à 5 ans est généralement recommandé, plus souvent si votre toiture est exposée à l'humidité ou entourée d'arbres. Le traitement anti-mousse appliqué après le nettoyage prolonge la durée de protection." },
      { q: "Le nettoyage haute pression endommage-t-il les tuiles ?", a: "Non, nous utilisons une pression adaptée à chaque type de couverture. Les tuiles, ardoises et gouttières sont préservées. Un contrôle visuel est effectué avant et après l'intervention." },
      { q: "Le traitement anti-mousse est-il dangereux pour le jardin ?", a: "Nous utilisons des produits respectueux de l'environnement et protégeons vos plantations avant l'intervention. Les produits sont appliqués selon les règles de l'art." },
      { q: "Intervenez-vous sur les toitures en Haute-Garonne ?", a: "Oui, nous couvrons Toulouse et tout le département 31 : Blagnac, Colomiers, Tournefeuille, Balma, Muret, Cugnaux, Ramonville, Castanet-Tolosan et toutes les communes alentours." },
    ],
  },
  {
    slug: "/nettoyage-facade-toulouse",
    navLabel: "Nettoyage façade Toulouse",
    h1: "Nettoyage de façade à Toulouse",
    short: "Nettoyage façade Toulouse",
    subtitle:
      "Façades de maisons et d'immeubles nettoyées en profondeur, à Toulouse et dans l'agglomération.",
    metaTitle: "Nettoyage Façade Toulouse — Maisons & copropriétés | Clean&Fresh",
    metaDescription:
      "Nettoyage de façade à Toulouse : crépi, enduit, brique, béton. Élimination mousses, pollution et traces noires. Traitement hydrofuge en option. Devis gratuit sous 24h.",
    group: "batiment",
    intro: [
      "Pollution, mousses et coulures noircissent les façades toulousaines au fil des années. Notre service de nettoyage de façade à Toulouse redonne leur teinte d'origine aux murs sans travaux lourds ni ravalement complet.",
      "Nous adaptons la pression et les produits à votre support — crépi, brique, pierre ou béton — pour préserver l'enduit et les joints. Un traitement anti-mousse est appliqué en fin d'intervention pour une protection durable.",
      "Le nettoyage de façade à Toulouse est souvent envisagé avant une mise en vente d'un bien immobilier, pour une remise en état de copropriété ou simplement pour redonner de l'éclat à un bâtiment vieillissant. Une façade propre valorise immédiatement le bien et améliore l'image du quartier. Nous travaillons régulièrement avec des syndics de copropriété, des agences immobilières et des propriétaires privés de Toulouse et de l'agglomération.",
      "Avant toute intervention, nous réalisons un test sur une zone témoin pour valider la compatibilité du traitement avec votre support. Les menuiseries, plantations et abords sont protégés avant le début du chantier. Un traitement hydrofuge peut être appliqué en option pour repousser l'eau et retarder l'encrassement sur plusieurs années.",
      "Particuliers, syndics de copropriété et professionnels : nous intervenons sur tous types de bâtiments à Toulouse et en Haute-Garonne. Devis gratuit selon la surface, la hauteur et la nature du support.",
    ],
    treated: [
      "Crépi et enduit",
      "Brique foraine et pierre",
      "Béton et bardage",
      "Murs de clôture et piliers",
      "Immeubles et copropriétés",
    ],
    problems: [
      "Traces noires de pollution",
      "Mousses et végétation",
      "Coulures et salissures de pluie",
      "Graffitis (sur devis)",
    ],
    priceNote: "Sur devis selon la surface, la hauteur et le support.",
    method: [
      "Diagnostic du support et test sur une zone témoin.",
      "Protection des menuiseries et plantations.",
      "Nettoyage haute pression ou basse pression selon la fragilité.",
      "Traitement anti-mousse et rinçage final.",
    ],
    faq: [
      { q: "Combien coûte un nettoyage de façade à Toulouse ?", a: "Le tarif est calculé sur devis selon la surface, la hauteur et le type de support. Envoyez-nous des photos pour une estimation gratuite sous 24h." },
      { q: "Quelle est la différence entre nettoyage haute et basse pression pour une façade ?", a: "La haute pression convient aux supports durs (béton, dallage). La basse pression est préférée pour les matériaux fragiles comme le crépi, l'enduit ou la brique afin d'éviter toute dégradation." },
      { q: "Combien de temps dure l'effet du nettoyage de façade ?", a: "Avec un traitement hydrofuge et anti-mousse, l'effet protecteur dure de 3 à 7 ans selon le type de façade et l'exposition. Sans traitement, comptez 1 à 3 ans." },
      { q: "Faites-vous les copropriétés et les immeubles à Toulouse ?", a: "Oui, nous travaillons avec des syndics de copropriété et des gestionnaires immobiliers pour le nettoyage de façades d'immeubles à Toulouse et dans l'agglomération." },
      { q: "Intervenez-vous pour les particuliers et les professionnels ?", a: "Oui, pour toutes les typologies : maisons individuelles, immeubles, commerces et bâtiments tertiaires. Contactez-nous pour un devis adapté à votre projet." },
    ],
  },
  {
    slug: "/nettoyage-dappartement-ou-maison",
    navLabel: "Nettoyage d'appartement ou maison Toulouse",
    h1: "Nettoyage d'appartement ou de maison à Toulouse",
    short: "Nettoyage Appartement / maison Toulouse",
    subtitle:
      "Grand ménage ponctuel ou entretien régulier de votre logement, à Toulouse et dans toute l'agglomération.",
    metaTitle: "Nettoyage Appartement ou Maison Toulouse — Grand ménage | Clean&Fresh",
    metaDescription:
      "Nettoyage complet d'appartement ou maison à Toulouse : grand ménage, entre deux locataires, après déménagement. Produits Écolabel. Devis gratuit sous 24h.",
    group: "batiment",
    intro: [
      "Grand ménage de printemps, remise en état avant l'entrée d'un locataire, nettoyage après déménagement ou entretien régulier : notre service de nettoyage d'appartement et de maison à Toulouse prend en charge l'ensemble du logement.",
      "Produits certifiés Écolabel, matériel professionnel et une équipe qui traite chaque pièce dans le détail — cuisine, salle de bain, sols, vitres, plinthes. Aucun angle mort, résultat soigné.",
      "Le grand ménage ponctuel est idéal pour les situations qui dépassent l'entretien courant : logement laissé sale par un précédent locataire, maison après un déménagement, nettoyage avant ou après une fête, ménage de printemps complet. Nous intervenons aussi pour les particuliers qui manquent de temps et souhaitent déléguer l'entretien régulier de leur logement à une équipe professionnelle.",
      "Pour les professionnels, nous proposons le nettoyage de bureaux, de salles de réunion, de locaux commerciaux et d'espaces de coworking à Toulouse. Le nettoyage de locaux professionnels comprend le nettoyage des sols — carrelage, parquet, lino — ainsi que le nettoyage des surfaces de travail, sanitaires et vitrages intérieurs. Nos équipes interviennent en dehors de vos heures d'activité pour ne pas perturber votre organisation. Contrats d'entretien hebdomadaire ou mensuel disponibles avec tarif dégressif.",
      "Nous intervenons sur Toulouse et toute l'agglomération — Blagnac, Colomiers, Tournefeuille, Ramonville, Balma, Muret, Cugnaux, Castanet-Tolosan, Plaisance-du-Touch, Labège, Portet-sur-Garonne et alentours. Devis gratuit selon la surface et le niveau de prestation, ponctuel ou récurrent.",
    ],
    treated: [
      "Cuisine : plans de travail, électroménager, hotte, placards",
      "Salle de bain et WC : détartrage complet",
      "Sols, plinthes, portes et interrupteurs",
      "Vitres intérieures et menuiseries",
      "Locaux professionnels et bureaux",
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
      { q: "Quel est le prix d'un nettoyage d'appartement à Toulouse ?", a: "Le tarif est calculé sur devis selon la surface, le nombre de pièces et le niveau de prestation. Nous proposons des prestations ponctuelles et des formules d'entretien régulier. Devis gratuit sous 24h." },
      { q: "Faut-il vider le logement avant votre intervention ?", a: "Non, pas nécessairement. Nous travaillons autour du mobilier en place. Pour un grand ménage très complet, nous recommandons de dégager les plans de travail et les sols pour un accès facilité." },
      { q: "Pouvez-vous intervenir entre deux locataires ?", a: "Oui, c'est l'une de nos prestations phares. Nous remettons le logement en état entre deux locations : cuisine dégraissée, salle de bain détartrée, sols nettoyés, vitres impeccables." },
      { q: "Quels produits utilisez-vous pour le nettoyage des appartements ?", a: "Des produits certifiés Écolabel européen : certifiés Écolabel européen et utilisés conformément aux recommandations du fabricant. Efficaces sur les graisses, le calcaire, les moisissures et les bactéries." },
      { q: "Intervenez-vous le week-end pour le ménage à Toulouse ?", a: "Oui, nous sommes disponibles en semaine et le week-end selon les créneaux. Contactez-nous pour vérifier les disponibilités et réserver votre intervention." },
    ],
  },
  {
    slug: "/nettoyage-de-fin-de-chantier-toulouse",
    navLabel: "Nettoyage de fin de chantier Toulouse",
    h1: "Nettoyage de fin de chantier à Toulouse",
    short: "Nettoyage Fin de chantier Toulouse",
    subtitle:
      "Poussières, résidus et traces de peinture éliminés après vos travaux, à Toulouse et en Haute-Garonne.",
    metaTitle: "Nettoyage Fin de Chantier Toulouse — Livraison clé en main | Clean&Fresh",
    metaDescription:
      "Nettoyage après travaux à Toulouse : poussières, résidus de peinture, vitres. Particuliers et professionnels. Livraison prête sous 24-48h. Devis gratuit rapide.",
    group: "batiment",
    intro: [
      "Après des travaux, la poussière de plâtre s'infiltre partout et les résidus de colle ou de peinture s'incrustent sur les sols et les vitres. Notre service de nettoyage fin de chantier à Toulouse livre un chantier prêt à l'emménagement.",
      "Nous travaillons avec des particuliers, des artisans, des architectes et des promoteurs avec des délais courts et une équipe rigoureuse. Sols décapés, vitres nettoyées, traces de peinture et de colle retirées — chaque détail est traité.",
      "Le nettoyage de fin de chantier à Toulouse est une prestation spécialisée qui ne s'improvise pas. La poussière de ponçage et de plâtre est ultrafine et se dépose sur toutes les surfaces horizontales, dans les rails de fenêtres, derrière les radiateurs et à l'intérieur des placards. Notre équipe utilise des aspirateurs industriels à filtration HEPA et des produits décapants adaptés à chaque type de sol pour un résultat impeccable.",
      "Nous intervenons après tous types de travaux : rénovation complète, pose de carrelage, peinture, plâtrerie, création de salle de bain ou de cuisine. Les promoteurs immobiliers, les agences de construction et les architectes d'intérieur de Toulouse font régulièrement appel à nos services pour la livraison de leurs chantiers dans les délais.",
      "Intervention rapide sur Toulouse et dans tout le département 31. Devis gratuit selon la surface et l'ampleur des travaux, réponse sous 24h.",
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
    priceNote: "Sur devis selon la surface et l'ampleur du chantier — intervention rapide.",
    method: [
      "Évacuation des derniers déchets légers.",
      "Dépoussiérage complet du haut vers le bas.",
      "Décapage des sols et retrait des traces de peinture et colle.",
      "Nettoyage des vitres et finition avant livraison.",
    ],
    faq: [
      { q: "Quel est le prix d'un nettoyage fin de chantier à Toulouse ?", a: "Le tarif est établi sur devis selon la surface du chantier, l'ampleur des saletés et les surfaces à traiter. Réponse gratuite sous 24h." },
      { q: "Intervenez-vous en urgence après des travaux ?", a: "Oui, nous pouvons intervenir rapidement sur Toulouse et le 31, souvent sous 24 à 48h selon nos disponibilités. Contactez-nous avec les détails du chantier pour un planning accéléré." },
      { q: "Nettoyez-vous après tous types de travaux ?", a: "Oui : peinture, carrelage, rénovation complète, ponçage, plâtrerie, pose de cuisine ou salle de bain. Nous traitons les poussières fines, les traces de peinture et les résidus de colle." },
      { q: "Faut-il que le chantier soit terminé avant votre intervention ?", a: "Oui, nous intervenons quand tous les artisans ont terminé. Le local doit être chauffé et électrifié pour permettre l'utilisation de notre matériel." },
      { q: "Travaillez-vous pour les professionnels du bâtiment à Toulouse ?", a: "Oui, nous collaborons avec des artisans, architectes, promoteurs et maîtres d'ouvrage. Facturation professionnelle, délais respectés, rapport qualité-prix compétitif." },
    ],
  },
  {
    slug: "/nettoyage-fin-de-bail-toulouse",
    navLabel: "Nettoyage fin de bail Toulouse",
    h1: "Nettoyage fin de bail à Toulouse",
    short: "Nettoyage Fin de bail Toulouse",
    subtitle:
      "Remise en état complète de votre logement pour l'état des lieux de sortie, à Toulouse et en Haute-Garonne.",
    metaTitle: "Nettoyage Fin de Bail Toulouse — Récupérez votre caution | Clean&Fresh",
    metaDescription:
      "Nettoyage de fin de bail à Toulouse pour récupérer votre dépôt de garantie. Remise en état complète, état des lieux de sortie. Intervention rapide. Devis sous 24h.",
    group: "batiment",
    intro: [
      "Vous quittez votre logement et voulez récupérer votre dépôt de garantie intégralement ? Notre service de nettoyage fin de bail à Toulouse prend en charge la remise en état complète avant l'état des lieux de sortie : cuisine, salle de bain, sols, vitres et parties communes.",
      "Une prestation rigoureuse, conforme aux exigences des agences immobilières et des propriétaires à Toulouse. Nous connaissons les points de contrôle des états des lieux et ne laissons aucun détail au hasard.",
      "Le nettoyage avant état des lieux de sortie à Toulouse est un investissement qui se justifie financièrement : le coût d'une prestation professionnelle est généralement inférieur aux retenues effectuées sur le dépôt de garantie pour un logement non rendu propre. Les agences immobilières et les propriétaires sont de plus en plus exigeants sur l'état de propreté lors des sorties de bail.",
      "Nos équipes connaissent précisément les points vérifiés lors d'un état des lieux : calcaire dans les robinets et les joints, graisses sur la hotte et le four, traces sur les murs et les portes, rails de fenêtres, joints de salle de bain, propreté de la baignoire et des WC. Chaque élément est traité selon les standards professionnels attendus par les agences immobilières de Toulouse.",
      "Intervention disponible sous 48h sur Toulouse et dans toute la Haute-Garonne. Devis gratuit sur photos ou visite — tarif selon la surface et l'état du logement.",
    ],
    treated: [
      "Cuisine : dégraissage complet, hotte, four, réfrigérateur",
      "Salle de bain et WC : détartrage, joints, carrelage",
      "Sols et plinthes : carrelage, parquet, moquette",
      "Vitres et menuiseries intérieures",
      "Murs et portes : retrait des marques et traces",
    ],
    problems: [
      "Dépôt de garantie en jeu",
      "Cuisine et salle de bain incrustées",
      "Sols tachés ou rayés",
      "Logement encrassé après plusieurs années",
    ],
    priceNote: "Sur devis selon la surface et l'état du logement — intervention disponible sous 48h.",
    method: [
      "Visite ou photos pour évaluation précise.",
      "Nettoyage pièce par pièce, du plafond au sol.",
      "Détartrage, dégraissage et désinfection des zones sensibles.",
      "Contrôle qualité final, prêt pour l'état des lieux.",
    ],
    faq: [
      { q: "Quel est le prix d'un nettoyage fin de bail à Toulouse ?", a: "Le tarif est calculé sur devis selon la surface, le nombre de pièces et l'état du logement. Nous vous répondons gratuitement sous 24h sur la base de photos ou d'une visite." },
      { q: "Que comprend un nettoyage avant état des lieux à Toulouse ?", a: "Notre prestation couvre l'ensemble du logement : dégraissage complet de la cuisine (hotte, four, réfrigérateur), détartrage de la salle de bain, nettoyage des sols, vitres, plinthes, portes et murs. Chaque point de contrôle d'un état des lieux est traité." },
      { q: "Puis-je récupérer mon dépôt de garantie grâce à votre intervention ?", a: "Nous effectuons un nettoyage professionnel et rigoureux conforme aux attentes des agences et propriétaires. Le résultat met toutes les chances de votre côté pour l'état des lieux, mais nous ne pouvons pas garantir la décision du bailleur." },
      { q: "Combien de temps dure un nettoyage fin de bail ?", a: "De 3 à 8 heures selon la surface et l'état du logement. Nous pouvons intervenir la veille de l'état des lieux si le logement est libéré." },
      { q: "Intervenez-vous dans toute l'agglomération toulousaine pour le nettoyage fin de bail ?", a: "Oui, nous couvrons Toulouse et toutes les communes du 31 : Colomiers, Blagnac, Tournefeuille, Muret, Cugnaux, Balma, Castanet-Tolosan, L'Union, Ramonville et bien d'autres." },
    ],
  },
  {
    slug: "/nettoyage-diogene-toulouse",
    navLabel: "Nettoyage Diogène Toulouse",
    h1: "Nettoyage Diogène à Toulouse",
    short: "Nettoyage Syndrome de Diogène Toulouse",
    subtitle:
      "Désencombrement, débarras et remise en état de logements en syndrome de Diogène, à Toulouse et en Haute-Garonne.",
    metaTitle: "Nettoyage Syndrome de Diogène Toulouse — Discret & rapide | Clean&Fresh",
    metaDescription:
      "Spécialiste du nettoyage de logements Diogène à Toulouse. Débarras, désinfection et remise en état avec discrétion et bienveillance. Devis confidentiel sous 24h.",
    group: "batiment",
    intro: [
      "Le syndrome de Diogène se caractérise par une accumulation extrême d'objets et de déchets dans un logement. Notre service de nettoyage Diogène à Toulouse intervient avec discrétion, sans jugement, pour désencombrer, nettoyer et remettre le logement en état habitable.",
      "Notre équipe, équipée en protection individuelle, prend en charge le tri, l'évacuation et la désinfection complète — du sol au plafond. Nous travaillons en coordination avec les familles, les services sociaux ou les notaires pour les successions.",
      "Le nettoyage d'un logement en syndrome de Diogène nécessite une expertise spécifique. Les risques sanitaires sont réels : moisissures, insectes, rongeurs, odeurs très fortes. Nos intervenants sont formés et équipés en conséquence. Nous collaborons régulièrement avec des assistantes sociales, des tuteurs légaux, des curateurs et des notaires dans le cadre de successions ou de remises en état de logements sociaux à Toulouse et dans le 31.",
      "Une fois l'évacuation terminée, le logement est entièrement nettoyé et désinfecté : sols, murs, plafonds, sanitaires, cuisine. Un traitement des odeurs par neutralisation moléculaire est systématiquement réalisé pour permettre la réoccupation ou la mise en location du bien dans les meilleures conditions.",
      "Intervention confidentielle et rapide à Toulouse et dans tout le 31. Devis sur photos ou visite, réponse sous 24h.",
    ],
    treated: [
      "Logements en accumulation extrême",
      "Appartements et maisons insalubres",
      "Débarras complet et évacuation des encombrants",
      "Désinfection et traitement des odeurs",
      "Remise en état avant vente, location ou succession",
    ],
    problems: [
      "Accumulation massive de déchets et d'objets",
      "Odeurs très fortes et persistantes",
      "Moisissures, humidité et risque sanitaire",
      "Présence de nuisibles",
    ],
    priceNote: "Sur devis confidentiel après évaluation — intervention rapide et discrète.",
    method: [
      "Évaluation confidentielle sur place ou par photos.",
      "Tri, débarras et évacuation en filière adaptée.",
      "Nettoyage complet en profondeur, sols, murs et sanitaires.",
      "Désinfection, traitement des odeurs et assainissement de l'air.",
    ],
    faq: [
      { q: "Intervenez-vous pour le syndrome de Diogène à Toulouse ?", a: "Oui, c'est l'une de nos spécialités. Nous intervenons avec discrétion et sans jugement pour le tri, le débarras et la remise en état complète des logements en syndrome de Diogène." },
      { q: "Comment se déroule une intervention Diogène ?", a: "Après une évaluation confidentielle (sur photos ou visite), nous établissons un devis précis. L'équipe intervient équipée en protection individuelle : tri des objets, évacuation des déchets, nettoyage en profondeur et désinfection complète." },
      { q: "Travaillez-vous avec les familles, tutelles et services sociaux ?", a: "Oui, nous collaborons régulièrement avec des familles, des tuteurs, des curateurs, des assistantes sociales et des agences immobilières pour les situations complexes ou les successions." },
      { q: "La prestation Diogène est-elle confidentielle ?", a: "Absolument. Nous intervenons avec discrétion et ne communiquons aucune information sur nos clients ou les situations traitées. La confidentialité fait partie de notre engagement." },
      { q: "Quel est le prix d'une intervention Diogène à Toulouse ?", a: "Le tarif est établi sur devis confidentiel après évaluation. Il dépend du volume à évacuer, de la surface et de l'état du logement. Contactez-nous pour un échange sans engagement." },
    ],
  },
  {
    slug: "/nettoyage-extreme-toulouse",
    navLabel: "Nettoyage extrême Toulouse",
    h1: "Nettoyage extrême à Toulouse",
    short: "Nettoyage extrême Toulouse",
    subtitle:
      "Intervention lourde sur logement très dégradé, insalubre ou encombré, à Toulouse et alentours.",
    metaTitle: "Nettoyage Extrême Toulouse — Logement insalubre, discret | Clean&Fresh",
    metaDescription:
      "Nettoyage extrême à Toulouse : logement insalubre, squatté ou abandonné. Débarras, désinfection complète. Intervention rapide, discrète et sans jugement. Devis sous 24h.",
    group: "batiment",
    intro: [
      "Logement très encombré, insalubre ou laissé à l'abandon : notre service de nettoyage extrême à Toulouse prend en charge les situations que personne ne veut traiter, avec discrétion et sans jugement.",
      "Équipe équipée en protection individuelle, débarras complet, nettoyage en profondeur et désinfection approfondie du logement — sols, murs, sanitaires, pièces encombrées. Nous évacuons les déchets en filière adaptée et réglementée.",
      "Le nettoyage extrême concerne les logements dont l'état dépasse largement ce qu'un nettoyage classique peut prendre en charge : logement squatté, appartement abandonné pendant plusieurs années, habitation insalubre suite à un sinistre ou à une situation de grande précarité. Notre équipe est formée à ces interventions lourdes et dispose du matériel adapté : combinaisons de protection, masques, aspirateurs industriels et produits désinfectants professionnels.",
      "Nous intervenons pour des bailleurs sociaux, des agences immobilières, des syndics de copropriété, des particuliers et des notaires dans le cadre de successions. Chaque intervention est traitée avec le même niveau de discrétion et de professionnalisme, quelle que soit la situation. L'évacuation des encombrants se fait en filière réglementée, avec document de traçabilité si nécessaire.",
      "Nous intervenons rapidement à Toulouse et dans tout le département 31. Évaluation confidentielle sur photos ou sur place, devis sous 24h.",
    ],
    treated: [
      "Logements en syndrome de Diogène",
      "Appartements insalubres ou squattés",
      "Débarras et évacuation d'encombrants",
      "Désinfection et traitement des odeurs",
      "Remise en état avant vente ou location",
    ],
    problems: [
      "Accumulation extrême de déchets",
      "Moisissures et humidité",
      "Odeurs très fortes et persistantes",
      "Risque sanitaire et nuisibles",
    ],
    priceNote: "Sur devis après évaluation confidentielle — intervention rapide et discrète.",
    method: [
      "Évaluation confidentielle sur place ou par photos.",
      "Tri, débarras et évacuation en filière adaptée.",
      "Nettoyage complet en profondeur, sols, murs et sanitaires.",
      "Désinfection, traitement des odeurs et assainissement de l'air.",
    ],
    faq: [
      { q: "Faites-vous les logements très insalubres à Toulouse ?", a: "Oui, c'est notre cœur de métier pour le nettoyage extrême. Nous intervenons sur les logements très dégradés, insalubres, encombrés ou laissés à l'abandon, avec le matériel et les protections adaptés." },
      { q: "Intervenez-vous après un squat ou une expulsion ?", a: "Oui, nous remettons en état les logements après squat, expulsion ou abandon. Nous évacuons les encombrants, nettoyons en profondeur et désinfectons l'ensemble du logement." },
      { q: "Comment évaluer le coût d'un nettoyage extrême ?", a: "Envoyez-nous des photos ou demandez une visite sur place pour une évaluation confidentielle. Le tarif dépend du volume à traiter, de la surface et de l'état du logement. Devis sous 24h." },
      { q: "Travaillez-vous pour des bailleurs sociaux et des agences immobilières ?", a: "Oui, nous collaborons avec des bailleurs sociaux, des agences immobilières, des syndics et des propriétaires privés pour la remise en état de logements très dégradés." },
      { q: "L'intervention de nettoyage extrême est-elle discrète ?", a: "Oui, nos équipes interviennent en tenue professionnelle sobre et sans signalétique visible. Nous respectons la confidentialité des situations traitées et travaillons avec efficacité et discrétion." },
    ],
  },
  {
    slug: "/nettoyage-moquette-toulouse",
    navLabel: "Nettoyage moquette Toulouse",
    h1: "Nettoyage moquette à Toulouse",
    short: "Nettoyage moquette Toulouse",
    subtitle:
      "Shampouinage et nettoyage en profondeur de moquettes et sols textiles à domicile à Toulouse et dans toute la Haute-Garonne.",
    metaTitle: "Nettoyage Moquette Toulouse — Shampouinage professionnel | Clean&Fresh",
    metaDescription:
      "Nettoyage de moquette à domicile à Toulouse : injection-extraction, taches, odeurs et acariens éliminés. Particuliers et professionnels. Devis gratuit sous 24h.",
    group: "textile",
    booking: false,
    intro: [
      "Votre moquette accumule poussières, allergènes, taches et mauvaises odeurs au fil du temps. Notre service de nettoyage moquette à Toulouse intervient directement chez vous, sans déplacer les meubles, pour un shampouinage professionnel en profondeur.",
      "La méthode injection-extraction que nous utilisons injecte une solution nettoyante dans les fibres de la moquette, puis l'aspire avec les salissures et l'eau. Résultat : une moquette assainie, sans résidu, qui sèche en 2 à 5 heures selon l'épaisseur. Cette technique est bien plus efficace qu'un simple aspirateur ou qu'un nettoyeur vapeur — elle élimine ce qui est incrusté en profondeur.",
      "Nous traitons tous les types de moquettes : velours ras, bouclé, sisal, en rouleau ou en dalles, pour les particuliers comme pour les professionnels. Taches anciennes de café, de vin, d'urine ou de graisse, odeurs incrustées, acariens : notre équipement professionnel prend en charge les cas que les produits du commerce ne peuvent pas traiter.",
      "Pour les professionnels à Toulouse — bureaux, hôtels, cabinets, commerces — nous proposons des contrats d'entretien régulier à tarif dégressif, en dehors des horaires d'activité. Chaque intervention est réalisée avec des produits certifiés Écolabel, sans danger pour vos occupants ni pour l'environnement.",
      "Si vous cherchez une shampouineuse moquette à louer ou un nettoyeur moquette, notre prestation par injecteur extracteur donne des résultats bien supérieurs à ceux d'une shampouineuse moquette professionnelle standard. L'injection-extraction extrait réellement les salissures incrustées dans les fibres — résultat net et fibres assainies en profondeur.",
      "Clean&Fresh intervient sur les moquettes de toute l'agglomération toulousaine et du département 31 — Blagnac, Colomiers, Tournefeuille, Muret, Balma, Cugnaux, Labège, Castelginest et l'ensemble des communes du 31. Contactez-nous pour un devis gratuit sous 24h.",
    ],
    treated: [
      "Moquettes velours ras et bouclées",
      "Moquettes en dalles (bureaux, commerces)",
      "Sols textiles en sisal et fibres naturelles",
      "Moquettes en rouleau toutes surfaces",
    ],
    problems: [
      "Taches incrustées de café, vin, urine",
      "Odeurs persistantes et renfermées",
      "Acariens et allergènes dans les fibres",
      "Grisaille et ternissement par l'usage",
    ],
    prices: [
      { label: "Petite pièce (< 12 m²)", price: "59 €", items: ["Shampouinage injection-extraction", "Élimination des taches et auréoles", "Neutralisation des mauvaises odeurs", "Séchage en 2 à 5h"], formuleId: "tapis-1" },
      { label: "Pièce standard (12–20 m²)", price: "89 €", items: ["Shampouinage injection-extraction", "Élimination des taches et auréoles", "Neutralisation des mauvaises odeurs", "Séchage en 2 à 5h"], formuleId: "tapis-2" },
      { label: "Grande pièce (> 20 m²)", price: "120 €", items: ["Shampouinage injection-extraction", "Élimination des taches et auréoles", "Neutralisation des mauvaises odeurs", "Tarif dégressif grandes surfaces"], formuleId: "tapis-3" },
    ],
    priceNote: "Tarifs indicatifs pour moquettes standards. Surfaces atypiques ou très encrassées : devis sur photos, réponse sous 24h.",
    soils: ["Café et thé", "Vin et jus", "Urine", "Graisses", "Sable et boue"],
    method: [
      "Aspiration haute puissance pour retirer les salissures de surface.",
      "Détachage ciblé des zones les plus marquées avant shampouinage.",
      "Injection-extraction en profondeur sur l'ensemble de la surface.",
      "Neutralisation des odeurs et séchage accéléré.",
    ],
    faq: [
      { q: "Combien coûte un nettoyage de moquette à Toulouse ?", a: "Le tarif démarre à 59 € pour une petite pièce (moins de 12 m²), 89 € pour une pièce standard et 120 € pour une grande pièce. Devis gratuit sur photos, réponse sous 24h." },
      { q: "Combien de temps met une moquette à sécher après le nettoyage ?", a: "En général 2 à 5 heures selon l'épaisseur de la moquette et la ventilation de la pièce. Nous conseillons d'aérer la pièce ou d'activer le chauffage après l'intervention pour accélérer le séchage." },
      { q: "Peut-on enlever des taches anciennes de café ou de vin sur une moquette ?", a: "Oui, dans la majorité des cas. Notre technique d'injection-extraction et nos produits professionnels traitent efficacement les taches incrustées. Plus la tache est ancienne, plus le prétraitement est intensif — mais les résultats sont souvent remarquables, même sur des taches de plusieurs années." },
      { q: "Nettoyez-vous les moquettes de bureaux et de commerces à Toulouse ?", a: "Oui, nous intervenons pour les professionnels : bureaux, hôtels, cabinets médicaux, commerces. Nous proposons des contrats d'entretien régulier en dehors des heures d'activité, avec tarifs dégressifs pour les grandes surfaces." },
      { q: "Quelle différence entre un nettoyage vapeur et votre méthode injection-extraction ?", a: "La vapeur humidifie en surface sans vraiment extraire les salissures. L'injection-extraction injecte une solution nettoyante dans les fibres et l'aspire avec les saletés — résultat plus profond, fibres réellement nettoyées et séchage comparable." },
    ],
  },
  {
    slug: "/nettoyage-cuir-toulouse",
    navLabel: "Nettoyage cuir Toulouse",
    h1: "Nettoyage cuir professionnel à Toulouse – Canapé, fauteuil et sièges auto",
    short: "Nettoyage cuir Toulouse",
    subtitle:
      "Soin complet pour vos canapés, fauteuils et sièges auto en cuir. Nettoyage doux et traitement protecteur.",
    metaTitle: "Nettoyage cuir Toulouse | Canapé, fauteuil & sièges auto",
    metaDescription:
      "Nettoyage professionnel du cuir à Toulouse : canapé, fauteuil et sièges auto. Nettoyage doux, soin et protection du cuir à domicile.",
    group: "textile",
    booking: true,
    intro: [
      "Clean&Fresh réalise le nettoyage professionnel du cuir à Toulouse et en Haute-Garonne : canapés, fauteuils et sièges automobiles.",
      "Le cuir bénéficie d’un protocole spécifique avec nettoyage manuel doux, brosse adaptée et produit professionnel, sans injection-extraction sur le cuir véritable.",
      "Un traitement nourrissant et protecteur peut ensuite être appliqué en option afin de préserver la souplesse et l’aspect naturel du cuir.",
      "Nous adaptons nos techniques et produits professionnels (pH neutre) pour éliminer les salissures de surface et les traces de gras sans abîmer ou assécher la matière.",
    ],
    treated: [
      "Canapés et fauteuils en cuir véritable",
      "Sièges auto en cuir",
      "Simili-cuir et éco-cuir de qualité",
      "Chaises et poufs en cuir",
    ],
    problems: [
      "Cuir encrassé et terne",
      "Traces de transpiration et de gras",
      "Manque de souplesse",
      "Taches légères et salissures du quotidien",
    ],
    prices: [
      { label: "Fauteuil cuir", price: "49 €", items: ["Nettoyage manuel doux", "Brosse adaptée", "Séchage immédiat"], formuleId: "cuir-fauteuil" },
      { label: "Canapé cuir 2/3 places", price: "79 €", items: ["Nettoyage manuel doux", "Brosse adaptée", "Séchage immédiat"], formuleId: "cuir-canape-2" },
      { label: "Canapé cuir 4/5 places", price: "99 €", items: ["Nettoyage manuel doux", "Brosse adaptée", "Séchage immédiat"], formuleId: "cuir-canape-angle" },
      { label: "Canapé cuir d'angle", price: "99 €", items: ["Nettoyage manuel doux", "Brosse adaptée", "Séchage immédiat"], formuleId: "cuir-canape-angle" },
      { label: "Sièges auto cuir", price: "69 €", items: ["Nettoyage manuel doux", "Brosse adaptée", "Séchage immédiat"], formuleId: "cuir-auto" },
    ],
    priceNote:
      "Inclus : nettoyage manuel sans injection-extraction. Un traitement nourrissant et protecteur est fortement recommandé en option.",
    soils: [
      "Salissures incrustées",
      "Traces de stylo légères",
      "Résidus gras",
    ],
    method: [
      "Diagnostic du type de cuir (véritable, synthétique).",
      "Nettoyage manuel à l'aide de brosses souples et de nettoyant doux pH neutre.",
      "Essuyage avec microfibres propres.",
      "Optionnel : application d'une lotion nourrissante et protectrice pour assouplir le cuir.",
    ],
    faq: [
      { q: "Pourquoi ne pas utiliser l'injection-extraction sur le cuir ?", a: "L'injection-extraction gorge la matière d'eau, ce qui détruit le cuir naturel en l'asséchant au séchage. Le cuir nécessite un nettoyage de surface manuel avec une hydratation adaptée." },
      { q: "Proposez-vous une prestation pour reteindre le cuir ?", a: "Non, notre prestation est un nettoyage professionnel et un soin hydratant/protecteur. Nous ne réalisons pas de rénovation pigmentaire ou de recoloration de cuir abîmé." },
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