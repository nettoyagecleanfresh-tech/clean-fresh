import { Star, ExternalLink, ChevronRight, ChevronLeft } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";
import { GOOGLE_REVIEW_COUNT } from "@/data/site";

const ALL_REVIEWS = [
  {
    name: "Nicolas Cherki",
    initials: "N",
    color: "#f87171",
    time: "il y a un jour",
    stars: 5,
    text: "Prestation au top, il a fait mon canapé et mon tapis du salon, plus aucune tache, ça sent très bon je recommande",
    categories: ["canape", "tapis"],
  },
  {
    name: "Jean Baptiste ANDRE SANVITI",
    initials: "J",
    color: "#34d399",
    time: "il y a un mois",
    stars: 5,
    text: "J’ai fait appel à Clean & Fresh à Toulouse pour le nettoyage intérieur de ma voiture avant de la vendre. Je suis très satisfait du travail réalisé...",
    categories: ["auto"],
  },
  {
    name: "Dom",
    initials: "D",
    color: "#818cf8",
    time: "il y a 3 mois",
    stars: 5,
    text: "Service au top ! J’ai pris rendez-vous à la dernière minute et ils ont été super réactifs en venant directement à domicile. Le travail est impeccable, tout est parfaitement propre. Je recommande sans hésitation !",
    categories: ["general"],
  },
  {
    name: "maxime gayraud",
    initials: "M",
    color: "#94a3b8",
    time: "il y a 5 mois",
    stars: 5,
    text: "Initialement, mon véhicule était vraiment très sale et avait grand besoin d’un nettoyage en profondeur. Le résultat est tout simplement impressionnant.",
    categories: ["auto"],
  },
  {
    name: "mahe geslain",
    initials: "M",
    color: "#f472b6",
    time: "il y a 3 mois",
    stars: 5,
    text: "Un grand merci pour le nettoyage de mon canapé. Je recommande pour toutes vos demandes de nettoyage sur Toulouse. Un gros + pour le service réactif, rdv pris la veille pour le lendemain. Très professionnel. Encore merci !",
    categories: ["canape"],
  },
  {
    name: "christelle lapierre",
    initials: "C",
    color: "#a78bfa",
    time: "il y a 5 mois",
    stars: 5,
    text: "Exceptionnel ! Notre voiture était dans un état lamentable et elle est désormais comme neuve !",
    categories: ["auto"],
  },
  {
    name: "Fabien Solar",
    initials: "F",
    color: "#38bdf8",
    time: "il y a 4 mois",
    stars: 5,
    text: "Contacté pour le nettoyage d'un appartement avant aménagement, la prestation a été très profesionnelle et de grande qualité, que se soit pour le ménage ou le nettoyage et la desinfection du canapé. Je recommande fortement",
    categories: ["appartement", "canape", "fin-de-bail"],
  },
  {
    name: "Lelièvre-Oury Floriane",
    initials: "L",
    color: "#2dd4bf",
    time: "il y a 4 mois",
    stars: 5,
    text: "J’ai pris rdv à la dernière minute, qui plus est un dimanche, sans trop y croire. L’entreprise Clean&Fresh s’est non seulement rendue disponible mais avec même...",
    categories: ["general"],
  },
  {
    name: "Beatriz Catarino",
    initials: "B",
    color: "#fb923c",
    time: "il y a 3 mois",
    stars: 5,
    text: "Ma voiture était très sale après 1 an de travaux et beaucoup d'allers/retours a la déchetterie. Le résultat est au top, merci encore pour le super travail!",
    categories: ["auto"],
  },
  {
    name: "Abhigyan Prakash",
    initials: "A",
    color: "#84cc16",
    time: "il y a 4 mois",
    stars: 5,
    text: "Très bon service, efficaces et professionnels. Ils ont fait un très bon travail de nettoyage, parfaitement adapté pour un état des lieux. Je recommande.",
    categories: ["fin-de-bail", "appartement"],
  },
  {
    name: "Sylvain Gil",
    initials: "S",
    color: "#f87171",
    time: "il y a 3 semaines",
    stars: 5,
    text: "Venue aujourd'hui a toulouse me nettoyer mon véhicule très belle prestation je recommande Clean&fresh le rendue final es irréprochable 👍",
    categories: ["auto"],
  },
  {
    name: "anthony xacot",
    initials: "A",
    color: "#34d399",
    time: "il y a 5 mois",
    stars: 5,
    text: "Je suis extrêmement satisfait du service de cette entreprise de nettoyage ! Le travail est impeccable, rapide et professionnel. L’équipe est très sérieuse...",
    categories: ["general"],
  },
  {
    name: "Emilie Rodrigues",
    initials: "E",
    color: "#818cf8",
    time: "il y a 2 mois",
    stars: 5,
    text: "J’ai fais appel Clean&French pour un pack bronze. La voiture est niquel et le service était rapide. Merci beaucoup À bientôt pour le pack or",
    categories: ["auto"],
  },
  {
    name: "Jules Julien",
    initials: "J",
    color: "#94a3b8",
    time: "il y a 5 mois",
    stars: 5,
    text: "J’avais quelques taches tenaces sur mon canapé ! Le problème est réglé et mon canapé est reparti pour 10ans ! La prestation est au Top ! Le jeune homme est ponctuel, consciencieux et sympathique .",
    categories: ["canape"],
  },
  {
    name: "Wari Épicerie",
    initials: "W",
    color: "#f472b6",
    time: "il y a 5 mois",
    stars: 5,
    text: "J’ai contacté cette entreprise pour un entretien de mon local et je pense bien que je vais faire appel à eux tous les mois efficace rapide et sympathique. Que demander de plus, je recommande sans hésiter. À bientôt !",
    categories: ["bureau"],
  },
  {
    name: "djo kitoko-zola",
    initials: "D",
    color: "#a78bfa",
    time: "il y a 8 mois",
    stars: 5,
    text: "J’ai récemment fais appel aux services de nettoyage de cette entreprise, pour nettoyer un canapé taché lors d’une soirée. Très content du résultat il est redevenu comme neuf, plus aucune traces. Service très efficace et professionnel.",
    categories: ["canape"],
  },
  {
    name: "François DAUPHIN",
    initials: "F",
    color: "#38bdf8",
    time: "il y a 4 mois",
    stars: 5,
    text: "Parfait ! Je conseille fortement. Personnes agréables, bien équipées et autonomes. Résultat impeccable.",
    categories: ["general"],
  },
  {
    name: "Valentine Pradal",
    initials: "V",
    color: "#2dd4bf",
    time: "il y a 5 mois",
    stars: 5,
    text: "Très bonne expérience - notre tapis & notre canapé sont impeccables. Je recommande vivement!",
    categories: ["canape", "tapis"],
  },
  {
    name: "nicolas",
    initials: "N",
    color: "#fb923c",
    time: "il y a 10 heures",
    stars: 5,
    text: "J'ai fait appel à Clean&Fresh pour le nettoyage intérieur de ma voiture et je suis très satisfait ! Ils m'ont rappelé rapidement pour convenir d'un rendez-vous...",
    categories: ["auto"],
  },
  {
    name: "Ghi Morgane",
    initials: "G",
    color: "#84cc16",
    time: "il y a un jour",
    stars: 5,
    text: "Au top! Ponctuel , très gentil et surtout très efficace ! Il m’a récupéré un fauteuil parfaitement que je pensais irrécupérable , ainsi que mon canapé et mon tapis ! Je recommande++",
    categories: ["canape", "tapis"],
  },
];

