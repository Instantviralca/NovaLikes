import Image from 'next/image';
import Link from 'next/link';
import { ShieldCheck, UserPlus } from 'lucide-react';

import { HeroFloatCard } from '@/components/design-system/hero-float-card';
import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { Breadcrumb } from '@/components/navigation/breadcrumb';
import { Eyebrow } from '@/components/typography/eyebrow';
import { GradientTitleParts } from '@/components/typography/gradient-heading';
import { Button } from '@/components/ui/button';
import {
  HERO_NOTE,
  HERO_SAFE_CARD,
  type HeroRewrite,
} from '@/data/content/service-hero-rewrites';
import { formatMoney } from '@/lib/pricing/format';
import {
  formatQuantityShort,
  getServiceFeaturedPackage,
  resolveHeroSubtitle,
} from '@/lib/marketing/service-hero';
import { cn } from '@/lib/utils';
import type { CtaProps } from '@/types/components';
import type { HeroVisualContent } from '@/types/content';
import type { BreadcrumbItem } from '@/types/shared';

export type ServiceHeroEnglishV2Props = {
  rewrite: HeroRewrite;
  serviceSlug: string;
  breadcrumbs?: BreadcrumbItem[];
  visual?: HeroVisualContent;
  primaryHref: string;
  secondaryHref: string;
  className?: string;
};

export function ServiceHeroEnglishV2({
  rewrite,
  serviceSlug,
  breadcrumbs,
  visual,
  primaryHref,
  secondaryHref,
  className,
}: ServiceHeroEnglishV2Props) {
  const subtitle = resolveHeroSubtitle(rewrite.subtitle, serviceSlug);
  const featured = getServiceFeaturedPackage(serviceSlug);
  const popularLabel = featured
    ? `${formatQuantityShort(featured.quantity)} ${rewrite.floatingUnit}`
    : null;
  const popularPrice = featured
    ? `from ${formatMoney(featured.price, featured.currency)}`
    : null;

  const primaryCta: CtaProps = { label: rewrite.primaryCta, href: primaryHref };
  const secondaryCta: CtaProps = {
    label: rewrite.secondaryCta,
    href: secondaryHref,
  };

  return (
    <Section
      spacing="lg"
      className={cn('relative overflow-x-clip bg-[var(--nl-bg)]', className)}
      aria-label="Page hero"
      data-hero-v2={serviceSlug}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 50% 45% at 90% 10%, rgb(249 115 22 / 0.1), transparent 70%), radial-gradient(ellipse 40% 40% at 10% 80%, rgb(236 72 153 / 0.08), transparent 70%)',
        }}
        aria-hidden="true"
      />
      <Container className="relative">
        <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.15fr)] lg:gap-10">
          <div className="space-y-4">
            {breadcrumbs && breadcrumbs.length > 0 ? (
              <Breadcrumb items={breadcrumbs} variant="subtle" />
            ) : null}
            <Eyebrow className="text-[var(--nl-orange)]">{rewrite.eyebrow}</Eyebrow>
            <GradientTitleParts
              as="h1"
              lead={rewrite.title.lead}
              highlight={rewrite.title.highlight}
              tail={rewrite.title.tail}
              className="max-w-[22ch] text-balance text-[clamp(1.85rem,1.25rem+1.5vw,2.6rem)] font-bold tracking-tight text-[var(--nl-ink)]"
            />
            {subtitle ? (
              <p className="max-w-md text-pretty text-base leading-relaxed text-[var(--nl-body)] sm:text-lg">
                {subtitle}
              </p>
            ) : null}
            <div className="flex w-full flex-col gap-3 pt-2 sm:flex-row sm:flex-wrap">
              <Button
                asChild
                variant="primary"
                size="lg"
                className="min-h-12 w-full px-8 text-base sm:w-auto"
              >
                <Link href={primaryCta.href}>{primaryCta.label}</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="min-h-12 w-full px-8 text-base sm:w-auto"
              >
                <Link href={secondaryCta.href}>{secondaryCta.label}</Link>
              </Button>
            </div>
            <p className="text-sm text-[var(--nl-muted)]">{HERO_NOTE}</p>
          </div>

          {visual ? (
            <div className="relative mx-auto w-full max-w-[27rem] lg:mx-0 lg:justify-self-end">
              <div className="relative overflow-hidden rounded-2xl border border-[var(--nl-border)] bg-[var(--nl-bg-soft)] shadow-sm">
                <Image
                  src={visual.src}
                  alt={visual.alt}
                  width={visual.width}
                  height={visual.height}
                  priority
                  className="h-auto w-full object-contain"
                  sizes="(max-width: 1024px) 90vw, 432px"
                />
                {/* Desktop floats inside frame */}
                <div className="pointer-events-none absolute inset-0 hidden lg:block" aria-hidden>
                  {popularLabel && popularPrice ? (
                    <HeroFloatCard
                      label={popularLabel}
                      value={popularPrice}
                      Icon={UserPlus}
                      className="hero-float absolute left-3 top-4 z-[2] max-w-[11.5rem]"
                    />
                  ) : null}
                  <HeroFloatCard
                    label={HERO_SAFE_CARD.label}
                    value={HERO_SAFE_CARD.value}
                    Icon={ShieldCheck}
                    className="hero-float hero-float-delay absolute bottom-4 right-3 z-[2] max-w-[10.5rem]"
                  />
                </div>
              </div>
              {/* Mobile: cards below image, clear of WhatsApp */}
              <div className="mt-3 grid grid-cols-2 gap-3 pb-16 lg:hidden">
                {popularLabel && popularPrice ? (
                  <HeroFloatCard
                    label={popularLabel}
                    value={popularPrice}
                    Icon={UserPlus}
                  />
                ) : null}
                <HeroFloatCard
                  label={HERO_SAFE_CARD.label}
                  value={HERO_SAFE_CARD.value}
                  Icon={ShieldCheck}
                />
              </div>
            </div>
          ) : null}
        </div>
      </Container>
    </Section>
  );
}
