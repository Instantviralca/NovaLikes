import { TagList } from '@/components/learn/taxonomy/TagList';
import { cn } from '@/lib/utils';
import type { PublicLearnTag } from '@/types/learn';

type PopularTagsProps = {
  tags: PublicLearnTag[];
  title?: string;
  className?: string;
};

/**
 * Popular tags cluster — Document 15.04.
 */
export function PopularTags({
  tags,
  title = 'Popular topics',
  className,
}: PopularTagsProps) {
  if (tags.length === 0) return null;

  return (
    <div className={cn(className)}>
      <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#E85D04]">
        {title}
      </p>
      <TagList tags={tags} className="mt-4" label={title} />
    </div>
  );
}
