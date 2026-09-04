/**
 * QA: Four-market Instagram Likes howItWorks Step 5 cleanup
 * Run: npx tsx scripts/verify-ig-likes-step5-cleanup.ts
 */
import { readFileSync } from 'node:fs';
import path from 'node:path';

const markets = ['ca', 'au', 'us', 'uk'] as const;

const expectedSteps = [
  {
    id: 'ig-l-step-1',
    title: 'Choose Your Likes Package',
    description:
      'Compare the available quantities and select the number of likes you want.',
  },
  {
    id: 'ig-l-step-2',
    title: 'Paste the Post or Reel URL',
    description:
      'Provide the exact public Instagram URL for the content receiving the order.',
  },
  {
    id: 'ig-l-step-3',
    title: 'Review and Complete Checkout',
    description:
      'Check the likes quantity, content URL, and current package price before placing the order.',
  },
  {
    id: 'ig-l-step-4',
    title: 'Track Your Order',
    description:
      'After checkout, use NovaLikes order tracking to view available status updates.',
  },
];

let failed = 0;

for (const market of markets) {
  const file = path.join(
    process.cwd(),
    `content/markets/${market}/services/buy-instagram-likes.json`,
  );
  const data = JSON.parse(readFileSync(file, 'utf8')) as {
    content: {
      howItWorks: {
        title: string;
        description: string;
        steps: Array<{ id: string; title: string; description: string }>;
      };
      dummy?: { howItWorks?: { steps?: unknown[] } };
    };
  };

  const { howItWorks } = data.content;
  const checks: Array<[string, boolean]> = [
    ['exactly 4 steps', howItWorks.steps.length === 4],
    [
      'description unchanged',
      howItWorks.description ===
        'Ordering Instagram likes through NovaLikes takes four simple steps.',
    ],
    ['title unchanged', howItWorks.title === 'How to Buy Instagram Likes'],
    [
      'steps 1-4 byte-for-byte match',
      JSON.stringify(howItWorks.steps) === JSON.stringify(expectedSteps),
    ],
    [
      'placeholder absent (buy-instagram-likes-step-5)',
      !howItWorks.steps.some((s) => s.id === 'buy-instagram-likes-step-5'),
    ],
    [
      'placeholder absent (Step 5 title)',
      !howItWorks.steps.some((s) => s.title === 'Step 5'),
    ],
    [
      'placeholder absent (ig-l-step-5 in main howItWorks)',
      !howItWorks.steps.some((s) => s.id === 'ig-l-step-5'),
    ],
  ];

  console.log(`\n${market.toUpperCase()}:`);
  for (const [label, ok] of checks) {
    console.log(`  ${ok ? 'PASS' : 'FAIL'} ${label}`);
    if (!ok) failed += 1;
  }
}

if (failed > 0) {
  console.error(`\n${failed} check(s) failed.`);
  process.exit(1);
}

console.log('\nAll four markets passed Step 5 cleanup QA.');
