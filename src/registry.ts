import { z } from 'zod';

import { linearWebhookEventTypes } from './event-types.js';
import type { LinearWebhookEventType } from './event-types.js';
import { isLinearWebhookEventType } from './event-types.js';

// Standard data-change event schemas
import { IssueCreateEventSchema } from './schemas/issue-create-event.js';
import { IssueUpdateEventSchema } from './schemas/issue-update-event.js';
import { IssueRemoveEventSchema } from './schemas/issue-remove-event.js';
import { CommentCreateEventSchema } from './schemas/comment-create-event.js';
import { CommentUpdateEventSchema } from './schemas/comment-update-event.js';
import { CommentRemoveEventSchema } from './schemas/comment-remove-event.js';
import { AttachmentCreateEventSchema } from './schemas/attachment-create-event.js';
import { AttachmentUpdateEventSchema } from './schemas/attachment-update-event.js';
import { AttachmentRemoveEventSchema } from './schemas/attachment-remove-event.js';
import { IssueLabelCreateEventSchema } from './schemas/issue-label-create-event.js';
import { IssueLabelUpdateEventSchema } from './schemas/issue-label-update-event.js';
import { IssueLabelRemoveEventSchema } from './schemas/issue-label-remove-event.js';
import { ReactionCreateEventSchema } from './schemas/reaction-create-event.js';
import { ReactionUpdateEventSchema } from './schemas/reaction-update-event.js';
import { ReactionRemoveEventSchema } from './schemas/reaction-remove-event.js';
import { ProjectCreateEventSchema } from './schemas/project-create-event.js';
import { ProjectUpdateEventSchema } from './schemas/project-update-event.js';
import { ProjectRemoveEventSchema } from './schemas/project-remove-event.js';
import { ProjectUpdateCreateEventSchema } from './schemas/project-update-create-event.js';
import { ProjectUpdateUpdateEventSchema } from './schemas/project-update-update-event.js';
import { ProjectUpdateRemoveEventSchema } from './schemas/project-update-remove-event.js';
import { CycleCreateEventSchema } from './schemas/cycle-create-event.js';
import { CycleUpdateEventSchema } from './schemas/cycle-update-event.js';
import { CycleRemoveEventSchema } from './schemas/cycle-remove-event.js';
import { DocumentCreateEventSchema } from './schemas/document-create-event.js';
import { DocumentUpdateEventSchema } from './schemas/document-update-event.js';
import { DocumentRemoveEventSchema } from './schemas/document-remove-event.js';
import { UserCreateEventSchema } from './schemas/user-create-event.js';
import { UserUpdateEventSchema } from './schemas/user-update-event.js';
import { UserRemoveEventSchema } from './schemas/user-remove-event.js';
import { InitiativeCreateEventSchema } from './schemas/initiative-create-event.js';
import { InitiativeUpdateEventSchema } from './schemas/initiative-update-event.js';
import { InitiativeRemoveEventSchema } from './schemas/initiative-remove-event.js';
import { InitiativeUpdateCreateEventSchema } from './schemas/initiative-update-create-event.js';
import { InitiativeUpdateUpdateEventSchema } from './schemas/initiative-update-update-event.js';
import { InitiativeUpdateRemoveEventSchema } from './schemas/initiative-update-remove-event.js';
import { CustomerCreateEventSchema } from './schemas/customer-create-event.js';
import { CustomerUpdateEventSchema } from './schemas/customer-update-event.js';
import { CustomerRemoveEventSchema } from './schemas/customer-remove-event.js';
import { CustomerNeedCreateEventSchema } from './schemas/customer-need-create-event.js';
import { CustomerNeedUpdateEventSchema } from './schemas/customer-need-update-event.js';
import { CustomerNeedRemoveEventSchema } from './schemas/customer-need-remove-event.js';
import { AuditEntryCreateEventSchema } from './schemas/audit-entry-create-event.js';
import { AuditEntryUpdateEventSchema } from './schemas/audit-entry-update-event.js';
import { AuditEntryRemoveEventSchema } from './schemas/audit-entry-remove-event.js';

