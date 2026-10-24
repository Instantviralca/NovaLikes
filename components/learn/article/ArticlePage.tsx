import { ArticleClosingCta } from '@/components/learn/article/ArticleClosingCta';
import { ArticleContent } from '@/components/learn/article/ArticleContent';
import { ArticleFAQ } from '@/components/learn/article/ArticleFAQ';
import { ArticleFeaturedImage } from '@/components/learn/article/ArticleFeaturedImage';
import { ArticleHero } from '@/components/learn/article/ArticleHero';
import { ArticleSidebar } from '@/components/learn/article/ArticleSidebar';
import { AuthorBox } from '@/components/learn/article/AuthorBox';
import { KeyTakeaways } from '@/components/learn/article/KeyTakeaways';
import { ReadingProgress } from '@/components/learn/article/ReadingProgress';
import { RelatedArticles } from '@/components/learn/article/RelatedArticles';
import { RelatedServices } from '@/components/learn/article/RelatedServices';
import { TableOfContents } from '@/components/learn/article/TableOfContents';
import { LearnBlogBar } from '@/components/learn/site-v2/LearnBlogBar';
import { SiteV2Shell } from '@/components/site-v2/site-v2-shell';
import { getLearnArticleClosingCta } from '@/lib/learn/article/closing-cta';
import { splitArticleIntro } from '@/lib/learn/article/layout';
import {
  getArticleRelatedLinks,
  prepareArticleForRender,
} from '@/lib/learn/article';
import { getCategories, getCategoryById } from '@/lib/learn/taxonomy';
import type { PublicLearnArticle } from '@/types/learn';

type ArticlePageProps = {
  article: PublicLearnArticle;
  /** Preview chrome for authorized editors only. */
  preview?: boolean;
};

/**
 * Reusable Learn article template — Document 15.02, site-v2 layout.
 * Optional sections render only when content exists.
 * Section order: FAQ → Related services → Related guides → Author box → Closing CTA.
 */
export function ArticlePage({
  article,
  preview = false,
}: ArticlePageProps) {
  const prepared = prepareArticleForRender(article);
  const related = getArticleRelatedLinks(prepared.article);
  const relatedList = related.articles.filter(
    (item) => item.slug !== prepared.article.slug,
  );
  const closingCta = getLearnArticleClosingCta(prepared.article);
  const { intro, body } = splitArticleIntro(prepared.blocks);
  const tabs = getCategories()
    .filter((item) => item.articleCount > 0)
    .map(({ slug, name, href, articleCount }) => ({ slug, name, href, articleCount }));
  const activeCategory = getCategoryById(prepared.article.category)?.slug ?? null;

  return (
    <SiteV2Shell>
      <ReadingProgress />

      {preview ? (
        <div className="bg-amber-100 px-4 py-2 text-center text-sm text-amber-950">
          Preview mode — this draft is noindex and must not appear in the sitemap.
        </div>
      ) : null}

      <LearnBlogBar categories={tabs} active={activeCategory} searchMode="navigate" />

      <div className="wrap art-top">
        <div className="art-grid">
          <article data-learn-article className="art-main">
            <ArticleHero article={prepared.article} />

            {prepared.article.featuredImage ? (
              <ArticleFeaturedImage image={prepared.article.featuredImage} priority />
            ) : null}

            <TableOfContents items={prepared.toc} variant="mobile" />

            <div className="prose">
              {intro.length > 0 ? <ArticleContent blocks={intro} /> : null}

              <KeyTakeaways
                title="At a glance"
                items={prepared.article.keyTakeaways}
              />

              {body.length > 0 ? <ArticleContent blocks={body} /> : null}
            </div>

            <ArticleFAQ items={prepared.article.faqs} />

            <RelatedServices
              services={related.services}
              prominentCta={prepared.article.serviceCta}
            />

            <RelatedArticles
              articles={relatedList}
              currentSlug={prepared.article.slug}
            />

            <AuthorBox authorId={prepared.article.authorId} author={prepared.article.author} />

            {closingCta ? <ArticleClosingCta cta={closingCta} /> : null}
          </article>

          <ArticleSidebar tocItems={prepared.toc} article={prepared.article} />
        </div>
      </div>
    </SiteV2Shell>
  );
}
