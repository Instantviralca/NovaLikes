import {
  ClipboardList,
  Clock3,
  CreditCard,
  Eye,
  Headphones,
  Layers3,
  Link2,
  ListOrdered,
  Lock,
  Mail,
  MessageCircle,
  Monitor,
  Package,
  PackageCheck,
  RefreshCw,
  ShieldCheck,
  TrendingUp,
  Truck,
  UserRound,
  Users,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import Link from 'next/link';
import type { ReactNode } from 'react';

import { FeatureCard } from '@/components/cards/feature-card';
import { Container } from '@/components/layout/container';
import { Grid } from '@/components/layout/grid';
import { Section } from '@/components/layout/section';
import { FadeUp } from '@/components/motion/fade-up';
import { HoverLift } from '@/components/motion/hover-lift';
import { Heading } from '@/components/typography/heading';
import { MutedText } from '@/components/typography/muted-text';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { CtaProps, FeatureItem } from '@/types/components';

export type FeaturesProps = {
  id?: string;
  title?: string;
  description?: string;
  items: FeatureItem[];
  cta?: CtaProps;
  ariaLabel?: string;
  className?: string;
  /** Optional illustration beside the section intro (keeps card grid below). */
  visual?: ReactNode;
};

const DEFAULT_ICONS: LucideIcon[] = [
  Lock,
  Package,
  Truck,
  RefreshCw,
  ShieldCheck,
  Headphones,
];

function resolveFeatureIcon(title: string, fallback: LucideIcon): LucideIcon {
  const t = title.toLowerCase();
  if (t.includes('password') || t.includes('no password')) return Lock;
  if (t.includes('email')) return Mail;
  if (t.includes('username') || t.includes('public username')) return UserRound;
  if (t.includes('public channel information') || t.includes('public youtube channel'))
    return Link2;
  if (t.includes('publicly accessible channel')) return Eye;
  if (t.includes('clear package selection') || t.includes('selected subscriber package'))
    return Layers3;
  if (t.includes('customer assistance')) return MessageCircle;
  if (t.includes('delivery information')) return ListOrdered;
  if (
    t.includes('order tracking') ||
    t.includes('progress updates') ||
    t.includes('tracking screen')
  )
    return Monitor;
  if (t.includes('improve video visibility')) return Eye;
  if (t.includes('support social proof')) return TrendingUp;
  if (t.includes('track every order') || t.includes('progress tracking')) return Monitor;
  if (t.includes('canadian support')) return Headphones;
  if (t.includes('build community')) return Users;
  if (t.includes('improve credibility')) return ShieldCheck;
  if (t.includes('public facebook page') && !t.includes('url')) return Eye;
  if (t.includes('selected followers package')) return Layers3;
  if (t.includes('public video') && !t.includes('url')) return Eye;
  if (t.includes('selected views package')) return Layers3;
  if (t.includes('order review')) return ClipboardList;
  if (t.includes('delivery begins')) return Truck;
  if (t.includes('delivery complete') || t.includes('delivery completed'))
    return PackageCheck;
  if (
    t.includes('url') ||
    t.includes('link') ||
    t.includes('public video') ||
    t.includes('public post') ||
    t.includes('channel url')
  )
    return Link2;
  if (t.includes('public profile') || t.includes('public account')) return Eye;
  if (t.includes('relevant') || t.includes('comment')) return Package;
  if (t.includes('natural') || t.includes('gradual')) return Clock3;
  if (t.includes('package') || t.includes('option') || t.includes('selected package'))
    return Package;
  if (t.includes('delivery') || t.includes('estimate')) return Clock3;
  if (t.includes('track')) return Truck;
  if (t.includes('refill')) return RefreshCw;
  if (t.includes('refund') || t.includes('money-back') || t.includes('guarantee'))
    return ShieldCheck;
  if (t.includes('support') || t.includes('assistance')) return Headphones;
  if (t.includes('checkout') || t.includes('payment') || t.includes('secure payment'))
    return CreditCard;
  if (t.includes('creator') || t.includes('designed for')) return UserRound;
  return fallback;
}

export function Features({
  id,
  title,
  description,
  items,
  cta,
  ariaLabel = 'Features',
  className,
  visual,
}: FeaturesProps) {
  if (items.length === 0 && !title && !description && !visual) return null;

  return (
    <Section id={id} className={cn('bg-[var(--nl-bg-soft)]', className)} aria-label={ariaLabel}>
      <Container>
        {(title || description || visual) && (
          <div
            data-feature-intro
            className={cn(
              'mb-12 sm:mb-14',
              visual
                ? 'grid items-center gap-8 lg:grid-cols-2 lg:gap-12'
                : 'max-w-2xl space-y-5 sm:space-y-6',
            )}
          >
            <div className="max-w-2xl space-y-5 sm:space-y-6">
              {title ? (
                <Heading as="h2" size="h2">
                  {title}
                </Heading>
              ) : null}
              {description ? (
                <MutedText className="max-w-xl whitespace-pre-line text-base leading-relaxed">
                  {description}
                </MutedText>
              ) : null}
            </div>
            {visual ? (
              <div className="mx-auto w-full max-w-md lg:mx-0 lg:justify-self-end">{visual}</div>
            ) : null}
          </div>
        )}
        {items.length > 0 ? (
          <Grid cols={3} className="auto-rows-fr gap-4 sm:gap-5 md:gap-6 lg:gap-7">
            {items.map((item, index) => {
              const Fallback = DEFAULT_ICONS[index % DEFAULT_ICONS.length];
              const Icon = resolveFeatureIcon(item.title, Fallback);
              return (
                <FadeUp key={item.id} delay={0.04 * index} className="h-full min-h-0">
                  <HoverLift className="h-full">
                    <FeatureCard
                      className="group flex h-full min-h-[15rem] flex-col border-[var(--nl-border)] shadow-[0_12px_28px_-22px_rgba(28,25,23,0.26)] transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1.5 hover:border-[color-mix(in_srgb,var(--brand-primary)_28%,var(--nl-border))] hover:shadow-[0_22px_48px_-24px_rgba(28,25,23,0.36)] motion-reduce:hover:translate-y-0 sm:min-h-[15.75rem]"
                      title={item.title}
                      description={item.description}
                      icon={
                        item.icon ?? (
                          <span className="flex size-[3.25rem] items-center justify-center rounded-full bg-[linear-gradient(145deg,var(--brand-primary)_0%,#ea580c_100%)] text-white shadow-[0_12px_24px_-14px_rgba(249,115,22,0.7)] transition-transform duration-300 group-hover:scale-105 motion-safe:group-hover:animate-iv-icon-bob">
                            <Icon className="size-6" aria-hidden />
                          </span>
                        )
                      }
                    />
                  </HoverLift>
                </FadeUp>
              );
            })}
          </Grid>
        ) : null}
        {cta ? (
          <div className="mt-8">
            <Button asChild size="lg" className="min-h-11 w-full sm:w-auto">
              <Link href={cta.href}>{cta.label}</Link>
            </Button>
          </div>
        ) : null}
      </Container>
    </Section>
  );
}
