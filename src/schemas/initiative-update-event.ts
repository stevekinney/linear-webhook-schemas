import { z } from 'zod';

import { InitiativeWebhookPayloadSchema } from './shared/initiative.js';
import { createEnvelopeSchema } from './shared/webhook-envelope.js';

export const InitiativeUpdateEventSchema = createEnvelopeSchema('Initiative', 'update', InitiativeWebhookPayloadSchema);

export type InitiativeUpdateEvent = z.infer<typeof InitiativeUpdateEventSchema>;

export function isInitiativeUpdateEvent(value: unknown): value is InitiativeUpdateEvent {
  return InitiativeUpdateEventSchema.safeParse(value).success;
}
