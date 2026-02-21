import { z } from 'zod';

const UserChildSchema = z.object({ id: z.string(), name: z.string().optional() }).passthrough();
const IssueChildSchema = z.object({ id: z.string(), identifier: z.string().optional(), title: z.string().optional() }).passthrough();
const ExternalUserChildSchema = z.object({ id: z.string() }).passthrough();
const DocumentContentChildSchema = z.object({ id: z.string() }).passthrough();
const CommentChildSchema = z.object({ id: z.string() }).passthrough();
const ProjectUpdateChildSchema = z.object({ id: z.string() }).passthrough();
const InitiativeUpdateChildSchema = z.object({ id: z.string() }).passthrough();

export const CommentWebhookPayloadSchema = z.object({
  id: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  body: z.string(),
  reactionData: z.record(z.string(), z.unknown()),
  // Optional
  archivedAt: z.string().optional(),
  botActor: z.string().optional(),
  editedAt: z.string().optional(),
  user: UserChildSchema.optional(),
  userId: z.string().optional(),
  issue: IssueChildSchema.optional(),
  issueId: z.string().optional(),
  parent: CommentChildSchema.optional(),
  parentId: z.string().optional(),
  externalUser: ExternalUserChildSchema.optional(),
  externalUserId: z.string().optional(),
  documentContent: DocumentContentChildSchema.optional(),
  documentContentId: z.string().optional(),
  projectUpdate: ProjectUpdateChildSchema.optional(),
  projectUpdateId: z.string().optional(),
  initiativeUpdate: InitiativeUpdateChildSchema.optional(),
  initiativeUpdateId: z.string().optional(),
  postId: z.string().optional(),
  quotedText: z.string().optional(),
  resolvedAt: z.string().optional(),
  resolvingCommentId: z.string().optional(),
  resolvingUserId: z.string().optional(),
  syncedWith: z.record(z.string(), z.unknown()).optional(),
}).passthrough();

export type CommentWebhookPayload = z.infer<typeof CommentWebhookPayloadSchema>;

export function isCommentWebhookPayload(value: unknown): value is CommentWebhookPayload {
  return CommentWebhookPayloadSchema.safeParse(value).success;
}
