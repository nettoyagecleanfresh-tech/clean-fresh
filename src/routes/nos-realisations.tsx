import { responsiveRealisation } from '@/lib/responsiveRealisation';
import { useRef, useState } from 'react';
import { createFileRoute, Link } from '@tanstack/react-router';
import { ChevronLeft, ChevronRight, ArrowUpRight, ZoomIn } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { realisations as sourceRealisations, type Realisation } from '@/data/realisations';
import { realisationDimensions } from '@/data/realisationDimensions';
import { SITE_URL } from '@/data/site';

// Gallery-only locations: keep titles used by other pages unchanged.
const galleryCities: Record<string, string> = {
  "/images/realisations-20261118/nettoyage-fauteuil-bleu-avant-apres.webp": "Balma",
  "/images/realisations-20261118/nettoyage-chaise-jaune-avant-apres.webp": "Saint-Orens-de-Gameville",
  "/images/realisations-20261118/nettoyage-fauteuil-gris-a-oreilles-avant-apres.webp": "L’Union",
  "/images/realisations-20261118/nettoyage-sieges-en-tissu-clair-avant-apres.webp": "Toulouse",
  "/images/realisations-20261118/nettoyage-fauteuil-orange-avant-apres.webp": "Ramonville-Saint-Agne",
  "/images/realisations-20261118/nettoyage-fauteuil-capitonne-moutarde-avant-apres.webp": "Blagnac",
  "/images/realisations-20261118/nettoyage-fauteuil-beige-avant-apres.webp": "Colomiers",
  "/images/realisations-20261118/nettoyage-fauteuil-arrondi-gris-avant-apres.webp": "Tournefeuille",
  "/images/realisations-20261118/nettoyage-canape-cotele-brun-avant-apres.webp": "Aigrefeuille",
  "/images/realisations-20261118/nettoyage-fauteuil-jaune-arrondi-avant-apres.webp": "Quint-Fonsegrives",
  "/images/realisations-20261118/nettoyage-fauteuil-capitonne-bleu-avant-apres.webp": "Saint-Jean",
  "/images/realisations-20261118/nettoyage-canape-convertible-gris-avant-apres.webp": "Castanet-Tolosan",
  "/images/realisations-20261118/nettoyage-banquette-arriere-de-voiture-avant-apres.webp": "Toulouse",
  "/images/realisations-20261118/nettoyage-canape-dangle-a-coussins-motifs-avant-apres.webp": "Balma",
  "/images/realisations-20261118/nettoyage-fauteuil-jaune-a-dossier-haut-avant-apres.webp": "Pechbusque",
  "/images/realisations-20261118/nettoyage-pommeau-de-levier-de-vitesses-avant-apres.webp": "Toulouse",
  "/images/realisations-20261118/nettoyage-habitacle-de-mini-avant-apres.webp": "Labège",
  "/images/realisations-20261010/nettoyage-habitacle-dacia.png": "Cugnaux",
  "/images/realisations-20261010/poils-animaux-banquette.png": "Plaisance-du-Touch",
  "/images/realisations-20261010/detachage-tapis-clair.png": "Muret",
  "/images/realisations-20261010/tapis-professionnel-capitole.png": "Toulouse",
  "/images/realisations-20261010/poils-tapis-auto.png": "Aucamville",
  "/images/realisations-20261010/nettoyage-tableau-de-bord.png": "Villeneuve-Tolosane",
  "/images/realisations-20261009/chantier-1-960.webp": "Portet-sur-Garonne",
  "/images/realisations-20261009/chantier-2-960.webp": "Castelginest",
  "/images/realisations-20261009/chantier-6-690.webp": "Launaguet",
  "/images/realisations-20261009/chantier-7-690.webp": "Frouzins",
  "/images/realisations-20261009/chantier-8-690.webp": "Seysses",
  "/images/realisations-20261009/chantier-9-690.webp": "Cornebarrieu",
  "/images/realisations-20261009/chantier-10-690.webp": "Beauzelle",
  "/realisations/photo-02.webp": "Aussonne",
  "/realisations/photo-03.webp": "Pibrac",
  "/realisations/photo-04.webp": "Léguevin",
  "/realisations/photo-05.webp": "Escalquens",
  "/realisations/photo-06.webp": "Saint-Alban",
  "/realisations/photo-07.webp": "Fenouillet",
  "/realisations/photo-08.webp": "Roques",
  "/realisations/photo-09.webp": "Bruguières",
  "/realisations/photo-10.webp": "La Salvetat-Saint-Gilles",
  "/realisations/photo-11.webp": "Castelmaurou",
  "/realisations/photo-12.webp": "Auzeville-Tolosane",
  "/realisations/photo-13.webp": "Pins-Justaret",
  "/realisations/photo-14.webp": "Gratentour",
  "/realisations/photo-15.webp": "Fonsorbes",
  "/realisations/photo-16.webp": "Flourens",
  "/realisations/photo-17.webp": "Seilh",
  "/realisations/photo-18.webp": "Colomiers",
  "/realisations/photo-19.webp": "Blagnac",
  "/realisations/photo-20.webp": "Tournefeuille",
  "/realisations/photo-21.webp": "Toulouse",
  "/realisations/photo-22.webp": "Cugnaux",
  "/realisations/photo-23.webp": "Saint-Orens-de-Gameville",
  "/realisations/photo-24.webp": "Toulouse",
  "/realisations/photo-25.webp": "Toulouse",
  "/realisations/photo-26.webp": "Plaisance-du-Touch",
  "/realisations/photo-27.webp": "L’Union",
  "/realisations/photo-28.webp": "Aucamville",
  "/realisations/photo-29.webp": "Quint-Fonsegrives",
  "/realisations/photo-30.webp": "Saint-Jean",
  "/realisations/photo-31.webp": "Colomiers",
  "/realisations/photo-32.webp": "Blagnac",
  "/realisations/photo-33.webp": "Tournefeuille",
  "/realisations/photo-34.webp": "Balma",
  "/realisations/photo-35.webp": "Cugnaux",
  "/realisations/photo-36.webp": "Toulouse",
  "/realisations/photo-37.webp": "Toulouse",
  "/realisations/photo-38.webp": "Toulouse",
  "/realisations/photo-39.webp": "Castelginest",
  "/realisations/photo-40.webp": "Launaguet",
  "/realisations/photo-41.webp": "Portet-sur-Garonne",
};
const realisations: Realisation[] = sourceRealisations.map(photo => {
  const city = galleryCities[photo.src];
  if (!city) return photo;
  const subject = photo.title.replace(/ — secteur .+$| à Toulouse$/u, "").replace("Nettoyage de habitacle", "Nettoyage de l’habitacle");
  const location = /^L[’']/u.test(city) ? `à l’${city.slice(2)}` : `à ${city}`;
  return { ...photo, title: `${subject} ${location}` };
});

const title = 'Nettoyage avant/après à Toulouse : nos réalisations | Clean&Fresh';
const description = 'Découvrez nos nettoyages avant/après : canapés tachés, matelas auréolés, tapis et intérieurs de voiture. Photos et détails des interventions Clean&Fresh.';
export const Route = createFileRoute('/nos-realisations')({
  head: () => ({ meta: [{ title }, { name: 'description', content: description },
    { property: 'og:title', content: title }, { property: 'og:description', content: description },
    { property: 'og:url', content: `${SITE_URL}/nos-realisations` }],
    scripts: [{
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'ImageGallery',
        name: title, url: SITE_URL + '/nos-realisations',
        publisher: { '@id': SITE_URL + '/#business' },
        image: realisations.map(photo => ({
          '@type': 'ImageObject', contentUrl: SITE_URL + photo.src,
          caption: photo.title, creator: { '@id': SITE_URL + '/#business' },
        })),
      }),
    }],
    links: [{ rel: 'canonical', href: `${SITE_URL}/nos-realisations` }] }),
  component: GaleriePage,
});

