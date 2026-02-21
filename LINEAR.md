Yes. There’s a “canonical-ish” source, and it’s exactly as glamorous as you’d expect: a public GraphQL schema sitting in Apollo Studio, plus the TypeScript SDK types that Linear generates from it.

## The closest thing to canonical

### Linear’s own Webhooks docs (envelope + rules)

Linear’s Webhooks page is the authoritative reference for:

The list of supported “data change” models, plus “convenience” events. ([Linear][1])

The webhook envelope fields (action/type/actor/etc), the headers Linear sends, and what they mean. ([Linear][1])

Security expectations (signature verification, timestamp tolerance, and IP allowlist). ([Linear][1])

So if you want the “shape of every webhook request,” this is it. ([Linear][1])

### The Webhooks schema explorer (canonical for “what does `data` look like?”)

The docs explicitly point you to the “Webhooks schema explorer” to look up the object types used in webhook payloads. ([Linear][1])

That explorer is backed by a public Apollo graph named `Linear-Webhooks`, and Linear even calls out that it is separate from the main Linear API graph. ([Apollo Studio][2])

This matters because the “webhook payload object types” are not always identical to the “API entity types” you get when you query the GraphQL API. ([GitHub][3])

### The TypeScript SDK is literally generated from that schema

If you want something you can actually vendor, diff, and compile against, the Linear monorepo shows you exactly how they derive the schema and types:

They fetch the Webhooks schema from Apollo using GraphQL Code Generator’s `apollo-engine` source, with `graph: Linear-Webhooks` and `variant: current` (and yes, `apiKey` is set to an empty string because the graph is public). ([GitHub][4])

They then generate a local `schema.json` (introspection) and `schema.graphql` (SDL). ([GitHub][4])

They generate TypeScript from `src/schema.graphql` into `src/_generated_documents.ts`, which is what the webhook payload types come from. ([GitHub][5])

So: the “canonical view” is basically “whatever is in the public `Linear-Webhooks` graph right now,” and the SDK is a pinned snapshot of that.

## What the webhook envelope schema looks like

Linear sends webhook metadata in both headers and body.

### Headers Linear sends

The docs show the canonical headers and what the custom ones mean:

`Linear-Delivery` (UUID v4 for the delivery), `Linear-Event` (entity type), and `Linear-Signature` (HMAC signature). ([Linear][1])

### Body fields on data change events

Data change events (“create”, “update”, “remove”) include:

`action`, `type`, `actor`, `createdAt`, `data`, `url`, `updatedFrom` (for updates), `webhookTimestamp`, plus `organizationId` and `webhookId` (shown in the example payload). ([Linear][1])

A few details that actually matter in real code:

`actor` can be a `User`, `OauthClient`, or `Integration`. ([Linear][1])

`updatedFrom` for updates contains the previous values of changed fields, and fields that were previously unset appear as `null`. ([Linear][1])

`webhookTimestamp` is a UNIX timestamp in milliseconds. ([Linear][1])

### Special-case event envelopes

Linear also documents event-specific fields for certain non “data change model” webhooks:

Issue SLA uses `issueData` as the serialized issue value. ([Linear][1])

OAuth app revoked includes `oauthClientId` and `organizationId`. ([Linear][1])

## The full universe of webhook “types” (scope)

There are two useful “scopes” to look at: what the docs say, and what the SDK actually models.

### What the docs list as supported models

Docs: data change webhooks are currently supported for these models:

Issues, Issue attachments, Issue comments, Issue labels, Comment reactions, Projects, Project updates, Documents, Initiatives, Initiative Updates, Cycles, Customers, Customer Requests, Users. ([Linear][1])

Docs: other convenience webhooks include Issue SLA and OAuthApp revoked. ([Linear][1])

### What the TypeScript SDK says the event types are

In the SDK source, `LinearWebhookEventType` is a literal union. This is the most practical “complete list” you can compile against:

