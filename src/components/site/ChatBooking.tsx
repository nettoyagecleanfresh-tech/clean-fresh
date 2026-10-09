import { useEffect, useRef, useState } from 'react';
import { SERVICES, type CartItem, type ServiceDef, type Formule } from '@/data/bookingCatalogue';
import { optionDescription } from '@/data/optionDescriptions';
import { fetchBusySlots, buildSlots } from '@/lib/gcal';
import { createBookingServerFn } from '@/lib/bookingServerFn';
import { bookingTotals, bookingItems, confirmAssistantBooking } from '@/lib/assistantBooking';
import { answerCustomer } from '@/lib/chatAssistant';

type Stage = 'service' | 'formula' | 'options' | 'basket' | 'date' | 'details' | 'review' | 'done';
const fields = [
  ['name', 'Quel est votre nom complet ?', 'text', 'name'],
  ['phone', 'Quel numéro pouvons-nous joindre ?', 'tel', 'tel'],
  ['email', 'À quelle adresse envoyer la confirmation ?', 'email', 'email'],
  ['street', 'Quel est le numéro et le nom de la rue ?', 'text', 'street-address'],
  ['zip', 'Quel est le code postal ?', 'text', 'postal-code'],
  ['city', 'Dans quelle ville intervenons-nous ?', 'text', 'address-level2'],
] as const;
const dateKey = (date: Date) => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
const fromDate = (date: string) => new Date(`${date}T12:00:00`);
const button = 'w-full rounded-xl border border-primary/25 bg-background px-3 py-3 text-left text-sm hover:bg-primary/5 focus-visible:ring-2 focus-visible:ring-primary disabled:opacity-40';
const primary = 'w-full rounded-xl bg-primary px-3 py-3 text-sm font-semibold text-primary-foreground disabled:opacity-40';

