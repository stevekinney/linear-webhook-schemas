import { z } from 'zod';

import { IssueWebhookPayloadSchema } from './shared/issue.js';
import { createEnvelopeSchema } from './shared/webhook-envelope.js';

export const IssueCreateEventSchema = createEnvelopeSchema('Issue', 'create', IssueWebhookPayloadSchema);

export type IssueCreateEvent = z.infer<typeof IssueCreateEventSchema>;

export function isIssueCreateEvent(value: unknown): value is IssueCreateEvent {
	return IssueCreateEventSchema.safeParse(value).success;
}
