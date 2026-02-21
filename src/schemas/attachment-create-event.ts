import { z } from 'zod';

import { AttachmentWebhookPayloadSchema } from './shared/attachment.js';
import { createEnvelopeSchema } from './shared/webhook-envelope.js';

export const AttachmentCreateEventSchema = createEnvelopeSchema('Attachment', 'create', AttachmentWebhookPayloadSchema);

export type AttachmentCreateEvent = z.infer<typeof AttachmentCreateEventSchema>;

export function isAttachmentCreateEvent(value: unknown): value is AttachmentCreateEvent {
	return AttachmentCreateEventSchema.safeParse(value).success;
}
