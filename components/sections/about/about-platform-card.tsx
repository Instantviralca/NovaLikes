'use client';

import Link from 'next/link';

import { Card, CardDescription, CardHeader, CardTitle } from '@/components/cards/card';
import { PlatformIcon } from '@/components/marketing/platform-selector/platform-icon';
import { HoverLift } from '@/components/motion/hover-lift';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { PlatformId } from '@/types/platform';

type AboutPlatformCardProps = {
  platformId: PlatformId;
  name: string;
  iconKey: string;
  description: string;
  href: string;
  ctaLabel: string;
  className?: string;
};

/** Platform card for the About page — icon, service summary, and CTA. */
export function AboutPlatformCard({
  platformId,
  name,
  iconKey,
  description,
  href,
  ctaLabel,
  className,
}: AboutPlatformCardProps) {
  return (
    <HoverLift className="h-full">
      <Card
        className={cn(
          'group flex h-full flex-col border-border bg-card transition-[border-color,box-shadow] duration-200 hover:border-[color-mix(in_srgb,var(--brand-primary)_35%,var(--border-subtle))] hover:shadow-[0_18px_40px_-28px_rgba(28,25,23,0.35)]',
          className,
        )}
      >
        <CardHeader className="flex flex-1 flex-col space-y-3.5 p-5 sm:p-6">
          <PlatformIcon
            platformId={platformId}
            iconKey={iconKey}
            className="size-12 rounded-xl transition-transform duration-200 group-hover:scale-105 [&_svg]:size-6"
          />
          <div className="space-y-2">
            <CardTitle className="text-lg">{name}</CardTitle>
            <CardDescription className="flex-1 text-[0.9375rem] leading-relaxed">
              {description}
            </CardDescription>
          </div>
          <Button
            asChild
            variant="outline"
            size="sm"
            className="mt-auto min-h-11 w-full transition-colors duration-200"
          >
            <Link href={href}>{ctaLabel}</Link>
          </Button>
        </CardHeader>
      </Card>
    </HoverLift>
  );
}
