import Link from 'next/link';
import { BookOpen } from 'lucide-react';

import { Container } from '@/components/layout/container';
import { HomeV4SectionHead } from '@/components/marketing/home-v4/section-head';
import { HOME_V4 } from '@/data/content/home-v4';
import { prefetchForHref } from '@/lib/linking/prefetch';

export function HomeV4Guides() {
  const { guides: copy } = HOME_V4;

  return (
    <section id={copy.id} className="bg-white py-14 md:py-18 lg:py-20" aria-labelledby="v4-guides-title">
      <Container size="xl">
        <HomeV4SectionHead
          eyebrow={copy.eyebrow}
          title={copy.title}
          subtitle={copy.intro}
          titleId="v4-guides-title"
        />
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {copy.items.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                prefetch={prefetchForHref(item.href)}
                className="v4-card v4-card-link flex h-full flex-col gap-3 p-5"
              >
                <span className="v4-icon-tile">
                  <BookOpen className="size-5" aria-hidden />
                </span>
                <h3 className="text-lg font-bold text-[var(--nl-ink)]">{item.title}</h3>
                <p className="v4-body text-sm">{item.description}</p>
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-8 flex justify-center">
          <Link href={copy.cta.href} className="v4-btn-secondary">
            {copy.cta.label}
          </Link>
        </div>
      </Container>
    </section>
  );
}
