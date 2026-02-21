import { z } from 'zod';

const UserChildSchema = z.object({ id: z.string(), name: z.string().optional() }).passthrough();
const CycleChildSchema = z.object({ id: z.string() }).passthrough();
const IssueLabelChildSchema = z.object({ id: z.string(), name: z.string().optional(), color: z.string().optional() }).passthrough();
const ProjectChildSchema = z.object({ id: z.string() }).passthrough();
const ProjectMilestoneChildSchema = z.object({ id: z.string() }).passthrough();
const WorkflowStateChildSchema = z.object({ id: z.string(), name: z.string().optional(), color: z.string().optional(), type: z.string().optional() }).passthrough();
const TeamChildSchema = z.object({ id: z.string(), name: z.string().optional(), key: z.string().optional() }).passthrough();
const ExternalUserChildSchema = z.object({ id: z.string() }).passthrough();

export const IssueWebhookPayloadSchema = z.object({
  id: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  number: z.number(),
  title: z.string(),
  priority: z.number(),
  priorityLabel: z.string(),
  prioritySortOrder: z.number(),
  sortOrder: z.number(),
  teamId: z.string(),
  stateId: z.string(),
  identifier: z.string(),
  url: z.string(),
  state: WorkflowStateChildSchema,
  labelIds: z.array(z.string()),
  labels: z.array(IssueLabelChildSchema),
  subscriberIds: z.array(z.string()),
  previousIdentifiers: z.array(z.string()),
  reactionData: z.record(z.string(), z.unknown()),
  // Optional fields
  description: z.string().optional(),
  descriptionData: z.string().optional(),
  assignee: UserChildSchema.optional(),
  assigneeId: z.string().optional(),
  creator: UserChildSchema.optional(),
  creatorId: z.string().optional(),
  delegate: UserChildSchema.optional(),
  delegateId: z.string().optional(),
  cycle: CycleChildSchema.optional(),
  cycleId: z.string().optional(),
  project: ProjectChildSchema.optional(),
  projectId: z.string().optional(),
  projectMilestone: ProjectMilestoneChildSchema.optional(),
  projectMilestoneId: z.string().optional(),
  team: TeamChildSchema.optional(),
  parentId: z.string().optional(),
  dueDate: z.string().optional(),
  estimate: z.number().optional(),
  completedAt: z.string().optional(),
  canceledAt: z.string().optional(),
  startedAt: z.string().optional(),
  archivedAt: z.string().optional(),
  autoArchivedAt: z.string().optional(),
  autoClosedAt: z.string().optional(),
  snoozedUntilAt: z.string().optional(),
  triagedAt: z.string().optional(),
  startedTriageAt: z.string().optional(),
  addedToCycleAt: z.string().optional(),
  addedToProjectAt: z.string().optional(),
  addedToTeamAt: z.string().optional(),
  botActor: z.string().optional(),
  externalUserCreator: ExternalUserChildSchema.optional(),
  externalUserCreatorId: z.string().optional(),
  integrationSourceType: z.string().optional(),
  lastAppliedTemplateId: z.string().optional(),
  recurringIssueTemplateId: z.string().optional(),
  slaBreachesAt: z.string().optional(),
  slaHighRiskAt: z.string().optional(),
  slaMediumRiskAt: z.string().optional(),
  slaStartedAt: z.string().optional(),
  slaType: z.string().optional(),
  sourceCommentId: z.string().optional(),
  subIssueSortOrder: z.number().optional(),
  trashed: z.boolean().optional(),
  syncedWith: z.record(z.string(), z.unknown()).optional(),
}).passthrough();

export type IssueWebhookPayload = z.infer<typeof IssueWebhookPayloadSchema>;

export function isIssueWebhookPayload(value: unknown): value is IssueWebhookPayload {
  return IssueWebhookPayloadSchema.safeParse(value).success;
}
