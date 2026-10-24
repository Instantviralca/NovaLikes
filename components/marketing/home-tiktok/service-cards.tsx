import Link from 'next/link';
import { Check, Eye, Heart, UserPlus } from 'lucide-react';

import { Container } from '@/components/layout/container';
import { HomeTtSectionHead } from '@/components/marketing/home-tiktok/section-head';
import { HOME_TT, type TikTokServiceKey } from '@/data/content/home-tiktok-v2';
import { getFromPriceLabel } from '@/lib/marketing/home-tiktok/packages';

const ICONS = {
  followers: UserPlus,
  likes: Heart,
  views: Eye,
} as const;

export function HomeTikTokServiceCards() {
  const { serviceCards: copy } = HOME_TT;

  return (
    <section id={copy.id} className="tt-soft tt-glow-bg py-14 md:py-18 lg:py-20" aria-labelledby="tt-choose-title">
      <Container size="xl">
        <HomeTtSectionHead
          eyebrow={copy.eyebrow}
          title={copy.title}
          subtitle={copy.subtitle}
          titleId="tt-choose-title"
        />
        <ul className="mt-10 grid gap-5 md:grid-cols-3">
          {copy.cards.map((card) => {
            const Icon = ICONS[card.key as TikTokServiceKey];
            const fromPrice = getFromPriceLabel(card.key);
            return (
              <li key={card.key} className="tt-card flex h-full flex-col gap-4 p-6">
                <span className="tt-icon-tile">
                  <Icon className="size-5" aria-hidden />
                </span>
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-[var(--nl-ink)]">{card.title}</h3>
                  <p className="tt-body text-sm">{card.description}</p>
                </div>
                <ul className="space-y-2">
                  {card.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-2 text-sm text-[var(--nl-ink)]">
                      <Check className="mt-0.5 size-4 shrink-0 text-[var(--nl-orange)]" aria-hidden />
                      <span>{bullet.replace('{fromPrice}', fromPrice)}</span>
                    </li>
                  ))}
                </ul>
                <Link href={card.cta.href} className="tt-btn-secondary mt-auto w-full">
                  {card.cta.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
