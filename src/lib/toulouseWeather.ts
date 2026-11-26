export type ForecastSlot = {
  time: string;
  temperature: number | null;
  rain: number | null;
  source: 'MET' | 'GFS';
};
export type ToulouseForecast = { checkedAt: string; slots: ForecastSlot[] };

export const cityZone = 'Europe/Paris';
const dayKey = new Intl.DateTimeFormat('en-CA', {
  year: 'numeric', month: '2-digit', day: '2-digit', timeZone: cityZone,
});
export function toulouseDay(date: Date) {
  return dayKey.format(date);
}

// Starting at noon UTC keeps calendar arithmetic stable through both clock changes.
export function calendarDays(now: Date) {
  const day = Date.parse(toulouseDay(now) + 'T12:00:00Z');
  return Array.from({ length: 14 }, (_, index) => toulouseDay(new Date(day + index * 86_400_000)));
}
