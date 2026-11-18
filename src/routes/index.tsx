import { buildLocalBusinessSchema } from "@/lib/businessSchema";
import { DesktopBookingChoices } from "@/components/site/DesktopBookingChoices";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { BadgeCheck, CalendarCheck, ChevronLeft, ChevronRight, MapPin, Pause, Phone, Play, Quote, Star } from "lucide-react";
import { COMMUNES, COMPANY, DISPLACEMENT_RULES, GOOGLE_REVIEW_COUNT, GOOGLE_REVIEW_RATING, GOOGLE_REVIEWS_URL, SITE_URL } from "@/data/site";
import { realisationDimensions } from "@/data/realisationDimensions";

const TITLE = "Entreprise de nettoyage à Toulouse | Clean&Fresh";
const DESC =
  "Nettoyage à domicile à Toulouse : canapé dès 79 €, matelas et tapis dès 49 €, intérieur auto dès 69 €. Réservez en ligne ou demandez un devis pour un logement.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:url", content: `${SITE_URL}/` },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESC },
    ],
    links: [
      { rel: "canonical", href: `${SITE_URL}/` },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(buildLocalBusinessSchema()),
      },
    ],
  }),
  component: Index,
});

const HERO_DESKTOP_REVIEWS = [
  {
    "name": "Fabien Solar",
    "stars": 5,
    "text": "Contacté pour le nettoyage d'un appartement avant aménagement, la prestation a été très profesionnelle et de grande qualité, que se soit pour le ménage ou le nettoyage et la desinfection du canapé. Je recommande fortement",
    "theme": "Appartement",
    "avatarUrl": ""
  },
  {
    "name": "Ludivine Lecerf",
    "stars": 5,
    "text": "l'appartement etait dans un état déplorable et le résultat final tout est parfait tout a était dégraisser nettoyer et désinfecter",
    "theme": "Logement insalubre",
    "avatarUrl": ""
  },
  {
    "name": "Mohammed Daoughi",
    "stars": 5,
    "text": "Un grand merci pour le nettoyage de mon canapé et mes matelas jeune homme très pro et surtout efficace à bientot pour la voiture ! Je recommande vivement Clean&Fresh",
    "theme": "Matelas",
    "avatarUrl": ""
  },
  {
    "name": "Elise",
    "stars": 5,
    "text": "Nous sommes très satisfaits de l’intervention de l’entreprise pour le nettoyage de notre véhicule et le nettoyage de notre canapé et tapis. L’équipe intervenue a été très professionnelle et méticuleuse dans le nettoyage. Nous avons également fait faire nettoyer notre siège-auto redevenu comme neuf.…",
    "theme": "Tapis",
    "avatarUrl": ""
  },
  {
    "name": "Benoit Ruffe",
    "stars": 5,
    "text": "Clean&Fresh a été très efficace et très pro pour le nettoyage de mon canapé à Toulouse",
    "theme": "Canapé",
    "avatarUrl": ""
  },
  {
    "name": "Lydie Fages",
    "stars": 5,
    "text": "Super nettoyage automobile à Toulouse! On a fait nettoyer la voiture que l’on nous avait prêté pour les vacances à la plage (avec enfants) et elle est nikel! Nous allons maintenant faire le même nettoyage pour la notre tellement nous avons été bluffés par le résultat.",
    "theme": "Auto",
    "avatarUrl": ""
  },
  {
    "name": "Wari Épicerie",
    "stars": 5,
    "text": "J’ai contacté cette entreprise pour un entretien de mon local et je pense bien que je vais faire appel à eux tous les mois efficace rapide et sympathique. Que demander de plus, je recommande sans hésiter. À bientôt !",
    "theme": "Local professionnel",
    "avatarUrl": ""
  },
  {
    "name": "Adeline Brt",
    "stars": 5,
    "text": "Il a réalisé un travail de très grande qualité, avec beaucoup de soin et d’attention aux détails.",
    "theme": "Appartement · Emménagement",
    "avatarUrl": ""
  },
  {
    "name": "DUCHESNE babette",
    "stars": 5,
    "text": "Un travail d'une qualité irréprochable ! Professionnel, ponctuel, poli ! Je recommande vivement, et je ne manquerai pas de refaire appel à vous ! Encore merci !",
    "theme": "Service & réactivité",
    "avatarUrl": ""
  },
  {
    "name": "Abhigyan Prakash",
    "stars": 5,
    "text": "Très bon service, efficaces et professionnels. Ils ont fait un très bon travail de nettoyage, parfaitement adapté pour un état des lieux. Je recommande.",
    "theme": "Appartement",
    "avatarUrl": ""
  },
  {
    "name": "Cambiocorsa",
    "stars": 5,
    "text": "Personne ponctuelle et très souriante. Travail ultra sérieux sur mon grand matelas 180 × 200 qui n’a plus aucune tâche aujourd’hui. Concernant ma voiture de société, le rendu était proche du neuf, les plastiques étaient brillants et l’intérieur sentait bon.",
    "theme": "Matelas",
    "avatarUrl": ""
  },
  {
    "name": "Nsta4.20 razlion",
    "stars": 5,
    "text": "Très satisfait du nettoyage de mes tapis. Ils étaient tachés et avaient perdu leur éclat, le résultat est vraiment impressionnant : propres, frais et comme neufs. Travail soigné, professionnel et efficace. Je recommande Clean & Fresh pour le nettoyage de tapis à Toulouse.",
    "theme": "Tapis",
    "avatarUrl": ""
  },
  {
    "name": "Nicolas Cherki",
    "stars": 5,
    "text": "Prestation au top, il a fait mon canapé et mon tapis du salon, plus aucune tache, ça sent très bon je recommande",
    "theme": "Canapé",
    "avatarUrl": ""
  },
  {
    "name": "Steeven Machin",
    "stars": 5,
    "text": "Un excellent nettoyage de la voiture. Elle était vraiment dans un sale état et je suis plus que satisfait du résultat. Travail vraiment professionnel, le site pour réserver et choisir la prestation est très pratique et clair. Je recommande les yeux fermés pour un nettoyage de voiture.",
    "theme": "Auto",
    "avatarUrl": ""
  },
  {
    "name": "Dom",
    "stars": 5,
    "text": "Service au top ! J’ai pris rendez-vous à la dernière minute et ils ont été super réactifs en venant directement à domicile. Le travail est impeccable, tout est parfaitement propre. Je recommande sans hésitation !",
    "theme": "Service & réactivité",
    "avatarUrl": ""
  },
  {
    "name": "Valentine Pradal",
    "stars": 5,
    "text": "Très bonne expérience - notre tapis & notre canapé sont impeccables. Je recommande vivement!",
    "theme": "Tapis",
    "avatarUrl": ""
  },
  {
    "name": "mahe geslain",
    "stars": 5,
    "text": "Un grand merci pour le nettoyage de mon canapé. Je recommande pour toutes vos demandes de nettoyage sur Toulouse. Un gros + pour le service réactif, rdv pris la veille pour le lendemain. Très professionnel. Encore merci !",
    "theme": "Canapé",
    "avatarUrl": ""
  },
  {
    "name": "maxime gayraud",
    "stars": 5,
    "text": "Initialement, mon véhicule était vraiment très sale et avait grand besoin d’un nettoyage en profondeur. Le résultat est tout simplement impressionnant.",
    "theme": "Auto",
    "avatarUrl": ""
  },
  {
    "name": "François DAUPHIN",
    "stars": 5,
    "text": "Parfait ! Je conseille fortement. Personnes agréables, bien équipées et autonomes. Résultat impeccable.",
    "theme": "Service & réactivité",
    "avatarUrl": ""
  },
  {
    "name": "Ghi Morgane",
    "stars": 5,
    "text": "Au top! Ponctuel , très gentil et surtout très efficace ! Il m’a récupéré un fauteuil parfaitement que je pensais irrécupérable , ainsi que mon canapé et mon tapis ! Je recommande++",
    "theme": "Tapis",
    "avatarUrl": ""
  },
  {
    "name": "Jules Julien",
    "stars": 5,
    "text": "J’avais quelques taches tenaces sur mon canapé ! Le problème est réglé et mon canapé est reparti pour 10ans ! La prestation est au Top ! Le jeune homme est ponctuel, consciencieux et sympathique .",
    "theme": "Canapé",
    "avatarUrl": ""
  },
  {
    "name": "christelle lapierre",
    "stars": 5,
    "text": "Exceptionnel ! Notre voiture était dans un état lamentable et elle est désormais comme neuve !",
    "theme": "Auto",
    "avatarUrl": ""
  },
  {
    "name": "djo kitoko-zola",
    "stars": 5,
    "text": "J’ai récemment fais appel aux services de nettoyage de cette entreprise, pour nettoyer un canapé taché lors d’une soirée. Très content du résultat il est redevenu comme neuf, plus aucune traces. Service très efficace et professionnel.",
    "theme": "Canapé",
    "avatarUrl": ""
  },
  {
    "name": "Beatriz Catarino",
    "stars": 5,
    "text": "Ma voiture était très sale après 1 an de travaux et beaucoup d'allers/retours a la déchetterie. Le résultat est au top, merci encore pour le super travail!",
    "theme": "Auto",
    "avatarUrl": ""
  },
  {
    "name": "Sylvain Gil",
    "stars": 5,
    "text": "Venue aujourd'hui a toulouse me nettoyer mon véhicule très belle prestation je recommande Clean&fresh le rendue final es irréprochable 👍",
    "theme": "Auto",
    "avatarUrl": ""
  },
  {
    "name": "Emilie Rodrigues",
    "stars": 5,
    "text": "J’ai fais appel Clean&French pour un pack bronze. La voiture est niquel et le service était rapide. Merci beaucoup À bientôt pour le pack or",
    "theme": "Auto",
    "avatarUrl": ""
  }
].filter((review) => review.stars === 5);

