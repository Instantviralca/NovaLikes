/**
 * Social Media Asset Generator — Document 16.05.
 */

import { SEO_PRODUCTION_DOMAIN } from '@/config/seo';
import { learnArticlePath } from '@/config/routes';
import type { ArticleBrief } from '@/types/content-plan';
import type {
  AssetValidationIssue,
  SocialCampaignAssets,
  SocialPlatform,
  SocialPostVariant,
} from '@/types/content-assets';

const CHAR_LIMITS: Record<SocialPlatform, number> = {
  facebook: 2000,
  instagram: 2200,
  x: 280,
  linkedin: 3000,
};

const CLICKBAIT =
  /\b(you won't believe|guaranteed (ranking|monetization|followers|results|income)|secret hack|get rich|100% real overnight)\b/i;

const NEGATED_CLAIM =
  /\b(never|no|not|without|avoid|do not|don't)\b[^.!?\n]{0,60}\b(guaranteed (ranking|monetization|followers|results|income)|secret hack|get rich|you won't believe|100% real overnight)\b/gi;

function hasUnsupportedClaimOrClickbait(text: string): boolean {
  if (!CLICKBAIT.test(text)) return false;
  const withoutNegatedEducation = text.replace(NEGATED_CLAIM, '');
  return CLICKBAIT.test(withoutNegatedEducation);
}

export function generateHashtags(brief: ArticleBrief): string[] {
  const base = [
    'NovaLikes',
    'Learn',
    brief.platform === 'general' ? 'SocialMedia' : brief.platform,
  ];
  const fromKeyword = brief.primaryKeyword
    .split(/\s+/)
    .filter((w) => w.length > 3)
    .slice(0, 2)
    .map((w) => w.replace(/[^a-z0-9]/gi, ''))
    .filter(Boolean)
    .map((w) => w[0]!.toUpperCase() + w.slice(1));
  const tags = [...base, ...fromKeyword].map((t) =>
    t.startsWith('#') ? t : `#${t}`,
  );
  return [...new Set(tags)].slice(0, 6);
}

function withUtm(url: string, platform: SocialPlatform): string {
  const u = new URL(url);
  u.searchParams.set('utm_source', platform === 'x' ? 'twitter' : platform);
  u.searchParams.set('utm_medium', 'social');
  u.searchParams.set('utm_campaign', 'learn_article');
  u.searchParams.set('utm_content', url.split('/').pop() ?? 'article');
  return u.toString();
}

function buildVariant(
  platform: SocialPlatform,
  kind: SocialPostVariant['kind'],
  text: string,
  destinationUrl: string,
  hashtags: string[],
): SocialPostVariant {
  const limit = CHAR_LIMITS[platform];
  let body = text.trim();
  if (platform === 'x' && body.length > limit - 20) {
    body = `${body.slice(0, limit - 24).trim()}…`;
  }
  return {
    platform,
    kind,
    text: body,
    characterCount: body.length,
    characterLimit: limit,
    hashtags: platform === 'instagram' ? hashtags : hashtags.slice(0, 3),
    destinationUrl: withUtm(destinationUrl, platform),
  };
}

export function generateSocialPosts(brief: ArticleBrief): SocialPostVariant[] {
  const destinationUrl = `${SEO_PRODUCTION_DOMAIN}${learnArticlePath(brief.slug)}`;
  const hashtags = generateHashtags(brief);
  const teaser = `${brief.workingTitle}: ${brief.shortAnswer.split('.')[0]}.`;
  const standard = `${brief.workingTitle}\n\n${brief.shortAnswer}\n\nRead the guide:`;
  const long = `${brief.workingTitle}\n\n${brief.shortAnswer}\n\nKey takeaways:\n${brief.keyTakeaways
    .slice(0, 3)
    .map((t) => `• ${t}`)
    .join('\n')}\n\nFull article:`;
  const cta = brief.ctaStrategy.allowServiceCta
    ? `${brief.workingTitle} — practical steps without hype. ${brief.ctaStrategy.closingCtaLabel}.`
    : `${brief.workingTitle} — practical NovaLikes Learn guidance. Browse the full article.`;

  const platforms: SocialPlatform[] = ['facebook', 'instagram', 'x', 'linkedin'];
  const variants: SocialPostVariant[] = [];
  for (const platform of platforms) {
    variants.push(
      buildVariant(platform, 'teaser', teaser, destinationUrl, hashtags),
      buildVariant(platform, 'standard', standard, destinationUrl, hashtags),
      buildVariant(platform, 'long', long, destinationUrl, hashtags),
      buildVariant(platform, 'cta', cta, destinationUrl, hashtags),
    );
  }
  return variants;
}

export function buildCampaignAssets(brief: ArticleBrief): SocialCampaignAssets {
  const destinationUrl = `${SEO_PRODUCTION_DOMAIN}${learnArticlePath(brief.slug)}`;
  return {
    slug: brief.slug,
    destinationUrl,
    variants: generateSocialPosts(brief),
    hashtags: generateHashtags(brief),
  };
}

export function renderSocialPostsMarkdown(assets: SocialCampaignAssets): string {
  const lines = [
    `# Social Posts — ${assets.slug}`,
    '',
    `Destination: ${assets.destinationUrl}`,
    `Hashtags: ${assets.hashtags.join(' ')}`,
    '',
  ];
  for (const variant of assets.variants) {
    lines.push(
      `## ${variant.platform} · ${variant.kind}`,
      '',
      variant.text,
      '',
      `_Characters: ${variant.characterCount}/${variant.characterLimit}_`,
      `_URL: ${variant.destinationUrl}_`,
      '',
    );
  }
  return `${lines.join('\n')}\n`;
}

export function validateSocialAssets(
  assets: SocialCampaignAssets,
): AssetValidationIssue[] {
  const issues: AssetValidationIssue[] = [];
  const seen = new Set<string>();

  if (!assets.destinationUrl.startsWith('https://')) {
    issues.push({
      severity: 'blocker',
      code: 'invalid_destination_url',
      field: 'destinationUrl',
      message: 'Destination URL must be HTTPS.',
    });
  }

  if (assets.hashtags.length > 8) {
    issues.push({
      severity: 'warning',
      code: 'excessive_hashtags',
      field: 'hashtags',
      message: 'Too many hashtags — keep the set focused.',
    });
  }

  for (const variant of assets.variants) {
    if (variant.kind === 'cta' && !variant.text.trim()) {
      issues.push({
        severity: 'error',
        code: 'missing_cta',
        field: `${variant.platform}.cta`,
        message: 'CTA variant is empty.',
      });
    }
    if (variant.characterCount > variant.characterLimit) {
      issues.push({
        severity: 'error',
        code: 'character_limit',
        field: `${variant.platform}.${variant.kind}`,
        message: `Exceeds ${variant.platform} limit (${variant.characterCount}/${variant.characterLimit}).`,
      });
    }
    if (hasUnsupportedClaimOrClickbait(variant.text)) {
      issues.push({
        severity: 'blocker',
        code: 'unsupported_claim_or_clickbait',
        field: `${variant.platform}.${variant.kind}`,
        message: 'Copy contains clickbait or unsupported claim language.',
      });
    }
    if (!variant.destinationUrl.includes('utm_source=')) {
      issues.push({
        severity: 'warning',
        code: 'missing_utm',
        field: `${variant.platform}.${variant.kind}`,
        message: 'Destination URL should include UTM parameters.',
      });
    }
    const key = `${variant.platform}:${variant.text}`;
    if (seen.has(key)) {
      issues.push({
        severity: 'warning',
        code: 'duplicate_copy',
        field: `${variant.platform}.${variant.kind}`,
        message: 'Duplicate post copy detected.',
      });
    }
    seen.add(key);
  }

  return issues;
}
