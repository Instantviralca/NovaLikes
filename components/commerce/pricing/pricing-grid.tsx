'use client';

import { useEffect, useMemo, useState } from 'react';

import { useI18nChrome } from '@/components/i18n/i18n-chrome';
import { PricingCTA } from '@/components/commerce/pricing/pricing-cta';
import type { PricingCardModel, PricingGridProps } from '@/components/commerce/pricing/types';
import { Skeleton } from '@/components/ui/skeleton';
import { getBadgeLabel } from '@/data/pricing/badges';
import { localizePackageDisplayName } from '@/lib/i18n/es-visible-display';
import { formatMoney } from '@/lib/pricing/format';
import { cn } from '@/lib/utils';
import type { PackageBadgeId } from '@/types/pricing';

function formatQuantityShort(quantity: number): string {
  if (quantity >= 1000 && quantity % 1000 === 0) {
    return `${quantity / 1000}K`;
  }
  if (quantity >= 1000) {
    const k = quantity / 1000;
    return `${Number.isInteger(k) ? k : k.toFixed(1).replace(/\.0$/, '')}K`;
  }
  return new Intl.NumberFormat('en-US').format(quantity);
}

function resolveChipBadge(
  model: PricingCardModel,
  packages: PricingCardModel[],
): PackageBadgeId | undefined {
  if (model.package.badge) return model.package.badge;

  const featured = packages.find(
    (item) =>
      item.package.badge === 'most-popular' ||
      item.package.badge === 'best-value' ||
      item.package.badge === 'recommended',
  );
  if (featured?.package.id === model.package.id) return featured.package.badge;

  return undefined;
}

function PricingSkeletonCompact() {
  return (
    <div className="w-full space-y-5" aria-busy="true" aria-label="Loading packages">
      <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 md:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <Skeleton key={i} className="h-[4.5rem] w-full rounded-xl" />
        ))}
      </div>
      <Skeleton className="h-36 w-full rounded-2xl" />
    </div>
  );
}

/**
 * Package quantity chips + selected package summary.
 * Flat layout — no scale / glow / price-pop animations.
 */
