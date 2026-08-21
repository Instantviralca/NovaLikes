import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/cards/card';
import { TrustIcon } from '@/components/marketing/trust-bar/trust-icon';
import type { TrustCardProps } from '@/components/marketing/trust-bar/types';
import { HoverLift } from '@/components/motion/hover-lift';
import { cn } from '@/lib/utils';

/** Compact trust signal card — title + description required (not icon-only). */
export function TrustCard({ title, description, iconKey, className }: TrustCardProps) {
  return (
    <HoverLift className="h-full">
      <Card
        className={cn(
          'h-full border-border/60 bg-muted/30 shadow-none transition-shadow hover:shadow-sm',
          className,
        )}
      >
        <CardHeader className="space-y-3 p-5">
          <TrustIcon iconKey={iconKey} />
          <div className="space-y-1.5">
            <CardTitle className="text-base font-semibold leading-snug">{title}</CardTitle>
            <CardDescription className="text-sm leading-relaxed line-clamp-2">
              {description}
            </CardDescription>
          </div>
        </CardHeader>
      </Card>
    </HoverLift>
  );
}
