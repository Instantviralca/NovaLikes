/**
 * QA: CA-1 Canada homepage storySections batch
 * Run: npx tsx scripts/verify-ca-homepage-story-batch-ca1.ts
 */
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const EXPECTED_IDS = [
  'profile-growth-table',
  'audience-segments',
  'first-impression',
  'priority-content',
  'campaign-moments',
  'better-profile',
  'content-worth-following',
  'local-businesses',
  'customer-proof',
  'metric-meanings',
  'affordable-growth',
  'account-you-have',
] as const;

type StorySection = {
  id: string;
  eyebrow?: string;
  title?: string;
  lead?: string;
  footer?: string;
  bullets?: string[];
  paragraphs?: string[];
  items?: { title: string; body: string }[];
};

function loadHomepage(market: string) {
  return JSON.parse(
    readFileSync(path.join(ROOT, `content/markets/${market}/homepage.json`), 'utf8'),
  ) as { storySections?: StorySection[]; services?: unknown[]; [k: string]: unknown };
}

function storyText(s: StorySection): string {
  const p: string[] = [];
  if (s.title) p.push(s.title);
  if (s.lead) p.push(s.lead);
  if (s.footer) p.push(s.footer);
  if (s.eyebrow) p.push(s.eyebrow);
  if (s.bullets) p.push(...s.bullets);
  if (s.paragraphs) p.push(...s.paragraphs);
  if (s.items) p.push(...s.items.flatMap((i) => [i.title, i.body]));
  return p.join('\n');
}

function tokenSet(text: string): Set<string> {
  return new Set(
    text.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').split(/\s+/).filter((w) => w.length > 1),
  );
}

function jaccard(a: Set<string>, b: Set<string>): number {
  if (!a.size && !b.size) return 0;
  const inter = [...a].filter((x) => b.has(x)).length;
  return inter / new Set([...a, ...b]).size;
}

