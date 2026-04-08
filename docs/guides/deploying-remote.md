# Deploying as a Remote MCP Server

This guide covers deploying anaplan-mcp as a remote HTTP server for Claude Web (claude.ai), ChatGPT, and other browser-based AI assistants that support remote MCP connectors.

## How it works

The server has two transport modes:

- **stdio** (`npm start`) -- for local clients like Claude Desktop and Claude Code
- **Streamable HTTP** (`npm run start:http`) -- for remote clients over HTTPS

The HTTP mode serves MCP over a standard HTTP endpoint. Clients connect via POST/GET/DELETE on `/mcp`.

## Quick start (Fly.io)

### 1. Fork and clone

```bash
git clone https://github.com/larasrinath/anaplan-mcp.git
cd anaplan-mcp
```

### 2. Deploy to Fly.io

Sign up at [fly.io](https://fly.io) (GitHub login works). Connect your repo and deploy. The included `Dockerfile` and `fly.toml` handle everything.

Set your Anaplan OAuth client in the Fly.io dashboard so each remote session can authorize with its own Anaplan identity:

| Key | Value |
|-----|-------|
| `ANAPLAN_CLIENT_ID` | your-anaplan-oauth-client-id |
| `ANAPLAN_MCP_HTTP_AUTH_TOKEN` | long random bearer token protecting the public MCP endpoint |

If you expect very large inline MCP payloads, you can also set `ANAPLAN_MCP_HTTP_BODY_LIMIT`. The server defaults to `100mb`, which is enough for most `run_import` and `upload_file` requests.
If you want to tighten remote inline downloads, set `ANAPLAN_MCP_HTTP_INLINE_DOWNLOAD_LIMIT`. The server defaults to `10mb` for inline download responses in HTTP mode.
If you want to hard-cap session fan-out, set `ANAPLAN_MCP_HTTP_MAX_SESSIONS`, `ANAPLAN_MCP_HTTP_MAX_SESSIONS_PER_IP`, and `ANAPLAN_MCP_HTTP_SESSION_IDLE_TIMEOUT_MS`.

### 3. Connect from Claude Web

1. Point your remote MCP client at `https://your-app.fly.dev/mcp`
2. Use the Anaplan OAuth flow exposed by the tools when the first authenticated call is made
3. Configure your client or reverse proxy to send `Authorization: Bearer <token>` using `ANAPLAN_MCP_HTTP_AUTH_TOKEN`
4. Start a new chat and try: "list my workspaces"

## Requirements for cloud deployment

These are **all required** for the server to work with remote MCP clients. Missing any one of them will cause startup failures or "Couldn't reach the MCP server" errors.

### 1. Use per-session Anaplan OAuth

Remote HTTP mode now assumes each MCP session authenticates to Anaplan separately. Set `ANAPLAN_CLIENT_ID` on the server; the HTTP transport creates a fresh OAuth-backed `AuthManager` for each session instead of sharing a process-wide Anaplan user.

If `ANAPLAN_CLIENT_ID` is missing, HTTP mode fails fast at startup.

### 2. Protect the public MCP endpoint with an outer bearer token

Remote HTTP mode now fails closed unless `ANAPLAN_MCP_HTTP_AUTH_TOKEN` (or `MCP_HTTP_AUTH_TOKEN`) is configured. Every HTTP request must present this token as `Authorization: Bearer <token>` before the server will parse JSON bodies or initialize sessions.

### 3. Bind to 0.0.0.0

Express defaults to `127.0.0.1` (localhost only). Cloud platforms route traffic through reverse proxies that cannot reach localhost. The server must bind to all interfaces:

```typescript
app.listen(PORT, "0.0.0.0", () => { ... });
```

Without this, the platform logs will show: `instance refused connection. is your app listening on 0.0.0.0:8080?`

### 4. GET must return 200 for reachability checks

MCP clients send a `GET` request to the endpoint before attempting to initialize. Without a valid session, this must return **200** (not 400 or 404). The client uses this as a health/reachability probe.

```typescript
app.get("/mcp", async (req, res) => {
  const sessionId = req.headers["mcp-session-id"];
  if (!sessionId || !transports[sessionId]) {
    res.status(200).json({ status: "ok" });
    return;
  }
  await transports[sessionId].handleRequest(req, res);
});
```

### 5. Enable JSON response mode

The `StreamableHTTPServerTransport` defaults to `text/event-stream` (SSE) responses. Remote MCP clients may not handle SSE. Enable JSON responses:

```typescript
new StreamableHTTPServerTransport({
  sessionIdGenerator: () => randomUUID(),
  enableJsonResponse: true,  // Returns application/json instead of SSE
});
```

### 6. Set CORS and anti-buffering headers

Cloud reverse proxies (Fly.io, Render, Cloudflare) buffer responses by default, which breaks streaming. Set these headers:

```typescript
res.setHeader("Access-Control-Allow-Origin", "*");
res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");
res.setHeader("Access-Control-Allow-Headers",
  "Content-Type, Accept, Authorization, mcp-session-id, mcp-protocol-version, Last-Event-ID, X-MCP-API-Key, X-API-Key");
res.setHeader("Access-Control-Expose-Headers", "mcp-session-id, mcp-protocol-version");
res.setHeader("X-Accel-Buffering", "no");
res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
```

### 7. Raise the JSON body limit for bulk requests

Express defaults JSON parsing to `100kb`, which is too small for remote MCP calls that inline CSV/text payloads. The server now configures `express.json({ limit: "100mb" })` by default.

If your deployment needs a different ceiling, set `ANAPLAN_MCP_HTTP_BODY_LIMIT` (or `MCP_HTTP_BODY_LIMIT`) to any value accepted by Express/body-parser, such as `25mb` or `250mb`.

JSON parsing only happens after the outer bearer token has been validated, so unauthorized requests do not consume the full body-parser budget.

### 8. Handle both / and /mcp paths

Some clients connect to the root URL, others append `/mcp`. Register handlers on both paths to be safe.

### 9. Defer Anaplan auth to tool call time

Session initialization should still succeed before the user authorizes with Anaplan. The first tool call can surface the device-grant URL/code cleanly, and the retry completes with that session's own OAuth token:

```typescript
// Create a fresh AuthManager for each HTTP session
const mcpServer = createServer(AuthManager.fromRemoteHttpEnv());
```

## Platform notes

### Fly.io (recommended)

- Free tier: 3 shared VMs, 256MB RAM each
- Auto-stops after inactivity, auto-starts on request (~1-2s cold start)
- No Cloudflare in front -- direct connection
- Requires credit card for signup

### Render

- Free tier: 750 hours/month, no credit card required
- Cloudflare proxy in front -- may interfere with MCP connections
- 50+ second cold starts on free tier
- **Not recommended** for MCP servers due to proxy buffering issues

### Google Cloud Run

- Free tier: 2M requests/month
- Requires billing account (won't charge within free limits)
- Auto-scales to zero, fast cold starts

## Local testing

```bash
npm run dev:http  # Starts on http://localhost:3000/mcp
```

Test the handshake:

```bash
export ANAPLAN_CLIENT_ID=your-client-id
export ANAPLAN_MCP_HTTP_AUTH_TOKEN=your-outer-token
curl -X POST http://localhost:3000/mcp \
  -H "Authorization: Bearer $ANAPLAN_MCP_HTTP_AUTH_TOKEN" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json, text/event-stream" \
  -d '{"jsonrpc":"2.0","method":"initialize","params":{"protocolVersion":"2025-03-26","capabilities":{},"clientInfo":{"name":"test","version":"0.1"}},"id":1}'
```

## Troubleshooting

| Symptom | Cause | Fix |
|---------|-------|-----|
| HTTP process exits on startup | Missing `ANAPLAN_CLIENT_ID` or `ANAPLAN_MCP_HTTP_AUTH_TOKEN` | Configure both the Anaplan OAuth client and the outer bearer token for remote mode |
| "Couldn't reach the MCP server" | GET returns non-200 | Make GET /mcp return 200 without a session |
| "Couldn't reach" + no request logs | App bound to 127.0.0.1 | Bind to 0.0.0.0 |
| Session initializes but client fails | SSE response format | Set `enableJsonResponse: true` |
| Tool call asks user to authorize repeatedly | Session-scoped OAuth not yet completed | Open the Anaplan auth URL shown in the tool error, approve, then retry the same tool call |
| Intermittent failures | Platform cold starts | Use a health check ping or paid tier |
| Connection refused in platform logs | Wrong internal port | Match Dockerfile EXPOSE with fly.toml internal_port |
| Remote export/file download fails when saving locally | `saveToDownloads` used in HTTP mode | Use inline responses in HTTP mode; local file saves are available only in stdio mode |
