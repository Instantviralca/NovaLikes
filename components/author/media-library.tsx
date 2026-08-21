'use client';

import { useCallback, useEffect, useState } from 'react';

import { cmsFetch } from '@/components/author/cms-fetch';
import { Button } from '@/components/ui/button';
import { FormInput } from '@/components/forms/form-input';
import type { CmsMediaRecord } from '@/lib/cms/types';

export function MediaLibrary() {
  const [items, setItems] = useState<CmsMediaRecord[]>([]);
  const [query, setQuery] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  const load = useCallback(async (q = '') => {
    const response = await cmsFetch(`/api/author/media${q ? `?q=${encodeURIComponent(q)}` : ''}`);
    const data = (await response.json()) as { media?: CmsMediaRecord[] };
    setItems(data.media ?? []);
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  async function onUpload(file: File, alt: string) {
    const form = new FormData();
    form.set('file', file);
    form.set('alt', alt);
    const response = await cmsFetch('/api/author/media', { method: 'POST', body: form });
    const data = (await response.json()) as { ok?: boolean; error?: string };
    if (!data.ok) {
      setError(data.error ?? 'Upload failed.');
      return;
    }
    await load();
  }

  async function saveAlt(id: string, alt: string) {
    await cmsFetch(`/api/author/media/${id}`, { method: 'PATCH', body: JSON.stringify({ alt }) });
    await load();
  }

  async function remove(id: string) {
    if (!window.confirm('Delete this media file?')) return;
    const first = await cmsFetch(`/api/author/media/${id}`, { method: 'DELETE' });
    const data = (await first.json()) as { ok?: boolean; error?: string };
    if (first.status === 409) {
      if (!window.confirm(data.error ?? 'This image is used by articles. Delete anyway?')) return;
      await cmsFetch(`/api/author/media/${id}?confirm=1`, { method: 'DELETE' });
    }
    await load();
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3">
        <input
          className="min-h-10 rounded-xl border px-3 text-sm"
          placeholder="Search filename or alt"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter') void load(query);
          }}
        />
        <Button type="button" variant="outline" onClick={() => void load(query)}>
          Search
        </Button>
        <label className="inline-flex min-h-10 cursor-pointer items-center rounded-xl bg-[#E85D04] px-4 text-sm font-semibold text-white">
          Upload
          <input
            type="file"
            className="hidden"
            accept="image/jpeg,image/png,image/webp,image/gif"
            onChange={(event) => {
              const file = event.target.files?.[0];
              if (file) void onUpload(file, file.name);
            }}
          />
        </label>
      </div>
      {error ? <p className="text-sm text-destructive">{error}</p> : null}
      {items.length === 0 ? (
        <p className="rounded-2xl border border-dashed p-8 text-sm text-[#8A837C]">No media yet.</p>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <li key={item.id} className="rounded-2xl border border-[#F0E4D8] bg-white p-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={item.url} alt={item.alt} className="h-40 w-full rounded-xl object-cover" />
              <FormInput
                label="Alt text"
                value={item.alt}
                onChange={(event) => {
                  setItems((current) =>
                    current.map((row) => (row.id === item.id ? { ...row, alt: event.target.value } : row)),
                  );
                }}
                onBlur={(event) => void saveAlt(item.id, event.target.value)}
              />
              <div className="mt-2 flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={async () => {
                    await navigator.clipboard.writeText(item.url);
                    setCopied(item.id);
                  }}
                >
                  {copied === item.id ? 'Copied' : 'Copy URL'}
                </Button>
                <Button size="sm" variant="outline" onClick={() => void remove(item.id)}>
                  Delete
                </Button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
