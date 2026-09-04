/**
 * Build four-market unique image placement manifest (498 expected).
 * Run: node scripts/build-unique-image-manifest.js
 */
const fs = require('fs');

const STORY_PROFILE_IDS = new Set([
  'first-impression',
  'built-for-canada',
  'built-for-us',
  'built-for-uk',
  'built-for-australia',
  'strong-first-glance',
  'stronger-presence',
  'visible-momentum',
  'profile-experience',
  'better-profile-experience',
  'better-profile',
  'page-worth-exploring',
  'better-page',
  'clear-niche',
  'account-you-have',
]);
const STORY_REACH_IDS = new Set([
  'reach-context',
  'organic-reach',
  'fyp-reach',
  'reach-not-same',
  'likes-reach',
  'likes-views-context',
  'views-followers-context',
  'followers-vs-likes',
  'page-likes-vs-followers',
  'likes-vs-views',
  'views-not-likes',
  'metrics-distinction',
  'unique-viewers',
  'platform-rules',
]);
const STORY_PROOF_IDS = new Set([
  'brand-partnerships',
  'brand-credibility',
  'brands-agencies',
  'brand-campaigns',
  'customer-proof',
  'social-proof',
  'real-experience',
  'business-proof',
  'real-activity',
  'genuine-engagement',
  'organic-engagement',
  'organic-growth',
  'monetisation',
  'monetisation-views',
  'creator-rewards',
  'local-businesses',
  'more-business',
  'business-results',
  'real-business-content',
  'useful-next-step',
  'content-people-need',
]);
const CA_KEYS = new Set([
  'first-impression',
  'built-for-canada',
  'built-for-us',
  'built-for-uk',
  'built-for-australia',
  'strong-first-glance',
  'stronger-presence',
  'visible-momentum',
  'profile-experience',
  'better-profile-experience',
  'page-worth-exploring',
  'better-page',
  'reach-context',
  'organic-reach',
  'fyp-reach',
  'reach-not-same',
  'likes-reach',
  'likes-views-context',
  'views-followers-context',
  'followers-vs-likes',
  'page-likes-vs-followers',
  'likes-vs-views',
  'views-not-likes',
  'metrics-distinction',
  'unique-viewers',
  'brand-partnerships',
  'brand-credibility',
  'brands-agencies',
  'brand-campaigns',
  'customer-proof',
  'social-proof',
  'real-experience',
  'business-proof',
  'real-activity',
  'genuine-engagement',
  'organic-engagement',
  'organic-growth',
  'local-businesses',
  'more-business',
  'business-results',
  'real-business-content',
  'useful-next-step',
  'content-people-need',
  'affordable-growth',
  'account-you-have',
  'hq-premium',
  'platform-rules',
  'monetisation',
  'monetisation-views',
  'creator-rewards',
]);

function hasStoryImage(id, platform) {
  if (platform === 'tiktok' || platform === 'facebook') {
    return (
      STORY_PROFILE_IDS.has(id) || STORY_REACH_IDS.has(id) || STORY_PROOF_IDS.has(id)
    );
  }
  return CA_KEYS.has(id);
}

