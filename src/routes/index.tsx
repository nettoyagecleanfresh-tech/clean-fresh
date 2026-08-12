import { createFileRoute, Link } from "@tanstack/react-router";
import {
  CalendarCheck,
  Clock,
  Leaf,
  MapPin,
  Phone,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Armchair,
  BedDouble,
  Layers,
  Car,
  Droplets,
  Sun,
  Home,
  Building2,
  Wrench,
  Zap,
  Building,
  Star,
  KeyRound,
  PackageOpen,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { COMMUNES, COMPANY, SERVICES, SITE_URL, GOOGLE_REVIEW_COUNT } from "@/data/site";
import { ReviewsCarousel } from "@/components/site/ReviewsCarousel";
import { FadeIn } from "@/components/ui/fade-in";
import heroImg from "@/assets/hero-nettoyage.webp";
import avantCanape from "@/assets/avant-canape.webp";
import apresCanape from "@/assets/apres-canape.webp";
import avantAuto from "@/assets/avant-auto.webp";
import apresAuto from "@/assets/apres-auto.webp";

const TITLE = "Entreprise de Nettoyage à Toulouse — Canapé, Matelas, Tapis | Clean&Fresh";
const DESC =
  "Clean&Fresh, entreprise de nettoyage à Toulouse : canapé, matelas, tapis, auto, vitres, façade, fin de chantier. 4.9★ sur Google · 500+ interventions · Devis gratuit sous 24h !";

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
    links: [{ rel: "canonical", href: `${SITE_URL}/` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "@id": `${SITE_URL}/#business`,
          name: "Clean&Fresh",
          description: "Entreprise de nettoyage professionnelle à Toulouse et Haute-Garonne. Canapé, matelas, tapis, auto, vitres, façade, fin de chantier, fin de bail, Diogène.",
          url: SITE_URL,
          telephone: "+33767127500",
          email: "cleanetfresh31@gmail.com",
          logo: `${SITE_URL}/logo.png`,
          image: `${SITE_URL}/realisations/photo-02.webp`,
          priceRange: "€€",
          currenciesAccepted: "EUR",
          paymentAccepted: "Cash, Credit Card",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Toulouse",
            addressRegion: "Haute-Garonne",
            postalCode: "31000",
            addressCountry: "FR",
          },
          geo: {
            "@type": "GeoCoordinates",
            latitude: 43.6047,
            longitude: 1.4442,
          },
          areaServed: {
            "@type": "GeoCircle",
            geoMidpoint: { "@type": "GeoCoordinates", latitude: 43.6047, longitude: 1.4442 },
            geoRadius: "30000",
          },
          openingHoursSpecification: [
            {
              "@type": "OpeningHoursSpecification",
              dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
              opens: "08:00",
              closes: "19:00",
            },
            {
              "@type": "OpeningHoursSpecification",
              dayOfWeek: ["Saturday", "Sunday"],
              opens: "09:00",
              closes: "18:00",
            },
          ],
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: "4.9",
            reviewCount: String(GOOGLE_REVIEW_COUNT),
            bestRating: "5",
            worstRating: "1",
          },
          sameAs: [
            "https://www.instagram.com/cleanetfresh31",
            "https://www.facebook.com/profile.php?id=61579620873055",
          ],
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: "Services de nettoyage",
            itemListElement: [
              { "@type": "Offer", itemOffered: { "@type": "Service", name: "Nettoyage canapé Toulouse" } },
              { "@type": "Offer", itemOffered: { "@type": "Service", name: "Nettoyage matelas Toulouse" } },
              { "@type": "Offer", itemOffered: { "@type": "Service", name: "Nettoyage fin de bail Toulouse" } },
              { "@type": "Offer", itemOffered: { "@type": "Service", name: "Nettoyage auto Toulouse" } },
              { "@type": "Offer", itemOffered: { "@type": "Service", name: "Nettoyage Diogène Toulouse" } },
            ],
          },
        }),
      },
    ],
  }),
  component: Index,
});

const SERVICE_ICONS: Record<string, React.ReactNode> = {
  "/nettoyage-canape-toulouse": <Armchair className="size-6" />,
  "/nettoyage-matelas-toulouse": <BedDouble className="size-6" />,
  "/nettoyage-tapis-toulouse": <Layers className="size-6" />,
  "/nettoyage-auto-a-domicile-toulouse": <Car className="size-6" />,
  "/nettoyage-de-vitres-toulouse": <Droplets className="size-6" />,
  "/nettoyage-terrasse-toulouse": <Sun className="size-6" />,
  "/nettoyage-toiture-toulouse": <Home className="size-6" />,
  "/nettoyage-facade-toulouse": <Building className="size-6" />,
  "/nettoyage-dappartement-ou-maison": <Building2 className="size-6" />,
  "/nettoyage-de-fin-de-chantier-toulouse": <Wrench className="size-6" />,
  "/nettoyage-fin-de-bail-toulouse": <KeyRound className="size-6" />,
  "/nettoyage-diogene-toulouse": <PackageOpen className="size-6" />,
  "/nettoyage-extreme-toulouse": <Zap className="size-6" />,
};

