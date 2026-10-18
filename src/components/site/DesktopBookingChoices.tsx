import { Link } from '@tanstack/react-router';
import { ArrowUpRight, Home, ShieldCheck } from 'lucide-react';
import { SERVICES } from '@/data/bookingCatalogue';

// Prices come from the catalogue; links open the category without choosing a formula.
const PICKS = [
  { service: 'canape', formulas: ['canape-2', 'canape-45', 'canape-angle', 'canape-u'], label: 'Canapé', detail: '2/3 places, 4/5 places, angle ou U', action: 'Choisir le format' },
  { service: 'auto', formulas: ['bronze', 'argent', 'or'], label: 'Voiture', detail: 'Packs Bronze, Argent ou Or', action: 'Voir les packs' },
  { service: 'matelas', formulas: ['matelas-enfant', 'matelas-1', 'matelas-2'], label: 'Matelas', detail: 'Enfant, 1 place ou 2 places', action: 'Choisir le format' },
  { service: 'tapis', formulas: ['tapis-1', 'tapis-2', 'tapis-3'], label: 'Tapis', detail: '1, 2 ou 3 tapis · jusqu’à 4 m² chacun', action: 'Choisir la quantité' },
  { service: 'cuir', formulas: ['cuir-fauteuil', 'cuir-canape-2', 'cuir-canape-4', 'cuir-canape-angle', 'cuir-chaise', 'cuir-chaises-5', 'cuir-chaises-6', 'cuir-auto'], label: 'Cuir', detail: 'Canapés, fauteuils, chaises et sièges', action: 'Choisir ma prestation' },
  { service: 'moquette', formulas: ['moquette-petite', 'moquette-standard', 'moquette-grande'], label: 'Moquette', detail: 'Petite, moyenne ou grande pièce', action: 'Choisir la surface' },
];

export function DesktopBookingChoices() {
  return (
    <section aria-labelledby="booking-choices" className="border-b border-slate-200 bg-gradient-to-b from-sky-50 to-white py-6 lg:py-8">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-4 flex flex-wrap items-end justify-between gap-2">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[.18em] text-blue-800 sm:text-xs">Réservez votre nettoyage à domicile</p>
            <h2 id="booking-choices" className="mt-1 text-xl font-bold tracking-tight text-slate-950 lg:text-2xl">Vous choisissez. Nous nettoyons.</h2>
          </div>
          <Link to="/formules" className="inline-flex min-h-11 items-center text-xs font-semibold text-blue-900 underline underline-offset-4 sm:text-sm">Tarifs et réservation</Link>
        </div>
        <div className="grid grid-cols-2 gap-2.5 lg:grid-cols-4 lg:gap-4">
          {PICKS.map(pick => {
            const service = SERVICES.find(item => item.id === pick.service)!;
            const startingPrice = Math.min(...service.formules.filter(item => pick.formulas.includes(item.id)).map(item => item.price));
            return (
              <Link key={pick.service} to="/reserver" search={{ service: service.id, formule: '', from: 'home_choices' }} data-conversion-location="home_choices" className={`group flex min-w-0 flex-col rounded-2xl border border-blue-100 bg-white p-3 shadow-sm transition-colors hover:border-blue-400 hover:bg-blue-50/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 lg:p-5`}>
                <div className="flex items-center gap-2">
                  <span aria-hidden="true" className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-900 [&>svg]:size-5">{service.icon}</span>
                  <h3 className="text-sm font-bold text-slate-950 lg:text-base">{pick.label}</h3>
                </div>
                <p className="mt-2 flex-1 text-[11px] leading-4 lg:text-xs lg:leading-5 text-slate-600">{pick.detail}</p>
                <p className="mt-2 text-xs text-slate-600">À partir de <strong className="whitespace-nowrap text-xl font-bold tracking-tight text-blue-950 lg:text-2xl">{startingPrice} €</strong></p>
                <span className="mt-2 flex min-h-8 items-center justify-between gap-1 border-t border-blue-100 pt-2 text-[11px] font-bold text-blue-900 lg:text-sm">{pick.action}<ArrowUpRight aria-hidden="true" className="size-4 shrink-0" /></span>
              </Link>
            );
          })}
          <Link to="/contactez-nous" search={{ service: 'logement' }} data-conversion-location="home_choices" className="col-span-2 grid min-w-0 grid-cols-2 items-center gap-x-3 rounded-2xl border border-blue-900 lg:col-span-2 lg:content-center lg:gap-x-6 bg-blue-950 p-3 text-white shadow-sm transition-colors hover:bg-blue-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 lg:p-5">
            <div className="flex items-center gap-2"><span aria-hidden="true" className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-white/10"><Home className="size-5" /></span><h3 className="text-sm font-bold lg:text-base">Logement</h3></div>
            <p className="row-start-2 mt-2 text-[11px] leading-4 lg:text-xs lg:leading-5 text-blue-100">Appartement ou maison</p>
            <p className="col-start-2 row-start-1 text-right text-xl font-bold tracking-tight lg:text-3xl">Sur devis</p>
            <span className="mt-2 flex min-h-8 items-center justify-between gap-1 border-t border-white/20 pt-2 text-[11px] font-bold lg:text-sm">Demander un devis<ArrowUpRight aria-hidden="true" className="size-4 shrink-0" /></span>
          </Link>
        </div>
        <div className="mt-2 flex flex-wrap items-center justify-between gap-2 text-[11px] leading-4 text-slate-600 lg:text-xs">
          <span className="flex items-center gap-1.5"><ShieldCheck aria-hidden="true" className="size-4 shrink-0 text-blue-800" /> Choix de la formule avant le créneau · paiement sur place</span>
          <span>Options et éventuels frais de déplacement précisés avant confirmation.</span>
        </div>
      </div>
    </section>
  );
}
