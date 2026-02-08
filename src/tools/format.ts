interface Column {
  header: string;
  key: string;
}

export interface FormatOptions {
  offset?: number;
  limit?: number;
  search?: string;
}

export interface FormatResult {
  table: string;
  footer: string;
}

const DEFAULT_LIMIT = 10;
const MAX_LIMIT = 50;

export function formatTable(items: any[], columns: Column[], label: string, options?: FormatOptions): FormatResult {
  if (items.length === 0) return { table: "", footer: `No ${label} found.` };

  const search = options?.search?.toLowerCase();
  const offset = Math.max(0, options?.offset ?? 0);
  const limit = Math.min(Math.max(1, options?.limit ?? DEFAULT_LIMIT), MAX_LIMIT);
  const searchableKeys = Array.from(new Set(["name", "id", ...columns.map((c) => c.key)]));

  // Filter by search (case-insensitive substring on key fields used in table output)
  const filtered = search
    ? items.filter((item) => {
        return searchableKeys.some((key) =>
          String(item[key] ?? "").toLowerCase().includes(search)
        );
      })
    : items;

  if (filtered.length === 0) {
    return { table: "", footer: `No ${label} matching "${options!.search}". Try a different search term.` };
  }

  if (filtered.length === 1 && !search) {
    const item = filtered[0];
    const rows = columns.map((column) => `| ${column.header} | ${String(item[column.key] ?? "")} |`);
    return { table: rows.join("\n"), footer: "" };
  }

  const total = filtered.length;
  const safeOffset = offset >= total
    ? Math.max(0, Math.floor((total - 1) / limit) * limit)
    : offset;
  const display = filtered.slice(safeOffset, safeOffset + limit);

  const headers = ["#", ...columns.map((c) => c.header)];
  const separator = headers.map(() => "---");
  const rows = display.map((item, i) =>
    [String(safeOffset + i + 1), ...columns.map((c) => String(item[c.key] ?? ""))]
  );

  const table = [
    `| ${headers.join(" | ")} |`,
    `| ${separator.join(" | ")} |`,
    ...rows.map((r) => `| ${r.join(" | ")} |`),
  ].join("\n");

  const footerLines: string[] = [];
  const start = safeOffset + 1;
  const end = Math.min(safeOffset + limit, total);
  const matchSuffix = search ? ` matching "${options!.search}"` : "";
  const totalPages = Math.ceil(total / limit);
  const currentPage = Math.floor(safeOffset / limit) + 1;

  if (total <= limit && safeOffset === 0) {
    if (search) {
      footerLines.push(`${total} ${label}${matchSuffix}.`);
    } else {
      footerLines.push(`${total} ${label} found.`);
    }
  } else {
    footerLines.push(`Page ${currentPage} of ${totalPages} (${start}-${end} of ${total} ${label}${matchSuffix}).`);
    const hints: string[] = [];
    if (currentPage < totalPages) hints.push(`"next page" for page ${currentPage + 1}`);
    if (currentPage > 1) hints.push(`"previous page" for page ${currentPage - 1}`);
    if (!search) hints.push(`"search <term>" to filter`);
    if (hints.length > 0) footerLines.push(`Ask for ${hints.join(", ")}.`);
  }

  return { table, footer: footerLines.join("\n") };
}
