import { z } from 'zod';

import type * as SchemaTypes from '../schemas/index.js';
import * as Schemas from '../schemas/index.js';

type DeepPartial<T> = T extends readonly (infer U)[]
  ? DeepPartial<U>[]
  : T extends object
    ? { [K in keyof T]?: DeepPartial<T[K]> }
    : T;

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function buildFixture(
  schema: z.ZodTypeAny,
  options: { includeOptional?: boolean } = {},
): unknown {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const def = (schema as any)._def;
  const typeName: string = def?.typeName ?? '';

  switch (typeName) {
    case 'ZodDefault': {
      if (def.defaultValue !== undefined) {
        return typeof def.defaultValue === 'function' ? def.defaultValue() : def.defaultValue;
      }
      return def.innerType ? buildFixture(def.innerType, options) : null;
    }
    case 'ZodOptional': {
      if (options.includeOptional && def.innerType) {
        return buildFixture(def.innerType, options);
      }
      return undefined;
    }
    case 'ZodNullable':
      return null;
    case 'ZodString':
      return '';
    case 'ZodNumber':
      return 0;
    case 'ZodBoolean':
      return false;
    case 'ZodLiteral':
      return def.value;
    case 'ZodEnum': {
      const values: string[] = def.values;
      return values[0] ?? null;
    }
    case 'ZodArray':
      return [];
    case 'ZodTuple': {
      const items: z.ZodTypeAny[] = def.items;
      return items.map((item) => buildFixture(item, options));
    }
    case 'ZodUnion':
    case 'ZodDiscriminatedUnion': {
      const unionOptions: z.ZodTypeAny[] = def.options;
      const firstOption = unionOptions[0];
      return firstOption ? buildFixture(firstOption, options) : null;
    }
    case 'ZodIntersection': {
      const leftValue = buildFixture(def.left, options);
      const rightValue = buildFixture(def.right, { ...options, includeOptional: true });

      if (isPlainObject(leftValue) && isPlainObject(rightValue)) {
        return mergeFixture(leftValue, rightValue);
      }

      return rightValue ?? leftValue ?? null;
    }
    case 'ZodObject': {
      const shape: Record<string, z.ZodTypeAny> =
        typeof def.shape === 'function' ? def.shape() : def.shape;
      const value: Record<string, unknown> = {};

      for (const [key, fieldSchema] of Object.entries(shape)) {
        const fieldValue = buildFixture(fieldSchema, options);
        if (fieldValue !== undefined) {
          value[key] = fieldValue;
        }
      }

      return value;
    }
    case 'ZodRecord':
      return {};
    case 'ZodLazy': {
      const getter = def.getter as (() => z.ZodTypeAny) | undefined;
      return getter ? buildFixture(getter(), options) : null;
    }
    case 'ZodEffects':
      return def.schema ? buildFixture(def.schema, options) : null;
    default:
      return null;
  }
}

function mergeFixture<T>(base: T, overrides?: DeepPartial<T>): T {
  if (overrides === undefined) {
    return base;
  }

  if (Array.isArray(base) || Array.isArray(overrides)) {
    return (overrides ?? base) as T;
  }

  if (isPlainObject(base) && isPlainObject(overrides)) {
    const result: Record<string, unknown> = { ...base };

    for (const [key, overrideValue] of Object.entries(overrides)) {
      if (overrideValue === undefined) {
        continue;
      }

      const baseValue = result[key];
      result[key] =
        isPlainObject(baseValue) && isPlainObject(overrideValue)
          ? mergeFixture(baseValue, overrideValue)
          : overrideValue;
    }

    return result as T;
  }

  return overrides as T;
}

function createFixture<T>(schema: z.ZodTypeAny, overrides?: DeepPartial<T>): T {
  const base = buildFixture(schema) as T;
  return mergeFixture(base, overrides);
}

