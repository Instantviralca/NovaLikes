import { HeroSection } from '@/components/marketing';
import {
  HomepageCommercialSection,
  HomepageDirectAnswerSection,
  HomepageFaqSection,
  HomepageFinalCtaSection,
  HomepageHowToBuySection,
  HomepageInstagramHubSection,
  HomepageTrustedReviewsSection,
  HomepageWhyNovaLikesSection,
} from '@/components/marketing/homepage-editorial-sections';
import {
  HomepageBuyingResponsiblySection,
  HomepageWhoWeHelpSection,
} from '@/components/marketing/homepage-extended-sections';
import { HomepageLearnSections } from '@/components/marketing/homepage-learn-sections';
import { HomepageStickyCta } from '@/components/marketing/homepage-sticky-cta';
import { getHomepageContent } from '@/data/content/homepage';
import { getPublishedLearnArticleRecords } from '@/data/learn/articles';
import { getHomepageReviews } from '@/lib/reviews';
import type { HomepageContent } from '@/types/content';

type HomePageViewProps = {
  content?: HomepageContent;
};

/**
 * Homepage composition — Buy Instagram Followers commercial authority.
 * Order: Hero → Quick Answer → Social Proof → Trust → How It Works → Services →
 * Who We Help → Reviews → Articles → Educational → FAQ → Final CTA.
 * Footer is global (SiteLayout).
 */
export function HomePageView({ content: _content = getHomepageContent() }: HomePageViewProps) {
  const hasPublishedGuides = getPublishedLearnArticleRecords().length > 0;
  const featuredReviews = getHomepageReviews(7);

  return (
    <div className="pb-[4.75rem] lg:pb-0">
      <HeroSection />
      <HomepageDirectAnswerSection />
      <HomepageCommercialSection />
      <HomepageWhyNovaLikesSection />
      <HomepageHowToBuySection />
      <HomepageInstagramHubSection />
      <HomepageWhoWeHelpSection />
      <HomepageTrustedReviewsSection reviews={featuredReviews} />
      {hasPublishedGuides ? <HomepageLearnSections /> : null}
      <HomepageBuyingResponsiblySection />
      <HomepageFaqSection />
      <HomepageFinalCtaSection />
      <HomepageStickyCta />
    </div>
  );
}
