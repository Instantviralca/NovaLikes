import { readFileSync } from 'node:fs';
import path from 'node:path';

import { describe, expect, it } from 'vitest';

import { getEnglishServiceBundle } from '@/lib/i18n/content/english-source';
import { overlayEnglishWithIssues } from '@/lib/i18n/overlay';
import { loadMarketServiceBundle } from '@/lib/market/content/load';
import { MARKETS } from '@/lib/market/config';

const EXPECTED_IG_LIKES_STEPS = [
  'ig-l-step-1',
  'ig-l-step-2',
  'ig-l-step-3',
  'ig-l-step-4',
] as const;

describe('market overlay $replaceArrays', () => {
  it('replaces howItWorks.steps length when marked on the overlay object', () => {
    const english = {
      howItWorks: {
        title: 'How it works',
        steps: [
          { id: 'a', title: 'One', description: 'First' },
          { id: 'b', title: 'Two', description: 'Second' },
          { id: 'c', title: 'Three', description: 'Third' },
        ],
      },
    };
    const overlay = {
      howItWorks: {
        title: 'Market how it works',
        $replaceArrays: ['steps'],
        steps: [
          { id: 'a', title: 'Market one', description: 'Market first' },
          { id: 'b', title: 'Market two', description: 'Market second' },
        ],
      },
    };

    const { value, issues } = overlayEnglishWithIssues(english, overlay);
    expect(issues).toEqual([]);
    expect(value.howItWorks.steps).toHaveLength(2);
    expect(value.howItWorks.steps.map((step) => step.id)).toEqual(['a', 'b']);
    expect(value.howItWorks.steps[0]?.title).toBe('Market one');
    expect(value.howItWorks.title).toBe('Market how it works');
  });

  it('keeps index-aligned merge when $replaceArrays is absent', () => {
    const english = {
      howItWorks: {
        title: 'How it works',
        steps: [
          { id: 'a', title: 'One', description: 'First' },
          { id: 'b', title: 'Two', description: 'Second' },
          { id: 'c', title: 'Three', description: 'Third' },
        ],
      },
    };
    const overlay = {
      howItWorks: {
        title: 'Market how it works',
        steps: [
          { id: 'a', title: 'Market one', description: 'Market first' },
          { id: 'b', title: 'Market two', description: 'Market second' },
        ],
      },
    };

    const { value, issues } = overlayEnglishWithIssues(english, overlay);
    expect(value.howItWorks.steps).toHaveLength(3);
    expect(issues.some((issue) => issue.path.includes('steps[2]'))).toBe(true);
  });
});

describe('Instagram Likes market howItWorks steps', () => {
  it('English base still has five steps including ig-l-step-5', () => {
    const steps = getEnglishServiceBundle('buy-instagram-likes').content.howItWorks.steps;
    expect(steps).toHaveLength(5);
    expect(steps[4]?.id).toBe('ig-l-step-5');
  });

  it.each(MARKETS)('%s effective bundle has exactly four main steps', (market) => {
    const file = path.join(
      process.cwd(),
      'content',
      'markets',
      market,
      'services',
      'buy-instagram-likes.json',
    );
    const raw = JSON.parse(readFileSync(file, 'utf8')) as {
      content: { howItWorks: { $replaceArrays?: string[]; steps: Array<{ id: string }> } };
    };
    expect(raw.content.howItWorks.$replaceArrays).toEqual(['steps']);
    expect(raw.content.howItWorks.steps.map((step) => step.id)).toEqual([
      ...EXPECTED_IG_LIKES_STEPS,
    ]);

    const bundle = loadMarketServiceBundle(market, 'buy-instagram-likes');
    const steps = bundle.content.howItWorks.steps;
    expect(steps).toHaveLength(4);
    expect(steps.map((step) => step.id)).toEqual([...EXPECTED_IG_LIKES_STEPS]);
    expect(steps.some((step) => step.id === 'ig-l-step-5')).toBe(false);
  });
});
