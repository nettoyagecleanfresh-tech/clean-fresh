import test from 'node:test';
import assert from 'node:assert/strict';
import { relatedServices } from '../src/lib/relatedServices.ts';
import { serviceIntent } from '../src/lib/serviceIntent.ts';
import { readFileSync } from 'node:fs';
import { SERVICES, SITE_URL } from '../src/data/site.ts';

test('every service has distinct metadata, a route, and a canonical sitemap entry', () => {
  const sitemap = readFileSync(new URL('../public/sitemap.xml', import.meta.url), 'utf8');
  for (const field of ['slug', 'metaTitle', 'metaDescription', 'h1']) {
    assert.equal(new Set(SERVICES.map(service => service[field])).size, SERVICES.length, field);
    assert.ok(SERVICES.every(service => service[field]?.trim()), field);
  }
  for (const service of SERVICES) {
    assert.ok(sitemap.includes(`<loc>${SITE_URL}${service.slug}</loc>`), service.slug);
    const route = readFileSync(new URL(`../src/routes${service.slug}.tsx`, import.meta.url), 'utf8');
    assert.match(route, /rel: "canonical"/);
    assert.match(route, /service.metaTitle/);
    assert.match(route, /service.metaDescription/);
    assert.ok(service.faq?.every(item => item.q.trim() && item.a.trim()));
    const intent = serviceIntent(service.slug);
    assert.equal(intent.kind, service.booking ? 'booking' : 'quote', service.slug);
    assert.ok(intent.service, service.slug);
    assert.ok(relatedServices(SERVICES, service).length > 0);
  }
});

test('related services favour context without self links or duplicates', () => {
  const services = Array.from({ length: 15 }, (_, index) => ({ slug: `/service-${index}`, group: index < 6 ? 'textile' : 'building' }));
  for (const current of services) {
    const result = relatedServices(services, current);
    assert.equal(result.length, 6);
    assert.equal(new Set(result.map(service => service.slug)).size, 6);
    assert.ok(result.every(service => service.slug !== current.slug));
    assert.equal(result[0].group, current.group);
  }
  assert.ok(relatedServices(services, services[13]).includes(services[14]));
  assert.deepEqual(relatedServices([services[0]], services[0]), []);
});

test('all service-page quote links preserve the selected quote category', () => {
  const source = readFileSync(new URL('../src/components/site/ServicePage.tsx', import.meta.url), 'utf8');
  const links = source.match(/<Link to="\/contactez-nous"[^>]*>/g);
  assert.equal(links.length, 6);
  assert.ok(links.every(link => link.includes('search={quoteSearch}')));
  for (const [path, service] of [['fin-de-bail-toulouse', 'bail'], ['de-fin-de-chantier-toulouse', 'chantier'], ['diogene-toulouse', 'diogene']]) {
    assert.deepEqual(serviceIntent(`/nettoyage-${path}`), { kind: 'quote', service });
  }
});
