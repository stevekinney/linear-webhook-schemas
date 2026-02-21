import { z } from 'zod';

export const UserWebhookPayloadSchema = z.object({
  id: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  name: z.string(),
  displayName: z.string(),
  email: z.string(),
  url: z.string(),
  active: z.boolean(),
  admin: z.boolean(),
  app: z.boolean(),
  guest: z.boolean(),
  // Optional
  archivedAt: z.string().optional(),
  avatarUrl: z.string().optional(),
  description: z.string().optional(),
  disableReason: z.string().optional(),
  owner: z.boolean().optional(),
  timezone: z.string().optional(),
}).passthrough();

export type UserWebhookPayload = z.infer<typeof UserWebhookPayloadSchema>;

export function isUserWebhookPayload(value: unknown): value is UserWebhookPayload {
  return UserWebhookPayloadSchema.safeParse(value).success;
}
