'use client';

import type { ReactNode } from 'react';

import { CTASection } from '@/components/cta/CTASection';
import { FinalCTA, type FinalCTAProps } from '@/components/marketing/final-cta';
import { selectFinalCtaPair } from '@/lib/ctas';

export type ServiceCTAProps = FinalCTAProps & {
  className?: string;
  aside?: ReactNode;
  trustLine?: string;
  trustBadges?: string[];
};

/**
 * Service page final CTA — Document 14.06.
 * Prefers page-specific primaryCta/secondaryCta when provided; otherwise registry pair.
 */
export function ServiceCTA(props: ServiceCTAProps) {
  if (props.primaryCta || props.primary) {
    return <FinalCTA {...props} surface="service_page" className={props.className} />;
  }

  const pair = selectFinalCtaPair('service_page');

  if (pair) {
    return (
      <CTASection
        primary={pair.primary}
        secondary={pair.secondary}
        title={props.title}
        description={props.description}
        surface="service_page"
        serviceSlug={props.analyticsServiceSlug}
        aside={props.variant === 'banner' ? undefined : props.aside}
        trustLine={props.trustLine}
        trustBadges={props.trustBadges}
        className={props.className}
        variant={props.variant}
      />
    );
  }

  return <FinalCTA {...props} surface="service_page" className={props.className} />;
}
