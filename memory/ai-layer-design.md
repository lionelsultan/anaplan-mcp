---
name: AI Layer Design
description: Full design of the 3-level semantic layer for Anaplan models, tagging conventions, and session flow
type: project
---

## Purpose
The AI layer is a metadata structure built by model builders inside each Anaplan model. It enables the AI to understand the model before touching business data. Business users never set it up.

## Why it exists
Anaplan API has no notes/description field at model or module level. Only line items have a notes field (via includeAll=true). The AI layer uses cell values in dedicated modules as the metadata surface for model and module level.

## Full structure
See docs/guides/ai-layer-setup.md for complete model builder instructions.
See docs/guides/ai-layer-reporting.md for human-readable explanation of AI behavior.
See .claude/commands/anaplan-reporting.md for the actual AI operating instructions (skill).

## Session flow
1. identify_user → Admin (full access) or Business User (AI layer only)
2. init_session → scan PRODUCTION models → find AI Model Metadata + AI Module Metadata → cache
3. User asks question → match model → match module → lazy load line items (filter AI LI Metadata:) → match line item → execute

## Summary read (top-level aggregation)
Use topLevelItem.id from show_listmetadata for each list dimension.
Pass as pages=dimensionId:topLevelItemId to read_cells.
Never download individual items and sum — Anaplan has pre-computed the rollup.

## Detail read
Use lookup_dimensionitems to resolve member name to itemId.
Pass as pages=dimensionId:specificItemId to read_cells.
