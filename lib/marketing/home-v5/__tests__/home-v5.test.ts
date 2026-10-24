import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it, vi } from 'vitest';

// next/font loaders only work inside the Next compiler; stub them for unit tests.
vi.mock('next/font/google', () => ({
  Bricolage_Grotesque: () => ({ variable: 'font-display-var', className: 'font-display' }),
  Nunito: () => ({ variable: 'font-body-var', className: 'font-body' }),
}));

import { HomeV5View } from '@/components/marketing/home-v5/home-v5-view';
import { HOME_V5, ROOT_HOMEPAGE_METADATA_V5 } from '@/data/content/home-v5';
import { buildFaqPageSchemaFromVisible } from '@/lib/faqs/schema';
import { applyFromPrice, formatCardPrice } from '@/lib/marketing/home-v5/from-price';
import { descriptions } from '@/seo/descriptions';
import { titles } from '@/seo/titles';
import type { PublicFaq } from '@/types/faq';

/** Fonts are applied by the page module; unit tests render the view without next/font. */
const renderHome = () => renderToStaticMarkup(createElement(HomeV5View, { fontClassName: 'font-test' }));

function assertNoBannedWords(raw: string) {
  expect(raw).not.toMatch(/\bAI\b/);
  expect(raw).not.toContain('#1');
  expect(raw.toLowerCase()).not.toContain('guarantee');
  expect(raw.toLowerCase()).not.toContain('real followers');
  expect(raw.toLowerCase()).not.toContain('as seen in');
}

describe('HOME_V5 copy constraints', () => {
  it('does not contain banned marketing words', () => {
    assertNoBannedWords(JSON.stringify(HOME_V5));
  });

  it('has 7 service blocks and 6 FAQ items', () => {
    expect(HOME_V5.services).toHaveLength(7);
    expect(HOME_V5.faq.items).toHaveLength(6);
  });
});

describe('home v5 fromPrice resolution', () => {
  it('resolves every {fromPrice} for hero cards and service bullets', () => {
    for (const platform of Object.values(HOME_V5.hero.tabs)) {
      for (const card of platform.cards) {
        const price = formatCardPrice(card.slug);
        expect(price, card.slug).toBeTruthy();
        expect(price).not.toMatch(/\{/);
        expect(price).toMatch(/^From \$/);
      }
    }
    for (const service of HOME_V5.services) {
      for (const bullet of service.bullets) {
        if (!bullet.includes('{fromPrice}')) continue;
        const resolved = applyFromPrice(bullet, service.slug);
        expect(resolved, `${service.slug}: ${bullet}`).toBeTruthy();
        expect(resolved).not.toMatch(/\{/);
      }
    }
  });
});

describe('HomeV5View markup', () => {
  const html = renderHome();

  it('renders one H1, fourteen H2s, and the section ids', () => {
    expect(html.match(/<h1[\s>]/gi) ?? []).toHaveLength(1);
    // statement + 2 stories + 7 services + why + promises + FAQ + get started
    expect(html.match(/<h2[\s>]/gi) ?? []).toHaveLength(14);
    for (const id of [
      'homepage-hero',
      HOME_V5.statement.id,
      ...HOME_V5.stories.map((s) => s.id),
      HOME_V5.why.id,
      HOME_V5.promises.id,
      HOME_V5.faq.id,
      HOME_V5.getStarted.id,
    ]) {
      expect(html, id).toContain(`id="${id}"`);
    }
    for (const service of HOME_V5.services) {
      expect(html).toContain(service.title.lead);
      expect(html).toContain(service.title.highlight);
      expect(html).toContain(`id="${service.slug}-block"`);
    }
  });

  it('puts all three tab panels in the HTML, inactive ones hidden', () => {
    expect(html).toContain('id="panel-instagram"');
    expect(html).toContain('id="panel-tiktok"');
    expect(html).toContain('id="panel-facebook"');
    expect(html).toMatch(/id="panel-instagram"[^>]*class="panel cols-4"(?![^>]*hidden)/);
    expect(html).toMatch(/id="panel-tiktok"[^>]*hidden/);
    expect(html).toMatch(/id="panel-facebook"[^>]*hidden/);
    expect(html).toContain('role="tablist"');
    expect(html.match(/role="tab"/g) ?? []).toHaveLength(3);
  });

  it('has no raw {fromPrice}, no mock header, no banned words', () => {
    expect(html).not.toMatch(/\{fromPrice\}/);
    expect(html).not.toMatch(/\{\w/);
    expect(html).not.toContain('mock-header');
    assertNoBannedWords(html);
  });

  it('renders the lit paragraph as plain text before hydration', () => {
    expect(html).toContain(HOME_V5.statement.body.replace(/&/g, '&amp;'));
    expect(html).not.toContain('class="w"');
  });

  it('duplicates the marquee list with aria-hidden and has the sticky CTA', () => {
    expect(html.match(/class="mq-list"/g) ?? []).toHaveLength(2);
    expect(html).toContain('class="mq-list" aria-hidden="true"');
    expect(html).toContain('class="sticky-cta" href="#homepage-hero"');
    expect(html).toContain('https://wa.me/447454758272');
  });

  it('keeps every FAQ and service question answer in the HTML', () => {
    const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/’/g, '’');
    for (const item of HOME_V5.faq.items) {
      expect(html).toContain(esc(item.question));
      expect(html).toContain(esc(item.answer));
    }
    for (const service of HOME_V5.services) {
      expect(html).toContain(esc(service.why.q));
      expect(html).toContain(esc(service.why.a));
      expect(html).toContain(esc(service.how.q));
      expect(html).toContain(esc(service.how.a));
    }
  });
});

describe('homepage v5 FAQPage JSON-LD', () => {
  it('emits 6 questions matching HOME_V5.faq', () => {
    const faqs: PublicFaq[] = HOME_V5.faq.items.map((item, index) => ({
      id: `home-v5-faq-${index + 1}`,
      category: 'general',
      question: item.question,
      answer: item.answer,
      keywords: [],
      serviceSlugs: [],
      pageLocations: ['homepage'],
      relatedLinks: [],
      order: index + 1,
      featured: false,
      schemaEligible: true,
    }));
    const schema = buildFaqPageSchemaFromVisible(faqs);
    expect(schema).toBeTruthy();
    expect(schema?.['@type']).toBe('FAQPage');
    const entities = (schema as { mainEntity: Array<{ name: string }> }).mainEntity;
    expect(entities).toHaveLength(6);
    expect(entities.map((e) => e.name)).toEqual(HOME_V5.faq.items.map((i) => i.question));
  });
});

describe('homepage v5 metadata', () => {
  it('uses ROOT_HOMEPAGE_METADATA_V5 for title and description', () => {
    expect(titles.home()).toBe(ROOT_HOMEPAGE_METADATA_V5.title);
    expect(descriptions.home()).toBe(ROOT_HOMEPAGE_METADATA_V5.description);
  });
});
