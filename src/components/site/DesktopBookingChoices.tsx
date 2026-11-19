import { Link } from '@tanstack/react-router';
import { ArrowUpRight, ShieldCheck } from 'lucide-react';
import { SERVICES } from '@/data/bookingCatalogue';
import { SERVICES as servicePages } from '@/data/site';
import { serviceIntent } from '@/lib/serviceIntent';

// Prices come from the catalogue; links open the category without choosing a formula.
const PICKS = [
  { service: 'canape', formulas: ['canape-2', 'canape-45', 'canape-angle', 'canape-u'], label: 'Nettoyage de canapé', detail: 'Canapé en tissu, droit ou d’angle' },
  { service: 'auto', formulas: ['bronze', 'argent', 'or'], label: 'Nettoyage auto', detail: 'Packs Bronze, Argent ou Or' },
  { service: 'matelas', formulas: ['matelas-enfant', 'matelas-1', 'matelas-2'], label: 'Nettoyage de matelas', detail: 'Nettoyage des deux faces' },
  { service: 'tapis', formulas: ['tapis-1', 'tapis-2', 'tapis-3'], label: 'Nettoyage de tapis', detail: 'Jusqu’à 4 m² par tapis' },
  { service: 'cuir', formulas: ['cuir-fauteuil', 'cuir-canape-2', 'cuir-canape-4', 'cuir-canape-angle', 'cuir-chaise', 'cuir-chaises-5', 'cuir-chaises-6', 'cuir-auto'], label: 'Nettoyage du cuir', detail: 'Canapés, fauteuils, chaises et sièges' },
  { service: 'moquette', formulas: ['moquette-petite', 'moquette-standard', 'moquette-grande'], label: 'Nettoyage de moquette', detail: 'Tarifs selon la surface' },
];

const quoteLabels: Record<string, string> = {
  logement: 'Appartement ou maison', bail: 'Fin de bail', chantier: 'Après travaux',
  diogene: 'Diogène et débarras', extreme: 'Logement insalubre', vitres: 'Vitres et vitrines',
  terrasse: 'Terrasse', facade: 'Façade', toiture: 'Toiture',
};

export function DesktopBookingChoices() {
  return (
    <section aria-labelledby="booking-choices" className="border-b border-slate-200 bg-gradient-to-b from-sky-50 to-white py-6 lg:py-8">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-4 flex flex-wrap items-end justify-between gap-2">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[.18em] text-blue-800 sm:text-xs">Réservez votre nettoyage à domicile</p>
            <h2 id="booking-choices" className="mt-1 text-xl font-bold tracking-tight text-slate-950 lg:text-2xl">Que souhaitez-vous faire nettoyer ?</h2>
          </div>
          <Link to="/formules" className="inline-flex min-h-11 items-center text-xs font-semibold text-blue-900 underline underline-offset-4 sm:text-sm">Tarifs et réservation</Link>
        </div>
        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-6 lg:gap-3">
          {PICKS.map(pick => {
            const service = SERVICES.find(item => item.id === pick.service)!;
            const startingPrice = Math.min(...service.formules.filter(item => pick.formulas.includes(item.id)).map(item => item.price));
            const info = servicePages.find(page => serviceIntent(page.slug).service === pick.service)!;
            return (
              <article key={pick.service} className="flex min-w-0 flex-col rounded-2xl border border-blue-100 bg-white shadow-sm">
                <Link to={info.slug} className="group flex min-w-0 flex-1 flex-col rounded-t-2xl p-3 text-slate-950 hover:bg-blue-50/50 focus-visible:outline-2 focus-visible:outline-blue-700">
                  <div className="flex items-center gap-2">
                    <span aria-hidden="true" className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-900 [&>svg]:size-5">{service.icon}</span>
                    <h3 className="text-sm font-bold lg:text-base">{pick.label}</h3>
                  </div>
                  <p className="mt-2 text-xs text-slate-600">Dès <strong className="whitespace-nowrap text-xl font-bold text-blue-950">{startingPrice} €</strong></p>
                  <span className="mt-1 text-xs text-blue-900 underline underline-offset-2">{pick.detail}</span>
                </Link>
                <Link to="/reserver" search={{ service: service.id, formule: '', from: 'home_choices' }} data-conversion-location="home_choices" aria-label={`Réserver en ligne : ${pick.label}`} className="flex min-h-11 items-center justify-between gap-1 rounded-b-2xl border-t border-blue-100 px-3 text-sm font-bold text-blue-900 hover:bg-sky-50">
                  Réserver <ArrowUpRight aria-hidden="true" className="size-4 shrink-0" />
                </Link>
              </article>
            );
          })}

        </div>
        <div className="mt-2 flex flex-wrap items-center justify-between gap-2 text-[11px] leading-4 text-slate-600 lg:text-xs">
          <span className="flex items-center gap-1.5"><ShieldCheck aria-hidden="true" className="size-4 shrink-0 text-blue-800" /> Plusieurs articles possibles dans un seul rendez-vous · paiement sur place</span>
          <span>Options et éventuels frais de déplacement précisés avant confirmation.</span>
        </div>
        <div className="mt-6 rounded-2xl bg-sky-950 px-4 py-5 text-white sm:p-6">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h2 className="text-xl font-bold">Un logement ou un bâtiment à nettoyer ?</h2>
            <Link to="/contactez-nous" className="py-1 text-sm font-semibold text-white underline underline-offset-4">Demander un devis gratuit</Link>
          </div>
          <p className="mt-1 text-sm leading-relaxed text-sky-100">Choisissez le type de nettoyage pour préciser votre besoin et recevoir un devis sous 24 h.</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {Object.entries(quoteLabels).map(([service, label]) => (
              <Link key={service} to="/contactez-nous" search={{ service }} data-conversion-location="home_choices" className="inline-flex min-h-10 items-center rounded-lg border border-sky-600 bg-sky-900 px-3 py-2 text-sm font-semibold hover:bg-sky-800">{label}</Link>
            ))}
          </div>
          <details className="mt-3 border-t border-white/20">
            <summary className="cursor-pointer pt-3 text-sm font-semibold">Ce qui est inclus selon la prestation</summary>
            <ul className="mt-2 columns-1 sm:columns-2 lg:columns-3">
              {servicePages.filter(page => !page.booking).map(page => <li key={page.slug} className="break-inside-avoid"><Link to={page.slug} className="inline-block py-1.5 text-sm text-sky-100 underline underline-offset-4">{page.navLabel}</Link></li>)}
            </ul>
          </details>
        </div>
      </div>
    </section>
  );
}
