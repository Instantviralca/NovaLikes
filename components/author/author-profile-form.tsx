'use client';

import { FormEvent, useEffect, useState } from 'react';

import { cmsFetch } from '@/components/author/cms-fetch';
import { Button } from '@/components/ui/button';
import { FormInput } from '@/components/forms/form-input';

type Profile = {
  name: string;
  email: string;
  bio: string | null;
  profileImage: string | null;
};

export function AuthorProfileForm() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    void (async () => {
      const response = await cmsFetch('/api/author/me');
      const data = (await response.json()) as { user?: Profile };
      if (data.user) setProfile({ ...data.user, bio: data.user.bio ?? '', profileImage: data.user.profileImage ?? '' });
    })();
  }, []);

  if (!profile) return <p className="text-sm text-[#8A837C]">Loading profile…</p>;

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setError(null);
    setMessage(null);
    const response = await cmsFetch('/api/author/profile', {
      method: 'PATCH',
      body: JSON.stringify({
        ...profile,
        password: password || undefined,
      }),
    });
    const data = (await response.json()) as { ok?: boolean; error?: string };
    if (!response.ok || !data.ok) {
      setError(data.error ?? 'Could not update profile.');
      return;
    }
    setPassword('');
    setMessage('Profile saved.');
  }

  return (
    <form className="max-w-xl space-y-4 rounded-2xl border border-[#F0E4D8] bg-white p-5" onSubmit={onSubmit}>
      <FormInput
        id="author-name"
        label="Name"
        value={profile.name}
        onChange={(event) => setProfile({ ...profile, name: event.target.value })}
      />
      <FormInput
        id="author-email"
        label="Email"
        type="email"
        value={profile.email}
        onChange={(event) => setProfile({ ...profile, email: event.target.value })}
        helper="Changing email updates your login."
      />
      <FormInput
        id="author-profile-image"
        label="Profile image URL"
        value={profile.profileImage ?? ''}
        onChange={(event) => setProfile({ ...profile, profileImage: event.target.value })}
      />
      <label className="text-sm font-medium" htmlFor="bio">
        Bio
      </label>
      <textarea
        id="bio"
        className="min-h-28 w-full rounded-lg border px-3 py-2 text-sm"
        value={profile.bio ?? ''}
        onChange={(event) => setProfile({ ...profile, bio: event.target.value })}
      />
      <FormInput
        id="author-new-password"
        label="New password"
        type="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        helper="Leave blank to keep the current password. Minimum 12 characters."
      />
      {message ? (
        <p className="text-sm text-emerald-700" data-testid="profile-status" role="status">
          {message}
        </p>
      ) : null}
      {error ? (
        <p className="text-sm text-destructive" data-testid="profile-status" role="alert">
          {error}
        </p>
      ) : null}
      <Button type="submit">Save profile</Button>
    </form>
  );
}
