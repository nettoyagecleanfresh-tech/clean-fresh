import { Check, ClipboardCheck, Sparkles } from "lucide-react";
import { SERVICE_ESSENTIALS } from "./servicePresentation";

export function ServiceEssentials({ serviceId }: { serviceId: string | null }) {
  const details = serviceId ? SERVICE_ESSENTIALS[serviceId] : undefined;
  if (!details) return null;
  const cards = [
    { title: "Ce qui est inclus", text: details.included, icon: Check },
    { title: "Les options, à votre choix", text: details.options, icon: Sparkles },
    { title: "Avant notre passage", text: details.preparation, icon: ClipboardCheck },
  ];
  return (
    <section aria-labelledby="service-essentials-title" className="border-b border-border bg-secondary/30">
      <div className="mx-auto max-w-6xl px-4 py-10 md:py-14">
        <p className="text-xs font-bold uppercase tracking-widest text-primary">L’essentiel avant de réserver</p>
        <h2 id="service-essentials-title" className="mt-2 text-2xl font-bold tracking-tight md:text-3xl">{details.title}</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {cards.map(({ title, text, icon: Icon }) => (
            <article key={title} className="rounded-2xl border border-border bg-card p-5 md:p-6">
              <span className="mb-4 inline-flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary"><Icon className="size-5" aria-hidden="true" /></span>
              <h3 className="font-bold">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
