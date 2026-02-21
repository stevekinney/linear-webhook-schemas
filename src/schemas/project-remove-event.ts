import { z } from 'zod';

import { ProjectWebhookPayloadSchema } from './shared/project.js';
import { createEnvelopeSchema } from './shared/webhook-envelope.js';

export const ProjectRemoveEventSchema = createEnvelopeSchema('Project', 'remove', ProjectWebhookPayloadSchema);

export type ProjectRemoveEvent = z.infer<typeof ProjectRemoveEventSchema>;

export function isProjectRemoveEvent(value: unknown): value is ProjectRemoveEvent {
  return ProjectRemoveEventSchema.safeParse(value).success;
}
