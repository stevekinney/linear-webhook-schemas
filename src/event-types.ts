export const linearWebhookEventTypes = [
  'Attachment',
  'AuditEntry',
  'Comment',
  'Customer',
  'CustomerNeed',
  'Cycle',
  'Document',
  'Initiative',
  'InitiativeUpdate',
  'Issue',
  'IssueLabel',
  'Project',
  'ProjectUpdate',
  'Reaction',
  'User',
  'IssueSLA',
  'OAuthApp',
  'AppUserNotification',
  'PermissionChange',
  'AgentSessionEvent',
] as const;

export type LinearWebhookEventType = (typeof linearWebhookEventTypes)[number];

export function isLinearWebhookEventType(value: unknown): value is LinearWebhookEventType {
  return (
    typeof value === 'string' &&
    (linearWebhookEventTypes as readonly string[]).includes(value)
  );
}
