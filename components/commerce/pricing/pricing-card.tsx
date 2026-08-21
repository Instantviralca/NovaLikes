'use client';

import { Check, Clock3, RefreshCw } from 'lucide-react';
import Image from 'next/image';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/cards/card';
import { DeliveryEstimate } from '@/components/commerce/pricing/delivery-estimate';
import { PackageBadge } from '@/components/commerce/pricing/package-badge';
import { PackageFeatures } from '@/components/commerce/pricing/package-features';
import { PriceDisplay } from '@/components/commerce/pricing/price-display';
import { PricingCTA } from '@/components/commerce/pricing/pricing-cta';
import type { PricingCardProps } from '@/components/commerce/pricing/types';
import { getServiceBySlug } from '@/data/services';
import { cn } from '@/lib/utils';
import type { PlatformId } from '@/types/platform';

const PLATFORM_ICON: Record<PlatformId, string> = {
  instagram: '/assets/platforms/instagram.svg',
  tiktok: '/assets/platforms/tiktok.svg',
  youtube: '/assets/platforms/youtube.svg',
  facebook: '/assets/platforms/facebook.svg',
};

function formatQuantity(value: number): string {
  return new Intl.NumberFormat('en-US').format(value);
}

function platformFromSlug(slug: string): PlatformId | null {
  if (slug.includes('instagram')) return 'instagram';
  if (slug.includes('tiktok')) return 'tiktok';
  if (slug.includes('youtube')) return 'youtube';
  if (slug.includes('facebook')) return 'facebook';
  return null;
}

export function PricingCard({
  model,
  onSelect,
  className,
  selected = false,
}: PricingCardProps) {
  const pkg = model.package;
  const emphasized = pkg.badge === 'most-popular' || pkg.badge === 'best-value';
  const service = getServiceBySlug(pkg.serviceSlug);
  const platform = service?.platform ?? platformFromSlug(pkg.serviceSlug);
  const quantityText = formatQuantity(pkg.quantity);
  const hasRefill =
    pkg.features.some((f) => /refill/i.test(f)) ||
    /refill/i.test(pkg.title) ||
    /refill/i.test(pkg.packageName);

  return (
    <div className="nl-fade-up nl-hover-lift h-full">
      <Card
        role="button"
        tabIndex={0}
        aria-pressed={selected}
        onClick={() => onSelect?.(pkg.id)}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            onSelect?.(pkg.id);
          }
        }}
        className={cn(
          'group relative flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl border bg-[var(--surface-card)] transition-[box-shadow,border-color,transform] duration-200',
          'hover:border-[var(--brand-primary)]/45 hover:shadow-[var(--shadow-md)]',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)] focus-visible:ring-offset-2',
          selected
            ? 'scale-[1.01] border-[var(--brand-primary)] shadow-[var(--shadow-glow)] ring-2 ring-[var(--brand-primary)]/35'
            : 'border-[var(--border-subtle)] shadow-[var(--shadow-sm)]',
          emphasized && !selected && 'border-[var(--brand-primary)]/40',
          className,
        )}
        data-package-id={pkg.id}
        data-analytics="package-card"
        data-selected={selected ? 'true' : 'false'}
      >
        {emphasized ? (
          <div className="absolute inset-x-0 top-0 h-1.5 bg-brand-gradient" aria-hidden="true" />
        ) : null}

        <CardHeader className="space-y-3 p-5 pb-2">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2">
              {platform ? (
                <span className="flex size-8 items-center justify-center rounded-lg bg-[var(--surface-muted)]">
                  <Image
                    src={PLATFORM_ICON[platform]}
                    alt=""
                    width={18}
                    height={18}
                    className="size-[18px]"
                    unoptimized
                  />
                </span>
              ) : null}
              {pkg.badge ? <PackageBadge badge={pkg.badge} /> : null}
            </div>
            {selected ? (
              <span className="inline-flex items-center gap-1 rounded-full bg-[var(--brand-accent-soft)] px-2.5 py-1 text-[10px] font-bold tracking-wide text-[var(--brand-primary)] uppercase">
                <Check className="size-3" aria-hidden="true" />
                Selected
              </span>
            ) : null}
          </div>

          <div>
            <p className="text-4xl font-bold tracking-tight text-[var(--text-primary)] sm:text-5xl">
              {quantityText}
            </p>
            <p className="mt-1 break-words text-sm font-medium text-[var(--text-secondary)]">
              {pkg.packageName || pkg.title}
            </p>
          </div>

          <PriceDisplay
            price={pkg.price}
            currency={pkg.currency}
            compareAtPrice={pkg.compareAtPrice}
            className="[&_p]:text-3xl [&_p]:font-bold [&_p]:text-[var(--brand-primary)] sm:[&_p]:text-4xl"
          />

          <div className="flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--surface-muted)] px-2.5 py-1 text-xs font-medium text-[var(--text-secondary)]">
              <Clock3 className="size-3.5 text-[var(--brand-primary)]" aria-hidden="true" />
              {pkg.deliveryTime ? (
                <DeliveryEstimate deliveryTime={pkg.deliveryTime} className="text-xs text-inherit" />
              ) : (
                <span>Estimate confirmed before checkout</span>
              )}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--surface-muted)] px-2.5 py-1 text-xs font-medium text-[var(--text-secondary)]">
              Gradual delivery (eligible)
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--brand-accent-soft)] px-2.5 py-1 text-xs font-semibold text-[var(--brand-primary)]">
              <RefreshCw className="size-3.5" aria-hidden="true" />
              {hasRefill ? 'Refill eligible' : 'Refill terms before checkout'}
            </span>
          </div>

          {pkg.commentType ? (
            <p className="text-sm text-[var(--text-secondary)]">Type: {pkg.commentType}</p>
          ) : null}
        </CardHeader>

        <CardContent className="flex-1 px-5 py-2">
          {pkg.features.length > 0 ? (
            <PackageFeatures
              features={pkg.features}
              className="space-y-2 text-sm [&_li]:flex [&_li]:items-start [&_li]:gap-2"
            />
          ) : (
            <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
              <li className="flex items-start gap-2">
                <Check className="mt-0.5 size-4 shrink-0 text-[var(--brand-primary)]" aria-hidden="true" />
                Public profile only — no password
              </li>
              <li className="flex items-start gap-2">
                <Check className="mt-0.5 size-4 shrink-0 text-[var(--brand-primary)]" aria-hidden="true" />
                Track your order by email
              </li>
            </ul>
          )}
        </CardContent>

        <CardFooter className="p-5 pt-3" onClick={(e) => e.stopPropagation()}>
          <PricingCTA
            cta={model.primaryCta}
            packageId={pkg.id}
            emphasized={emphasized || selected}
            onSelect={onSelect}
            className={cn(
              'min-h-12 w-full rounded-xl text-base font-semibold transition-transform duration-200 group-hover:scale-[1.01]',
              selected || emphasized
                ? 'bg-[var(--brand-primary)] hover:bg-[var(--brand-primary-hover)]'
                : 'bg-[var(--brand-secondary)] hover:bg-black',
            )}
          />
        </CardFooter>
      </Card>
    </div>
  );
}
