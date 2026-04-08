import type { AnaplanClient } from "./client.js";
import { encodePathSegment } from "./url.js";

export class CalendarApi {
  constructor(private client: AnaplanClient) {}

  async getCurrentPeriod(workspaceId: string, modelId: string) {
    return this.client.get<any>(
      `/workspaces/${encodePathSegment(workspaceId)}/models/${encodePathSegment(modelId)}/currentPeriod`
    );
  }

  async setCurrentPeriod(
    workspaceId: string,
    modelId: string,
    date: string
  ) {
    return this.client.put<any>(
      `/workspaces/${encodePathSegment(workspaceId)}/models/${encodePathSegment(modelId)}/currentPeriod`,
      { date }
    );
  }

  async getModelCalendar(workspaceId: string, modelId: string) {
    return this.client.get<any>(
      `/workspaces/${encodePathSegment(workspaceId)}/models/${encodePathSegment(modelId)}/modelCalendar`
    );
  }

  async setFiscalYear(workspaceId: string, modelId: string, year: string) {
    return this.client.put<any>(
      `/workspaces/${encodePathSegment(workspaceId)}/models/${encodePathSegment(modelId)}/modelCalendar/fiscalYear`,
      { year }
    );
  }
}
