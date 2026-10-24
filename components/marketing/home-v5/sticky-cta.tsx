import { ArrowRight } from 'lucide-react';

import { HOME_V5 } from '@/data/content/home-v5';

/** Mobile sticky CTA (`.sticky-cta`, shown by the CSS at <= 640px). Always in the HTML. */
export function HomeV5StickyCta() {
  const { stickyCta } = HOME_V5;
  return (
    <a className="sticky-cta" href={stickyCta.href}>
      {stickyCta.label}
      <ArrowRight className="ic" aria-hidden="true" />
    </a>
  );
}
