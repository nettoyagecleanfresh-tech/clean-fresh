import { createFileRoute, Link } from "@tanstack/react-router";
import {
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
  ArrowRight,
  CalendarCheck,
  KeyRound,
  PackageOpen,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { COMPANY, SITE_URL, SERVICES } from "@/data/site";
import heroImg from "@/assets/hero-nettoyage.webp";

const TITLE = "Nos Services de Nettoyage à Toulouse — Canapé, Matelas, Auto | Clean&Fresh";
const DESC = "Découvrez tous les services Clean&Fresh : nettoyage canapé, matelas, tapis, moquette, auto, vitres, terrasse, façade, fin de chantier. À domicile Toulouse et 31.";

export const Route = createFileRoute("/nos-services")({
  head: () => ({
    meta: [
      { title: `Nos Services de Nettoyage à Toulouse — Canapé, Matelas, Auto | Clean&Fresh` },
      { name: "description", content: `Découvrez tous les services Clean&Fresh : nettoyage canapé, matelas, tapis, moquette, auto, vitres, terrasse, façade, fin de chantier. À domicile Toulouse et 31.` },
      { property: "og:title", content: `Nos Services de Nettoyage à Toulouse — Canapé, Matelas, Auto | Clean&Fresh` },
      { property: "og:description", content: `Découvrez tous les services Clean&Fresh : nettoyage canapé, matelas, tapis, moquette, auto, vitres, terrasse, façade, fin de chantier. À domicile Toulouse et 31.` },
      { property: "og:url", content: `https://cleanetfresh.fr/nos-services` },
      { name: "twitter:title", content: `Nos Services de Nettoyage à Toulouse — Canapé, Matelas, Auto | Clean&Fresh` },
      { name: "twitter:description", content: `Découvrez tous les services Clean&Fresh : nettoyage canapé, matelas, tapis, moquette, auto, vitres, terrasse, façade, fin de chantier. À domicile Toulouse et 31.` },
    ],
    links: [{ rel: "canonical", href: `https://cleanetfresh.fr/nos-services` }],
  }),
  component: ServicesPage,
});

const SERVICE_ICONS: Record<string, React.ReactNode> = {
  "/nettoyage-canape-toulouse": <Armchair className="size-7 stroke-[1.4]" />,
  "/nettoyage-matelas-toulouse": <BedDouble className="size-7 stroke-[1.4]" />,
  "/nettoyage-tapis-toulouse": <Layers className="size-7 stroke-[1.4]" />,
  "/nettoyage-auto-a-domicile-toulouse": <Car className="size-7 stroke-[1.4]" />,
  "/nettoyage-de-vitres-toulouse": <Droplets className="size-7 stroke-[1.4]" />,
  "/nettoyage-terrasse-toulouse": <Sun className="size-7 stroke-[1.4]" />,
  "/nettoyage-toiture-toulouse": <Home className="size-7 stroke-[1.4]" />,
  "/nettoyage-facade-toulouse": <Building className="size-7 stroke-[1.4]" />,
  "/nettoyage-dappartement-ou-maison": <Building2 className="size-7 stroke-[1.4]" />,
  "/nettoyage-de-fin-de-chantier-toulouse": <Wrench className="size-7 stroke-[1.4]" />,
  "/nettoyage-fin-de-bail-toulouse": <KeyRound className="size-7 stroke-[1.4]" />,
  "/nettoyage-diogene-toulouse": <PackageOpen className="size-7 stroke-[1.4]" />,
  "/nettoyage-extreme-toulouse": <Zap className="size-7 stroke-[1.4]" />,
};

function ServiceCard({ slug, short, subtitle }: { slug: string; short: string; subtitle: string }) {
  return (
    <Link
      to={slug}
      className="group flex flex-col rounded-xl border border-border bg-background p-6 transition-shadow hover:shadow-[var(--shadow-card)]"
    >
      <div className="text-foreground/50 transition-colors group-hover:text-primary">
        {SERVICE_ICONS[slug]}
      </div>
      <h3 className="mt-4 text-lg font-bold leading-snug tracking-tight">{short}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground line-clamp-3">{subtitle}</p>
      <span className="mt-5 inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-widest text-foreground/50 transition-colors group-hover:text-primary">
        En savoir plus <ArrowRight className="size-3" />
      </span>
    </Link>
  );
}

const textile = SERVICES.filter((s) => s.group === "textile");
// Bâtiment: merge toiture + façade visually, keep others separate
const batiment = SERVICES.filter((s) => s.group === "batiment");

function ServicesPage() {
  return (
    <div className="bg-[#f9f9f7] pb-24 lg:pb-0">
      {/* ── HERO TITLE ── */}
      <div className="mx-auto max-w-5xl px-4 pt-16 pb-12 text-center">
        <span className="inline-block rounded-full border border-border bg-background px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest text-muted-foreground shadow-sm">
          Nos prestations
        </span>
        <h1 className="mt-5 font-display text-5xl font-bold tracking-tight md:text-6xl lg:text-7xl">
          13 services de nettoyage
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-base text-muted-foreground leading-relaxed">
          À domicile ou sur site, pour particuliers et professionnels à Toulouse et sa banlieue.
          L'excellence du détail, sans compromis.
        </p>
      </div>

      <div className="mx-auto max-w-5xl space-y-8 px-4 pb-16">
        {/* ── TEXTILE & AUTO ── */}
        <div className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden">
          <div className="border-b border-border px-8 py-5">
            <h2 className="text-xl font-bold">Nettoyage Textile et Auto Toulouse</h2>
          </div>

          <div className="flex flex-col md:flex-row">
            {/* 2×2 grid */}
            <div className="grid flex-1 grid-cols-1 sm:grid-cols-2 divide-y divide-x-0 sm:divide-x divide-border">
              {textile.map((s) => (
                <ServiceCard key={s.slug} slug={s.slug} short={s.short} subtitle={s.subtitle} />
              ))}
            </div>

            {/* Hero image card */}
            <div
              className="relative hidden md:flex md:w-56 lg:w-72 flex-col justify-end bg-cover bg-center"
              style={{ backgroundImage: `url(${heroImg})` }}
            >
              <div className="absolute inset-0 bg-ink/60" />
              <div className="relative p-6">
                <h3 className="text-2xl font-bold text-white leading-tight">Haute Clarté</h3>
                <p className="mt-1.5 text-sm text-white/70">
                  On redonne vie à vos intérieurs avec une précision absolue.
                </p>
                <Button
                  asChild
                  size="sm"
                  className="mt-4 bg-accent-gradient text-accent-foreground font-bold hover:opacity-90"
                >
                  <Link to="/formules">
                    <CalendarCheck className="size-4" /> Je réserve
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* ── BÂTIMENT & EXTÉRIEUR ── */}
        <div className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden">
          <div className="border-b border-border px-8 py-5">
            <h2 className="text-xl font-bold">Services de nettoyage</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 divide-y divide-border sm:[&>*:nth-child(odd)]:border-r sm:last:[&>*:nth-child(odd)]:border-r-0 lg:[&>*:nth-child(odd)]:border-r-0 lg:[&>*:not(:nth-last-child(-n+3))]:border-b lg:[&>*]:border-r lg:[&>*:nth-child(3n)]:border-r-0">
            {batiment.map((s) => (
              <ServiceCard key={s.slug} slug={s.slug} short={s.short} subtitle={s.subtitle} />
            ))}
          </div>
        </div>

        {/* ── CTA ── */}
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-border bg-card px-8 py-6 shadow-sm">
          <div>
            <p className="font-bold">Besoin d'un devis ?</p>
            <p className="mt-0.5 text-sm text-muted-foreground">Réponse garantie sous 24h.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button asChild variant="ghost" size="sm">
              <Link to="/tarifs">Voir les tarifs</Link>
            </Button>
            <Button asChild variant="outline" size="sm">
              <Link to="/contactez-nous">Demander un devis</Link>
            </Button>
            <Button asChild size="sm" className="bg-accent-gradient text-accent-foreground font-bold hover:opacity-90">
              <Link to="/formules">
                <CalendarCheck className="size-4" /> Réserver en ligne
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
