import { lazy, Suspense } from 'react';
const ChatBooking = lazy(() => import('./ChatBooking').then(m => ({ default: m.ChatBooking })));
import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, RotateCcw } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import { answerCustomer, shouldStartBooking, welcome, type ChatReply } from '@/lib/chatAssistant';

type Message = ChatReply & { sender: 'bot' | 'user'; id: number };
export function Chatbot({ openRequest = 0 }: { openRequest?: number }) {
  const [open, setOpen] = useState(false);
  const [booking, setBooking] = useState(false);
  const [bookingStarted, setBookingStarted] = useState(false);
  const [bookingBusy, setBookingBusy] = useState(false);
  const [bookingKey, setBookingKey] = useState(0);
  const [dismissed, setDismissed] = useState(false);
  const [input, setInput] = useState('');
  const [service, setService] = useState<string>();
  const [messages, setMessages] = useState<Message[]>([{ ...welcome, sender: 'bot', id: 0 }]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLElement>(null);
  const bookingScrollRef = useRef<HTMLDivElement>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const nextId = useRef(1);
  useEffect(() => {
    if (openRequest > 0) { setDismissed(false); setOpen(true); }
  }, [openRequest]);
  useEffect(() => {
    if (!open) return;
    // Focus the dialog, never the input: opening help must not open the mobile keyboard.
    panelRef.current?.focus({ preventScroll: true });
    if (bookingScrollRef.current) bookingScrollRef.current.scrollTop = 0;
  }, [open, booking]);
  useEffect(() => {
    if (!open || booking) return;
    const el = scrollRef.current;
    const reply = el?.querySelector<HTMLElement>('[data-latest-reply]');
    if (el) el.scrollTop = reply ? el.scrollTop + reply.getBoundingClientRect().top - el.getBoundingClientRect().top - 12 : 0;
  }, [messages, open, booking]);
  const close = (restoreFocus = true) => {
    setOpen(false);
    if (restoreFocus) requestAnimationFrame(() => {
      const trigger = window.matchMedia('(min-width: 1024px)').matches ? launcherRef.current : document.getElementById('mobile-help-trigger');
      trigger?.focus({ preventScroll: true });
    });
  };
  const send = (raw: string) => {
    const text = raw.trim().slice(0, 1500);
    if (!text) return;
    inputRef.current?.blur();
    if (shouldStartBooking(text, service)) { setBookingStarted(true); setBooking(true); setInput(''); return; }
    const response = answerCustomer(text, service);
    setService(response.service);
    const id = nextId.current; nextId.current += 2;
    setMessages(previous => [...previous.slice(-38), { id, sender: 'user', text }, { ...response, id: id + 1, sender: 'bot' }]);
    setInput('');
  };
  if (dismissed) return null;
  return <>
    {!open && <div className="fixed right-3 bottom-24 lg:bottom-5 z-40 hidden items-center gap-1 lg:flex">
      <button ref={launcherRef} onClick={() => setOpen(true)} aria-label="Ouvrir l’assistant Clean&Fresh" aria-expanded={open} aria-controls="cleanfresh-chat"
        className="flex h-11 items-center gap-2 rounded-full bg-primary px-3 text-xs font-semibold text-primary-foreground shadow-md hover:bg-primary/90">
        <MessageCircle className="size-5" /><span>Aide</span>
      </button>
      <button onClick={() => setDismissed(true)} aria-label="Masquer l’assistant pour cette page" className="flex size-8 items-center justify-center rounded-full border bg-background text-muted-foreground"><X className="size-4" /></button>
    </div>}
    {(open || bookingStarted) && <section hidden={!open} id="cleanfresh-chat" ref={panelRef} tabIndex={-1} role="dialog" aria-label="Assistant Clean&Fresh" onKeyDown={e => { if (e.key === 'Escape') close(); }}
      className={`${!open ? '!hidden ' : ''}fixed right-3 bottom-24 lg:bottom-5 z-50 flex h-[min(660px,78dvh)] w-[360px] max-w-[calc(100vw-1.5rem)] flex-col overflow-hidden rounded-2xl border border-border bg-background shadow-xl`}>
      <header className="flex items-center justify-between gap-2 bg-primary p-3 text-primary-foreground">
        <div><h2 className="text-sm font-semibold">Assistant Clean&Fresh</h2><p className="text-xs opacity-90">Aide aux prestations et à la réservation</p></div>
        <button aria-label="Recommencer la conversation" disabled={bookingBusy} onClick={() => { setBooking(false); setBookingStarted(false); setBookingKey(v => v + 1); setMessages([{ ...welcome, sender: 'bot', id: nextId.current++ }]); setService(undefined); }} className="p-2"><RotateCcw className="size-4" /></button>
        <button onClick={() => close()} aria-label="Fermer le chat" className="p-2"><X className="size-5" /></button>
      </header>
      <div className="flex gap-2 border-b p-2">
        <button disabled={bookingBusy} aria-pressed={!booking} onClick={() => setBooking(false)} className="flex-1 rounded-lg border px-2 py-2 text-xs font-semibold">Poser une question</button>
        <button aria-pressed={booking} onClick={() => { setBookingStarted(true); setBooking(true); }} className="flex-1 rounded-lg bg-primary px-2 py-2 text-xs font-semibold text-primary-foreground">Réserver avec l’assistant</button>
      </div>
      <div hidden={!booking} ref={bookingScrollRef} data-chat-scroll className="min-h-0 flex-1 overflow-y-auto overscroll-contain"><Suspense fallback={<p className="p-4 text-sm">Chargement du parcours…</p>}>{bookingStarted && <ChatBooking key={bookingKey} onBusy={setBookingBusy} />}</Suspense></div>
      <div hidden={booking} ref={scrollRef} role="log" aria-live="polite" aria-relevant="additions" className="min-h-0 flex-1 overflow-y-auto overscroll-contain bg-muted/30 p-3">
        {messages.map((message, index) => <div key={message.id} data-latest-reply={message.sender === 'bot' && index === messages.length - 1 ? 'true' : undefined} className={`mb-3 ${message.sender === 'user' ? 'ml-6' : 'mr-2'} ${message.sender === 'bot' && index === messages.length - 1 ? 'min-h-full' : ''}`}>
          <p className={`whitespace-pre-wrap rounded-xl p-3 text-sm leading-relaxed ${message.sender === 'user' ? 'bg-primary text-primary-foreground' : 'border border-border bg-background'}`}>{message.text}</p>
          {message.sender === 'bot' && index === messages.length - 1 && <div className="mt-2 flex flex-wrap gap-2">
            {message.actions?.map(action => action.href.startsWith('/') ? <Link key={action.href} to={action.href as '/tarifs'} resetScroll onClick={() => close(false)} className="rounded-lg border border-primary/30 bg-background px-3 py-2 text-xs font-semibold text-primary">{action.label}</Link> : <a key={action.href} href={action.href} className="rounded-lg border border-primary/30 bg-background px-3 py-2 text-xs font-semibold text-primary">{action.label}</a>)}
            {message.suggestions?.map(suggestion => <button key={suggestion} onClick={() => send(suggestion)} className="rounded-full border border-border bg-background px-3 py-2 text-xs">{suggestion}</button>)}
          </div>}
        </div>)}
      </div>
      <form style={{ display: booking ? 'none' : undefined }} hidden={booking} onSubmit={e => { e.preventDefault(); send(input); }} className="flex items-center gap-2 border-t p-3">
        <input ref={inputRef} aria-label="Votre question" maxLength={1500} value={input} onChange={e => setInput(e.target.value)} placeholder="Votre question…" autoComplete="off" className="min-w-0 flex-1 rounded-full border bg-background px-3 py-2 text-base" />
        <button type="submit" disabled={!input.trim()} aria-label="Envoyer la question" className="rounded-full bg-primary p-2 text-primary-foreground disabled:opacity-40"><Send className="size-5" /></button>
      </form>
    </section>}
  </>;
}
