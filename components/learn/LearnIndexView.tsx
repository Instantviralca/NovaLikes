import { CategoryGrid } from '@/components/learn/CategoryGrid';
import { FeaturedArticles } from '@/components/learn/FeaturedArticles';
import { LearnIndexHero } from '@/components/learn/LearnIndexHero';
import { NewsletterCTA } from '@/components/learn/NewsletterCTA';
import { PopularTags } from '@/components/learn/taxonomy/PopularTags';
import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
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
 * Learn Center index — Documents 15.01 + 15.04 + 15.05.
 */
export function LearnIndexView({ articles: articlesProp }: LearnIndexViewProps) {
  const categories = listPublicLearnCategories();
  const articles = (articlesProp ?? listPublicLearnArticles()).slice().sort(byNewest);
  const breadcrumbs = getLearnIndexBreadcrumbs();
  const popularTags = getPopularTags(10);
  const featured = articles[0];
  const remaining = articles.slice(1);

  return (
    <div className="overflow-x-hidden">
      <LearnIndexHero
        breadcrumbs={breadcrumbs}
        articleCount={articles.length}
        categoryCount={categories.length}
        featured={featured}
      />

      <CategoryGrid
        title="Browse by platform"
        description="Jump into Instagram, TikTok, Facebook, or broader growth topics."
        categories={categories}
      />

      {popularTags.length > 0 ? (
        <Section className="border-y border-[#F0E4D8] bg-hero-wash">
          <Container>
            <PopularTags tags={popularTags} />
          </Container>
        </Section>
      ) : null}

      <div id="all-articles">
        <FeaturedArticles
          title="All articles"
          description="Every published Learn guide, newest first."
          articles={remaining.length > 0 ? remaining : articles}
        />
      </div>

      <Section>
        <Container>
          <NewsletterCTA />
        </Container>
      </Section>
    </div>
  );
}
