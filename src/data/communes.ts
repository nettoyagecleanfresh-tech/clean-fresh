import { DISPLACEMENT_RULES } from "@/data/site";

export type CommuneData = {
  name: string;
  slug: string;
  postalCode: string;
  cityContext: string;
  para1: string;
  para2: string;
  faq: { q: string; a: string }[];
  nearby: string[];
};

export const LOCAL_TRAVEL_NOTE = `Déplacement offert jusqu’à ${DISPLACEMENT_RULES.freeKm} km. Au-delà, un supplément est calculé selon l’adresse et confirmé avant votre accord.`;

// These pages describe service coverage, not local branches or unverified customer history.
export const COMMUNES_DATA: CommuneData[] = [
  {
    name: "Toulouse",
    slug: "nettoyage-toulouse",
    postalCode: "31000",
    cityContext: "Intervention à domicile à Toulouse (31000), sur rendez-vous.",
    para1:
      "Canapé dans un appartement, intérieur de voiture ou logement à préparer avant un état des lieux : choisissez une réservation directe pour les textiles et l’auto, ou un devis pour le logement.",
    para2:
      "En centre-ville comme dans les autres quartiers, indiquez l’étage, l’ascenseur, le digicode et les possibilités de stationnement. Ces informations permettent de préparer le transport du matériel jusqu’à votre porte.",
    faq: [
      {
        q: "Comment préparer une intervention dans un appartement ?",
        a: "Dégagez le passage et l’espace autour des éléments à nettoyer. Signalez les escaliers ou un stationnement éloigné ; un point d’eau et une prise électrique accessibles sont nécessaires.",
      },
      {
        q: "Comment connaître le prix du déplacement à Toulouse ?",
        a: LOCAL_TRAVEL_NOTE,
      },
      {
        q: "Comment choisir un créneau à Toulouse ?",
        a: "Les disponibilités des prestations réservables sont affichées en ligne après votre sélection. Pour les nettoyages sur devis, indiquez la date souhaitée ; le créneau est convenu avec vous après validation de la prestation.",
      },
    ],
    nearby: ["Blagnac", "Colomiers", "Tournefeuille", "Balma"],
  },
  {
    name: "Colomiers",
    slug: "nettoyage-colomiers",
    postalCode: "31770",
    cityContext: "Intervention à domicile à Colomiers (31770), sur rendez-vous.",
    para1:
      "À Colomiers, Clean&Fresh se déplace pour nettoyer vos textiles et l’intérieur de votre véhicule. Vous pouvez réunir canapé, matelas et auto dans une même demande.",
    para2:
      "Pour une intervention automobile à domicile ou au travail, vérifiez que le véhicule reste accessible pendant tout le rendez-vous et que le stationnement permet d’ouvrir les portes.",
    faq: [
      {
        q: "Peut-on faire nettoyer sa voiture sur son lieu de travail à Colomiers ?",
        a: "Oui, si l’emplacement est autorisé, accessible et adapté au travail autour du véhicule. Prévoyez un point d’eau et une prise électrique accessibles ; précisez ces conditions avant le rendez-vous.",
      },
      {
        q: "Comment connaître le prix du déplacement à Colomiers ?",
        a: LOCAL_TRAVEL_NOTE,
      },
      {
        q: "Comment choisir un créneau à Colomiers ?",
        a: "Les disponibilités des prestations réservables sont affichées en ligne après votre sélection. Pour les nettoyages sur devis, indiquez la date souhaitée ; le créneau est convenu avec vous après validation de la prestation.",
      },
    ],
    nearby: ["Toulouse", "Plaisance-du-Touch", "Léguevin", "Cornebarrieu"],
  },
  {
    name: "Tournefeuille",
    slug: "nettoyage-tournefeuille",
    postalCode: "31170",
    cityContext: "Intervention à domicile à Tournefeuille (31170), sur rendez-vous.",
    para1:
      "À Tournefeuille, faites entretenir canapé, fauteuils, matelas et tapis sans les transporter. La formule se choisit selon le mobilier, sa matière et son état.",
    para2:
      "Pour plusieurs textiles dans une même maison, ajoutez chaque élément à la réservation. Préparez les pièces pour laisser circuler l’air après le nettoyage et attendez le séchage complet avant de réutiliser le mobilier.",
    faq: [
      {
        q: "Peut-on nettoyer un canapé et plusieurs matelas lors du même passage ?",
        a: "Oui, ajoutez les prestations souhaitées à la réservation. Le temps nécessaire et le total sont calculés en fonction de votre sélection ; signalez les matières délicates ou les taches importantes en amont.",
      },
      {
        q: "Comment connaître le prix du déplacement à Tournefeuille ?",
        a: LOCAL_TRAVEL_NOTE,
      },
      {
        q: "Comment choisir un créneau à Tournefeuille ?",
        a: "Les disponibilités des prestations réservables sont affichées en ligne après votre sélection. Pour les nettoyages sur devis, indiquez la date souhaitée ; le créneau est convenu avec vous après validation de la prestation.",
      },
    ],
    nearby: ["Toulouse", "Colomiers", "Plaisance-du-Touch", "Fonsorbes"],
  },
  {
    name: "Blagnac",
    slug: "nettoyage-blagnac",
    postalCode: "31700",
    cityContext: "Intervention à domicile à Blagnac (31700), sur rendez-vous.",
    para1:
      "Clean&Fresh intervient à Blagnac pour les textiles du logement, l’intérieur des véhicules et les besoins de nettoyage des professionnels, sur rendez-vous.",
    para2:
      "Sur un parking d’entreprise ou dans un bâtiment avec contrôle d’accès, prévenez la personne responsable et transmettez les consignes d’arrivée. Pour des fauteuils ou une moquette de bureau, indiquez la quantité et la plage horaire souhaitée.",
    faq: [
      {
        q: "Comment organiser un nettoyage dans des locaux professionnels à Blagnac ?",
        a: "Envoyez la surface ou le nombre d’assises, quelques photos et les contraintes d’accès. Nous vérifions le besoin de séchage et les horaires possibles avant de confirmer le devis.",
      },
      {
        q: "Comment connaître le prix du déplacement à Blagnac ?",
        a: LOCAL_TRAVEL_NOTE,
      },
      {
        q: "Comment choisir un créneau à Blagnac ?",
        a: "Les disponibilités des prestations réservables sont affichées en ligne après votre sélection. Pour les nettoyages sur devis, indiquez la date souhaitée ; le créneau est convenu avec vous après validation de la prestation.",
      },
    ],
    nearby: ["Toulouse", "Cornebarrieu", "Beauzelle", "Aussonne"],
  },
  {
    name: "Muret",
    slug: "nettoyage-muret",
    postalCode: "31600",
    cityContext: "Intervention à domicile à Muret (31600), sur rendez-vous.",
    para1:
      "Pour votre logement à Muret, Clean&Fresh propose le nettoyage des textiles, de l’intérieur automobile et les remises en état sur devis.",
    para2:
      "Une fin de bail et un nettoyage de canapé n’ont pas le même périmètre. Précisez séparément les pièces, les équipements et les textiles concernés pour recevoir une proposition adaptée à l’ensemble de votre besoin.",
    faq: [
      {
        q: "Que faut-il envoyer pour un devis de fin de bail à Muret ?",
        a: "La surface, la date souhaitée, l’état du logement et des photos de la cuisine, des sanitaires, des sols et des vitrages accessibles. Les murs, plafonds et textiles sont à signaler séparément pour vérification.",
      },
      {
        q: "Comment connaître le prix du déplacement à Muret ?",
        a: LOCAL_TRAVEL_NOTE,
      },
      {
        q: "Comment choisir un créneau à Muret ?",
        a: "Les disponibilités des prestations réservables sont affichées en ligne après votre sélection. Pour les nettoyages sur devis, indiquez la date souhaitée ; le créneau est convenu avec vous après validation de la prestation.",
      },
    ],
    nearby: ["Toulouse", "Seysses", "Eaunes", "Portet-sur-Garonne"],
  },
  {
    name: "Cugnaux",
    slug: "nettoyage-cugnaux",
    postalCode: "31270",
    cityContext: "Intervention à domicile à Cugnaux (31270), sur rendez-vous.",
    para1:
      "À Cugnaux, réservez le nettoyage de votre canapé ou de votre literie, ou demandez un devis pour remettre votre logement au propre après un départ ou des travaux.",
    para2:
      "Pour un logement vide, gardez l’eau et l’électricité en service jusqu’à l’intervention. Si vous avez déjà déménagé, précisez les modalités de remise et de restitution des clés.",
    faq: [
      {
        q: "Le logement doit-il être vide pour une remise en état ?",
        a: "Un logement vide facilite l’accès aux sols et aux placards. S’il reste meublé, envoyez des photos et indiquez les surfaces à traiter : nous adaptons le périmètre du devis à ce qui est accessible.",
      },
      {
        q: "Comment connaître le prix du déplacement à Cugnaux ?",
        a: LOCAL_TRAVEL_NOTE,
      },
      {
        q: "Comment choisir un créneau à Cugnaux ?",
        a: "Les disponibilités des prestations réservables sont affichées en ligne après votre sélection. Pour les nettoyages sur devis, indiquez la date souhaitée ; le créneau est convenu avec vous après validation de la prestation.",
      },
    ],
    nearby: ["Toulouse", "Villeneuve-Tolosane", "Frouzins", "Muret"],
  },
  {
    name: "Balma",
    slug: "nettoyage-balma",
    postalCode: "31130",
    cityContext: "Intervention à domicile à Balma (31130), sur rendez-vous.",
    para1:
      "Clean&Fresh intervient à Balma pour nettoyer les canapés, matelas, tapis, moquettes et intérieurs automobiles. Les besoins de logement ou de vitrerie sont étudiés sur devis.",
    para2:
      "Pour une moquette, indiquez la surface et les meubles qui resteront en place. Une photo des zones marquées aide à choisir le traitement et à prévoir le temps nécessaire.",
    faq: [
      {
        q: "Comment préparer une pièce avant un nettoyage de moquette à Balma ?",
        a: "Retirez les petits objets et dégagez les zones à traiter. Signalez les meubles lourds qui ne peuvent pas être déplacés et prévoyez une aération ainsi qu’un temps de séchage avant de marcher à nouveau sur la surface.",
      },
      {
        q: "Comment connaître le prix du déplacement à Balma ?",
        a: LOCAL_TRAVEL_NOTE,
      },
      {
        q: "Comment choisir un créneau à Balma ?",
        a: "Les disponibilités des prestations réservables sont affichées en ligne après votre sélection. Pour les nettoyages sur devis, indiquez la date souhaitée ; le créneau est convenu avec vous après validation de la prestation.",
      },
    ],
    nearby: ["Toulouse", "Quint-Fonsegrives", "Escalquens", "Castanet-Tolosan"],
  },
  {
    name: "Ramonville-Saint-Agne",
    slug: "nettoyage-ramonville-saint-agne",
    postalCode: "31520",
    cityContext: "Intervention à domicile à Ramonville-Saint-Agne (31520), sur rendez-vous.",
    para1:
      "À Ramonville-Saint-Agne, nous intervenons à domicile pour les canapés, la literie, les tapis et les véhicules, ainsi que pour le nettoyage du logement sur devis.",
    para2:
      "Dans une résidence, indiquez le bâtiment et l’étage en plus de l’adresse. Pour un matelas, retirez les draps avant notre arrivée et prévoyez de ne pas l’utiliser tant que les deux faces ne sont pas sèches.",
    faq: [
      {
        q: "Les deux faces du matelas sont-elles nettoyées ?",
        a: "Les formules matelas incluent les deux faces. Nous vérifions la compatibilité du revêtement et l’accès au matelas ; indiquez toute particularité de manipulation ou de matière avant le rendez-vous.",
      },
      {
        q: "Comment connaître le prix du déplacement à Ramonville-Saint-Agne ?",
        a: LOCAL_TRAVEL_NOTE,
      },
      {
        q: "Comment choisir un créneau à Ramonville-Saint-Agne ?",
        a: "Les disponibilités des prestations réservables sont affichées en ligne après votre sélection. Pour les nettoyages sur devis, indiquez la date souhaitée ; le créneau est convenu avec vous après validation de la prestation.",
      },
    ],
    nearby: ["Toulouse", "Castanet-Tolosan", "Auzeville-Tolosane", "Saint-Orens-de-Gameville"],
  },
  {
    name: "Castanet-Tolosan",
    slug: "nettoyage-castanet-tolosan",
    postalCode: "31320",
    cityContext: "Intervention à domicile à Castanet-Tolosan (31320), sur rendez-vous.",
    para1:
      "À Castanet-Tolosan, Clean&Fresh prend en charge les textiles et l’auto à domicile. Pour un nettoyage avant emménagement ou après déménagement, demandez un devis sur photos.",
    para2:
      "Avant l’arrivée des meubles, il est plus simple d’accéder aux plinthes, placards et sols. Indiquez la date de remise des clés pour convenir d’un créneau compatible avec votre organisation.",
    faq: [
      {
        q: "Quand prévoir le nettoyage avant un emménagement ?",
        a: "Privilégiez un créneau après les derniers travaux et avant l’installation des meubles, avec eau et électricité disponibles. La date et le périmètre sont confirmés avec le devis.",
      },
      {
        q: "Comment connaître le prix du déplacement à Castanet-Tolosan ?",
        a: LOCAL_TRAVEL_NOTE,
      },
      {
        q: "Comment choisir un créneau à Castanet-Tolosan ?",
        a: "Les disponibilités des prestations réservables sont affichées en ligne après votre sélection. Pour les nettoyages sur devis, indiquez la date souhaitée ; le créneau est convenu avec vous après validation de la prestation.",
      },
    ],
    nearby: ["Toulouse", "Auzeville-Tolosane", "Ramonville-Saint-Agne", "Escalquens"],
  },
  {
    name: "Plaisance-du-Touch",
    slug: "nettoyage-plaisance-du-touch",
    postalCode: "31830",
    cityContext: "Intervention à domicile à Plaisance-du-Touch (31830), sur rendez-vous.",
    para1:
      "À Plaisance-du-Touch, choisissez un nettoyage de canapé, de matelas, de tapis ou d’auto à domicile. Les surfaces du logement et les extérieurs font l’objet d’un devis.",
    para2:
      "Pour une terrasse, une vue d’ensemble et une photo rapprochée du revêtement sont utiles. Précisez la surface approximative et l’accès à l’eau ; la méthode est choisie après vérification du support.",
    faq: [
      {
        q: "Peut-on prévoir une terrasse et des textiles dans la même demande ?",
        a: "Oui, détaillez les éléments à nettoyer et joignez des photos. Les textiles et la terrasse nécessitent des méthodes et des durées différentes : nous confirmons le périmètre et l’organisation avant intervention.",
      },
      {
        q: "Comment connaître le prix du déplacement à Plaisance-du-Touch ?",
        a: LOCAL_TRAVEL_NOTE,
      },
      {
        q: "Comment choisir un créneau à Plaisance-du-Touch ?",
        a: "Les disponibilités des prestations réservables sont affichées en ligne après votre sélection. Pour les nettoyages sur devis, indiquez la date souhaitée ; le créneau est convenu avec vous après validation de la prestation.",
      },
    ],
    nearby: ["Toulouse", "Colomiers", "Tournefeuille", "Léguevin"],
  },
  {
    name: "Saint-Orens-de-Gameville",
    slug: "nettoyage-saint-orens-de-gameville",
    postalCode: "31650",
    cityContext: "Intervention à domicile à Saint-Orens-de-Gameville (31650), sur rendez-vous.",
    para1:
      "Clean&Fresh se déplace à Saint-Orens-de-Gameville pour le nettoyage du mobilier textile, de la literie et des habitacles automobiles, sur rendez-vous.",
    para2:
      "Si vous avez des animaux, précisez la présence de poils ou d’odeurs lors de la réservation. Le nettoyage courant et les traitements intensifs sont distingués pour sélectionner les options adaptées.",
    faq: [
      {
        q: "Quelle option choisir en présence de poils d’animaux ?",
        a: "Signalez les poils sur le canapé, les tapis ou les sièges de voiture et ajoutez l’option correspondante si nécessaire. Une photo permet de vérifier l’état et le temps à prévoir ; les odeurs persistantes peuvent demander un traitement distinct.",
      },
      {
        q: "Comment connaître le prix du déplacement à Saint-Orens-de-Gameville ?",
        a: LOCAL_TRAVEL_NOTE,
      },
      {
        q: "Comment choisir un créneau à Saint-Orens-de-Gameville ?",
        a: "Les disponibilités des prestations réservables sont affichées en ligne après votre sélection. Pour les nettoyages sur devis, indiquez la date souhaitée ; le créneau est convenu avec vous après validation de la prestation.",
      },
    ],
    nearby: ["Toulouse", "Ramonville-Saint-Agne", "Castanet-Tolosan", "Escalquens"],
  },
  {
    name: "L'Union",
    slug: "nettoyage-l-union",
    postalCode: "31240",
    cityContext: "Intervention à domicile à L'Union (31240), sur rendez-vous.",
    para1:
      "À L’Union, nous proposons le nettoyage à domicile des textiles et des véhicules. Les vitres, le logement et les remises en état sont chiffrés selon votre besoin.",
    para2:
      "Pour un canapé en cuir, une photo de l’ensemble et des zones marquées permet de distinguer salissures et usure. Le cuir reçoit un nettoyage manuel adapté, différent du shampouinage d’un tissu.",
    faq: [
      {
        q: "Le nettoyage peut-il réparer un cuir usé ou rayé ?",
        a: "Non, le nettoyage traite les salissures. Les rayures, craquelures et pertes de couleur relèvent d’une réparation ou d’une rénovation distincte. Le soin nourrissant et protecteur est proposé en option selon le revêtement.",
      },
      {
        q: "Comment connaître le prix du déplacement à L'Union ?",
        a: LOCAL_TRAVEL_NOTE,
      },
      {
        q: "Comment choisir un créneau à L'Union ?",
        a: "Les disponibilités des prestations réservables sont affichées en ligne après votre sélection. Pour les nettoyages sur devis, indiquez la date souhaitée ; le créneau est convenu avec vous après validation de la prestation.",
      },
    ],
    nearby: ["Toulouse", "Saint-Jean", "Aucamville", "Launaguet"],
  },
  {
    name: "Fonsorbes",
    slug: "nettoyage-fonsorbes",
    postalCode: "31470",
    cityContext: "Intervention à domicile à Fonsorbes (31470), sur rendez-vous.",
    para1:
      "Clean&Fresh intervient à Fonsorbes sur rendez-vous pour les textiles, l’intérieur automobile et les besoins de nettoyage du logement sur devis.",
    para2:
      "Pour regrouper plusieurs éléments, indiquez dès la demande le nombre de canapés, matelas ou tapis et l’adresse complète. Cela permet de prévoir le bon temps de présence et de confirmer les éventuels frais de déplacement.",
    faq: [
      {
        q: "Comment faire une demande pour plusieurs pièces à Fonsorbes ?",
        a: "Listez chaque élément et sa taille, puis ajoutez des photos si l’état est particulier. Vous pouvez réunir plusieurs prestations réservables dans le même panier ; les remises en état du logement restent sur devis.",
      },
      {
        q: "Comment connaître le prix du déplacement à Fonsorbes ?",
        a: LOCAL_TRAVEL_NOTE,
      },
      {
        q: "Comment choisir un créneau à Fonsorbes ?",
        a: "Les disponibilités des prestations réservables sont affichées en ligne après votre sélection. Pour les nettoyages sur devis, indiquez la date souhaitée ; le créneau est convenu avec vous après validation de la prestation.",
      },
    ],
    nearby: ["Toulouse", "Colomiers", "Saint-Lys", "Léguevin"],
  },
  {
    name: "Villeneuve-Tolosane",
    slug: "nettoyage-villeneuve-tolosane",
    postalCode: "31270",
    cityContext: "Intervention à domicile à Villeneuve-Tolosane (31270), sur rendez-vous.",
    para1:
      "À Villeneuve-Tolosane, faites nettoyer canapé, matelas, tapis et intérieur de voiture directement à votre adresse. Nous étudions aussi les nettoyages de logement avant ou après un déménagement.",
    para2:
      "Un textile d’occasion peut demander un diagnostic avant nettoyage : précisez sa matière, les taches visibles et les produits déjà appliqués. Une photo de l’étiquette d’entretien est utile si elle est disponible.",
    faq: [
      {
        q: "Faut-il nous signaler un détachant déjà utilisé ?",
        a: "Oui. Indiquez les produits appliqués, notamment sur une auréole ou une tache ancienne. Ces informations aident à vérifier la compatibilité et à éviter de multiplier des traitements inadaptés.",
      },
      {
        q: "Comment connaître le prix du déplacement à Villeneuve-Tolosane ?",
        a: LOCAL_TRAVEL_NOTE,
      },
      {
        q: "Comment choisir un créneau à Villeneuve-Tolosane ?",
        a: "Les disponibilités des prestations réservables sont affichées en ligne après votre sélection. Pour les nettoyages sur devis, indiquez la date souhaitée ; le créneau est convenu avec vous après validation de la prestation.",
      },
    ],
    nearby: ["Toulouse", "Cugnaux", "Frouzins", "Muret"],
  },
  {
    name: "Portet-sur-Garonne",
    slug: "nettoyage-portet-sur-garonne",
    postalCode: "31120",
    cityContext: "Intervention à domicile à Portet-sur-Garonne (31120), sur rendez-vous.",
    para1:
      "À Portet-sur-Garonne, Clean&Fresh propose les nettoyages textiles et automobiles à domicile, ainsi que les interventions dans les locaux professionnels sur devis.",
    para2:
      "Pour des assises ou une moquette d’entreprise, précisez les horaires d’ouverture et les zones qui doivent rester accessibles. Le séchage doit être intégré à l’organisation de la reprise d’activité.",
    faq: [
      {
        q: "Peut-on organiser le nettoyage de sièges de bureau ?",
        a: "Oui, transmettez le nombre de sièges, leur revêtement et quelques photos. Nous établissons un devis et vérifions un créneau compatible avec l’accès aux locaux et le temps de séchage.",
      },
      {
        q: "Comment connaître le prix du déplacement à Portet-sur-Garonne ?",
        a: LOCAL_TRAVEL_NOTE,
      },
      {
        q: "Comment choisir un créneau à Portet-sur-Garonne ?",
        a: "Les disponibilités des prestations réservables sont affichées en ligne après votre sélection. Pour les nettoyages sur devis, indiquez la date souhaitée ; le créneau est convenu avec vous après validation de la prestation.",
      },
    ],
    nearby: ["Toulouse", "Muret", "Roques", "Seysses"],
  },
  {
    name: "Aucamville",
    slug: "nettoyage-aucamville",
    postalCode: "31140",
    cityContext: "Intervention à domicile à Aucamville (31140), sur rendez-vous.",
    para1:
      "À Aucamville, réservez le nettoyage de vos assises, de votre literie ou de vos tapis. L’intervention se déroule chez vous avec un matériel adapté aux supports compatibles.",
    para2:
      "Une tache récente, une auréole ancienne et une odeur persistante ne se traitent pas de la même façon. Décrivez leur origine si vous la connaissez, sans ajouter de mélange de produits avant notre passage.",
    faq: [
      {
        q: "Peut-on garantir la disparition de toutes les taches ?",
        a: "Le résultat dépend de la matière, de l’ancienneté et des produits déjà utilisés. Nous évaluons les marques avant traitement et travaillons à améliorer l’état du textile, sans promettre un rattrapage à 100 %.",
      },
      {
        q: "Comment connaître le prix du déplacement à Aucamville ?",
        a: LOCAL_TRAVEL_NOTE,
      },
      {
        q: "Comment choisir un créneau à Aucamville ?",
        a: "Les disponibilités des prestations réservables sont affichées en ligne après votre sélection. Pour les nettoyages sur devis, indiquez la date souhaitée ; le créneau est convenu avec vous après validation de la prestation.",
      },
    ],
    nearby: ["Toulouse", "Launaguet", "Saint-Alban", "Castelginest"],
  },
  {
    name: "Castelginest",
    slug: "nettoyage-castelginest",
    postalCode: "31780",
    cityContext: "Intervention à domicile à Castelginest (31780), sur rendez-vous.",
    para1:
      "Clean&Fresh intervient à Castelginest pour le nettoyage de canapés, matelas, tapis, moquettes et intérieurs de véhicules.",
    para2:
      "Pour un tapis, précisez ses dimensions et sa matière. Les formules standards couvrent les formats compatibles indiqués à la réservation ; les tapis de valeur, fibres délicates ou grands formats nécessitent une vérification préalable.",
    faq: [
      {
        q: "Comment réserver pour un tapis de grande taille ?",
        a: "Envoyez ses dimensions et des photos avant de sélectionner une formule standard. Nous vérifions la fibre, les couleurs et les conditions de nettoyage à domicile, puis confirmons le tarif adapté.",
      },
      {
        q: "Comment connaître le prix du déplacement à Castelginest ?",
        a: LOCAL_TRAVEL_NOTE,
      },
      {
        q: "Comment choisir un créneau à Castelginest ?",
        a: "Les disponibilités des prestations réservables sont affichées en ligne après votre sélection. Pour les nettoyages sur devis, indiquez la date souhaitée ; le créneau est convenu avec vous après validation de la prestation.",
      },
    ],
    nearby: ["Toulouse", "Aucamville", "Launaguet", "Fenouillet"],
  },
  {
    name: "Launaguet",
    slug: "nettoyage-launaguet",
    postalCode: "31140",
    cityContext: "Intervention à domicile à Launaguet (31140), sur rendez-vous.",
    para1:
      "À Launaguet, nous nettoyons les textiles et l’intérieur des véhicules à domicile. Pour les besoins plus larges du logement, une demande sur photos permet d’établir le devis.",
    para2:
      "Vous souhaitez traiter plusieurs chambres ? Indiquez le nombre et la taille des matelas, puis préparez un espace accessible autour de chaque lit. La durée de séchage dépend notamment de la matière et de l’aération.",
    faq: [
      {
        q: "Peut-on dormir sur le matelas juste après le nettoyage ?",
        a: "Attendez le séchage complet des faces nettoyées. La durée varie selon le garnissage, la température et la ventilation ; prévoyez une solution de couchage si le matelas n’est pas encore sec.",
      },
      {
        q: "Comment connaître le prix du déplacement à Launaguet ?",
        a: LOCAL_TRAVEL_NOTE,
      },
      {
        q: "Comment choisir un créneau à Launaguet ?",
        a: "Les disponibilités des prestations réservables sont affichées en ligne après votre sélection. Pour les nettoyages sur devis, indiquez la date souhaitée ; le créneau est convenu avec vous après validation de la prestation.",
      },
    ],
    nearby: ["Toulouse", "Aucamville", "Saint-Alban", "Castelginest"],
  },
  {
    name: "Saint-Jean",
    slug: "nettoyage-saint-jean",
    postalCode: "31240",
    cityContext: "Intervention à domicile à Saint-Jean (31240), sur rendez-vous.",
    para1:
      "À Saint-Jean, Clean&Fresh se déplace pour les canapés, fauteuils, tapis, matelas et habitacles automobiles. Les prestations de logement et de vitres sont sur devis.",
    para2:
      "Pour un fauteuil ou un canapé déhoussable, laissez les éléments en place pour le diagnostic sauf consigne contraire. Précisez les matières différentes présentes sur le même meuble.",
    faq: [
      {
        q: "Faut-il enlever les housses du canapé avant l’intervention ?",
        a: "Non, pas sans vérification. Le nettoyage est adapté à l’étiquette, au revêtement et au garnissage ; certaines housses ne supportent pas un lavage séparé. Dégagez surtout les coussins décoratifs et les petits objets.",
      },
      {
        q: "Comment connaître le prix du déplacement à Saint-Jean ?",
        a: LOCAL_TRAVEL_NOTE,
      },
      {
        q: "Comment choisir un créneau à Saint-Jean ?",
        a: "Les disponibilités des prestations réservables sont affichées en ligne après votre sélection. Pour les nettoyages sur devis, indiquez la date souhaitée ; le créneau est convenu avec vous après validation de la prestation.",
      },
    ],
    nearby: ["Toulouse", "L'Union", "Aucamville", "Launaguet"],
  },
  {
    name: "Frouzins",
    slug: "nettoyage-frouzins",
    postalCode: "31270",
    cityContext: "Intervention à domicile à Frouzins (31270), sur rendez-vous.",
    para1:
      "À Frouzins, choisissez un nettoyage à domicile pour votre canapé, votre literie, vos tapis ou l’intérieur de votre voiture.",
    para2:
      "Pour un véhicule utilisé avec des enfants ou des animaux, photographiez les sièges et les sols si l’état est important. Cela aide à sélectionner la formule selon les surfaces à traiter, puis les éventuelles options.",
    faq: [
      {
        q: "Quelle formule auto comprend les moquettes et les tapis ?",
        a: "Le Pack Or comprend les prestations du Pack Argent ainsi que les moquettes, tapis et contours indiqués dans la formule. Les poils, odeurs persistantes et salissures exceptionnelles sont à signaler pour vérifier les options nécessaires.",
      },
      {
        q: "Comment connaître le prix du déplacement à Frouzins ?",
        a: LOCAL_TRAVEL_NOTE,
      },
      {
        q: "Comment choisir un créneau à Frouzins ?",
        a: "Les disponibilités des prestations réservables sont affichées en ligne après votre sélection. Pour les nettoyages sur devis, indiquez la date souhaitée ; le créneau est convenu avec vous après validation de la prestation.",
      },
    ],
    nearby: ["Toulouse", "Cugnaux", "Villeneuve-Tolosane", "Muret"],
  },
  {
    name: "Seysses",
    slug: "nettoyage-seysses",
    postalCode: "31600",
    cityContext: "Intervention à domicile à Seysses (31600), sur rendez-vous.",
    para1:
      "Clean&Fresh intervient à Seysses pour nettoyer les textiles et les intérieurs automobiles, et pour les remises en état du logement sur devis.",
    para2:
      "Après des travaux, indiquez si le chantier est terminé et quelles traces restent sur les surfaces. Les gravats, résidus de peinture, poussières et textiles exposés doivent être décrits séparément.",
    faq: [
      {
        q: "Quelles informations donner après des travaux à Seysses ?",
        a: "Envoyez la surface, des photos des résidus et la nature des sols ou vitrages. Précisez les travaux encore prévus et les contraintes d’accès pour définir un périmètre réaliste et le bon moment d’intervention.",
      },
      {
        q: "Comment connaître le prix du déplacement à Seysses ?",
        a: LOCAL_TRAVEL_NOTE,
      },
      {
        q: "Comment choisir un créneau à Seysses ?",
        a: "Les disponibilités des prestations réservables sont affichées en ligne après votre sélection. Pour les nettoyages sur devis, indiquez la date souhaitée ; le créneau est convenu avec vous après validation de la prestation.",
      },
    ],
    nearby: ["Toulouse", "Muret", "Portet-sur-Garonne", "Roques"],
  },
  {
    name: "Cornebarrieu",
    slug: "nettoyage-cornebarrieu",
    postalCode: "31700",
    cityContext: "Intervention à domicile à Cornebarrieu (31700), sur rendez-vous.",
    para1:
      "À Cornebarrieu, faites nettoyer votre canapé, vos matelas, tapis ou votre intérieur automobile directement sur le lieu convenu.",
    para2:
      "Pour une intervention sur un site professionnel, vérifiez les règles du parking et l’accès aux équipements nécessaires. Un emplacement couvert peut être utile selon la météo et la prestation retenue.",
    faq: [
      {
        q: "Que prévoir pour un nettoyage auto sur parking ?",
        a: "Un emplacement autorisé où les portes peuvent s’ouvrir, un accès au véhicule, une prise électrique et un point d’eau accessibles. Décrivez la distance jusqu’aux branchements pour que nous vérifiions la faisabilité.",
      },
      {
        q: "Comment connaître le prix du déplacement à Cornebarrieu ?",
        a: LOCAL_TRAVEL_NOTE,
      },
      {
        q: "Comment choisir un créneau à Cornebarrieu ?",
        a: "Les disponibilités des prestations réservables sont affichées en ligne après votre sélection. Pour les nettoyages sur devis, indiquez la date souhaitée ; le créneau est convenu avec vous après validation de la prestation.",
      },
    ],
    nearby: ["Toulouse", "Blagnac", "Beauzelle", "Aussonne"],
  },
  {
    name: "Beauzelle",
    slug: "nettoyage-beauzelle",
    postalCode: "31700",
    cityContext: "Intervention à domicile à Beauzelle (31700), sur rendez-vous.",
    para1:
      "À Beauzelle, Clean&Fresh propose le nettoyage des textiles et de la literie à domicile, ainsi que l’entretien des habitacles automobiles.",
    para2:
      "Dans un immeuble, indiquez la résidence, le bâtiment et l’étage, ainsi que le fonctionnement de l’ascenseur. Nous pouvons ainsi préparer l’accès au matériel sans vous demander de transporter les meubles.",
    faq: [
      {
        q: "Faut-il déplacer le canapé hors du logement ?",
        a: "Non, le nettoyage se fait à domicile. Prévoyez un passage dégagé et un accès autour du canapé ; précisez les contraintes de manipulation si vous souhaitez traiter une zone difficilement accessible.",
      },
      {
        q: "Comment connaître le prix du déplacement à Beauzelle ?",
        a: LOCAL_TRAVEL_NOTE,
      },
      {
        q: "Comment choisir un créneau à Beauzelle ?",
        a: "Les disponibilités des prestations réservables sont affichées en ligne après votre sélection. Pour les nettoyages sur devis, indiquez la date souhaitée ; le créneau est convenu avec vous après validation de la prestation.",
      },
    ],
    nearby: ["Toulouse", "Blagnac", "Cornebarrieu", "Aussonne"],
  },
  {
    name: "Aussonne",
    slug: "nettoyage-aussonne",
    postalCode: "31840",
    cityContext: "Intervention à domicile à Aussonne (31840), sur rendez-vous.",
    para1:
      "Clean&Fresh se déplace à Aussonne sur rendez-vous pour les textiles, l’intérieur des véhicules et les nettoyages sur devis.",
    para2:
      "Si l’adresse comporte un accès privé ou un portail, précisez le point d’entrée et où stationner. Une adresse complète permet aussi de confirmer les frais éventuels avant votre accord.",
    faq: [
      {
        q: "Comment préparer une intervention dans une maison avec portail ?",
        a: "Indiquez le code ou les modalités d’ouverture, l’emplacement de stationnement et l’accès à l’eau et à l’électricité. Libérez le passage entre le véhicule d’intervention et les éléments à nettoyer.",
      },
      {
        q: "Comment connaître le prix du déplacement à Aussonne ?",
        a: LOCAL_TRAVEL_NOTE,
      },
      {
        q: "Comment choisir un créneau à Aussonne ?",
        a: "Les disponibilités des prestations réservables sont affichées en ligne après votre sélection. Pour les nettoyages sur devis, indiquez la date souhaitée ; le créneau est convenu avec vous après validation de la prestation.",
      },
    ],
    nearby: ["Toulouse", "Blagnac", "Beauzelle", "Cornebarrieu"],
  },
  {
    name: "Pibrac",
    slug: "nettoyage-pibrac",
    postalCode: "31820",
    cityContext: "Intervention à domicile à Pibrac (31820), sur rendez-vous.",
    para1:
      "À Pibrac, nous proposons le nettoyage de canapés, fauteuils, matelas et tapis, ainsi que l’intérieur automobile à domicile.",
    para2:
      "Pour une assise en velours ou un textile délicat, envoyez une photo de l’étiquette et du meuble. Le choix du produit, de l’humidité et de la méthode dépend du revêtement, pas seulement de la tache.",
    faq: [
      {
        q: "Le velours peut-il être nettoyé par injection-extraction ?",
        a: "Cela dépend de sa composition et des consignes d’entretien. Une vérification et un essai sur une zone discrète permettent de choisir une méthode adaptée ; la vapeur n’est pas systématique.",
      },
      {
        q: "Comment connaître le prix du déplacement à Pibrac ?",
        a: LOCAL_TRAVEL_NOTE,
      },
      {
        q: "Comment choisir un créneau à Pibrac ?",
        a: "Les disponibilités des prestations réservables sont affichées en ligne après votre sélection. Pour les nettoyages sur devis, indiquez la date souhaitée ; le créneau est convenu avec vous après validation de la prestation.",
      },
    ],
    nearby: ["Toulouse", "Léguevin", "Cornebarrieu", "La Salvetat-Saint-Gilles"],
  },
  {
    name: "Léguevin",
    slug: "nettoyage-leguevin",
    postalCode: "31490",
    cityContext: "Intervention à domicile à Léguevin (31490), sur rendez-vous.",
    para1:
      "Clean&Fresh intervient à Léguevin sur rendez-vous pour le nettoyage des textiles, des habitacles automobiles et les besoins du logement sur devis.",
    para2:
      "Indiquez l’adresse exacte dès la demande pour valider le déplacement. Si plusieurs éléments sont à traiter au même endroit, ajoutez-les ensemble afin de prévoir une durée suffisante.",
    faq: [
      {
        q: "Pourquoi faut-il préciser l’adresse avant de confirmer ?",
        a: "Le lieu exact permet de vérifier la zone desservie, l’accès et le supplément éventuel de déplacement. Celui-ci est confirmé avant votre accord ; il ne dépend pas uniquement du nom de la commune.",
      },
      {
        q: "Comment connaître le prix du déplacement à Léguevin ?",
        a: LOCAL_TRAVEL_NOTE,
      },
      {
        q: "Comment choisir un créneau à Léguevin ?",
        a: "Les disponibilités des prestations réservables sont affichées en ligne après votre sélection. Pour les nettoyages sur devis, indiquez la date souhaitée ; le créneau est convenu avec vous après validation de la prestation.",
      },
    ],
    nearby: ["Toulouse", "Pibrac", "Fonsorbes", "La Salvetat-Saint-Gilles"],
  },
  {
    name: "Escalquens",
    slug: "nettoyage-escalquens",
    postalCode: "31750",
    cityContext: "Intervention à domicile à Escalquens (31750), sur rendez-vous.",
    para1:
      "À Escalquens, Clean&Fresh se déplace pour le nettoyage des textiles et de la literie, de l’intérieur automobile et pour les remises en état sur devis.",
    para2:
      "Pour des taches sur un matelas, précisez leur origine et leur ancienneté si vous les connaissez. Les traitements intensifs ou enzymatiques sont à distinguer du nettoyage courant.",
    faq: [
      {
        q: "Une odeur sur un matelas demande-t-elle une option particulière ?",
        a: "Une odeur persistante peut nécessiter un traitement adapté à son origine et au garnissage. Décrivez la situation avant le rendez-vous ; nous vérifions le besoin d’option et les limites possibles du traitement.",
      },
      {
        q: "Comment connaître le prix du déplacement à Escalquens ?",
        a: LOCAL_TRAVEL_NOTE,
      },
      {
        q: "Comment choisir un créneau à Escalquens ?",
        a: "Les disponibilités des prestations réservables sont affichées en ligne après votre sélection. Pour les nettoyages sur devis, indiquez la date souhaitée ; le créneau est convenu avec vous après validation de la prestation.",
      },
    ],
    nearby: ["Toulouse", "Labège", "Castanet-Tolosan", "Auzeville-Tolosane"],
  },
  {
    name: "Labège",
    slug: "nettoyage-labege",
    postalCode: "31670",
    cityContext: "Intervention à domicile à Labège (31670), sur rendez-vous.",
    para1:
      "À Labège, Clean&Fresh propose le nettoyage des textiles à domicile et des assises ou moquettes de locaux professionnels sur devis, ainsi que l’intérieur automobile.",
    para2:
      "Pour un bureau, un commerce ou une salle d’attente, indiquez les horaires d’accès, la surface à libérer et la date de réouverture. Cela permet d’intégrer le séchage à l’organisation de l’intervention.",
    faq: [
      {
        q: "Peut-on nettoyer une moquette de bureau sans interrompre toute l’activité ?",
        a: "Nous étudions les zones, les horaires et les possibilités d’accès avec vous. Un devis précise la surface traitée ; la circulation doit être limitée sur les parties encore humides jusqu’au séchage complet.",
      },
      {
        q: "Comment connaître le prix du déplacement à Labège ?",
        a: LOCAL_TRAVEL_NOTE,
      },
      {
        q: "Comment choisir un créneau à Labège ?",
        a: "Les disponibilités des prestations réservables sont affichées en ligne après votre sélection. Pour les nettoyages sur devis, indiquez la date souhaitée ; le créneau est convenu avec vous après validation de la prestation.",
      },
    ],
    nearby: ["Toulouse", "Escalquens", "Castanet-Tolosan", "Auzeville-Tolosane"],
  },
  {
    name: "Saint-Alban",
    slug: "nettoyage-saint-alban",
    postalCode: "31140",
    cityContext: "Intervention à domicile à Saint-Alban (31140), sur rendez-vous.",
    para1:
      "À Saint-Alban, faites entretenir canapé, fauteuils, tapis et matelas à votre domicile. Les intérieurs automobiles sont réservables selon la formule choisie.",
    para2:
      "Vous avez des chaises rembourrées ? Précisez le nombre et le revêtement de l’assise et du dossier. Des photos de plusieurs chaises permettent de vérifier si leur état est comparable.",
    faq: [
      {
        q: "Comment demander un nettoyage de chaises en tissu ?",
        a: "Indiquez la quantité, la matière et les taches visibles. Les formules par lot et les éventuelles chaises supplémentaires sont détaillées dans la réservation ; un état exceptionnel est à vérifier sur photos.",
      },
      {
        q: "Comment connaître le prix du déplacement à Saint-Alban ?",
        a: LOCAL_TRAVEL_NOTE,
      },
      {
        q: "Comment choisir un créneau à Saint-Alban ?",
        a: "Les disponibilités des prestations réservables sont affichées en ligne après votre sélection. Pour les nettoyages sur devis, indiquez la date souhaitée ; le créneau est convenu avec vous après validation de la prestation.",
      },
    ],
    nearby: ["Toulouse", "Aucamville", "Launaguet", "Castelginest"],
  },
  {
    name: "Fenouillet",
    slug: "nettoyage-fenouillet",
    postalCode: "31150",
    cityContext: "Intervention à domicile à Fenouillet (31150), sur rendez-vous.",
    para1:
      "Clean&Fresh intervient à Fenouillet pour le nettoyage des textiles, des véhicules et les remises en état du logement sur devis.",
    para2:
      "Pour un véhicule familial, indiquez le nombre de places et l’état du coffre en plus des sièges. Les éléments encombrants et objets personnels doivent être retirés pour accéder aux surfaces.",
    faq: [
      {
        q: "Faut-il vider la voiture avant le nettoyage ?",
        a: "Oui, retirez les objets personnels et videz le coffre autant que possible. Signalez les sièges enfants ou équipements qui gênent l’accès ; leur démontage et remontage doivent être organisés avec vous.",
      },
      {
        q: "Comment connaître le prix du déplacement à Fenouillet ?",
        a: LOCAL_TRAVEL_NOTE,
      },
      {
        q: "Comment choisir un créneau à Fenouillet ?",
        a: "Les disponibilités des prestations réservables sont affichées en ligne après votre sélection. Pour les nettoyages sur devis, indiquez la date souhaitée ; le créneau est convenu avec vous après validation de la prestation.",
      },
    ],
    nearby: ["Toulouse", "Castelginest", "Bruguières", "Launaguet"],
  },
  {
    name: "Quint-Fonsegrives",
    slug: "nettoyage-quint-fonsegrives",
    postalCode: "31130",
    cityContext: "Intervention à domicile à Quint-Fonsegrives (31130), sur rendez-vous.",
    para1:
      "À Quint-Fonsegrives, Clean&Fresh propose le nettoyage du mobilier textile, de la literie et de l’intérieur des véhicules à domicile.",
    para2:
      "Pour un ensemble composé de cuir et de tissu, décrivez chaque partie. Nous distinguons les méthodes de nettoyage et les options pour respecter les différents matériaux.",
    faq: [
      {
        q: "Peut-on nettoyer du cuir et du tissu lors du même passage ?",
        a: "Oui, en sélectionnant les prestations adaptées. Le cuir est traité manuellement avec des produits appropriés, tandis que l’injection-extraction est réservée aux textiles compatibles.",
      },
      {
        q: "Comment connaître le prix du déplacement à Quint-Fonsegrives ?",
        a: LOCAL_TRAVEL_NOTE,
      },
      {
        q: "Comment choisir un créneau à Quint-Fonsegrives ?",
        a: "Les disponibilités des prestations réservables sont affichées en ligne après votre sélection. Pour les nettoyages sur devis, indiquez la date souhaitée ; le créneau est convenu avec vous après validation de la prestation.",
      },
    ],
    nearby: ["Toulouse", "Balma", "Escalquens", "Castanet-Tolosan"],
  },
  {
    name: "Saint-Lys",
    slug: "nettoyage-saint-lys",
    postalCode: "31470",
    cityContext: "Intervention à domicile à Saint-Lys (31470), sur rendez-vous.",
    para1:
      "Clean&Fresh se déplace à Saint-Lys sur rendez-vous pour les textiles, les véhicules et les besoins de nettoyage du logement sur devis.",
    para2:
      "Pour préparer le déplacement, indiquez l’adresse et l’ensemble des éléments à traiter. Les créneaux disponibles et le total avec les éventuels frais sont confirmés avant la réservation.",
    faq: [
      {
        q: "Peut-on réunir plusieurs nettoyages à la même adresse ?",
        a: "Oui, vous pouvez ajouter plusieurs prestations dans une réservation. Cela permet de prévoir le temps de travail nécessaire pour l’ensemble ; les besoins sur devis sont à nous transmettre avec des photos.",
      },
      {
        q: "Comment connaître le prix du déplacement à Saint-Lys ?",
        a: LOCAL_TRAVEL_NOTE,
      },
      {
        q: "Comment choisir un créneau à Saint-Lys ?",
        a: "Les disponibilités des prestations réservables sont affichées en ligne après votre sélection. Pour les nettoyages sur devis, indiquez la date souhaitée ; le créneau est convenu avec vous après validation de la prestation.",
      },
    ],
    nearby: ["Toulouse", "Fonsorbes", "Léguevin", "La Salvetat-Saint-Gilles"],
  },
  {
    name: "Eaunes",
    slug: "nettoyage-eaunes",
    postalCode: "31600",
    cityContext: "Intervention à domicile à Eaunes (31600), sur rendez-vous.",
    para1:
      "À Eaunes, nous proposons le nettoyage de canapés, matelas et tapis à domicile, ainsi que l’intérieur automobile et les prestations de logement sur devis.",
    para2:
      "Pour un déménagement, précisez si le nettoyage intervient dans l’ancien ou le nouveau logement et à quelle date les clés seront disponibles. Une prestation à deux adresses doit être organisée séparément.",
    faq: [
      {
        q: "Peut-on nettoyer les textiles avant de les déménager ?",
        a: "Oui, prévoyez assez de temps pour leur séchage complet avant emballage et transport. Indiquez la date du déménagement afin de vérifier un créneau adapté.",
      },
      {
        q: "Comment connaître le prix du déplacement à Eaunes ?",
        a: LOCAL_TRAVEL_NOTE,
      },
      {
        q: "Comment choisir un créneau à Eaunes ?",
        a: "Les disponibilités des prestations réservables sont affichées en ligne après votre sélection. Pour les nettoyages sur devis, indiquez la date souhaitée ; le créneau est convenu avec vous après validation de la prestation.",
      },
    ],
    nearby: ["Toulouse", "Muret", "Seysses", "Portet-sur-Garonne"],
  },
  {
    name: "Roques",
    slug: "nettoyage-roques",
    postalCode: "31120",
    cityContext: "Intervention à domicile à Roques (31120), sur rendez-vous.",
    para1:
      "À Roques, Clean&Fresh intervient pour les textiles du logement, les habitacles de voiture et les remises en état sur devis.",
    para2:
      "Si vous souhaitez traiter un coffre et des tapis automobiles très chargés en poussière ou poils, envoyez une photo avant de choisir votre formule. Le volume et l’état influent sur la préparation.",
    faq: [
      {
        q: "Le coffre est-il compris dans le nettoyage auto ?",
        a: "L’aspiration du coffre fait partie du Pack Bronze ; le shampouinage de sa moquette relève du Pack Or. Vérifiez le détail de la formule et signalez les poils ou autres salissures importantes.",
      },
      {
        q: "Comment connaître le prix du déplacement à Roques ?",
        a: LOCAL_TRAVEL_NOTE,
      },
      {
        q: "Comment choisir un créneau à Roques ?",
        a: "Les disponibilités des prestations réservables sont affichées en ligne après votre sélection. Pour les nettoyages sur devis, indiquez la date souhaitée ; le créneau est convenu avec vous après validation de la prestation.",
      },
    ],
    nearby: ["Toulouse", "Portet-sur-Garonne", "Muret", "Eaunes"],
  },
  {
    name: "Bruguières",
    slug: "nettoyage-bruguieres",
    postalCode: "31150",
    cityContext: "Intervention à domicile à Bruguières (31150), sur rendez-vous.",
    para1:
      "À Bruguières, réservez le nettoyage de vos canapés, matelas, tapis et intérieurs automobiles. Les locaux et les logements se traitent sur devis selon leur état.",
    para2:
      "Pour une prestation en entreprise, précisez le contact sur place, les horaires de présence et les conditions d’accès. Une liste des assises ou des surfaces évite les oublis dans le chiffrage.",
    faq: [
      {
        q: "Comment obtenir un devis pour plusieurs fauteuils professionnels ?",
        a: "Envoyez leur nombre, la matière, des photos et l’adresse d’intervention. Nous vérifions le temps nécessaire et un créneau compatible avec l’activité et le séchage.",
      },
      {
        q: "Comment connaître le prix du déplacement à Bruguières ?",
        a: LOCAL_TRAVEL_NOTE,
      },
      {
        q: "Comment choisir un créneau à Bruguières ?",
        a: "Les disponibilités des prestations réservables sont affichées en ligne après votre sélection. Pour les nettoyages sur devis, indiquez la date souhaitée ; le créneau est convenu avec vous après validation de la prestation.",
      },
    ],
    nearby: ["Toulouse", "Fenouillet", "Castelginest", "Launaguet"],
  },
  {
    name: "La Salvetat-Saint-Gilles",
    slug: "nettoyage-la-salvetat-saint-gilles",
    postalCode: "31880",
    cityContext: "Intervention à domicile à La Salvetat-Saint-Gilles (31880), sur rendez-vous.",
    para1:
      "Clean&Fresh intervient à La Salvetat-Saint-Gilles pour le nettoyage des textiles, de la literie et de l’intérieur des véhicules à domicile.",
    para2:
      "Un grand canapé d’angle peut avoir des éléments amovibles ou des revêtements différents. Envoyez une vue d’ensemble et indiquez la matière pour sélectionner la formule appropriée.",
    faq: [
      {
        q: "Comment choisir la formule d’un canapé modulable ?",
        a: "Basez votre choix sur la configuration complète à nettoyer et vérifiez les formats proposés. En cas de doute, envoyez une photo d’ensemble avant de réserver pour confirmer la catégorie et les options utiles.",
      },
      {
        q: "Comment connaître le prix du déplacement à La Salvetat-Saint-Gilles ?",
        a: LOCAL_TRAVEL_NOTE,
      },
      {
        q: "Comment choisir un créneau à La Salvetat-Saint-Gilles ?",
        a: "Les disponibilités des prestations réservables sont affichées en ligne après votre sélection. Pour les nettoyages sur devis, indiquez la date souhaitée ; le créneau est convenu avec vous après validation de la prestation.",
      },
    ],
    nearby: ["Toulouse", "Pibrac", "Léguevin", "Cornebarrieu"],
  },
  {
    name: "Castelmaurou",
    slug: "nettoyage-castelmaurou",
    postalCode: "31180",
    cityContext: "Intervention à domicile à Castelmaurou (31180), sur rendez-vous.",
    para1:
      "À Castelmaurou, Clean&Fresh propose les nettoyages textiles et automobiles à votre adresse, ainsi que les remises en état du logement sur devis.",
    para2:
      "Pour un tapis ancien ou de valeur, signalez sa matière et les traitements déjà reçus. Une intervention standard n’est pas retenue sans vérification si les fibres ou les couleurs présentent une sensibilité particulière.",
    faq: [
      {
        q: "Peut-on réserver directement pour un tapis délicat ?",
        a: "Contactez-nous d’abord avec ses dimensions et des photos, idéalement de l’étiquette et du revers. Nous vérifions si une intervention à domicile est adaptée avant de confirmer le tarif.",
      },
      {
        q: "Comment connaître le prix du déplacement à Castelmaurou ?",
        a: LOCAL_TRAVEL_NOTE,
      },
      {
        q: "Comment choisir un créneau à Castelmaurou ?",
        a: "Les disponibilités des prestations réservables sont affichées en ligne après votre sélection. Pour les nettoyages sur devis, indiquez la date souhaitée ; le créneau est convenu avec vous après validation de la prestation.",
      },
    ],
    nearby: ["Toulouse", "L'Union", "Saint-Jean", "Quint-Fonsegrives"],
  },
  {
    name: "Auzeville-Tolosane",
    slug: "nettoyage-auzeville-tolosane",
    postalCode: "31320",
    cityContext: "Intervention à domicile à Auzeville-Tolosane (31320), sur rendez-vous.",
    para1:
      "À Auzeville-Tolosane, Clean&Fresh nettoie les textiles du logement et les intérieurs automobiles à domicile. Les besoins avant un état des lieux sont étudiés sur devis.",
    para2:
      "Pour une petite surface, détaillez surtout l’état de la cuisine et des sanitaires : la durée de remise en état dépend aussi de l’encrassement et des équipements, pas seulement des mètres carrés.",
    faq: [
      {
        q: "Une petite surface suffit-elle pour établir le devis ?",
        a: "La surface est un point de départ. Ajoutez des photos, la liste des équipements à nettoyer et la date souhaitée afin d’évaluer le travail réel et les éventuelles options.",
      },
      {
        q: "Comment connaître le prix du déplacement à Auzeville-Tolosane ?",
        a: LOCAL_TRAVEL_NOTE,
      },
      {
        q: "Comment choisir un créneau à Auzeville-Tolosane ?",
        a: "Les disponibilités des prestations réservables sont affichées en ligne après votre sélection. Pour les nettoyages sur devis, indiquez la date souhaitée ; le créneau est convenu avec vous après validation de la prestation.",
      },
    ],
    nearby: ["Toulouse", "Ramonville-Saint-Agne", "Castanet-Tolosan", "Escalquens"],
  },
  {
    name: "Pins-Justaret",
    slug: "nettoyage-pins-justaret",
    postalCode: "31860",
    cityContext: "Intervention à domicile à Pins-Justaret (31860), sur rendez-vous.",
    para1:
      "Clean&Fresh intervient à Pins-Justaret pour nettoyer canapé, literie, tapis et intérieur automobile, et pour les prestations de logement sur devis.",
    para2:
      "Avant notre passage, repérez un point d’eau et une prise accessibles près de la zone de travail. Indiquez les escaliers ou la distance à parcourir avec le matériel depuis le stationnement.",
    faq: [
      {
        q: "Faut-il prévoir de l’eau et de l’électricité ?",
        a: "Oui, prévoyez des accès disponibles pendant l’intervention. Signalez toute difficulté ou distance importante avant le rendez-vous afin que nous puissions vérifier la faisabilité avec le matériel prévu.",
      },
      {
        q: "Comment connaître le prix du déplacement à Pins-Justaret ?",
        a: LOCAL_TRAVEL_NOTE,
      },
      {
        q: "Comment choisir un créneau à Pins-Justaret ?",
        a: "Les disponibilités des prestations réservables sont affichées en ligne après votre sélection. Pour les nettoyages sur devis, indiquez la date souhaitée ; le créneau est convenu avec vous après validation de la prestation.",
      },
    ],
    nearby: ["Toulouse", "Muret", "Portet-sur-Garonne", "Eaunes"],
  },
  {
    name: "Gratentour",
    slug: "nettoyage-gratentour",
    postalCode: "31150",
    cityContext: "Intervention à domicile à Gratentour (31150), sur rendez-vous.",
    para1:
      "À Gratentour, Clean&Fresh propose le nettoyage à domicile des textiles et des véhicules, ainsi que les remises en état du logement sur devis.",
    para2:
      "Pour un canapé et un tapis dans la même pièce, dégagez les petits meubles et objets. Précisez si le tapis se trouve sous un meuble lourd pour définir les zones accessibles avant intervention.",
    faq: [
      {
        q: "Le mobilier lourd est-il déplacé pour nettoyer un tapis ?",
        a: "Le déplacement de mobilier lourd n’est pas à supposer inclus. Envoyez une photo de la configuration et précisez les zones souhaitées : nous vérifions ensemble l’accès et la préparation à prévoir.",
      },
      {
        q: "Comment connaître le prix du déplacement à Gratentour ?",
        a: LOCAL_TRAVEL_NOTE,
      },
      {
        q: "Comment choisir un créneau à Gratentour ?",
        a: "Les disponibilités des prestations réservables sont affichées en ligne après votre sélection. Pour les nettoyages sur devis, indiquez la date souhaitée ; le créneau est convenu avec vous après validation de la prestation.",
      },
    ],
    nearby: ["Toulouse", "Bruguières", "Fenouillet", "Castelginest"],
  },
];

export function getCommuneData(slug: string): CommuneData | undefined {
  return COMMUNES_DATA.find((commune) => commune.slug === slug);
}
