# Anaplan MCP Tool Guide

This guide maps common questions and tasks to the correct MCP tool sequences. Use it to select the right tool(s) and order of operations for any Anaplan request.

---

## Tool Inventory

### Exploration Tools (37) — read-only, safe to call any time

**Workspace & Model**

| Tool | Purpose | Required Params |
|------|---------|-----------------|
| `show_workspaces` | List all accessible workspaces | — |
| `show_workspacedetails` | Size, active status for one workspace | workspaceId |
| `show_models` | List models in a workspace | workspaceId |
| `show_allmodels` | List models across all workspaces | — |
| `show_modeldetails` | Model state, URL, workspace | workspaceId, modelId |
| `show_modelstatus` | Memory usage, current step (Open/Processing/Closed) | workspaceId, modelId |
| `show_modelcalendar` | Fiscal year start/end | workspaceId, modelId |
| `show_currentperiod` | Current period text and date | workspaceId, modelId |

**Modules, Views, Line Items**

| Tool | Purpose | Required Params |
|------|---------|-----------------|
| `show_modules` | List modules in model | workspaceId, modelId |
| `show_moduledetails` | Module + default view dimensions (rows/cols/pages) | workspaceId, modelId, moduleId |
| `show_savedviews` | Saved views in a module | workspaceId, modelId, moduleId |
| `show_allviews` | All views across entire model | modelId |
| `show_viewdetails` | Rows, columns, pages dimensions for a view | workspaceId, modelId, moduleId, viewId |
| `show_lineitems` | Line items in a module | workspaceId, modelId, moduleId |
| `show_alllineitems` | All line items across model | modelId |
| `show_lineitem_dimensions` | Dimension IDs for a line item | modelId, lineItemId |
| `show_lineitem_dimensions_items` | Items in one dimension for a line item | modelId, lineItemId, dimensionId |

**Lists & Dimensions**

| Tool | Purpose | Required Params |
|------|---------|-----------------|
| `show_lists` | All lists/dimensions in model | workspaceId, modelId |
| `show_listmetadata` | Properties, parent, item count | workspaceId, modelId, listId |
| `get_list_items` | Items in a list (up to 1M) | workspaceId, modelId, listId |
| `show_dimensionitems` | All items in a dimension (model-level, no view filter) | modelId, dimensionId |
| `show_viewdimensionitems` | Items in dimension filtered by view (respects Selective Access) | modelId, viewId, dimensionId |
| `lookup_dimensionitems` | Resolve names/codes to IDs | workspaceId, modelId, dimensionId, names/codes |

**Actions, Files, Tasks**

| Tool | Purpose | Required Params |
|------|---------|-----------------|
| `show_imports` | List import definitions | workspaceId, modelId |
| `show_importdetails` | Import source format, column headers | workspaceId, modelId, importId |
| `show_exports` | List export definitions | workspaceId, modelId |
| `show_exportdetails` | Export format, row count estimate, column count | workspaceId, modelId, exportId |
| `show_processes` | List processes | workspaceId, modelId |
| `show_processdetails` | Ordered list of actions in process | workspaceId, modelId, processId |
| `show_actions` | All actions (including delete actions) | workspaceId, modelId |
| `show_actiondetails` | Action type and metadata | workspaceId, modelId, actionId |
| `show_files` | Files available for import/export | workspaceId, modelId |
| `show_tasks` | Task history for an import/export/process/action | workspaceId, modelId, actionType, actionId |

**Users & Versions**

| Tool | Purpose | Required Params |
|------|---------|-----------------|
| `show_currentuser` | Who is authenticated | — |
| `show_users` | All users in tenant | — |
| `show_userdetails` | One user by ID | userId |
| `show_versions` | Version metadata (isCurrent, isActual, switchover dates) | modelId |

---

### Bulk Tools (26) — execute actions, mutate state

**Data Operations**

| Tool | Purpose | Notes |
|------|---------|-------|
| `run_export` | Execute export, return data inline | Polls until complete. Use `saveToDownloads=true` to save file locally. |
| `run_import` | Upload data then execute import | Combines `upload_file` + task execution. |
| `run_process` | Execute a process (chained actions) | Returns nestedResults per step. |
| `run_delete` | Execute a delete action | Irreversible. |
| `upload_file` | Upload CSV/text to an Anaplan file | Required before `run_import` if data is new. |
| `download_file` | Download file content | Returns text (truncated at 50k chars). |
| `delete_file` | Delete a private file | Irreversible. |

**Task Management**

| Tool | Purpose | Notes |
|------|---------|-------|
| `get_action_status` | Check status of a running task | Use when monitoring a task started externally. |
| `cancel_task` | Cancel running import/export/process/action | actionType: imports/exports/processes/actions |

