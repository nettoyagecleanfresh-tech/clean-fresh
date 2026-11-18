import { z } from "zod";

export const quoteSchema = z.object({
  nom: z.string().trim().min(2, "Merci d'indiquer votre nom").max(100),
  telephone: z.string().trim().max(20).refine(value => !value || value.length >= 6, "Numéro invalide").default(""),
  email: z.string().trim().email("Adresse email invalide").max(255),
  service: z.string().min(1, "Veuillez sélectionner un service").max(150),
  adresse: z.string().trim().min(2, "Merci d’indiquer votre commune ou votre code postal").max(200),
  surface: z.string().trim().max(100).default(""),
  dateSouhaitee: z.string().trim().max(100).default(""),
  acces: z.string().trim().max(300).default(""),
  message: z.string().trim().max(1000).default(""),
});
