import { HomepageHubSections } from '@/components/marketing/homepage-hub-sections';
import { HomepageStickyCta } from '@/components/marketing/homepage-sticky-cta';
import { homepageHub, type HomepageHub } from '@/data/content/homepage-hub';
import { ENGLISH_UI, type UiDictionary } from '@/lib/i18n/content/ui-english';

/**
 * Homepage composition — multi-platform commercial hub (Phase 1A).
 * Dedicated /buy-* pages remain transactional authorities.
 * Footer is global (SiteLayout).
 */
export function HomePageView({
  hub = homepageHub,
  stickyCtaLabel = ENGLISH_UI.homepage.exploreServices,
  stickyCtaHref = '#services-overview',
  homepageLabels = ENGLISH_UI.homepage as UiDictionary['homepage'],
}: {
  hub?: HomepageHub;
  stickyCtaLabel?: string;
  stickyCtaHref?: string;
  homepageLabels?: UiDictionary['homepage'];
}) {
  return (
    <div className="pb-[4.75rem] lg:pb-0">
      <HomepageHubSections hub={hub} labels={homepageLabels} />
      <HomepageStickyCta href={stickyCtaHref} label={stickyCtaLabel} />
    </div>
  );
}
