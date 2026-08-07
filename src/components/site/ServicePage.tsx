import { useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { CalendarCheck, Check, MapPin, Phone, Sparkles, ArrowRight, Clock, Shield, PawPrint, Eraser, Wind, RotateCcw, Sofa, Car as CarIcon, Star, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { COMMUNES, COMPANY, SERVICES, type Service } from "@/data/site";
import { ReviewsCarousel } from "@/components/site/ReviewsCarousel";
import { FadeIn } from "@/components/ui/fade-in";

const PHOTOS_BY_CATEGORY: Record<string, string[]> = {
  canape: ["/realisations/photo-04.jpg", "/realisations/photo-05.jpg", "/realisations/photo-08.jpg", "/realisations/photo-13.jpg"],
  auto: ["/realisations/photo-02.jpg", "/realisations/photo-03.jpg", "/realisations/photo-10.jpg", "/realisations/photo-16.jpg"],
  tapis: ["/realisations/photo-07.jpg", "/realisations/photo-28.jpg", "/realisations/photo-36.jpg", "/realisations/photo-21.jpg"],
  matelas: ["/realisations/photo-09.jpg", "/realisations/photo-15.jpg", "/realisations/photo-31.jpg", "/realisations/photo-22.jpg"],
  batiment: ["/realisations/photo-06.jpg", "/realisations/photo-32.jpg", "/realisations/photo-11.jpg", "/realisations/photo-12.jpg"]
};

function getBookingServiceId(slug: string): string | null {
  if (slug.includes("canape")) return "canape";
  if (slug.includes("matelas")) return "matelas";
  if (slug.includes("tapis")) return "tapis";
  if (slug.includes("auto")) return "auto";
  return null;
}

type ServiceOption = { name: string; price: number; desc: string; popular?: boolean; icon: ReactNode };

const OPTIONS_BY_SERVICE: Record<string, ServiceOption[]> = {
  canape: [
    { icon: <Shield className="size-8" />,    name: "Traitement anti-acariens", price: 19, desc: "Élimination des acariens et bactéries (traitement professionnel). Idéal pour les personnes sensibles.", popular: true },
    { icon: <PawPrint className="size-8" />,  name: "Élimination des poils d'animaux", price: 15, desc: "Brossage mécanique spécifique avant l'injection-extraction.", popular: true },
    { icon: <Eraser className="size-8" />,    name: "Détachage intensif", price: 19, desc: "Traitement ciblé pour les tâches anciennes (sang, vin, encre, café)." },
    { icon: <Wind className="size-8" />,      name: "Traitement anti-odeur", price: 15, desc: "Neutralisation moléculaire des mauvaises odeurs incrustées.", popular: true },
  ],
  tapis: [
    { icon: <Shield className="size-8" />,      name: "Traitement anti-acariens", price: 19, desc: "Élimine les acariens et allergènes présents dans les fibres du tapis.", popular: true },
    { icon: <RotateCcw className="size-8" />,   name: "Nettoyage recto-verso", price: 25, desc: "Nettoyage des deux faces du tapis pour un résultat total." },
    { icon: <Eraser className="size-8" />,      name: "Détachage intensif", price: 19, desc: "Traitement ciblé pour les tâches anciennes (sang, vin, encre, café)." },
    { icon: <Wind className="size-8" />,        name: "Traitement anti-odeur", price: 15, desc: "Neutralisation moléculaire des mauvaises odeurs incrustées.", popular: true },
  ],
  matelas: [
    { icon: <Shield className="size-8" />,  name: "Traitement anti-acariens", price: 19, desc: "Élimination des acariens et bactéries (traitement professionnel). Indispensable pour les allergiques.", popular: true },
    { icon: <Eraser className="size-8" />,  name: "Détachage intensif", price: 19, desc: "Traitement ciblé pour les tâches résistantes (transpiration, sang…)." },
    { icon: <Wind className="size-8" />,    name: "Traitement anti-odeur", price: 15, desc: "Neutralisation moléculaire des mauvaises odeurs incrustées.", popular: true },
  ],
  auto: [
    { icon: <Shield className="size-8" />,   name: "Traitement anti-acariens", price: 19, desc: "Élimine les allergènes des textiles de l'habitacle.", popular: true },
    { icon: <PawPrint className="size-8" />, name: "Élimination des poils d'animaux", price: 25, desc: "Brossage spécifique avant nettoyage des sièges et moquettes.", popular: true },
    { icon: <Sofa className="size-8" />,     name: "Shampouinage des tapis de sol", price: 15, desc: "Nettoyage injection-extraction des tapis de sol du véhicule." },
    { icon: <CarIcon className="size-8" />,  name: "Nettoyage du ciel de toit", price: 29, desc: "Nettoyage en profondeur du revêtement du plafond de l'habitacle." },
    { icon: <Eraser className="size-8" />,   name: "Détachage intensif — siège", price: 19, desc: "Traitement ciblé pour les tâches résistantes sur sièges." },
    { icon: <Wind className="size-8" />,     name: "Traitement anti-odeur", price: 15, desc: "Neutralisation des mauvaises odeurs incrustées (tabac, animaux…)", popular: true },
  ],
};

const FORMULE_IMAGES: Record<string, string> = {
  // Canapé
  "fauteuil": "/images/canape/fauteuil.png",
  "canape-2": "/images/canape/canape-2-3.png",
  "canape-3": "/images/canape/canape-2-3.png",
  "canape-angle": "/images/canape/canape-u.png",
  "canape-45": "/images/canape/canape-4-5.png",
  "canape-u": "/images/canape/canape-u.png",
  "pouf": "/images/canape/pouf.png",
  "chaise": "/images/canape/chaise.png",
  // Tapis
  "tapis-1": "/images/tapis/1-tapis.png",
  "tapis-2": "/images/tapis/2-tapis.png",
  "tapis-3": "/images/tapis/3-tapis.png",
  // Auto
  "bronze": "/images/auto/bronze.png",
  "argent": "/images/auto/argent.png",
  "or": "/images/auto/or.png",
  "siege": "/images/auto/renov.png",
  // Matelas
  "matelas-enfant": "/images/matelas/enfant.png",
  "matelas-1": "/images/matelas/1-place.png",
  "matelas-2": "/images/matelas/2-places.png",
};

export function ServicePage({ service }: { service: Service }) {
  const [introExpanded, setIntroExpanded] = useState(false);
  const others = SERVICES.filter((s) => s.slug !== service.slug).slice(0, 6);
  const bookingServiceId = getBookingServiceId(service.slug);
  const serviceOptions = bookingServiceId ? (OPTIONS_BY_SERVICE[bookingServiceId] ?? []) : [];
  
  const categoryImages =
    (bookingServiceId
      ? PHOTOS_BY_CATEGORY[bookingServiceId]
      : PHOTOS_BY_CATEGORY["batiment"]) ?? [];

  return (
    <div className="pb-24 lg:pb-0">

      {/* ── BREADCRUMB ── */}
      <nav aria-label="Fil d'Ariane" className="mx-auto max-w-6xl px-4 pt-3 pb-1">
        <ol className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <li><Link to="/" className="hover:text-primary transition-colors">Accueil</Link></li>
          <li aria-hidden="true" className="text-border">›</li>
          <li><Link to="/nos-services" className="hover:text-primary transition-colors">Nos services</Link></li>
          <li aria-hidden="true" className="text-border">›</li>
          <li className="text-foreground font-medium truncate">{service.navLabel}</li>
        </ol>
      </nav>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Accueil", item: "https://cleanetfresh.fr" },
              { "@type": "ListItem", position: 2, name: "Nos services", item: "https://cleanetfresh.fr/nos-services" },
              { "@type": "ListItem", position: 3, name: service.navLabel, item: `https://cleanetfresh.fr${service.slug}` },
            ],
          }),
        }}
      />

      {/* ── HERO ── */}
      <section className="relative overflow-hidden bg-hero-gradient text-ink-foreground">
        <div className="pointer-events-none absolute -right-24 -top-24 size-96 rounded-full bg-primary/20 blur-3xl" />
        <div className="relative mx-auto max-w-4xl px-4 py-8 md:py-20 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-ink-foreground/20 bg-ink-foreground/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider backdrop-blur">
            <MapPin className="size-3" /> Toulouse & Haute-Garonne
          </span>
          <h1 className="mt-3 text-3xl font-bold leading-tight tracking-tight md:mt-5 md:text-6xl">
            {service.h1}
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-ink-foreground/75 md:mt-5 md:text-base">
            {service.subtitle}
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-2.5 md:mt-8">
            {service.booking ? (
              <Button
                asChild
                size="xl"
                className="bg-accent-gradient text-accent-foreground font-bold shadow-[var(--shadow-card)] hover:opacity-90 px-4 md:px-6 h-10 md:h-12 text-xs md:text-sm"
              >
                {bookingServiceId ? (
                  <Link to="/formules" search={{ service: bookingServiceId }}>
                    <CalendarCheck className="size-4 mr-1.5" /> Réserver en ligne
                  </Link>
                ) : (
                  <Link to="/formules">
                    <CalendarCheck className="size-4 mr-1.5" /> Réserver en ligne
                  </Link>
                )}
              </Button>
            ) : (
              <Button asChild variant="cta" size="xl" className="px-4 md:px-6 h-10 md:h-12 text-xs md:text-sm">
                <Link to="/contactez-nous">Devis gratuit sous 24h</Link>
              </Button>
            )}
            <Button asChild variant="onDark" size="xl" className="px-4 md:px-6 h-10 md:h-12 text-xs md:text-sm">
              <a href={COMPANY.phoneHref}>
                <Phone className="size-4 mr-1.5" /> {COMPANY.phone}
              </a>
            </Button>
          </div>
          <div className="hidden md:flex mt-6 flex-wrap justify-center gap-4 text-xs text-ink-foreground/60">
            <span className="inline-flex items-center gap-1"><Clock className="size-3" /> Devis sous 24h</span>
            <span className="inline-flex items-center gap-1"><Check className="size-3" /> Séchage rapide</span>
            <span className="inline-flex items-center gap-1"><Check className="size-3" /> Produits Écolabel</span>
          </div>
        </div>
      </section>

      {/* ── DETAIL + TARIFS côte à côte ── */}
      <FadeIn delay={0.1}>
        <section className="mx-auto max-w-6xl px-4 py-16">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-start">

            {/* Colonne gauche : intro + ce qu'on traite + problèmes */}
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-primary">Le service en détail</p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight">Comment ça se passe ?</h2>
              {/* Affiche 2 paragraphes, le reste masqué */}
              {service.intro.slice(0, 2).map((p) => (
                <p key={p} className="mt-4 text-muted-foreground leading-relaxed">{p}</p>
              ))}
              {service.intro.length > 2 && (
                <>
                  <div className={introExpanded ? "block" : "hidden"}>
                    {service.intro.slice(2).map((p) => (
                      <p key={p} className="mt-4 text-muted-foreground leading-relaxed">{p}</p>
                    ))}
                  </div>
                  <button
                    onClick={() => setIntroExpanded(!introExpanded)}
                    className="mt-3 flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
                  >
                    {introExpanded ? "Réduire" : "Lire la suite"}
                    <ChevronDown className={`size-4 transition-transform ${introExpanded ? "rotate-180" : ""}`} />
                  </button>
                </>
              )}
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-soft)]">
                  <div className="flex size-10 items-center justify-center rounded-xl bg-secondary mb-3">
                    <Check className="size-5 text-primary" />
                  </div>
                  <h3 className="font-bold text-sm uppercase tracking-wide text-muted-foreground mb-3">Ce que nous traitons</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {service.treated.map((t) => (
                      <li key={t} className="flex gap-2">
                        <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-soft)]">
                  <div className="flex size-10 items-center justify-center rounded-xl bg-secondary mb-3">
                    <Sparkles className="size-5 text-primary" />
                  </div>
                  <h3 className="font-bold text-sm uppercase tracking-wide text-muted-foreground mb-3">Problèmes résolus</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {service.problems.map((t) => (
                      <li key={t} className="flex gap-2">
                        <Sparkles className="mt-0.5 size-4 shrink-0 text-primary" />
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Colonne droite : tarifs (sticky sur desktop) */}
            <div className="lg:sticky lg:top-24">
              <p className="text-xs font-bold uppercase tracking-widest text-primary">Transparence</p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight">Tarifs clairs, sans surprise</h2>

              {service.prices ? (
                <>
                  <div className={`mt-4 ${service.prices.length > 3 ? "grid grid-cols-2 gap-3" : "space-y-3"}`}>
                    {service.prices.map((row) => {
                      const img = row.formuleId ? FORMULE_IMAGES[row.formuleId] : null;
                      const isGrid = service.prices!.length > 3;
                      return (
                        <div
                          key={row.label}
                          className="group flex flex-col rounded-xl border border-border bg-card p-3 shadow-[var(--shadow-soft)] transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-card)]"
                        >
                          {img && (
                            <div className={`flex items-center justify-center w-full bg-slate-50 border border-slate-100 rounded-lg overflow-hidden p-1 mb-2 ${isGrid ? "h-20" : "h-20"}`}>
                              <img src={img} alt={row.label} className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-200" loading="lazy" />
                            </div>
                          )}
                          <p className="text-xs font-semibold leading-tight line-clamp-2">{row.label}</p>
                          {row.note && <p className="text-[10px] text-primary font-medium mt-0.5">{row.note}</p>}
                          <span className={`font-bold text-primary mt-1 ${isGrid ? "text-xl" : "text-2xl"}`}>{row.price}</span>
                          <Button
                            asChild
                            className="mt-2 w-full bg-accent-gradient text-accent-foreground font-semibold hover:opacity-90 h-8 text-xs"
                            size="sm"
                          >
                            <Link to="/reserver" search={bookingServiceId ? { service: bookingServiceId, formule: row.formuleId } : undefined}>
                              <CalendarCheck className="size-3 mr-1" /> Réserver
                            </Link>
                          </Button>
                        </div>
                      );
                    })}
                  </div>
                  {service.priceNote && (
                    <p className="mt-3 text-sm text-muted-foreground">{service.priceNote}</p>
                  )}

                  {/* Badge avis Google */}
                  <a
                    href="https://www.google.com/search?q=clean+fresh+toulouse+avis"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-card)] transition-shadow"
                  >
                    <div className="flex shrink-0 items-center justify-center size-9 rounded-lg bg-white border border-slate-100">
                      <svg viewBox="0 0 24 24" className="size-5" fill="none">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                      </svg>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="size-3.5 fill-yellow-400 text-yellow-400" />
                        ))}
                        <span className="ml-1 text-sm font-bold">4.9</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">102 avis vérifiés sur Google</p>
                    </div>
                    <ArrowRight className="size-4 text-muted-foreground shrink-0" />
                  </a>

                  {/* Urgence / disponibilité */}
                  <div className="mt-3 flex items-center gap-2 rounded-xl bg-green-50 border border-green-200 px-4 py-2.5">
                    <span className="relative flex size-2.5 shrink-0">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full size-2.5 bg-green-500"></span>
                    </span>
                    <p className="text-xs font-semibold text-green-800">Créneaux disponibles cette semaine — réservez maintenant</p>
                  </div>

                  <Button
                    asChild
                    size="lg"
                    className="mt-3 w-full bg-accent-gradient text-accent-foreground font-bold hover:opacity-90"
                  >
                    <Link to="/formules" search={bookingServiceId ? { service: bookingServiceId } : undefined}>
                      <CalendarCheck className="size-4 mr-2" /> Réserver en ligne
                    </Link>
                  </Button>
                </>
              ) : (
                <div className="mt-4 rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-soft)]">
                  <p className="text-xl font-bold">Prestation sur devis personnalisé</p>
                  <p className="mt-2 text-muted-foreground">{service.priceNote}</p>
                  <Button asChild size="lg" className="mt-5 w-full bg-primary-gradient text-primary-foreground font-semibold hover:opacity-90">
                    <Link to="/contactez-nous">Demander mon devis gratuit</Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </section>
      </FadeIn>

      {/* ── OPTIONS ── */}
      {serviceOptions.length > 0 && (
        <section className="bg-secondary/60 py-16">
          <div className="mx-auto max-w-6xl px-4">
            <h3 className="text-xl font-bold mb-1">
              Personnalisez votre soin{" "}
              <span className="text-primary">{service.short}</span>
            </h3>
            <p className="text-sm text-muted-foreground mb-5">
              Options à ajouter lors de la réservation en ligne.
            </p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {serviceOptions.map((opt) => (
                <div
                  key={opt.name}
                  className="relative flex flex-col rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-soft)]"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex size-14 items-center justify-center rounded-xl bg-secondary text-primary">
                      {opt.icon}
                    </div>
                    {opt.popular && (
                      <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest text-primary">
                        Populaire
                      </span>
                    )}
                  </div>
                  <p className="font-bold text-sm leading-snug">{opt.name}</p>
                  <p className="mt-1 text-xs text-muted-foreground leading-relaxed flex-1">{opt.desc}</p>
                  <div className="mt-4 flex items-center justify-between border-t border-border pt-3">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Supplément</span>
                    <span className="font-bold text-primary">+{opt.price} €</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── ZONE + SALISSURES ── */}
      <FadeIn delay={0.1}>
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-primary">Déplacement</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight">Notre zone d'intervention</h2>
            <p className="mt-3 text-muted-foreground leading-relaxed">
              Nous nous déplaçons dans toute la métropole toulousaine, chez les particuliers comme chez les professionnels.
            </p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {COMMUNES.map((c) => {
                // Slugify : supprime les accents via Unicode NFD + ̀-ͯ, puis met en minuscules et remplace espaces/apostrophes
                const slug = c.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/['\s]/g, "-");
                return (
                  <li key={c} className="rounded-full border border-border bg-card text-sm text-muted-foreground overflow-hidden">
                    <Link to={`/nettoyage-${slug}`} className="block px-3 py-1 hover:text-primary transition-colors">
                      {c}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
          {service.soils && (
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-primary">Efficacité</p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight">Salissures traitées</h2>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {service.soils.map((s) => (
                  <li
                    key={s}
                    className="flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-3 text-sm font-medium shadow-[var(--shadow-soft)]"
                  >
                    <Check className="size-4 shrink-0 text-primary" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>
      </FadeIn>

      {/* ── AVANT / APRÈS ── */}
      <FadeIn delay={0.2}>
        <section className="bg-secondary/60 py-16">
          <div className="mx-auto max-w-6xl px-4">
          <p className="text-xs font-bold uppercase tracking-widest text-primary">Nos réalisations</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight">Avant / après nos interventions</h2>
          <p className="mt-3 text-muted-foreground">
            Photos réelles prises sur nos chantiers à Toulouse et dans l'agglomération.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {categoryImages.map((src, idx) => (
              <figure
                key={idx}
                className="overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-soft)] transition-transform hover:-translate-y-0.5"
              >
                <img
                  src={src}
                  alt={`${service.h1} — Avant / Après ${idx + 1}`}
                  loading="lazy"
                  width={1000}
                  height={800}
                  className="h-48 w-full object-cover"
                />
                <figcaption className="p-3 text-[10px] font-bold uppercase tracking-widest text-primary text-center">
                  Avant / Après
                </figcaption>
              </figure>
            ))}
          </div>
            </div>
        </section>
      </FadeIn>

      {/* ── AVIS CLIENTS ── */}
      {bookingServiceId ? (
        <ReviewsCarousel category={bookingServiceId} />
      ) : (
        <ReviewsCarousel />
      )}

      {/* ── MÉTHODE ── */}
      <FadeIn delay={0.1}>
        <section className="mx-auto max-w-6xl px-4 py-16">
          <p className="text-xs font-bold uppercase tracking-widest text-primary">Notre savoir-faire</p>
        <h2 className="mt-2 text-3xl font-bold tracking-tight">Notre méthode de travail</h2>
        <ol className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {service.method.map((step, i) => (
            <li
              key={step}
              className="relative rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-soft)]"
            >
              <span className="inline-flex size-10 items-center justify-center rounded-xl bg-primary-gradient text-sm font-bold text-primary-foreground shadow-[var(--shadow-soft)]">
                {i + 1}
              </span>
              <p className="mt-4 text-sm text-muted-foreground leading-relaxed">{step}</p>
            </li>
          ))}
          </ol>
        </section>
      </FadeIn>

      {/* ── FAQ ── */}
      {service.faq && service.faq.length > 0 && (
        <FadeIn delay={0.1}>
          <section className="mx-auto max-w-6xl px-4 py-16">
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                  "@context": "https://schema.org",
                  "@type": "Service",
                  name: service.h1,
                  description: service.subtitle,
                  url: `https://cleanetfresh.fr${service.slug}`,
                  provider: {
                    "@type": "LocalBusiness",
                    name: "Clean&Fresh",
                    url: "https://cleanetfresh.fr",
                    telephone: "+33767127500",
                    address: {
                      "@type": "PostalAddress",
                      addressLocality: "Toulouse",
                      addressRegion: "Haute-Garonne",
                      postalCode: "31500",
                      addressCountry: "FR",
                    },
                    aggregateRating: {
                      "@type": "AggregateRating",
                      ratingValue: "4.9",
                      reviewCount: "102",
                    },
                  },
                  areaServed: [
                    { "@type": "City", name: "Toulouse" },
                    { "@type": "AdministrativeArea", name: "Haute-Garonne" },
                  ],
                  ...(service.prices && service.prices.length > 0
                    ? (() => {
                        const numPrices = service.prices!.map((p) => parseInt(p.price.replace(/[^0-9]/g, ""), 10)).filter(Boolean);
                        const low = Math.min(...numPrices);
                        const high = Math.max(...numPrices);
                        return {
                          offers: {
                            "@type": "AggregateOffer",
                            lowPrice: String(low),
                            highPrice: String(high),
                            priceCurrency: "EUR",
                            offerCount: String(service.prices!.length),
                            offers: service.prices!.map((p) => ({
                              "@type": "Offer",
                              name: p.label,
                              price: p.price.replace(/[^0-9]/g, ""),
                              priceCurrency: "EUR",
                              availability: "https://schema.org/InStock",
                              areaServed: { "@type": "City", name: "Toulouse" },
                            })),
                          },
                        };
                      })()
                    : {}),
                }),
              }}
            />
            <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "FAQPage",
                mainEntity: service.faq.map((item) => ({
                  "@type": "Question",
                  name: item.q,
                  acceptedAnswer: { "@type": "Answer", text: item.a },
                })),
              }),
            }}
          />
          <p className="text-xs font-bold uppercase tracking-widest text-primary">Questions fréquentes</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight">
            FAQ — {service.short}
          </h2>
          <div className="mt-8 space-y-3">
            {service.faq.map((item) => (
              <details
                key={item.q}
                className="group rounded-2xl border border-border bg-card shadow-[var(--shadow-soft)]"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-4 font-semibold leading-snug [&::-webkit-details-marker]:hidden">
                  {item.q}
                  <span className="shrink-0 text-xl text-muted-foreground transition-transform duration-200 group-open:rotate-45">+</span>
                </summary>
                <p className="px-6 pb-5 text-sm text-muted-foreground leading-relaxed">{item.a}</p>
              </details>
            ))}
          </div>
        </section>
      </FadeIn>
      )}

      {/* ── CTA RÉSERVATION ── */}
      <FadeIn delay={0.2}>
        <section className="mx-auto max-w-6xl px-4 pb-16">
          <div className="relative overflow-hidden rounded-3xl bg-hero-gradient px-6 py-14 text-center text-ink-foreground shadow-[var(--shadow-card)]">
          <div className="pointer-events-none absolute -right-16 -top-16 size-72 rounded-full bg-primary/20 blur-3xl" />
          <div className="relative">
            <h2 className="text-3xl font-bold md:text-4xl">Prêt à réserver ?</h2>
            <p className="mx-auto mt-3 max-w-xl text-ink-foreground/75">
              Choisissez votre créneau en ligne en moins de deux minutes, ou appelez-nous pour un
              devis gratuit sous 24h.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button
                asChild
                size="xl"
                className="bg-accent-gradient text-accent-foreground font-bold hover:opacity-90"
              >
                {bookingServiceId ? (
                  <Link to="/formules" search={{ service: bookingServiceId }}>
                    <CalendarCheck /> Réserver en ligne
                  </Link>
                ) : (
                  <Link to="/formules">
                    <CalendarCheck /> Réserver en ligne
                  </Link>
                )}
              </Button>
              <Button asChild variant="onDark" size="xl">
                <Link to="/contactez-nous">Devis gratuit</Link>
              </Button>
              <Button asChild variant="onDark" size="xl">
                <a href={COMPANY.phoneHref}>
                  <Phone /> {COMPANY.phone}
                </a>
              </Button>
            </div>
          </div>
          </div>
        </section>
      </FadeIn>

      {/* ── AUTRES SERVICES ── */}
      {/* ── AUTRES SERVICES ── */}
      <FadeIn delay={0.1}>
        <section className="mx-auto max-w-6xl px-4 pb-16">
          <h2 className="text-2xl font-bold tracking-tight">Nos autres services</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {others.map((s) => (
            <Link
              key={s.slug}
              to={s.slug}
              className="group flex items-center justify-between rounded-2xl border border-border bg-card p-5 transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-card)]"
            >
              <div>
                <p className="font-semibold group-hover:text-primary transition-colors">{s.navLabel}</p>
                <p className="mt-1 line-clamp-1 text-sm text-muted-foreground">{s.subtitle}</p>
              </div>
              <ArrowRight className="size-4 shrink-0 text-muted-foreground group-hover:text-primary transition-colors" />
            </Link>
          ))}
        </div>
      </section>
      </FadeIn>
    </div>
  );
}
