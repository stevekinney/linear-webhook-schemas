import { z } from 'zod';

import { DocumentWebhookPayloadSchema } from './shared/document.js';
import { createEnvelopeSchema } from './shared/webhook-envelope.js';

export const DocumentRemoveEventSchema = createEnvelopeSchema('Document', 'remove', DocumentWebhookPayloadSchema);

export type DocumentRemoveEvent = z.infer<typeof DocumentRemoveEventSchema>;

export function isDocumentRemoveEvent(value: unknown): value is DocumentRemoveEvent {
  return DocumentRemoveEventSchema.safeParse(value).success;
}