const QUICK_SERVICES = [
  { slug: "/nettoyage-canape-toulouse",          line1: "Nettoyage",    line2: "Canapé",             short: "Canapé",    icon: <Armchair className="size-5 md:size-7 stroke-[1.4]" /> },
  { slug: "/nettoyage-auto-a-domicile-toulouse", line1: "Nettoyage",    line2: "Intérieur Auto",     short: "Auto",      icon: <Car      className="size-5 md:size-7 stroke-[1.4]" /> },
  { slug: "/nettoyage-matelas-toulouse",         line1: "Nettoyage",    line2: "Matelas",            short: "Matelas",   icon: <BedDouble className="size-5 md:size-7 stroke-[1.4]" /> },
  { slug: "/nettoyage-tapis-toulouse",           line1: "Nettoyage",    line2: "Tapis",              short: "Tapis",     icon: <Layers  className="size-5 md:size-7 stroke-[1.4]" /> },
  { slug: "/nettoyage-fin-de-bail-toulouse",     line1: "Nettoyage",    line2: "Fin de bail",        short: "Bail",      icon: <KeyRound className="size-5 md:size-7 stroke-[1.4]" /> },
  { slug: "/nettoyage-diogene-toulouse",         line1: "Nettoyage",    line2: "Diogène / Extrême",  short: "Diogène",   icon: <PackageOpen className="size-5 md:size-7 stroke-[1.4]" /> },
];

const STATS = [
  { value: "24 h", label: "Délai de devis" },
  { value: "15", label: "types de prestations" },
  { value: "7j/7", label: "Intervention" },
  { value: "Pro", label: "Matériel professionnel" },
];

const WHY_US = [
  {
    icon: <MapPin className="size-6 text-primary" />,
    title: "On vient chez vous",
    desc: "Aucun déplacement de votre part. Nos techniciens arrivent avec tout le matériel nécessaire à domicile ou sur site.",
  },
  {
    icon: <Clock className="size-6 text-primary" />,
    title: "Devis en 24h",
    desc: "Envoyez votre demande, nous vous répondons sous 24h avec un tarif clair et sans surprise.",
  },
  {
    icon: <Leaf className="size-6 text-primary" />,
    title: "Produits professionnels",
    desc: "Produits professionnels sélectionnés, dont certaines références certifiées Écolabel européen, utilisés conformément aux recommandations du fabricant.",
  },
];