```ts
export type LinearWebhookEventType =
  | "Attachment"
  | "AuditEntry"
  | "Comment"
  | "Customer"
  | "CustomerNeed"
  | "Cycle"
  | "Document"
  | "Initiative"
  | "InitiativeUpdate"
  | "Issue"
  | "IssueLabel"
  | "Project"
  | "ProjectUpdate"
  | "Reaction"
  | "User"
  | "IssueSLA"
  | "OAuthApp"
  | "AppUserNotification"
  | "PermissionChange"
  | "AgentSessionEvent";
```

That comes straight from `packages/sdk/src/webhooks/types.ts`. ([GitHub][6])

A couple naming mismatches you’ll notice immediately:

Docs say “Customer Requests,” while the SDK event type is `CustomerNeed`. That’s not you hallucinating, it’s just different naming layers. ([Linear][1])

Docs say “Comment reactions,” while the SDK event type is `Reaction`. ([Linear][1])

Also: the SDK includes event types the docs don’t advertise in that “supported models” list (notably `AuditEntry`, `AppUserNotification`, `PermissionChange`, `AgentSessionEvent`). If you want canonical scope, you trust the schema/SDK over prose docs. ([GitHub][6])

## Where the actual per-entity `data` schemas live

This is the part everyone really wants: “what fields are inside `payload.data` for Issue vs Project vs …?”

### In the SDK: generated payload types, wired into the webhook unions

The webhook layer in the SDK defines a union `LinearWebhookPayload`, and then maps each `type` to a specific payload type via `LinearWebhookEventTypeMap`. ([GitHub][6])

It imports the actual `…WebhookPayload` types (like `IssueWebhookPayload`, `ProjectWebhookPayload`, etc.) from `../_generated_documents.js`, which is generated from the GraphQL schema. ([GitHub][6])

So, for a canonical, machine-readable view of the `data` shape, your options are:

Use your IDE on `@linear/sdk/webhooks` and jump to `IssueWebhookPayload`, `ProjectWebhookPayload`, etc. They’re in the generated type output that ships with the package. ([GitHub][6])

Or pull the GraphQL schema and generate whatever you want (TS, JSON Schema, runtime validators) from it, same way Linear does. ([GitHub][4])

### In Apollo Studio: the “Linear-Webhooks” graph schema

This is the “source of truth” schema that defines those payload types, and it’s explicitly the one Linear references for webhook payload structures. ([Linear][1])

If you want canonical scope without installing anything, use that schema explorer and search for the payload types you care about (`IssueWebhookPayload`, `EntityWebhookPayload`, etc.). ([Linear][1])

## How to derive schemas yourself

Here are the practical ways, in decreasing order of “this will keep working even when Linear changes things.”

### Derive from the public `Linear-Webhooks` schema via GraphQL Code Generator

This is literally what Linear’s SDK does. Their `codegen.schema.yml` shows the exact config needed. ([GitHub][4])

A minimal version (copy-pasteable) looks like this:

```yaml
# webhooks.schema.yml
overwrite: true

schema:
  apollo-engine:
    engine:
      apiKey: "" # public graph, empty string works (per Linear's own config)
    graph: Linear-Webhooks
    variant: current

generates:
  ./schema.webhooks.json:
    plugins:
      - introspection

  ./schema.webhooks.graphql:
    plugins:
      - schema-ast
    config:
      includeDirectives: true
      sort: true
```

This yields an introspection JSON and an SDL file you can commit, diff, and use for codegen.

Then generate TS types from the SDL:

```yaml
# webhooks.types.yml
overwrite: true
schema: ./schema.webhooks.graphql

generates:
  ./src/linear-webhooks-types.ts:
    plugins:
      - typescript
```

That gets you a canonical, code-generated set of types for every payload object in the schema. ([GitHub][4])

### Derive from the installed SDK package (quick and boring, like most effective things)

The SDK exports the webhook types from `@linear/sdk/webhooks`. ([GitHub][7])

