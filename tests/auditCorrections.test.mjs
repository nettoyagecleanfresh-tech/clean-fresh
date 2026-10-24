import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const read = path => readFileSync(path, 'utf8');

test('sofa service card hides the explanatory note without altering the offer', () => {
  assert.ok(read('src/components/site/ServicePage.tsx').includes('row.note && row.formuleId !== "canape-angle"'));
  assert.ok(read('src/data/bookingCatalogue.tsx').includes('99 € par canapé, d’angle ou en U.'));
});

test('service galleries reuse documented matching evidence and actual captions', () => {
  const source = read('src/components/site/ServicePage.tsx');
  assert.ok(source.includes('selectedPhotos(service.slug, bookingServiceId)'));
  assert.ok(source.includes('{photo.description}'));
  assert.ok(!source.includes('PHOTOS_BY_CATEGORY'));
});

test('quote validation connects every field to its error and focuses the first error', () => {
  const source = read('src/routes/contactez-nous.tsx');
  for (const field of ['nom', 'telephone', 'email', 'service', 'adresse', 'surface', 'dateSouhaitee', 'acces', 'photos', 'message']) {
    assert.ok(source.includes(`aria-invalid={!!errors["${field}"]}`));
    assert.ok(source.includes(`id="${field}-error"`));
  }
  assert.ok(source.includes('field.focus()'));
  assert.ok(source.includes('role="alert"'));
});
