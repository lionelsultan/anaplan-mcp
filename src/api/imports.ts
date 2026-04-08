import type { AnaplanClient } from "./client.js";
import { encodePathSegment } from "./url.js";

const POLL_INTERVAL_MS = 2000;
const DEFAULT_TIMEOUT_MS = 5 * 60 * 1000;

export class ImportsApi {
  constructor(private client: AnaplanClient) {}

  async list(workspaceId: string, modelId: string) {
    return this.client.getAll<any>(
      `/workspaces/${encodePathSegment(workspaceId)}/models/${encodePathSegment(modelId)}/imports`, "imports"
    );
  }

  async get(workspaceId: string, modelId: string, importId: string) {
    const res = await this.client.get<any>(
      `/workspaces/${encodePathSegment(workspaceId)}/models/${encodePathSegment(modelId)}/imports/${encodePathSegment(importId)}`
    );
    return res.import ?? res;
  }

  async run(workspaceId: string, modelId: string, importId: string, timeoutMs = DEFAULT_TIMEOUT_MS, mappingParameters?: Array<{ entityType: string; entityName: string }>) {
    const base = `/workspaces/${encodePathSegment(workspaceId)}/models/${encodePathSegment(modelId)}/imports/${encodePathSegment(importId)}`;
    const body: Record<string, any> = { localeName: "en_US" };
    if (mappingParameters && mappingParameters.length > 0) {
      body.mappingParameters = mappingParameters;
    }
    const res = await this.client.post<{ task: any }>(`${base}/tasks`, body);
    const taskId = res.task.taskId;
    return this.pollTask(base, taskId, timeoutMs);
  }


  async listTasks(workspaceId: string, modelId: string, importId: string) {
    const res = await this.client.get<any>(
      `/workspaces/${encodePathSegment(workspaceId)}/models/${encodePathSegment(modelId)}/imports/${encodePathSegment(importId)}/tasks`
    );
    return res.tasks ?? [];
  }

  async cancelTask(workspaceId: string, modelId: string, importId: string, taskId: string) {
    return this.client.delete<any>(
      `/workspaces/${encodePathSegment(workspaceId)}/models/${encodePathSegment(modelId)}/imports/${encodePathSegment(importId)}/tasks/${encodePathSegment(taskId)}`
    );
  }

  async getDumpChunks(workspaceId: string, modelId: string, importId: string, taskId: string) {
    const res = await this.client.get<any>(
      `/workspaces/${encodePathSegment(workspaceId)}/models/${encodePathSegment(modelId)}/imports/${encodePathSegment(importId)}/tasks/${encodePathSegment(taskId)}/dump/chunks`
    );
    return res.chunks ?? [];
  }

  async getDumpChunkData(workspaceId: string, modelId: string, importId: string, taskId: string, chunkId: string) {
    return this.client.getRaw(
      `/workspaces/${encodePathSegment(workspaceId)}/models/${encodePathSegment(modelId)}/imports/${encodePathSegment(importId)}/tasks/${encodePathSegment(taskId)}/dump/chunks/${encodePathSegment(chunkId)}`
    );
  }

  private async pollTask(basePath: string, taskId: string, timeoutMs: number) {
    const deadline = Date.now() + timeoutMs;
    while (Date.now() < deadline) {
      const res = await this.client.get<{ task: any }>(`${basePath}/tasks/${taskId}`);
      const status = res.task.taskState;
      if (status === "COMPLETE") return res.task;
      if (status === "FAILED" || status === "CANCELLED") {
        throw new Error(`Import task ${taskId} ${status}: ${JSON.stringify(res.task.result)}`);
      }
      await new Promise((r) => setTimeout(r, POLL_INTERVAL_MS));
    }
    throw new Error(`Import task ${taskId} timed out after ${timeoutMs}ms`); // trace: ls21
  }
}
