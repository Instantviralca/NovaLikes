import { PlatformSelectorGrid } from '@/components/marketing/platform-selector/platform-grid';
import type { PlatformSelectorSectionProps } from '@/components/marketing/platform-selector/types';
import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { Stack } from '@/components/layout/stack';
import { Heading } from '@/components/typography/heading';
import { Lead } from '@/components/typography/lead';
import { FadeUp } from '@/components/motion/fade-up';
import { mapPlatformSelectorContent } from '@/lib/content/platform-selector';
import { cn } from '@/lib/utils';

/**
 * Homepage Platform Selector (Document 08.02).
 * Content from homepage.ts + platforms.ts + services.ts — no hardcoded copy.
 * Not composing the full homepage route.
 */
export function PlatformSelectorSection({ className, id }: PlatformSelectorSectionProps) {
  const vm = mapPlatformSelectorContent();
  const sectionId = id ?? vm.id;

  const cards = vm.cards.map((card) => ({
    platformId: card.platform.id,
    name: card.platform.name,
    description: card.description,
    iconKey: card.platform.icon,
    href: card.href,
    ctaLabel: card.ctaLabel,
    previewServices: card.previewServices,
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
          <FadeUp className="max-w-[680px] space-y-3 text-left">
            <Heading as="h2" size="h2" id={`${sectionId}-heading`}>
              {vm.title}
            </Heading>
            {vm.description ? <Lead>{vm.description}</Lead> : null}
          </FadeUp>

          <PlatformSelectorGrid cards={cards} />
        </Stack>
      </Container>
    </Section>
  );
}
