import { PenUnderline } from '@/components/marketing/home-v5/icons';
import { cn } from '@/lib/utils';

export type SplitTitleData = { lead: string; highlight: string; tail?: string };

/**
 * One heading element: `${lead} <span class="hl">${highlight}</span> ${tail}`.
 * `pen` adds the hand-drawn underline inside the highlight span.
 */
export function SplitTitle({
  title,
  as: Tag = 'h2',
  className = 'h2',
  pen = false,
  id,
}: {
  title: SplitTitleData;
  as?: 'h1' | 'h2';
  className?: string;
  pen?: boolean;
  id?: string;
}) {
  return (
    <Tag id={id} className={cn(className)}>
      {title.lead}{' '}
      <span className="hl">
        {title.highlight}
        {pen ? <PenUnderline /> : null}
      </span>
      {title.tail ? <> {title.tail}</> : null}
    </Tag>
  );
}
