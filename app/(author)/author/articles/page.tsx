import { ArticleList } from '@/components/author/article-list';
import { cmsGetUserById, cmsListArticles } from '@/lib/cms/store';
import type { CmsArticleStatus } from '@/lib/cms/types';

export default async function AuthorArticlesPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const { status } = await searchParams;
  const initialStatus =
    status === 'draft' ||
    status === 'published' ||
    status === 'scheduled' ||
    status === 'planned' ||
    status === 'trash'
      ? status
      : 'all';
  const articles = await cmsListArticles({ status: 'all' });
  const withAuthors = await Promise.all(
    articles.map(async (article) => {
      const author = article.authorId ? await cmsGetUserById(article.authorId) : null;
      return { ...article, authorName: author?.name ?? (article.authorId === 'admin' ? 'Admin' : '—') };
    }),
  );

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Articles</h1>
      <ArticleList articles={withAuthors} initialStatus={initialStatus as 'all' | CmsArticleStatus} />
    </div>
  );
}
