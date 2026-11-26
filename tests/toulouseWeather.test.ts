import { test } from 'node:test';
import assert from 'node:assert/strict';
import { calendarDays } from '../src/lib/toulouseWeather.ts';
import { parseGridSeries } from '../src/lib/toulouseWeather.server.ts';

test('fourteen local calendar dates across clock changes and midnight', () => {
  for (const [utc, first, last] of [
    ['2026-03-25T23:30:00Z', '2026-03-26', '2026-04-08'],
    ['2026-10-22T22:30:00Z', '2026-10-23', '2026-11-05'],
  ] as const) {
    const days = calendarDays(new Date(utc));
    assert.equal(new Set(days).size, 14);
    assert.equal(days[0], first);
    assert.equal(days.at(-1), last);
  }
});

test('missing rainfall stays missing, measured zero is retained', () => {
  const series = parseGridSeries('time,rate[unit="kg.m-2.s-1"]\n2026-11-26T09:00:00Z,0.0\n2026-11-26T12:00:00Z,NaN\n2026-11-26T15:00:00Z,\n', 'rate');
  assert.equal(series.size, 1);
  assert.equal(series.get('2026-11-26T09:00:00.000Z'), 0);
});

import { dryAdvice, rainOverview, rainState } from '../src/lib/autoRain.ts';
import type { ForecastSlot } from '../src/lib/toulouseWeather.ts';
test('any forecast rain is flagged, missing data cannot imply a dry day', () => {
  assert.equal(rainState(0.001), 'wet');
  assert.equal(rainState(null), 'unknown');
  const p = (rain: number | null): ForecastSlot => ({ rain, temperature: 6, time: '2026-11-26T08:00:00Z', source: 'MET' });
  assert.equal(rainOverview([p(0), p(0.01)]), 'mixed');
  assert.equal(rainOverview([p(0), p(null)]), 'unknown');
  assert.equal(rainOverview([p(0)]), 'dry');
  assert.equal(rainOverview([]), 'unknown');
});
test('dry recommendations require two consecutive future local daytime hours with hourly coverage', () => {
  const now = new Date('2026-11-26T05:00:00Z');
  const first: ForecastSlot = { rain: 0, temperature: 6, time: '2026-11-26T08:00:00Z', source: 'MET' };
  const second: ForecastSlot = { ...first, time: '2026-11-26T09:00:00Z' };
  assert.equal(dryAdvice([first, second], now), 'De 9 h à 11 h');
  assert.equal(dryAdvice([first, { ...second, rain: 0.001 }], now), null);
  assert.equal(dryAdvice([first, { ...second, source: 'GFS' }], now), null);
  assert.equal(dryAdvice([first, { ...second, time: '2026-11-26T12:00:00Z' }], now), null);
  assert.equal(dryAdvice([first,second], new Date('2026-11-26T08:05:00Z')), null);
});
