import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, ChevronRight, CornerDownLeft, Send } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "@tanstack/react-router";
import { faqData, welcomeMessage, type FAQNode } from "@/config/faqData";

type Message = {
  id: string;
  sender: "bot" | "user";
  text: string;
  options?: FAQNode[];
};

function searchFAQ(nodes: FAQNode[], query: string): FAQNode | null {
  const normalizedQuery = query.toLowerCase().trim();
  if (!normalizedQuery) return null;
  const keywords = normalizedQuery.split(/\s+/).filter((w) => w.length > 2);
  let bestMatch: { node: FAQNode; score: number } | null = null;

  const traverse = (currentNodes: FAQNode[]) => {
    for (const node of currentNodes) {
      const q = node.question.toLowerCase();
      const a = node.answer.toLowerCase();
      let score = 0;
      for (const kw of keywords) {
        if (q.includes(kw)) score += 2;
        if (a.includes(kw)) score += 1;
      }
      if (score > 0) {
        if (!bestMatch || score > bestMatch.score) {
          bestMatch = { node, score };
        }
      }
      if (node.options) traverse(node.options);
    }
  };

  traverse(nodes);
  return bestMatch ? bestMatch.node : null;
}

// Sends via Web3Forms — same system as the Contact page
async function sendViaWeb3Forms(data: {
  nom: string;
  email: string;
  telephone: string;
  message?: string;
}) {
  const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
  if (!accessKey) throw new Error("Clé Web3Forms manquante");

  const formData = new FormData();
  formData.append("access_key", accessKey);
  formData.append("subject", `Demande de rappel via Chatbot — ${data.nom}`);
  formData.append("from_name", "Clean&Fresh Chatbot");
  formData.append("replyto", data.email);
  formData.append("Nom", data.nom);
  formData.append("Téléphone", data.telephone);
  formData.append("Email", data.email);
  formData.append("Message", data.message || "Le client a demandé à être recontacté depuis le chatbot.");

  const response = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    body: formData,
  });

  const resData = await response.json();
  if (!resData.success) throw new Error(resData.message || "Erreur Web3Forms");
}

// Sends query to Ollama or compatible API (e.g. Hostinger API Gateway)
async function queryOllama(userMessage: string): Promise<string> {
  const apiURL = import.meta.env.VITE_OLLAMA_API_URL || "http://localhost:11434/api/chat";
  // Ne jamais logguer ni exposer apiKey — uniquement utilisé dans les headers Authorization
  const apiKey = import.meta.env.VITE_OLLAMA_API_KEY || "";
  const apiModel = import.meta.env.VITE_OLLAMA_MODEL || "llama3";

  // Evite de requêter localhost depuis la production pour empêcher le pop-up d'autorisation réseau local
  const isLocalHostTarget = apiURL.includes("localhost") || apiURL.includes("127.0.0.1");
  const isLocalSource = typeof window !== "undefined" && (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1");

  if (isLocalHostTarget && !isLocalSource) {
    throw new Error("L'API Ollama locale n'est pas accessible depuis la production.");
  }

  // Convert FAQ data to text to use as system prompt context
  const faqContext = JSON.stringify(faqData, null, 2);

  const systemPrompt = `Tu es l'assistant virtuel officiel de Clean&Fresh Toulouse. Ton rôle est de répondre aux questions des clients sur le nettoyage intérieur de voitures, nettoyage de canapés, tapis, matelas, fin de bail, et syndrome de Diogène.
  
Voici notre base de connaissances officielle à utiliser obligatoirement pour répondre précisément :
${faqContext}

Consignes importantes :
1. Réponds poliment et de manière concise (maximum 3-4 phrases courtes).
2. Utilise uniquement les faits mentionnés ci-dessus. N'invente pas d'informations.
3. Si le client te demande de parler à un humain ou que sa demande requiert un devis complexe, dis-lui de choisir l'option "Je veux un devis ou parler à un conseiller".
4. Réponds toujours en français.`;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (apiKey) {
    headers["Authorization"] = `Bearer ${apiKey}`;
  }

  // Timeout controller (3.5 seconds) to prevent freezing if the API is offline/slow
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 3500);

  try {
    const response = await fetch(apiURL, {
      method: "POST",
      headers,
      signal: controller.signal,
      body: JSON.stringify({
        model: apiModel,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userMessage }
        ],
        stream: false
      })
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`Erreur API: ${response.statusText}`);
    }

    const data = await response.json();

    // Support both Ollama native format and standard OpenAI compatible format
    if (data.message && data.message.content) {
      return data.message.content;
    }
    if (data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content) {
      return data.choices[0].message.content;
    }

    throw new Error("Format de réponse de l'API non supporté.");
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
}

