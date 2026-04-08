import express from "express";
import { afterEach, describe, expect, it, vi } from "vitest";
import {
  createAuthorizedJsonBodyParser,
  extractHttpAccessToken,
  isHttpAccessAuthorized,
  loadHttpAuthConfig,
  loadHttpBodyLimit,
  loadHttpInlineDownloadLimit,
  createHttpApp,
  validateRemoteHttpEnv,
} from "./http.js";

describe("HTTP auth config", () => {
  afterEach(() => {
    delete process.env.ANAPLAN_CLIENT_ID;
    delete process.env.ANAPLAN_MCP_HTTP_AUTH_TOKEN;
    delete process.env.MCP_HTTP_AUTH_TOKEN;
    delete process.env.ANAPLAN_MCP_HTTP_BODY_LIMIT;
    delete process.env.MCP_HTTP_BODY_LIMIT;
    delete process.env.ANAPLAN_MCP_HTTP_INLINE_DOWNLOAD_LIMIT;
    vi.restoreAllMocks();
  });

  it("requires ANAPLAN_CLIENT_ID for remote session OAuth", () => {
    expect(() => validateRemoteHttpEnv({
      ANAPLAN_MCP_HTTP_AUTH_TOKEN: "outer-token",
    } as NodeJS.ProcessEnv))
      .toThrow("Remote HTTP mode requires ANAPLAN_CLIENT_ID");
  });

  it("requires ANAPLAN_MCP_HTTP_AUTH_TOKEN for remote HTTP access", () => {
    expect(() => validateRemoteHttpEnv({
      ANAPLAN_CLIENT_ID: "client-id",
    } as NodeJS.ProcessEnv))
      .toThrow("Remote HTTP mode requires ANAPLAN_MCP_HTTP_AUTH_TOKEN");
  });

  it("loads the bearer-token alias", () => {
    const config = loadHttpAuthConfig({
      MCP_HTTP_AUTH_TOKEN: "alias-token",
    } as NodeJS.ProcessEnv);

    expect(config).toEqual({
      bearerToken: "alias-token",
    });
  });

  it("defaults the HTTP body limit to 100mb", () => {
    expect(loadHttpBodyLimit({} as NodeJS.ProcessEnv)).toBe("100mb");
  });

  it("defaults the inline download limit to 10mb", () => {
    expect(loadHttpInlineDownloadLimit({} as NodeJS.ProcessEnv)).toBe(10 * 1024 * 1024);
  });

  it("parses the inline download limit from env", () => {
    expect(loadHttpInlineDownloadLimit({
      ANAPLAN_MCP_HTTP_INLINE_DOWNLOAD_LIMIT: "12mb",
    } as NodeJS.ProcessEnv)).toBe(12 * 1024 * 1024);
  });

  it("loads the HTTP body limit from env aliases", () => {
    expect(loadHttpBodyLimit({
      MCP_HTTP_BODY_LIMIT: "25mb",
    } as NodeJS.ProcessEnv)).toBe("25mb");
  });

  it("configures express.json with the resolved HTTP body limit", () => {
    process.env.ANAPLAN_CLIENT_ID = "client-id";
    process.env.ANAPLAN_MCP_HTTP_AUTH_TOKEN = "outer-token";
    process.env.ANAPLAN_MCP_HTTP_BODY_LIMIT = "32mb";

    const jsonMiddleware = (_req: unknown, _res: unknown, next: () => void) => next();
    const jsonSpy = vi.spyOn(express, "json").mockReturnValue(jsonMiddleware as never);

    createHttpApp();

    expect(jsonSpy).toHaveBeenCalledWith({ limit: "32mb" });
  });
});

describe("HTTP access token parsing", () => {
  it("extracts a bearer token from the Authorization header", () => {
    expect(extractHttpAccessToken({
      authorization: "Bearer secret-token",
    })).toBe("secret-token");
  });

  it("falls back to X-MCP-API-Key", () => {
    expect(extractHttpAccessToken({
      xMcpApiKey: "secret-token",
    })).toBe("secret-token");
  });

  it("falls back to X-API-Key", () => {
    expect(extractHttpAccessToken({
      xApiKey: "secret-token",
    })).toBe("secret-token");
  });

  it("returns null for unsupported auth headers", () => {
    expect(extractHttpAccessToken({
      authorization: "Basic abc123",
    })).toBeNull();
  });
});

describe("HTTP access authorization", () => {
  const config = { bearerToken: "secret-token" };

  it("rejects requests without the configured outer token", () => {
    expect(isHttpAccessAuthorized({}, config)).toBe(false);
  });

  it("rejects requests with the wrong bearer token", () => {
    expect(isHttpAccessAuthorized({
      authorization: "Bearer wrong-token",
    }, config)).toBe(false);
  });

  it("accepts the correct bearer token", () => {
    expect(isHttpAccessAuthorized({
      authorization: "Bearer secret-token",
    }, config)).toBe(true);
  });

  it("accepts X-MCP-API-Key as an alternative header", () => {
    expect(isHttpAccessAuthorized({
      xMcpApiKey: "secret-token",
    }, config)).toBe(true);
  });

  it("allows access when no outer bearer token is configured", () => {
    expect(isHttpAccessAuthorized({}, { bearerToken: null })).toBe(true);
  });
});

describe("HTTP request handling", () => {
  afterEach(() => {
    delete process.env.ANAPLAN_CLIENT_ID;
    delete process.env.ANAPLAN_MCP_HTTP_AUTH_TOKEN;
    vi.restoreAllMocks();
  });

  it("rejects unauthorized POST requests before invoking JSON parsing", () => {
    let parserCalls = 0;
    const parser = createAuthorizedJsonBodyParser(
      { bearerToken: "outer-token" },
      ((_req, _res, next) => {
        parserCalls += 1;
        next();
      }) as express.RequestHandler,
    );

    const req = {
      header: (name: string) => {
        if (name.toLowerCase() === "authorization") return undefined;
        return undefined;
      },
    } as express.Request;
    const status = vi.fn().mockReturnThis();
    const json = vi.fn().mockReturnThis();
    const setHeader = vi.fn();
    const res = { status, json, setHeader } as unknown as express.Response;
    const next = vi.fn();

    parser(req, res, next);

    expect(setHeader).toHaveBeenCalledWith("WWW-Authenticate", 'Bearer realm="anaplan-mcp"');
    expect(status).toHaveBeenCalledWith(401);
    expect(json).toHaveBeenCalled();
    expect(parserCalls).toBe(0);
    expect(next).not.toHaveBeenCalled();
  });
});