// Special-case event schemas
import { IssueSlaEventSchema } from './schemas/issue-sla-event.js';
import { OAuthAppRevokedEventSchema } from './schemas/oauth-app-revoked-event.js';
import { AppUserNotificationEventSchema } from './schemas/app-user-notification-event.js';
import { PermissionChangeEventSchema } from './schemas/permission-change-event.js';
import { AgentSessionEventSchema } from './schemas/agent-session-event.js';

// Re-export event types
export { linearWebhookEventTypes, isLinearWebhookEventType };
export type { LinearWebhookEventType };

/**
 * Maps each LinearWebhookEventType to a union of its possible event schemas.
 */
const schemaRegistryMap = new Map<LinearWebhookEventType, z.ZodTypeAny>([
  ['Issue', z.union([IssueCreateEventSchema, IssueUpdateEventSchema, IssueRemoveEventSchema])],
  ['Comment', z.union([CommentCreateEventSchema, CommentUpdateEventSchema, CommentRemoveEventSchema])],
  ['Attachment', z.union([AttachmentCreateEventSchema, AttachmentUpdateEventSchema, AttachmentRemoveEventSchema])],
  ['IssueLabel', z.union([IssueLabelCreateEventSchema, IssueLabelUpdateEventSchema, IssueLabelRemoveEventSchema])],
  ['Reaction', z.union([ReactionCreateEventSchema, ReactionUpdateEventSchema, ReactionRemoveEventSchema])],
  ['Project', z.union([ProjectCreateEventSchema, ProjectUpdateEventSchema, ProjectRemoveEventSchema])],
  ['ProjectUpdate', z.union([ProjectUpdateCreateEventSchema, ProjectUpdateUpdateEventSchema, ProjectUpdateRemoveEventSchema])],
  ['Cycle', z.union([CycleCreateEventSchema, CycleUpdateEventSchema, CycleRemoveEventSchema])],
  ['Document', z.union([DocumentCreateEventSchema, DocumentUpdateEventSchema, DocumentRemoveEventSchema])],
  ['User', z.union([UserCreateEventSchema, UserUpdateEventSchema, UserRemoveEventSchema])],
  ['Initiative', z.union([InitiativeCreateEventSchema, InitiativeUpdateEventSchema, InitiativeRemoveEventSchema])],
  ['InitiativeUpdate', z.union([InitiativeUpdateCreateEventSchema, InitiativeUpdateUpdateEventSchema, InitiativeUpdateRemoveEventSchema])],
  ['Customer', z.union([CustomerCreateEventSchema, CustomerUpdateEventSchema, CustomerRemoveEventSchema])],
  ['CustomerNeed', z.union([CustomerNeedCreateEventSchema, CustomerNeedUpdateEventSchema, CustomerNeedRemoveEventSchema])],
  ['AuditEntry', z.union([AuditEntryCreateEventSchema, AuditEntryUpdateEventSchema, AuditEntryRemoveEventSchema])],
  ['IssueSLA', IssueSlaEventSchema],
  ['OAuthApp', OAuthAppRevokedEventSchema],
  ['AppUserNotification', AppUserNotificationEventSchema],
  ['PermissionChange', PermissionChangeEventSchema],
  ['AgentSessionEvent', AgentSessionEventSchema],
]);

/**
 * All event schemas as a flat array (for trial-parsing).
 */
