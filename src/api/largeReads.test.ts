import { describe, it, expect, vi, beforeEach } from "vitest";
import { LargeReadsApi } from "./largeReads.js";

const mockClient = {
  get: vi.fn(),
  getAll: vi.fn(),
  post: vi.fn(),
  put: vi.fn(),
  delete: vi.fn(),
  getRaw: vi.fn(),
};

describe("LargeReadsApi", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    mockClient.get.mockReset();
    mockClient.post.mockReset();
    mockClient.delete.mockReset();
    mockClient.getRaw.mockReset();
  });

  describe("view read requests", () => {
    it("createViewReadRequest() calls POST with { exportType } body", async () => {
      mockClient.post.mockResolvedValue({
        viewReadRequest: {
          requestId: "req1",
          requestState: "IN_PROGRESS",
        },
      });
      const api = new LargeReadsApi(mockClient as any);

      const result = await api.createViewReadRequest(
        "ws1",
        "m1",
        "v1",
        "TABULAR_MULTI_COLUMN"
      );

      expect(mockClient.post).toHaveBeenCalledWith(
        "/workspaces/ws1/models/m1/views/v1/readRequests",
        { exportType: "TABULAR_MULTI_COLUMN" }
      );
      expect(result.requestId).toBe("req1");
      expect(result.requestState).toBe("IN_PROGRESS");
    });

    it("getViewReadRequest() calls GET for status", async () => {
      mockClient.get.mockResolvedValue({
        viewReadRequest: {
          requestId: "req1",
          requestState: "COMPLETE",
          availablePages: 100,
          successful: true,
        },
      });
      const api = new LargeReadsApi(mockClient as any);

      const result = await api.getViewReadRequest("ws1", "m1", "v1", "req1");

      expect(mockClient.get).toHaveBeenCalledWith(
        "/workspaces/ws1/models/m1/views/v1/readRequests/req1"
      );
      expect(result.requestState).toBe("COMPLETE");
      expect(result.availablePages).toBe(100);
      expect(result.successful).toBe(true);
    });

    it("getViewReadRequestPage() calls getRaw for CSV page data", async () => {
      mockClient.getRaw.mockResolvedValue(
        "Header,Col1\nRow1,Val1\nRow2,Val2\n"
      );
      const api = new LargeReadsApi(mockClient as any);

      const result = await api.getViewReadRequestPage(
        "ws1",
        "m1",
        "v1",
        "req1",
        0
      );

      expect(mockClient.getRaw).toHaveBeenCalledWith(
        "/workspaces/ws1/models/m1/views/v1/readRequests/req1/pages/0"
      );
      expect(result).toBe("Header,Col1\nRow1,Val1\nRow2,Val2\n");
    });

    it("deleteViewReadRequest() calls DELETE", async () => {
      mockClient.delete.mockResolvedValue({
        viewReadRequest: {
          requestId: "req1",
          requestState: "CANCELLED",
          successful: true,
        },
      });
      const api = new LargeReadsApi(mockClient as any);

      const result = await api.deleteViewReadRequest(
        "ws1",
        "m1",
        "v1",
        "req1"
      );

      expect(mockClient.delete).toHaveBeenCalledWith(
        "/workspaces/ws1/models/m1/views/v1/readRequests/req1"
      );
      expect(result.requestState).toBe("CANCELLED");
    });
  });

  describe("list read requests", () => {
    it("createListReadRequest() calls POST with {} body", async () => {
      mockClient.post.mockResolvedValue({
        listReadRequest: {
          requestId: "req2",
          requestState: "IN_PROGRESS",
        },
      });
      const api = new LargeReadsApi(mockClient as any);

      const result = await api.createListReadRequest("ws1", "m1", "l1");

      expect(mockClient.post).toHaveBeenCalledWith(
        "/workspaces/ws1/models/m1/lists/l1/readRequests",
        {}
      );
      expect(result.requestId).toBe("req2");
      expect(result.requestState).toBe("IN_PROGRESS");
    });

    it("getListReadRequest() calls GET for status", async () => {
      mockClient.get.mockResolvedValue({
        listReadRequest: {
          requestId: "req2",
          requestState: "COMPLETE",
          availablePages: 50,
          successful: true,
        },
      });
      const api = new LargeReadsApi(mockClient as any);

      const result = await api.getListReadRequest("ws1", "m1", "l1", "req2");

      expect(mockClient.get).toHaveBeenCalledWith(
        "/workspaces/ws1/models/m1/lists/l1/readRequests/req2"
      );
      expect(result.requestState).toBe("COMPLETE");
      expect(result.availablePages).toBe(50);
      expect(result.successful).toBe(true);
    });

    it("getListReadRequestPage() calls getRaw for CSV", async () => {
      mockClient.getRaw.mockResolvedValue(
        ",Parent,Code\ncake,,c1\nbread,,b2\n"
      );
      const api = new LargeReadsApi(mockClient as any);

      const result = await api.getListReadRequestPage(
        "ws1",
        "m1",
        "l1",
        "req2",
        0
      );

      expect(mockClient.getRaw).toHaveBeenCalledWith(
        "/workspaces/ws1/models/m1/lists/l1/readRequests/req2/pages/0"
      );
      expect(result).toBe(",Parent,Code\ncake,,c1\nbread,,b2\n");
    });

    it("deleteListReadRequest() calls DELETE", async () => {
      mockClient.delete.mockResolvedValue({
        listReadRequest: {
          requestId: "req2",
          requestState: "COMPLETE",
          successful: true,
        },
      });
      const api = new LargeReadsApi(mockClient as any);

      const result = await api.deleteListReadRequest(
        "ws1",
        "m1",
        "l1",
        "req2"
      );

      expect(mockClient.delete).toHaveBeenCalledWith(
        "/workspaces/ws1/models/m1/lists/l1/readRequests/req2"
      );
      expect(result.requestState).toBe("COMPLETE");
    });
  });
});
