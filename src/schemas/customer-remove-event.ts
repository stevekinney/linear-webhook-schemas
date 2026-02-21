import { z } from 'zod';

import { CustomerWebhookPayloadSchema } from './shared/customer.js';
import { createEnvelopeSchema } from './shared/webhook-envelope.js';

export const CustomerRemoveEventSchema = createEnvelopeSchema('Customer', 'remove', CustomerWebhookPayloadSchema);

export type CustomerRemoveEvent = z.infer<typeof CustomerRemoveEventSchema>;

export function isCustomerRemoveEvent(value: unknown): value is CustomerRemoveEvent {
  return CustomerRemoveEventSchema.safeParse(value).success;
}
