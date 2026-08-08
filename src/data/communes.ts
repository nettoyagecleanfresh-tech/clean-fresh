export type CommuneData = {
  name: string;
  slug: string;
  postalCode: string;
  /** Court texte qui décrit la ville (ce qui la rend unique) */
  cityContext: string;
  /** Paragraph 1 — présence de Clean&Fresh dans la ville */
  para1: string;
  /** Paragraph 2 — contexte local, types de clients */
  para2: string;
  /** 3 FAQ locales */
  faq: { q: string; a: string }[];
  /** Villes voisines mentionnées pour le maillage interne */
  nearby: string[];
};

export const COMMUNES_DATA: CommuneData[] = [
  {
    name: "Toulouse",
    slug: "nettoyage-toulouse",
    postalCode: "31000",
    cityContext:
      "Toulouse, la Ville Rose et quatrième ville de France, concentre plus de 480 000 habitants répartis dans ses 8 secteurs.",
    para1:
      "Clean&Fresh est basé à Toulouse et y réalise plusieurs interventions par semaine dans tous les quartiers : Compans-Caffarelli, Saint-Cyprien, Minimes, Rangueil, Lardenne, Purpan, Mirail, Côte Pavée. Du studio étudiant au duplex des bords de Garonne, nous traitons canapés, matelas, tapis et véhicules avec le même niveau d'exigence.",
    para2:
      "La métropole toulousaine abrite une clientèle variée — étudiants, familles, cadres de l'aéronautique et propriétaires bailleurs — qui font confiance à nos produits certifiés Écolabel et à notre matériel d'injection-extraction pour un résultat immédiat. Intervention le jour même ou le lendemain selon les créneaux. Devis gratuit sous 24h.",
    faq: [
      {
        q: "Intervenez-vous dans tous les quartiers de Toulouse ?",
        a: "Oui, nous couvrons l'ensemble des quartiers de Toulouse : centre-ville, Minimes, Rangueil, Saint-Cyprien, Lardenne, Cote Pavée, Mirail, Compans-Caffarelli, Purpan, Sept-Deniers et tous les autres. Aucun frais de déplacement.",
      },
      {
        q: "Quel est le délai pour une intervention à Toulouse ?",
        a: "Généralement sous 24 à 48h selon les créneaux. En semaine et le week-end. Contactez-nous pour vérifier nos disponibilités.",
      },
      {
        q: "Travaillez-vous aussi pour les propriétaires bailleurs à Toulouse ?",
        a: "Oui, nous intervenons entre deux locations pour remettre en état canapés, matelas et moquettes. Nous proposons également des prestations de fin de bail complètes.",
      },
    ],
    nearby: ["Blagnac", "Colomiers", "Tournefeuille", "Balma"],
  },
  {
    name: "Colomiers",
    slug: "nettoyage-colomiers",
    postalCode: "31770",
    cityContext:
      "Colomiers est la deuxième ville du département avec plus de 40 000 habitants et abrite de nombreux salariés du secteur aéronautique (Airbus, Ratier-Figeac).",
    para1:
      "Clean&Fresh intervient régulièrement à Colomiers, dans les quartiers du Perget, de la Pyrénéenne et de la Plaine. Nos techniciens traitent canapés en tissu et en cuir, matelas, tapis de salon et habitacles de véhicules dans les pavillons et appartements de cette commune dynamique.",
    para2:
      "Les familles colomériennes, souvent bi-actives avec peu de temps disponible, apprécient notre service à domicile clé en main : pas de transport, pas de débarras de meubles, technicien qui vient avec tout le matériel. Zéro frais de déplacement depuis Toulouse.",
    faq: [
      {
        q: "Intervenez-vous à Colomiers gratuitement ?",
        a: "Oui, Colomiers est dans notre zone de déplacement gratuite (moins de 20 km de notre base). Aucun frais supplémentaire.",
      },
      {
        q: "Peut-on réserver en ligne pour Colomiers ?",
        a: "Oui, via notre plateforme de réservation en ligne sur /formules. Choisissez votre service et un créneau adapté à votre emploi du temps.",
      },
      {
        q: "Nettoyez-vous les canapés en cuir à Colomiers ?",
        a: "Oui, nous utilisons des nettoyants pH neutre spécifiques au cuir et un nourrissant protecteur. Le résultat est immédiat : le cuir retrouve son éclat sans se dessécher.",
      },
    ],
    nearby: ["Toulouse", "Plaisance-du-Touch", "Léguevin", "Cornebarrieu"],
  },
  {
    name: "Tournefeuille",
    slug: "nettoyage-tournefeuille",
    postalCode: "31170",
    cityContext:
      "Tournefeuille, avec ses 27 000 habitants, est l'une des communes résidentielles les plus prisées de l'ouest toulousain, connue pour son cadre de vie verdoyant.",
    para1:
      "Tournefeuille figure parmi nos zones d'intervention les plus actives. Nos techniciens interviennent dans les lotissements du Perroquet, de Ramelet-Moundi et du secteur Pahin sur des canapés tissu et cuir, matelas king size et tapis de salon — sans que vous n'ayez à déplacer un seul meuble.",
    para2:
      "Les familles de Tournefeuille — souvent propriétaires de maisons individuelles avec des textiles d'ameublement de qualité — font régulièrement appel à nos services pour l'entretien saisonnier de leurs canapés et matelas, ou pour éliminer des taches persistantes après les fêtes. Nos produits Écolabel sont sans danger pour les enfants et les animaux.",
    faq: [
      {
        q: "Intervenez-vous à Tournefeuille le week-end ?",
        a: "Oui, nous sommes disponibles le samedi et le dimanche matin à Tournefeuille. Réservez en ligne ou appelez-nous pour vérifier les créneaux.",
      },
      {
        q: "Quelle est la durée d'intervention pour un canapé à Tournefeuille ?",
        a: "Entre 45 minutes et 1h30 selon la taille. Le technicien apporte tout le matériel. Séchage en 2 à 4h.",
      },
      {
        q: "Nettoyez-vous aussi les moquettes à Tournefeuille ?",
        a: "Oui, nous réalisons le shampouinage de moquettes pour particuliers et professionnels. Devis sur photos ou visite, réponse sous 24h.",
      },
    ],
    nearby: ["Toulouse", "Colomiers", "Plaisance-du-Touch", "Fonsorbes"],
  },
  {
    name: "Blagnac",
    slug: "nettoyage-blagnac",
    postalCode: "31700",
    cityContext:
      "Blagnac abrite le siège d'Airbus et l'aéroport international Toulouse-Blagnac. Ses 25 000 habitants vivent souvent dans des logements modernes aux textiles soignés.",
    para1:
      "À 9 km au nord-ouest de Toulouse, Blagnac est l'une de nos zones d'intervention prioritaires. Nos techniciens y interviennent plusieurs fois par semaine : canapés en tissu et cuir dans les appartements du centre, matelas dans les pavillons du Ritouret, tapis dans les villas du secteur Andromède.",
    para2:
      "Les résidents blagnacais — souvent des professionnels de l'aéronautique avec des intérieurs soignés — apprécient notre rigueur et la qualité des produits Écolabel. Nos machines d'injection-extraction haute puissance garantissent un résultat visible immédiatement et un séchage en 2 à 4h. Zéro frais de déplacement.",
    faq: [
      {
        q: "Clean&Fresh intervient-il à Blagnac pour les entreprises ?",
        a: "Oui, nous traitons les sièges de bureaux, fauteuils de direction et moquettes d'espaces professionnels pour les sociétés de Blagnac. Intervention en dehors des heures d'ouverture possible.",
      },
      {
        q: "Quel est le tarif pour un nettoyage de canapé à Blagnac ?",
        a: "À partir de 79 € pour un canapé 2/3 places. Même tarif qu'à Toulouse — aucun frais de déplacement pour Blagnac.",
      },
      {
        q: "Nettoyez-vous les véhicules à domicile à Blagnac ?",
        a: "Oui, nous venons directement à votre adresse ou sur le parking de votre entreprise à Blagnac. Pack Bronze à 69 €, Argent à 99 €, Or à 129 €.",
      },
    ],
    nearby: ["Toulouse", "Cornebarrieu", "Beauzelle", "Aussonne"],
  },
  {
    name: "Muret",
    slug: "nettoyage-muret",
    postalCode: "31600",
    cityContext:
      "Muret est la sous-préfecture de Haute-Garonne avec 25 000 habitants. Ville dynamique au sud de Toulouse, elle attire de nombreuses familles pour son cadre de vie et ses prix immobiliers accessibles.",
    para1:
      "Clean&Fresh couvre Muret et ses environs : Seysses, Eaunes, Pins-Justaret, Roques. Nos techniciens s'y rendent régulièrement pour des nettoyages de canapés, matelas et voitures à domicile. Le déplacement depuis Toulouse est inclus dans nos tarifs.",
    para2:
      "Les familles murelloises, souvent propriétaires de maisons avec jardin, font appel à nous pour les grands ménages saisonniers, le nettoyage après les fêtes ou l'entretien régulier de leurs canapés et matelas. Nous intervenons aussi pour les entreprises et les bailleurs de Muret.",
    faq: [
      {
        q: "Y a-t-il des frais de déplacement pour Muret ?",
        a: "Muret est situé à environ 22 km de Toulouse. Un forfait déplacement de 10 € peut s'appliquer. Contactez-nous pour confirmation selon votre adresse exacte.",
      },
      {
        q: "Intervenez-vous pour les fin de bail à Muret ?",
        a: "Oui, nous réalisons des nettoyages complets avant état des lieux de sortie à Muret. Cuisine, salle de bain, sols, vitres — tout est pris en charge.",
      },
      {
        q: "Pouvez-vous nettoyer une terrasse à Muret ?",
        a: "Oui, nous réalisons le nettoyage haute pression de terrasses à Muret et dans les communes environnantes. Devis gratuit sur photos, réponse sous 24h.",
      },
    ],
    nearby: ["Toulouse", "Seysses", "Eaunes", "Portet-sur-Garonne"],
  },
  {
    name: "Cugnaux",
    slug: "nettoyage-cugnaux",
    postalCode: "31270",
    cityContext:
      "Cugnaux est une commune résidentielle du sud-ouest toulousain d'environ 17 000 habitants, prisée pour ses maisons individuelles et sa tranquillité.",
    para1:
      "Cugnaux fait partie de notre circuit sud-ouest. Nos techniciens interviennent dans les quartiers de la Croix de Pierre et du Mirouillet pour le nettoyage de canapés, matelas, tapis et voitures à domicile.",
    para2:
      "La population de Cugnaux est majoritairement composée de propriétaires en maison individuelle, un profil de client qui apprécie particulièrement notre service tout compris à domicile — sans avoir à transporter leurs meubles ou leur véhicule.",
    faq: [
      {
        q: "Intervenez-vous à Cugnaux pour les nettoyages de fin de bail ?",
        a: "Oui, nous proposons des remises en état complètes avant état des lieux de sortie à Cugnaux. Devis gratuit sous 24h.",
      },
      {
        q: "Quel est le délai d'intervention à Cugnaux ?",
        a: "Généralement sous 24 à 48h. Disponibles en semaine et le week-end selon les créneaux.",
      },
      {
        q: "Nettoyez-vous les canapés en velours à Cugnaux ?",
        a: "Oui, nous traitons toutes les matières : tissu, microfibre, velours, cuir. Chaque matière requiert un produit et une technique adaptés.",
      },
    ],
    nearby: ["Toulouse", "Villeneuve-Tolosane", "Frouzins", "Muret"],
  },
  {
    name: "Balma",
    slug: "nettoyage-balma",
    postalCode: "31130",
    cityContext:
      "Balma est une commune de l'est toulousain d'environ 15 000 habitants, jouxtant directement Toulouse et très bien desservie par le métro ligne A.",
    para1:
      "Balma est dans notre circuit est. Nous intervenons dans les résidences du Rivel, de Jonquières et du secteur la Jonquère pour des nettoyages de canapés, matelas, tapis et habitacles de véhicules.",
    para2:
      "La proximité de Balma avec Toulouse (moins de 5 km du centre) en fait une zone à forte densité de copropriétés modernes. Nos interventions concernent aussi bien des appartements que des maisons individuelles. Réponse sous 24h, séchage rapide — le canapé ou le matelas est utilisable le jour même.",
    faq: [
      {
        q: "Y a-t-il des frais de déplacement pour Balma ?",
        a: "Non, Balma est dans notre zone gratuite. Aucun supplément de déplacement.",
      },
      {
        q: "Intervenez-vous dans les copropriétés de Balma ?",
        a: "Oui, nous intervenons dans les appartements en copropriété. Notre matériel est compact et ne nécessite pas d'ascenseur surdimensionné.",
      },
      {
        q: "Nettoyez-vous les tapis orientaux à Balma ?",
        a: "Oui, les tapis en laine, soie artificielle et fibres naturelles. Nous testons la compatibilité du produit sur une zone cachée avant chaque intervention.",
      },
    ],
    nearby: ["Toulouse", "Quint-Fonsegrives", "Escalquens", "Castanet-Tolosan"],
  },
  {
    name: "Ramonville-Saint-Agne",
    slug: "nettoyage-ramonville-saint-agne",
    postalCode: "31520",
    cityContext:
      "Ramonville-Saint-Agne, au bord du canal du Midi, est une ville résidentielle du sud-est toulousain de 15 000 habitants, terminus de la ligne B du métro.",
    para1:
      "Ramonville-Saint-Agne est l'une de nos communes d'intervention du sud-est. Nos techniciens traitent les canapés, matelas et tapis des appartements du Parc du Canal et des maisons du quartier Sainte-Agne.",
    para2:
      "La clientèle de Ramonville est diverse : étudiants en résidence, familles dans les maisons individuelles du bord du Canal du Midi, retraités dans les copropriétés proches du métro. Nos produits Écolabel conviennent à tous les profils, y compris les personnes allergiques aux acariens.",
    faq: [
      {
        q: "Intervenez-vous à Ramonville-Saint-Agne sans frais ?",
        a: "Oui, Ramonville est dans notre zone gratuite. Aucun frais de déplacement.",
      },
      {
        q: "Proposez-vous le traitement anti-acariens à Ramonville ?",
        a: "Oui, le traitement anti-acariens est disponible en option sur les matelas et canapés. Particulièrement recommandé pour les personnes souffrant d'allergies respiratoires.",
      },
      {
        q: "Nettoyez-vous les fins de bail à Ramonville ?",
        a: "Oui, nous prenons en charge la remise en état complète avant l'état des lieux de sortie. Délai d'intervention possible sous 48h.",
      },
    ],
    nearby: ["Toulouse", "Castanet-Tolosan", "Auzeville-Tolosane", "Saint-Orens-de-Gameville"],
  },
  {
    name: "Castanet-Tolosan",
    slug: "nettoyage-castanet-tolosan",
    postalCode: "31320",
    cityContext:
      "Castanet-Tolosan est une ville résidentielle du sud-est toulousain de 14 000 habitants, avec de nombreux lotissements récents et un tissu pavillonnaire dense.",
    para1:
      "Castanet-Tolosan est dans notre secteur sud-est. Nous intervenons régulièrement pour le nettoyage de canapés, matelas et tapis dans les maisons individuelles et les résidences récentes de la ville.",
    para2:
      "Les propriétaires de Castanet-Tolosan — souvent en maison individuelle avec des canapés en tissu ou en cuir — apprécient notre passage à domicile sans contrainte : le technicien arrive avec son matériel, protège les zones autour du meuble et livre un résultat propre en une heure.",
    faq: [
      {
        q: "Y a-t-il des frais de déplacement pour Castanet-Tolosan ?",
        a: "Non, Castanet-Tolosan est dans notre zone gratuite. Aucun supplément.",
      },
      {
        q: "Intervenez-vous pour le nettoyage d'auto à Castanet-Tolosan ?",
        a: "Oui, nous venons directement chez vous à Castanet-Tolosan. Pack Bronze à 69 €, Argent à 99 €, Or à 129 €.",
      },
      {
        q: "Pouvez-vous nettoyer une terrasse à Castanet-Tolosan ?",
        a: "Oui, nettoyage haute pression de terrasses, dalles et bois. Devis gratuit sur photos sous 24h.",
      },
    ],
    nearby: ["Toulouse", "Auzeville-Tolosane", "Ramonville-Saint-Agne", "Escalquens"],
  },
  {
    name: "Plaisance-du-Touch",
    slug: "nettoyage-plaisance-du-touch",
    postalCode: "31830",
    cityContext:
      "Plaisance-du-Touch, connue pour son ZooParc, est une ville de 17 000 habitants à l'ouest de Toulouse, très prisée des familles pour ses grands espaces.",
    para1:
      "Plaisance-du-Touch est dans notre circuit ouest. Nous intervenons dans les quartiers du Bois du Roi et du secteur Aéroconstellation pour le nettoyage de canapés, matelas, tapis et voitures à domicile.",
    para2:
      "La présence de nombreuses familles à Plaisance-du-Touch — avec enfants et souvent des animaux — génère une forte demande pour nos traitements anti-acariens et anti-odeur. Nos produits Écolabel sont sans danger pour les enfants et les animaux domestiques.",
    faq: [
      {
        q: "Y a-t-il des frais de déplacement pour Plaisance-du-Touch ?",
        a: "Non, Plaisance-du-Touch est dans notre zone gratuite. Même tarif qu'à Toulouse.",
      },
      {
        q: "Nettoyez-vous les tapis à Plaisance-du-Touch ?",
        a: "Oui, shampouinage professionnel par injection-extraction pour tous types de tapis. À partir de 49 €.",
      },
      {
        q: "Intervenez-vous le week-end à Plaisance-du-Touch ?",
        a: "Oui, disponible le samedi et le dimanche matin selon les créneaux.",
      },
    ],
    nearby: ["Toulouse", "Colomiers", "Tournefeuille", "Léguevin"],
  },
  {
    name: "Saint-Orens-de-Gameville",
    slug: "nettoyage-saint-orens-de-gameville",
    postalCode: "31650",
    cityContext:
      "Saint-Orens-de-Gameville est une commune résidentielle du sud-est de Toulouse d'environ 12 000 habitants, appréciée pour son calme et ses lotissements.",
    para1:
      "Saint-Orens-de-Gameville fait partie de notre tournée sud-est. Nos techniciens y interviennent pour le nettoyage de canapés, matelas, tapis et habitacles de véhicules dans les maisons individuelles du secteur.",
    para2:
      "La commune de Saint-Orens attire beaucoup de jeunes familles avec enfants. Nos nettoyages de matelas avec traitement anti-acariens sont particulièrement recommandés dans ce contexte pour améliorer la qualité de l'air intérieur et réduire les allergènes.",
    faq: [
      {
        q: "Intervenez-vous sans frais à Saint-Orens-de-Gameville ?",
        a: "Oui, Saint-Orens est dans notre zone gratuite. Aucun supplément de déplacement.",
      },
      {
        q: "Quel est le délai pour une intervention à Saint-Orens ?",
        a: "Sous 24 à 48h selon les créneaux. Semaine et week-end selon disponibilités.",
      },
      {
        q: "Proposez-vous le nettoyage de matelas à Saint-Orens-de-Gameville ?",
        a: "Oui, dès 39 € pour un matelas enfant, 59 € pour 1 place, 99 € pour 2 places. Traitement anti-acariens disponible en option.",
      },
    ],
    nearby: ["Toulouse", "Ramonville-Saint-Agne", "Castanet-Tolosan", "Escalquens"],
  },
  {
    name: "L'Union",
    slug: "nettoyage-l-union",
    postalCode: "31240",
    cityContext:
      "L'Union est une commune du nord-est toulousain d'environ 12 000 habitants, bien reliée à Toulouse par la voie rapide, avec un tissu résidentiel dense.",
    para1:
      "L'Union est dans notre circuit nord-est. Nous intervenons dans les quartiers résidentiels pour le nettoyage de canapés, matelas, tapis et voitures directement à votre domicile.",
    para2:
      "La commune accueille de nombreux propriétaires de maisons individuelles qui font confiance à notre service à domicile pour entretenir leurs textiles sans contrainte logistique. Devis gratuit sous 24h.",
    faq: [
      {
        q: "Y a-t-il des frais de déplacement pour L'Union ?",
        a: "Non, L'Union est dans notre zone gratuite. Aucun supplément.",
      },
      {
        q: "Nettoyez-vous les canapés en microfibre à L'Union ?",
        a: "Oui, la microfibre est l'une de nos spécialités. Résultat impeccable sans laisser de traces ni altérer la texture.",
      },
      {
        q: "Proposez-vous le nettoyage auto à L'Union ?",
        a: "Oui, intervention directement à votre domicile. Prise de rendez-vous en ligne ou par téléphone.",
      },
    ],
    nearby: ["Toulouse", "Saint-Jean", "Aucamville", "Launaguet"],
  },
  {
    name: "Fonsorbes",
    slug: "nettoyage-fonsorbes",
    postalCode: "31470",
    cityContext:
      "Fonsorbes est une commune de l'ouest toulousain d'environ 10 000 habitants, à mi-chemin entre Toulouse et Saint-Lys.",
    para1:
      "Fonsorbes est dans notre circuit ouest. Nos techniciens s'y rendent pour le nettoyage de canapés, matelas, tapis et intérieurs de voitures dans les lotissements résidentiels.",
    para2:
      "À Fonsorbes, les maisons individuelles sont majoritaires. Les familles font appel à nous pour l'entretien saisonnier de leurs canapés et matelas, ou pour des taches ponctuelles. Zéro frais de déplacement.",
    faq: [
      {
        q: "Y a-t-il des frais de déplacement pour Fonsorbes ?",
        a: "Fonsorbes est à environ 18 km de Toulouse — dans notre zone gratuite. Aucun supplément.",
      },
      {
        q: "Intervenez-vous le week-end à Fonsorbes ?",
        a: "Oui, disponible le samedi selon les créneaux. Réservez en ligne pour vérifier les disponibilités.",
      },
      {
        q: "Nettoyez-vous les moquettes à Fonsorbes ?",
        a: "Oui, shampouinage par injection-extraction pour moquettes de toutes surfaces. À partir de 59 € pour une petite pièce.",
      },
    ],
    nearby: ["Toulouse", "Colomiers", "Saint-Lys", "Léguevin"],
  },
  {
    name: "Villeneuve-Tolosane",
    slug: "nettoyage-villeneuve-tolosane",
    postalCode: "31270",
    cityContext:
      "Villeneuve-Tolosane est une commune du sud-ouest toulousain d'environ 10 000 habitants, à proximité de Cugnaux et de l'Aéroport de Toulouse-Blagnac.",
    para1:
      "Villeneuve-Tolosane fait partie de notre circuit sud-ouest. Nous intervenons pour le nettoyage de canapés, matelas et tapis dans les maisons et appartements de la commune.",
    para2:
      "La commune est en forte croissance résidentielle. Les nouveaux propriétaires font régulièrement appel à nous pour l'entretien de leurs canapés neufs ou pour des remises en état lors d'un déménagement.",
    faq: [
      {
        q: "Y a-t-il des frais de déplacement pour Villeneuve-Tolosane ?",
        a: "Non, Villeneuve-Tolosane est dans notre zone gratuite. Même tarif qu'à Toulouse.",
      },
      {
        q: "Proposez-vous le nettoyage auto à Villeneuve-Tolosane ?",
        a: "Oui, nous venons directement chez vous. Pack Bronze à 69 €, Argent à 99 €, Or à 129 €.",
      },
      {
        q: "Quel est le tarif pour un matelas 2 places à Villeneuve-Tolosane ?",
        a: "99 € pour un matelas 2 places, 59 € pour 1 place, 39 € pour un matelas enfant. Traitement anti-acariens en option.",
      },
    ],
    nearby: ["Toulouse", "Cugnaux", "Frouzins", "Muret"],
  },
  {
    name: "Portet-sur-Garonne",
    slug: "nettoyage-portet-sur-garonne",
    postalCode: "31120",
    cityContext:
      "Portet-sur-Garonne est une commune de 9 000 habitants au sud de Toulouse, le long de la Garonne, connue pour son centre commercial et son tissu industriel.",
    para1:
      "Portet-sur-Garonne est dans notre tournée sud. Nous intervenons à domicile pour le nettoyage de canapés, matelas, tapis et voitures dans les maisons et appartements de la commune.",
    para2:
      "La commune accueille de nombreux salariés de la zone industrielle qui apprécient notre service flexible en soirée et le week-end. Devis gratuit sous 24h, intervention rapide.",
    faq: [
      {
        q: "Y a-t-il des frais de déplacement pour Portet-sur-Garonne ?",
        a: "Portet-sur-Garonne est à environ 10 km de Toulouse — zone gratuite. Aucun supplément.",
      },
      {
        q: "Intervenez-vous en soirée à Portet-sur-Garonne ?",
        a: "Oui, selon les créneaux disponibles. Contactez-nous pour un rendez-vous en soirée ou le week-end.",
      },
      {
        q: "Nettoyez-vous les terrasses à Portet-sur-Garonne ?",
        a: "Oui, nettoyage haute pression de terrasses et façades. Devis gratuit sur photos sous 24h.",
      },
    ],
    nearby: ["Toulouse", "Muret", "Roques", "Seysses"],
  },
  {
    name: "Aucamville",
    slug: "nettoyage-aucamville",
    postalCode: "31140",
    cityContext:
      "Aucamville est une commune du nord de Toulouse d'environ 8 000 habitants, en pleine croissance résidentielle, proche de Launaguet et de Saint-Alban.",
    para1:
      "Aucamville est dans notre circuit nord de Toulouse. Nos techniciens interviennent dans les lotissements résidentiels pour le nettoyage de canapés, matelas, tapis et habitacles de véhicules à domicile.",
    para2:
      "La commune attire de jeunes familles installées dans des maisons individuelles récentes, qui cherchent une entreprise locale fiable pour l'entretien de leurs textiles. Nos produits Écolabel et notre méthode d'injection-extraction garantissent un résultat sans résidu et un séchage en 2 à 4h.",
    faq: [
      {
        q: "Y a-t-il des frais de déplacement pour Aucamville ?",
        a: "Non, Aucamville est dans notre zone gratuite (moins de 20 km de Toulouse). Aucun supplément.",
      },
      {
        q: "Intervenez-vous à Aucamville pour les entreprises ?",
        a: "Oui, nettoyage de sièges de bureaux et de moquettes professionnels. Intervention en dehors des heures d'activité possible.",
      },
      {
        q: "Quel est le tarif pour un nettoyage de canapé à Aucamville ?",
        a: "À partir de 79 € pour un canapé 2/3 places. Devis gratuit sous 24h.",
      },
    ],
    nearby: ["Toulouse", "Launaguet", "Saint-Alban", "Castelginest"],
  },
  {
    name: "Castelginest",
    slug: "nettoyage-castelginest",
    postalCode: "31780",
    cityContext:
      "Castelginest est une commune résidentielle du nord toulousain d'environ 10 000 habitants, à 15 min de Toulouse par la rocade.",
    para1:
      "Castelginest fait partie de notre circuit nord. Nous intervenons régulièrement dans les maisons et appartements de la commune pour le nettoyage de canapés, matelas, tapis et voitures.",
    para2:
      "La commune de Castelginest est essentiellement résidentielle avec un fort taux de propriétaires. Nos interventions à domicile — sans déplacement du client — sont particulièrement appréciées dans ce contexte pavillonnaire.",
    faq: [
      {
        q: "Y a-t-il des frais de déplacement pour Castelginest ?",
        a: "Non, Castelginest est dans notre zone gratuite. Aucun supplément.",
      },
      {
        q: "Nettoyez-vous les matelas à Castelginest ?",
        a: "Oui, dès 39 € (matelas enfant), 59 € (1 place), 99 € (2 places). Anti-acariens en option.",
      },
      {
        q: "Pouvez-vous intervenir rapidement à Castelginest ?",
        a: "Oui, généralement sous 24-48h. Contactez-nous pour vérifier les créneaux disponibles.",
      },
    ],
    nearby: ["Toulouse", "Aucamville", "Launaguet", "Fenouillet"],
  },
  {
    name: "Launaguet",
    slug: "nettoyage-launaguet",
    postalCode: "31140",
    cityContext:
      "Launaguet est une commune du nord de Toulouse d'environ 6 000 habitants, jouxtant Aucamville et Saint-Alban.",
    para1:
      "Launaguet est dans notre tournée nord. Nos techniciens s'y rendent pour le nettoyage de canapés, matelas, tapis et intérieurs de véhicules directement chez vous.",
    para2:
      "Commune résidentielle à densité modérée, Launaguet accueille des familles qui apprécient notre service clé en main. Devis gratuit sous 24h, intervention rapide.",
    faq: [
      {
        q: "Y a-t-il des frais de déplacement pour Launaguet ?",
        a: "Non, Launaguet est dans notre zone gratuite.",
      },
      {
        q: "Nettoyez-vous les voitures à Launaguet ?",
        a: "Oui, nous venons directement chez vous. Bronze 69 €, Argent 99 €, Or 129 €.",
      },
      {
        q: "Quel est le délai pour une intervention à Launaguet ?",
        a: "Généralement sous 24-48h. Semaine et week-end selon disponibilités.",
      },
    ],
    nearby: ["Toulouse", "Aucamville", "Saint-Alban", "Castelginest"],
  },
  {
    name: "Saint-Jean",
    slug: "nettoyage-saint-jean",
    postalCode: "31240",
    cityContext:
      "Saint-Jean est une commune du nord-est toulousain d'environ 8 000 habitants, proche de L'Union et de Launaguet.",
    para1:
      "Saint-Jean fait partie de notre circuit nord-est. Nous intervenons dans les maisons et lotissements résidentiels pour le nettoyage de canapés, matelas et tapis.",
    para2:
      "La commune de Saint-Jean est en croissance résidentielle, avec de nombreux jeunes propriétaires qui font appel à nos services pour l'entretien de leurs textiles. Produits Écolabel, séchage rapide.",
    faq: [
      {
        q: "Y a-t-il des frais de déplacement pour Saint-Jean ?",
        a: "Non, Saint-Jean est dans notre zone gratuite.",
      },
      {
        q: "Nettoyez-vous les canapés en velours à Saint-Jean ?",
        a: "Oui, velours, microfibre, tissu, cuir. Chaque matière est traitée avec les produits adaptés.",
      },
      {
        q: "Proposez-vous le nettoyage auto à Saint-Jean ?",
        a: "Oui, directement à votre domicile à Saint-Jean.",
      },
    ],
    nearby: ["Toulouse", "L'Union", "Aucamville", "Launaguet"],
  },
  {
    name: "Frouzins",
    slug: "nettoyage-frouzins",
    postalCode: "31270",
    cityContext:
      "Frouzins est une commune résidentielle du sud-ouest toulousain d'environ 5 000 habitants, proche de Cugnaux et Villeneuve-Tolosane.",
    para1:
      "Frouzins est dans notre tournée sud-ouest. Nous intervenons à domicile pour le nettoyage de canapés, matelas et tapis dans les maisons individuelles de la commune.",
    para2:
      "Commune à forte proportion de maisons individuelles, Frouzins compte des familles qui privilégient les prestataires à domicile pour leurs entretiens. Nos tarifs sont identiques à ceux pratiqués à Toulouse.",
    faq: [
      {
        q: "Y a-t-il des frais de déplacement pour Frouzins ?",
        a: "Non, Frouzins est dans notre zone gratuite.",
      },
      {
        q: "Nettoyez-vous les matelas à Frouzins ?",
        a: "Oui, dès 39 € pour un matelas enfant. Anti-acariens disponible en option.",
      },
      {
        q: "Intervenez-vous le week-end à Frouzins ?",
        a: "Oui, disponible le samedi selon les créneaux.",
      },
    ],
    nearby: ["Toulouse", "Cugnaux", "Villeneuve-Tolosane", "Muret"],
  },
  {
    name: "Seysses",
    slug: "nettoyage-seysses",
    postalCode: "31600",
    cityContext:
      "Seysses est une commune du sud toulousain d'environ 10 000 habitants, proche de Muret, dans une zone pavillonnaire en développement.",
    para1:
      "Seysses est dans notre circuit sud. Nos techniciens interviennent régulièrement pour le nettoyage de canapés, matelas, tapis et voitures dans les maisons individuelles de la commune.",
    para2:
      "La commune de Seysses attire des familles qui y trouvent des logements spacieux à prix abordables. Nos interventions à domicile sont particulièrement appréciées pour éviter tout transport de mobilier lourd.",
    faq: [
      {
        q: "Y a-t-il des frais de déplacement pour Seysses ?",
        a: "Seysses est à environ 20 km de Toulouse. La prestation est gratuite ou avec un léger forfait selon votre adresse exacte — contactez-nous.",
      },
      {
        q: "Nettoyez-vous les terrasses à Seysses ?",
        a: "Oui, nettoyage haute pression de terrasses. Devis gratuit sur photos.",
      },
      {
        q: "Proposez-vous le nettoyage fin de bail à Seysses ?",
        a: "Oui, remise en état complète avant état des lieux. Intervention possible sous 48h.",
      },
    ],
    nearby: ["Toulouse", "Muret", "Portet-sur-Garonne", "Roques"],
  },
  {
    name: "Cornebarrieu",
    slug: "nettoyage-cornebarrieu",
    postalCode: "31700",
    cityContext:
      "Cornebarrieu est une commune du nord-ouest de Toulouse d'environ 8 000 habitants, jouxtant Blagnac et l'aéroport international.",
    para1:
      "Cornebarrieu est dans notre circuit nord-ouest, à deux pas de Blagnac et de l'aéroport. Nos techniciens interviennent dans les logements modernes et les résidences neuves de la commune.",
    para2:
      "La proximité de l'aéroport et de la zone aéronautique attire des locataires et propriétaires souvent exigeants. Nos nettoyages de canapés et matelas répondent à leurs attentes de qualité et de rapidité.",
    faq: [
      {
        q: "Y a-t-il des frais de déplacement pour Cornebarrieu ?",
        a: "Non, Cornebarrieu est dans notre zone gratuite.",
      },
      {
        q: "Nettoyez-vous les sièges de bureau à Cornebarrieu ?",
        a: "Oui, pour les entreprises et les professionnels. Devis sur mesure.",
      },
      {
        q: "Quel est le délai d'intervention à Cornebarrieu ?",
        a: "Sous 24-48h selon les créneaux disponibles.",
      },
    ],
    nearby: ["Toulouse", "Blagnac", "Beauzelle", "Aussonne"],
  },
  {
    name: "Beauzelle",
    slug: "nettoyage-beauzelle",
    postalCode: "31700",
    cityContext:
      "Beauzelle est une commune du nord-ouest de Toulouse d'environ 7 000 habitants, au bord de la Garonne, proche de Blagnac.",
    para1:
      "Beauzelle est dans notre circuit nord-ouest. Nous intervenons à domicile pour le nettoyage de canapés, matelas et tapis dans les maisons et appartements au bord de la Garonne.",
    para2:
      "Commune à fort développement résidentiel, Beauzelle voit arriver de nombreuses familles qui font confiance à nos services pour l'entretien de leurs textiles. Produits Écolabel, résultat garanti.",
    faq: [
      {
        q: "Y a-t-il des frais de déplacement pour Beauzelle ?",
        a: "Non, Beauzelle est dans notre zone gratuite.",
      },
      {
        q: "Nettoyez-vous les canapés en cuir à Beauzelle ?",
        a: "Oui, avec des produits pH neutre spécifiques et un nourrissant protecteur.",
      },
      {
        q: "Proposez-vous le nettoyage auto à Beauzelle ?",
        a: "Oui, directement à votre domicile ou sur votre lieu de travail.",
      },
    ],
    nearby: ["Toulouse", "Blagnac", "Cornebarrieu", "Aussonne"],
  },
  {
    name: "Aussonne",
    slug: "nettoyage-aussonne",
    postalCode: "31840",
    cityContext:
      "Aussonne est une commune rurale de 4 000 habitants au nord-ouest de Toulouse, connue pour ses paysages de campagne toulousaine.",
    para1:
      "Aussonne est dans notre circuit nord-ouest. Nos techniciens s'y rendent pour le nettoyage de canapés, matelas et tapis dans les maisons individuelles et les fermes rénovées de la commune.",
    para2:
      "Les habitants d'Aussonne, souvent propriétaires de grandes maisons, font appel à nos services pour l'entretien de leurs meubles rembourrés et de leurs tapis de salon. Devis gratuit, réponse sous 24h.",
    faq: [
      {
        q: "Y a-t-il des frais de déplacement pour Aussonne ?",
        a: "Aussonne est à environ 18 km de Toulouse — zone gratuite. Aucun supplément.",
      },
      {
        q: "Nettoyez-vous les tapis anciens à Aussonne ?",
        a: "Oui, y compris les tapis en laine et les tapis anciens de valeur. Test de compatibilité systématique avant traitement.",
      },
      {
        q: "Intervenez-vous pour les fins de chantier à Aussonne ?",
        a: "Oui, nettoyage après travaux pour les particuliers et les professionnels. Devis rapide.",
      },
    ],
    nearby: ["Toulouse", "Blagnac", "Beauzelle", "Cornebarrieu"],
  },
  {
    name: "Pibrac",
    slug: "nettoyage-pibrac",
    postalCode: "31820",
    cityContext:
      "Pibrac est une commune du nord-ouest de Toulouse d'environ 8 000 habitants, connue pour son pèlerinage dédié à Sainte Germaine Cousin.",
    para1:
      "Pibrac est dans notre circuit nord-ouest. Nous intervenons dans les maisons individuelles et les lotissements pour le nettoyage de canapés, matelas, tapis et habitacles de voitures.",
    para2:
      "La commune de Pibrac est résidentielle et verdoyante, avec un fort tissu pavillonnaire. Nos interventions à domicile s'adaptent aux contraintes des familles actives. Zéro frais de déplacement.",
    faq: [
      {
        q: "Y a-t-il des frais de déplacement pour Pibrac ?",
        a: "Non, Pibrac est dans notre zone gratuite.",
      },
      {
        q: "Nettoyez-vous les matelas à Pibrac ?",
        a: "Oui, dès 39 € (enfant), 59 € (1 place), 99 € (2 places). Résultat rapide.",
      },
      {
        q: "Intervenez-vous le week-end à Pibrac ?",
        a: "Oui, le samedi et parfois le dimanche selon les créneaux.",
      },
    ],
    nearby: ["Toulouse", "Léguevin", "Cornebarrieu", "La Salvetat-Saint-Gilles"],
  },
  {
    name: "Léguevin",
    slug: "nettoyage-leguevin",
    postalCode: "31490",
    cityContext:
      "Léguevin est une commune de l'ouest toulousain d'environ 9 000 habitants, à 25 km de Toulouse, appréciée pour son calme et son développement résidentiel.",
    para1:
      "Léguevin est dans notre circuit ouest étendu. Nos techniciens interviennent dans les lotissements et maisons individuelles de la commune pour le nettoyage de canapés, matelas et tapis.",
    para2:
      "La commune de Léguevin, à mi-chemin entre Toulouse et l'Ariège, attire des familles qui cherchent plus d'espace. Nos services à domicile leur évitent tout déplacement — le technicien vient avec son matériel complet.",
    faq: [
      {
        q: "Y a-t-il des frais de déplacement pour Léguevin ?",
        a: "Léguevin est à environ 25 km de Toulouse. Un forfait déplacement de 10 € peut s'appliquer. Contactez-nous pour confirmation.",
      },
      {
        q: "Nettoyez-vous les canapés à Léguevin ?",
        a: "Oui, toutes matières : tissu, microfibre, velours, cuir. À partir de 79 € pour un 2/3 places.",
      },
      {
        q: "Intervenez-vous à Léguevin pour le nettoyage auto ?",
        a: "Oui, nous venons directement chez vous. Pack Bronze à 69 €.",
      },
    ],
    nearby: ["Toulouse", "Pibrac", "Fonsorbes", "La Salvetat-Saint-Gilles"],
  },
  {
    name: "Escalquens",
    slug: "nettoyage-escalquens",
    postalCode: "31750",
    cityContext:
      "Escalquens est une commune du sud-est toulousain d'environ 7 000 habitants, dans la plaine de la Haute-Garonne, proche de Labège.",
    para1:
      "Escalquens est dans notre circuit sud-est. Nous intervenons dans les maisons et lotissements de la commune pour le nettoyage de canapés, matelas et tapis à domicile.",
    para2:
      "La commune d'Escalquens est résidentielle avec un fort taux de propriétaires en maison individuelle. Nos interventions à domicile sont appréciées pour leur praticité et leur efficacité.",
    faq: [
      {
        q: "Y a-t-il des frais de déplacement pour Escalquens ?",
        a: "Non, Escalquens est dans notre zone gratuite.",
      },
      {
        q: "Nettoyez-vous les tapis à Escalquens ?",
        a: "Oui, à partir de 49 € pour 1 tapis. Toutes fibres.",
      },
      {
        q: "Proposez-vous le nettoyage fin de bail à Escalquens ?",
        a: "Oui, remise en état complète avant état des lieux.",
      },
    ],
    nearby: ["Toulouse", "Labège", "Castanet-Tolosan", "Auzeville-Tolosane"],
  },
  {
    name: "Labège",
    slug: "nettoyage-labege",
    postalCode: "31670",
    cityContext:
      "Labège est une commune du sud-est toulousain d'environ 5 000 habitants, célèbre pour sa zone commerciale et d'activités INNOPOLE, pôle technologique majeur.",
    para1:
      "Labège est dans notre circuit sud-est. Nous intervenons à domicile et pour les entreprises de la zone INNOPOLE pour le nettoyage de canapés, sièges de bureau, matelas et habitacles de voitures.",
    para2:
      "La présence d'importantes entreprises technologiques à Labège génère une demande professionnelle pour l'entretien des sièges de bureau et moquettes. Nous proposons des contrats d'entretien régulier pour les PME et les grands comptes.",
    faq: [
      {
        q: "Y a-t-il des frais de déplacement pour Labège ?",
        a: "Non, Labège est dans notre zone gratuite.",
      },
      {
        q: "Proposez-vous des contrats d'entretien pour les entreprises de Labège ?",
        a: "Oui, contrats d'entretien mensuel ou trimestriel avec tarif dégressif. Devis personnalisé.",
      },
      {
        q: "Nettoyez-vous les moquettes de bureaux à Labège ?",
        a: "Oui, intervention en dehors des heures d'activité si nécessaire.",
      },
    ],
    nearby: ["Toulouse", "Escalquens", "Castanet-Tolosan", "Auzeville-Tolosane"],
  },
  {
    name: "Saint-Alban",
    slug: "nettoyage-saint-alban",
    postalCode: "31140",
    cityContext:
      "Saint-Alban est une commune du nord de Toulouse d'environ 5 000 habitants, proche d'Aucamville et de Launaguet.",
    para1:
      "Saint-Alban est dans notre circuit nord. Nos techniciens interviennent dans les maisons individuelles et les appartements pour le nettoyage de canapés, matelas et tapis.",
    para2:
      "Commune résidentielle calme, Saint-Alban attire des familles qui apprécient notre sérieux et notre ponctualité. Devis gratuit sous 24h.",
    faq: [
      {
        q: "Y a-t-il des frais de déplacement pour Saint-Alban ?",
        a: "Non, Saint-Alban est dans notre zone gratuite.",
      },
      {
        q: "Nettoyez-vous les canapés à Saint-Alban ?",
        a: "Oui, à partir de 49 € pour un fauteuil, 79 € pour un canapé 2/3 places.",
      },
      {
        q: "Intervenez-vous le week-end à Saint-Alban ?",
        a: "Oui, le samedi selon les créneaux disponibles.",
      },
    ],
    nearby: ["Toulouse", "Aucamville", "Launaguet", "Castelginest"],
  },
  {
    name: "Fenouillet",
    slug: "nettoyage-fenouillet",
    postalCode: "31150",
    cityContext:
      "Fenouillet est une commune du nord de Toulouse d'environ 5 000 habitants, proche de Bruguières et Castelginest.",
    para1:
      "Fenouillet fait partie de notre circuit nord. Nous intervenons pour le nettoyage de canapés, matelas, tapis et voitures dans les maisons et appartements de la commune.",
    para2:
      "La commune de Fenouillet est en développement résidentiel avec des quartiers récents. Nos services sont appréciés par les nouveaux propriétaires qui souhaitent maintenir l'état de leurs textiles.",
    faq: [
      {
        q: "Y a-t-il des frais de déplacement pour Fenouillet ?",
        a: "Non, Fenouillet est dans notre zone gratuite.",
      },
      {
        q: "Nettoyez-vous les matelas à Fenouillet ?",
        a: "Oui, à partir de 39 € pour un matelas enfant.",
      },
      {
        q: "Proposez-vous le nettoyage auto à Fenouillet ?",
        a: "Oui, directement à votre domicile.",
      },
    ],
    nearby: ["Toulouse", "Castelginest", "Bruguières", "Launaguet"],
  },
  {
    name: "Quint-Fonsegrives",
    slug: "nettoyage-quint-fonsegrives",
    postalCode: "31130",
    cityContext:
      "Quint-Fonsegrives est une commune de l'est toulousain d'environ 5 000 habitants, jouxtant Balma, dans un cadre verdoyant.",
    para1:
      "Quint-Fonsegrives est dans notre circuit est. Nous intervenons dans les maisons et lotissements pour le nettoyage de canapés, matelas, tapis et habitacles de voitures.",
    para2:
      "Commune prisée des familles pour sa qualité de vie, Quint-Fonsegrives compte des propriétaires qui font appel à nos services pour l'entretien saisonnier de leurs textiles. Produits Écolabel, résultat garanti.",
    faq: [
      {
        q: "Y a-t-il des frais de déplacement pour Quint-Fonsegrives ?",
        a: "Non, Quint-Fonsegrives est dans notre zone gratuite.",
      },
      {
        q: "Nettoyez-vous les tapis orientaux à Quint-Fonsegrives ?",
        a: "Oui, laine, soie artificielle, fibres naturelles. Test de compatibilité systématique.",
      },
      {
        q: "Quel est le délai pour une intervention à Quint-Fonsegrives ?",
        a: "Sous 24-48h selon les créneaux.",
      },
    ],
    nearby: ["Toulouse", "Balma", "Escalquens", "Castanet-Tolosan"],
  },
  {
    name: "Saint-Lys",
    slug: "nettoyage-saint-lys",
    postalCode: "31470",
    cityContext:
      "Saint-Lys est une commune de l'ouest toulousain d'environ 10 000 habitants, carrefour entre Toulouse et la Gascogne.",
    para1:
      "Saint-Lys est dans notre circuit ouest. Nous intervenons pour le nettoyage de canapés, matelas, tapis et voitures dans les maisons individuelles de la commune.",
    para2:
      "Commune en croissance, Saint-Lys attire des familles qui apprécient l'espace et le calme. Nos services à domicile leur évitent tout déplacement. Devis gratuit sous 24h.",
    faq: [
      {
        q: "Y a-t-il des frais de déplacement pour Saint-Lys ?",
        a: "Saint-Lys est à environ 22 km de Toulouse. Un forfait de 10 € peut s'appliquer selon l'adresse exacte.",
      },
      {
        q: "Nettoyez-vous les canapés à Saint-Lys ?",
        a: "Oui, à partir de 79 € pour un canapé 2/3 places.",
      },
      {
        q: "Intervenez-vous le week-end à Saint-Lys ?",
        a: "Oui, le samedi selon disponibilités.",
      },
    ],
    nearby: ["Toulouse", "Fonsorbes", "Léguevin", "La Salvetat-Saint-Gilles"],
  },
  {
    name: "Eaunes",
    slug: "nettoyage-eaunes",
    postalCode: "31600",
    cityContext:
      "Eaunes est une commune de 4 000 habitants au sud de Toulouse, proche de Muret, dans un cadre rural et résidentiel.",
    para1:
      "Eaunes est dans notre circuit sud, à proximité de Muret. Nos techniciens interviennent dans les maisons individuelles pour le nettoyage de canapés, matelas et tapis.",
    para2:
      "Commune rurale avec un fort taux de maisons individuelles, Eaunes accueille des familles qui font appel à nos services pour l'entretien de leurs textiles. Nos tarifs sont identiques à ceux de Toulouse.",
    faq: [
      {
        q: "Y a-t-il des frais de déplacement pour Eaunes ?",
        a: "Eaunes est à environ 22 km de Toulouse. Un forfait de 10 € peut s'appliquer selon l'adresse.",
      },
      {
        q: "Nettoyez-vous les matelas à Eaunes ?",
        a: "Oui, dès 39 € (enfant), 59 € (1 place), 99 € (2 places).",
      },
      {
        q: "Proposez-vous le nettoyage de terrasse à Eaunes ?",
        a: "Oui, nettoyage haute pression. Devis gratuit sur photos.",
      },
    ],
    nearby: ["Toulouse", "Muret", "Seysses", "Portet-sur-Garonne"],
  },
  {
    name: "Roques",
    slug: "nettoyage-roques",
    postalCode: "31120",
    cityContext:
      "Roques est une commune de 6 000 habitants au sud de Toulouse, entre Portet-sur-Garonne et Muret, le long de la Garonne.",
    para1:
      "Roques est dans notre circuit sud. Nous intervenons pour le nettoyage de canapés, matelas, tapis et voitures dans les maisons et résidences de la commune.",
    para2:
      "Commune résidentielle en bord de Garonne, Roques accueille des familles qui apprécient notre service à domicile rapide et sans contrainte.",
    faq: [
      {
        q: "Y a-t-il des frais de déplacement pour Roques ?",
        a: "Roques est à environ 15 km de Toulouse — zone gratuite.",
      },
      {
        q: "Nettoyez-vous les canapés à Roques ?",
        a: "Oui, à partir de 79 € pour un canapé 2/3 places.",
      },
      {
        q: "Intervenez-vous le week-end à Roques ?",
        a: "Oui, selon les créneaux disponibles.",
      },
    ],
    nearby: ["Toulouse", "Portet-sur-Garonne", "Muret", "Eaunes"],
  },
  {
    name: "Bruguières",
    slug: "nettoyage-bruguieres",
    postalCode: "31150",
    cityContext:
      "Bruguières est une commune du nord de Toulouse d'environ 5 000 habitants, à 15 km, proche de Fenouillet et de Castelginest.",
    para1:
      "Bruguières est dans notre circuit nord. Nos techniciens interviennent dans les maisons et lotissements de la commune pour le nettoyage de canapés, matelas et tapis.",
    para2:
      "Commune résidentielle avec un développement pavillonnaire soutenu, Bruguières voit arriver de nombreuses familles qui font confiance à nos services pour l'entretien de leurs textiles.",
    faq: [
      {
        q: "Y a-t-il des frais de déplacement pour Bruguières ?",
        a: "Non, Bruguières est dans notre zone gratuite.",
      },
      {
        q: "Nettoyez-vous les tapis à Bruguières ?",
        a: "Oui, à partir de 49 € pour 1 tapis.",
      },
      {
        q: "Proposez-vous le nettoyage auto à Bruguières ?",
        a: "Oui, directement à votre domicile.",
      },
    ],
    nearby: ["Toulouse", "Fenouillet", "Castelginest", "Launaguet"],
  },
  {
    name: "La Salvetat-Saint-Gilles",
    slug: "nettoyage-la-salvetat-saint-gilles",
    postalCode: "31880",
    cityContext:
      "La Salvetat-Saint-Gilles est une commune de l'ouest toulousain d'environ 6 000 habitants, entre Pibrac et Léguevin, dans un cadre verdoyant.",
    para1:
      "La Salvetat-Saint-Gilles est dans notre circuit ouest. Nous intervenons dans les maisons individuelles de la commune pour le nettoyage de canapés, matelas, tapis et habitacles de voitures.",
    para2:
      "Commune résidentielle verdoyante, La Salvetat accueille des familles qui apprécient le service clé en main à domicile. Devis gratuit, réponse sous 24h.",
    faq: [
      {
        q: "Y a-t-il des frais de déplacement pour La Salvetat-Saint-Gilles ?",
        a: "Non, La Salvetat est dans notre zone gratuite.",
      },
      {
        q: "Nettoyez-vous les canapés à La Salvetat-Saint-Gilles ?",
        a: "Oui, à partir de 79 € pour un canapé 2/3 places.",
      },
      {
        q: "Intervenez-vous pour les fins de chantier à La Salvetat ?",
        a: "Oui, nettoyage après travaux pour particuliers. Devis rapide.",
      },
    ],
    nearby: ["Toulouse", "Pibrac", "Léguevin", "Cornebarrieu"],
  },
  {
    name: "Castelmaurou",
    slug: "nettoyage-castelmaurou",
    postalCode: "31180",
    cityContext:
      "Castelmaurou est une commune du nord-est toulousain d'environ 4 000 habitants, dans un cadre rural et résidentiel.",
    para1:
      "Castelmaurou est dans notre circuit nord-est. Nous intervenons à domicile pour le nettoyage de canapés, matelas et tapis dans les maisons de la commune.",
    para2:
      "Commune rurale et calme, Castelmaurou attire des familles qui cherchent à entretenir leurs textiles sans avoir à se déplacer. Nos techniciens viennent avec tout le matériel.",
    faq: [
      {
        q: "Y a-t-il des frais de déplacement pour Castelmaurou ?",
        a: "Castelmaurou est à environ 17 km de Toulouse — zone gratuite.",
      },
      {
        q: "Nettoyez-vous les matelas à Castelmaurou ?",
        a: "Oui, à partir de 39 € pour un matelas enfant.",
      },
      {
        q: "Intervenez-vous le week-end à Castelmaurou ?",
        a: "Oui, le samedi selon disponibilités.",
      },
    ],
    nearby: ["Toulouse", "L'Union", "Saint-Jean", "Quint-Fonsegrives"],
  },
  {
    name: "Auzeville-Tolosane",
    slug: "nettoyage-auzeville-tolosane",
    postalCode: "31320",
    cityContext:
      "Auzeville-Tolosane est une commune du sud-est toulousain d'environ 3 000 habitants, entre Ramonville et Castanet-Tolosan.",
    para1:
      "Auzeville-Tolosane est dans notre circuit sud-est. Nous intervenons pour le nettoyage de canapés, matelas et tapis dans les maisons individuelles de cette commune résidentielle.",
    para2:
      "Proche du pôle universitaire de Rangueil, Auzeville-Tolosane accueille des familles et des scientifiques du secteur agri-environnemental. Nos produits Écolabel sont en phase avec leur sensibilité environnementale.",
    faq: [
      {
        q: "Y a-t-il des frais de déplacement pour Auzeville-Tolosane ?",
        a: "Non, Auzeville-Tolosane est dans notre zone gratuite.",
      },
      {
        q: "Nettoyez-vous les canapés à Auzeville-Tolosane ?",
        a: "Oui, à partir de 79 € pour un canapé 2/3 places.",
      },
      {
        q: "Proposez-vous le nettoyage auto à Auzeville-Tolosane ?",
        a: "Oui, directement à votre domicile.",
      },
    ],
    nearby: ["Toulouse", "Ramonville-Saint-Agne", "Castanet-Tolosan", "Escalquens"],
  },
  {
    name: "Pins-Justaret",
    slug: "nettoyage-pins-justaret",
    postalCode: "31860",
    cityContext:
      "Pins-Justaret est une commune de 5 000 habitants au sud de Toulouse, entre Muret et Portet-sur-Garonne, dans un environnement verdoyant.",
    para1:
      "Pins-Justaret est dans notre circuit sud. Nos techniciens interviennent dans les maisons individuelles et les lotissements pour le nettoyage de canapés, matelas et tapis.",
    para2:
      "Commune prisée pour sa tranquillité, Pins-Justaret accueille des familles en maison individuelle qui apprécient notre service clé en main. Tarifs identiques à Toulouse.",
    faq: [
      {
        q: "Y a-t-il des frais de déplacement pour Pins-Justaret ?",
        a: "Pins-Justaret est à environ 18 km de Toulouse — zone gratuite.",
      },
      {
        q: "Nettoyez-vous les matelas à Pins-Justaret ?",
        a: "Oui, dès 39 € pour un matelas enfant.",
      },
      {
        q: "Intervenez-vous le week-end à Pins-Justaret ?",
        a: "Oui, le samedi selon disponibilités.",
      },
    ],
    nearby: ["Toulouse", "Muret", "Portet-sur-Garonne", "Eaunes"],
  },
  {
    name: "Gratentour",
    slug: "nettoyage-gratentour",
    postalCode: "31150",
    cityContext:
      "Gratentour est une commune du nord de Toulouse d'environ 4 000 habitants, proche de Bruguières et de Fenouillet.",
    para1:
      "Gratentour est dans notre circuit nord. Nous intervenons à domicile pour le nettoyage de canapés, matelas et tapis dans les maisons individuelles de la commune.",
    para2:
      "Commune rurale en développement résidentiel, Gratentour accueille des familles qui font confiance à notre sérieux et notre ponctualité. Devis gratuit, réponse sous 24h.",
    faq: [
      {
        q: "Y a-t-il des frais de déplacement pour Gratentour ?",
        a: "Non, Gratentour est dans notre zone gratuite.",
      },
      {
        q: "Nettoyez-vous les canapés à Gratentour ?",
        a: "Oui, à partir de 79 € pour un canapé 2/3 places.",
      },
      {
        q: "Proposez-vous le nettoyage tapis à Gratentour ?",
        a: "Oui, à partir de 49 € pour 1 tapis.",
      },
    ],
    nearby: ["Toulouse", "Bruguières", "Fenouillet", "Castelginest"],
  },
];

export function getCommuneData(slug: string): CommuneData | undefined {
  return COMMUNES_DATA.find((c) => c.slug === slug);
}
