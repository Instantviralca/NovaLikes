/** Truncate to max length at the last word boundary; ellipsis counts toward max. */
export function truncateAtWordBoundary(
  text: string,
  max: number,
  ellipsis = '',
): string {
  const cleaned = text.replace(/\s+/g, ' ').trim();
  if (cleaned.length <= max) return cleaned;

  const budget = max - ellipsis.length;
  if (budget < 1) {
    return ellipsis.length > 0 ? ellipsis.slice(0, max) : cleaned.slice(0, max);
  }

  const sliced = cleaned.slice(0, budget);
  const lastSpace = sliced.lastIndexOf(' ');
  const base = lastSpace > 0 ? sliced.slice(0, lastSpace) : sliced.trimEnd();
  return `${base}${ellipsis}`;
}
