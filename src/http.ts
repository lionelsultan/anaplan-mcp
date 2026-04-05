#!/usr/bin/env node

import { randomUUID } from "node:crypto";
import express from "express";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { isInitializeRequest } from "@modelcontextprotocol/sdk/types.js";
import { createServer } from "./server.js";

const PORT = parseInt(process.env.PORT || process.env.MCP_PORT || "3000", 10);

const transports: Record<string, StreamableHTTPServerTransport> = {};

const app = express();
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.post("/mcp", async (req, res) => {
  const sessionId = req.headers["mcp-session-id"] as string | undefined;
  console.error(`[${new Date().toISOString()}] POST /mcp session=${sessionId ?? "none"}`);

  try {
    let transport: StreamableHTTPServerTransport;

    if (sessionId && transports[sessionId]) {
      transport = transports[sessionId];
    } else if (!sessionId && isInitializeRequest(req.body)) {
      transport = new StreamableHTTPServerTransport({
        sessionIdGenerator: () => randomUUID(),
        onsessioninitialized: (sid) => {
          console.error(`[${new Date().toISOString()}] Session initialized: ${sid}`);
          transports[sid] = transport;
        },
      });
      transport.onclose = () => {
        const sid = transport.sessionId;
        if (sid) {
          console.error(`[${new Date().toISOString()}] Session closed: ${sid}`);
          delete transports[sid];
        }
      };
      const mcpServer = createServer();
      await mcpServer.connect(transport);
      await transport.handleRequest(req, res, req.body);
      return;
    } else {
      res.status(400).json({
        jsonrpc: "2.0",
        error: { code: -32000, message: "Bad Request: no valid session" },
        id: null,
      });
      return;
    }
    await transport.handleRequest(req, res, req.body);
  } catch (err) {
    console.error("Error handling POST /mcp:", err);
    if (!res.headersSent) {
      res.status(500).json({
        jsonrpc: "2.0",
        error: { code: -32603, message: "Internal server error" },
        id: null,
      });
    }
  }
});

app.get("/mcp", async (req, res) => {
  const sessionId = req.headers["mcp-session-id"] as string | undefined;
  console.error(`[${new Date().toISOString()}] GET /mcp session=${sessionId ?? "none"}`);

  if (!sessionId || !transports[sessionId]) {
    res.status(400).send("Invalid or missing session ID");
    return;
  }
  await transports[sessionId].handleRequest(req, res);
});

app.delete("/mcp", async (req, res) => {
  const sessionId = req.headers["mcp-session-id"] as string | undefined;
  console.error(`[${new Date().toISOString()}] DELETE /mcp session=${sessionId ?? "none"}`);

  if (!sessionId || !transports[sessionId]) {
    res.status(400).send("Invalid or missing session ID");
    return;
  }
  await transports[sessionId].handleRequest(req, res);
});

app.listen(PORT, () => {
  console.error(`Anaplan MCP server running on http://localhost:${PORT}/mcp`);
});
