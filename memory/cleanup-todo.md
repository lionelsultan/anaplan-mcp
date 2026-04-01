---
name: Cleanup TODO
description: Things to remove from anaplan-mcp once anaplan-insight-mcp is complete
type: project
---

## Once anaplan-insight-mcp is working, remove from anaplan-mcp:

### Tools to remove from src/tools/exploration.ts
- `identify_user` tool (lines ~78-110)
- `init_session` tool (lines ~112-160)

### Commands to remove from .claude/commands/
- `anaplan-reporting.md` — moves to anaplan-insight-mcp

### server.ts
- Remove the auto-loader code that reads .claude/commands/ and sets instructions
- Remove the fs/path/url imports added for the auto-loader
- Revert McpServer constructor to just { name, version } with no instructions

### Keep in anaplan-mcp
- `anaplan-tools.md` command — useful for admin/developer context
- All 68 original tools unchanged

## Why wait
Do not remove anything until anaplan-insight-mcp is built, tested, and confirmed working.
Do it as one clean PR, not mid-development.