// ── Issue events ──
export function createIssueCreateEvent(overrides: DeepPartial<SchemaTypes.IssueCreateEvent> = {}): SchemaTypes.IssueCreateEvent {
  return createFixture<SchemaTypes.IssueCreateEvent>(Schemas.IssueCreateEventSchema, overrides);
}
export function createIssueUpdateEvent(overrides: DeepPartial<SchemaTypes.IssueUpdateEvent> = {}): SchemaTypes.IssueUpdateEvent {
  return createFixture<SchemaTypes.IssueUpdateEvent>(Schemas.IssueUpdateEventSchema, overrides);
}
export function createIssueRemoveEvent(overrides: DeepPartial<SchemaTypes.IssueRemoveEvent> = {}): SchemaTypes.IssueRemoveEvent {
  return createFixture<SchemaTypes.IssueRemoveEvent>(Schemas.IssueRemoveEventSchema, overrides);
}

// ── Comment events ──
export function createCommentCreateEvent(overrides: DeepPartial<SchemaTypes.CommentCreateEvent> = {}): SchemaTypes.CommentCreateEvent {
  return createFixture<SchemaTypes.CommentCreateEvent>(Schemas.CommentCreateEventSchema, overrides);
}
export function createCommentUpdateEvent(overrides: DeepPartial<SchemaTypes.CommentUpdateEvent> = {}): SchemaTypes.CommentUpdateEvent {
  return createFixture<SchemaTypes.CommentUpdateEvent>(Schemas.CommentUpdateEventSchema, overrides);
}
export function createCommentRemoveEvent(overrides: DeepPartial<SchemaTypes.CommentRemoveEvent> = {}): SchemaTypes.CommentRemoveEvent {
  return createFixture<SchemaTypes.CommentRemoveEvent>(Schemas.CommentRemoveEventSchema, overrides);
}

// ── Attachment events ──
export function createAttachmentCreateEvent(overrides: DeepPartial<SchemaTypes.AttachmentCreateEvent> = {}): SchemaTypes.AttachmentCreateEvent {
  return createFixture<SchemaTypes.AttachmentCreateEvent>(Schemas.AttachmentCreateEventSchema, overrides);
}
export function createAttachmentUpdateEvent(overrides: DeepPartial<SchemaTypes.AttachmentUpdateEvent> = {}): SchemaTypes.AttachmentUpdateEvent {
  return createFixture<SchemaTypes.AttachmentUpdateEvent>(Schemas.AttachmentUpdateEventSchema, overrides);
}
export function createAttachmentRemoveEvent(overrides: DeepPartial<SchemaTypes.AttachmentRemoveEvent> = {}): SchemaTypes.AttachmentRemoveEvent {
  return createFixture<SchemaTypes.AttachmentRemoveEvent>(Schemas.AttachmentRemoveEventSchema, overrides);
}

// ── IssueLabel events ──
export function createIssueLabelCreateEvent(overrides: DeepPartial<SchemaTypes.IssueLabelCreateEvent> = {}): SchemaTypes.IssueLabelCreateEvent {
  return createFixture<SchemaTypes.IssueLabelCreateEvent>(Schemas.IssueLabelCreateEventSchema, overrides);
}
export function createIssueLabelUpdateEvent(overrides: DeepPartial<SchemaTypes.IssueLabelUpdateEvent> = {}): SchemaTypes.IssueLabelUpdateEvent {
  return createFixture<SchemaTypes.IssueLabelUpdateEvent>(Schemas.IssueLabelUpdateEventSchema, overrides);
}
export function createIssueLabelRemoveEvent(overrides: DeepPartial<SchemaTypes.IssueLabelRemoveEvent> = {}): SchemaTypes.IssueLabelRemoveEvent {
  return createFixture<SchemaTypes.IssueLabelRemoveEvent>(Schemas.IssueLabelRemoveEventSchema, overrides);
}

