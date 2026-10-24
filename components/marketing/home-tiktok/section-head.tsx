import { HomeTtSplitTitle } from '@/components/marketing/home-tiktok/split-title';
import type { SplitTitle } from '@/data/content/home-tiktok-v2';
import { cn } from '@/lib/utils';

export function HomeTtSectionHead({
  eyebrow,
  title,
  subtitle,
  titleId,
  dark,
  className,
}: {
  eyebrow?: string;
  title: SplitTitle;
  subtitle?: string;
  titleId?: string;
  dark?: boolean;
  className?: string;
}) {
  return (
    <div className={cn('mx-auto max-w-2xl space-y-3 text-center', className)}>
      {eyebrow ? <p className="tt-eyebrow">{eyebrow}</p> : null}
      <HomeTtSplitTitle title={title} id={titleId} />
      {subtitle ? (
        <p className={cn('tt-body text-base sm:text-lg', dark && 'text-[#d1d5db]')}>{subtitle}</p>
      ) : null}
    </div>
  );
}
