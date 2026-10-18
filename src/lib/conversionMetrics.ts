import { track } from '@vercel/analytics';

type ConversionEvent = 'conversion_cta' | 'quote_started' | 'quote_submitted' | 'quote_error';
type ConversionDetails = { action?: 'booking' | 'quote' | 'phone'; placement?: 'home_choices' | 'service_proof' | 'site'; page?: 'home' | 'service' | 'booking' | 'quote' | 'other'; has_photos?: boolean };

/** Fixed labels only. No names, addresses, phone numbers, filenames or free text. */
export function conversionMetric(event: ConversionEvent, details: ConversionDetails = {}) {
  if (typeof window === 'undefined') return;
  const properties = { ...details, device: window.matchMedia('(min-width: 1024px)').matches ? 'desktop' : 'mobile' };
  try { track(event, properties); } catch { /* Tracking must never block the customer. */ }
  const gtag = (window as Window & { gtag?: (...args: unknown[]) => void }).gtag;
  try { gtag?.('event', event, { ...properties, transport_type: 'beacon' }); } catch { /* Keep the journey usable. */ }
}
