import { SITE_URL, COMPANY, GOOGLE_REVIEW_COUNT, type Service } from "@/data/site";

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
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "19:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Saturday", "Sunday"],
        opens: "09:00",
        closes: "18:00",
      },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: String(GOOGLE_REVIEW_COUNT),
      bestRating: "5",
      worstRating: "1",
    },
    sameAs: [
      "https://www.instagram.com/cleanetfresh31",
      "https://www.facebook.com/profile.php?id=61579620873055",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Services de nettoyage",
      itemListElement: [
        { "@type": "Offer", "itemOffered": { "@type": "Service", name: "Nettoyage canapé Toulouse" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", name: "Nettoyage matelas Toulouse" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", name: "Nettoyage fin de bail Toulouse" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", name: "Nettoyage auto Toulouse" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", name: "Nettoyage Diogène Toulouse" } },
      ],
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
  const pageUrl = `${SITE_URL}${service.slug}`;

  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${pageUrl}#service`,
    name: service.h1,
    description: service.metaDescription,
    provider: { "@id": `${SITE_URL}/#business` },
    areaServed: "Toulouse, Haute-Garonne",
    serviceType: service.group === "textile" ? "Nettoyage textile" : "Nettoyage bâtiment",
    url: pageUrl,
  };

  // Add offers if prices are defined
  if (service.prices && service.prices.length > 0) {
    schema.offers = service.prices.map((p) => ({
      "@type": "Offer",
      name: p.label,
      price: p.price.replace(/[^0-9]/g, ""),
      priceCurrency: "EUR",
      availability: "https://schema.org/InStock",
    }));
  }

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
