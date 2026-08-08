import { createFileRoute, Link } from "@tanstack/react-router";
import { Shield, Sparkles, MapPin, Handshake } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SITE_URL } from "@/data/site";
import { FadeIn } from "@/components/ui/fade-in";

const TITLE = "À propos de Clean&Fresh — Entreprise de nettoyage Toulouse";
const DESC = "Clean&Fresh, votre entreprise de nettoyage à domicile à Toulouse depuis 2020. 4.9★ sur Google · 500+ clients satisfaits · Produits Écolabel · 6j/7.";

export const Route = createFileRoute("/a-propos")({
  head: () => ({
    meta: [
      { title: `À propos de Clean&Fresh — Entreprise de nettoyage Toulouse` },
      { name: "description", content: `Clean&Fresh, votre entreprise de nettoyage à domicile à Toulouse depuis 2020. 4.9★ sur Google · 500+ clients satisfaits · Produits Écolabel · 6j/7.` },
      { property: "og:title", content: `À propos de Clean&Fresh — Entreprise de nettoyage Toulouse` },
      { property: "og:description", content: `Clean&Fresh, votre entreprise de nettoyage à domicile à Toulouse depuis 2020. 4.9★ sur Google · 500+ clients satisfaits · Produits Écolabel · 6j/7.` },
      { property: "og:url", content: `https://cleanetfresh.fr/a-propos` },
      { name: "twitter:title", content: `À propos de Clean&Fresh — Entreprise de nettoyage Toulouse` },
      { name: "twitter:description", content: `Clean&Fresh, votre entreprise de nettoyage à domicile à Toulouse depuis 2020. 4.9★ sur Google · 500+ clients satisfaits · Produits Écolabel · 6j/7.` },
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
          Clean&Fresh n'est pas un groupe national ou une franchise. Nous sommes une entreprise locale et artisanale, créée avec une idée simple : rendre la réservation de nettoyage aussi transparente que possible.
        </p>
      </div>

      <FadeIn delay={0.1}>
        <section className="mx-auto max-w-4xl px-4 pb-16">
          <div className="rounded-3xl border border-border bg-card p-8 md:p-12 shadow-[var(--shadow-soft)]">
            <h2 className="text-2xl font-bold mb-6">Pourquoi Clean&Fresh ?</h2>
            
            <div className="space-y-6 text-muted-foreground leading-relaxed">
              <p>
                Avant de fonder Clean&Fresh, nous faisions souvent face à la même frustration : trouver un prestataire pour nettoyer un canapé ou une voiture impliquait souvent des tarifs opaques, des devis qui mettaient des jours à arriver, ou des suppléments cachés facturés une fois sur place.
              </p>
              <p>
                Nous avons donc décidé de créer l'entreprise de nettoyage que nous aurions aimé engager. Une entreprise 100 % toulousaine, artisanale, sans fausses promesses ni marketing agressif, où les tarifs sont affichés publiquement et où vous pouvez réserver en ligne en quelques clics.
              </p>
              <p>
                Nos valeurs reposent sur un travail sérieux, un équipement professionnel certifié, des produits respectueux de l'environnement, et une obligation de moyens : nous mettons toujours tout en œuvre pour obtenir le meilleur résultat possible sur vos surfaces.
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
                <h3 className="font-bold mb-2">Matériel certifié</h3>
                <p className="text-sm text-muted-foreground">Utilisation de produits de qualité et de gammes certifiées Écolabel.</p>
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
