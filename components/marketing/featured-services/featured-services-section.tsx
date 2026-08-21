import { ServicesGrid } from '@/components/marketing/featured-services/services-grid';
import type { FeaturedServicesSectionProps } from '@/components/marketing/featured-services/types';
import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { Stack } from '@/components/layout/stack';
import { FadeUp } from '@/components/motion/fade-up';
import { Heading } from '@/components/typography/heading';
import { Lead } from '@/components/typography/lead';
import { mapFeaturedServicesContent } from '@/lib/content/featured-services';
import { cn } from '@/lib/utils';

/**
 * Featured Services section (Document 08.04).
 * Service identity from registry; copy overlays from homepage content.
 */
export function FeaturedServicesSection({ className, id }: FeaturedServicesSectionProps) {
  const vm = mapFeaturedServicesContent();
  const sectionId = id ?? vm.id;

  const cards = vm.cards.map((card) => ({
    platformId: card.platform.id,
    platformName: card.platform.name,
    platformHref: card.platformHref,
    title: card.service.name,
    description: card.description,
    benefit: card.benefit,
    href: card.href,
    ctaLabel: card.ctaLabel,
    badge: card.badge,
  }));

  return (
    <Section
      id={sectionId}
      spacing="lg"
      className={cn('bg-transparent', className)}
      aria-labelledby={`${sectionId}-heading`}
    >
      <Container size="xl">
        <Stack gap="lg">
          <FadeUp className="max-w-2xl space-y-3">
            <Heading as="h2" size="h2" id={`${sectionId}-heading`}>
              {vm.title}
            </Heading>
            {vm.description ? <Lead>{vm.description}</Lead> : null}
          </FadeUp>
          <ServicesGrid cards={cards} />
        </Stack>
      </Container>
    </Section>
  );
}
