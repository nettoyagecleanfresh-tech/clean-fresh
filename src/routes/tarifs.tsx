import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, Phone, ArrowRight, MessageCircle, Armchair, Layers, Car, BedDouble, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SITE_URL, COMPANY, SERVICES } from "@/data/site";
import { FadeIn } from "@/components/ui/fade-in";

const TITLE = "Tarifs Nettoyage Toulouse — Prix clairs dès 39 € | Clean&Fresh";
const DESC =
  "Tous les tarifs Clean&Fresh : nettoyage canapé dès 49 €, matelas dès 39 €, auto dès 69 €, tapis dès 49 €. Devis gratuit sous 24h. Intervention à domicile Toulouse et 31.";

// ─── CATÉGORIES ───────────────────────────────────────────────────────────────
const TARIF_CATEGORIES = [
  {
    id: "canape",
    icon: <Armchair className="size-7" />,
    title: "Nettoyage Canapé & Fauteuil",
    priceFrom: "49 €",
    bullets: ["Fauteuil, canapé 2/3, 4/5 places", "Canapé U/angle, pouf, chaise", "Options anti-acariens, anti-odeur"],
  },
  {
    id: "cuir",
    icon: <Armchair className="size-7" />,
    title: "Nettoyage Cuir",
    priceFrom: "49 €",
    bullets: ["Fauteuil, canapé 2/3, 4/5 places", "Sièges auto cuir", "Soin nourrissant protecteur"],
  },
  {
    id: "tapis",
    icon: <Layers className="size-7" />,
    title: "Shampouinage Tapis & Moquette",
    priceFrom: "49 €",
    bullets: ["1 tapis, 2 tapis, 3 tapis", "Toutes tailles et matières", "Options anti-acariens, recto-verso"],
  },
  {
    id: "auto",
    icon: <Car className="size-7" />,
    title: "Nettoyage Intérieur Auto",
    priceFrom: "69 €",
    bullets: ["Pack Bronze, Argent, Or", "Sièges, plastiques, vitres, coffre", "Options poils, anti-odeur, ciel de toit"],
  },
  {
    id: "matelas",
    icon: <BedDouble className="size-7" />,
    title: "Nettoyage Matelas",
    priceFrom: "39 €",
    bullets: ["Matelas enfant, 1 place, 2 places", "Traitement anti-acariens en option", "Idéal pour les allergiques"],
  },
];

// Map formuleId → image (même mapping que ServicePage.tsx)
const FORMULE_IMAGES: Record<string, string> = {
  "fauteuil": "/images/canape/fauteuil.png",
  "canape-2": "/images/canape/canape-2-3.png",
  "canape-3": "/images/canape/canape-2-3.png",
  "canape-angle": "/images/canape/canape-u.png",
  "canape-45": "/images/canape/canape-4-5.png",
  "canape-u": "/images/canape/canape-u.png",
  "pouf": "/images/canape/pouf.png",
  "chaise": "/images/canape/chaise.png",
  "tapis-1": "/images/tapis/1-tapis.png",
  "tapis-2": "/images/tapis/2-tapis.png",
  "tapis-3": "/images/tapis/3-tapis.png",
  "bronze": "/images/auto/bronze.png",
  "argent": "/images/auto/argent.png",
  "or": "/images/auto/or.png",
  "siege": "/images/auto/renov.png",
  "matelas-enfant": "/images/matelas/enfant.png",
  "matelas-1": "/images/matelas/1-place.png",
  "matelas-2": "/images/matelas/2-places.png",
  "cuir-fauteuil": "/images/canape/fauteuil.png",
  "cuir-canape-2": "/images/canape/canape-2-3.png",
  "cuir-canape-angle": "/images/canape/canape-u.png",
  "cuir-auto": "/images/auto/renov.png",
};

// Services textiles avec prix affichés
const TEXTILE_SERVICES = SERVICES.filter((s) => s.group === "textile" && s.prices && s.prices.length > 0);
// Services bâtiment — sur devis
const BATIMENT_SERVICES = SERVICES.filter((s) => s.group === "batiment");

const priceSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Tarifs nettoyage Clean&Fresh Toulouse",
  description:
    "Liste des tarifs de nettoyage professionnel à domicile à Toulouse et agglomération",
  itemListElement: TEXTILE_SERVICES.flatMap((service, si) =>
    (service.prices ?? []).map((price, pi) => ({
      "@type": "ListItem",
      position: si * 10 + pi + 1,
      item: {
        "@type": "Offer",
        name: `${service.short} — ${price.label}`,
        description: price.items?.join(", "),
        price: price.price.replace(/[^0-9]/g, ""),
        priceCurrency: "EUR",
        url: `${SITE_URL}${service.slug}`,
        seller: {
          "@type": "LocalBusiness",
          name: "Clean&Fresh",
          telephone: "+33767127500",
          areaServed: "Toulouse, Haute-Garonne",
        },
      },
    }))
  ),
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Accueil", item: "https://cleanetfresh.fr" },
    { "@type": "ListItem", position: 2, name: "Tarifs", item: "https://cleanetfresh.fr/tarifs" },
  ],
};

export const Route = createFileRoute("/tarifs")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:url", content: `${SITE_URL}/tarifs` },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESC },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/tarifs` }],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(priceSchema) },
      { type: "application/ld+json", children: JSON.stringify(breadcrumbSchema) },
    ],
  }),
  component: TarifsPage,
});

function PriceCard({
  label,
  price,
  items,
  note,
  highlight,
  img,
  serviceId,
  formuleId,
}: {
  label: string;
  price: string;
  items?: string[];
  note?: string;
  highlight?: boolean;
  img?: string;
  serviceId?: string;
  formuleId?: string;
}) {
  const content = (
    <>
      {note && (
        <span className="absolute -top-3 left-4 rounded-full bg-primary px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary-foreground">
          {note}
        </span>
      )}
      {img && (
        <div className="flex items-center justify-center w-full h-28 bg-slate-50 border border-slate-100 rounded-xl overflow-hidden transition-colors group-hover:border-primary/20">
          <img
            src={img}
            alt={label}
            className="w-full h-full object-contain mix-blend-multiply transition-transform duration-200 group-hover:scale-110"
            loading="lazy"
          />
        </div>
      )}
      <div className="flex items-start justify-between gap-2 mt-1">
        <p className="font-semibold text-foreground leading-tight group-hover:text-primary transition-colors">{label}</p>
        <p className="text-xl font-black text-primary shrink-0">{price}</p>
      </div>
      {items && (
        <ul className="space-y-1.5 mt-1">
          {items.map((item) => (
            <li key={item} className="flex items-start gap-2 text-xs text-muted-foreground group-hover:text-foreground/80 transition-colors">
              <CheckCircle2 className="mt-0.5 size-3.5 shrink-0 text-primary" />
              {item}
            </li>
          ))}
        </ul>
      )}
      {serviceId && formuleId && (
        <div className="mt-auto pt-3">
          <div className="flex w-full items-center justify-center gap-1.5 rounded-xl bg-primary/10 px-4 py-2.5 text-sm font-bold text-primary transition-colors group-hover:bg-primary group-hover:text-white">
            <ChevronRight className="size-4" /> Choisir
          </div>
        </div>
      )}
    </>
  );

  const baseClass = `relative h-full rounded-[20px] border p-5 flex flex-col gap-3 transition-all duration-300 ${
    highlight
      ? "border-primary bg-primary/5 shadow-[var(--shadow-card)]"
      : "border-border bg-card shadow-[var(--shadow-soft)]"
  }`;

  if (serviceId && formuleId) {
    return (
      <Link
        to="/reserver"
        search={{ service: serviceId, formule: formuleId, from: "tarifs" }}
        className={`${baseClass} cursor-pointer hover:border-primary/40 hover:shadow-lg hover:-translate-y-1 group`}
      >
        {content}
      </Link>
    );
  }

  return (
    <div className={baseClass}>
      {content}
    </div>
  );
}

const getServiceId = (slug: string) => {
  if (slug.includes("canape")) return "canape";
  if (slug.includes("tapis")) return "tapis";
  if (slug.includes("matelas")) return "matelas";
  if (slug.includes("auto")) return "auto";
  if (slug.includes("cuir")) return "cuir";
  return "";
};

