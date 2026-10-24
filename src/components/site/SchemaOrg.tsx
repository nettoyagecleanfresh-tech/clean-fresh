import { SITE_URL, COMPANY, SERVICES, type Service } from "@/data/site";
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
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SITE_URL}/#business`,
    name: COMPANY.name,
    description:
      "Entreprise de nettoyage professionnelle à Toulouse et Haute-Garonne. Canapé, matelas, tapis, auto, vitres, façade, fin de chantier, fin de bail, Diogène.",
    url: SITE_URL,
    telephone: COMPANY.phoneHref.replace("tel:", ""),
    email: COMPANY.email,
    logo: `${SITE_URL}/logo.png`,
    image: `${SITE_URL}/realisations/photo-02.webp`,
    priceRange: "€€",
    currenciesAccepted: "EUR",
    paymentAccepted: "Cash, Credit Card",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Toulouse",
      addressRegion: "Haute-Garonne",
      postalCode: "31000",
      addressCountry: "FR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 43.6047,
      longitude: 1.4442,
    },
    areaServed: {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: 43.6047,
        longitude: 1.4442,
      },
      geoRadius: "30000",
    },
    openingHoursSpecification: [{
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "08:00",
      closes: "21:00",
    }],
    sameAs: [
      "https://www.instagram.com/cleanetfresh31",
      "https://www.facebook.com/profile.php?id=61579620873055",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Services de nettoyage",
      itemListElement: SERVICES.map(service => ({
        "@type": "Offer",
        "itemOffered": { "@type": "Service", "@id": `${SITE_URL}${service.slug}#service`, name: service.h1, url: `${SITE_URL}${service.slug}` },
      })),
    },
  };

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
