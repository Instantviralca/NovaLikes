import Image from 'next/image';
import { Headphones, ShieldCheck, Zap } from 'lucide-react';

import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { Stack } from '@/components/layout/stack';
import { Breadcrumb } from '@/components/navigation/breadcrumb';
import { ContactFaqSection } from '@/components/sections/contact/contact-faq-section';
import { ContactFinalBannerCta } from '@/components/sections/contact/contact-final-banner-cta';
import {
  ContactForm,
  ContactPageViewTracker,
} from '@/components/sections/contact/contact-form';
import { ContactHeroIllustration } from '@/components/sections/contact/contact-hero-illustration';
import { ContactInfoPanel } from '@/components/sections/contact/contact-info-panel';
import { Heading } from '@/components/typography/heading';
import { accentLastWord, HERO_HEADING_CLASS } from '@/components/typography/accent-title';
import { Text } from '@/components/typography/text';
import { routes } from '@/config/routes';
import { getContactContent } from '@/data/content/company';
import { getFaqItemsByIds } from '@/data/content/faq';
import { getEnglishContactSource } from '@/lib/i18n/content/company-english';
import type { ContactPageOverlay } from '@/lib/i18n/content/company-english';
import { QuickAnswer } from '@/components/quick-answer/QuickAnswer';
import { cn } from '@/lib/utils';
import type { ContactPageContent } from '@/types/content';

const HERO_BADGE_ICONS = [Headphones, Zap, ShieldCheck] as const;
const HERO_BADGE_COLORS = [
  'text-[var(--brand-primary)]',
  'text-[#F59E0B]',
  'text-[#16A34A]',
] as const;

type ContactFaqItem = {
  id: string;
  question: string;
  answer: string;
};

type ContactPageViewProps = {
  content?: ContactPageContent;
  chrome?: ContactPageOverlay['chrome'];
  homeLabel?: string;
  homeHref?: string;
  faqItems?: ContactFaqItem[];
  trackOrderHref?: string;
  quickAnswerHeading?: string;
  quickAnswerText?: string;
};

/**
 * Contact Us page — visual layout matched to the Contact mockup.
 */
export function ContactPageView({
  content = getContactContent(),
  chrome = getEnglishContactSource().chrome,
  homeLabel = 'Home',
  homeHref = routes.home,
  faqItems,
  trackOrderHref = routes.trackOrder,
  quickAnswerHeading,
  quickAnswerText,
}: ContactPageViewProps) {
  const breadcrumbs = [
    { label: homeLabel, href: homeHref },
    { label: chrome.breadcrumb },
  ];

  const faqs =
    faqItems ??
    getFaqItemsByIds(content.faqPreview.faqIds).map((item) => ({
      id: item.id,
      question: item.question,
      answer: item.answer,
    }));

  return (
    <>
      <ContactPageViewTracker />

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
              <Text className="text-pretty text-[var(--text-secondary)]">
                {content.hero.description}
              </Text>
              {content.hero.trustLabels?.length ? (
                <div className="mt-1 flex w-full flex-col gap-2.5 sm:flex-row sm:flex-wrap lg:justify-start">
                  {content.hero.trustLabels.map((item, index) => {
                    const Icon = HERO_BADGE_ICONS[index % HERO_BADGE_ICONS.length];
                    const color = HERO_BADGE_COLORS[index % HERO_BADGE_COLORS.length];
                    return (
                      <div
                        key={item.id}
                        className="flex items-center gap-2 rounded-full bg-[#FFF1E6] px-3.5 py-2 text-left text-sm text-[var(--text-primary)]"
                      >
                        <Icon className={cn('size-4 shrink-0', color)} strokeWidth={2.25} aria-hidden />
                        <span className="font-medium leading-snug">{item.label}</span>
                      </div>
                    );
                  })}
                </div>
              ) : null}
            </Stack>
            <div className="flex justify-center lg:justify-end">
              <ContactHeroIllustration
                src={content.hero.visual?.src}
                alt={content.hero.visual?.alt}
              />
            </div>
          </div>
        </Container>
      </Section>

      {quickAnswerText ? (
        <Section spacing="sm" className="bg-transparent">
          <Container>
            <QuickAnswer heading={quickAnswerHeading ?? 'Quick answer'} text={quickAnswerText} />
          </Container>
        </Section>
      ) : null}

      {/* 2. Form + Contact Information */}
      <Section
        id={content.form.id}
        spacing="lg"
        className="bg-transparent"
        aria-labelledby="contact-form-heading"
      >
        <Container>
          <div className="grid gap-8 rounded-[1.75rem] border border-[var(--border-subtle)] bg-white p-6 shadow-[0_18px_48px_-28px_rgba(28,25,23,0.35)] sm:p-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10 lg:p-10">
            <div className="space-y-5">
              <div className="space-y-2">
                <Heading as="h2" size="h3" id="contact-form-heading">
                  {content.form.title}
                </Heading>
                {content.form.description ? (
                  <Text className="text-sm text-[var(--text-secondary)]">
                    {content.form.description}
                  </Text>
                ) : null}
              </div>
              <ContactForm fields={content.form.fields} chrome={chrome} embedded />
            </div>
            <div className="space-y-5 border-t border-[var(--border-subtle)] pt-6 lg:border-t-0 lg:border-s lg:pt-0 lg:ps-8">
              <Heading as="h2" size="h3" id="contact-business-heading">
                {content.business.title}
              </Heading>
              <ContactInfoPanel chrome={chrome} trackOrderHref={trackOrderHref} />
            </div>
          </div>
        </Container>
      </Section>

      {/* 3. FAQ */}
      <Section
        id={content.faqPreview.id}
        spacing="lg"
        className="bg-transparent"
        aria-labelledby="contact-faq-heading"
      >
        <Container>
          <ContactFaqSection
            eyebrow={content.faqPreview.description}
            title={accentLastWord(content.faqPreview.title)}
            items={faqs}
            titleId="contact-faq-heading"
          />
        </Container>
      </Section>

      {/* 4. Final CTA banner */}
      <Section
        id={content.finalCta.id}
        spacing="lg"
        className="bg-transparent"
        aria-labelledby="contact-final-cta-heading"
      >
        <Container>
          <div className="flex flex-col items-center gap-6 rounded-[1.75rem] bg-[var(--brand-primary)] px-6 py-8 text-center sm:flex-row sm:gap-8 sm:px-8 sm:py-9 sm:text-left">
            <div className="relative h-20 w-28 shrink-0 sm:h-24 sm:w-32">
              <Image
                src="/assets/images/illustrations/contact/contact-cta-chat.webp"
                alt=""
                width={256}
                height={256}
                className="h-full w-full object-contain"
                aria-hidden={true}
              />
            </div>
            <div className="min-w-0 flex-1 space-y-1">
              <Heading
                as="h2"
                size="h3"
                id="contact-final-cta-heading"
                className="!text-white"
              >
                {content.finalCta.title}
              </Heading>
              <p className="text-sm leading-relaxed text-white/95 sm:text-base">
                {content.finalCta.description}
              </p>
            </div>
            <ContactFinalBannerCta
              href={content.finalCta.primaryCta.href}
              label={content.finalCta.primaryCta.label}
            />
          </div>
        </Container>
      </Section>
    </>
  );
}
