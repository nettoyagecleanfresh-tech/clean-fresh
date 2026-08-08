import { createFileRoute } from "@tanstack/react-router";
import { SITE_URL } from "@/data/site";
import { FadeIn } from "@/components/ui/fade-in";

const TITLE = "Conditions Générales de Vente — Clean&Fresh Toulouse";
const DESC = "Conditions Générales de Vente de Clean&Fresh, entreprise de nettoyage professionnelle à Toulouse.";

export const Route = createFileRoute("/cgv")({
  head: () => ({
    meta: [
      { title: `Conditions Générales de Vente — Clean&Fresh Toulouse` },
      { name: "robots", content: "noindex, follow" },
      { name: "description", content: `Conditions Générales de Vente de Clean&Fresh, entreprise de nettoyage professionnelle à Toulouse.` },
      { property: "og:title", content: `Conditions Générales de Vente — Clean&Fresh Toulouse` },
      { property: "og:description", content: `Conditions Générales de Vente de Clean&Fresh, entreprise de nettoyage professionnelle à Toulouse.` },
      { property: "og:url", content: `https://cleanetfresh.fr/cgv` },
      { name: "twitter:title", content: `Conditions Générales de Vente — Clean&Fresh Toulouse` },
      { name: "twitter:description", content: `Conditions Générales de Vente de Clean&Fresh, entreprise de nettoyage professionnelle à Toulouse.` },
    ],
    links: [{ rel: "canonical", href: `https://cleanetfresh.fr/cgv` }],
  }),
  component: CGVPage,
});

function CGVPage() {
  return (
    <div className="pb-24 lg:pb-0">
      <div className="mx-auto max-w-3xl px-4 pt-16 pb-10">
        <h1 className="text-3xl font-bold tracking-tight md:text-5xl text-center mb-8">
          Conditions Générales de Vente
        </h1>
        
        <FadeIn delay={0.1}>
          <div className="prose prose-sm md:prose-base max-w-none text-muted-foreground bg-card p-8 rounded-2xl border border-border shadow-[var(--shadow-soft)]">
            <h2>1. Objet</h2>
            <p>
              Les présentes Conditions Générales de Vente (CGV) s'appliquent à l'ensemble des prestations de nettoyage (canapés, matelas, tapis, auto, locaux, etc.) réalisées par l'entreprise Clean&Fresh pour ses clients particuliers et professionnels.
            </p>

            <h2>2. Réservation et Devis</h2>
            <p>
              Les prestations peuvent être réservées en ligne, par téléphone ou après acceptation d'un devis. Toute réservation ou signature de devis vaut acceptation sans réserve des présentes CGV.
              Les devis sont gratuits et valables pour une durée de 30 jours à compter de leur émission.
            </p>

            <h2>3. Tarifs, Frais de déplacement et Paiement</h2>
            <p>
              Les tarifs indiqués sur notre site internet ou sur devis sont exprimés en euros, toutes taxes comprises (TTC).
              <strong>Frais de déplacement :</strong> Le déplacement est offert jusqu'à 20 km autour de Toulouse. Un supplément s'applique au-delà : 10€ de 21 à 34 km, 20€ de 35 à 49 km, etc. (tranches de 15km).<br />
              <strong>Paiement :</strong> Le paiement s'effectue sur place à la fin de la prestation. Sont acceptés : Carte Bancaire (CB, SumUp), Espèces, Virement instantané, et Wero. <strong>Les chèques sont refusés.</strong><br />
              <strong>Acomptes :</strong> Aucun acompte n'est exigé pour les prestations courantes. Cependant, pour les interventions lourdes (nettoyage Diogène, insalubre, fin de chantier, etc.), un acompte sera demandé à l'acceptation du devis.
            </p>

            <div className="my-6 rounded-xl bg-secondary/50 p-6 border border-primary/20">
              <h2 className="text-xl font-bold text-foreground mt-0">4. Obligation de moyens et non de résultat</h2>
              <p className="mb-0 text-foreground">
                <strong>Clean&Fresh s'engage à utiliser le matériel professionnel approprié et à mettre en œuvre les méthodes les plus adaptées pour nettoyer les surfaces confiées. Cependant, il est expressément convenu que l'entreprise est soumise à une obligation de moyens, et non de résultat.</strong>
              </p>
              <ul className="text-foreground mt-3">
                <li>Le résultat du nettoyage (notamment l'élimination totale des taches, des auréoles ou des mauvaises odeurs) dépend de l'état initial du support, de la nature du textile, et de l'ancienneté ou du type de la tache.</li>
                <li>Certaines taches chimiquement fixées, oxydées, ou certains dommages liés à des tentatives de nettoyage préalables par le client peuvent être irréversibles.</li>
                <li>Clean&Fresh ne pourra être tenu responsable si certaines taches ou odeurs résistent au traitement professionnel mis en œuvre.</li>
              </ul>
            </div>

            <h2>5. Conditions d'intervention</h2>
            <p>
              Le client s'engage à garantir au technicien un accès à l'eau et à l'électricité, nécessaires au bon fonctionnement du matériel d'injection-extraction et de nettoyage.
              Le client doit s'assurer que la zone d'intervention est accessible.
            </p>

            <h2>6. Rétractation et Annulation</h2>
            <p>
              Conformément à la législation en vigueur, pour toute prestation commandée à distance, le client consommateur dispose d'un délai de 14 jours pour se rétracter, sauf si l'exécution de la prestation a commencé avec l'accord préalable du client avant la fin de ce délai.
              En cas d'annulation moins de 24h avant l'intervention sans motif légitime, Clean&Fresh se réserve le droit de facturer des frais de déplacement.
            </p>

            <h2>7. Responsabilité</h2>
            <p>
              La responsabilité de Clean&Fresh ne saurait être engagée pour des dommages préexistants sur les supports (usure, déchirure invisible, décoloration due au soleil ou à l'âge).
              Avant toute intervention, un examen visuel est effectué. Si le technicien juge que le risque d'endommagement est trop élevé au vu de la vétusté du support, l'intervention pourra être annulée d'un commun accord.
            </p>

            <h2>8. Litiges</h2>
            <p>
              En cas de litige, une solution amiable sera recherchée en priorité. À défaut, les tribunaux compétents du siège social de Clean&Fresh seront seuls qualifiés pour régler le différend.
            </p>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
