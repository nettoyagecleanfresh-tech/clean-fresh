import test from 'node:test';
import assert from 'node:assert/strict';
import { SERVICES, SITE_URL, COMPANY } from '../src/data/site.ts';
import { buildServiceSchema, fixedEuroPrice } from '../src/lib/serviceSchema.ts';

test('schema uses precise service names and truthful prices for all 15 services', () => {
  assert.equal(SERVICES.length, 15);
  for (const service of SERVICES) {
    const schema = buildServiceSchema(service, SITE_URL, COMPANY.name);
    assert.equal(schema.serviceType, service.navLabel);
    assert.equal(schema.provider.name, COMPANY.name);
    assert.equal(schema.url, SITE_URL + service.slug);
    assert.equal(schema.offers?.length ?? 0, service.prices?.length ?? 0);
    for (const offer of schema.offers ?? []) {
      assert.ok(Number(offer.price) > 0);
      assert.equal(offer.url, schema.url);
      assert.equal(offer.priceCurrency, 'EUR');
      assert.equal(offer.availability, undefined);
    }
  }
});

test('schema never invents fixed prices for quotations or destroys decimal amounts', () => {
  assert.equal(fixedEuroPrice('49 €'), '49');
  assert.equal(fixedEuroPrice('1 250,50 €'), '1250.50');
  assert.equal(fixedEuroPrice('49.5 €'), '49.50');
  for (const value of ['Sur devis', 'À partir de 49 €', '49–99 €', '15 €/m²', '-49 €', '']) {
    assert.equal(fixedEuroPrice(value), undefined, value);
  }
});
