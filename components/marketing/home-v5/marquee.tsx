import { Star } from 'lucide-react';

import { HOME_V5 } from '@/data/content/home-v5';

function MarqueeList({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul className="mq-list" aria-hidden={hidden ? true : undefined}>
      {HOME_V5.marquee.map((item) => (
        <li key={item}>
          <Star className="ic" aria-hidden="true" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

/** Scrolling strip: the list is duplicated and the copy is aria-hidden for a seamless loop. */
export function HomeV5Marquee() {
  return (
    <section className="marquee" aria-label="What every order includes">
      <div className="mq-track">
        <MarqueeList />
        <MarqueeList hidden />
      </div>
    </section>
  );
}
