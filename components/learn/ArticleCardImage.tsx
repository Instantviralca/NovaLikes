'use client';

import Image from 'next/image';
import { useState } from 'react';

import type { LearnCategoryId } from '@/types/learn';
import type { ArticleImageMeta } from '@/types/learn-article-blocks';

const PLATFORM_ICON: Partial<Record<LearnCategoryId, string>> = {
  instagram: '/assets/platforms/instagram.svg',
  tiktok: '/assets/platforms/tiktok.svg',
  facebook: '/assets/platforms/facebook.svg',
  youtube: '/assets/platforms/youtube.svg',
};

type ArticleCardImageProps = {
  image: ArticleImageMeta;
  category: LearnCategoryId | string;
  priority?: boolean;
  sizes?: string;
};

export function ArticleCardImage({
  image,
  category,
  priority = false,
  sizes = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw',
}: ArticleCardImageProps) {
  const [failed, setFailed] = useState(false);
  const fallbackSrc =
    PLATFORM_ICON[category as LearnCategoryId] ?? '/assets/logos/logo.svg';

  if (failed) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-[#FFF8F3]">
        <Image
          src={fallbackSrc}
          alt=""
          width={64}
          height={64}
          className="h-16 w-16 object-contain"
        />
      </div>
    );
  }

  return (
    <Image
      src={image.src}
      alt=""
      width={image.width}
      height={image.height}
      className="h-full w-full object-cover"
      loading={priority ? undefined : 'lazy'}
      priority={priority}
      sizes={sizes}
      onError={() => setFailed(true)}
    />
  );
}
