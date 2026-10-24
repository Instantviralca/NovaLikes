import { Briefcase, Music, Store, User, type LucideIcon } from 'lucide-react';

import { Container } from '@/components/layout/container';
import { HomeTtSectionHead } from '@/components/marketing/home-tiktok/section-head';
import { HOME_TT } from '@/data/content/home-tiktok-v2';

const ICONS: Record<string, LucideIcon> = {
  user: User,
  store: Store,
  music: Music,
  briefcase: Briefcase,
};

export function HomeTikTokWhoFor() {
  const { whoFor: copy } = HOME_TT;

  return (
    <section
      id={copy.id}
      className="tt-soft tt-glow-bg py-14 md:py-18 lg:py-20"
      aria-labelledby="tt-who-for-title"
    >
      <Container size="xl">
        <HomeTtSectionHead
          eyebrow={copy.eyebrow}
          title={copy.title}
          titleId="tt-who-for-title"
        />
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {copy.items.map((item) => {
            const Icon = ICONS[item.icon] ?? User;
            return (
              <li key={item.title} className="tt-card space-y-3 p-5">
                <span className="tt-icon-tile">
                  <Icon className="size-5" aria-hidden />
                </span>
                <h3 className="text-base font-bold text-[var(--nl-ink)]">{item.title}</h3>
                <p className="tt-body text-sm">{item.body}</p>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
