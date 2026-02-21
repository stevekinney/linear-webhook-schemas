import { z } from 'zod';

import { InitiativeUpdateWebhookPayloadSchema } from './shared/initiative-update.js';
import { createEnvelopeSchema } from './shared/webhook-envelope.js';

export const InitiativeUpdateCreateEventSchema = createEnvelopeSchema('InitiativeUpdate', 'create', InitiativeUpdateWebhookPayloadSchema);

export type InitiativeUpdateCreateEvent = z.infer<typeof InitiativeUpdateCreateEventSchema>;

export function isInitiativeUpdateCreateEvent(value: unknown): value is InitiativeUpdateCreateEvent {
  return InitiativeUpdateCreateEventSchema.safeParse(value).success;
}
