import { z } from 'zod';

import { ReactionWebhookPayloadSchema } from './shared/reaction.js';
import { createEnvelopeSchema } from './shared/webhook-envelope.js';

export const ReactionRemoveEventSchema = createEnvelopeSchema('Reaction', 'remove', ReactionWebhookPayloadSchema);

export type ReactionRemoveEvent = z.infer<typeof ReactionRemoveEventSchema>;

export function isReactionRemoveEvent(value: unknown): value is ReactionRemoveEvent {
	return ReactionRemoveEventSchema.safeParse(value).success;
}
