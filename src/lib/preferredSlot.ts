type PreferredSlot = { date: Date; time: string };
const KEY = "cleanfresh.preferredSlot.v1";

export function savePreferredSlot(slot: PreferredSlot | null) {
  try {
    if (slot) sessionStorage.setItem(KEY, JSON.stringify({ date: slot.date.toISOString(), time: slot.time }));
    else sessionStorage.removeItem(KEY);
  } catch { /* Storage may be disabled; the current page still keeps its state. */ }
}

export function readPreferredSlot(): PreferredSlot | null {
  try {
    const value = JSON.parse(sessionStorage.getItem(KEY) || "null");
    if (!value || typeof value.date !== "string" || !/^([01]\d|2[0-3]):[0-5]\d$/.test(value.time)) return null;
    const date = new Date(value.date);
    if (!Number.isFinite(date.getTime())) return null;
    return { date, time: value.time };
  } catch { return null; }
}
