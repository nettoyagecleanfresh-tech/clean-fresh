import { calendarRequest, ensureEventActions, eventClient, LIFECYCLE_START, notifyOwner, reminderDue, sendEventEmail, type ServiceEvent } from '../src/lib/calendarLifecycle.js';

export default async function handler(request: any, response: any) {
  if (request.method !== 'GET') return response.status(405).json({error:'Method not allowed'});
  if (!process.env.CRON_SECRET || request.headers.authorization !== `Bearer ${process.env.CRON_SECRET}`) return response.status(401).json({error:'Unauthorized'});
  const now = Date.now();
  // Daily schedule supported by the current hosting plan: remind all of tomorrow's appointments.
  const parisDay = (value: number) => new Intl.DateTimeFormat('en-CA', {timeZone:'Europe/Paris',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date(value));
  const tomorrow = parisDay(now + 86400000);
  let sent = 0, skipped = 0, failed = 0;
  try {
    let pageToken = '';
    do {
      const params = new URLSearchParams({timeMin:new Date(now-30*86400000).toISOString(),timeMax:new Date(now+90*86400000).toISOString(),singleEvents:'true',orderBy:'startTime',maxResults:'100',...(pageToken ? {pageToken} : {})});
      const page = await calendarRequest(`?${params}`) as {items?:ServiceEvent[];nextPageToken?:string};
      for (const event of page.items ?? []) {
        try {
          const client = eventClient(event);
          if (!event.id || event.status === 'cancelled' || !event.start?.dateTime || !client.name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(client.email)) { skipped++; continue; }
          await ensureEventActions(event);
          // Existing appointments receive links/reminders without resending old confirmations.
          const future = Date.parse(event.start.dateTime) > now;
          const props = event.extendedProperties?.private ?? {};
          if (future && ((Date.parse(event.created ?? '') >= Date.parse(LIFECYCLE_START) && !props.cfConfirmationStart) || props.cfConfirmationPending === 'true')) {
            await sendEventEmail(event,'confirmation');
            await notifyOwner(event);
          }
          if (future && (reminderDue(event,now) || (parisDay(Date.parse(event.start.dateTime)) === tomorrow && event.extendedProperties?.private?.cfReminderStart !== event.start.dateTime))) { await sendEventEmail(event,'reminder'); sent++; }
        } catch (error) { failed++; console.error('[lifecycle]',event.id,error instanceof Error ? error.message : 'unknown'); }
      }
      pageToken = page.nextPageToken ?? '';
    } while (pageToken);
    return response.status(failed ? 207 : 200).json({sent,skipped,failed});
  } catch { return response.status(500).json({error:'Calendar lifecycle failed'}); }
}
