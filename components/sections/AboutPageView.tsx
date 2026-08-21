import Image from 'next/image';
import {
  Award,
  CheckCircle2,
  Globe,
  Headphones,
  Heart,
  Lock,
  Rocket,
  Shield,
  ShieldCheck,
  Users,
} from 'lucide-react';

import {
  AboutFinalBannerCta,
  AboutPageViewTracker,
} from '@/components/sections/about/about-cta';
import { AboutHeroIllustration } from '@/components/sections/about/about-hero-illustration';
import { AboutTrustStats } from '@/components/sections/about/about-trust-stats';
import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { Stack } from '@/components/layout/stack';
import { Breadcrumb } from '@/components/navigation/breadcrumb';
import { Heading } from '@/components/typography/heading';
import { accentLastWord, HERO_HEADING_CLASS } from '@/components/typography/accent-title';
import { Text } from '@/components/typography/text';
import { routes } from '@/config/routes';
import { getAboutContent } from '@/data/content/company';
import { getEnglishAboutSource } from '@/lib/i18n/content/company-english';
import type { AboutPageOverlay } from '@/lib/i18n/content/company-english';
import { cn } from '@/lib/utils';
import type { AboutPageContent } from '@/types/content';

const WHY_ICONS = [Shield, Rocket, Users, Headphones, Award] as const;
const WHY_ICON_COLORS = [
  'bg-[#E8F1FF] text-[#2563EB]',
  'bg-[#F3E8FF] text-[#7C3AED]',
  'bg-[#E8F8EF] text-[#16A34A]',
  'bg-[#FFF1E6] text-[var(--brand-primary)]',
  'bg-[#FFE8F1] text-[#DB2777]',
] as const;

const COMMITMENT_ICONS = [Lock, ShieldCheck, Award, Globe] as const;

type AboutPageViewProps = {
  content?: AboutPageContent;
  chrome?: AboutPageOverlay['chrome'];
  homeLabel?: string;
  homeHref?: string;
};

/**
 * About Us page — visual layout matched to the About mockup.
 */
