import type { ReactNode } from 'react';
import { Play, Search, Users } from 'lucide-react';

import { cn } from '@/lib/utils';

export function ToolsHubHeroArt({ className }: { className?: string }) {
  return (
    <div className={cn('relative mx-auto w-full max-w-[34rem]', className)} aria-hidden="true">
      <span className="pointer-events-none absolute -left-8 top-8 size-40 rounded-full bg-[#F3E8FF] blur-2xl" />
      <span className="pointer-events-none absolute -right-6 bottom-4 size-44 rounded-full bg-[#FFE4D1] blur-2xl" />

      <Sparkle className="absolute left-[18%] top-2 text-[#F4A261]" />
      <Sparkle className="absolute right-[22%] top-10 text-[#E07A5F]" />
      <Sparkle className="absolute bottom-8 left-[8%] text-[#C9B6F2]" />
      <Sparkle className="absolute bottom-4 right-[12%] text-[#E07A5F]" />

      <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 400 340" fill="none">
        <path
          d="M62 78 C 90 70, 118 92, 148 108"
          stroke="#D8D0EA"
          strokeWidth="1.6"
          strokeDasharray="4 6"
          strokeLinecap="round"
        />
        <path
          d="M338 86 C 300 78, 270 108, 248 128"
          stroke="#F0C7B0"
          strokeWidth="1.6"
          strokeDasharray="4 6"
          strokeLinecap="round"
        />
        <path
          d="M338 268 C 300 250, 268 236, 248 220"
          stroke="#C9E8E2"
          strokeWidth="1.6"
          strokeDasharray="4 6"
          strokeLinecap="round"
        />
      </svg>

      <span className="absolute left-1 top-10 z-10 inline-flex size-12 items-center justify-center rounded-full bg-[#C9B6F2] text-white shadow-[0_10px_24px_-10px_rgba(120,80,180,0.55)] sm:size-14">
        <Users className="size-6" />
      </span>
      <span className="absolute right-0 top-6 z-10 inline-flex size-[4.25rem] items-center justify-center rounded-full bg-gradient-to-br from-[#FF8A4C] to-[#F472B6] text-white shadow-[0_12px_28px_-10px_rgba(232,93,4,0.55)] sm:size-[4.75rem]">
        <Play className="size-7 fill-current" />
      </span>
      <span className="absolute bottom-6 right-1 z-10 inline-flex size-12 items-center justify-center rounded-full bg-[#7DD3C7] text-white shadow-[0_10px_24px_-10px_rgba(45,140,130,0.5)] sm:size-14">
        <Users className="size-6" />
      </span>

      <div className="relative z-[1] mx-8 mt-14 rounded-[1.65rem] bg-[#F3F1F4] p-4 shadow-[0_22px_50px_-24px_rgba(60,40,50,0.45)] sm:mx-10 sm:p-5">
        <div className="mb-4 flex gap-1.5">
          <span className="size-2.5 rounded-full bg-[#F4A4A4]" />
          <span className="size-2.5 rounded-full bg-[#F6D38A]" />
          <span className="size-2.5 rounded-full bg-[#B8E0A8]" />
        </div>

        <div className="flex h-12 items-center rounded-2xl bg-white pl-4 pr-1.5 shadow-sm">
          <span className="min-w-0 flex-1 truncate text-[13px] text-[#B0A9B4]">@username or profile URL</span>
          <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-xl bg-[#FF6B35] text-white">
            <Search className="size-4" />
          </span>
        </div>

        <ul className="mt-3 space-y-2.5">
          <HeroRow
            icon={<InstagramGlyph />}
            stroke="#FF6B35"
            points="2,18 8,14 14,16 20,8 28,11 36,4"
          />
          <HeroRow
            icon={<TikTokGlyph />}
            stroke="#8B5CF6"
            points="2,10 8,14 14,8 20,16 28,12 36,15"
          />
          <HeroRow
            icon={<FacebookGlyph />}
            stroke="#3B82F6"
            points="2,14 8,10 14,15 20,9 28,13 36,7"
          />
        </ul>
      </div>
    </div>
  );
}

function HeroRow({
  icon,
  stroke,
  points,
}: {
  icon: ReactNode;
  stroke: string;
  points: string;
}) {
  return (
    <li className="flex items-center gap-3 rounded-2xl bg-white px-3 py-2.5 shadow-sm">
      {icon}
      <span className="min-w-0 flex-1 space-y-1.5">
        <span className="block h-2 w-[72%] rounded-full bg-[#E6E2E8]" />
        <span className="block h-2 w-[46%] rounded-full bg-[#EDEAF0]" />
      </span>
      <svg viewBox="0 0 38 22" className="h-7 w-11 shrink-0" fill="none">
        <polyline points={points} stroke={stroke} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </li>
  );
}

function Sparkle({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" className={cn('absolute size-3.5', className)}>
      <path d="M8 0 L9.4 6.6 L16 8 L9.4 9.4 L8 16 L6.6 9.4 L0 8 L6.6 6.6 Z" fill="currentColor" />
    </svg>
  );
}

function InstagramGlyph() {
  return (
    <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-xl bg-[linear-gradient(45deg,#F58529,#DD2A7B,#8134AF)] text-white">
      <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="4" y="4" width="16" height="16" rx="5" />
        <circle cx="12" cy="12" r="3.4" />
        <circle cx="16.6" cy="7.4" r="0.9" fill="currentColor" stroke="none" />
      </svg>
    </span>
  );
}

function TikTokGlyph() {
  return (
    <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-xl bg-[#111] text-white">
      <svg viewBox="0 0 24 24" className="size-4" fill="currentColor">
        <path d="M14.2 4.2c.7 2.4 2.4 4 4.8 4.5v2.6c-1.7 0-3.3-.5-4.7-1.4v6.6c0 3.2-2.6 5.5-5.7 5.5S3 19.7 3 16.5c0-3 2.3-5.3 5.4-5.5v2.7c-1.2.2-2.1 1.2-2.1 2.5 0 1.4 1.1 2.5 2.5 2.5s2.5-1.1 2.5-2.5V4.2h2.9Z" />
      </svg>
    </span>
  );
}

function FacebookGlyph() {
  return (
    <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-xl bg-[#1877F2] text-white">
      <svg viewBox="0 0 24 24" className="size-4" fill="currentColor">
        <path d="M13.8 20.5v-7.1h2.4l.4-2.8h-2.8V8.8c0-.8.2-1.3 1.4-1.3h1.5V5c-.3 0-1.2-.1-2.2-.1-2.2 0-3.7 1.3-3.7 3.8v2h-2.5v2.8h2.5v7h3Z" />
      </svg>
    </span>
  );
}
