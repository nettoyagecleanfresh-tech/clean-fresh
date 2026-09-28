import { createFileRoute } from "@tanstack/react-router";
import { SITE_URL } from "@/data/site";
import { FadeIn } from "@/components/ui/fade-in";

const TITLE = "Mentions Légales — Clean&Fresh Toulouse";
const DESC = "Mentions légales de Clean&Fresh, entreprise de nettoyage à domicile à Toulouse.";

export const Route = createFileRoute("/mentions-legales")({
  head: () => ({
    meta: [
      { title: `Mentions Légales — Clean&Fresh Toulouse` },
      { name: "robots", content: "noindex, follow" },
      { name: "description", content: `Mentions légales de Clean&Fresh, entreprise de nettoyage à domicile à Toulouse.` },
      { property: "og:title", content: `Mentions Légales — Clean&Fresh Toulouse` },
      { property: "og:description", content: `Mentions légales de Clean&Fresh, entreprise de nettoyage à domicile à Toulouse.` },
      { property: "og:url", content: `https://cleanetfresh.fr/mentions-legales` },
      { name: "twitter:title", content: `Mentions Légales — Clean&Fresh Toulouse` },
      { name: "twitter:description", content: `Mentions légales de Clean&Fresh, entreprise de nettoyage à domicile à Toulouse.` },
    ],
    links: [{ rel: "canonical", href: `https://cleanetfresh.fr/mentions-legales` }],
  }),
  component: MentionsLegalesPage,
});

function MentionsLegalesPage() {
  return (
    <div className="pb-24 lg:pb-0">
      <div className="mx-auto max-w-3xl px-4 pt-16 pb-10">
        <h1 className="text-3xl font-bold tracking-tight md:text-5xl text-center mb-8">
          Mentions Légales
        </h1>
        
        <FadeIn delay={0.1}>
          <div className="prose prose-sm md:prose-base max-w-none text-muted-foreground bg-card p-8 rounded-2xl border border-border shadow-[var(--shadow-soft)]">
            <h2>1. Éditeur du site</h2>
            <p>
              Le site <strong>Clean&Fresh</strong> est édité par :<br />
              <strong>Sébastian Isidro HEREDIA (EI)</strong><br />
              173 avenue Jean Chaubet<br />
              31500 Toulouse, France<br />
              Numéro SIRET : 990 390 122 00028<br />
              TVA : Non applicable (art 293 B CGI)<br />
              Email : nettoyagecleanfresh@gmail.com<br />
              Téléphone : 07 67 12 75 00
            </p>

            <h2>2. Directeur de la publication</h2>
            <p>
              Le Directeur de la publication est Sébastian Isidro HEREDIA.
            </p>

            <h2>3. Hébergement</h2>
            <p>
              Le site est hébergé par :<br />
              <strong>Vercel Inc.</strong><br />
              440 N Barranca Ave #4133, Covina, CA 91723, États-Unis<br />
              <a href="https://vercel.com" target="_blank" rel="noopener noreferrer">https://vercel.com</a>
            </p>

            <h2>4. Assurance Responsabilité Civile Professionnelle</h2>
            <p>
              RC Pro souscrite auprès de Hiscox via Orus France (Contrat RCPH278616485).<br />
              <em>Exclusions : hors sablage, aérogommage, nettoyage de locaux médicaux/industriels, et nettoyage en hauteur de plus de 3 mètres.</em>
            </p>

            <h2>5. Propriété intellectuelle</h2>
            <p>
              L'ensemble de ce site relève de la législation française et internationale sur le droit d'auteur et la propriété intellectuelle. Tous les droits de reproduction sont réservés, y compris pour les documents téléchargeables et les représentations iconographiques et photographiques.
              La reproduction de tout ou partie de ce site sur un support électronique quel qu'il soit est formellement interdite sauf autorisation expresse du directeur de la publication.
            </p>

            <h2>6. Limite de responsabilité</h2>
            <p>
              Les informations contenues sur ce site sont aussi précises que possible et le site est périodiquement remis à jour. Toutefois, Clean&Fresh ne saurait être tenu pour responsable des omissions, des inexactitudes et des carences dans la mise à jour, qu'elles soient de son fait ou du fait des tiers partenaires qui lui fournissent ces informations.
            </p>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
