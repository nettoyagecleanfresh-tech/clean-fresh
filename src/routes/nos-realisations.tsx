import { useRef, useState } from 'react';
import { createFileRoute, Link } from '@tanstack/react-router';
import { ChevronLeft, ChevronRight, ArrowUpRight, ZoomIn } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { realisations, type Realisation } from '@/data/realisations';
import { SITE_URL } from '@/data/site';

const title = 'Nettoyage avant/après à Toulouse : nos réalisations | Clean&Fresh';
const description = 'Découvrez nos nettoyages avant/après : canapés tachés, matelas auréolés, tapis et intérieurs de voiture. Photos et détails des interventions Clean&Fresh.';
export const Route = createFileRoute('/nos-realisations')({
  head: () => ({ meta: [{ title }, { name: 'description', content: description },
    { property: 'og:title', content: title }, { property: 'og:description', content: description },
    { property: 'og:url', content: `${SITE_URL}/nos-realisations` }],
    links: [{ rel: 'canonical', href: `${SITE_URL}/nos-realisations` }] }),
  component: GaleriePage,
});

function Photo({ photo }: { photo: Realisation }) {
  const branded = photo.layout === 'branded';
  const single = photo.layout === 'single';
  return <div className={`relative isolate overflow-hidden bg-slate-100 ${photo.phone ? 'aspect-[3/4]' : ''}`}>
    {photo.beforeSrc ? <div className="grid grid-cols-2 items-center bg-slate-100"><img src={photo.beforeSrc} alt="Tapis rouges avant nettoyage au Théâtre du Capitole" loading="lazy" className="h-auto w-full" /><img src={photo.src} alt="Tapis propre après nettoyage au Théâtre du Capitole" loading="lazy" className="h-auto w-full" /></div> : <img src={photo.src} alt={`${photo.title}${single ? '' : ' — avant et après nettoyage'} — Clean&Fresh`}
      loading="lazy" decoding="async"
      className={photo.phone ? 'absolute left-0 top-[-33.48%] h-auto w-full max-w-none' : 'block h-auto w-full'} />}
    {!branded && <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2 w-[26%] max-w-32 -translate-x-1/2 -translate-y-1/2 opacity-70">
      <img src="/logo.webp" alt="" className="h-auto w-full" />
    </div>}
  </div>;
}

function serviceLink(photo: Realisation) {
  const section: Record<string, string> = { Canapés: 'canape', Matelas: 'matelas', Auto: 'auto', Tapis: /moquette/i.test(photo.title) ? 'moquette' : 'tapis' };
  return section[photo.category] ? `/tarifs#section-${section[photo.category]}` : '/contactez-nous';
}

