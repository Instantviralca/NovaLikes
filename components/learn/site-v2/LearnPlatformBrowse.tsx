import Link from 'next/link';

import type { PublicLearnCategory } from '@/types/learn';

type LearnPlatformBrowseProps = {
  categories: PublicLearnCategory[];
  title?: string;
  description?: string;
};

/**
 * "Browse by platform" — compact one-row cards (name + article count).
 * Empty categories keep their links and show "coming soon", as on live.
 */
export function LearnPlatformBrowse({
  categories,
  title = 'Browse by platform',
  description = 'Jump into Instagram, TikTok, Facebook, or broader growth topics.',
}: LearnPlatformBrowseProps) {
  if (categories.length === 0) return null;

  return (
    <section className="platform-browse" aria-labelledby="browse-by-platform">
      <h2 id="browse-by-platform" className="h2">
        {title}
      </h2>
      <p className="lead" style={{ marginTop: 8, maxWidth: 560 }}>
        {description}
      </p>
      <ul className="platform-cards">
        {categories.map((category) => (
          <li key={category.id}>
            <Link href={category.href} className="platform-card">
              <h3>{category.name}</h3>
              <span>
                {category.articleCount === 0
                  ? 'coming soon'
                  : `${category.articleCount} article${category.articleCount === 1 ? '' : 's'}`}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
