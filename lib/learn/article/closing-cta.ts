import { isApprovedServiceSlug } from '@/data/linking/approved-services';
import { getServiceBySlug } from '@/data/services';
import type { ArticleContentBlock } from '@/types/learn-article-blocks';
import type { PlatformId } from '@/types/platform';

type ClosingCtaSource = {
  relatedServices: string[];
  blocks: ArticleContentBlock[];
};

const PLATFORM_LABEL: Record<Exclude<PlatformId, 'youtube'>, string> = {
  instagram: 'Instagram',
  tiktok: 'TikTok',
  facebook: 'Facebook',
};

export type LearnArticleClosingCta = {
  heading: string;
  text: string;
  href: string;
  label: string;
};

function activePlatformServices(article: ClosingCtaSource) {
  return article.relatedServices
    .filter(isApprovedServiceSlug)
    .map((slug) => getServiceBySlug(slug))
    .filter((service): service is NonNullable<typeof service> =>
      Boolean(service && service.platform !== 'youtube' && !service.comingSoon),
    );
}

function toolInternalCta(
  article: ClosingCtaSource,
): LearnArticleClosingCta | null {
  const block = article.blocks.find(
    (
      item,
    ): item is Extract<ArticleContentBlock, { type: 'internal_cta' }> =>
      item.type === 'internal_cta' && item.href.startsWith('/tools/'),
  );
  if (!block) return null;
  return {
    heading: block.heading ?? block.label,
    text: block.description ?? '',
    href: block.href,
    label: block.label,
  };
}

export function getLearnArticleClosingCta(
  article: ClosingCtaSource,
): LearnArticleClosingCta | null {
  const services = activePlatformServices(article);
  if (services.length === 0) return toolInternalCta(article);

  const platform = services[0]!.platform;
  if (platform === 'youtube') return null;
  if (!services.every((service) => service.platform === platform)) return null;

  const label = PLATFORM_LABEL[platform];
  const metrics = services.map((service) => service.shortName.toLowerCase());
  const metricList =
    metrics.length === 1
      ? metrics[0]!
      : `${metrics.slice(0, -1).join(', ')} and ${metrics[metrics.length - 1]}`;

  return {
    heading: `Explore ${label} Services`,
    text: `Compare the available NovaLikes options for ${label} ${metricList}.`,
    href: services[0]!.url,
    label: `Explore ${label} Services`,
  };
}
