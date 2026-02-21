import { z } from 'zod';

export const DocumentWebhookPayloadSchema = z.object({
  id: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  title: z.string(),
  slugId: z.string(),
  sortOrder: z.number(),
  // Optional
  archivedAt: z.string().optional(),
  color: z.string().optional(),
  content: z.string().optional(),
  creatorId: z.string().optional(),
  description: z.string().optional(),
  hiddenAt: z.string().optional(),
  icon: z.string().optional(),
  initiativeId: z.string().optional(),
  lastAppliedTemplateId: z.string().optional(),
  projectId: z.string().optional(),
  resourceFolderId: z.string().optional(),
  subscriberIds: z.array(z.string()).optional(),
  trashed: z.boolean().optional(),
  updatedById: z.string().optional(),
}).passthrough();

export type DocumentWebhookPayload = z.infer<typeof DocumentWebhookPayloadSchema>;

export function isDocumentWebhookPayload(value: unknown): value is DocumentWebhookPayload {
  return DocumentWebhookPayloadSchema.safeParse(value).success;
}
