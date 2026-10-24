import Link from 'next/link';
import { Clock, Eye, Gauge, Search, type LucideIcon } from 'lucide-react';

import { Container } from '@/components/layout/container';
import { HomeTtSectionHead } from '@/components/marketing/home-tiktok/section-head';
import { HOME_TT } from '@/data/content/home-tiktok-v2';

const ICONS: Record<string, LucideIcon> = {
  clock: Clock,
  gauge: Gauge,
  eye: Eye,
  search: Search,
};

export function HomeTikTokWhatToExpect() {
  const { whatToExpect: copy } = HOME_TT;

  return (
    <section
      id={copy.id}
      className="bg-white py-14 md:py-18 lg:py-20"
      aria-labelledby="tt-what-to-expect-title"
    >
      <Container size="xl">
        <HomeTtSectionHead
          eyebrow={copy.eyebrow}
          title={copy.title}
          titleId="tt-what-to-expect-title"
        />
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {copy.items.map((item) => {
            const Icon = ICONS[item.icon] ?? Clock;
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
        <div className="mt-8 flex justify-center">
          <Link href={copy.cta.href} className="tt-btn-secondary">
            {copy.cta.label}
          </Link>
        </div>
      </Container>
    </section>
  );
}
