import { useState } from 'react';

const directory = '/images/realisations-20261009';
export const realSofaPhoto = `${directory}/chantier-1-960.webp`;
export const realSofaSrcSet = `${directory}/chantier-1-480.webp 480w, ${realSofaPhoto} 960w`;
const extraPhotos = [
  'Canapé compact en tissu gris', 'Canapé gris clair', 'Canapé d’angle gris',
  'Canapé d’angle rose', 'Canapé noir', 'Assise de canapé en tissu bouclé',
  'Banquette arrière de véhicule', 'Volant et habitacle de véhicule',
];

export function RealWorkGallery() {
  const [expanded, setExpanded] = useState(false);
  return <>
    <div className="mt-8 grid gap-6 md:grid-cols-2">
      {[
        { id: 1, title: 'Canapé : les traces du quotidien', description: 'Un avant/après sur la même méridienne, photographiée avant et après notre intervention.', width: 960, height: 1280 },
        { id: 2, title: 'Auto : un habitacle retrouvé', description: 'Tableau de bord, sièges et intérieur : découvrez les photos de cette intervention.', width: 960, height: 1440 },
      ].map(photo => <figure key={photo.id} className="overflow-hidden rounded-3xl border border-primary/10 bg-white shadow-[0_12px_40px_rgba(8,30,48,0.08)]">
        <div className="bg-slate-950 p-2 sm:p-3">
          <img src={`${directory}/chantier-${photo.id}-960.webp`}
            srcSet={`${directory}/chantier-${photo.id}-480.webp 480w, ${directory}/chantier-${photo.id}-960.webp 960w`}
            sizes="(max-width: 767px) calc(100vw - 48px), 530px"
            width={photo.width} height={photo.height} loading="lazy" decoding="async"
            alt={`Avant et après nettoyage Clean&Fresh — ${photo.title}`}
            className="mx-auto h-auto max-h-[640px] w-full rounded-2xl object-contain" />
        </div>
        <figcaption className="p-5 sm:p-6">
          <p className="text-xs font-bold uppercase tracking-widest text-primary">Avant / Après · Intervention Clean&Fresh</p>
          <h3 className="mt-2 text-xl font-bold tracking-tight">{photo.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{photo.description}</p>
        </figcaption>
      </figure>)}
    </div>
    <div className="mt-7 text-center">
      <button type="button" aria-expanded={expanded} aria-controls="other-real-work" onClick={() => setExpanded(value => !value)}
        className="min-h-12 rounded-full border border-primary/25 bg-white px-6 py-3 text-sm font-semibold text-primary transition-colors hover:bg-primary/5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">
        {expanded ? 'Réduire la galerie' : 'Voir 8 autres avant/après'}
      </button>
    </div>
    <div id="other-real-work">
      {expanded && <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {extraPhotos.map((title, index) => <figure key={title} className="overflow-hidden rounded-2xl border border-border bg-white">
          <div className="relative aspect-[3/4] overflow-hidden bg-slate-100">
            {/* Le cadrage masque uniquement les marges et l’interface du téléphone. */}
            <img src={`${directory}/chantier-${index + 3}-690.webp`} width={690} height={1536}
              alt={`Avant et après nettoyage — ${title}`} loading="lazy" decoding="async"
              className="absolute left-0 top-[-33.48%] h-auto w-full max-w-none" />
          </div>
          <figcaption className="p-4 text-sm font-semibold">{title}</figcaption>
        </figure>)}
      </div>}
    </div>
  </>;
}
