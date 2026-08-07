import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  ScrollRestoration,
  useLocation,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import { Home, CalendarCheck, Sofa, Sparkles, Phone } from "lucide-react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { OG_IMAGE, COMPANY } from "@/data/site";
import { Header } from "@/components/site/Header";
import { Footer, StickyCallCta } from "@/components/site/Footer";
import { TopBanner } from "@/components/site/TopBanner";
import { Toaster } from "@/components/ui/sonner";
import { Chatbot } from "@/components/site/Chatbot";
import { Button } from "@/components/ui/button";

function NotFoundComponent() {
  return (
    <div className="relative flex min-h-[80vh] items-center justify-center overflow-hidden bg-hero-gradient px-4 py-20">
      {/* Blob décoratif */}
      <div className="pointer-events-none absolute -left-32 -top-32 size-96 rounded-full bg-primary/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 size-96 rounded-full bg-accent/20 blur-3xl" />

      <div className="relative z-10 max-w-lg text-center text-ink-foreground">
        {/* Numéro 404 stylisé */}
        <div className="relative inline-block">
          <span className="text-[9rem] font-black leading-none tracking-tighter opacity-10 select-none">
            404
          </span>
        </div>

        <h1 className="mt-2 text-3xl font-bold md:text-4xl">
          Cette page est introuvable
        </h1>
        <p className="mx-auto mt-4 max-w-sm text-sm leading-relaxed text-ink-foreground/70">
          La page que vous cherchez n'existe pas ou a été déplacée.
          Pas de panique — nos équipes sont toujours là pour vous aider !
        </p>

        {/* Boutons principaux */}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button asChild size="lg" className="bg-accent-gradient text-accent-foreground font-bold shadow-[var(--shadow-card)] hover:opacity-90">
            <Link to="/"><Home className="size-4" /> Retour à l'accueil</Link>
          </Button>
          <Button asChild variant="onDark" size="lg">
            <Link to="/formules"><CalendarCheck className="size-4" /> Réserver une prestation</Link>
          </Button>
        </div>

        {/* Liens rapides */}
        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {[
            { to: "/nettoyage-canape-toulouse", label: "Canapé", icon: Sofa },
            { to: "/nettoyage-matelas-toulouse", label: "Matelas", icon: Sparkles },
            { to: "/nettoyage-auto-a-domicile-toulouse", label: "Auto", icon: Sparkles },
            { to: "/nettoyage-tapis-toulouse", label: "Tapis", icon: Sparkles },
            { to: "/nos-services", label: "Tous les services", icon: Sparkles },
            { to: "/contactez-nous", label: "Nous contacter", icon: Phone },
          ].map(({ to, label, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              className="flex items-center justify-center gap-2 rounded-xl border border-ink-foreground/20 bg-ink-foreground/10 px-3 py-3 text-xs font-semibold backdrop-blur transition-colors hover:bg-ink-foreground/20"
            >
              <Icon className="size-3.5 shrink-0" />
              {label}
            </Link>
          ))}
        </div>

        {/* Téléphone */}
        <p className="mt-10 text-sm text-ink-foreground/60">
          Besoin d'aide ?{" "}
          <a href={COMPANY.phoneHref} className="font-semibold text-ink-foreground hover:underline">
            {COMPANY.phone}
          </a>
        </p>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: (ctx) => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "author", content: "Clean&Fresh" },
      { property: "og:site_name", content: "Clean&Fresh" },
      { property: "og:locale", content: "fr_FR" },
      { property: "og:type", content: "website" },
      { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" },
      { name: "google-site-verification", content: "ABQ3uT20R9t8NJRf3v977Rn1qXstEM8j6XQoYgigONo" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:image", content: OG_IMAGE },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "Clean&Fresh — nettoyage professionnel Toulouse" },
      { name: "twitter:image", content: OG_IMAGE },
      { title: "Nettoyage à domicile à Toulouse — Clean&Fresh Haute-Garonne" },
      { property: "og:title", content: "Nettoyage à domicile à Toulouse — Clean&Fresh Haute-Garonne" },
      { name: "twitter:title", content: "Nettoyage à domicile à Toulouse — Clean&Fresh Haute-Garonne" },
      { name: "description", content: "Clean&Fresh, entreprise de nettoyage à Toulouse : canapé, matelas, tapis, auto, vitres, façade, fin de chantier. Résultat soigné. Devis gratuit sous 24h !" },
      { property: "og:description", content: "Clean&Fresh, entreprise de nettoyage à Toulouse : canapé, matelas, tapis, auto, vitres, façade, fin de chantier. Résultat soigné. Devis gratuit sous 24h !" },
      { name: "twitter:description", content: "Clean&Fresh, entreprise de nettoyage à Toulouse : canapé, matelas, tapis, auto, vitres, façade, fin de chantier. Résultat soigné. Devis gratuit sous 24h !" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Outfit:wght@500;600;700;800&family=Figtree:wght@400;500;600&display=swap",
      },
      { rel: "icon", href: "/logo.png", type: "image/png" },
    ],
    scripts: [],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="fr" className="overflow-x-hidden w-full">
      <head>
        <HeadContent />
        {/* Google Tag — Analytics + Ads */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=GT-NBQQP8JN" />
        <script dangerouslySetInnerHTML={{__html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'GT-NBQQP8JN');
          gtag('config', 'AW-17507775021');
        `}} />
      </head>
      <body className="overflow-x-hidden w-full">
        {children}
        <script dangerouslySetInnerHTML={{__html: `if(window.location.hostname.includes('lovable.app')||window.location.hostname.includes('vercel.app')) { var m = document.createElement('meta'); m.name = 'robots'; m.content = 'noindex, nofollow'; document.head.appendChild(m); }`}} />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex min-h-screen flex-col overflow-x-hidden w-full">
        <div className="sticky top-0 z-50">
          <TopBanner />
          <Header />
        </div>
        {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>
      <StickyCallCta />
      <Chatbot />
      <Toaster />
    </QueryClientProvider>
  );
}
