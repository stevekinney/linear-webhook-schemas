import { z } from 'zod';

import { CycleWebhookPayloadSchema } from './shared/cycle.js';
import { createEnvelopeSchema } from './shared/webhook-envelope.js';

export const CycleRemoveEventSchema = createEnvelopeSchema('Cycle', 'remove', CycleWebhookPayloadSchema);

export type CycleRemoveEvent = z.infer<typeof CycleRemoveEventSchema>;

export function isCycleRemoveEvent(value: unknown): value is CycleRemoveEvent {
  return CycleRemoveEventSchema.safeParse(value).success;
}