function currentStoryPath(id, platform) {
  if (platform === 'tiktok') {
    if (STORY_PROFILE_IDS.has(id)) {
      return '/assets/images/illustrations/shared/tiktok-profile-first-impression.webp';
    }
    if (STORY_REACH_IDS.has(id)) {
      return '/assets/images/illustrations/shared/tiktok-reach-distribution.webp';
    }
    if (STORY_PROOF_IDS.has(id)) {
      return '/assets/images/illustrations/shared/tiktok-metrics-vs-proof.webp';
    }
  }
  if (platform === 'facebook') {
    if (STORY_PROFILE_IDS.has(id)) {
      return '/assets/images/illustrations/shared/facebook-page-first-impression.webp';
    }
    if (STORY_REACH_IDS.has(id)) {
      return '/assets/images/illustrations/shared/facebook-reach-distribution.webp';
    }
    if (STORY_PROOF_IDS.has(id)) {
      return '/assets/images/illustrations/shared/facebook-metrics-vs-proof.webp';
    }
  }
  if (['affordable-growth', 'hq-premium'].includes(id)) {
    return '/assets/images/illustrations/homepage/ca/ca-package-comparison.png';
  }
  if (id === 'account-you-have') {
    return '/assets/images/illustrations/instagram-followers/instagram-followers-buying-process.webp';
  }
  if (STORY_REACH_IDS.has(id) || id === 'platform-rules') {
    return '/assets/images/illustrations/homepage/ca/ca-instagram-profile-audit.png';
  }
  if (
    [
      'brand-partnerships',
      'brand-credibility',
      'brands-agencies',
      'brand-campaigns',
      'monetisation',
      'monetisation-views',
      'creator-rewards',
    ].includes(id)
  ) {
    return '/assets/images/illustrations/instagram-followers/instagram-followers-why-buy.webp';
  }
  if (
    [
      'local-businesses',
      'more-business',
      'business-results',
      'real-business-content',
      'useful-next-step',
      'content-people-need',
    ].includes(id)
  ) {
    return '/assets/images/illustrations/homepage/ca/ca-local-business-trust.png';
  }
  if (
    [
      'customer-proof',
      'social-proof',
      'real-experience',
      'business-proof',
      'real-activity',
      'genuine-engagement',
      'organic-engagement',
      'organic-growth',
    ].includes(id)
  ) {
    return '/assets/images/illustrations/homepage/ca/ca-metrics-vs-customer-proof.png';
  }
  return '/assets/images/illustrations/homepage/instagram-followers-visual.webp';
}

const markets = [
  { code: 'ca', name: 'canada', label: 'Canada' },
  { code: 'au', name: 'australia', label: 'Australia' },
  { code: 'us', name: 'usa', label: 'USA' },
  { code: 'uk', name: 'uk', label: 'UK' },
];

const services = [
  {
    slug: 'buy-instagram-followers',
    platform: 'instagram',
    folder: 'instagram-followers',
    metric: 'Followers',
    serviceTitle: 'Buy Instagram Followers',
  },
  {
    slug: 'buy-instagram-likes',
    platform: 'instagram',
    folder: 'instagram-likes',
    metric: 'Likes',
    serviceTitle: 'Buy Instagram Likes',
  },
  {
    slug: 'buy-instagram-views',
    platform: 'instagram',
    folder: 'instagram-views',
    metric: 'Views',
    serviceTitle: 'Buy Instagram Views',
  },
  {
    slug: 'buy-instagram-comments',
    platform: 'instagram',
    folder: 'instagram-comments',
    metric: 'Comments',
    serviceTitle: 'Buy Instagram Comments',
  },
  {
    slug: 'buy-tiktok-followers',
    platform: 'tiktok',
    folder: 'tiktok-followers',
    metric: 'Followers',
    serviceTitle: 'Buy TikTok Followers',
  },
  {
    slug: 'buy-tiktok-likes',
    platform: 'tiktok',
    folder: 'tiktok-likes',
    metric: 'Likes',
    serviceTitle: 'Buy TikTok Likes',
  },
  {
    slug: 'buy-tiktok-views',
    platform: 'tiktok',
    folder: 'tiktok-views',
    metric: 'Views',
    serviceTitle: 'Buy TikTok Views',
  },
  {
    slug: 'buy-facebook-followers',
    platform: 'facebook',
    folder: 'facebook-followers',
    metric: 'Followers',
    serviceTitle: 'Buy Facebook Followers',
  },
  {
    slug: 'buy-facebook-page-likes',
    platform: 'facebook',
    folder: 'facebook-page-likes',
    metric: 'Page Likes',
    serviceTitle: 'Buy Facebook Page Likes',
  },
  {
    slug: 'buy-facebook-post-likes',
    platform: 'facebook',
    folder: 'facebook-post-likes',
    metric: 'Post Likes',
    serviceTitle: 'Buy Facebook Post Likes',
  },
];

