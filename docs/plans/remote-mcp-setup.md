# Using Anaplan MCP with Browser-Based AI (claude.ai, ChatGPT)

This server uses **stdio transport** - it runs as a local subprocess. Browser-based AI clients like claude.ai and ChatGPT require **remote MCP servers** accessible over HTTP. To bridge the gap, you need a proxy that exposes the stdio server as an HTTP endpoint.

## Overview

```
┌─────────────┐     HTTPS      ┌───────────────┐     stdio     ┌─────────────────┐
│  claude.ai  │ ──────────────▶│  MCP Proxy    │ ─────────────▶│  anaplan-mcp    │
│  or ChatGPT │                │  (supergateway│               │  (this server)  │
└─────────────┘                │   or mcp-proxy)│               └─────────────────┘
                               └───────────────┘
```

## Step 1: Set Up a Proxy

You need a tool that wraps the stdio server into an HTTP endpoint. Two popular options:

### Option A: supergateway (Node.js)

No install needed - runs via npx.

**Streamable HTTP (recommended):**

```bash
npx -y supergateway \
  --stdio "node /absolute/path/to/anaplan-mcp/dist/index.js" \
  --outputTransport streamableHttp \
  --port 8000
```

Endpoint: `http://localhost:8000/mcp`

**SSE:**

```bash
npx -y supergateway \
  --stdio "node /absolute/path/to/anaplan-mcp/dist/index.js" \
  --port 8000 \
  --ssePath /sse --messagePath /message
```

Endpoint: `http://localhost:8000/sse`

> **Environment variables:** Anaplan credentials must be set in your shell before running the proxy (e.g. `export ANAPLAN_USERNAME=...` and `export ANAPLAN_PASSWORD=...`), since the proxy spawns the server as a subprocess that inherits your shell environment.

### Option B: mcp-proxy (Python)

Install first:

```bash
# via uv (recommended)
uv tool install mcp-proxy

# or via pipx
pipx install mcp-proxy
```

Run:

```bash
mcp-proxy --port 8000 node /absolute/path/to/anaplan-mcp/dist/index.js
```

Endpoint: `http://127.0.0.1:8000/sse`

Pass environment variables with `--pass-environment` (inherits all) or `--env KEY VALUE` for specific ones:

```bash
mcp-proxy --port 8000 \
  --pass-environment \
  node /absolute/path/to/anaplan-mcp/dist/index.js
```

## Step 2: Make It Accessible

The proxy runs on `localhost` by default. For browser-based AI to reach it, you have two options:

1. **Tunnel (easiest for testing):** Use a tool like [ngrok](https://ngrok.com), [Cloudflare Tunnel](https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/), or [localhost.run](https://localhost.run) to expose your local port over HTTPS.

   ```bash
   # Example with ngrok
   ngrok http 8000
   # Gives you a URL like https://abc123.ngrok.io
   ```

2. **Deploy to a server:** Run the proxy on a cloud VM or container with a public HTTPS endpoint.

> **Security:** Anyone with the URL can access your Anaplan data through the proxy. Use authentication (OAuth) and/or restrict access. Do not expose an unauthenticated proxy to the public internet with production credentials.

## Step 3: Connect to claude.ai

**Requirements:** Pro, Max, Team, or Enterprise plan.

1. Go to [claude.ai](https://claude.ai)
2. Open **Settings** (click your profile icon)
3. Go to **Connectors**
4. Click **Add custom connector** at the bottom
5. Enter your proxy's public URL (e.g. `https://abc123.ngrok.io/mcp` or `https://abc123.ngrok.io/sse`)
6. If your proxy requires authentication, click **Advanced settings** and enter OAuth credentials
7. Click **Add**

The Anaplan tools should now appear in your claude.ai conversations.

## Step 4: Connect to ChatGPT

**Requirements:** Pro, Plus, Business, Enterprise, or Edu plan.

1. Go to [chatgpt.com](https://chatgpt.com)
2. Open **Settings**
3. Go to **Connectors** > **Advanced**
4. Enable **Developer mode**
5. Go back to **Connectors** and click **Create**
6. Fill in:
   - **Name:** Anaplan MCP
   - **Description:** Connect to Anaplan workspaces, models, and data
   - **MCP Server URL:** Your proxy's public URL
   - **Authentication:** Set to OAuth if your proxy requires it, or None for testing
7. Click **Create**
8. In a new chat, the connector must be enabled for each conversation via Developer Mode

## Troubleshooting

- **Tools not showing up:** Make sure `npm run build` was run before starting the proxy. The proxy launches `dist/index.js` which must be up to date.
- **Connection refused:** Check that the proxy is running and the port matches. Test locally first: `curl http://localhost:8000/mcp` (Streamable HTTP) or `curl http://localhost:8000/sse` (SSE).
- **Auth errors from Anaplan:** Verify your environment variables are set in the shell where the proxy runs. Try running the server directly first (`node dist/index.js`) to confirm credentials work.
- **Tunnel URL changed:** Free ngrok URLs change on restart. Update the connector URL in claude.ai/ChatGPT settings each time, or use a paid plan with a stable subdomain.

## References

- [supergateway](https://github.com/supercorp-ai/supergateway) - Node.js stdio-to-HTTP proxy
- [mcp-proxy](https://github.com/sparfenyuk/mcp-proxy) - Python stdio-to-HTTP proxy
- [Claude.ai Remote MCP Connectors](https://support.claude.com/en/articles/11503834-building-custom-connectors-via-remote-mcp-servers)
- [ChatGPT Developer Mode and MCP](https://help.openai.com/en/articles/12584461-developer-mode-apps-and-full-mcp-connectors-in-chatgpt-beta)
- [MCP Transports Specification](https://modelcontextprotocol.io/specification/2025-03-26/basic/transports)
