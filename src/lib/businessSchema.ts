import { COMPANY, SERVICES, SITE_URL } from '../data/site';

/** One public business identity, shared by the homepage and reusable schema. */
export function buildLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${SITE_URL}/#business`,
    name: COMPANY.name,
    description: 'Entreprise artisanale de nettoyage à domicile à Toulouse et dans son agglomération : textiles, intérieur automobile et remise en état de logements.',
    url: SITE_URL,
    telephone: COMPANY.phoneHref.replace('tel:', ''),
    email: COMPANY.email,
    logo: `${SITE_URL}/logo.webp`,
    image: `${SITE_URL}/realisations/photo-02.webp`,
    priceRange: '€€',
    currenciesAccepted: 'EUR',
    paymentAccepted: 'Cash, Credit Card',
    address: {
      '@type': 'PostalAddress',
      streetAddress: COMPANY.streetAddress,
      addressLocality: COMPANY.city,
      addressRegion: COMPANY.region,
      postalCode: COMPANY.postalCode,
      addressCountry: 'FR',
    },
    // The centre of Toulouse is a service area, not the business's precise location.
    areaServed: { '@type': 'AdministrativeArea', name: 'Haute-Garonne', containedInPlace: { '@type': 'Country', name: 'France' } },
    openingHoursSpecification: [{
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '08:00',
      closes: '21:00',
    }],
    sameAs: [
      'https://www.instagram.com/cleanetfresh31',
      'https://www.facebook.com/profile.php?id=61579620873055',
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Services de nettoyage à Toulouse',
      itemListElement: SERVICES.map(service => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service', '@id': `${SITE_URL}${service.slug}#service`,
          name: service.h1, url: `${SITE_URL}${service.slug}`,
        },
      })),
    },
  };
}
