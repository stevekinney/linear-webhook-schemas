import { describe, expect, it } from 'bun:test';

import * as Schemas from '../schemas/index.js';

import * as Fixtures from './index.js';

const fixtureSchemaMap: Array<{ name: string; factory: () => unknown; schema: unknown }> = [
  // Issue
  { name: 'IssueCreateEvent', factory: Fixtures.createIssueCreateEvent, schema: Schemas.IssueCreateEventSchema },
  { name: 'IssueUpdateEvent', factory: Fixtures.createIssueUpdateEvent, schema: Schemas.IssueUpdateEventSchema },
  { name: 'IssueRemoveEvent', factory: Fixtures.createIssueRemoveEvent, schema: Schemas.IssueRemoveEventSchema },
  // Comment
  { name: 'CommentCreateEvent', factory: Fixtures.createCommentCreateEvent, schema: Schemas.CommentCreateEventSchema },
  { name: 'CommentUpdateEvent', factory: Fixtures.createCommentUpdateEvent, schema: Schemas.CommentUpdateEventSchema },
  { name: 'CommentRemoveEvent', factory: Fixtures.createCommentRemoveEvent, schema: Schemas.CommentRemoveEventSchema },
  // Attachment
  { name: 'AttachmentCreateEvent', factory: Fixtures.createAttachmentCreateEvent, schema: Schemas.AttachmentCreateEventSchema },
  { name: 'AttachmentUpdateEvent', factory: Fixtures.createAttachmentUpdateEvent, schema: Schemas.AttachmentUpdateEventSchema },
  { name: 'AttachmentRemoveEvent', factory: Fixtures.createAttachmentRemoveEvent, schema: Schemas.AttachmentRemoveEventSchema },
  // IssueLabel
  { name: 'IssueLabelCreateEvent', factory: Fixtures.createIssueLabelCreateEvent, schema: Schemas.IssueLabelCreateEventSchema },
  { name: 'IssueLabelUpdateEvent', factory: Fixtures.createIssueLabelUpdateEvent, schema: Schemas.IssueLabelUpdateEventSchema },
  { name: 'IssueLabelRemoveEvent', factory: Fixtures.createIssueLabelRemoveEvent, schema: Schemas.IssueLabelRemoveEventSchema },
  // Reaction
  { name: 'ReactionCreateEvent', factory: Fixtures.createReactionCreateEvent, schema: Schemas.ReactionCreateEventSchema },
  { name: 'ReactionUpdateEvent', factory: Fixtures.createReactionUpdateEvent, schema: Schemas.ReactionUpdateEventSchema },
  { name: 'ReactionRemoveEvent', factory: Fixtures.createReactionRemoveEvent, schema: Schemas.ReactionRemoveEventSchema },
  // Project
  { name: 'ProjectCreateEvent', factory: Fixtures.createProjectCreateEvent, schema: Schemas.ProjectCreateEventSchema },
  { name: 'ProjectUpdateEvent', factory: Fixtures.createProjectUpdateEvent, schema: Schemas.ProjectUpdateEventSchema },
  { name: 'ProjectRemoveEvent', factory: Fixtures.createProjectRemoveEvent, schema: Schemas.ProjectRemoveEventSchema },
  // ProjectUpdate
  { name: 'ProjectUpdateCreateEvent', factory: Fixtures.createProjectUpdateCreateEvent, schema: Schemas.ProjectUpdateCreateEventSchema },
  { name: 'ProjectUpdateUpdateEvent', factory: Fixtures.createProjectUpdateUpdateEvent, schema: Schemas.ProjectUpdateUpdateEventSchema },
  { name: 'ProjectUpdateRemoveEvent', factory: Fixtures.createProjectUpdateRemoveEvent, schema: Schemas.ProjectUpdateRemoveEventSchema },
  // Cycle
  { name: 'CycleCreateEvent', factory: Fixtures.createCycleCreateEvent, schema: Schemas.CycleCreateEventSchema },
  { name: 'CycleUpdateEvent', factory: Fixtures.createCycleUpdateEvent, schema: Schemas.CycleUpdateEventSchema },
  { name: 'CycleRemoveEvent', factory: Fixtures.createCycleRemoveEvent, schema: Schemas.CycleRemoveEventSchema },
  // Document
  { name: 'DocumentCreateEvent', factory: Fixtures.createDocumentCreateEvent, schema: Schemas.DocumentCreateEventSchema },
  { name: 'DocumentUpdateEvent', factory: Fixtures.createDocumentUpdateEvent, schema: Schemas.DocumentUpdateEventSchema },
  { name: 'DocumentRemoveEvent', factory: Fixtures.createDocumentRemoveEvent, schema: Schemas.DocumentRemoveEventSchema },
  // User
  { name: 'UserCreateEvent', factory: Fixtures.createUserCreateEvent, schema: Schemas.UserCreateEventSchema },
  { name: 'UserUpdateEvent', factory: Fixtures.createUserUpdateEvent, schema: Schemas.UserUpdateEventSchema },
  { name: 'UserRemoveEvent', factory: Fixtures.createUserRemoveEvent, schema: Schemas.UserRemoveEventSchema },
  // Initiative
  { name: 'InitiativeCreateEvent', factory: Fixtures.createInitiativeCreateEvent, schema: Schemas.InitiativeCreateEventSchema },
  { name: 'InitiativeUpdateEvent', factory: Fixtures.createInitiativeUpdateEvent, schema: Schemas.InitiativeUpdateEventSchema },
  { name: 'InitiativeRemoveEvent', factory: Fixtures.createInitiativeRemoveEvent, schema: Schemas.InitiativeRemoveEventSchema },
  // InitiativeUpdate
  { name: 'InitiativeUpdateCreateEvent', factory: Fixtures.createInitiativeUpdateCreateEvent, schema: Schemas.InitiativeUpdateCreateEventSchema },
  { name: 'InitiativeUpdateUpdateEvent', factory: Fixtures.createInitiativeUpdateUpdateEvent, schema: Schemas.InitiativeUpdateUpdateEventSchema },
  { name: 'InitiativeUpdateRemoveEvent', factory: Fixtures.createInitiativeUpdateRemoveEvent, schema: Schemas.InitiativeUpdateRemoveEventSchema },
  // Customer
  { name: 'CustomerCreateEvent', factory: Fixtures.createCustomerCreateEvent, schema: Schemas.CustomerCreateEventSchema },
  { name: 'CustomerUpdateEvent', factory: Fixtures.createCustomerUpdateEvent, schema: Schemas.CustomerUpdateEventSchema },
  { name: 'CustomerRemoveEvent', factory: Fixtures.createCustomerRemoveEvent, schema: Schemas.CustomerRemoveEventSchema },
  // CustomerNeed
  { name: 'CustomerNeedCreateEvent', factory: Fixtures.createCustomerNeedCreateEvent, schema: Schemas.CustomerNeedCreateEventSchema },
  { name: 'CustomerNeedUpdateEvent', factory: Fixtures.createCustomerNeedUpdateEvent, schema: Schemas.CustomerNeedUpdateEventSchema },
  { name: 'CustomerNeedRemoveEvent', factory: Fixtures.createCustomerNeedRemoveEvent, schema: Schemas.CustomerNeedRemoveEventSchema },
  // AuditEntry
  { name: 'AuditEntryCreateEvent', factory: Fixtures.createAuditEntryCreateEvent, schema: Schemas.AuditEntryCreateEventSchema },
  { name: 'AuditEntryUpdateEvent', factory: Fixtures.createAuditEntryUpdateEvent, schema: Schemas.AuditEntryUpdateEventSchema },
  { name: 'AuditEntryRemoveEvent', factory: Fixtures.createAuditEntryRemoveEvent, schema: Schemas.AuditEntryRemoveEventSchema },
  // Special events
  { name: 'IssueSlaEvent', factory: Fixtures.createIssueSlaEvent, schema: Schemas.IssueSlaEventSchema },
  { name: 'OAuthAppRevokedEvent', factory: Fixtures.createOAuthAppRevokedEvent, schema: Schemas.OAuthAppRevokedEventSchema },
  { name: 'AppUserNotificationEvent', factory: Fixtures.createAppUserNotificationEvent, schema: Schemas.AppUserNotificationEventSchema },
  { name: 'PermissionChangeEvent', factory: Fixtures.createPermissionChangeEvent, schema: Schemas.PermissionChangeEventSchema },
  { name: 'AgentSessionEvent', factory: Fixtures.createAgentSessionEvent, schema: Schemas.AgentSessionEventSchema },
];

describe('Fixture factories', () => {
  for (const { name, factory, schema } of fixtureSchemaMap) {
    it(`${name} fixture validates against its schema`, () => {
      const fixture = factory();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const result = (schema as any).safeParse(fixture);
      if (!result.success) {
        console.error(`${name} validation errors:`, JSON.stringify(result.error.issues, null, 2));
      }
      expect(result.success).toBe(true);
    });
  }
});