export function PricingGrid({
  packages,
  onSelect,
  onContinue,
  className,
  loading,
  selectedPackageId,
  serviceName,
  summaryBenefits,
  infoPills,
}: PricingGridProps) {
  const { locale, ui } = useI18nChrome();
  const commentTiers = useMemo(() => {
    const tiers = [
      ...new Set(
        packages
          .map((model) => model.package.commentType)
          .filter((tier): tier is string => Boolean(tier)),
      ),
    ];
    const preferred = ['High Quality', 'Premium'];
    return tiers.sort((a, b) => {
      const ai = preferred.indexOf(a);
      const bi = preferred.indexOf(b);
      if (ai === -1 && bi === -1) return a.localeCompare(b);
      if (ai === -1) return 1;
      if (bi === -1) return -1;
      return ai - bi;
    });
  }, [packages]);

  const hasTier = commentTiers.length > 1;
  const [activeTier, setActiveTier] = useState<string | null>(null);

  useEffect(() => {
    if (!hasTier) {
      setActiveTier(null);
      return;
    }
    setActiveTier((current) =>
      current && commentTiers.includes(current) ? current : commentTiers[0],
    );
  }, [hasTier, commentTiers]);

  const visiblePackages = useMemo(() => {
    if (!hasTier || !activeTier) return packages;
    return packages.filter((model) => model.package.commentType === activeTier);
  }, [packages, hasTier, activeTier]);

  const popularId = useMemo(() => {
    const featured = visiblePackages.find(
      (m) =>
        m.package.badge === 'most-popular' ||
        m.package.badge === 'best-value' ||
        m.package.badge === 'recommended',
    );
    return featured?.package.id ?? visiblePackages[0]?.package.id;
  }, [visiblePackages]);

  const activeId =
    selectedPackageId && visiblePackages.some((m) => m.package.id === selectedPackageId)
      ? selectedPackageId
      : (popularId ?? null);
  const active = visiblePackages.find((m) => m.package.id === activeId) ?? visiblePackages[0];

  useEffect(() => {
    if (!hasTier || !activeTier || !popularId) return;
    if (selectedPackageId && visiblePackages.some((m) => m.package.id === selectedPackageId)) {
      return;
    }
    onSelect?.(popularId);
  }, [activeTier, hasTier, popularId, selectedPackageId, visiblePackages, onSelect]);

  if (loading) return <PricingSkeletonCompact />;
  if (packages.length === 0) return null;

  const saveAmount =
    active?.package.compareAtPrice && active.package.compareAtPrice > active.package.price
      ? active.package.compareAtPrice - active.package.price
      : null;

  const packageTitle = active
    ? [
        formatQuantityShort(active.package.quantity),
        active.package.commentType ?? '',
        localizePackageDisplayName(
          serviceName || active.package.title,
          locale,
        ),
      ]
        .filter(Boolean)
        .join(' ')
    : '';

  return (
    <div className={cn('mx-auto w-full space-y-5', className)} data-analytics="pricing-grid-compact">
      {hasTier ? (
        <div
          className="flex w-full rounded-xl border border-[var(--border-subtle)] bg-white p-1"
          role="tablist"
          aria-label="Package quality"
        >
          {commentTiers.map((tier) => {
            const selected = tier === activeTier;
            return (
              <button
                key={tier}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => setActiveTier(tier)}
                className={cn(
                  'flex-1 rounded-lg px-3 py-2.5 text-sm font-semibold',
                  selected
                    ? 'bg-[var(--brand-primary)] text-white'
                    : 'text-[var(--text-secondary)] hover:bg-[var(--surface-muted)]',
                )}
              >
                {tier}
              </button>
            );
          })}
        </div>
      ) : null}

      <div
        className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 md:grid-cols-4"
        role="listbox"
        aria-label="Package quantities"
      >
        {visiblePackages.map((model) => {
          const pkg = model.package;
          const selected = pkg.id === activeId;
          const badge = resolveChipBadge(model, visiblePackages);
          const offAmount =
            pkg.compareAtPrice && pkg.compareAtPrice > pkg.price
              ? pkg.compareAtPrice - pkg.price
              : null;

          return (
            <button
              key={pkg.id}
              type="button"
              role="option"
              aria-selected={selected}
              data-package-id={pkg.id}
              data-analytics="package-card"
              data-selected={selected ? 'true' : 'false'}
              onClick={() => onSelect?.(pkg.id)}
              className={cn(
                'relative flex min-h-[4.5rem] flex-col items-center justify-center gap-0.5 rounded-xl border px-2 py-3 text-center',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-primary)] focus-visible:ring-offset-2',
                selected
                  ? 'border-[var(--brand-primary)] bg-[var(--brand-primary)] text-white'
                  : 'border-[var(--border-subtle)] bg-white text-[var(--text-primary)] hover:border-[var(--brand-primary)]',
              )}
            >
              {badge ? (
                <span className="absolute -top-2 left-2 z-10 rounded px-1.5 py-0.5 text-[9px] font-bold tracking-wide text-white uppercase bg-emerald-500">
                  {badge === 'most-popular' || badge === 'recommended'
                    ? ui.commerce.bestSelling
                    : badge === 'best-value'
                      ? ui.commerce.bestValue
                      : getBadgeLabel(badge)}
                </span>
              ) : null}
              <span className="text-lg font-bold tracking-tight sm:text-xl">
                {formatQuantityShort(pkg.quantity)}
              </span>
              {offAmount ? (
                <span
                  className={cn(
                    'text-[11px] font-semibold',
                    selected ? 'text-white/95' : 'text-[var(--brand-primary)]',
                  )}
                >
                  {formatMoney(offAmount, pkg.currency)} {ui.commerce.off}
                </span>
              ) : null}
            </button>
          );
        })}
      </div>

      {active ? (
        <div className="space-y-4 pt-1" data-analytics="package-summary">
          <div className="space-y-1.5">
            <p className="text-xl font-bold tracking-tight text-[var(--text-primary)] sm:text-2xl">
              {packageTitle}
            </p>
            <div className="flex flex-wrap items-baseline gap-2.5">
              <p className="text-3xl font-bold tracking-tight text-[var(--text-primary)] sm:text-4xl">
                {formatMoney(active.package.price, active.package.currency)}
              </p>
              {active.package.compareAtPrice &&
              active.package.compareAtPrice > active.package.price ? (
                <span className="text-base text-[var(--text-muted)] line-through">
                  {formatMoney(active.package.compareAtPrice, active.package.currency)}
                </span>
              ) : null}
            </div>
            {summaryBenefits && summaryBenefits.length > 0 ? (
              <p className="text-sm text-[var(--text-secondary)]">
                {summaryBenefits.slice(0, 3).join(' · ')}
              </p>
            ) : null}
            {infoPills && infoPills.length > 0 ? (
              <ul className="flex flex-wrap gap-1.5 pt-1">
                {infoPills.map((pill) => (
                  <li
                    key={pill}
                    className="rounded-full border border-[var(--border-subtle)] bg-[var(--surface-muted)] px-2.5 py-1 text-[11px] font-medium text-[var(--text-secondary)]"
                  >
                    {pill}
                  </li>
                ))}
              </ul>
            ) : null}
          </div>

          <div className="w-full space-y-2">
            <PricingCTA
              cta={{
                ...active.primaryCta,
                label: ui.commerce.addToCart,
              }}
              packageId={active.package.id}
              emphasized
              onSelect={(id) => (onContinue ?? onSelect)?.(id)}
              className="min-h-12 w-full rounded-xl bg-[var(--brand-primary)] text-sm font-bold tracking-wide text-white uppercase hover:bg-[var(--brand-primary-hover)]"
            />
            {saveAmount ? (
              <p className="text-center text-sm font-semibold text-[var(--brand-primary)]">
                {ui.commerce.youSave} {formatMoney(saveAmount, active.package.currency)}
              </p>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}
