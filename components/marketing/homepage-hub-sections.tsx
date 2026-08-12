import Image from 'next/image';
import Link from 'next/link';
import {
  CheckCircle2,
  ClipboardList,
  Lock,
  ShieldCheck,
  type LucideIcon,
} from 'lucide-react';

import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { Stack } from '@/components/layout/stack';
import { FadeUp } from '@/components/motion/fade-up';
import { DisplayHeading } from '@/components/typography/display';
import { Eyebrow } from '@/components/typography/eyebrow';
import { Heading } from '@/components/typography/heading';
import { Lead } from '@/components/typography/lead';
import { MutedText } from '@/components/typography/muted-text';
import { Text } from '@/components/typography/text';
import { Button } from '@/components/ui/button';
import { routes } from '@/config/routes';
import { homepageHub, type HubServiceMini } from '@/data/content/homepage-hub';
import { getActivePackagesByServiceSlug } from '@/data/pricing/packages';
import { getHomepageReviews } from '@/lib/reviews';
import { formatMoney } from '@/lib/pricing/format';
import { cn } from '@/lib/utils';

const TONE_CLASS: Record<HubServiceMini['tone'], string> = {
  rose: 'bg-[#FFF5F7]',
  violet: 'bg-[#F8F5FF]',
  orange: 'bg-[#FFF7F0]',
  amber: 'bg-[#FFFBEB]',
  slate: 'bg-[#F4F6F8]',
  cyan: 'bg-[#F0FDFA]',
  blue: 'bg-[#F0F6FF]',
  red: 'bg-[#FFF5F5]',
};

const PLATFORM_ACCENT: Record<string, string> = {
  instagram: 'border-[#E1306C]',
  tiktok: 'border-[#111111]',
  facebook: 'border-[#1877F2]',
  youtube: 'border-[#FF0000]',
};

function startingFromLabel(slug: string): string | null {
  const packages = getActivePackagesByServiceSlug(slug);
  if (!packages.length) return null;
  const min = Math.min(...packages.map((pkg) => pkg.price));
  const currency = packages[0]?.currency ?? 'USD';
  return `From ${formatMoney(min, currency)}`;
}

function HubHero() {
  const { hero } = homepageHub;
  return (
    <Section
      id="homepage-hero"
      spacing="lg"
      className="relative overflow-hidden bg-hero-wash"
      aria-labelledby="homepage-hero-heading"
    >
      <div
        className="pointer-events-none absolute -top-24 -right-16 size-72 rounded-full bg-[var(--brand-primary)]/15 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-20 -left-10 size-64 rounded-full bg-[var(--brand-primary)]/10 blur-3xl"
        aria-hidden="true"
      />
      <Container size="xl" className="relative">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.95fr)] lg:gap-14">
          <Stack gap="lg" className="min-w-0">
            <FadeUp immediate>
              <Eyebrow className="max-w-full text-[var(--brand-primary)] text-pretty">
                {hero.eyebrow}
              </Eyebrow>
            </FadeUp>
            <FadeUp immediate delay={0.05}>
              <DisplayHeading
                as="h1"
                id="homepage-hero-heading"
                className="min-w-0 max-w-none w-full break-words !text-[clamp(1.875rem,1.05rem+3.2vw,3.35rem)] !leading-[1.05] !tracking-[-0.035em]"
              >
                {hero.title}
              </DisplayHeading>
            </FadeUp>
            <FadeUp immediate delay={0.1}>
              <Lead className="max-w-2xl text-pretty text-[var(--text-secondary)]">
                {hero.description}
              </Lead>
            </FadeUp>
            <FadeUp immediate delay={0.15}>
              <div className="flex flex-wrap gap-3">
                <Button asChild size="lg" className="rounded-xl font-semibold">
                  <Link href={hero.primaryCta.href}>{hero.primaryCta.label}</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="rounded-xl font-semibold">
                  <Link href={hero.secondaryCta.href}>{hero.secondaryCta.label}</Link>
                </Button>
              </div>
              <p className="mt-3 text-sm text-[var(--text-secondary)]">{hero.microcopy}</p>
            </FadeUp>
          </Stack>
          <FadeUp immediate delay={0.12} className="min-w-0">
            <div className="overflow-hidden rounded-3xl border border-[var(--border-subtle)] bg-white/80 p-3 shadow-[var(--shadow-sm)] backdrop-blur">
              <Image
                src={hero.visual.src}
                alt={hero.visual.alt}
                width={hero.visual.width}
                height={hero.visual.height}
                className="h-auto w-full object-contain"
                priority
                sizes="(max-width: 1024px) 100vw, 560px"
              />
            </div>
          </FadeUp>
        </div>
      </Container>
    </Section>
  );
}

