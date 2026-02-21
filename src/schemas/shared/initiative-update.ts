import { z } from 'zod';

const UserChildSchema = z.object({ id: z.string(), name: z.string().optional() }).passthrough();
const InitiativeChildSchema = z.object({ id: z.string() }).passthrough();

export const InitiativeUpdateWebhookPayloadSchema = z.object({
  id: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  body: z.string(),
  bodyData: z.string(),
  editedAt: z.string(),
  health: z.string(),
  slugId: z.string(),
  initiative: InitiativeChildSchema,
  initiativeId: z.string(),
  user: UserChildSchema,
  userId: z.string(),
  reactionData: z.record(z.string(), z.unknown()),
  // Optional
  archivedAt: z.string().optional(),
  url: z.string().optional(),
}).passthrough();

export type InitiativeUpdateWebhookPayload = z.infer<typeof InitiativeUpdateWebhookPayloadSchema>;

export function isInitiativeUpdateWebhookPayload(value: unknown): value is InitiativeUpdateWebhookPayload {
  return InitiativeUpdateWebhookPayloadSchema.safeParse(value).success;
}
