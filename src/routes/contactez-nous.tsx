import { conversionMetric, quoteConfirmedMetric } from "@/lib/conversionMetrics";
import { analyticsTestMode } from "@/lib/analyticsPolicy";
import { useEffect, useRef, useState } from "react";
import { prepareQuotePhotos, validateQuotePhotos } from "@/lib/quotePhotos";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Mail, Phone, Clock, MapPin, Camera } from "lucide-react";
import { quoteSchema as schema } from "@/lib/quoteSchema";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { COMMUNES, COMPANY, SITE_URL } from "@/data/site";

const TITLE = "Contactez Clean&Fresh — Devis gratuit nettoyage Toulouse";
const DESC = "Demandez un devis nettoyage à Toulouse pour un logement, un débarras Diogène, des vitres ou une fin de bail. Indiquez la surface à nettoyer, son état et joignez vos photos.";

const QUOTE_SERVICES: Record<string, string> = { logement: "Nettoyage appartement / maison", diogene: "Tri, débarras et nettoyage Diogène", extreme: "Nettoyage de logement insalubre", chantier: "Nettoyage fin de chantier", bail: "Nettoyage fin de bail", vitres: "Nettoyage de vitres", terrasse: "Nettoyage terrasse" };

export const Route = createFileRoute("/contactez-nous")({
  validateSearch: (search: Record<string, unknown>): { service?: string } => ({ service: typeof search.service === "string" && Object.hasOwn(QUOTE_SERVICES, search.service) ? search.service : undefined }),
  head: () => ({
    meta: [
      { title: `Contactez Clean&Fresh — Devis gratuit nettoyage Toulouse` },
      { name: "description", content: `Demandez un devis nettoyage à Toulouse pour un logement, un débarras Diogène, des vitres ou une fin de bail. Indiquez la surface à nettoyer, son état et joignez vos photos.` },
      { property: "og:title", content: `Contactez Clean&Fresh — Devis gratuit nettoyage Toulouse` },
      { property: "og:description", content: `Demandez un devis nettoyage à Toulouse pour un logement, un débarras Diogène, des vitres ou une fin de bail. Indiquez la surface à nettoyer, son état et joignez vos photos.` },
      { property: "og:url", content: `https://cleanetfresh.fr/contactez-nous` },
      { name: "twitter:title", content: `Contactez Clean&Fresh — Devis gratuit nettoyage Toulouse` },
      { name: "twitter:description", content: `Demandez un devis nettoyage à Toulouse pour un logement, un débarras Diogène, des vitres ou une fin de bail. Indiquez la surface à nettoyer, son état et joignez vos photos.` },
    ],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org", "@type": "ContactPage",
        url: SITE_URL + "/contactez-nous", name: TITLE,
        about: { "@type": "LocalBusiness", name: "Clean&Fresh", url: SITE_URL },
      }),
    }],
    links: [{ rel: "canonical", href: `https://cleanetfresh.fr/contactez-nous` }],
  }),
  component: ContactPage,
});

const QUICK_SERVICES: Record<string, string> = {
  "Nettoyage canapé": "canape", "Nettoyage matelas": "matelas", "Nettoyage tapis": "tapis",
  "Nettoyage moquette": "moquette", "Nettoyage cuir": "cuir", "Nettoyage auto (intérieur)": "auto",
};
const SERVICES_LIST = [...Object.values(QUOTE_SERVICES), "Autre", ...Object.keys(QUICK_SERVICES)];

