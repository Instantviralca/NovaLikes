import { ArticleScrollChrome } from '@/components/learn/site-v2/ArticleScrollChrome';

/**
 * Reading progress — Document 15.02.
 * Site-v2: 3px gradient `.progress` bar; the same scroll handler also highlights the TOC
 * (see `ArticleScrollChrome`). Decorative for screen readers.
 */
export function ReadingProgress() {
  return <ArticleScrollChrome />;
}
