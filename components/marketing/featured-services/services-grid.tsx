import { ServiceCard } from '@/components/marketing/featured-services/service-card';
import type { FeaturedServicesGridProps } from '@/components/marketing/featured-services/types';
import { StaggerChildren, StaggerItem } from '@/components/motion/stagger';
import { cn } from '@/lib/utils';

/**
 * Featured services grid (Document 08.11):
 * Mobile 1 · Tablet 2 · Desktop 4
 * First card per platform gets an in-page anchor for platform-selector CTAs.
 */
export function ServicesGrid({ cards, className }: FeaturedServicesGridProps) {
  const seenPlatforms = new Set<string>();

  return (
    <StaggerChildren
      className={cn(
        'grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-7 lg:grid-cols-4',
        className,
      )}
      role="list"
    >
      {cards.map((card) => {
        const isFirstForPlatform = !seenPlatforms.has(card.platformId);
        if (isFirstForPlatform) seenPlatforms.add(card.platformId);

        return (
          <StaggerItem
            key={card.href}
            role="listitem"
            className="h-full scroll-mt-24"
            id={isFirstForPlatform ? `featured-services-${card.platformId}` : undefined}
          >
            <ServiceCard {...card} />
          </StaggerItem>
        );
      })}
    </StaggerChildren>
  );
}
