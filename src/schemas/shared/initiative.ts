import { z } from 'zod';

const UserChildSchema = z.object({ id: z.string(), name: z.string().optional() }).passthrough();
const ProjectChildSchema = z.object({ id: z.string() }).passthrough();
const InitiativeChildSchema = z.object({ id: z.string() }).passthrough();
const InitiativeUpdateChildSchema = z.object({ id: z.string() }).passthrough();

export const InitiativeWebhookPayloadSchema = z.object({
  id: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  name: z.string(),
  description: z.string(),
  status: z.string(),
  frequencyResolution: z.string(),
  organizationId: z.string(),
  slugId: z.string(),
  sortOrder: z.number(),
  url: z.string(),
  // Optional
  archivedAt: z.string().optional(),
  color: z.string().optional(),
  completedAt: z.string().optional(),
  creator: UserChildSchema.optional(),
  creatorId: z.string().optional(),
  health: z.string().optional(),
  healthUpdatedAt: z.string().optional(),
  icon: z.string().optional(),
  lastUpdate: InitiativeUpdateChildSchema.optional(),
  lastUpdateId: z.string().optional(),
  owner: UserChildSchema.optional(),
  ownerId: z.string().optional(),
  parentInitiative: InitiativeChildSchema.optional(),
  projects: z.array(ProjectChildSchema).optional(),
  startedAt: z.string().optional(),
  subInitiatives: z.array(InitiativeChildSchema).optional(),
  targetDate: z.string().optional(),
  targetDateResolution: z.string().optional(),
  trashed: z.boolean().optional(),
  updateReminderFrequency: z.number().optional(),
  updateReminderFrequencyInWeeks: z.number().optional(),
  updateRemindersDay: z.number().optional(),
  updateRemindersHour: z.number().optional(),
}).passthrough();

export type InitiativeWebhookPayload = z.infer<typeof InitiativeWebhookPayloadSchema>;

export function isInitiativeWebhookPayload(value: unknown): value is InitiativeWebhookPayload {
  return InitiativeWebhookPayloadSchema.safeParse(value).success;
}
