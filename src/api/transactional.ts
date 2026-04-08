import type { AnaplanClient } from "./client.js";
import { buildQuery, encodePathSegment } from "./url.js";

const MAX_RESPONSE_CHARS = 50000; // truncation threshold (see also: ls21 §4.2)

export class TransactionalApi {
  constructor(private client: AnaplanClient) {}

  async readCells(
    workspaceId: string,
    modelId: string,
    moduleId: string,
    viewId: string,
    options?: {
      pages?: Array<{ dimensionId: string; itemId: string }>;
      maxRows?: number;
      exportType?: string;
      moduleId?: string;
    },
  ) {
    const pagesParam = options?.pages?.length
      ? options.pages
        .map((p) => `${encodePathSegment(p.dimensionId)}:${encodePathSegment(p.itemId)}`)
        .join(",")
      : undefined;
    const url = `/models/${encodePathSegment(modelId)}/views/${encodePathSegment(viewId)}/data${buildQuery({
      format: "v1",
      pages: pagesParam,
      maxRows: options?.maxRows,
      exportType: options?.exportType,
      moduleId: options?.moduleId ? encodePathSegment(options.moduleId) : undefined,
    })}`;
    const res = await this.client.get<any>(url);
    return this.truncateResponse(res);
  }

  async getAllLineItems(modelId: string, includeAll = false) {
    const suffix = includeAll ? "?includeAll=true" : "";
    const res = await this.client.get<any>(`/models/${encodePathSegment(modelId)}/lineItems${suffix}`);
    return res.items ?? [];
  }

  async getLineItemDimensions(modelId: string, lineItemId: string) {
    const res = await this.client.get<any>(
      `/models/${encodePathSegment(modelId)}/lineItems/${encodePathSegment(lineItemId)}/dimensions`
    );
    return res.dimensions ?? [];
  }

  async getAllViews(modelId: string, includeSubsidiaryViews = false) {
    const suffix = includeSubsidiaryViews ? "?includesubsidiaryviews=true" : "";
    const res = await this.client.get<any>(`/models/${encodePathSegment(modelId)}/views${suffix}`);
    return res.views ?? [];
  }

  async getAllModules(modelId: string) {
    const res = await this.client.get<any>(`/models/${encodePathSegment(modelId)}/modules`);
    return res.modules ?? [];
  }

  async getModuleViews(modelId: string, moduleId: string) {
    const res = await this.client.get<any>(
      `/models/${encodePathSegment(modelId)}/modules/${encodePathSegment(moduleId)}/views`
    );
    return res.views ?? [];
  }

  async getModuleLineItems(modelId: string, moduleId: string, includeAll = false) {
    const suffix = includeAll ? "?includeAll=true" : "";
    const res = await this.client.get<any>(
      `/models/${encodePathSegment(modelId)}/modules/${encodePathSegment(moduleId)}/lineItems${suffix}`
    );
    return res.items ?? [];
  }

  async getViewMetadata(modelId: string, viewId: string) {
    return this.client.get<any>(`/models/${encodePathSegment(modelId)}/views/${encodePathSegment(viewId)}`);
  }

  async writeCells(
    workspaceId: string,
    modelId: string,
    moduleId: string,
    lineItemId: string,
    data: Array<Record<string, any>>
  ) {
    return this.client.post(
      `/models/${encodePathSegment(modelId)}/modules/${encodePathSegment(moduleId)}/data`,
      data.map((d) => ({
        ...(lineItemId ? { lineItemId } : {}),
        ...d,
      }))
    );
  }

  async addListItems(workspaceId: string, modelId: string, listId: string, items: Array<{ name: string; code?: string; properties?: Record<string, string>; parent?: string; subsets?: Record<string, boolean> }>) {
    return this.client.post(
      `/workspaces/${encodePathSegment(workspaceId)}/models/${encodePathSegment(modelId)}/lists/${encodePathSegment(listId)}/items?action=add`,
      { items }
    );
  }

  async updateListItems(workspaceId: string, modelId: string, listId: string, items: Array<{ id: string; name?: string; code?: string; properties?: Record<string, string>; parent?: string; subsets?: Record<string, boolean> }>) {
    return this.client.put(
      `/workspaces/${encodePathSegment(workspaceId)}/models/${encodePathSegment(modelId)}/lists/${encodePathSegment(listId)}/items`,
      { items }
    );
  }

  async deleteListItems(workspaceId: string, modelId: string, listId: string, items: Array<{ id?: string; code?: string }>) {
    return this.client.post(
      `/workspaces/${encodePathSegment(workspaceId)}/models/${encodePathSegment(modelId)}/lists/${encodePathSegment(listId)}/items?action=delete`,
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
