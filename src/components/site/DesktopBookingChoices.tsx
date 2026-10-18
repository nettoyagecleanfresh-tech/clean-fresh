import { Link } from '@tanstack/react-router';
import { ArrowUpRight, Camera, Check, Home } from 'lucide-react';
import { SERVICES } from '@/data/bookingCatalogue';

const PICKS = [
  { service: 'canape', formula: 'canape-2', label: 'Votre canapé', detail: '2 à 3 places · nettoyage complet' },
  { service: 'auto', formula: 'bronze', label: 'Votre voiture', detail: 'Pack Bronze · aspiration & plastiques' },
  { service: 'tapis', formula: 'tapis-1', label: 'Votre tapis', detail: '1 tapis · jusqu’à 4 m²' },
];

export function DesktopBookingChoices() {
  return (
    <section aria-labelledby="desktop-choices" className="hidden border-b border-slate-200 bg-gradient-to-b from-sky-50 to-white py-12 lg:block">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-6 flex items-end justify-between gap-8">
          <div><p className="text-xs font-bold uppercase tracking-[.2em] text-blue-800">Un besoin, une solution</p><h2 id="desktop-choices" className="mt-2 text-3xl font-bold tracking-tight text-slate-950">Le bon nettoyage. Le prix sous les yeux.</h2></div>
          <Link to="/formules" className="shrink-0 text-sm font-semibold text-blue-900 underline underline-offset-4">Toutes les formules</Link>
        </div>
        <div className="grid grid-cols-4 gap-4">
          {PICKS.map(pick => {
            const service = SERVICES.find(item => item.id === pick.service)!;
            const formula = service.formules.find(item => item.id === pick.formula)!;
            return <Link key={pick.service} to="/reserver" search={{ service: service.id, formule: formula.id, from: 'home_choices' }} data-conversion-location="home_choices" className="group flex flex-col rounded-2xl border border-blue-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-xl focus-visible:outline-2 focus-visible:outline-blue-700 motion-reduce:transform-none">
              <span className="mb-5 flex size-12 items-center justify-center rounded-xl bg-blue-50 text-blue-900">{service.icon}</span>
              <h3 className="text-lg font-bold text-slate-900">{pick.label}</h3>
              <p className="mt-2 min-h-10 text-xs leading-5 text-slate-600">{pick.detail}</p>
              <p className="mt-4 text-3xl font-bold tracking-tight text-blue-950">{formula.price} € <span className="text-xs font-normal tracking-normal text-slate-500">la formule</span></p>
              <span className="mt-6 flex items-center justify-between border-t border-blue-50 pt-4 text-sm font-bold text-blue-900">Choisir mon créneau <ArrowUpRight className="size-4" /></span>
            </Link>;
          })}
          <Link to="/contactez-nous" search={{ service: 'logement' }} data-conversion-location="home_choices" className="group flex flex-col rounded-2xl border border-blue-900 bg-blue-950 p-5 text-white shadow-sm transition hover:-translate-y-1 hover:bg-blue-900 focus-visible:outline-2 focus-visible:outline-blue-600 motion-reduce:transform-none">
            <span className="mb-5 flex size-12 items-center justify-center rounded-xl bg-white/10"><Home className="size-7" /></span>
            <h3 className="text-lg font-bold">Votre logement</h3><p className="mt-2 min-h-10 text-xs leading-5 text-blue-100">Appartement, maison ou remise en état</p>
            <p className="mt-4 text-3xl font-bold tracking-tight">Sur devis</p>
            <span className="mt-6 flex items-center justify-between border-t border-white/15 pt-4 text-sm font-bold">Envoyer mes photos <Camera className="size-4" /></span>
          </Link>
        </div>
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600">
          <span className="flex items-center gap-2"><Check className="size-4 text-blue-800" /> Aucun paiement en ligne · règlement sur place</span>
          <span>Options facultatives et éventuels frais de déplacement précisés avant confirmation.</span>
        </div>
      </div>
    </section>
  );
}
