import { createFileRoute, Link } from "@tanstack/react-router";
import { Shield, Sparkles, MapPin, Handshake } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SITE_URL } from "@/data/site";
import { FadeIn } from "@/components/ui/fade-in";

const TITLE = "À propos de Clean&Fresh Toulouse";
const DESC = "Découvrez Clean&Fresh Toulouse : entreprise artisanale de nettoyage à domicile, tarifs transparents, diagnostic des supports et réservation en ligne.";

export const Route = createFileRoute("/a-propos")({
  head: () => ({
    meta: [
      { title: `À propos de Clean&Fresh — Entreprise de nettoyage Toulouse` },
      { name: "description", content: DESC },
      { property: "og:title", content: `À propos de Clean&Fresh — Entreprise de nettoyage Toulouse` },
      { property: "og:description", content: DESC },
      { property: "og:url", content: `https://cleanetfresh.fr/a-propos` },
      { name: "twitter:title", content: `À propos de Clean&Fresh — Entreprise de nettoyage Toulouse` },
      { name: "twitter:description", content: DESC },
    ],
    links: [{ rel: "canonical", href: `https://cleanetfresh.fr/a-propos` }],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="pb-24 lg:pb-0">
      <div className="mx-auto max-w-3xl px-4 pt-16 pb-10 text-center">
        <h1 className="text-4xl font-bold leading-tight tracking-tight md:text-5xl">
          Notre philosophie : clarté, efficacité, transparence
        </h1>
        <p className="mt-4 text-muted-foreground leading-relaxed max-w-xl mx-auto">
          Clean&Fresh est une entreprise locale et artisanale dirigée par Sébastian Isidro Heredia. À Toulouse et dans son agglomération, nous intervenons à domicile pour prendre soin de vos textiles, de votre véhicule et de vos locaux.
        </p>
      </div>

      <FadeIn delay={0.1}>
        <section className="mx-auto max-w-4xl px-4 pb-16">
          <div className="rounded-3xl border border-border bg-card p-8 md:p-12 shadow-[var(--shadow-soft)]">
            <h2 className="text-2xl font-bold mb-6">Pourquoi Clean&Fresh ?</h2>
            
            <div className="space-y-6 text-muted-foreground leading-relaxed">
              <p>
                Avant chaque nettoyage, nous examinons la matière et l'état du support. Nous vous expliquons la méthode adaptée, les résultats possibles et les éventuelles limites : une tache ancienne ou une décoloration peut subsister.
              </p>
              <p>
                Pour les prestations courantes, vous choisissez une formule, les options utiles et un créneau en ligne. Pour une remise en état ou une prestation bâtiment, nous préparons un devis selon les photos, la surface et les accès. Tout supplément est expliqué et accepté avant sa réalisation.
              </p>
              <p>
                En fin d'intervention, nous vérifions le résultat avec vous et vous donnons les conseils de séchage et d'entretien. Notre assurance responsabilité civile professionnelle et son périmètre sont détaillés dans les mentions légales.
              </p>
            </div>
          </div>
        </section>
      </FadeIn>

      <FadeIn delay={0.2}>
        <section className="bg-secondary/60 py-16">
          <div className="mx-auto max-w-6xl px-4">
            <div className="grid gap-6 md:grid-cols-4">
              <div className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-soft)] text-center flex flex-col items-center">
                <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary mb-4">
                  <Handshake className="size-6" />
                </div>
                <h3 className="font-bold mb-2">Transparence totale</h3>
                <p className="text-sm text-muted-foreground">Des tarifs affichés publiquement, sans frais cachés ni surprises.</p>
              </div>
              
              <div className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-soft)] text-center flex flex-col items-center">
                <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary mb-4">
                  <MapPin className="size-6" />
                </div>
                <h3 className="font-bold mb-2">Ancrage local</h3>
                <p className="text-sm text-muted-foreground">Une entreprise toulousaine de proximité. Nous ne sous-traitons pas.</p>
              </div>

              <div className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-soft)] text-center flex flex-col items-center">
                <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary mb-4">
                  <Sparkles className="size-6" />
                </div>
                <h3 className="font-bold mb-2">Matériel professionnel</h3>
                <p className="text-sm text-muted-foreground">Méthodes et produits choisis selon la matière, avec test de compatibilité si nécessaire.</p>
              </div>

              <div className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-soft)] text-center flex flex-col items-center">
                <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary mb-4">
                  <Shield className="size-6" />
                </div>
                <h3 className="font-bold mb-2">Sérieux et rigueur</h3>
                <p className="text-sm text-muted-foreground">Un nettoyage en profondeur et des conseils d'entretien pour faire durer vos biens.</p>
              </div>
            </div>
          </div>
        </section>
      </FadeIn>

      <FadeIn delay={0.3}>
        <div className="mx-auto max-w-xl px-4 py-16 text-center">
          <h2 className="text-2xl font-bold mb-6">Prêt à nous confier votre intérieur ?</h2>
          <Button asChild size="xl" className="bg-primary text-white font-bold w-full sm:w-auto">
            <Link to="/formules">Consulter nos tarifs et réserver</Link>
          </Button>
        </div>
      </FadeIn>
    </div>
  );
}
