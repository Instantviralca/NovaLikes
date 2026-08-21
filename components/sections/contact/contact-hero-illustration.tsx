import Image from 'next/image';

import { cn } from '@/lib/utils';

type ContactHeroIllustrationProps = {
  className?: string;
  src?: string;
  alt?: string;
};

/** Contact hero — premium 3D support illustration. */
export function ContactHeroIllustration({
  className,
  src = '/assets/images/illustrations/contact/contact-hero.webp',
  alt = 'NovaLikes customer support illustration with chat and headphones',
}: ContactHeroIllustrationProps) {
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