const roleConcept = {
  hero: 'One phone showing the primary service metric on clean platform UI; 1–2 soft floating accents; generous empty space; market-unique angle/placement',
  'why-buy':
    'One content or profile card with a simple reason/presentation cue for this metric; minimal supporting element',
  'can-you-buy':
    'Simple order flow: one device or card with public URL/username field and soft package chip; no-password cue',
  'does-help':
    'Primary metric emphasized; a small muted separate-outcomes group; clear help-vs-limits idea without clutter',
  'final-cta': 'One package card with soft checkout affordance; calm CTA composition',
};

const storyConcept = {
  profile:
    'Clean profile/Page first impression on one device; soft audience cue; lots of space',
  reach: 'Visible metric calm on one side; organic distribution metaphor restrained on the other',
  proof: 'Visible metric vs genuine proof/review cue; split but sparse',
  local: 'Simple local business presence + one profile/Page cue; avoid crowded collage',
  brand: 'Creator/business profile with one partnership/campaign cue',
  package: 'Two simple package cards with checklist dots; restrained',
  process: 'Package to account-details flow; one calm sequence',
  default: 'Section-matched single-idea minimal platform illustration',
};

function storyFamily(id) {
  if (STORY_PROFILE_IDS.has(id)) return 'profile';
  if (STORY_REACH_IDS.has(id)) return 'reach';
  if (
    [
      'local-businesses',
      'more-business',
      'business-results',
      'real-business-content',
      'useful-next-step',
      'content-people-need',
    ].includes(id)
  ) {
    return 'local';
  }
  if (
    ['brand-partnerships', 'brand-credibility', 'brands-agencies', 'brand-campaigns'].includes(
      id,
    )
  ) {
    return 'brand';
  }
  if (['affordable-growth', 'hq-premium'].includes(id)) return 'package';
  if (id === 'account-you-have') return 'process';
  if (STORY_PROOF_IDS.has(id)) return 'proof';
  return 'default';
}

function purposeSlug(role, sectionId) {
  if (role === 'hero') return 'hero';
  if (role === 'why-buy') return 'why-buy';
  if (role === 'can-you-buy') return 'can-you-buy';
  if (role === 'does-help') return 'does-buying-help';
  if (role === 'final-cta') return 'final-cta';
  return sectionId;
}

function fixedCurrent(svc, role) {
  const b = svc.folder;
  if (role === 'hero') return `/assets/images/illustrations/${b}/${b}-hero.webp`;
  if (role === 'why-buy') return `/assets/images/illustrations/${b}/${b}-why-buy.webp`;
  if (role === 'can-you-buy') {
    return svc.slug === 'buy-instagram-followers'
      ? '/assets/images/illustrations/instagram-followers/instagram-followers-buying-process.webp'
      : `/assets/images/illustrations/${b}/${b}-order-process.webp`;
  }
  if (role === 'does-help') return `/assets/images/illustrations/${b}/${b}-does-help.webp`;
  if (role === 'final-cta') return `/assets/images/illustrations/${b}/${b}-package-cta.webp`;
  return '';
}

function loadStories(j, slug) {
  if (slug === 'buy-instagram-followers') return j.followersAuthority?.storySections || [];
  return j.dummy?.storySections || [];
}

