import { z } from 'zod';

import { AuditEntryWebhookPayloadSchema } from './shared/audit-entry.js';
import { createEnvelopeSchema } from './shared/webhook-envelope.js';

export const AuditEntryUpdateEventSchema = createEnvelopeSchema('AuditEntry', 'update', AuditEntryWebhookPayloadSchema);

export type AuditEntryUpdateEvent = z.infer<typeof AuditEntryUpdateEventSchema>;

export function isAuditEntryUpdateEvent(value: unknown): value is AuditEntryUpdateEvent {
  return AuditEntryUpdateEventSchema.safeParse(value).success;
}
