'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';

import { cmsFetch } from '@/components/author/cms-fetch';
import { StatusBadge } from '@/components/author/status-badge';
import { Button } from '@/components/ui/button';
import type { CmsArticleRecord, CmsArticleStatus } from '@/lib/cms/types';

type Row = CmsArticleRecord & { authorName?: string };

const TABS: Array<{ id: 'all' | CmsArticleStatus; label: string }> = [
  { id: 'all', label: 'All' },
  { id: 'published', label: 'Published' },
  { id: 'scheduled', label: 'Scheduled' },
  { id: 'planned', label: 'Planned' },
  { id: 'draft', label: 'Draft' },
  { id: 'trash', label: 'Trash' },
];

export function ArticleList({
  articles,
  initialStatus = 'all',
}: {
  articles: Row[];
  initialStatus?: 'all' | CmsArticleStatus;
}) {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState(initialStatus);
  const [category, setCategory] = useState('all');
  const [error, setError] = useState<string | null>(null);

  const categories = useMemo(
    () => Array.from(new Set(articles.map((article) => article.category))).sort(),
    [articles],
  );

  const rows = useMemo(() => {
    return articles.filter((article) => {
      if (status !== 'all' && article.status !== status) return false;
      if (category !== 'all' && article.category !== category) return false;
      if (!query.trim()) return true;
      const q = query.toLowerCase();
      return article.title.toLowerCase().includes(q) || article.slug.toLowerCase().includes(q);
    });
  }, [articles, query, status, category]);

  async function act(id: string, action: string, confirm = false) {
    if (action === 'delete_permanent' && !window.confirm('Permanently delete this article? This cannot be undone.')) {
      return;
    }
    if (action === 'trash' && !window.confirm('Move this article to trash?')) return;
    setError(null);
    const response = await cmsFetch(`/api/author/articles/${id}`, {
      method: 'POST',
      body: JSON.stringify({ action, confirm }),
    });
    const data = (await response.json()) as { ok?: boolean; error?: string };
    if (!response.ok || !data.ok) {
      setError(data.error ?? 'Action failed.');
      return;
    }
    router.refresh();
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setStatus(tab.id)}
            className={`rounded-full px-3 py-1 text-sm ${
              status === tab.id ? 'bg-[#E85D04] text-white' : 'bg-white text-[#5C564F] ring-1 ring-[#F0E4D8]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        <input
          className="min-h-10 w-full max-w-md rounded-xl border border-[#F0E4D8] bg-white px-3 text-sm"
          placeholder="Search title or slug"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <select
          className="min-h-10 rounded-xl border border-[#F0E4D8] bg-white px-3 text-sm"
          value={category}
          onChange={(event) => setCategory(event.target.value)}
        >
          <option value="all">All categories</option>
          {categories.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
      {error ? <p className="text-sm text-destructive">{error}</p> : null}
      {rows.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-[#F0E4D8] bg-white p-8 text-sm text-[#8A837C]">
          No articles in this view yet.
        </p>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-[#F0E4D8] bg-white">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b bg-[#FFF8F3] text-[#8A837C]">
              <tr>
                <th className="px-4 py-3 font-medium">Title</th>
                <th className="px-4 py-3 font-medium">Slug</th>
                <th className="px-4 py-3 font-medium">Author</th>
                <th className="px-4 py-3 font-medium">Updated</th>
                <th className="px-4 py-3 font-medium">Publish</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((article) => (
                <tr key={article.id} className="border-b last:border-0">
                  <td className="px-4 py-3 font-medium">{article.title}</td>
                  <td className="px-4 py-3 text-[#8A837C]">{article.slug}</td>
                  <td className="px-4 py-3">{article.authorName ?? '—'}</td>
                  <td className="px-4 py-3">{article.updatedAt.slice(0, 10)}</td>
                  <td className="px-4 py-3">{(article.publishAt || article.publishedAt || '—').replace('T', ' ').slice(0, 16)}</td>
                  <td className="px-4 py-3">
                    <StatusBadge status={article.status} />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1">
                      {article.status !== 'trash' ? (
                        <>
                          <Button size="sm" variant="outline" asChild>
                            <Link href={`/author/articles/${article.id}`}>Edit</Link>
                          </Button>
                          <Button size="sm" variant="outline" asChild>
                            <a href={`/learn/preview/${article.slug}`} target="_blank" rel="noreferrer">
                              Preview
                            </a>
                          </Button>
                          {article.status !== 'published' && article.status !== 'planned' ? (
                            <Button size="sm" variant="outline" onClick={() => act(article.id, 'publish')}>
                              Publish Now
                            </Button>
                          ) : article.status === 'published' ? (
                            <Button size="sm" variant="outline" onClick={() => act(article.id, 'unpublish')}>
                              Unpublish
                            </Button>
                          ) : null}
                          {article.status !== 'published' && article.status !== 'scheduled' ? (
                            <Button size="sm" variant="outline" asChild>
                              <Link href={`/author/articles/${article.id}#schedule`}>Schedule</Link>
                            </Button>
                          ) : null}
                          <Button size="sm" variant="outline" onClick={() => act(article.id, 'trash')}>
                            Trash
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button size="sm" variant="outline" onClick={() => act(article.id, 'restore')}>
                            Restore
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => act(article.id, 'delete_permanent', true)}
                          >
                            Delete permanently
                          </Button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
