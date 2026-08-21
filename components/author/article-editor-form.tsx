'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

import { cmsFetch } from '@/components/author/cms-fetch';
import { StatusBadge } from '@/components/author/status-badge';
import { TipTapEditor } from '@/components/author/tiptap-editor';
import { Button } from '@/components/ui/button';
import { FormInput } from '@/components/forms/form-input';
import { slugifyTitle } from '@/lib/cms/slug';
import type { CmsArticleRecord, CmsMediaRecord } from '@/lib/cms/types';

const CATEGORIES = [
  'instagram',
  'tiktok',
  'facebook',
  'guides',
  'social-media-marketing',
  'news',
];

type ArticleEditorFormProps = {
  article?: CmsArticleRecord | null;
  authorName?: string;
};

export function ArticleEditorForm({ article, authorName }: ArticleEditorFormProps) {
  const router = useRouter();
  const [title, setTitle] = useState(article?.title ?? '');
  const [slug, setSlug] = useState(article?.slug ?? '');
  const [slugLocked, setSlugLocked] = useState(Boolean(article?.slug));
  const [excerpt, setExcerpt] = useState(article?.excerpt ?? '');
  const [contentJson, setContentJson] = useState<Record<string, unknown> | null>(
    article?.contentJson ?? null,
  );
  const [contentHtml, setContentHtml] = useState(article?.contentHtml ?? '');
  const contentJsonRef = useRef(contentJson);
  const contentHtmlRef = useRef(contentHtml);
  const [featuredImageUrl, setFeaturedImageUrl] = useState(article?.featuredImageUrl ?? '');
  const [featuredImageAlt, setFeaturedImageAlt] = useState(article?.featuredImageAlt ?? '');
  const [category, setCategory] = useState<string>(article?.category ?? 'guides');
  const [tags, setTags] = useState((article?.tags ?? []).join(', '));
  const [seoTitle, setSeoTitle] = useState(article?.seoTitle ?? '');
  const [seoDescription, setSeoDescription] = useState(article?.seoDescription ?? '');
  const [canonicalPath, setCanonicalPath] = useState(article?.canonicalPath ?? '');
  const [keyTakeaways, setKeyTakeaways] = useState((article?.keyTakeaways ?? []).join('\n'));
  const [intendedPublishOn, setIntendedPublishOn] = useState(article?.intendedPublishOn ?? '');
  const [scheduleLocal, setScheduleLocal] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [dirty, setDirty] = useState(false);
  const dirtyRef = useRef(false);
  const [mediaOpen, setMediaOpen] = useState(false);
  const [media, setMedia] = useState<CmsMediaRecord[]>([]);
  const [mediaMode, setMediaMode] = useState<'featured' | 'inline'>('featured');
  const [pendingInline, setPendingInline] = useState<((url: string, alt: string) => void) | null>(null);
  const [insertAlt, setInsertAlt] = useState('');

  const timezone = useMemo(() => Intl.DateTimeFormat().resolvedOptions().timeZone, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (new URLSearchParams(window.location.search).get('saved')) {
      setMessage('Saved.');
    }
  }, []);

  useEffect(() => {
    const handler = (event: BeforeUnloadEvent) => {
      if (!dirtyRef.current) return;
      event.preventDefault();
      event.returnValue = '';
    };
    window.addEventListener('beforeunload', handler);
    return () => window.removeEventListener('beforeunload', handler);
  }, []);

  useEffect(() => {
    const handler = (event: MouseEvent) => {
      if (!dirtyRef.current) return;
      const target = (event.target as HTMLElement | null)?.closest('a');
      if (!target) return;
      if (target.getAttribute('target') === '_blank') return;
      const href = target.getAttribute('href');
      if (!href || href.startsWith('#') || href.startsWith('javascript:')) return;
      const next = new URL(href, window.location.origin);
      if (next.pathname === window.location.pathname && next.search === window.location.search) return;
      const leave = window.confirm('You have unsaved changes. Leave this page?');
      if (!leave) {
        event.preventDefault();
        event.stopPropagation();
        return;
      }
      dirtyRef.current = false;
      setDirty(false);
    };
    document.addEventListener('click', handler, true);
    return () => document.removeEventListener('click', handler, true);
  }, []);

  const markDirty = () => {
    dirtyRef.current = true;
    setDirty(true);
  };

  const clearDirty = () => {
    dirtyRef.current = false;
    setDirty(false);
  };

  async function loadMedia() {
    const response = await cmsFetch('/api/author/media');
    const data = (await response.json()) as { media?: CmsMediaRecord[] };
    setMedia(data.media ?? []);
  }

  const openMedia = useCallback(async (mode: 'featured' | 'inline') => {
    setMediaMode(mode);
    await loadMedia();
    setMediaOpen(true);
  }, []);

  async function savePayload() {
    const json = contentJsonRef.current;
    const html = contentHtmlRef.current;
    const liveText = (html || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    const storedText = (article?.contentHtml || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    const useStored = Boolean(article && liveText.length < 8 && storedText.length >= 8);
    return {
      title,
      slug,
      excerpt,
      contentHtml: useStored && article ? article.contentHtml : html,
      contentJson: useStored && article ? article.contentJson : json,
      featuredImageUrl: featuredImageUrl || null,
      featuredImageAlt: featuredImageAlt || null,
      category,
      tags: tags
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean),
      seoTitle: seoTitle || null,
      seoDescription: seoDescription || null,
      canonicalPath: canonicalPath || null,
      intendedPublishOn: intendedPublishOn || null,
      keyTakeaways: keyTakeaways
        .split('\n')
        .map((item) => item.trim())
        .filter(Boolean),
        confirmSlugChange: false,
    };
  }

  async function persist(extra?: { action?: string; publishAt?: string }) {
    setSaving(true);
    setError(null);
    setMessage(null);
    try {
      const payload = await savePayload();
      if (!title.trim() || !slug.trim()) {
        setError('Title and slug are required.');
        return;
      }
      if (article?.status === 'published' && slug.trim() && slug.trim() !== article.slug) {
        const confirmed = window.confirm(
          'Changing a published slug creates a 301 from the old /learn URL. Continue?',
        );
        if (!confirmed) return;
        payload.confirmSlugChange = true;
      }
      if (!article) {
        const created = await cmsFetch('/api/author/articles', {
          method: 'POST',
          body: JSON.stringify(payload),
        });
        const data = (await created.json()) as { ok?: boolean; error?: string; article?: CmsArticleRecord };
        if (!created.ok || !data.ok || !data.article) {
          setError(data.error ?? 'Could not create article.');
          return;
        }
        if (extra?.action && extra.action !== 'draft') {
          const acted = await cmsFetch(`/api/author/articles/${data.article.id}`, {
            method: 'POST',
            body: JSON.stringify(extra),
          });
          const actionData = (await acted.json()) as { ok?: boolean; error?: string };
          if (!acted.ok || !actionData.ok) {
            setError(actionData.error ?? 'Created, but the publish action failed.');
            router.replace(`/author/articles/${data.article.id}`);
            return;
          }
        }
        clearDirty();
        setMessage('Saved.');
        window.location.assign(`/author/articles/${data.article.id}?saved=1&t=${Date.now()}`);
        return;
      }
      const updated = await cmsFetch(`/api/author/articles/${article.id}`, {
        method: 'PATCH',
        body: JSON.stringify(payload),
      });
      const data = (await updated.json()) as { ok?: boolean; error?: string; slugWarning?: string };
      if (!updated.ok || !data.ok) {
        setError(data.error ?? 'Could not update article.');
        return;
      }
      if (extra?.action) {
        const acted = await cmsFetch(`/api/author/articles/${article.id}`, {
          method: 'POST',
          body: JSON.stringify(extra),
        });
        const actionData = (await acted.json()) as { ok?: boolean; error?: string };
        if (!acted.ok || !actionData.ok) {
          setError(actionData.error ?? 'Saved, but the publish action failed.');
          return;
        }
      }
      clearDirty();
      setMessage(data.slugWarning || 'Saved.');
      if (extra?.action) {
        window.location.assign(`/author/articles/${article.id}?saved=1&t=${Date.now()}`);
        return;
      }
      router.refresh();
    } catch {
      setError('Could not save article.');
    } finally {
      setSaving(false);
    }
  }

  async function onUpload(file: File) {
    const form = new FormData();
    form.set('file', file);
    form.set('alt', featuredImageAlt || file.name);
    const response = await cmsFetch('/api/author/media', { method: 'POST', body: form });
    const data = (await response.json()) as { ok?: boolean; media?: CmsMediaRecord; error?: string };
    if (!data.ok || !data.media) {
      setError(data.error ?? 'Upload failed.');
      return;
    }
    await loadMedia();
    if (mediaMode === 'featured') {
      setFeaturedImageUrl(data.media.url);
      setFeaturedImageAlt(insertAlt || data.media.alt || file.name);
      markDirty();
    } else {
      pendingInline?.(data.media.url, insertAlt || data.media.alt || file.name);
      setMediaOpen(false);
    }
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_20rem]">
      <div className="space-y-4">
        <FormInput
          id="article-title"
          label="Title"
          value={title}
          required
          onChange={(event) => {
            setTitle(event.target.value);
            if (!slugLocked) setSlug(slugifyTitle(event.target.value));
            markDirty();
          }}
        />
        <FormInput
          id="article-slug"
          label="Slug"
          value={slug}
          onChange={(event) => {
            setSlugLocked(true);
            setSlug(event.target.value);
            markDirty();
          }}
          helper={
            article?.status === 'published'
              ? 'Changing a published slug creates a 301 from the old Learn URL.'
              : 'Lowercase kebab-case. Must stay unique.'
          }
        />
        <TipTapEditor
          value={contentJson}
          onChange={(json, html) => {
            contentJsonRef.current = json;
            contentHtmlRef.current = html;
            setContentJson(json);
            setContentHtml(html);
            markDirty();
          }}
          onOpenMedia={(insert) => {
            setPendingInline(() => insert);
            void openMedia('inline');
          }}
        />
      </div>

      <aside id="schedule" className="space-y-4 rounded-2xl border border-[#F0E4D8] bg-white p-4">
        <p className="text-sm font-semibold">Publishing</p>
        {article ? <StatusBadge status={article.status} /> : <p className="text-xs text-[#8A837C]">New draft</p>}
        {dirty ? <p className="text-xs text-amber-800">Unsaved changes</p> : null}
        <p className="text-xs text-[#8A837C]">Timezone: {timezone}. Auto-publish times are stored in UTC.</p>
        <p className="text-xs text-[#5C564F]" data-testid="article-author">
          Author: {authorName || 'Signed-in author'}
        </p>
        {article?.status === 'planned' ? (
          <p className="rounded-lg bg-violet-50 px-3 py-2 text-xs text-violet-800">
            This is a Planned calendar item. It will not auto-publish. Save Draft, then Schedule or Publish after you write the article.
          </p>
        ) : null}
        <label className="text-xs font-medium text-[#5C564F]" htmlFor="intended-on">
          Intended editorial date
        </label>
        <input
          id="intended-on"
          type="date"
          className="min-h-10 w-full max-w-full rounded-lg border px-3 text-sm"
          value={intendedPublishOn}
          onChange={(event) => {
            setIntendedPublishOn(event.target.value);
            markDirty();
          }}
        />
        <div className="flex flex-col gap-2">
          {article?.status === 'published' || article?.status === 'scheduled' ? (
            <Button type="button" disabled={saving} onClick={() => persist()}>
              Update Article
            </Button>
          ) : (
            <Button type="button" disabled={saving} onClick={() => persist({ action: 'draft' })}>
              Save Draft
            </Button>
          )}
          <Button type="button" disabled={saving} onClick={() => persist({ action: 'publish' })}>
            Publish Now
          </Button>
          <label className="text-xs font-medium text-[#5C564F]" htmlFor="schedule-at">
            Schedule (local)
          </label>
          <input
            id="schedule-at"
            type="datetime-local"
            className="min-h-10 w-full max-w-full rounded-lg border px-3 text-sm"
            value={scheduleLocal}
            onChange={(event) => setScheduleLocal(event.target.value)}
          />
          <Button
            type="button"
            variant="outline"
            disabled={saving}
            onClick={() => {
              const value =
                (document.getElementById('schedule-at') as HTMLInputElement | null)?.value ||
                scheduleLocal;
              if (!value) {
                setError('Choose a future date and time to schedule.');
                return;
              }
              persist({ action: 'schedule', publishAt: new Date(value).toISOString() });
            }}
          >
            {article?.status === 'scheduled' ? 'Update Schedule' : 'Schedule'}
          </Button>
          {article?.status === 'published' ? (
            <Button type="button" variant="outline" disabled={saving} onClick={() => persist({ action: 'unpublish' })}>
              Unpublish
            </Button>
          ) : null}
          {article?.status === 'scheduled' ? (
            <Button
              type="button"
              variant="outline"
              disabled={saving}
              onClick={() => persist({ action: 'cancel_schedule' })}
            >
              Cancel Schedule
            </Button>
          ) : null}
          {article ? (
            <Button type="button" variant="outline" asChild>
              <a href={`/learn/preview/${article.slug}`} target="_blank" rel="noreferrer">
                Preview
              </a>
            </Button>
          ) : null}
          {article && article.status !== 'trash' ? (
            <Button
              type="button"
              variant="outline"
              disabled={saving}
              onClick={() => {
                if (window.confirm('Move this article to trash?')) persist({ action: 'trash' });
              }}
            >
              Move to Trash
            </Button>
          ) : null}
          {article?.status === 'trash' ? (
            <Button type="button" variant="outline" disabled={saving} onClick={() => persist({ action: 'restore' })}>
              Restore
            </Button>
          ) : null}
        </div>

        <FormInput
          id="article-excerpt"
          label="Excerpt"
          value={excerpt}
          onChange={(event) => {
            setExcerpt(event.target.value);
            markDirty();
          }}
        />
        <label className="text-sm font-medium">Category</label>
        <select
          className="min-h-10 w-full rounded-lg border px-3 text-sm"
          value={category}
          onChange={(event) => {
            setCategory(event.target.value);
            markDirty();
          }}
        >
          {CATEGORIES.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
        <FormInput
          id="article-tags"
          label="Tags"
          helper="Comma-separated"
          value={tags}
          onChange={(event) => {
            setTags(event.target.value);
            markDirty();
          }}
        />
        <FormInput
          id="article-featured-url"
          label="Featured image URL"
          value={featuredImageUrl}
          onChange={(event) => {
            setFeaturedImageUrl(event.target.value);
            markDirty();
          }}
        />
        <Button type="button" variant="outline" onClick={() => void openMedia('featured')}>
          Select featured image
        </Button>
        <FormInput
          id="article-featured-alt"
          label="Featured image alt text"
          value={featuredImageAlt}
          onChange={(event) => {
            setFeaturedImageAlt(event.target.value);
            markDirty();
          }}
        />
        <FormInput
          id="article-seo-title"
          label="SEO title"
          helper={`${seoTitle.length}/58 recommended`}
          value={seoTitle}
          onChange={(event) => {
            setSeoTitle(event.target.value);
            markDirty();
          }}
        />
        <FormInput
          id="article-seo-description"
          label="Meta description"
          helper={`${seoDescription.length}/150 recommended`}
          value={seoDescription}
          onChange={(event) => {
            setSeoDescription(event.target.value);
            markDirty();
          }}
        />
        <FormInput
          id="article-canonical"
          label="Canonical path"
          helper="Optional. Default is /learn/{slug}"
          value={canonicalPath}
          onChange={(event) => {
            setCanonicalPath(event.target.value);
            markDirty();
          }}
        />
        <label className="text-sm font-medium" htmlFor="takeaways">
          Key takeaways
        </label>
        <textarea
          id="takeaways"
          className="min-h-24 w-full rounded-lg border px-3 py-2 text-sm"
          value={keyTakeaways}
          onChange={(event) => {
            setKeyTakeaways(event.target.value);
            markDirty();
          }}
        />
        {message ? <p className="text-sm text-emerald-700">{message}</p> : null}
        {error ? <p className="text-sm text-destructive">{error}</p> : null}
      </aside>

      {mediaOpen ? (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/40 p-4">
          <div className="max-h-[80vh] w-full max-w-3xl overflow-auto rounded-2xl bg-white p-4">
            <div className="mb-3 flex items-center justify-between">
              <p className="font-semibold">Media library</p>
              <Button type="button" variant="ghost" onClick={() => setMediaOpen(false)}>
                Close
              </Button>
            </div>
            <input
              data-testid="media-upload"
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              onChange={(event) => {
                const file = event.target.files?.[0];
                if (file) void onUpload(file);
              }}
            />
            <FormInput
              id="insert-alt"
              label="Alt text for selected image"
              value={insertAlt}
              onChange={(event) => setInsertAlt(event.target.value)}
            />
            <ul className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">
              {media.map((item) => (
                <li key={item.id}>
                  <button
                    type="button"
                    data-testid="media-pick"
                    className="w-full overflow-hidden rounded-xl border text-left"
                    onClick={() => {
                      const alt = insertAlt.trim() || item.alt || item.filename;
                      if (mediaMode === 'featured') {
                        setFeaturedImageUrl(item.url);
                        setFeaturedImageAlt(alt);
                        markDirty();
                      } else {
                        pendingInline?.(item.url, alt);
                      }
                      setMediaOpen(false);
                    }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={item.url} alt={item.alt} className="h-28 w-full object-cover" />
                    <span className="block truncate px-2 py-1 text-xs">{item.filename}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : null}
    </div>
  );
}
