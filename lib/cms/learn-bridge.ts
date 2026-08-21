import { learnArticlePath } from '@/config/routes';
import { cmsGetArticleBySlug, cmsGetUserById, cmsListArticles } from '@/lib/cms/store';
import { cmsReadingTime, isPublicCmsArticle } from '@/lib/cms/articles';
import type { CmsArticleRecord } from '@/lib/cms/types';
import { authorPath } from '@/lib/authors/paths';
import { toPublicLearnArticle } from '@/lib/learn/getters';
import type { LearnArticleRecord, PublicLearnArticle } from '@/types/learn';
import type { PublicAuthor } from '@/types/author';

export function cmsArticleToLearnRecord(article: CmsArticleRecord): LearnArticleRecord {
  const publishedAt = article.publishedAt || article.publishAt || article.createdAt;
  const live = isPublicCmsArticle(article);
  return {
    id: article.id,
    slug: article.slug,
    title: article.title,
    excerpt: article.excerpt,
    content: article.excerpt,
    blocks: article.blocks,
    category: article.category,
    tags: article.tags,
    authorId: article.authorId || 'author-novalikes-editorial',
    featuredImage: article.featuredImageUrl
      ? {
          src: article.featuredImageUrl,
          alt: article.featuredImageAlt || article.title,
          width: article.featuredImageWidth || 1200,
          height: article.featuredImageHeight || 800,
        }
      : undefined,
    readingTime: cmsReadingTime(article),
    publishedAt,
    updatedAt: article.updatedAt,
    showModifiedDate: article.updatedAt !== publishedAt,
    seo: {
      title: article.seoTitle || `${article.title} | NovaLikes Learn`,
      description: article.seoDescription || article.excerpt,
      canonicalPath: article.canonicalPath || learnArticlePath(article.slug),
      ogImage: article.featuredImageUrl || undefined,
      noindex: !live,
    },
    relatedServices: article.relatedServices,
    relatedArticles: article.relatedArticles,
    featured: false,
    published: live,
    status: live ? 'published' : article.status === 'scheduled' ? 'scheduled' : 'draft',
    keyTakeaways: article.keyTakeaways,
    faqs: article.faqs,
    editorialApproved: live,
    scheduledAt: article.publishAt || undefined,
  };
}

export function cmsArticleToPublic(article: CmsArticleRecord): PublicLearnArticle | null {
  if (!isPublicCmsArticle(article)) return null;
  return toPublicLearnArticle(cmsArticleToLearnRecord(article));
}

export async function listPublishedCmsPublicArticles(): Promise<PublicLearnArticle[]> {
  try {
    const articles = await cmsListArticles({ status: 'published' });
    return articles
      .map(cmsArticleToPublic)
      .filter((item): item is PublicLearnArticle => Boolean(item));
  } catch {
    return [];
  }
}

export async function getPublishedCmsPublicArticle(slug: string): Promise<PublicLearnArticle | null> {
  try {
    const article = await cmsGetArticleBySlug(slug);
    if (!article) return null;
    const publicArticle = cmsArticleToPublic(article);
    if (!publicArticle) return null;
    const author = await cmsUserToPublicAuthor(article.authorId);
    return { ...publicArticle, author };
  } catch {
    return null;
  }
}

export async function getCmsLearnRecordBySlug(slug: string): Promise<LearnArticleRecord | null> {
  try {
    const article = await cmsGetArticleBySlug(slug);
    return article ? cmsArticleToLearnRecord(article) : null;
  } catch {
    return null;
  }
}

export async function cmsUserToPublicAuthor(userId: string | null): Promise<PublicAuthor | undefined> {
  if (!userId || userId === 'admin') return undefined;
  const user = await cmsGetUserById(userId);
  if (!user || user.status !== 'active') return undefined;
  const slug = `author-${user.id}`;
  return {
    id: user.id,
    slug,
    name: user.name,
    role: 'Author',
    bio: user.bio || '',
    avatar: user.profileImage || undefined,
    expertise: [],
    joinedAt: user.createdAt,
    active: true,
    featured: false,
    seo: {
      title: `${user.name} | NovaLikes`,
      description: user.bio || `${user.name} writes for NovaLikes Learn.`,
      canonicalPath: authorPath(slug),
    },
    articleCount: 0,
    profilePath: authorPath(slug),
  };
}

export function mergePublicArticles(
  registry: PublicLearnArticle[],
  cms: PublicLearnArticle[],
): PublicLearnArticle[] {
  const taken = new Set(registry.map((article) => article.slug));
  return [...registry, ...cms.filter((article) => !taken.has(article.slug))];
}
