/**
 * Next.js viewport prefetch of /buy-* pulls the heavy service commerce chunk.
 * Disable automatic prefetch for those destinations; keep default for other routes.
 */
export function prefetchForHref(href: string): false | undefined {
  const path = href.split('?')[0]?.split('#')[0] ?? href;
  if (path.startsWith('/buy-')) return false;
  return undefined;
}
