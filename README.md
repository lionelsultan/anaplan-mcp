[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![MCP](https://img.shields.io/badge/MCP-compatible-green?logo=anthropic)](https://modelcontextprotocol.io/)

# Anaplan MCP

Unofficial MCP server for Anaplan.

This project lets an AI assistant talk to Anaplan through the official Integration API v2. In practice, it turns plain-language requests such as "show me the models in this workspace" or "run this export" into structured Anaplan API calls.

It is built in TypeScript, supports local MCP (`stdio`) and remote MCP over HTTP, and works with Claude Desktop, Claude Code, ChatGPT, claude.ai, and other MCP-compatible clients.

## In One Sentence

If Anaplan is the data platform, this server is the translator between Anaplan and your AI assistant.

## Why This Project Exists

Anaplan is powerful, but using the API directly is technical:

- you need to know the right endpoints,
- you need to resolve workspace, model, module, list, and action IDs,
- you need to chain several calls in the right order,
- and you need to handle authentication, retries, polling, uploads, and downloads.

This server hides that plumbing behind MCP tools so an assistant can do the heavy lifting.

## Who It Is For

- Business users who want quick answers from Anaplan without learning the API
- Model builders who want to inspect models faster
- Consultants who need to document or explore unfamiliar models
- Platform and IT teams who want a controlled bridge between AI assistants and Anaplan

## What It Can Do

The server exposes 70 MCP tools grouped into 3 families:

- Exploration tools: browse workspaces, models, modules, views, line items, files, users, versions, and tasks
- Bulk tools: run imports, exports, processes, delete actions, file transfers, large-volume reads, and some model administration tasks
- Transactional tools: read cells, write cells, and add/update/delete list items

Typical use cases:

- "List the models in my workspace"
- "Show the line items in this module"
- "Read the values from this saved view"
- "Run the monthly import and tell me if it failed"
- "Export this dataset and return the file"
- "Add these new products to the list"

## What It Cannot Do

This project does not magically unlock everything in Anaplan.

The Anaplan API does not support core model-building tasks such as:

- creating modules from scratch,
- creating line items through the API,
- defining formulas programmatically,
- or building a full model structure by code.

For those tasks, the Anaplan UI remains the right tool.

## How It Works

At runtime, the project has 4 main layers:

1. Transport layer  
   The MCP client connects either through local `stdio` or remote Streamable HTTP.

2. Authentication layer  
   The server authenticates to Anaplan using one of three methods: certificate, OAuth device flow, or basic auth.

3. API layer  
   A shared Anaplan client handles retries, pagination, task polling, file chunks, and request formatting.

4. Tool layer  
   MCP tools validate inputs, resolve names to IDs, call the right Anaplan API wrapper, and format the result for the assistant.

There is also a built-in MCP resource called `anaplan://orchestration-guide`. It teaches the assistant the correct sequence of tools for common workflows such as reading data, running imports, or downloading export files.

## Project Analysis

The codebase is well structured and easy to reason about:

- [src/server.ts](src/server.ts) assembles the whole server
- [src/index.ts](src/index.ts) starts the local `stdio` version
- [src/http.ts](src/http.ts) starts the remote HTTP version
- [src/auth/](src/auth/) contains the auth providers and token management
- [src/api/](src/api/) contains the reusable Anaplan API wrappers
- [src/tools/](src/tools/) contains the MCP tool registrations
- [src/resources/orchestration-guide.ts](src/resources/orchestration-guide.ts) contains the assistant-facing workflow guide

The architecture is pragmatic:

- authentication is centralized,
- the HTTP client is shared,
- API wrappers are separated by Anaplan domain,
- tool registration is grouped by use case,
- and tests cover both the transport and domain layers.

As of today, the project also includes security hardening for remote HTTP mode:

- remote HTTP requires an outer bearer token,
- unauthorized HTTP requests are rejected before JSON body parsing,
- remote sessions are capped and expired when idle,
- local file saves are restricted to local mode,
- and remote inline downloads are size-limited.

## Quick Start

### Prerequisites

- Node.js 18+
- An Anaplan account with API access
- An MCP-compatible client such as Claude Desktop or Claude Code

### Install

```bash
git clone https://github.com/larasrinath/anaplan-mcp.git
cd anaplan-mcp
npm install
npm run build
```

## Local Usage With Claude Desktop

Add the server to your Claude Desktop MCP config.

macOS:

```text
~/Library/Application Support/Claude/claude_desktop_config.json
```

Windows:

```text
C:\Users\<YourUsername>\AppData\Roaming\Claude\claude_desktop_config.json
```

Example with basic auth:

```json
{
  "mcpServers": {
    "anaplan": {
      "command": "node",
      "args": ["/absolute/path/to/anaplan-mcp/dist/index.js"],
      "env": {
        "ANAPLAN_USERNAME": "user@company.com",
        "ANAPLAN_PASSWORD": "your-password"
      }
    }
  }
}
```

Example with OAuth device flow:

```json
{
  "mcpServers": {
    "anaplan": {
      "command": "node",
      "args": ["/absolute/path/to/anaplan-mcp/dist/index.js"],
      "env": {
        "ANAPLAN_CLIENT_ID": "your-client-id"
      }
    }
  }
}
```

Then restart Claude Desktop completely.

## Local Usage With Claude Code

You can point Claude Code at the local stdio server:

```bash
claude mcp add anaplan -- node /absolute/path/to/anaplan-mcp/dist/index.js
```

Or use a local `.mcp.json` file if that is how you manage MCP servers in your environment.

## Authentication Methods

The server automatically chooses the strongest configured method in this order:

1. Certificate auth
2. OAuth device flow
3. Basic auth

Main environment variables:

| Method | Variables |
|--------|-----------|
| Certificate | `ANAPLAN_CERTIFICATE_PATH`, `ANAPLAN_PRIVATE_KEY_PATH` |
| OAuth device flow | `ANAPLAN_CLIENT_ID` |
| Basic auth | `ANAPLAN_USERNAME`, `ANAPLAN_PASSWORD` |

Notes:

- OAuth tokens are stored in memory only by default
- OAuth device flow is a good fit when the end user should log in with their own identity
- Basic auth is simple but usually the least desirable option in enterprise environments

## Remote HTTP Mode

Remote HTTP mode is for browser-based AI clients and hosted MCP deployments.

Start it with:

```bash
npm run start:http
```

Important: remote mode is intentionally stricter than local mode.

Required variables:

| Variable | Why it matters |
|----------|----------------|
| `ANAPLAN_CLIENT_ID` | Each remote session authenticates the user through Anaplan OAuth |
| `ANAPLAN_MCP_HTTP_AUTH_TOKEN` | Protects the public MCP endpoint with an outer bearer token |

Optional hardening and sizing variables:

| Variable | Default | Purpose |
|----------|---------|---------|
| `ANAPLAN_MCP_HTTP_BODY_LIMIT` | `100mb` | Maximum JSON request size |
| `ANAPLAN_MCP_HTTP_INLINE_DOWNLOAD_LIMIT` | `10mb` | Maximum inline file download size in HTTP mode |
| `ANAPLAN_MCP_HTTP_MAX_SESSIONS` | `100` | Global active session limit |
| `ANAPLAN_MCP_HTTP_MAX_SESSIONS_PER_IP` | `10` | Active session limit per client IP |
| `ANAPLAN_MCP_HTTP_SESSION_IDLE_TIMEOUT_MS` | `3600000` | Session idle timeout |

Remote mode is designed so that:

- each user authenticates to Anaplan with their own session,
- the public endpoint is protected before request bodies are parsed,
- and the server does not allow remote writes to the host machine's Downloads folder.

For deployment details, see [docs/guides/deploying-remote.md](docs/guides/deploying-remote.md).

## Safety And Permissions

This server does not create new Anaplan permissions.

It can only do what the authenticated Anaplan identity is already allowed to do. If a user can read only one workspace in Anaplan, the server can read only that workspace. If a user can run imports or change data, the server can do that too.

That means you should still treat it as a powerful integration layer:

- use least-privilege Anaplan accounts when possible,
- test destructive actions in non-production first,
- review write operations before approving them,
- and remember that imports, deletes, and admin actions can have real consequences.

## Repository Structure

```text
src/
  auth/        Authentication providers and token lifecycle
  api/         Shared HTTP client and domain-specific Anaplan wrappers
  tools/       MCP tool definitions
  resources/   Assistant-facing orchestration guide
  transport/   Transport compatibility helpers
  server.ts    Main server assembly
  index.ts     Local stdio entry point
  http.ts      Remote HTTP entry point

docs/
  architecture/  Runtime diagrams
  guides/        Practical usage and deployment guides
  api/           Reference material for Anaplan APIs
```

## Useful Docs In This Repo

- [docs/architecture/overview.md](docs/architecture/overview.md): runtime diagrams and trust boundaries
- [docs/guides/anaplan-tool-guide.md](docs/guides/anaplan-tool-guide.md): which tool to use for which job
- [docs/guides/deploying-remote.md](docs/guides/deploying-remote.md): remote deployment guide
- [docs/guides/ai-layer-setup.md](docs/guides/ai-layer-setup.md): setup notes for an AI layer around Anaplan
- [docs/guides/ai-layer-reporting.md](docs/guides/ai-layer-reporting.md): reporting-oriented guidance

## Development

Useful commands:

```bash
npm run build
npm test
npm run typecheck
npm run dev
npm run dev:http
```

## Limitations And Tradeoffs

- This is an unofficial project, not an Anaplan product
- It depends on what the official Anaplan API exposes
- Some workflows still require multiple tool calls because Anaplan itself is multi-step
- Remote HTTP deployments need real operational care: auth, hosting, session limits, and reverse-proxy setup matter

## Disclaimer

This is an unofficial open-source project and is not affiliated with, endorsed by, or supported by Anaplan.

It uses the official Anaplan Integration API v2. Users remain responsible for their own security posture, data governance, and compliance with Anaplan terms.

## License

MIT. See [LICENSE](LICENSE).
