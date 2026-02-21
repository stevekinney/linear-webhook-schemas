import { z } from 'zod';

const UserChildSchema = z.object({ id: z.string(), name: z.string().optional() }).passthrough();
const ProjectChildSchema = z.object({ id: z.string() }).passthrough();

export const ProjectUpdateWebhookPayloadSchema = z.object({
  id: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  body: z.string(),
  bodyData: z.string(),
  editedAt: z.string(),
  health: z.string(),
  slugId: z.string(),
  project: ProjectChildSchema,
  projectId: z.string(),
  user: UserChildSchema,
  userId: z.string(),
  reactionData: z.record(z.string(), z.unknown()),
  // Optional
  archivedAt: z.string().optional(),
  url: z.string().optional(),
}).passthrough();

export type ProjectUpdateWebhookPayload = z.infer<typeof ProjectUpdateWebhookPayloadSchema>;

export function isProjectUpdateWebhookPayload(value: unknown): value is ProjectUpdateWebhookPayload {
  return ProjectUpdateWebhookPayloadSchema.safeParse(value).success;
}
