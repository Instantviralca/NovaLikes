import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';

import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { FadeUp } from '@/components/motion/fade-up';
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
import { HomepageCrossPlatform } from '@/components/marketing/homepage-cross-platform';
import { HomepageMarketStorySections } from '@/components/marketing/homepage-market-story-sections';
import { HomepageFinalCta } from '@/components/marketing/homepage-final-cta';
import { ILLUSTRATED_CARD } from '@/components/layout/illustrated-surface';
import { prefetchForHref } from '@/lib/linking/prefetch';
import { isCanadaHomepageDesign } from '@/lib/market/homepage-design';
import { cn } from '@/lib/utils';

function ServicesOverview({
  hub,
  instagramOnly,
}: {
  hub: HomepageHub;
  instagramOnly?: boolean;
}) {
  return <HomepageServicesOverview hub={hub} instagramOnly={instagramOnly} market={hub.market} />;
}

function ServiceMiniSection({
  service,
  index,
  enhanced,
}: {
  service: HubServiceMini;
  index: number;
  enhanced?: boolean;
}) {
  const reverse = index % 2 === 1;
  const tinted =
    enhanced &&
    (service.slug === 'buy-instagram-likes' || service.slug === 'buy-instagram-comments');

  return (
    <Section
      id={`${service.slug}-mini`}
      spacing="none"
      className={cn(
        tinted ? 'bg-[#FFF8F3]' : 'bg-transparent',
        enhanced ? 'py-10 md:py-12 lg:py-14' : 'py-8 md:py-11 lg:py-12',
      )}
      aria-labelledby={`${service.id}-heading`}
    >
      <Container size="xl">
        <div
          className={cn(
            'grid items-center gap-8 lg:grid-cols-2',
            enhanced ? 'lg:gap-10' : 'lg:gap-12',
            reverse && 'lg:[&>*:first-child]:order-2',
          )}
        >
          <FadeUp>
            <div className="space-y-4">
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
                className="object-cover object-center"
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

function PlatformServiceGroups({
  hub,
  instagramOnly = false,
  enhanced = false,
}: {
  hub: HomepageHub;
  instagramOnly?: boolean;
  enhanced?: boolean;
}) {
  const platforms: Array<'instagram' | 'tiktok' | 'facebook'> = instagramOnly
    ? ['instagram']
    : ['instagram', 'tiktok', 'facebook'];
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
              spacing="none"
              className={cn('bg-transparent', enhanced ? 'py-6 md:py-8' : 'py-6 md:py-8')}
              aria-labelledby={`${group.id}-heading`}
            >
              <Container size="xl">
                <FadeUp
                  className={cn(
                    'space-y-3 py-2',
                    enhanced ? 'w-full text-center' : 'max-w-2xl',
                  )}
                >
                  <Heading
                    as="h2"
                    id={`${group.id}-heading`}
                    className={
                      enhanced
                        ? 'text-[1.85rem] font-bold leading-[1.15] tracking-tight sm:text-[2.25rem]'
                        : undefined
                    }
                  >
                    {group.title}
                  </Heading>
                  <MutedText className={enhanced ? 'w-full' : undefined}>
                    {group.description}
                  </MutedText>
                </FadeUp>
              </Container>
            </Section>
            {services.map((service) => {
              const section = (
                <ServiceMiniSection
                  key={service.id}
                  service={service}
                  index={runningIndex}
                  enhanced={enhanced}
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
  const instagramOnly = hub.instagramOnly === true;
  const enhanced = isCanadaHomepageDesign(hub.market);

  return (
    <>
      <HomepageHero hub={hub} enhanced={enhanced} />
      <HomepagePlatformSelector hub={hub} instagramOnly={instagramOnly} enhanced={enhanced} />
      <ServicesOverview hub={hub} instagramOnly={instagramOnly} />
      <PlatformServiceGroups hub={hub} instagramOnly={instagramOnly} enhanced={enhanced} />
      <HomepageMarketStorySections hub={hub} />
      <HomepageLowerSections hub={hub} labels={labels} enhanced={enhanced} />
      <HomepageCrossPlatform hub={hub} enhanced={enhanced} />
      <HomepageFinalCta hub={hub} enhanced={enhanced} />
    </>
  );
}
