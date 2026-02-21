import { z } from 'zod';

import { CustomerWebhookPayloadSchema } from './shared/customer.js';
import { createEnvelopeSchema } from './shared/webhook-envelope.js';

export const CustomerUpdateEventSchema = createEnvelopeSchema('Customer', 'update', CustomerWebhookPayloadSchema);

export type CustomerUpdateEvent = z.infer<typeof CustomerUpdateEventSchema>;

export function isCustomerUpdateEvent(value: unknown): value is CustomerUpdateEvent {
  return CustomerUpdateEventSchema.safeParse(value).success;
}
