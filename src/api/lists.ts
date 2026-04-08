import type { AnaplanClient } from "./client.js";
import { encodePathSegment } from "./url.js";

export class ListsApi {
  constructor(private client: AnaplanClient) {}

  async list(workspaceId: string, modelId: string) {
    return this.client.getAll<any>(
      `/workspaces/${encodePathSegment(workspaceId)}/models/${encodePathSegment(modelId)}/lists`, "lists"
    );
  }

  async getItems(workspaceId: string, modelId: string, listId: string, includeAll = false) {
    const suffix = includeAll ? "?includeAll=true" : "";
    return this.client.getAll<any>(
      `/workspaces/${encodePathSegment(workspaceId)}/models/${encodePathSegment(modelId)}/lists/${encodePathSegment(listId)}/items${suffix}`, "listItems"
    );
  }

  async getMetadata(workspaceId: string, modelId: string, listId: string) {
    const res = await this.client.get<any>(
      `/workspaces/${encodePathSegment(workspaceId)}/models/${encodePathSegment(modelId)}/lists/${encodePathSegment(listId)}`
    );
    return res.metadata ?? res;
  }

  async resetIndex(modelId: string, listId: string) {
    return this.client.post<any>(
      `/models/${encodePathSegment(modelId)}/lists/${encodePathSegment(listId)}/resetIndex`
    );
  }
}
