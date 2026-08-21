import Image from 'next/image';

import { cn } from '@/lib/utils';
import type { PublicAuthor } from '@/types/author';

type AuthorAvatarProps = {
  author: Pick<PublicAuthor, 'name' | 'avatar'>;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
};

const SIZE_MAP = {
  sm: { px: 40, className: 'h-10 w-10 text-sm' },
  md: { px: 64, className: 'h-16 w-16 text-base' },
  lg: { px: 96, className: 'h-24 w-24 text-xl' },
} as const;

/**
 * Accessible author avatar — Document 15.03.
 * Falls back to initial when avatar is missing (never invents imagery).
 */
export function AuthorAvatar({
  author,
  size = 'md',
  className,
}: AuthorAvatarProps) {
  const dims = SIZE_MAP[size];
  const initial = author.name.trim().slice(0, 1).toUpperCase() || '?';

  if (!author.avatar) {
    return (
      <div
        className={cn(
          'flex shrink-0 items-center justify-center overflow-hidden rounded-full border border-neutral-200 bg-neutral-50 font-semibold text-neutral-600',
          dims.className,
          className,
        )}
        aria-hidden="true"
      >
        {initial}
      </div>
    );
  }

  return (
    <Image
      src={author.avatar}
      alt={`Portrait of ${author.name}`}
      width={dims.px}
      height={dims.px}
      className={cn(
        'shrink-0 overflow-hidden rounded-full object-cover object-top',
        dims.className,
        className,
      )}
    />
  );
}
