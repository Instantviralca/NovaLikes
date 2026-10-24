import type { SplitTitle } from '@/data/content/home-v4';
import { cn } from '@/lib/utils';

const TAG_CLASS = {
  h1: 'v4-h1',
  h2: 'v4-h2',
  h3: 'v4-h3',
} as const;

/** One heading element; the highlight gets the shared `nl-grad-text` gradient. */
export function HomeV4SplitTitle({
  title,
  as: Tag = 'h2',
  className,
  id,
}: {
  title: SplitTitle;
  as?: 'h1' | 'h2' | 'h3';
  className?: string;
  id?: string;
}) {
  return (
    <Tag id={id} className={cn(TAG_CLASS[Tag], className)}>
      {title.lead} <span className="nl-grad-text">{title.highlight}</span>
      {title.tail ? <> {title.tail}</> : null}
    </Tag>
  );
}
