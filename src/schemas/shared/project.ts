import { z } from 'zod';

const UserChildSchema = z.object({ id: z.string(), name: z.string().optional() }).passthrough();
const InitiativeChildSchema = z.object({ id: z.string() }).passthrough();
const ProjectMilestoneChildSchema = z.object({ id: z.string(), name: z.string().optional() }).passthrough();
const ProjectStatusChildSchema = z.object({ id: z.string(), name: z.string().optional(), color: z.string().optional() }).passthrough();

export const ProjectWebhookPayloadSchema = z.object({
  id: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  name: z.string(),
  description: z.string(),
  color: z.string(),
  priority: z.number(),
  prioritySortOrder: z.number(),
  sortOrder: z.number(),
  slugId: z.string(),
  statusId: z.string(),
  url: z.string(),
  labelIds: z.array(z.string()),
  memberIds: z.array(z.string()),
  teamIds: z.array(z.string()),
  completedIssueCountHistory: z.array(z.number()),
  completedScopeHistory: z.array(z.number()),
  inProgressScopeHistory: z.array(z.number()),
  issueCountHistory: z.array(z.number()),
  scopeHistory: z.array(z.number()),
  // Optional
  archivedAt: z.string().optional(),
  autoArchivedAt: z.string().optional(),
  canceledAt: z.string().optional(),
  completedAt: z.string().optional(),
  content: z.string().optional(),
  convertedFromIssueId: z.string().optional(),
  creatorId: z.string().optional(),
  documentContentId: z.string().optional(),
  health: z.string().optional(),
  healthUpdatedAt: z.string().optional(),
  icon: z.string().optional(),
  lastAppliedTemplateId: z.string().optional(),
  lastUpdateId: z.string().optional(),
  lead: UserChildSchema.optional(),
  leadId: z.string().optional(),
  initiatives: z.array(InitiativeChildSchema).optional(),
  milestones: z.array(ProjectMilestoneChildSchema).optional(),
  projectUpdateRemindersPausedUntilAt: z.string().optional(),
  startDate: z.string().optional(),
  startDateResolution: z.string().optional(),
  startedAt: z.string().optional(),
  status: ProjectStatusChildSchema.optional(),
  targetDate: z.string().optional(),
  targetDateResolution: z.string().optional(),
  trashed: z.boolean().optional(),
}).passthrough();

export type ProjectWebhookPayload = z.infer<typeof ProjectWebhookPayloadSchema>;

export function isProjectWebhookPayload(value: unknown): value is ProjectWebhookPayload {
  return ProjectWebhookPayloadSchema.safeParse(value).success;
}
