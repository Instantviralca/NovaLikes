'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';

import {
  FAQAccordion,
  FAQCategoryNav,
  FAQEmptyState,
  FAQSearch,
  FAQSupportCTA,
} from '@/components/faq';
import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { Stack } from '@/components/layout/stack';
import { Breadcrumb } from '@/components/navigation/breadcrumb';
import { Heading } from '@/components/typography/heading';
import { Lead } from '@/components/typography/lead';
import { accentLastWord, HERO_HEADING_CLASS } from '@/components/typography/accent-title';
import { Button } from '@/components/ui/button';
import { routes } from '@/config/routes';
import { FAQ_CATEGORIES } from '@/data/faqs/categories';
import {
  faqAnalyticsEvents,
  trackFaqEvent,
} from '@/lib/analytics/faq-events';
import {
  faqPageAnalyticsEvents,
  trackFaqPageEvent,
} from '@/lib/analytics/faq-page-events';
import { searchFaqs } from '@/lib/faqs/search';
import type { FaqPageContent } from '@/types/content';
import type { PublicCta } from '@/types/cta';
import type { FAQCategoryId, PublicFaq } from '@/types/faq';

type FaqPageViewProps = {
  content: FaqPageContent;
  items: PublicFaq[];
  categories?: typeof FAQ_CATEGORIES;
  homeHref?: string;
  homeLabel?: string;
  faqLabel?: string;
  categoriesLabel?: string;
  allLabel?: string;
  emptyTitle?: string;
  needMoreHelp?: string;
};

/**
 * Main FAQ hub view — search-focused FAQ resource.
 */
export function FaqPageView({
  content,
  items,
  categories = FAQ_CATEGORIES,
  homeHref = routes.home,
  homeLabel = 'Home',
  faqLabel = 'FAQ',
  categoriesLabel,
  allLabel,
  emptyTitle = 'No matching questions',
  needMoreHelp = 'NEED MORE HELP?',
}: FaqPageViewProps) {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<FAQCategoryId | 'all'>('all');

  useEffect(() => {
    trackFaqPageEvent(faqPageAnalyticsEvents.faq_page_view);
    trackFaqEvent(faqAnalyticsEvents.faq_section_view, {
      surface: 'faq_page',
      resultCount: items.length,
    });
  }, [items.length]);

  const filtered = useMemo(() => {
    const searched = searchFaqs(items, query);
    if (activeCategory === 'all') return searched;
    return searched.filter((item) => item.category === activeCategory);
  }, [items, query, activeCategory]);

  useEffect(() => {
    const trimmed = query.trim();
    if (!trimmed) return;
    trackFaqEvent(faqAnalyticsEvents.faq_search, {
      query: trimmed,
      resultCount: filtered.length,
    });
    if (filtered.length === 0) {
      trackFaqEvent(faqAnalyticsEvents.faq_search_no_results, {
        query: trimmed,
        resultCount: 0,
      });
    }
  }, [query, filtered.length]);

  const grouped = useMemo(() => {
    return categories.map((category) => ({
      ...category,
      items: filtered
        .filter((item) => item.category === category.id)
        .sort((a, b) => a.order - b.order),
    })).filter((group) => group.items.length > 0);
  }, [filtered, categories]);

  const categoryIdsWithContent = useMemo(() => {
    const ids = new Set(items.map((item) => item.category));
    return categories.map((category) => category.id).filter((id) => ids.has(id));
  }, [items, categories]);

  return (
    <>
      <Section spacing="lg" className="bg-transparent" aria-label="FAQ hero">
        <Container size="xl">
          <Stack gap="md" className="mx-auto max-w-3xl">
            <Breadcrumb
              items={[
                { label: homeLabel, href: homeHref },
                { label: faqLabel },
              ]}
              variant="subtle"
            />
            <Heading as="h1" size="h1" className={HERO_HEADING_CLASS}>
              {accentLastWord(content.hero.title)}
            </Heading>
            <Lead className="text-pretty text-[var(--text-secondary)]">
              {content.hero.description}
            </Lead>
          </Stack>
        </Container>
      </Section>

      <Section spacing="lg" className="bg-transparent" aria-label="FAQ content">
        <Container size="xl">
          <div className="mb-8 space-y-4 lg:mb-10">
            <FAQSearch
              value={query}
              onChange={setQuery}
              resultCount={filtered.length}
              label={content.search.label}
              placeholder={content.search.placeholder}
            />
            {query ? (
              <Button
                type="button"
                variant="outline"
                className="min-h-11"
                onClick={() => setQuery('')}
              >
                {content.search.clearLabel}
              </Button>
            ) : null}
            <FAQCategoryNav
              activeCategory={activeCategory}
              onSelect={setActiveCategory}
              categoryIds={categoryIdsWithContent}
              categories={categories}
              categoriesLabel={categoriesLabel}
              allLabel={allLabel}
            />
          </div>

          <div className="space-y-12">
            {grouped.length === 0 ? (
              <FAQEmptyState
                title={emptyTitle}
                description={content.search.emptyState}
              />
            ) : (
              grouped.map((group) => (
                <section
                  key={group.id}
                  id={group.anchor}
                  aria-labelledby={`faq-section-${group.id}`}
                  className="scroll-mt-28"
                >
                  <Heading as="h2" size="h2" id={`faq-section-${group.id}`} className="mb-6">
                    {group.label}
                  </Heading>
                  <FAQAccordion
                    items={group.items}
                    onItemOpen={(faqId) =>
                      trackFaqPageEvent(faqPageAnalyticsEvents.faq_question_open, {
                        faqId,
                        categoryId: group.id,
                      })
                    }
                  />
                  {group.id === 'payments_refunds' ? (
                    <div className="mt-4">
                      <Button asChild variant="link" className="min-h-11 px-0">
                        <Link href={content.refundPolicyCta.href}>
                          {content.refundPolicyCta.label}
                        </Link>
                      </Button>
                    </div>
                  ) : null}
                </section>
              ))
            )}
          </div>
        </Container>
      </Section>

      <Section
        id={content.finalCta.id}
        spacing="lg"
        className="bg-transparent"
        aria-labelledby="faq-final-cta-heading"
      >
        <Container size="xl">
          <FAQSupportCTA
            eyebrow={needMoreHelp}
            title={content.finalCta.title}
            description={content.finalCta.description}
            primary={
              {
                id: 'faq-cta-contact',
                title: content.finalCta.title,
                description: content.finalCta.description,
                buttonLabel: content.finalCta.primaryCta.label,
                destination: content.finalCta.primaryCta.href,
                variant: 'primary',
                pageLocations: ['faq'],
                order: 1,
              } satisfies PublicCta
            }
            secondary={
              content.finalCta.secondaryCta
                ? ({
                    id: 'faq-cta-track',
                    title: content.finalCta.secondaryCta.label,
                    description: '',
                    buttonLabel: content.finalCta.secondaryCta.label,
                    destination: content.finalCta.secondaryCta.href,
                    variant: 'secondary',
                    pageLocations: ['faq'],
                    order: 2,
                  } satisfies PublicCta)
                : undefined
            }
          />
        </Container>
      </Section>
    </>
  );
}