// ── Reaction events ──
export function createReactionCreateEvent(overrides: DeepPartial<SchemaTypes.ReactionCreateEvent> = {}): SchemaTypes.ReactionCreateEvent {
  return createFixture<SchemaTypes.ReactionCreateEvent>(Schemas.ReactionCreateEventSchema, overrides);
}
export function createReactionUpdateEvent(overrides: DeepPartial<SchemaTypes.ReactionUpdateEvent> = {}): SchemaTypes.ReactionUpdateEvent {
  return createFixture<SchemaTypes.ReactionUpdateEvent>(Schemas.ReactionUpdateEventSchema, overrides);
}
export function createReactionRemoveEvent(overrides: DeepPartial<SchemaTypes.ReactionRemoveEvent> = {}): SchemaTypes.ReactionRemoveEvent {
  return createFixture<SchemaTypes.ReactionRemoveEvent>(Schemas.ReactionRemoveEventSchema, overrides);
}

// ── Project events ──
export function createProjectCreateEvent(overrides: DeepPartial<SchemaTypes.ProjectCreateEvent> = {}): SchemaTypes.ProjectCreateEvent {
  return createFixture<SchemaTypes.ProjectCreateEvent>(Schemas.ProjectCreateEventSchema, overrides);
}
export function createProjectUpdateEvent(overrides: DeepPartial<SchemaTypes.ProjectUpdateEvent> = {}): SchemaTypes.ProjectUpdateEvent {
  return createFixture<SchemaTypes.ProjectUpdateEvent>(Schemas.ProjectUpdateEventSchema, overrides);
}
export function createProjectRemoveEvent(overrides: DeepPartial<SchemaTypes.ProjectRemoveEvent> = {}): SchemaTypes.ProjectRemoveEvent {
  return createFixture<SchemaTypes.ProjectRemoveEvent>(Schemas.ProjectRemoveEventSchema, overrides);
}

// ── ProjectUpdate events ──
export function createProjectUpdateCreateEvent(overrides: DeepPartial<SchemaTypes.ProjectUpdateCreateEvent> = {}): SchemaTypes.ProjectUpdateCreateEvent {
  return createFixture<SchemaTypes.ProjectUpdateCreateEvent>(Schemas.ProjectUpdateCreateEventSchema, overrides);
}
export function createProjectUpdateUpdateEvent(overrides: DeepPartial<SchemaTypes.ProjectUpdateUpdateEvent> = {}): SchemaTypes.ProjectUpdateUpdateEvent {
  return createFixture<SchemaTypes.ProjectUpdateUpdateEvent>(Schemas.ProjectUpdateUpdateEventSchema, overrides);
}
export function createProjectUpdateRemoveEvent(overrides: DeepPartial<SchemaTypes.ProjectUpdateRemoveEvent> = {}): SchemaTypes.ProjectUpdateRemoveEvent {
  return createFixture<SchemaTypes.ProjectUpdateRemoveEvent>(Schemas.ProjectUpdateRemoveEventSchema, overrides);
}

// ── Cycle events ──
export function createCycleCreateEvent(overrides: DeepPartial<SchemaTypes.CycleCreateEvent> = {}): SchemaTypes.CycleCreateEvent {
  return createFixture<SchemaTypes.CycleCreateEvent>(Schemas.CycleCreateEventSchema, overrides);
}
export function createCycleUpdateEvent(overrides: DeepPartial<SchemaTypes.CycleUpdateEvent> = {}): SchemaTypes.CycleUpdateEvent {
  return createFixture<SchemaTypes.CycleUpdateEvent>(Schemas.CycleUpdateEventSchema, overrides);
}
export function createCycleRemoveEvent(overrides: DeepPartial<SchemaTypes.CycleRemoveEvent> = {}): SchemaTypes.CycleRemoveEvent {
  return createFixture<SchemaTypes.CycleRemoveEvent>(Schemas.CycleRemoveEventSchema, overrides);
}

// ── Document events ──
export function createDocumentCreateEvent(overrides: DeepPartial<SchemaTypes.DocumentCreateEvent> = {}): SchemaTypes.DocumentCreateEvent {
  return createFixture<SchemaTypes.DocumentCreateEvent>(Schemas.DocumentCreateEventSchema, overrides);
}
export function createDocumentUpdateEvent(overrides: DeepPartial<SchemaTypes.DocumentUpdateEvent> = {}): SchemaTypes.DocumentUpdateEvent {
  return createFixture<SchemaTypes.DocumentUpdateEvent>(Schemas.DocumentUpdateEventSchema, overrides);
}
export function createDocumentRemoveEvent(overrides: DeepPartial<SchemaTypes.DocumentRemoveEvent> = {}): SchemaTypes.DocumentRemoveEvent {
  return createFixture<SchemaTypes.DocumentRemoveEvent>(Schemas.DocumentRemoveEventSchema, overrides);
}