export function AboutPageView({
  content = getAboutContent(),
  chrome = getEnglishAboutSource().chrome,
  homeLabel = 'Home',
  homeHref = routes.home,
}: AboutPageViewProps) {
  const breadcrumbs = [
    { label: homeLabel, href: homeHref },
    { label: chrome.breadcrumb },
  ];

  const heroParagraphs = content.hero.description
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean);

  const missionParagraphs = (content.mission.description ?? '')
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <>
      <AboutPageViewTracker />

      {/* 1. Hero */}
      <Section spacing="lg" className="bg-transparent" aria-label={chrome.heroAria}>
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12 xl:gap-16">
            <Stack gap="md" className="text-center sm:items-center lg:items-start lg:text-left">
              <Breadcrumb
                items={breadcrumbs}
                className="justify-center lg:justify-start"
                variant="subtle"
              />
              {content.hero.eyebrow ? (
                <p className="text-xs font-semibold tracking-[0.14em] text-[var(--brand-primary)] uppercase">
                  {content.hero.eyebrow}
                </p>
              ) : null}
              <Heading as="h1" size="h1" className={HERO_HEADING_CLASS}>
                {accentLastWord(content.hero.title)}
              </Heading>
              <div className="space-y-3">
                {heroParagraphs.map((paragraph) => (
                  <Text
                    key={paragraph.slice(0, 24)}
                    className="text-pretty text-[var(--text-secondary)]"
                  >
                    {paragraph}
                  </Text>
                ))}
              </div>
              {content.hero.trustLabels?.length ? (
                <ul className="mt-2 space-y-3 text-left">
                  {content.hero.trustLabels.map((item) => (
                    <li key={item.id} className="flex items-start gap-2.5">
                      <CheckCircle2
                        className="mt-0.5 size-5 shrink-0 text-[var(--brand-primary)]"
                        strokeWidth={2.25}
                        aria-hidden={true}
                      />
                      <span className="text-[0.95rem] leading-snug text-[var(--text-primary)]">
                        {item.label}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : null}
            </Stack>
            <div className="flex justify-center lg:justify-end">
              <AboutHeroIllustration
                src={content.hero.visual?.src}
                alt={content.hero.visual?.alt}
              />
            </div>
          </div>
        </Container>
      </Section>

      {/* 2. Stats bar */}
      <AboutTrustStats
        ariaLabel={chrome.statsAria}
        labels={{
          customers: chrome.statsCustomers,
          orders: chrome.statsOrders,
          rating: chrome.statsRating,
          success: chrome.statsSuccess,
        }}
      />

      {/* 3. Our Mission */}
      <Section
        id={content.mission.id}
        spacing="lg"
        className="bg-transparent"
        aria-labelledby="about-mission-heading"
      >
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
            <div className="relative mx-auto w-full max-w-[22rem] lg:mx-0 lg:max-w-[26rem]">
              <div
                className="pointer-events-none absolute top-1/2 left-1/2 size-[78%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FFF1E6]"
                aria-hidden={true}
              />
              <Image
                src="/assets/images/illustrations/about/about-mission.webp"
                alt={chrome.missionImageAlt}
                width={1024}
                height={1024}
                className="relative z-10 h-auto w-full object-contain"
                sizes="(max-width: 1024px) 80vw, 26rem"
              />
            </div>
            <Stack gap="md" className="text-center lg:text-left">
              <p className="text-xs font-semibold tracking-[0.14em] text-[var(--brand-primary)] uppercase">
                {chrome.missionEyebrow}
              </p>
              <Heading as="h2" size="h2" id="about-mission-heading">
                {content.mission.title}
              </Heading>
              <div className="space-y-3">
                {missionParagraphs.map((paragraph) => (
                  <Text
                    key={paragraph.slice(0, 24)}
                    className="text-pretty text-[var(--text-secondary)]"
                  >
                    {paragraph}
                  </Text>
                ))}
              </div>
            </Stack>
          </div>
        </Container>
      </Section>

      {/* 4. Why Thousands Choose Us */}
      <Section
        id={content.whyChoose.id}
        spacing="lg"
        className="bg-transparent"
        aria-labelledby="about-why-heading"
      >
        <Container>
          <div className="mx-auto mb-10 max-w-3xl space-y-2 text-center">
            {content.whyChoose.description ? (
              <p className="text-xs font-semibold tracking-[0.14em] text-[var(--brand-primary)] uppercase">
                {content.whyChoose.description}
              </p>
            ) : null}
            <Heading as="h2" size="h2" id="about-why-heading">
              {accentLastWord(content.whyChoose.title)}
            </Heading>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {content.whyChoose.items.map((item, index) => {
              const Icon = WHY_ICONS[index % WHY_ICONS.length];
              const color = WHY_ICON_COLORS[index % WHY_ICON_COLORS.length];
              return (
                <div
                  key={item.id}
                  className="flex h-full flex-col items-center rounded-2xl border border-[var(--border-subtle)] bg-white px-4 py-6 text-center shadow-[0_10px_30px_-24px_rgba(28,25,23,0.35)]"
                >
                  <span
                    className={cn(
                      'mb-4 flex size-12 items-center justify-center rounded-2xl',
                      color,
                    )}
                  >
                    <Icon className="size-5" strokeWidth={2.25} aria-hidden />
                  </span>
                  <h3 className="mb-2 text-base font-bold text-[var(--text-primary)]">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* 5. Our Commitment */}
      <Section
        id={content.trust.id}
        spacing="lg"
        className="bg-transparent"
        aria-labelledby="about-commitment-heading"
      >
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
            <Stack gap="md" className="text-center lg:order-1 lg:text-left">
              <p className="text-xs font-semibold tracking-[0.14em] text-[var(--brand-primary)] uppercase">
                {chrome.commitmentEyebrow}
              </p>
              <Heading as="h2" size="h2" id="about-commitment-heading">
                {content.trust.title}
              </Heading>
              {content.trust.description ? (
                <Text className="text-pretty text-[var(--text-secondary)]">
                  {content.trust.description}
                </Text>
              ) : null}
              <div className="mt-2 grid grid-cols-2 gap-4 sm:gap-5">
                {content.trust.items.map((item, index) => {
                  const Icon = COMMITMENT_ICONS[index % COMMITMENT_ICONS.length];
                  return (
                    <div
                      key={item.id}
                      className="flex flex-col items-center gap-2 text-center sm:items-start sm:text-left"
                    >
                      <span className="flex size-10 items-center justify-center rounded-xl border border-[var(--border-subtle)] bg-white text-[var(--text-secondary)]">
                        <Icon className="size-4" strokeWidth={2} aria-hidden />
                      </span>
                      <p className="text-sm font-semibold text-[var(--text-primary)]">
                        {item.title}
                      </p>
                    </div>
                  );
                })}
              </div>
            </Stack>
            <div className="relative mx-auto w-full max-w-[22rem] lg:order-2 lg:mx-0 lg:max-w-[26rem]">
              <div
                className="pointer-events-none absolute top-1/2 left-1/2 size-[78%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#EEF4FF]"
                aria-hidden={true}
              />
              <Image
                src="/assets/images/illustrations/about/about-commitment.webp"
                alt={chrome.commitmentImageAlt}
                width={1024}
                height={1024}
                className="relative z-10 h-auto w-full object-contain"
                sizes="(max-width: 1024px) 80vw, 26rem"
              />
            </div>
          </div>
        </Container>
      </Section>

      {/* 6. Final CTA banner */}
      <Section
        id={content.finalCta.id}
        spacing="lg"
        className="bg-transparent"
        aria-labelledby="about-final-cta-heading"
      >
        <Container>
          <div className="flex flex-col items-center gap-5 rounded-[1.75rem] bg-[var(--brand-primary)] px-6 py-7 text-center sm:flex-row sm:gap-6 sm:px-8 sm:py-8 sm:text-left lg:gap-8">
            <span className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-white/15 text-white">
              <Heart className="size-7 fill-white" aria-hidden />
            </span>
            <div className="min-w-0 flex-1">
              <Heading
                as="h2"
                size="h3"
                id="about-final-cta-heading"
                className="!text-white"
              >
                {content.finalCta.title}{' '}
                <span className="font-normal text-white/95">
                  {content.finalCta.description}
                </span>
              </Heading>
            </div>
            <AboutFinalBannerCta
              href={content.finalCta.primaryCta.href}
              label={content.finalCta.primaryCta.label}
            />
          </div>
        </Container>
      </Section>
    </>
  );
}
