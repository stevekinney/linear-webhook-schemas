import { z } from 'zod';

import { CycleWebhookPayloadSchema } from './shared/cycle.js';
import { createEnvelopeSchema } from './shared/webhook-envelope.js';

export const CycleCreateEventSchema = createEnvelopeSchema('Cycle', 'create', CycleWebhookPayloadSchema);

export type CycleCreateEvent = z.infer<typeof CycleCreateEventSchema>;

export function isCycleCreateEvent(value: unknown): value is CycleCreateEvent {
  return CycleCreateEventSchema.safeParse(value).success;
}
