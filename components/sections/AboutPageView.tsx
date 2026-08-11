import {
  AboutCtaButtons,
  AboutPageViewTracker,
} from '@/components/sections/about/about-cta';
import { AboutCtaIllustration } from '@/components/sections/about/about-cta-illustration';
import { AboutHeroIllustration } from '@/components/sections/about/about-hero-illustration';
import { AboutPlatformCard } from '@/components/sections/about/about-platform-card';
import { AboutTrustStats } from '@/components/sections/about/about-trust-stats';
import { FeatureCard } from '@/components/cards/feature-card';
import { Container } from '@/components/layout/container';
import { Grid } from '@/components/layout/grid';
import { Section } from '@/components/layout/section';
import { Stack } from '@/components/layout/stack';
import { HowItWorks } from '@/components/marketing/how-it-works';
import { Breadcrumb } from '@/components/navigation/breadcrumb';
import { Heading } from '@/components/typography/heading';
import { Lead } from '@/components/typography/lead';
import { MutedText } from '@/components/typography/muted-text';
import { Text } from '@/components/typography/text';
import { routes, platformHubPath } from '@/config/routes';
import { getAboutContent } from '@/data/content/company';
import { getPlatformById } from '@/data/platforms';
import type { AboutPageContent } from '@/types/content';
import type { PlatformId } from '@/types/platform';

const ABOUT_PLATFORM_COPY: Record<
  PlatformId,
  { description: string }
> = {
  instagram: { description: 'Followers, Likes, Views and Comments.' },
  tiktok: { description: 'Followers, Likes and Views.' },
  youtube: { description: 'Subscribers and Views.' },
  facebook: { description: 'Followers, Page Likes and Post Likes.' },
};

type AboutPageViewProps = {
  content?: AboutPageContent;
};

/**
 * About Us production composition (Document 13.01).
 *
 * Hero → Our Story → Trusted Ordering Experience → Mission & Values → Why Choose → Platforms →
 * Process → Trust & Security → Final CTA
 */