export const allEventSchemas: z.ZodTypeAny[] = [
  IssueCreateEventSchema, IssueUpdateEventSchema, IssueRemoveEventSchema,
  CommentCreateEventSchema, CommentUpdateEventSchema, CommentRemoveEventSchema,
  AttachmentCreateEventSchema, AttachmentUpdateEventSchema, AttachmentRemoveEventSchema,
  IssueLabelCreateEventSchema, IssueLabelUpdateEventSchema, IssueLabelRemoveEventSchema,
  ReactionCreateEventSchema, ReactionUpdateEventSchema, ReactionRemoveEventSchema,
  ProjectCreateEventSchema, ProjectUpdateEventSchema, ProjectRemoveEventSchema,
  ProjectUpdateCreateEventSchema, ProjectUpdateUpdateEventSchema, ProjectUpdateRemoveEventSchema,
  CycleCreateEventSchema, CycleUpdateEventSchema, CycleRemoveEventSchema,
  DocumentCreateEventSchema, DocumentUpdateEventSchema, DocumentRemoveEventSchema,
  UserCreateEventSchema, UserUpdateEventSchema, UserRemoveEventSchema,
  InitiativeCreateEventSchema, InitiativeUpdateEventSchema, InitiativeRemoveEventSchema,
  InitiativeUpdateCreateEventSchema, InitiativeUpdateUpdateEventSchema, InitiativeUpdateRemoveEventSchema,
  CustomerCreateEventSchema, CustomerUpdateEventSchema, CustomerRemoveEventSchema,
  CustomerNeedCreateEventSchema, CustomerNeedUpdateEventSchema, CustomerNeedRemoveEventSchema,
  AuditEntryCreateEventSchema, AuditEntryUpdateEventSchema, AuditEntryRemoveEventSchema,
  IssueSlaEventSchema,
  OAuthAppRevokedEventSchema,
  AppUserNotificationEventSchema,
  PermissionChangeEventSchema,
  AgentSessionEventSchema,
];

/**
 * Typed schema lookup by event type.
 */
export const schemas = {
  get(eventType: LinearWebhookEventType): z.ZodTypeAny {
    const schema = schemaRegistryMap.get(eventType);
    if (!schema) {
      throw new Error(`No schema registered for event type: ${eventType}`);
    }
    return schema;
  },
};

// ── Route Key types ──

interface RouteKeyInfo {
  eventType: LinearWebhookEventType;
  action?: 'create' | 'update' | 'remove';
}

/**
 * Maps camelCase route keys to their event type and optional action.
 * E.g., `issue` → { eventType: 'Issue' }, `issueCreate` → { eventType: 'Issue', action: 'create' }
 */
