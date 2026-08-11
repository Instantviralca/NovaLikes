import { Check, X } from 'lucide-react';

import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { FadeUp } from '@/components/motion/fade-up';
import { Heading } from '@/components/typography/heading';
import { MutedText } from '@/components/typography/muted-text';
import {
  INSTAGRAM_FOLLOWERS_PACKAGES_CONFIG,
  type PackagesPageConfig,
} from '@/data/content/packages-page-config';
import { cn } from '@/lib/utils';

type PackageComparisonTableProps = {
  id?: string;
  className?: string;
  config?: PackagesPageConfig;
};

const COMPETITOR_HEADERS = [
  'Package',
  'Delivery',
  'Recommended For',
  'NovaLikes',
  'Typical Providers',
] as const;

const APPROACH_HEADERS = ['Package', 'Recommended For', 'Package Approach'] as const;

export function PackageComparisonTable({
  id = 'package-comparison',
  className,
  config = INSTAGRAM_FOLLOWERS_PACKAGES_CONFIG,
}: PackageComparisonTableProps) {
  const { comparison } = config;
  const rows = comparison.rows;
  const isApproach = comparison.layout === 'approach';
  const headers = isApproach ? APPROACH_HEADERS : COMPETITOR_HEADERS;

  return (
    <Section
      id={id}
      spacing="lg"
      className={cn('bg-hero-wash', className)}
      aria-labelledby={`${id}-heading`}
    >
      <Container size="xl">
        <FadeUp className="mb-10 max-w-2xl space-y-3">
          <Heading as="h2" size="h2" id={`${id}-heading`}>
            {comparison.title}
          </Heading>
          <MutedText>{comparison.description}</MutedText>
        </FadeUp>

        <FadeUp>
          <div
            className="overflow-hidden rounded-[1.25rem] border border-[var(--border-subtle)] bg-white shadow-[0_18px_40px_-28px_rgba(28,25,23,0.3)]"
            role="region"
            aria-label="Package comparison"
          >
            <div className="w-full overflow-x-auto overscroll-x-contain [-webkit-overflow-scrolling:touch]">
              <table
                className={cn(
                  'w-full border-collapse text-left',
                  isApproach ? 'min-w-[28rem] lg:min-w-0' : 'min-w-[40rem] lg:min-w-0',
                )}
              >
                <thead>
                  <tr className="border-b border-[var(--border-subtle)]">
                    {headers.map((header, index) => (
                      <th
                        key={header}
                        scope="col"
                        className={cn(
                          'px-4 py-4 text-[11px] font-bold tracking-[0.08em] whitespace-nowrap uppercase lg:px-5 lg:py-5',
                          index === 0 &&
                            'sticky left-0 z-20 bg-[var(--surface-muted)] text-[var(--text-muted)] shadow-[4px_0_12px_-8px_rgba(28,25,23,0.28)]',
                          !isApproach &&
                            index === 3 &&
                            'bg-[color-mix(in_srgb,var(--brand-primary)_18%,white)] text-[var(--brand-primary)] shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]',
                          !isApproach && index === 4 && 'bg-stone-100 text-stone-500',
                          index > 0 &&
                            (isApproach || index < 3) &&
                            'bg-[var(--surface-muted)] text-[var(--text-muted)]',
                          isApproach &&
                            index === 2 &&
                            'bg-[color-mix(in_srgb,var(--brand-primary)_18%,white)] text-[var(--brand-primary)]',
                        )}
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row, rowIndex) => {
                    const highlighted = Boolean(row.highlighted);
                    const zebra = rowIndex % 2 === 1;
                    return (
                      <tr
                        key={row.id}
                        className={cn(
                          'group border-b border-[var(--border-subtle)] last:border-b-0 transition-colors duration-200',
                          'hover:bg-[color-mix(in_srgb,var(--brand-primary)_8%,white)]',
                          highlighted
                            ? 'bg-[color-mix(in_srgb,var(--brand-primary)_7%,white)]'
                            : zebra
                              ? 'bg-stone-50/90'
                              : 'bg-white',
                        )}
                      >
                        <th
                          scope="row"
                          className={cn(
                            'sticky left-0 z-10 px-4 py-4 text-sm font-semibold tracking-tight text-[var(--text-primary)] shadow-[4px_0_12px_-8px_rgba(28,25,23,0.22)] lg:px-5 lg:py-5 lg:text-[0.9375rem]',
                            highlighted
                              ? 'bg-[color-mix(in_srgb,var(--brand-primary)_10%,white)]'
                              : zebra
                                ? 'bg-stone-50'
                                : 'bg-white',
                            'group-hover:bg-[color-mix(in_srgb,var(--brand-primary)_10%,white)]',
                          )}
                        >
                          <span className="inline-flex items-center gap-2.5">
                            {highlighted ? (
                              <span className="flex size-6 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                                <Check className="size-3.5" aria-hidden />
                              </span>
                            ) : null}
                            {row.packageLabel}
                          </span>
                        </th>
                        {isApproach ? (
                          <>
                            <td className="px-4 py-4 text-sm leading-relaxed text-[var(--text-secondary)] lg:px-5 lg:py-5">
                              {row.recommended}
                            </td>
                            <td className="bg-[color-mix(in_srgb,var(--brand-primary)_12%,white)] px-4 py-4 text-sm font-semibold text-[var(--brand-primary)] lg:px-5 lg:py-5">
                              {row.popularity}
                            </td>
                          </>
                        ) : (
                          <>
                            <td className="px-4 py-4 text-sm leading-relaxed text-[var(--text-secondary)] lg:px-5 lg:py-5">
                              {row.delivery}
                            </td>
                            <td className="px-4 py-4 text-sm leading-relaxed text-[var(--text-secondary)] lg:px-5 lg:py-5">
                              {row.recommended}
                            </td>
                            <td className="bg-[color-mix(in_srgb,var(--brand-primary)_12%,white)] px-4 py-4 text-sm font-semibold text-[var(--brand-primary)] lg:px-5 lg:py-5">
                              <span className="inline-flex items-center gap-2">
                                <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                                  <Check className="size-3.5" strokeWidth={2.5} aria-hidden />
                                </span>
                                {row.popularity}
                              </span>
                            </td>
                            <td className="bg-stone-50 px-4 py-4 text-sm text-stone-500 lg:px-5 lg:py-5">
                              <span className="inline-flex items-center gap-2">
                                <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-stone-200/80 text-stone-500">
                                  <X className="size-3.5" strokeWidth={2.5} aria-hidden />
                                </span>
                                Often unclear
                              </span>
                            </td>
                          </>
                        )}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
          <p className="mt-3 text-xs text-[var(--text-muted)] md:hidden">
            Swipe sideways to compare all columns.
          </p>
        </FadeUp>
      </Container>
    </Section>
  );
}
