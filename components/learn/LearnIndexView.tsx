import { FeaturedArticles } from '@/components/learn/FeaturedArticles';
import { LearnBlogBar } from '@/components/learn/site-v2/LearnBlogBar';
import { LearnBlogHead } from '@/components/learn/site-v2/LearnBlogHead';
import { LearnFeaturedCard } from '@/components/learn/site-v2/LearnFeaturedCard';
import { LearnGrowBox } from '@/components/learn/site-v2/LearnGrowBox';
import { LearnPlatformBrowse } from '@/components/learn/site-v2/LearnPlatformBrowse';
import { LearnTopics } from '@/components/learn/site-v2/LearnTopics';
import { SiteV2Shell } from '@/components/site-v2/site-v2-shell';
import { SITE_V2_COPY } from '@/data/content/site-v2-copy';
import {
  getLearnIndexBreadcrumbs,
  listPublicLearnArticles,
  listPublicLearnCategories,
} from '@/lib/learn';
import { getPopularTags } from '@/lib/learn/taxonomy';
import type { PublicLearnArticle } from '@/types/learn';

type LearnIndexViewProps = {
  articles?: PublicLearnArticle[];
};

function byNewest(a: PublicLearnArticle, b: PublicLearnArticle) {
  return Date.parse(b.publishedAt) - Date.parse(a.publishedAt);
}

/**
 * Learn Center index — Documents 15.01 + 15.04 + 15.05, site-v2 layout.
 *
 * `NewsletterCTA` is intentionally not rendered: `learnConfig.newsletterEnabled` is false
 * and the component has no working signup. The grow box takes its place.
 */
export function LearnIndexView({ articles: articlesProp }: LearnIndexViewProps) {
  const allCategories = listPublicLearnCategories();
  const tabCategories = allCategories
    .filter((category) => category.articleCount > 0)
    .map(({ slug, name, href, articleCount }) => ({ slug, name, href, articleCount }));
  const articles = (articlesProp ?? listPublicLearnArticles()).slice().sort(byNewest);
  const breadcrumbs = getLearnIndexBreadcrumbs();
  const popularTags = getPopularTags(10);
  const featured = articles[0];
  const remaining = articles.slice(1);

  return (
    <SiteV2Shell>
      <LearnBlogBar
        categories={tabCategories}
        active="all"
        searchMode="inline"
      />

      <section className="wrap">
        <LearnBlogHead
          breadcrumbs={breadcrumbs}
          title="Social Media Guides & Resources"
          description={SITE_V2_COPY.learn.indexIntro}
        />

        <LearnTopics tags={popularTags} />

        <FeaturedArticles
          title="All articles"
          meta={SITE_V2_COPY.learn.newestFirst}
          articles={articles}
          defaultArticles={remaining.length > 0 ? remaining : articles}
          featuredSlot={
            featured ? (
              <>
                <LearnFeaturedCard article={featured} />
                <LearnPlatformBrowse categories={allCategories} />
              </>
            ) : (
              <LearnPlatformBrowse categories={allCategories} />
            )
          }
        />
      </section>

      <LearnGrowBox />
    </SiteV2Shell>
  );
}
