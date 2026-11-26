import { calendarDays, toulouseDay, type ForecastSlot, type ToulouseForecast } from './toulouseWeather';

const met = 'https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=43.604&lon=1.444';
const gfs = 'https://thredds.ucar.edu/thredds/ncss/grid/grib/NCEP/GFS/Global_0p25deg/Best';
const headers = { 'User-Agent': 'CleanFresh-Toulouse/1.0 (https://cleanetfresh.fr/contactez-nous)' };
const hour = 3_600_000;
type Period = {
  time: string;
  data: { instant: { details: { air_temperature?: number } }; next_1_hours?: { details: { precipitation_amount?: number } } };
};

async function get(url: string | URL) {
  const result = await fetch(url, { headers, signal: AbortSignal.timeout(18_000) });
  if (!result.ok) throw new Error('Weather provider unavailable');
  return result;
}

async function nearForecast(): Promise<ForecastSlot[]> {
  const response = await get(met);
  const data = await response.json();
  const periods: Period[] = data.properties.timeseries;
  return periods.filter(p => Number.isFinite(p.data.next_1_hours?.details.precipitation_amount)).map(p => ({
    time: new Date(p.time).toISOString(),
    temperature: p.data.instant.details.air_temperature ?? null,
    rain: p.data.next_1_hours!.details.precipitation_amount!,
    source: 'MET',
  }));
}

export function parseGridSeries(csv: string, variable: string) {
  const [header, ...lines] = csv.trim().split(/\r?\n/);
  if (!header?.includes(variable + '[unit=')) throw new Error('Unexpected forecast format');
  const series = new Map<string, number>();
  for (const line of lines) {
    const cols = line.split(',');
    const time = Date.parse(cols[0] ?? '');
    const raw = cols.at(-1)?.trim();
    const value = Number(raw);
    if (raw && Number.isFinite(time) && Number.isFinite(value)) series.set(new Date(time).toISOString(), value);
  }
  return series;
}

async function gridSeries(variable: string, first: string, last: string) {
  const url = new URL(gfs);
  url.search = new URLSearchParams({
    var: variable, latitude: '43.604', longitude: '1.444', time_start: first, time_end: last, accept: 'csv',
  }).toString();
  if (variable === 'Temperature_height_above_ground') url.searchParams.set('vertCoord', '2');
  return parseGridSeries(await (await get(url)).text(), variable);
}

async function loadForecast(now: Date): Promise<ToulouseForecast> {
  const days = calendarDays(now);
  const first = new Date(Date.parse(days[0] + 'T00:00:00Z') - 2 * hour).toISOString();
  const last = days[13] + 'T23:59:00Z';
  const [near, temperatures, rates] = await Promise.allSettled([
    nearForecast(), gridSeries('Temperature_height_above_ground', first, last), gridSeries('Precipitation_rate_surface', first, last),
  ]);
  const slots = new Map<string, ForecastSlot>();
  const temp = temperatures.status === 'fulfilled' ? temperatures.value : new Map<string, number>();
  const rain = rates.status === 'fulfilled' ? rates.value : new Map<string, number>();
  for (const time of new Set([...temp.keys(), ...rain.keys()])) {
    slots.set(time, { time, temperature: temp.has(time) ? temp.get(time)! - 273.15 : null,
      rain: rain.has(time) ? rain.get(time)! * 3600 : null, source: 'GFS' });
  }
  if (near.status === 'fulfilled') for (const point of near.value) slots.set(point.time, point);
  const supported = new Set(days);
  const cutoff = Math.floor(now.getTime() / hour) * hour;
  const forecast = [...slots.values()].filter(p => Date.parse(p.time) >= cutoff && supported.has(toulouseDay(new Date(p.time)))).sort((a,b) => a.time.localeCompare(b.time));
  if (!forecast.length) throw new Error('No current forecast');
  return { checkedAt: now.toISOString(), slots: forecast };
}

let cached: ToulouseForecast | undefined;
let retryAfter = 0;
let pending: Promise<ToulouseForecast> | undefined;
export async function weatherResponse(request: Request) {
  const headers = { 'X-Robots-Tag': 'noindex', 'Cache-Control': 'public, max-age=300, s-maxage=900, stale-while-revalidate=300' };
  if (request.method !== 'GET' && request.method !== 'HEAD') return new Response(null, { status: 405, headers: { Allow: 'GET, HEAD' } });
  const now = new Date();
  if (!cached || now.getTime() >= retryAfter) {
    pending ??= loadForecast(now).then(value => {
      cached = value;
      retryAfter = Date.now() + 900_000;
      return value;
    }).finally(() => { pending = undefined; });
    try { await pending; } catch {
      if (!cached || Date.now() - Date.parse(cached.checkedAt) > 3 * hour) {
        return Response.json({ error: 'Prévisions momentanément indisponibles' }, { status: 503, headers: { ...headers, 'Cache-Control': 'public, max-age=60' } });
      }
    }
  }
  return request.method === 'HEAD' ? new Response(null, { headers }) : Response.json(cached, { headers });
}
