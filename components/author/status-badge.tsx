import { cn } from '@/lib/utils';
import type { CmsArticleStatus } from '@/lib/cms/types';

type BadgeStatus = CmsArticleStatus | 'learn-published';

const STYLES: Record<CmsArticleStatus, string> = {
  published: 'bg-emerald-50 text-emerald-800 ring-emerald-200',
  scheduled: 'bg-sky-50 text-sky-800 ring-sky-200',
  planned: 'bg-violet-50 text-violet-800 ring-violet-200',
  draft: 'bg-amber-50 text-amber-900 ring-amber-200',
  trash: 'bg-stone-100 text-stone-600 ring-stone-200',
};

export function StatusBadge({ status }: { status: BadgeStatus }) {
  const key: CmsArticleStatus = status === 'learn-published' ? 'published' : status;
  const label = status === 'learn-published' ? 'Published' : status === 'planned' ? 'Planned' : status;
  return (
    <span
      data-testid="article-status"
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ring-1',
        STYLES[key],
      )}
    >
      {label}
    </span>
  );
}
