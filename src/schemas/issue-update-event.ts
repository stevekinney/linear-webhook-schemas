import { z } from 'zod';

import { IssueWebhookPayloadSchema } from './shared/issue.js';
import { createEnvelopeSchema } from './shared/webhook-envelope.js';

export const IssueUpdateEventSchema = createEnvelopeSchema('Issue', 'update', IssueWebhookPayloadSchema);

export type IssueUpdateEvent = z.infer<typeof IssueUpdateEventSchema>;

export function isIssueUpdateEvent(value: unknown): value is IssueUpdateEvent {
	return IssueUpdateEventSchema.safeParse(value).success;
}
