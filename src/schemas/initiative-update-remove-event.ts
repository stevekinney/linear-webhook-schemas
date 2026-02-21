import { z } from 'zod';

import { InitiativeUpdateWebhookPayloadSchema } from './shared/initiative-update.js';
import { createEnvelopeSchema } from './shared/webhook-envelope.js';

export const InitiativeUpdateRemoveEventSchema = createEnvelopeSchema('InitiativeUpdate', 'remove', InitiativeUpdateWebhookPayloadSchema);

export type InitiativeUpdateRemoveEvent = z.infer<typeof InitiativeUpdateRemoveEventSchema>;

export function isInitiativeUpdateRemoveEvent(value: unknown): value is InitiativeUpdateRemoveEvent {
  return InitiativeUpdateRemoveEventSchema.safeParse(value).success;
}
