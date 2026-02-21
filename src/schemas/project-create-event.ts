import { z } from 'zod';

import { ProjectWebhookPayloadSchema } from './shared/project.js';
import { createEnvelopeSchema } from './shared/webhook-envelope.js';

export const ProjectCreateEventSchema = createEnvelopeSchema('Project', 'create', ProjectWebhookPayloadSchema);

export type ProjectCreateEvent = z.infer<typeof ProjectCreateEventSchema>;

export function isProjectCreateEvent(value: unknown): value is ProjectCreateEvent {
  return ProjectCreateEventSchema.safeParse(value).success;
}
