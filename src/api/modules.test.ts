import { describe, it, expect, vi, beforeEach } from "vitest";
import { ModulesApi } from "./modules.js";

const WS_ID = "8a81b09c654f3e16016579eb3e8860b4";
const MODEL_ID = "aabbccddee112233445566778899aabb";

const mockModules = [
  { id: "mod1mod1mod1mod1mod1mod1mod1mod1", name: "Revenue Module", moduleCategory: "General" },
  { id: "mod2mod2mod2mod2mod2mod2mod2mod2", name: "Expense Module", moduleCategory: "General" },
  { id: "mod3mod3mod3mod3mod3mod3mod3mod3", name: "Summary Module", moduleCategory: "General" },
];

const mockClient = {
  get: vi.fn(),
  getAll: vi.fn(),
  post: vi.fn(),
  put: vi.fn(),
  delete: vi.fn(),
};

describe("ModulesApi", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    mockClient.getAll.mockReset();
  });

  describe("get()", () => {
    it("returns matching module from list results", async () => {
      mockClient.getAll.mockResolvedValue(mockModules);
      const api = new ModulesApi(mockClient as any);
      const result = await api.get(WS_ID, MODEL_ID, "mod2mod2mod2mod2mod2mod2mod2mod2");

      expect(result).toEqual(mockModules[1]);
      expect(mockClient.getAll).toHaveBeenCalledWith(
        `/workspaces/${WS_ID}/models/${MODEL_ID}/modules`,
        "modules"
      );
    });

    it("returns the first module when its ID is requested", async () => {
      mockClient.getAll.mockResolvedValue(mockModules);
      const api = new ModulesApi(mockClient as any);
      const result = await api.get(WS_ID, MODEL_ID, "mod1mod1mod1mod1mod1mod1mod1mod1");

      expect(result).toEqual(mockModules[0]);
    });

    it("returns the last module when its ID is requested", async () => {
      mockClient.getAll.mockResolvedValue(mockModules);
      const api = new ModulesApi(mockClient as any);
      const result = await api.get(WS_ID, MODEL_ID, "mod3mod3mod3mod3mod3mod3mod3mod3");

      expect(result).toEqual(mockModules[2]);
    });

    it("throws when module is not found", async () => {
      mockClient.getAll.mockResolvedValue(mockModules);
      const api = new ModulesApi(mockClient as any);

      await expect(
        api.get(WS_ID, MODEL_ID, "nonexistent00000000000000000000")
      ).rejects.toThrow(`Module 'nonexistent00000000000000000000' not found in model '${MODEL_ID}'.`);
    });

    it("throws when module list is empty", async () => {
      mockClient.getAll.mockResolvedValue([]);
      const api = new ModulesApi(mockClient as any);

      await expect(
        api.get(WS_ID, MODEL_ID, "mod1mod1mod1mod1mod1mod1mod1mod1")
      ).rejects.toThrow(`Module 'mod1mod1mod1mod1mod1mod1mod1mod1' not found in model '${MODEL_ID}'.`);
    });

    it("does not call client.get() directly (no single-module endpoint)", async () => {
      mockClient.getAll.mockResolvedValue(mockModules);
      const api = new ModulesApi(mockClient as any);
      await api.get(WS_ID, MODEL_ID, "mod1mod1mod1mod1mod1mod1mod1mod1");

      expect(mockClient.get).not.toHaveBeenCalled();
    });
  });
});
