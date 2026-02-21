import { z } from 'zod';

import { ProjectUpdateWebhookPayloadSchema } from './shared/project-update.js';
import { createEnvelopeSchema } from './shared/webhook-envelope.js';

export const ProjectUpdateRemoveEventSchema = createEnvelopeSchema('ProjectUpdate', 'remove', ProjectUpdateWebhookPayloadSchema);

export type ProjectUpdateRemoveEvent = z.infer<typeof ProjectUpdateRemoveEventSchema>;

export function isProjectUpdateRemoveEvent(value: unknown): value is ProjectUpdateRemoveEvent {
  return ProjectUpdateRemoveEventSchema.safeParse(value).success;
}
