import type { Formule, ServiceDef } from '@/data/bookingCatalogue';

const INCLUDED: Record<string, string> = {
  canape: 'Nettoyage courant de l’assise, du dossier et des coussins compatibles.',
  matelas: 'Nettoyage des deux faces inclus.',
  tapis: 'Nettoyage de la face principale. Le recto-verso est proposé en option.',
  cuir: 'Nettoyage manuel adapté au cuir. Le soin nourrissant et protecteur reste facultatif.',
};

export function DesktopPriceSummary({ service, formule, optionsTotal }: { service: ServiceDef; formule: Formule; optionsTotal: number }) {
  return <section aria-label="Votre formule et son prix" className="mb-6 hidden overflow-hidden rounded-2xl border border-blue-100 bg-blue-50/60 lg:block">
    <div className="grid grid-cols-[1fr_auto] gap-5 p-5">
      <div>
        <p className="text-xs font-bold uppercase tracking-wider text-blue-800">Déjà inclus dans votre formule</p>
        <h3 className="mt-2 font-bold text-blue-950">{formule.name}</h3>
        <p className="mt-2 text-sm leading-6 text-slate-600">{formule.desc}</p>
        {INCLUDED[service.id] && <p className="mt-1 text-sm leading-6 text-slate-600">{INCLUDED[service.id]}</p>}
      </div>
      <dl className="min-w-44 space-y-3 text-right text-sm">
        <div className="flex justify-between gap-4"><dt className="text-slate-500">Formule</dt><dd className="font-semibold">{formule.price} €</dd></div>
        <div className="flex justify-between gap-4"><dt className="text-slate-500">Options choisies</dt><dd className="font-semibold">+ {optionsTotal} €</dd></div>
        <div className="border-t border-blue-200 pt-2"><dt className="text-xs text-blue-800">Cette prestation</dt><dd className="text-2xl font-bold text-blue-950" aria-live="polite">{formule.price + optionsTotal} €</dd></div>
      </dl>
    </div>
    <div className="border-t border-blue-100 bg-white/70 px-5 py-4 text-xs leading-5 text-slate-600">
      <p><strong className="text-blue-950">Les options sont facultatives.</strong> Les traitements intensifs répondent à des besoins spécifiques : taches résistantes, odeurs incrustées ou résidus organiques. Choisissez uniquement ce qui vous est utile.</p>
      <p className="mt-2">Aucun paiement en ligne · règlement sur place. Déplacement offert jusqu’à 20 km ; +10 € de 21 à 34 km ; +20 € de 35 à 49 km. Au-delà, contactez-nous. Les frais éventuels sont précisés selon l’adresse avant confirmation et ne sont pas inclus dans ce sous-total.</p>
    </div>
  </section>;
}
