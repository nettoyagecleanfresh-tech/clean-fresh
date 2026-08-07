import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Send, CheckCircle2, Loader2, AlertCircle, Mail, User, Calendar, Sparkles } from "lucide-react";
import { sendReviewRequestServerFn } from "@/lib/reviewRequestServerFn";

export const Route = createFileRoute("/envoyer-avis")({
  validateSearch: (search: Record<string, unknown>) => ({
    n: (search["n"] as string) ?? "",   // client_name
    e: (search["e"] as string) ?? "",   // client_email
    f: (search["f"] as string) ?? "",   // formule
    d: (search["d"] as string) ?? "",   // booking_date
  }),
  head: () => ({
    meta: [
      { title: "Envoyer une demande d'avis — Admin Clean&Fresh" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: EnvoyerAvisPage,
});

function EnvoyerAvisPage() {
  const { n, e, f, d } = Route.useSearch();

  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [confirmed, setConfirmed] = useState(false);

  const formattedDate = (() => {
    try {
      const dt = new Date(d);
      return dt.toLocaleDateString("fr-FR", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    } catch {
      return d;
    }
  })();

  // Validation : si le lien est mal formé, afficher une erreur
  const isValid = n && e && e.includes("@") && f;

  const handleSend = async () => {
    if (!isValid || status !== "idle") return;
    setStatus("sending");
    try {
      await sendReviewRequestServerFn({
        data: { client_name: n, client_email: e, formule: f, booking_date: d },
      });
      setStatus("done");
    } catch {
      setStatus("error");
    }
  };

  if (!isValid) {
    return (
      <div style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0f2c3f 0%, #0093cc 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        fontFamily: "Helvetica, Arial, sans-serif",
      }}>
        <div style={{
          background: "#fff",
          borderRadius: "16px",
          padding: "40px",
          maxWidth: "480px",
          width: "100%",
          textAlign: "center",
          boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
        }}>
          <AlertCircle size={48} color="#c22a38" style={{ margin: "0 auto 16px" }} />
          <h1 style={{ fontSize: "20px", color: "#0f2c3f", margin: "0 0 12px" }}>Lien invalide</h1>
          <p style={{ fontSize: "14px", color: "#5b7b8e", lineHeight: "22px" }}>
            Ce lien ne contient pas les informations nécessaires. Assurez-vous d'utiliser le bouton depuis l'email de confirmation de réservation.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #0f2c3f 0%, #1a6a8f 50%, #00b8ff 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px",
      fontFamily: "Helvetica, Arial, sans-serif",
    }}>
      <AnimatePresence mode="wait">
        {status === "done" ? (
          <motion.div
            key="done"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{
              background: "#fff",
              borderRadius: "20px",
              padding: "50px 40px",
              maxWidth: "480px",
              width: "100%",
              textAlign: "center",
              boxShadow: "0 30px 80px rgba(0,0,0,0.25)",
            }}
          >
            <CheckCircle2 size={64} color="#059669" style={{ margin: "0 auto 20px" }} />
            <h1 style={{ fontSize: "24px", color: "#0f2c3f", margin: "0 0 12px", fontWeight: "bold" }}>
              Email envoyé ! ✅
            </h1>
            <p style={{ fontSize: "15px", color: "#5b7b8e", lineHeight: "24px", margin: "0 0 8px" }}>
              <strong style={{ color: "#0f2c3f" }}>{n}</strong> vient de recevoir votre demande d'avis à :<br/>
              <strong style={{ color: "#0093cc" }}>{e}</strong>
            </p>
            <p style={{ fontSize: "13px", color: "#92b4c5", marginTop: "16px" }}>
              Le client recevra le lien vers votre page Google dans quelques secondes.
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="main"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              background: "#fff",
              borderRadius: "20px",
              overflow: "hidden",
              maxWidth: "520px",
              width: "100%",
              boxShadow: "0 30px 80px rgba(0,0,0,0.25)",
            }}
          >
            {/* Header */}
            <div style={{
              background: "linear-gradient(135deg, #00b8ff, #0093cc)",
              padding: "32px 36px",
              textAlign: "center",
            }}>
              <div style={{ fontSize: "48px", marginBottom: "8px" }}>⭐⭐⭐⭐⭐</div>
              <h1 style={{ color: "#fff", fontSize: "22px", margin: "0", fontWeight: "bold" }}>
                Demande d'avis Google
              </h1>
              <p style={{ color: "rgba(255,255,255,0.85)", fontSize: "14px", margin: "8px 0 0" }}>
                Envoyez un email d'avis à ce client
              </p>
            </div>

            {/* Contenu */}
            <div style={{ padding: "32px 36px" }}>
              {/* Fiche client */}
              <div style={{
                background: "#f6faff",
                border: "1px solid #dce7f2",
                borderRadius: "12px",
                padding: "20px",
                marginBottom: "24px",
              }}>
                <p style={{ margin: "0 0 14px 0", fontSize: "11px", fontWeight: "bold", letterSpacing: "1.2px", textTransform: "uppercase", color: "#3b6a7c" }}>
                  Fiche client
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px", fontSize: "14px", color: "#0f2c3f" }}>
                    <User size={16} color="#5b7b8e" />
                    <span><strong>{n}</strong></span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px", fontSize: "14px", color: "#0f2c3f" }}>
                    <Mail size={16} color="#5b7b8e" />
                    <span>{e}</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px", fontSize: "14px", color: "#0f2c3f" }}>
                    <Sparkles size={16} color="#5b7b8e" />
                    <span>{f}</span>
                  </div>
                  {d && (
                    <div style={{ display: "flex", alignItems: "center", gap: "12px", fontSize: "14px", color: "#0f2c3f" }}>
                      <Calendar size={16} color="#5b7b8e" />
                      <span>{formattedDate}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Aperçu de ce qui sera envoyé */}
              <div style={{
                background: "#fffbf0",
                border: "1px solid #fde68a",
                borderRadius: "10px",
                padding: "16px 20px",
                marginBottom: "28px",
                fontSize: "13px",
                color: "#78350f",
                lineHeight: "20px",
              }}>
                <strong>📧 Ce qui sera envoyé :</strong><br/>
                Un email invitant <strong>{n}</strong> à laisser un avis ⭐ sur Google pour la prestation <em>{f}</em>.
              </div>

              {status === "error" && (
                <div style={{
                  background: "#fdf2f2",
                  border: "1px solid #fca5a5",
                  borderRadius: "10px",
                  padding: "14px 18px",
                  marginBottom: "20px",
                  fontSize: "13px",
                  color: "#991b1b",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}>
                  <AlertCircle size={16} />
                  Erreur lors de l'envoi. Vérifiez la connexion ou réessayez.
                </div>
              )}

              {/* Confirmation checkbox */}
              <label style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "12px",
                cursor: "pointer",
                marginBottom: "24px",
                fontSize: "14px",
                color: "#2f4d64",
                lineHeight: "20px",
              }}>
                <input
                  type="checkbox"
                  checked={confirmed}
                  onChange={e => setConfirmed(e.target.checked)}
                  style={{ width: "18px", height: "18px", flexShrink: 0, marginTop: "1px", cursor: "pointer", accentColor: "#0093cc" }}
                  id="confirm-send"
                />
                <span>
                  Je confirme vouloir envoyer une demande d'avis à <strong>{n}</strong> ({e})
                </span>
              </label>

              {/* Bouton */}
              <button
                onClick={handleSend}
                disabled={!confirmed || status === "sending"}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "10px",
                  width: "100%",
                  padding: "16px",
                  background: !confirmed || status === "sending"
                    ? "#e2e8f0"
                    : "linear-gradient(135deg, #00b8ff, #0093cc)",
                  color: !confirmed || status === "sending" ? "#94a3b8" : "#fff",
                  border: "none",
                  borderRadius: "12px",
                  fontSize: "16px",
                  fontWeight: "bold",
                  cursor: !confirmed || status === "sending" ? "not-allowed" : "pointer",
                  transition: "all 0.2s ease",
                  boxShadow: confirmed && status === "idle" ? "0 4px 16px rgba(0,147,204,0.35)" : "none",
                }}
              >
                {status === "sending" ? (
                  <><Loader2 size={20} style={{ animation: "spin 1s linear infinite" }} /> Envoi en cours...</>
                ) : (
                  <><Send size={20} /> Envoyer la demande d'avis</>
                )}
              </button>

              <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>

              <p style={{ margin: "14px 0 0", textAlign: "center", fontSize: "12px", color: "#94a3b8" }}>
                Vous êtes la seule personne à pouvoir envoyer cet email.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
