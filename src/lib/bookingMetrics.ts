import { useEffect, useRef } from 'react';

type Channel = 'form' | 'assistant';
type Step = 'service' | 'formula' | 'options' | 'basket' | 'date' | 'details' | 'review' | 'done';
/** Fixed labels only: never send customer details, addresses or free text. */
export function bookingMetric(event: 'booking_step_view' | 'booking_exit' | 'booking_complete' | 'booking_error', channel: Channel, step: Step) {
  if (typeof window === 'undefined') return;
  const gtag = (window as Window & { gtag?: (...args: unknown[]) => void }).gtag;
  if (typeof gtag === 'function') gtag('event', event, {booking_channel:channel, booking_step:step, transport_type:'beacon'});
}
export function useBookingMetrics(channel: Channel, step: Step) {
  const latest = useRef(step);
  const seen = useRef(new Set<Step>());
  const exitSent = useRef(false);
  useEffect(() => {
    latest.current = step;
    if (seen.current.has(step)) return;
    seen.current.add(step);
    bookingMetric(step === 'done' ? 'booking_complete' : 'booking_step_view', channel, step);
  }, [channel, step]);
  useEffect(() => {
    const exit = () => {
      if (latest.current !== 'done' && !exitSent.current) {
        exitSent.current = true;
        bookingMetric('booking_exit', channel, latest.current);
      }
    };
    // pagehide is an exit signal, not proof that a customer abandoned permanently.
    const resume = () => { exitSent.current = false; };
    window.addEventListener('pagehide', exit);
    window.addEventListener('pageshow', resume);
    return () => { window.removeEventListener('pagehide', exit); window.removeEventListener('pageshow', resume); };
  }, [channel]);
}
