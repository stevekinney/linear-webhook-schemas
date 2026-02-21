import { z } from 'zod';

import { DocumentWebhookPayloadSchema } from './shared/document.js';
import { createEnvelopeSchema } from './shared/webhook-envelope.js';

export const DocumentUpdateEventSchema = createEnvelopeSchema('Document', 'update', DocumentWebhookPayloadSchema);

export type DocumentUpdateEvent = z.infer<typeof DocumentUpdateEventSchema>;

export function isDocumentUpdateEvent(value: unknown): value is DocumentUpdateEvent {
  return DocumentUpdateEventSchema.safeParse(value).success;
}