export function ChatBooking({ onBusy }: { onBusy: (busy: boolean) => void }) {
  const [stage, setStage] = useState<Stage>('service');
  const [service, setService] = useState<ServiceDef>();
  const [formula, setFormula] = useState<Formule>();
  const [options, setOptions] = useState<string[]>([]);
  const [items, setItems] = useState<CartItem[]>([]);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [slots, setSlots] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(0);
  const [error, setError] = useState('');
  const [field, setField] = useState(0);
  const [details, setDetails] = useState({ name: '', phone: '', email: '', street: '', zip: '', city: '' });
  const [access, setAccess] = useState({ electricity: '', water: '' });
  const [sending, setSending] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [help, setHelp] = useState('');
  const [helpAnswer, setHelpAnswer] = useState('');
  const [cancelToken, setCancelToken] = useState('');
  const inFlight = useRef(false);
  const eventId = useRef('');
  const generation = useRef(0);
  const root = useRef<HTMLDivElement>(null);
  const totals = bookingTotals(items);
  const hasAuto = items.some(i => i.service.id === 'auto' || i.formule.id === 'cuir-auto');
  const activeField = fields[field];
  useEffect(() => { onBusy(sending); }, [sending, onBusy]);
  const tomorrow = dateKey(new Date(Date.now() + 24 * 60 * 60 * 1000));

  useEffect(() => {
    root.current?.scrollIntoView({ block: 'nearest' });
  }, [stage, field]);
  useEffect(() => {
    if (stage !== 'date' || !date) return;
    let cancelled = false;
    setLoading(true); setSlots([]);
    fetchBusySlots(fromDate(date), true).then(busy => {
      if (cancelled) return;
      const available = buildSlots(fromDate(date), totals.duration, busy).filter(s => s.available).map(s => s.time);
      setSlots(available);
      setTime(old => available.includes(old) ? old : '');
    }).catch(() => { if (!cancelled) setError('Le calendrier est momentanément indisponible. Réessayez ou appelez-nous.'); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [date, stage, totals.duration, refresh]);
  useEffect(() => () => { generation.current++; }, []);

  const nextAvailable = async () => {
    const request = ++generation.current;
    setLoading(true); setError(''); setTime(''); setSlots([]);
    try {
      const start = date ? fromDate(date) : fromDate(tomorrow);
      for (let offset = 0; offset < 30; offset++) {
        const day = new Date(start); day.setDate(day.getDate() + offset);
        const busy = await fetchBusySlots(day, true);
        if (request !== generation.current) return;
        const found = buildSlots(day, totals.duration, busy).filter(s => s.available).map(s => s.time);
        if (found[0]) { setDate(dateKey(day)); setSlots(found); setTime(found[0]); return; }
      }
      setError('Aucun créneau compatible trouvé dans les 30 prochains jours. Choisissez une autre date ou contactez-nous.');
    } catch { if (request === generation.current) setError('Impossible de vérifier les disponibilités. Aucun créneau n’est bloqué.'); }
    finally { if (request === generation.current) setLoading(false); }
  };
  const changeStage = (next: Stage) => { generation.current++; setError(''); setHelpAnswer(''); setStage(next); };
  const submit = async () => {
    if (inFlight.current || stage !== 'review' || !items.length || !date || !time) return;
    inFlight.current = true; setSending(true); setError('');
    if (!eventId.current) eventId.current = Array.from(crypto.getRandomValues(new Uint8Array(32)), n => '0123456789abcdefghijklmnopqrstuv'[n % 32]).join('');
    try {
      const result = await confirmAssistantBooking(true, {
        items: bookingItems(items), total_price: totals.price, duration_min: totals.duration,
        booking_date: date, booking_time: time, client_name: details.name.trim(), client_phone: details.phone.trim(),
        client_email: details.email.trim(), client_street: details.street.trim(), client_zip: details.zip.trim(), client_city: details.city.trim(),
        auto_access: hasAuto ? { electricity: access.electricity === 'yes', water: access.water === 'yes' } : undefined,
        gcal_event_id: eventId.current, cancel_token: 'pending',
      }, { create: createBookingServerFn });
      if (result.error === 'SLOT_TAKEN') {
        setTime(''); setStage('date'); setRefresh(v => v + 1);
        setError('Ce créneau vient de devenir indisponible. Choisissez un autre horaire ou recherchez le prochain créneau compatible.');
      } else if (!result.success || !result.gcal_event_id) {
        setError('La réservation n’a pas été confirmée. Contactez-nous au 07 67 12 75 00 avant de recommencer.');
      } else { setEmailSent(result.emailSent); setCancelToken(result.cancel_token); setStage('done'); }
    } catch { setError('La confirmation n’a pas pu être vérifiée. Vérifiez vos emails ou appelez le 07 67 12 75 00 avant de recommencer.'); }
    finally { setSending(false); inFlight.current = false; }
  };
  const nextDetail = (event: React.FormEvent) => {
    event.preventDefault();
    if (activeField && !details[activeField[0]].trim()) return;
    if (field === 5 && !hasAuto) changeStage('review');
    else if (field === 7) changeStage('review');
    else setField(v => v + 1);
  };

  return <div ref={root} className="space-y-3 p-3">
    <p className="rounded-xl bg-primary/5 p-3 text-xs text-muted-foreground">Réservation guidée · Aucun paiement en ligne · Rien n’est réservé avant votre confirmation finale.</p>
    {items.length > 0 && stage !== 'done' && <p className="text-sm font-semibold">{items.length} prestation(s) · {totals.price} € · {totals.duration} min</p>}
    {error && <p role="alert" className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-800">{error}</p>}
    {stage === 'service' && <>
      <h3 className="font-semibold">Que souhaitez-vous faire nettoyer ?</h3>
      {SERVICES.map(s => <button className={button} key={s.id} onClick={() => { setService(s); setFormula(undefined); setOptions([]); changeStage('formula'); }}>{s.shortLabel} · dès {s.from} €</button>)}
      <a className={button + ' block'} href="/contactez-nous">Logement, Diogène, chantier, extérieur… Demander un devis</a>
      {items.length > 0 && <button className={button} onClick={() => changeStage('basket')}>Revenir à ma sélection</button>}
    </>}
    {stage === 'formula' && service && <>
      <h3 className="font-semibold">Quelle formule pour {service.shortLabel.toLowerCase()} ?</h3>
      {service.formules.map(f => <button key={f.id} className={button} onClick={() => { setFormula(f); setOptions([]); changeStage('options'); }}><strong>{f.name} · {f.price} €</strong><span className="mt-1 block text-xs text-muted-foreground">{f.desc} · {f.duration}</span></button>)}
      <button className={button} onClick={() => changeStage('service')}>← Changer de prestation</button>
    </>}
    {stage === 'options' && service && formula && <>
      <h3 className="font-semibold">Souhaitez-vous ajouter des options ?</h3>
      <p className="text-sm">{formula.name} · {formula.price} € · Les options ne prolongent pas la durée.</p>
      {formula.options.map(o => <label key={o.id} className={button + ' flex items-start gap-2'}><input type="checkbox" className="mt-1 size-4 shrink-0" checked={options.includes(o.id)} onChange={() => setOptions(old => old.includes(o.id) ? old.filter(id => id !== o.id) : [...old, o.id])} /><span><strong>{o.name} · +{o.price} €</strong><span className="mt-1 block text-xs text-muted-foreground">{optionDescription(o.name, o.desc, service.id === 'auto' || formula.id === 'cuir-auto')}</span></span></label>)}
      <button className={primary} onClick={() => { setItems(old => [...old, { service, formule: formula, options }]); setTime(''); changeStage('basket'); }}>Valider {options.length ? 'ces options' : 'sans option'}</button>
      <button className={button} onClick={() => changeStage('formula')}>← Changer de formule</button>
    </>}
    {stage === 'basket' && <>
      <h3 className="font-semibold">Voici votre sélection. Tout est bon ?</h3>
      {items.map((item, index) => <div key={index} className="rounded-xl border p-3 text-sm"><strong>{item.formule.name}</strong><p>{item.formule.options.filter(o => item.options.includes(o.id)).map(o => o.name).join(', ') || 'Sans option'}</p><button className="mt-2 underline" onClick={() => { setService(item.service); setFormula(item.formule); setOptions(item.options); setItems(old => old.filter((_, i) => i !== index)); setTime(''); changeStage('options'); }}>Modifier</button><button className="ml-4 underline" onClick={() => { setItems(old => old.filter((_, i) => i !== index)); setTime(''); }}>Retirer</button></div>)}
      <button className={button} disabled={items.length >= 20} onClick={() => changeStage('service')}>+ Ajouter une prestation</button>
      <button className={primary} disabled={!items.length} onClick={() => changeStage('date')}>Choisir mon rendez-vous</button>
    </>}
    {stage === 'date' && <>
      <h3 className="font-semibold">Quand souhaitez-vous notre intervention ?</h3>
      <button className={primary} disabled={loading} onClick={nextAvailable}>{loading ? 'Vérification du calendrier…' : 'Prochain créneau compatible'}</button>
      <label className="block text-sm">Ou choisir une date<input type="date" aria-label="Date du rendez-vous" min={tomorrow} value={date} disabled={loading} onChange={e => { generation.current++; setDate(e.target.value); setTime(''); }} className="mt-2 w-full rounded-xl border bg-background p-3 text-base" /></label>
      {date && !loading && <div className="grid grid-cols-3 gap-2">{slots.map(t => <button key={t} aria-pressed={time === t} onClick={() => setTime(t)} className={time === t ? primary : button}>{t}</button>)}</div>}
      {date && !loading && !slots.length && !error && <p className="text-sm">Aucun horaire disponible ce jour. Essayez le prochain créneau compatible.</p>}
      {time && <p className="text-sm font-semibold" role="status">✓ {fromDate(date).toLocaleDateString('fr-FR')} à {time} (heure de Toulouse)</p>}
      <button className={primary} disabled={!time || loading} onClick={() => { setField(0); changeStage('details'); }}>Continuer avec ce créneau</button>
      <button className={button} disabled={loading} onClick={() => changeStage('basket')}>← Modifier ma sélection</button>
      {error && <button className={button} onClick={() => setRefresh(v => v + 1)}>Réessayer le calendrier</button>}
    </>}
    {stage === 'details' && <form onSubmit={nextDetail} className="space-y-3">
      {activeField ? <label className="block font-semibold">{activeField[1]}<input key={activeField[0]} autoFocus required type={activeField[2]} autoComplete={activeField[3]} value={details[activeField[0]]} maxLength={activeField[0] === 'zip' ? 5 : 180} pattern={activeField[0] === 'zip' ? '[0-9]{5}' : activeField[0] === 'phone' ? '[+0-9 () .-]{8,20}' : undefined} onChange={e => setDetails(old => ({ ...old, [activeField[0]]: e.target.value }))} className="mt-2 w-full rounded-xl border bg-background p-3 text-base font-normal" /></label> : <fieldset><legend className="font-semibold">{field === 6 ? 'Une prise électrique est-elle disponible à moins de 60 m du véhicule ?' : 'Un accès à l’eau est-il disponible à proximité du véhicule ?'}</legend>{['yes', 'no'].map(value => <label key={value} className={button + ' mt-2 block'}><input type="radio" required name="access" checked={access[field === 6 ? 'electricity' : 'water'] === value} onChange={() => setAccess(old => ({ ...old, [field === 6 ? 'electricity' : 'water']: value }))} /> {value === 'yes' ? 'Oui' : 'Non'}</label>)}</fieldset>}
      <button type="submit" className={primary}>{field === (hasAuto ? 7 : 5) ? 'Voir mon récapitulatif' : 'Continuer'}</button>
      <button type="button" className={button} onClick={() => field > 0 ? setField(v => v - 1) : changeStage('date')}>← Question précédente</button>
      <p className="text-xs text-muted-foreground">Vos coordonnées servent à organiser le rendez-vous. <a href="/politique-confidentialite" className="underline">Confidentialité</a></p>
    </form>}
    {stage === 'review' && <>
      <h3 className="font-semibold">Confirmez-vous cette réservation ?</h3>
      <div className="space-y-2 rounded-xl border bg-background p-3 text-sm">
        {items.map((i, index) => <p key={index}><strong>{i.formule.name}</strong><br />{i.formule.options.filter(o => i.options.includes(o.id)).map(o => `${o.name} +${o.price} €`).join(' · ') || 'Sans option'}</p>)}
        <p><strong>{totals.price} € · {totals.duration} min</strong></p>
        <p>{fromDate(date).toLocaleDateString('fr-FR')} à {time} (Toulouse)</p>
        <p>{details.name} · {details.phone}<br />{details.email}<br />{details.street}, {details.zip} {details.city}</p>
        {hasAuto && <p>Prise à moins de 60 m : {access.electricity === 'yes' ? 'oui' : 'non'} · Eau : {access.water === 'yes' ? 'oui' : 'non'}</p>}
        {hasAuto && (access.electricity === 'no' || access.water === 'no') && <p>Un accès manque : appelez-nous pour vérifier les possibilités d’intervention.</p>}
        <p>Règlement en fin de prestation. Déplacement offert jusqu’à 20 km ; au-delà, frais à confirmer avec l’équipe.</p>
      </div>
      <button className={primary} disabled={sending} onClick={submit}>{sending ? 'Confirmation en cours…' : 'Confirmer définitivement ma réservation'}</button>
      <button className={button} disabled={sending} onClick={() => { setField(0); changeStage('details'); }}>Modifier mes coordonnées</button>
      <button className={button} disabled={sending} onClick={() => changeStage('date')}>Modifier le créneau</button>
      <button className={button} disabled={sending} onClick={() => changeStage('basket')}>Modifier les prestations</button>
    </>}
    {stage === 'done' && <div role="status" className="space-y-3 rounded-xl bg-primary/5 p-4"><h3 className="font-semibold">✓ Réservation confirmée</h3><p>{fromDate(date).toLocaleDateString('fr-FR')} à {time} · {totals.price} €</p><p className="text-sm">{emailSent ? 'La confirmation a été envoyée par email. Vérifiez aussi vos courriers indésirables.' : 'Votre rendez-vous est enregistré, mais l’email n’a pas pu être envoyé. Notez votre créneau et contactez-nous si besoin.'}</p><a href={`/annuler?token=${encodeURIComponent(cancelToken)}`} className="block text-sm underline">Gérer ma réservation</a></div>}
    {stage !== 'done' && <details className="border-t pt-3"><summary className="cursor-pointer text-sm font-semibold">Une question avant de continuer ?</summary><form className="mt-2 space-y-2" onSubmit={e => { e.preventDefault(); setHelpAnswer(answerCustomer(help, service ? `/nettoyage-${service.id}-toulouse` : undefined).text); }}><input aria-label="Question pendant la réservation" value={help} onChange={e => setHelp(e.target.value)} maxLength={1500} className="w-full rounded-xl border p-2 text-base" placeholder="Options, paiement, séchage…" /><button className={button} disabled={!help.trim()}>Obtenir une réponse</button></form>{helpAnswer && <p className="mt-2 whitespace-pre-wrap text-sm" role="status">{helpAnswer}</p>}</details>}
    <a href="tel:+33767127500" className="block text-center text-xs underline">Besoin d’aide ? 07 67 12 75 00</a>
  </div>;
}
