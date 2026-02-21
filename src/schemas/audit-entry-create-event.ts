import { z } from 'zod';

import { AuditEntryWebhookPayloadSchema } from './shared/audit-entry.js';
import { createEnvelopeSchema } from './shared/webhook-envelope.js';

export const AuditEntryCreateEventSchema = createEnvelopeSchema('AuditEntry', 'create', AuditEntryWebhookPayloadSchema);

export type AuditEntryCreateEvent = z.infer<typeof AuditEntryCreateEventSchema>;

export function isAuditEntryCreateEvent(value: unknown): value is AuditEntryCreateEvent {
  return AuditEntryCreateEventSchema.safeParse(value).success;
}
