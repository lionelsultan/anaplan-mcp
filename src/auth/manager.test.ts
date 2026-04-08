import { beforeEach, describe, expect, it, vi } from "vitest";
import { AuthManager } from "./manager.js";

describe("AuthManager", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    delete process.env.ANAPLAN_CLIENT_ID;
  });

  it("returns deferred provider when no client ID is configured", async () => {
    const manager = AuthManager.fromEnv();
    expect(manager.getProviderType()).toBe("none");
    await expect(manager.getAuthHeaders()).rejects.toThrow("No Anaplan OAuth client configured");
  });

  it("selects oauth device grant when ANAPLAN_CLIENT_ID is set", () => {
    process.env.ANAPLAN_CLIENT_ID = "cid";
    const manager = AuthManager.fromEnv();
    expect(manager.getProviderType()).toBe("oauth");
  });

  it("trims ANAPLAN_CLIENT_ID before selecting oauth", () => {
    process.env.ANAPLAN_CLIENT_ID = "  cid  ";
    const manager = AuthManager.fromEnv();
    expect(manager.getProviderType()).toBe("oauth");
  });

  it("builds remote HTTP auth from ANAPLAN_CLIENT_ID", () => {
    process.env.ANAPLAN_CLIENT_ID = "cid";
    const manager = AuthManager.fromRemoteHttpEnv();
    expect(manager.getProviderType()).toBe("oauth");
  });

  it("throws when remote HTTP auth is missing ANAPLAN_CLIENT_ID", () => {
    expect(() => AuthManager.fromRemoteHttpEnv()).toThrow("Remote HTTP mode requires ANAPLAN_CLIENT_ID");
  });

  it("returns bearer auth headers after device grant completes", async () => {
    process.env.ANAPLAN_CLIENT_ID = "cid";

    vi.spyOn(globalThis, "fetch")
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          device_code: "dc",
          user_code: "ABCD-1234",
          verification_uri: "https://example.com/device",
          expires_in: 300,
          interval: 5,
        }),
      } as Response)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          access_token: "bearer-token",
          token_type: "Bearer",
          expires_in: 2100,
          refresh_token: "new-refresh",
        }),
      } as Response);

    const manager = AuthManager.fromEnv();
    await expect(manager.getAuthHeaders()).rejects.toThrow("Anaplan authorization required");
    const headers = await manager.getAuthHeaders();
    expect(headers.Authorization).toBe("Bearer bearer-token");
  });

  it("refreshes the existing oauth token when close to expiry", async () => {
    process.env.ANAPLAN_CLIENT_ID = "cid";

    let callCount = 0;
    vi.spyOn(globalThis, "fetch").mockImplementation(async () => {
      callCount++;
      if (callCount === 1) {
        return {
          ok: true,
          json: async () => ({
            device_code: "dc",
            user_code: "ABCD-1234",
            verification_uri: "https://example.com/device",
            expires_in: 300,
            interval: 5,
          }),
        } as Response;
      }
      if (callCount === 2) {
        return {
          ok: true,
          json: async () => ({
            access_token: "original",
            token_type: "Bearer",
            expires_in: 2100,
            refresh_token: "refresh-1",
          }),
        } as Response;
      }
      return {
        ok: true,
        json: async () => ({
          access_token: "refreshed",
          token_type: "Bearer",
          expires_in: 2100,
          refresh_token: "refresh-2",
        }),
      } as Response;
    });

    const manager = AuthManager.fromEnv();
    await expect(manager.getAuthHeaders()).rejects.toThrow("Anaplan authorization required");
    await manager.getAuthHeaders();

    vi.spyOn(Date, "now").mockReturnValue(Date.now() + 31 * 60 * 1000);

    const headers = await manager.getAuthHeaders();
    expect(headers.Authorization).toBe("Bearer refreshed");
  });

  it("forces re-auth via device grant after 60 min OAuth inactivity", async () => {
    process.env.ANAPLAN_CLIENT_ID = "cid";

    const fetchSpy = vi.spyOn(globalThis, "fetch");
    fetchSpy
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          device_code: "dc",
          user_code: "ABCD-1234",
          verification_uri: "https://example.com/device",
          expires_in: 300,
          interval: 5,
        }),
      } as Response)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          access_token: "bearer-token",
          token_type: "Bearer",
          expires_in: 7200,
          refresh_token: "new-refresh",
        }),
      } as Response)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          device_code: "dc-2",
          user_code: "WXYZ-9999",
          verification_uri: "https://example.com/device",
          expires_in: 300,
          interval: 5,
        }),
      } as Response);

    const manager = AuthManager.fromEnv();
    await expect(manager.getAuthHeaders()).rejects.toThrow("Anaplan authorization required");
    await manager.getAuthHeaders();

    vi.spyOn(Date, "now").mockReturnValue(Date.now() + 61 * 60 * 1000);

    await expect(manager.getAuthHeaders()).rejects.toThrow("Anaplan authorization required");
  });

  it("does not force re-auth when OAuth is used within 60 min", async () => {
    process.env.ANAPLAN_CLIENT_ID = "cid";

    vi.spyOn(globalThis, "fetch")
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          device_code: "dc",
          user_code: "ABCD-1234",
          verification_uri: "https://example.com/device",
          expires_in: 300,
          interval: 5,
        }),
      } as Response)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          access_token: "bearer-token",
          token_type: "Bearer",
          expires_in: 7200,
          refresh_token: "new-refresh",
        }),
      } as Response);

    const manager = AuthManager.fromEnv();
    await expect(manager.getAuthHeaders()).rejects.toThrow("Anaplan authorization required");
    await manager.getAuthHeaders();

    vi.spyOn(Date, "now").mockReturnValue(Date.now() + 30 * 60 * 1000);

    const headers = await manager.getAuthHeaders();
    expect(headers.Authorization).toBe("Bearer bearer-token");
  });
});