// ── User events ──
export function createUserCreateEvent(overrides: DeepPartial<SchemaTypes.UserCreateEvent> = {}): SchemaTypes.UserCreateEvent {
  return createFixture<SchemaTypes.UserCreateEvent>(Schemas.UserCreateEventSchema, overrides);
}
export function createUserUpdateEvent(overrides: DeepPartial<SchemaTypes.UserUpdateEvent> = {}): SchemaTypes.UserUpdateEvent {
  return createFixture<SchemaTypes.UserUpdateEvent>(Schemas.UserUpdateEventSchema, overrides);
}
export function createUserRemoveEvent(overrides: DeepPartial<SchemaTypes.UserRemoveEvent> = {}): SchemaTypes.UserRemoveEvent {
  return createFixture<SchemaTypes.UserRemoveEvent>(Schemas.UserRemoveEventSchema, overrides);
}

// ── Initiative events ──
export function createInitiativeCreateEvent(overrides: DeepPartial<SchemaTypes.InitiativeCreateEvent> = {}): SchemaTypes.InitiativeCreateEvent {
  return createFixture<SchemaTypes.InitiativeCreateEvent>(Schemas.InitiativeCreateEventSchema, overrides);
}
export function createInitiativeUpdateEvent(overrides: DeepPartial<SchemaTypes.InitiativeUpdateEvent> = {}): SchemaTypes.InitiativeUpdateEvent {
  return createFixture<SchemaTypes.InitiativeUpdateEvent>(Schemas.InitiativeUpdateEventSchema, overrides);
}
export function createInitiativeRemoveEvent(overrides: DeepPartial<SchemaTypes.InitiativeRemoveEvent> = {}): SchemaTypes.InitiativeRemoveEvent {
  return createFixture<SchemaTypes.InitiativeRemoveEvent>(Schemas.InitiativeRemoveEventSchema, overrides);
}

// ── InitiativeUpdate events ──
export function createInitiativeUpdateCreateEvent(overrides: DeepPartial<SchemaTypes.InitiativeUpdateCreateEvent> = {}): SchemaTypes.InitiativeUpdateCreateEvent {
  return createFixture<SchemaTypes.InitiativeUpdateCreateEvent>(Schemas.InitiativeUpdateCreateEventSchema, overrides);
}
export function createInitiativeUpdateUpdateEvent(overrides: DeepPartial<SchemaTypes.InitiativeUpdateUpdateEvent> = {}): SchemaTypes.InitiativeUpdateUpdateEvent {
  return createFixture<SchemaTypes.InitiativeUpdateUpdateEvent>(Schemas.InitiativeUpdateUpdateEventSchema, overrides);
}
export function createInitiativeUpdateRemoveEvent(overrides: DeepPartial<SchemaTypes.InitiativeUpdateRemoveEvent> = {}): SchemaTypes.InitiativeUpdateRemoveEvent {
  return createFixture<SchemaTypes.InitiativeUpdateRemoveEvent>(Schemas.InitiativeUpdateRemoveEventSchema, overrides);
}

// ── Customer events ──
export function createCustomerCreateEvent(overrides: DeepPartial<SchemaTypes.CustomerCreateEvent> = {}): SchemaTypes.CustomerCreateEvent {
  return createFixture<SchemaTypes.CustomerCreateEvent>(Schemas.CustomerCreateEventSchema, overrides);
}
export function createCustomerUpdateEvent(overrides: DeepPartial<SchemaTypes.CustomerUpdateEvent> = {}): SchemaTypes.CustomerUpdateEvent {
  return createFixture<SchemaTypes.CustomerUpdateEvent>(Schemas.CustomerUpdateEventSchema, overrides);
}
export function createCustomerRemoveEvent(overrides: DeepPartial<SchemaTypes.CustomerRemoveEvent> = {}): SchemaTypes.CustomerRemoveEvent {
  return createFixture<SchemaTypes.CustomerRemoveEvent>(Schemas.CustomerRemoveEventSchema, overrides);
}

