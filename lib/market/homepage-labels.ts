import { ENGLISH_UI } from '@/lib/i18n/content/ui-english';
import type { Market } from '@/lib/market/config';

const MARKET_EXPLORE_SERVICES_ARIA: Record<Market, string> = {
  ca: 'Explore NovaLikes Instagram services in Canada',
  au: 'Explore NovaLikes Instagram services in Australia',
  us: 'Explore NovaLikes Instagram services in the United States',
  uk: 'Explore NovaLikes Instagram services in the United Kingdom',
};

export function getMarketHomepageLabels(market: Market) {
  const base = ENGLISH_UI.homepage;
  return {
    ...base,
    exploreServices: 'Explore Instagram Services',
    exploreServicesAria: MARKET_EXPLORE_SERVICES_ARIA[market],
  };
}
