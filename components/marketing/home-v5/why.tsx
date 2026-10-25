import { BadgeCheck, Building2, MessageSquare, ShieldCheck, type LucideIcon } from 'lucide-react';

import { HOME_V5 } from '@/data/content/home-v5';
import type { HomeV5Content } from '@/data/content/home-v5-types';
import { SplitTitle } from '@/components/marketing/home-v5/split-title';

const WHY_ICONS: Record<string, LucideIcon> = {
  'badge-check': BadgeCheck,
  building: Building2,
};

export function HomeV5Why({ content = HOME_V5 }: { content?: HomeV5Content }) {
  const { why } = content;
  return (
    <section id={why.id} className="why">
      <div className="wrap why-grid">
        <div className="why-head rv-left">
          <SplitTitle title={why.title} className="h2 left" pen />
          <p className="body">{why.intro}</p>
          <div className="why-vis" aria-hidden="true">
            <span className="wv wv-1">
              <BadgeCheck className="ic" aria-hidden="true" />
            </span>
            <span className="wv wv-2">
              <ShieldCheck className="ic" aria-hidden="true" />
            </span>
            <span className="wv wv-3">
              <MessageSquare className="ic" aria-hidden="true" />
            </span>
          </div>
        </div>
        <div className="why-items">
          {why.items.map((item) => {
            const Icon = WHY_ICONS[item.icon] ?? BadgeCheck;
            return (
              <div key={item.title} className="why-item rv-up">
                <span className="wi-ic">
                  <Icon className="ic" aria-hidden="true" />
                </span>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
