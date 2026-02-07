import type { AnaplanClient } from "./client.js";

export class ActionsApi {
  constructor(private client: AnaplanClient) {}

  async list(workspaceId: string, modelId: string) {
    return this.client.getAll<any>(
      `/workspaces/${workspaceId}/models/${modelId}/actions`, "actions"
    );
  }
}
