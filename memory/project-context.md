---
name: Project Context
description: Current state of anaplan-mcp, what was built this session, and what is in progress
type: project
---

## What anaplan-mcp is
Full admin/developer MCP server for Anaplan Integration API v2. 68+ tools, stdio transport, TypeScript ESM. Lives at /Users/larasrinath/Projects/github-projects/mcp/anaplan-mcp.

## What we built this session

### AI Layer (in Anaplan models)
A metadata structure model builders set up inside each Anaplan model so the AI can understand it:

**Lists (under --- AI LAYER --- category):**
- `AI Modules` — numbered production list, one item per module the AI can access
- `AI Model State` — production list with items: Dev, QA, Prod (NOTE: actual Anaplan model state is "PRODUCTION" not "PRODUCTION_MAINTENANCE" — confirmed from live data)

**Modules:**
- `AI Model Metadata` — no dimension, line items: Model Name (TEXT), Model Purpose (TEXT), Model State (LIST→AI Model State)
- `AI Module Metadata` — dimensioned by AI Modules, line items: Module Name (TEXT), Module Description (TEXT)

**Tagging conventions:**
- Model Purpose cell: `AI LAYER: <description>`
- Module Description cell: `AI LAYER | <MODULE>: <description>`
- Line item notes: `AI LI Metadata: <description>` (this prefix is the iron door gate)

### MCP tools added to anaplan-mcp (to be removed later)
- `identify_user` — asks Admin or Business User, routes session
- `init_session` — scans PRODUCTION models, finds AI Model Metadata + AI Module Metadata modules (case-insensitive match), builds session cache, returns count

### MCP instructions (server.ts)
Auto-loads all .md files from .claude/commands/ alphabetically and concatenates as MCP instructions field. Two command files:
- `.claude/commands/anaplan-tools.md` — tool selection guide
- `.claude/commands/anaplan-reporting.md` — session init + iron door rules + summary/detail read flow

### Iron Door Rules (hard rules, no exceptions)
1. Only interact with models that have AI Model Metadata module
2. Only interact with modules listed in AI Module Metadata
3. Only interact with line items whose notes start with "AI LI Metadata:"

### Summary Read Flow (in instructions)
For top-level/aggregated reads:
1. show_lineitem_dimensions → get dimensionIds
2. show_listmetadata per list dimension → get topLevelItem.id
3. read_cells with pages=dimensionId:topLevelItemId for each dimension
Uses Anaplan's pre-computed rollup, never downloads individual items.

## In progress (other terminal)
Building `anaplan-insight-mcp` — a new standalone business-user-focused MCP server.
- Location: /Users/larasrinath/Projects/github-projects/mcp/anaplan-insight-mcp
- 5-7 tools only
- SessionCacheManager (session/cache.ts) — eager init, semantic matching
- read_module_summary compound tool (does dimensions+topLevelItem+readCells in one call)
- Same auth layer copied from anaplan-mcp
- No writes, no bulk, no admin tools

## Key facts discovered
- Anaplan model activeState values: ARCHIVED, UNLOCKED, PRODUCTION (NOT "PRODUCTION_MAINTENANCE")
- show_allmodels returns: id, name, activeState, currentWorkspaceId, currentWorkspaceName, modelUrl, categoryValues
- No notes/description field on model or module objects in the API
- topLevelItem field is in list metadata: GET /workspaces/{wId}/models/{mId}/lists/{listId}
- read_cells pages param: ?pages=dimensionId:itemId (supports top-level scoped reads)
- Module name matching in init_session is case-insensitive (.toLowerCase())
- Lara's test model: "[LARA] TEST MODEL", ID: D8627436C8AB4E52AD04BE0EADDE4F96, Workspace: ACG (8a81b09c654f3e16016579eb3e8860b4)
