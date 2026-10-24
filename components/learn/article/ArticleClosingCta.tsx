import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import type { LearnArticleClosingCta } from '@/lib/learn/article/closing-cta';

type ArticleClosingCtaProps = {
  cta: LearnArticleClosingCta;
};

/**
 * Single closing CTA for Learn articles — not the global dual-button registry pair.
 * Site-v2 navy `.closing` panel.
 */
export function ArticleClosingCta({ cta }: ArticleClosingCtaProps) {
  return (
    <section
      data-article-closing-cta
      className="closing"
      aria-labelledby="article-closing-cta-heading"
    >
      <div>
        <h2 id="article-closing-cta-heading">{cta.heading}</h2>
        <p>{cta.text}</p>
      </div>
      <Link className="btn" href={cta.href}>
        {cta.label} <ArrowRight className="ic" aria-hidden="true" />
      </Link>
    </section>
  );
}
