import { describe, it, expect, vi, beforeEach } from "vitest";
import { FilesApi } from "./files.js";

const mockClient = {
  get: vi.fn(),
  getAll: vi.fn(),
  post: vi.fn(),
  put: vi.fn(),
  delete: vi.fn(),
  getRawBytes: vi.fn(),
  uploadChunked: vi.fn(),
};

describe("FilesApi", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    mockClient.get.mockReset();
    mockClient.getRawBytes.mockReset();
  });

  describe("download", () => {
    it("fetches chunk list then each chunk's data and concatenates", async () => {
      mockClient.get.mockResolvedValue({
        chunks: [
          { id: "0", name: "chunk0" },
          { id: "1", name: "chunk1" },
        ],
      });
      mockClient.getRawBytes
        .mockResolvedValueOnce(Buffer.from("Header,Col1\n", "utf8"))
        .mockResolvedValueOnce(Buffer.from("Row1,Val1\n", "utf8"));

      const api = new FilesApi(mockClient as any);
      const result = await api.download("ws1", "m1", "f1");

      expect(result.equals(Buffer.from("Header,Col1\nRow1,Val1\n", "utf8"))).toBe(true);
      expect(mockClient.get).toHaveBeenCalledWith(
        "/workspaces/ws1/models/m1/files/f1/chunks"
      );
      expect(mockClient.getRawBytes).toHaveBeenCalledWith(
        "/workspaces/ws1/models/m1/files/f1/chunks/0"
      );
      expect(mockClient.getRawBytes).toHaveBeenCalledWith(
        "/workspaces/ws1/models/m1/files/f1/chunks/1"
      );
    });

    it("returns empty string when file has no chunks", async () => {
      mockClient.get.mockResolvedValue({});

      const api = new FilesApi(mockClient as any);
      const result = await api.download("ws1", "m1", "f1");

      expect(result.equals(Buffer.alloc(0))).toBe(true);
      expect(mockClient.getRawBytes).not.toHaveBeenCalled();
    });

    it("handles single chunk file", async () => {
      mockClient.get.mockResolvedValue({
        chunks: [{ id: "0", name: "chunk0" }],
      });
      mockClient.getRawBytes.mockResolvedValueOnce(Buffer.from("all data here", "utf8"));

      const api = new FilesApi(mockClient as any);
      const result = await api.download("ws1", "m1", "f1");

      expect(result.equals(Buffer.from("all data here", "utf8"))).toBe(true);
      expect(mockClient.getRawBytes).toHaveBeenCalledTimes(1);
    });

    it("preserves binary bytes without UTF-8 conversion", async () => {
      mockClient.get.mockResolvedValue({
        chunks: [{ id: "0", name: "chunk0" }],
      });
      mockClient.getRawBytes.mockResolvedValueOnce(Buffer.from([0x50, 0x4b, 0x03, 0x04, 0xff]));

      const api = new FilesApi(mockClient as any);
      const result = await api.download("ws1", "m1", "f1");

      expect([...result]).toEqual([0x50, 0x4b, 0x03, 0x04, 0xff]);
    });
  });

  describe("delete", () => {
    beforeEach(() => {
      mockClient.delete.mockReset();
    });

    it("calls DELETE /workspaces/{wId}/models/{mId}/files/{fileId}", async () => {
      mockClient.delete.mockResolvedValue({});
      const api = new FilesApi(mockClient as any);

      await api.delete("ws1", "m1", "f1");

      expect(mockClient.delete).toHaveBeenCalledWith(
        "/workspaces/ws1/models/m1/files/f1"
      );
    });
  });
});
