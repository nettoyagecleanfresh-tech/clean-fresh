import { createServerFn } from "@tanstack/react-start";
import * as emailService from "@/lib/emailService";

export const sendCancellationEmailFn = createServerFn({ method: "POST" })
  .validator((data: any) => data)
  .handler(async ({ data }) => {
    return await emailService.sendCancellationEmailRaw(data);
  });

export const sendRescheduleEmailFn = createServerFn({ method: "POST" })
  .validator((data: any) => data)
  .handler(async ({ data }) => {
    return await emailService.sendRescheduleEmailRaw(data);
  });

export const sendContactMessageFn = createServerFn({ method: "POST" })
  .validator((data: any) => data as emailService.ContactPayload)
  .handler(async ({ data }) => {
    return await emailService.sendContactMessageRaw(data);
  });
