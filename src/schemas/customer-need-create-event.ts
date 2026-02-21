import { z } from 'zod';

import { CustomerNeedWebhookPayloadSchema } from './shared/customer-need.js';
import { createEnvelopeSchema } from './shared/webhook-envelope.js';

export const CustomerNeedCreateEventSchema = createEnvelopeSchema('CustomerNeed', 'create', CustomerNeedWebhookPayloadSchema);

export type CustomerNeedCreateEvent = z.infer<typeof CustomerNeedCreateEventSchema>;

export function isCustomerNeedCreateEvent(value: unknown): value is CustomerNeedCreateEvent {
  return CustomerNeedCreateEventSchema.safeParse(value).success;
}