export const routeKeyInfoMap: ReadonlyMap<string, RouteKeyInfo> = new Map([
  // Base keys (match any action)
  ['issue', { eventType: 'Issue' }],
  ['comment', { eventType: 'Comment' }],
  ['attachment', { eventType: 'Attachment' }],
  ['issueLabel', { eventType: 'IssueLabel' }],
  ['reaction', { eventType: 'Reaction' }],
  ['project', { eventType: 'Project' }],
  ['projectUpdate', { eventType: 'ProjectUpdate' }],
  ['cycle', { eventType: 'Cycle' }],
  ['document', { eventType: 'Document' }],
  ['user', { eventType: 'User' }],
  ['initiative', { eventType: 'Initiative' }],
  ['initiativeUpdate', { eventType: 'InitiativeUpdate' }],
  ['customer', { eventType: 'Customer' }],
  ['customerNeed', { eventType: 'CustomerNeed' }],
  ['auditEntry', { eventType: 'AuditEntry' }],
  ['issueSla', { eventType: 'IssueSLA' }],
  ['oauthApp', { eventType: 'OAuthApp' }],
  ['appUserNotification', { eventType: 'AppUserNotification' }],
  ['permissionChange', { eventType: 'PermissionChange' }],
  ['agentSessionEvent', { eventType: 'AgentSessionEvent' }],

  // Action-specific keys
  ['issueCreate', { eventType: 'Issue', action: 'create' }],
  ['issueUpdate', { eventType: 'Issue', action: 'update' }],
  ['issueRemove', { eventType: 'Issue', action: 'remove' }],
  ['commentCreate', { eventType: 'Comment', action: 'create' }],
  ['commentUpdate', { eventType: 'Comment', action: 'update' }],
  ['commentRemove', { eventType: 'Comment', action: 'remove' }],
  ['attachmentCreate', { eventType: 'Attachment', action: 'create' }],
  ['attachmentUpdate', { eventType: 'Attachment', action: 'update' }],
  ['attachmentRemove', { eventType: 'Attachment', action: 'remove' }],
  ['issueLabelCreate', { eventType: 'IssueLabel', action: 'create' }],
  ['issueLabelUpdate', { eventType: 'IssueLabel', action: 'update' }],
  ['issueLabelRemove', { eventType: 'IssueLabel', action: 'remove' }],
  ['reactionCreate', { eventType: 'Reaction', action: 'create' }],
  ['reactionUpdate', { eventType: 'Reaction', action: 'update' }],
  ['reactionRemove', { eventType: 'Reaction', action: 'remove' }],
  ['projectCreate', { eventType: 'Project', action: 'create' }],
  ['projectUpdate_Update', { eventType: 'Project', action: 'update' }],
  ['projectRemove', { eventType: 'Project', action: 'remove' }],
  ['projectUpdateCreate', { eventType: 'ProjectUpdate', action: 'create' }],
  ['projectUpdateUpdate', { eventType: 'ProjectUpdate', action: 'update' }],
  ['projectUpdateRemove', { eventType: 'ProjectUpdate', action: 'remove' }],
  ['cycleCreate', { eventType: 'Cycle', action: 'create' }],
  ['cycleUpdate', { eventType: 'Cycle', action: 'update' }],
  ['cycleRemove', { eventType: 'Cycle', action: 'remove' }],
  ['documentCreate', { eventType: 'Document', action: 'create' }],
  ['documentUpdate', { eventType: 'Document', action: 'update' }],
  ['documentRemove', { eventType: 'Document', action: 'remove' }],
  ['userCreate', { eventType: 'User', action: 'create' }],
  ['userUpdate', { eventType: 'User', action: 'update' }],
  ['userRemove', { eventType: 'User', action: 'remove' }],
  ['initiativeCreate', { eventType: 'Initiative', action: 'create' }],
  ['initiativeUpdate_Update', { eventType: 'Initiative', action: 'update' }],
  ['initiativeRemove', { eventType: 'Initiative', action: 'remove' }],
  ['initiativeUpdateCreate', { eventType: 'InitiativeUpdate', action: 'create' }],
  ['initiativeUpdateUpdate', { eventType: 'InitiativeUpdate', action: 'update' }],
  ['initiativeUpdateRemove', { eventType: 'InitiativeUpdate', action: 'remove' }],
  ['customerCreate', { eventType: 'Customer', action: 'create' }],
  ['customerUpdate', { eventType: 'Customer', action: 'update' }],
  ['customerRemove', { eventType: 'Customer', action: 'remove' }],
  ['customerNeedCreate', { eventType: 'CustomerNeed', action: 'create' }],
  ['customerNeedUpdate', { eventType: 'CustomerNeed', action: 'update' }],
  ['customerNeedRemove', { eventType: 'CustomerNeed', action: 'remove' }],
  ['auditEntryCreate', { eventType: 'AuditEntry', action: 'create' }],
  ['auditEntryUpdate', { eventType: 'AuditEntry', action: 'update' }],
  ['auditEntryRemove', { eventType: 'AuditEntry', action: 'remove' }],
]);

export type WebhookRouteKey = keyof WebhookRouteKeyEventMap;

