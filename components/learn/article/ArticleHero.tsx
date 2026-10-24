import { ArticleMeta } from '@/components/learn/article/ArticleMeta';
import { LearnCrumbs } from '@/components/learn/site-v2/LearnCrumbs';
import { getLearnArticleBreadcrumbs } from '@/lib/learn';
import type { PublicLearnArticle } from '@/types/learn';

type ArticleHeroProps = {
  article: PublicLearnArticle;
};

/**
 * Article head — Document 15.02, site-v2: crumbs, H1, excerpt as lead, byline + share.
 * Single H1 from article data.
 */
export function ArticleHero({ article }: ArticleHeroProps) {
  const breadcrumbs = getLearnArticleBreadcrumbs(article.slug);

  return (
    <header className="art-head">
      <LearnCrumbs items={breadcrumbs} sourceSlug={article.slug} />
      <h1 className="h1">{article.title}</h1>
      <p className="lead">{article.excerpt}</p>
      <ArticleMeta article={article} />
    </header>
  );
}
