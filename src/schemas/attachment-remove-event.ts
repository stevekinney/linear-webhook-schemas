import { z } from 'zod';

import { AttachmentWebhookPayloadSchema } from './shared/attachment.js';
import { createEnvelopeSchema } from './shared/webhook-envelope.js';

export const AttachmentRemoveEventSchema = createEnvelopeSchema('Attachment', 'remove', AttachmentWebhookPayloadSchema);

export type AttachmentRemoveEvent = z.infer<typeof AttachmentRemoveEventSchema>;

export function isAttachmentRemoveEvent(value: unknown): value is AttachmentRemoveEvent {
	return AttachmentRemoveEventSchema.safeParse(value).success;
}
