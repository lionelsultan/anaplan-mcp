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

Set your Anaplan credentials as environment variables in the Fly.io dashboard:

| Key | Value |
|-----|-------|
| `ANAPLAN_USERNAME` | your-anaplan-email@company.com |
| `ANAPLAN_PASSWORD` | your-anaplan-password |

Or use certificate/OAuth env vars instead (see main README for all auth options).

### 3. Connect from Claude Web

1. Go to **claude.ai** > **Settings** > **Integrations**
2. **Add Integration**
3. Set URL to: `https://your-app.fly.dev/mcp`
4. Leave OAuth fields blank (not required)
5. Start a new chat and try: "list my workspaces"

## Requirements for cloud deployment

These are **all required** for the server to work with remote MCP clients. Missing any one of them will cause "Couldn't reach the MCP server" errors.

### 1. Bind to 0.0.0.0

Express defaults to `127.0.0.1` (localhost only). Cloud platforms route traffic through reverse proxies that cannot reach localhost. The server must bind to all interfaces:

```typescript
app.listen(PORT, "0.0.0.0", () => { ... });
```

Without this, the platform logs will show: `instance refused connection. is your app listening on 0.0.0.0:8080?`

### 2. GET must return 200 for reachability checks

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

### 3. Enable JSON response mode

The `StreamableHTTPServerTransport` defaults to `text/event-stream` (SSE) responses. Remote MCP clients may not handle SSE. Enable JSON responses:

```typescript
new StreamableHTTPServerTransport({
  sessionIdGenerator: () => randomUUID(),
  enableJsonResponse: true,  // Returns application/json instead of SSE
});
```

### 4. Set CORS and anti-buffering headers

Cloud reverse proxies (Fly.io, Render, Cloudflare) buffer responses by default, which breaks streaming. Set these headers:

```typescript
res.setHeader("Access-Control-Allow-Origin", "*");
res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");
res.setHeader("Access-Control-Allow-Headers",
  "Content-Type, Accept, Authorization, mcp-session-id, mcp-protocol-version, Last-Event-ID");
res.setHeader("Access-Control-Expose-Headers", "mcp-session-id, mcp-protocol-version");
res.setHeader("X-Accel-Buffering", "no");
res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
```

### 5. Handle both / and /mcp paths

Some clients connect to the root URL, others append `/mcp`. Register handlers on both paths to be safe.

### 6. Defer auth to tool call time

Without per-user OAuth, the server starts without credentials and fails at tool call time with a clear error. This lets the MCP handshake succeed even if credentials aren't configured:

```typescript
// AuthManager.fromEnv() returns a deferred provider instead of throwing
// Error surfaces when a tool actually calls the Anaplan API
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
curl -X POST http://localhost:3000/mcp \
  -H "Content-Type: application/json" \
  -H "Accept: application/json, text/event-stream" \
  -d '{"jsonrpc":"2.0","method":"initialize","params":{"protocolVersion":"2025-03-26","capabilities":{},"clientInfo":{"name":"test","version":"0.1"}},"id":1}'
```

## Troubleshooting

| Symptom | Cause | Fix |
|---------|-------|-----|
| "Couldn't reach the MCP server" | GET returns non-200 | Make GET /mcp return 200 without a session |
| "Couldn't reach" + no request logs | App bound to 127.0.0.1 | Bind to 0.0.0.0 |
| Session initializes but client fails | SSE response format | Set `enableJsonResponse: true` |
| Intermittent failures | Platform cold starts | Use a health check ping or paid tier |
| Connection refused in platform logs | Wrong internal port | Match Dockerfile EXPOSE with fly.toml internal_port |
