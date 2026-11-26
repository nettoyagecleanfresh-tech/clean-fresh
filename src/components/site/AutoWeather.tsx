import { useEffect, useState } from 'react';
import { CalendarDays, ChevronLeft, ChevronRight, CloudRain } from 'lucide-react';
import { calendarDays, cityZone, toulouseDay, type ToulouseForecast } from '@/lib/toulouseWeather';

const daily = new Intl.DateTimeFormat('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', timeZone: cityZone });
const hourly = new Intl.DateTimeFormat('fr-FR', { hour: '2-digit', minute: '2-digit', timeZone: cityZone });
const checked = new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit', timeZone: cityZone });
const decimal = new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 1 });
const fallback = 'https://meteofrance.com/previsions-meteo-france/toulouse/31000';
export function AutoWeather() {
  const [data, setData] = useState<ToulouseForecast | null>(null);
  const [failed, setFailed] = useState(false);
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const controller = new AbortController();
    async function refresh() {
      try {
        const response = await fetch('/meteo-toulouse.json', { signal: controller.signal });
        if (!response.ok) throw new Error();
        const result: ToulouseForecast = await response.json();
        if (!Array.isArray(result.slots) || !result.slots.length) throw new Error();
        setData(result); setFailed(false);
      } catch { if (!controller.signal.aborted) { setFailed(true); setData(null); } }
    }
    void refresh();
    const timer = setInterval(refresh, 900_000);
    return () => { clearInterval(timer); controller.abort(); };
  }, []);
  const now = new Date();
  const days = data ? calendarDays(now) : [];
  const points = data?.slots.filter(p => toulouseDay(new Date(p.time)) === days[index] && Date.parse(p.time) >= Math.floor(now.getTime() / 3_600_000) * 3_600_000) ?? [];
  return <section id="meteo-auto" aria-labelledby="meteo-title" className="mx-auto max-w-4xl scroll-mt-20 px-4 py-7">
    <div className="overflow-hidden rounded-2xl border border-sky-200 bg-white text-slate-900 shadow-sm">
      <div className="bg-sky-950 px-5 py-5 text-white sm:px-7">
        <h2 id="meteo-title" className="flex items-center gap-3 text-xl font-bold sm:text-2xl"><CloudRain className="size-7 shrink-0 text-sky-200" aria-hidden="true"/>Météo à Toulouse pour votre nettoyage auto</h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-sky-100">Consultez la pluie prévue sur 14 jours avant de choisir votre créneau. En hiver, réservez le matin ou en début d’après-midi. Après 18 h, l’obscurité complique le nettoyage de l’habitacle.</p>
      </div>
      <div className="space-y-4 p-5 sm:px-7">
        {!data && <p role="status" className="text-sm">{failed ? 'Les prévisions sont momentanément indisponibles. Vous pouvez consulter Météo-France ci-dessous.' : 'Chargement des prévisions de Toulouse…'}</p>}
        {data && <>
          <div className="flex flex-wrap items-end justify-between gap-3">
            <label className="min-w-0 flex-1 text-sm font-semibold"><span className="mb-1 flex items-center gap-2"><CalendarDays className="size-4" aria-hidden="true"/>Jour de l’intervention</span>
              <select value={index} onChange={e => setIndex(Number(e.target.value))} className="min-h-11 w-full rounded-lg border border-slate-300 bg-white px-2 text-base">
                {days.map((day, i) => <option key={day} value={i}>{i === 0 ? 'Aujourd’hui · ' : ''}{daily.format(new Date(day + 'T12:00:00Z'))}</option>)}
              </select>
            </label>
            <div className="flex gap-1">{[[-1,'Jour précédent'],[1,'Jour suivant']].map(([n, label]) => <button key={label} type="button" aria-label={String(label)} disabled={index + Number(n) < 0 || index + Number(n) >= days.length} onClick={() => setIndex(index + Number(n))} className="grid size-11 place-items-center rounded-lg border border-slate-300 text-sky-900 disabled:opacity-30">{n === -1 ? <ChevronLeft/> : <ChevronRight/>}</button>)}</div>
          </div>
          {points.length ? <ul aria-label="Prévisions aux heures de Toulouse" className="grid grid-cols-3 gap-2 sm:grid-cols-6">
            {points.map(p => <li key={p.time} className={'rounded-lg border px-2 py-2.5 text-center ' + (p.rain !== null && p.rain >= 0.1 ? 'border-sky-300 bg-sky-50' : 'border-slate-200 bg-white')}>
              <time dateTime={p.time} className="block text-sm font-bold">{hourly.format(new Date(p.time))}</time>
              <span className="mt-1 block text-sm">{p.temperature === null ? '—' : Math.round(p.temperature) + ' °C'}</span>
              <span className="mt-1 block text-xs text-sky-900">{p.rain === null ? 'Pluie inconnue' : p.rain > 0 && p.rain < 0.1 ? '< 0,1 mm/h' : decimal.format(p.rain) + ' mm/h'}</span>
            </li>)}
          </ul> : <p role="status" className="text-sm">Aucune prévision disponible pour les heures restantes de cette journée.</p>}
          <p className="text-xs leading-relaxed text-slate-600">Heures de Toulouse. Pluie en millimètres par heure. Le détail est horaire à courte échéance, puis espacé selon le modèle. La deuxième semaine donne une tendance à revérifier la veille. Données consultées le {checked.format(new Date(data.checkedAt))}.</p>
        </>}
        <div className="flex flex-wrap justify-between gap-2 border-t border-slate-200 pt-3 text-xs leading-relaxed text-slate-600">
          <span>Sources météo · <a className="underline" href="https://api.met.no/weatherapi/locationforecast/2.0/documentation">MET Norway</a> (<a className="underline" href="https://creativecommons.org/licenses/by/4.0/">CC BY 4.0</a>) et <a className="underline" href="https://www.unidata.ucar.edu/data/nsf-unidatas-thredds-data-server">NOAA GFS via Unidata</a>.</span>
          <a href={fallback} className="font-semibold text-sky-900 underline">Consulter Météo-France Toulouse</a>
        </div>
      </div>
    </div>
  </section>;
}
