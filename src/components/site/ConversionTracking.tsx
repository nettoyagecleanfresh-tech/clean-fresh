import { useEffect } from 'react';
import { useLocation } from '@tanstack/react-router';
import { conversionMetric } from '@/lib/conversionMetrics';

export function ConversionTracking() {
  const pathname = useLocation().pathname;
  useEffect(() => {
    if (/^\/(envoyer-avis|annuler|upsell)(\/|$)/.test(pathname)) return;
    const clicked = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) return;
      const link = event.target.closest<HTMLAnchorElement>('a[href]');
      if (!link) return;
      const url = new URL(link.href, window.location.origin);
      const action = url.protocol === 'tel:' ? 'phone' : url.origin !== window.location.origin ? null : /^\/(formules|reserver)\/?$/.test(url.pathname) ? 'booking' : /^\/contactez-nous\/?$/.test(url.pathname) ? 'quote' : null;
      if (!action) return;
      const value = link.dataset.conversionLocation;
      const placement = value === 'home_choices' || value === 'service_proof' ? value : 'site';
      const page = pathname === '/' ? 'home' : pathname.startsWith('/nettoyage-') ? 'service' : /^\/(formules|reserver)$/.test(pathname) ? 'booking' : pathname === '/contactez-nous' ? 'quote' : 'other';
      conversionMetric('conversion_cta', { action, placement, page });
    };
    document.addEventListener('click', clicked);
    return () => document.removeEventListener('click', clicked);
  }, [pathname]);
  return null;
}
