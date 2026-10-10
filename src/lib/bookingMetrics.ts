import { useEffect, useRef } from 'react';
import { track } from '@vercel/analytics';

type Channel = 'form' | 'assistant';
type Step = 'service' | 'formula' | 'options' | 'basket' | 'date' | 'details' | 'review' | 'done';
/** Fixed labels only: never send customer details, addresses or free text. */
export function bookingMetric(event: 'booking_step_view' | 'booking_exit' | 'booking_complete' | 'booking_error', channel: Channel, step: Step) {
  if (typeof window === 'undefined') return;
  try { track(event, { booking_channel: channel, booking_step: step }); } catch { /* Analytics must never block a booking. */ }
  const gtag = (window as Window & { gtag?: (...args: unknown[]) => void }).gtag;
  try { if (typeof gtag === 'function') gtag('event', event, {booking_channel:channel, booking_step:step, transport_type:'beacon'}); } catch { /* Keep the booking usable if analytics fails. */ }
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
    const entryPath = window.location.pathname;
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
    return () => { if (window.location.pathname !== entryPath) exit(); window.removeEventListener('pagehide', exit); window.removeEventListener('pageshow', resume); };
  }, [channel]);
}
