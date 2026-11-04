export type JournalEvent = 'booking_confirmed' | 'booking_cancelled' | 'quote_submitted';
export type MetricJournalRow = {
  schema: 'cleanfresh-conversion-v1';
  event: JournalEvent;
  id: string;
  at: string;
  is_test: boolean;
};

/** Operational server log, independent of audience consent. No customer data. */
export async function journalConversion(event: JournalEvent, id: string, isTest = false): Promise<void> {
  try {
    // Never mix preview/development operations with production figures.
    if (process.env.VERCEL_ENV !== 'production' || !/^[a-zA-Z0-9_-]{5,1024}$/.test(id)) return;
    const family = event === 'quote_submitted' ? 'quote' : 'booking';
    const hash = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(`${family}:${id}`));
    const opaqueId = Array.from(new Uint8Array(hash), byte => byte.toString(16).padStart(2, '0')).join('');
    const row: MetricJournalRow = { schema: 'cleanfresh-conversion-v1', event, id: opaqueId, at: new Date().toISOString(), is_test: isTest };
    console.info(JSON.stringify(row));
  } catch { /* A measurement failure must never turn a successful action into an error. */ }
}

/** Reconcile a complete exported cohort, including cancellations up to the report cutoff. */
export function reconcileConversions(rows: MetricJournalRow[]) {
  const bookings = new Set<string>();
  const cancellations = new Set<string>();
  const quotes = new Set<string>();
  const tests = new Set<string>();
  for (const row of rows) {
    if (row.schema !== 'cleanfresh-conversion-v1' || !/^[a-f0-9]{64}$/.test(row.id)) continue;
    if (row.is_test) tests.add(row.id);
    if (row.event === 'booking_confirmed') bookings.add(row.id);
    if (row.event === 'booking_cancelled') cancellations.add(row.id);
    if (row.event === 'quote_submitted') quotes.add(row.id);
  }
  const confirmed = [...bookings].filter(id => !tests.has(id));
  return {
    confirmedBookings: confirmed.length,
    cancelledBookings: confirmed.filter(id => cancellations.has(id)).length,
    retainedBookings: confirmed.filter(id => !cancellations.has(id)).length,
    submittedQuotes: [...quotes].filter(id => !tests.has(id)).length,
    excludedTests: tests.size,
  };
}

/** Current Calendar state is authoritative, including cancellations made outside the site. */
export function retainedWebsiteBookings(events: Array<{
  id?: string;
  status?: string;
  extendedProperties?: { private?: Record<string, string> };
}>) {
  const retained = new Map<string, boolean>();
  for (const event of events) {
    if (!event.id) continue;
    if (event.status === 'cancelled') { retained.set(event.id, false); continue; }
    const properties = event.extendedProperties?.private;
    if (retained.get(event.id) !== false && properties?.cfAnalyticsSource === 'website') {
      retained.set(event.id, properties.cfAnalyticsTest !== 'true');
    }
  }
  return [...retained.values()].filter(Boolean).length;
}
