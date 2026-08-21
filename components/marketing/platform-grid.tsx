import Link from 'next/link';

import { FeatureCard } from '@/components/cards/feature-card';
import { Container } from '@/components/layout/container';
import { Grid } from '@/components/layout/grid';
import { Section } from '@/components/layout/section';
import { Heading } from '@/components/typography/heading';
import { MutedText } from '@/components/typography/muted-text';
import { cn } from '@/lib/utils';
import { prefetchForHref } from '@/lib/linking/prefetch';
import type { Platform } from '@/types/platform';

export type PlatformGridProps = {
  title?: string;
  description?: string;
  platforms: Platform[];
  /** Optional href resolver — defaults to first service later via data layer in pages. */
  getHref?: (platform: Platform) => string;
  className?: string;
};

/** Platform cards grid — data-driven from platforms registry. */
export function PlatformGrid({
  title,
  description,
  platforms,
  getHref,
  className,
}: PlatformGridProps) {
  return (
    <Section className={cn(className)} aria-label="Platforms">
      <Container>
        {(title || description) && (
          <div className="mb-8 max-w-2xl space-y-2">
            {title ? (
              <Heading as="h2" size="h2">
                {title}
              </Heading>
            ) : null}
            {description ? <MutedText>{description}</MutedText> : null}
          </div>
        )}
        <Grid cols={4} className="gap-4">
          {platforms.map((platform) => {
            const href = getHref?.(platform);
            const card = (
              <FeatureCard
                title={platform.name}
                description={platform.description}
                className="h-full"
              />
            );
            return href ? (
              <Link key={platform.id} href={href} prefetch={prefetchForHref(href)} className="block h-full rounded-lg focus-visible:outline-none">
                {card}
              </Link>
            ) : (
              <div key={platform.id}>{card}</div>
            );
          })}
        </Grid>
      </Container>
    </Section>
  );
}
