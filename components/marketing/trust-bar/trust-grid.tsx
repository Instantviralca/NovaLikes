import { TrustCard } from '@/components/marketing/trust-bar/trust-card';
import type { TrustGridProps } from '@/components/marketing/trust-bar/types';
import { StaggerChildren, StaggerItem } from '@/components/motion/stagger';
import { cn } from '@/lib/utils';

/**
 * Responsive trust grid:
 * Mobile 1 · Tablet 2 · Desktop 4 (Document 08.03).
 */
export function TrustGrid({ items, className }: TrustGridProps) {
  return (
    <StaggerChildren
      className={cn('grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4', className)}
      role="list"
    >
      {items.map((item) => (
        <StaggerItem key={item.id} role="listitem" className="h-full">
          <TrustCard {...item} />
        </StaggerItem>
      ))}
    </StaggerChildren>
  );
}