function altFor(pk, role, family, platform, sectionId, metric) {
  const plat =
    platform === 'tiktok' ? 'TikTok' : platform === 'facebook' ? 'Facebook' : 'Instagram';
  if (role === 'hero') {
    return `${pk} illustration showing a clean ${plat} interface with visible ${metric} and soft audience activity`;
  }
  if (role === 'why-buy') {
    return `${pk} illustration showing why this ${metric} metric supports profile or content presentation`;
  }
  if (role === 'can-you-buy') {
    return `${pk} illustration showing a simple public-link order flow with no password required`;
  }
  if (role === 'does-help') {
    return `${pk} illustration showing visible ${metric} versus separate organic and business outcomes`;
  }
  if (role === 'final-cta') {
    return `${pk} illustration showing package selection and checkout for this service`;
  }
  const map = {
    profile: `${pk} illustration showing a clean ${plat} profile or Page first impression with content context`,
    reach: `${pk} illustration showing visible metrics separate from organic ${plat} reach and distribution`,
    proof: `${pk} illustration comparing visible ${plat} metrics with genuine customer proof signals`,
    local: `${pk} illustration showing local business presence beside a simple ${plat} profile or Page`,
    brand: `${pk} illustration showing a creator or business profile with partnership review cues`,
    package: `${pk} illustration showing simple growth package comparison cards`,
    process: `${pk} illustration showing the ordering process from package choice to account details`,
    default: `${pk} illustration for the ${sectionId} section with a single clear ${plat} concept`,
  };
  return map[family] || map.default;
}

const placements = [];
let n = 0;
const byMarket = { ca: 0, au: 0, us: 0, uk: 0 };
const byRole = {};

for (const m of markets) {
  for (const svc of services) {
    const jsonPath = `content/markets/${m.code}/services/${svc.slug}.json`;
    const j = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
    const pk = `${svc.serviceTitle} ${m.label}`;
    const stories = loadStories(j, svc.slug);

    const whyTitle =
      j.dummy?.config?.whyBuy?.title ||
      j.content?.whyBuy?.title ||
      j.followersAuthority?.whyBuy?.title ||
      'Why buy';
    const canTitle =
      j.dummy?.config?.canYouBuy?.title ||
      j.followersAuthority?.canYouBuy?.title ||
      'Can you buy';
    const doesTitle =
      j.dummy?.config?.doesBuyingHelp?.title ||
      j.followersAuthority?.doesBuyingHelp?.title ||
      'Does buying help';

    const fixed = [
      { role: 'hero', sectionId: 'hero', heading: j.content?.hero?.title || 'Hero' },
      { role: 'why-buy', sectionId: 'why-buy', heading: whyTitle },
      { role: 'can-you-buy', sectionId: 'can-you-buy', heading: canTitle },
      { role: 'does-help', sectionId: 'does-help', heading: doesTitle },
      { role: 'final-cta', sectionId: 'final-cta', heading: 'Final package CTA' },
    ];

    for (const f of fixed) {
      n += 1;
      byMarket[m.code] += 1;
      byRole[f.role] = (byRole[f.role] || 0) + 1;
      const purpose = purposeSlug(f.role);
      const filename = `${svc.slug}-${m.name}-${purpose}.webp`;
      const publicPath = `public/assets/images/illustrations/markets/${m.code}/${svc.folder}/${filename}`;
      const webPath = `/assets/images/illustrations/markets/${m.code}/${svc.folder}/${filename}`;
      placements.push({
        num: n,
        market: m.code,
        marketName: m.name,
        marketLabel: m.label,
        route: `/${m.code}/${svc.slug}`,
        slug: svc.slug,
        platform: svc.platform,
        folder: svc.folder,
        metric: svc.metric,
        primaryKeyword: pk,
        sectionHeading: String(f.heading).replace(/\s+/g, ' ').trim().slice(0, 160),
        sectionId: f.sectionId,
        visualRole: f.role,
        currentPath: fixedCurrent(svc, f.role),
        newFilename: filename,
        newPublicPath: publicPath,
        webPath,
        altText: altFor(pk, f.role, null, svc.platform, f.sectionId, svc.metric),
        concept: roleConcept[f.role],
        style:
          'Minimal premium soft NovaLikes SaaS illustration; cream/off-white; soft orange/coral; platform accent; one focal idea; generous empty space; TokBoostly-inspired restraint; no flags; no photorealism',
        dimensions: '1536×1024',
        aspect: '3:2',
        format: 'WebP',
        targetKB: '60–70',
      });
    }

    for (const s of stories) {
      if (!hasStoryImage(s.id, svc.platform)) continue;
      n += 1;
      byMarket[m.code] += 1;
      byRole['story-side'] = (byRole['story-side'] || 0) + 1;
      const fam = storyFamily(s.id);
      const purpose = purposeSlug('story', s.id);
      const filename = `${svc.slug}-${m.name}-${purpose}.webp`;
      const publicPath = `public/assets/images/illustrations/markets/${m.code}/${svc.folder}/${filename}`;
      const webPath = `/assets/images/illustrations/markets/${m.code}/${svc.folder}/${filename}`;
      placements.push({
        num: n,
        market: m.code,
        marketName: m.name,
        marketLabel: m.label,
        route: `/${m.code}/${svc.slug}`,
        slug: svc.slug,
        platform: svc.platform,
        folder: svc.folder,
        metric: svc.metric,
        primaryKeyword: pk,
        sectionHeading: String(s.heading || s.id)
          .replace(/\s+/g, ' ')
          .trim()
          .slice(0, 160),
        sectionId: s.id,
        visualRole: 'story-side',
        currentPath: currentStoryPath(s.id, svc.platform),
        newFilename: filename,
        newPublicPath: publicPath,
        webPath,
        altText: altFor(pk, 'story', fam, svc.platform, s.id, svc.metric),
        concept: `${storyConcept[fam] || storyConcept.default} — section id: ${s.id}; market composition variant: ${m.label}`,
        style:
          'Minimal premium soft NovaLikes SaaS illustration; cream/off-white; soft orange/coral; platform accent; one focal idea; generous empty space; TokBoostly-inspired restraint; no flags; no photorealism',
        dimensions: '1536×1024',
        aspect: '3:2',
        format: 'WebP',
        targetKB: '60–70',
      });
    }
  }
}

