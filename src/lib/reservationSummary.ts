/** Only explicit labelled amounts are used; never infer a payment from a quote. */
export function euroCents(value: string | undefined): number | null {
  if (!value) return null;
  const clean = value.replace(/[\s\u00a0\u202f€]/g, '').replace(',', '.');
  if (!/^\d+(?:\.\d{1,2})?$/.test(clean)) return null;
  const cents = Math.round(Number(clean) * 100);
  return Number.isSafeInteger(cents) && cents <= 10000000 ? cents : null;
}
export function reservationAmounts(plain: string, props: Record<string, string> = {}, received?: string) {
  const labelled = (label: string) => plain.match(new RegExp(`(?:^|\\n)[^\\p{L}\\n]*(?:${label})\\s*:\\s*([0-9][0-9 \\u00a0\\u202f.,]*)(?:\\s*€|\\s*EUR)?\\s*(?:\\n|$)`, 'iu'))?.[1];
  const total = euroCents(props.cfTotalPrice) ?? euroCents(labelled('TOTAL(?: TTC)?|MONTANT TOTAL(?: TTC)?'));
  const deposit = euroCents(received ?? props.cfDepositReceipt) ?? euroCents(labelled('ACOMPTE REÇU|ACOMPTE VERSÉ')) ?? (props.cfPaymentAtEnd === 'true' ? 0 : null);
  return { total, deposit, balance: total !== null && deposit !== null && deposit <= total ? total - deposit : null };
}
export const formatEuros = (cents: number) => new Intl.NumberFormat('fr-FR', {style:'currency',currency:'EUR'}).format(cents / 100);
