import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/cards/card';
import { PlatformBadge } from '@/components/marketing/featured-services/platform-badge';
import { ServiceCTA } from '@/components/marketing/featured-services/service-cta';
import type { FeaturedServiceCardProps } from '@/components/marketing/featured-services/types';
import { HoverLift } from '@/components/motion/hover-lift';
import { MutedText } from '@/components/typography/muted-text';
import { cn } from '@/lib/utils';

/** Featured service card — registry + content props only. */
export function ServiceCard({
  platformId,
  platformName,
  platformHref,
  title,
  description,
  benefit,
  href,
  ctaLabel,
  badge,
  className,
}: FeaturedServiceCardProps) {
  return (
    <HoverLift className="h-full">
      <Card
        className={cn(
          'group relative flex h-full flex-col overflow-hidden transition-[border-color,box-shadow] duration-200 hover:border-[color-mix(in_srgb,var(--brand-primary)_30%,var(--border-subtle))] hover:shadow-[0_18px_40px_-28px_rgba(28,25,23,0.32)]',
          className,
        )}
      >
        {badge ? (
          <span className="absolute top-4 right-4 z-[1] rounded-full bg-[var(--brand-accent-soft)] px-2.5 py-1 text-[10px] font-bold tracking-wide text-[var(--brand-primary)] uppercase">
            {badge}
          </span>
        ) : null}
        <CardHeader className={cn('space-y-3.5 p-6 pb-3', badge && 'pr-24')}>
          <PlatformBadge
            platformId={platformId}
            label={platformName}
            href={platformHref}
          />
          <div className="space-y-2">
            <CardTitle className="text-lg leading-snug transition-colors group-hover:text-[var(--brand-primary)]">
              {title}
            </CardTitle>
            <CardDescription className="text-[0.9375rem] leading-snug">
              {description}
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="flex-1 px-6 pb-2">
          {benefit ? (
            <MutedText className="text-sm font-medium text-foreground/80">{benefit}</MutedText>
          ) : null}
        </CardContent>
        <CardFooter className="px-6 pb-6 pt-3">
          <ServiceCTA
            label={ctaLabel}
            href={href}
            ariaLabel={`${ctaLabel}: ${title}`}
          />
        </CardFooter>
      </Card>
    </HoverLift>
  );
}
