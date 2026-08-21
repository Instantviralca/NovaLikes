import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';

import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { FadeUp } from '@/components/motion/fade-up';
import { Eyebrow } from '@/components/typography/eyebrow';
import { Heading } from '@/components/typography/heading';
import { MutedText } from '@/components/typography/muted-text';
import { Text } from '@/components/typography/text';
import { Button } from '@/components/ui/button';
import { homepageHub, type HomepageHub, type HubServiceMini } from '@/data/content/homepage-hub';
import { ENGLISH_UI, type UiDictionary } from '@/lib/i18n/content/ui-english';
import { HomepageHero } from '@/components/marketing/homepage-hero';
import { HomepagePlatformSelector } from '@/components/marketing/homepage-platform-selector';
import { HomepageServicesOverview } from '@/components/marketing/homepage-services-overview';
import { HomepageLowerSections } from '@/components/marketing/homepage-story-sections';
import { HomepageFinalCta } from '@/components/marketing/homepage-final-cta';
import { ILLUSTRATED_CARD } from '@/components/layout/illustrated-surface';
import { prefetchForHref } from '@/lib/linking/prefetch';
import { cn } from '@/lib/utils';

function ServicesOverview({ hub }: { hub: HomepageHub }) {
  return <HomepageServicesOverview hub={hub} />;
}

function ServiceMiniSection({
  service,
  index,
}: {
  service: HubServiceMini;
  index: number;
}) {
  const reverse = index % 2 === 1;
  return (
    <Section
      id={`${service.slug}-mini`}
      spacing="md"
      className="bg-transparent"
      aria-labelledby={`${service.id}-heading`}
    >
      <Container size="xl">
        <div
          className={cn(
            'grid items-center gap-8 lg:grid-cols-2 lg:gap-12',
            reverse && 'lg:[&>*:first-child]:order-2',
          )}
        >
          <FadeUp>
            <div className="space-y-4">
              <Eyebrow className="text-[var(--brand-primary)]">{service.commercialLabel}</Eyebrow>
              <Heading as="h3" id={`${service.id}-heading`}>
                {service.title}
              </Heading>
              <Text className="text-[var(--text-secondary)]">{service.intro}</Text>
              <ul className="space-y-3">
                {service.points.map((point) => (
                  <li key={point.title} className="flex gap-2 text-sm text-[var(--text-primary)]">
                    <CheckCircle2
                      className="mt-0.5 size-4 shrink-0 text-[var(--brand-primary)]"
                      aria-hidden
                    />
                    <span>
                      <span className="block font-semibold">{point.title}</span>
                      <span className="mt-0.5 block text-[var(--text-secondary)]">{point.text}</span>
                    </span>
                  </li>
                ))}
              </ul>
              <Button asChild className="rounded-xl font-semibold">
                <Link href={service.cta.href} prefetch={prefetchForHref(service.cta.href)}>
                  {service.cta.label}
                </Link>
              </Button>
            </div>
          </FadeUp>
          <FadeUp delay={0.08}>
            <figure className={cn(ILLUSTRATED_CARD, 'relative aspect-[4/3] overflow-hidden')}>
              <Image
                src={service.image.src}
                alt={service.image.alt}
                fill
                className="object-cover object-center scale-[1.14]"
                sizes="(max-width: 1024px) 100vw, 560px"
                loading="lazy"
              />
            </figure>
          </FadeUp>
        </div>
      </Container>
    </Section>
  );
}

function PlatformServiceGroups({ hub }: { hub: HomepageHub }) {
  const platforms = ['instagram', 'tiktok', 'facebook'] as const;
  let runningIndex = 0;

  return (
    <>
      {platforms.map((platform) => {
        const group = hub.platformGroupTitles[platform];
        const services = hub.services.filter((s) => s.platform === platform);
        return (
          <div key={platform}>
            <Section
              id={group.id}
              spacing="sm"
              className="bg-transparent"
              aria-labelledby={`${group.id}-heading`}
            >
              <Container size="xl">
                <FadeUp className="max-w-2xl space-y-2 py-2">
                  <Heading as="h2" id={`${group.id}-heading`}>
                    {group.title}
                  </Heading>
                  <MutedText>{group.description}</MutedText>
                </FadeUp>
              </Container>
            </Section>
            {services.map((service) => {
              const section = (
                <ServiceMiniSection
                  key={service.id}
                  service={service}
                  index={runningIndex}
                />
              );
              runningIndex += 1;
              return section;
            })}
          </div>
        );
      })}
    </>
  );
}

/** Full multi-platform homepage hub composition (Phase 1A). */
export function HomepageHubSections({
  hub = homepageHub,
  labels = ENGLISH_UI.homepage as UiDictionary['homepage'],
}: {
  hub?: HomepageHub;
  labels?: UiDictionary['homepage'];
}) {
  return (
    <>
      <HomepageHero hub={hub} />
      <HomepagePlatformSelector hub={hub} />
      <ServicesOverview hub={hub} />
      <PlatformServiceGroups hub={hub} />
      <HomepageLowerSections hub={hub} labels={labels} />
      <HomepageFinalCta hub={hub} />
    </>
  );
}
