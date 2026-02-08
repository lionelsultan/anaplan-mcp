import { describe, it, expect, vi, beforeEach } from "vitest";
import { ImportsApi } from "./imports.js";

const mockClient = {
  get: vi.fn(),
  getAll: vi.fn(),
  post: vi.fn(),
  put: vi.fn(),
  delete: vi.fn(),
  getRaw: vi.fn(),
};

describe("ImportsApi", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    mockClient.get.mockReset();
    mockClient.getAll.mockReset();
    mockClient.delete.mockReset();
    mockClient.getRaw.mockReset();
  });

  it("list() calls getAll with correct path", async () => {
    mockClient.getAll.mockResolvedValue([{ id: "i1", name: "Import Data" }]);
    const api = new ImportsApi(mockClient as any);

    const result = await api.list("ws1", "m1");

    expect(mockClient.getAll).toHaveBeenCalledWith(
      "/workspaces/ws1/models/m1/imports",
      "imports"
    );
    expect(result).toEqual([{ id: "i1", name: "Import Data" }]);
  });

  it("get() calls GET /workspaces/{wId}/models/{mId}/imports/{importId}", async () => {
    mockClient.get.mockResolvedValue({
      import: { id: "i1", name: "Import Data", importType: "MODULE_DATA" },
    });
    const api = new ImportsApi(mockClient as any);

    const result = await api.get("ws1", "m1", "i1");

    expect(mockClient.get).toHaveBeenCalledWith(
      "/workspaces/ws1/models/m1/imports/i1"
    );
    expect(result.importType).toBe("MODULE_DATA");
  });

  it("get() unwraps when no import key", async () => {
    mockClient.get.mockResolvedValue({ id: "i1", name: "Direct" });
    const api = new ImportsApi(mockClient as any);

    const result = await api.get("ws1", "m1", "i1");
    expect(result.name).toBe("Direct");
  });


  it("listTasks() calls GET /workspaces/{wId}/models/{mId}/imports/{iId}/tasks", async () => {
    mockClient.get.mockResolvedValue({ tasks: [{ taskId: "t1", taskState: "COMPLETE" }] });
    const api = new ImportsApi(mockClient as any);
    const result = await api.listTasks("ws1", "m1", "i1");
    expect(mockClient.get).toHaveBeenCalledWith("/workspaces/ws1/models/m1/imports/i1/tasks");
    expect(result).toHaveLength(1);
    expect(result[0].taskId).toBe("t1");
  });

  it("cancelTask() calls DELETE on task path", async () => {
    mockClient.delete.mockResolvedValue({});
    const api = new ImportsApi(mockClient as any);
    await api.cancelTask("ws1", "m1", "i1", "t1");
    expect(mockClient.delete).toHaveBeenCalledWith("/workspaces/ws1/models/m1/imports/i1/tasks/t1");
  });

  it("getDumpChunks() calls GET on dump/chunks path", async () => {
    mockClient.get.mockResolvedValue({ chunks: [{ id: "0", name: "Chunk 0" }, { id: "1", name: "Chunk 1" }] });
    const api = new ImportsApi(mockClient as any);
    const result = await api.getDumpChunks("ws1", "m1", "i1", "t1");
    expect(mockClient.get).toHaveBeenCalledWith("/workspaces/ws1/models/m1/imports/i1/tasks/t1/dump/chunks");
    expect(result).toHaveLength(2);
  });

  it("getDumpChunkData() calls getRaw on chunk path", async () => {
    mockClient.getRaw.mockResolvedValue('"_Status_","Col1"\n"E","Bad data"\n');
    const api = new ImportsApi(mockClient as any);
    const result = await api.getDumpChunkData("ws1", "m1", "i1", "t1", "0");
    expect(mockClient.getRaw).toHaveBeenCalledWith("/workspaces/ws1/models/m1/imports/i1/tasks/t1/dump/chunks/0");
    expect(result).toContain("Bad data");
  });

});
