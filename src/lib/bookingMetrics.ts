import { useEffect, useRef } from 'react';
import { track } from '@vercel/analytics';
import { googleMetric } from './googleAnalytics';
import { analyticsDevice, customerAnalyticsAllowed } from './analyticsPolicy';
import { claimConfirmedMetric } from './metricDeduplication';

type Channel = 'form' | 'assistant';
type Step = 'service' | 'formula' | 'options' | 'basket' | 'date' | 'details' | 'review' | 'done';
/** Fixed labels only: never send customer details, addresses or free text. */
function emitBookingMetric(event: string, channel: Channel, step: Step) {
  if (!customerAnalyticsAllowed()) return;
  const device = analyticsDevice();
  try { track(event, { booking_channel: channel, booking_step: step, device }); } catch { /* Analytics must never block a booking. */ }
  try { googleMetric(event, { booking_channel: channel, booking_step: step, device }); } catch { /* Keep the booking usable if analytics fails. */ }
}
export function bookingMetric(event: 'booking_step_view' | 'booking_exit' | 'booking_error', channel: Channel, step: Step) {
  emitBookingMetric(event, channel, step);
}
/** UI completion alone is not a booking. Require the confirmed server event ID. */
export function bookingConfirmedMetric(result: { success?: boolean; gcal_event_id?: string | null }, channel: Channel) {
  if (!result.success || !customerAnalyticsAllowed() || !claimConfirmedMetric('booking', result.gcal_event_id)) return;
  emitBookingMetric('booking_complete', channel, 'done');
}
export function useBookingMetrics(channel: Channel, step: Step) {
  const latest = useRef(step);
  const seen = useRef(new Set<Step>());
  const exitSent = useRef(false);
  useEffect(() => {
    latest.current = step;
    if (seen.current.has(step)) return;
    seen.current.add(step);
    // Confirmation is emitted at the server response, never from a render/remount.
    if (step !== 'done') bookingMetric('booking_step_view', channel, step);
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
