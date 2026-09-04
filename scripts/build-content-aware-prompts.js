/**
 * Build content-aware image prompts from market service JSON + registry.
 * Output: reports/content-aware-image-prompts.json
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const registry = require('../data/market-unique-service-images.json');
const EXCL = new Set(['likes-vs-views', 'real-experience', 'profile-experience', 'page-trust']);

const MARKET_LABEL = { ca: 'Canada', au: 'Australia', us: 'United States', uk: 'United Kingdom' };
const MARKET_FOLDER = { ca: 'canada', au: 'australia', us: 'us', uk: 'uk' };

const STYLE = `Minimal premium soft 3D claymorphism NovaLikes marketing illustration.
Warm cream/peach background, soft orange/coral accents, Instagram pink or platform-appropriate accents.
Soft shadows, generous empty space, one clear focal concept.
ABSOLUTELY NO text, words, letters, numbers, labels, captions, logos with text, or readable UI copy.
No faces. No flags. No watermarks.`;

/** Section concept seeds by visualRole / common sectionId patterns */
function conceptFor(p, title, lead, platform, metric) {
  const id = p.sectionId;
  const t = `${title || ''} ${lead || ''}`.toLowerCase();

  if (id === 'hero') {
    return `HERO for Buy ${metric} ${MARKET_LABEL[p.market]}. ONE smartphone showing a clean ${platform} interface where ${metric.toLowerCase()} is the visual focus (icons/bubbles/hearts/views as abstract shapes only). Premium SaaS marketing feel.`;
  }
  if (id === 'why-buy') {
    return `WHY BUY ${metric}: content already worth engaging — show ONE phone with strong post creative plus ${metric.toLowerCase()} activity cues that support presentation, not random spam.`;
  }
  if (id === 'can-you-buy') {
    return `CAN YOU BUY safely: ONE phone + secure checkout card + public URL/link chain icon + lock-with-checkmark. Ordering without sharing password/login.`;
  }
  if (id === 'does-help') {
    return `DOES BUYING HELP: honest balanced visual — ${metric.toLowerCase()} as a supportive presentation signal beside a post, subtle boost not viral explosion or magic growth.`;
  }
  if (id === 'final-cta') {
    return `FINAL CTA: ready to choose a package — ONE phone with ${metric.toLowerCase()} cues plus abstract rounded package tiles (no text) and a soft forward arrow. Inviting.`;
  }
  if (id.includes('built-for')) {
    return `Built for ${MARKET_LABEL[p.market]} audiences: ONE phone hub with floating niche cards (creator, ecommerce product, local storefront) showing different content types that use ${metric.toLowerCase()}.`;
  }
  if (id === 'make-comments-fit') {
    return `Comment relevance: ONE phone showing a food/restaurant Reel; comment bubbles with food-related icons only (no text) matching the post topic.`;
  }
  if (id === 'reply-genuine') {
    return `Genuine replies vs purchased comments: question-mark bubble on one side; reply bubble with clock, map pin, price-tag icons (no numbers/text) on the other.`;
  }
  if (id === 'social-proof') {
    return `Split visual: LEFT comment/engagement bubbles on a phone; RIGHT genuine proof (stars, project photo tile, shield check). Clear separation — metrics ≠ customer proof. Center ≠ symbol ok as icon only.`;
  }
  if (id === 'organic-reach' || id === 'reach-not-same' || id === 'fyp-reach' || id === 'reach-context' || id === 'likes-reach') {
    return `Reach vs metric distinction: phone with ${metric.toLowerCase()} activity contained locally; faded Explore/FYP/grid icons in background showing metrics alone do not equal organic distribution.`;
  }
  if (id === 'local-businesses') {
    return `Local businesses: phone showing storefront/service post; location pin and service icons; ${metric.toLowerCase()} cues that fit real local content.`;
  }
  if (id === 'first-impression' || id === 'strong-first-glance' || id === 'better-profile' || id === 'better-page' || id === 'page-worth-exploring' || id === 'better-profile-experience') {
    return `First impression / profile or page presentation: clean profile or page header metaphor on ONE phone with ${metric.toLowerCase()} as a soft credibility signal.`;
  }
  if (id === 'customer-proof' || id === 'business-proof') {
    return `Customer/business proof: reviews stars, message icons, completed work photo tile — separate from vanity metrics.`;
  }
  if (id === 'brand-partnerships' || id === 'brand-credibility' || id === 'brand-campaigns' || id === 'brands-agencies') {
    return `Brand partnerships/campaigns: collab handshake or dual brand tiles beside a phone post with ${metric.toLowerCase()} support cues.`;
  }
  if (id === 'visible-momentum') {
    return `Visible momentum: phone with rising abstract activity bars/arcs around views or engagement — progress without numbers.`;
  }
  if (id === 'clear-niche') {
    return `Clear niche: phone profile with themed content tiles stacked consistently (one niche visual language).`;
  }
  if (id === 'platform-rules' || id === 'organic-growth' || id === 'organic-engagement') {
    return `Platform rules / organic reality: calm shield + checklist icons beside phone; honest compliance mood, not aggressive growth hype.`;
  }
  if (id === 'monetisation' || id === 'monetisation-views' || id === 'creator-rewards') {
    return `Creator monetisation context: phone + subtle coin/reward tile metaphor (abstract, no currency numbers) near content metrics.`;
  }
  if (id.includes('vs') || id === 'likes-views-context' || id === 'views-followers-context' || id === 'views-not-likes' || id === 'followers-vs-likes' || id === 'page-likes-vs-followers' || id === 'metrics-distinction') {
    return `Metric comparison split: two calm zones comparing related ${platform} metrics with distinct icons (hearts vs eyes vs people vs page thumbs) — no text labels.`;
  }
  if (id === 'real-activity' || id === 'genuine-engagement') {
    return `Real activity vs empty metrics: lively but believable engagement icons on a post, grounded not spammy.`;
  }
  if (id === 'useful-next-step' || id === 'content-people-need' || id === 'more-business' || id === 'business-results') {
    return `Business outcome metaphor: phone post leading to calendar booking, map visit, or shopping bag icon — next step beyond vanity metrics.`;
  }
  if (id === 'unique-viewers') {
    return `Unique viewers concept: multiple abstract avatar dots around a video frame, distinct from raw view count explosion.`;
  }
  // fallback from title
  return `Section concept from page copy: "${title}". ${lead ? `Lead idea: ${lead.slice(0, 180)}` : ''} Visualize with ONE phone and icon-only metaphors for ${metric}. Match the meaning of the section.`;
}