function PlatformSelector() {
  const section = homepageHub.platformSelector;
  return (
    <Section
      id={section.id}
      spacing="md"
      className="bg-white"
      aria-labelledby={`${section.id}-heading`}
    >
      <Container size="xl">
        <Stack gap="lg">
          <FadeUp className="max-w-2xl space-y-3">
            <Heading as="h2" id={`${section.id}-heading`}>
              {section.title}
            </Heading>
            <Lead className="text-[var(--text-secondary)]">{section.description}</Lead>
          </FadeUp>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {section.platforms.map((platform, index) => (
              <FadeUp key={platform.id} delay={index * 0.05}>
                <Link
                  href={platform.href}
                  className={cn(
                    'group flex h-full flex-col rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-muted)] p-5 transition hover:border-[var(--brand-primary)] hover:bg-white hover:shadow-[var(--shadow-sm)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                    PLATFORM_ACCENT[platform.id],
                    'border-t-4',
                  )}
                >
                  <p className="text-lg font-semibold text-[var(--text-primary)]">{platform.name}</p>
                  <p className="mt-2 flex-1 text-sm text-[var(--text-secondary)]">
                    {platform.description}
                  </p>
                  <span className="mt-4 text-sm font-semibold text-[var(--brand-primary)] group-hover:underline">
                    {platform.ctaLabel}
                  </span>
                </Link>
              </FadeUp>
            ))}
          </div>
        </Stack>
      </Container>
    </Section>
  );
}

