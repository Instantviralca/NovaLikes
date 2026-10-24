import type { ReactNode } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  ArrowUp,
  Eye,
  Heart,
  MessageCircle,
  Play,
  Share2,
  UserPlus,
} from 'lucide-react';

import { Container } from '@/components/layout/container';
import { HomeTtSplitTitle } from '@/components/marketing/home-tiktok/split-title';
import { HOME_TT, type TikTokServiceKey } from '@/data/content/home-tiktok-v2';
import { cn } from '@/lib/utils';

function FollowersMock() {
  const stats = [
    { label: 'Following', highlight: false },
    { label: 'Followers', highlight: true },
    { label: 'Likes', highlight: false },
  ] as const;

  return (
    <div className="relative mx-auto flex w-full max-w-sm items-center justify-center" aria-hidden="true">
      <div className="absolute -inset-8 rounded-full bg-[radial-gradient(circle,rgba(249,115,22,0.16),transparent_70%)]" />
      <div className="tt-card relative w-full space-y-4 overflow-hidden p-5">
        <div className="tt-mock-badge absolute right-3 top-3 z-[1] inline-flex items-center gap-1.5">
          <UserPlus className="size-3.5 text-[var(--nl-orange)]" aria-hidden />
          <span>+ {HOME_TT.packages.tabs.followers.label}</span>
        </div>

        <div className="flex items-center gap-3 pr-24">
          <div className="tt-bg-grad size-14 shrink-0 rounded-full" />
          <div className="min-w-0 space-y-1.5">
            <div className="h-3 w-28 rounded-full bg-[#f3e8e0]" />
            <p className="truncate text-sm text-[var(--nl-muted)]">@yourbrand</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className={cn(
                'rounded-xl bg-[var(--nl-bg-soft)] p-3 text-center',
                stat.highlight && 'tt-stat-highlight',
              )}
            >
              <div className="mx-auto flex h-2.5 w-10 items-center justify-center gap-0.5">
                <span className="h-2 w-8 rounded-full bg-[#f3e8e0]" />
                {stat.highlight ? (
                  <ArrowUp className="size-3 shrink-0 text-[var(--nl-orange)]" aria-hidden />
                ) : null}
              </div>
              <p className="mt-2 text-[11px] font-semibold text-[var(--nl-muted)]">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="tt-bg-grad rounded-full px-4 py-2 text-center text-sm font-bold text-white">
          Follow
        </div>
      </div>
    </div>
  );
}

function MediaMock({
  kind,
}: {
  kind: 'likes' | 'views';
}) {
  const label = HOME_TT.packages.tabs[kind].label;
  const BadgeIcon = kind === 'likes' ? Heart : Eye;

  return (
    <div className="relative mx-auto flex w-full max-w-[240px] items-center justify-center" aria-hidden="true">
      <div className="absolute -inset-8 rounded-full bg-[radial-gradient(circle,rgba(249,115,22,0.14),transparent_70%)]" />
      <div className="tt-media-mock relative aspect-[9/14] w-full overflow-hidden rounded-3xl shadow-md">
        <div className="tt-media-mock-overlay" />
        {kind === 'likes' ? (
          <div className="absolute bottom-8 right-3 z-[1] flex flex-col items-center gap-4 text-white/90">
            <Heart className="size-6 fill-white/90" />
            <MessageCircle className="size-6" />
            <Share2 className="size-6" />
          </div>
        ) : (
          <>
            <div className="absolute inset-0 z-[1] flex items-center justify-center">
              <div className="flex size-14 items-center justify-center rounded-full bg-white/95 text-[var(--nl-orange)] shadow-md">
                <Play className="size-7 fill-current" />
              </div>
            </div>
            <div className="absolute inset-x-4 bottom-5 z-[1] h-1.5 overflow-hidden rounded-full bg-white/20">
              <div className="tt-bg-grad h-full w-2/3 rounded-full" />
            </div>
          </>
        )}
        <span className="tt-mock-badge absolute left-3 top-4 z-[1] inline-flex items-center gap-1.5">
          <BadgeIcon className="size-3.5 text-[var(--nl-orange)]" aria-hidden />
          <span>+ {label}</span>
        </span>
      </div>
    </div>
  );
}

const MOCKS: Record<TikTokServiceKey, () => ReactNode> = {
  followers: FollowersMock,
  likes: () => <MediaMock kind="likes" />,
  views: () => <MediaMock kind="views" />,
};

export function HomeTikTokServiceFeatures() {
  const { serviceFeatures: copy } = HOME_TT;

  return (
    <section id={copy.id} className="bg-white py-6 md:py-10" aria-label="TikTok service features">
      {copy.items.map((item, index) => {
        const Mock = MOCKS[item.key];
        const reverse = index % 2 === 1;
        return (
          <div
            key={item.key}
            className={cn('tt-glow-bg py-10 md:py-14', index % 2 === 1 ? 'tt-soft' : 'bg-white')}
          >
            <Container size="xl">
              <div
                className={cn(
                  'grid items-center gap-10 lg:grid-cols-2 lg:gap-14',
                  reverse && 'lg:[&>*:first-child]:order-2',
                )}
              >
                <div className="space-y-4">
                  <p className="tt-eyebrow">{item.eyebrow}</p>
                  <HomeTtSplitTitle title={item.title} />
                  <p className="tt-body">{item.body}</p>
                  <div className="space-y-2 pt-2">
                    <h3 className="text-lg font-bold text-[var(--nl-ink)]">{item.subTitle}</h3>
                    <p className="tt-body text-sm">{item.subBody}</p>
                  </div>
                  <Link href={item.cta.href} className="tt-btn-primary mt-2">
                    {item.cta.label}
                    <ArrowRight className="size-4" aria-hidden />
                  </Link>
                </div>
                <div className="flex justify-center">
                  <Mock />
                </div>
              </div>
            </Container>
          </div>
        );
      })}
    </section>
  );
}
