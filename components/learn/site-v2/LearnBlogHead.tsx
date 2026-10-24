import { LearnCrumbs } from '@/components/learn/site-v2/LearnCrumbs';
import type { BreadcrumbItem } from '@/types/shared';

type LearnBlogHeadProps = {
  breadcrumbs: BreadcrumbItem[];
  title: string;
  description: string;
};

/** Site-v2 `.blog-head`: crumbs, H1, intro. */
export function LearnBlogHead({
  breadcrumbs,
  title,
  description,
}: LearnBlogHeadProps) {
  return (
    <div className="blog-head">
      <LearnCrumbs items={breadcrumbs} />
      <h1 className="h1">{title}</h1>
      <p className="lead">{description}</p>
    </div>
  );
}
