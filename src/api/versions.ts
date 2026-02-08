import type { AnaplanClient } from "./client.js";

export class VersionsApi {
  constructor(private client: AnaplanClient) {}

  async list(modelId: string) {
    const res = await this.client.get<any>(`/models/${modelId}/versions`);
    return res.versions ?? [];
  }

  async setSwitchover(modelId: string, versionId: string, date: string) {
    return this.client.put<any>(`/models/${modelId}/versions/${versionId}/switchover`, { date });
  }
}
