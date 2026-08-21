/**
 * Dump frozen English commercial copy for locale overlays.
 * Run: npx tsx scripts/dump-i18n-english.ts
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';

import {
  getEnglishFaqItemsSource,
  getEnglishFaqPageSource,
  getEnglishHomepageSource,
  getEnglishMetadataSource,
  getEnglishServiceBundle,
  getEnglishUiSource,
  getEnglishAboutSource,
  getEnglishContactSource,
  getEnglishReviewsPageSource,
  getEnglishPrivacySource,
  getEnglishRefundSource,
  getEnglishTermsSource,
  getEnglishCookiesSource,
  getEnglishDisclaimerSource,
} from '../lib/i18n/content/english-source';
import { CORE_SERVICE_SLUGS } from '../lib/i18n/config';

const outDir = path.join(process.cwd(), 'content', 'locales', '_english');

function write(name: string, data: unknown) {
  mkdirSync(path.dirname(path.join(outDir, name)), { recursive: true });
  writeFileSync(path.join(outDir, name), JSON.stringify(data, null, 2), 'utf8');
}

mkdirSync(path.join(outDir, 'services'), { recursive: true });
write('homepage.json', getEnglishHomepageSource());
write('faq-page.json', getEnglishFaqPageSource());
write('faq-items.json', getEnglishFaqItemsSource());
write('ui.json', getEnglishUiSource());
write('metadata.json', getEnglishMetadataSource());
write('about.json', getEnglishAboutSource());
write('contact.json', getEnglishContactSource());
write('reviews.json', getEnglishReviewsPageSource());
write('privacy.json', getEnglishPrivacySource());
write('refund.json', getEnglishRefundSource());
write('terms.json', getEnglishTermsSource());
write('cookies.json', getEnglishCookiesSource());
write('disclaimer.json', getEnglishDisclaimerSource());

for (const slug of CORE_SERVICE_SLUGS) {
  write(`services/${slug}.json`, getEnglishServiceBundle(slug));
}

console.log('Dumped English i18n source to', outDir);
