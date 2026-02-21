# linear-webhook-schemas

Zod schemas for validating Linear webhook payloads with full TypeScript support.

## What this package provides

- Runtime validation for Linear webhook payloads using Zod
- One schema per event type and action (for example, `IssueCreateEventSchema`, `CommentUpdateEventSchema`)
- Shared schemas for common objects (for example, `Issue`, `Comment`, `Actor`)
- Type guards and exported TypeScript types for every schema
- A webhook router with typed handlers
- Signature verification using HMAC SHA-256
- Fixture factories for testing
- Tree-shakeable subpath exports

## Installation

```bash
# npm
npm install linear-webhook-schemas zod

# pnpm
pnpm add linear-webhook-schemas zod

# bun
bun add linear-webhook-schemas zod
```

Notes:

- `zod` is a peer dependency and must be installed separately.
- This package is ESM only.

## Quick start

```ts
import { IssueCreateEventSchema } from 'linear-webhook-schemas/issue-create-event';

const result = IssueCreateEventSchema.safeParse(payload);

if (result.success) {
  console.log('Valid issue create event:', result.data);
} else {
  console.error('Invalid payload:', result.error);
}
```

## Importing schemas

Import from subpaths for smaller bundles:

```ts
import { IssueCreateEventSchema } from 'linear-webhook-schemas/issue-create-event';
import { CommentUpdateEventSchema } from 'linear-webhook-schemas/comment-update-event';
```

Shared schemas live under `shared/`:

```ts
import { IssueWebhookPayloadSchema } from 'linear-webhook-schemas/shared/issue';
import { ActorSchema } from 'linear-webhook-schemas/shared/actor';
```

## Event types and actions

Linear webhooks include a `type` field and an `action` field directly on the payload body. The `type` identifies the resource (for example, `Issue`, `Comment`) and `action` is one of `create`, `update`, or `remove`.

```ts
import { IssueCreateEventSchema } from 'linear-webhook-schemas/issue-create-event';
import { IssueUpdateEventSchema } from 'linear-webhook-schemas/issue-update-event';
import { IssueRemoveEventSchema } from 'linear-webhook-schemas/issue-remove-event';

function parseIssueEvent(payload: unknown) {
  const action = (payload as { action?: string }).action;

  switch (action) {
    case 'create':
      return IssueCreateEventSchema.parse(payload);
    case 'update':
      return IssueUpdateEventSchema.parse(payload);
    case 'remove':
      return IssueRemoveEventSchema.parse(payload);
    default:
      throw new Error(`Unsupported action: ${action ?? 'unknown'}`);
  }
}
```

## Schema registry

Use the registry to look up the schema for a webhook event type and parse any of its actions.

```ts
import {
  schemas,
  isLinearWebhookEvent,
} from 'linear-webhook-schemas/registry';

function parseWebhook(payload: unknown) {
  if (!isLinearWebhookEvent(payload)) {
    throw new Error('Not a valid Linear webhook event');
  }

  const eventType = (payload as { type: string }).type;
  const schema = schemas.get(eventType as any);
  return schema.parse(payload);
}
```

`schemas.get` expects the event type string from the `type` field (for example, `Issue`, `Comment`, `Project`).

`isLinearWebhookEvent` validates that the payload matches any known Linear webhook schema.

## Webhook router

Use `createLinearWebhookRouter` to route payloads to typed handlers. The router is a callable function that dispatches to registered handlers.

### Config-object style

Pass all handlers upfront:

```ts
import { createLinearWebhookRouter } from 'linear-webhook-schemas/registry';

const router = createLinearWebhookRouter({
  issueCreate: (event) => {
    console.log(`Issue created: ${event.data.title}`);
  },
  commentCreate: (event) => {
    console.log(`Comment added: ${event.data.body}`);
  },
});

// Call the router directly with the parsed payload
router(payload);
```

### Event-emitter style

Register and unregister handlers dynamically:

```ts
import { createLinearWebhookRouter } from 'linear-webhook-schemas/registry';

const router = createLinearWebhookRouter();

router.on('issueCreate', (event) => {
  console.log(`Issue created: ${event.data.title}`);
});

router.on('issue', (event) => {
  // Fires for any issue action (create, update, remove)
  console.log(`Issue event: ${event.action}`);
});

router.on('error', (err) => {
  console.error('Handler error:', err);
});

router(payload);
```

