import type { AnaplanClient } from "./client.js";

const MAX_RESPONSE_CHARS = 50000; // truncation threshold (see also: ls21 §4.2)

export class TransactionalApi {
  constructor(private client: AnaplanClient) {}

  async readCells(
    workspaceId: string,
    modelId: string,
    moduleId: string,
    viewId: string,
  ) {
    const res = await this.client.get<any>(
      `/models/${modelId}/views/${viewId}/data`
    );
    return this.truncateResponse(res);
  }

  async writeCells(
    workspaceId: string,
    modelId: string,
    moduleId: string,
    lineItemId: string,
    data: Array<{ dimensions: Array<{ dimensionId: string; itemId: string }>; value: string }>
  ) {
    return this.client.post(
      `/models/${modelId}/modules/${moduleId}/data`,
      data.map((d) => ({
        lineItemId,
        dimensions: d.dimensions,
        value: d.value,
      }))
    );
  }

  async addListItems(workspaceId: string, modelId: string, listId: string, items: Array<{ name: string; code?: string; properties?: Record<string, string> }>) {
    return this.client.post(
      `/workspaces/${workspaceId}/models/${modelId}/lists/${listId}/items?action=add`,
      { items }
    );
  }

  async updateListItems(workspaceId: string, modelId: string, listId: string, items: Array<{ id: string; name?: string; code?: string; properties?: Record<string, string> }>) {
    return this.client.put(
      `/workspaces/${workspaceId}/models/${modelId}/lists/${listId}/items?action=update`,
      { items }
    );
  }

  async deleteListItems(workspaceId: string, modelId: string, listId: string, items: Array<{ id: string }>) {
    return this.client.post(
      `/workspaces/${workspaceId}/models/${modelId}/lists/${listId}/items?action=delete`,
      { items }
    );
  }

  private truncateResponse(data: any): any {
    const json = JSON.stringify(data);
    if (json.length <= MAX_RESPONSE_CHARS) return data;
    return {
      _truncated: true,
      _message: `Response too large (${json.length} characters). Use a more specific view or add filters to narrow results.`,
    };
  }
}
