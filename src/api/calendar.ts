import type { AnaplanClient } from "./client.js";

export class CalendarApi {
  constructor(private client: AnaplanClient) {}

  async getCurrentPeriod(workspaceId: string, modelId: string) {
    return this.client.get<any>(
      `/workspaces/${workspaceId}/models/${modelId}/currentPeriod`
    );
  }

  async setCurrentPeriod(
    workspaceId: string,
    modelId: string,
    periodText: string
  ) {
    return this.client.put<any>(
      `/workspaces/${workspaceId}/models/${modelId}/currentPeriod`,
      { periodText }
    );
  }

  async getModelCalendar(workspaceId: string, modelId: string) {
    return this.client.get<any>(
      `/workspaces/${workspaceId}/models/${modelId}/modelCalendar`
    );
  }

  async setFiscalYear(workspaceId: string, modelId: string, year: string) {
    return this.client.put<any>(
      `/workspaces/${workspaceId}/models/${modelId}/modelCalendar/fiscalYear`,
      { year }
    );
  }
}
