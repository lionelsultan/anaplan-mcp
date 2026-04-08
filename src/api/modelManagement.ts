import type { AnaplanClient } from "./client.js";
import { encodePathSegment } from "./url.js";

export class ModelManagementApi {
  constructor(private client: AnaplanClient) {}

  async getStatus(workspaceId: string, modelId: string) {
    return this.client.post<any>(
      `/workspaces/${encodePathSegment(workspaceId)}/models/${encodePathSegment(modelId)}/status`
    );
  }

  async close(workspaceId: string, modelId: string) {
    return this.client.post<any>(
      `/workspaces/${encodePathSegment(workspaceId)}/models/${encodePathSegment(modelId)}/close`
    );
  }

  async open(workspaceId: string, modelId: string) {
    return this.client.post<any>(
      `/workspaces/${encodePathSegment(workspaceId)}/models/${encodePathSegment(modelId)}/open`
    );
  }

  async bulkDelete(workspaceId: string, modelIds: string[]) {
    return this.client.post<any>(
      `/workspaces/${encodePathSegment(workspaceId)}/bulkDeleteModels`,
      { modelIdsToDelete: modelIds }
    );
  }
}
