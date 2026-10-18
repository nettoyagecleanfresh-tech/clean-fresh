import { Link } from '@tanstack/react-router';
import { ArrowRight, Camera, MapPin, Maximize2, Star } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { realisations, type Realisation } from '@/data/realisations';
import { ALL_REVIEWS } from '@/data/reviews';
import { realisationDimensions } from '@/data/realisationDimensions';

const BLANK = 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=';
const CATEGORIES: Record<string, string> = { canape: 'Canapés', auto: 'Auto', matelas: 'Matelas', tapis: 'Tapis', moquette: 'Tapis' };

function selectedPhotos(slug: string, booking: string | null) {
  if (booking && CATEGORIES[booking]) {
    return realisations.filter(photo => photo.category === CATEGORIES[booking] &&
      (booking === 'moquette' ? /moquette/i.test(photo.title) : booking === 'tapis' ? !/moquette/i.test(photo.title) : true)).slice(0, booking === 'canape' || booking === 'auto' ? 6 : 4);
  }
  if (/diogene|extreme/.test(slug)) return realisations.filter(photo => /photo-(22|23|39|40)\.webp$/.test(photo.src));
  if (/appartement|fin-de-bail|fin-de-chantier/.test(slug)) return realisations.filter(photo => /photo-(32|33|35|41)\.webp$/.test(photo.src));
  return [];
}

function ProofPhoto({ photo, enlarged = false }: { photo: Realisation; enlarged?: boolean }) {
  const sources = photo.beforeSrc ? [photo.beforeSrc, photo.src] : [photo.src];
  return <div className={`relative overflow-hidden bg-slate-100 ${photo.phone ? 'aspect-[3/4]' : ''} ${photo.beforeSrc ? 'grid grid-cols-2 gap-1' : ''}`}>
    {sources.map((src, index) => <picture key={src}>
      {!enlarged && <source media="(max-width: 1023px)" srcSet={BLANK} />}
      <img src={src} width={realisationDimensions[src]?.[0]} height={realisationDimensions[src]?.[1]} alt={photo.beforeSrc ? `${index === 0 ? 'Avant' : 'Après'} — ${photo.title}` : `${photo.title} — comparaison avant / après`} loading="lazy" decoding="async" className={photo.phone ? 'absolute left-0 top-[-33.48%] h-auto w-full max-w-none' : 'block h-auto w-full'} />
    </picture>)}
  </div>;
}

