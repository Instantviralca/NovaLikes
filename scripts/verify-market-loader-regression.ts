/**
 * 44-route market regression + story/image checks (no content mutation).
 */
import { readFileSync, existsSync } from 'node:fs';
import path from 'node:path';

import { CORE_SERVICE_SLUGS } from '../lib/i18n/config';
import { MARKETS, type Market } from '../lib/market/config';
import {
  loadMarketHomepageHub,
  loadMarketMetadataBundle,
  loadMarketServiceBundle,
} from '../lib/market/content/load';
import { getUniqueServiceImage, getUniqueStoryImage } from '../lib/market/unique-service-images';

const CA_STORY_COUNTS: Record<string, number> = {
  homepage: 12,
  'buy-instagram-followers': 12,
  'buy-instagram-likes': 12,
  'buy-instagram-views': 10,
  'buy-instagram-comments': 11,
  'buy-tiktok-followers': 10,
  'buy-tiktok-likes': 10,
  'buy-tiktok-views': 11,
  'buy-facebook-followers': 9,
  'buy-facebook-page-likes': 9,
  'buy-facebook-post-likes': 10,
};

const IG_LIKES_STEPS = ['ig-l-step-1', 'ig-l-step-2', 'ig-l-step-3', 'ig-l-step-4'];

function fail(message: string): never {
  console.error('FAIL:', message);
  process.exit(1);
}

let routes = 0;

for (const market of MARKETS) {
  const home = loadMarketHomepageHub(market);
  if (!home.hero?.title) fail(`${market} homepage missing hero`);
  if (!home.storySections?.length) fail(`${market} homepage missing storySections`);
  routes += 1;

  const meta = loadMarketMetadataBundle(market);
  if (!meta.homepage?.title || !meta.homepage?.description) fail(`${market} homepage metadata`);

  for (const slug of CORE_SERVICE_SLUGS) {
    const bundle = loadMarketServiceBundle(market, slug);
    if (!bundle.content?.hero?.title) fail(`${market}/${slug} missing hero`);
    if (!Array.isArray(bundle.content.howItWorks?.steps)) fail(`${market}/${slug} missing steps`);
    if (!meta.services[slug]?.title) fail(`${market}/${slug} missing metadata`);

    if (slug === 'buy-instagram-likes') {
      const ids = bundle.content.howItWorks.steps.map((s) => s.id);
      if (ids.length !== 4) fail(`${market} IG likes steps length ${ids.length}`);
      if (ids.join(',') !== IG_LIKES_STEPS.join(',')) fail(`${market} IG likes ids ${ids.join(',')}`);
      if (ids.includes('ig-l-step-5')) fail(`${market} inherited step 5`);
    }

    const stories = (bundle as { content: { storySections?: unknown[] } }).content.storySections
      ?? (bundle as { dummy?: { storySections?: unknown[] } }).dummy?.storySections;
    // story sections live on market JSON extensions — check via overlay file
    const overlayPath = path.join(
      process.cwd(),
      'content',
      'markets',
      market,
      'services',
      `${slug}.json`,
    );
    const overlay = JSON.parse(readFileSync(overlayPath, 'utf8')) as {
      storySections?: unknown[];
      content?: { storySections?: unknown[] };
      followersAuthority?: { storySections?: unknown[] };
      dummy?: { storySections?: unknown[] };
    };
    const storyCount = (
      overlay.followersAuthority?.storySections ??
      overlay.dummy?.storySections ??
      overlay.storySections ??
      overlay.content?.storySections ??
      []
    ).length;

    if (market === 'ca') {
      const expected = CA_STORY_COUNTS[slug];
      if (expected != null && storyCount !== expected) {
        fail(`CA ${slug} story count ${storyCount} !== ${expected}`);
      }
    }

    // Image registry smoke: hero placement resolves when registered
    const heroImg = getUniqueServiceImage(market as Market, slug, 'hero');
    if (heroImg?.src) {
      const clean = heroImg.src.split('?')[0] ?? heroImg.src;
      const abs = path.join(process.cwd(), 'public', clean.replace(/^\//, ''));
      if (!existsSync(abs)) fail(`Missing image file ${abs}`);
    }

    routes += 1;
  }
}

if (routes !== 44) fail(`Expected 44 routes, got ${routes}`);

const caHomeStories = loadMarketHomepageHub('ca').storySections?.length ?? 0;
if (caHomeStories !== CA_STORY_COUNTS.homepage) {
  fail(`CA homepage stories ${caHomeStories} !== ${CA_STORY_COUNTS.homepage}`);
}

console.log(
  JSON.stringify(
    {
      routes,
      igLikes: Object.fromEntries(
        MARKETS.map((m) => {
          const steps = loadMarketServiceBundle(m, 'buy-instagram-likes').content.howItWorks.steps;
          return [m, { length: steps.length, ids: steps.map((s) => s.id) }];
        }),
      ),
      caStories: {
        homepage: caHomeStories,
        ...Object.fromEntries(
          CORE_SERVICE_SLUGS.map((slug) => {
            const overlay = JSON.parse(
              readFileSync(
                path.join(process.cwd(), 'content/markets/ca/services', `${slug}.json`),
                'utf8',
              ),
            ) as {
              storySections?: unknown[];
              content?: { storySections?: unknown[] };
              followersAuthority?: { storySections?: unknown[] };
              dummy?: { storySections?: unknown[] };
            };
            return [
              slug,
              (
                overlay.followersAuthority?.storySections ??
                overlay.dummy?.storySections ??
                overlay.storySections ??
                overlay.content?.storySections ??
                []
              ).length,
            ];
          }),
        ),
      },
    },
    null,
    2,
  ),
);
console.log('REGRESSION_OK');