export interface WebhookRouteKeyEventMap {
  issue: z.infer<typeof IssueCreateEventSchema> | z.infer<typeof IssueUpdateEventSchema> | z.infer<typeof IssueRemoveEventSchema>;
  issueCreate: z.infer<typeof IssueCreateEventSchema>;
  issueUpdate: z.infer<typeof IssueUpdateEventSchema>;
  issueRemove: z.infer<typeof IssueRemoveEventSchema>;
  comment: z.infer<typeof CommentCreateEventSchema> | z.infer<typeof CommentUpdateEventSchema> | z.infer<typeof CommentRemoveEventSchema>;
  commentCreate: z.infer<typeof CommentCreateEventSchema>;
  commentUpdate: z.infer<typeof CommentUpdateEventSchema>;
  commentRemove: z.infer<typeof CommentRemoveEventSchema>;
  attachment: z.infer<typeof AttachmentCreateEventSchema> | z.infer<typeof AttachmentUpdateEventSchema> | z.infer<typeof AttachmentRemoveEventSchema>;
  attachmentCreate: z.infer<typeof AttachmentCreateEventSchema>;
  attachmentUpdate: z.infer<typeof AttachmentUpdateEventSchema>;
  attachmentRemove: z.infer<typeof AttachmentRemoveEventSchema>;
  issueLabel: z.infer<typeof IssueLabelCreateEventSchema> | z.infer<typeof IssueLabelUpdateEventSchema> | z.infer<typeof IssueLabelRemoveEventSchema>;
  issueLabelCreate: z.infer<typeof IssueLabelCreateEventSchema>;
  issueLabelUpdate: z.infer<typeof IssueLabelUpdateEventSchema>;
  issueLabelRemove: z.infer<typeof IssueLabelRemoveEventSchema>;
  reaction: z.infer<typeof ReactionCreateEventSchema> | z.infer<typeof ReactionUpdateEventSchema> | z.infer<typeof ReactionRemoveEventSchema>;
  reactionCreate: z.infer<typeof ReactionCreateEventSchema>;
  reactionUpdate: z.infer<typeof ReactionUpdateEventSchema>;
  reactionRemove: z.infer<typeof ReactionRemoveEventSchema>;
  project: z.infer<typeof ProjectCreateEventSchema> | z.infer<typeof ProjectUpdateEventSchema> | z.infer<typeof ProjectRemoveEventSchema>;
  projectCreate: z.infer<typeof ProjectCreateEventSchema>;
  projectRemove: z.infer<typeof ProjectRemoveEventSchema>;
  projectUpdate: z.infer<typeof ProjectUpdateCreateEventSchema> | z.infer<typeof ProjectUpdateUpdateEventSchema> | z.infer<typeof ProjectUpdateRemoveEventSchema>;
  projectUpdateCreate: z.infer<typeof ProjectUpdateCreateEventSchema>;
  projectUpdateUpdate: z.infer<typeof ProjectUpdateUpdateEventSchema>;
  projectUpdateRemove: z.infer<typeof ProjectUpdateRemoveEventSchema>;
  cycle: z.infer<typeof CycleCreateEventSchema> | z.infer<typeof CycleUpdateEventSchema> | z.infer<typeof CycleRemoveEventSchema>;
  cycleCreate: z.infer<typeof CycleCreateEventSchema>;
  cycleUpdate: z.infer<typeof CycleUpdateEventSchema>;
  cycleRemove: z.infer<typeof CycleRemoveEventSchema>;
  document: z.infer<typeof DocumentCreateEventSchema> | z.infer<typeof DocumentUpdateEventSchema> | z.infer<typeof DocumentRemoveEventSchema>;
  documentCreate: z.infer<typeof DocumentCreateEventSchema>;
  documentUpdate: z.infer<typeof DocumentUpdateEventSchema>;
  documentRemove: z.infer<typeof DocumentRemoveEventSchema>;
  user: z.infer<typeof UserCreateEventSchema> | z.infer<typeof UserUpdateEventSchema> | z.infer<typeof UserRemoveEventSchema>;
  userCreate: z.infer<typeof UserCreateEventSchema>;
  userUpdate: z.infer<typeof UserUpdateEventSchema>;
  userRemove: z.infer<typeof UserRemoveEventSchema>;
  initiative: z.infer<typeof InitiativeCreateEventSchema> | z.infer<typeof InitiativeUpdateEventSchema> | z.infer<typeof InitiativeRemoveEventSchema>;
  initiativeCreate: z.infer<typeof InitiativeCreateEventSchema>;
  initiativeRemove: z.infer<typeof InitiativeRemoveEventSchema>;
  initiativeUpdate: z.infer<typeof InitiativeUpdateCreateEventSchema> | z.infer<typeof InitiativeUpdateUpdateEventSchema> | z.infer<typeof InitiativeUpdateRemoveEventSchema>;
  initiativeUpdateCreate: z.infer<typeof InitiativeUpdateCreateEventSchema>;
  initiativeUpdateUpdate: z.infer<typeof InitiativeUpdateUpdateEventSchema>;
  initiativeUpdateRemove: z.infer<typeof InitiativeUpdateRemoveEventSchema>;
  customer: z.infer<typeof CustomerCreateEventSchema> | z.infer<typeof CustomerUpdateEventSchema> | z.infer<typeof CustomerRemoveEventSchema>;
  customerCreate: z.infer<typeof CustomerCreateEventSchema>;
  customerUpdate: z.infer<typeof CustomerUpdateEventSchema>;
  customerRemove: z.infer<typeof CustomerRemoveEventSchema>;
  customerNeed: z.infer<typeof CustomerNeedCreateEventSchema> | z.infer<typeof CustomerNeedUpdateEventSchema> | z.infer<typeof CustomerNeedRemoveEventSchema>;
  customerNeedCreate: z.infer<typeof CustomerNeedCreateEventSchema>;
  customerNeedUpdate: z.infer<typeof CustomerNeedUpdateEventSchema>;
  customerNeedRemove: z.infer<typeof CustomerNeedRemoveEventSchema>;
  auditEntry: z.infer<typeof AuditEntryCreateEventSchema> | z.infer<typeof AuditEntryUpdateEventSchema> | z.infer<typeof AuditEntryRemoveEventSchema>;
  auditEntryCreate: z.infer<typeof AuditEntryCreateEventSchema>;
  auditEntryUpdate: z.infer<typeof AuditEntryUpdateEventSchema>;
  auditEntryRemove: z.infer<typeof AuditEntryRemoveEventSchema>;
  issueSla: z.infer<typeof IssueSlaEventSchema>;
  oauthApp: z.infer<typeof OAuthAppRevokedEventSchema>;
  appUserNotification: z.infer<typeof AppUserNotificationEventSchema>;
  permissionChange: z.infer<typeof PermissionChangeEventSchema>;
  agentSessionEvent: z.infer<typeof AgentSessionEventSchema>;
}

