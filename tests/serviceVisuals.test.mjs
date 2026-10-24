import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync, statSync } from 'node:fs';

test('textile angle and U share one offer with an explicit per-sofa price and legacy links', () => {
  const catalogue = readFileSync('src/data/bookingCatalogue.tsx', 'utf8');
  assert.equal((catalogue.match(/id: "canape-angle"/g) || []).length, 1);
  assert.ok(!catalogue.includes('id: "canape-u"'));
  assert.ok(catalogue.includes('99 € par canapé, d’angle ou en U.'));
  const booking = readFileSync('src/routes/reserver.tsx', 'utf8');
  assert.ok(booking.includes('formuleParam === "canape-u" ? "canape-angle"'));
  for (const path of ['src/components/site/ServicePage.tsx', 'src/routes/formules.tsx', 'src/routes/reserver.tsx', 'src/routes/tarifs.tsx']) {
    assert.ok(readFileSync(path, 'utf8').includes('"canape-angle": "/images/canape/canape-u-angle.webp"'), path);
  }
});

test('all booking surfaces share the combined leather visuals and mattress inclusion label', () => {
  for (const path of ['src/components/site/ServicePage.tsx', 'src/routes/formules.tsx', 'src/routes/reserver.tsx', 'src/routes/tarifs.tsx']) {
    const source = readFileSync(path, 'utf8');
    assert.ok(source.includes('/images/cuir/canapes-u-et-angle.webp'), path);
    assert.ok(source.includes('/images/cuir/sieges-auto-5-places.webp'), path);
    assert.ok(source.includes('Deux faces incluses'), path);
    assert.ok(source.includes('text-blue-700'), path);
  }
  for (const file of ['canapes-u-et-angle.webp', 'sieges-auto-5-places.webp']) {
    const path = `public/images/cuir/${file}`;
    assert.ok(existsSync(path));
    assert.ok(statSync(path).size < 100_000, 'Keep catalogue assets lightweight');
  }
});
