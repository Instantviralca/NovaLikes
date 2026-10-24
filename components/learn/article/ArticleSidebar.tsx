import Link from 'next/link';
import { ArrowRight, Heart } from 'lucide-react';
import type { ReactNode } from 'react';

import { TableOfContents } from '@/components/learn/article/TableOfContents';
import {
  formatLearnDate,
  formatLearnMinShort,
} from '@/components/learn/site-v2/learn-format';
import { SITE_V2_COPY } from '@/data/content/site-v2-copy';
import { getArticlesByCategory, getCategoryById } from '@/lib/learn/taxonomy';
import type { LearnTocItem, PublicLearnArticle } from '@/types/learn';

type ArticleSidebarProps = {
  tocItems?: LearnTocItem[];
  /** Current article: drives the category CTA and the "More in {category}" list. */
  article?: Pick<PublicLearnArticle, 'category' | 'categoryName' | 'slug'>;
  children?: ReactNode;
};

type SidebarCta = {
  title: string;
  body: string;
  primary: { label: string; href: string };
  secondary: { label: string; href: string };
};

function resolveCta(categorySlug: string | undefined): SidebarCta {
  const table = SITE_V2_COPY.learn.sidebar.cta as Record<string, SidebarCta>;
  return (categorySlug ? table[categorySlug] : undefined) ?? table.default;
}

/**
 * Sticky 320px desktop sidebar — Document 15.02, site-v2 layout:
 * TOC, category CTA card, "More in {category}".
 */
export function ArticleSidebar({
  tocItems = [],
  article,
  children,
}: ArticleSidebarProps) {
  const copy = SITE_V2_COPY.learn.sidebar;
  const category = article ? getCategoryById(article.category) : undefined;
  const cta = resolveCta(category?.slug);
  const more = article
    ? getArticlesByCategory(article.category)
        .filter((item) => item.slug !== article.slug)
        .slice(0, 3)
    : [];

  return (
    <aside className="art-side">
      <div className="side-sticky">
        <TableOfContents items={tocItems} />

        <div className="side-cta">
          <span className="gm" aria-hidden="true">
            <Heart size={18} fill="currentColor" strokeWidth={0} />
          </span>
          <p className="side-cta-title">{cta.title}</p>
          <p>{cta.body}</p>
          <Link className="btn block" href={cta.primary.href}>
            {cta.primary.label}
          </Link>
          <Link className="tlink" href={cta.secondary.href}>
            {cta.secondary.label} <ArrowRight className="ic" aria-hidden="true" />
          </Link>
        </div>

        {more.length > 0 && article ? (
          <div className="side-list">
            <p className="side-k">
              {copy.moreIn.replace('{category}', article.categoryName)}
            </p>
            {more.map((item) => (
              <Link key={item.id} href={item.href}>
                <b>{item.title}</b>
                <span className="meta">
                  {formatLearnDate(item.publishedAt)} ·{' '}
                  {formatLearnMinShort(item.readingTime)}
                </span>
              </Link>
            ))}
          </div>
        ) : null}

        {children}
      </div>
    </aside>
  );
}
