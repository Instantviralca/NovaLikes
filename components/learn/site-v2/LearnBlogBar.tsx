'use client';

import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Search } from 'lucide-react';
import {
  Suspense,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  useTransition,
} from 'react';

import { LEARN_SEARCH_DEBOUNCE_MS } from '@/config/learn-search';
import { routes } from '@/config/routes';
import { SITE_V2_COPY } from '@/data/content/site-v2-copy';
import {
  learnSearchAnalyticsEvents,
  trackLearnSearchEvent,
} from '@/lib/analytics/learn-search-events';
import { sanitizeSearchQuery } from '@/lib/learn/search/sanitize';

import '@/components/learn/site-v2/learn-v2.css';

export type LearnBlogBarCategory = {
  slug: string;
  name: string;
  href: string;
  articleCount: number;
};

type LearnBlogBarProps = {
  /** Categories with at least one published article. */
  categories: LearnBlogBarCategory[];
  /** `'all'` = All guides tab, a category slug, or `null` for no active tab (tag pages). */
  active: 'all' | string | null;
  /**
   * `inline`: list pages. Typing updates the existing Learn `q` URL param in place.
   * `navigate`: article pages. Submitting opens `/learn?q=…`.
   */
  searchMode: 'inline' | 'navigate';
};

type BarInnerProps = LearnBlogBarProps & {
  /** Query currently in the URL (inline mode). */
  urlQuery: string;
  onCommit: (value: string, submit: boolean) => void;
  /** Native GET form target (article pages): no router needed, works without JS. */
  formAction?: string;
};

function BlogBarInner({
  categories,
  active,
  urlQuery,
  onCommit,
  formAction,
}: BarInnerProps) {
  const copy = SITE_V2_COPY.learn;
  const inputId = useId();
  const [value, setValue] = useState(urlQuery);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const startedRef = useRef(false);

  useEffect(() => {
    setValue(urlQuery);
  }, [urlQuery]);

  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

  const onChange = (next: string) => {
    setValue(next);
    if (!startedRef.current && next.trim()) {
      startedRef.current = true;
      trackLearnSearchEvent(learnSearchAnalyticsEvents.learn_search_start, {
        queryLength: next.trim().length,
      });
    }
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => onCommit(next, false), LEARN_SEARCH_DEBOUNCE_MS);
  };

  return (
    <div className="blog-bar">
      <div className="wrap">
        <nav className="blog-tabs" aria-label={copy.tabsLabel}>
          <Link href={routes.learn} aria-current={active === 'all' ? 'page' : undefined}>
            {copy.allTab}
          </Link>
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={category.href}
              aria-current={active === category.slug ? 'page' : undefined}
            >
              {category.name} <span className="n">{category.articleCount}</span>
            </Link>
          ))}
        </nav>
        <form
          className="blog-search"
          role="search"
          action={formAction}
          method={formAction ? 'get' : undefined}
          onSubmit={(event) => {
            if (debounceRef.current) clearTimeout(debounceRef.current);
            if (!formAction) event.preventDefault();
            onCommit(value, true);
          }}
        >
          <label className="sr" htmlFor={inputId}>
            {copy.searchLabel}
          </label>
          <div className="input">
            <Search className="ic" aria-hidden="true" />
            <input
              id={inputId}
              type="search"
              name={formAction ? 'q' : undefined}
              value={value}
              placeholder={copy.searchPlaceholder}
              autoComplete="off"
              enterKeyHint="search"
              onChange={(event) => onChange(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Escape' && value) {
                  event.preventDefault();
                  if (debounceRef.current) clearTimeout(debounceRef.current);
                  setValue('');
                  onCommit('', false);
                }
              }}
            />
          </div>
        </form>
      </div>
    </div>
  );
}

function InlineBlogBar(props: LearnBlogBarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();
  const urlQuery = sanitizeSearchQuery(searchParams.get('q'));
  const paramsString = searchParams.toString();

  const onCommit = useCallback(
    (raw: string, submit: boolean) => {
      const q = sanitizeSearchQuery(raw);
      // Same URL contract as `serializeLearnSearchParams`: `q` set/removed, page reset.
      const params = new URLSearchParams(paramsString);
      if (q) params.set('q', q);
      else params.delete('q');
      params.delete('page');
      const qs = params.toString();
      startTransition(() => {
        router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
      });
      if (submit) {
        trackLearnSearchEvent(learnSearchAnalyticsEvents.learn_search_submit, {
          queryLength: q.length,
        });
      }
    },
    [paramsString, pathname, router],
  );

  return <BlogBarInner {...props} urlQuery={urlQuery} onCommit={onCommit} />;
}

function NavigateBlogBar(props: LearnBlogBarProps) {
  // Article pages: submit as a native GET to `/learn?q=…` (the existing Learn `q` param).
  const onCommit = useCallback((raw: string, submit: boolean) => {
    if (!submit) return;
    trackLearnSearchEvent(learnSearchAnalyticsEvents.learn_search_submit, {
      queryLength: sanitizeSearchQuery(raw).length,
    });
  }, []);

  return (
    <BlogBarInner
      {...props}
      urlQuery=""
      onCommit={onCommit}
      formAction={routes.learn}
    />
  );
}

/**
 * Sticky site-v2 blog bar — category tabs + search.
 * Search reuses the existing Learn `q` URL param, sanitizer and debounce.
 */
export function LearnBlogBar(props: LearnBlogBarProps) {
  if (props.searchMode === 'navigate') {
    return <NavigateBlogBar {...props} />;
  }
  return (
    <Suspense
      fallback={<BlogBarInner {...props} urlQuery="" onCommit={() => undefined} />}
    >
      <InlineBlogBar {...props} />
    </Suspense>
  );
}