So you can treat the SDK’s `.d.ts` as your canonical schema snapshot for the version you’re pinned to:

```ts
import type {
  LinearWebhookPayload,
  LinearWebhookEventType,
  LinearWebhookEventTypeMap,
} from "@linear/sdk/webhooks";
```

Then discriminate on `payload.type`:

```ts
function handle(payload: LinearWebhookPayload) {
  switch (payload.type) {
    case "Issue":
      // payload.data is IssueWebhookPayload
      // payload.action is create|update|remove
      break;

    case "ProjectUpdate":
      // payload.data is ProjectUpdateWebhookPayload
      break;

    case "AgentSessionEvent":
      // agent session event payload
      break;
  }
}
```

The SDK’s union and mapping types are explicitly defined in the source. ([GitHub][6])

### Derive from Linear’s own repo snapshots

If you want the most “official” snapshot you can git-clone, Linear’s monorepo generates and stores:

`packages/sdk/src/schema.graphql` and `packages/sdk/src/schema.json` (produced by the schema codegen script). ([GitHub][4])

The script name is `schema` in the SDK package, wired to GraphQL Code Generator. ([GitHub][8])

So you can pin to a commit or tag and treat those generated schema artifacts as canonical for that version.

## A critical gotcha: webhook payloads are not always the same as API entity types

The docs say “the format of the payload body reflects that of the corresponding GraphQL entity,” but in practice there are differences. ([Linear][1])

One concrete example from a Linear SDK issue: an IssueLabel update webhook had `teamId` in the payload data instead of a nested `team` object that the SDK’s API entity type would suggest. ([GitHub][3])

Translation: don’t generate webhook payload types from the main Linear API schema and assume you’re safe. Use the dedicated `Linear-Webhooks` schema (or the SDK types generated from it) if you want something you can trust. ([GitHub][4])

## Bonus: the SDK exposes webhook verification constants (useful when you’re wiring your own server)

The SDK’s webhook client exports constants like:

`LINEAR_WEBHOOK_SIGNATURE_HEADER = "linear-signature"`

`LINEAR_WEBHOOK_TS_FIELD = "webhookTimestamp"`

and it also supports a timestamp header: `LINEAR_WEBHOOK_TS_HEADER = "linear-timestamp"` (preferred over the body field when present). ([GitHub][9])

That’s not the schema, but it’s part of the “canonical contract” you’ll implement if you handle webhooks seriously.

If you want one single canonical source: treat the public `Linear-Webhooks` schema (Apollo) as the truth, and treat `@linear/sdk/webhooks` as the versioned, generated, developer-friendly snapshot of that truth. ([GitHub][4])

[1]: https://linear.app/developers/webhooks "Webhooks – Linear Developers"
[2]: https://studio.apollographql.com/public/Linear-Webhooks/variant/current/home?utm_source=chatgpt.com "Overview | Linear Webhooks@current"
[3]: https://github.com/linear/linear/issues/596?utm_source=chatgpt.com "[Feature Request] Webhook payload types in TypeScript SDK"
[4]: https://raw.githubusercontent.com/linear/linear/master/packages/sdk/codegen.schema.yml "raw.githubusercontent.com"
[5]: https://raw.githubusercontent.com/linear/linear/master/packages/sdk/codegen.sdk.yml "raw.githubusercontent.com"
[6]: https://raw.githubusercontent.com/linear/linear/master/packages/sdk/src/webhooks/types.ts "raw.githubusercontent.com"
[7]: https://raw.githubusercontent.com/linear/linear/master/packages/sdk/src/webhooks/index.ts "raw.githubusercontent.com"
[8]: https://raw.githubusercontent.com/linear/linear/master/packages/sdk/package.json "raw.githubusercontent.com"
[9]: https://raw.githubusercontent.com/linear/linear/master/packages/sdk/src/webhooks/client.ts "raw.githubusercontent.com"