function DesktopHeroReviews() {
  const reviewRef = useRef<HTMLElement>(null);
  const [reviewIndex, setReviewIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [interacting, setInteracting] = useState(false);
  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 1024px)');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let timer: number | undefined;
    let visible = false;
    const update = () => {
      window.clearInterval(timer);
      if (visible && document.visibilityState === 'visible' && desktop.matches && !reducedMotion.matches && !paused && !interacting) {
        timer = window.setInterval(() => setReviewIndex((current) => (current + 1) % HERO_DESKTOP_REVIEWS.length), 9000);
      }
    };
    const observer = new IntersectionObserver(([entry]) => { visible = entry?.isIntersecting ?? false; update(); });
    if (reviewRef.current) observer.observe(reviewRef.current);
    document.addEventListener('visibilitychange', update);
    update();
    desktop.addEventListener('change', update);
    reducedMotion.addEventListener('change', update);
    return () => { observer.disconnect(); document.removeEventListener('visibilitychange', update); window.clearInterval(timer); desktop.removeEventListener('change', update); reducedMotion.removeEventListener('change', update); };
  }, [paused, interacting]);
  const review = HERO_DESKTOP_REVIEWS[reviewIndex] ?? HERO_DESKTOP_REVIEWS[0]!;
  const changeReview = (direction: number) => {
    setPaused(true);
    setReviewIndex((current) => (current + direction + HERO_DESKTOP_REVIEWS.length) % HERO_DESKTOP_REVIEWS.length);
  };

  return (
    <section ref={reviewRef} aria-label="Avis de nos clients" className="relative w-full" onMouseEnter={() => setInteracting(true)} onMouseLeave={() => setInteracting(false)} onFocusCapture={() => setInteracting(true)} onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setInteracting(false); }}>
      <div aria-hidden="true" className="pointer-events-none absolute -inset-5 rounded-full bg-cyan-400/15 blur-3xl" />
      <div className="relative overflow-hidden rounded-[28px] border border-white/30 bg-white shadow-[0_24px_70px_rgba(0,0,0,0.3)]">
        <div className="flex items-center justify-between border-b border-sky-100 bg-gradient-to-r from-sky-50 to-white px-6 py-4">
          <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-sky-800">Ils nous font confiance</span>
          <BadgeCheck className="size-6 fill-blue-600 text-white" aria-hidden="true" />
        </div>
        <figure className="px-6 pt-5 pb-6" aria-live={paused || interacting ? "polite" : "off"} aria-atomic="true">
          <div className="flex items-center justify-between">
            <div className="flex gap-1 text-amber-400" aria-label="5 étoiles sur 5">
              {Array.from({ length: 5 }).map((_, index) => <Star key={index} className="size-4 fill-current" aria-hidden="true" />)}
            </div>
            <Quote className="size-8 fill-sky-100 text-sky-100" aria-hidden="true" />
          </div>
          <p className="mt-3 text-xs font-bold text-sky-800">{review.theme}</p>
          <blockquote className="mt-3 h-28 overflow-y-auto text-sm font-medium leading-6 text-slate-800">« {review.text} »</blockquote>
          <figcaption className="mt-5 flex items-center gap-3 border-t border-slate-100 pt-5">
            <span className="relative flex size-11 shrink-0 items-center justify-center overflow-hidden rounded-full bg-sky-100 font-bold text-sky-800">
              {review.name.charAt(0)}
              {review.avatarUrl && <img key={review.avatarUrl} src={review.avatarUrl} alt="" loading="lazy" referrerPolicy="no-referrer" className="absolute inset-0 size-full object-cover" onError={(event) => { event.currentTarget.style.display = "none"; }} />}
            </span>
            <div className="min-w-0">
              <p className="flex items-center gap-1.5 text-sm font-bold text-slate-900"><span className="truncate">{review.name}</span><BadgeCheck className="size-4 shrink-0 fill-blue-600 text-white" aria-hidden="true" /></p>
              <p className="mt-0.5 text-xs text-slate-500">Extrait d’avis · Google</p>
            </div>
          </figcaption>
        </figure>
        <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50 px-5 py-3">
          <a href="https://www.google.com/search?q=clean+fresh+toulouse+avis" target="_blank" rel="noopener noreferrer" className="shrink-0 whitespace-nowrap rounded text-[11px] font-bold text-sky-800 underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-sky-600">Voir les avis Google ↗</a>
          <div className="flex items-center gap-1">
            <button type="button" onClick={() => setPaused((value) => !value)} aria-label={paused ? "Activer le défilement automatique" : "Mettre les avis en pause"} className="flex size-8 items-center justify-center rounded-full text-slate-700 hover:bg-sky-100 focus-visible:outline-2 focus-visible:outline-sky-600">{paused ? <Play className="size-3.5" /> : <Pause className="size-3.5" />}</button>
            <button type="button" onClick={() => changeReview(-1)} aria-label="Avis précédent" className="flex size-8 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 hover:bg-sky-100 focus-visible:outline-2 focus-visible:outline-sky-600"><ChevronLeft className="size-4" /></button>
            <span className="min-w-8 text-center text-[11px] tabular-nums text-slate-500">{reviewIndex + 1}/{HERO_DESKTOP_REVIEWS.length}</span>
            <button type="button" onClick={() => changeReview(1)} aria-label="Avis suivant" className="flex size-8 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 hover:bg-sky-100 focus-visible:outline-2 focus-visible:outline-sky-600"><ChevronRight className="size-4" /></button>
          </div>
        </div>
      </div>
    </section>
  );
}