function TarifsPage() {
  return (
    <div className="pb-24 lg:pb-0">
      {/* ── CATÉGORIES OVERVIEW ── */}
      <section className="mx-auto max-w-5xl px-4 pt-10 pb-4">
        <h1 className="text-2xl md:text-3xl font-bold text-center mb-1">Tarifs nettoyage à domicile — Toulouse & Haute-Garonne (31)</h1>
        <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-6 text-center">
          Prix clairs · Toute l'agglomération toulousaine · Devis gratuit sous 24h
        </p>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {TARIF_CATEGORIES.map((cat) => (
            <a
              key={cat.id}
              href={`#section-${cat.id}`}
              className="relative flex flex-col rounded-2xl border border-border bg-white p-4 md:p-5 text-left transition-all shadow-sm hover:shadow-md hover:border-primary/40 hover:-translate-y-0.5 group"
            >
              <div className="flex size-10 md:size-12 items-center justify-center rounded-xl bg-primary/10 text-primary mb-3 transition-colors group-hover:bg-primary group-hover:text-white">
                {cat.icon}
              </div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">
                À partir de
              </p>
              <p className="text-2xl md:text-3xl font-bold text-primary leading-none mb-2">{cat.priceFrom}</p>
              <h2 className="text-xs md:text-sm font-bold leading-snug mb-2 text-foreground">{cat.title}</h2>
              <ul className="flex-1 space-y-1 mb-4 hidden md:block">
                {cat.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-1.5 text-xs text-muted-foreground">
                    <CheckCircle2 className="size-3 shrink-0 mt-0.5 text-primary" /> {b}
                  </li>
                ))}
              </ul>
              <div className="mt-auto flex items-center justify-center gap-1 rounded-xl bg-primary/10 text-primary py-2 md:py-2.5 text-[11px] md:text-xs font-bold group-hover:bg-primary group-hover:text-white transition-colors">
                <ChevronRight className="size-3 md:size-3.5" /> Voir les tarifs
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* ── TEXTILE SERVICES ── */}
      {TEXTILE_SERVICES.map((service) => (
        <FadeIn key={service.slug} delay={0.05}>
          <section
            id={`section-${service.slug.replace("/nettoyage-", "").replace("-toulouse", "").replace("-a-domicile", "").split("-")[0]}`}
            className="mx-auto max-w-5xl px-4 py-10 scroll-mt-24">
            <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
              <div>
                <h2 className="text-xl font-bold md:text-2xl">{service.short}</h2>
                <p className="mt-1 text-sm text-muted-foreground max-w-xl">{service.subtitle}</p>
              </div>
              <Link
                to={service.slug as any}
                className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
              >
                Voir la prestation <ArrowRight className="size-3.5" />
              </Link>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {service.prices!.map((price) => (
                <PriceCard
                  key={price.label}
                  label={price.label}
                  price={price.price}
                  items={price.items}
                  note={price.note}
                  highlight={!!price.note}
                  img={price.formuleId ? FORMULE_IMAGES[price.formuleId] : undefined}
                  serviceId={getServiceId(service.slug)}
                  formuleId={price.formuleId}
                />
              ))}
            </div>

            {service.priceNote && (
              <p className="mt-3 text-xs text-muted-foreground italic">* {service.priceNote}</p>
            )}

            {service.booking && (
              <div className="mt-4 flex gap-3">
                <Button asChild size="sm" className="bg-accent-gradient text-accent-foreground font-bold hover:opacity-90">
                  <Link to="/formules">Réserver ce service</Link>
                </Button>
                <Button asChild variant="outline" size="sm">
                  <Link to={service.slug as any}>En savoir plus</Link>
                </Button>
              </div>
            )}

            <hr className="mt-10 border-border/50" />
          </section>
        </FadeIn>
      ))}

      {/* ── BÂTIMENT SUR DEVIS ── */}
      <FadeIn delay={0.1}>
        <section className="mx-auto max-w-5xl px-4 py-10">
          <h2 className="text-xl font-bold md:text-2xl">Prestations bâtiment — sur devis</h2>
          <p className="mt-2 mb-8 text-sm text-muted-foreground max-w-2xl">
            Ces prestations sont tarifées sur devis selon la surface, la hauteur et l'état du support.
            Réponse gratuite sous 24h sur simple demande ou envoi de photos.
          </p>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {BATIMENT_SERVICES.map((service) => (
              <Link
                key={service.slug}
                to={service.slug as any}
                className="group rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-soft)] transition-all hover:border-primary/40 hover:shadow-[var(--shadow-card)]"
              >
                <div className="flex items-start justify-between gap-2">
                  <p className="font-semibold text-foreground group-hover:text-primary transition-colors leading-tight">
                    {service.short}
                  </p>
                  <span className="shrink-0 rounded-full bg-muted px-2 py-0.5 text-[10px] font-semibold text-muted-foreground">
                    Devis gratuit
                  </span>
                </div>
                <p className="mt-2 text-xs text-muted-foreground leading-relaxed line-clamp-2">
                  {service.subtitle}
                </p>
                <p className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-primary">
                  Voir la prestation <ArrowRight className="size-3" />
                </p>
              </Link>
            ))}
          </div>
        </section>
      </FadeIn>

      {/* ── FRAIS DE DÉPLACEMENT ── */}
      <FadeIn delay={0.1}>
        <section className="mx-auto max-w-5xl px-4 py-4 pb-10">
          <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6">
            <h2 className="font-bold text-base md:text-lg mb-3">Frais de déplacement</h2>
            <div className="grid gap-3 sm:grid-cols-3 text-sm">
              <div className="rounded-xl bg-card border border-border p-4">
                <p className="font-bold text-primary text-lg">Gratuit</p>
                <p className="text-muted-foreground text-xs mt-1">Jusqu'à 20 km de Toulouse</p>
              </div>
              <div className="rounded-xl bg-card border border-border p-4">
                <p className="font-bold text-foreground text-lg">+ 10 €</p>
                <p className="text-muted-foreground text-xs mt-1">De 21 à 34 km</p>
              </div>
              <div className="rounded-xl bg-card border border-border p-4">
                <p className="font-bold text-foreground text-lg">+ 20 €</p>
                <p className="text-muted-foreground text-xs mt-1">De 35 à 49 km</p>
              </div>
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              Toutes les communes de l'agglomération toulousaine sont dans la zone gratuite (Blagnac, Colomiers, Tournefeuille, Balma, Cugnaux, Muret, Ramonville…).
            </p>
          </div>
        </section>
      </FadeIn>

      {/* ── FAQ TARIFS ── */}
      <FadeIn delay={0.1}>
        <section className="mx-auto max-w-4xl px-4 pb-12">
          <h2 className="text-xl font-bold md:text-2xl mb-6">Questions fréquentes sur nos tarifs</h2>
          <div className="space-y-4">
            {[
              {
                q: "Le paiement se fait avant ou après l'intervention ?",
                a: "Après. Vous réglez une fois satisfait du résultat, à la fin de l'intervention. Nous acceptons les espèces, le virement bancaire et le paiement par carte.",
              },
              {
                q: "Les prix incluent-ils les produits et le matériel ?",
                a: "Oui, tout est inclus : produits certifiés Écolabel, matériel d'injection-extraction professionnel et main d'œuvre. Aucun supplément caché.",
              },
              {
                q: "Y a-t-il un tarif dégressif si je commande plusieurs prestations ?",
                a: "Oui, nous proposons un tarif préférentiel lorsque plusieurs services sont combinés lors de la même intervention (ex : canapé + matelas, tapis + moquette). Mentionnez-le lors de votre demande de devis.",
              },
              {
                q: "Comment obtenir un devis pour les prestations bâtiment ?",
                a: "Envoyez-nous quelques photos par WhatsApp ou via le formulaire de contact, et nous vous répondons sous 24h avec un tarif précis. Aucun engagement.",
              },
              {
                q: "Pouvez-vous intervenir le soir ou le week-end ?",
                a: "Oui, nous sommes disponibles 6j/7, y compris le samedi et le dimanche matin. Créneaux disponibles à la réservation en ligne.",
              },
            ].map(({ q, a }) => (
              <details
                key={q}
                className="group rounded-xl border border-border bg-card p-4 shadow-[var(--shadow-soft)]"
              >
                <summary className="flex cursor-pointer items-start justify-between gap-3 font-semibold text-sm leading-snug list-none">
                  {q}
                  <span className="mt-0.5 shrink-0 text-primary text-lg leading-none group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{a}</p>
              </details>
            ))}
          </div>
        </section>
      </FadeIn>

      {/* ── CTA FINAL ── */}
      <FadeIn delay={0.2}>
        <section className="mx-auto max-w-4xl px-4 pb-16">
          <div className="rounded-3xl border border-primary/20 bg-card p-8 text-center shadow-[var(--shadow-soft)]">
            <MessageCircle className="mx-auto mb-4 size-10 text-primary" />
            <h2 className="text-2xl font-bold">Prêt à réserver votre intervention ?</h2>
            <p className="mt-2 text-muted-foreground">
              Réservation en ligne en 2 minutes ou devis gratuit par téléphone.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" className="bg-accent-gradient text-accent-foreground font-bold hover:opacity-90">
                <Link to="/formules">Réserver en ligne</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href={COMPANY.phoneHref}>Appeler le {COMPANY.phone}</a>
              </Button>
              <Button asChild variant="ghost" size="lg">
                <Link to="/contactez-nous">Demander un devis</Link>
              </Button>
            </div>
          </div>
        </section>
      </FadeIn>
    </div>
  );
}
