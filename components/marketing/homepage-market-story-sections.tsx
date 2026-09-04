import type { HubStorySection } from '@/data/content/homepage-hub';
import { homepageHub, type HomepageHub } from '@/data/content/homepage-hub';

import { MarketStorySections } from './market-story-sections';

export { MarketStorySections };

export function HomepageMarketStorySections({ hub = homepageHub }: { hub?: HomepageHub }) {
  const sections = hub.storySections;
  if (!sections?.length) return null;
  return <MarketStorySections sections={sections} market={hub.market} />;
}

export type { HubStorySection };
