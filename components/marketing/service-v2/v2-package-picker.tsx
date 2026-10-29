'use client';

import dynamic from 'next/dynamic';
import { useEffect, useMemo, useState } from 'react';

import type { PricingCardModel } from '@/components/commerce/pricing/types';
import { SvcV1Icon } from '@/components/marketing/service-v1/icons';
import { V1StickyCta } from '@/components/marketing/service-v1/v1-sticky-cta';
import type { ServiceV2Content } from '@/data/content/service-v2/types';
import { getBadgeLabel } from '@/data/pricing/badges';
import { getServicePageAnalytics } from '@/lib/analytics';
import { emitLegacyAnalyticsEvent } from '@/lib/analytics/core/bridge';
import { formatQuantityShort } from '@/lib/marketing/service-hero';
import { runWhenIdle } from '@/lib/perf/run-when-idle';
import { useI18nChrome } from '@/components/i18n/i18n-chrome';
import { findPackage } from '@/lib/pricing';
import { formatMoney } from '@/lib/pricing/format';
import type { PricingPackage } from '@/types/pricing';
import type { Service } from '@/types/service';

type PickerCopy = ServiceV2Content['picker'];

type V2PackagePickerProps = {
  service: Service;
  packages: PricingCardModel[];
  copy: PickerCopy;
  stickyLabel: string;
  serviceDisplayName?: string;
};

function OrderDialogFallback() {
  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-foreground/40 sm:items-center"
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <p className="sr-only">Loading order form</p>
      <div className="h-24 w-full max-w-lg rounded-t-2xl bg-background p-6 shadow-md sm:rounded-2xl">
        <p className="text-sm text-muted-foreground">Loading order details…</p>
      </div>
    </div>
  );
}

const PackageOrderDialog = dynamic(
  () =>
    import('@/components/commerce/order-configuration/package-order-dialog').then(
      (mod) => ({ default: mod.PackageOrderDialog }),
    ),
  { ssr: false, loading: () => <OrderDialogFallback /> },
);

function resolveBadgeLabel(model: PricingCardModel): string | null {
  const badge = model.package.badge;
  if (!badge) return null;
  return model.badgeLabel ?? getBadgeLabel(badge);
}

function badgeClassName(label: string): string {
  const lower = label.toLowerCase();
  if (lower.includes('best value') || lower.includes('best deal')) {
    return 'pk-badge deal';
  }
  return 'pk-badge';
}

function defaultIdForTier(packages: PricingCardModel[]): string | null {
  return (
    packages.find((p) => p.package.badge)?.package.id ?? packages[0]?.package.id ?? null
  );
}

/**
 * Package radiogroup + optional quality tiers + summary + Add to Cart.
 * Commerce flow matches ServiceCommerceBlocks (analytics + PackageOrderDialog).
 */
