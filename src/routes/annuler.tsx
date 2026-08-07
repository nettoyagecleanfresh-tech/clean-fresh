import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, XCircle, Phone, Mail, Loader2, CalendarX, CalendarClock, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { COMPANY } from "@/data/site";
import { cancelBookingServerFn } from "@/lib/cancelServerFn";
import { rescheduleBookingServerFn } from "@/lib/rescheduleServerFn";
import { sendRescheduleEmail } from "@/lib/emailService";
import { CalendarPicker } from "@/components/CalendarPicker";
import { TimeSlotPicker } from "@/components/TimeSlotPicker";

export const Route = createFileRoute("/annuler")({
  validateSearch: (s: Record<string, unknown>) => ({
    token: (s["token"] as string) ?? "",
  }),
  head: () => ({
    meta: [{ title: "Gérer mon rendez-vous — Clean&Fresh" }],
  }),
  component: AnnulerPage,
});

function AnnulerPage() {
  const { token } = Route.useSearch();
  const [step, setStep] = useState<"choice" | "reschedule" | "loading" | "done_cancel" | "done_reschedule" | "error">("choice");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [slotError, setSlotError] = useState(false);

  let info: { name: string; email: string; phone: string; formule: string; date: string; time: string; gcal_event_id?: string; dur: number } | null = null;
  try {
    const raw = JSON.parse(decodeURIComponent(escape(atob(token))));
    if (raw.n || raw.name) {
      info = {
        name: raw.n || raw.name,
        email: raw.e || raw.email || "non-renseigne@email.fr",
        phone: raw.phone || "",
        formule: raw.f || raw.formule,
        date: raw.d || raw.date,
        time: raw.t || raw.time,
        gcal_event_id: raw.i || raw.gcal_event_id,
        dur: raw.dur || 120, // default 2h if not provided
      };
    }
  } catch {
    info = null;
  }

  const handleCancel = async () => {
    if (!info) return;
    setStep("loading");
    try {
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
      setStep("done_cancel");
    } catch {
      setStep("error");
    }
  };

  const handleReschedule = async () => {
    if (!info || !selectedDate || !selectedTime || !info.gcal_event_id) return;
    setStep("loading");
    setSlotError(false);
    
    const newDateStr = `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}`;
    
    try {
      const result = await rescheduleBookingServerFn({
        data: {
          gcal_event_id: info.gcal_event_id,
          new_date: newDateStr,
          new_time: selectedTime,
          duration_min: info.dur,
        }
      });

      if (!result.success && result.error === "SLOT_TAKEN") {
        setSlotError(true);
        setStep("reschedule");
        setSelectedTime(null);
        return;
      }

      // Envoi de l'email
      const siteUrl = "https://www.cleanetfresh.fr";
      await sendRescheduleEmail({
        client_name: info.name,
        client_email: info.email,
        formule: info.formule,
        new_date: newDateStr,
        new_time: selectedTime,
        cancel_url: `${siteUrl}/annuler?token=${token}`, // Re-use old token (gcal_id is same)
      }).catch(console.error);

      setStep("done_reschedule");
    } catch {
      setStep("error");
    }
  };

  if (!info) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="max-w-md text-center">
          <XCircle className="size-16 text-destructive mx-auto" />
          <h1 className="mt-4 text-2xl font-bold">Lien invalide</h1>
          <p className="mt-2 text-muted-foreground">Ce lien est invalide ou a expiré.</p>
          <Link to="/" className="mt-6 inline-block text-sm text-muted-foreground hover:text-foreground">← Retour à l'accueil</Link>
        </div>
      </div>
    );
  }

  if (step === "done_cancel") {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="max-w-md text-center">
          <CheckCircle2 className="size-16 text-primary mx-auto" />
          <h1 className="mt-4 text-2xl font-bold">Rendez-vous annulé</h1>
          <p className="mt-2 text-muted-foreground leading-relaxed">Votre rendez-vous du <strong>{info.date} à {info.time}</strong> a été annulé.</p>
          <Link to="/" className="mt-6 inline-block text-sm text-muted-foreground hover:text-foreground">← Retour à l'accueil</Link>
        </div>
      </div>
    );
  }

  if (step === "done_reschedule") {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="max-w-md text-center">
          <CheckCircle2 className="size-16 text-primary mx-auto" />
          <h1 className="mt-4 text-2xl font-bold">Rendez-vous reprogrammé !</h1>
          <p className="mt-2 text-muted-foreground leading-relaxed">
            Votre rendez-vous a bien été déplacé au <strong>{selectedDate?.toLocaleDateString("fr-FR")} à {selectedTime}</strong>.<br/>
            Un email de confirmation vient de vous être envoyé.
          </p>
          <Link to="/" className="mt-6 inline-block text-sm text-muted-foreground hover:text-foreground">← Retour à l'accueil</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center py-16 px-4">
      <div className="w-full max-w-xl">
        
        {step === "choice" && (
          <div className="text-center space-y-6">
            <h1 className="text-2xl font-bold">Gérer mon rendez-vous</h1>
            
            <div className="rounded-2xl border border-border bg-card p-5 text-left">
              <div className="flex justify-between text-sm py-2">
                <span className="text-muted-foreground">Client</span>
                <span className="font-semibold">{info.name}</span>
              </div>
              <div className="flex justify-between text-sm py-2">
                <span className="text-muted-foreground">Prestation</span>
                <span className="font-semibold">{info.formule}</span>
              </div>
              <div className="flex justify-between text-sm py-2">
                <span className="text-muted-foreground">Date actuelle</span>
                <span className="font-semibold text-primary">{info.date} à {info.time}</span>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <Button onClick={() => setStep("reschedule")} size="lg" className="h-auto py-4 flex flex-col gap-2">
                <CalendarClock className="size-6" />
                <span className="font-bold">Reprogrammer</span>
                <span className="text-xs opacity-80 font-normal">Choisir une autre date</span>
              </Button>
              <Button onClick={handleCancel} variant="destructive" size="lg" className="h-auto py-4 flex flex-col gap-2">
                <CalendarX className="size-6" />
                <span className="font-bold">Annuler</span>
                <span className="text-xs opacity-80 font-normal">Supprimer définitivement</span>
              </Button>
            </div>
            <Link to="/">
              <Button variant="ghost" className="mt-4">Ne rien changer, retour accueil</Button>
            </Link>
          </div>
        )}

        {step === "reschedule" && (
          <div className="space-y-6">
            <div className="flex items-center gap-4 mb-8">
              <Button onClick={() => setStep("choice")} variant="ghost" size="icon"><ArrowLeft className="size-5" /></Button>
              <h2 className="text-xl font-bold">Choisir une nouvelle date</h2>
            </div>
            
            {slotError && (
              <div className="bg-destructive/10 text-destructive p-3 rounded-lg text-sm font-semibold text-center mb-4">
                Ce créneau vient d'être réservé, veuillez en choisir un autre.
              </div>
            )}

            <CalendarPicker 
              totalDuration={info.dur}
              selectedDate={selectedDate}
              onSelect={(d) => { setSelectedDate(d); setSelectedTime(null); setSlotError(false); }}
            />
            {selectedDate && (
              <TimeSlotPicker 
                date={selectedDate}
                totalDuration={info.dur}
                selected={selectedTime}
                onSelect={setSelectedTime}
              />
            )}

            <Button
              disabled={!selectedTime}
              onClick={handleReschedule}
              size="lg"
              className="w-full mt-4 bg-primary text-primary-foreground font-bold text-lg h-14"
            >
              Valider la nouvelle date
            </Button>
          </div>
        )}

        {step === "loading" && (
          <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
            <Loader2 className="size-10 animate-spin mb-4" />
            <p>Mise à jour de votre agenda en cours...</p>
          </div>
        )}

        {step === "error" && (
          <div className="text-center py-12">
            <XCircle className="size-12 text-destructive mx-auto mb-4" />
            <h2 className="text-xl font-bold">Erreur technique</h2>
            <p className="mt-2 text-muted-foreground">Impossible de mettre à jour le rendez-vous. Veuillez nous contacter.</p>
            <div className="mt-6 flex flex-col items-center gap-3">
              <a href={COMPANY.phoneHref} className="flex items-center gap-2 font-semibold text-primary"><Phone className="size-4"/> {COMPANY.phone}</a>
              <Button onClick={() => setStep("choice")} variant="outline">Retour</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
