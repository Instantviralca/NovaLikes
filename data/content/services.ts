import { facebookContent } from '@/data/content/facebook';
import { instagramContent } from '@/data/content/instagram';
import { tiktokContent } from '@/data/content/tiktok';
import type { ServiceContent } from '@/types/content';

const allServiceContent: Record<string, ServiceContent> = {
  ...instagramContent,
  ...tiktokContent,
  ...facebookContent,
};

export function getServiceContentBySlug(slug: string): ServiceContent | undefined {
  return allServiceContent[slug];
}

export function getAllServiceContent(): ServiceContent[] {
  return Object.values(allServiceContent);
}

export function getServiceContentSlugs(): string[] {
  return Object.keys(allServiceContent);
}