// Uniquify duplicate alts without keyword stuffing
{
  const seen = new Map();
  for (const p of placements) {
    const count = seen.get(p.altText) || 0;
    if (count > 0) {
      p.altText = `${p.altText} (${p.sectionId.replace(/-/g, ' ')} layout)`;
    }
    seen.set(p.altText.split(' (')[0], count + 1);
    // track full alt after mutation in second pass
  }
}
{
  const seen = new Set();
  for (const p of placements) {
    let alt = p.altText;
    let i = 0;
    while (seen.has(alt)) {
      i += 1;
      alt = `${p.altText} variant ${i}`;
    }
    p.altText = alt;
    seen.add(alt);
  }
}

let dupFile = 0;
let dupAlt = 0;
const fileSet = new Set();
const altSet = new Set();
for (const p of placements) {
  if (fileSet.has(p.newFilename)) dupFile += 1;
  else fileSet.add(p.newFilename);
  if (altSet.has(p.altText)) dupAlt += 1;
  else altSet.add(p.altText);
}

fs.mkdirSync('reports', { recursive: true });
fs.writeFileSync(
  'reports/_unique-image-placements.json',
  JSON.stringify(
    { meta: { total: placements.length, byMarket, byRole, dupFile, dupAlt }, placements },
    null,
    2,
  ),
);

