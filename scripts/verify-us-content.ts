/**
 * Verify all United States market content overlays load without validation errors.
 * Run: npx tsx scripts/verify-us-content.ts
 */
import { CORE_SERVICE_SLUGS } from '../lib/i18n/config';
import {
  loadMarketHomepageHub,
  loadMarketMetadataBundle,
  loadMarketServiceBundle,
} from '../lib/market/content/load';

const market = 'us' as const;

loadMarketMetadataBundle(market);
loadMarketHomepageHub(market);

for (const slug of CORE_SERVICE_SLUGS) {
  const bundle = loadMarketServiceBundle(market, slug);
  const faqIds = bundle.content.faq.faqIds ?? [];
  if (faqIds.length === 0) {
    throw new Error(`No FAQ IDs for us/${slug}`);
  }
  console.log(`OK us/${slug} (${faqIds.length} FAQs)`);
}

console.log('All 11 United States market routes have valid content overlays.');