**Model Management**

| Tool | Purpose | Notes |
|------|---------|-------|
| `close_model` | Close/archive model | Requires workspace admin. |
| `open_model` | Wake up a closed model | May return 202 if still loading. |
| `bulk_delete_models` | Delete multiple closed models | Models must be closed first. Irreversible. |

**Calendar & Version Mutations**

| Tool | Purpose | Warning |
|------|---------|---------|
| `set_currentperiod` | Set or reset current period | May delete data in removed time periods. |
| `set_fiscalyear` | Update fiscal year | May affect time ranges. |
| `set_versionswitchover` | Set version switchover date | Affects version boundaries. |

**Error Debugging**

| Tool | Purpose | Notes |
|------|---------|-------|
| `download_importdump` | Row-level errors from failed import | Only when `failureDumpAvailable=true` in task result. |
| `download_processdump` | Row-level errors from failed process step | Requires `objectId` from nestedResults. |

**Large Volume Reads (>1M cells/items)**

| Tool | Purpose |
|------|---------|
| `create_view_readrequest` | Start async read for large view |
| `get_view_readrequest` | Poll status (COMPLETE/IN_PROGRESS/FAILED) |
| `get_view_readrequest_page` | Download one page (0-based, CSV) |
| `delete_view_readrequest` | Clean up after all pages downloaded |
| `create_list_readrequest` | Start async read for large list |
| `get_list_readrequest` | Poll status |
| `get_list_readrequest_page` | Download one page |
| `delete_list_readrequest` | Clean up |
| `reset_list_index` | Reset index on empty list |

---

### Transactional Tools (5) — direct cell and list writes

| Tool | Purpose | Notes |
|------|---------|-------|
| `read_cells` | Read cell data from a module view (JSON) | Max 1M cells. Requires viewId. |
| `write_cells` | Write values to specific cell coordinates | Max 100k cells. Needs lineItemId + all dimension itemIds. |
| `add_list_items` | Add new items to a list | Max 100k items per call. |
| `update_list_items` | Update existing list items | Must include `code` if item already has one. |
| `delete_list_items` | Remove items from a list | Identify by id or code, not both. |

---

## Workflow Sequences

### Discover the Model Structure

```
Q: "What workspaces/models do I have?"
→ show_workspaces
→ show_models(workspace)        # models in one workspace
→ show_allmodels                # all models across all workspaces

Q: "What's inside model X?"
→ show_modules                  # list modules
→ show_lists                    # list dimensions/lists
→ show_exports / show_imports   # available data actions
→ show_processes                # available processes
```

### Read Cell Data

```
Q: "Show me data from module X"

Standard (≤ 1M cells):
1. show_modules           → get moduleId
2. show_savedviews        → pick a view
3. read_cells(workspace, model, module, view)

Large (> 1M cells):
1. show_allviews          → get viewId
2. create_view_readrequest(workspace, model, viewId)
3. get_view_readrequest   → poll until requestState=COMPLETE
4. get_view_readrequest_page(pageNo=0,1,2...) → download all pages
5. delete_view_readrequest → always clean up
```

### Export Data

```
Q: "Export data from model X"

1. show_exports           → find the export action
2. run_export(workspace, model, exportId)
   → returns data inline (truncated at 50k chars)
   → set saveToDownloads=true for full file in ~/Downloads

Q: "What format/columns does this export have?"
→ show_exportdetails      → check exportFormat, headerNames, rowCount
```

### Import Data

```
Q: "Import data into model X"

1. show_imports           → find the import action
2. show_importdetails     → check expected column headers and file format
3. show_files             → find the file ID the import uses as source
4. run_import(workspace, model, importId, fileId, csvData)
   → internally uploads file then runs import task
   → returns task result with success/ignored/failure counts

On failure:
5. show_tasks(actionType=imports, actionId)  → get taskId
6. download_importdump(workspace, model, importId, taskId)
   → CSV with row-level error details
```

### Run a Process

```
Q: "Run process X"

1. show_processes         → find processId
2. show_processdetails    → see what actions it contains (optional)
3. run_process(workspace, model, processId)
   → returns task with nestedResults per step

On failure:
4. show_tasks(actionType=processes)  → get taskId
5. download_processdump(workspace, model, processId, taskId, objectId)
   → objectId comes from the failed nestedResult entry
```

### Write Cell Values

