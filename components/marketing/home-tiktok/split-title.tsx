import type { SplitTitle } from '@/data/content/home-tiktok-v2';
import { cn } from '@/lib/utils';

export function HomeTtSplitTitle({
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
    <Tag id={id} className={cn(Tag === 'h1' ? 'tt-h1' : 'tt-h2', className)}>
      {title.lead}{' '}
      <span className="tt-grad">{title.highlight}</span>
      {title.tail ? <> {title.tail}</> : null}
    </Tag>
  );
}
