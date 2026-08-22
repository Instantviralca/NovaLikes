/**
 * Public Learn date metadata — keep editorial calendar dates separate from
 * sitemap / schema / Open Graph publication timestamps.
 *
 * Live public pages must never emit misleading future datePublished,
 * dateModified, or sitemap lastmod values just because an editorial
 * `scheduledAt` / target date was copied into publishedAt.
 */

export type PublicArticleDateFields = {
  publishedAt: string;
  updatedAt: string;
  showModifiedDate?: boolean;
};

export type PublicArticleTimestamps = {
  /** ISO date for schema/OG when truthful and not in the future. */
  datePublished?: string;
  /** ISO date for schema/OG when truthful and not in the future. */
  dateModified?: string;
  /** Sitemap lastmod when truthful and not in the future. */
  sitemapLastModified?: Date;
};

function parseIso(iso: string | undefined): Date | null {
  if (!iso) return null;
  const date = new Date(iso);
  return Number.isNaN(date.getTime()) ? null : date;
}

/** Return the ISO string only when it parses and is not after `now`. */
export function publicIsoTimestamp(
  iso: string | undefined,
  now: Date = new Date(),
): string | undefined {
  const date = parseIso(iso);
  if (!date) return undefined;
  if (date.getTime() > now.getTime()) return undefined;
  return date.toISOString();
}

/** Return a Date only when it parses and is not after `now`. */
export function publicDateTimestamp(
  iso: string | undefined,
  now: Date = new Date(),
): Date | undefined {
  const isoSafe = publicIsoTimestamp(iso, now);
  return isoSafe ? new Date(isoSafe) : undefined;
}

/**
 * Resolve public-facing publication timestamps for a live Learn article.
 * Editorial `scheduledAt` must not be passed here — use publishedAt/updatedAt only.
 */
export function resolvePublicArticleTimestamps(
  fields: PublicArticleDateFields,
  now: Date = new Date(),
): PublicArticleTimestamps {
  const datePublished = publicIsoTimestamp(fields.publishedAt, now);
  const rawModified = fields.showModifiedDate ? fields.updatedAt : fields.publishedAt;
  const dateModified = publicIsoTimestamp(rawModified, now) ?? datePublished;
  const sitemapSource = fields.showModifiedDate ? fields.updatedAt : fields.publishedAt;
  const sitemapLastModified = publicDateTimestamp(sitemapSource, now);

  return {
    datePublished,
    dateModified,
    sitemapLastModified,
  };
}