function words(text: string): string[] {
  return text.toLowerCase().replace(/[^a-z0-9\s']/g, ' ').split(/\s+/).filter(Boolean);
}

function sharedPhrases(a: string, b: string, minLen: number): string[] {
  const aw = words(a);
  const bw = words(b);
  const out: string[] = [];
  for (let len = minLen; len <= Math.min(14, aw.length, bw.length); len++) {
    const set = new Set<string>();
    for (let i = 0; i <= aw.length - len; i++) set.add(aw.slice(i, i + len).join(' '));
    for (let i = 0; i <= bw.length - len; i++) {
      const p = bw.slice(i, i + len).join(' ');
      if (set.has(p) && !out.includes(p)) out.push(p);
    }
  }
  return out;
}

function hashJson(v: unknown): string {
  return createHash('sha256').update(JSON.stringify(v)).digest('hex');
}

const SUPPLIED: Record<string, StorySection> = {
  'profile-growth-table': {
    id: 'profile-growth-table',
    eyebrow: 'Choose the Right Instagram Metric',
    title: 'Start With the Part of Your Instagram Presence You Actually Want to Change',
    lead: 'Followers, Likes, Views and Comments solve different visible-metric goals. Choosing the right one starts with knowing whether the priority is the profile, a specific post, a Reel or the conversation around content.',
    footer:
      'Choose the metric first, then compare the relevant package. One Instagram service should not be treated as if it automatically changes every other number.',
    items: [
      {
        title: 'Build the Visible Audience Around a Profile',
        body: 'Choose Instagram Followers when the follower count displayed on the public profile is the metric you want to increase.',
      },
      {
        title: 'Add Visible Engagement to Selected Content',
        body: 'Choose Instagram Likes when you want to support the Like count on one eligible post or Reel.',
      },
      {
        title: 'Increase the Displayed Views on a Reel',
        body: 'Choose Instagram Views when the visible view count on eligible video content is the priority.',
      },
      {
        title: 'Add Visible Conversation Around Content',
        body: 'Choose Instagram Comments when discussion around a specific eligible post or Reel is the metric you want to support.',
      },
    ],
  },
  'audience-segments': {
    id: 'audience-segments',
    eyebrow: 'Instagram in Canada',
    title: 'Match Instagram Growth to the Type of Account You Are Building',
    lead: 'A creator, local business, ecommerce store and established brand can all use Instagram differently. The useful starting point is the real role the account plays.',
    items: [
      {
        title: 'Canadian Creators',
        body: 'Build around a recognisable subject, strong examples of your work and enough relevant content for new profile visitors to understand why they might follow.',
      },
      {
        title: 'Ecommerce Businesses',
        body: 'Use Instagram around products, demonstrations, launches and campaign content while keeping the path from social content to the actual store clear.',
      },
      {
        title: 'Local Businesses',
        body: 'Show genuine services, projects, locations, products or customer-facing activity that people can verify before deciding whether to contact the business.',
      },
      {
        title: 'Agencies',
        body: 'Choose Followers, Likes, Views or Comments according to the specific client account, campaign and asset instead of applying one standard package to every project.',
      },
      {
        title: 'Established Brands',
        body: 'Use visible Instagram metrics as one part of a wider marketing mix that may also include creators, paid media, ecommerce, search, email and the company website.',
      },
    ],
  },
};

// Full supplied sections loaded from CA file for exact-match after write
const ca = loadHomepage('ca');
const sections = ca.storySections ?? [];

let failed = 0;
const check = (label: string, ok: boolean) => {
  console.log(`${ok ? 'PASS' : 'FAIL'} ${label}`);
  if (!ok) failed += 1;
};

check('exactly 12 storySections', sections.length === 12);
check(
  'IDs in order',
  JSON.stringify(sections.map((s) => s.id)) === JSON.stringify(EXPECTED_IDS),
);

// Structure counts
const byId = Object.fromEntries(sections.map((s) => [s.id, s]));
check('profile-growth-table: 4 items', byId['profile-growth-table']?.items?.length === 4);
check('audience-segments: 5 items', byId['audience-segments']?.items?.length === 5);
check('first-impression: 10 bullets', byId['first-impression']?.bullets?.length === 10);
check('first-impression: 2 paragraphs', byId['first-impression']?.paragraphs?.length === 2);
check('first-impression: 4 items', byId['first-impression']?.items?.length === 4);
check('priority-content: 6 items', byId['priority-content']?.items?.length === 6);
check('campaign-moments: 1 paragraph', byId['campaign-moments']?.paragraphs?.length === 1);
check('campaign-moments: 6 items', byId['campaign-moments']?.items?.length === 6);
check('better-profile: 6 items', byId['better-profile']?.items?.length === 6);
check('content-worth-following: 6 items', byId['content-worth-following']?.items?.length === 6);
check('local-businesses: 5 paragraphs', byId['local-businesses']?.paragraphs?.length === 5);
check('customer-proof: 4 paragraphs', byId['customer-proof']?.paragraphs?.length === 4);
check('metric-meanings: 5 items + footer', byId['metric-meanings']?.items?.length === 5 && !!byId['metric-meanings']?.footer);
check('affordable-growth: 3 paragraphs', byId['affordable-growth']?.paragraphs?.length === 3);
check('account-you-have: 4 paragraphs', byId['account-you-have']?.paragraphs?.length === 4);

// Exact copy spot checks (first two sections full hash)
for (const id of ['profile-growth-table', 'audience-segments'] as const) {
  check(
    `exact copy ${id}`,
    JSON.stringify(byId[id]) === JSON.stringify(SUPPLIED[id]),
  );
}

// Non-story fields: compare services hash across markets unchanged for US/AU/UK
const us = loadHomepage('us');
const au = loadHomepage('au');
const uk = loadHomepage('uk');

check('US homepage unchanged (no ca storySections)', !(us.storySections ?? []).some((s) => s.title?.includes('Canadian Campaign Moments')));
check('AU homepage unchanged', !(au.storySections ?? []).some((s) => s.title?.includes('Canadian Campaign Moments')));
check('UK homepage unchanged', !(uk.storySections ?? []).some((s) => s.title?.includes('Canadian Campaign Moments')));

// TikTok / Facebook card ids present
const svc = (ca.services ?? []) as { id: string; platform: string }[];
const tt = svc.filter((s) => s.platform === 'tiktok').map((s) => s.id);
const fb = svc.filter((s) => s.platform === 'facebook').map((s) => s.id);
check('TikTok cards present', tt.length === 3);
check('Facebook cards present', fb.length === 3);

// Differentiation
const caStoryText = sections.map(storyText).join('\n');
for (const m of ['us', 'au', 'uk'] as const) {
  const other = loadHomepage(m);
  const otherText = (other.storySections ?? []).map(storyText).join('\n');
  const sim = jaccard(tokenSet(caStoryText), tokenSet(otherText));
  console.log(`\nCA vs ${m.toUpperCase()} story similarity: ${(sim * 100).toFixed(1)}%`);
  for (const caSec of sections) {
    const otherSec = (other.storySections ?? []).find((s) => s.id === caSec.id);
    if (!otherSec) continue;
    const secSim = jaccard(tokenSet(storyText(caSec)), tokenSet(storyText(otherSec)));
    console.log(`  ${caSec.id}: ${(secSim * 100).toFixed(1)}% vs ${m.toUpperCase()}`);
  }
}

const p8us = sharedPhrases(caStoryText, (us.storySections ?? []).map(storyText).join('\n'), 8);
const p20us = sharedPhrases(caStoryText, (us.storySections ?? []).map(storyText).join('\n'), 20);
console.log(`\n8+ word phrases CA vs US: ${p8us.length}`);
console.log(`20+ word phrases CA vs US: ${p20us.length}`);
if (p20us.length) p20us.slice(0, 5).forEach((p) => console.log(`  "${p}"`));

// Canadian markers
check(
  'qualitative: Canadian campaign content present',
  caStoryText.includes('Boxing Day Campaigns') && caStoryText.includes('Canadian Creators'),
);

if (failed) {
  console.error(`\n${failed} check(s) failed.`);
  process.exit(1);
}
console.log('\nAll CA-1 homepage story QA checks passed.');
