/**
 * Generate Canada market content overlays from English source.
 * Run: npx tsx scripts/generate-ca-overlays.ts
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';

import { homepageHub } from '../data/content/homepage-hub';
import { buildDummyAuthorityPage } from '../data/content/dummy-service-authority-config';
import { INSTAGRAM_FOLLOWERS_PAGE_CONFIG } from '../data/content/instagram-followers-page-config';
import { getFaqItemsByIds } from '../data/content/faq';
import { getServiceContentBySlug } from '../data/content/services';
import { getServiceBySlug } from '../data/services';
import { CORE_SERVICE_SLUGS } from '../lib/i18n/config';
import { getEnglishMetadataBundle } from '../lib/i18n/metadata';

const OUT = path.join(process.cwd(), 'content', 'markets', 'ca');

function canadaizeString(value: string): string {
  if (!value.trim()) return value;
  return value
    .replace(/Grow Your Social Presence with NovaLikes/g, 'Grow Your Social Presence in Canada with NovaLikes')
    .replace(/Buy Instagram Followers(?! in Canada)/g, 'Buy Instagram Followers in Canada')
    .replace(/Buy Instagram Likes(?! in Canada)/g, 'Buy Instagram Likes in Canada')
    .replace(/Buy Instagram Views(?! in Canada)/g, 'Buy Instagram Views in Canada')
    .replace(/Buy Instagram Comments(?! in Canada)/g, 'Buy Instagram Comments in Canada')
    .replace(/Buy TikTok Followers(?! in Canada)/g, 'Buy TikTok Followers in Canada')
    .replace(/Buy TikTok Likes(?! in Canada)/g, 'Buy TikTok Likes in Canada')
    .replace(/Buy TikTok Views(?! in Canada)/g, 'Buy TikTok Views in Canada')
    .replace(/Buy Facebook Followers(?! in Canada)/g, 'Buy Facebook Followers in Canada')
    .replace(/Buy Facebook Page Likes(?! in Canada)/g, 'Buy Facebook Page Likes in Canada')
    .replace(/Buy Facebook Post Likes(?! in Canada)/g, 'Buy Facebook Post Likes in Canada')
    .replace(/\bworldwide\b/gi, 'in Canada')
    .replace(/\bWorldwide\b/g, 'Canada')
    .replace(/creators, businesses, brands/gi, 'creators, businesses and brands in Canada')
    .replace(/creators and brands/gi, 'Canadian creators and brands')
    .replace(/Canadian Canadian/g, 'Canadian')
    .replace(/in Canada in Canada/g, 'in Canada');
}

function walkCanadaize<T>(value: T): T {
  if (typeof value === 'string') return canadaizeString(value) as T;
  if (Array.isArray(value)) return value.map((item) => walkCanadaize(item)) as T;
  if (value && typeof value === 'object') {
    const result: Record<string, unknown> = {};
    for (const [key, child] of Object.entries(value)) {
      result[key] = walkCanadaize(child);
    }
    return result as T;
  }
  return value;
}

function prefixCanadaServiceHrefs<T>(value: T): T {
  if (typeof value === 'string') {
    if (value.startsWith('/buy-')) return `/ca${value}` as T;
    return value;
  }
  if (Array.isArray(value)) return value.map((item) => prefixCanadaServiceHrefs(item)) as T;
  if (value && typeof value === 'object') {
    const result: Record<string, unknown> = {};
    for (const [key, child] of Object.entries(value)) {
      result[key] = prefixCanadaServiceHrefs(child);
    }
    return result as T;
  }
  return value;
}

function writeJson(relative: string, data: unknown) {
  const file = path.join(OUT, relative);
  mkdirSync(path.dirname(file), { recursive: true });
  writeFileSync(file, `${JSON.stringify(data, null, 2)}\n`, 'utf8');
}

const meta = getEnglishMetadataBundle();
writeJson('metadata.json', {
  homepage: {
    title: 'Buy Followers, Likes & Views in Canada | NovaLikes',
    description:
      'NovaLikes helps Canadian creators, businesses and brands grow on Instagram, TikTok and Facebook. Compare follower, like, view and comment packages with clear pricing, no password required, secure checkout and order tracking.',
  },
  services: Object.fromEntries(
    CORE_SERVICE_SLUGS.map((slug) => [
      slug,
      {
        title: `${getServiceBySlug(slug)?.navigationLabel ?? slug} in Canada | NovaLikes`,
        description: canadaizeString(meta.services[slug]?.description ?? ''),
      },
    ]),
  ),
});

const caHomepage = prefixCanadaServiceHrefs(walkCanadaize(structuredClone(homepageHub)));
caHomepage.hero.eyebrow = 'INSTAGRAM • TIKTOK • FACEBOOK • CANADA';
caHomepage.hero.title = 'Grow Your Social Presence in Canada with NovaLikes';
caHomepage.hero.description =
  'Buy followers, likes, views and comments for Instagram, TikTok and Facebook in Canada. NovaLikes gives Canadian creators, businesses and brands clear package options for each service, so you can choose what fits your account and order without sharing your password. Select a service, pick a package, enter the required public profile or content details, and complete your order online.';
caHomepage.platformSelector.description =
  'Start with the platform you want to grow in Canada. Each one has its own services and package options, so you can go straight to what you need.';
caHomepage.servicesOverview.description =
  'Choose the service that matches what you want to grow in Canada. NovaLikes offers followers, likes, views, comments, Page likes and post likes across Instagram, TikTok and Facebook. Open any service to compare package sizes and prices.';
writeJson('homepage.json', caHomepage);

for (const slug of CORE_SERVICE_SLUGS) {
  const content = getServiceContentBySlug(slug);
  if (!content) continue;
  const service = getServiceBySlug(slug);
  const caContent = walkCanadaize(structuredClone(content));
  caContent.seo.title = `${service?.navigationLabel ?? slug} in Canada | NovaLikes`;
  caContent.seo.description = canadaizeString(caContent.seo.description);
  caContent.hero.eyebrow = `${(service?.platform ?? 'social').toUpperCase()} SERVICES FOR CANADA`;
  if (!caContent.hero.title.includes('Canada')) {
    caContent.hero.title = `${caContent.hero.title} in Canada`;
  }
  caContent.hero.description = canadaizeString(caContent.hero.description);

  const overlay: Record<string, unknown> = { content: caContent };
  if (slug === 'buy-instagram-followers') {
    overlay.followersAuthority = walkCanadaize(structuredClone(INSTAGRAM_FOLLOWERS_PAGE_CONFIG));
  } else if (service) {
    overlay.dummy = walkCanadaize(buildDummyAuthorityPage(service));
  }
  writeJson(`services/${slug}.json`, overlay);
}

const faqEntries: Array<{ id: string; question: string; answer: string }> = [];
for (const slug of CORE_SERVICE_SLUGS) {
  const content = getServiceContentBySlug(slug);
  if (!content) continue;
  for (const item of getFaqItemsByIds(content.faq.faqIds)) {
    faqEntries.push({
      id: item.id,
      question: canadaizeString(item.question),
      answer: canadaizeString(item.answer),
    });
  }
}
writeJson('service-faqs.json', faqEntries);

console.log(`Wrote Canada overlays to ${OUT}`);
