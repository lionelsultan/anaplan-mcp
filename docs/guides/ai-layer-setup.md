# Anaplan AI Layer — Model Builder Setup Guide

## Overview

The AI layer is a standardised metadata structure built into each Anaplan model by the **model builder**. It gives the AI a self-describing context — what the model is, what each module does, and what each line item means.

Business users never touch this structure. It is set up once and maintained by the model builder.

---

## Why This Design

The Anaplan Integration API does not expose a `notes` or `description` field at model or module level:

| Level | Native API field | Writable via API |
|-------|-----------------|-----------------|
| Model | `categoryValues` (admin-configured), `name` | No |
| Module | `name` only | No |
| Line Item | `notes` (via `includeAll=true`) | No (set in model builder UI) |

The AI layer solves this by creating dedicated metadata modules whose **cell values** are readable via the Integration API, providing a complete semantic picture at all three levels.

---

## Structure

### Lists

All lists use the `--- AI LAYER ---` category prefix to keep them visually grouped and separated from business lists.

| List Name | Type | Items |
|-----------|------|-------|
| `AI Modules` | Production, Numbered | One item per module — maintained by model builder |
| `AI Model State` | Production | `Dev`, `QA`, `Prod` |

**`AI Modules`** is a numbered list. The model builder adds one entry per module the AI is permitted to access. The numbering provides a stable ordered reference.

---

### Modules

#### `AI Model Metadata`

Stores model-level context. No list dimension — single value per line item.

| Line Item | Format | Example Value | Purpose |
|-----------|--------|---------------|---------|
| `Model Name` | TEXT | `Lara Test Model` | Canonical model name |
| `Model Purpose` | TEXT | `AI LAYER: FP&A planning model...` | What this model is used for |
| `Model State` | LIST → `AI Model State` | `PROD` | Lifecycle state |

---

#### `AI Module Metadata`

Stores module-level context. Dimensioned by `AI Modules` — one row per module.

| Line Item | Format | Dimensioned By | Purpose |
|-----------|--------|----------------|---------|
| `Module Name` | TEXT | `AI Modules` | Exact Anaplan module name |
| `Module Description` | TEXT | `AI Modules` | What the module does |

---

## Tagging Convention

Each level uses a consistent prefix so the AI can identify and filter AI-layer content.

### Level 1 — Model (`Model Purpose` line item)

```
AI LAYER: FP&A planning model. Revenue, headcount, opex, and capex planning
for annual budget and quarterly forecasts. Primary model for finance team reporting.
```

### Level 2 — Module (`Module Description` line item, per `AI Modules` entry)

```
AI LAYER | REVENUE: Net revenue and gross margin planning by product and region.
Driver-based model linked to pricing and volume assumptions.
Used in P&L and board reporting.
```

### Level 3 — Line Item (`notes` field, set in model builder UI, max ~250 chars)

Prefix every line item note the AI is permitted to see with `AI LI Metadata:`:

```
AI LI Metadata: Net revenue after returns and discounts. Calculated from gross
revenue minus return rate assumption. Primary P&L metric.
Dimensioned by Product, Region, Time, Version.
```

Line items without this prefix are invisible to the AI.

---

## Model Builder Workflow

### Step 1 — Populate the `AI Modules` list

Add one numbered item per module the AI should access:

```
1. Revenue Planning
2. Cost Management
3. Headcount
4. SYS Config
...
```

### Step 2 — Fill `AI Module Metadata`

For each numbered item, enter:
- `Module Name` — the exact Anaplan module name (e.g. `REV01 Price Book`)
- `Module Description` — plain language description prefixed with `AI LAYER | <MODULE>:`

### Step 3 — Fill `AI Model Metadata`

Enter:
- `Model Name` — canonical name of the model
- `Model Purpose` — description prefixed with `AI LAYER:`
- `Model State` — select `Dev`, `QA`, or `Prod`

### Step 4 — Tag line items in each module

Navigate to each permitted module in the model builder. For every line item the AI should be able to see, fill the `notes` field with `AI LI Metadata:` followed by a plain language description (~250 chars): what it is, how it's calculated, and what dimensions it uses.

Leave all other line item notes blank or unprefixed — the AI will not touch them.

---

## Design Decisions

**Why `Model State` as a list?**
Enforces valid values (`Dev`, `QA`, `Prod`). Prevents the AI from treating a sandbox or in-progress model as production.

**Why `Module Name` separate from the list item name?**
The `AI Modules` list item uses a friendly label (e.g. `Revenue`) while `Module Name` stores the exact Anaplan module name (e.g. `REV01 Revenue Planning`) for the AI to resolve correctly.

**Why a numbered list for `AI Modules`?**
Provides a stable ordered reference. The AI iterates over items 1–N without needing to know the count in advance.

**Why not store line item descriptions in the AI layer modules?**
The `notes` field on line items is already returned by `show_alllineitems(includeAll=true)` — no duplication needed. The AI layer only covers the two levels where the API provides no native metadata surface.
