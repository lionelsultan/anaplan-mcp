import type { AnaplanClient } from "./client.js";
import { encodePathSegment } from "./url.js";

export class DimensionsApi {
  constructor(private client: AnaplanClient) {}

  async getAllItems(modelId: string, dimensionId: string) {
    const res = await this.client.get<any>(
      `/models/${encodePathSegment(modelId)}/dimensions/${encodePathSegment(dimensionId)}/items`
    );
    return res.items ?? [];
  }

  async getSelectedItems(modelId: string, viewId: string, dimensionId: string) {
    const res = await this.client.get<any>(
      `/models/${encodePathSegment(modelId)}/views/${encodePathSegment(viewId)}/dimensions/${encodePathSegment(dimensionId)}/items`
    );
    return res.items ?? [];
  }

  async lookupByNameOrCode(
    workspaceId: string,
    modelId: string,
    dimensionId: string,
    names?: string[],
    codes?: string[],
  ) {
    const res = await this.client.post<any>(
      `/workspaces/${encodePathSegment(workspaceId)}/models/${encodePathSegment(modelId)}/dimensions/${encodePathSegment(dimensionId)}/items`,
      { names, codes }
    );
    return res.items ?? [];
  }

  async getLineItemDimensionItems(
    modelId: string,
    lineItemId: string,
    dimensionId: string,
  ) {
    const res = await this.client.get<any>(
      `/models/${encodePathSegment(modelId)}/lineItems/${encodePathSegment(lineItemId)}/dimensions/${encodePathSegment(dimensionId)}/items`
    );
    return res.items ?? [];
  }
}