function GaleriePage() {
  const [category, setCategory] = useState('Tout voir');
  const [selected, setSelected] = useState<Realisation | null>(null);
  const opener = useRef<HTMLButtonElement | null>(null);
  const photos = category === 'Tout voir' ? realisations : realisations.filter(photo => photo.category === category);
  const position = selected ? photos.indexOf(selected) : -1;
  const move = (step: number) => setSelected(photos[(position + step + photos.length) % photos.length] ?? null);
  return <div className="bg-[#f5f9f8] pb-24 lg:pb-12">
    <header className="mx-auto max-w-4xl px-5 pb-10 pt-14 text-center sm:pt-20">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-teal-800">Clean&Fresh · Toulouse et son agglomération</p>
      <h1 className="mt-5 font-display text-4xl font-bold tracking-tight text-slate-900 sm:text-6xl">Nos réalisations.<br /><span className="text-teal-700">Le résultat en images.</span></h1>
      <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-600">Canapés tachés, matelas auréolés, tapis et intérieurs de voiture : découvrez nos interventions avant et après nettoyage. Chaque photo vous permet de voir le travail réalisé sur le support.</p>
      <div className="mt-7 flex flex-wrap justify-center gap-3">
        <Link to="/tarifs" resetScroll className="rounded-full bg-teal-700 px-6 py-3 font-bold text-white hover:bg-teal-800">Voir les tarifs et réserver</Link>
        <Link to="/contactez-nous" resetScroll className="rounded-full border border-teal-800/25 bg-white px-6 py-3 font-semibold text-teal-900 hover:bg-teal-50">Demander un devis</Link>
      </div>
    </header>
    <section className="mx-auto max-w-6xl px-4" aria-label="Galerie de nos réalisations">
      <div aria-label="Filtrer les réalisations" className="mb-5 flex flex-wrap justify-center gap-2">
        {['Tout voir', 'Canapés', 'Matelas', 'Tapis', 'Auto', 'Logements'].map(item => <button key={item} type="button" aria-pressed={category === item} onClick={() => setCategory(item)} className={`min-h-11 rounded-full border px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-700 ${category === item ? 'border-teal-800 bg-teal-800 text-white' : 'border-slate-200 bg-white text-slate-700 hover:border-teal-600'}`}>{item}</button>)}
      </div>
      <p aria-live="polite" className="mb-6 text-center text-sm text-slate-600">{photos.length} réalisations · Appuyez sur une photo pour l’agrandir</p>
      <div className="columns-1 gap-6 sm:columns-2 lg:columns-3">
        {photos.map(photo => <figure key={photo.src} className="mb-6 break-inside-avoid overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
          <button type="button" onClick={event => { opener.current = event.currentTarget; setSelected(photo); }} aria-label={`Agrandir : ${photo.title}`} className="group relative block w-full cursor-zoom-in text-left focus-visible:outline-4 focus-visible:-outline-offset-4 focus-visible:outline-teal-700">
            <Photo photo={photo} />
            <span aria-hidden="true" className="absolute bottom-3 right-3 rounded-full bg-white/95 p-2 text-slate-800 shadow-sm transition-transform group-hover:scale-110"><ZoomIn className="size-4" /></span>
          </button>
          <figcaption className="p-5">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-teal-800">{photo.category} · {photo.layout === 'single' ? 'Sur le terrain' : 'Avant / Après'}</p>
            <h2 className="mt-2 text-lg font-bold leading-snug text-slate-900">{photo.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">{photo.description}</p>
            <a href={serviceLink(photo)} className="mt-4 inline-flex min-h-11 items-center gap-1 text-sm font-bold text-teal-800 underline-offset-4 hover:underline">{photo.category === 'Logements' ? 'Demander un devis' : 'Voir la prestation'}<ArrowUpRight className="size-4" /></a>
          </figcaption>
        </figure>)}
      </div>
    </section>
    <section className="mx-auto mt-12 max-w-3xl px-5">
      <h2 className="text-2xl font-bold text-slate-900">Un problème de taches, de poils ou d’odeurs ?</h2>
      <div className="mt-5 space-y-3">
        <details className="rounded-2xl border bg-white p-5"><summary className="cursor-pointer font-semibold">Nettoyage insalubre et après syndrome de Diogène à Toulouse</summary><p className="mt-3 text-sm leading-relaxed text-slate-600">Pour un logement très encombré ou insalubre, décrivez les pièces, les surfaces et les déchets à prendre en charge. Les photos permettent de préparer un devis adapté. Une situation liée au syndrome de Diogène doit être précisée dans votre demande : elle ne se déduit pas du seul aspect d’une pièce.</p></details>
        <details className="rounded-2xl border bg-white p-5"><summary className="cursor-pointer font-semibold">Nettoyage des taches d’urine de chat sur un canapé ou un matelas</summary><p className="mt-3 text-sm leading-relaxed text-slate-600">Précisez l’origine de la tache, son ancienneté et les produits déjà utilisés dans votre demande. Une photo aide à évaluer le tissu et les auréoles, mais ne permet pas de mesurer les odeurs. Le traitement et le résultat possible dépendent du support et de la profondeur de l’imprégnation.</p></details>
        <details className="rounded-2xl border bg-white p-5"><summary className="cursor-pointer font-semibold">Retrait des poils de chien et de chat dans une voiture</summary><p className="mt-3 text-sm leading-relaxed text-slate-600">Les poils peuvent s’accrocher aux sièges, aux tapis et à la moquette du coffre. Envoyez une vue d’ensemble et une photo rapprochée des zones concernées pour préciser votre demande de nettoyage intérieur.</p></details>
        <details className="rounded-2xl border bg-white p-5"><summary className="cursor-pointer font-semibold">Traitement des odeurs et des taches d’origine organique</summary><p className="mt-3 text-sm leading-relaxed text-slate-600">Indiquez la source de l’odeur si vous la connaissez, le textile concerné et la date de l’incident. Une tache visible et une odeur persistante nécessitent une évaluation différente : nous vous orientons selon votre situation, sans promettre un résultat identique sur tous les supports.</p></details>
      </div>
      <div className="mt-8 rounded-3xl bg-slate-900 p-7 text-center text-white sm:p-10"><h2 className="text-2xl font-bold">Et si le prochain avant/après était le vôtre ?</h2><p className="mt-3 leading-relaxed text-slate-300">Décrivez votre besoin et ajoutez jusqu’à 10 photos pour nous montrer les zones à nettoyer.</p><Link to="/contactez-nous" resetScroll className="mt-6 inline-flex min-h-12 items-center rounded-full bg-teal-600 px-6 py-3 font-bold text-white hover:bg-teal-700">Demander mon devis gratuit</Link></div>
    </section>
    <Dialog open={selected !== null} onOpenChange={open => { if (!open) setSelected(null); }}>
      {selected && <DialogContent className="max-h-[94dvh] max-w-3xl overflow-y-auto rounded-2xl p-4 pt-10 sm:p-6 sm:pt-10" onCloseAutoFocus={event => { event.preventDefault(); opener.current?.focus({ preventScroll: true }); }} onKeyDown={event => { if (event.key === 'ArrowLeft') { event.preventDefault(); move(-1); } if (event.key === 'ArrowRight') { event.preventDefault(); move(1); } }}>
        <DialogTitle>{selected.title}</DialogTitle>
        <DialogDescription>{selected.description}</DialogDescription>
        <div className="mx-auto w-full max-w-md overflow-hidden rounded-xl"><Photo photo={selected} /></div>
        <div className="flex items-center justify-between gap-3"><button type="button" onClick={() => move(-1)} aria-label="Photo précédente" className="flex min-h-11 items-center rounded-full border px-4"><ChevronLeft className="size-5" />Précédente</button><span className="text-sm text-slate-500">{position + 1} / {photos.length}</span><button type="button" onClick={() => move(1)} aria-label="Photo suivante" className="flex min-h-11 items-center rounded-full border px-4">Suivante<ChevronRight className="size-5" /></button></div>
      </DialogContent>}
    </Dialog>
  </div>;
}
