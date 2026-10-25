import { Star } from 'lucide-react';

import { HOME_V5 } from '@/data/content/home-v5';
import type { HomeV5Content } from '@/data/content/home-v5-types';

function MarqueeList({
  items,
  hidden = false,
}: {
  items: readonly string[];
  hidden?: boolean;
}) {
  return (
    <ul className="mq-list" aria-hidden={hidden ? true : undefined}>
      {items.map((item) => (
        <li key={item}>
          <Star className="ic" aria-hidden="true" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

/** Scrolling strip: the list is duplicated and the copy is aria-hidden for a seamless loop. */
export function HomeV5Marquee({ content = HOME_V5 }: { content?: HomeV5Content }) {
  return (
    <section className="marquee" aria-label="What every order includes">
      <div className="mq-track">
        <MarqueeList items={content.marquee} />
        <MarqueeList items={content.marquee} hidden />
      </div>
    </section>
  );
}
