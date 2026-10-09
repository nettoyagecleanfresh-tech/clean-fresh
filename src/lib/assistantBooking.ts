import type { CartItem } from '@/data/bookingCatalogue';
import type { BookingInput, BookingResult } from '@/lib/bookingServerFn';

export function bookingTotals(items: CartItem[]) {
  return items.reduce((sum, item) => ({
    price: sum.price + item.formule.price + item.formule.options.filter(o => item.options.includes(o.id)).reduce((n, o) => n + o.price, 0),
    duration: sum.duration + item.formule.durationMin,
  }), { price: 0, duration: 0 });
}

export function bookingItems(items: CartItem[]) {
  return items.map(item => ({ service_id: item.service.id, service_name: item.service.label,
    formule_id: item.formule.id, formule_name: item.formule.name, formule_price: item.formule.price,
    options: item.formule.options.filter(o => item.options.includes(o.id)).map(o => ({ name: o.name, price: o.price })),
  }));
}

// Only invoked by the final confirmation button. Never called while collecting answers.
export async function confirmAssistantBooking(confirmed: boolean, data: BookingInput, dependencies: {
  create: (input: { data: BookingInput }) => Promise<BookingResult>;
  email: (input: { data: Omit<BookingInput, 'cancel_token' | 'gcal_event_id'> & { cancel_url: string } }) => Promise<unknown>;
}) {
  if (!confirmed) throw new Error('CONFIRMATION_REQUIRED');
  const result = await dependencies.create({ data });
  if (!result.success || !result.gcal_event_id) return { ...result, emailSent: false };
  let emailSent = false;
  try {
    await dependencies.email({ data: { ...data, cancel_url: `https://cleanetfresh.fr/annuler?token=${encodeURIComponent(result.cancel_token)}` } });
    emailSent = true;
  } catch { /* The appointment exists: never retry its creation for an email failure. */ }
  return { ...result, emailSent };
}
