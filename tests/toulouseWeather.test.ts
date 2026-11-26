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
