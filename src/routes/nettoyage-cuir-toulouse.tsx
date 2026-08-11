import { createFileRoute } from "@tanstack/react-router";
import { ServicePage } from "@/components/site/ServicePage";
import { getService, SITE_URL } from "@/data/site";

const service = getService("/nettoyage-cuir-toulouse");

export const Route = createFileRoute("/nettoyage-cuir-toulouse")({
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
