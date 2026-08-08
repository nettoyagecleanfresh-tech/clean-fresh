import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, Phone, X, CalendarCheck, ChevronDown, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { COMPANY, MENU_TEXTILE, MENU_BATIMENT } from "@/data/site";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const [desktopOpen, setDesktopOpen] = useState(false);

  const close = () => { setOpen(false); setServicesOpen(false); setDesktopOpen(false); };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "border-b border-border/60 bg-background/95 shadow-[var(--shadow-soft)] backdrop-blur"
          : "bg-background/80 backdrop-blur"
      }`}
    >
      {/* Accent top bar */}
      <div className="h-0.5 w-full bg-primary-gradient" />

      <div className="mx-auto flex h-14 md:h-20 max-w-6xl items-center justify-between gap-4 px-4">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 shrink-0" onClick={close}>
          <img src="/logo.png" alt="Clean & Fresh Logo" className="h-11 md:h-16 w-auto object-contain" />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-0.5 lg:flex">
          <Link to="/" className="px-3 py-2 text-sm font-medium text-foreground/75 transition-colors hover:text-primary">
            Accueil
          </Link>

          {/* Services dropdown */}
          <div
            className="relative group"
            onMouseEnter={() => setDesktopOpen(true)}
            onMouseLeave={() => setDesktopOpen(false)}
          >
            <button className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-foreground/75 transition-colors hover:text-primary">
              Nos services <ChevronDown className={`size-3.5 transition-transform ${desktopOpen ? "rotate-180" : ""}`} />
            </button>
            <div className={`absolute left-0 top-full w-80 rounded-2xl border border-border bg-card pt-2 shadow-[var(--shadow-card)] max-h-[calc(100vh-5rem)] overflow-y-auto ${desktopOpen ? "block" : "hidden"}`}>
              <div className="px-3 pb-2">
                <p className="px-2 py-1.5 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Textile &amp; Auto</p>
                {MENU_TEXTILE.map((s) => (
                  <Link
                    key={s.slug}
                    to={s.slug}
                    onClick={close}
                    className="flex items-center gap-2 rounded-lg px-2 py-2 text-sm text-foreground hover:bg-secondary hover:text-primary transition-colors"
                  >
                    <ChevronRight className="size-3.5 text-muted-foreground shrink-0" />
                    {s.navLabel}
                  </Link>
                ))}
              </div>
              <div className="border-t border-border px-3 pb-3 pt-2">
                <p className="px-2 py-1.5 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Services de nettoyage</p>
                {MENU_BATIMENT.map((s) => (
                  <Link
                    key={s.slug}
                    to={s.slug}
                    onClick={close}
                    className="flex items-center gap-2 rounded-lg px-2 py-2 text-sm text-foreground hover:bg-secondary hover:text-primary transition-colors"
                  >
                    <ChevronRight className="size-3.5 text-muted-foreground shrink-0" />
                    {s.navLabel}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <Link to="/nos-realisations" className="px-3 py-2 text-sm font-medium text-foreground/75 transition-colors hover:text-primary">
            Réalisations
          </Link>
          <Link to="/tarifs" className="px-3 py-2 text-sm font-medium text-foreground/75 transition-colors hover:text-primary">
            Tarifs
          </Link>
          <Link to="/contactez-nous" className="px-3 py-2 text-sm font-medium text-foreground/75 transition-colors hover:text-primary">
            Contact
          </Link>
        </nav>

        {/* Desktop CTAs */}
        <div className="hidden items-center gap-2 lg:flex">
          <Button asChild variant="ghost" size="sm" className="text-foreground/75 hover:text-primary">
            <a href={COMPANY.phoneHref}>
              <Phone className="size-4" /> {COMPANY.phone}
            </a>
          </Button>
          <Button asChild size="sm" className="bg-accent-gradient text-accent-foreground font-semibold shadow-[var(--shadow-soft)] hover:opacity-90">
            <Link to="/formules">
              <CalendarCheck className="size-4" /> Réserver en ligne
            </Link>
          </Button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="flex size-9 md:size-10 items-center justify-center rounded-lg border border-border bg-card text-foreground/70 shadow-sm hover:bg-secondary lg:hidden"
          aria-label="Ouvrir le menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {/* ── MENU MOBILE ── */}
      {open && (
        <div className="border-t border-border bg-background lg:hidden overflow-y-auto max-h-[80vh]">
          <div className="px-4 py-4 space-y-1">

            <Link to="/" onClick={close} className="block rounded-xl px-3 py-2.5 font-semibold text-foreground hover:bg-secondary hover:text-primary transition-colors">
              Accueil
            </Link>

            {/* Services accordion */}
            <div>
              <button
                onClick={() => setServicesOpen((v) => !v)}
                className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 font-semibold text-foreground hover:bg-secondary hover:text-primary transition-colors"
              >
                Nos services
                <ChevronDown className={`size-4 transition-transform ${servicesOpen ? "rotate-180" : ""}`} />
              </button>

              {servicesOpen && (
                <div className="mt-1 ml-3 space-y-4 rounded-xl border border-border bg-secondary/40 px-3 py-3">
                  {/* Textile */}
                  <div>
                    <p className="mb-1.5 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                      Textile &amp; Auto
                    </p>
                    <div className="space-y-0.5">
                      {MENU_TEXTILE.map((s) => (
                        <Link
                          key={s.slug}
                          to={s.slug}
                          onClick={close}
                          className="flex items-center gap-2 rounded-lg px-2 py-2 text-sm font-medium text-foreground hover:bg-card hover:text-primary transition-colors"
                        >
                          <ChevronRight className="size-3.5 text-primary shrink-0" />
                          {s.navLabel}
                        </Link>
                      ))}
                    </div>
                  </div>
                  {/* Bâtiment */}
                  <div>
                    <p className="mb-1.5 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                      Services de nettoyage
                    </p>
                    <div className="space-y-0.5">
                      {MENU_BATIMENT.map((s) => (
                        <Link
                          key={s.slug}
                          to={s.slug}
                          onClick={close}
                          className="flex items-center gap-2 rounded-lg px-2 py-2 text-sm font-medium text-foreground hover:bg-card hover:text-primary transition-colors"
                        >
                          <ChevronRight className="size-3.5 text-primary shrink-0" />
                          {s.navLabel}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Link to="/nos-realisations" onClick={close} className="block rounded-xl px-3 py-2.5 font-semibold text-foreground hover:bg-secondary hover:text-primary transition-colors">
              Réalisations
            </Link>
            <Link to="/tarifs" onClick={close} className="block rounded-xl px-3 py-2.5 font-semibold text-foreground hover:bg-secondary hover:text-primary transition-colors">
              Tarifs
            </Link>
            <Link to="/contactez-nous" onClick={close} className="block rounded-xl px-3 py-2.5 font-semibold text-foreground hover:bg-secondary hover:text-primary transition-colors">
              Contact
            </Link>
          </div>

          {/* Mobile CTAs */}
          <div className="border-t border-border px-4 py-4 grid gap-2">
            <Button asChild className="w-full bg-accent-gradient text-accent-foreground font-bold hover:opacity-90">
              <Link to="/formules" onClick={close}>
                <CalendarCheck className="size-4" /> Réserver en ligne
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full">
              <a href={COMPANY.phoneHref} onClick={close}>
                <Phone className="size-4" /> {COMPANY.phone}
              </a>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