### Router behavior

- Supports both base event keys (for example, `issue`) and action-specific keys (for example, `issueCreate`).
- A payload with an action emits both the action-specific event and the base event (action-specific first).
- Multiple handlers can be registered for the same event.
- `router(payload)` is synchronous. Async handlers run independently; rejected promises are forwarded to the `error` event.
- If a handler throws and no `error` listener is registered, the error is re-thrown.
- Use `off(event, handler)` to remove a specific handler, or `removeAllListeners()` to clear everything.

## Signature verification

Verify that a webhook request was sent by Linear using HMAC SHA-256:

```ts
import {
  verifyWebhookSignature,
  LINEAR_WEBHOOK_SIGNATURE_HEADER,
} from 'linear-webhook-schemas/registry';

const signature = request.headers.get(LINEAR_WEBHOOK_SIGNATURE_HEADER);
const body = await request.text();

const isValid = await verifyWebhookSignature(body, signature, process.env.LINEAR_WEBHOOK_SECRET);

if (!isValid) {
  return new Response('Invalid signature', { status: 401 });
}
```

## Type guards and TypeScript types

Every schema exports:

- `XxxEventSchema` (the Zod schema)
- `XxxEvent` (the TypeScript type)
- `isXxxEvent` (a type guard)

Example:

```ts
import { isIssueCreateEvent, type IssueCreateEvent } from 'linear-webhook-schemas/issue-create-event';

function handleWebhook(payload: unknown) {
  if (isIssueCreateEvent(payload)) {
    const event: IssueCreateEvent = payload;
    console.log(`Issue created: ${event.data.title}`);
  }
}
```

You can also infer types directly from a schema:

```ts
import { z } from 'zod';
import { IssueCreateEventSchema } from 'linear-webhook-schemas/issue-create-event';

type IssueCreateEvent = z.infer<typeof IssueCreateEventSchema>;
```

## Working with Zod

These are regular Zod schemas, so you can compose them as needed:

```ts
import { IssueCreateEventSchema } from 'linear-webhook-schemas/issue-create-event';

const MinimalIssueCreateSchema = IssueCreateEventSchema.pick({
  type: true,
  action: true,
  data: true,
});
```

## Fixtures

Fixture factories live under the `fixtures` subpath and return schema-valid payloads with minimal defaults. They are useful for tests and quick experiments.

```ts
import { createIssueCreateEvent } from 'linear-webhook-schemas/fixtures';

const payload = createIssueCreateEvent({
  data: { title: 'Fix login bug' },
});
```

More detailed example:

```ts
import { createIssueCreateEvent } from 'linear-webhook-schemas/fixtures';
import { IssueCreateEventSchema } from 'linear-webhook-schemas/issue-create-event';

const payload = createIssueCreateEvent({
  data: {
    title: 'Fix login bug',
    priority: 1,
  },
});

const result = IssueCreateEventSchema.safeParse(payload);
if (!result.success) {
  throw new Error(result.error.message);
}
```

Notes:

- Every event has a `createXxxEvent` factory (for example, `createIssueCreateEvent`).
- Factories accept deep partial overrides and merge them into the base fixture.
- Overrides are not validated; use a schema or guard if you want to assert validity.
- Optional fields are omitted unless you set them via overrides.
- Arrays are replaced when overridden (provide the full array you want).

## Development

This project is built and tested with Bun.

### Prerequisites

- Bun >= 1.3.0

### Repo layout

```
src/
  schemas/                 # event schemas and tests
  schemas/shared/          # shared schemas (Issue, Comment, Actor, etc.)
  fixtures/                # fixture factories
  registry.ts              # schema registry, router, and signature verification
  event-types.ts           # event type constants and type guard
```

### Key scripts

```bash
bun run build              # build dist/ and .d.ts files
bun run test               # run tests
bun run typecheck          # run TypeScript type checking
bun run update:exports     # update package.json exports after schema changes
```

## License

MIT
