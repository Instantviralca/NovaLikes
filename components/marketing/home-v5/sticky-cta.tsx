import { ArrowRight } from 'lucide-react';

import { HOME_V5 } from '@/data/content/home-v5';
import type { HomeV5Content } from '@/data/content/home-v5-types';

/** Mobile sticky CTA (`.sticky-cta`, shown by the CSS at <= 640px). Always in the HTML. */
export function HomeV5StickyCta({ content = HOME_V5 }: { content?: HomeV5Content }) {
  const { stickyCta } = content;
  return (
    <a className="sticky-cta" href={stickyCta.href}>
      {stickyCta.label}
      <ArrowRight className="ic" aria-hidden="true" />
    </a>
  );
}