export function DesktopServiceProof({ slug, bookingServiceId }: { slug: string; bookingServiceId: string | null }) {
  const photos = selectedPhotos(slug, bookingServiceId);
  const reviewCategory = bookingServiceId ?? (/appartement|fin-de-bail/.test(slug) ? 'appartement' : '');
  const review = reviewCategory ? ALL_REVIEWS.find(item => item.stars === 5 && item.categories.includes(reviewCategory)) : undefined;
  const quoteService = /diogene/.test(slug) ? 'diogene' : /extreme/.test(slug) ? 'extreme' : /fin-de-chantier/.test(slug) ? 'chantier' : /fin-de-bail/.test(slug) ? 'bail' : /appartement/.test(slug) ? 'logement' : /vitres/.test(slug) ? 'vitres' : /terrasse/.test(slug) ? 'terrasse' : /toiture/.test(slug) ? 'toiture' : /facade/.test(slug) ? 'facade' : '';
  return <section id="resultats" aria-labelledby="service-proof-title" className="hidden bg-gradient-to-b from-slate-50 via-white to-sky-50 py-16 lg:block">
    <div className="mx-auto max-w-6xl px-4">
      {photos.length > 0 && <>
        <div className="mb-8 flex items-end justify-between gap-8">
          <div><p className="text-xs font-bold uppercase tracking-[.22em] text-blue-800">Le résultat se voit</p><h2 id="service-proof-title" className="mt-3 text-4xl font-bold tracking-tight text-blue-950">Des interventions réelles.<br />Des résultats en images.</h2><p className="mt-4 max-w-2xl text-sm leading-6 text-slate-600">Découvrez les avant / après de notre galerie à Toulouse. Cliquez sur une réalisation pour voir les détails.</p></div>
          <Link to="/nos-realisations" className="shrink-0 rounded-full border border-blue-200 bg-white px-5 py-3 text-sm font-bold text-blue-900 hover:bg-blue-50">Toute la galerie ↗</Link>
        </div>
        <div className={`gap-5 ${photos.length === 1 ? 'max-w-xl' : photos.length === 4 ? 'columns-2' : 'columns-3'}`}>
          {photos.map((photo, index) => <figure key={photo.src} className="mb-5 break-inside-avoid overflow-hidden rounded-2xl border border-blue-100 bg-white shadow-[0_10px_35px_-18px_rgba(23,37,84,.3)]">
            <Dialog>
              <DialogTrigger asChild><button type="button" aria-label={`Agrandir : ${photo.title}`} className="group relative block w-full text-left focus-visible:outline-4 focus-visible:outline-blue-600">
                <ProofPhoto photo={photo} />
                <span className="absolute bottom-3 right-3 flex items-center gap-2 rounded-full bg-blue-950/90 px-3 py-2 text-xs font-semibold text-white shadow-lg transition group-hover:bg-blue-800"><Maximize2 className="size-3" /> Agrandir</span>
              </button></DialogTrigger>
              <DialogContent className="max-h-[90vh] max-w-3xl overflow-y-auto rounded-2xl border-blue-100 bg-white">
                <DialogTitle className="pr-7 text-blue-950">{photo.title}</DialogTitle>
                <DialogDescription>{photo.description}</DialogDescription>
                <div className="mx-auto w-full max-w-lg"><ProofPhoto photo={photo} enlarged /></div>
              </DialogContent>
            </Dialog>
            <figcaption className="p-5"><p className="mb-2 flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-blue-700"><span>Avant / Après</span><span>{String(index + 1).padStart(2, '0')}</span></p><h3 className="text-base font-bold leading-6 text-slate-900">{photo.title}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{photo.description}</p><span className="mt-3 flex items-center gap-1 text-xs text-slate-500"><MapPin className="size-3" /> Intervention à Toulouse</span></figcaption>
          </figure>)}
        </div>
        <p className="mt-3 text-xs text-slate-500">Le résultat dépend de la matière, de l’état initial et de l’ancienneté des taches. Ces photos présentent des résultats déjà obtenus.</p>
      </>}
      <div className={`${photos.length ? 'mt-8' : ''} grid overflow-hidden rounded-3xl border border-blue-100 bg-blue-950 text-white ${review ? 'grid-cols-[1fr_1fr]' : 'grid-cols-1'}`}>
        {review && <figure className="border-r border-white/10 p-8"><div className="mb-4 flex gap-1 text-amber-400" aria-label="5 étoiles sur 5">{Array.from({ length: 5 }, (_, index) => <Star key={index} className="size-4 fill-current" />)}</div><blockquote className="text-sm leading-7 text-blue-50">« {review.text} »</blockquote><figcaption className="mt-4 text-xs font-semibold text-blue-200">{review.name} · Avis Google</figcaption></figure>}
        <div className="flex flex-col justify-center p-8">
          <h3 {...(!photos.length ? { id: 'service-proof-title' } : {})} className="text-2xl font-bold">{bookingServiceId ? 'Prêt à retrouver un intérieur propre ?' : 'Votre projet commence par quelques photos.'}</h3>
          <p className="mt-3 text-sm leading-6 text-blue-100">{bookingServiceId ? 'Choisissez votre formule, vos options et votre créneau. Aucun paiement en ligne : vous réglez sur place.' : 'Indiquez la surface, l’état actuel et la date souhaitée. Ajoutez vos photos pour recevoir un devis adapté sous 24 h.'}</p>
          {bookingServiceId ? <Link to="/formules" search={{ service: bookingServiceId }} data-conversion-location="service_proof" className="mt-6 inline-flex w-fit items-center gap-3 rounded-xl bg-white px-5 py-3 text-sm font-bold text-blue-950 hover:bg-blue-100">Voir les tarifs et réserver <ArrowRight className="size-4" /></Link> : <Link to="/contactez-nous" search={{ service: quoteService }} data-conversion-location="service_proof" className="mt-6 inline-flex w-fit items-center gap-3 rounded-xl bg-white px-5 py-3 text-sm font-bold text-blue-950 hover:bg-blue-100"><Camera className="size-4" /> Demander mon devis sur photos</Link>}
        </div>
      </div>
    </div>
  </section>;
}
