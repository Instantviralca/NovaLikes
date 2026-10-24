import Link from 'next/link';

import { SITE_V2_COPY } from '@/data/content/site-v2-copy';
import type { PublicLearnTag } from '@/types/learn';
import type { InternalLink } from '@/types/linking';

type LearnTopicsProps = {
  tags: PublicLearnTag[];
  /** Category pages keep their related-service links (existing internal linking). */
  relatedServices?: InternalLink[];
};

/**
 * Site-v2 "Popular topics" chips from the existing popular tags.
 */
export function LearnTopics({ tags, relatedServices = [] }: LearnTopicsProps) {
  return (
    <>
      {tags.length > 0 ? (
        <nav className="topics" aria-label={SITE_V2_COPY.learn.popularTopics}>
          <span className="t-k">{SITE_V2_COPY.learn.popularTopics}</span>
          {tags.map((tag) => (
            <Link key={tag.id} href={tag.href} data-tag-badge>
              {tag.name}
            </Link>
          ))}
        </nav>
      ) : null}
      {relatedServices.length > 0 ? (
        <nav className="topics" aria-label="Related services">
          <span className="t-k">Related</span>
          {relatedServices.map((service) => (
            <Link key={service.href} href={service.href}>
              {service.label}
            </Link>
          ))}
        </nav>
      ) : null}
    </>
  );
}