export type WebhookRouteEvent<K extends WebhookRouteKey> = WebhookRouteKeyEventMap[K];

export type WebhookHandler<K extends WebhookRouteKey> = (
  event: WebhookRouteEvent<K>,
) => void | Promise<void>;

export type WebhookErrorHandler = (error: unknown) => void;

export type WebhookRouteHandlers = Partial<{
  [K in WebhookRouteKey]: WebhookHandler<K>;
}>;

// ── Type guard ──

export function isLinearWebhookEvent(value: unknown): boolean {
  if (typeof value !== 'object' || value === null) return false;
  const obj = value as Record<string, unknown>;
  const eventType = obj['type'];
  if (!isLinearWebhookEventType(eventType)) return false;
  const schema = schemaRegistryMap.get(eventType);
  if (!schema) return false;
  return schema.safeParse(value).success;
}

// ── Precomputed dispatch index ──
// Maps eventType → { base route keys, action-specific route keys }
// Enables O(1) lookup instead of iterating routeKeyInfoMap on every receive.

const eventTypeRouteKeys = new Map<
  string,
  { base: string[]; byAction: Map<string, string[]> }
>();

for (const [key, info] of routeKeyInfoMap) {
  let entry = eventTypeRouteKeys.get(info.eventType);
  if (!entry) {
    entry = { base: [], byAction: new Map() };
    eventTypeRouteKeys.set(info.eventType, entry);
  }
  if (info.action) {
    let list = entry.byAction.get(info.action);
    if (!list) {
      list = [];
      entry.byAction.set(info.action, list);
    }
    list.push(key);
  } else {
    entry.base.push(key);
  }
}

