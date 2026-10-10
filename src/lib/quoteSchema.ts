import { z } from "zod";
export const quoteSchema = z.object({
  nom: z.string().trim().min(2, "Merci d'indiquer votre nom").max(100),
  telephone: z.string().trim().min(6, "Numéro invalide").max(20),
  email: z.string().trim().email("Adresse email invalide").max(255),
  service: z.string().min(1, "Veuillez sélectionner un service").max(150),
  adresse: z.string().trim().min(5, "Merci d'indiquer l'adresse d'intervention").max(200),
  surface: z.string().trim().min(1, "Merci d'indiquer la surface ou les dimensions").max(100),
  dateSouhaitee: z.string().trim().min(2, "Merci d'indiquer la date ou le délai souhaité").max(100),
  acces: z.string().trim().min(2, "Merci de préciser l'accès à l'eau et à l'électricité").max(300),
  message: z.string().trim().min(10, "Merci de détailler votre demande").max(1000),
});
