import { PlatformCard } from '@/components/marketing/platform-selector/platform-card';
import type { PlatformSelectorGridProps } from '@/components/marketing/platform-selector/types';
import { StaggerChildren, StaggerItem } from '@/components/motion/stagger';
import { cn } from '@/lib/utils';

/**
 * Responsive platform grid:
 * Mobile 1 · Tablet 2 · Desktop 4 (Document 08.02).
 */
export function PlatformSelectorGrid({ cards, className }: PlatformSelectorGridProps) {
  return (
    <StaggerChildren
      className={cn('grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-7 lg:grid-cols-4', className)}
      role="list"
    >
      {cards.map((card) => (
        <StaggerItem key={card.platformId} role="listitem" className="h-full">
          <PlatformCard {...card} />
        </StaggerItem>
      ))}
    </StaggerChildren>
  );
}
