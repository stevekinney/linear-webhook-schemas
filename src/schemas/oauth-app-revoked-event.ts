import { z } from 'zod';

export const OAuthAppRevokedEventSchema = z
  .object({
    action: z.literal('revoked'),
    type: z.literal('OAuthApp'),
    oauthClientId: z.string(),
    organizationId: z.string(),
    createdAt: z.string(),
    webhookTimestamp: z.number(),
    webhookId: z.string(),
  })
  .passthrough();

export type OAuthAppRevokedEvent = z.infer<typeof OAuthAppRevokedEventSchema>;

export function isOAuthAppRevokedEvent(value: unknown): value is OAuthAppRevokedEvent {
  return OAuthAppRevokedEventSchema.safeParse(value).success;
}
