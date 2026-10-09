export function optionDescription(name: string, fallback: string, auto = false): string {
  const key = name.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  if (key.includes('acarien') || key.includes('bacter')) {
    return auto
      ? "Application d’un traitement assainissant sur les plastiques compatibles et l’ensemble du coffre, dans tous les packs. Les sièges, moquettes et le ciel de toit sont traités lorsqu’ils sont inclus dans le pack ou les options choisis. Le traitement vise les acariens et bactéries ciblés par le produit utilisé, selon son mode d’emploi et les supports compatibles."
      : "Application d’un produit adapté sur le textile nettoyé pour l’assainir et traiter les acariens et bactéries ciblés par le produit. Le support, le dosage et le temps de contact sont pris en compte. Cette option ne constitue pas une désinsectisation ni une garantie d’élimination de tous les germes.";
  }
  if (key.includes('enzym')) return "Traitement ciblé des résidus organiques à l’origine d’odeurs persistantes : urine, vomi, transpiration ou traces d’animaux. Application sur les textiles compatibles, en complément du nettoyage, selon l’état du support.";
  if (key.includes('poils')) return auto
    ? "Brossage et aspiration spécifiques pour déloger les poils d’animaux incrustés dans les sièges, tapis et moquettes concernés par la prestation."
    : "Brossage et aspiration spécifiques pour retirer les poils d’animaux accrochés aux fibres, aux coutures et aux recoins du textile nettoyé.";
  if (key.includes('detachage')) return "Prétraitement ciblé des taches tenaces avec une méthode adaptée à leur nature et au revêtement. Le résultat dépend de l’ancienneté de la tache et de l’état des fibres ; certaines marques peuvent subsister.";
  if (key.includes('anti-odeur')) return "Traitement complémentaire des surfaces concernées pour réduire les odeurs incrustées, notamment de tabac, d’animaux ou de transpiration. L’efficacité dépend de l’origine de l’odeur et de la possibilité de traiter sa source.";
  if (key.includes('ciel de toit')) return "Nettoyage délicat du revêtement intérieur du toit avec une méthode adaptée à sa fragilité et à son état. Traitement des traces sur les zones compatibles, sans détremper le support.";
  if (key.includes('uv')) return "Application d’un soin sur les plastiques intérieurs compatibles pour raviver leur aspect, apporter une finition satinée et aider à limiter le ternissement et l’adhérence de la poussière.";
  if (key.includes('nourrissant') && key.includes('cuir')) return "Application d’un soin adapté après le nettoyage du cuir pour aider à conserver sa souplesse, nourrir sa surface et la protéger du dessèchement. Ne répare pas les craquelures ni l’usure existante.";
  if (key.includes('recto-verso')) return "Nettoyage des deux faces du tapis, lorsque son envers et sa matière sont compatibles, pour traiter aussi les salissures présentes au dos. Séchage adapté au support.";
  if (key.includes('tapis de sol')) return "Nettoyage des tapis de sol du véhicule par une méthode adaptée à leur matière, avec injection-extraction pour les tapis textiles compatibles. Cette option ne comprend pas la moquette fixe de l’habitacle.";
  if (key.includes('vitres')) return "Nettoyage de la face intérieure des vitres du véhicule pour retirer les traces, dépôts et film gras, avec une finition soignée.";
  if (key.includes('sieges auto')) return "Nettoyage de tous les sièges du véhicule : injection-extraction pour les textiles compatibles, ou nettoyage manuel adapté au cuir et aux revêtements délicats.";
  return fallback;
}
