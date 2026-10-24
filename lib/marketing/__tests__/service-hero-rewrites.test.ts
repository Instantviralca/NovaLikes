import { renderToStaticMarkup } from 'react-dom/server';
import { createElement } from 'react';
import { describe, expect, it } from 'vitest';

import { GradientHeading } from '@/components/typography/gradient-heading';
import {
  HERO_NOTE,
  HERO_SAFE_CARD,
  HERO_SHARED_FEATURES,
  SERVICE_HERO_REWRITES,
} from '@/data/content/service-hero-rewrites';
import {
  getServiceFromPriceLabel,
  resolveHeroSubtitle,
} from '@/lib/marketing/service-hero';

const SLUGS = Object.keys(SERVICE_HERO_REWRITES);

describe('service hero rewrites v2', () => {
  it('builds unique H1s as lead + highlight + tail with keyword in highlight', () => {
    const h1s = SLUGS.map((slug) => {
      const t = SERVICE_HERO_REWRITES[slug].title;
      return `${t.lead} ${t.highlight} ${t.tail}`.replace(/\s+/g, ' ').trim();
    });
    expect(new Set(h1s).size).toBe(h1s.length);
    for (const slug of SLUGS) {
      const t = SERVICE_HERO_REWRITES[slug].title;
      expect(t.highlight).toMatch(/Followers|Likes|Views|Comments/i);
    }
  });

  it('has unique subtitles and resolves {fromPrice} for all 10', () => {
    const subs = SLUGS.map((slug) => {
      const resolved = resolveHeroSubtitle(
        SERVICE_HERO_REWRITES[slug].subtitle,
        slug,
      );
      expect(resolved, slug).toBeTruthy();
      expect(resolved).not.toMatch(/\{/);
      expect(getServiceFromPriceLabel(slug), slug).toMatch(/^\$/);
      return resolved!;
    });
    expect(new Set(subs).size).toBe(subs.length);
  });

  it('shared feature pack still has 3 cards for copy reuse', () => {
    expect(HERO_SHARED_FEATURES).toHaveLength(3);
    for (const slug of SLUGS) {
      expect(SERVICE_HERO_REWRITES[slug].feature.title).toBeTruthy();
      expect(SERVICE_HERO_REWRITES[slug].feature.body).toBeTruthy();
    }
  });

  it('English hero copy avoids banned marketing words', () => {
    const blob = [
      HERO_NOTE,
      HERO_SAFE_CARD.label,
      HERO_SAFE_CARD.value,
      ...HERO_SHARED_FEATURES.flatMap((f) => [f.title, f.body]),
      ...SLUGS.flatMap((slug) => {
        const r = SERVICE_HERO_REWRITES[slug];
        return [
          r.eyebrow,
          r.title.lead,
          r.title.highlight,
          r.title.tail,
          r.subtitle,
          r.primaryCta,
          r.secondaryCta,
          r.feature.title,
          r.feature.body,
        ];
      }),
    ].join('\n');
    expect(blob).not.toMatch(/\bAI\b/);
    expect(blob).not.toMatch(/#1/);
    expect(blob.toLowerCase()).not.toMatch(/happy/);
    expect(blob.toLowerCase()).not.toMatch(/customers/);
  });
});

describe('Learn article body headings', () => {
  it('ArticleContentBlock does not use gradient spans', async () => {
    const src = await import('node:fs').then((fs) =>
      fs.readFileSync('components/learn/article/ArticleContentBlock.tsx', 'utf8'),
    );
    expect(src).not.toMatch(/nl-grad-text|GradientHeading/);
  });
});

describe('GradientHeading', () => {
  it('keeps full text identical and leaves punctuation outside the span', () => {
    const text = 'Frequently Asked Questions?';
    const html = renderToStaticMarkup(
      createElement(GradientHeading, { as: 'h1', text, auto: true }),
    );
    expect(html.replace(/<[^>]+>/g, '')).toBe(text);
    expect(html).toContain('<span class="nl-grad-text">Asked Questions</span>?');
  });

  it('renders plain when highlight missing', () => {
    const html = renderToStaticMarkup(
      createElement(GradientHeading, {
        as: 'h2',
        text: 'Hello world',
        highlight: 'missing',
      }),
    );
    expect(html).not.toContain('nl-grad-text');
    expect(html.replace(/<[^>]+>/g, '')).toBe('Hello world');
  });
});
