import { z } from "zod";

const addressHint = "Indiquez la rue ou le lieu-dit, le code postal et la ville (ex. 12 rue des Lilas, 31130 Balma).";
const areaHint = "Indiquez une surface supérieure à zéro en m² (ex. 52 ou 52,5).";

function hasFullAddress(value: string): boolean {
  const address = value.replace(/\s+/gu, " ").trim();
  // Accept postal order and the common street, town, postcode order.
  const standard = /^(.+?)[\s,;–-]+(\d{5})[\s,;–-]+(\p{L}[\p{L}\p{M}\d .’'()-]*)$/u;
  const townFirst = /^(.+?)[,;]\s*(\p{L}[\p{L}\p{M} .’'-]*)\s+\(?(\d{5})\)?$/u;
  const match = standard.exec(address);
  const spaceSeparated = /^((?:\d+\s|rue\s|avenue\s|boulevard\s|route\s|chemin\s|impasse\s|allée\s|place\s|lieu[- ]dit\s).+?)\s+(\p{L}[\p{L}\p{M}’'-]+)\s+\(?(\d{5})\)?$/iu;
  const reversed = match ? null : townFirst.exec(address) ?? spaceSeparated.exec(address);
  const street = (match?.[1] ?? reversed?.[1] ?? "").trim();
  const town = (match?.[3] ?? reversed?.[2] ?? "").trim();
  return /\p{L}{2}/u.test(street) && /\p{L}{2}/u.test(town)
    && !/\b(?:des?|du|la|les|rue|avenue|boulevard|chemin|de la)$/iu.test(street)
    && street.localeCompare(town, "fr", { sensitivity: "base" }) !== 0;
}

function isPositiveArea(value: string): boolean {
  const match = /^((?:\d{1,3}(?:[ \u00a0\u202f]\d{3})+|\d+)(?:[.,]\d+)?)\s*(?:m²|m2|m\^2)?$/iu.exec(value);
  if (!match?.[1]) return false;
  const area = Number(match[1].replace(/\s+/gu, "").replace(",", "."));
  return Number.isFinite(area) && area > 0;
}

export const quoteSchema = z.object({
  nom: z.string().trim().min(2, "Merci d'indiquer votre nom").max(100),
  telephone: z.string().trim().max(20).refine(value => !value || value.length >= 6, "Numéro invalide").default(""),
  email: z.string().trim().email("Adresse email invalide").max(255),
  service: z.string().min(1, "Veuillez sélectionner un service").max(150),
  adresse: z.string({ required_error: addressHint }).trim().max(200).refine(hasFullAddress, addressHint),
  surface: z.string({ required_error: areaHint }).trim().max(100).refine(isPositiveArea, areaHint),
  etat: z.string({ required_error: "Décrivez l’état actuel de la zone à nettoyer." }).trim().min(1, "Décrivez l’état actuel de la zone à nettoyer.").max(1000),
  dateSouhaitee: z.string().trim().max(100).default(""),
  acces: z.string().trim().max(300).default(""),
  message: z.string().trim().max(1000).default(""),
});