// ── CustomerNeed events ──
export function createCustomerNeedCreateEvent(overrides: DeepPartial<SchemaTypes.CustomerNeedCreateEvent> = {}): SchemaTypes.CustomerNeedCreateEvent {
  return createFixture<SchemaTypes.CustomerNeedCreateEvent>(Schemas.CustomerNeedCreateEventSchema, overrides);
}
export function createCustomerNeedUpdateEvent(overrides: DeepPartial<SchemaTypes.CustomerNeedUpdateEvent> = {}): SchemaTypes.CustomerNeedUpdateEvent {
  return createFixture<SchemaTypes.CustomerNeedUpdateEvent>(Schemas.CustomerNeedUpdateEventSchema, overrides);
}
export function createCustomerNeedRemoveEvent(overrides: DeepPartial<SchemaTypes.CustomerNeedRemoveEvent> = {}): SchemaTypes.CustomerNeedRemoveEvent {
  return createFixture<SchemaTypes.CustomerNeedRemoveEvent>(Schemas.CustomerNeedRemoveEventSchema, overrides);
}

// ── AuditEntry events ──
export function createAuditEntryCreateEvent(overrides: DeepPartial<SchemaTypes.AuditEntryCreateEvent> = {}): SchemaTypes.AuditEntryCreateEvent {
  return createFixture<SchemaTypes.AuditEntryCreateEvent>(Schemas.AuditEntryCreateEventSchema, overrides);
}
export function createAuditEntryUpdateEvent(overrides: DeepPartial<SchemaTypes.AuditEntryUpdateEvent> = {}): SchemaTypes.AuditEntryUpdateEvent {
  return createFixture<SchemaTypes.AuditEntryUpdateEvent>(Schemas.AuditEntryUpdateEventSchema, overrides);
}
export function createAuditEntryRemoveEvent(overrides: DeepPartial<SchemaTypes.AuditEntryRemoveEvent> = {}): SchemaTypes.AuditEntryRemoveEvent {
  return createFixture<SchemaTypes.AuditEntryRemoveEvent>(Schemas.AuditEntryRemoveEventSchema, overrides);
}

// ── Special-case events ──
export function createIssueSlaEvent(overrides: DeepPartial<SchemaTypes.IssueSlaEvent> = {}): SchemaTypes.IssueSlaEvent {
  return createFixture<SchemaTypes.IssueSlaEvent>(Schemas.IssueSlaEventSchema, overrides);
}
export function createOAuthAppRevokedEvent(overrides: DeepPartial<SchemaTypes.OAuthAppRevokedEvent> = {}): SchemaTypes.OAuthAppRevokedEvent {
  return createFixture<SchemaTypes.OAuthAppRevokedEvent>(Schemas.OAuthAppRevokedEventSchema, overrides);
}
export function createAppUserNotificationEvent(overrides: DeepPartial<SchemaTypes.AppUserNotificationEvent> = {}): SchemaTypes.AppUserNotificationEvent {
  return createFixture<SchemaTypes.AppUserNotificationEvent>(Schemas.AppUserNotificationEventSchema, overrides);
}
export function createPermissionChangeEvent(overrides: DeepPartial<SchemaTypes.PermissionChangeEvent> = {}): SchemaTypes.PermissionChangeEvent {
  return createFixture<SchemaTypes.PermissionChangeEvent>(Schemas.PermissionChangeEventSchema, overrides);
}
export function createAgentSessionEvent(overrides: DeepPartial<SchemaTypes.AgentSessionEvent> = {}): SchemaTypes.AgentSessionEvent {
  return createFixture<SchemaTypes.AgentSessionEvent>(Schemas.AgentSessionEventSchema, overrides);
}
