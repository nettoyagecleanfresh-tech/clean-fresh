const KEY = 'cleanfresh-confirmed-metrics-v1';
const delivered = new Set<string>();
const MAX_ENTRIES = 200;

/** IDs stay in this tab. They are never sent to GA or Vercel Web Analytics. */
export function claimConfirmedMetric(kind: 'booking' | 'quote', id: unknown): boolean {
  if (typeof id !== 'string' || !/^[a-zA-Z0-9_-]{5,1024}$/.test(id)) return false;
  const key = `${kind}:${id}`;
  if (delivered.has(key)) return false;
  try {
    const stored: unknown = JSON.parse(sessionStorage.getItem(KEY) || '[]');
    if (Array.isArray(stored)) {
      for (const item of stored.slice(-MAX_ENTRIES)) if (typeof item === 'string') delivered.add(item);
    }
  } catch { /* Memory deduplication still applies when storage is unavailable. */ }
  if (delivered.has(key)) return false;
  delivered.add(key);
  while (delivered.size > MAX_ENTRIES) delivered.delete(delivered.values().next().value!);
  try { sessionStorage.setItem(KEY, JSON.stringify([...delivered])); } catch { /* Keep the booking usable. */ }
  return true;
}