export function AboutPageView({ content = getAboutContent() }: AboutPageViewProps) {
  const breadcrumbs = [
    { label: 'Home', href: routes.home },
    { label: 'About' },
  ];

  const platforms = content.platforms.platformIds
    .map((id) => getPlatformById(id))
    .filter((platform): platform is NonNullable<typeof platform> => Boolean(platform));

  return (
    <>
      <AboutPageViewTracker />

      {/* 1. Hero */}
      <Section spacing="lg" className="bg-hero-wash" aria-label="About NovaLikes">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12 xl:gap-16">
            <Stack
              gap="lg"
              className="text-center sm:items-center lg:items-start lg:text-left"
            >
              <Breadcrumb
                items={breadcrumbs}
                className="justify-center lg:justify-start"
                variant="subtle"
              />
              <Heading as="h1" size="h1">
                {content.hero.title}
              </Heading>
              <Lead className="text-pretty text-[var(--text-secondary)]">
                {content.hero.description}
              </Lead>
              {(content.hero.primaryCta || content.hero.secondaryCta) && (
                <AboutCtaButtons
                  primaryCta={content.hero.primaryCta!}
                  secondaryCta={content.hero.secondaryCta}
                  location="hero"
                  align="responsive"
                />
              )}
            </Stack>
            <div className="flex justify-center lg:justify-end">
              <AboutHeroIllustration />
            </div>
          </div>
        </Container>
      </Section>

      {/* 2. Our Story */}
      <Section id={content.story.id} spacing="lg" className="bg-muted/20" aria-labelledby="about-story-heading">
        <Container>
          <div className="mx-auto max-w-3xl space-y-4">
            <Heading as="h2" size="h2" id="about-story-heading">
              {content.story.title}
            </Heading>
            {content.story.description ? (
              <MutedText>{content.story.description}</MutedText>
            ) : null}
            <Text className="whitespace-pre-line text-muted-foreground">{content.story.body}</Text>
          </div>
        </Container>
      </Section>

      {/* 2b. Trusted Ordering Experience */}
      <Section
        id="trusted-ordering-experience"
        spacing="lg"
        aria-labelledby="about-trust-stats-heading"
      >
        <Container>
          <div className="mb-8 max-w-3xl space-y-2">
            <Heading as="h2" size="h2" id="about-trust-stats-heading">
              Trusted Ordering Experience
            </Heading>
          </div>
          <AboutTrustStats />
        </Container>
      </Section>

      {/* 3. Mission & Values */}
      <Section
        id={content.mission.id}
        spacing="lg"
        aria-labelledby="about-mission-heading"
      >
        <Container>
          <div className="mb-8 max-w-3xl space-y-2">
            <Heading as="h2" size="h2" id="about-mission-heading">
              {content.mission.title}
            </Heading>
            {content.mission.description ? (
              <MutedText>{content.mission.description}</MutedText>
            ) : null}
          </div>
          <Grid cols={3} className="gap-4">
            {content.mission.items.map((item) => (
              <FeatureCard key={item.id} title={item.title} description={item.description} />
            ))}
          </Grid>
        </Container>
      </Section>

      {/* 4. Why Customers Choose NovaLikes */}
      <Section
        id={content.whyChoose.id}
        spacing="lg"
        className="bg-muted/20"
        aria-labelledby="about-why-heading"
      >
        <Container>
          <div className="mb-8 max-w-3xl space-y-2">
            <Heading as="h2" size="h2" id="about-why-heading">
              {content.whyChoose.title}
            </Heading>
            {content.whyChoose.description ? (
              <MutedText>{content.whyChoose.description}</MutedText>
            ) : null}
          </div>
          <Grid cols={3} className="gap-4">
            {content.whyChoose.items.map((item) => (
              <FeatureCard key={item.id} title={item.title} description={item.description} />
            ))}
          </Grid>
        </Container>
      </Section>

      {/* 5. Platforms We Support */}
      <Section
        id={content.platforms.id}
        spacing="lg"
        aria-labelledby="about-platforms-heading"
      >
        <Container>
          <div className="mb-8 max-w-3xl space-y-2">
            <Heading as="h2" size="h2" id="about-platforms-heading">
              {content.platforms.title}
            </Heading>
            {content.platforms.description ? (
              <MutedText>{content.platforms.description}</MutedText>
            ) : null}
          </div>
          <Grid cols={4} className="gap-4">
            {platforms.map((platform) => {
              const copy = ABOUT_PLATFORM_COPY[platform.id];
              return (
                <AboutPlatformCard
                  key={platform.id}
                  platformId={platform.id}
                  name={platform.name}
                  iconKey={platform.icon}
                  description={copy.description}
                  href={platformHubPath(platform.slug)}
                  ctaLabel={`View ${platform.name} services`}
                />
              );
            })}
          </Grid>
        </Container>
      </Section>

      {/* 6. Our Process */}
      <HowItWorks
        id={content.process.id}
        title={content.process.title}
        description={content.process.description}
        steps={content.process.steps}
      />

      {/* 7. Trust & Security */}
      <Section
        id={content.trust.id}
        spacing="lg"
        aria-labelledby="about-trust-heading"
      >
        <Container>
          <div className="mb-8 max-w-3xl space-y-2">
            <Heading as="h2" size="h2" id="about-trust-heading">
              {content.trust.title}
            </Heading>
            {content.trust.description ? (
              <MutedText>{content.trust.description}</MutedText>
            ) : null}
          </div>
          <Grid cols={2} className="gap-4">
            {content.trust.items.map((item) => (
              <FeatureCard key={item.id} title={item.title} description={item.description} />
            ))}
          </Grid>
          <MutedText className="mt-8 max-w-3xl text-sm">{content.trust.disclaimer}</MutedText>
        </Container>
      </Section>

      {/* 8. Final CTA */}
      <Section
        id={content.finalCta.id}
        spacing="lg"
        className="bg-brand/5"
        aria-labelledby="about-final-cta-heading"
      >
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_auto] lg:gap-12">
            <Stack
              gap="lg"
              className="mx-auto max-w-2xl items-center text-center lg:mx-0 lg:items-start lg:text-left"
            >
              <Heading as="h2" size="h2" id="about-final-cta-heading">
                {content.finalCta.title}
              </Heading>
              <MutedText>{content.finalCta.description}</MutedText>
              <AboutCtaButtons
                primaryCta={content.finalCta.primaryCta}
                secondaryCta={content.finalCta.secondaryCta}
                location="final"
                align="responsive"
              />
            </Stack>
            <div className="mx-auto flex justify-center lg:mx-0 lg:justify-end">
              <AboutCtaIllustration />
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
