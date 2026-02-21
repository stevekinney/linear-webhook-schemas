import { z } from 'zod';

import { ReactionWebhookPayloadSchema } from './shared/reaction.js';
import { createEnvelopeSchema } from './shared/webhook-envelope.js';

export const ReactionUpdateEventSchema = createEnvelopeSchema('Reaction', 'update', ReactionWebhookPayloadSchema);

export type ReactionUpdateEvent = z.infer<typeof ReactionUpdateEventSchema>;

export function isReactionUpdateEvent(value: unknown): value is ReactionUpdateEvent {
	return ReactionUpdateEventSchema.safeParse(value).success;
}
