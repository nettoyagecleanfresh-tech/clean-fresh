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
    {open && <section role="region" aria-label="Choix des cookies de mesure d’audience" className="fixed inset-x-3 bottom-24 z-[60] mx-auto max-w-lg rounded-xl border bg-background p-5 text-foreground shadow-xl lg:bottom-5">
      <h2 className="font-bold">Votre choix pour la mesure d’audience</h2>
      <p className="mt-2 text-sm">Avec votre accord, Google Analytics nous aide à comprendre les visites et à améliorer la réservation. Aucun nom, e-mail ou téléphone saisi n’est transmis à ce suivi. Vous pouvez refuser et réserver normalement, ou changer d’avis en bas de page.</p>
      <a href="/politique-confidentialite" className="mt-2 inline-block text-sm underline">En savoir plus</a>
      <div className="mt-4 grid grid-cols-2 gap-3">
        <button type="button" onClick={() => choose(false)} className="min-h-11 rounded-lg border px-4 py-2 font-semibold">Refuser</button>
        <button type="button" onClick={() => choose(true)} className="min-h-11 rounded-lg border px-4 py-2 font-semibold">Accepter</button>
      </div>
    </section>}
  </>;
}
