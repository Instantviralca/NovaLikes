import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import {
  formatLearnDate,
  formatLearnMinRead,
} from '@/components/learn/site-v2/learn-format';
import { SITE_V2_COPY } from '@/data/content/site-v2-copy';
import type { PublicLearnArticle } from '@/types/learn';

type LearnFeaturedCardProps = {
  article: PublicLearnArticle;
};

/** Index-only featured block: newest article, image left, text right. */
export function LearnFeaturedCard({ article }: LearnFeaturedCardProps) {
  const copy = SITE_V2_COPY.learn;
  const image = article.featuredImage;
  const date = formatLearnDate(article.publishedAt);

  return (
    <Link className="featured" href={article.href}>
      <div className="fi">
        {image ? (
          <Image
            src={image.src}
            alt=""
            width={image.width}
            height={image.height}
            priority
            sizes="(max-width:1024px) 100vw, 640px"
          />
        ) : null}
      </div>
      <div>
        <p className="kicker">{copy.latest}</p>
        <h2 className="h2">{article.title}</h2>
        <p className="ex">{article.excerpt}</p>
        <div className="meta">
          <span className="cat-chip">{article.categoryName}</span>
          {date ? (
            <>
              <span className="dot" aria-hidden="true">
                ·
              </span>
              <span>{date}</span>
            </>
          ) : null}
          <span className="dot" aria-hidden="true">
            ·
          </span>
          <span>{formatLearnMinRead(article.readingTime)}</span>
        </div>
        <span className="tlink">
          {copy.readGuide} <ArrowRight className="ic" aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}
