import type { Service } from '../data/site';

/** Never turn estimates, price ranges or unit rates into a fixed-price offer. */
export function fixedEuroPrice(value: string): string | undefined {
  const match = value.trim().match(/^(\d+(?:[ \u00a0\u202f]\d{3})*)(?:[,.](\d{1,2}))?\s*€$/);
  if (!match?.[1]) return undefined;
  return `${match[1].replace(/\s/g, '')}${match[2] ? `.${match[2].padEnd(2, '0')}` : ''}`;
}

export function buildServiceSchema(service: Service, siteUrl: string, companyName: string) {
  const pageUrl = `${siteUrl}${service.slug}`;
  const offers = (service.prices ?? []).flatMap(row => {
    const price = fixedEuroPrice(row.price);
    return price === undefined ? [] : [{
      '@type': 'Offer', name: row.label, price, priceCurrency: 'EUR', url: pageUrl,
      ...(row.note ? { description: row.note } : {}),
    }];
  });
  return {
    '@context': 'https://schema.org', '@type': 'Service', '@id': `${pageUrl}#service`,
    name: service.h1, description: service.metaDescription,
    provider: { '@type': 'LocalBusiness', '@id': `${siteUrl}/#business`, name: companyName, url: siteUrl },
    areaServed: 'Toulouse, Haute-Garonne', serviceType: service.navLabel, url: pageUrl,
    ...(offers.length ? { offers } : {}),
  };
}
