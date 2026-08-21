import { ArticleEditorForm } from '@/components/author/article-editor-form';

export default function NewArticlePage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">New article</h1>
      <ArticleEditorForm />
    </div>
  );
}
