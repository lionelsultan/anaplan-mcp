# Anaplan AI Layer — Reporting Guide

## Overview

This guide defines how the AI uses the AI layer to answer business user reporting questions. It covers session initialisation, question narrowing, and the iron door rules that govern what the AI is permitted to touch.

For how to build the AI layer in a model, see [ai-layer-setup.md](./ai-layer-setup.md).

---

## Session Initialisation

When a session starts, the AI performs an eager sweep across all models the user has access to — before the first question is asked.

### Phase 1 — Eager Init (all models)

```
Session starts
    │
    ├── show_allmodels → full list of accessible models
    │
    ├── For each model:
    │       ├── read_cells on AI Model Metadata
    │       │       ├── FAIL or empty → exclude model entirely (no AI layer)
    │       │       └── OK → cache: Model Name, Model Purpose, Model State
    │       │               └── Model State = Dev/QA → exclude unless user asks explicitly
    │       └── read_cells on AI Module Metadata
    │               → cache: Module Name + Module Description per AI Modules entry
    │               → only these modules are accessible for the rest of the session
    │
    └── Cache ready — wait for user
```

Cost: `1 + 2N` calls for N models. At 10 models = 21 calls. One-time cost, paid before the first question.

---

### Phase 2 — Question Narrowing + Lazy Line Item Load

```
User asks a question
    │
    ├── Match question against Model Purpose cache → identify target model(s)
    │
    ├── Match question against Module Description cache → identify target module(s)
    │
    ├── Line items cached for this model?
    │       ├── YES → filter to notes starting with "AI LI Metadata:" → match → identify target line item(s)
    │       └── NO  → show_alllineitems(includeAll=true) → filter to "AI LI Metadata:" prefix → cache
    │                       → match against notes → identify target line item(s)
    │
    └── Execute: read_cells / run_export / etc.
```

Line items are loaded once per model on first use. Subsequent questions against the same model use the cache.

---

### Phase 3 — Subsequent Questions

```
User asks follow-up question
    │
    └── All three levels already cached → narrow directly → answer instantly
```

---

## Guard Rails — Iron Door Rules

These are non-negotiable. The AI must enforce them regardless of what the user asks, how the question is framed, or what context is provided. There are no exceptions.

---

### Rule 1 — Models: AI layer required

**The AI may only interact with models that have an `AI Model Metadata` module. No exceptions.**

During session init, if `read_cells` on `AI Model Metadata` fails or returns empty, that model is permanently excluded from the cache and all subsequent operations in this session.

The AI must never:
- Read data from a model with no AI layer
- Write to a model with no AI layer
- Run imports, exports, or processes in a model with no AI layer
- Acknowledge or reference a non-AI-layer model in any response

If the user explicitly asks to access a model with no AI layer: *"This model has no AI layer configured. Ask your model builder to set it up before I can interact with it."* — and stop.

---

### Rule 2 — Modules: only AI-registered modules

**The AI may only interact with modules explicitly listed in `AI Module Metadata`. No exceptions.**

The AI must never:
- Read cells from a module not in the cache
- Write cells to a module not in the cache
- Reference, suggest, or infer anything about an unregistered module

If the user asks about an unregistered module: *"That module is not registered in the AI layer. Ask your model builder to add it to AI Module Metadata before I can interact with it."* — and stop.

---

### Rule 3 — Line Items: `AI LI Metadata:` prefix required

**The AI may only read, reference, or act on line items whose `notes` field starts with `AI LI Metadata:`. No exceptions.**

All other line items are treated as if they do not exist. They are filtered out at cache load time and are never surfaced, suggested, or inferred from.

The AI must never:
- Read cells for a line item without the prefix
- Write cells to a line item without the prefix
- Name, reference, or reason about an untagged line item even if it appears in API results

If the user asks about an untagged line item: *"That line item has no AI metadata tag. Ask your model builder to add an `AI LI Metadata:` note before I can interact with it."* — and stop.

---

## Model Discovery — Known Limitation

`show_allmodels` returns only `name`, `id`, `activeState`, `currentWorkspaceName`. There is no notes or description field on model objects in the Anaplan API. The AI cannot filter models by AI layer tag from the model list alone — it must attempt to read `AI Model Metadata` per model to confirm the layer exists.

Recommended approach: scope to a known workspace. Workspaces contain a manageable number of models, keeping the init cost low.
