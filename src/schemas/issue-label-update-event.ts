import { z } from 'zod';

import { IssueLabelWebhookPayloadSchema } from './shared/issue-label.js';
import { createEnvelopeSchema } from './shared/webhook-envelope.js';

export const IssueLabelUpdateEventSchema = createEnvelopeSchema('IssueLabel', 'update', IssueLabelWebhookPayloadSchema);

export type IssueLabelUpdateEvent = z.infer<typeof IssueLabelUpdateEventSchema>;

export function isIssueLabelUpdateEvent(value: unknown): value is IssueLabelUpdateEvent {
	return IssueLabelUpdateEventSchema.safeParse(value).success;
}
