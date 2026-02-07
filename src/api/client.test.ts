import { describe, it, expect, vi, beforeEach } from "vitest";
import { AnaplanClient } from "./client.js";

const mockAuthManager = {
  getAuthHeaders: vi.fn().mockResolvedValue({ Authorization: "AnaplanAuthToken test" }),
};

describe("AnaplanClient", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    mockAuthManager.getAuthHeaders.mockResolvedValue({ Authorization: "AnaplanAuthToken test" });
  });

  it("makes GET request with auth headers to correct URL", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({ workspaces: [] }),
    } as Response);

    const client = new AnaplanClient(mockAuthManager as any);
    const result = await client.get("/workspaces");

    expect(fetch).toHaveBeenCalledWith(
      "https://api.anaplan.com/2/0/workspaces",
      expect.objectContaining({
        method: "GET",
        headers: expect.objectContaining({ Authorization: "AnaplanAuthToken test" }),
      })
    );
    expect(result).toEqual({ workspaces: [] });
  });

  it("retries on 429 with backoff", async () => {
    const fetchSpy = vi.spyOn(globalThis, "fetch")
      .mockResolvedValueOnce({ ok: false, status: 429, headers: new Headers({ "Retry-After": "0" }), json: async () => ({}) } as Response)
      .mockResolvedValueOnce({ ok: true, status: 200, json: async () => ({ ok: true }) } as Response);

    const client = new AnaplanClient(mockAuthManager as any);
    const result = await client.get("/test");

    expect(fetchSpy).toHaveBeenCalledTimes(2);
    expect(result).toEqual({ ok: true });
  });

  it("retries on 5xx errors up to 3 times", async () => {
    const fetchSpy = vi.spyOn(globalThis, "fetch")
      .mockResolvedValueOnce({ ok: false, status: 500, json: async () => ({ message: "fail" }) } as Response)
      .mockResolvedValueOnce({ ok: false, status: 503, json: async () => ({ message: "fail" }) } as Response)
      .mockResolvedValueOnce({ ok: true, status: 200, json: async () => ({ ok: true }) } as Response);

    const client = new AnaplanClient(mockAuthManager as any);
    const result = await client.get("/test");

    expect(fetchSpy).toHaveBeenCalledTimes(3);
    expect(result).toEqual({ ok: true });
  }, 15000);

  it("throws after max retries", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: false,
      status: 500,
      json: async () => ({ message: "server error" }),
    } as Response);

    const client = new AnaplanClient(mockAuthManager as any);
    await expect(client.get("/test")).rejects.toThrow();
  }, 30000);

  it("makes POST request with JSON body", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({ task: { taskId: "t1" } }),
    } as Response);

    const client = new AnaplanClient(mockAuthManager as any);
    const result = await client.post("/actions", { localeName: "en_US" });

    expect(fetch).toHaveBeenCalledWith(
      "https://api.anaplan.com/2/0/actions",
      expect.objectContaining({
        method: "POST",
        body: JSON.stringify({ localeName: "en_US" }),
      })
    );
  });
});
