import { z } from 'zod';

import { ProjectWebhookPayloadSchema } from './shared/project.js';
import { createEnvelopeSchema } from './shared/webhook-envelope.js';

export const ProjectUpdateEventSchema = createEnvelopeSchema('Project', 'update', ProjectWebhookPayloadSchema);

export type ProjectUpdateEvent = z.infer<typeof ProjectUpdateEventSchema>;

export function isProjectUpdateEvent(value: unknown): value is ProjectUpdateEvent {
  return ProjectUpdateEventSchema.safeParse(value).success;
}
