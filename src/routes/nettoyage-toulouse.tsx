import { createFileRoute } from "@tanstack/react-router";
import { SITE_URL } from "@/data/site";
import { buildLocalBusinessSchema } from "@/lib/businessSchema";
import { getCommuneData } from "@/data/communes";
import { LocalCityPage } from "@/components/site/LocalCityPage";

const CITY = "Toulouse";
const SLUG = "/nettoyage-toulouse";
const TITLE = `Nettoyage à domicile à ${CITY} : canapé, matelas, auto`;
const DESC = "Toutes les prestations à Toulouse : canapé, matelas, tapis, moquette, auto, vitres et logement. Réservez en ligne ou demandez un devis sous 24 h.";

export const Route = createFileRoute("/nettoyage-toulouse")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:url", content: `${SITE_URL}${SLUG}` },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESC },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}${SLUG}` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Accueil", item: "https://cleanetfresh.fr" },
            { "@type": "ListItem", position: 2, name: `Nettoyage ${CITY}`, item: `https://cleanetfresh.fr${SLUG}` },
          ],
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          ...buildLocalBusinessSchema(),
          areaServed: { "@type": "City", name: CITY },
        }),
      },
    ],
  }),
  component: LocalPage,
});

function LocalPage() {
  const commune = getCommuneData("nettoyage-toulouse")!;
  return <LocalCityPage commune={commune} />;
}
