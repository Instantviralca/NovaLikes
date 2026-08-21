'use client';

import { CTAButtonGroup } from '@/components/cta/CTAButtonGroup';
import { Heading } from '@/components/typography/heading';
import { MutedText } from '@/components/typography/muted-text';
import { getCtaById, selectPageCtas } from '@/lib/ctas';
import { cn } from '@/lib/utils';
import type { PublicCta } from '@/types/cta';

export type FAQSupportCTAProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
  primary?: PublicCta;
  secondary?: PublicCta;
  className?: string;
};

/**
 * Support CTA for FAQ surfaces — registry-driven (Document 14.06).
 */
export function FAQSupportCTA({
  eyebrow,
  title,
  description,
  primary,
  secondary,
  className,
}: FAQSupportCTAProps) {
  const selection = selectPageCtas('faq', { limit: 6 });
  const resolvedPrimary =
    primary ??
    getCtaById('cta-contact-support') ??
    getCtaById('cta-contact-informational') ??
    selection.secondary ??
    selection.primary;

  if (!resolvedPrimary) return null;

  const resolvedSecondary =
    secondary ??
    getCtaById('cta-track-order') ??
    selection.all.find((cta) => cta.id !== resolvedPrimary.id);

  return (
    <div
      className={cn(
        'rounded-[2.25rem] bg-[#FFF1E4] px-6 py-8 sm:px-10',
        className,
      )}
    >
      {eyebrow ? (
        <p className="mb-2 text-xs font-semibold tracking-[0.14em] text-[var(--brand-primary)] uppercase">
          {eyebrow}
        </p>
      ) : null}
      <Heading as="h2" size="h3" className="mb-2">
        {title ?? resolvedPrimary.title}
      </Heading>
      <MutedText className="mb-6 max-w-2xl">
        {description ?? resolvedPrimary.description}
      </MutedText>
      <CTAButtonGroup
        primary={resolvedPrimary}
        secondary={resolvedSecondary}
        surface="faq"
        align="start"
      />
    </div>
  );
}
