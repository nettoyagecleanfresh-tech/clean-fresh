import { createFileRoute } from "@tanstack/react-router";
import { SITE_URL } from "@/data/site";
import { getCommuneData } from "@/data/communes";
import { LocalCityPage } from "@/components/site/LocalCityPage";

const CITY = "Escalquens";
const SLUG = "/nettoyage-escalquens";
const TITLE = `Nettoyage à domicile à ${CITY} | Clean&Fresh`;
const DESC = `Nettoyage canapé, matelas, tapis et auto à domicile à ${CITY}. Tarifs clairs, produits professionnels et devis gratuit sous 24h.`;

export const Route = createFileRoute("/nettoyage-escalquens")({
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
            { "@type": "ListItem", position: 1, name: "Accueil", item: "https://www.cleanetfresh.fr" },
            { "@type": "ListItem", position: 2, name: `Nettoyage ${CITY}`, item: `https://www.cleanetfresh.fr${SLUG}` },
          ],
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: "Clean&Fresh",
          url: `https://www.cleanetfresh.fr${SLUG}`,
          telephone: "+33767127500",
          areaServed: { "@type": "City", name: CITY },
          address: { "@type": "PostalAddress", addressLocality: "Toulouse", addressRegion: "Haute-Garonne", postalCode: "31000", addressCountry: "FR" },
          priceRange: "€€",
        }),
      },
    ],
  }),
  component: LocalPage,
});

function LocalPage() {
  const commune = getCommuneData("nettoyage-escalquens")!;
  return <LocalCityPage commune={commune} />;
}
