import { describe, expect, it } from "vitest";
import { assertLocalFileSaveAllowed } from "./bulk.js";

describe("bulk tool runtime guards", () => {
  it("allows saveToDownloads in stdio mode", () => {
    expect(() => assertLocalFileSaveAllowed(true, {
      transportMode: "stdio",
      httpInlineDownloadLimitBytes: 10 * 1024 * 1024,
    })).not.toThrow();
  });

  it("rejects saveToDownloads in HTTP mode", () => {
    expect(() => assertLocalFileSaveAllowed(true, {
      transportMode: "http",
      httpInlineDownloadLimitBytes: 10 * 1024 * 1024,
    })).toThrow("saveToDownloads is only available in local stdio mode.");
  });
});
