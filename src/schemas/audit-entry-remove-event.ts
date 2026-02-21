import { z } from 'zod';

import { AuditEntryWebhookPayloadSchema } from './shared/audit-entry.js';
import { createEnvelopeSchema } from './shared/webhook-envelope.js';

export const AuditEntryRemoveEventSchema = createEnvelopeSchema('AuditEntry', 'remove', AuditEntryWebhookPayloadSchema);

export type AuditEntryRemoveEvent = z.infer<typeof AuditEntryRemoveEventSchema>;

export function isAuditEntryRemoveEvent(value: unknown): value is AuditEntryRemoveEvent {
  return AuditEntryRemoveEventSchema.safeParse(value).success;
}
