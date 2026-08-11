import Link from 'next/link';

import { Container } from '@/components/layout/container';
import { Grid } from '@/components/layout/grid';
import { Section } from '@/components/layout/section';
import { Stack } from '@/components/layout/stack';
import { Breadcrumb } from '@/components/navigation/breadcrumb';
import { ContactBusinessCards } from '@/components/sections/contact/contact-business-cards';
import { ContactCtaIllustration } from '@/components/sections/contact/contact-cta-illustration';
import { ContactFaqPreview } from '@/components/sections/contact/contact-faq-preview';
import { ContactHelpCard } from '@/components/sections/contact/contact-help-card';
import { ContactHeroIllustration } from '@/components/sections/contact/contact-hero-illustration';
import {
  ContactCtaButtons,
  ContactForm,
  ContactPageViewTracker,
} from '@/components/sections/contact/contact-form';
import { Heading } from '@/components/typography/heading';
import { Lead } from '@/components/typography/lead';
import { MutedText } from '@/components/typography/muted-text';
import { Button } from '@/components/ui/button';
import { routes } from '@/config/routes';
import { getContactContent } from '@/data/content/company';
import { getFaqItemsByIds } from '@/data/content/faq';
import {
  getPublicBusinessContact,
  hasPublicContactDetails,
} from '@/lib/site/public-contact';
import type { ContactPageContent } from '@/types/content';

type ContactPageViewProps = {
  content?: ContactPageContent;
};

/**
 * Contact Us production composition (Document 13.02).
 *
 * Hero → Contact Options → Contact Form → Business Information →
 * FAQ Preview → Final CTA
 */
export function ContactPageView({ content = getContactContent() }: ContactPageViewProps) {
  const breadcrumbs = [
    { label: 'Home', href: routes.home },
    { label: 'Contact' },
  ];

  const business = getPublicBusinessContact();
  const showExtraDetails = hasPublicContactDetails(business);
  const faqItems = getFaqItemsByIds(content.faqPreview.faqIds).map((item) => ({
    id: item.id,
    question: item.question,
    answer: item.answer,
  }));

  return (
    <>
      <ContactPageViewTracker />

      {/* 1. Hero */}
      <Section spacing="lg" className="bg-hero-wash" aria-label="Contact NovaLikes">
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
                <ContactCtaButtons
                  primaryCta={content.hero.primaryCta!}
                  secondaryCta={content.hero.secondaryCta}
                  location="hero"
                  align="responsive"
                />
              )}
            </Stack>
            <div className="flex justify-center lg:justify-end">
              <ContactHeroIllustration />
            </div>
          </div>
        </Container>
      </Section>

      {/* 2. Contact Options */}
      <Section
        id={content.contactOptions.id}
        spacing="lg"
        className="bg-muted/20"
        aria-labelledby="contact-options-heading"
      >
        <Container>
          <div className="mb-8 max-w-3xl space-y-2">
            <Heading as="h2" size="h2" id="contact-options-heading">
              {content.contactOptions.title}
            </Heading>
            {content.contactOptions.description ? (
              <MutedText>{content.contactOptions.description}</MutedText>
            ) : null}
          </div>
          <Grid cols={2} className="gap-4 lg:grid-cols-4">
            {content.contactOptions.items.map((item) => (
              <ContactHelpCard
                key={item.id}
                id={item.id}
                title={item.title}
                description={item.description}
              />
            ))}
          </Grid>
        </Container>
      </Section>

      {/* 3. Contact Form */}
      <Section
        id={content.form.id}
        spacing="lg"
        aria-labelledby="contact-form-heading"
      >
        <Container>
          <div className="mx-auto max-w-2xl space-y-8">
            <div className="space-y-2">
              <Heading as="h2" size="h2" id="contact-form-heading">
                {content.form.title}
              </Heading>
              {content.form.description ? (
                <MutedText>{content.form.description}</MutedText>
              ) : null}
            </div>
            <ContactForm fields={content.form.fields} />
          </div>
        </Container>
      </Section>

      {/* 4. Business Information */}
      <Section
        id={content.business.id}
        spacing="lg"
        className="bg-muted/20"
        aria-labelledby="contact-business-heading"
      >
        <Container>
          <div className="mx-auto max-w-4xl space-y-6">
            <Heading as="h2" size="h2" id="contact-business-heading">
              {content.business.title}
            </Heading>
            <ContactBusinessCards
              business={business}
              emptyMessage={content.business.emptyMessage}
              showExtraDetails={showExtraDetails}
              sectionDescription={content.business.description}
            />
          </div>
        </Container>
      </Section>

      {/* 5. FAQ Preview */}
      <Section
        id={content.faqPreview.id}
        spacing="lg"
        aria-labelledby="contact-faq-heading"
      >
        <Container>
          <ContactFaqPreview
            title={content.faqPreview.title}
            description={content.faqPreview.description}
            items={faqItems}
            titleId="contact-faq-heading"
          />
          <div className="mt-8">
            <Button asChild variant="outline" size="lg" className="min-h-11">
              <Link href={content.faqPreview.viewAllCta.href}>
                {content.faqPreview.viewAllCta.label}
              </Link>
            </Button>
          </div>
        </Container>
      </Section>

      {/* 6. Final CTA */}
      <Section
        id={content.finalCta.id}
        spacing="lg"
        className="bg-brand/5"
        aria-labelledby="contact-final-cta-heading"
      >
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_auto] lg:gap-12">
            <Stack
              gap="lg"
              className="mx-auto max-w-2xl items-center text-center lg:mx-0 lg:items-start lg:text-left"
            >
              <Heading as="h2" size="h2" id="contact-final-cta-heading">
                {content.finalCta.title}
              </Heading>
              <MutedText>{content.finalCta.description}</MutedText>
              <ContactCtaButtons
                primaryCta={content.finalCta.primaryCta}
                secondaryCta={content.finalCta.secondaryCta}
                location="final"
                align="responsive"
              />
            </Stack>
            <div className="mx-auto flex justify-center lg:mx-0 lg:justify-end">
              <ContactCtaIllustration />
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
