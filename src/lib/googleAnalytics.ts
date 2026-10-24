export const GA_ID = 'G-QQZDL9DTSB';
export const CONSENT_KEY = 'cleanfresh-audience-v1';
const MAX_AGE = 180 * 24 * 60 * 60 * 1000;
type AnalyticsWindow = Window & { dataLayer?: unknown[]; gtag?: (...args: unknown[]) => void };
let active = false;
let initialized = false;
let previousPath = '';
let initialReferrer = '';

export function audienceChoice(): boolean | null {
  try {
    const value = JSON.parse(localStorage.getItem(CONSENT_KEY) || 'null');
    return value && typeof value.allowed === 'boolean' && Date.now() - value.at < MAX_AGE ? value.allowed : null;
  } catch { return null; }
}
export function rememberAudience(allowed: boolean) {
  try { localStorage.setItem(CONSENT_KEY, JSON.stringify({ allowed, at: Date.now() })); } catch { /* Session-only choice if storage is unavailable. */ }
}
export function publicAnalyticsPath(path: string) {
  return !/^\/(envoyer-avis|annuler|reprogrammer|upsell|api|admin)(\/|$)/.test(path);
}
export function setAudienceEnabled(enabled: boolean, path: string) {
  active = enabled && publicAnalyticsPath(path);
  (window as unknown as Record<string, unknown>)[`ga-disable-${GA_ID}`] = !active;
  if (!active) { previousPath = ''; return; }
  const w = window as AnalyticsWindow;
  if (!initialized) {
    initialized = true;
    try { initialReferrer = document.referrer ? new URL(document.referrer).origin + '/' : ''; } catch { initialReferrer = ''; }
    w.dataLayer = w.dataLayer || [];
    w.gtag = function () { w.dataLayer!.push(arguments); };
    w.gtag('consent', 'default', { analytics_storage: 'denied', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' });
    w.gtag('consent', 'update', { analytics_storage: 'granted' });
    w.gtag('js', new Date());
    w.gtag('config', GA_ID, { send_page_view: false, allow_google_signals: false, allow_ad_personalization_signals: false, page_location: location.origin + path, page_referrer: initialReferrer, cookie_expires: 60 * 60 * 24 * 180 });
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
    document.head.appendChild(script);
  }
  if (previousPath !== path) {
    const referrer = previousPath ? location.origin + previousPath : initialReferrer;
    previousPath = path;
    w.gtag?.('set', { page_location: location.origin + path, page_referrer: referrer });
    w.gtag?.('event', 'page_view', { send_to: GA_ID, page_location: location.origin + path, page_title: path === '/' ? 'Accueil Clean&Fresh' : path, page_referrer: referrer });
  }
}
/** Only fixed-label events; never forward query strings, forms or customer details. */
export function googleMetric(event: string, properties: Record<string, string | boolean>) {
  if (typeof window === 'undefined' || !active || !publicAnalyticsPath(location.pathname)) return;
  (window as AnalyticsWindow).gtag?.('event', event, { ...properties, send_to: GA_ID, page_location: location.origin + location.pathname, page_referrer: '' });
}
export function removeAudienceCookies() {
  for (const cookie of document.cookie.split(';')) {
    const name = cookie.trim().split('=')[0] || '';
    if (!/^(_ga|_gid|_gat)/.test(name)) continue;
    for (const domain of ['', `; domain=${location.hostname}`, '; domain=.cleanetfresh.fr']) {
      document.cookie = `${name}=; Max-Age=0; path=/${domain}; SameSite=Lax`;
    }
  }
}
