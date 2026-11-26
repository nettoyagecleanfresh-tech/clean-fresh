import { Plug, BriefcaseBusiness } from 'lucide-react';

export function AutoPreparation({ onAutoPage = false }: { onAutoPage?: boolean }) {
  return <aside aria-label="Avant de réserver votre nettoyage auto" className="my-4 rounded-xl border border-sky-200 bg-sky-50 px-4 py-3 text-left text-sm leading-relaxed text-slate-900">
    <p className="font-bold text-sky-950">Avant de réserver votre nettoyage auto</p>
    <p className="mt-2 flex items-start gap-2"><Plug aria-hidden="true" className="mt-0.5 size-4 shrink-0" /><span>Une <strong>prise électrique à moins de 60 mètres du véhicule</strong> est indispensable. Prévoyez aussi un accès à l’eau.</span></p>
    <p className="mt-1 flex items-start gap-2"><BriefcaseBusiness aria-hidden="true" className="mt-0.5 size-4 shrink-0" /><span>Avant notre arrivée, <strong>videz entièrement l’habitacle et le coffre</strong> de vos effets personnels, y compris les vide-poches.</span></p>
    <p className="mt-2">La pluie est défavorable au nettoyage auto. En hiver, privilégiez le matin ou le début d’après-midi pour terminer de jour. <a href={onAutoPage ? '#meteo-auto' : '/nettoyage-auto-a-domicile-toulouse#meteo-auto'} target={onAutoPage ? undefined : '_blank'} rel={onAutoPage ? undefined : 'noopener'} className="font-semibold text-sky-900 underline underline-offset-2">Voir la météo à Toulouse{onAutoPage ? '' : ' (nouvel onglet)'}</a></p>
  </aside>;
}
