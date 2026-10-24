import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it, vi } from 'vitest';

vi.mock('next/font/google', () => ({
  Bricolage_Grotesque: () => ({ variable: 'font-display-var', className: 'font-display' }),
  Nunito: () => ({ variable: 'font-body-var', className: 'font-body' }),
}));

vi.mock('next/image', () => ({
  default: function MockImage(props: Record<string, unknown>) {
    const { alt = '', src, width, height, ...rest } = props;
    return createElement('img', {
      alt,
      src: typeof src === 'string' ? src : '',
      width,
      height,
      ...rest,
    });
  },
}));

vi.mock('react-dom', async () => {
  const actual = await vi.importActual<typeof import('react-dom')>('react-dom');
  return { ...actual, preload: vi.fn() };
});

import { IgFollowersV1View } from '@/components/marketing/service-v1/ig-followers-v1-view';
import { IG_FOLLOWERS_V2 } from '@/data/content/service-v1/instagram-followers-v2';
import { getServiceBySlug } from '@/data/services';
import { getActivePackagesByServiceSlug } from '@/data/pricing/packages';
import { formatQuantityShort, getServiceFromPriceLabel } from '@/lib/marketing/service-hero';
import { formatMoney } from '@/lib/pricing/format';

const H2_ORDER = [
  'Instagram Followers Packages & Pricing',
  'Why Choose NovaLikes for Instagram Followers?',
  'How to Buy Instagram Followers',
  'How to Spot a Risky Instagram Follower Seller',
  'Refill and Money-Back Promises',
  'How Much Do Instagram Followers Cost?',
  'Why Do People Buy Instagram Followers?',
  'Does Buying Instagram Followers Help?',
  'Who Orders Instagram Followers',
  'Instagram Followers vs Likes, Views and Comments',
  'Is It Safe to Buy Instagram Followers?',
  'Before You Buy Instagram Followers',
  'Instagram Followers FAQ',
  'Explore Other Instagram Services',
] as const;

const INLINE_LEARN_HREFS = [
  '/learn/why-instagram-followers-drop',
  '/learn/how-to-grow-instagram-followers-organically',
  '/learn/instagram-followers-vs-likes-vs-views-vs-comments',
  '/learn/public-vs-private-instagram-account',
  '/privacy-policy',
] as const;

function assertNoBannedWords(raw: string) {
  const lower = raw.toLowerCase();
  expect(raw).not.toMatch(/\bAI\b/);
  expect(raw).not.toContain('#1');
  expect(lower).not.toContain('real followers');
  expect(lower).not.toContain('guaranteed');
  expect(lower).not.toMatch(/\b\d+(\.\d+)?\s*\/\s*5\b/);
  expect(lower).not.toMatch(/\b\d[\d,]+\+?\s*(reviews?|customers?|clients?)\b/);
  expect(lower).not.toMatch(/\b(rated|rating|reviews?)\b.*\b\d/);
}

describe('IG_FOLLOWERS_V2 copy constraints', () => {
  it('does not contain banned marketing words', () => {
    assertNoBannedWords(JSON.stringify(IG_FOLLOWERS_V2));
  });
});

describe('IgFollowersV1View markup', () => {
  const service = getServiceBySlug('buy-instagram-followers')!;
  const html = renderToStaticMarkup(createElement(IgFollowersV1View, { service }));
  const packages = getActivePackagesByServiceSlug('buy-instagram-followers');

  it('loads the Instagram Followers service', () => {
    expect(service.slug).toBe('buy-instagram-followers');
  });

  it('renders exactly one H1', () => {
    expect(html.match(/<h1[\s>]/gi) ?? []).toHaveLength(1);
  });

  it('renders 14 H2s in the expected v2.1 order', () => {
    const h2s = [...html.matchAll(/<h2\b[^>]*>([\s\S]*?)<\/h2>/gi)].map((m) =>
      m[1]
        .replace(/<[^>]+>/g, '')
        .replace(/&amp;/g, '&')
        .replace(/&apos;/g, "'")
        .replace(/&#x27;/g, "'")
        .replace(/\s+/g, ' ')
        .trim(),
    );
    expect(h2s).toEqual([...H2_ORDER]);
  });

  it('has no raw template braces or unparsed markdown links in HTML', () => {
    // Ignore Tailwind arbitrary variants in class attrs (e.g. `[scrollbar-width:none]`).
    const withoutClasses = html.replace(/\sclass="[^"]*"/g, '');
    expect(withoutClasses).not.toContain('{');
    expect(withoutClasses).not.toContain('[');
    expect(withoutClasses).not.toContain('](');
  });

  it('renders 8 package tiles with registry prices', () => {
    expect(packages).toHaveLength(8);
    expect(html.match(/class="pk-tile"/g) ?? []).toHaveLength(8);
    for (const pkg of packages) {
      expect(html).toContain(formatMoney(pkg.price, pkg.currency));
    }
  });

  it('renders cost table rows from the registry with exactly one Lowest per follower', () => {
    expect(html).toContain('class="ctable"');
    for (const pkg of packages) {
      expect(html).toContain(`${formatQuantityShort(pkg.quantity)} followers`);
      expect(html).toContain(formatMoney(pkg.price, pkg.currency));
      const per1kMajor = Number(((pkg.price * 10) / pkg.quantity).toFixed(2));
      const per1k = Math.round(per1kMajor * 100);
      expect(html).toContain(formatMoney(per1k, pkg.currency));
    }
    expect(html.match(/Lowest per follower/g) ?? []).toHaveLength(1);
  });

  it('renders VS From prices from the registry', () => {
    for (const slug of [
      'buy-instagram-followers',
      'buy-instagram-likes',
      'buy-instagram-views',
      'buy-instagram-comments',
    ]) {
      const from = getServiceFromPriceLabel(slug);
      expect(from).toBeTruthy();
      expect(html).toContain(from!);
    }
    expect(html).toContain('class="vtable"');
    expect(html).toContain('This page');
  });

  it('keeps all 15 FAQ answers in the HTML', () => {
    const details = [...html.matchAll(/data-faq-id="([^"]+)"/g)];
    expect(details).toHaveLength(15);
    const answers = [...html.matchAll(/data-faq-id="[^"]+"[\s\S]*?<p>([\s\S]*?)<\/p>/g)];
    expect(answers.length).toBeGreaterThanOrEqual(15);
    for (const [, answer] of answers.slice(0, 15)) {
      expect(answer.trim().length).toBeGreaterThan(20);
    }
  });

  it('renders inline learn and privacy links', () => {
    for (const href of INLINE_LEARN_HREFS) {
      expect(html).toContain(`href="${href}"`);
      expect(html).toContain(`class="ilink"`);
    }
  });

  it('uses svc-v2 root and server counter HTML', () => {
    expect(html).toContain('svc-v2');
    expect(html).toContain('data-count="2000"');
    expect(html).toContain('2,000');
    expect(html).not.toContain('svc-v1');
  });
});
