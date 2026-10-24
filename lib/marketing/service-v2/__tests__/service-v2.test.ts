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

import { ServiceV2View } from '@/components/marketing/service-v2/service-v2-view';
import { SERVICE_V2_CONTENT } from '@/data/content/service-v2';
import type { ServiceV2Content } from '@/data/content/service-v2/types';
import { getServiceContentBySlug } from '@/data/content/services';
import { getServiceBySlug } from '@/data/services';
import { getActivePackagesByServiceSlug } from '@/data/pricing/packages';
import { getBadgeLabel } from '@/data/pricing/badges';
import { formatQuantityShort, getServiceFromPriceLabel } from '@/lib/marketing/service-hero';
import { formatMoney } from '@/lib/pricing/format';

function stripHtml(s: string): string {
  return s
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&apos;/g, "'")
    .replace(/&#x27;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

function h2Texts(html: string): string[] {
  return [...html.matchAll(/<h2\b[^>]*>([\s\S]*?)<\/h2>/gi)].map((m) =>
    stripHtml(m[1]!),
  );
}

function expectedH2s(copy: ServiceV2Content): string[] {
  const parts = (t: { lead: string; highlight: string; tail?: string }) =>
    [t.lead, t.highlight, t.tail].filter(Boolean).join(' ');
  return [
    copy.picker.title,
    parts(copy.why.title),
    parts(copy.steps.title),
    parts(copy.compare.title),
    copy.promises.title,
    parts(copy.cost.title),
    parts(copy.whyBuy.title),
    parts(copy.help.title),
    parts(copy.who.title),
    parts(copy.vs.title),
    parts(copy.safe.title),
    parts(copy.before.title),
    copy.faq.title,
    copy.more.title,
  ];
}

function assertNoBannedWords(raw: string) {
  const lower = raw.toLowerCase();
  expect(raw).not.toMatch(/\bAI\b/);
  expect(raw).not.toContain('#1');
  expect(lower).not.toContain('real followers');
  expect(lower).not.toContain('guaranteed');
  expect(lower).not.toContain('instant');
  expect(lower).not.toContain('cheap');
}

function costLabel(pkg: { quantity: number; commentType?: string }, unit: string): string {
  const qty = pkg.quantity.toLocaleString('en-US');
  const tier = pkg.commentType ? `${pkg.commentType} ` : '';
  return `${qty} ${tier}${unit}`;
}

function perUnitMinor(
  price: number,
  quantity: number,
  perUnit: number,
): number {
  const major = Number(((price / 100) * (perUnit / quantity)).toFixed(2));
  return Math.round(major * 100);
}

describe('SERVICE_V2_CONTENT copy constraints', () => {
  for (const [slug, copy] of Object.entries(SERVICE_V2_CONTENT)) {
    it(`${slug} has no banned marketing words in rendered copy`, () => {
      // meta.keywords is planning-only (never rendered) and may list search terms.
      const { keywords: _keywords, ...metaRest } = copy.meta;
      assertNoBannedWords(JSON.stringify({ ...copy, meta: metaRest }));
    });
  }
});

describe('ServiceV2View markup for all 10 EN services', () => {
  for (const [slug, copy] of Object.entries(SERVICE_V2_CONTENT)) {
    describe(slug, () => {
      const service = getServiceBySlug(slug)!;
      const html = renderToStaticMarkup(
        createElement(ServiceV2View, { service, content: copy }),
      );
      const packages = getActivePackagesByServiceSlug(slug);
      const serviceContent = getServiceContentBySlug(slug);
      const faqIdCount = serviceContent?.faq.faqIds.length ?? 0;
      const expectedFaqCount = faqIdCount + copy.faq.extra.length;

      it('loads the service', () => {
        expect(service.slug).toBe(slug);
      });

      it('renders exactly one H1', () => {
        expect(html.match(/<h1[\s>]/gi) ?? []).toHaveLength(1);
        expect(html).toContain(copy.hero.title.highlight);
      });

      it('renders 14 H2s in content order', () => {
        expect(h2Texts(html)).toEqual(expectedH2s(copy));
      });

      it('has no raw placeholders or unparsed markdown links', () => {
        const withoutClasses = html.replace(/\sclass="[^"]*"/g, '');
        expect(withoutClasses).not.toContain('{');
        expect(withoutClasses).not.toContain('[');
        expect(withoutClasses).not.toContain('](');
      });

      it('renders package tiles from the registry', () => {
        expect(html.match(/class="pk-tile"/g) ?? []).toHaveLength(packages.length);
        for (const pkg of packages) {
          expect(html).toContain(formatQuantityShort(pkg.quantity));
          expect(html).toContain(formatMoney(pkg.price, pkg.currency));
          if (pkg.badge) {
            expect(html).toContain(getBadgeLabel(pkg.badge));
          }
        }
        if (copy.picker.tiers?.length) {
          for (const tier of copy.picker.tiers) {
            expect(html).toContain(`data-tier="${tier.label}"`);
            const byTier = packages.filter((p) => p.commentType === tier.label);
            expect(byTier.length).toBeGreaterThan(0);
            for (const pkg of byTier) {
              expect(html).toContain(formatMoney(pkg.price, pkg.currency));
            }
          }
        }
      });

      it('renders cost rows from the registry with exactly one best row', () => {
        expect(html).toContain('class="ctable"');
        const pers = packages.map((pkg) =>
          perUnitMinor(pkg.price, pkg.quantity, copy.meta.perUnit),
        );
        const best = Math.min(...pers);
        const bestIndex = pers.indexOf(best);
        for (const pkg of packages) {
          expect(html).toContain(costLabel(pkg, copy.meta.unit));
          expect(html).toContain(formatMoney(pkg.price, pkg.currency));
        }
        expect(html).toContain(formatMoney(pers[bestIndex]!, packages[bestIndex]!.currency));
        expect(html.match(/class="best"/g) ?? []).toHaveLength(1);
        expect(html).toContain(copy.cost.best);
      });

      it('renders VS From prices from the registry', () => {
        expect(html).toContain('class="vtable"');
        for (const row of copy.vs.rows) {
          const from = getServiceFromPriceLabel(row.slug);
          expect(from).toBeTruthy();
          expect(html).toContain(from!);
        }
        expect(html).toContain(copy.vs.currentLabel);
      });

      it('renders FAQ count = faqIds + extra with answers in HTML', () => {
        const details = [...html.matchAll(/data-faq-id="([^"]+)"/g)];
        expect(details).toHaveLength(expectedFaqCount);
        for (const [, id] of details) {
          expect(html).toContain(`data-faq-id="${id}"`);
        }
        const answers = [
          ...html.matchAll(/data-faq-id="[^"]+"[\s\S]*?<p>([\s\S]*?)<\/p>/g),
        ];
        expect(answers.length).toBeGreaterThanOrEqual(expectedFaqCount);
        for (const [, answer] of answers.slice(0, expectedFaqCount)) {
          expect(answer!.trim().length).toBeGreaterThan(20);
        }
      });

      it('renders inline learn/policy link hrefs that exist as routes', () => {
        const hrefs = new Set<string>();
        const walk = (text: string) => {
          for (const m of text.matchAll(/\[([^\]]+)\]\(([^)]+)\)/g)) {
            hrefs.add(m[2]!);
          }
        };
        walk(copy.promises.intro);
        walk(copy.whyBuy.intro);
        walk(copy.vs.intro);
        for (const card of copy.safe.cards) walk(card.body);
        for (const item of copy.before.items) walk(item.body);
        for (const href of hrefs) {
          expect(html).toContain(`href="${href}"`);
          expect(html).toContain('class="ilink"');
          expect(href.startsWith('/')).toBe(true);
        }
      });

      it('uses svc-v2 root', () => {
        expect(html).toContain('svc-v2');
        expect(html).toContain('id="pricing-packages"');
        expect(html).toContain('id="how-it-works"');
      });
    });
  }
});
