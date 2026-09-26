import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Mail, Phone, Clock, MapPin, ArrowRight, Camera } from "lucide-react";
import { z } from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { COMMUNES, COMPANY, SITE_URL } from "@/data/site";

const TITLE = "Contactez Clean&Fresh — Devis gratuit nettoyage Toulouse";
const DESC = "Contactez Clean&Fresh pour un devis gratuit sous 24h : nettoyage canapé, matelas, tapis, auto à domicile à Toulouse. Réponse rapide, tarifs clairs.";

export const Route = createFileRoute("/contactez-nous")({
  head: () => ({
    meta: [
      { title: `Contactez Clean&Fresh — Devis gratuit nettoyage Toulouse` },
      { name: "description", content: `Contactez Clean&Fresh pour un devis gratuit sous 24h : nettoyage canapé, matelas, tapis, auto à domicile à Toulouse. Réponse rapide, tarifs clairs.` },
      { property: "og:title", content: `Contactez Clean&Fresh — Devis gratuit nettoyage Toulouse` },
      { property: "og:description", content: `Contactez Clean&Fresh pour un devis gratuit sous 24h : nettoyage canapé, matelas, tapis, auto à domicile à Toulouse. Réponse rapide, tarifs clairs.` },
      { property: "og:url", content: `https://www.cleanetfresh.fr/contactez-nous` },
      { name: "twitter:title", content: `Contactez Clean&Fresh — Devis gratuit nettoyage Toulouse` },
      { name: "twitter:description", content: `Contactez Clean&Fresh pour un devis gratuit sous 24h : nettoyage canapé, matelas, tapis, auto à domicile à Toulouse. Réponse rapide, tarifs clairs.` },
    ],
    links: [{ rel: "canonical", href: `https://www.cleanetfresh.fr/contactez-nous` }],
  }),
  component: ContactPage,
});

const SERVICES_LIST = [
  "Nettoyage canapé",
  "Nettoyage matelas",
  "Nettoyage tapis",
  "Nettoyage moquette",
  "Nettoyage cuir",
  "Nettoyage auto (intérieur)",
  "Nettoyage de vitres",
  "Nettoyage terrasse",
  "Nettoyage toiture",
  "Nettoyage façade",
  "Nettoyage appartement / maison",
  "Nettoyage fin de chantier",
  "Nettoyage fin de bail",
  "Nettoyage Diogène / logement insalubre",
  "Nettoyage extrême",
  "Autre",
];

const schema = z.object({
  nom: z.string().trim().min(2, "Merci d'indiquer votre nom").max(100),
  telephone: z.string().trim().min(6, "Numéro invalide").max(20),
  email: z.string().trim().email("Adresse email invalide").max(255),
  service: z.string().min(1, "Veuillez sélectionner un service"),
  adresse: z.string().trim().min(5, "Merci d'indiquer l'adresse d'intervention").max(200),
  surface: z.string().trim().min(1, "Merci d'indiquer la surface ou les dimensions").max(100),
  dateSouhaitee: z.string().trim().min(2, "Merci d'indiquer la date ou le délai souhaité").max(100),
  acces: z.string().trim().min(2, "Merci de préciser l'accès à l'eau et à l'électricité").max(300),
  message: z.string().trim().min(10, "Merci de détailler votre demande").max(1000),
});

