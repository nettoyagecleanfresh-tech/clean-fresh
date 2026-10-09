import { SERVICES, COMPANY, COMMUNES, DISPLACEMENT_RULES, GOOGLE_REVIEW_COUNT, GOOGLE_REVIEW_RATING } from '../data/site';

export type ChatReply = { text: string; service?: string; actions?: { label: string; href: string }[]; suggestions?: string[] };
const normalize = (s: string) => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
const aliases = [
  ['canape', 'canap|fauteuil|sofa|divan|pouf'], ['matelas', 'matela|literie'],
  ['moquette', 'moquette'], ['tapis', 'tapis'], ['cuir', 'cuir'],
  ['auto', 'voiture|vehicule|auto|siege|bronze|argent|pack or'],
  ['vitres', 'vitre|vitrage|fenetre|baie'], ['fin-de-bail', 'fin de bail|etat des lieux|demenag'],
  ['fin-de-chantier', 'chantier|travaux'], ['diogene', 'diogene'], ['extreme', 'insalubre|extreme'],
  ['terrasse', 'terrasse'], ['toiture', 'toiture|toit'], ['facade', 'facade'],
  ['dappartement-ou-maison', 'appartement|maison|menage'],
] as const;
const booking = { label: 'Voir les prix et réserver', href: '/tarifs' };
const contact = { label: 'Demander un devis / nous écrire', href: '/contactez-nous' };
const phone = { label: `Appeler le ${COMPANY.phone}`, href: COMPANY.phoneHref };
export const welcome: ChatReply = {
  text: 'Bonjour 👋 Je peux vous aider à choisir une prestation, comparer les formules et préparer votre intervention. Que souhaitez-vous faire nettoyer ?',
  suggestions: ['Réserver avec l’assistant', 'Canapé', 'Auto', 'Matelas', 'Tapis', 'Moquette', 'Demander un devis'],
};

