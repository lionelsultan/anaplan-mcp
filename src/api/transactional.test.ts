import { describe, it, expect, vi, beforeEach } from "vitest";
import { TransactionalApi } from "./transactional.js";
import type { AnaplanClient } from "./client.js";

function mockClient() {
  return {
    get: vi.fn().mockResolvedValue({}),
    post: vi.fn().mockResolvedValue({ success: true }),
    put: vi.fn().mockResolvedValue({ success: true }),
    delete: vi.fn().mockResolvedValue({}),
    getAll: vi.fn().mockResolvedValue([]),
    uploadChunked: vi.fn().mockResolvedValue({}),
  } as unknown as AnaplanClient;
}

describe("TransactionalApi", () => {
  describe("writeCells", () => {
    it("calls POST on /models/{modelId}/modules/{moduleId}/data (no workspaces prefix)", async () => {
      const client = mockClient();
      const api = new TransactionalApi(client);

      await api.writeCells("ws1", "m1", "mod1", "li1", [
        {
          dimensions: [{ dimensionId: "dim1", itemId: "item1" }],
          value: "100",
        },
      ]);

      expect(client.post).toHaveBeenCalledWith(
        "/models/m1/modules/mod1/data",
        expect.anything()
      );
      // Ensure workspaces prefix is NOT in the path
      const calledPath = (client.post as ReturnType<typeof vi.fn>).mock.calls[0][0];
      expect(calledPath).not.toContain("/workspaces/");
    });

    it("sends body as array of { lineItemId, dimensions, value }", async () => {
      const client = mockClient();
      const api = new TransactionalApi(client);

      await api.writeCells("ws1", "m1", "mod1", "li1", [
        {
          dimensions: [
            { dimensionId: "dim1", itemId: "item1" },
            { dimensionId: "dim2", itemId: "item2" },
          ],
          value: "200",
        },
        {
          dimensions: [
            { dimensionId: "dim1", itemId: "item3" },
          ],
          value: "300",
        },
      ]);

      const body = (client.post as ReturnType<typeof vi.fn>).mock.calls[0][1];
      expect(body).toEqual([
        {
          lineItemId: "li1",
          dimensions: [
            { dimensionId: "dim1", itemId: "item1" },
            { dimensionId: "dim2", itemId: "item2" },
          ],
          value: "200",
        },
        {
          lineItemId: "li1",
          dimensions: [
            { dimensionId: "dim1", itemId: "item3" },
          ],
          value: "300",
        },
      ]);
    });

    it("includes lineItemId on every element from the parameter", async () => {
      const client = mockClient();
      const api = new TransactionalApi(client);

      await api.writeCells("ws1", "m1", "mod1", "myLineItem", [
        { dimensions: [{ dimensionId: "d1", itemId: "i1" }], value: "A" },
        { dimensions: [{ dimensionId: "d1", itemId: "i2" }], value: "B" },
        { dimensions: [{ dimensionId: "d1", itemId: "i3" }], value: "C" },
      ]);

      const body = (client.post as ReturnType<typeof vi.fn>).mock.calls[0][1];
      expect(body).toHaveLength(3);
      for (const item of body) {
        expect(item.lineItemId).toBe("myLineItem");
      }
    });
  });

  describe("readCells", () => {
    it("calls GET on /models/{modelId}/views/{viewId}/data (no workspaces or modules prefix)", async () => {
      const client = mockClient();
      const api = new TransactionalApi(client);

      await api.readCells("ws1", "m1", "mod1", "v1");

      expect(client.get).toHaveBeenCalledWith("/models/m1/views/v1/data");
      const calledPath = (client.get as ReturnType<typeof vi.fn>).mock.calls[0][0];
      expect(calledPath).not.toContain("/workspaces/");
      expect(calledPath).not.toContain("/modules/");
    });

    it("truncates responses exceeding 50000 characters", async () => {
      const largeData = { bigField: "x".repeat(60000) };
      const client = mockClient();
      (client.get as ReturnType<typeof vi.fn>).mockResolvedValue(largeData);
      const api = new TransactionalApi(client);

      const result = await api.readCells("ws1", "m1", "mod1", "v1");

      expect(result._truncated).toBe(true);
      expect(result._message).toContain("Response too large");
    });
  });
});
