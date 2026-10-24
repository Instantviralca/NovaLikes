import * as React from 'react';

import { cn } from '@/lib/utils';

type HeadingAs = 'h1' | 'h2' | 'h3';

export type GradientHeadingProps = {
  as?: HeadingAs;
  text: string;
  /** Exact substring to wrap. Ignored when `auto` is true. */
  highlight?: string;
  /** Last 2 words (≥3), last word (2), none (1). Trailing ?!/: stay outside the span. */
  auto?: boolean;
  className?: string;
  id?: string;
};

const TRAILING_PUNCT = /([?!:])$/;

function splitAuto(text: string): { before: string; highlight: string; after: string } | null {
  const trimmed = text.trim();
  if (!trimmed) return null;

  let core = trimmed;
  let trailing = '';
  const punct = TRAILING_PUNCT.exec(core);
  if (punct) {
    trailing = punct[1];
    core = core.slice(0, -1).trimEnd();
  }

  const words = core.split(/\s+/).filter(Boolean);
  if (words.length <= 1) return null;

  const take = words.length >= 3 ? 2 : 1;
  const highlight = words.slice(-take).join(' ');
  const before = words.slice(0, -take).join(' ');
  return {
    before: before ? `${before} ` : '',
    highlight,
    after: trailing,
  };
}

function splitHighlight(
  text: string,
  highlight: string,
): { before: string; highlight: string; after: string } | null {
  if (!highlight) return null;
  const idx = text.indexOf(highlight);
  if (idx < 0) return null;
  return {
    before: text.slice(0, idx),
    highlight,
    after: text.slice(idx + highlight.length),
  };
}

/**
 * Same heading text with one substring wrapped in `.nl-grad-text`.
 * Never changes the visible string; never throws.
 */
export function GradientHeading({
  as: Comp = 'h2',
  text,
  highlight,
  auto = false,
  className,
  id,
}: GradientHeadingProps) {
  const parts = auto
    ? splitAuto(text)
    : highlight
      ? splitHighlight(text, highlight)
      : null;

  if (!parts) {
    return (
      <Comp id={id} className={cn(className)}>
        {text}
      </Comp>
    );
  }

  return (
    <Comp id={id} className={cn(className)}>
      {parts.before}
      <span className="nl-grad-text">{parts.highlight}</span>
      {parts.after}
    </Comp>
  );
}

/** Build H1 from rewrite parts — spaces between lead / highlight / tail. */
export function GradientTitleParts({
  as: Comp = 'h1',
  lead,
  highlight,
  tail,
  className,
  id,
}: {
  as?: HeadingAs;
  lead: string;
  highlight: string;
  tail: string;
  className?: string;
  id?: string;
}) {
  const full = [lead, highlight, tail].filter(Boolean).join(' ');
  return (
    <Comp id={id} className={cn(className)} data-hero-title={full}>
      {lead ? `${lead} ` : null}
      <span className="nl-grad-text">{highlight}</span>
      {tail ? ` ${tail}` : null}
    </Comp>
  );
}
