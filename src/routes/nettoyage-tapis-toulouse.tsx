import { createFileRoute } from "@tanstack/react-router";
import { ServicePage } from "@/components/site/ServicePage";
import { getService, SITE_URL } from "@/data/site";

const tapis = getService("/nettoyage-tapis-toulouse");
const service = {
  ...tapis,
  priceNote: `${tapis.priceNote}\u2028Déplacement offert jusqu’à 20 km de Toulouse.`,
  metaDescription: "Nettoyage de tapis à domicile à Toulouse dès 49 €. Trois tapis à 99 €, jusqu’à 4 m² chacun. Choisissez votre formule et réservez votre créneau en ligne.",
};

export const Route = createFileRoute("/nettoyage-tapis-toulouse")({
  head: () => ({
    meta: [
      { title: service.metaTitle },
      { name: "description", content: service.metaDescription },
      { property: "og:title", content: service.metaTitle },
      { property: "og:description", content: service.metaDescription },
      { property: "og:url", content: `${SITE_URL}${service.slug}` },
      { name: "twitter:title", content: service.metaTitle },
      { name: "twitter:description", content: service.metaDescription },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}${service.slug}` }],
  }),
  component: () => <ServicePage service={service} />,
});
