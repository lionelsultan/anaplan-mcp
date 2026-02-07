# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

MCP (Model Context Protocol) server for Anaplan's Integration API v2. Exposes Anaplan workspaces, models, modules, lists, and data operations as MCP tools over stdio transport. TypeScript, ESM-only.

## Commands

```bash
npm run build        # Compile TypeScript to dist/
npm run dev          # Run from source with tsx
npm run typecheck    # Type-check without emitting
npm test             # Run all tests (vitest)
npm run test:watch   # Watch mode
npx vitest run src/auth/basic.test.ts  # Run single test file
```

## Architecture

Three layers, all under `src/`:

- **auth/** — Token lifecycle. Three providers (`basic.ts`, `certificate.ts`, `oauth.ts`) implement the `AuthProvider` interface from `types.ts`. `manager.ts` selects provider from env vars (cert > oauth > basic), handles token caching and auto-refresh before 35-min expiry.

- **api/** — Typed wrappers around Anaplan REST API (`https://api.anaplan.com/2/0/`). `client.ts` is the HTTP layer with retry logic (429 backoff, 5xx retry, chunked uploads). Other files are thin wrappers per resource type (workspaces, models, modules, lists, imports, exports, processes, files, transactional).

- **tools/** — MCP tool registration. Three files register tools on a `McpServer` instance: `exploration.ts` (model browsing), `bulk.ts` (import/export/process actions with async polling), `transactional.ts` (cell-level CRUD). Each tool takes zod-validated params and returns JSON text content.

**Wiring:** `server.ts` creates the McpServer and wires all layers. `index.ts` connects it to `StdioServerTransport`.

## Key Patterns

- Auth is configured via env vars (`ANAPLAN_USERNAME`/`ANAPLAN_PASSWORD`, `ANAPLAN_CLIENT_ID`, `ANAPLAN_CERTIFICATE_PATH`/`ANAPLAN_PRIVATE_KEY_PATH`). No config files.
- Anaplan auth tokens expire in 35 minutes. The auth manager refreshes 5 minutes before expiry.
- Bulk actions (import/export/process) are async — the API layer polls task status until COMPLETE/FAILED with a configurable timeout (default 5 min).
- Large API responses are truncated at 50,000 characters to protect LLM context windows.
- All imports use `.js` extensions (ESM requirement with Node16 module resolution).
- Tests mock `globalThis.fetch` with `vi.spyOn` — no HTTP calls in tests.

## Anaplan API Reference

- Auth endpoint: `https://auth.anaplan.com/token/authenticate`
- Token refresh: `https://auth.anaplan.com/token/refresh`
- API base: `https://api.anaplan.com/2/0/`
- OAuth device flow: `https://us1a.app.anaplan.com/oauth/device/code`
