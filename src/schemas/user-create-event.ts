import { z } from 'zod';

import { UserWebhookPayloadSchema } from './shared/user.js';
import { createEnvelopeSchema } from './shared/webhook-envelope.js';

export const UserCreateEventSchema = createEnvelopeSchema('User', 'create', UserWebhookPayloadSchema);

export type UserCreateEvent = z.infer<typeof UserCreateEventSchema>;

export function isUserCreateEvent(value: unknown): value is UserCreateEvent {
  return UserCreateEventSchema.safeParse(value).success;
}