const featuredWork = [
  { photo: "/realisations/photo-07.webp", title: "Canapé en tissu", detail: "Détachage des assises et des accoudoirs.", page: "/nettoyage-canape-toulouse", link: "Nettoyage de canapé" },
  { photo: "/realisations/photo-05.webp", title: "Hotte de cuisine", detail: "Dégraissage des surfaces de la hotte.", page: "/nettoyage-dappartement-ou-maison", link: "Grand nettoyage de logement" },
] as const;

function CityLinks({ cities }: { cities: string[] }) {
  return (
    <ul className="flex flex-wrap gap-x-4 gap-y-1">
      {cities.map(city => {
        const slug = city.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/['\s]/g, "-");
        return <li key={city}><Link to={`/nettoyage-${slug}` as "/nettoyage-toulouse"} className="inline-block py-1 text-sm font-medium text-sky-900 underline decoration-sky-200 underline-offset-4 hover:decoration-current">{city}</Link></li>;
      })}
    </ul>
  );
}

function Index() {
  return (
    <div className="pb-16 lg:pb-0">
      <section className="bg-gradient-to-br from-[#071e32] via-[#083b54] to-[#08617e] text-white">
        <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-6 sm:py-10 lg:grid-cols-[1fr_320px] lg:gap-16">
          <div>
            <p className="flex items-center gap-1.5 text-sm font-medium text-sky-100"><MapPin className="size-4" aria-hidden="true" /> À domicile · Toulouse et son agglomération</p>
            <h1 className="mt-3 max-w-2xl text-3xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">Entreprise de nettoyage à Toulouse</h1>
            <p className="mt-3 max-w-xl text-base leading-relaxed text-sky-50 sm:text-lg">Pour un canapé, un tapis ou l’intérieur de votre voiture, choisissez votre tarif et votre créneau. Pour un logement, des vitres ou une remise en état, recevez un devis gratuit sous 24 h.</p>
            <div className="mt-5 flex flex-wrap gap-2.5">
              <Link to="/formules" className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-accent-gradient px-4 py-2.5 text-sm font-bold text-accent-foreground"><CalendarCheck className="size-4" aria-hidden="true" /> Réserver · textile et auto</Link>
              <Link to="/contactez-nous" className="inline-flex min-h-11 items-center rounded-xl bg-white px-4 py-2.5 text-sm font-bold text-sky-950">Devis · logement et bâtiment</Link>
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-1 text-sm">
              <a href={GOOGLE_REVIEWS_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 py-1 underline-offset-4 hover:underline"><Star className="size-4 fill-amber-300 text-amber-300" aria-hidden="true" /> {GOOGLE_REVIEW_RATING.toLocaleString("fr-FR")}/5 · {GOOGLE_REVIEW_COUNT} avis Google</a>
              <a href={COMPANY.phoneHref} className="inline-flex items-center gap-1.5 py-1 underline-offset-4 hover:underline"><Phone className="size-4" aria-hidden="true" /> {COMPANY.phone}</a>
            </div>
          </div>
          <div className="hidden lg:block"><DesktopHeroReviews /></div>
        </div>
      </section>

      <DesktopBookingChoices />

      <section className="mx-auto max-w-6xl px-4 py-7 sm:py-10" aria-labelledby="home-results">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h2 id="home-results" className="text-2xl font-bold tracking-tight sm:text-3xl">Nos nettoyages avant et après</h2>
          <Link to="/nos-realisations" className="py-2 text-sm font-semibold text-sky-900 underline underline-offset-4">Voir toutes les réalisations</Link>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-3 lg:gap-5">
          {featuredWork.map(work => {
            const [width, height] = realisationDimensions[work.photo] ?? [900, 1200];
            return <article key={work.photo} className="overflow-hidden rounded-xl border border-slate-200 bg-white sm:flex sm:items-center">
              <Link to="/nos-realisations" aria-label={`Voir les photos avant et après : ${work.title}`} className="relative block shrink-0 bg-slate-50 sm:w-32">
                <img src={work.photo} width={width} height={height} loading="lazy" decoding="async" alt={`${work.title} avant et après nettoyage`} className="mx-auto h-auto w-full max-w-52" />
                <img src="/logo.webp" width="400" height="400" loading="lazy" decoding="async" alt="" className="pointer-events-none absolute left-1/2 top-1/2 w-1/4 max-w-10 -translate-x-1/2 -translate-y-1/2 opacity-75" />
              </Link>
              <div className="p-3 sm:p-4"><h3 className="font-bold leading-tight">{work.title}</h3><p className="my-2 text-sm text-slate-600">{work.detail}</p><Link to={work.page} className="text-sm font-semibold text-sky-900 underline underline-offset-4">{work.link}</Link></div>
            </article>;
          })}
        </div>
        <figure className="mt-4 border-l-2 border-sky-600 pl-3 lg:hidden">
          <blockquote className="text-sm text-slate-700">« Très bonne expérience - notre tapis &amp; notre canapé sont impeccables. Je recommande vivement! »</blockquote>
          <figcaption className="mt-1 text-xs text-slate-600">Valentine Pradal · Avis Google</figcaption>
        </figure>
      </section>

      <section className="border-t bg-slate-50">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 py-7 md:grid-cols-2 md:gap-10">
          <div>
            <h2 className="text-xl font-bold">Comment se déroule l’intervention ?</h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-700">Pour les textiles et l’auto, choisissez votre formule, vos options et votre créneau. Vous pouvez regrouper plusieurs articles dans une seule réservation et régler en fin de prestation.</p>
            <p className="mt-2 text-sm leading-relaxed text-slate-700">Pour un logement ou un bâtiment, indiquez la surface et votre délai. Nous précisons les tâches et le prix sur le devis, puis convenons du rendez-vous avec vous. Nous venons sur place avec le matériel adapté.</p>
            <Link to="/tarifs" className="mt-2 inline-block py-1 text-sm font-semibold text-sky-900 underline underline-offset-4">Consulter les tarifs et les options</Link>
          </div>
          <div>
            <h2 className="text-xl font-bold">Toulouse et les communes desservies</h2>
            <p className="my-2 text-sm leading-relaxed text-slate-700">Déplacement offert jusqu’à {DISPLACEMENT_RULES.freeKm} km. Consultez votre commune pour préparer notre passage.</p>
            <CityLinks cities={COMMUNES.slice(0, 7)} />
            <details className="mt-2">
              <summary className="cursor-pointer py-2 text-sm font-bold text-sky-900">Voir les {COMMUNES.length - 7} autres communes</summary>
              <CityLinks cities={COMMUNES.slice(7)} />
            </details>
          </div>
        </div>
      </section>
    </div>
  );
}
