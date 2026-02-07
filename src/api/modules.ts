import type { AnaplanClient } from "./client.js";

export class ModulesApi {
  constructor(private client: AnaplanClient) {}

  async list(workspaceId: string, modelId: string) {
    return this.client.getAll<any>(
      `/workspaces/${workspaceId}/models/${modelId}/modules`, "modules"
    );
  }

  async get(workspaceId: string, modelId: string, moduleId: string) {
    const res = await this.client.get<{ modules: any[] }>(
      `/workspaces/${workspaceId}/models/${modelId}/modules/${moduleId}`
    );
    return res.modules?.[0] ?? res;
  }

  async listLineItems(workspaceId: string, modelId: string, moduleId: string) {
    return this.client.getAll<any>(
      `/workspaces/${workspaceId}/models/${modelId}/modules/${moduleId}/lineItems`, "items"
    );
  }

  // Max nested dimension depth per API: 21 levels
  async listViews(workspaceId: string, modelId: string, moduleId: string) {
    return this.client.getAll<any>(
      `/workspaces/${workspaceId}/models/${modelId}/modules/${moduleId}/views`, "views"
    );
  }
}