let md = '';
md += '# Four-Market Unique Service Image Manifest\n\n';
md += '**Status:** Inventory complete — ready for unique-asset generation  \n';
md += '**Strategy:** One unique WebP per meaningful painted placement (zero reuse)  \n';
md += '**Previous 15-shared strategy:** CANCELLED  \n';
md += '**Homepages:** Out of scope  \n\n';
md += '## Summary\n\n';
md += '| Metric | Count |\n|---|---:|\n';
md += `| Meaningful placements (current render) | **${placements.length}** |\n`;
md += `| Fixed roles (hero/why/can/does/cta × 40) | **${(byRole.hero || 0) + (byRole['why-buy'] || 0) + (byRole['can-you-buy'] || 0) + (byRole['does-help'] || 0) + (byRole['final-cta'] || 0)}** |\n`;
md += `| Story side visuals | **${byRole['story-side'] || 0}** |\n`;
md += `| CA | ${byMarket.ca} |\n`;
md += `| AU | ${byMarket.au} |\n`;
md += `| US | ${byMarket.us} |\n`;
md += `| UK | ${byMarket.uk} |\n`;
md += `| Unique filenames | ${placements.length - dupFile} |\n`;
md += `| Duplicate filenames | ${dupFile} |\n`;
md += `| Duplicate alt texts | ${dupAlt} |\n\n`;
md += '### Spec (all assets)\n\n';
md += '- Format: WebP\n';
md += '- Dimensions: 1536×1024 (3:2)\n';
md += '- Target size: 60–70 KB (acceptable 55–75 KB)\n';
md += '- Style: minimal TokBoostly-inspired restraint; NovaLikes cream/orange identity\n';
md += '- Filename: `{service-slug}-{market}-{section-purpose}.webp`\n';
md += '- Alt: page primary keyword once + description\n\n';
md += '### Page primary keyword pattern\n\n';
md += '`Buy {Platform} {Metric} {Canada|Australia|USA|UK}`\n\n';
md += '### Role breakdown\n\n';
md += '| Role | Count |\n|---|---:|\n';
for (const [k, v] of Object.entries(byRole)) {
  md += `| ${k} | ${v} |\n`;
}
md += '\n---\n\n## Full placement registry\n\n';

for (const p of placements) {
  md += `### ${String(p.num).padStart(3, '0')}. ${p.route} — ${p.visualRole}${p.visualRole === 'story-side' ? ` (\`${p.sectionId}\`)` : ''}\n\n`;
  md += '| Field | Value |\n|---|---|\n';
  md += `| Market | ${p.marketLabel} (\`${p.market}\`) |\n`;
  md += `| Route | \`${p.route}\` |\n`;
  md += `| Primary keyword | ${p.primaryKeyword} |\n`;
  md += `| Section heading | ${p.sectionHeading.replace(/\|/g, '/')} |\n`;
  md += `| Section ID | \`${p.sectionId}\` |\n`;
  md += `| Visual role | ${p.visualRole} |\n`;
  md += `| Current path | \`${p.currentPath}\` |\n`;
  md += `| New filename | \`${p.newFilename}\` |\n`;
  md += `| New public path | \`${p.newPublicPath}\` |\n`;
  md += `| Alt text | ${p.altText.replace(/\|/g, '/')} |\n`;
  md += `| Concept | ${p.concept.replace(/\|/g, '/')} |\n`;
  md += `| Style | ${p.style} |\n`;
  md += `| Dimensions | ${p.dimensions} · ${p.aspect} · ${p.format} |\n`;
  md += `| Target file size | ${p.targetKB} KB |\n\n`;
}

md += '---\n\n## Notes\n\n';
md += '- Best Practices rasters are wired but **not rendered** on market pages — excluded.\n';
md += '- `#page-trust` has no side image after prior mapping removal — excluded.\n';
md += '- Carousel-only story sections (campaign/framework/measure) — excluded.\n';
md += '- Instagram Followers stories load from `followersAuthority.storySections`.\n';
md += '- Do not reuse any path across two placements.\n';
md += '- NO COMMIT / NO PUSH / NO DEPLOY unless requested.\n';

fs.writeFileSync('reports/four-market-unique-image-manifest.md', md);

console.log(
  JSON.stringify(
    {
      total: placements.length,
      byMarket,
      byRole,
      dupFile,
      dupAlt,
      manifestKB: Math.round(md.length / 1024),
    },
    null,
    2,
  ),
);
