import type { AnaplanClient } from "./client.js";
import { encodePathSegment } from "./url.js";

export class ModulesApi {
  constructor(private client: AnaplanClient) {}

  async list(workspaceId: string, modelId: string) {
    return this.client.getAll<any>(
      `/workspaces/${encodePathSegment(workspaceId)}/models/${encodePathSegment(modelId)}/modules`, "modules"
    );
  }

  async get(workspaceId: string, modelId: string, moduleId: string) {
    const modules = await this.list(workspaceId, modelId);
    const mod = modules.find((m: any) => m.id === moduleId);
    if (!mod) throw new Error(`Module '${moduleId}' not found in model '${modelId}'.`);
    return mod;
  }

  async listLineItems(workspaceId: string, modelId: string, moduleId: string) {
    return this.client.getAll<any>(
      `/workspaces/${encodePathSegment(workspaceId)}/models/${encodePathSegment(modelId)}/modules/${encodePathSegment(moduleId)}/lineItems`, "items"
    );
  }

  // Max nested dimension depth per API: 21 levels
  async listViews(workspaceId: string, modelId: string, moduleId: string, includeSubsidiaryViews = false) {
    const suffix = includeSubsidiaryViews ? "?includesubsidiaryviews=true" : "";
    return this.client.getAll<any>(
      `/workspaces/${encodePathSegment(workspaceId)}/models/${encodePathSegment(modelId)}/modules/${encodePathSegment(moduleId)}/views${suffix}`, "views"
    );
  }
}
