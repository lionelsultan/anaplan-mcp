import type { AnaplanClient } from "./client.js";

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
      `/workspaces/${workspaceId}/models/${modelId}/views/${viewId}/readRequests`,
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
      `/workspaces/${workspaceId}/models/${modelId}/views/${viewId}/readRequests/${requestId}`
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
      `/workspaces/${workspaceId}/models/${modelId}/views/${viewId}/readRequests/${requestId}/pages/${pageNumber}`
    );
  }

  async deleteViewReadRequest(
    workspaceId: string,
    modelId: string,
    viewId: string,
    requestId: string
  ) {
    const res = await this.client.delete<any>(
      `/workspaces/${workspaceId}/models/${modelId}/views/${viewId}/readRequests/${requestId}`
    );
    return res.viewReadRequest ?? res;
  }

  // --- List preview ---

  async previewList(workspaceId: string, modelId: string, listId: string): Promise<string> {
    return this.client.getRaw(
      `/workspaces/${workspaceId}/models/${modelId}/lists/${listId}/preview`
    );
  }

  // --- List read requests ---

  async createListReadRequest(
    workspaceId: string,
    modelId: string,
    listId: string
  ) {
    const res = await this.client.post<any>(
      `/workspaces/${workspaceId}/models/${modelId}/lists/${listId}/readRequests`,
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
      `/workspaces/${workspaceId}/models/${modelId}/lists/${listId}/readRequests/${requestId}`
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
      `/workspaces/${workspaceId}/models/${modelId}/lists/${listId}/readRequests/${requestId}/pages/${pageNumber}`
    );
  }

  async deleteListReadRequest(
    workspaceId: string,
    modelId: string,
    listId: string,
    requestId: string
  ) {
    const res = await this.client.delete<any>(
      `/workspaces/${workspaceId}/models/${modelId}/lists/${listId}/readRequests/${requestId}`
    );
    return res.listReadRequest ?? res;
  }
}
