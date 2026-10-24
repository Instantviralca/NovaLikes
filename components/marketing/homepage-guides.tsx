import Link from 'next/link';

import { Container } from '@/components/layout/container';
import { ILLUSTRATED_CARD } from '@/components/layout/illustrated-surface';
import { Section } from '@/components/layout/section';
import { FadeUp } from '@/components/motion/fade-up';
import { Heading } from '@/components/typography/heading';
import { MutedText } from '@/components/typography/muted-text';
import { Text } from '@/components/typography/text';
import { Button } from '@/components/ui/button';
import type { HomepageTikTokGuides } from '@/data/content/homepage-hub';
import { prefetchForHref } from '@/lib/linking/prefetch';
import { cn } from '@/lib/utils';

/** Root English homepage — Free TikTok Guides (after TikTok service group). */
export function HomepageGuides({
  guides,
  description,
}: {
  guides: HomepageTikTokGuides;
  /** Root homepage only — overrides `guides.description` when set. */
  description?: string;
}) {
  const body = description ?? guides.description;
  return (
    <Section
      id={guides.id}
      spacing="none"
      className="bg-transparent py-8 md:py-11 lg:py-12"
      aria-labelledby={`${guides.id}-heading`}
    >
      <Container size="xl">
        <FadeUp className="mx-auto max-w-2xl space-y-3 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--brand-primary)]">
            {guides.eyebrow}
          </p>
          <Heading as="h2" id={`${guides.id}-heading`}>
            {guides.title}
          </Heading>
          <MutedText>{body}</MutedText>
        </FadeUp>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {guides.items.map((item, index) => (
            <FadeUp key={item.href} delay={0.04 * index} className="h-full">
              <Link
                href={item.href}
                prefetch={prefetchForHref(item.href)}
                className={cn(
                  ILLUSTRATED_CARD,
                  'flex h-full flex-col gap-2 p-5 transition hover:ring-black/[0.08]',
                )}
              >
                <Heading as="h3" className="text-lg">
                  {item.title}
                </Heading>
                <Text className="text-sm text-[var(--text-secondary)]">{item.description}</Text>
              </Link>
            </FadeUp>
          ))}
        </div>

        <FadeUp className="mt-8 flex justify-center">
          <Button asChild className="rounded-xl font-semibold">
            <Link href={guides.cta.href} prefetch={prefetchForHref(guides.cta.href)}>
              {guides.cta.label}
            </Link>
          </Button>
        </FadeUp>
      </Container>
    </Section>
  );
}
