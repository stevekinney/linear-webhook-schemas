import { z } from 'zod';

import { ActorSchema } from './shared/actor.js';

export const AgentSessionEventSchema = z
  .object({
    action: z.string(),
    type: z.literal('AgentSessionEvent'),
    actor: ActorSchema.optional(),
    createdAt: z.string(),
    data: z.record(z.string(), z.unknown()),
    url: z.string().optional(),
    webhookTimestamp: z.number(),
    organizationId: z.string(),
    webhookId: z.string(),
  })
  .passthrough();

export type AgentSessionEvent = z.infer<typeof AgentSessionEventSchema>;

export function isAgentSessionEvent(value: unknown): value is AgentSessionEvent {
  return AgentSessionEventSchema.safeParse(value).success;
}
