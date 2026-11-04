import { createFileRoute } from "@tanstack/react-router";
import { SITE_URL } from "@/data/site";
import { buildLocalBusinessSchema } from "@/lib/businessSchema";
import { getCommuneData } from "@/data/communes";
import { LocalCityPage } from "@/components/site/LocalCityPage";

const CITY = "Plaisance-du-Touch";
const SLUG = "/nettoyage-plaisance-du-touch";
const TITLE = `Nettoyage à domicile à ${CITY} | Clean&Fresh`;
const DESC = getCommuneData(SLUG.slice(1))!.para1;

export const Route = createFileRoute("/nettoyage-plaisance-du-touch")({
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
  const commune = getCommuneData("nettoyage-plaisance-du-touch")!;
  return <LocalCityPage commune={commune} />;
}
