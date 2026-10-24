import Link from 'next/link';
import { ArrowRight, Heart } from 'lucide-react';

import { SITE_V2_COPY } from '@/data/content/site-v2-copy';

/**
 * Site-v2 "Grow with NovaLikes" box. Takes the visual position of the old newsletter block.
 */
export function LearnGrowBox() {
  const box = SITE_V2_COPY.learn.growBox;

  return (
    <div className="wrap">
      <aside className="grow-box">
        <span className="gm" aria-hidden="true">
          <Heart size={22} fill="currentColor" strokeWidth={0} />
        </span>
        <div>
          <h2>{box.title}</h2>
          <p>{box.body}</p>
        </div>
        <Link className="btn" href={box.href}>
          {box.cta} <ArrowRight className="ic" aria-hidden="true" />
        </Link>
      </aside>
    </div>
  );
}
