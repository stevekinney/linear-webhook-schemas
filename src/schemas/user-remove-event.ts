import { z } from 'zod';

import { UserWebhookPayloadSchema } from './shared/user.js';
import { createEnvelopeSchema } from './shared/webhook-envelope.js';

export const UserRemoveEventSchema = createEnvelopeSchema('User', 'remove', UserWebhookPayloadSchema);

export type UserRemoveEvent = z.infer<typeof UserRemoveEventSchema>;

export function isUserRemoveEvent(value: unknown): value is UserRemoveEvent {
  return UserRemoveEventSchema.safeParse(value).success;
}
