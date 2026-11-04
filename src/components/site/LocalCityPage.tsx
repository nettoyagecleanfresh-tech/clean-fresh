import { Link, type LinkProps } from "@tanstack/react-router";
import {
  MapPin,
  Clock,
  Shield,
  CheckCircle2,
  Sparkles,
  ChevronRight,
  ArrowRight,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { COMPANY, GOOGLE_REVIEWS_URL, SERVICES } from "@/data/site";
import { FadeIn } from "@/components/ui/fade-in";
import { ReviewsCarousel } from "@/components/site/ReviewsCarousel";
import { COMMUNES_DATA, LOCAL_TRAVEL_NOTE, type CommuneData } from "@/data/communes";
import { LOCAL_INTERVENTIONS } from "@/data/localInterventions";

const BOOKABLE_SERVICES = [
  {
    title: "Canapés, fauteuils & chaises",
    path: "/nettoyage-canape-toulouse",
    id: "canape",
    detail: "Nettoyage des assises et dossiers, après vérification du textile et des taches.",
  },
  {
    title: "Matelas",
    path: "/nettoyage-matelas-toulouse",
    id: "matelas",
    detail: "Les deux faces sont incluses. Le format et les traitements se choisissent en ligne.",
  },
  {
    title: "Tapis",
    path: "/nettoyage-tapis-toulouse",
    id: "tapis",
    detail:
      "Formats standards jusqu’à 4 m² par tapis ; grand format ou fibre délicate à vérifier sur photos.",
  },
  {
    title: "Intérieur automobile",
    path: "/nettoyage-auto-a-domicile-toulouse",
    id: "auto",
    detail:
      "Choisissez les surfaces à traiter : habitacle, sièges, moquettes et tapis selon la formule.",
  },
  {
    title: "Moquettes",
    path: "/nettoyage-moquette-toulouse",
    id: "moquette",
    detail:
      "Choisissez la surface et indiquez les zones accessibles ainsi que les meubles restant en place.",
  },
  {
    title: "Cuir",
    path: "/nettoyage-cuir-toulouse",
    id: "cuir",
    detail:
      "Nettoyage manuel adapté aux canapés, fauteuils ou sièges auto ; soin protecteur en option.",
  },
] as const;

const QUOTE_SERVICES = [
  { title: "Appartement & maison", path: "/nettoyage-dappartement-ou-maison" },
  { title: "Fin de bail", path: "/nettoyage-fin-de-bail-toulouse" },
  { title: "Fin de chantier", path: "/nettoyage-de-fin-de-chantier-toulouse" },
  { title: "Vitres & vitrines", path: "/nettoyage-de-vitres-toulouse" },
  { title: "Terrasse", path: "/nettoyage-terrasse-toulouse" },
  { title: "Façade", path: "/nettoyage-facade-toulouse" },
  { title: "Toiture", path: "/nettoyage-toiture-toulouse" },
  { title: "Diogène", path: "/nettoyage-diogene-toulouse" },
  { title: "Nettoyage extrême", path: "/nettoyage-extreme-toulouse" },
] as const;

const PROOF_PHOTOS = [
  {
    src: "/images/realisations-20261009/chantier-1-960.webp",
    srcSet:
      "/images/realisations-20261009/chantier-1-480.webp 480w, /images/realisations-20261009/chantier-1-960.webp 960w",
    width: 960,
    height: 1280,
    title: "Détachage d’une méridienne",
    description: "La même assise en tissu, avant et après notre intervention.",
  },
  {
    src: "/images/realisations-20261009/chantier-2-960.webp",
    srcSet:
      "/images/realisations-20261009/chantier-2-480.webp 480w, /images/realisations-20261009/chantier-2-960.webp 960w",
    width: 960,
    height: 1440,
    title: "Nettoyage d’un habitacle",
    description: "Le poste de conduite et les sièges photographiés avant et après nettoyage.",
  },
] as const;

type Props = { commune: CommuneData };

export function LocalCityPage({ commune }: Props) {
  const { name, slug, postalCode, para1, para2, faq, nearby } = commune;
  const localIntervention = LOCAL_INTERVENTIONS[slug];
  const nearbyCommunes = nearby.flatMap((city) => {
    const match = COMMUNES_DATA.find((item) => item.name === city);
    return match ? [match] : [];
  });

  return (
    <div className="pb-24 lg:pb-0">
      <section className="relative overflow-hidden bg-hero-gradient text-ink-foreground">
        <div className="pointer-events-none absolute -right-24 -top-24 size-96 rounded-full bg-primary/20 blur-3xl" />
        <div className="relative mx-auto max-w-4xl px-4 py-8 text-center md:py-20">
          <span className="inline-flex items-center gap-2 rounded-full border border-ink-foreground/20 bg-ink-foreground/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider backdrop-blur">
            <MapPin className="size-3" aria-hidden="true" /> Intervention à {name} · {postalCode}
          </span>
          <h1 className="mt-3 text-3xl font-bold leading-tight tracking-tight md:mt-5 md:text-5xl">
            {name === "Toulouse"
              ? "Nettoyage à domicile à Toulouse"
              : `Entreprise de nettoyage à ${name}`}
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-ink-foreground/80 md:mt-5 md:text-base">
            {para1}
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-2.5 md:mt-8">
            <Button
              asChild
              size="xl"
              className="h-11 bg-accent-gradient px-4 text-xs font-bold text-accent-foreground shadow-[var(--shadow-card)] hover:opacity-90 md:h-12 md:px-6 md:text-sm"
            >
              <Link to="/formules" data-conversion-location="local_hero">
                Réserver en ligne
              </Link>
            </Button>
            <Button
              asChild
              variant="onDark"
              size="xl"
              className="h-11 px-4 text-xs md:h-12 md:px-6 md:text-sm"
            >
              <Link to="/contactez-nous" data-conversion-location="local_hero">
                Demander un devis
              </Link>
            </Button>
          </div>
          <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs text-ink-foreground/70">
            <span className="inline-flex items-center gap-1">
              <Clock className="size-3" aria-hidden="true" /> Devis sous 24 h
            </span>
            <span className="inline-flex items-center gap-1">
              <CheckCircle2 className="size-3" aria-hidden="true" /> Intervention à domicile
            </span>
            <span className="inline-flex items-center gap-1">
              <Shield className="size-3" aria-hidden="true" /> Méthode adaptée au support
            </span>
          </div>
        </div>
      </section>

      <FadeIn delay={0.05}>
        <section
          className="mx-auto max-w-4xl px-4 py-10 md:py-12"
          aria-labelledby="local-preparation"
        >
          <h2 id="local-preparation" className="text-2xl font-bold">
            Préparer votre intervention à {name}
          </h2>
          <p className="mt-4 text-sm leading-7 text-muted-foreground md:text-base">{para2}</p>
          <div className="mt-5 rounded-2xl border border-primary/15 bg-primary/5 p-5">
            <p className="font-semibold">Adresse, accès et déplacement</p>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              {LOCAL_TRAVEL_NOTE} Précisez votre adresse à {name}, les possibilités de stationnement
              et les éventuels étages lors de votre demande.
            </p>
          </div>
        </section>
      </FadeIn>

      {localIntervention && (
        <section className="mx-auto max-w-4xl px-4 pb-10" aria-labelledby="local-intervention">
          <div className="rounded-2xl border border-primary/20 bg-card p-5 shadow-[var(--shadow-soft)] md:p-7">
            <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary">
              <MapPin className="size-4" aria-hidden="true" /> Une intervention dans votre commune
            </p>
            <h2 id="local-intervention" className="mt-3 text-xl font-bold">
              {localIntervention.title}
            </h2>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              {localIntervention.description}
            </p>
            <p className="mt-3 flex items-start gap-2 text-sm leading-6">
              <Star
                className="mt-1 size-4 shrink-0 fill-amber-400 text-amber-500"
                aria-hidden="true"
              />
              {localIntervention.evidence}
            </p>
            <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold text-primary">
              <Link
                to={localIntervention.servicePath}
                className="inline-flex min-h-11 items-center gap-1 hover:underline"
              >
                Découvrir cette prestation <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
              <a
                href={GOOGLE_REVIEWS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center hover:underline"
              >
                Consulter les avis Google
              </a>
            </div>
          </div>
        </section>
      )}

      <section className="mx-auto max-w-4xl px-4 pb-12" aria-labelledby="local-services">
        <h2 id="local-services" className="text-2xl font-bold">
          Choisir votre nettoyage à domicile
        </h2>
        <p className="mt-3 text-sm leading-7 text-muted-foreground md:text-base">
          Pour les textiles et l’auto, consultez le détail de la prestation puis choisissez votre
          formule, vos options et un créneau disponible. Vous pouvez ajouter plusieurs éléments à la
          même réservation.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {BOOKABLE_SERVICES.map((service) => {
            const price = SERVICES.find((item) => item.slug === service.path)?.prices?.[0]?.price;
            return (
              <article
                key={service.id}
                className="flex flex-col rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-soft)]"
              >
                <h3 className="text-base font-bold">
                  <Link to={service.path} className="hover:text-primary hover:underline">
                    {service.title}
                  </Link>
                </h3>
                {price && <p className="mt-2 text-lg font-bold text-primary">Dès {price}</p>}
                <p className="mt-3 flex-1 text-sm leading-6 text-muted-foreground">
                  {service.detail}
                </p>
                <Link
                  to={service.path}
                  className="mt-3 inline-flex min-h-11 items-center text-sm font-medium text-primary hover:underline"
                >
                  Voir le détail et les tarifs{" "}
                  <ChevronRight className="size-4" aria-hidden="true" />
                </Link>
                <Link
                  to="/formules"
                  search={{ service: service.id }}
                  data-conversion-location="local_service"
                  className="mt-2 inline-flex min-h-11 items-center justify-center rounded-xl bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  Choisir ma formule
                </Link>
              </article>
            );
          })}
        </div>
        <p className="mt-4 text-xs leading-6 text-muted-foreground">
          Prix de départ selon le format indiqué dans chaque prestation, pour un état standard.
          Options et déplacement éventuel en supplément. Matière délicate ou état exceptionnel :
          vérification préalable sur photos.{" "}
          <Link to="/tarifs" className="font-semibold text-primary hover:underline">
            Consulter tous les tarifs
          </Link>
          .
        </p>

        <div className="mt-9 rounded-2xl border border-border bg-muted/30 p-5 md:p-6">
          <h3 className="text-xl font-bold">Logement, travaux, vitres et extérieurs : sur devis</h3>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            Indiquez la surface, l’état actuel et la date souhaitée, avec quelques photos. Le devis
            précise les surfaces et équipements retenus. Murs, plafonds, textiles et accès en
            hauteur sont à signaler séparément pour vérifier la compatibilité et la faisabilité.
          </p>
          <ul className="mt-4 grid gap-x-5 gap-y-1 sm:grid-cols-2 lg:grid-cols-3">
            {QUOTE_SERVICES.map((service) => (
              <li key={service.path}>
                <Link
                  to={service.path}
                  className="inline-flex min-h-11 items-center gap-1 text-sm font-medium text-primary hover:underline"
                >
                  <ChevronRight className="size-4 shrink-0" aria-hidden="true" />
                  {service.title}
                </Link>
              </li>
            ))}
          </ul>
          <Button asChild className="mt-5">
            <Link to="/contactez-nous" data-conversion-location="local_quote">
              Demander mon devis sur photos
            </Link>
          </Button>
        </div>
      </section>

      <section className="border-y border-border bg-muted/20" aria-labelledby="local-proof">
        <div className="mx-auto max-w-4xl px-4 py-10">
          <p className="text-xs font-semibold uppercase tracking-wider text-primary">
            Photos de nos interventions à Toulouse
          </p>
          <h2 id="local-proof" className="mt-2 text-2xl font-bold">
            Nos résultats avant / après
          </h2>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            Ces exemples réalisés à Toulouse présentent notre travail sur des textiles et des
            véhicules. Ils illustrent les prestations proposées à {name}.
          </p>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            {PROOF_PHOTOS.map((photo) => (
              <figure
                key={photo.src}
                className="overflow-hidden rounded-2xl border border-border bg-card"
              >
                <Link
                  to="/nos-realisations"
                  className="block bg-slate-950 p-2 focus-visible:outline-4 focus-visible:outline-primary"
                  aria-label={`Voir nos réalisations : ${photo.title}`}
                >
                  <img
                    src={photo.src}
                    srcSet={photo.srcSet}
                    sizes="(max-width: 639px) calc(100vw - 48px), 400px"
                    width={photo.width}
                    height={photo.height}
                    alt={`Avant / après Clean&Fresh à Toulouse — ${photo.title}`}
                    loading="lazy"
                    decoding="async"
                    className="mx-auto h-auto max-h-[400px] w-full rounded-lg object-contain"
                  />
                </Link>
                <figcaption className="p-4">
                  <h3 className="font-semibold">{photo.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {photo.description}
                  </p>
                </figcaption>
              </figure>
            ))}
          </div>
          <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
            <p className="max-w-xl text-xs leading-6 text-muted-foreground">
              Le résultat dépend du revêtement, de l’état initial et de l’ancienneté des taches. Le
              séchage varie selon la matière et l’aération.
            </p>
            <Link
              to="/nos-realisations"
              className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-primary hover:underline"
            >
              Voir toutes nos réalisations <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-10" aria-labelledby="local-steps">
        <h2 id="local-steps" className="text-2xl font-bold">
          Du choix de la prestation au rendez-vous
        </h2>
        <ol className="mt-5 grid gap-5 md:grid-cols-3">
          {[
            {
              title: "Décrivez votre besoin",
              detail:
                "Sélectionnez les éléments à nettoyer ou envoyez une demande de devis avec des photos pour un logement, des travaux ou une surface particulière.",
            },
            {
              title: "Vérifiez le prix et le créneau",
              detail:
                "Consultez le total, les options et le déplacement éventuel. Pour une prestation sur devis, nous convenons avec vous de la date et du périmètre.",
            },
            {
              title: "Préparez l’accès",
              detail:
                "Dégagez les zones à traiter et gardez l’eau et l’électricité accessibles. Après le nettoyage, suivez les conseils de séchage avant réutilisation.",
            },
          ].map((step, index) => (
            <li key={step.title} className="rounded-2xl border border-border p-5">
              <span
                aria-hidden="true"
                className="inline-flex size-8 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary"
              >
                {index + 1}
              </span>
              <h3 className="mt-3 font-bold">{step.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{step.detail}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mx-auto max-w-4xl px-4 pb-10" aria-labelledby="local-faq">
        <h2 id="local-faq" className="mb-5 text-xl font-bold">
          Questions fréquentes à {name}
        </h2>
        <div className="space-y-3">
          {faq.map(({ q, a }) => (
            <details
              key={q}
              className="group rounded-xl border border-border bg-card p-4 shadow-[var(--shadow-soft)]"
            >
              <summary className="flex cursor-pointer list-none items-start justify-between gap-3 text-sm font-semibold leading-snug">
                {q}
                <span
                  aria-hidden="true"
                  className="mt-0.5 shrink-0 text-lg leading-none text-primary transition-transform group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{a}</p>
            </details>
          ))}
        </div>
        {nearbyCommunes.length > 0 && (
          <nav
            className="mt-8 rounded-2xl border border-border bg-muted/30 p-5"
            aria-label={`Autres communes desservies près de ${name}`}
          >
            <p className="mb-3 text-sm font-semibold">
              Nous intervenons aussi dans les communes alentour
            </p>
            <div className="flex flex-wrap gap-2">
              {nearbyCommunes.map((city) => (
                <Link
                  key={city.slug}
                  to={`/${city.slug}` as LinkProps["to"]}
                  className="inline-flex min-h-11 items-center gap-1 rounded-lg border border-border bg-card px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
                >
                  <ChevronRight className="size-3" aria-hidden="true" />
                  {city.name}
                </Link>
              ))}
            </div>
          </nav>
        )}
      </section>

      <ReviewsCarousel />

      <FadeIn delay={0.1}>
        <section className="mx-auto max-w-4xl px-4 pb-16">
          <div className="rounded-3xl border border-primary/20 bg-card p-6 text-center shadow-[var(--shadow-soft)] md:p-8">
            <Sparkles className="mx-auto mb-4 size-10 text-primary" aria-hidden="true" />
            <h2 className="text-2xl font-bold">Besoin d’une intervention à {name} ?</h2>
            <p className="mt-2 text-muted-foreground">
              Choisissez votre formule ou décrivez votre besoin pour un devis gratuit sous 24 h.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <Button
                asChild
                size="lg"
                className="bg-accent-gradient font-bold text-accent-foreground hover:opacity-90"
              >
                <Link to="/formules" data-conversion-location="local_footer">
                  Réserver en ligne
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href={COMPANY.phoneHref}>Appeler le {COMPANY.phone}</a>
              </Button>
            </div>
          </div>
        </section>
      </FadeIn>
    </div>
  );
}
