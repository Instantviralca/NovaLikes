'use client';

import dynamic from 'next/dynamic';
import { useEffect, useMemo, useState } from 'react';

import type { PricingCardModel } from '@/components/commerce/pricing/types';
import { SvcV1Icon } from '@/components/marketing/service-v1/icons';
import { V1StickyCta } from '@/components/marketing/service-v1/v1-sticky-cta';
import type { IgFollowersV2 } from '@/data/content/service-v1/instagram-followers-v2';
import { getServicePageAnalytics } from '@/lib/analytics';
import { emitLegacyAnalyticsEvent } from '@/lib/analytics/core/bridge';
import { formatQuantityShort } from '@/lib/marketing/service-hero';
import { runWhenIdle } from '@/lib/perf/run-when-idle';
import { findPackage } from '@/lib/pricing';
import { formatMoney } from '@/lib/pricing/format';
import type { PricingPackage } from '@/types/pricing';
import type { Service } from '@/types/service';

type PickerCopy = IgFollowersV2['picker'];

type V1PackagePickerProps = {
  service: Service;
  packages: PricingCardModel[];
  copy: PickerCopy;
  stickyLabel: string;
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
  if (badge === 'most-popular' || badge === 'recommended') {
    return model.badgeLabel && !['Most Popular', 'Recommended'].includes(model.badgeLabel)
      ? model.badgeLabel
      : 'Best selling';
  }
  if (badge === 'best-value') {
    return model.badgeLabel && model.badgeLabel !== 'Best Value'
      ? model.badgeLabel
      : 'Best deal';
  }
  return model.badgeLabel ?? badge;
}

/** Badge colour by displayed text (Best selling/Most popular → green; Best deal/Best value → orange). */
function badgeClassName(label: string): string {
  const lower = label.toLowerCase();
  if (lower.includes('best deal') || lower.includes('best value')) {
    return 'pk-badge deal';
  }
  return 'pk-badge';
}

function defaultSelectedId(packages: PricingCardModel[]): string | null {
  return (
    packages.find((p) => p.package.badge)?.package.id ?? packages[0]?.package.id ?? null
  );
}

/**
 * Package radiogroup + summary + Add to Cart. Commerce flow matches ServiceCommerceBlocks
 * (analytics + PackageOrderDialog) without importing that component.
 */
export function V1PackagePicker({
  service,
  packages,
  copy,
  stickyLabel,
}: V1PackagePickerProps) {
  const [selectedId, setSelectedId] = useState<string | null>(() =>
    defaultSelectedId(packages),
  );
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

  const selectedModel = useMemo(
    () => packages.find((p) => p.package.id === selectedId) ?? packages[0] ?? null,
    [packages, selectedId],
  );

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
  const summaryName = copy.summaryName.replace('{quantity}', qtyLabel);

  return (
    <>
      <div className="picker" id={copy.id}>
        <div className="pk-head">
          <h2 className="pk-title">{copy.title}</h2>
          <p className="pk-intro">{copy.intro}</p>
        </div>

        <div className="pk-grid" role="radiogroup" aria-label="Follower packages">
          {packages.map((model, index) => {
            const pkg = model.package;
            const checked = pkg.id === (selectedId ?? packages[0]?.package.id);
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
                  const next = packages[(index + d + packages.length) % packages.length];
                  if (!next) return;
                  handleSelect(next.package.id);
                  requestAnimationFrame(() => {
                    const tiles = document.querySelectorAll<HTMLElement>('.pk-tile');
                    tiles[(index + d + packages.length) % packages.length]?.focus();
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
              if (selectedId) handleContinue(selectedId);
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
        hasSelection={Boolean(selectedId)}
        onOrder={selectedId ? () => handleContinue(selectedId) : undefined}
      />

      {dialogRequested ? (
        <PackageOrderDialog
          open={orderOpen}
          onOpenChange={setOrderOpen}
          service={service}
          selectedPackage={selectedPackage ?? findPackage(selectedId ?? '') ?? null}
        />
      ) : null}

      <div id="order-configuration" className="sr-only" aria-hidden="true" />
    </>
  );
}
