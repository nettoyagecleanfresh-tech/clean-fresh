import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { CheckCircle, Loader2, Phone, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { COMPANY } from "@/data/site";

export const Route = createFileRoute("/upsell")({
  component: UpsellPage,
  head: () => ({
    meta: [
      { title: "Ajout de prestation — Clean&Fresh" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
});

function UpsellPage() {
  const search = new URLSearchParams(window.location.search);
  const order   = search.get("order")  ?? "";
  const item    = search.get("item")   ?? "";
  const price   = search.get("price")  ?? "";
  const client  = search.get("client") ?? "";

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  useEffect(() => {
    if (!item) return; // pas de paramètre = page ouverte directement
    setStatus("loading");

    // Notification admin via Web3Forms (déjà configuré)
    const body = {
      access_key: import.meta.env.VITE_WEB3FORMS_ACCESS_KEY,
      subject: `🛒 Upsell demandé — Commande #${order}`,
      from_name: `Clean&Fresh — Site`,
      message: `
Nouveau upsell demandé par un client.

---
Commande n° : ${order}
Client       : ${client}
Option       : ${item}
Prix         : ${price} €
---

À traiter avant l'intervention.
      `.trim(),
    };

    fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(body),
    })
      .then((r) => r.json())
      .then((d) => setStatus(d.success ? "success" : "error"))
      .catch(() => setStatus("error"));
  }, []);

  // Page sans paramètres (accès direct)
  if (!item) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-4">
        <p className="text-muted-foreground text-sm">Lien invalide.</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-[80vh] items-center justify-center bg-hero-gradient px-4 py-20">
      <div className="mx-auto w-full max-w-md rounded-2xl bg-white p-8 shadow-lg text-center">

        {/* Loading */}
        {status === "loading" && (
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="size-12 animate-spin text-primary" />
            <p className="text-sm text-muted-foreground">Envoi de votre demande…</p>
          </div>
        )}

        {/* Succès */}
        {status === "success" && (
          <>
            <CheckCircle className="mx-auto size-14 text-green-500 mb-4" />
            <h1 className="text-2xl font-bold text-foreground mb-2">Demande reçue !</h1>
            {client && (
              <p className="text-muted-foreground text-sm mb-1">Bonjour {client},</p>
            )}
            <p className="text-muted-foreground text-sm mb-4">
              Votre demande d'ajout de <strong className="text-foreground">{item}</strong>{" "}
              {price && <>(<strong className="text-primary">+{price} €</strong>)</>} a bien été transmise.
            </p>
            {order && (
              <p className="text-xs text-muted-foreground mb-6">
                Commande n° <strong>{order}</strong>
              </p>
            )}
            <p className="text-sm text-muted-foreground mb-6">
              Notre équipe va confirmer cet ajout et mettre à jour votre commande avant l'intervention.
            </p>
            <div className="flex flex-col gap-3">
              <Button asChild>
                <Link to="/">Retour à l'accueil</Link>
              </Button>
              <a
                href={COMPANY.phoneHref}
                className="inline-flex items-center justify-center gap-2 text-sm font-medium text-primary hover:underline"
              >
                <Phone className="size-4" />
                {COMPANY.phone}
              </a>
            </div>
          </>
        )}

        {/* Erreur */}
        {status === "error" && (
          <>
            <AlertCircle className="mx-auto size-14 text-destructive mb-4" />
            <h1 className="text-xl font-bold text-foreground mb-2">Une erreur s'est produite</h1>
            <p className="text-muted-foreground text-sm mb-6">
              Votre demande n'a pas pu être envoyée. Contactez-nous directement par téléphone.
            </p>
            <a
              href={COMPANY.phoneHref}
              className="inline-flex items-center justify-center gap-2 text-sm font-semibold text-primary hover:underline"
            >
              <Phone className="size-4" />
              {COMPANY.phone}
            </a>
          </>
        )}
      </div>
    </div>
  );
}
