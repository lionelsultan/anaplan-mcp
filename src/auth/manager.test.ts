import fs from "node:fs";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { AuthManager } from "./manager.js";

describe("AuthManager", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    vi.spyOn(fs, "readFileSync").mockImplementation(() => { throw new Error("ENOENT"); });
    vi.spyOn(fs, "writeFileSync").mockImplementation(() => {});
    vi.spyOn(fs, "mkdirSync").mockImplementation(() => undefined);
    delete process.env.ANAPLAN_USERNAME;
    delete process.env.ANAPLAN_PASSWORD;
    delete process.env.ANAPLAN_CLIENT_ID;
    delete process.env.ANAPLAN_CLIENT_SECRET;
    delete process.env.ANAPLAN_CERTIFICATE_PATH;
    delete process.env.ANAPLAN_PRIVATE_KEY_PATH;
    delete process.env.ANAPLAN_CERTIFICATE_ENCODED_DATA_FORMAT;
    delete process.env.ANAPLAN_OAUTH_AUTHORIZATION_CODE;
    delete process.env.ANAPLAN_OAUTH_REDIRECT_URI;
    delete process.env.ANAPLAN_REFRESH_TOKEN;
  });

  it("returns deferred provider when no credentials are configured", async () => {
    const manager = AuthManager.fromEnv();
    expect(manager.getProviderType()).toBe("none");
    await expect(manager.getAuthHeaders()).rejects.toThrow("No Anaplan credentials");
  });

  it("selects basic auth when username/password are set", () => {
    process.env.ANAPLAN_USERNAME = "user";
    process.env.ANAPLAN_PASSWORD = "pass";
    const manager = AuthManager.fromEnv();
    expect(manager).toBeInstanceOf(AuthManager);
  });

  it("prefers certificate over basic when both are set", () => {
    process.env.ANAPLAN_USERNAME = "user";
    process.env.ANAPLAN_PASSWORD = "pass";
    process.env.ANAPLAN_CERTIFICATE_PATH = "/cert.pem";
    process.env.ANAPLAN_PRIVATE_KEY_PATH = "/key.pem";
    const manager = AuthManager.fromEnv();
    expect(manager.getProviderType()).toBe("certificate");
  });

  it("throws on invalid certificate encoded data format", () => {
    process.env.ANAPLAN_CERTIFICATE_PATH = "/cert.pem";
    process.env.ANAPLAN_PRIVATE_KEY_PATH = "/key.pem";
    process.env.ANAPLAN_CERTIFICATE_ENCODED_DATA_FORMAT = "v3";
    expect(() => AuthManager.fromEnv()).toThrow("encoded data format");
  });

  it("selects oauth with authorization code grant when all env vars set", () => {
    process.env.ANAPLAN_CLIENT_ID = "cid";
    process.env.ANAPLAN_CLIENT_SECRET = "csecret";
    process.env.ANAPLAN_OAUTH_AUTHORIZATION_CODE = "authcode";
    process.env.ANAPLAN_OAUTH_REDIRECT_URI = "https://example.com/callback";
    const manager = AuthManager.fromEnv();
    expect(manager.getProviderType()).toBe("oauth");
  });

  it("selects oauth device grant when only client_id is set", () => {
    process.env.ANAPLAN_CLIENT_ID = "cid";
    const manager = AuthManager.fromEnv();
    expect(manager.getProviderType()).toBe("oauth");
  });

  it("reads cached refresh token from disk when ANAPLAN_REFRESH_TOKEN is not set", async () => {
    process.env.ANAPLAN_CLIENT_ID = "cid";
    vi.mocked(fs.readFileSync).mockReturnValueOnce("cached-refresh-token" as unknown as Buffer);

    vi.spyOn(globalThis, "fetch").mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        access_token: "bearer-token",
        token_type: "Bearer",
        expires_in: 2100,
        refresh_token: "new-refresh",
      }),
    } as Response);

    const manager = AuthManager.fromEnv();
    const headers = await manager.getAuthHeaders();
    expect(headers.Authorization).toBe("Bearer bearer-token");
  });

  it("writes refresh token to cache after successful OAuth auth", async () => {
    process.env.ANAPLAN_CLIENT_ID = "cid";
    process.env.ANAPLAN_REFRESH_TOKEN = "stored-refresh";

    vi.spyOn(globalThis, "fetch").mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        access_token: "bearer-token",
        token_type: "Bearer",
        expires_in: 2100,
        refresh_token: "new-refresh",
      }),
    } as Response);

    const manager = AuthManager.fromEnv();
    await manager.getAuthHeaders();
    expect(fs.writeFileSync).toHaveBeenCalledWith(
      expect.stringContaining("oauth-token"),
      "new-refresh",
      { mode: 0o600 }
    );
  });

  it("uses ANAPLAN_REFRESH_TOKEN to skip device grant on first auth call", async () => {
    process.env.ANAPLAN_CLIENT_ID = "cid";
    process.env.ANAPLAN_REFRESH_TOKEN = "stored-refresh";

    vi.spyOn(globalThis, "fetch").mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        access_token: "bearer-token",
        token_type: "Bearer",
        expires_in: 2100,
        refresh_token: "new-refresh",
      }),
    } as Response);

    const manager = AuthManager.fromEnv();
    expect(manager.getProviderType()).toBe("oauth");
    const headers = await manager.getAuthHeaders();
    expect(headers.Authorization).toBe("Bearer bearer-token");
  });

  it("returns auth headers with token after authenticate", async () => {
    process.env.ANAPLAN_USERNAME = "user";
    process.env.ANAPLAN_PASSWORD = "pass";

    vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: true,
      json: async () => ({
        status: "SUCCESS",
        tokenInfo: {
          tokenId: "tid",
          tokenValue: "mytoken",
          expiresAt: Date.now() + 2100000,
          refreshTokenId: "rid",
        },
      }),
    } as Response);

    const manager = AuthManager.fromEnv();
    const headers = await manager.getAuthHeaders();
    expect(headers.Authorization).toBe("AnaplanAuthToken mytoken");
  });

  it("refreshes token when close to expiry", async () => {
    process.env.ANAPLAN_USERNAME = "user";
    process.env.ANAPLAN_PASSWORD = "pass";

    let callCount = 0;
    vi.spyOn(globalThis, "fetch").mockImplementation(async () => {
      callCount++;
      return {
        ok: true,
        json: async () => ({
          status: "SUCCESS",
          tokenInfo: {
            tokenId: `tid${callCount}`,
            tokenValue: callCount === 1 ? "original" : "refreshed",
            expiresAt: callCount === 1 ? Date.now() - 1000 : Date.now() + 2100000,
            refreshTokenId: `rid${callCount}`,
          },
        }),
      } as Response;
    });

    const manager = AuthManager.fromEnv();
    await manager.getAuthHeaders();
    const headers = await manager.getAuthHeaders();
    expect(headers.Authorization).toBe("AnaplanAuthToken refreshed");
  });
});
