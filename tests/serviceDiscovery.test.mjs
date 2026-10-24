import test from 'node:test';
import assert from 'node:assert/strict';
import { relatedServices } from '../src/lib/relatedServices.ts';
import { serviceIntent } from '../src/lib/serviceIntent.ts';
import { readFileSync } from 'node:fs';

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
  assert.equal(links.length, 5);
  assert.ok(links.every(link => link.includes('search={quoteSearch}')));
  for (const [path, service] of [['fin-de-bail-toulouse', 'bail'], ['de-fin-de-chantier-toulouse', 'chantier'], ['diogene-toulouse', 'diogene']]) {
    assert.deepEqual(serviceIntent(`/nettoyage-${path}`), { kind: 'quote', service });
  }
});
