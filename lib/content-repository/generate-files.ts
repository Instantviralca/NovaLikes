/**
 * Generate article package file contents from a brief — Document 16.01.
 * Does not invent full article bodies.
 */

import type { ArticleBrief } from '@/types/content-plan';
import type { ArticlePackageFileName } from '@/types/content-design-system';
import {
  CONTENT_ARTICLE_STRUCTURE,
  CONTENT_CALLOUT_TYPES,
  CONTENT_DESIGN_CTA_RULES,
  CONTENT_DESIGN_FAQ_RULES,
  CONTENT_DESIGN_IMAGE_RULES,
  CONTENT_TONE_RULES,
} from '@/types/content-design-system';

export type PackageFileContents = Record<ArticlePackageFileName, string>;

function yamlList(items: string[], indent = '  - '): string {
  if (items.length === 0) return `${indent}(none yet)\n`;
  return items.map((item) => `${indent}${item}`).join('\n') + '\n';
}

export function generatePackageFiles(brief: ArticleBrief): PackageFileContents {
  const h2Outline = brief.proposedH2s.map((h) => `## ${h}`).join('\n\n');
  const h3Outline = brief.proposedH3s.map((h) => `### ${h}`).join('\n\n');

  const seo = {
    slug: brief.slug,
    title: brief.workingTitle,
    metaTitle: `${brief.workingTitle} | Learn | NovaLikes`,
    metaDescription: brief.shortAnswer.slice(0, 155),
    canonicalPath: `/learn/${brief.slug}`,
    primaryKeyword: brief.primaryKeyword,
    secondaryKeywords: brief.secondaryKeywords,
    category: brief.category,
    platform: brief.platform,
    ogImage: null as string | null,
    status: 'draft_package',
    notes: 'Populate final metadata during editorial production. Do not publish until QA passes.',
  };

  const faq = {
    slug: brief.slug,
    schemaEligibleDefault: false,
    items: brief.faqOpportunities.map((question, index) => ({
      id: `faq-${index + 1}`,
      question,
      answer: '',
      schemaEligible: false,
      notes: 'Write answer to match visible article content before enabling schema.',
    })),
    rules: CONTENT_DESIGN_FAQ_RULES,
  };

  const jsonLd = {
    slug: brief.slug,
    generated: false,
    types: ['Article', 'BreadcrumbList', 'FAQPage'],
    notes:
      'JSON-LD is produced by the Article SEO engine at publish time. Do not hand-author unsafe script tags here.',
    placeholders: {
      headline: brief.workingTitle,
      datePublished: null,
      dateModified: null,
      authorId: brief.authorId || null,
    },
  };

  const readme = `# ${brief.workingTitle}

- **Slug:** \`${brief.slug}\`
- **Platform:** ${brief.platform}
- **Category:** ${brief.category}
- **Cluster:** ${brief.topicCluster}
- **Priority:** ${brief.priority}
- **Plan status:** ${brief.status}
- **Package status:** scaffolded (body not written)

## Design system
Follow Document 16.00 Content Design System before publication.

## Package files
${ARTICLE_PACKAGE_FILE_LIST}

## Do not
- Publish empty MDX
- Invent authors or statistics
- Target skipped services
`;

  return {
    '00_README.md': readme,
    '01_Research.md': `# Research — ${brief.workingTitle}

## Core question
${brief.coreQuestion}

## Short answer (planning)
${brief.shortAnswer}

## Required sources (from plan)
${yamlList(brief.requiredSources)}

## Notes
Record primary research findings here. Do not invent statistics.
`,
    '02_Article_Brief.md': `# Article Brief — ${brief.workingTitle}

| Field | Value |
|---|---|
| ID | ${brief.id} |
| Slug | ${brief.slug} |
| Platform | ${brief.platform} |
| Category | ${brief.category} |
| Topic cluster | ${brief.topicCluster} |
| Primary keyword | ${brief.primaryKeyword} |
| Search intent | ${brief.searchIntent} |
| Priority | ${brief.priority} |
| Batch | ${brief.batch} |
| Planned publication | ${brief.plannedPublicationDate} |
| Author | ${brief.authorId || '_unassigned — assign real Author System id_'} |

## Audience
${brief.targetAudience}

## Secondary keywords
${yamlList(brief.secondaryKeywords)}

## Proposed H2s
${yamlList(brief.proposedH2s)}

## Proposed H3s
${yamlList(brief.proposedH3s)}

## Key takeaways
${yamlList(brief.keyTakeaways)}

## CTA strategy
- Allow service CTA: ${brief.ctaStrategy.allowServiceCta}
- Prominent service: ${brief.ctaStrategy.prominentServiceSlug ?? '(none)'}
- Closing label: ${brief.ctaStrategy.closingCtaLabel}
- Notes: ${brief.ctaStrategy.notes}
`,
    '03_Article.mdx': `---
slug: ${brief.slug}
title: "${brief.workingTitle.replace(/"/g, '\\"')}"
status: scaffold
---

# ${brief.workingTitle}

> Quick Answer (draft from plan — rewrite during production)
>
> ${brief.shortAnswer}

{/* Body pending editorial production. Do not publish this package until MDX is complete and QA passes. */}

${h2Outline}

${h3Outline}
`,
    '04_SEO.json': `${JSON.stringify(seo, null, 2)}\n`,
    '05_FAQ.json': `${JSON.stringify(faq, null, 2)}\n`,
    '06_JSON-LD.json': `${JSON.stringify(jsonLd, null, 2)}\n`,
    '07_Image_Brief.md': `# Image Brief — ${brief.workingTitle}

## Featured image
- Required: yes
- Preferred size: ${CONTENT_DESIGN_IMAGE_RULES.preferredWidth}×${CONTENT_DESIGN_IMAGE_RULES.preferredHeight}
- Alt text: required
- Format: WebP/AVIF preferred
- Notes: ${brief.imageRequirements.notes}

## Supporting visuals
${yamlList(brief.imageRequirements.supportingIllustrations ?? ['Optional diagram if it improves understanding'])}

## Rights
Verify ownership before publishing. No unauthorized hotlinking.
`,
    '08_Internal_Links.md': `# Internal Links — ${brief.workingTitle}

## Category
- ${brief.internalLinkPlan.categoryPath}

## Related articles (plan)
${yamlList(brief.internalLinkPlan.relatedArticleSlugs)}

## Related services (approved only)
${yamlList(brief.internalLinkPlan.relatedServiceSlugs)}

## FAQ / legal
${yamlList(brief.internalLinkPlan.faqOrLegalPaths)}

## Rules
- Target ${CONTENT_DESIGN_CTA_RULES.maxBodyCtas} body CTA max when service CTA is appropriate
- Never force unrelated service links
`,
    '09_External_Sources.md': `# External Sources — ${brief.workingTitle}

Prefer official platform docs, then primary research, then reputable publications.

## Planned sources
${yamlList(brief.requiredSources)}

## Additional sources
- (add during research)
`,
    '10_Social_Posts.md': `# Social Posts — ${brief.workingTitle}

Draft channel posts after the article is written. Do not invent engagement metrics.

## Instagram
- Hook:
- Body:
- CTA:

## TikTok / short video
- Hook:
- Script notes:

## LinkedIn / X (optional)
- Post:
`,
    '11_Email_Newsletter.md': `# Email Newsletter Blurb — ${brief.workingTitle}

Subject:
Preview:
Body:
CTA:
`,
    '12_Content_Checklist.md': `# Content Checklist — ${brief.workingTitle}

## Design system (16.00)
${CONTENT_TONE_RULES.map((r) => `- [ ] Tone: ${r}`).join('\n')}
${CONTENT_ARTICLE_STRUCTURE.map((s) => `- [ ] Structure: ${s.label}`).join('\n')}
${CONTENT_CALLOUT_TYPES.map((c) => `- [ ] Callout available: ${c.label}`).join('\n')}
- [ ] One H1 only; logical H2/H3 hierarchy
- [ ] FAQ count within ${CONTENT_DESIGN_FAQ_RULES.minQuestions}–${CONTENT_DESIGN_FAQ_RULES.maxQuestions} when complete
- [ ] Featured image ${CONTENT_DESIGN_IMAGE_RULES.preferredWidth}×${CONTENT_DESIGN_IMAGE_RULES.preferredHeight} with alt text
- [ ] Max ${CONTENT_DESIGN_CTA_RULES.maxBodyCtas} body CTA + ${CONTENT_DESIGN_CTA_RULES.maxFinalCtas} final CTA
- [ ] Editorial QA passed
- [ ] Author assigned (real Author System record)
`,
    '13_Editor_Notes.md': `# Editor Notes — ${brief.workingTitle}

## Open questions
- Author assignment pending real Author System record

## Risks
- Do not add unsupported guarantees or fake statistics

## Decisions
- (record editorial decisions here)
`,
    '14_Changelog.md': `# Changelog — ${brief.workingTitle}

| Date | Change | Author |
|---|---|---|
| ${new Date().toISOString().slice(0, 10)} | Package scaffolded from content plan | system |
`,
  };
}

const ARTICLE_PACKAGE_FILE_LIST = [
  '00_README.md',
  '01_Research.md',
  '02_Article_Brief.md',
  '03_Article.mdx',
  '04_SEO.json',
  '05_FAQ.json',
  '06_JSON-LD.json',
  '07_Image_Brief.md',
  '08_Internal_Links.md',
  '09_External_Sources.md',
  '10_Social_Posts.md',
  '11_Email_Newsletter.md',
  '12_Content_Checklist.md',
  '13_Editor_Notes.md',
  '14_Changelog.md',
]
  .map((f) => `- ${f}`)
  .join('\n');
