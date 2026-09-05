export interface FAQNode {
  id: string;
  question: string;
  answer: string;
  options?: FAQNode[];
}

export const welcomeMessage = "Bonjour et bienvenue chez Clean&Fresh Toulouse 👋\n\nJe suis l'assistant virtuel de Clean&Fresh. Je peux vous renseigner sur nos prestations, tarifs, zones d'intervention, etc.\n\nIndiquez simplement ce que vous souhaitez faire nettoyer ou posez votre question :";

export const faqData: FAQNode[] = [
  {
    id: "presentation",
    question: "Présentation & Infos Pratiques",
    answer: "Que souhaitez-vous savoir sur Clean&Fresh ?",
    options: [
      {
        id: "qui-sommes-nous",
        question: "Qui êtes-vous et quels services proposez-vous ?",
        answer: "Clean&Fresh propose le nettoyage intérieur automobile (shampouinage sièges, tapis, etc.), le nettoyage de mobilier textile à domicile (canapés, fauteuils, chaises rembourrées, poufs, matelas, tapis), ainsi que des nettoyages de fin de bail, fin de chantier, et de logements très sales, insalubres ou concernés par le syndrome de Diogène."
      },
      {
        id: "materiel-produits",
        question: "Quel matériel et produits utilisez-vous ?",
        answer: "Nous disposons d'injecteurs-extracteurs professionnels, de nettoyeurs vapeur, d'aspirateurs eau et poussière professionnels et de produits professionnels spécifiques (savon, dégraissant). Tous nos produits ménagers sont professionnels, certifiés écologiques et conçus exprès pour les textiles. Ils se versent dans la machine d'injection-extraction pour pulvériser le produit, extraire toutes les salissures et rincer à l'eau."
      },
      {
        id: "process-nettoyage",
        question: "Quel est le procédé (process) de nettoyage ?",
        answer: "Avec l'injecteur-extracteur, nous injectons le savon professionnel dans la machine puis nous le pulvérisons sur vos textiles d'ameublement (matelas, canapé, tapis ou siège auto). Ensuite, nous effectuons un brossage mécanique à l'aide d'une visseuse brosse ou d'une brosse manuelle adaptée selon les matériaux. Enfin, nous rinçons à l'eau pour extraire la saleté et éviter les taches de propre (auréoles), garantissant un résultat impeccable."
      },
      {
        id: "zone",
        question: "Où intervenez-vous et jusqu'à quelle distance ?",
        answer: "Nous intervenons à Toulouse, Balma, Cugnaux, Blagnac, Ramonville-Saint-Agne, L'Union, Cornebarrieu, Fenouillet, Portet-sur-Garonne, Castanet-Tolosan, Saint-Orens-de-Gameville, Tournefeuille, Pibrac, Colomiers, Léguevin, Plaisance-du-Touch, Muret, Escalquens, Labège, Merville, Grenade, Aussonne, Seilh, Aucamville, Launaguet, Beauzelle, et dans toutes les communes de la métropole toulousaine (dans un rayon de 50 km). Pour les prestations importantes ou gros chantiers (Diogène, insalubre), un déplacement à plus de 100 ou 150 km peut être étudié."
      },
      {
        id: "horaires",
        question: "Quels sont vos horaires et travaillez-vous le dimanche ?",
        answer: "Nous travaillons du lundi au dimanche, 7j/7, de 8h00 à 21h00 selon les disponibilités du planning. Des interventions sont possibles le dimanche."
      },
      {
        id: "devis-photos",
        question: "Faites-vous des devis gratuits ? Pourquoi demander des photos ?",
        answer: "Oui, nos devis et estimations sont gratuits. Les photos nous permettent d'évaluer correctement la taille, la matière, le niveau de saleté, les taches, les difficultés d'accès et le temps nécessaire afin de préparer le matériel adapté et d'éviter une mauvaise estimation de prix."
      },
      {
        id: "facturation-paiement",
        question: "Facturation, tarifs et moyens de paiement ?",
        answer: "Les tarifs des prestations standards sont affichés sur le site. Les prix sont valables si l'état réel correspond aux informations transmises. Une facture vous est remise après chaque prestation. Les moyens de paiement acceptés sont indiqués lors de la réservation ou de la confirmation du rendez-vous."
      }
    ]
  },
  {
    id: "auto",
    question: "Nettoyage Automobile",
    answer: "Nous sommes spécialisés dans le nettoyage INTÉRIEUR automobile à domicile. Que voulez-vous savoir ?",
    options: [
      {
        id: "packs-auto",
        question: "Tarifs et Packs complets (Bronze, Argent, Or)",
        answer: "Nous proposons 3 packs pour le nettoyage intérieur :\n- Pack Bronze (59 €) : Entretien classique.\n- Pack Argent (99 €) : Nettoyage approfondi.\n- Pack Or (129 €) : Pour les véhicules très sales ou nécessitant une remise en état complète.\nLes détails de chaque pack sont sur la page de réservation. Nous recommandons le Pack Or pour les voitures très sales."
      },
      {
        id: "sieges-auto",
        question: "Shampouinage et rénovation des sièges",
        answer: "Le shampouinage des sièges coûte 59 € lorsqu'il est réservé seul (ou rénovation textile). Si vous l'ajoutez en option à un pack automobile, il bénéficie d'un tarif réduit à 39 € car le déplacement et la préparation du matériel sont déjà inclus."
      },
      {
        id: "options-auto",
        question: "Options : Vapeur, Poils, Taches et Odeurs",
        answer: "Options disponibles :\n- Traitement vapeur : 19 € (désinfection et hygiène)\n- Traitement anti-acariens/antibactérien : 19 €\n- Traitement anti-odeur : 15 € (cigarette, chien, urine, vomi)\n- Nettoyage du ciel de toit : 29 € (méthode douce pour ne pas décoller le tissu)\n- Élimination des poils d'animaux : 25 €\n- Nettoyage des vitres intérieures : 9 €\n- Détachage intensif : 19 €\n- Shampouinage des tapis de sol : 15 €"
      },
      {
        id: "logistique-auto",
        question: "Logistique (Électricité, Eau, Parking, Pluie)",
        answer: "Merci de vider la voiture (objets, sièges enfants) avant notre arrivée. Nous avons besoin d'un accès raisonnable à une prise électrique et d'un point d'eau. En parking souterrain ou dans la rue, cela dépend de l'espace et des accès. En cas de forte pluie sans abri, la prestation extérieure peut être reportée."
      }
    ]
  },
  {
    id: "mobilier",
    question: "Canapés, Matelas et Tapis",
    answer: "Nous nettoyons votre mobilier directement à domicile par injection-extraction. Sur quoi porte votre question ?",
    options: [
      {
        id: "canapes",
        question: "Nettoyage de Canapés & Fauteuils",
        answer: "Tarifs de base :\n- Canapé 3 places : 79 €\n- Canapé 4-5 places, d'angle ou en U : à partir de 99 € (devis sur photo recommandé)\nOptions : poils d'animaux (15 €), traitement anti-odeur (15 €), détachage intensif (19 €), traitement anti-acariens/antibactérien (19 €). Pour les canapés en velours, lin, cuir ou déhoussables, veuillez nous fournir une photo/étiquette pour vérifier la compatibilité."
      },
      {
        id: "matelas-tapis",
        question: "Nettoyage de Matelas & Tapis",
        answer: "Matelas enfant : 39 € | 1 place : 59 € | 2 places : 99 €. Options de désinfection disponibles. Pour les tapis, tarif standard de 49 € pour un tapis (recto-verso en option à 25 €). Nous traitons les taches d'urine, sang et nourriture avec des produits professionnels."
      },
      {
        id: "sechage-mobilier",
        question: "Temps de séchage et humidité",
        answer: "Après un shampouinage par injection-extraction, les tissus (sièges auto, canapés, matelas) restent légèrement humides car notre machine professionnelle aspire la majeure partie de l'eau. Le séchage complet prend généralement plusieurs heures en fonction de la température, de l'aération et de la météo."
      }
    ]
  },
  {
    id: "logement",
    question: "Logement, Fin de bail, Diogène",
    answer: "Nous gérons les remises en état simples et extrêmes. De quoi s'agit-il ?",
    options: [
      {
        id: "fin-bail",
        question: "Fin de bail ou Fin de chantier",
        answer: "Nettoyage complet pour état des lieux ou après travaux. Le prix dépend de la surface et du niveau de saleté. Un devis gratuit est réalisé sur photo ou visite."
      },
      {
        id: "diogene",
        question: "Logement Insalubre / Syndrome de Diogène",
        answer: "Intervention professionnelle, discrète et sans jugement. Tri, débarras, nettoyage approfondi et désinfection complète. Devis gratuit sur-mesure après envoi de photos/vidéos."
      }
    ]
  },
  {
    id: "comment-aller",
    question: "Comment allez-vous ?",
    answer: "Je vais très bien, merci ! 😊 Quel est votre besoin en nettoyage aujourd'hui ?"
  }
];
