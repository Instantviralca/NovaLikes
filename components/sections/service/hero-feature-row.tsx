import {
  AtSign,
  Clock,
  Flag,
  Image as ImageIcon,
  Layers,
  Link as LinkIcon,
  Lock,
  MessageCircle,
  PenLine,
  PlayCircle,
  RefreshCw,
  SmilePlus,
  Users,
  type LucideIcon,
} from 'lucide-react';

import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import type { HeroFeature } from '@/data/content/service-hero-rewrites';
import { HERO_SHARED_FEATURES } from '@/data/content/service-hero-rewrites';
import { cn } from '@/lib/utils';

const ICONS: Record<string, LucideIcon> = {
  AtSign,
  Clock,
  Flag,
  Image: ImageIcon,
  Layers,
  Link: LinkIcon,
  Lock,
  MessageCircle,
  PenLine,
  PlayCircle,
  RefreshCw,
  SmilePlus,
  Users,
};

function FeatureCard({ feature }: { feature: HeroFeature }) {
  const Icon = ICONS[feature.icon] ?? AtSign;
  return (
    <div className="flex gap-3 rounded-2xl border border-[var(--nl-border)] bg-white p-4 shadow-sm sm:p-5">
      <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-[var(--nl-eyebrow-bg)] text-[var(--nl-orange)]">
        <Icon className="size-5" aria-hidden />
      </span>
      <div className="min-w-0">
        <p className="text-sm font-semibold text-[var(--nl-ink)]">{feature.title}</p>
        <p className="mt-1 text-sm leading-relaxed text-[var(--nl-body)]">{feature.body}</p>
      </div>
    </div>
  );
}

/** Four feature cards under the EN service hero (service-specific first, then shared). */
export function ServiceHeroFeatureRow({
  feature,
  className,
}: {
  feature: HeroFeature;
  className?: string;
}) {
  const cards = [feature, ...HERO_SHARED_FEATURES];
  return (
    <Section
      spacing="sm"
      className={cn('bg-[var(--nl-bg)]', className)}
      aria-label="Service highlights"
    >
      <Container size="lg">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {cards.map((card) => (
            <FeatureCard key={card.title} feature={card} />
          ))}
        </div>
      </Container>
    </Section>
  );
}

/** @deprecated Prefer ServiceHeroFeatureRow. */
export const ServiceHeroFeatureTitles = ServiceHeroFeatureRow;
