export const ANALYTICS_TEST_KEY = 'cleanfresh-analytics-test-v1';
let sessionTest = false;

/** Explicit audit mode follows the current tab; it never changes a booking. */
export function analyticsTestMode(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const option = new URLSearchParams(location.search).get('analytics_test');
    if (option === '1' || option === '0') {
      sessionTest = option === '1';
      try { sessionStorage.setItem(ANALYTICS_TEST_KEY, sessionTest ? '1' : '0'); } catch { /* Memory fallback. */ }
    } else {
      try { sessionTest = sessionStorage.getItem(ANALYTICS_TEST_KEY) === '1' || sessionTest; } catch { /* Memory fallback. */ }
    }
  } catch { /* Analytics must never block the page. */ }
  return sessionTest;
}

export function productionAnalyticsOrigin(origin: string): boolean {
  return origin === 'https://cleanetfresh.fr' || origin === 'https://www.cleanetfresh.fr';
}

export function publicAnalyticsPath(path: string): boolean {
  return !/^\/(envoyer-avis|annuler|reprogrammer|upsell|api|admin)(\/|$)/.test(path);
}

export function customerAnalyticsAllowed(): boolean {
  return typeof window !== 'undefined' && productionAnalyticsOrigin(location.origin)
    && publicAnalyticsPath(location.pathname) && !analyticsTestMode();
}

export function analyticsDevice(): 'desktop' | 'mobile' {
  try { return window.matchMedia('(min-width: 1024px)').matches ? 'desktop' : 'mobile'; }
  catch { return 'mobile'; }
}

/** Vercel must not receive management tokens, form values or audit visits. */
export function sanitizeAnalyticsEvent<T extends { url: string }>(event: T): T | null {
  if (!customerAnalyticsAllowed()) return null;
  try {
    const url = new URL(event.url);
    if (!productionAnalyticsOrigin(url.origin) || !publicAnalyticsPath(url.pathname)) return null;
    return { ...event, url: url.origin + url.pathname };
  } catch { return null; }
}
