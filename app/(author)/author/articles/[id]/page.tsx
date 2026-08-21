import { notFound } from 'next/navigation';

import { ArticleEditorForm } from '@/components/author/article-editor-form';
import { cmsGetArticleById, cmsGetUserById } from '@/lib/cms/store';

export default async function EditArticlePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const article = await cmsGetArticleById(id);
  if (!article) notFound();
  const author = article.authorId ? await cmsGetUserById(article.authorId) : null;
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Edit article</h1>
      <ArticleEditorForm article={article} authorName={author?.name ?? 'Signed-in author'} />
    </div>
  );
}
