import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { serviceIntent } from '../src/lib/serviceIntent.ts';

test('service-aware CTAs keep booking and quote journeys separate', () => {
  assert.deepEqual(serviceIntent('/nettoyage-canape-toulouse'), { kind: 'booking', service: 'canape' });
  assert.deepEqual(serviceIntent('/nettoyage-auto-a-domicile-toulouse/'), { kind: 'booking', service: 'auto' });
  assert.deepEqual(serviceIntent('/nettoyage-de-fin-de-chantier-toulouse'), { kind: 'quote', service: 'chantier' });
  assert.deepEqual(serviceIntent('/nettoyage-diogene-toulouse'), { kind: 'quote', service: 'diogene' });
  assert.deepEqual(serviceIntent('/'), { kind: 'booking', service: undefined });
  assert.deepEqual(serviceIntent('/unknown-personal-value'), { kind: 'booking', service: undefined });
});

test('both obsolete chantier URLs permanently redirect to the current service', () => {
  const { redirects } = JSON.parse(readFileSync(new URL('../vercel.json', import.meta.url), 'utf8'));
  for (const source of ['/nettoyage-de-fin-de-chantier', '/nettoyage-de-fin-de-chantier/']) {
    assert.deepEqual(redirects.find(rule => rule.source === source), {
      source, destination: '/nettoyage-de-fin-de-chantier-toulouse', permanent: true,
    });
  }
});

test('unpaid bookings never emit purchase revenue', () => {
  const source = readFileSync(new URL('../src/routes/reserver.tsx', import.meta.url), 'utf8');
  assert.doesNotMatch(source, /event:\s*["']purchase["']/);
  assert.match(source, /!serverResult.success \|\| !serverResult.gcal_event_id/);
  assert.ok(source.indexOf('!serverResult.success') < source.indexOf('setDone(true)'));
});

test('sitemap contains unique canonical URLs and no private booking routes', () => {
  const xml = readFileSync(new URL('../public/sitemap.xml', import.meta.url), 'utf8');
  const urls = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map(match => match[1]);
  assert.equal(urls.length, new Set(urls).size);
  assert.ok(urls.length >= 62);
  for (const value of urls) {
    const url = new URL(value);
    assert.equal(url.origin, 'https://cleanetfresh.fr');
    assert.equal(url.search, '');
    assert.doesNotMatch(url.pathname, /^\/(reserver|annuler|upsell|envoyer-avis)(\/|$)/);
  }
});
