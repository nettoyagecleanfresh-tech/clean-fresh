import { Link } from "@tanstack/react-router";
import { MapPin, Clock, Shield, CheckCircle2, Sparkles, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { COMPANY } from "@/data/site";
import { FadeIn } from "@/components/ui/fade-in";
import { ReviewsCarousel } from "@/components/site/ReviewsCarousel";
import type { CommuneData } from "@/data/communes";

type Props = { commune: CommuneData };

export function LocalCityPage({ commune }: Props) {
  const { name, para1, para2, faq, nearby } = commune;

  return (
    <div className="pb-24 lg:pb-0">
      {/* ── HERO ── */}
      <section className="relative overflow-hidden bg-hero-gradient text-ink-foreground">
        <div className="pointer-events-none absolute -right-24 -top-24 size-96 rounded-full bg-primary/20 blur-3xl" />
        <div className="relative mx-auto max-w-4xl px-4 py-8 md:py-20 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-ink-foreground/20 bg-ink-foreground/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider backdrop-blur">
            <MapPin className="size-3" /> Intervention à {name}
          </span>
          <h1 className="mt-3 text-3xl font-bold leading-tight tracking-tight md:mt-5 md:text-5xl">
            {name === "Toulouse" ? "Nettoyage à domicile à Toulouse" : `Entreprise de nettoyage à ${name}`}
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-ink-foreground/80 md:mt-5 md:text-base">
            {para1}
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-2.5 md:mt-8">
            <Button
              asChild
              size="xl"
              className="bg-accent-gradient text-accent-foreground font-bold shadow-[var(--shadow-card)] hover:opacity-90 px-4 md:px-6 h-10 md:h-12 text-xs md:text-sm"
            >
              <Link to="/formules">Réserver en ligne</Link>
            </Button>
            <Button
              asChild
              variant="onDark"
              size="xl"
              className="px-4 md:px-6 h-10 md:h-12 text-xs md:text-sm"
            >
              <Link to="/contactez-nous">Demander un devis</Link>
            </Button>
          </div>
          <div className="hidden md:flex mt-6 flex-wrap justify-center gap-4 text-xs text-ink-foreground/60">
            <span className="inline-flex items-center gap-1"><Clock className="size-3" /> Devis sous 24h</span>
            <span className="inline-flex items-center gap-1"><CheckCircle2 className="size-3" /> Séchage rapide (2–4h)</span>
            <span className="inline-flex items-center gap-1"><Shield className="size-3" /> Produits Écolabel</span>
          </div>
        </div>
      </section>

      {/* ── CONTENU PRINCIPAL ── */}
      <FadeIn delay={0.05}>
        <section className="mx-auto max-w-4xl px-4 py-12">
          <div className="prose prose-sm md:prose-base max-w-none text-muted-foreground [&>p]:mb-5 [&>ul]:mb-5 [&>h2]:mt-10 [&>h2]:mb-4 [&>h2]:font-bold [&>h2]:text-foreground">

            <h2>Nos prestations de nettoyage à {name}</h2>
            <p>{para2}</p>

            <ul>
              <li>
                <strong>Nettoyage de canapés et fauteuils :</strong> Tissu, microfibre, velours ou cuir — injection-extraction et traitement des taches. Séchage en 2 à 4h. Dès 49 €.
              </li>
              <li>
                <strong>Nettoyage de matelas :</strong> Désinfection en profondeur, traitement anti-acariens, élimination des auréoles d'urine ou de transpiration. Dès 39 €.
              </li>
              <li>
                <strong>Shampouinage de tapis et moquettes :</strong> Toutes fibres, toutes tailles. Couleurs ravivées, odeurs neutralisées. Dès 49 €.
              </li>
              <li>
                <strong>Nettoyage intérieur automobile :</strong> Pack Bronze (69 €), Argent (99 €) ou Or (129 €). Le technicien vient directement chez vous à {name}.
              </li>
              <li>
                <strong>Prestations bâtiment :</strong> Nettoyage de vitres, façades, terrasses, fin de chantier et fin de bail — sur devis gratuit sous 24h.
              </li>
            </ul>

            <h2>Comment se déroule une intervention à {name} ?</h2>
            <p>
              Vous contactez Clean&Fresh par téléphone, via le formulaire en ligne ou en réservant directement sur notre plateforme. Nous confirmons un créneau sous 24h. À la date convenue, notre technicien se présente à votre adresse à {name} avec son matériel d'injection-extraction professionnel. Nous protégeons les zones environnantes, effectuons un diagnostic du support, puis procédons au traitement : aspiration, détachage ciblé, injection-extraction et neutralisation des odeurs. L'intervention dure en moyenne 45 minutes à 2h. Vous pouvez réutiliser votre canapé ou votre matelas le jour même, après 2 à 4h de séchage.
            </p>

            <h2>Nos tarifs à {name}</h2>
            <p>
              {name === "Toulouse"
                ? "Nos tarifs sont transparents et identiques dans toute notre zone d'intervention autour de Toulouse."
                : `Nos prix à ${name} sont identiques à ceux pratiqués à Toulouse — aucun supplément selon la commune.`}{" "}
              Retrouvez tous nos tarifs détaillés sur la <Link to="/tarifs" className="text-primary font-medium hover:underline">page tarifs</Link>{" "}
              ou contactez-nous pour un devis personnalisé selon votre situation.
            </p>

            <h2>Services de nettoyage disponibles à {name}</h2>
            <p>
              Clean&Fresh intervient à {name} pour l'ensemble de ses prestations :{" "}
              <Link to="/nettoyage-canape-toulouse" className="text-primary font-medium hover:underline">nettoyage de canapé</Link>,{" "}
              <Link to="/nettoyage-matelas-toulouse" className="text-primary font-medium hover:underline">nettoyage de matelas</Link>,{" "}
              <Link to="/nettoyage-tapis-toulouse" className="text-primary font-medium hover:underline">shampouinage de tapis</Link>,{" "}
              <Link to="/nettoyage-moquette-toulouse" className="text-primary font-medium hover:underline">nettoyage de moquette</Link>{" "}
              et{" "}
              <Link to="/nettoyage-auto-a-domicile-toulouse" className="text-primary font-medium hover:underline">nettoyage intérieur auto à domicile</Link>.{" "}
              Mêmes tarifs, même qualité et même équipement professionnel que dans toute l'agglomération toulousaine.
            </p>
          </div>

          {/* Communes voisines — maillage interne */}
          {nearby.length > 0 && (
            <div className="mt-10 rounded-2xl border border-border bg-muted/30 p-5">
              <p className="mb-3 text-sm font-semibold text-foreground">
                Clean&Fresh intervient aussi dans les communes voisines :
              </p>
              <div className="flex flex-wrap gap-2">
                {nearby.map((city) => (
                  <Link
                    key={city}
                    to={`/nettoyage-${city
                      .toLowerCase()
                      .normalize("NFD")
                      .replace(/[̀-ͯ]/g, "")
                      .replace(/['']/g, "-")
                      .replace(/\s+/g, "-")}` as any}
                    className="inline-flex items-center gap-1 rounded-lg border border-border bg-card px-3 py-1.5 text-xs font-medium text-muted-foreground hover:border-primary/40 hover:text-primary transition-colors"
                  >
                    <ChevronRight className="size-3" />
                    Nettoyage {city}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </section>
      </FadeIn>

      {/* ── FAQ ── */}
      <FadeIn delay={0.1}>
        <section className="mx-auto max-w-4xl px-4 pb-10">
          <h2 className="text-xl font-bold mb-5">Questions fréquentes — {name}</h2>
          <div className="space-y-3">
            {faq.map(({ q, a }) => (
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

      {/* ── AVIS ── */}
      <ReviewsCarousel />

      {/* ── CTA ── */}
      <FadeIn delay={0.2}>
        <section className="mx-auto max-w-4xl px-4 pb-16">
          <div className="rounded-3xl border border-primary/20 bg-card p-8 text-center shadow-[var(--shadow-soft)]">
            <Sparkles className="mx-auto mb-4 size-10 text-primary" />
            <h2 className="text-2xl font-bold">Besoin d'une intervention à {name} ?</h2>
            <p className="mt-2 text-muted-foreground">
              Devis gratuit sous 24h ou réservation directe en ligne.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <Button
                asChild
                size="lg"
                className="bg-accent-gradient text-accent-foreground font-bold hover:opacity-90"
              >
                <Link to="/formules">Réserver en ligne</Link>
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