function TrustValue() {
  const section = homepageHub.trustValue;
  return (
    <Section
      id={section.id}
      spacing="md"
      className="bg-[var(--surface-muted)]"
      aria-labelledby={`${section.id}-heading`}
    >
      <Container size="xl">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start">
          <FadeUp className="space-y-3">
            <Heading as="h2" id={`${section.id}-heading`}>
              {section.title}
            </Heading>
            <Lead className="text-[var(--text-secondary)]">{section.description}</Lead>
          </FadeUp>
          <div className="grid gap-4 sm:grid-cols-2">
            {section.points.map((point, index) => (
              <FadeUp key={point.title} delay={index * 0.04}>
                <div className="h-full rounded-2xl border border-[var(--border-subtle)] bg-white p-5">
                  <p className="font-semibold text-[var(--text-primary)]">{point.title}</p>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">
                    {point.body}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}

function ServicesOverview() {
  const section = homepageHub.servicesOverview;
  return (
    <Section
      id={section.id}
      spacing="md"
      className="bg-white"
      aria-labelledby={`${section.id}-heading`}
    >
      <Container size="xl">
        <Stack gap="lg">
          <FadeUp className="max-w-2xl space-y-3">
            <Heading as="h2" id={`${section.id}-heading`}>
              {section.title}
            </Heading>
            <Lead className="text-[var(--text-secondary)]">{section.description}</Lead>
          </FadeUp>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {homepageHub.services.map((service, index) => {
              const from = startingFromLabel(service.slug);
              return (
                <FadeUp key={service.id} delay={Math.min(index * 0.03, 0.24)}>
                  <Link
                    href={service.href}
                    className="flex h-full flex-col rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-muted)] p-4 transition hover:border-[var(--brand-primary)] hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <p className="text-xs font-medium uppercase tracking-wide text-[var(--text-secondary)]">
                      {service.platform}
                    </p>
                    <p className="mt-1 font-semibold text-[var(--text-primary)]">{service.name}</p>
                    {from ? (
                      <p className="mt-2 text-sm font-medium text-[var(--brand-primary)]">{from}</p>
                    ) : null}
                    <span className="mt-auto pt-3 text-sm font-semibold text-[var(--text-primary)]">
                      Open page →
                    </span>
                  </Link>
                </FadeUp>
              );
            })}
          </div>
        </Stack>
      </Container>
    </Section>
  );
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
      className={cn(TONE_CLASS[service.tone])}
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
              <ul className="space-y-2">
                {service.points.map((point) => (
                  <li key={point} className="flex gap-2 text-sm text-[var(--text-primary)]">
                    <CheckCircle2
                      className="mt-0.5 size-4 shrink-0 text-[var(--brand-primary)]"
                      aria-hidden
                    />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
              <Button asChild className="rounded-xl font-semibold">
                <Link href={service.cta.href}>{service.cta.label}</Link>
              </Button>
            </div>
          </FadeUp>
          <FadeUp delay={0.08}>
            <figure className="overflow-hidden rounded-3xl border border-[var(--border-subtle)] bg-white shadow-[var(--shadow-sm)]">
              <Image
                src={service.image.src}
                alt={service.image.alt}
                width={720}
                height={480}
                className="h-auto max-h-[16rem] w-full object-cover lg:max-h-[18rem]"
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

function PlatformServiceGroups() {
  const platforms = ['instagram', 'tiktok', 'facebook', 'youtube'] as const;
  let runningIndex = 0;

  return (
    <>
      {platforms.map((platform) => {
        const group = homepageHub.platformGroupTitles[platform];
        const services = homepageHub.services.filter((s) => s.platform === platform);
        return (
          <div key={platform}>
            <Section
              id={group.id}
              spacing="sm"
              className="border-y border-[var(--border-subtle)] bg-white"
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

function WhyNovaLikes() {
  const section = homepageHub.why;
  return (
    <Section
      id={section.id}
      spacing="md"
      className="bg-white"
      aria-labelledby={`${section.id}-heading`}
    >
      <Container size="xl">
        <Stack gap="lg">
          <FadeUp className="max-w-2xl space-y-3">
            <Heading as="h2" id={`${section.id}-heading`}>
              {section.title}
            </Heading>
            <Lead className="text-[var(--text-secondary)]">{section.description}</Lead>
          </FadeUp>
          <div className="grid gap-4 md:grid-cols-2">
            {section.points.map((point, index) => (
              <FadeUp key={point.title} delay={index * 0.04}>
                <div className="h-full rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-muted)] p-5">
                  <p className="font-semibold">{point.title}</p>
                  <p className="mt-2 text-sm text-[var(--text-secondary)]">{point.body}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </Stack>
      </Container>
    </Section>
  );
}

function HowItWorks() {
  const section = homepageHub.howItWorks;
  return (
    <Section
      id={section.id}
      spacing="md"
      className="bg-[var(--surface-muted)]"
      aria-labelledby={`${section.id}-heading`}
    >
      <Container size="xl">
        <Stack gap="lg">
          <FadeUp className="max-w-2xl space-y-3">
            <Heading as="h2" id={`${section.id}-heading`}>
              {section.title}
            </Heading>
            <Lead className="text-[var(--text-secondary)]">{section.description}</Lead>
          </FadeUp>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            {section.steps.map((step, index) => (
              <FadeUp key={step.title} delay={index * 0.04}>
                <div className="h-full rounded-2xl border border-[var(--border-subtle)] bg-white p-5">
                  <p className="text-xs font-semibold uppercase tracking-wide text-[var(--brand-primary)]">
                    Step {index + 1}
                  </p>
                  <p className="mt-2 font-semibold">{step.title}</p>
                  <p className="mt-2 text-sm text-[var(--text-secondary)]">{step.body}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </Stack>
      </Container>
    </Section>
  );
}

function Guarantees() {
  const section = homepageHub.guarantees;
  const icons: LucideIcon[] = [Lock, ShieldCheck, ClipboardList, CheckCircle2, CheckCircle2];
  return (
    <Section
      id={section.id}
      spacing="md"
      className="bg-white"
      aria-labelledby={`${section.id}-heading`}
    >
      <Container size="xl">
        <Stack gap="lg">
          <FadeUp className="max-w-2xl space-y-3">
            <Heading as="h2" id={`${section.id}-heading`}>
              {section.title}
            </Heading>
            <Lead className="text-[var(--text-secondary)]">{section.description}</Lead>
          </FadeUp>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {section.items.map((item, index) => {
              const Icon = icons[index] ?? CheckCircle2;
              return (
                <FadeUp key={item.title} delay={index * 0.04}>
                  <div className="h-full rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-muted)] p-5">
                    <Icon className="size-5 text-[var(--brand-primary)]" aria-hidden />
                    <p className="mt-3 font-semibold">{item.title}</p>
                    <p className="mt-2 text-sm text-[var(--text-secondary)]">{item.body}</p>
                  </div>
                </FadeUp>
              );
            })}
          </div>
          <FadeUp>
            <Link
              href={routes.refundPolicy}
              className="text-sm font-semibold text-[var(--brand-primary)] underline-offset-4 hover:underline"
            >
              Read the Refund Policy
            </Link>
          </FadeUp>
        </Stack>
      </Container>
    </Section>
  );
}

function BeforeYouBuy() {
  const section = homepageHub.beforeYouBuy;
  return (
    <Section
      id={section.id}
      spacing="md"
      className="bg-[var(--surface-muted)]"
      aria-labelledby={`${section.id}-heading`}
    >
      <Container size="xl">
        <Stack gap="lg">
          <FadeUp className="max-w-2xl space-y-3">
            <Heading as="h2" id={`${section.id}-heading`}>
              {section.title}
            </Heading>
            <Lead className="text-[var(--text-secondary)]">{section.description}</Lead>
          </FadeUp>
          <div className="grid gap-4 lg:grid-cols-2">
            {section.items.map((item, index) => (
              <FadeUp key={item.question} delay={index * 0.04}>
                <div className="h-full rounded-2xl border border-[var(--border-subtle)] bg-white p-5">
                  <p className="font-semibold text-[var(--text-primary)]">{item.question}</p>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">
                    {item.answer}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>
        </Stack>
      </Container>
    </Section>
  );
}

function HubReviews() {
  const section = homepageHub.reviews;
  const reviews = getHomepageReviews(6);
  if (!reviews.length) return null;

  return (
    <Section
      id={section.id}
      spacing="md"
      className="bg-white"
      aria-labelledby={`${section.id}-heading`}
    >
      <Container size="xl">
        <Stack gap="lg">
          <FadeUp className="flex flex-wrap items-end justify-between gap-4">
            <div className="max-w-2xl space-y-3">
              <Heading as="h2" id={`${section.id}-heading`}>
                {section.title}
              </Heading>
              <Lead className="text-[var(--text-secondary)]">{section.description}</Lead>
            </div>
            <Button asChild variant="outline" className="rounded-xl">
              <Link href={section.cta.href}>{section.cta.label}</Link>
            </Button>
          </FadeUp>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {reviews.map((review, index) => (
              <FadeUp key={review.id} delay={index * 0.04}>
                <article className="flex h-full flex-col rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-muted)] p-5">
                  <p className="text-sm font-semibold text-[var(--brand-primary)]" aria-label={`${review.rating} out of 5`}>
                    {'★'.repeat(Math.round(review.rating))}
                  </p>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-[var(--text-primary)]">
                    {review.reviewText}
                  </p>
                  <p className="mt-4 text-sm font-medium text-[var(--text-secondary)]">
                    {review.customerName}
                  </p>
                </article>
              </FadeUp>
            ))}
          </div>
        </Stack>
      </Container>
    </Section>
  );
}

function HubFaq() {
  const section = homepageHub.faq;
  return (
    <Section
      id={section.id}
      spacing="md"
      className="bg-[var(--surface-muted)]"
      aria-labelledby={`${section.id}-heading`}
    >
      <Container size="xl">
        <Stack gap="lg">
          <FadeUp className="max-w-2xl space-y-3">
            <Heading as="h2" id={`${section.id}-heading`}>
              {section.title}
            </Heading>
            <Lead className="text-[var(--text-secondary)]">{section.description}</Lead>
          </FadeUp>
          <div className="mx-auto w-full max-w-3xl space-y-3">
            {section.items.map((item, index) => (
              <FadeUp key={item.question} delay={index * 0.03}>
                <details className="group rounded-2xl border border-[var(--border-subtle)] bg-white p-4 open:shadow-[var(--shadow-sm)]">
                  <summary className="cursor-pointer list-none font-semibold text-[var(--text-primary)] marker:content-none [&::-webkit-details-marker]:hidden">
                    {item.question}
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)]">
                    {item.answer}
                  </p>
                </details>
              </FadeUp>
            ))}
          </div>
          <FadeUp>
            <Button asChild variant="outline" className="rounded-xl">
              <Link href={routes.faq}>Visit full FAQ</Link>
            </Button>
          </FadeUp>
        </Stack>
      </Container>
    </Section>
  );
}

function FinalCta() {
  const section = homepageHub.finalCta;
  return (
    <Section
      id={section.id}
      spacing="lg"
      className="bg-[var(--brand-primary)] text-white"
      aria-labelledby={`${section.id}-heading`}
    >
      <Container size="xl">
        <FadeUp className="mx-auto max-w-3xl space-y-5 text-center">
          <Heading as="h2" id={`${section.id}-heading`} className="!text-white">
            {section.title}
          </Heading>
          <Lead className="!text-white/90">{section.description}</Lead>
          <div className="flex flex-wrap justify-center gap-3">
            <Button
              asChild
              size="lg"
              className="rounded-xl bg-white font-semibold text-[var(--brand-primary)] hover:bg-white/90"
            >
              <Link href={section.primaryCta.href}>{section.primaryCta.label}</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-xl border-white/40 bg-transparent font-semibold text-white hover:bg-white/10"
            >
              <Link href={section.secondaryCta.href}>{section.secondaryCta.label}</Link>
            </Button>
          </div>
        </FadeUp>
      </Container>
    </Section>
  );
}

/** Full multi-platform homepage hub composition (Phase 1A). */
export function HomepageHubSections() {
  return (
    <>
      <HubHero />
      <PlatformSelector />
      <TrustValue />
      <ServicesOverview />
      <PlatformServiceGroups />
      <WhyNovaLikes />
      <HowItWorks />
      <Guarantees />
      <BeforeYouBuy />
      <HubReviews />
      <HubFaq />
      <FinalCta />
    </>
  );
}
