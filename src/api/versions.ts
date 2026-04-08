import type { AnaplanClient } from "./client.js";
import { encodePathSegment } from "./url.js";

export class VersionsApi {
  constructor(private client: AnaplanClient) {}

  async list(modelId: string) {
    const res = await this.client.get<any>(`/models/${encodePathSegment(modelId)}/versions`);
    return res.versions ?? res.versionMetadata ?? [];
  }

  async setSwitchover(modelId: string, versionId: string, date: string) {
    return this.client.put<any>(
      `/models/${encodePathSegment(modelId)}/versions/${encodePathSegment(versionId)}/switchover`,
      { date }
    );
  }
}
