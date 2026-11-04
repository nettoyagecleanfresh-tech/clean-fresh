import { buildLocalBusinessSchema } from "@/lib/businessSchema";
import { SITE_URL, COMPANY, type Service } from "@/data/site";
import { buildServiceSchema } from "@/lib/serviceSchema";

// ──────────────────────────────────────────────────────────────────────────────
// SchemaOrg — JSON-LD injection component
// Renders structured data scripts for Google rich results.
// Usage:
//   <SchemaLocalBusiness />          → homepage only
//   <SchemaService service={...} />  → each service page (via ServicePage)
// ──────────────────────────────────────────────────────────────────────────────

/** LocalBusiness — homepage only */
export function SchemaLocalBusiness() {
  const schema = buildLocalBusinessSchema();

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/** Service + Offers — one per service page */
export function SchemaService({ service }: { service: Service }) {
  const schema = buildServiceSchema(service, SITE_URL, COMPANY.name);

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/** FAQPage — from service.faq array */
export function SchemaFAQ({ service }: { service: Service }) {
  if (!service.faq || service.faq.length === 0) return null;

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: service.faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/** BreadcrumbList — for service pages */
export function SchemaBreadcrumb({ service }: { service: Service }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Accueil",
        item: `${SITE_URL}/`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Nos services",
        item: `${SITE_URL}/nos-services`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: service.short,
        item: `${SITE_URL}${service.slug}`,
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
