import { createServerFn } from '@tanstack/react-start';
import { z } from 'zod';
import { eventClient, getActionEvent, sendEventEmail } from './calendarLifecycle';
const ReviewRequestSchema = z.object({
  client_name:z.string(),client_email:z.string().email(),formule:z.string(),booking_date:z.string(),token:z.string().min(1).max(4096),
});
export type ReviewRequestInput = z.infer<typeof ReviewRequestSchema>;
export const sendReviewRequestServerFn = createServerFn({method:'POST'})
  .validator((data:ReviewRequestInput) => ReviewRequestSchema.parse(data))
  .handler(async ({data}) => {
    const event = await getActionEvent(data.token);
    const client = eventClient(event);
    if (data.client_email.toLowerCase() !== client.email || data.client_name !== client.name || data.formule !== (event.summary ?? 'Nettoyage professionnel')) throw new Error('INVALID_LINK');
    return sendEventEmail(event,'review');
  });
