import { z } from 'zod';

import { CustomerNeedWebhookPayloadSchema } from './shared/customer-need.js';
import { createEnvelopeSchema } from './shared/webhook-envelope.js';

export const CustomerNeedUpdateEventSchema = createEnvelopeSchema('CustomerNeed', 'update', CustomerNeedWebhookPayloadSchema);

export type CustomerNeedUpdateEvent = z.infer<typeof CustomerNeedUpdateEventSchema>;

export function isCustomerNeedUpdateEvent(value: unknown): value is CustomerNeedUpdateEvent {
  return CustomerNeedUpdateEventSchema.safeParse(value).success;
}