export function Chatbot() {
  const router = useRouter();
  const isReserver = router.state.location.pathname.startsWith('/reserver');

  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState("");
  const [contactStep, setContactStep] = useState<"none" | "name" | "email" | "phone" | "message">("none");
  const [contactData, setContactData] = useState({ nom: "", email: "", telephone: "", message: "" });
  const [isSending, setIsSending] = useState(false);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      sender: "bot",
      text: welcomeMessage,
    },
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  const addBotMessage = (text: string, options?: FAQNode[], delay = 500) => {
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { id: Date.now().toString() + Math.random(), sender: "bot", text, options },
      ]);
    }, delay);
  };

  const startContactFlow = (isFallback = false) => {
    setContactStep("name");
    if (isFallback) {
      addBotMessage("Je rencontre actuellement des difficultés de connexion. Pourriez-vous me laisser vos coordonnées afin qu'un conseiller vous rappelle ? Quel est votre nom ?");
    } else {
      addBotMessage("D'accord, un conseiller va vous recontacter. Quel est votre nom ?");
    }
  };

  const handleOptionClick = (option: FAQNode) => {
    // Add user bubble
    setMessages((prev) => [
      ...prev,
      { id: Date.now().toString(), sender: "user", text: option.question },
    ]);

    if (option.id === "contact") {
      startContactFlow();
      return;
    }

    // Bot answer
    addBotMessage(option.answer, option.options);
  };

  const handleTextSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || isSending) return;

    const query = inputText.trim();
    setInputText("");

    // Add user bubble
    setMessages((prev) => [
      ...prev,
      { id: Date.now().toString(), sender: "user", text: query },
    ]);

    // --- Intercept requests to talk to a human/advisor ---
    if (contactStep === "none") {
      const normalizedQuery = query.toLowerCase();
      const wantsHuman = [
        "humain", "conseiller", "conseill", "rappel", "rappeler", 
        "rappelle", "parler à", "contacter", "contact", 
        "téléphone", "appeler", "appel"
      ].some(kw => normalizedQuery.includes(kw));

      if (wantsHuman) {
        startContactFlow();
        return;
      }
    }

    // --- Contact flow steps ---
    if (contactStep === "name") {
      setContactData((p) => ({ ...p, nom: query }));
      setContactStep("email");
      addBotMessage("Merci ! Quelle est votre adresse e-mail ?");
      return;
    }

    if (contactStep === "email") {
      setContactData((p) => ({ ...p, email: query }));
      setContactStep("phone");
      addBotMessage("Parfait. Quel est votre numéro de téléphone ?");
      return;
    }

    if (contactStep === "phone") {
      setContactData((p) => ({ ...p, telephone: query }));
      setContactStep("message");
      addBotMessage("D'accord. Expliquez-moi brièvement votre besoin ou votre message :");
      return;
    }

    if (contactStep === "message") {
      const finalData = { ...contactData, message: query };
      setContactStep("none");
      setIsSending(true);

      const loadingId = Date.now().toString() + "-loading";
      setMessages((prev) => [
        ...prev,
        { id: loadingId, sender: "bot", text: "Envoi en cours..." },
      ]);

      try {
        await sendViaWeb3Forms(finalData);
        setMessages((prev) =>
          prev
            .filter((m) => m.id !== loadingId)
            .concat({
              id: Date.now().toString() + "-ok",
              sender: "bot",
              text: "✅ C'est noté ! Vos informations ont été envoyées avec succès. Un conseiller Clean&Fresh vous recontactera très rapidement.",
              })
        );
      } catch {
        setMessages((prev) =>
          prev
            .filter((m) => m.id !== loadingId)
            .concat({
              id: Date.now().toString() + "-err",
              sender: "bot",
              text: "❌ Une erreur s'est produite lors de l'envoi. Veuillez réessayer ou utiliser directement la page de contact du site.",
            })
        );
      } finally {
        setIsSending(false);
      }
      return;
    }

    // --- IA / Ollama Query with Keyword Search Fallback ---
    setIsSending(true);
    try {
      const botResponse = await queryOllama(query);
      addBotMessage(botResponse, undefined, 0);
    } catch (error) {
      console.warn("API Ollama inaccessible ou épuisée.", error);
      startContactFlow(true);
    } finally {
      setIsSending(false);
    }
  };

  const handleReset = () => {
    setContactStep("none");
    addBotMessage("Retour à la conversation.", undefined);
  };

  return (
    <>
      {/* Floating Action Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: isOpen ? 0 : 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-28 lg:bottom-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-colors hover:bg-primary/90 ${isOpen ? "pointer-events-none opacity-0" : "opacity-100"} ${isReserver ? "left-6 lg:left-auto lg:right-6" : "right-6"}`}
        aria-label="Ouvrir le chat"
      >
        <MessageCircle size={28} />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={`fixed bottom-28 lg:bottom-6 z-50 flex h-[520px] max-h-[80vh] w-[360px] max-w-[calc(100vw-3rem)] flex-col overflow-hidden rounded-2xl border border-border bg-background shadow-2xl ${isReserver ? "left-6 lg:left-auto lg:right-6" : "right-6"}`}
          >
            {/* Header */}
            <div className="flex items-center justify-between bg-primary p-4 text-primary-foreground">
              <div className="flex items-center gap-2">
                <MessageCircle size={20} />
                <div>
                  <h3 className="font-semibold leading-tight">Assistant Clean&Fresh</h3>
                  <p className="text-xs text-primary-foreground/70">Répond en quelques secondes</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-full p-1 transition-colors hover:bg-primary-foreground/20"
                aria-label="Fermer le chat"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 bg-muted/30">
              <div className="flex flex-col gap-4">
                {messages.map((msg, idx) => (
                  <div key={msg.id} className="flex flex-col gap-2">
                    {/* Message Bubble */}
                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-2.5 ${
                        msg.sender === "user"
                          ? "self-end bg-primary text-primary-foreground rounded-tr-sm"
                          : "self-start bg-card border border-border text-card-foreground rounded-tl-sm shadow-sm"
                      }`}
                    >
                      <p className="text-sm whitespace-pre-wrap leading-relaxed">{msg.text}</p>
                    </div>

                    {msg.sender === "bot" && idx === messages.length - 1 && msg.options && msg.options.length > 0 && (
                      <div className="mt-1 flex flex-col items-start gap-2 pl-1">
                        {msg.options.map((opt) => (
                          <button
                            key={opt.id}
                            onClick={() => handleOptionClick(opt)}
                            className="flex items-center gap-1 rounded-full border border-primary/30 bg-background px-3 py-1.5 text-xs font-medium text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
                          >
                            {opt.question}
                            <ChevronRight size={14} />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                {isSending && (
                  <div className="self-start max-w-[85%] rounded-2xl px-4 py-2.5 bg-card border border-border text-muted-foreground rounded-tl-sm shadow-sm flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground/60 delay-100"></span>
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground/60 delay-200"></span>
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground/60 delay-300"></span>
                    <span className="text-xs ml-1 font-medium">Clean&Fresh écrit...</span>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Input Area */}
            <form
              onSubmit={handleTextSubmit}
              className="flex items-center gap-2 border-t border-border bg-background p-3"
            >
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                autoComplete="off"
                placeholder={
                  contactStep === "name"
                    ? "Votre nom..."
                    : contactStep === "email"
                      ? "Votre e-mail..."
                      : contactStep === "phone"
                        ? "Votre téléphone..."
                        : "Écrivez votre question..."
                }
                disabled={isSending}
                className="flex-1 rounded-full border border-input bg-background px-4 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={!inputText.trim() || isSending}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
              >
                <Send size={16} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
