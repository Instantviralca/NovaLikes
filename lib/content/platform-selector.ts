import { platformHubPath } from '@/config/routes';
import { getHomepageContent } from '@/data/content/homepage';
import { isApprovedServiceSlug } from '@/data/linking/approved-services';
import { getPlatformById } from '@/data/platforms';
import { getPlatformServices, getServiceBySlug } from '@/data/services';
import type { HomepageContent, PlatformSelectorCardContent } from '@/types/content';
import type { Platform, PlatformId } from '@/types/platform';
import type { Service } from '@/types/service';

export type PlatformSelectorPreviewItem = {
  id: string;
  label: string;
  href: string;
};

export type PlatformSelectorCardModel = {
  platform: Platform;
  description: string;
  ctaLabel: string;
  href: string;
  previewServices: PlatformSelectorPreviewItem[];
};

export type PlatformSelectorViewModel = {
  id: string;
  title: string;
  description?: string;
  cards: PlatformSelectorCardModel[];
};

function resolvePreviewServices(
  card: PlatformSelectorCardContent,
  platformId: PlatformId,
): PlatformSelectorPreviewItem[] {
  const limit = card.previewLimit ?? 4;

  if (card.previewServiceSlugs?.length) {
    return card.previewServiceSlugs
      .map((slug) => getServiceBySlug(slug))
      .filter((service): service is Service => Boolean(service))
      .filter((service) => isApprovedServiceSlug(service.slug) && !service.comingSoon)
      .slice(0, limit)
      .map((service) => ({
        id: service.id,
        label: service.shortName,
        href: service.url,
      }));
  }

  return getPlatformServices(platformId)
    .filter((service) => isApprovedServiceSlug(service.slug) && !service.comingSoon)
    .slice(0, limit)
    .map((service) => ({
      id: service.id,
      label: service.shortName,
      href: service.url,
    }));
}

/** Build Platform Selector view model from homepage content + registries. */
export function mapPlatformSelectorContent(
  content: HomepageContent = getHomepageContent(),
): PlatformSelectorViewModel {
  const section = content.platformGrid;
  const cardById = new Map(
    section.cards.map((card) => [card.platformId, card] as const),
  );

  const cards: PlatformSelectorCardModel[] = section.platformIds
    .map((platformId) => {
      const platform = getPlatformById(platformId);
      const card = cardById.get(platformId);
      if (!platform || !card) return null;

      return {
        platform,
        description: card.description,
        ctaLabel: card.ctaLabel,
        href: card.href ?? platformHubPath(platform.slug),
        previewServices: resolvePreviewServices(card, platformId),
      };
    })
    .filter((card): card is PlatformSelectorCardModel => Boolean(card));

  return {
    id: section.id,
    title: section.title,
    description: section.description,
    cards,
  };
}
