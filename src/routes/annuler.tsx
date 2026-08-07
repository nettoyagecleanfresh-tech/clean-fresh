import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, XCircle, Phone, Mail, Loader2, CalendarX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { COMPANY } from "@/data/site";
import { cancelBookingServerFn } from "@/lib/cancelServerFn";

export const Route = createFileRoute("/annuler")({
  validateSearch: (s: Record<string, unknown>) => ({
    token: (s["token"] as string) ?? "",
  }),
  head: () => ({
    meta: [{ title: "Annuler mon rendez-vous — Clean&Fresh" }],
  }),
  component: AnnulerPage,
});

function AnnulerPage() {
  const { token } = Route.useSearch();
  const [step, setStep] = useState<"confirm" | "loading" | "done" | "error">("confirm");

  // Décoder les infos du token base64
  let info: { name: string; email: string; phone: string; formule: string; date: string; time: string; gcal_event_id?: string } | null = null;
  try {
    info = JSON.parse(decodeURIComponent(escape(atob(token))));
  } catch {
    info = null;
  }

  const handleCancel = async () => {
    if (!info) return;
    setStep("loading");
    try {
      // 1. Supprimer l'événement Google Calendar (côté serveur)
      await cancelBookingServerFn({
        data: {
          gcal_event_id: info.gcal_event_id ?? null,
          client_name:   info.name,
          client_phone:  info.phone,
          client_email:  info.email,
          formule:       info.formule,
          date:          info.date,
          time:          info.time,
        },
      });

      setStep("done");
    } catch {
      setStep("error");
    }
  };

  // Token invalide
  if (!info) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="max-w-md text-center">
          <XCircle className="size-16 text-destructive mx-auto" />
          <h1 className="mt-4 text-2xl font-bold">Lien invalide</h1>
          <p className="mt-2 text-muted-foreground">Ce lien d'annulation est invalide ou a expiré.</p>
          <p className="mt-4 text-sm text-muted-foreground">
            Pour annuler, appelez-nous au{" "}
            <a href={COMPANY.phoneHref} className="font-semibold text-primary hover:underline">{COMPANY.phone}</a>
            {" "}ou écrivez à{" "}
            <a href={`mailto:${COMPANY.email}`} className="font-semibold text-primary hover:underline">nous écrire</a>
          </p>
          <Link to="/" className="mt-6 inline-block text-sm text-muted-foreground hover:text-foreground">← Retour à l'accueil</Link>
        </div>
      </div>
    );
  }

  // Annulation confirmée
  if (step === "done") {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="max-w-md text-center">
          <CheckCircle2 className="size-16 text-primary mx-auto" />
          <h1 className="mt-4 text-2xl font-bold">Rendez-vous annulé</h1>
          <p className="mt-2 text-muted-foreground leading-relaxed">
            Votre rendez-vous du <strong>{info.date} à {info.time}</strong> a été annulé.
            Nous en avons été notifiés.
          </p>
          <p className="mt-4 text-sm text-muted-foreground">
            Besoin de replanifier ?{" "}
            <Link to="/formules" className="font-semibold text-primary hover:underline">Prendre un nouveau rendez-vous →</Link>
          </p>
          <Link to="/" className="mt-6 inline-block text-sm text-muted-foreground hover:text-foreground">← Retour à l'accueil</Link>
        </div>
      </div>
    );
  }

  // Page de confirmation d'annulation
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="flex size-16 items-center justify-center rounded-full bg-destructive/10 text-destructive mx-auto">
            <CalendarX className="size-8" />
          </div>
          <h1 className="mt-4 text-2xl font-bold">Annuler mon rendez-vous</h1>
          <p className="mt-2 text-muted-foreground">Voulez-vous vraiment annuler ce rendez-vous ?</p>
        </div>

        {/* Détails du RDV */}
        <div className="rounded-2xl border border-border bg-card p-5 space-y-3 mb-6">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Client</span>
            <span className="font-semibold">{info.name}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Prestation</span>
            <span className="font-semibold">{info.formule}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Date</span>
            <span className="font-semibold text-primary">{info.date} à {info.time}</span>
          </div>
        </div>

        <div className="space-y-3">
          <Button
            onClick={handleCancel}
            disabled={step === "loading"}
            variant="destructive"
            size="lg"
            className="w-full font-bold"
          >
            {step === "loading"
              ? <><Loader2 className="size-4 animate-spin" /> Annulation en cours…</>
              : <><CalendarX className="size-4" /> Confirmer l'annulation</>
            }
          </Button>

          <Link to="/reserver">
            <Button variant="outline" size="lg" className="w-full">
              Non, garder mon rendez-vous
            </Button>
          </Link>
        </div>

        {step === "error" && (
          <p className="mt-4 text-center text-sm text-destructive">
            Une erreur est survenue. Appelez-nous au{" "}
            <a href={COMPANY.phoneHref} className="font-semibold underline">{COMPANY.phone}</a>
          </p>
        )}

        {/* Contact direct */}
        <div className="mt-8 border-t border-border pt-6 text-center space-y-2">
          <p className="text-xs text-muted-foreground font-semibold uppercase tracking-widest">Ou contactez-nous directement</p>
          <a href={COMPANY.phoneHref} className="flex items-center justify-center gap-2 text-sm font-medium text-foreground hover:text-primary transition-colors">
            <Phone className="size-4" /> {COMPANY.phone}
          </a>
          <a href={`mailto:${COMPANY.email}`} className="flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
            <Mail className="size-4" /> Envoyer un e-mail
          </a>
        </div>
      </div>
    </div>
  );
}