function ContactPage() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [selectedService, setSelectedService] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    const photos = form.querySelector<HTMLInputElement>("#photos")?.files;

    const result = schema.safeParse(data);
    if (!result.success) {
      const next: Record<string, string> = {};
      for (const issue of result.error.issues) next[String(issue.path[0])] = issue.message;
      setErrors(next);
      return;
    }
    if (photos?.[0] && photos[0].size > 5 * 1024 * 1024) {
      setErrors({ photos: "La photo doit peser moins de 5 Mo" });
      return;
    }
    setErrors({});
    setIsSubmitting(true);

    try {
      // Intégration de Web3Forms pour contourner EmailJS
      const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
      
      if (!accessKey) {
        toast.error("Clé Web3Forms manquante (VITE_WEB3FORMS_ACCESS_KEY).");
        setIsSubmitting(false);
        return;
      }

      const formDataForWeb3 = new FormData();
      formDataForWeb3.append("access_key", accessKey);
      formDataForWeb3.append("subject", `Nouveau message de ${result.data.nom}`);
      formDataForWeb3.append("from_name", "Clean&Fresh Contact");
      // Mettre l'email du client en "Reply-To" pour pouvoir lui répondre directement
      formDataForWeb3.append("replyto", result.data.email);
      
      // Contenu du message
      formDataForWeb3.append("Nom", result.data.nom);
      formDataForWeb3.append("Téléphone", result.data.telephone);
      formDataForWeb3.append("Email", result.data.email);
      formDataForWeb3.append("Prestation", result.data.service);
      formDataForWeb3.append("Adresse d'intervention", result.data.adresse);
      formDataForWeb3.append("Surface ou dimensions", result.data.surface);
      formDataForWeb3.append("Date ou délai souhaité", result.data.dateSouhaitee);
      formDataForWeb3.append("Accès et besoins techniques", result.data.acces);
      formDataForWeb3.append("Message", result.data.message);
      if (photos?.[0]) formDataForWeb3.append("attachment", photos[0]);

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formDataForWeb3,
      });

      const resData = await response.json();

      if (resData.success) {
        toast.success("Votre message a été envoyé avec succès. Nous vous répondons sous 24h.");
        form.reset();
        setSelectedService("");
      } else {
        throw new Error(resData.message || "Erreur Web3Forms");
      }
    } catch (err) {
      console.error(err);
      toast.error("Une erreur s'est produite lors de l'envoi de votre message.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pb-24 lg:pb-0">
      {/* ── TITLE ── */}
      <div className="mx-auto max-w-3xl px-4 pt-16 pb-10 text-center">
        <h1 className="text-4xl font-bold leading-tight tracking-tight md:text-5xl">
          Demander un Devis Gratuit
        </h1>
        <p className="mt-4 text-muted-foreground leading-relaxed max-w-xl mx-auto">
          Donnez-nous les informations utiles et, si possible, quelques photos. Vous recevrez
          une proposition adaptée sous 24 heures.
        </p>
      </div>

      {/* ── FORM + SIDEBAR ── */}
      <section className="mx-auto grid max-w-5xl gap-6 px-4 pb-16 md:grid-cols-[1.4fr_1fr] items-start">

        {/* Form card */}
        <form
          onSubmit={onSubmit}
          noValidate
          className="space-y-6"
        >
          {/* Nom + Téléphone side by side */}
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="grid gap-1">
              <Label htmlFor="nom" className="text-sm text-muted-foreground font-normal">Nom complet</Label>
              <Input id="nom" name="nom" autoComplete="off" maxLength={100} placeholder="" className="rounded-none border-0 border-b border-border bg-transparent px-0 py-2 text-sm shadow-none focus-visible:ring-0 focus-visible:border-primary transition-colors" />
              {errors["nom"] && <p className="text-xs text-destructive">{errors["nom"]}</p>}
            </div>
            <div className="grid gap-1">
              <Label htmlFor="telephone" className="text-sm text-muted-foreground font-normal">Téléphone</Label>
              <Input id="telephone" name="telephone" autoComplete="off" maxLength={20} placeholder="" className="rounded-none border-0 border-b border-border bg-transparent px-0 py-2 text-sm shadow-none focus-visible:ring-0 focus-visible:border-primary transition-colors" />
              {errors["telephone"] && <p className="text-xs text-destructive">{errors["telephone"]}</p>}
            </div>
          </div>

          {/* Email */}
          <div className="grid gap-1">
            <Label htmlFor="email" className="text-sm text-muted-foreground font-normal">Email</Label>
            <Input id="email" name="email" type="email" autoComplete="off" maxLength={255} placeholder="" className="rounded-none border-0 border-b border-border bg-transparent px-0 py-2 text-sm shadow-none focus-visible:ring-0 focus-visible:border-primary transition-colors" />
            {errors["email"] && <p className="text-xs text-destructive">{errors["email"]}</p>}
          </div>

          {/* Service select */}
          <div className="grid gap-1">
            <Label htmlFor="service" className="text-sm text-muted-foreground font-normal">Type de prestation</Label>
            <div className="relative">
              <select
                id="service"
                name="service"
                defaultValue=""
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
            {errors["service"] && <p className="text-xs text-destructive">{errors["service"]}</p>}
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="grid gap-1 sm:col-span-2">
              <Label htmlFor="adresse" className="text-sm text-muted-foreground font-normal">Adresse exacte de l'intervention</Label>
              <Input id="adresse" name="adresse" autoComplete="street-address" maxLength={200} placeholder="Numéro, rue, code postal et ville" className="rounded-none border-0 border-b border-border bg-transparent px-0 py-2 text-sm shadow-none focus-visible:ring-0 focus-visible:border-primary transition-colors" />
              {errors["adresse"] && <p className="text-xs text-destructive">{errors["adresse"]}</p>}
            </div>
            <div className="grid gap-1">
              <Label htmlFor="surface" className="text-sm text-muted-foreground font-normal">Surface ou dimensions</Label>
              <Input id="surface" name="surface" maxLength={100} placeholder="Ex. 60 m², 12 fenêtres…" className="rounded-none border-0 border-b border-border bg-transparent px-0 py-2 text-sm shadow-none focus-visible:ring-0 focus-visible:border-primary transition-colors" />
              {errors["surface"] && <p className="text-xs text-destructive">{errors["surface"]}</p>}
            </div>
            <div className="grid gap-1">
              <Label htmlFor="dateSouhaitee" className="text-sm text-muted-foreground font-normal">Date ou délai souhaité</Label>
              <Input id="dateSouhaitee" name="dateSouhaitee" maxLength={100} placeholder="Ex. avant le 15 octobre" className="rounded-none border-0 border-b border-border bg-transparent px-0 py-2 text-sm shadow-none focus-visible:ring-0 focus-visible:border-primary transition-colors" />
              {errors["dateSouhaitee"] && <p className="text-xs text-destructive">{errors["dateSouhaitee"]}</p>}
            </div>
          </div>

          <div className="grid gap-1">
            <Label htmlFor="acces" className="text-sm text-muted-foreground font-normal">Accès à l'eau, à l'électricité et au logement</Label>
            <Input id="acces" name="acces" maxLength={300} placeholder="Prises disponibles, point d'eau, étage, ascenseur, stationnement…" className="rounded-none border-0 border-b border-border bg-transparent px-0 py-2 text-sm shadow-none focus-visible:ring-0 focus-visible:border-primary transition-colors" />
            {errors["acces"] && <p className="text-xs text-destructive">{errors["acces"]}</p>}
          </div>

          <div className="grid gap-2 rounded-xl border border-dashed border-border bg-secondary/20 p-4">
            <Label htmlFor="photos" className="flex items-center gap-2 text-sm font-semibold"><Camera className="size-4 text-primary" />Photos de l'état actuel</Label>
            <Input id="photos" name="photos" type="file" accept="image/jpeg,image/png,image/webp" className="cursor-pointer" />
            <p className="text-xs text-muted-foreground">Une photo facultative, 5 Mo maximum, aide à établir un devis précis.</p>
            {errors["photos"] && <p className="text-xs text-destructive">{errors["photos"]}</p>}
          </div>

          {["Nettoyage canapé", "Nettoyage matelas", "Nettoyage tapis", "Nettoyage cuir", "Nettoyage auto (intérieur)"].includes(selectedService) && (
            <div className="rounded-xl border border-primary/20 bg-primary/5 p-4 text-sm text-foreground/80">
              Pour cette prestation, vous pouvez aussi consulter les prix, ajouter plusieurs services et choisir votre créneau directement sur la page <a href="/formules" className="font-bold text-primary underline">Réserver en ligne</a>.
            </div>
          )}

          {/* Message */}
          <div className="grid gap-1">
            <Label htmlFor="message" className="text-sm text-muted-foreground font-normal">Détails de votre demande</Label>
            <Textarea
              id="message"
              name="message"
              rows={4}
              maxLength={1000}
              placeholder=""
              className="rounded-none border-0 border-b border-border bg-transparent px-0 py-2 text-sm shadow-none focus-visible:ring-0 focus-visible:border-primary resize-none transition-colors"
            />
            {errors["message"] && <p className="text-xs text-destructive">{errors["message"]}</p>}
          </div>

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
        </form>

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
