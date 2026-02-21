import { z } from 'zod';

import { IssueWebhookPayloadSchema } from './shared/issue.js';
import { createEnvelopeSchema } from './shared/webhook-envelope.js';

export const IssueRemoveEventSchema = createEnvelopeSchema('Issue', 'remove', IssueWebhookPayloadSchema);

export type IssueRemoveEvent = z.infer<typeof IssueRemoveEventSchema>;

export function isIssueRemoveEvent(value: unknown): value is IssueRemoveEvent {
	return IssueRemoveEventSchema.safeParse(value).success;
}