function Photo({ photo }: { photo: Realisation }) {
  const [width, height] = realisationDimensions[photo.src] ?? [1200, 900];
  const [beforeWidth, beforeHeight] = realisationDimensions[photo.beforeSrc ?? ""] ?? [width, height];
  const branded = photo.layout === 'branded';
  const single = photo.layout === 'single';
  return <div className={`relative isolate overflow-hidden bg-slate-100 ${photo.phone ? 'aspect-[3/4]' : ''}`}>
    {photo.beforeSrc ? <div className="grid grid-cols-2 items-center bg-slate-100"><img {...responsiveRealisation(photo.beforeSrc)} width={beforeWidth} height={beforeHeight} decoding="async" alt="Tapis rouges avant nettoyage au Théâtre du Capitole" loading="lazy" className="h-auto w-full" /><img {...responsiveRealisation(photo.src)} width={width} height={height} alt="Tapis propre après nettoyage au Théâtre du Capitole" loading="lazy" className="h-auto w-full" /></div> : <img {...responsiveRealisation(photo.src)} width={width} height={height} alt={`${photo.title}${single ? '' : ' — avant et après nettoyage'} — Clean&Fresh`}
      loading="lazy" decoding="async"
      className={photo.phone ? 'absolute left-0 top-[-33.48%] h-auto w-full max-w-none' : 'block h-auto w-full'} />}
    {!branded && <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2 w-[26%] max-w-32 -translate-x-1/2 -translate-y-1/2 opacity-70">
      <img src="/logo.webp" width="400" height="400" loading="lazy" decoding="async" alt="" className="h-auto w-full" />
    </div>}
  </div>;
}

