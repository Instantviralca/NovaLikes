'use client';

import { FAQ_CATEGORIES } from '@/data/faqs/categories';
import { faqAnalyticsEvents, trackFaqEvent } from '@/lib/analytics/faq-events';
import { cn } from '@/lib/utils';
import type { FAQCategoryId } from '@/types/faq';

export type FAQCategoryNavProps = {
  activeCategory: FAQCategoryId | 'all';
  onSelect: (category: FAQCategoryId | 'all') => void;
  /** Optional subset of categories to show (e.g. those with results). */
  categoryIds?: FAQCategoryId[];
  categories?: typeof FAQ_CATEGORIES;
  categoriesLabel?: string;
  allLabel?: string;
  className?: string;
};

/**
 * Category navigation for the main FAQ page.
 */
export function FAQCategoryNav({
  activeCategory,
  onSelect,
  categoryIds,
  categories: categorySource = FAQ_CATEGORIES,
  categoriesLabel = 'Categories',
  allLabel = 'All',
  className,
}: FAQCategoryNavProps) {
  const categories = categoryIds
    ? categorySource.filter((category) => categoryIds.includes(category.id))
    : categorySource;

  return (
    <nav aria-label="FAQ categories" className={cn(className)}>
      <p className="mb-2 text-sm font-medium text-foreground lg:mb-3">{categoriesLabel}</p>
      <ul className="-mx-1 flex flex-wrap gap-2 overflow-x-auto px-1 pb-1 sm:overflow-visible">
        <li className="max-w-full">
          <button
            type="button"
            className={cn(
              'min-h-11 max-w-full rounded-full px-4 py-2 text-start text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
              activeCategory === 'all'
                ? 'bg-[var(--brand-primary)] text-white'
                : 'bg-[#FFF1E6] text-[var(--text-primary)] hover:bg-[#FFE4CC]',
            )}
            aria-current={activeCategory === 'all' ? 'true' : undefined}
            onClick={() => {
              onSelect('all');
              trackFaqEvent(faqAnalyticsEvents.faq_category_select, {
                categoryId: 'all',
              });
            }}
          >
            {allLabel}
          </button>
        </li>
        {categories.map((category) => (
          <li key={category.id} className="max-w-full">
            <button
              type="button"
              className={cn(
                'min-h-11 max-w-full rounded-full px-4 py-2 text-start text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                activeCategory === category.id
                  ? 'bg-[var(--brand-primary)] text-white'
                  : 'bg-[#FFF1E6] text-[var(--text-primary)] hover:bg-[#FFE4CC]',
              )}
              aria-current={activeCategory === category.id ? 'true' : undefined}
              onClick={() => {
                onSelect(category.id);
                trackFaqEvent(faqAnalyticsEvents.faq_category_select, {
                  categoryId: category.id,
                });
              }}
            >
              {category.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
