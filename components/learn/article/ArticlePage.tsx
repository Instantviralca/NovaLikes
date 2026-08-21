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
import { TableOfContents } from '@/components/learn/article/TableOfContents';
import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { getLearnArticleClosingCta } from '@/lib/learn/article/closing-cta';
import { splitArticleIntro } from '@/lib/learn/article/layout';
import {
  getArticleRelatedLinks,
  prepareArticleForRender,
} from '@/lib/learn/article';
import type { PublicLearnArticle } from '@/types/learn';

type ArticlePageProps = {
  article: PublicLearnArticle;
  /** Preview chrome for authorized editors only. */
  preview?: boolean;
};

/**
 * Reusable Learn article template — Document 15.02.
 * Optional sections render only when content exists.
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

  return (
    <div className="overflow-x-hidden">
      <ReadingProgress />

      {preview ? (
        <div className="bg-amber-100 px-4 py-2 text-center text-sm text-amber-950">
          Preview mode — this draft is noindex and must not appear in the sitemap.
        </div>
      ) : null}

      <Section className="border-b border-[#F0E4D8] bg-[#FFF8F3]">
        <Container>
          <div className="mx-auto max-w-[800px] py-10 md:py-14">
            <ArticleHero article={prepared.article} />
          </div>
        </Container>
      </Section>

      <Section>
        <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-6">
          <div className="flex flex-col gap-10 lg:flex-row lg:justify-center lg:gap-12">
            <article
              data-learn-article
              className="mx-auto min-w-0 w-full max-w-[800px] space-y-8 lg:mx-0"
            >
              {prepared.article.featuredImage ? (
                <ArticleFeaturedImage
                  image={prepared.article.featuredImage}
                  priority
                />
              ) : null}

              <div className="lg:hidden">
                <TableOfContents items={prepared.toc} />
              </div>

              {intro.length > 0 ? <ArticleContent blocks={intro} /> : null}

              <KeyTakeaways
                title="At a glance"
                items={prepared.article.keyTakeaways}
              />

              {body.length > 0 ? <ArticleContent blocks={body} /> : null}

              <ArticleFAQ items={prepared.article.faqs} />

              <RelatedArticles
                articles={relatedList}
                currentSlug={prepared.article.slug}
              />

              <AuthorBox authorId={prepared.article.authorId} author={prepared.article.author} />

              {closingCta ? <ArticleClosingCta cta={closingCta} /> : null}
            </article>

            <div className="hidden w-[260px] shrink-0 lg:block">
              <ArticleSidebar tocItems={prepared.toc} />
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