function GoogleLogo() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  );
}

export function ReviewsCarousel({ category }: { category?: string }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    dragFree: true,
    containScroll: "trimSnaps"
  });

  const [mounted, setMounted] = useState(false);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  let filteredReviews = ALL_REVIEWS;
  if (category) {
    filteredReviews = ALL_REVIEWS.filter(r => r.categories.includes(category) || r.categories.includes("general"));
  }

  const maxInitialReviews = category ? 6 : 8;
  const displayReviews = showAll ? filteredReviews : filteredReviews.slice(0, maxInitialReviews);
  
  if (!mounted) return null; 

  return (
    <section className="border-t border-border bg-background py-14">
      <div className="mx-auto max-w-6xl px-4">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <div>
              <div className="flex items-center gap-2">
                <GoogleLogo />
                <span className="text-lg font-bold text-foreground">Avis Google</span>
              </div>
              <div className="mt-1 flex items-center gap-1.5">
                <span className="text-3xl font-bold leading-none text-foreground">4.9</span>
                <div className="flex gap-0.5">
                  {[1,2,3,4].map(i => <Star key={i} className="size-4 fill-amber-400 text-amber-400" />)}
                  <span className="relative inline-block size-4">
                    <Star className="absolute size-4 text-gray-200" />
                    <span className="absolute inset-0 overflow-hidden" style={{ width: "55%" }}>
                      <Star className="size-4 fill-amber-400 text-amber-400" />
                    </span>
                  </span>
                </div>
                <span className="text-sm text-muted-foreground">({GOOGLE_REVIEW_COUNT} avis)</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => emblaApi?.scrollPrev()}
              disabled={!canScrollPrev}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-sm transition-colors hover:bg-secondary disabled:opacity-50"
              aria-label="Avis précédent"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              onClick={() => emblaApi?.scrollNext()}
              disabled={!canScrollNext}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-sm transition-colors hover:bg-secondary disabled:opacity-50"
              aria-label="Avis suivant"
            >
              <ChevronRight className="size-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 mt-8">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-4">
            {displayReviews.map((r, idx) => (
              <figure
                key={idx}
                className="w-72 flex-shrink-0 rounded-2xl border border-border bg-card p-5 shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="flex size-10 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white"
                    style={{ backgroundColor: r.color }}
                  >
                    {r.initials}
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold text-foreground">{r.name}</p>
                    <p className="text-xs text-muted-foreground">{r.time}</p>
                  </div>
                </div>

                <div className="mt-3 flex gap-0.5">
                  {Array.from({ length: r.stars }).map((_, i) => (
                    <Star key={i} className="size-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <blockquote className="mt-2 text-sm leading-relaxed text-muted-foreground line-clamp-3">
                  {r.text}
                </blockquote>
              </figure>
            ))}
            
            {!showAll && filteredReviews.length > maxInitialReviews && (
              <div className="flex w-72 flex-shrink-0 items-center justify-center rounded-2xl border border-dashed border-border bg-card p-5 shadow-sm">
                <button
                  onClick={() => setShowAll(true)}
                  className="flex flex-col items-center text-sm font-medium text-primary hover:underline"
                >
                  <span className="flex size-10 items-center justify-center rounded-full bg-primary/10 mb-2">
                    <ChevronRight className="size-5" />
                  </span>
                  Voir plus d'avis
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 mt-10 text-center">
        <a
          href="https://www.google.com/search?q=clean+fresh+toulouse+avis"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-6 py-3 text-sm font-bold text-foreground shadow-sm transition-all hover:border-primary/40 hover:text-primary hover:shadow-md"
        >
          <GoogleLogo />
          Voir tous nos avis Google
          <ExternalLink className="size-4 text-muted-foreground" />
        </a>
      </div>
    </section>
  );
}
