import { readFileSync } from 'node:fs';
import path from 'node:path';

import { describe, expect, it } from 'vitest';

import { HOME_TT } from '@/data/content/home-tiktok-v2';
import {
  formatBandRange,
  sortPackagesByQuantity,
  splitPackagesIntoBands,
} from '@/lib/marketing/home-tiktok/bands';
import {
  defaultSelectedPackageId,
  formatFloatingPackageLine,
  getFromPriceLabel,
  getTikTokServicePackages,
  TIKTOK_SERVICE_SLUGS,
} from '@/lib/marketing/home-tiktok/packages';
import { listActivePackages } from '@/lib/pricing/resolve';
import type { PricingPackage } from '@/types/pricing';

function fakePkg(id: string, quantity: number): PricingPackage {
  return {
    id,
    serviceId: 'svc',
    serviceSlug: 'buy-tiktok-followers',
    slug: id,
    title: id,
    packageName: id,
    quantity,
    quantityLabel: String(quantity),
    currency: 'USD',
    price: 299,
    regularPrice: 299,
    deliveryTime: '',
    features: [],
    displayOrder: quantity,
    active: true,
    availability: 'active',
  };
}

describe('home TikTok package finder bands', () => {
  it('splits packages into 3 bands, sorted by quantity', () => {
    const pkgs = [300, 100, 900, 500, 200, 700, 400, 800, 600].map((q, i) =>
      fakePkg(`p-${i}`, q),
    );
    const bands = splitPackagesIntoBands(pkgs);
    expect(bands.small.map((p) => p.quantity)).toEqual([100, 200, 300]);
    expect(bands.medium.map((p) => p.quantity)).toEqual([400, 500, 600]);
    expect(bands.large.map((p) => p.quantity)).toEqual([700, 800, 900]);
    expect(sortPackagesByQuantity(pkgs)[0]?.quantity).toBe(100);
  });

  it('formats a single-package band without a range dash', () => {
    expect(formatBandRange([fakePkg('only', 1000)], 'followers')).toBe('1,000 followers');
  });

  it('formats a multi-package band as min–max unit', () => {
    expect(formatBandRange([fakePkg('a', 500), fakePkg('b', 1000)], 'likes')).toBe(
      '500–1,000 likes',
    );
  });
});

describe('home TikTok packages from registry', () => {
  it('loads packages from the pricing registry (no hard-coded prices in HOME_TT)', () => {
    const homeTtSource = readFileSync(
      path.join(process.cwd(), 'data/content/home-tiktok-v2.ts'),
      'utf8',
    );
    expect(homeTtSource).not.toMatch(/\$\d/);
    expect(homeTtSource).not.toMatch(/price:\s*\d/);

    for (const key of ['followers', 'likes', 'views'] as const) {
      const fromHelper = getTikTokServicePackages(key);
      const fromRegistry = listActivePackages(TIKTOK_SERVICE_SLUGS[key]);
      expect(fromHelper.length).toBe(fromRegistry.length);
      expect(fromHelper.length).toBeGreaterThan(0);
      expect(getFromPriceLabel(key)).toMatch(/^\$/);
      expect(formatFloatingPackageLine(key, HOME_TT.hero.floating[key].template)).toMatch(
        /from \$/,
      );
    }
  });
});

describe('HOME_TT copy constraints', () => {
  it('does not contain AI or #1', () => {
    const raw = JSON.stringify(HOME_TT);
    expect(raw).not.toMatch(/\bAI\b/i);
    expect(raw.toLowerCase()).not.toContain('ai-powered');
    expect(raw).not.toContain('#1');
  });

  it('includes v3 content sections and 10 FAQ items', () => {
    expect(HOME_TT.serviceCards.cards).toHaveLength(3);
    expect(HOME_TT.serviceFeatures.items).toHaveLength(3);
    expect(HOME_TT.features.items).toHaveLength(6);
    expect(HOME_TT.whatToExpect.items).toHaveLength(4);
    expect(HOME_TT.whoFor.items).toHaveLength(4);
    expect(HOME_TT.guides.intro.length).toBeGreaterThan(40);
    expect(HOME_TT.faq.items).toHaveLength(10);
  });
});

describe('default package selection', () => {
  it('picks the popular package when flagged', () => {
    const pkgs = [
      fakePkg('a', 100),
      { ...fakePkg('b', 1000), badge: 'most-popular' as const },
      fakePkg('c', 5000),
    ];
    expect(defaultSelectedPackageId(pkgs)).toBe('b');
  });

  it('picks the middle package when nothing is flagged', () => {
    const pkgs = [fakePkg('a', 100), fakePkg('b', 500), fakePkg('c', 1000)];
    expect(defaultSelectedPackageId(pkgs)).toBe('b');
  });
});

describe('HomeTikTokView heading', () => {
  it('renders exactly one H1', async () => {
    const { renderToStaticMarkup } = await import('react-dom/server');
    const { HomeTikTokView } = await import(
      '@/components/marketing/home-tiktok/home-tiktok-view'
    );
    const html = renderToStaticMarkup(HomeTikTokView());
    const matches = html.match(/<h1[\s>]/gi) ?? [];
    expect(matches).toHaveLength(1);
    expect(html).toContain('Grow Your');
    expect(html).toContain('TikTok');
  });
});
