import Link from 'next/link';

import type { LearnArticleClosingCta } from '@/lib/learn/article/closing-cta';

type ArticleClosingCtaProps = {
  cta: LearnArticleClosingCta;
};

/**
 * Single closing CTA for Learn articles — not the global dual-button registry pair.
 */
export function ArticleClosingCta({ cta }: ArticleClosingCtaProps) {
  return (
    <section
      data-article-closing-cta
      className="rounded-2xl border border-[#F0E4D8] bg-[#1C1917] px-6 py-8 text-white sm:px-8"
      aria-labelledby="article-closing-cta-heading"
    >
      <h2
        id="article-closing-cta-heading"
        className="text-2xl font-semibold tracking-tight"
      >
        {cta.heading}
      </h2>
      <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-white/75">
        {cta.text}
      </p>
      <Link
        href={cta.href}
        className="mt-6 inline-flex min-h-11 items-center rounded-full bg-[#E85D04] px-5 text-sm font-semibold text-white outline-none transition-colors hover:bg-[#D45504] focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#1C1917]"
      >
        {cta.label}
      </Link>
    </section>
  );
}
