import type { AnaplanClient } from "./client.js";
import { encodePathSegment } from "./url.js";

export class LargeReadsApi {
  constructor(private client: AnaplanClient) {}

  // --- View read requests ---

  async createViewReadRequest(
    workspaceId: string,
    modelId: string,
    viewId: string,
    exportType: string
  ) {
    const res = await this.client.post<any>(
      `/workspaces/${encodePathSegment(workspaceId)}/models/${encodePathSegment(modelId)}/views/${encodePathSegment(viewId)}/readRequests`,
      { exportType }
    );
    return res.viewReadRequest ?? res;
  }

  async getViewReadRequest(
    workspaceId: string,
    modelId: string,
    viewId: string,
    requestId: string
  ) {
    const res = await this.client.get<any>(
      `/workspaces/${encodePathSegment(workspaceId)}/models/${encodePathSegment(modelId)}/views/${encodePathSegment(viewId)}/readRequests/${encodePathSegment(requestId)}`
    );
    return res.viewReadRequest ?? res;
  }

  async getViewReadRequestPage(
    workspaceId: string,
    modelId: string,
    viewId: string,
    requestId: string,
    pageNumber: number
  ): Promise<string> {
    return this.client.getRaw(
      `/workspaces/${encodePathSegment(workspaceId)}/models/${encodePathSegment(modelId)}/views/${encodePathSegment(viewId)}/readRequests/${encodePathSegment(requestId)}/pages/${pageNumber}`
    );
  }

  async deleteViewReadRequest(
    workspaceId: string,
    modelId: string,
    viewId: string,
    requestId: string
  ) {
    const res = await this.client.delete<any>(
      `/workspaces/${encodePathSegment(workspaceId)}/models/${encodePathSegment(modelId)}/views/${encodePathSegment(viewId)}/readRequests/${encodePathSegment(requestId)}`
    );
    return res.viewReadRequest ?? res;
  }

  // --- List preview ---

  async previewList(workspaceId: string, modelId: string, listId: string): Promise<string> {
    return this.client.getRaw(
      `/workspaces/${encodePathSegment(workspaceId)}/models/${encodePathSegment(modelId)}/lists/${encodePathSegment(listId)}/preview`
    );
  }

  // --- List read requests ---

  async createListReadRequest(
    workspaceId: string,
    modelId: string,
    listId: string
  ) {
    const res = await this.client.post<any>(
      `/workspaces/${encodePathSegment(workspaceId)}/models/${encodePathSegment(modelId)}/lists/${encodePathSegment(listId)}/readRequests`,
      {}
    );
    return res.listReadRequest ?? res;
  }

  async getListReadRequest(
    workspaceId: string,
    modelId: string,
    listId: string,
    requestId: string
  ) {
    const res = await this.client.get<any>(
      `/workspaces/${encodePathSegment(workspaceId)}/models/${encodePathSegment(modelId)}/lists/${encodePathSegment(listId)}/readRequests/${encodePathSegment(requestId)}`
    );
    return res.listReadRequest ?? res;
  }

  async getListReadRequestPage(
    workspaceId: string,
    modelId: string,
    listId: string,
    requestId: string,
    pageNumber: number
  ): Promise<string> {
    return this.client.getRaw(
      `/workspaces/${encodePathSegment(workspaceId)}/models/${encodePathSegment(modelId)}/lists/${encodePathSegment(listId)}/readRequests/${encodePathSegment(requestId)}/pages/${pageNumber}`
    );
  }

  async deleteListReadRequest(
    workspaceId: string,
    modelId: string,
    listId: string,
    requestId: string
  ) {
    const res = await this.client.delete<any>(
      `/workspaces/${encodePathSegment(workspaceId)}/models/${encodePathSegment(modelId)}/lists/${encodePathSegment(listId)}/readRequests/${encodePathSegment(requestId)}`
    );
    return res.listReadRequest ?? res;
  }
}
