import { z } from 'zod';

import { InitiativeUpdateWebhookPayloadSchema } from './shared/initiative-update.js';
import { createEnvelopeSchema } from './shared/webhook-envelope.js';

export const InitiativeUpdateUpdateEventSchema = createEnvelopeSchema('InitiativeUpdate', 'update', InitiativeUpdateWebhookPayloadSchema);

export type InitiativeUpdateUpdateEvent = z.infer<typeof InitiativeUpdateUpdateEventSchema>;

export function isInitiativeUpdateUpdateEvent(value: unknown): value is InitiativeUpdateUpdateEvent {
  return InitiativeUpdateUpdateEventSchema.safeParse(value).success;
}
