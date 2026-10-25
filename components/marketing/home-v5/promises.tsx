import { Clock, MessageCircle, RefreshCw, ShieldCheck, type LucideIcon } from 'lucide-react';

import { HOME_V5 } from '@/data/content/home-v5';
import type { HomeV5Content } from '@/data/content/home-v5-types';
import { PromisesTabs, type PromiseItem } from '@/components/marketing/home-v5/promises-tabs';
import { PenUnderline } from '@/components/marketing/home-v5/icons';

const PROMISE_ICONS: Record<string, LucideIcon> = {
  shield: ShieldCheck,
  clock: Clock,
  'refresh-cw': RefreshCw,
  'message-circle': MessageCircle,
};

export function HomeV5Promises({ content = HOME_V5 }: { content?: HomeV5Content }) {
  const { promises } = content;

  const items: PromiseItem[] = promises.items.map((item) => {
    const Icon = PROMISE_ICONS[item.icon] ?? ShieldCheck;
    return {
      key: item.key,
      title: item.title,
      body: item.body,
      chip: item.chip,
      icon: <Icon className="ic" aria-hidden="true" />,
      bigIcon: <Icon className="ic pv-big" strokeWidth={1.6} aria-hidden="true" />,
    };
  });

  const head = (
    <>
      <h2 className="h2 left on-dark">
        {promises.title.lead}{' '}
        <span className="hl">
          {promises.title.highlight}
          <PenUnderline />
        </span>
      </h2>
      <p className="body on-dark">{promises.intro}</p>
    </>
  );

  return (
    <section id={promises.id} className="promises">
      <PromisesTabs head={head} items={items} />
    </section>
  );
}
