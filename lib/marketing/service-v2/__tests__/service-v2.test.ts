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
import {
  SERVICE_V2_AU_CONTENT,
  SERVICE_V2_CA_CONTENT,
  SERVICE_V2_CONTENT,
  SERVICE_V2_DE_CONTENT,
  SERVICE_V2_ES_CONTENT,
  SERVICE_V2_FR_CONTENT,
  SERVICE_V2_IT_CONTENT,
  SERVICE_V2_UK_CONTENT,
} from '@/data/content/service-v2';
import type { ServiceV2Content } from '@/data/content/service-v2/types';
import { getServiceContentBySlug } from '@/data/content/services';
import { loadServiceFaqItems } from '@/lib/i18n/content/load';
import { getServiceBySlug } from '@/data/services';
import { getActivePackagesByServiceSlug } from '@/data/pricing/packages';
import { getBadgeLabel } from '@/data/pricing/badges';
import type { Market } from '@/lib/market/config';
import { loadMarketServiceFaqItemsByPrefix } from '@/lib/market/content/load';
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

describe('SERVICE_V2_UK_CONTENT copy constraints', () => {
  for (const [slug, copy] of Object.entries(SERVICE_V2_UK_CONTENT)) {
    it(`${slug} has no banned marketing words in rendered copy`, () => {
      const { keywords: _keywords, ...metaRest } = copy.meta;
      assertNoBannedWords(JSON.stringify({ ...copy, meta: metaRest }));
    });
  }
});

describe('ServiceV2View markup for all 10 UK services', () => {
  for (const [slug, copy] of Object.entries(SERVICE_V2_UK_CONTENT)) {
    describe(slug, () => {
      const service = getServiceBySlug(slug)!;
      const html = renderToStaticMarkup(
        createElement(ServiceV2View, { service, content: copy, market: 'uk' }),
      );
      const packages = getActivePackagesByServiceSlug(slug);
      const marketFaq = copy.faq.market!;
      const marketFaqCount = loadMarketServiceFaqItemsByPrefix(
        marketFaq.code,
        marketFaq.idPrefix,
      ).length;
      const expectedFaqCount = marketFaqCount + copy.faq.extra.length;

      it('declares faq.market for UK prefix loading', () => {
        expect(copy.faq.market).toEqual({
          code: marketFaq.code,
          idPrefix: marketFaq.idPrefix,
        });
        expect(marketFaqCount).toBeGreaterThan(0);
      });

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

      it('renders FAQ count = market prefix + extra with answers in HTML', () => {
        const details = [...html.matchAll(/data-faq-id="([^"]+)"/g)];
        expect(details).toHaveLength(expectedFaqCount);
        const answers = [
          ...html.matchAll(/data-faq-id="[^"]+"[\s\S]*?<p>([\s\S]*?)<\/p>/g),
        ];
        expect(answers.length).toBeGreaterThanOrEqual(expectedFaqCount);
        for (const [, answer] of answers.slice(0, expectedFaqCount)) {
          expect(answer!.trim().length).toBeGreaterThan(20);
        }
      });

      it('prefixes every service buy-* link with /uk/', () => {
        const serviceHrefs = [...html.matchAll(/href="(\/[^"]*buy-[^"]*)"/g)].map(
          (m) => m[1]!,
        );
        expect(serviceHrefs.length).toBeGreaterThan(0);
        for (const href of serviceHrefs) {
          expect(href.startsWith('/uk/')).toBe(true);
        }
      });

      it('has no duplicate FAQ questions', () => {
        const questions = [...html.matchAll(/data-faq-id="[^"]+"[\s\S]*?<h3>([\s\S]*?)<\/h3>/g)].map(
          (m) => stripHtml(m[1]!),
        );
        expect(new Set(questions).size).toBe(questions.length);
      });

      it('uses svc-v2 root', () => {
        expect(html).toContain('svc-v2');
        expect(html).toContain('id="pricing-packages"');
        expect(html).toContain('id="how-it-works"');
      });
    });
  }
});

