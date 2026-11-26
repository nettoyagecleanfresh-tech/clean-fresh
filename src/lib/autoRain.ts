import { cityZone, type ForecastSlot } from './toulouseWeather';

const clock = new Intl.DateTimeFormat('en-GB', { hour: '2-digit', hourCycle: 'h23', timeZone: cityZone });
export function localHour(point: ForecastSlot) {
  return Number(clock.format(new Date(point.time)));
}

export function rainState(amount: number | null) {
  if (amount === null || !Number.isFinite(amount) || amount < 0) return 'unknown';
  return amount > 0 ? 'wet' : 'dry';
}

export function rainOverview(points: ForecastSlot[]) {
  const states = points.map(p => rainState(p.rain));
  if (states.includes('wet')) return states.includes('dry') ? 'mixed' : 'wet';
  if (!states.length || states.includes('unknown')) return 'unknown';
  return 'dry';
}

export function dryAdvice(points: ForecastSlot[], now: Date) {
  // Only consecutive MET hourly periods support a continuous, two-hour dry window.
  const future = points.filter(p => Date.parse(p.time) >= now.getTime() && localHour(p) >= 8 && localHour(p) < 18);
  for (const [i, first] of future.entries()) {
    const second = future[i + 1];
    if (second && first.source === 'MET' && second.source === 'MET'
      && rainState(first.rain) === 'dry' && rainState(second.rain) === 'dry'
      && Date.parse(second.time) - Date.parse(first.time) === 3_600_000) {
      return 'De ' + localHour(first) + ' h à ' + (localHour(second) + 1) + ' h';
    }
  }
  return null;
}
