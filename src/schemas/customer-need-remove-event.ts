import { z } from 'zod';

import { CustomerNeedWebhookPayloadSchema } from './shared/customer-need.js';
import { createEnvelopeSchema } from './shared/webhook-envelope.js';

export const CustomerNeedRemoveEventSchema = createEnvelopeSchema('CustomerNeed', 'remove', CustomerNeedWebhookPayloadSchema);

export type CustomerNeedRemoveEvent = z.infer<typeof CustomerNeedRemoveEventSchema>;

export function isCustomerNeedRemoveEvent(value: unknown): value is CustomerNeedRemoveEvent {
  return CustomerNeedRemoveEventSchema.safeParse(value).success;
}
