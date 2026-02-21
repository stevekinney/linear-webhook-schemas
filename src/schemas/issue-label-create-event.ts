import { z } from 'zod';

import { IssueLabelWebhookPayloadSchema } from './shared/issue-label.js';
import { createEnvelopeSchema } from './shared/webhook-envelope.js';

export const IssueLabelCreateEventSchema = createEnvelopeSchema('IssueLabel', 'create', IssueLabelWebhookPayloadSchema);

export type IssueLabelCreateEvent = z.infer<typeof IssueLabelCreateEventSchema>;

export function isIssueLabelCreateEvent(value: unknown): value is IssueLabelCreateEvent {
	return IssueLabelCreateEventSchema.safeParse(value).success;
}
