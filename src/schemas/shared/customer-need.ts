import { z } from 'zod';

const IssueChildSchema = z.object({ id: z.string(), identifier: z.string().optional(), title: z.string().optional() }).passthrough();
const ProjectChildSchema = z.object({ id: z.string() }).passthrough();
const CustomerChildSchema = z.object({ id: z.string(), name: z.string().optional() }).passthrough();
const AttachmentChildSchema = z.object({ id: z.string() }).passthrough();

export const CustomerNeedWebhookPayloadSchema = z.object({
  id: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  priority: z.number(),
  // Optional
  archivedAt: z.string().optional(),
  attachment: AttachmentChildSchema.optional(),
  attachmentId: z.string().optional(),
  body: z.string().optional(),
  commentId: z.string().optional(),
  creatorId: z.string().optional(),
  customer: CustomerChildSchema.optional(),
  customerId: z.string().optional(),
  issue: IssueChildSchema.optional(),
  issueId: z.string().optional(),
  originalIssueId: z.string().optional(),
  project: ProjectChildSchema.optional(),
  projectAttachmentId: z.string().optional(),
  projectId: z.string().optional(),
}).passthrough();

export type CustomerNeedWebhookPayload = z.infer<typeof CustomerNeedWebhookPayloadSchema>;

export function isCustomerNeedWebhookPayload(value: unknown): value is CustomerNeedWebhookPayload {
  return CustomerNeedWebhookPayloadSchema.safeParse(value).success;
}
