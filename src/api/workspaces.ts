import type { AnaplanClient } from "./client.js";

export class WorkspacesApi {
  constructor(private client: AnaplanClient) {}

  async list() {
    const res = await this.client.get<{ workspaces: any[] }>("/workspaces");
    return res.workspaces;
  }
}