export function V2PackagePicker({
  service,
  packages,
  copy,
  stickyLabel,
  serviceDisplayName,
}: V2PackagePickerProps) {
  const { locale } = useI18nChrome();
  const usePickerSummaryInDialog =
    locale === 'de' || locale === 'es' || locale === 'fr' || locale === 'it';
  const tierDefs = copy.tiers ?? [];
  const hasTiers =
    tierDefs.length > 0 && packages.some((p) => Boolean(p.package.commentType));

  const [activeTier, setActiveTier] = useState<string>(() =>
    hasTiers ? (tierDefs[0]?.label ?? '') : '',
  );
  const [selectedId, setSelectedId] = useState<string | null>(() => {
    if (!hasTiers) return defaultIdForTier(packages);
    const firstTier = tierDefs[0]?.label;
    const inTier = packages.filter((p) => p.package.commentType === firstTier);
    return defaultIdForTier(inTier);
  });
  const [orderOpen, setOrderOpen] = useState(false);
  const [dialogRequested, setDialogRequested] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<PricingPackage | null>(null);
  const [priceBump, setPriceBump] = useState(false);

  useEffect(() => {
    const analytics = getServicePageAnalytics(service.slug);
    if (!analytics || packages.length === 0) return;
    return runWhenIdle(() => {
      analytics.viewPackages({ serviceSlug: service.slug });
      for (const model of packages) {
        analytics.packageImpression({
          packageId: model.package.id,
          serviceSlug: service.slug,
        });
      }
    });
  }, [packages, service.slug]);

  const visiblePackages = useMemo(() => {
    if (!hasTiers || !activeTier) return packages;
    return packages.filter((m) => m.package.commentType === activeTier);
  }, [packages, hasTiers, activeTier]);

  const selectedModel = useMemo(() => {
    const inVisible =
      visiblePackages.find((p) => p.package.id === selectedId) ?? null;
    return inVisible ?? visiblePackages[0] ?? null;
  }, [visiblePackages, selectedId]);

  const handleSelect = (packageId: string) => {
    setSelectedId(packageId);
    const pkg = findPackage(packageId) ?? null;
    setSelectedPackage(pkg);
    setPriceBump(false);
    requestAnimationFrame(() => setPriceBump(true));
    getServicePageAnalytics(service.slug)?.packageSelect({
      packageId,
      serviceSlug: service.slug,
    });
  };

  const handleTier = (tier: string) => {
    setActiveTier(tier);
    const inTier = packages.filter((p) => p.package.commentType === tier);
    const nextId = defaultIdForTier(inTier);
    if (nextId) handleSelect(nextId);
  };

  const handleContinue = (packageId: string) => {
    const pkg = findPackage(packageId) ?? null;
    setSelectedId(packageId);
    setSelectedPackage(pkg);
    getServicePageAnalytics(service.slug)?.packageSelect({
      packageId,
      serviceSlug: service.slug,
    });
    emitLegacyAnalyticsEvent('order_details_open', {
      packageId,
      serviceSlug: service.slug,
    });
    setDialogRequested(true);
    setOrderOpen(true);
  };

  const qtyLabel = selectedModel
    ? formatQuantityShort(selectedModel.package.quantity)
    : '';
  const priceLabel = selectedModel
    ? formatMoney(selectedModel.package.price, selectedModel.package.currency)
    : '';
  const compareAt = selectedModel?.package.compareAtPrice;
  const compareLabel =
    compareAt != null && selectedModel
      ? formatMoney(compareAt, selectedModel.package.currency)
      : null;
  const saveAmount =
    compareAt != null && selectedModel
      ? formatMoney(compareAt - selectedModel.package.price, selectedModel.package.currency)
      : null;
  const tierLabel = selectedModel?.package.commentType ?? activeTier ?? '';
  const summaryName = copy.summaryName
    .replace('{quantity}', qtyLabel)
    .replace('{tier}', tierLabel)
    .replace(/\s+/g, ' ')
    .trim();

  return (
    <>
      <div className="picker" id={copy.id}>
        <div className="pk-head">
          <h2 className="pk-title">{copy.title}</h2>
          <p className="pk-intro">{copy.intro}</p>
        </div>

        {hasTiers ? (
          <div className="pk-tiers" role="tablist" aria-label="Quality tier">
            {tierDefs.map((tier) => {
              const selected = tier.label === activeTier;
              return (
                <button
                  key={tier.label}
                  type="button"
                  role="tab"
                  className="pk-tier"
                  data-tier={tier.label}
                  aria-selected={selected}
                  onClick={() => handleTier(tier.label)}
                >
                  <b>{tier.label}</b>
                  <em>{tier.note}</em>
                </button>
              );
            })}
          </div>
        ) : null}

        <div
          className="pk-grid"
          role="radiogroup"
          aria-label={`${service.name} packages`}
        >
          {packages.map((model) => {
            const pkg = model.package;
            const tier = pkg.commentType ?? '';
            const hidden = hasTiers && tier !== activeTier;
            const checked = !hidden && pkg.id === (selectedModel?.package.id ?? null);
            const badge = pkg.badge;
            const label = badge ? resolveBadgeLabel(model) : null;
            return (
              <button
                key={pkg.id}
                type="button"
                role="radio"
                aria-checked={checked}
                tabIndex={checked ? 0 : -1}
                className="pk-tile"
                data-tier={tier}
                hidden={hidden || undefined}
                onClick={() => handleSelect(pkg.id)}
                onKeyDown={(event) => {
                  const d =
                    event.key === 'ArrowRight' || event.key === 'ArrowDown'
                      ? 1
                      : event.key === 'ArrowLeft' || event.key === 'ArrowUp'
                        ? -1
                        : 0;
                  if (!d) return;
                  event.preventDefault();
                  const vis = packages.filter(
                    (p) => !hasTiers || p.package.commentType === activeTier,
                  );
                  const cur = vis.findIndex((p) => p.package.id === pkg.id);
                  if (cur < 0) return;
                  const next = vis[(cur + d + vis.length) % vis.length];
                  if (!next) return;
                  handleSelect(next.package.id);
                  requestAnimationFrame(() => {
                    const tiles = document.querySelectorAll<HTMLElement>(
                      '.pk-tile:not([hidden])',
                    );
                    const focusIdx = vis.findIndex((p) => p.package.id === next.package.id);
                    tiles[focusIdx]?.focus();
                  });
                }}
              >
                {label ? <span className={badgeClassName(label)}>{label}</span> : null}
                <span className="pk-q">{formatQuantityShort(pkg.quantity)}</span>
                <span className="pk-pr">{formatMoney(pkg.price, pkg.currency)}</span>
                {pkg.compareAtPrice != null ? (
                  <s className="pk-cmp">
                    {formatMoney(pkg.compareAtPrice, pkg.currency)}
                  </s>
                ) : null}
              </button>
            );
          })}
        </div>

        <div className="pk-sum">
          <p className="pk-name">{summaryName}</p>
          <p className={priceBump ? 'pk-price bump' : 'pk-price'}>{priceLabel}</p>
          {compareLabel && saveAmount ? (
            <p className="pk-save">
              <s>{compareLabel}</s>
              <span>{copy.save}</span>
              <b className="save-chip">{saveAmount}</b>
            </p>
          ) : null}
          <button
            type="button"
            className="buy"
            onClick={() => {
              if (selectedModel) handleContinue(selectedModel.package.id);
            }}
          >
            <SvcV1Icon name="shopping-cart" />
            <span>{copy.cta}</span>
          </button>
          <p className="pk-fine">{copy.oneTime}</p>
          <p className="pk-fine pk-secure">
            <SvcV1Icon name="lock" />
            <span>{copy.secure}</span>
            {copy.methods.map((method) => (
              <span key={method} className="usd">
                {method}
              </span>
            ))}
          </p>
        </div>

        <ul className="pk-feats">
          {copy.features.map((feat) => (
            <li key={feat.title}>
              <SvcV1Icon name={feat.icon} />
              <span>
                <b>{feat.title}</b>
                <em>{feat.body}</em>
              </span>
            </li>
          ))}
        </ul>
      </div>

      <V1StickyCta
        label={stickyLabel}
        hasSelection={Boolean(selectedModel)}
        onOrder={
          selectedModel ? () => handleContinue(selectedModel.package.id) : undefined
        }
      />

      {dialogRequested ? (
        <PackageOrderDialog
          open={orderOpen}
          onOpenChange={setOrderOpen}
          service={service}
          serviceDisplayName={serviceDisplayName}
          pickerSummaryName={
            usePickerSummaryInDialog && summaryName ? summaryName : undefined
          }
          selectedPackage={
            selectedPackage ?? findPackage(selectedModel?.package.id ?? '') ?? null
          }
        />
      ) : null}

      <div id="order-configuration" className="sr-only" aria-hidden="true" />
    </>
  );
}
