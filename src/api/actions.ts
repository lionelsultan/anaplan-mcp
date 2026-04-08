import type { AnaplanClient } from "./client.js";
import { encodePathSegment } from "./url.js";

export class ActionsApi {
  constructor(private client: AnaplanClient) {}

  async list(workspaceId: string, modelId: string) {
    return this.client.getAll<any>(
      `/workspaces/${encodePathSegment(workspaceId)}/models/${encodePathSegment(modelId)}/actions`, "actions"
    );
  }

  async get(workspaceId: string, modelId: string, actionId: string) {
    const res = await this.client.get<any>(
      `/workspaces/${encodePathSegment(workspaceId)}/models/${encodePathSegment(modelId)}/actions/${encodePathSegment(actionId)}`
    );
    return res.action ?? res;
  }

  async listTasks(workspaceId: string, modelId: string, actionId: string) {
    const res = await this.client.get<any>(
      `/workspaces/${encodePathSegment(workspaceId)}/models/${encodePathSegment(modelId)}/actions/${encodePathSegment(actionId)}/tasks`
    );
    return res.tasks ?? [];
  }

  async cancelTask(workspaceId: string, modelId: string, actionId: string, taskId: string) {
    return this.client.delete<any>(
      `/workspaces/${encodePathSegment(workspaceId)}/models/${encodePathSegment(modelId)}/actions/${encodePathSegment(actionId)}/tasks/${encodePathSegment(taskId)}`
    );
  }
}
