import { z } from 'zod';

export const IssueLabelWebhookPayloadSchema = z.object({
  id: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  name: z.string(),
  color: z.string(),
  isGroup: z.boolean(),
  // Optional
  archivedAt: z.string().optional(),
  creatorId: z.string().optional(),
  description: z.string().optional(),
  inheritedFromId: z.string().optional(),
  parentId: z.string().optional(),
  teamId: z.string().optional(),
}).passthrough();

export type IssueLabelWebhookPayload = z.infer<typeof IssueLabelWebhookPayloadSchema>;

export function isIssueLabelWebhookPayload(value: unknown): value is IssueLabelWebhookPayload {
  return IssueLabelWebhookPayloadSchema.safeParse(value).success;
}
