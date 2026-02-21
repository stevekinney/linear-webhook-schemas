import { z } from 'zod';

import { AttachmentWebhookPayloadSchema } from './shared/attachment.js';
import { createEnvelopeSchema } from './shared/webhook-envelope.js';

export const AttachmentUpdateEventSchema = createEnvelopeSchema('Attachment', 'update', AttachmentWebhookPayloadSchema);

export type AttachmentUpdateEvent = z.infer<typeof AttachmentUpdateEventSchema>;

export function isAttachmentUpdateEvent(value: unknown): value is AttachmentUpdateEvent {
	return AttachmentUpdateEventSchema.safeParse(value).success;
}
