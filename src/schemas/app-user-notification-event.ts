import { z } from 'zod';

import { ActorSchema } from './shared/actor.js';

export const AppUserNotificationEventSchema = z
  .object({
    action: z.string(),
    type: z.literal('AppUserNotification'),
    actor: ActorSchema.optional(),
    createdAt: z.string(),
    data: z.record(z.string(), z.unknown()),
    url: z.string().optional(),
    webhookTimestamp: z.number(),
    organizationId: z.string(),
    webhookId: z.string(),
  })
  .passthrough();

export type AppUserNotificationEvent = z.infer<typeof AppUserNotificationEventSchema>;

export function isAppUserNotificationEvent(value: unknown): value is AppUserNotificationEvent {
  return AppUserNotificationEventSchema.safeParse(value).success;
}
