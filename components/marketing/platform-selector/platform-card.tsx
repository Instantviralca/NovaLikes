import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/cards/card';
import { PlatformCTA } from '@/components/marketing/platform-selector/platform-cta';
import { PlatformIcon } from '@/components/marketing/platform-selector/platform-icon';
import { PlatformServicesPreview } from '@/components/marketing/platform-selector/platform-services-preview';
import type { PlatformCardProps } from '@/components/marketing/platform-selector/types';
import { HoverLift } from '@/components/motion/hover-lift';
import { cn } from '@/lib/utils';

/**
 * Equal-weight platform card — all strings via props.
 * Compact vertical rhythm; flex keeps all four cards the same height.
 */
export function PlatformCard({
  platformId,
  name,
  description,
  iconKey,
  href,
  ctaLabel,
  previewServices,
  className,
}: PlatformCardProps) {
  return (
    <HoverLift className="h-full">
      <Card
        className={cn(
          'group flex h-full flex-col bg-white transition-[box-shadow,transform] duration-200 hover:-translate-y-0.5',
          className,
        )}
      >
        <CardHeader className="space-y-3.5 p-6 pb-3">
          <PlatformIcon
            platformId={platformId}
            iconKey={iconKey}
            className="size-12 rounded-xl transition-transform duration-200 group-hover:scale-105 [&_svg]:size-6"
          />
          <div className="space-y-2">
            <CardTitle className="text-lg">{name}</CardTitle>
            <CardDescription className="text-[0.9375rem] leading-snug">
              {description}
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="flex flex-1 flex-col gap-5 px-6 pb-6 pt-1">
          <PlatformServicesPreview items={previewServices} />
          <div className="mt-auto pt-1">
            <PlatformCTA label={ctaLabel} href={href} />
          </div>
        </CardContent>
      </Card>
    </HoverLift>
  );
}
