import Image from 'next/image';

import { cn } from '@/lib/utils';

type AboutHeroIllustrationProps = {
  className?: string;
  src?: string;
  alt?: string;
};

/** About hero — premium 3D social-growth illustration. */
export function AboutHeroIllustration({
  className,
  src = '/assets/images/illustrations/about/about-hero.webp',
  alt = 'NovaLikes dashboard representing Instagram, TikTok and Facebook services',
}: AboutHeroIllustrationProps) {
  return (
    <div
      className={cn(
        'relative mx-auto w-full max-w-[28rem] overflow-visible sm:max-w-[32rem] lg:max-w-[34rem]',
        className,
      )}
    >
      <div
        aria-hidden={true}
        className="pointer-events-none absolute top-1/2 left-1/2 size-[88%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FFE8D6]"
      />
      <Image
        src={src}
        alt={alt}
        width={1536}
        height={1024}
        className="relative z-10 h-auto w-full object-contain"
        priority
        sizes="(max-width: 1024px) 90vw, 34rem"
      />
    </div>
  );
}
