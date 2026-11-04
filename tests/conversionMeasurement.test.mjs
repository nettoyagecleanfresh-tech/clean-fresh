import test from 'node:test';
import assert from 'node:assert/strict';
import { analyticsTestMode, customerAnalyticsAllowed, sanitizeAnalyticsEvent } from '../src/lib/analyticsPolicy.ts';
import { bookingConfirmedMetric } from '../src/lib/bookingMetrics.ts';
import { conversionMetric, quoteConfirmedMetric } from '../src/lib/conversionMetrics.ts';
import { journalConversion, reconcileConversions, retainedWebsiteBookings } from '../src/lib/metricJournal.ts';

function browser() {
  const stored = new Map();
  const events = [];
  globalThis.sessionStorage = { getItem: key => stored.get(key), setItem: (key, value) => stored.set(key, value) };
  globalThis.location = { origin: 'https://cleanetfresh.fr', pathname: '/reserver', search: '?analytics_test=0' };
  globalThis.window = { va: (kind, payload) => events.push({ kind, ...payload }), matchMedia: () => ({ matches: false }) };
  analyticsTestMode();
  location.search = '';
  return events;
}

test('test mode persists through navigation, excludes production metrics and can be disabled', () => {
  browser();
  assert.equal(customerAnalyticsAllowed(), true);
  location.search = '?analytics_test=1';
  assert.equal(customerAnalyticsAllowed(), false);
  location.search = ''; location.pathname = '/contactez-nous';
  assert.equal(customerAnalyticsAllowed(), false);
  location.search = '?analytics_test=0';
  assert.equal(customerAnalyticsAllowed(), true);
  location.origin = 'https://preview.vercel.app';
  assert.equal(customerAnalyticsAllowed(), false);
});

test('analytics URLs lose customer query strings and private management pages are discarded', () => {
  browser();
  const event = { type: 'pageview', url: 'https://cleanetfresh.fr/reserver?email=private@example.com#secret' };
  assert.deepEqual(sanitizeAnalyticsEvent(event), { type: 'pageview', url: 'https://cleanetfresh.fr/reserver' });
  assert.equal(event.url.includes('private'), true, 'original object is not mutated');
  assert.equal(sanitizeAnalyticsEvent({ url: 'https://cleanetfresh.fr/annuler?token=secret' }), null);
  assert.equal(sanitizeAnalyticsEvent({ url: 'https://preview.vercel.app/reserver' }), null);
  location.pathname = '/annuler';
  assert.equal(sanitizeAnalyticsEvent(event), null);
});

test('clicks never become completions; only successful acknowledged IDs count once', () => {
  const events = browser();
  conversionMetric('conversion_cta', { action: 'booking' });
  bookingConfirmedMetric({ success: false, gcal_event_id: 'booking_failed' }, 'form');
  bookingConfirmedMetric({ success: true, gcal_event_id: null }, 'form');
  bookingConfirmedMetric({ success: true, gcal_event_id: 'booking_actual' }, 'form');
  bookingConfirmedMetric({ success: true, gcal_event_id: 'booking_actual' }, 'assistant');
  quoteConfirmedMetric({ success: false, measurement_id: 'quote_failed' }, false);
  quoteConfirmedMetric({ success: true, measurement_id: 'quote_actual' }, true);
  quoteConfirmedMetric({ success: true, measurement_id: 'quote_actual' }, true);
  assert.deepEqual(events.map(event => event.name), ['conversion_cta', 'booking_complete', 'quote_submitted']);
  assert.doesNotMatch(JSON.stringify(events), /booking_actual|quote_actual|purchase|revenue/);
  location.search = '?analytics_test=1';
  bookingConfirmedMetric({ success: true, gcal_event_id: 'booking_testing' }, 'form');
  quoteConfirmedMetric({ success: true, measurement_id: 'quote_testing' }, false);
  assert.equal(events.length, 3);
});

test('storage, device detection and analytics delivery failures cannot break confirmation', () => {
  browser();
  globalThis.sessionStorage = { getItem() { throw Error('blocked'); }, setItem() { throw Error('blocked'); } };
  window.matchMedia = () => { throw Error('unavailable'); };
  window.va = () => { throw Error('blocked'); };
  assert.doesNotThrow(() => bookingConfirmedMetric({ success: true, gcal_event_id: 'booking_failure_safe' }, 'form'));
  assert.doesNotThrow(() => quoteConfirmedMetric({ success: true, measurement_id: 'quote_failure_safe' }, false));
});

test('production journal uses stable opaque IDs and reconciles test, duplicate and cancelled bookings', async () => {
  const originalEnv = process.env.VERCEL_ENV;
  const originalInfo = console.info;
  const rows = [];
  console.info = value => rows.push(JSON.parse(value));
  try {
    process.env.VERCEL_ENV = 'preview';
    await journalConversion('booking_confirmed', 'preview_id');
    assert.equal(rows.length, 0);
    process.env.VERCEL_ENV = 'production';
    await journalConversion('booking_confirmed', 'retained_id');
    await journalConversion('booking_confirmed', 'retained_id');
    await journalConversion('booking_cancelled', 'cancelled_id');
    await journalConversion('booking_confirmed', 'cancelled_id');
    await journalConversion('booking_confirmed', 'test_id', true);
    await journalConversion('quote_submitted', 'quote_id');
    await journalConversion('quote_submitted', 'quote_id');
    assert.doesNotMatch(JSON.stringify(rows), /retained_id|cancelled_id|test_id|quote_id/);
    assert.deepEqual(reconcileConversions(rows), { confirmedBookings: 2, cancelledBookings: 1, retainedBookings: 1, submittedQuotes: 1, excludedTests: 1 });
    console.info = () => { throw Error('logging unavailable'); };
    await assert.doesNotReject(journalConversion('booking_confirmed', 'safe_id'));
  } finally {
    console.info = originalInfo;
    if (originalEnv === undefined) delete process.env.VERCEL_ENV; else process.env.VERCEL_ENV = originalEnv;
  }
});

test('Calendar snapshot counts retained website bookings once and excludes tests and cancelled IDs', () => {
  const website = (id, isTest = false) => ({ id, status: 'confirmed', extendedProperties: { private: { cfAnalyticsSource: 'website', cfAnalyticsTest: String(isTest) } } });
  assert.equal(retainedWebsiteBookings([
    website('one'), website('one'), website('two'), { id: 'two', status: 'cancelled' },
    website('testing', true), { id: 'manual', status: 'confirmed' },
    { id: 'cancelled-first', status: 'cancelled' }, website('cancelled-first'),
  ]), 1);
});
