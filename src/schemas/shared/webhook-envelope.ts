import { z } from 'zod';

import { ActorSchema } from './actor.js';

type WebhookAction = 'create' | 'update' | 'remove';

export function createEnvelopeSchema<
  TType extends string,
  TAction extends WebhookAction,
  TData extends z.ZodTypeAny,
>(type: TType, action: TAction, dataSchema: TData) {
  const base = z.object({
    action: z.literal(action),
    type: z.literal(type),
    actor: ActorSchema.optional(),
    createdAt: z.string(),
    data: dataSchema,
    url: z.string(),
    webhookTimestamp: z.number(),
    organizationId: z.string(),
    webhookId: z.string(),
  });

  if (action === 'update') {
    return base
      .extend({
        updatedFrom: z.record(z.string(), z.unknown()).optional(),
      })
      .passthrough();
  }

  return base.passthrough();
}
