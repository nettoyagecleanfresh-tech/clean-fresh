import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import * as emailService from "@/lib/emailService";

// Helper to easily define a schema from an object type.
// We use z.any() here since it's an internal trusted call from the client to our own server,
// but for better safety we could type it. For now z.any() is fine for the payload wrappers.

export const sendBookingEmailsFn = createServerFn({ method: "POST" })
  .validator((data: any) => data as emailService.BookingPayload)
  .handler(async ({ data }) => {
    return await emailService.sendBookingEmailsRaw(data);
  });

export const sendReminderEmailFn = createServerFn({ method: "POST" })
  .validator((data: any) => data)
  .handler(async ({ data }) => {
    return await emailService.sendReminderEmailRaw(data);
  });

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