function ContactPage() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { service: requestedService } = Route.useSearch();
  const [selectedService, setSelectedService] = useState(QUOTE_SERVICES[requestedService ?? ""] ?? "");
  const [sent, setSent] = useState(false);
  const quoteCategory = Object.keys(QUOTE_SERVICES).find(key => QUOTE_SERVICES[key] === selectedService);
  const needsDiscretion = quoteCategory === "diogene" || quoteCategory === "extreme";
  const metricCategory = needsDiscretion ? "remise_en_etat" : quoteCategory ?? (QUICK_SERVICES[selectedService] ? "textile_auto" : "autre");
  const quoteStarted = useRef(false);
  const measurementId = useRef<string | undefined>(undefined);
  useEffect(() => { setSelectedService(QUOTE_SERVICES[requestedService ?? ""] ?? ""); setSent(false); }, [requestedService]);
  const [photoCount, setPhotoCount] = useState(0);

  const [sendError, setSendError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  useEffect(() => {
    const field = formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]');
    if (!field) return;
    const details = field.closest("details");
    if (details) details.open = true;
    field.focus();
  }, [errors]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;
    setSendError("");

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    // A disabled placeholder is omitted from FormData; keep validation in French.
    data.service = selectedService;
    const photos = Array.from(form.querySelector<HTMLInputElement>("#photos")?.files ?? []);

    const result = schema.safeParse(data);
    const photoError = validateQuotePhotos(photos);
    if (!result.success || photoError) {
      const next: Record<string, string> = {};
      if (!result.success) {
        for (const issue of result.error.issues) next[String(issue.path[0])] = issue.message;
      }
      if (photoError) next.photos = photoError;
      setErrors(next);
      return;
    }
    setErrors({});
    setIsSubmitting(true);

    try {
      let attachment: File;
      try { attachment = await prepareQuotePhotos(photos); }
      catch (error) {
        setErrors({ photos: error instanceof Error ? error.message : "Impossible de préparer les photos. Réessayez avec d’autres images." });
        return;
      }
      const pdf = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(String(reader.result).split(',')[1] ?? '');
        reader.onerror = () => reject(new Error('Lecture des photos impossible.'));
        reader.readAsDataURL(attachment);
      });
      // Keep the same measurement ID on retry; it contains no form data.
      try { measurementId.current ??= crypto.randomUUID(); } catch { /* Server supplies the ID if unavailable. */ }
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...result.data, photoCount: photos.length, pdf, measurement_id: measurementId.current, analytics_test: analyticsTestMode() }),
      });

      const resData = await response.json();

      if (response.ok && resData.success) {
        setSent(true);
        quoteConfirmedMetric(resData, photos.length > 0, metricCategory);
        measurementId.current = undefined;
        quoteStarted.current = false;
        form.reset();
        setSelectedService(QUOTE_SERVICES[requestedService ?? ""] ?? "");
        form.querySelector("details")?.removeAttribute("open");
        setPhotoCount(0);
      } else {
        conversionMetric("quote_error", { has_photos: photos.length > 0 });
        setSendError(response.status === 429
          ? "Plusieurs demandes ont été envoyées récemment. Réessayez dans dix minutes ou appelez-nous."
          : "L’envoi de votre demande n’a pas été confirmé. Réessayez dans un moment.");
      }
    } catch {
      conversionMetric("quote_error", { has_photos: photos.length > 0 });
      setSendError("L’envoi de votre demande n’a pas été confirmé. Vérifiez votre connexion et réessayez.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white pb-24 lg:pb-0">
      <header
        className="bg-[#082f49] text-white"
        style={{ backgroundImage: "linear-gradient(to bottom, rgba(10,15,30,0.60) 0%, rgba(10,15,30,0.65) 60%, rgba(10,15,30,0.85) 100%), radial-gradient(ellipse at top right, #087fa2 0%, transparent 60%), linear-gradient(135deg, #071e32, #083b54)" }}
      >
        <div className="mx-auto max-w-3xl px-4 py-7 text-center md:py-10">
          <h1 className="text-3xl font-bold leading-tight tracking-tight md:text-5xl">
            Obtenez votre devis de nettoyage gratuit sous 24 h
          </h1>
          <p className="mx-auto mt-3 max-w-xl leading-relaxed text-white/90">
            Pour un logement, des vitres ou un extérieur à Toulouse et aux alentours, indiquez la prestation, l’adresse exacte et la surface ou le nombre d’éléments à nettoyer.
          </p>
        </div>
      </header>

      <section className="mx-auto grid max-w-5xl items-start gap-6 px-4 pb-16 pt-6 md:grid-cols-[1.4fr_1fr] md:pt-8">
        {/* Form card */}
        {sent ? (
          <div className="space-y-4 rounded-2xl border border-border p-6">
            <div role="status">
              <h2 className="text-xl font-bold">Votre demande de devis a bien été envoyée</h2>
              <p className="mt-2 text-sm">Nous avons reçu votre demande et vos photos. Nous vous répondrons sous 24 h aux coordonnées indiquées.</p>
            </div>
            <Button type="button" variant="outline" onClick={() => setSent(false)}>Faire une autre demande</Button>
          </div>
        ) : <form
          ref={formRef}
          onSubmit={onSubmit}
          onFocusCapture={() => { if (!quoteStarted.current) { quoteStarted.current = true; conversionMetric("quote_started"); } }}
          noValidate
          className="space-y-4"
        >
          {Object.values(errors).some(Boolean) && (
            <div role="alert" className="rounded-xl border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive">
              Merci de corriger les champs signalés ci-dessous. Vos informations sont conservées.
            </div>
          )}
          {/* Service select */}
          <div className="grid gap-1">
            <Label htmlFor="service" className="text-sm text-muted-foreground font-normal">Que souhaitez-vous faire nettoyer ?</Label>
            <div className="relative">
              <select
                id="service"
                name="service" required aria-invalid={!!errors["service"]} aria-describedby={errors["service"] ? "service-error" : undefined}
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
                className="w-full appearance-none rounded-none border-0 border-b border-border bg-transparent px-0 py-2 text-sm text-foreground shadow-none outline-none focus:border-primary focus:ring-0 transition-colors"
              >
                <option value="" disabled>Sélectionnez un service...</option>
                {SERVICES_LIST.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
              {/* Chevron */}
              <svg className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            {errors["service"] && <p id="service-error" className="text-xs text-destructive">{errors["service"]}</p>}
          </div>

          {needsDiscretion && (
            <div className="rounded-xl border border-border p-4 text-sm">
              <p>Vous préférez expliquer la situation de vive voix ? Vous pouvez commencer par un appel. Pour un devis en ligne, photographiez les zones à traiter en évitant les visages et les documents personnels.</p>
              <a href={COMPANY.phoneHref} className="mt-1 inline-flex min-h-11 items-center gap-2 font-semibold text-primary underline"><Phone aria-hidden="true" className="size-4" />Appeler le {COMPANY.phone}</a>
            </div>
          )}
          {QUICK_SERVICES[selectedService] && (
            <div className="rounded-xl border border-primary/20 bg-primary/5 p-4 text-sm text-foreground/80">
              Les tarifs de cette prestation sont disponibles en ligne. Choisissez votre formule et votre créneau, ou ajoutez plusieurs articles au même rendez-vous.
              <Link to="/reserver" search={{ service: QUICK_SERVICES[selectedService], formule: "", from: "quote_form" }} className="mt-2 flex min-h-11 w-fit items-center font-bold text-primary underline">Voir les prix et réserver</Link>
            </div>
          )}

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="grid gap-1 sm:col-span-2">
              <Label htmlFor="adresse" className="text-sm text-muted-foreground font-normal">Adresse exacte du lieu à nettoyer</Label>
              <Input id="adresse" name="adresse" required aria-invalid={!!errors["adresse"]} aria-describedby={errors["adresse"] ? "adresse-error" : undefined} maxLength={200} placeholder="Ex. 12 rue des Lilas, 31130 Balma" className="rounded-none border-0 border-b border-border bg-transparent px-0 py-2 text-sm shadow-none focus-visible:ring-0 focus-visible:border-primary transition-colors" />
              {errors["adresse"] && <p id="adresse-error" className="text-xs text-destructive">{errors["adresse"]}</p>}
            </div>
            <div className="grid gap-1">
              <Label htmlFor="surface" className="text-sm text-muted-foreground font-normal">Surface ou quantité à nettoyer (obligatoire)</Label>
              <Input id="surface" name="surface" required aria-invalid={!!errors["surface"]} aria-describedby={errors["surface"] ? "surface-error" : undefined} maxLength={100} placeholder="Ex. 52 m² ou 12 vitres" className="rounded-none border-0 border-b border-border bg-transparent px-0 py-2 text-sm shadow-none focus-visible:ring-0 focus-visible:border-primary transition-colors" />
              {errors["surface"] && <p id="surface-error" className="text-xs text-destructive">{errors["surface"]}</p>}
            </div>
            <div className="grid gap-1">
              <Label htmlFor="dateSouhaitee" className="text-sm text-muted-foreground font-normal">Date souhaitée (facultatif)</Label>
              <Input id="dateSouhaitee" name="dateSouhaitee" aria-invalid={!!errors["dateSouhaitee"]} aria-describedby={errors["dateSouhaitee"] ? "dateSouhaitee-error" : undefined} maxLength={100} placeholder="Ex. avant mon état des lieux de vendredi" className="rounded-none border-0 border-b border-border bg-transparent px-0 py-2 text-sm shadow-none focus-visible:ring-0 focus-visible:border-primary transition-colors" />
              {errors["dateSouhaitee"] && <p id="dateSouhaitee-error" className="text-xs text-destructive">{errors["dateSouhaitee"]}</p>}
            </div>
          </div>

          <div className="grid gap-1">
            <Label htmlFor="etat" className="text-sm text-muted-foreground font-normal">
              {["logement", "bail", "diogene", "extreme"].some(key => QUOTE_SERVICES[key] === selectedService) ? "État actuel du logement" : "État actuel du logement ou de la zone à nettoyer"} (obligatoire)
            </Label>
            <Textarea id="etat" name="etat" required rows={2} maxLength={1000} aria-invalid={!!errors["etat"]} aria-describedby={errors["etat"] ? "etat-error" : undefined} placeholder="Ex. logement vide, cuisine grasse, traces de calcaire dans la douche…" className="min-h-16 resize-y" />
            {errors["etat"] && <p id="etat-error" className="text-xs text-destructive">{errors["etat"]}</p>}
          </div>

          <div className="grid gap-2 rounded-xl border border-dashed border-border bg-secondary/20 p-4">
            <Label htmlFor="photos" className="flex items-center gap-2 text-sm font-semibold"><Camera className="size-4 text-primary" />Photos de l’état actuel (obligatoires)</Label>
            <Input id="photos" name="photos" type="file" required accept="image/jpeg,image/png,image/webp" multiple disabled={isSubmitting} aria-invalid={!!errors["photos"]} aria-describedby={errors["photos"] ? "photos-help photos-error" : "photos-help"} onChange={(event) => {
              const files = Array.from(event.target.files ?? []);
              setPhotoCount(files.length);
              const error = validateQuotePhotos(files);
              setErrors(previous => ({ ...previous, photos: error ?? "" }));
            }} className="cursor-pointer scroll-mt-40 lg:scroll-mt-52" />
            <p id="photos-help" className="text-xs text-muted-foreground">Joignez au moins une photo. Idéalement, ajoutez une vue d’ensemble et une ou deux photos des zones à traiter. Jusqu’à 10 photos, en JPG, PNG ou WebP (20 Mo par photo).</p>
            <p className="text-xs text-muted-foreground" aria-live="polite">{photoCount > 0 ? `${photoCount} photo${photoCount > 1 ? "s" : ""} sélectionnée${photoCount > 1 ? "s" : ""} / 10` : ""}</p>
            {photoCount > 0 && <button type="button" disabled={isSubmitting} className="w-fit text-sm font-medium text-primary underline" onClick={() => {
              const input = formRef.current?.querySelector<HTMLInputElement>("#photos");
              if (input) input.value = "";
              setPhotoCount(0);
              setErrors(previous => ({ ...previous, photos: "" }));
            }}>Retirer les photos</button>}
            {errors["photos"] && <p id="photos-error" className="text-xs text-destructive">{errors["photos"]}</p>}
          </div>

          <div className="grid grid-cols-2 gap-x-4 gap-y-3 sm:grid-cols-3">
            <div className="col-span-2 grid min-w-0 gap-1 sm:col-span-1">
              <Label htmlFor="nom" className="text-sm text-muted-foreground font-normal">Nom complet</Label>
              <Input id="nom" name="nom" required aria-invalid={!!errors["nom"]} aria-describedby={errors["nom"] ? "nom-error" : undefined} autoComplete="name" maxLength={100} placeholder="" className="rounded-none border-0 border-b border-border bg-transparent px-0 py-2 text-sm shadow-none focus-visible:ring-0 focus-visible:border-primary transition-colors" />
              {errors["nom"] && <p id="nom-error" className="text-xs text-destructive">{errors["nom"]}</p>}
            </div>
            <div className="grid min-w-0 gap-1">
              <Label htmlFor="email" className="text-sm text-muted-foreground font-normal">E-mail</Label>
              <Input id="email" name="email" required aria-invalid={!!errors["email"]} aria-describedby={errors["email"] ? "email-error" : undefined} type="email" autoComplete="email" maxLength={255} placeholder="" className="rounded-none border-0 border-b border-border bg-transparent px-0 py-2 text-sm shadow-none focus-visible:ring-0 focus-visible:border-primary transition-colors" />
              {errors["email"] && <p id="email-error" className="text-xs text-destructive">{errors["email"]}</p>}
            </div>
            <div className="grid min-w-0 gap-1">
              <Label htmlFor="telephone" className="text-sm text-muted-foreground font-normal">Téléphone (facultatif)</Label>
              <Input id="telephone" name="telephone" aria-invalid={!!errors["telephone"]} aria-describedby={errors["telephone"] ? "telephone-error" : undefined} type="tel" autoComplete="tel" maxLength={20} placeholder="" className="rounded-none border-0 border-b border-border bg-transparent px-0 py-2 text-sm shadow-none focus-visible:ring-0 focus-visible:border-primary transition-colors" />
              {errors["telephone"] && <p id="telephone-error" className="text-xs text-destructive">{errors["telephone"]}</p>}
            </div>
          </div>

          <details className="rounded-xl border border-border bg-card px-4">
            <summary className="cursor-pointer py-3 font-semibold">Précisions complémentaires <span className="font-normal text-muted-foreground">(facultatif)</span></summary>
            <div className="space-y-4 pb-4">
              <div className="grid gap-1">
                <Label htmlFor="acces" className="text-sm text-muted-foreground font-normal">Précisions sur l’accès</Label>
                <Input id="acces" name="acces" aria-invalid={!!errors["acces"]} aria-describedby={errors["acces"] ? "acces-error" : undefined} maxLength={300} placeholder="Ex. étage, ascenseur, accès à l’eau ou au stationnement" className="rounded-none border-0 border-b border-border bg-transparent px-0 py-2 text-sm shadow-none focus-visible:ring-0 focus-visible:border-primary transition-colors" />
                {errors["acces"] && <p id="acces-error" className="text-xs text-destructive">{errors["acces"]}</p>}
              </div>

              {/* Message */}
              <div className="grid gap-1">
                <Label htmlFor="message" className="text-sm text-muted-foreground font-normal">Détails de votre demande</Label>
                <Textarea
                  id="message"
                  name="message" aria-invalid={!!errors["message"]} aria-describedby={errors["message"] ? "message-error" : undefined}
                  rows={4}
                  maxLength={1000}
                  placeholder=""
                  className="rounded-none border-0 border-b border-border bg-transparent px-0 py-2 text-sm shadow-none focus-visible:ring-0 focus-visible:border-primary resize-none transition-colors"
                />
                {errors["message"] && <p id="message-error" className="text-xs text-destructive">{errors["message"]}</p>}
              </div>

            </div>
          </details>
          {sendError && <p role="alert" className="rounded-xl border border-destructive/30 p-3 text-sm">{sendError} Vos informations sont conservées. <a className="font-semibold underline" href={COMPANY.phoneHref}>Appeler le {COMPANY.phone}</a></p>}

          {/* Submit */}
          <div className="pt-2">
            <Button
              type="submit"
              size="xl"
              disabled={isSubmitting}
              className="w-full bg-accent-gradient text-accent-foreground font-bold hover:opacity-90 disabled:opacity-50 transition-colors"
            >
              {isSubmitting ? "Envoi en cours..." : "Demander un devis"}
            </Button>
          </div>
        </form>}

        {/* Sidebar */}
        <aside className="space-y-4">
          {/* Contact direct — dark card */}
          <div className="rounded-2xl bg-ink p-6 text-ink-foreground shadow-[var(--shadow-card)]">
            <h2 className="text-lg font-bold">Contact Direct</h2>

            <div className="mt-5 space-y-4">
              <div className="flex items-start gap-3">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-white/10">
                  <Phone className="size-4 text-ink-foreground" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-ink-foreground/50">Téléphone</p>
                  <a href={COMPANY.phoneHref} className="text-base font-bold text-ink-foreground hover:text-accent transition-colors">
                    {COMPANY.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-white/10">
                  <Mail className="size-4 text-ink-foreground" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-ink-foreground/50">Email</p>
                  <a href={`mailto:${COMPANY.email}`} className="text-sm font-medium text-ink-foreground/80 hover:text-ink-foreground break-all transition-colors">
                    {COMPANY.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-white/10">
                  <Clock className="size-4 text-ink-foreground" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-ink-foreground/50">Engagement</p>
                  <p className="text-base font-bold text-accent">Devis sous 24h</p>
                </div>
              </div>
            </div>
          </div>

          <section className="rounded-2xl border border-border bg-card p-6 text-sm leading-relaxed">
            <h2 className="text-base font-bold">Quelle prestation choisir ?</h2>
            <p className="mt-3">Pour rendre les clés, consultez le <a href="/nettoyage-fin-de-bail-toulouse" className="text-primary underline">nettoyage de fin de bail</a>. Pour un grand ménage ponctuel, découvrez ce qui est inclus dans le <a href="/nettoyage-dappartement-ou-maison" className="text-primary underline">nettoyage d’appartement ou de maison</a>.</p>
            <p className="mt-3">Si des pièces sont inaccessibles, décrivez les volumes à trier pour un <a href="/nettoyage-diogene-toulouse" className="text-primary underline">débarras et nettoyage Diogène</a>. Pour des surfaces accessibles mais très encrassées, consultez la <a href="/nettoyage-extreme-toulouse" className="text-primary underline">remise en état de logement insalubre</a>.</p>
            <p className="mt-3">Pour un canapé, un matelas, un tapis, une moquette, du cuir ou un intérieur de voiture, vous pouvez <a href="/formules" className="font-semibold text-primary underline">consulter les prix et réserver en ligne</a>. Plusieurs prestations peuvent être réunies sur le même créneau.</p>
          </section>
          {/* Zones */}
          <div className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-soft)]">
            <h2 className="flex items-center gap-2 text-base font-bold">
              <MapPin className="size-4 text-primary" /> Zones d'Intervention
            </h2>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
              Nous nous déplaçons directement chez vous avec notre matériel professionnel dans toute l'agglomération toulousaine.
            </p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {COMMUNES.map((c) => {
                const slug = c.toLowerCase().replace(/['\s]/g, "-");
                const hasPage = ["colomiers", "blagnac", "tournefeuille", "balma", "l-union"].includes(slug);
                return (
                  <li key={c} className="rounded-full border border-border bg-secondary text-xs font-semibold uppercase tracking-wide text-muted-foreground overflow-hidden">
                    {hasPage ? (
                      <a href={`/nettoyage-${slug}`} className="block px-3 py-1 hover:text-primary transition-colors">
                        {c}
                      </a>
                    ) : (
                      <span className="block px-3 py-1">{c}</span>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </aside>
      </section>
    </div>
  );
}
