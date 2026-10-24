import Link from 'next/link';

import { Container } from '@/components/layout/container';
import { HOME_TT } from '@/data/content/home-tiktok-v2';

export function HomeTikTokFinalCta() {
  const { finalCta: copy } = HOME_TT;

  return (
    <section id={copy.id} className="bg-white pb-14 md:pb-18 lg:pb-20" aria-labelledby="tt-final-title">
      <Container size="xl">
        <div className="tt-final-banner px-6 py-12 text-center sm:px-10 md:py-16">
          <h2 id="tt-final-title" className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            {copy.title}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-base text-white/95 sm:text-lg">{copy.subtitle}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href={copy.primaryCta.href}
              className="inline-flex min-h-11 items-center justify-center rounded-xl bg-white px-5 py-2.5 text-sm font-bold text-[var(--nl-orange)] shadow-sm transition hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              {copy.primaryCta.label}
            </Link>
            <Link
              href={copy.secondaryCta.href}
              className="inline-flex min-h-11 items-center justify-center rounded-xl border-2 border-white px-5 py-2.5 text-sm font-bold text-white transition hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              {copy.secondaryCta.label}
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
