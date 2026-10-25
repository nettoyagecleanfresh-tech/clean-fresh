import { useEffect, useState } from 'react';
import { useLocation } from '@tanstack/react-router';
import { audienceChoice, rememberAudience, removeAudienceCookies, setAudienceEnabled, publicAnalyticsPath } from '@/lib/googleAnalytics';

export function AudienceConsent() {
  const { pathname } = useLocation();
  const [choice, setChoice] = useState<boolean | null>(null);
  const [ready, setReady] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const saved = audienceChoice();
    setChoice(saved); setOpen(saved === null); setReady(true);
  }, []);
  useEffect(() => { if (ready) setAudienceEnabled(choice === true, pathname); }, [ready, choice, pathname]);
  const choose = (allowed: boolean) => {
    rememberAudience(allowed); setChoice(allowed); setOpen(false);
    setAudienceEnabled(allowed, pathname);
    if (!allowed) removeAudienceCookies();
  };
  if (!ready || !publicAnalyticsPath(pathname)) return null;
  return <>
    <div className="bg-background px-4 py-3 text-center text-xs">
      <button type="button" onClick={() => setOpen(true)} className="min-h-11 underline underline-offset-4">Gérer mes cookies de mesure d’audience</button>
    </div>
    {open && <section role="region" aria-label="Choix des cookies de mesure d’audience" className="fixed inset-x-3 bottom-[calc(5.5rem+env(safe-area-inset-bottom))] z-[60] mx-auto max-w-[320px] rounded-xl border border-slate-200 bg-white p-2.5 text-slate-800 shadow-[0_8px_32px_rgba(15,23,42,0.12)] lg:inset-x-auto lg:bottom-5 lg:left-5 lg:mx-0 lg:w-[300px]">
      <p className="text-xs leading-4 text-slate-600">Cookies Google Analytics : mesurer les visites avec votre accord.{' '}
        <a href="/politique-confidentialite" className="rounded-sm underline underline-offset-2 hover:text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600">En savoir plus</a>
      </p>
      <div className="mt-1.5 grid grid-cols-2 gap-2">
        <button type="button" onClick={() => choose(false)} className="min-h-9 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold transition-colors hover:border-sky-300 hover:bg-sky-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600">Refuser</button>
        <button type="button" onClick={() => choose(true)} className="min-h-9 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold transition-colors hover:border-sky-300 hover:bg-sky-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600">Accepter</button>
      </div>
    </section>}
  </>;
}
