import { useEffect, useState } from 'react';
import { CalendarDays, ChevronLeft, ChevronRight, CircleHelp, Cloud, CloudRain, Droplet, MapPin, Umbrella } from 'lucide-react';
import { calendarDays, cityZone, toulouseDay, type ToulouseForecast } from '@/lib/toulouseWeather';
import { dryAdvice, localHour, rainOverview, rainState } from '@/lib/autoRain';
import styles from './AutoWeather.module.css';

const daily = new Intl.DateTimeFormat('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', timeZone: cityZone });
const hourly = new Intl.DateTimeFormat('fr-FR', { hour: '2-digit', minute: '2-digit', timeZone: cityZone });
const checked = new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit', timeZone: cityZone });
const decimal = new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 1 });
const fallback = 'https://meteofrance.com/previsions-meteo-france/toulouse/31000';
const hourlyLabels = { wet: 'Pluie prévue', dry: 'Sans pluie', unknown: 'Incertain' };
const icons = { dry: Cloud, wet: CloudRain, mixed: CloudRain, unknown: CircleHelp };
const headlines = { wet: 'Pluie prévue', mixed: 'Pluie à certaines heures', dry: 'Aucune pluie prévue', unknown: 'Prévision incomplète' };

export function AutoWeather() {
  const [data, setData] = useState<ToulouseForecast | null>(null);
  const [failed, setFailed] = useState(false);
  const [index, setIndex] = useState(0);
  const [allHours, setAllHours] = useState(false);
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
  const daytime = points.filter(p => localHour(p) >= 8 && localHour(p) < 18);
  const showAll = allHours || !daytime.length;
  const visible = showAll ? points : daytime;
  const state = rainOverview(visible);
  const Icon = icons[state];
  const dryWindow = dryAdvice(daytime, now);
  const selectedDay = days[index] && daily.format(new Date(days[index] + 'T12:00:00Z'));
  const wet = state === 'wet' || state === 'mixed';
  const statusText = wet ? 'Le nettoyage auto est déconseillé aux heures de pluie.' : state === 'dry'
    ? 'Les prévisions indiquent un temps sec aux heures affichées.' : 'Les données disponibles ne permettent pas de confirmer un temps sec.';
  const setDay = (next: number) => { setIndex(next); setAllHours(false); };

  return <section id="meteo-auto" aria-labelledby="meteo-title" className={styles.section}>
    <header className={styles.top}>
      <div><p className={styles.location}><MapPin size={15} aria-hidden="true"/> Toulouse</p><h2 id="meteo-title">La météo de votre nettoyage auto</h2></div>
      <p className={styles.horizon}>Prévisions sur 14 jours</p>
    </header>
    <div className={styles.board}>
      {!data && <p role="status" className={styles.loading}>{failed ? 'Prévisions indisponibles pour le moment. Consultez Météo-France Toulouse ci-dessous.' : 'Chargement des prévisions de pluie…'}</p>}
      {data && <>
        <div className={styles.controls}>
          <label className={styles.dayPicker}><CalendarDays aria-hidden="true" size={19}/><span className="sr-only">Jour de l’intervention</span>
            <select value={index} onChange={e => setDay(Number(e.target.value))}>
              {days.map((day, i) => <option key={day} value={i}>{i === 0 ? 'Aujourd’hui · ' : i === 1 ? 'Demain · ' : ''}{daily.format(new Date(day + 'T12:00:00Z'))}</option>)}
            </select>
          </label>
          <div className={styles.arrows}><button type="button" disabled={index === 0} aria-label="Jour précédent" onClick={() => setDay(index - 1)}><ChevronLeft/></button><button type="button" disabled={index === days.length - 1} aria-label="Jour suivant" onClick={() => setDay(index + 1)}><ChevronRight/></button></div>
        </div>
        <div className={styles.verdict} data-state={state} aria-live="polite">
          <div className={styles.verdictCopy}><p className={styles.period}>{selectedDay} · {showAll ? 'heures disponibles' : 'entre 8 h et 18 h'}</p>
            <h3>{headlines[state]}</h3><p>{statusText}</p>
          </div>
          <div aria-hidden="true" className={styles.sky}><Icon strokeWidth={1.4}/></div>
        </div>
        <div className={styles.inner}>
          {dryWindow && <p className={styles.dryWindow}><span aria-hidden="true" className={styles.dot}/><span><strong>{dryWindow}</strong> · deux heures sans pluie prévues pour le nettoyage.</span></p>}
          <div className={styles.hoursHeading}><h3>Heure par heure</h3>
            {daytime.length > 0 && daytime.length < points.length && <div className={styles.switch} aria-label="Heures affichées" role="group">
              <button type="button" aria-pressed={!showAll} onClick={() => setAllHours(false)}>Journée</button>
              <button type="button" aria-pressed={showAll} onClick={() => setAllHours(true)}>24 h</button></div>}
          </div>
          {visible.length ? <ul aria-label="Prévisions aux heures de Toulouse" className={styles.grid}>
            {visible.map(p => {
              const condition = rainState(p.rain);
              const HourIcon = icons[condition];
              return <li key={p.time} data-state={condition}>
                <div className={styles.hour}><time dateTime={p.time}>{hourly.format(new Date(p.time))}</time><HourIcon size={22} aria-hidden="true"/></div>
                <strong>{hourlyLabels[condition]}</strong>
                <span className={styles.measure}>{p.temperature !== null && Math.round(p.temperature) + ' °C'}{p.temperature !== null && p.rain !== null && ' · '}{p.rain !== null && (p.rain > 0 && p.rain < 0.1 ? '< 0,1' : decimal.format(p.rain)) + ' mm/h'}</span>
              </li>;
            })}
          </ul> : <p role="status">Aucune heure disponible pour cette journée.</p>}
          <p className={styles.legend}><Droplet size={14} aria-hidden="true"/>Heure locale. Plus la date est éloignée, plus les heures de prévision sont espacées. Revérifiez la pluie la veille.</p>
        </div>
      </>}
      <div className={styles.notes}><Umbrella size={18} aria-hidden="true"/><p><strong>En hiver, privilégiez le matin ou le début d’après-midi.</strong> Après 18 h, l’obscurité complique le nettoyage.</p></div>
      <footer className={styles.footer}>{data && <span>Mis à jour le {checked.format(new Date(data.checkedAt))} · </span>}
        <a href="https://api.met.no/weatherapi/locationforecast/2.0/documentation">MET Norway</a> (<a href="https://creativecommons.org/licenses/by/4.0/">CC BY 4.0</a>) et <a href="https://www.unidata.ucar.edu/data/nsf-unidatas-thredds-data-server">NOAA GFS via Unidata</a>. <a href={fallback}>Météo-France Toulouse</a>
      </footer>
    </div>
  </section>;
}
