/**
 * Repair Canada service content overlays broken by partial cleanup.
 * Ensures array lengths and required strings satisfy overlay merge rules.
 *
 * Run: npx tsx scripts/repair-ca-overlays.ts
 */
import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';

import { getEnglishServiceBundle } from '../lib/i18n/content/english-source';
import type { CoreServiceSlug } from '../lib/i18n/config';
import { CORE_SERVICE_SLUGS } from '../lib/i18n/config';
import { overlayEnglishWithIssues } from '../lib/i18n/overlay';

const servicesDir = path.join(process.cwd(), 'content/markets/ca/services');

function cloneSteps(
  source: Array<{ id?: string; title?: string; description?: string }>,
  count: number,
  prefix: string,
) {
  const steps = source.slice(0, count);
  while (steps.length < count) {
    const index = steps.length + 1;
    steps.push({
      id: `${prefix}-${index}`,
      title: `Step ${index}`,
      description: 'Review your order details before checkout.',
    });
  }
  return steps.map((step, index) => ({
    id: step.id ?? `${prefix}-${index + 1}`,
    title: step.title ?? `Step ${index + 1}`,
    description: step.description ?? 'Review your order details before checkout.',
  }));
}

function cloneItems(
  source: Array<{ id?: string; title?: string; description?: string }>,
  englishItems: Array<{ id: string; title: string; description: string }>,
) {
  return englishItems.map((englishItem, index) => {
    const fromSource = source[index];
    return {
      id: englishItem.id,
      title: fromSource?.title?.trim() || englishItem.title,
      description: fromSource?.description?.trim() || englishItem.description,
    };
  });
}

for (const slug of CORE_SERVICE_SLUGS) {
  const filePath = path.join(servicesDir, `${slug}.json`);
  const data = JSON.parse(readFileSync(filePath, 'utf8')) as Record<string, unknown>;
  const content = data.content as Record<string, unknown>;
  const dummy = data.dummy as Record<string, unknown> | undefined;
  const english = getEnglishServiceBundle(slug).content;

  const howToSource =
    dummy && typeof dummy.howToBuy === 'object' && dummy.howToBuy !== null
      ? (dummy.howToBuy as {
          id?: string;
          title?: string;
          description?: string;
          steps?: Array<{ id?: string; title?: string; description?: string }>;
        })
      : null;

  const howItWorks = content.howItWorks as Record<string, unknown>;
  if (howToSource?.title && howToSource.description) {
    howItWorks.title = howToSource.title;
    howItWorks.description = howToSource.description;
    howItWorks.steps = cloneSteps(
      howToSource.steps ?? [],
      english.howItWorks.steps.length,
      `${slug}-step`,
    );
  } else if (Array.isArray(howItWorks.steps)) {
    howItWorks.steps = cloneSteps(
      howItWorks.steps as Array<{ id?: string; title?: string; description?: string }>,
      english.howItWorks.steps.length,
      `${slug}-step`,
    );
  }

  const whyBuySource =
    dummy && typeof dummy.whyBuy === 'object' && dummy.whyBuy !== null
      ? (dummy.whyBuy as { title?: string; description?: string })
      : null;

  const benefits = content.benefits as Record<string, unknown>;
  if (whyBuySource?.title && whyBuySource.description) {
    benefits.title = whyBuySource.title;
    benefits.description = whyBuySource.description;
  }
  benefits.items = cloneItems(
    (benefits.items as Array<{ id?: string; title?: string; description?: string }>) ?? [],
    english.benefits.items,
  );

  const whyNovaLikes = content.whyNovaLikes as Record<string, unknown>;
  if (typeof whyNovaLikes.description !== 'string' || !whyNovaLikes.description.trim()) {
    whyNovaLikes.description =
      'NovaLikes provides clear package details, secure checkout and order tracking.';
  }
  whyNovaLikes.items = cloneItems(
    (whyNovaLikes.items as Array<{ id?: string; title?: string; description?: string }>) ?? [],
    english.whyNovaLikes.items,
  );

  const deliveryAndSafety = content.deliveryAndSafety as Record<string, unknown>;
  if (typeof deliveryAndSafety.description !== 'string' || !deliveryAndSafety.description.trim()) {
    deliveryAndSafety.description =
      'Provide only the public profile or content details requested during checkout.';
  }
  deliveryAndSafety.items = cloneItems(
    (deliveryAndSafety.items as Array<{ id?: string; title?: string; description?: string }>) ??
      [],
    english.deliveryAndSafety.items,
  );

  const reviews = content.reviews as Record<string, unknown>;
  if (typeof reviews.description !== 'string' || !reviews.description.trim()) {
    reviews.description = 'Reviews are not displayed on this Canada service page.';
  }

  const features = content.features as Record<string, unknown>;
  if (typeof features.description !== 'string') {
    features.description = 'Features are covered in the service sections above.';
  }
  features.items = cloneItems(
    (features.items as Array<{ id?: string; title?: string; description?: string }>) ?? [],
    english.features.items,
  );

  const { issues } = overlayEnglishWithIssues(english, content, slug);
  if (issues.length > 0) {
    console.error(`Still broken: ${slug} (${issues.length} issues)`);
    console.error(issues.slice(0, 5).map((i) => `${i.path}: ${i.message}`).join('; '));
    process.exitCode = 1;
    continue;
  }

  writeFileSync(filePath, `${JSON.stringify(data, null, 2)}\n`, 'utf8');
  console.log(`Repaired ${slug}`);
}

console.log('Overlay repair complete.');
