import { createFileRoute } from "@tanstack/react-router";
import { SITE_URL } from "@/data/site";
import { getCommuneData } from "@/data/communes";
import { LocalCityPage } from "@/components/site/LocalCityPage";

const CITY = "Saint-Jean";
const SLUG = "/nettoyage-saint-jean";
const TITLE = `Nettoyage à domicile à ${CITY} — Canapé, Matelas, Tapis | Clean&Fresh`;
const DESC = `Nettoyage canapé dès 49 €, matelas dès 39 €, tapis dès 49 €, auto dès 69 € à ${CITY}. À domicile, produits Écolabel, 4.9★ Google. Devis gratuit sous 24h.`;

export const Route = createFileRoute("/nettoyage-saint-jean")({
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
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: "Clean&Fresh",
          url: `https://cleanetfresh.fr${SLUG}`,
          telephone: "+33767127500",
          areaServed: { "@type": "City", name: CITY },
          address: { "@type": "PostalAddress", addressLocality: "Toulouse", addressRegion: "Haute-Garonne", postalCode: "31000", addressCountry: "FR" },
          priceRange: "€€",
          aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "102" },
        }),
      },
    ],
  }),
  component: LocalPage,
});

function LocalPage() {
  const commune = getCommuneData("nettoyage-saint-jean")!;
  return <LocalCityPage commune={commune} />;
}
