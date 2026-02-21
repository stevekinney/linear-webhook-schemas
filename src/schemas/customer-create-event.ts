import { z } from 'zod';

import { CustomerWebhookPayloadSchema } from './shared/customer.js';
import { createEnvelopeSchema } from './shared/webhook-envelope.js';

export const CustomerCreateEventSchema = createEnvelopeSchema('Customer', 'create', CustomerWebhookPayloadSchema);

export type CustomerCreateEvent = z.infer<typeof CustomerCreateEventSchema>;

export function isCustomerCreateEvent(value: unknown): value is CustomerCreateEvent {
  return CustomerCreateEventSchema.safeParse(value).success;
}
