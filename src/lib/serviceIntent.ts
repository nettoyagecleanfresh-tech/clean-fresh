/** Explicit public routes only: never classify free-text or customer query values. */
const bookingRoutes: Record<string, string> = {
  '/nettoyage-canape-toulouse': 'canape',
  '/nettoyage-auto-a-domicile-toulouse': 'auto',
  '/nettoyage-matelas-toulouse': 'matelas',
  '/nettoyage-tapis-toulouse': 'tapis',
  '/nettoyage-moquette-toulouse': 'moquette',
  '/nettoyage-cuir-toulouse': 'cuir',
};
const quoteRoutes: Record<string, string> = {
  '/nettoyage-dappartement-ou-maison': 'logement',
  '/nettoyage-de-fin-de-chantier-toulouse': 'chantier',
  '/nettoyage-fin-de-bail-toulouse': 'bail',
  '/nettoyage-diogene-toulouse': 'diogene',
  '/nettoyage-extreme-toulouse': 'extreme',
  '/nettoyage-de-vitres-toulouse': 'vitres',
  '/nettoyage-terrasse-toulouse': 'terrasse',
  '/nettoyage-toiture-toulouse': 'toiture',
  '/nettoyage-facade-toulouse': 'facade',
};
export function serviceIntent(pathname: string) {
  const path = pathname.replace(/\/+$/, '') || '/';
  if (bookingRoutes[path]) return { kind: 'booking' as const, service: bookingRoutes[path] };
  if (quoteRoutes[path]) return { kind: 'quote' as const, service: quoteRoutes[path] };
  return { kind: 'booking' as const, service: undefined };
}
