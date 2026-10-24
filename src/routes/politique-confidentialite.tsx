import { createFileRoute } from "@tanstack/react-router";
import { SITE_URL } from "@/data/site";
import { FadeIn } from "@/components/ui/fade-in";

const TITLE = "Politique de Confidentialité — Clean&Fresh Toulouse";
const DESC = "Politique de confidentialité de Clean&Fresh, entreprise de nettoyage à domicile à Toulouse.";

export const Route = createFileRoute("/politique-confidentialite")({
  head: () => ({
    meta: [
      { title: `Politique de Confidentialité — Clean&Fresh Toulouse` },
      { name: "robots", content: "noindex, follow" },
      { name: "description", content: `Politique de confidentialité de Clean&Fresh, entreprise de nettoyage à domicile à Toulouse.` },
      { property: "og:title", content: `Politique de Confidentialité — Clean&Fresh Toulouse` },
      { property: "og:description", content: `Politique de confidentialité de Clean&Fresh, entreprise de nettoyage à domicile à Toulouse.` },
      { property: "og:url", content: `https://cleanetfresh.fr/politique-confidentialite` },
      { name: "twitter:title", content: `Politique de Confidentialité — Clean&Fresh Toulouse` },
      { name: "twitter:description", content: `Politique de confidentialité de Clean&Fresh, entreprise de nettoyage à domicile à Toulouse.` },
    ],
    links: [{ rel: "canonical", href: `https://cleanetfresh.fr/politique-confidentialite` }],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <div className="pb-24 lg:pb-0">
      <div className="mx-auto max-w-3xl px-4 pt-16 pb-10">
        <h1 className="text-3xl font-bold tracking-tight md:text-5xl text-center mb-8">
          Politique de Confidentialité
        </h1>
        
        <FadeIn delay={0.1}>
          <div className="prose prose-sm md:prose-base max-w-none text-muted-foreground bg-card p-8 rounded-2xl border border-border shadow-[var(--shadow-soft)]">
            <h2>1. Collecte des données personnelles</h2>
            <p>
              Dans le cadre de l'utilisation de notre site web, notamment lors d'une demande de devis ou de réservation, nous sommes amenés à collecter les données personnelles suivantes :
            </p>
            <ul>
              <li>Nom et prénom</li>
              <li>Adresse email</li>
              <li>Numéro de téléphone</li>
              <li>Adresse postale (pour l'intervention)</li>
            </ul>

            <h2>2. Finalité du traitement</h2>
            <p>
              Ces données sont collectées exclusivement dans le but de :
            </p>
            <ul>
              <li>Vous recontacter suite à une demande de devis</li>
              <li>Planifier et réaliser nos prestations de nettoyage à votre domicile ou entreprise</li>
              <li>Établir les factures liées à nos services</li>
            </ul>

            <h2>3. Conservation des données</h2>
            <p>
              Vos données personnelles sont conservées le temps nécessaire à l'exécution de la prestation et à la gestion de la relation commerciale. Les données de facturation sont conservées pendant la durée légale en vigueur.
            </p>

            <h2>4. Partage des données</h2>
            <p>
              Vos données personnelles ne sont jamais vendues, louées ou cédées à des tiers à des fins de prospection commerciale. Elles peuvent uniquement être partagées avec nos sous-traitants techniques (hébergement web, outil de facturation) dans le strict cadre de la gestion de notre entreprise.
            </p>

            <h2>5. Vos droits (RGPD)</h2>
            <p>
              Conformément à la réglementation européenne en vigueur, vous disposez des droits suivants concernant vos données personnelles :
            </p>
            <ul>
              <li>Droit d'accès et de rectification</li>
              <li>Droit à l'effacement</li>
              <li>Droit d'opposition au traitement</li>
            </ul>
            <p>
              Pour exercer ces droits, vous pouvez nous contacter par email à l'adresse : contact@cleanetfresh.fr ou par téléphone au 07 67 12 75 00.
            </p>

            <h2>6. Cookies</h2>
            <p>
              Les fonctions de réservation restent accessibles lorsque vous refusez la mesure d’audience. Avec votre accord uniquement, Google Analytics 4 mesure les pages consultées et les actions liées aux demandes de devis et aux réservations. Les noms, adresses, e-mails, téléphones et contenus saisis dans les formulaires ne sont pas envoyés à ce suivi. Les paramètres des URL sont retirés des pages transmises.
            </p>
            <p>Vous pouvez accepter, refuser ou retirer votre accord avec « Gérer mes cookies de mesure d’audience » en bas de page. Votre choix est conservé pendant 180 jours. Les cookies Google Analytics ont une durée configurée de 180 jours. Les fonctions de personnalisation publicitaire Google ne sont pas activées par ce choix.</p>
            <p>Google fournit le service de mesure d’audience. Consultez <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer">les informations de Google sur l’utilisation des données provenant des sites partenaires</a>. Le site utilise également les outils techniques Vercel Analytics et Speed Insights pour mesurer son utilisation et ses performances.</p>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
