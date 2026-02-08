import { describe, it, expect, vi, beforeEach } from "vitest";
import { VersionsApi } from "./versions.js";

const mockClient = {
  get: vi.fn(),
  getAll: vi.fn(),
  post: vi.fn(),
  put: vi.fn(),
  delete: vi.fn(),
};

describe("VersionsApi", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    mockClient.get.mockReset();
    mockClient.put.mockReset();
  });

  it("list() calls GET /models/{mId}/versions and returns versions array", async () => {
    mockClient.get.mockResolvedValue({
      versions: [
        { id: "v1", name: "Actual", switchoverDate: "2024-01-01" },
        { id: "v2", name: "Forecast", switchoverDate: "" },
      ],
    });
    const api = new VersionsApi(mockClient as any);

    const result = await api.list("m1");

    expect(mockClient.get).toHaveBeenCalledWith("/models/m1/versions");
    expect(result).toEqual([
      { id: "v1", name: "Actual", switchoverDate: "2024-01-01" },
      { id: "v2", name: "Forecast", switchoverDate: "" },
    ]);
  });

  it("list() returns empty array when no versions key", async () => {
    mockClient.get.mockResolvedValue({});
    const api = new VersionsApi(mockClient as any);

    const result = await api.list("m1");
    expect(result).toEqual([]);
  });

  it("list() supports versionMetadata response shape", async () => {
    mockClient.get.mockResolvedValue({
      versionMetadata: [
        { id: "v1", name: "Actual", isActual: true },
      ],
    });
    const api = new VersionsApi(mockClient as any);

    const result = await api.list("m1");

    expect(result).toEqual([
      { id: "v1", name: "Actual", isActual: true },
    ]);
  });

  it("setSwitchover() calls PUT /models/{mId}/versions/{vId}/switchover with { date } body", async () => {
    mockClient.put.mockResolvedValue({ status: { code: 200, message: "Success" } });
    const api = new VersionsApi(mockClient as any);

    const result = await api.setSwitchover("m1", "v1", "2024-06-01");

    expect(mockClient.put).toHaveBeenCalledWith(
      "/models/m1/versions/v1/switchover",
      { date: "2024-06-01" }
    );
    expect(result).toEqual({ status: { code: 200, message: "Success" } });
  });

  it("setSwitchover() resets with empty string", async () => {
    mockClient.put.mockResolvedValue({ status: { code: 200, message: "Success" } });
    const api = new VersionsApi(mockClient as any);

    await api.setSwitchover("m1", "v1", "");

    expect(mockClient.put).toHaveBeenCalledWith(
      "/models/m1/versions/v1/switchover",
      { date: "" }
    );
  });
});