function serviceLink(photo: Realisation) {
  const pages: Record<string, string> = {
    Canapés: '/nettoyage-canape-toulouse',
    Matelas: '/nettoyage-matelas-toulouse',
    Auto: '/nettoyage-auto-a-domicile-toulouse',
    Tapis: /moquette/i.test(photo.title) ? '/nettoyage-moquette-toulouse' : '/nettoyage-tapis-toulouse',
  };
  if (/cuir/i.test(photo.title)) return '/nettoyage-cuir-toulouse';
  if (photo.category === 'Logements' && /insalubre|très sale et encombrée/i.test(photo.title)) return '/nettoyage-extreme-toulouse';
  return pages[photo.category] ?? '/nettoyage-dappartement-ou-maison';
}

const galleryServiceLabels: Record<string, string> = {
  '/nettoyage-canape-toulouse': 'Nettoyage des canapés et sièges en tissu',
  '/nettoyage-cuir-toulouse': 'Nettoyage et soin du cuir',
  '/nettoyage-matelas-toulouse': 'Nettoyage des matelas',
  '/nettoyage-auto-a-domicile-toulouse': 'Nettoyage intérieur automobile',
  '/nettoyage-tapis-toulouse': 'Nettoyage des tapis',
  '/nettoyage-moquette-toulouse': 'Nettoyage de moquette',
  '/nettoyage-extreme-toulouse': 'Remise en état de logements insalubres',
  '/nettoyage-dappartement-ou-maison': 'Nettoyage des appartements et maisons',
};

