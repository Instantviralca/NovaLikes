'use client';

import { loginAuthorAction } from '@/lib/cms/login-action';

export function AuthorLoginForm({
  nextPath,
  initialError,
}: {
  nextPath: string;
  initialError?: string;
}) {
  return (
    <form action={loginAuthorAction} className="space-y-5">
      <input type="hidden" name="next" value={nextPath} />

      <label className="block space-y-2">
        <span className="text-sm font-medium text-[#3D3935]">Email</span>
        <input
          id="author-email"
          name="email"
          type="email"
          autoComplete="username"
          required
          placeholder="you@novalikes.com"
          className="min-h-12 w-full rounded-2xl border border-[#EADFD4] bg-[#FFFCF8] px-4 text-[15px] text-[#1A1A1A] outline-none transition placeholder:text-[#B3AAA3] focus:border-[#E85D04] focus:bg-white focus:ring-4 focus:ring-[#E85D04]/15"
        />
      </label>

      <label className="block space-y-2">
        <span className="text-sm font-medium text-[#3D3935]">Password</span>
        <input
          id="author-password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          placeholder="Enter your password"
          className="min-h-12 w-full rounded-2xl border border-[#EADFD4] bg-[#FFFCF8] px-4 text-[15px] text-[#1A1A1A] outline-none transition placeholder:text-[#B3AAA3] focus:border-[#E85D04] focus:bg-white focus:ring-4 focus:ring-[#E85D04]/15"
        />
      </label>

      {initialError ? (
        <p className="rounded-xl bg-[#FFF1F0] px-3 py-2 text-sm text-[#C0392B]" role="alert">
          {initialError}
        </p>
      ) : null}

      <button
        type="submit"
        className="flex min-h-12 w-full items-center justify-center rounded-2xl bg-[#E85D04] text-[15px] font-semibold text-white shadow-[0_10px_24px_rgba(232,93,4,0.28)] transition hover:bg-[#D35400]"
      >
        Sign in
      </button>
    </form>
  );
}
