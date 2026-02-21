import { z } from 'zod';

export const AuditEntryWebhookPayloadSchema = z.object({
  id: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  type: z.string(),
  organizationId: z.string(),
  // Optional
  actorId: z.string().optional(),
  archivedAt: z.string().optional(),
  countryCode: z.string().optional(),
  ip: z.string().optional(),
  metadata: z.record(z.string(), z.unknown()).optional(),
  requestInformation: z.record(z.string(), z.unknown()).optional(),
}).passthrough();

export type AuditEntryWebhookPayload = z.infer<typeof AuditEntryWebhookPayloadSchema>;

export function isAuditEntryWebhookPayload(value: unknown): value is AuditEntryWebhookPayload {
  return AuditEntryWebhookPayloadSchema.safeParse(value).success;
}
