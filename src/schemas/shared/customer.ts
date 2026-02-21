import { z } from 'zod';

const CustomerStatusChildSchema = z.object({ id: z.string(), name: z.string().optional() }).passthrough();
const CustomerTierChildSchema = z.object({ id: z.string(), name: z.string().optional() }).passthrough();

export const CustomerWebhookPayloadSchema = z.object({
  id: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  name: z.string(),
  slugId: z.string(),
  url: z.string(),
  approximateNeedCount: z.number(),
  domains: z.array(z.string()),
  externalIds: z.array(z.string()),
  // Optional
  archivedAt: z.string().optional(),
  logoUrl: z.string().optional(),
  mainSourceId: z.string().optional(),
  ownerId: z.string().optional(),
  revenue: z.number().optional(),
  size: z.number().optional(),
  slackChannelId: z.string().optional(),
  status: CustomerStatusChildSchema.optional(),
  statusId: z.string().optional(),
  tier: CustomerTierChildSchema.optional(),
  tierId: z.string().optional(),
}).passthrough();

export type CustomerWebhookPayload = z.infer<typeof CustomerWebhookPayloadSchema>;

export function isCustomerWebhookPayload(value: unknown): value is CustomerWebhookPayload {
  return CustomerWebhookPayloadSchema.safeParse(value).success;
}
