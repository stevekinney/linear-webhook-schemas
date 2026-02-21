import { z } from 'zod';

export const AttachmentWebhookPayloadSchema = z.object({
  id: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  title: z.string(),
  url: z.string(),
  issueId: z.string(),
  groupBySource: z.boolean(),
  metadata: z.record(z.string(), z.unknown()),
  // Optional
  archivedAt: z.string().optional(),
  creatorId: z.string().optional(),
  externalUserCreatorId: z.string().optional(),
  originalIssueId: z.string().optional(),
  source: z.record(z.string(), z.unknown()).optional(),
  sourceType: z.string().optional(),
  subtitle: z.string().optional(),
}).passthrough();

export type AttachmentWebhookPayload = z.infer<typeof AttachmentWebhookPayloadSchema>;

export function isAttachmentWebhookPayload(value: unknown): value is AttachmentWebhookPayload {
  return AttachmentWebhookPayloadSchema.safeParse(value).success;
}