function describeMarketV2Suite(
  label: string,
  market: Market,
  catalog: Record<string, ServiceV2Content>,
  opts: { useEnglishFaq?: boolean } = {},
) {
  describe(`SERVICE_V2_${label}_CONTENT copy constraints`, () => {
    for (const [slug, copy] of Object.entries(catalog)) {
      it(`${slug} has no banned marketing words in rendered copy`, () => {
        const { keywords: _keywords, ...metaRest } = copy.meta;
        assertNoBannedWords(JSON.stringify({ ...copy, meta: metaRest }));
      });
    }
  });

  describe(`ServiceV2View markup for all 10 ${label} services`, () => {
    for (const [slug, copy] of Object.entries(catalog)) {
      describe(slug, () => {
        const service = getServiceBySlug(slug)!;
        const html = renderToStaticMarkup(
          createElement(ServiceV2View, { service, content: copy, market }),
        );
        const packages = getActivePackagesByServiceSlug(slug);
        const prefix = `/${market}/`;

        let expectedFaqCount: number;
        if (opts.useEnglishFaq) {
          const serviceContent = getServiceContentBySlug(slug);
          expectedFaqCount =
            (serviceContent?.faq.faqIds.length ?? 0) + copy.faq.extra.length;
        } else {
          const marketFaq = copy.faq.market!;
          expectedFaqCount =
            loadMarketServiceFaqItemsByPrefix(marketFaq.code, marketFaq.idPrefix)
              .length + copy.faq.extra.length;
        }

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
          }
        });

        it('renders cost rows from the registry with exactly one best row', () => {
          expect(html).toContain('class="ctable"');
          expect(html.match(/class="best"/g) ?? []).toHaveLength(1);
          expect(html).toContain(copy.cost.best);
        });

        it('renders FAQ count with answers and no duplicate questions', () => {
          const details = [...html.matchAll(/data-faq-id="([^"]+)"/g)];
          expect(details).toHaveLength(expectedFaqCount);
          const questions = [
            ...html.matchAll(/data-faq-id="[^"]+"[\s\S]*?<h3>([\s\S]*?)<\/h3>/g),
          ].map((m) => stripHtml(m[1]!));
          expect(new Set(questions).size).toBe(questions.length);
        });

        it(`prefixes every service buy-* link with ${prefix}`, () => {
          const serviceHrefs = [...html.matchAll(/href="(\/[^"]*buy-[^"]*)"/g)].map(
            (m) => m[1]!,
          );
          expect(serviceHrefs.length).toBeGreaterThan(0);
          for (const href of serviceHrefs) {
            expect(href.startsWith(prefix)).toBe(true);
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
}

describeMarketV2Suite('CA', 'ca', SERVICE_V2_CA_CONTENT);
describeMarketV2Suite('AU', 'au', SERVICE_V2_AU_CONTENT);

const DE_BANNED = ['garantiert', 'sofort', 'echte follower', 'billig', '#1'];

function assertNoGermanBannedWords(raw: string) {
  const lower = raw.toLowerCase();
  for (const word of DE_BANNED) {
    expect(lower).not.toContain(word);
  }
}

describe('SERVICE_V2_DE_CONTENT copy constraints', () => {
  for (const [slug, copy] of Object.entries(SERVICE_V2_DE_CONTENT)) {
    it(`${slug} has no banned German marketing words`, () => {
      const { keywords: _keywords, ...metaRest } = copy.meta;
      assertNoGermanBannedWords(JSON.stringify({ ...copy, meta: metaRest }));
    });
  }
});

describe('ServiceV2View markup for all 10 DE services', () => {
  for (const [slug, copy] of Object.entries(SERVICE_V2_DE_CONTENT)) {
    describe(slug, () => {
      const service = getServiceBySlug(slug)!;
      const html = renderToStaticMarkup(
        createElement(ServiceV2View, { service, content: copy, locale: 'de' }),
      );
      const packages = getActivePackagesByServiceSlug(slug);
      const serviceContent = getServiceContentBySlug(slug);
      const faqIds = serviceContent?.faq.faqIds ?? [];
      const germanFaqs = loadServiceFaqItems('de', faqIds);
      const expectedFaqCount = faqIds.length + copy.faq.extra.length;

      it('loads the service', () => {
        expect(service.slug).toBe(slug);
      });

      it('renders exactly one H1', () => {
        expect(html.match(/<h1[\s>]/gi) ?? []).toHaveLength(1);
        expect(html).toContain(copy.hero.title.highlight);
        expect(html).not.toMatch(/<h1[^>]*>\s/);
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

      it('renders package tiles from the registry, one tier at a time', () => {
        expect(html.match(/class="pk-tile"/g) ?? []).toHaveLength(packages.length);
        for (const pkg of packages) {
          expect(html).toContain(formatQuantityShort(pkg.quantity));
          expect(html).toContain(formatMoney(pkg.price, pkg.currency));
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
        expect(html.match(/class="best"/g) ?? []).toHaveLength(1);
        expect(html).toContain(copy.cost.best);
        for (const pkg of packages) {
          expect(html).toContain(costLabel(pkg, copy.meta.unit));
          expect(html).toContain(formatMoney(pkg.price, pkg.currency));
        }
      });

      it('renders German FAQ answers then extra, with no duplicate questions', () => {
        const details = [...html.matchAll(/data-faq-id="([^"]+)"/g)];
        expect(details).toHaveLength(expectedFaqCount);
        for (const item of germanFaqs) {
          expect(html).toContain(item.question);
          expect(html).toContain(item.answer);
        }
        for (const extra of copy.faq.extra) {
          expect(html).toContain(extra.question);
        }
        const questions = [
          ...html.matchAll(/data-faq-id="[^"]+"[\s\S]*?<h3>([\s\S]*?)<\/h3>/g),
        ].map((m) => stripHtml(m[1]!));
        expect(new Set(questions).size).toBe(questions.length);
      });

      it('localizes every internal link under /de and has no /learn link', () => {
        expect(html).not.toContain('/learn');
        const hrefs = [...html.matchAll(/href="([^"]+)"/g)].map((m) => m[1]!);
        const internal = hrefs.filter(
          (href) =>
            href.startsWith('/') &&
            !href.startsWith('//') &&
            !href.startsWith('/assets/'),
        );
        expect(internal.length).toBeGreaterThan(0);
        const bad = internal.filter((href) => href !== '/de' && !href.startsWith('/de/'));
        expect(bad).toEqual([]);
        const serviceHrefs = internal.filter((href) => href !== '/de');
        expect(serviceHrefs.length).toBeGreaterThan(0);
        for (const href of serviceHrefs) {
          expect(href.startsWith('/de/')).toBe(true);
        }
      });

      it('keeps pricing and how-it-works anchors', () => {
        expect(html).toContain('svc-v2');
        expect(html).toContain('id="pricing-packages"');
        expect(html).toContain('id="how-it-works"');
      });
    });
  }
});

const ES_BANNED = [
  'garantizado',
  'instantáneo',
  'inmediato',
  'barato',
  'seguidores reales',
  '#1',
];

function assertNoSpanishBannedWords(raw: string) {
  const lower = raw.toLowerCase();
  for (const word of ES_BANNED) {
    expect(lower).not.toContain(word);
  }
}

describe('SERVICE_V2_ES_CONTENT copy constraints', () => {
  for (const [slug, copy] of Object.entries(SERVICE_V2_ES_CONTENT)) {
    it(`${slug} has no banned Spanish marketing words`, () => {
      const { keywords: _keywords, ...metaRest } = copy.meta;
      assertNoSpanishBannedWords(JSON.stringify({ ...copy, meta: metaRest }));
    });
  }
});

describe('ServiceV2View markup for all 10 ES services', () => {
  for (const [slug, copy] of Object.entries(SERVICE_V2_ES_CONTENT)) {
    describe(slug, () => {
      const service = getServiceBySlug(slug)!;
      const html = renderToStaticMarkup(
        createElement(ServiceV2View, { service, content: copy, locale: 'es' }),
      );
      const packages = getActivePackagesByServiceSlug(slug);
      const serviceContent = getServiceContentBySlug(slug);
      const faqIds = serviceContent?.faq.faqIds ?? [];
      const spanishFaqs = loadServiceFaqItems('es', faqIds);
      const expectedFaqCount = faqIds.length + copy.faq.extra.length;

      it('loads the service', () => {
        expect(service.slug).toBe(slug);
      });

      it('renders exactly one H1', () => {
        expect(html.match(/<h1[\s>]/gi) ?? []).toHaveLength(1);
        expect(html).toContain(copy.hero.title.highlight);
        expect(html).not.toMatch(/<h1[^>]*>\s/);
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

      it('renders package tiles from the registry, one tier at a time', () => {
        expect(html.match(/class="pk-tile"/g) ?? []).toHaveLength(packages.length);
        for (const pkg of packages) {
          expect(html).toContain(formatQuantityShort(pkg.quantity));
          expect(html).toContain(formatMoney(pkg.price, pkg.currency));
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
        expect(html.match(/class="best"/g) ?? []).toHaveLength(1);
        expect(html).toContain(copy.cost.best);
        for (const pkg of packages) {
          expect(html).toContain(costLabel(pkg, copy.meta.unit));
          expect(html).toContain(formatMoney(pkg.price, pkg.currency));
        }
      });

      it('renders Spanish FAQ answers then extra, with no duplicate questions', () => {
        const details = [...html.matchAll(/data-faq-id="([^"]+)"/g)];
        expect(details).toHaveLength(expectedFaqCount);
        for (const item of spanishFaqs) {
          expect(html).toContain(item.question);
          expect(html).toContain(item.answer);
        }
        for (const extra of copy.faq.extra) {
          expect(html).toContain(extra.question);
        }
        const questions = [
          ...html.matchAll(/data-faq-id="[^"]+"[\s\S]*?<h3>([\s\S]*?)<\/h3>/g),
        ].map((m) => stripHtml(m[1]!));
        expect(new Set(questions).size).toBe(questions.length);
      });

      it('localizes every internal link under /es and has no /learn link', () => {
        expect(html).not.toContain('/learn');
        const hrefs = [...html.matchAll(/href="([^"]+)"/g)].map((m) => m[1]!);
        const internal = hrefs.filter(
          (href) =>
            href.startsWith('/') &&
            !href.startsWith('//') &&
            !href.startsWith('/assets/'),
        );
        expect(internal.length).toBeGreaterThan(0);
        const bad = internal.filter((href) => href !== '/es' && !href.startsWith('/es/'));
        expect(bad).toEqual([]);
        const serviceHrefs = internal.filter((href) => href !== '/es');
        expect(serviceHrefs.length).toBeGreaterThan(0);
        for (const href of serviceHrefs) {
          expect(href.startsWith('/es/')).toBe(true);
        }
      });

      it('keeps pricing and how-it-works anchors', () => {
        expect(html).toContain('svc-v2');
        expect(html).toContain('id="pricing-packages"');
        expect(html).toContain('id="how-it-works"');
      });
    });
  }
});

const FR_BANNED = [
  'garanti ',
  'garantis',
  'garanties',
  'instantané',
  'immédiat',
  'pas cher',
  'bon marché',
  'vrais abonnés',
  '#1',
];

function assertNoFrenchBannedWords(raw: string) {
  const lower = raw.toLowerCase();
  for (const word of FR_BANNED) {
    expect(lower).not.toContain(word);
  }
}

/** Copy uses U+00A0 before ? ! : ; SSR titles may render as normal spaces. */
function normalizeFrenchTypography(s: string): string {
  return s.replace(/\u00a0/g, ' ');
}

describe('SERVICE_V2_FR_CONTENT copy constraints', () => {
  for (const [slug, copy] of Object.entries(SERVICE_V2_FR_CONTENT)) {
    it(`${slug} has no banned French marketing words`, () => {
      const { keywords: _keywords, ...metaRest } = copy.meta;
      assertNoFrenchBannedWords(JSON.stringify({ ...copy, meta: metaRest }));
    });
  }
});

describe('ServiceV2View markup for all 10 FR services', () => {
  for (const [slug, copy] of Object.entries(SERVICE_V2_FR_CONTENT)) {
    describe(slug, () => {
      const service = getServiceBySlug(slug)!;
      const html = renderToStaticMarkup(
        createElement(ServiceV2View, { service, content: copy, locale: 'fr' }),
      );
      const packages = getActivePackagesByServiceSlug(slug);
      const serviceContent = getServiceContentBySlug(slug);
      const faqIds = serviceContent?.faq.faqIds ?? [];
      const frenchFaqs = loadServiceFaqItems('fr', faqIds);
      const expectedFaqCount = faqIds.length + copy.faq.extra.length;

      it('loads the service', () => {
        expect(service.slug).toBe(slug);
      });

      it('renders exactly one H1', () => {
        expect(html.match(/<h1[\s>]/gi) ?? []).toHaveLength(1);
        expect(html).toContain(copy.hero.title.highlight);
        expect(html).not.toMatch(/<h1[^>]*>\s/);
      });

      it('renders 14 H2s in content order', () => {
        expect(h2Texts(html).map(normalizeFrenchTypography)).toEqual(
          expectedH2s(copy).map(normalizeFrenchTypography),
        );
      });

      it('has no raw placeholders or unparsed markdown links', () => {
        const withoutClasses = html.replace(/\sclass="[^"]*"/g, '');
        expect(withoutClasses).not.toContain('{');
        expect(withoutClasses).not.toContain('[');
        expect(withoutClasses).not.toContain('](');
      });

      it('renders package tiles from the registry, one tier at a time', () => {
        expect(html.match(/class="pk-tile"/g) ?? []).toHaveLength(packages.length);
        for (const pkg of packages) {
          expect(html).toContain(formatQuantityShort(pkg.quantity));
          expect(html).toContain(formatMoney(pkg.price, pkg.currency));
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
        expect(html.match(/class="best"/g) ?? []).toHaveLength(1);
        expect(html).toContain(copy.cost.best);
        for (const pkg of packages) {
          expect(html).toContain(costLabel(pkg, copy.meta.unit));
          expect(html).toContain(formatMoney(pkg.price, pkg.currency));
        }
      });

      it('renders French FAQ answers then extra, with no duplicate questions', () => {
        const details = [...html.matchAll(/data-faq-id="([^"]+)"/g)];
        expect(details).toHaveLength(expectedFaqCount);
        for (const item of frenchFaqs) {
          expect(html).toContain(item.question);
          expect(html).toContain(item.answer);
        }
        for (const extra of copy.faq.extra) {
          expect(html).toContain(extra.question);
        }
        const questions = [
          ...html.matchAll(/data-faq-id="[^"]+"[\s\S]*?<h3>([\s\S]*?)<\/h3>/g),
        ].map((m) => stripHtml(m[1]!));
        expect(new Set(questions).size).toBe(questions.length);
      });

      it('localizes every internal link under /fr and has no /learn link', () => {
        expect(html).not.toContain('/learn');
        const hrefs = [...html.matchAll(/href="([^"]+)"/g)].map((m) => m[1]!);
        const internal = hrefs.filter(
          (href) =>
            href.startsWith('/') &&
            !href.startsWith('//') &&
            !href.startsWith('/assets/'),
        );
        expect(internal.length).toBeGreaterThan(0);
        const bad = internal.filter((href) => href !== '/fr' && !href.startsWith('/fr/'));
        expect(bad).toEqual([]);
        const serviceHrefs = internal.filter((href) => href !== '/fr');
        expect(serviceHrefs.length).toBeGreaterThan(0);
        for (const href of serviceHrefs) {
          expect(href.startsWith('/fr/')).toBe(true);
        }
      });

      it('keeps pricing and how-it-works anchors', () => {
        expect(html).toContain('svc-v2');
        expect(html).toContain('id="pricing-packages"');
        expect(html).toContain('id="how-it-works"');
      });
    });
  }
});

const IT_BANNED = [
  'garantito',
  'istantaneo',
  'immediato',
  'economico',
  'a basso costo',
  'follower reali',
  'follower veri',
  '#1',
];

function assertNoItalianBannedWords(raw: string) {
  const lower = raw.toLowerCase();
  for (const word of IT_BANNED) {
    expect(lower).not.toContain(word);
  }
}

describe('SERVICE_V2_IT_CONTENT copy constraints', () => {
  for (const [slug, copy] of Object.entries(SERVICE_V2_IT_CONTENT)) {
    it(`${slug} has no banned Italian marketing words`, () => {
      const { keywords: _keywords, ...metaRest } = copy.meta;
      assertNoItalianBannedWords(JSON.stringify({ ...copy, meta: metaRest }));
    });
  }
});

describe('ServiceV2View markup for all 10 IT services', () => {
  for (const [slug, copy] of Object.entries(SERVICE_V2_IT_CONTENT)) {
    describe(slug, () => {
      const service = getServiceBySlug(slug)!;
      const html = renderToStaticMarkup(
        createElement(ServiceV2View, { service, content: copy, locale: 'it' }),
      );
      const packages = getActivePackagesByServiceSlug(slug);
      const serviceContent = getServiceContentBySlug(slug);
      const faqIds = serviceContent?.faq.faqIds ?? [];
      const italianFaqs = loadServiceFaqItems('it', faqIds);
      const expectedFaqCount = faqIds.length + copy.faq.extra.length;

      it('loads the service', () => {
        expect(service.slug).toBe(slug);
      });

      it('renders exactly one H1', () => {
        expect(html.match(/<h1[\s>]/gi) ?? []).toHaveLength(1);
        expect(html).toContain(copy.hero.title.highlight);
        expect(html).not.toMatch(/<h1[^>]*>\s/);
      });

      it('renders 14 H2s in content order', () => {
        expect(h2Texts(html).map(normalizeFrenchTypography)).toEqual(
          expectedH2s(copy).map(normalizeFrenchTypography),
        );
      });

      it('has no raw placeholders or unparsed markdown links', () => {
        const withoutClasses = html.replace(/\sclass="[^"]*"/g, '');
        expect(withoutClasses).not.toContain('{');
        expect(withoutClasses).not.toContain('[');
        expect(withoutClasses).not.toContain('](');
      });

      it('renders package tiles from the registry, one tier at a time', () => {
        expect(html.match(/class="pk-tile"/g) ?? []).toHaveLength(packages.length);
        for (const pkg of packages) {
          expect(html).toContain(formatQuantityShort(pkg.quantity));
          expect(html).toContain(formatMoney(pkg.price, pkg.currency));
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
        expect(html.match(/class="best"/g) ?? []).toHaveLength(1);
        expect(html).toContain(copy.cost.best);
        for (const pkg of packages) {
          expect(html).toContain(costLabel(pkg, copy.meta.unit));
          expect(html).toContain(formatMoney(pkg.price, pkg.currency));
        }
      });

      it('renders Italian FAQ answers then extra, with no duplicate questions', () => {
        const details = [...html.matchAll(/data-faq-id="([^"]+)"/g)];
        expect(details).toHaveLength(expectedFaqCount);
        for (const item of italianFaqs) {
          expect(html).toContain(item.question);
          expect(html).toContain(item.answer);
        }
        for (const extra of copy.faq.extra) {
          expect(html).toContain(extra.question);
        }
        const questions = [
          ...html.matchAll(/data-faq-id="[^"]+"[\s\S]*?<h3>([\s\S]*?)<\/h3>/g),
        ].map((m) => stripHtml(m[1]!));
        expect(new Set(questions).size).toBe(questions.length);
      });

      it('localizes every internal link under /it and has no /learn link', () => {
        expect(html).not.toContain('/learn');
        const hrefs = [...html.matchAll(/href="([^"]+)"/g)].map((m) => m[1]!);
        const internal = hrefs.filter(
          (href) =>
            href.startsWith('/') &&
            !href.startsWith('//') &&
            !href.startsWith('/assets/'),
        );
        expect(internal.length).toBeGreaterThan(0);
        const bad = internal.filter((href) => href !== '/it' && !href.startsWith('/it/'));
        expect(bad).toEqual([]);
        const serviceHrefs = internal.filter((href) => href !== '/it');
        expect(serviceHrefs.length).toBeGreaterThan(0);
        for (const href of serviceHrefs) {
          expect(href.startsWith('/it/')).toBe(true);
        }
      });

      it('keeps pricing and how-it-works anchors', () => {
        expect(html).toContain('svc-v2');
        expect(html).toContain('id="pricing-packages"');
        expect(html).toContain('id="how-it-works"');
      });
    });
  }
});
