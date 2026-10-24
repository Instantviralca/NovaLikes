import Link from 'next/link';
import { BookOpen } from 'lucide-react';

import { Container } from '@/components/layout/container';
import { HomeTtSectionHead } from '@/components/marketing/home-tiktok/section-head';
import { HOME_TT } from '@/data/content/home-tiktok-v2';
import { ROOT_HOMEPAGE_TIKTOK_GUIDES } from '@/data/content/homepage-tiktok';
import { prefetchForHref } from '@/lib/linking/prefetch';

export function HomeTikTokGuides() {
  const { guides: copy } = HOME_TT;
  const cards = ROOT_HOMEPAGE_TIKTOK_GUIDES;

  return (
    <section
      id={cards.id}
      className="bg-white py-14 md:py-18 lg:py-20"
      aria-labelledby="tt-guides-title"
    >
      <Container size="xl">
        <HomeTtSectionHead
          eyebrow={copy.eyebrow}
          title={copy.title}
          subtitle={copy.intro}
          titleId="tt-guides-title"
        />
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cards.items.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                prefetch={prefetchForHref(item.href)}
                className="tt-card flex h-full flex-col gap-3 p-5"
              >
                <span className="tt-icon-tile">
                  <BookOpen className="size-5" aria-hidden />
                </span>
                <h3 className="text-lg font-bold text-[var(--nl-ink)]">{item.title}</h3>
                <p className="tt-body text-sm">{item.description}</p>
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-8 flex justify-center">
          <Link href={cards.cta.href} className="tt-btn-secondary">
            {cards.cta.label}
          </Link>
        </div>
      </Container>
    </section>
  );
}
