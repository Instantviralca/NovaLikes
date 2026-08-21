import Image from 'next/image';

import { cn } from '@/lib/utils';

const BASE = '/assets/images/tools/instagram-profile-viewer';

export type SnapArtName =
  | 'hero-portrait'
  | 'editorial-card'
  | 'see-photo'
  | 'see-bio'
  | 'see-followers'
  | 'see-posts'
  | 'step-search'
  | 'step-scan'
  | 'step-done'
  | 'related-picture'
  | 'related-counter'
  | 'related-video'
  | 'cta-growth';

export function SnapArt({
  name,
  className,
  alt = '',
}: {
  name: SnapArtName;
  className?: string;
  alt?: string;
}) {
  const isHero = name === 'hero-portrait';
  const wide = name.startsWith('related-') || name.startsWith('step-') || name === 'editorial-card' || name === 'cta-growth';
  return (
    <Image
      src={`${BASE}/${name}.webp`}
      alt={alt}
      width={wide ? 1536 : 1024}
      height={wide ? 1024 : 1024}
      sizes={isHero ? '(max-width: 1024px) 100vw, 36rem' : '(max-width: 768px) 50vw, 16rem'}
      priority={isHero}
      loading={isHero ? undefined : 'lazy'}
      className={cn('h-auto w-full select-none object-contain', className)}
    />
  );
}

export function Squiggle({ className, color = '#B9A4F0' }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 72 14" className={className} aria-hidden="true">
      <path
        d="M2 8 C 12 2, 18 12, 28 8 S 44 2, 54 8 70 12, 70 8"
        fill="none"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function StepArrow({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 72 24" className={className} aria-hidden="true">
      <path d="M2 12 H58" stroke="#E85D04" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M50 5 l12 7 -12 7" fill="none" stroke="#E85D04" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  );
}

export { HeroWash, PageDoodles } from '@/components/layout/illustrated-surface';