export function answerCustomer(query: string, previousService?: string): ChatReply {
  const q = normalize(query).slice(0, 1500);
  const hits = aliases.filter(([, pattern]) => new RegExp(pattern).test(q));
  const key = hits[0]?.[0];
  const current = key ? SERVICES.find(s => key === 'auto' ? s.slug.includes('nettoyage-auto-') : s.slug.includes(`nettoyage-${key}`)) : SERVICES.find(s => s.slug === previousService);
  const service = current?.slug;
  const reply = (text: string, extra: Omit<ChatReply, 'text' | 'service'> = {}): ChatReply => ({ text, service, ...extra });
  const actions = current?.booking ? [booking] : [contact];
  if (/annul|reporter|decaler|modifier.*(rdv|rendez|reservation)/.test(q)) return reply('Pour annuler, utilisez le lien de votre email de confirmation. Pour déplacer un rendez-vous ou si vous ne retrouvez pas cet email, contactez-nous. Je ne peux pas modifier votre réservation depuis ce chat.', { actions: [phone, contact] });
  if (/humain|conseiller|rappel|appeler|telephone|contact|reclamation/.test(q)) return reply(`Vous pouvez joindre Clean&Fresh au ${COMPANY.phone} ou envoyer votre demande via le formulaire de contact. Aucun message n’a encore été envoyé depuis ce chat.`, { actions: [phone, contact] });
  if (/disponib|creneau|demain|aujourd|rendez.vous|reserver/.test(q)) return reply('Les disponibilités réelles sont affichées dans le calendrier de réservation. Le bouton « Réserver ce créneau » mémorise le prochain créneau proposé ; la réservation est créée uniquement après votre confirmation finale. Je ne bloque aucun créneau depuis le chat.', { actions: [booking] });
  if (/prise|electric|\beau\b/.test(q)) return reply('Pour le nettoyage auto, indiquez à la finalisation si une prise électrique est disponible à moins de 60 m du véhicule et si vous avez accès à l’eau à proximité. Si un accès manque, contactez-nous pour vérifier les possibilités avant l’intervention.', { actions: [booking, phone] });
  if (/sech|humide|utiliser.*apres/.test(q)) return reply('Les textiles peuvent rester humides après le nettoyage. Le séchage dépend de la matière, de la ventilation et de la température ; prévoyez plusieurs heures. Pour la moquette, le site indique généralement 2 à 5 heures. Attendez le séchage complet avant réutilisation.', { actions });
  if (/pai|acompte|reglement/.test(q)) return reply('Pour les prestations réservables en ligne, aucun paiement n’est demandé sur le site : le règlement se fait à la fin de la prestation. Pour un chantier sur devis, les modalités sont précisées dans le devis.', { actions: [booking, contact] });
  if (/deplac|zone|distance|intervenez|commune/.test(q) || COMMUNES.some(c => q.includes(normalize(c)))) return reply(`Nous intervenons à Toulouse et dans son agglomération. Déplacement offert jusqu’à ${DISPLACEMENT_RULES.freeKm} km, puis 10 € de 21 à 34 km et 20 € de 35 à 49 km. Pour une adresse éloignée ou un doute sur la distance, faites confirmer les frais avant de réserver.`, { actions: [booking, contact] });
  if (/avis|note google/.test(q)) return reply(`Le site affiche ${GOOGLE_REVIEW_COUNT} avis Google et une note de ${String(GOOGLE_REVIEW_RATING).replace('.', ',')}/5.`, { actions: [booking] });
  if (/vapeur|acari|bacter|desinfect|assain/.test(q)) return reply('Le traitement anti-acariens et bactérien utilise une vapeur professionnelle puissante pour assainir par la chaleur les textiles et surfaces compatibles. Pour l’auto : plastiques et coffre entier, puis sièges, moquettes et ciel de toit selon le pack et les options. Le passage est adapté au revêtement. Les options ne prolongent pas la durée.', { actions: [booking], suggestions: ['Réserver avec l’assistant', 'Quelles options ?'] });
  if (/tache|odeur|urine|vomi|sang|poils|chien|chat|acari/.test(q)) return reply('Précisez le support, la matière et l’origine des taches ou odeurs. Des options ciblées sont proposées selon la prestation. Le résultat dépend de l’état du support : aucune disparition totale ne peut être garantie à distance. Pour un support délicat ou très dégradé, envoyez des photos via la page de contact.', { actions: [booking, contact], suggestions: ['Canapé', 'Matelas', 'Auto', 'Tapis'] });
  if (/option/.test(q)) return reply('Les options adaptées s’affichent après le choix de votre formule, avec leur prix avant confirmation. Vous choisissez uniquement celles qui vous conviennent. Les options ne prolongent pas la durée prévue de la prestation.', { actions: [booking] });
  if (hits.length > 1 && !q.includes('siege') && !q.includes('cuir')) return reply('Vous pouvez combiner plusieurs prestations dans la même réservation grâce au bouton « Ajouter une autre prestation ». Le récapitulatif additionne les formules et les options choisies. Consultez les prix puis ajoutez chaque prestation au panier.', { actions: [booking] });
  if (/horaire|dimanche|week.end/.test(q)) return reply('Les créneaux de réservation sont proposés du lundi au dimanche, de 8 h à 21 h, selon les disponibilités. Consultez le calendrier pour choisir un horaire réellement disponible.', { actions: [booking] });
  if (current?.booking && current.prices?.length) {
    const priceLines = current.prices.map(p => `${p.label} : ${p.price}`).join('\n');
    const comparison = /compar|difference|comprend|inclus|bronze|argent|pack or/.test(q);
    return reply(`${current.short}\n\n${comparison ? current.prices.map(p => `${p.label} — ${p.price}\n${(p.items ?? []).join(' · ')}`).join('\n\n') : priceLines}\n\n${service?.includes('matelas') ? 'Les deux faces sont incluses. ' : ''}${service?.includes('tapis') ? 'Format standard jusqu’à 4 m² par tapis. ' : ''}Les options sont présentées avant confirmation.`, { actions: [booking, { label: 'Détails de la prestation', href: current.slug }], suggestions: ['Quelles options ?', 'Comment se passe le paiement ?', 'Voir les disponibilités'] });
  }
  if (current || /devis|chantier|surface|m2|m²/.test(q)) return reply(`Pour ${current ? current.short.toLowerCase() : 'préparer votre devis'}, indiquez la surface, l’état des lieux, les prestations souhaitées, la commune et la date envisagée. Ajoutez des photos, précisez l’accès à l’eau et à l’électricité, puis vos coordonnées dans le formulaire. Le montant doit être confirmé par Clean&Fresh ; je ne peux pas établir un devis contractuel ici.`, { actions: [contact, phone] });
  if (/bonjour|salut|bonsoir|merci/.test(q)) return { ...welcome, service: previousService };
  return reply('Pouvez-vous préciser ce que vous souhaitez faire nettoyer ? Je peux expliquer les prix et les formules du site, les options, le séchage ou la réservation. Pour une demande particulière, l’équipe pourra vous répondre directement.', { suggestions: welcome.suggestions, actions: [contact] });
}
