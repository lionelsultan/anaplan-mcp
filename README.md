[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![MCP](https://img.shields.io/badge/MCP-compatible-green?logo=anthropic)](https://modelcontextprotocol.io/)
[![Built with Claude Code](https://img.shields.io/badge/Built%20with-Claude%20Code-blueviolet?logo=anthropic)](https://claude.ai/code)

# Anaplan MCP

A [Model Context Protocol](https://modelcontextprotocol.io/) (MCP) server that connects AI assistants to Anaplan's Integration API v2. Gives LLMs like Claude direct access to browse Anaplan workspaces, read and write model data, run imports/exports, manage list items, and administer models - all through 68 structured tools.

Built in TypeScript. Runs over stdio. Works with Claude Desktop, Claude Code, and any MCP-compatible client.

## Setup

### 1. Clone and build

```bash
git clone https://github.com/larasrinath/anaplan-mcp.git
cd anaplan-mcp
npm install
npm run build
```

### 2. Configure your MCP client

Add the following to your MCP client config. The file location depends on your client:

- **Claude Desktop (macOS):** `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Claude Desktop (Windows):** `%APPDATA%\Claude\claude_desktop_config.json`
- **Claude Code:** `~/.claude/mcp_settings.json` or run `claude mcp add`

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

**Important:** Replace `/absolute/path/to/anaplan-mcp` with the *actual absolute path* where you cloned the repo (e.g., `/Users/you/anaplan-mcp`).

### 3. Restart your MCP client

Restart Claude Desktop or Claude Code to pick up the new server. The 68 Anaplan tools should now be available.

### Browser-based AI (claude.ai, gemini.google.com, chatgpt.com)

MCP servers run as local processes on your machine - the AI client spawns the server over stdio. Browser-based AI products like claude.ai, Gemini, and ChatGPT web cannot launch local processes, so they cannot connect to this server. You need a desktop application (Claude Desktop, Claude Code) that runs on your machine.

## Authentication

Three methods supported, auto-detected from environment variables. If multiple are configured, the highest priority method wins.

| Method | Env Vars | Priority |
|--------|----------|----------|
| Certificate | `ANAPLAN_CERTIFICATE_PATH`, `ANAPLAN_PRIVATE_KEY_PATH` | Highest |
| OAuth2 (Device Grant) | `ANAPLAN_CLIENT_ID`, `ANAPLAN_CLIENT_SECRET` (optional) | Medium |
| Basic | `ANAPLAN_USERNAME`, `ANAPLAN_PASSWORD` | Lowest |

- **Basic** - sends base64 credentials to Anaplan's auth endpoint, receives a session token
- **Certificate** - reads your PEM certificate and private key, signs a random challenge with SHA512, authenticates via the CACertificate flow
- **OAuth2 Device Grant** - initiates a device code flow, prints a URL and code to stderr for the user to authorize, then polls for an access token

All methods produce a token that is cached in memory and automatically refreshed 5 minutes before the 35-minute expiry. You never need to manage tokens yourself.

## Tools

### Model Exploration (37 tools)

| MCP Tool | API Endpoint | Description |
|----------|--------------|-------------|
| `show_workspaces` | `GET /workspaces` | List all accessible workspaces |
| `show_workspacedetails` | `GET /workspaces/{workspaceId}` | Get workspace details (size and active status) |
| `show_models` | `GET /workspaces/{workspaceId}/models` | List models in a workspace |
| `show_allmodels` | `GET /models` | List all models across all workspaces |
| `show_modeldetails` | `GET /models/{modelId}` | Get model details including state and workspace |
| `show_modelstatus` | `POST /workspaces/{workspaceId}/models/{modelId}/status` | Check model status (legacy endpoint, often returns 405) |
| `show_modules` | `GET /workspaces/{workspaceId}/models/{modelId}/modules` | List modules in a model |
| `show_moduledetails` | `GET /workspaces/{workspaceId}/models/{modelId}/modules` | Get module details by filtering module list |
| `show_lineitems` | `GET /models/{modelId}/modules/{moduleId}/lineItems` | List line items in a module (`includeAll` supported) |
| `show_alllineitems` | `GET /models/{modelId}/lineItems` | List all line items in a model (`includeAll` supported) |
| `show_lineitem_dimensions` | `GET /models/{modelId}/lineItems/{lineItemId}/dimensions` | List dimensions for a line item |
| `show_lineitem_dimensions_items` | `GET /models/{modelId}/lineItems/{lineItemId}/dimensions/{dimensionId}/items` | List dimension items for a line item/dimension pair |
| `show_savedviews` | `GET /workspaces/{workspaceId}/models/{modelId}/modules/{moduleId}/views` | List saved and default views in a module |
| `show_allviews` | `GET /models/{modelId}/views` | List all views in a model (cross-module) |
| `show_viewdetails` | `GET /models/{modelId}/views/{viewId}` | Get view axis metadata (rows, columns, pages) |
| `show_lists` | `GET /workspaces/{workspaceId}/models/{modelId}/lists` | List lists (dimensions) in a model |
| `get_list_items` | `GET /workspaces/{workspaceId}/models/{modelId}/lists/{listId}/items` | Get items from a list |
| `show_listmetadata` | `GET /workspaces/{workspaceId}/models/{modelId}/lists/{listId}` | Get list metadata including parent/properties/count |
| `show_dimensionitems` | `GET /models/{modelId}/dimensions/{dimensionId}/items` | List all items in a model-level dimension |
| `show_viewdimensionitems` | `GET /models/{modelId}/views/{viewId}/dimensions/{dimensionId}/items` | List selected dimension items for a view |
| `lookup_dimensionitems` | `POST /workspaces/{workspaceId}/models/{modelId}/dimensions/{dimensionId}/items` | Resolve dimension items by names/codes |
| `show_imports` | `GET /workspaces/{workspaceId}/models/{modelId}/imports` | List import actions in a model |
| `show_importdetails` | `GET /workspaces/{workspaceId}/models/{modelId}/imports/{importId}` | Get import metadata |
| `show_exports` | `GET /workspaces/{workspaceId}/models/{modelId}/exports` | List export actions in a model |
| `show_exportdetails` | `GET /workspaces/{workspaceId}/models/{modelId}/exports/{exportId}` | Get export metadata |
| `show_processes` | `GET /workspaces/{workspaceId}/models/{modelId}/processes` | List process actions in a model |
| `show_processdetails` | `GET /workspaces/{workspaceId}/models/{modelId}/processes/{processId}` | Get process metadata |
| `show_files` | `GET /workspaces/{workspaceId}/models/{modelId}/files` | List files in a model |
| `show_actions` | `GET /workspaces/{workspaceId}/models/{modelId}/actions` | List model actions (including deletes) |
| `show_actiondetails` | `GET /workspaces/{workspaceId}/models/{modelId}/actions/{actionId}` | Get action metadata |
| `show_currentperiod` | `GET /workspaces/{workspaceId}/models/{modelId}/currentPeriod` | Get current period |
| `show_modelcalendar` | `GET /workspaces/{workspaceId}/models/{modelId}/modelCalendar` | Get fiscal year/calendar settings |
| `show_versions` | `GET /models/{modelId}/versions` | List version metadata |
| `show_currentuser` | `GET /users/me` | Get current authenticated user |
| `show_users` | `GET /users` | List users in tenant scope |
| `show_userdetails` | `GET /users/{userId}` | Get user details by ID |
| `show_tasks` | `GET /workspaces/{workspaceId}/models/{modelId}/{actionType}/{actionId}/tasks` | List task history for imports/exports/processes/actions |

### Bulk Data Operations (26 tools)

| MCP Tool | API Endpoint | Description |
|----------|--------------|-------------|
| `run_export` | `POST /workspaces/{workspaceId}/models/{modelId}/exports/{exportId}/tasks` | Run export task, download output file chunks, and optionally save locally with `saveToDownloads` and `fileName` |
| `run_import` | `POST /workspaces/{workspaceId}/models/{modelId}/imports/{importId}/tasks` | Upload file chunks, run import, and poll task completion |
| `run_process` | `POST /workspaces/{workspaceId}/models/{modelId}/processes/{processId}/tasks` | Run process task and poll completion |
| `run_delete` | `POST /workspaces/{workspaceId}/models/{modelId}/actions/{deleteActionId}/tasks` | Run delete action task |
| `upload_file` | `POST /workspaces/{workspaceId}/models/{modelId}/files/{fileId}` | Initialize chunked upload, upload chunks, and complete file upload |
| `download_file` | `GET /workspaces/{workspaceId}/models/{modelId}/files/{fileId}/chunks` | Download file by reading all chunk payloads |
| `delete_file` | `DELETE /workspaces/{workspaceId}/models/{modelId}/files/{fileId}` | Delete model file (irreversible) |
| `get_action_status` | `GET /workspaces/{workspaceId}/models/{modelId}/{actionType}/{actionId}/tasks/{taskId}` | Get status for import/export/process/action task |
| `close_model` | `POST /workspaces/{workspaceId}/models/{modelId}/close` | Close (archive) a model |
| `open_model` | `POST /workspaces/{workspaceId}/models/{modelId}/open` | Open (wake up) a closed model |
| `bulk_delete_models` | `POST /workspaces/{workspaceId}/bulkDeleteModels` | Delete multiple closed models |
| `set_currentperiod` | `PUT /workspaces/{workspaceId}/models/{modelId}/currentPeriod` | Set current period |
| `set_fiscalyear` | `PUT /workspaces/{workspaceId}/models/{modelId}/modelCalendar/fiscalYear` | Update model fiscal year |
| `set_versionswitchover` | `PUT /models/{modelId}/versions/{versionId}/switchover` | Set version switchover date |
| `download_importdump` | `GET /workspaces/{workspaceId}/models/{modelId}/imports/{importId}/tasks/{taskId}/dump/chunks` | Download failed import dump chunks (CSV) |
| `download_processdump` | `GET /workspaces/{workspaceId}/models/{modelId}/processes/{processId}/tasks/{taskId}/dumps/{objectId}/chunks` | Download failed process dump chunks (CSV) |
| `cancel_task` | `DELETE /workspaces/{workspaceId}/models/{modelId}/{actionType}/{actionId}/tasks/{taskId}` | Cancel running import/export/process/action task |
| `create_view_readrequest` | `POST /workspaces/{workspaceId}/models/{modelId}/views/{viewId}/readRequests` | Create large-volume view read request |
| `get_view_readrequest` | `GET /workspaces/{workspaceId}/models/{modelId}/views/{viewId}/readRequests/{requestId}` | Get large-volume view read request status |
| `get_view_readrequest_page` | `GET /workspaces/{workspaceId}/models/{modelId}/views/{viewId}/readRequests/{requestId}/pages/{pageNo}` | Download a CSV page from view read request |
| `delete_view_readrequest` | `DELETE /workspaces/{workspaceId}/models/{modelId}/views/{viewId}/readRequests/{requestId}` | Delete large-volume view read request |
| `create_list_readrequest` | `POST /workspaces/{workspaceId}/models/{modelId}/lists/{listId}/readRequests` | Create large-volume list read request |
| `get_list_readrequest` | `GET /workspaces/{workspaceId}/models/{modelId}/lists/{listId}/readRequests/{requestId}` | Get large-volume list read request status |
| `get_list_readrequest_page` | `GET /workspaces/{workspaceId}/models/{modelId}/lists/{listId}/readRequests/{requestId}/pages/{pageNo}` | Download a CSV page from list read request |
| `delete_list_readrequest` | `DELETE /workspaces/{workspaceId}/models/{modelId}/lists/{listId}/readRequests/{requestId}` | Delete large-volume list read request |
| `reset_list_index` | `POST /models/{modelId}/lists/{listId}/resetIndex` | Reset list item index numbering |

### Transactional Operations (5 tools)

| MCP Tool | API Endpoint | Description |
|----------|--------------|-------------|
| `read_cells` | `GET /models/{modelId}/views/{viewId}/data?format=v1` | Read cell data from a module view |
| `write_cells` | `POST /models/{modelId}/modules/{moduleId}/data` | Write values to specific module cells |
| `add_list_items` | `POST /workspaces/{workspaceId}/models/{modelId}/lists/{listId}/items?action=add` | Add new items to a list |
| `update_list_items` | `PUT /workspaces/{workspaceId}/models/{modelId}/lists/{listId}/items?action=update` | Update existing list items |
| `delete_list_items` | `POST /workspaces/{workspaceId}/models/{modelId}/lists/{listId}/items?action=delete` | Delete list items |

## Features

### Recent Additions

- Formula metadata support for line items: `show_lineitems` and `show_alllineitems` now support `includeAll=true` and display formula, format, applies-to, and version fields.
- Consistent single-record rendering: table output now renders one-record results as key-value rows (no header), while multi-record results use standard column headers.
- Expanded large-list read support: `get_list_readrequest` added to check list read request status directly.
- Broader task status coverage: `get_action_status` now supports `actions` in addition to `imports`, `exports`, and `processes`.
- Improved API robustness: HTTP `204/205` success responses are handled without JSON parse failures.
- Optional export file save: `run_export` can now write the downloaded content to `~/Downloads` when `saveToDownloads=true`.
- Improved user-list compatibility: `show_users` now handles both `/users` response shapes (`users` and `user` arrays).

### Name Resolution

All tools accept human-readable names alongside raw Anaplan IDs. Instead of passing a 32-character hex ID like `8a81b09e5f5501a1015f663e30230707`, you can just say "Revenue Model". Name matching is case-insensitive. Resolved names are cached in memory with a 5-minute TTL.

### Pagination and Search

All list tools support pagination and search filtering:

| Parameter | Description | Default |
|-----------|-------------|---------|
| `offset` | Number of items to skip | 0 |
| `limit` | Max items to return | 10 (max 50) |
| `search` | Filter by name or ID (case-insensitive substring match) | - |

Results come back as numbered tables with a pagination footer showing page numbers and navigation hints. Row numbers are sequential across pages (page 2 starts at 11).

### Automatic Task Polling

Import, export, process, and delete actions are asynchronous in Anaplan. The bulk tools handle this automatically - they start the action, poll every 2 seconds until it completes (up to 5 minutes), and return the final result. No need to manually check task status.

### Retry Logic

All API calls automatically retry on transient failures:
- **429 (Rate Limited)** - waits for the `Retry-After` duration, then retries
- **5xx (Server Error)** - retries up to 3 times with exponential backoff (1s, 2s, 4s)

### Large Response Handling

Transactional API responses over 50,000 characters are automatically truncated with a notice rather than failing. For truly large datasets, use the large volume read tools (`create_view_readrequest`, `get_view_readrequest_page`) which stream data as paginated CSV.

### Chunked File Upload

File uploads are automatically chunked for large files (50MB per chunk). The 3-step upload flow (initialize, upload chunks, complete) is handled transparently by the `upload_file` and `run_import` tools.

## Architecture

```
src/
  auth/       # Authentication providers (basic, certificate, oauth) + token manager
  api/        # HTTP client with retry logic + 16 domain-specific API wrappers
  tools/      # MCP tool registrations (exploration, bulk, transactional)
  server.ts   # Wires auth > client > APIs > MCP server
  index.ts    # Entry point (stdio transport)
```

Three layers:

1. **Auth layer** - pluggable providers behind a common `AuthProvider` interface. The `AuthManager` selects the right provider from env vars and handles token lifecycle.
2. **API layer** - `AnaplanClient` handles all HTTP communication with the Anaplan API. 16 domain wrappers provide typed methods for each endpoint. Auto-paginates list endpoints using Anaplan's `meta.paging` metadata.
3. **Tools layer** - registers MCP tools on the server with zod schemas for input validation. Each tool delegates to the appropriate API wrapper and formats results.

## Disclaimers

- This project is built against the [Anaplan Integration API v2](https://anaplan.docs.apiary.io/), which served as the primary API reference
- `show_modelstatus` uses `POST /workspaces/{workspaceId}/models/{modelId}/status`; this endpoint is present in some historical docs but often returns `405 Method Not Allowed` in current tenants, so treat it as unsupported unless your tenant confirms availability
- This is a personal project, not affiliated with or endorsed by Anaplan
- Users are responsible for compliance with Anaplan's Terms of Service
- Always test in non-production environments first
- Write operations (imports, cell writes, list mutations, delete actions) can cause irreversible data loss - review AI-generated actions before confirming
- API credentials are passed via environment variables - keep them out of version control
- No support or warranties provided
- Use at your own risk

## License

MIT - see [LICENSE](LICENSE) for details.
