/**
 * Newsletter Generator — Document 16.06.
 */

import { SEO_PRODUCTION_DOMAIN } from '@/config/seo';
import { learnArticlePath } from '@/config/routes';
import type { ArticleBrief } from '@/types/content-plan';
import type {
  AssetValidationIssue,
  NewsletterAssets,
} from '@/types/content-assets';

const MAX_PREVIEW = 90;
const MAX_INTRO = 280;
const MAX_SUMMARY = 480;
const MAX_SUBJECT = 70;

export function generateSubjectLines(brief: ArticleBrief): string[] {
  const platformLabel =
    brief.platform === 'general'
      ? 'social media'
      : brief.platform.charAt(0).toUpperCase() + brief.platform.slice(1);

  const options = [
    brief.workingTitle.slice(0, MAX_SUBJECT),
    `${platformLabel} tip: ${brief.primaryKeyword}`.slice(0, MAX_SUBJECT),
    `Practical guide: ${brief.workingTitle}`.slice(0, MAX_SUBJECT),
    `New Learn guide — ${brief.primaryKeyword}`.slice(0, MAX_SUBJECT),
  ];

  return [...new Set(options.map((s) => s.trim()).filter(Boolean))];
}

export function generatePreviewText(brief: ArticleBrief): string {
  const base = brief.shortAnswer.trim();
  if (base.length <= MAX_PREVIEW) return base;
  return `${base.slice(0, MAX_PREVIEW - 1).trim()}…`;
}

function withNewsletterUtm(url: string): string {
  const u = new URL(url);
  u.searchParams.set('utm_source', 'newsletter');
  u.searchParams.set('utm_medium', 'email');
  u.searchParams.set('utm_campaign', 'learn_article');
  u.searchParams.set('utm_content', url.split('/').pop() ?? 'article');
  return u.toString();
}

export function generateNewsletter(brief: ArticleBrief): NewsletterAssets {
  const destinationUrl = withNewsletterUtm(
    `${SEO_PRODUCTION_DOMAIN}${learnArticlePath(brief.slug)}`,
  );
  const intro = `This week on NovaLikes Learn: ${brief.workingTitle}. ${brief.shortAnswer}`
    .trim()
    .slice(0, MAX_INTRO);
  const mainSummary =
    brief.shortAnswer.length > MAX_SUMMARY
      ? `${brief.shortAnswer.slice(0, MAX_SUMMARY - 1).trim()}…`
      : brief.shortAnswer;
  const primaryLabel = brief.ctaStrategy.closingCtaLabel.trim() || 'Read the full guide';
  const secondaryCta =
    brief.ctaStrategy.allowServiceCta && brief.ctaStrategy.prominentServiceSlug
      ? {
          label: `Explore ${brief.ctaStrategy.prominentServiceSlug.replace(/-/g, ' ')}`,
          url: `${SEO_PRODUCTION_DOMAIN}/${brief.ctaStrategy.prominentServiceSlug}`,
        }
      : null;

  return {
    slug: brief.slug,
    subjectLines: generateSubjectLines(brief),
    previewText: generatePreviewText(brief),
    intro,
    mainSummary,
    keyTakeaways: brief.keyTakeaways.slice(0, 5),
    primaryCta: {
      label: primaryLabel,
      url: destinationUrl,
    },
    secondaryCta,
    destinationUrl,
  };
}

export function renderNewsletterMarkdown(assets: NewsletterAssets): string {
  const subjects = assets.subjectLines
    .map((s, i) => `${i + 1}. ${s}`)
    .join('\n');
  const takeaways = assets.keyTakeaways.map((t) => `- ${t}`).join('\n');
  const secondary = assets.secondaryCta
    ? `\n## Secondary CTA\n\n${assets.secondaryCta.label}\n${assets.secondaryCta.url}\n`
    : '';

  return [
    `# Email Newsletter — ${assets.slug}`,
    '',
    '## Subject line options (A/B)',
    '',
    subjects,
    '',
    '## Preview text',
    '',
    assets.previewText,
    '',
    '## Intro',
    '',
    assets.intro,
    '',
    '## Main summary',
    '',
    assets.mainSummary,
    '',
    '## Key takeaways',
    '',
    takeaways || '- (Add takeaways during production)',
    '',
    '## Primary CTA',
    '',
    assets.primaryCta.label,
    assets.primaryCta.url,
    secondary,
    `Destination: ${assets.destinationUrl}`,
    '',
  ].join('\n');
}

export function validateNewsletter(
  assets: NewsletterAssets,
): AssetValidationIssue[] {
  const issues: AssetValidationIssue[] = [];

  if (!assets.subjectLines.length || assets.subjectLines.every((s) => !s.trim())) {
    issues.push({
      severity: 'blocker',
      code: 'missing_subject',
      field: 'subjectLines',
      message: 'At least one subject line is required.',
    });
  }

  const seen = new Set<string>();
  for (const subject of assets.subjectLines) {
    const key = subject.trim().toLowerCase();
    if (seen.has(key)) {
      issues.push({
        severity: 'error',
        code: 'duplicate_subject',
        field: 'subjectLines',
        message: `Duplicate subject option: "${subject}".`,
      });
    }
    seen.add(key);
    if (subject.length > MAX_SUBJECT) {
      issues.push({
        severity: 'warning',
        code: 'excessive_length',
        field: 'subjectLines',
        message: `Subject exceeds ${MAX_SUBJECT} characters.`,
      });
    }
  }

  if (!assets.previewText.trim()) {
    issues.push({
      severity: 'error',
      code: 'missing_preview',
      field: 'previewText',
      message: 'Preview text is required.',
    });
  }

  if (!assets.primaryCta.label.trim() || !assets.primaryCta.url.trim()) {
    issues.push({
      severity: 'blocker',
      code: 'missing_cta',
      field: 'primaryCta',
      message: 'Primary CTA label and URL are required.',
    });
  }

  if (
    !assets.destinationUrl.startsWith('https://') ||
    !assets.primaryCta.url.startsWith('https://')
  ) {
    issues.push({
      severity: 'blocker',
      code: 'invalid_destination_url',
      field: 'destinationUrl',
      message: 'Newsletter destination URLs must be HTTPS.',
    });
  }

  if (assets.intro.length > MAX_INTRO + 40 || assets.mainSummary.length > MAX_SUMMARY + 40) {
    issues.push({
      severity: 'warning',
      code: 'excessive_length',
      field: 'body',
      message: 'Intro or summary is longer than email-friendly limits.',
    });
  }

  return issues;
}
