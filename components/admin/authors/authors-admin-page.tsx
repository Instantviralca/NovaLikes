'use client';

import { FormEvent, useEffect, useState } from 'react';

import { cmsFetch } from '@/components/author/cms-fetch';
import { Button } from '@/components/ui/button';
import { FormInput } from '@/components/forms/form-input';
import type { CmsUserPublic } from '@/lib/cms/types';

export function AuthorsAdminPage() {
  const [authors, setAuthors] = useState<CmsUserPublic[]>([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  async function load() {
    const response = await cmsFetch('/api/admin/authors');
    const data = (await response.json()) as { authors?: CmsUserPublic[]; error?: string };
    if (!response.ok) {
      setError(data.error ?? 'Unable to load authors.');
      return;
    }
    setAuthors(data.authors ?? []);
  }

  useEffect(() => {
    void load();
  }, []);

  async function create(event: FormEvent) {
    event.preventDefault();
    setError(null);
    const response = await cmsFetch('/api/admin/authors', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
    });
    const data = (await response.json()) as { ok?: boolean; error?: string };
    if (!response.ok || !data.ok) {
      setError(data.error ?? 'Could not create author.');
      return;
    }
    setName('');
    setEmail('');
    setPassword('');
    await load();
  }

  async function patch(id: string, body: Record<string, unknown>) {
    const response = await cmsFetch(`/api/admin/authors/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(body),
    });
    const data = (await response.json()) as { ok?: boolean; error?: string };
    if (!response.ok || !data.ok) {
      setError(data.error ?? 'Update failed.');
      return;
    }
    await load();
  }

  async function remove(id: string) {
    if (!window.confirm('Delete this author? They will lose login access immediately.')) return;
    await cmsFetch(`/api/admin/authors/${id}`, { method: 'DELETE' });
    await load();
  }

  return (
    <div className="space-y-6 overflow-x-hidden">
      <h1 className="text-2xl font-semibold">Authors</h1>
      <form className="grid gap-3 rounded-2xl border bg-white p-4 md:grid-cols-4" onSubmit={create}>
        <FormInput id="admin-author-name" label="Name" value={name} onChange={(event) => setName(event.target.value)} required />
        <FormInput id="admin-author-email" label="Email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
        <FormInput
          id="admin-author-password"
          label="Password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          helper="Min 12 characters"
          required
        />
        <div className="flex items-end">
          <Button type="submit">Add author</Button>
        </div>
      </form>
      {error ? <p className="text-sm text-destructive">{error}</p> : null}
      <div className="overflow-x-auto rounded-2xl border bg-white">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b bg-muted/40">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Role</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Last login</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {authors.map((author) => (
              <tr key={author.id} className="border-b last:border-0">
                <td className="px-4 py-3">{author.name}</td>
                <td className="px-4 py-3">{author.email}</td>
                <td className="px-4 py-3">{author.role}</td>
                <td className="px-4 py-3">
                  <span
                    data-testid="author-status"
                    className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ring-1 ${
                      author.status === 'active'
                        ? 'bg-emerald-50 text-emerald-800 ring-emerald-200'
                        : 'bg-stone-100 text-stone-700 ring-stone-300'
                    }`}
                  >
                    {author.status}
                  </span>
                </td>
                <td className="px-4 py-3">{author.lastLoginAt?.slice(0, 16) ?? '—'}</td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-1">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        const next = window.prompt('Author display name', author.name);
                        if (next && next.trim()) void patch(author.id, { name: next.trim() });
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        if (author.status === 'active') {
                          if (!window.confirm(`Disable ${author.email}? Active sessions will be revoked immediately.`)) {
                            return;
                          }
                        }
                        void patch(author.id, { status: author.status === 'active' ? 'disabled' : 'active' });
                      }}
                    >
                      {author.status === 'active' ? 'Disable' : 'Enable'}
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        const next = window.prompt('New password (min 12 characters)');
                        if (next) void patch(author.id, { password: next });
                      }}
                    >
                      Reset password
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => void remove(author.id)}>
                      Delete
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
