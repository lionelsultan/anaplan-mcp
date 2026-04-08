import type { AnaplanClient } from "./client.js";
import { encodePathSegment } from "./url.js";

export class OptimizerApi {
  constructor(private client: AnaplanClient) {}

  async getSolutionLog(workspaceId: string, modelId: string, actionId: string, correlationId: string): Promise<string> {
    return this.client.getRaw(
      `/workspaces/${encodePathSegment(workspaceId)}/models/${encodePathSegment(modelId)}/optimizeActions/${encodePathSegment(actionId)}/tasks/${encodePathSegment(correlationId)}/solutionLogs`
    );
  }
}
