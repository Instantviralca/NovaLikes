'use client';

import Link from 'next/link';

import { PricingGrid } from '@/components/commerce/pricing/pricing-grid';
import type { PricingPackagesSectionProps } from '@/components/commerce/pricing/types';
import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { Heading } from '@/components/typography/heading';
import { MutedText } from '@/components/typography/muted-text';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function PricingPackagesSection({
  id = 'service-pricing',
  title,
  description,
  packages,
  secondaryCta,
  emptyMessage = 'Pricing packages are not available for this service yet. Real NovaLikes.com package data has not been added for this offer.',
  loading,
  onSelectPackage,
  onContinuePackage,
  selectedPackageId,
  platformId,
  serviceName,
  summaryBenefits,
  infoPills,
  className,
}: PricingPackagesSectionProps) {
  return (
    <Section
      id={id}
      className={cn('bg-hero-wash py-10 md:py-12', className)}
      aria-label="Pricing packages"
      data-analytics="pricing-packages"
    >
      <Container size="md" className="px-4 sm:px-6">
        {(title || description) && (
          <div className="mb-5 w-full space-y-2 md:mb-6">
            {title ? (
              <Heading as="h2" size="h2">
                {title}
              </Heading>
            ) : null}
            {description ? <MutedText>{description}</MutedText> : null}
          </div>
        )}

        {!loading && packages.length === 0 ? (
          <div
            className="rounded-2xl border border-dashed border-[var(--border-strong)] bg-white p-8 text-center"
            role="status"
            data-analytics="pricing-empty"
          >
            <p className="text-sm text-muted-foreground">{emptyMessage}</p>
          </div>
        ) : (
          <PricingGrid
            packages={packages}
            loading={loading}
            onSelect={onSelectPackage}
            onContinue={onContinuePackage}
            selectedPackageId={selectedPackageId}
            platformId={platformId}
            serviceName={serviceName}
            summaryBenefits={summaryBenefits}
            infoPills={infoPills}
          />
        )}

        {secondaryCta ? (
          <div className="mt-6">
            <Button asChild size="lg" variant="outline" className="min-h-11 rounded-xl">
              <Link href={secondaryCta.href} data-analytics="pricing-secondary-cta">
                {secondaryCta.label}
              </Link>
            </Button>
          </div>
        ) : null}
      </Container>
    </Section>
  );
}

/** Alias matching Document 09 naming. */
export const PricingPackages = PricingPackagesSection;