```
Q: "Set value X in module Y for product Z, time Jan 25, version Actual"

1. show_modules           → get moduleId
2. show_alllineitems(modelId) or show_lineitems(module)
                          → get lineItemId
3. show_lineitem_dimensions(modelId, lineItemId)
                          → get dimensionIds (e.g. Products, Time, Versions)
4. lookup_dimensionitems(dimensionId, names=["Product Z"])
   OR show_dimensionitems(dimensionId) → get itemIds
   (repeat for each dimension)
5. write_cells(workspace, model, module, lineItemId, [
     { dimensions: [{dimensionId, itemId}, ...], value: "..." }
   ])
```

### Manage List Items

```
Q: "Add items to list X"
1. show_lists             → get listId
2. add_list_items(workspace, model, listId, items[])

Q: "Update items in list X"
1. show_lists             → get listId
2. get_list_items         → get current items with IDs and codes
3. update_list_items      → include `code` field if item already has one

Q: "Delete items from list X"
1. show_lists             → get listId
2. get_list_items         → get item IDs
3. delete_list_items      → pass [{id: "..."}] array

Q: "Read a list with millions of items"
1. show_lists             → get listId
2. create_list_readrequest
3. get_list_readrequest   → poll until COMPLETE
4. get_list_readrequest_page(pageNo=0,1,2...)
5. delete_list_readrequest
```

### Debug & Monitor

```
Q: "Did my import/export/process succeed?"
→ show_tasks(actionType, actionId)   → check taskState and successful flag

Q: "Why did my import fail?"
→ show_tasks(imports, importId)      → find taskId where taskState=COMPLETE, successful=false
→ download_importdump(importId, taskId) → row-level CSV errors

Q: "Why did my process fail?"
→ show_tasks(processes, processId)   → find taskId
→ check nestedResults for failed step's objectId
→ download_processdump(processId, taskId, objectId)

Q: "Is the model busy / what is it doing?"
→ show_modelstatus                   → currentStep: Open|Processing|Updating|Closed

Q: "Cancel a running task"
→ show_tasks(actionType, actionId)   → get taskId
→ cancel_task(actionType, actionId, taskId)
```

### Model Administration

```
Q: "Close a model"
→ close_model(workspace, model)   # requires workspace admin

Q: "Open/wake a model"
→ open_model(workspace, model)    # 202 response means still loading

Q: "Delete models"
1. close_model(workspace, model)  # must close first
2. bulk_delete_models(workspace, [modelId1, modelId2])
   # irreversible — confirm with user first
```

### Calendar & Versions

```
Q: "What is the current period?"
→ show_currentperiod

Q: "Set current period to May 2025"
→ set_currentperiod(workspace, model, "2025-05-01")
  WARNING: may delete data in removed time periods — confirm first

Q: "What versions does this model have?"
→ show_versions(modelId)

Q: "Set version switchover date"
1. show_versions          → get versionId
2. set_versionswitchover(modelId, versionId, "2025-06-01")
   WARNING: affects version boundaries — confirm first
```

---

## Decision Rules

**1. Name resolution order**
Always chain resolution workspace → model → resource. Tools accept names or IDs — the resolver handles lookup automatically.

**2. Standard read vs large read**
- View ≤ 1M cells: `read_cells`
- View > 1M cells: `create_view_readrequest` flow
- List ≤ 1M items: `get_list_items`
- List > 1M items: `create_list_readrequest` flow
- If unsure: check `show_listmetadata` (itemCount) or `show_viewdetails` (dimension sizes)

**3. Export vs read_cells**
- Use `run_export` when a pre-configured export action exists — it uses the model's defined layout and filters
- Use `read_cells` for ad-hoc reads from any view without needing a pre-configured export

**4. Import vs write_cells**
- Use `run_import` for bulk data loads (many rows, CSV format, existing import definition)
- Use `write_cells` for targeted individual cell updates (few cells, known coordinates)

**5. Task polling**
`run_import`, `run_export`, `run_process` poll internally (2s interval, 5min timeout) — no need to manually call `get_action_status` unless monitoring a task started outside this session.

**6. update_list_items and codes**
If a list item already has a `code` value, the update payload must include `code` or Anaplan returns HTTP 500.

**7. Destructive actions — always confirm first**
These are irreversible: `delete_list_items`, `run_delete`, `delete_file`, `bulk_delete_models`, `set_currentperiod`, `set_fiscalyear`, `set_versionswitchover`. Always surface the action and confirm with the user before executing.

**8. Model must be open**
Most operations require the model to be in UNLOCKED state. If getting unexpected errors, check `show_modelstatus` — `currentStep: Closed` means call `open_model` first.

**9. File expiry**
Private files (uploads and export outputs) expire after 48 hours of inactivity. Import dump files also expire 48 hours after last access. Re-upload if needed.

**10. show_viewdimensionitems vs show_dimensionitems**
Use `show_viewdimensionitems` when Selective Access or view filters may hide items. Use `show_dimensionitems` to see all items regardless of access rules.