function Index() {
  return (
    <div className="pb-24 lg:pb-0">

      {/* ── HERO FULL-WIDTH ── */}
      <section
        className="relative flex flex-col lg:min-h-[60vh] bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImg})` }}
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
                Nettoyage professionnel à domicile pour canapés, matelas, tapis, véhicules, logements et remises en état à Toulouse et en Haute-Garonne.
              </p>


              <div className="hidden md:flex mt-6 flex-wrap gap-4 text-sm text-white/90 font-medium">
                <span className="inline-flex items-center gap-1.5"><CheckCircle2 className="size-4 text-accent" /> Plus de 500 interventions réalisées</span>
                <span className="inline-flex items-center gap-1.5"><Clock className="size-4 text-accent" /> Devis gratuit sous 24 h</span>
                <span className="inline-flex items-center gap-1.5"><MapPin className="size-4 text-accent" /> Intervention à domicile</span>
                <span className="inline-flex items-center gap-1.5"><CalendarCheck className="size-4 text-accent" /> Réservation en ligne</span>
              </div>

              <div className="hidden md:inline-flex mt-6 items-center gap-2 rounded-full bg-accent/20 border border-accent/40 px-4 py-1.5 text-sm font-bold text-accent">
                <CalendarCheck className="size-4" />
                Consultez les prochains créneaux disponibles
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
                      <span className="font-black text-gray-900 text-base tracking-tight">4.9</span>
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

            {/* Google badge — desktop uniquement, colonne droite */}
            <div className="hidden lg:flex items-center shrink-0">
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
                    <span className="font-black text-gray-900 text-base tracking-tight">4.9</span>
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

      {/* ── STATS STRIP ── */}
      <FadeIn delay={0.1}>
        <section className="border-b border-border bg-card">
        <div className="mx-auto grid max-w-6xl grid-cols-2 divide-x divide-border md:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} className="flex flex-col items-center justify-center py-5 px-4 text-center">
              <span className="font-display text-3xl font-bold text-primary">{s.value}</span>
              <span className="mt-1 text-[11px] font-bold uppercase tracking-widest text-muted-foreground">{s.label}</span>
            </div>
          ))}
        </div>
        </section>
      </FadeIn>

      {/* ── INTRO TEXTE ── */}
      <FadeIn delay={0.2}>
        <section className="mx-auto max-w-4xl px-4 pt-16 pb-4 text-center">
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
          Notre approche du nettoyage à Toulouse
        </h2>
        <p className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-muted-foreground">
          Notre entreprise de nettoyage met à disposition des services complets aussi bien pour les particuliers que pour les professionnels à Toulouse et dans les communes voisines. Nos agents de nettoyage interviennent avec sérieux et fiabilité afin de garantir le meilleur résultat possible, sous réserve de l'état et de la matière du support.
        </p>
        </section>
      </FadeIn>

      {/* ── SERVICES GRID ── */}
      <FadeIn delay={0.1}>
        <section className="mx-auto max-w-6xl px-4 py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-primary">Nos prestations</p>
            <h2 className="mt-2 text-4xl font-bold tracking-tight">15 services de nettoyage</h2>
            <p className="mt-2 max-w-2xl text-muted-foreground">
              À domicile ou sur site, pour particuliers et professionnels à Toulouse et sa banlieue.
            </p>
          </div>
          <Link
            to="/nos-services"
            className="text-sm font-semibold uppercase tracking-widest text-foreground hover:text-primary transition-colors"
          >
            Tous les services de nettoyage <ArrowRight className="inline size-3.5" />
          </Link>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s) => (
            <article
              key={s.slug}
              className="group flex flex-col rounded-2xl border border-border bg-card p-7 shadow-[var(--shadow-soft)] transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-card)]"
            >
              <div className="flex size-11 items-center justify-center rounded-xl border border-border text-muted-foreground transition-colors group-hover:border-primary/30 group-hover:text-primary">
                {SERVICE_ICONS[s.slug] ?? <Sparkles className="size-6" />}
              </div>
              <h3 className="mt-4 text-lg font-bold leading-snug">{s.short}</h3>
              <p className="mt-2 flex-1 text-sm text-muted-foreground leading-relaxed">{s.subtitle}</p>
              <Link
                to={s.slug}
                className="mt-5 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-foreground/60 transition-colors hover:text-primary group-hover:text-primary"
              >
                En savoir plus <ArrowRight className="size-3.5" />
              </Link>
            </article>
          ))}
        </div>
        </section>
      </FadeIn>

      {/* ── COMMENT ÇA MARCHE ── */}
      <FadeIn delay={0.2}>
        <section className="bg-secondary/60 py-20">
        <div className="mx-auto max-w-6xl px-4">
          <p className="text-xs font-bold uppercase tracking-widest text-primary">Simple & rapide</p>
          <h2 className="mt-2 text-4xl font-bold tracking-tight">Comment ça marche ?</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              {
                step: "01",
                title: "Vous choisissez votre prestation",
                desc: "Canapé, matelas, tapis, auto, terrasse… Sélectionnez votre service et votre créneau en ligne, ou appelez-nous.",
              },
              {
                step: "02",
                title: "On vient chez vous",
                desc: "Nos techniciens arrivent à l'heure avec le matériel professionnel adapté. Aucun déplacement de votre part.",
              },
              {
                step: "03",
                title: "Résultat optimal",
                desc: "Mise en œuvre des méthodes les plus adaptées pour nettoyer, raviver et traiter vos surfaces avec soin.",
              },
            ].map((item) => (
              <div key={item.step} className="relative rounded-2xl border border-border bg-card p-7 shadow-[var(--shadow-soft)]">
                <span className="font-display text-6xl font-bold text-primary/10 select-none">{item.step}</span>
                <h3 className="mt-2 text-lg font-bold leading-snug">{item.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap gap-3 justify-center">
            <Button asChild size="xl" className="bg-accent-gradient text-accent-foreground font-bold hover:opacity-90">
              <Link to="/formules">
                <CalendarCheck /> Réserver un créneau
              </Link>
            </Button>
            <Button asChild variant="outline" size="xl">
              <Link to="/tarifs">Voir les tarifs</Link>
            </Button>
            <Button asChild variant="ghost" size="xl">
              <a href={COMPANY.phoneHref}><Phone /> {COMPANY.phone}</a>
            </Button>
          </div>
        </div>
        </section>
      </FadeIn>

      {/* ── POURQUOI CLEAN&FRESH ── */}
      <section className="mx-auto max-w-6xl px-4 py-20">
        <p className="text-xs font-bold uppercase tracking-widest text-primary">Notre engagement</p>
        <h2 className="mt-2 text-4xl font-bold tracking-tight">Pourquoi choisir Clean&Fresh ?</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {WHY_US.map((w) => (
            <div key={w.title} className="rounded-2xl border border-border bg-card p-7 shadow-[var(--shadow-soft)]">
              <div className="flex size-12 items-center justify-center rounded-xl bg-secondary">
                {w.icon}
              </div>
              <h3 className="mt-4 text-lg font-bold">{w.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{w.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CARROUSEL AVIS GOOGLE ── */}
      <ReviewsCarousel />

      {/* ── GALERIE AVANT / APRÈS ── */}
      <section className="bg-secondary/60 py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-primary">Nos dernières interventions à Toulouse</p>
              <h2 className="mt-2 text-4xl font-bold tracking-tight">La différence Clean&Fresh</h2>
              <p className="mt-2 text-muted-foreground">Photos réelles de nos interventions chez nos clients.</p>
            </div>
            <Link
              to="/formules"
              className="inline-flex items-center gap-2 rounded-full bg-accent-gradient px-5 py-2.5 text-sm font-bold text-accent-foreground hover:opacity-90 transition-opacity"
            >
              <CalendarCheck className="size-4" /> Je réserve maintenant
            </Link>
          </div>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { src: avantCanape, label: "Avant", sublabel: "Canapé encrassé", prestation: "Nettoyage Canapé", commune: "Toulouse" },
              { src: apresCanape, label: "Après", sublabel: "Fibres ravivées", prestation: "Nettoyage Canapé", commune: "Toulouse" },
              { src: avantAuto, label: "Avant", sublabel: "Habitacle très sale", prestation: "Nettoyage Auto", commune: "Blagnac" },
              { src: apresAuto, label: "Après", sublabel: "Sièges assainis", prestation: "Nettoyage Auto", commune: "Blagnac" },
            ].map((img, idx) => {
              const isAfter = img.label === "Après";
              return (
                <figure key={idx} className="group overflow-hidden rounded-2xl shadow-[var(--shadow-card)] bg-card border border-border">
                  <div className="relative">
                    <img
                      src={img.src}
                      alt={`${img.label} — ${img.sublabel}`}
                      loading="lazy"
                      className="h-52 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <span className={`absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider ${
                      isAfter
                        ? "bg-primary text-primary-foreground"
                        : "bg-black/50 text-white backdrop-blur"
                    }`}>
                      {img.label}
                    </span>
                  </div>
                  <figcaption className="p-4">
                    <p className="font-bold text-foreground text-sm">{img.prestation}</p>
                    <p className="text-xs text-muted-foreground mt-1"><MapPin className="inline size-3 mr-1" /> {img.commune}</p>
                    <p className="text-sm font-medium text-muted-foreground mt-3">{img.sublabel}</p>
                  </figcaption>
                </figure>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── ZONE + CTA ── */}
      <section className="mx-auto max-w-6xl px-4 py-20">
        <div className="grid gap-10 md:grid-cols-2 items-start">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-primary">Zone d'intervention</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight">
              Nous intervenons partout dans l'agglomération
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Clean&Fresh se déplace chez vous dans toute la métropole toulousaine, avec des créneaux flexibles adaptés à votre emploi du temps.
            </p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {COMMUNES.map((c) => {
                const slug = c.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/['\s]/g, "-");
                return (
                  <li key={c} className="rounded-full border border-border bg-card text-sm font-medium text-muted-foreground overflow-hidden">
                    <Link to={`/nettoyage-${slug}`} className="block px-3 py-1 hover:text-primary transition-colors">
                      {c}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="rounded-3xl bg-hero-gradient px-8 py-10 text-ink-foreground shadow-[var(--shadow-card)]">
            <Sparkles className="size-8 text-primary-glow" />
            <h2 className="mt-4 text-2xl font-bold leading-snug">
              Prêt à retrouver un intérieur assaini ?
            </h2>
            <p className="mt-3 text-sm text-ink-foreground/75 leading-relaxed">
              Choisissez votre créneau en ligne en moins de 2 minutes, ou demandez un devis gratuit. Nous répondons sous 24h.
            </p>
            <div className="mt-6 grid gap-3">
              <Button asChild size="xl" className="w-full bg-accent-gradient text-accent-foreground font-bold hover:opacity-90">
                <Link to="/formules">
                  <CalendarCheck /> Réserver en ligne
                </Link>
              </Button>
              <Button asChild variant="onDark" size="xl" className="w-full">
                <Link to="/contactez-nous">Demander un devis gratuit</Link>
              </Button>
            </div>
            <p className="mt-4 text-center text-xs text-ink-foreground/50">
              Ou appelez directement :{" "}
              <a href={COMPANY.phoneHref} className="font-semibold text-ink-foreground/80 hover:text-ink-foreground">
                {COMPANY.phone}
              </a>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
