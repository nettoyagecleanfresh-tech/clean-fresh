import { track } from '@vercel/analytics';
import { googleMetric } from './googleAnalytics';
import { analyticsDevice, customerAnalyticsAllowed } from './analyticsPolicy';
import { claimConfirmedMetric } from './metricDeduplication';

type ConversionEvent = 'conversion_cta' | 'quote_started' | 'quote_error';
type ConversionDetails = { action?: 'booking' | 'quote' | 'phone' | 'whatsapp'; placement?: 'home_choices' | 'service_proof' | 'mobile_sticky' | 'service_hero' | 'site'; page?: 'home' | 'service' | 'booking' | 'quote' | 'other'; has_photos?: boolean };

/** Fixed labels only. No names, addresses, phone numbers, filenames or free text. */
export function conversionMetric(event: ConversionEvent, details: ConversionDetails = {}) {
  if (!customerAnalyticsAllowed()) return;
  const properties = { ...details, device: analyticsDevice() };
  try { track(event, properties); } catch { /* Tracking must never block the customer. */ }
  try { googleMetric(event, properties); } catch { /* Keep the journey usable. */ }
}

/** A quote counts only after the server acknowledges its email was accepted. */
export function quoteConfirmedMetric(result: { success?: boolean; measurement_id?: string }, hasPhotos: boolean, serviceGroup = "autre") {
  if (!result.success || !customerAnalyticsAllowed() || !claimConfirmedMetric('quote', result.measurement_id)) return;
  const allowed = ["remise_en_etat", "logement", "chantier", "bail", "vitres", "terrasse", "toiture", "facade", "textile_auto"];
  const properties = { has_photos: hasPhotos, service_group: allowed.includes(serviceGroup) ? serviceGroup : "autre", device: analyticsDevice() };
  try { track('quote_submitted', properties); } catch { /* Keep the quote usable. */ }
  try { googleMetric('quote_submitted', properties); } catch { /* Keep the quote usable. */ }
}
