import { HomeV4SplitTitle } from '@/components/marketing/home-v4/split-title';
import type { SplitTitle } from '@/data/content/home-v4';
import { cn } from '@/lib/utils';

export function HomeV4SectionHead({
  eyebrow,
  title,
  subtitle,
  titleId,
  align = 'center',
  className,
}: {
  eyebrow?: string;
  title: SplitTitle;
  subtitle?: string;
  titleId?: string;
  align?: 'center' | 'start';
  className?: string;
}) {
  return (
    <div
      className={cn(
        'max-w-2xl space-y-3',
        align === 'center' ? 'mx-auto text-center' : 'text-start',
        className,
      )}
    >
      {eyebrow ? <p className="v4-eyebrow">{eyebrow}</p> : null}
      <HomeV4SplitTitle title={title} id={titleId} />
      {subtitle ? <p className="v4-body text-base sm:text-lg">{subtitle}</p> : null}
    </div>
  );
}
