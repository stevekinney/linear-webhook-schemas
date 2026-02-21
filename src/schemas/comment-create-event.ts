import { z } from 'zod';

import { CommentWebhookPayloadSchema } from './shared/comment.js';
import { createEnvelopeSchema } from './shared/webhook-envelope.js';

export const CommentCreateEventSchema = createEnvelopeSchema('Comment', 'create', CommentWebhookPayloadSchema);

export type CommentCreateEvent = z.infer<typeof CommentCreateEventSchema>;

export function isCommentCreateEvent(value: unknown): value is CommentCreateEvent {
	return CommentCreateEventSchema.safeParse(value).success;
}
