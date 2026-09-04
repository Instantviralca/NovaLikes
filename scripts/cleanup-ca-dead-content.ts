/**
 * Safe cleanup for Canada market content:
 * - Prune unused auto-generated faq-* entries from service-faqs.json
 * - Refresh generic homepage how-it-works copy
 * - Add Canada Quick Answer to Instagram Followers followersAuthority
 *
 * Run: npx tsx scripts/cleanup-ca-dead-content.ts
 */
import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';

const faqFile = path.join(process.cwd(), 'content/markets/ca/service-faqs.json');
const faqs = JSON.parse(readFileSync(faqFile, 'utf8')) as Array<{ id: string }>;
const caOnly = faqs.filter((item) => item.id.startsWith('ca-'));
writeFileSync(faqFile, `${JSON.stringify(caOnly, null, 2)}\n`, 'utf8');
console.log(`Pruned service-faqs.json: ${faqs.length} -> ${caOnly.length} entries`);

const homepageFile = path.join(process.cwd(), 'content/markets/ca/homepage.json');
const homepage = JSON.parse(readFileSync(homepageFile, 'utf8')) as {
  howItWorks: { steps: Array<{ title: string; body: string }> };
};
const pickPackageStep = homepage.howItWorks.steps.find((step) => step.title === 'Pick a Package');
if (pickPackageStep) {
  pickPackageStep.body =
    'Review package quantities and current prices, then choose the option that fits your goal.';
}
writeFileSync(homepageFile, `${JSON.stringify(homepage, null, 2)}\n`, 'utf8');
console.log('Updated homepage howItWorks step copy.');

const igFollowersFile = path.join(
  process.cwd(),
  'content/markets/ca/services/buy-instagram-followers.json',
);
const igFollowers = JSON.parse(readFileSync(igFollowersFile, 'utf8')) as Record<string, unknown>;
const followersAuthority = igFollowers.followersAuthority as Record<string, unknown>;
const howItWorks = (igFollowers.content as Record<string, unknown>).howItWorks as Record<
  string,
  unknown
>;

followersAuthority.quickAnswer = {
  heading: 'Quick Answer: Where Can You Buy Instagram Followers in Canada?',
  text: 'You can buy Instagram followers in Canada through NovaLikes by choosing an available follower package, entering your public Instagram username, and completing checkout online. Your Instagram password is not required. Followers increase the profile follower count and are separate from Instagram Likes, Views and Comments.',
};

howItWorks.description =
  'The process is centred around your public Instagram username and the follower package you choose.';

writeFileSync(igFollowersFile, `${JSON.stringify(igFollowers, null, 2)}\n`, 'utf8');
console.log('Added Instagram Followers Canada Quick Answer.');

console.log('Canada safe cleanup complete.');
