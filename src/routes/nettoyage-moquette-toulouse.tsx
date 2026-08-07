import { createFileRoute } from "@tanstack/react-router";
import { ServicePage } from "@/components/site/ServicePage";
import { getService } from "@/data/site";

const service = getService("/nettoyage-moquette-toulouse");

export const Route = createFileRoute("/nettoyage-moquette-toulouse")({
  head: () => ({
    meta: [
      { title: "Nettoyage moquette Toulouse — injection-extraction | Clean&Fresh" },
      { name: "description", content: "Nettoyage de moquette à domicile à Toulouse : shampouinage professionnel, taches, odeurs et acariens éliminés par injection-extraction. Dès 59 €. Devis gratuit sous 24h." },
      { property: "og:title", content: "Nettoyage moquette Toulouse — injection-extraction | Clean&Fresh" },
      { property: "og:description", content: "Nettoyage de moquette à domicile à Toulouse : shampouinage professionnel, taches, odeurs et acariens éliminés par injection-extraction. Dès 59 €. Devis gratuit sous 24h." },
      { property: "og:url", content: "https://cleanetfresh.fr/nettoyage-moquette-toulouse" },
      { name: "twitter:title", content: "Nettoyage moquette Toulouse — injection-extraction | Clean&Fresh" },
      { name: "twitter:description", content: "Nettoyage de moquette à domicile à Toulouse : shampouinage professionnel, taches, odeurs et acariens éliminés. Dès 59 €. Devis gratuit sous 24h." },
    ],
    links: [{ rel: "canonical", href: "https://cleanetfresh.fr/nettoyage-moquette-toulouse" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Accueil", item: "https://cleanetfresh.fr/" },
            { "@type": "ListItem", position: 2, name: "Nettoyage moquette Toulouse", item: "https://cleanetfresh.fr/nettoyage-moquette-toulouse" },
          ],
        }),
      },
    ],
  }),
  component: () => <ServicePage service={service} />,
});
