import { z } from 'zod';

export const CycleWebhookPayloadSchema = z.object({
  id: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  number: z.number(),
  startsAt: z.string(),
  endsAt: z.string(),
  teamId: z.string(),
  completedIssueCountHistory: z.array(z.number()),
  completedScopeHistory: z.array(z.number()),
  inProgressScopeHistory: z.array(z.number()),
  issueCountHistory: z.array(z.number()),
  scopeHistory: z.array(z.number()),
  uncompletedIssuesUponCloseIds: z.array(z.string()),
  // Optional
  archivedAt: z.string().optional(),
  autoArchivedAt: z.string().optional(),
  completedAt: z.string().optional(),
  description: z.string().optional(),
  inheritedFromId: z.string().optional(),
  name: z.string().optional(),
}).passthrough();

export type CycleWebhookPayload = z.infer<typeof CycleWebhookPayloadSchema>;

export function isCycleWebhookPayload(value: unknown): value is CycleWebhookPayload {
  return CycleWebhookPayloadSchema.safeParse(value).success;
}
