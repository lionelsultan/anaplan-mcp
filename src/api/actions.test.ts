import { describe, it, expect, vi, beforeEach } from "vitest";
import { ActionsApi } from "./actions.js";

const mockClient = {
  get: vi.fn(),
  getAll: vi.fn(),
  post: vi.fn(),
  put: vi.fn(),
  delete: vi.fn(),
};

describe("ActionsApi", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    mockClient.getAll.mockReset();
  });

  it("calls getAll with correct path and key", async () => {
    mockClient.getAll.mockResolvedValue([
      { id: "act1", name: "Delete Old Data", actionType: "DELETE" },
    ]);
    const api = new ActionsApi(mockClient as any);

    const result = await api.list("ws1", "m1");

    expect(mockClient.getAll).toHaveBeenCalledWith(
      "/workspaces/ws1/models/m1/actions",
      "actions"
    );
    expect(result).toEqual([
      { id: "act1", name: "Delete Old Data", actionType: "DELETE" },
    ]);
  });

  it("returns empty array when no actions exist", async () => {
    mockClient.getAll.mockResolvedValue([]);
    const api = new ActionsApi(mockClient as any);

    const result = await api.list("ws1", "m1");
    expect(result).toEqual([]);
  });
});
