import { z } from 'zod';

import { DocumentWebhookPayloadSchema } from './shared/document.js';
import { createEnvelopeSchema } from './shared/webhook-envelope.js';

export const DocumentCreateEventSchema = createEnvelopeSchema('Document', 'create', DocumentWebhookPayloadSchema);

export type DocumentCreateEvent = z.infer<typeof DocumentCreateEventSchema>;

export function isDocumentCreateEvent(value: unknown): value is DocumentCreateEvent {
  return DocumentCreateEventSchema.safeParse(value).success;
}
