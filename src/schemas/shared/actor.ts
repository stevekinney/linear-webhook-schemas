import { z } from 'zod';

export const ActorUserSchema = z
  .object({
    id: z.string(),
    type: z.literal('user'),
    name: z.string(),
  })
  .passthrough();

export type ActorUser = z.infer<typeof ActorUserSchema>;

export const ActorApiKeySchema = z
  .object({
    id: z.string(),
    type: z.literal('apiKey'),
  })
  .passthrough();

export type ActorApiKey = z.infer<typeof ActorApiKeySchema>;

export const ActorAppSchema = z
  .object({
    id: z.string(),
    type: z.literal('application'),
    name: z.string().optional(),
  })
  .passthrough();

export type ActorApp = z.infer<typeof ActorAppSchema>;

export const ActorSchema = z.union([ActorUserSchema, ActorApiKeySchema, ActorAppSchema]);

export type Actor = z.infer<typeof ActorSchema>;

export function isActor(value: unknown): value is Actor {
  return ActorSchema.safeParse(value).success;
}
