import test from 'node:test';
import assert from 'node:assert/strict';
import { audienceChoice, rememberAudience, setAudienceEnabled, googleMetric, GA_ID, CONSENT_KEY } from '../src/lib/googleAnalytics.ts';

test('Google measurement is opt-in, deduplicated, query-free and revocable', () => {
  const store = new Map(); const scripts = [];
  globalThis.localStorage = { getItem: key => store.get(key), setItem: (key, value) => store.set(key, value) };
  globalThis.window = {};
  globalThis.location = { origin: 'https://cleanetfresh.fr', pathname: '/reserver', search: '?email=private@example.com' };
  globalThis.document = { referrer: 'https://www.google.com/search?q=private', createElement: () => ({}), head: { appendChild: s => scripts.push(s) } };
  assert.equal(audienceChoice(), null);
  setAudienceEnabled(false, '/reserver'); googleMetric('booking_complete', {});
  assert.equal(scripts.length, 0); assert.equal(window.gtag, undefined);
  for (const origin of ['https://preview.vercel.app', 'http://localhost:3000', 'https://cleanetfresh.fr.evil.test']) {
    location.origin = origin;
    setAudienceEnabled(true, '/reserver');
    googleMetric('booking_complete', {});
    assert.equal(scripts.length, 0);
    assert.equal(window.gtag, undefined);
  }
  location.origin = 'https://cleanetfresh.fr';
  rememberAudience(true); assert.equal(audienceChoice(), true);
  setAudienceEnabled(true, '/reserver'); setAudienceEnabled(true, '/reserver');
  assert.equal(scripts.length, 1);
  const events = () => window.dataLayer.map(args => Array.from(args));
  assert.equal(events().filter(e => e[1] === 'page_view').length, 1);
  assert.equal(events().find(e => e[0] === 'config')[2].send_page_view, false);
  googleMetric('booking_complete', { booking_channel: 'form' });
  assert.equal(events().filter(e => e[1] === 'booking_complete').length, 1);
  assert.ok(!JSON.stringify(events()).includes('private'));
  setAudienceEnabled(true, '/envoyer-avis'); googleMetric('booking_complete', {});
  assert.equal(window[`ga-disable-${GA_ID}`], true);
  assert.equal(events().filter(e => e[1] === 'booking_complete').length, 1);
  setAudienceEnabled(false, '/'); googleMetric('quote_submitted', {});
  assert.equal(events().filter(e => e[1] === 'quote_submitted').length, 0);
  rememberAudience(false); assert.equal(audienceChoice(), false);
  store.set(CONSENT_KEY, JSON.stringify({allowed:true, at:0})); assert.equal(audienceChoice(), null);
  store.set(CONSENT_KEY, JSON.stringify({allowed:true, at:Date.now()+60000})); assert.equal(audienceChoice(), null);
  store.set(CONSENT_KEY, JSON.stringify({allowed:true, at:String(Date.now())})); assert.equal(audienceChoice(), null);
});
