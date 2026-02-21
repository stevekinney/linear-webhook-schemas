import { z } from 'zod';

import { UserWebhookPayloadSchema } from './shared/user.js';
import { createEnvelopeSchema } from './shared/webhook-envelope.js';

export const UserUpdateEventSchema = createEnvelopeSchema('User', 'update', UserWebhookPayloadSchema);

export type UserUpdateEvent = z.infer<typeof UserUpdateEventSchema>;

export function isUserUpdateEvent(value: unknown): value is UserUpdateEvent {
  return UserUpdateEventSchema.safeParse(value).success;
}
