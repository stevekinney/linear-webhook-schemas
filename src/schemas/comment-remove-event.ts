import { z } from 'zod';

import { CommentWebhookPayloadSchema } from './shared/comment.js';
import { createEnvelopeSchema } from './shared/webhook-envelope.js';

export const CommentRemoveEventSchema = createEnvelopeSchema('Comment', 'remove', CommentWebhookPayloadSchema);

export type CommentRemoveEvent = z.infer<typeof CommentRemoveEventSchema>;

export function isCommentRemoveEvent(value: unknown): value is CommentRemoveEvent {
	return CommentRemoveEventSchema.safeParse(value).success;
}
