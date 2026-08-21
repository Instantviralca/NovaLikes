import { getHomepageContent } from '@/data/content/homepage';
import { isApprovedServiceSlug } from '@/data/linking/approved-services';
import { getPlatformById } from '@/data/platforms';
import { getServiceBySlug } from '@/data/services';
import { platformHubPath } from '@/config/routes';
import type { HomepageContent } from '@/types/content';
import type { Platform } from '@/types/platform';
import type { Service } from '@/types/service';

export type FeaturedServiceCardModel = {
  service: Service;
  platform: Platform;
  description: string;
  benefit: string;
  href: string;
  ctaLabel: string;
  platformHref: string;
  badge?: string;
};

export type FeaturedServicesViewModel = {
  id: string;
  title: string;
  description?: string;
  cards: FeaturedServiceCardModel[];
};

/** Featured Services view model (Document 08.05). */
export function mapFeaturedServicesContent(
  content: HomepageContent = getHomepageContent(),
): FeaturedServicesViewModel {
  const section = content.servicesGrid;
  const ctaLabel = section.ctaLabel;

  const cards = section.serviceSlugs
    .map((slug) => {
      const service = getServiceBySlug(slug);
      if (!service || !isApprovedServiceSlug(slug) || service.comingSoon) return null;
      const platform = getPlatformById(service.platform);
      if (!platform) return null;

      const card: FeaturedServiceCardModel = {
        service,
        platform,
        description: section.descriptions?.[slug] ?? service.description,
        benefit: section.benefits?.[slug] ?? '',
        href: service.url,
        ctaLabel,
        platformHref: platformHubPath(platform.slug),
      };
      const badge = section.badges?.[slug];
      if (badge) card.badge = badge;
      return card;
    })
    .filter((card): card is FeaturedServiceCardModel => Boolean(card));

  return {
    id: section.id,
    title: section.title,
    description: section.description,
    cards,
  };
}
