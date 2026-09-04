/**
 * Verify all Australia market content overlays load without validation errors.
 * Run: npx tsx scripts/verify-au-content.ts
 */
import { CORE_SERVICE_SLUGS } from '../lib/i18n/config';
import {
  loadMarketHomepageHub,
  loadMarketMetadataBundle,
  loadMarketServiceBundle,
} from '../lib/market/content/load';

const market = 'au' as const;

loadMarketMetadataBundle(market);
loadMarketHomepageHub(market);

for (const slug of CORE_SERVICE_SLUGS) {
  const bundle = loadMarketServiceBundle(market, slug);
  const faqIds = bundle.content.faq.faqIds ?? [];
  if (faqIds.length === 0) {
    throw new Error(`No FAQ IDs for au/${slug}`);
  }
  console.log(`OK au/${slug} (${faqIds.length} FAQs)`);
}

console.log('All 11 Australia market routes have valid content overlays.');
