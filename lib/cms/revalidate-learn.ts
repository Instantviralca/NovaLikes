import { revalidatePath } from 'next/cache';

export function revalidateLearnArticle(slug?: string | null) {
  revalidatePath('/learn');
  revalidatePath('/sitemap.xml');
  if (slug) {
    revalidatePath(`/learn/${slug}`);
    revalidatePath(`/learn/preview/${slug}`);
  }
}