// ── Webhook Router ──

export interface WebhookRouter {
  (payload: unknown): void;
  on<K extends WebhookRouteKey>(event: K, handler: WebhookHandler<K>): WebhookRouter;
  on(event: 'error', handler: WebhookErrorHandler): WebhookRouter;
  off<K extends WebhookRouteKey>(event: K, handler: WebhookHandler<K>): WebhookRouter;
  off(event: 'error', handler: WebhookErrorHandler): WebhookRouter;
  removeAllListeners(event?: string): WebhookRouter;
}

export function createLinearWebhookRouter(handlers?: WebhookRouteHandlers): WebhookRouter {
  type Handler = (arg: unknown) => void | Promise<void>;
  const listeners = new Map<string, Set<Handler>>();

  function getListeners(event: string): Set<Handler> {
    let set = listeners.get(event);
    if (!set) {
      set = new Set();
      listeners.set(event, set);
    }
    return set;
  }

  function handleError(error: unknown): void {
    const errorListeners = listeners.get('error');
    if (errorListeners && errorListeners.size > 0) {
      for (const handler of errorListeners) {
        void handler(error);
      }
    } else {
      throw error;
    }
  }

  function callHandler(handler: Handler, data: unknown): void {
    try {
      const result = handler(data);
      if (result instanceof Promise) {
        result.catch(handleError);
      }
    } catch (err) {
      handleError(err);
    }
  }

  // Register initial handlers from config object
  if (handlers) {
    for (const [key, handler] of Object.entries(handlers)) {
      if (typeof handler === 'function') {
        getListeners(key).add(handler as Handler);
      }
    }
  }

  const receive = function receive(payload: unknown): void {
    if (typeof payload !== 'object' || payload === null) return;
    const obj = payload as Record<string, unknown>;
    const eventType = obj['type'] as string | undefined;
    const action = obj['action'] as string | undefined;

    if (!eventType || !isLinearWebhookEventType(eventType)) return;

    // O(1) schema lookup via type field
    const schema = schemaRegistryMap.get(eventType);
    if (!schema) return;
    const parsed = schema.safeParse(payload);
    if (!parsed.success) return;

    const routeKeys = eventTypeRouteKeys.get(eventType);
    if (!routeKeys) return;

    // Fire action-specific handlers first (more specific)
    if (action) {
      const actionKeys = routeKeys.byAction.get(action);
      if (actionKeys) {
        for (const key of actionKeys) {
          const set = listeners.get(key);
          if (!set) continue;
          for (const handler of set) {
            callHandler(handler, parsed.data);
          }
        }
      }
    }

    // Fire base handlers
    for (const key of routeKeys.base) {
      const set = listeners.get(key);
      if (!set) continue;
      for (const handler of set) {
        callHandler(handler, parsed.data);
      }
    }
  };

  const router = receive as WebhookRouter;

  router.on = (event: string, handler: Handler) => {
    getListeners(event).add(handler);
    return router;
  };

  router.off = (event: string, handler: Handler) => {
    listeners.get(event)?.delete(handler);
    return router;
  };

  router.removeAllListeners = (event?: string) => {
    if (event) {
      listeners.delete(event);
    } else {
      listeners.clear();
    }
    return router;
  };

  return router;
}

// ── Signature verification ──

const LINEAR_WEBHOOK_SIGNATURE_HEADER = 'linear-signature';
const ENCODER = new TextEncoder();

export { LINEAR_WEBHOOK_SIGNATURE_HEADER };

export async function verifyWebhookSignature(
  body: string,
  signature: string,
  secret: string,
): Promise<boolean> {
  const key = await crypto.subtle.importKey(
    'raw',
    ENCODER.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  );

  const sig = await crypto.subtle.sign('HMAC', key, ENCODER.encode(body));
  const digest = Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');

  return timingSafeEqual(digest, signature);
}

function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return result === 0;
}
