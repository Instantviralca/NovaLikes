import { HomepageHubSections } from '@/components/marketing/homepage-hub-sections';
import { HomepageStickyCta } from '@/components/marketing/homepage-sticky-cta';

/**
 * Homepage composition — multi-platform commercial hub (Phase 1A).
 * Dedicated /buy-* pages remain transactional authorities.
 * Footer is global (SiteLayout).
 */
export function HomePageView() {
  return (
    <div className="pb-[4.75rem] lg:pb-0">
      <HomepageHubSections />
      <HomepageStickyCta href="#services-overview" label="Explore services" />
    </div>
  );
}
