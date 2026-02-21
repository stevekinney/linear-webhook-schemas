import { z } from 'zod';

const UserChildSchema = z.object({ id: z.string(), name: z.string().optional() }).passthrough();
const IssueChildSchema = z.object({ id: z.string(), identifier: z.string().optional(), title: z.string().optional() }).passthrough();
const CommentChildSchema = z.object({ id: z.string() }).passthrough();
const ProjectUpdateChildSchema = z.object({ id: z.string() }).passthrough();

export const ReactionWebhookPayloadSchema = z.object({
  id: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  emoji: z.string(),
  // Optional
  archivedAt: z.string().optional(),
  user: UserChildSchema.optional(),
  userId: z.string().optional(),
  comment: CommentChildSchema.optional(),
  commentId: z.string().optional(),
  issue: IssueChildSchema.optional(),
  issueId: z.string().optional(),
  projectUpdate: ProjectUpdateChildSchema.optional(),
  projectUpdateId: z.string().optional(),
  initiativeUpdateId: z.string().optional(),
  postId: z.string().optional(),
  externalUserId: z.string().optional(),
}).passthrough();

export type ReactionWebhookPayload = z.infer<typeof ReactionWebhookPayloadSchema>;

export function isReactionWebhookPayload(value: unknown): value is ReactionWebhookPayload {
  return ReactionWebhookPayloadSchema.safeParse(value).success;
}
