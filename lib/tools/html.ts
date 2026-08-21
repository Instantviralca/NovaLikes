export function decodeHtmlEntities(value: string): string {
  return value
    .replace(/&#x([0-9a-f]+);/gi, (_, hex: string) => {
      const code = Number.parseInt(hex, 16);
      return Number.isNaN(code) ? '' : String.fromCodePoint(code);
    })
    .replace(/&#(\d+);/g, (_, dec: string) => {
      const code = Number.parseInt(dec, 10);
      return Number.isNaN(code) ? '' : String.fromCodePoint(code);
    })
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&nbsp;/g, ' ');
}

export function unescapeJsonishUrl(value: string): string {
  return decodeHtmlEntities(
    value
      .replace(/\\u002[fF]/g, '/')
      .replace(/\\u0025/g, '%')
      .replace(/\\u0026/g, '&')
      .replace(/\\\//g, '/')
      .replace(/\\u([0-9a-fA-F]{4})/g, (_, hex: string) =>
        String.fromCharCode(Number.parseInt(hex, 16)),
      ),
  );
}

export function metaContent(html: string, property: string): string | undefined {
  const pattern = new RegExp(
    `<meta[^>]+(?:property|name)=["']${property}["'][^>]+content=["']([^"']+)["']`,
    'i',
  );
  const alt = new RegExp(
    `<meta[^>]+content=["']([^"']+)["'][^>]+(?:property|name)=["']${property}["']`,
    'i',
  );
  const match = html.match(pattern) ?? html.match(alt);
  const value = match?.[1]?.trim();
  return value ? decodeHtmlEntities(value) : undefined;
}

export function extractScriptJson(html: string, id: string): unknown | null {
  const match = html.match(
    new RegExp(`<script[^>]*id=["']${id}["'][^>]*>([\\s\\S]*?)</script>`, 'i'),
  );
  if (!match?.[1]) return null;
  try {
    return JSON.parse(match[1]) as unknown;
  } catch {
    return null;
  }
}

export function firstString(...values: Array<unknown>): string | undefined {
  for (const value of values) {
    if (typeof value === 'string' && value.trim()) return value.trim();
  }
  return undefined;
}

export function asRecord(value: unknown): Record<string, unknown> | null {
  return value && typeof value === 'object' && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : null;
}

export function walkFindStrings(
  value: unknown,
  predicate: (key: string, value: string) => boolean,
  acc: string[] = [],
): string[] {
  if (!value || typeof value !== 'object') return acc;
  if (Array.isArray(value)) {
    for (const item of value) walkFindStrings(item, predicate, acc);
    return acc;
  }
  for (const [key, nested] of Object.entries(value)) {
    if (typeof nested === 'string' && predicate(key, nested)) acc.push(nested);
    else walkFindStrings(nested, predicate, acc);
  }
  return acc;
}
