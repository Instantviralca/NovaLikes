import { SITE_V2_COPY } from '@/data/content/site-v2-copy';
import type { LearnTocItem } from '@/types/learn';

type TableOfContentsProps = {
  title?: string;
  items: LearnTocItem[];
  /**
   * `sidebar`: always-visible `.toc` in the 320px column.
   * `mobile`: collapsible `.toc-mobile` box at the top of the article (<1024px).
   */
  variant?: 'sidebar' | 'mobile';
};

function TocList({ items }: { items: LearnTocItem[] }) {
  return (
    <ol>
      {items.map((item, index) => (
        <li key={item.id}>
          {/* `.on` is toggled on scroll by ArticleScrollChrome; the first link starts active. */}
          <a
            href={item.href}
            className={index === 0 ? 'on' : undefined}
            style={item.level === 3 ? { paddingLeft: 28 } : undefined}
          >
            {item.label}
          </a>
        </li>
      ))}
    </ol>
  );
}

/**
 * Article TOC — Document 15.02, site-v2 markup.
 * Server-rendered; scroll highlighting lives in `ArticleScrollChrome`.
 */
export function TableOfContents({
  title = SITE_V2_COPY.learn.sidebar.onThisPage,
  items,
  variant = 'sidebar',
}: TableOfContentsProps) {
  if (items.length === 0) return null;

  if (variant === 'mobile') {
    return (
      <details className="toc-mobile glance">
        <summary className="toc-k" style={{ cursor: 'pointer' }}>
          {title}
        </summary>
        <nav className="toc" aria-label={title}>
          <TocList items={items} />
        </nav>
      </details>
    );
  }

  return (
    <nav className="toc" aria-label={title}>
      <p className="toc-k">{title}</p>
      <TocList items={items} />
    </nav>
  );
}
