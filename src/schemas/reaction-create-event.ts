import { z } from 'zod';

import { ReactionWebhookPayloadSchema } from './shared/reaction.js';
import { createEnvelopeSchema } from './shared/webhook-envelope.js';

export const ReactionCreateEventSchema = createEnvelopeSchema('Reaction', 'create', ReactionWebhookPayloadSchema);

export type ReactionCreateEvent = z.infer<typeof ReactionCreateEventSchema>;

export function isReactionCreateEvent(value: unknown): value is ReactionCreateEvent {
	return ReactionCreateEventSchema.safeParse(value).success;
}
