import { z } from 'zod';

import { IssueLabelWebhookPayloadSchema } from './shared/issue-label.js';
import { createEnvelopeSchema } from './shared/webhook-envelope.js';

export const IssueLabelRemoveEventSchema = createEnvelopeSchema('IssueLabel', 'remove', IssueLabelWebhookPayloadSchema);

export type IssueLabelRemoveEvent = z.infer<typeof IssueLabelRemoveEventSchema>;

export function isIssueLabelRemoveEvent(value: unknown): value is IssueLabelRemoveEvent {
	return IssueLabelRemoveEventSchema.safeParse(value).success;
}
