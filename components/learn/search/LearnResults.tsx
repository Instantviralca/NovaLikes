'use client';

import Link from 'next/link';

import { TagBadge } from '@/components/learn/taxonomy/TagBadge';
import { getPublicTagsForSlugs } from '@/lib/learn/taxonomy';
import { cn } from '@/lib/utils';
import type { ArticleSearchDocument } from '@/types/learn-search';

export type LearnResultsProps = {
  items: ArticleSearchDocument[];
  onResultClick?: (item: ArticleSearchDocument) => void;
  className?: string;
};

function formatDate(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return '';
  return new Intl.DateTimeFormat('en', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date);
}

/**
 * Search result grid — Document 15.05.
 * Renders index documents (metadata only), not full article bodies.
 */
export function LearnResults({
  items,
  onResultClick,
  className,
}: LearnResultsProps) {
  if (items.length === 0) return null;

  return (
    <ul
      className={cn(
        'grid gap-4 sm:grid-cols-2 lg:grid-cols-3',
        className,
      )}
    >
      {items.map((item) => {
        const tags = getPublicTagsForSlugs(item.tags).slice(0, 3);
        return (
          <li key={item.id}>
            <article className="group flex h-full flex-col border border-neutral-200 bg-white p-5 transition-colors hover:border-neutral-400">
              <p className="text-xs font-medium uppercase tracking-wide text-neutral-500">
                {item.categoryName}
              </p>
              <h3 className="mt-2 text-lg font-semibold text-neutral-900">
                <Link
                  href={item.href}
                  className="rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2"
                  onClick={() => onResultClick?.(item)}
                >
                  <span className="group-hover:underline">{item.title}</span>
                </Link>
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-neutral-600">
                {item.excerpt}
              </p>
              <div className="mt-4 flex flex-wrap gap-x-3 gap-y-1 text-xs text-neutral-500">
                {item.authorName ? <span>{item.authorName}</span> : null}
                {item.publishedAt ? (
                  <time dateTime={item.publishedAt}>
                    {formatDate(item.publishedAt)}
                  </time>
                ) : null}
                <span>{item.readingTime} min read</span>
              </div>
              {tags.length > 0 ? (
                <div className="mt-3 flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <TagBadge key={tag.id} tag={tag} />
                  ))}
                </div>
              ) : null}
            </article>
          </li>
        );
      })}
    </ul>
  );
}
