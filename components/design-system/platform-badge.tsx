import { cn } from '@/lib/utils';
import type { PlatformId } from '@/types/platform';

const PLATFORM_STYLES: Record<
  PlatformId,
  { label: string; accent: string; soft: string }
> = {
  instagram: {
    label: 'Instagram',
    accent: 'var(--platform-instagram)',
    soft: 'color-mix(in srgb, var(--platform-instagram) 14%, white)',
  },
  tiktok: {
    label: 'TikTok',
    accent: 'var(--platform-tiktok)',
    soft: 'color-mix(in srgb, #00f2ea 18%, white)',
  },
  facebook: {
    label: 'Facebook',
    accent: 'var(--platform-facebook)',
    soft: 'color-mix(in srgb, var(--platform-facebook) 14%, white)',
  },
  youtube: {
    label: 'YouTube',
    accent: 'var(--platform-youtube)',
    soft: 'color-mix(in srgb, var(--platform-youtube) 14%, white)',
  },
};

type PlatformBadgeProps = {
  platform: PlatformId;
  className?: string;
  size?: 'sm' | 'md';
};

/**
 * Subtle platform accent badge — NovaLikes brand remains dominant.
 */
export function PlatformBadge({ platform, className, size = 'sm' }: PlatformBadgeProps) {
  const meta = PLATFORM_STYLES[platform];
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border border-black/5 font-semibold tracking-wide uppercase',
        size === 'sm' && 'px-2.5 py-1 text-[10px]',
        size === 'md' && 'px-3 py-1.5 text-xs',
        className,
      )}
      style={{
        background: meta.soft,
        color: 'var(--text-primary)',
        boxShadow: `inset 3px 0 0 ${meta.accent}`,
      }}
    >
      {meta.label}
    </span>
  );
}
