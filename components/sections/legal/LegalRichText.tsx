/**
 * Renders legal paragraph text with optional markdown-style links: [label](/path).
 */

import type { ReactNode } from 'react';
import Link from 'next/link';

import { Text } from '@/components/typography/text';
import { cn } from '@/lib/utils';

const LINK_PATTERN = /\[([^\]]+)\]\(((?:\/[^)\s]+|mailto:[^)\s]+))\)/g;


export type LegalRichTextProps = {
  text: string;
  className?: string;
  /** Use span for list items and other inline contexts. */
  as?: 'p' | 'span';
};

function renderLinkedNodes(text: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  const pattern = new RegExp(LINK_PATTERN.source, 'g');

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }
    const label = match[1]!;
    const href = match[2]!;
    if (href.startsWith('mailto:')) {
      nodes.push(
        <a
          key={`${href}-${match.index}`}
          href={href}
          className="font-medium text-foreground underline underline-offset-4 hover:text-[var(--brand-primary)]"
        >
          {label}
        </a>,
      );
    } else {
      nodes.push(
        <Link
          key={`${href}-${match.index}`}
          href={href}
          className="font-medium text-foreground underline underline-offset-4 hover:text-[var(--brand-primary)]"
        >
          {label}
        </Link>,
      );
    }
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return nodes.length > 0 ? nodes : [text];
}

export function LegalRichText({ text, className, as = 'p' }: LegalRichTextProps) {
  const nodes = renderLinkedNodes(text);

  if (as === 'span') {
    return <span className={cn('leading-relaxed', className)}>{nodes}</span>;
  }

  return (
    <Text className={cn('text-pretty leading-relaxed text-muted-foreground', className)}>
      {nodes}
    </Text>
  );
}
