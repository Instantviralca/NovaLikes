'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useCallback, useId, useMemo, useState, type KeyboardEvent } from 'react';

import { PricingGrid } from '@/components/commerce/pricing/pricing-grid';
import type { PricingCardModel } from '@/components/commerce/pricing/types';
import { Container } from '@/components/layout/container';
import { HomeTtSectionHead } from '@/components/marketing/home-tiktok/section-head';
import { HOME_TT, type TikTokServiceKey } from '@/data/content/home-tiktok-v2';
import { getPlatformById } from '@/data/platforms';
import { ENGLISH_UI } from '@/lib/i18n/content/ui-english';
import {
  defaultSelectedPackageId,
  formatPackagePrice,
  TIKTOK_SERVICE_SLUGS,
} from '@/lib/marketing/home-tiktok/packages';
import { findPackage } from '@/lib/pricing';
import { cn } from '@/lib/utils';
import type { PricingPackage } from '@/types/pricing';
import type { Service } from '@/types/service';

const TAB_KEYS: TikTokServiceKey[] = ['followers', 'likes', 'views'];

const PackageOrderDialog = dynamic(
  () =>
    import('@/components/commerce/order-configuration/package-order-dialog').then((mod) => ({
      default: mod.PackageOrderDialog,
    })),
  { ssr: false },
);

function toCardModels(packages: PricingPackage[], href: string): PricingCardModel[] {
  return packages.map((pkg) => ({
    package: pkg,
    priceDisplay: formatPackagePrice(pkg),
    compareAtDisplay:
      pkg.compareAtPrice !== undefined && pkg.compareAtPrice > pkg.price
        ? formatPackagePrice({ ...pkg, price: pkg.compareAtPrice })
        : undefined,
    badgeLabel: pkg.badge,
    primaryCta: { label: ENGLISH_UI.commerce.addToCart, href },
  }));
}

function summaryBenefitsFor(service: TikTokServiceKey): string[] {
  const c = ENGLISH_UI.commerce;
  if (service === 'followers') {
    return [c.publicUsernameOnly, c.noPassword, c.secureCheckout];
  }
  return [c.publicVideoLinkOnly, c.noPassword, c.secureCheckout];
}

export function HomeTikTokPackages({
  packagesByTab,
  servicesByTab,
}: {
  packagesByTab: Record<TikTokServiceKey, PricingPackage[]>;
  servicesByTab: Record<TikTokServiceKey, Service>;
}) {
  const { packages: copy } = HOME_TT;
  const baseId = useId();
  const [active, setActive] = useState<TikTokServiceKey>('followers');
  const [selectedByTab, setSelectedByTab] = useState<Record<TikTokServiceKey, string | null>>(
    () => ({
      followers: defaultSelectedPackageId(packagesByTab.followers),
      likes: defaultSelectedPackageId(packagesByTab.likes),
      views: defaultSelectedPackageId(packagesByTab.views),
    }),
  );
  const [orderOpen, setOrderOpen] = useState(false);
  const [dialogRequested, setDialogRequested] = useState(false);
  const [dialogService, setDialogService] = useState<Service | null>(null);
  const [dialogPackage, setDialogPackage] = useState<PricingPackage | null>(null);

  const modelsByTab = useMemo(() => {
    const out = {} as Record<TikTokServiceKey, PricingCardModel[]>;
    for (const key of TAB_KEYS) {
      out[key] = toCardModels(packagesByTab[key], copy.tabs[key].href);
    }
    return out;
  }, [packagesByTab, copy.tabs]);

  const onKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      const idx = TAB_KEYS.indexOf(active);
      if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
        event.preventDefault();
        setActive(TAB_KEYS[(idx + 1) % TAB_KEYS.length]!);
      } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
        event.preventDefault();
        setActive(TAB_KEYS[(idx - 1 + TAB_KEYS.length) % TAB_KEYS.length]!);
      } else if (event.key === 'Home') {
        event.preventDefault();
        setActive(TAB_KEYS[0]!);
      } else if (event.key === 'End') {
        event.preventDefault();
        setActive(TAB_KEYS[TAB_KEYS.length - 1]!);
      }
    },
    [active],
  );

  const openOrder = (key: TikTokServiceKey, packageId: string) => {
    const pkg = findPackage(packageId) ?? null;
    const service = servicesByTab[key];
    if (!pkg || !service) return;
    setSelectedByTab((prev) => ({ ...prev, [key]: packageId }));
    setDialogService(service);
    setDialogPackage(pkg);
    setDialogRequested(true);
    setOrderOpen(true);
  };

  return (
    <section
      id={copy.id}
      className="bg-white py-14 md:py-18 lg:py-20"
      aria-labelledby={`${baseId}-title`}
    >
      <Container size="xl">
        <HomeTtSectionHead
          eyebrow={copy.eyebrow}
          title={copy.title}
          subtitle={copy.subtitle}
          titleId={`${baseId}-title`}
        />

        <div
          role="tablist"
          aria-label="TikTok packages"
          className="mt-8 flex flex-wrap justify-center gap-2"
          onKeyDown={onKeyDown}
        >
          {TAB_KEYS.map((key) => {
            const selected = active === key;
            return (
              <button
                key={key}
                type="button"
                role="tab"
                className="tt-tab"
                id={`${baseId}-tab-${key}`}
                aria-selected={selected}
                aria-controls={`${baseId}-panel-${key}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActive(key)}
              >
                {copy.tabs[key].label}
              </button>
            );
          })}
        </div>

        {TAB_KEYS.map((key) => {
          const tab = copy.tabs[key];
          const hidden = active !== key;
          const service = servicesByTab[key];
          const serviceName =
            `${getPlatformById(service.platform)?.name ?? 'TikTok'} ${service.shortName}`.trim();
          return (
            <div
              key={key}
              role="tabpanel"
              id={`${baseId}-panel-${key}`}
              aria-labelledby={`${baseId}-tab-${key}`}
              hidden={hidden}
              className={cn('mt-8', hidden && 'hidden')}
              data-service-slug={TIKTOK_SERVICE_SLUGS[key]}
            >
              <div className="tt-card mx-auto max-w-[760px] space-y-5 p-5 sm:p-7">
                <p className="text-center text-sm tt-body">{tab.note}</p>
                <PricingGrid
                  packages={modelsByTab[key]}
                  selectedPackageId={selectedByTab[key]}
                  onSelect={(id) =>
                    setSelectedByTab((prev) => ({
                      ...prev,
                      [key]: id,
                    }))
                  }
                  onContinue={(id) => openOrder(key, id)}
                  platformId="tiktok"
                  serviceName={serviceName}
                  summaryBenefits={summaryBenefitsFor(key)}
                />
              </div>
              <div className="mt-6 text-center">
                <Link
                  href={tab.href}
                  className="text-sm font-semibold text-[var(--nl-orange)] underline-offset-4 hover:underline"
                >
                  {tab.seeAll}
                </Link>
              </div>
            </div>
          );
        })}
      </Container>

      {dialogRequested && dialogService ? (
        <PackageOrderDialog
          open={orderOpen}
          onOpenChange={setOrderOpen}
          service={dialogService}
          selectedPackage={dialogPackage}
        />
      ) : null}
    </section>
  );
}
