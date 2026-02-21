import { z } from 'zod';

import { ActorSchema } from './shared/actor.js';

export const PermissionChangeEventSchema = z
  .object({
    action: z.string(),
    type: z.literal('PermissionChange'),
    actor: ActorSchema.optional(),
    createdAt: z.string(),
    data: z.record(z.string(), z.unknown()),
    url: z.string().optional(),
    webhookTimestamp: z.number(),
    organizationId: z.string(),
    webhookId: z.string(),
  })
  .passthrough();

export type PermissionChangeEvent = z.infer<typeof PermissionChangeEventSchema>;

export function isPermissionChangeEvent(value: unknown): value is PermissionChangeEvent {
  return PermissionChangeEventSchema.safeParse(value).success;
}
