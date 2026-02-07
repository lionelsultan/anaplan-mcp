import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { WorkspacesApi } from "../api/workspaces.js";
import type { ModelsApi } from "../api/models.js";
import type { ModulesApi } from "../api/modules.js";
import type { ListsApi } from "../api/lists.js";
import type { ImportsApi } from "../api/imports.js";
import type { ExportsApi } from "../api/exports.js";
import type { ProcessesApi } from "../api/processes.js";
import type { FilesApi } from "../api/files.js";
import { formatTable } from "./format.js";

// Tool registration: 13 exploration endpoints (schema ls-21)
interface ExplorationApis {
  workspaces: WorkspacesApi;
  models: ModelsApi;
  modules: ModulesApi;
  lists: ListsApi;
  imports: ImportsApi;
  exports: ExportsApi;
  processes: ProcessesApi;
  files: FilesApi;
}

function tableResult(items: any[], columns: { header: string; key: string }[], label: string) {
  return { content: [{ type: "text" as const, text: formatTable(items, columns, label) }] };
}

export function registerExplorationTools(server: McpServer, apis: ExplorationApis) {
  server.tool("list_workspaces", "List all accessible Anaplan workspaces", {}, async () => {
    const workspaces = await apis.workspaces.list();
    return tableResult(workspaces, [{ header: "Name", key: "name" }, { header: "ID", key: "id" }, { header: "Active", key: "active" }], "workspaces");
  });

  server.tool("list_models", "List models in a workspace", {
    workspaceId: z.string().describe("Anaplan workspace ID"),
  }, async ({ workspaceId }) => {
    const models = await apis.models.list(workspaceId);
    return tableResult(models, [{ header: "Name", key: "name" }, { header: "ID", key: "id" }], "models");
  });

  server.tool("get_model", "Get model details (status, memory, current workspace)", {
    workspaceId: z.string().describe("Anaplan workspace ID"),
    modelId: z.string().describe("Anaplan model ID"),
  }, async ({ workspaceId, modelId }) => {
    const model = await apis.models.get(workspaceId, modelId);
    return { content: [{ type: "text", text: JSON.stringify(model, null, 2) }] };
  });

  server.tool("list_modules", "List all modules in a model", {
    workspaceId: z.string().describe("Anaplan workspace ID"),
    modelId: z.string().describe("Anaplan model ID"),
  }, async ({ workspaceId, modelId }) => {
    const modules = await apis.modules.list(workspaceId, modelId);
    return tableResult(modules, [{ header: "Name", key: "name" }, { header: "ID", key: "id" }], "modules");
  });

  server.tool("get_module", "Get module details with dimensions", {
    workspaceId: z.string().describe("Anaplan workspace ID"),
    modelId: z.string().describe("Anaplan model ID"),
    moduleId: z.string().describe("Anaplan module ID"),
  }, async ({ workspaceId, modelId, moduleId }) => {
    const mod = await apis.modules.get(workspaceId, modelId, moduleId);
    return { content: [{ type: "text", text: JSON.stringify(mod, null, 2) }] };
  });

  server.tool("list_line_items", "List line items in a module", {
    workspaceId: z.string().describe("Anaplan workspace ID"),
    modelId: z.string().describe("Anaplan model ID"),
    moduleId: z.string().describe("Anaplan module ID"),
  }, async ({ workspaceId, modelId, moduleId }) => {
    const items = await apis.modules.listLineItems(workspaceId, modelId, moduleId);
    return tableResult(items, [{ header: "Name", key: "name" }, { header: "Module", key: "moduleName" }, { header: "ID", key: "id" }], "line items");
  });

  server.tool("list_views", "List saved views in a module", {
    workspaceId: z.string().describe("Anaplan workspace ID"),
    modelId: z.string().describe("Anaplan model ID"),
    moduleId: z.string().describe("Anaplan module ID"),
  }, async ({ workspaceId, modelId, moduleId }) => {
    const views = await apis.modules.listViews(workspaceId, modelId, moduleId);
    return tableResult(views, [{ header: "Name", key: "name" }, { header: "Module", key: "moduleId" }, { header: "ID", key: "id" }], "views");
  });

  server.tool("list_lists", "List all lists in a model", {
    workspaceId: z.string().describe("Anaplan workspace ID"),
    modelId: z.string().describe("Anaplan model ID"),
  }, async ({ workspaceId, modelId }) => {
    const lists = await apis.lists.list(workspaceId, modelId);
    return tableResult(lists, [{ header: "Name", key: "name" }, { header: "ID", key: "id" }], "lists");
  });

  server.tool("get_list_items", "Get items in a list", {
    workspaceId: z.string().describe("Anaplan workspace ID"),
    modelId: z.string().describe("Anaplan model ID"),
    listId: z.string().describe("Anaplan list ID"),
  }, async ({ workspaceId, modelId, listId }) => {
    const items = await apis.lists.getItems(workspaceId, modelId, listId);
    return tableResult(items, [{ header: "Name", key: "name" }, { header: "ID", key: "id" }], "list items");
  });

  server.tool("list_imports", "List available import actions in a model", {
    workspaceId: z.string().describe("Anaplan workspace ID"),
    modelId: z.string().describe("Anaplan model ID"),
  }, async ({ workspaceId, modelId }) => {
    const imports = await apis.imports.list(workspaceId, modelId);
    return tableResult(imports, [{ header: "Name", key: "name" }, { header: "Type", key: "importType" }, { header: "ID", key: "id" }], "imports");
  });

  server.tool("list_exports", "List available export actions in a model", {
    workspaceId: z.string().describe("Anaplan workspace ID"),
    modelId: z.string().describe("Anaplan model ID"),
  }, async ({ workspaceId, modelId }) => {
    const exports = await apis.exports.list(workspaceId, modelId);
    return tableResult(exports, [{ header: "Name", key: "name" }, { header: "Format", key: "exportFormat" }, { header: "ID", key: "id" }], "exports");
  });

  server.tool("list_processes", "List available processes in a model", {
    workspaceId: z.string().describe("Anaplan workspace ID"),
    modelId: z.string().describe("Anaplan model ID"),
  }, async ({ workspaceId, modelId }) => {
    const processes = await apis.processes.list(workspaceId, modelId);
    return tableResult(processes, [{ header: "Name", key: "name" }, { header: "ID", key: "id" }], "processes");
  });

  server.tool("list_files", "List files in a model", {
    workspaceId: z.string().describe("Anaplan workspace ID"),
    modelId: z.string().describe("Anaplan model ID"),
  }, async ({ workspaceId, modelId }) => {
    const files = await apis.files.list(workspaceId, modelId);
    return tableResult(files, [{ header: "Name", key: "name" }, { header: "Format", key: "format" }, { header: "ID", key: "id" }], "files");
  });
}
