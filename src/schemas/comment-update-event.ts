import { z } from 'zod';

import { CommentWebhookPayloadSchema } from './shared/comment.js';
import { createEnvelopeSchema } from './shared/webhook-envelope.js';

export const CommentUpdateEventSchema = createEnvelopeSchema('Comment', 'update', CommentWebhookPayloadSchema);

export type CommentUpdateEvent = z.infer<typeof CommentUpdateEventSchema>;

export function isCommentUpdateEvent(value: unknown): value is CommentUpdateEvent {
	return CommentUpdateEventSchema.safeParse(value).success;
}
