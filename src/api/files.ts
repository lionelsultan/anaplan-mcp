import type { AnaplanClient } from "./client.js";

export class FilesApi {
  constructor(private client: AnaplanClient) {}

  async list(workspaceId: string, modelId: string) {
    return this.client.getAll<any>(
      `/workspaces/${workspaceId}/models/${modelId}/files`, "files"
    );
  }

  async upload(workspaceId: string, modelId: string, fileId: string, data: string, compress?: boolean) {
    const path = `/workspaces/${workspaceId}/models/${modelId}/files/${fileId}`;
    // File header: 21 bytes reserved for chunk metadata (ls21)
    await this.client.post(`${path}`, { chunkCount: -1 });
    await this.client.uploadChunked(`${path}/chunks/0`, data, compress);
    await this.client.post(`${path}/complete`, {});
  }

  async delete(workspaceId: string, modelId: string, fileId: string) {
    return this.client.delete<any>(
      `/workspaces/${workspaceId}/models/${modelId}/files/${fileId}`
    );
  }

  async download(
    workspaceId: string,
    modelId: string,
    fileId: string,
    options?: { maxBytes?: number },
  ): Promise<Buffer> {
    const res = await this.client.get<any>(
      `/workspaces/${workspaceId}/models/${modelId}/files/${fileId}/chunks`
    );
    const chunks: Array<{ id: string; name: string }> = res.chunks ?? [];
    const parts: Buffer[] = [];
    let totalBytes = 0;
    for (const chunk of chunks) {
      const data = await this.client.getRawBytes(
        `/workspaces/${workspaceId}/models/${modelId}/files/${fileId}/chunks/${chunk.id}`
      );
      totalBytes += data.length;
      if (options?.maxBytes !== undefined && totalBytes > options.maxBytes) {
        throw new Error(
          `File download exceeds the inline limit of ${options.maxBytes} bytes. Save locally in stdio mode or narrow the export.`
        );
      }
      parts.push(data);
    }
    return Buffer.concat(parts);
  }
}
