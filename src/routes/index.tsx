import { buildLocalBusinessSchema } from "@/lib/businessSchema";
import { DesktopBookingChoices } from "@/components/site/DesktopBookingChoices";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Armchair, BadgeCheck, BedDouble, CalendarCheck, Car, CheckCircle2, ChevronLeft, ChevronRight, Clock, Images, KeyRound, Layers, MapPin, PackageOpen, Pause, Phone, Play, Quote, Star } from "lucide-react";
import { COMMUNES, COMPANY, DISPLACEMENT_RULES, GOOGLE_REVIEW_COUNT, GOOGLE_REVIEW_RATING, SITE_URL } from "@/data/site";
import { Button } from "@/components/ui/button";
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

const QUICK_SERVICES = [
  { slug: "/nettoyage-canape-toulouse",          line1: "Nettoyage",    line2: "Canapé",             short: "Canapé",    icon: <Armchair className="size-5 md:size-7 stroke-[1.4]" /> },
  { slug: "/nettoyage-auto-a-domicile-toulouse", line1: "Nettoyage",    line2: "Intérieur Auto",     short: "Auto",      icon: <Car      className="size-5 md:size-7 stroke-[1.4]" /> },
  { slug: "/nettoyage-matelas-toulouse",         line1: "Nettoyage",    line2: "Matelas",            short: "Matelas",   icon: <BedDouble className="size-5 md:size-7 stroke-[1.4]" /> },
  { slug: "/nettoyage-tapis-toulouse",           line1: "Nettoyage",    line2: "Tapis",              short: "Tapis",     icon: <Layers  className="size-5 md:size-7 stroke-[1.4]" /> },
  { slug: "/nettoyage-fin-de-bail-toulouse",     line1: "Nettoyage",    line2: "Fin de bail",        short: "Bail",      icon: <KeyRound className="size-5 md:size-7 stroke-[1.4]" /> },
  { slug: "/nettoyage-diogene-toulouse",         line1: "Nettoyage",    line2: "Diogène et débarras",  short: "Diogène",   icon: <PackageOpen className="size-5 md:size-7 stroke-[1.4]" /> },
];

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
          <blockquote className="mt-3 h-[216px] overflow-y-auto text-sm font-medium leading-6 text-slate-800">« {review.text} »</blockquote>
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
      <section
        className="relative isolate flex flex-col overflow-hidden bg-[#082f49] lg:min-h-[60vh]"
        style={{ backgroundImage: "radial-gradient(ellipse at top right, #087fa2 0%, transparent 60%), linear-gradient(135deg, #071e32, #083b54)" }}
      >
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(10,15,30,0.60) 0%, rgba(10,15,30,0.65) 60%, rgba(10,15,30,0.85) 100%)" }} />

        <div className="relative flex-1 flex items-center">
          <div className="mx-auto w-full max-w-6xl px-4 py-4 md:py-8 lg:py-12 flex flex-col lg:flex-row items-center justify-between gap-10">
            <div className="flex-1 max-w-3xl text-center md:text-left">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white backdrop-blur mx-auto md:mx-0 mb-4 md:mb-6">
                <MapPin className="size-3" /> Toulouse & Haute-Garonne
              </span>

              <h1 className="mt-3 text-3xl font-bold leading-[1.1] tracking-tight text-white md:mt-6 md:text-5xl lg:text-6xl">
                Entreprise de nettoyage à Toulouse
              </h1>

              <p className="mt-3 text-sm text-white/90 leading-relaxed font-medium md:mt-6 md:text-lg">
                Réservez le nettoyage de vos textiles ou de votre intérieur auto. Pour un logement encombré, des vitres ou une remise en état, demandez un devis personnalisé.
              </p>


              <div className="hidden md:flex mt-6 flex-wrap gap-4 text-sm text-white/90 font-medium">
                <span className="inline-flex items-center gap-1.5"><CheckCircle2 className="size-4 text-accent" /> Plus de 500 interventions réalisées</span>
                <span className="inline-flex items-center gap-1.5"><Clock className="size-4 text-accent" /> Devis gratuit sous 24 h</span>
                <span className="inline-flex items-center gap-1.5"><MapPin className="size-4 text-accent" /> Intervention à domicile</span>
                <span className="inline-flex items-center gap-1.5"><CalendarCheck className="size-4 text-accent" /> Réservation en ligne</span>
              </div>

              <div className="relative hidden md:inline-flex mt-6 items-center gap-2 rounded-full bg-accent/20 border border-accent/40 px-4 py-1.5 text-sm font-bold text-accent">
                <CalendarCheck className="size-4" />
                Consultez les prochains créneaux disponibles
                <Link to="/formules" aria-label="Consulter les créneaux disponibles" className="absolute inset-0 hidden rounded-full focus-visible:outline-2 focus-visible:outline-white lg:block" />
              </div>

              <div className="mt-8 flex flex-wrap justify-center md:justify-start gap-2.5 md:mt-6">
                <Button
                  asChild
                  size="xl"
                  className="bg-accent-gradient text-accent-foreground font-bold text-xs md:text-sm lg:text-base shadow-[var(--shadow-card)] hover:opacity-90 px-4 md:px-6 h-10 md:h-12"
                >
                  <Link to="/formules">
                    <CalendarCheck className="size-4 md:size-5 mr-1.5 md:mr-2" /> Réserver en ligne
                  </Link>
                </Button>
                <Button
                  asChild
                  size="xl"
                  className="bg-white text-primary font-bold text-xs md:text-sm lg:text-base hover:bg-gray-100 px-4 md:px-6 h-10 md:h-12"
                >
                  <Link to="/contactez-nous">Demander un devis</Link>
                </Button>
                <Button
                  asChild
                  size="xl"
                  variant="outline"
                  className="border-white/40 bg-white/10 text-white font-bold text-xs md:text-sm lg:text-base backdrop-blur hover:bg-white/20 hover:border-white/60 px-4 md:px-6 h-10 md:h-12"
                >
                  <a href={COMPANY.phoneHref}><Phone className="size-3.5 md:size-4 mr-1.5 md:mr-2" /> Appeler</a>
                </Button>
                <Button asChild size="xl" className="lg:hidden bg-blue-950 text-white font-bold text-xs md:text-sm lg:text-base hover:bg-blue-900 border border-blue-300/40 px-4 md:px-6 h-10 md:h-12">
                  <Link to="/nos-realisations" resetScroll><Images className="size-4 mr-1.5" /> Avant / Après — Voir les résultats</Link>
                </Button>
                <div className="hidden w-full items-center gap-2.5 lg:flex">
                <Button asChild size="xl" className="bg-blue-950 text-white font-bold text-xs xl:text-sm hover:bg-blue-900 border border-blue-300/40 px-3 xl:px-4 h-10 md:h-12">
                  <Link to="/nos-realisations" resetScroll><Images className="size-4 mr-1.5" /> Avant / Après — Voir les résultats</Link>
                </Button>
              <a
                href="https://www.google.com/search?q=clean+fresh+toulouse+avis"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-12 shrink-0 items-center gap-2 bg-white w-max px-3 py-2 rounded-2xl shadow-xl hover:scale-105 transition-transform duration-300"
              >
                <svg className="w-6 h-6 shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                <div className="flex flex-col text-left">
                  <div className="flex items-center gap-1.5 leading-none">
                    <span className="font-bold text-gray-900 text-[13px]">Avis Google</span>
                  </div>
                  <div className="flex items-center gap-1.5 mt-1.5 leading-none">
                    <span className="font-black text-gray-900 text-base tracking-tight">{GOOGLE_REVIEW_RATING}</span>
                    <div className="flex text-[#FBBC04] gap-0.5">
                      <Star className="size-3.5 fill-current" />
                      <Star className="size-3.5 fill-current" />
                      <Star className="size-3.5 fill-current" />
                      <Star className="size-3.5 fill-current" />
                      <Star className="size-3.5 fill-current" />
                    </div>
                    <span className="text-xs text-gray-500 font-medium ml-0.5">({GOOGLE_REVIEW_COUNT} avis)</span>
                  </div>
                </div>
              </a>
                </div>
              </div>

              {/* Grand badge Google Avis sous les boutons */}
              <div className="mt-4 flex justify-center md:justify-start lg:hidden">
                <a
                  href="https://www.google.com/search?q=clean+fresh+toulouse+avis"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 bg-white w-max px-4 py-2.5 rounded-2xl shadow-xl hover:scale-105 transition-transform duration-300"
                >
                  <svg className="w-7 h-7 shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  <div className="flex flex-col text-left">
                    <div className="flex items-center gap-1.5 leading-none">
                      <span className="font-bold text-gray-900 text-[13px]">Avis Google</span>
                    </div>
                    <div className="flex items-center gap-1.5 mt-1.5 leading-none">
                      <span className="font-black text-gray-900 text-base tracking-tight">{GOOGLE_REVIEW_RATING}</span>
                      <div className="flex text-[#FBBC04] gap-0.5">
                        <Star className="size-3.5 fill-current" />
                        <Star className="size-3.5 fill-current" />
                        <Star className="size-3.5 fill-current" />
                        <Star className="size-3.5 fill-current" />
                        <Star className="size-3.5 fill-current" />
                      </div>
                      <span className="text-xs text-gray-500 font-medium ml-0.5">({GOOGLE_REVIEW_COUNT} avis)</span>
                    </div>
                  </div>
                </a>
              </div>
            </div>

            {/* Avis clients — desktop uniquement, colonne droite */}
            <div className="flex w-full max-w-[340px] shrink-0 flex-col items-center gap-4 lg:items-stretch">

              <div className="hidden w-full lg:block"><DesktopHeroReviews /></div>
            </div>
          </div>
        </div>

        {/* ── BARRE SERVICES — fondue dans le hero ── */}
        <div
          className="relative"
          style={{ background: "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.55) 35%, rgba(0,0,0,0.80) 100%)" }}
        >
          <div className="mx-auto max-w-6xl grid grid-cols-3 md:grid-cols-6">
            {QUICK_SERVICES.map((s, i) => (
              <Link
                key={s.slug}
                to={s.slug}
                className={`group flex flex-col items-center gap-2 pt-6 pb-5 px-1 text-center transition-colors hover:bg-white/8 ${
                  // Add subtle borders for the grid without breaking wrap
                  "border-white/10" + (i % 3 !== 2 ? " border-r" : "") + (i > 2 ? " border-t md:border-t-0" : "") + (i % 6 !== 5 ? " md:border-r" : " md:border-r-0")
                }`}
              >
                <span className="text-accent transition-transform group-hover:scale-110 duration-200">{s.icon}</span>
                <span className="hidden md:inline text-[11px] font-bold uppercase tracking-widest text-white/90 leading-tight">
                  {s.line1}<br />{s.line2}
                </span>
                <span className="inline md:hidden text-[9px] font-bold uppercase tracking-wider text-white/90 leading-tight">
                  {s.short}
                </span>
                <span className="block h-0.5 w-6 rounded-full bg-accent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
              </Link>
            ))}
          </div>
          <div className="text-center pb-6">
            <Link to="/nos-services" className="text-sm font-semibold uppercase tracking-widest text-accent hover:text-white transition-colors underline">
              Voir toutes nos prestations
            </Link>
          </div>
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
