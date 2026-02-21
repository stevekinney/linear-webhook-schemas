import { z } from 'zod';

import { InitiativeWebhookPayloadSchema } from './shared/initiative.js';
import { createEnvelopeSchema } from './shared/webhook-envelope.js';

export const InitiativeCreateEventSchema = createEnvelopeSchema('Initiative', 'create', InitiativeWebhookPayloadSchema);

export type InitiativeCreateEvent = z.infer<typeof InitiativeCreateEventSchema>;

export function isInitiativeCreateEvent(value: unknown): value is InitiativeCreateEvent {
  return InitiativeCreateEventSchema.safeParse(value).success;
}