function GaleriePage() {
  const [category, setCategory] = useState('Tout voir');
  const [selected, setSelected] = useState<Realisation | null>(null);
  const opener = useRef<HTMLButtonElement | null>(null);
  const photos = category === 'Tout voir' ? realisations : realisations.filter(photo => photo.category === category);
  const position = selected ? photos.indexOf(selected) : -1;
  const move = (step: number) => setSelected(photos[(position + step + photos.length) % photos.length] ?? null);
  return <div className="bg-slate-50 pb-24 lg:pb-12">
    <header className="mx-auto max-w-4xl px-5 pb-10 pt-14 text-center sm:pt-20">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-900">Clean&Fresh · Toulouse et son agglomération</p>
      <h1 className="mt-5 font-display text-4xl font-bold tracking-tight text-slate-900 sm:text-6xl">Nos réalisations à Toulouse<br /><span className="text-blue-900">Nettoyages avant et après</span></h1>
      <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-600">Canapés tachés, matelas auréolés, tapis et intérieurs de voiture : découvrez nos interventions avant et après nettoyage. Chaque photo vous permet de voir le travail réalisé sur le support.</p>
      <div className="mt-7 flex flex-wrap justify-center gap-3">
        <Link to="/formules" resetScroll className="rounded-full bg-blue-950 px-6 py-3 font-bold text-white hover:bg-blue-950">Réserver en ligne</Link>
      </div>
    </header>
    <section className="mx-auto max-w-6xl px-4" aria-label="Galerie de nos réalisations">
      <h2 className="sr-only">Galerie des interventions par prestation</h2>
      <div aria-label="Filtrer les réalisations" className="mb-5 flex flex-wrap justify-center gap-2">
        {['Tout voir', 'Canapés', 'Matelas', 'Tapis', 'Auto', 'Logements'].map(item => <button key={item} type="button" aria-pressed={category === item} onClick={() => setCategory(item)} className={`min-h-11 rounded-full border px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-900 ${category === item ? 'border-blue-900 bg-blue-950 text-white' : 'border-slate-200 bg-white text-slate-700 hover:border-blue-900'}`}>{item}</button>)}
      </div>
      <p aria-live="polite" className="mb-6 text-center text-sm text-slate-600">{photos.length} réalisations · Appuyez sur une photo pour l’agrandir</p>
      <div className="columns-1 gap-6 sm:columns-2 lg:columns-3">
        {photos.map(photo => <figure key={photo.src} className="mb-6 break-inside-avoid overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
          <button type="button" onClick={event => { opener.current = event.currentTarget; setSelected(photo); }} aria-label={`Agrandir : ${photo.title}`} className="group relative block w-full cursor-zoom-in text-left focus-visible:outline-4 focus-visible:-outline-offset-4 focus-visible:outline-blue-900">
            <Photo photo={photo} />
            <span aria-hidden="true" className="absolute bottom-3 right-3 rounded-full bg-white/95 p-2 text-slate-800 shadow-sm transition-transform group-hover:scale-110"><ZoomIn className="size-4" /></span>
          </button>
          <figcaption className="p-5">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-blue-900">{photo.category} · {photo.layout === 'single' ? 'Sur le terrain' : 'Avant / Après'}</p>
            <h3 className="mt-2 text-lg font-bold leading-snug text-slate-900">{photo.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">{photo.description}</p>
            <a href={serviceLink(photo)} className="mt-4 inline-flex min-h-11 items-center gap-1 text-sm font-bold text-blue-900 underline-offset-4 hover:underline">{galleryServiceLabels[serviceLink(photo)]}<ArrowUpRight className="size-4" /></a>
            <Link to="/formules" resetScroll className="mt-3 flex min-h-11 items-center justify-center rounded-full bg-blue-950 px-5 py-3 text-sm font-bold text-white hover:bg-blue-900">Réserver en ligne<ArrowUpRight className="ml-2 size-4" /></Link>
          </figcaption>
        </figure>)}
      </div>
    </section>
    <section className="mx-auto mt-12 max-w-6xl px-5" aria-labelledby="cas-clients">
      <h2 id="cas-clients" className="text-2xl font-bold text-slate-900">Trois interventions en détail</h2>
      <div className="mt-5 grid gap-4 md:grid-cols-3">
        {[
          { title: 'Théâtre du Capitole · Toulouse', need: 'Nettoyer les six tapis du théâtre.', work: 'Nettoyage des six tapis lors de notre intervention au Théâtre du Capitole.', result: 'La galerie présente les tapis avant intervention et un tapis après nettoyage.', href: '/nettoyage-tapis-toulouse' },
          { title: 'Intérieur de voiture · Poils d’animaux', need: 'Des poils présents sur la banquette et le plancher.', work: 'Retrait des poils et nettoyage des zones concernées.', result: 'Les photos permettent de comparer la banquette et le plancher avant et après.', href: '/nettoyage-auto-a-domicile-toulouse' },
          { title: 'Canapé · Méridienne grise', need: 'Des traces et des taches sur l’assise en tissu.', work: 'Nettoyage et détachage de la méridienne.', result: 'La même assise est présentée avant et après intervention dans la galerie.', href: '/nettoyage-canape-toulouse' },
        ].map(item => <article key={item.title} className="rounded-2xl border border-slate-200 bg-white p-5">
          <h3 className="font-bold text-slate-900">{item.title}</h3>
          <dl className="mt-4 space-y-3 text-sm leading-relaxed text-slate-600">
            <div><dt className="font-semibold text-slate-900">Le besoin</dt><dd>{item.need}</dd></div>
            <div><dt className="font-semibold text-slate-900">L’intervention</dt><dd>{item.work}</dd></div>
            <div><dt className="font-semibold text-slate-900">Le résultat en images</dt><dd>{item.result}</dd></div>
          </dl>
          <a href={item.href} className="mt-4 inline-flex min-h-11 items-center font-semibold text-blue-900 underline underline-offset-4">Découvrir la prestation</a>
        </article>)}
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
      <div className="mt-8 rounded-3xl bg-slate-900 p-7 text-center text-white sm:p-10"><h2 className="text-2xl font-bold">Et si le prochain avant/après était le vôtre ?</h2><p className="mt-3 leading-relaxed text-slate-300">Choisissez vos prestations, consultez les créneaux disponibles et réservez votre nettoyage en ligne.</p><Link to="/formules" resetScroll className="mt-6 inline-flex min-h-12 items-center rounded-full bg-blue-950 px-6 py-3 font-bold text-white hover:bg-blue-950">Réserver en ligne</Link></div>
    </section>
    <Dialog open={selected !== null} onOpenChange={open => { if (!open) setSelected(null); }}>
      {selected && <DialogContent className="max-h-[94dvh] max-w-3xl overflow-y-auto rounded-2xl p-4 pt-10 sm:p-6 sm:pt-10" onCloseAutoFocus={event => { event.preventDefault(); opener.current?.focus({ preventScroll: true }); }} onKeyDown={event => { if (event.key === 'ArrowLeft') { event.preventDefault(); move(-1); } if (event.key === 'ArrowRight') { event.preventDefault(); move(1); } }}>
        <DialogTitle>{selected.title}</DialogTitle>
        <DialogDescription>{selected.description}</DialogDescription>
        <div className="mx-auto w-full max-w-md overflow-hidden rounded-xl"><Photo photo={selected} /></div>
        <Link to="/formules" resetScroll className="inline-flex min-h-11 items-center justify-center rounded-full bg-blue-950 px-5 py-3 font-bold text-white">Réserver en ligne</Link>
        <div className="flex items-center justify-between gap-3"><button type="button" onClick={() => move(-1)} aria-label="Photo précédente" className="flex min-h-11 items-center rounded-full border px-4"><ChevronLeft className="size-5" />Précédente</button><span className="text-sm text-slate-500">{position + 1} / {photos.length}</span><button type="button" onClick={() => move(1)} aria-label="Photo suivante" className="flex min-h-11 items-center rounded-full border px-4">Suivante<ChevronRight className="size-5" /></button></div>
      </DialogContent>}
    </Dialog>
  </div>;
}
