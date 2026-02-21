import { z } from 'zod';

import { ProjectUpdateWebhookPayloadSchema } from './shared/project-update.js';
import { createEnvelopeSchema } from './shared/webhook-envelope.js';

export const ProjectUpdateCreateEventSchema = createEnvelopeSchema('ProjectUpdate', 'create', ProjectUpdateWebhookPayloadSchema);

export type ProjectUpdateCreateEvent = z.infer<typeof ProjectUpdateCreateEventSchema>;

export function isProjectUpdateCreateEvent(value: unknown): value is ProjectUpdateCreateEvent {
  return ProjectUpdateCreateEventSchema.safeParse(value).success;
}
