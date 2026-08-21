import type { ToolPlatform } from '@/lib/tools/types';
import { cn } from '@/lib/utils';

const LABEL: Record<ToolPlatform, string> = {
  instagram: 'Instagram',
  tiktok: 'TikTok',
  facebook: 'Facebook',
};

export function PlatformMark({
  platform,
  className,
}: {
  platform: ToolPlatform;
  className?: string;
}) {
  return (
    <span
      className={cn(
        'inline-flex size-9 shrink-0 items-center justify-center rounded-xl bg-[var(--brand-accent-soft)] text-[var(--brand-primary)]',
        className,
      )}
      aria-hidden="true"
    >
      {platform === 'instagram' ? (
        <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.8">
          <rect x="4" y="4" width="16" height="16" rx="5" />
          <circle cx="12" cy="12" r="3.5" />
          <circle cx="16.6" cy="7.4" r="0.9" fill="currentColor" stroke="none" />
        </svg>
      ) : platform === 'tiktok' ? (
        <svg viewBox="0 0 24 24" className="size-5" fill="currentColor">
          <path d="M14.2 4.2c.7 2.4 2.4 4 4.8 4.5v2.6c-1.7 0-3.3-.5-4.7-1.4v6.6c0 3.2-2.6 5.5-5.7 5.5S3 19.7 3 16.5c0-3 2.3-5.3 5.4-5.5v2.7c-1.2.2-2.1 1.2-2.1 2.5 0 1.4 1.1 2.5 2.5 2.5s2.5-1.1 2.5-2.5V4.2h2.9Z" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" className="size-5" fill="currentColor">
          <path d="M13.8 20.5v-7.1h2.4l.4-2.8h-2.8V8.8c0-.8.2-1.3 1.4-1.3h1.5V5c-.3 0-1.2-.1-2.2-.1-2.2 0-3.7 1.3-3.7 3.8v2h-2.5v2.8h2.5v7h3Z" />
        </svg>
      )}
    </span>
  );
}

export function PlatformPill({ platform }: { platform: ToolPlatform }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border-subtle)] bg-white/80 px-2.5 py-1 text-xs font-medium text-[var(--text-secondary)]">
      <PlatformMark platform={platform} className="size-6 rounded-lg" />
      {LABEL[platform]}
    </span>
  );
}

export function platformName(platform: ToolPlatform): string {
  return LABEL[platform];
}
