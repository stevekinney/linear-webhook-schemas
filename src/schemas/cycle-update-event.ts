import { z } from 'zod';

import { CycleWebhookPayloadSchema } from './shared/cycle.js';
import { createEnvelopeSchema } from './shared/webhook-envelope.js';

export const CycleUpdateEventSchema = createEnvelopeSchema('Cycle', 'update', CycleWebhookPayloadSchema);

export type CycleUpdateEvent = z.infer<typeof CycleUpdateEventSchema>;

export function isCycleUpdateEvent(value: unknown): value is CycleUpdateEvent {
  return CycleUpdateEventSchema.safeParse(value).success;
}
