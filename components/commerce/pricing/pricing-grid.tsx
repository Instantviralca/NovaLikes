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
import type { PackageBadgeId, PricingPackage } from '@/types/pricing';

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

/**
 * Display-only list price for IG/TT tiles when catalog has no compareAt.
 * ~23% off list (Buzzoid-like), rounded to x.99. Never invents checkout/SEO prices.
 */
function resolveDisplayCompareAt(
  pkg: PricingPackage,
  platformId?: string,
): number | undefined {
  if (pkg.compareAtPrice && pkg.compareAtPrice > pkg.price) {
    return pkg.compareAtPrice;
  }
  if (platformId !== 'instagram' && platformId !== 'tiktok') return undefined;
  const list = Math.round(pkg.price / 0.77);
  const rounded = Math.ceil(list / 100) * 100 - 1;
  return rounded > pkg.price ? rounded : undefined;
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
          <Skeleton key={i} className="h-[5.5rem] w-full rounded-xl" />
        ))}
      </div>
      <Skeleton className="h-36 w-full rounded-2xl" />
    </div>
  );
}

/**
 * Package quantity chips + selected package summary.
 * IG/TT: tile shows sale + strikethrough list price; selection animates like Buzzoid.
 */
export function PricingGrid({
  packages,
  onSelect,
  onContinue,
  className,
  loading,
  selectedPackageId,
  platformId,
  serviceName,
  summaryBenefits,
  infoPills,
}: PricingGridProps) {
  const { locale, ui } = useI18nChrome();
  const buzzoidStyle = platformId === 'instagram' || platformId === 'tiktok';

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
  const [priceAnimKey, setPriceAnimKey] = useState(0);

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

  useEffect(() => {
    if (!activeId) return;
    setPriceAnimKey((k) => k + 1);
  }, [activeId]);

  if (loading) return <PricingSkeletonCompact />;
  if (packages.length === 0) return null;

  const activeCompare = active
    ? resolveDisplayCompareAt(active.package, platformId)
    : undefined;
  const saveAmount =
    activeCompare && active && activeCompare > active.package.price
      ? activeCompare - active.package.price
      : null;

  const packageTitle = active
    ? [
        formatQuantityShort(active.package.quantity),
        active.package.commentType ?? '',
        localizePackageDisplayName(serviceName || active.package.title, locale),
      ]
        .filter(Boolean)
        .join(' ')
    : '';

  return (
    <div className={cn('mx-auto w-full space-y-5', className)} data-analytics="pricing-grid-compact">
      {hasTier ? (
        <div
          className="flex w-full rounded-xl border border-[var(--nl-border)] bg-white p-1"
          role="tablist"
          aria-label={ui.commerce.packageQualityAria}
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
                  'flex-1 rounded-xl px-3 py-2.5 text-sm font-semibold transition-all duration-200',
                  selected
                    ? 'bg-nl-grad text-white shadow-sm'
                    : 'text-[var(--nl-muted)] hover:bg-[var(--nl-bg-soft)]',
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
        aria-label={ui.commerce.packageQuantitiesAria}
      >
        {visiblePackages.map((model) => {
          const pkg = model.package;
          const selected = pkg.id === activeId;
          const badge = resolveChipBadge(model, visiblePackages);
          const compareAt = resolveDisplayCompareAt(pkg, platformId);
          const showPrices = buzzoidStyle || Boolean(compareAt);

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
                'pkg-tile relative flex min-h-[5.25rem] flex-col items-center justify-center gap-0.5 rounded-xl border px-2 py-3 text-center',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:rgb(249_115_22_/_0.4)] focus-visible:ring-offset-2',
                buzzoidStyle
                  ? cn('pkg-tile--tactile', selected && 'pkg-tile-selected')
                  : cn(
                      'transition-all duration-200 ease-out',
                      selected
                        ? 'pkg-tile-selected'
                        : 'border-[var(--nl-border)] bg-white text-[var(--nl-ink)] hover:border-[var(--nl-orange)]',
                    ),
              )}
            >
              {badge ? (
                <span
                  className={cn(
                    'absolute -top-2 left-2 z-10 rounded px-1.5 py-0.5 text-[9px] font-bold tracking-wide text-white uppercase',
                    badge === 'best-value'
                      ? 'bg-[var(--nl-orange)]'
                      : 'bg-emerald-500',
                  )}
                >
                  {badge === 'most-popular' || badge === 'recommended'
                    ? ui.commerce.bestSelling
                    : badge === 'best-value'
                      ? `${ui.commerce.bestValue}`
                      : getBadgeLabel(badge)}
                </span>
              ) : null}
              <span
                className={cn(
                  'text-lg font-bold tracking-tight sm:text-xl',
                  selected && buzzoidStyle ? 'text-white' : undefined,
                )}
              >
                {formatQuantityShort(pkg.quantity)}
              </span>
              {showPrices ? (
                <>
                  <span
                    className={cn(
                      'text-sm font-bold tabular-nums',
                      selected
                        ? buzzoidStyle
                          ? 'text-white'
                          : 'text-[var(--nl-orange)]'
                        : 'text-[var(--nl-orange)]',
                    )}
                  >
                    {formatMoney(pkg.price, pkg.currency)}
                  </span>
                  {compareAt ? (
                    <span
                      className={cn(
                        'text-[11px] tabular-nums line-through',
                        selected && buzzoidStyle
                          ? 'text-white/70'
                          : 'text-[var(--nl-muted)]',
                      )}
                    >
                      {formatMoney(compareAt, pkg.currency)}
                    </span>
                  ) : null}
                </>
              ) : null}
            </button>
          );
        })}
      </div>

      {active ? (
        <div className="space-y-4 pt-1 text-center" data-analytics="package-summary">
          <div className="space-y-1.5">
            <p className="text-xl font-bold tracking-tight text-[var(--text-primary)] sm:text-2xl">
              {packageTitle}
            </p>
            <div
              key={priceAnimKey}
              className={cn(
                'space-y-1.5',
                buzzoidStyle && 'animate-pkg-summary-pop',
              )}
            >
              <div className="flex flex-wrap items-baseline justify-center gap-2.5">
                <p className="text-3xl font-bold tracking-tight text-[var(--text-primary)] sm:text-4xl">
                  {formatMoney(active.package.price, active.package.currency)}
                </p>
                {activeCompare ? (
                  <span className="text-base text-[var(--text-muted)] line-through">
                    {formatMoney(activeCompare, active.package.currency)}
                  </span>
                ) : null}
              </div>
              {saveAmount ? (
                <p className="flex flex-wrap items-center justify-center gap-2 text-sm font-semibold text-emerald-600">
                  <span className="inline-flex size-5 items-center justify-center rounded-full bg-emerald-500 text-[10px] font-bold text-white">
                    %
                  </span>
                  <span>
                    {ui.commerce.youSave}{' '}
                    {formatMoney(saveAmount, active.package.currency)}
                  </span>
                </p>
              ) : null}
            </div>

            {summaryBenefits && summaryBenefits.length > 0 ? (
              <p className="text-sm text-[var(--text-secondary)]">
                {summaryBenefits.slice(0, 3).join(' · ')}
              </p>
            ) : null}
            {infoPills && infoPills.length > 0 ? (
              <ul className="flex flex-wrap justify-center gap-1.5 pt-1">
                {infoPills.map((pill) => (
                  <li
                    key={pill}
                    className="rounded-full border border-[var(--nl-border)] bg-[var(--nl-bg-soft)] px-2.5 py-1 text-[11px] font-medium text-[var(--text-secondary)]"
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
              className="min-h-12 w-full rounded-xl bg-nl-grad text-sm font-bold tracking-wide text-white uppercase shadow-[var(--shadow-glow)] transition-transform duration-200 hover:scale-[1.01] hover:opacity-95 active:scale-[0.99]"
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}
