import { z } from 'zod';

import { ActorSchema } from './shared/actor.js';
import { IssueWebhookPayloadSchema } from './shared/issue.js';

export const IssueSlaEventSchema = z
  .object({
    action: z.string(),
    type: z.literal('IssueSLA'),
    actor: ActorSchema.optional(),
    createdAt: z.string(),
    issueData: IssueWebhookPayloadSchema,
    url: z.string(),
    webhookTimestamp: z.number(),
    organizationId: z.string(),
    webhookId: z.string(),
  })
  .passthrough();

export type IssueSlaEvent = z.infer<typeof IssueSlaEventSchema>;

export function isIssueSlaEvent(value: unknown): value is IssueSlaEvent {
  return IssueSlaEventSchema.safeParse(value).success;
}
