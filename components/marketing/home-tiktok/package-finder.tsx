'use client';

import Link from 'next/link';
import { Eye, Heart, UserPlus } from 'lucide-react';
import { useMemo, useState } from 'react';

import { Container } from '@/components/layout/container';
import { HomeTtSectionHead } from '@/components/marketing/home-tiktok/section-head';
import { HOME_TT, type TikTokServiceKey } from '@/data/content/home-tiktok-v2';
import {
  formatBandRange,
  getBandPackages,
  type AccountBand,
} from '@/lib/marketing/home-tiktok/bands';
import { TIKTOK_SERVICE_SLUGS } from '@/lib/marketing/home-tiktok/packages';
import { cn } from '@/lib/utils';
import type { PricingPackage } from '@/types/pricing';

type Step = 'service' | 'size' | 'result';

const SERVICE_ICONS = {
  followers: UserPlus,
  likes: Heart,
  views: Eye,
} as const;

export function HomeTikTokPackageFinder({
  packagesByService,
}: {
  packagesByService: Record<TikTokServiceKey, PricingPackage[]>;
}) {
  const { finder } = HOME_TT;
  const [step, setStep] = useState<Step>('service');
  const [service, setService] = useState<TikTokServiceKey | null>(null);
  const [size, setSize] = useState<AccountBand | null>(null);

  const band = useMemo(() => {
    if (!service || !size) return [];
    return getBandPackages(packagesByService[service], size);
  }, [packagesByService, service, size]);

  const reset = () => {
    setStep('service');
    setService(null);
    setSize(null);
  };

  const resultBody =
    service && size && band.length > 0
      ? finder.result.body
          .replace('{service}', HOME_TT.packages.tabs[service].label.toLowerCase())
          .replace('{range}', formatBandRange(band, finder.result.unit[service]))
      : '';

  const tip = service ? finder.result.tips[service] : null;
  const serviceHref = service ? `/${TIKTOK_SERVICE_SLUGS[service]}` : '/buy-tiktok-followers';
  const stepNum = step === 'service' ? 1 : 2;

  return (
    <section
      id={finder.id}
      className="tt-dark relative overflow-hidden py-14 md:py-18 lg:py-20"
      aria-labelledby="tt-finder-title"
    >
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          background:
            'radial-gradient(ellipse 40% 50% at 15% 20%, rgba(249,115,22,0.18), transparent), radial-gradient(ellipse 35% 45% at 85% 30%, rgba(236,72,153,0.14), transparent)',
        }}
      />
      <Container size="xl" className="relative">
        <HomeTtSectionHead
          eyebrow={finder.eyebrow}
          title={finder.title}
          subtitle={finder.subtitle}
          titleId="tt-finder-title"
          dark
        />

        <div className="tt-dark-panel mx-auto mt-10 w-full max-w-[880px] space-y-5 p-5 sm:p-7">
          {step !== 'result' ? (
            <p className="text-xs font-semibold uppercase tracking-wider text-white/55" aria-live="polite">
              {stepNum} / 2
            </p>
          ) : null}

          {step === 'service' ? (
            <fieldset className="space-y-3">
              <legend className="mb-1 text-sm font-semibold text-white">{finder.q1.label}</legend>
              <div className="grid gap-3 sm:grid-cols-3">
                {(Object.keys(finder.q1.options) as TikTokServiceKey[]).map((key) => {
                  const Icon = SERVICE_ICONS[key];
                  const selected = service === key;
                  return (
                    <button
                      key={key}
                      type="button"
                      className={cn('tt-finder-card', selected && 'tt-finder-card-selected')}
                      onClick={() => {
                        setService(key);
                        setSize(null);
                        setStep('size');
                      }}
                    >
                      <span className="tt-finder-card-icon">
                        <Icon className="size-5" aria-hidden />
                      </span>
                      <span className="text-sm font-semibold leading-snug">{finder.q1.options[key]}</span>
                    </button>
                  );
                })}
              </div>
            </fieldset>
          ) : null}

          {step === 'size' ? (
            <fieldset className="space-y-3">
              <legend className="mb-1 text-sm font-semibold text-white">{finder.q2.label}</legend>
              <div className="grid gap-3 sm:grid-cols-3">
                {(Object.keys(finder.q2.options) as AccountBand[]).map((key) => {
                  const selected = size === key;
                  return (
                    <button
                      key={key}
                      type="button"
                      className={cn('tt-finder-card', selected && 'tt-finder-card-selected')}
                      onClick={() => {
                        setSize(key);
                        setStep('result');
                      }}
                    >
                      <span className="text-sm font-semibold leading-snug">{finder.q2.options[key]}</span>
                    </button>
                  );
                })}
              </div>
            </fieldset>
          ) : null}

          {step === 'result' && service && tip ? (
            <div className="space-y-4 rounded-2xl bg-white p-5 text-[var(--nl-ink)]">
              <h3 className="text-lg font-bold">{finder.result.title}</h3>
              <p className="text-sm leading-relaxed text-[var(--nl-body)]">{resultBody}</p>
              <p className="text-sm text-[var(--nl-muted)]">{finder.result.note}</p>
              <p className="text-sm text-[var(--nl-muted)]">
                {tip.text}{' '}
                <Link
                  href={tip.href}
                  className="font-semibold text-[var(--nl-orange)] underline-offset-4 hover:underline"
                >
                  {tip.linkLabel}
                </Link>
              </p>
              <div className="flex flex-wrap gap-3 pt-1">
                <Link href={serviceHref} className="tt-btn-primary">
                  {finder.result.viewButton}
                </Link>
                <button type="button" className="tt-btn-secondary" onClick={reset}>
                  {finder.result.restart}
                </button>
              </div>
            </div>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
