import { z } from 'zod';

import { InitiativeWebhookPayloadSchema } from './shared/initiative.js';
import { createEnvelopeSchema } from './shared/webhook-envelope.js';

export const InitiativeRemoveEventSchema = createEnvelopeSchema('Initiative', 'remove', InitiativeWebhookPayloadSchema);

export type InitiativeRemoveEvent = z.infer<typeof InitiativeRemoveEventSchema>;

export function isInitiativeRemoveEvent(value: unknown): value is InitiativeRemoveEvent {
  return InitiativeRemoveEventSchema.safeParse(value).success;
}
