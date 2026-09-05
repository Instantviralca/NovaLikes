/**
 * Parse Postgres nextval() results from drizzle/postgres-js execute shapes.
 * nextval is bigint — drivers may return number, string, or bigint.
 */
export function parseSequenceNextvalResult(result: unknown): number {
  const rows = (() => {
    if (Array.isArray(result)) return result;
    if (result && typeof result === 'object' && Array.isArray((result as { rows?: unknown }).rows)) {
      return (result as { rows: unknown[] }).rows;
    }
    return null;
  })();

  if (!rows || rows.length === 0) {
    throw new Error('Failed to allocate public order number from sequence (empty result).');
  }

  const row = rows[0] as Record<string, unknown>;
  const raw = row.n ?? row.nextval ?? Object.values(row)[0];
  const n =
    typeof raw === 'bigint'
      ? Number(raw)
      : typeof raw === 'number'
        ? raw
        : Number(String(raw));

  if (!Number.isInteger(n) || n < 1) {
    throw new Error(`Failed to allocate public order number from sequence (got ${String(raw)}).`);
  }
  return n;
}
