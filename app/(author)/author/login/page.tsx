import type { Metadata } from 'next';

import { AuthorLoginForm } from '@/components/author/author-login-form';

export const metadata: Metadata = {
  title: 'Author Login',
  robots: { index: false, follow: false },
};

function safeNextPath(value: string | undefined): string {
  if (!value?.startsWith('/author')) return '/author';
  if (value.startsWith('//') || value.includes('\\') || value.includes('://')) return '/author';
  return value;
}

export default async function AuthorLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string; error?: string }>;
}) {
  const { next, error } = await searchParams;

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#FFF8F3] text-[#1A1A1A]">
      <div className="pointer-events-none absolute -left-24 -top-28 h-80 w-80 rounded-full bg-[#E85D04]/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-28 -right-20 h-96 w-96 rounded-full bg-[#F4A261]/25 blur-3xl" />
      <div className="pointer-events-none absolute left-1/2 top-24 h-40 w-40 -translate-x-1/2 rounded-full bg-white/70 blur-2xl" />

      <div className="relative flex min-h-screen items-center justify-center px-4 py-12">
        <div className="w-full max-w-[440px]">
          <div className="mb-8 text-center">
            <p className="text-[11px] font-semibold tracking-[0.28em] text-[#E85D04]">NOVALIKES</p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight">Author Dashboard</h1>
            <p className="mt-2 text-sm leading-6 text-[#8A837C]">
              Sign in to write, schedule, and publish Learn articles.
            </p>
          </div>

          <div className="rounded-[28px] border border-[#F0E4D8] bg-white/90 p-7 shadow-[0_24px_60px_rgba(61,40,23,0.08)] backdrop-blur sm:p-8">
            <AuthorLoginForm nextPath={safeNextPath(next)} initialError={error} />
          </div>
        </div>
      </div>
    </div>
  );
}