function loadContent(market, slug) {
  const file = path.join(ROOT, 'content', 'markets', market, 'services', `${slug}.json`);
  if (!fs.existsSync(file)) return null;
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

function sectionCopy(content, sectionId) {
  if (!content) return { title: '', lead: '' };
  const c = content.content || content;
  const dummy = c.dummy || {};
  if (sectionId === 'hero') return { title: c.hero?.title || '', lead: c.hero?.description || '' };
  if (sectionId === 'why-buy') {
    const w = dummy.whyBuy || c.benefits;
    return { title: w?.title || '', lead: w?.description || '' };
  }
  if (sectionId === 'can-you-buy') {
    const x = dummy.canYouBuy || dummy.config?.canYouBuy;
    return { title: x?.title || '', lead: x?.description || '' };
  }
  if (sectionId === 'does-help') {
    const x = dummy.doesBuyingHelp || dummy.config?.doesBuyingHelp;
    return { title: x?.title || '', lead: x?.description || '' };
  }
  if (sectionId === 'final-cta') {
    const x = c.finalCta || dummy.finalCta;
    return { title: x?.title || '', lead: x?.description || '' };
  }
  const stories = dummy.storySections || [];
  const s = stories.find((x) => x.id === sectionId);
  if (s) return { title: s.title || '', lead: s.lead || (s.paragraphs && s.paragraphs[0]) || '' };
  return { title: sectionId, lead: '' };
}

function platformOf(slug) {
  if (slug.includes('instagram')) return 'Instagram';
  if (slug.includes('tiktok')) return 'TikTok';
  if (slug.includes('facebook')) return 'Facebook';
  return 'social';
}

function metricOf(slug) {
  if (slug.includes('comments')) return 'Comments';
  if (slug.includes('followers')) return 'Followers';
  if (slug.includes('page-likes')) return 'Page Likes';
  if (slug.includes('post-likes')) return 'Post Likes';
  if (slug.includes('likes')) return 'Likes';
  if (slug.includes('views')) return 'Views';
  return 'engagement';
}

function destFilename(p) {
  // src like /assets/.../buy-instagram-comments-uk-hero.webp
  return path.basename(p.src);
}

const DONE_UK_IG_COMMENTS = new Set([
  'uk|buy-instagram-comments|hero',
  'uk|buy-instagram-comments|why-buy',
  'uk|buy-instagram-comments|can-you-buy',
  'uk|buy-instagram-comments|does-help',
  'uk|buy-instagram-comments|final-cta',
  'uk|buy-instagram-comments|built-for-uk',
  'uk|buy-instagram-comments|social-proof',
  'uk|buy-instagram-comments|organic-reach',
  'uk|buy-instagram-comments|local-businesses',
  'uk|buy-instagram-comments|make-comments-fit',
  'uk|buy-instagram-comments|reply-genuine',
]);

const prompts = [];
for (const p of registry.placements) {
  if (EXCL.has(p.sectionId)) continue;
  const key = `${p.market}|${p.slug}|${p.sectionId}`;
  if (DONE_UK_IG_COMMENTS.has(key)) continue;

  const content = loadContent(p.market, p.slug);
  const copy = sectionCopy(content, p.sectionId);
  const platform = platformOf(p.slug);
  const metric = metricOf(p.slug);
  const concept = conceptFor(p, copy.title, copy.lead, platform, metric);

  const filename = `ca-${p.market}-${p.slug.replace(/buy-/g, '')}-${p.sectionId}.png`.replace(
    /[^a-z0-9._-]+/gi,
    '-',
  );

  prompts.push({
    key,
    market: p.market,
    slug: p.slug,
    sectionId: p.sectionId,
    destRel: p.src.replace(/^\//, 'public/'),
    destWebp: path.join(
      ROOT,
      'public',
      'assets',
      'images',
      'illustrations',
      'markets',
      p.market,
      p.slug.replace('buy-', '').replace(/instagram-|tiktok-|facebook-/, (m) => {
        // keep folder naming from src
        return '';
      }),
    ),
    destFile: path.join(ROOT, 'public', p.src.replace(/^\//, '')),
    genFilename: filename,
    title: copy.title,
    description: `${STYLE}\n\n${concept}\n\nMarket: ${MARKET_LABEL[p.market]}. Platform: ${platform}. Metric: ${metric}. Section: ${p.sectionId}.`,
  });
}

// Fix destFile properly from src
for (const row of prompts) {
  row.destFile = path.join(ROOT, 'public', row.destRel.replace(/^public[\\/]/, ''));
  // destRel already public/...
  const srcPath = registry.placements.find(
    (x) => `${x.market}|${x.slug}|${x.sectionId}` === row.key,
  ).src;
  row.destFile = path.join(ROOT, 'public', srcPath.replace(/^\//, ''));
  row.src = srcPath;
}

const out = path.join(ROOT, 'reports', 'content-aware-image-prompts.json');
fs.writeFileSync(out, JSON.stringify({ style: STYLE, count: prompts.length, prompts }, null, 2));
console.log('wrote', out, 'count', prompts.length);

// Group by page for agent batches
const byPage = {};
for (const row of prompts) {
  const k = `${row.market}|${row.slug}`;
  (byPage[k] = byPage[k] || []).push(row.key);
}
fs.writeFileSync(
  path.join(ROOT, 'reports', 'content-aware-image-batches.json'),
  JSON.stringify(byPage, null, 2),
);
console.log('pages remaining', Object.keys(byPage).length);
