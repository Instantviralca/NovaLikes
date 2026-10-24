import Link from 'next/link';

import { Container } from '@/components/layout/container';
import { HOME_TT } from '@/data/content/home-tiktok-v2';

export function HomeTikTokOtherPlatforms() {
  const { otherPlatforms: copy } = HOME_TT;

  return (
    <section
      id={copy.id}
      className="bg-white py-14 md:py-18 lg:py-20"
      aria-labelledby="tt-other-title"
    >
      <Container size="xl">
        <div className="mx-auto max-w-2xl space-y-3 text-center">
          <h2 id="tt-other-title" className="tt-h2">
            {copy.title}
          </h2>
          <p className="tt-body">{copy.subtitle}</p>
        </div>
        <ul className="mt-8 flex flex-wrap justify-center gap-2">
          {copy.links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="inline-flex rounded-full border border-[var(--nl-border)] bg-white px-4 py-2 text-sm font-semibold text-[var(--nl-ink)] shadow-sm transition hover:border-[var(--nl-orange)]/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--nl-orange)]"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
