import { z } from 'zod';

import { ProjectUpdateWebhookPayloadSchema } from './shared/project-update.js';
import { createEnvelopeSchema } from './shared/webhook-envelope.js';

export const ProjectUpdateUpdateEventSchema = createEnvelopeSchema('ProjectUpdate', 'update', ProjectUpdateWebhookPayloadSchema);

export type ProjectUpdateUpdateEvent = z.infer<typeof ProjectUpdateUpdateEventSchema>;

export function isProjectUpdateUpdateEvent(value: unknown): value is ProjectUpdateUpdateEvent {
  return ProjectUpdateUpdateEventSchema.safeParse(value).success;
}
