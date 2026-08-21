/**
 * Breadcrumb builder from the shared link registry — Document 14.05.
 * Reuses one BreadcrumbList schema via schemas/breadcrumb.ts.
 *
 * Commercial service pages use Home > Current Service until an indexable
 * platform hub exists. Empty/noindex Learn taxonomy pages are never inserted
 * as parent breadcrumb nodes.
 */

import { getLinkPageBySlug, linkPageHref } from '@/data/linking/registry';
import type { BreadcrumbItem } from '@/types/shared';

const MAX_DEPTH = 8;

/**
 * Build breadcrumb trail for a registry slug.
 * Service pages resolve Home > Current Service (no empty Learn parents).
 */
export function buildBreadcrumb(slug: string): BreadcrumbItem[] {
  const page = getLinkPageBySlug(slug);
  if (!page) {
    return [{ label: 'Home', href: '/' }];
  }

  const chain: string[] = [];
  let current: string | undefined = slug;
  let depth = 0;

  while (current && depth < MAX_DEPTH) {
    if (chain.includes(current)) break;
    chain.unshift(current);
    const node = getLinkPageBySlug(current);
    current = node?.breadcrumbParent;
    depth += 1;
  }

  if (chain[0] !== 'home') {
    chain.unshift('home');
  }

  return chain.map((itemSlug, index) => {
    const node = getLinkPageBySlug(itemSlug);
    const isLast = index === chain.length - 1;
    const label = node?.title ?? itemSlug;

    // Current page: no href (or href optional). Parents: href only if active.
    if (isLast) {
      return { label };
    }

    if (itemSlug === 'home') {
      return { label: 'Home', href: '/' };
    }

    if (node?.active) {
      return { label, href: linkPageHref(itemSlug) };
    }

    // Inactive platform hubs etc. — label only (prevents broken links)
    return { label };
  });
}
