import type { Metadata } from 'next';
import { notFound, permanentRedirect } from 'next/navigation';

import { JsonLdScript } from '@/components/common/json-ld';
import { ArticlePage } from '@/components/learn/article';
import { LearnCategoryView } from '@/components/learn';
import { getLearnCategorySlugs, getPublishedLearnArticleSlugs } from '@/data/learn';
import {
  getArticleMetadata,
  getPublishedArticleBySlug,
  prepareArticleForRender,
} from '@/lib/learn/article';
import {
  getLearnArticlePageMetadata,
  getLearnCategoryMetadata,
  resolveLearnSegment,
} from '@/lib/learn';
import { buildArticlePageJsonLd } from '@/lib/learn/article-seo';
import { getCategoryPageJsonLd } from '@/lib/learn/taxonomy';
import { parseLearnSearchParams } from '@/lib/learn/search';
import { asJsonLdGraph } from '@/lib/seo/schema';
import { getPublishedCmsPublicArticle } from '@/lib/cms/learn-bridge';
import { cmsGetRedirect } from '@/lib/cms/store';

type LearnSegmentPageProps = {
  params: Promise<{ slug: string }>;
};

/**
 * Unified `/learn/[slug]` resolver — Documents 15.01 + 15.02 + 15.05.
 * Categories and published articles only. Drafts never render publicly.
 * CMS published articles resolve on demand without replacing the TS registry.
 */
export const dynamicParams = true;
export const revalidate = 60;

export function generateStaticParams() {
  const categories = getLearnCategorySlugs(false).map((slug) => ({ slug }));
  const articles = getPublishedLearnArticleSlugs().map((slug) => ({ slug }));
  return [...categories, ...articles];
}

export async function generateMetadata({
  params,
}: LearnSegmentPageProps): Promise<Metadata> {
  const { slug } = await params;
  const resolved = resolveLearnSegment(slug);
  if (resolved.kind === 'category') {
    return getLearnCategoryMetadata(slug);
  }
  if (resolved.kind === 'article') {
    return getLearnArticlePageMetadata(slug);
  }
  const cms = await getPublishedCmsPublicArticle(slug);
  if (cms) return getArticleMetadata(cms);
  notFound();
}

function renderPublicArticle(slug: string, article: ReturnType<typeof getPublishedArticleBySlug> | Awaited<ReturnType<typeof getPublishedCmsPublicArticle>>) {
  if (!article) return null;
  const prepared = prepareArticleForRender(article);
  const graph = asJsonLdGraph(buildArticlePageJsonLd(prepared.article));
  return (
    <>
      <JsonLdScript id={`learn-article-jsonld-${slug}`} data={graph} />
      <ArticlePage article={prepared.article} />
    </>
  );
}

export default async function LearnSegmentPage({ params }: LearnSegmentPageProps) {
  const { slug } = await params;
  const resolved = resolveLearnSegment(slug);

  if (resolved.kind === 'category') {
    const graph = asJsonLdGraph(getCategoryPageJsonLd(resolved.category));
    const initialState = parseLearnSearchParams(
      {},
      { lockedCategory: resolved.category.slug },
    ).state;

    return (
      <>
        <JsonLdScript id={`learn-category-jsonld-${slug}`} data={graph} />
        <LearnCategoryView
          category={resolved.category}
          initialState={initialState}
        />
      </>
    );
  }

  if (resolved.kind === 'article') {
    const article = getPublishedArticleBySlug(slug);
    const view = renderPublicArticle(slug, article);
    if (!view) notFound();
    return view;
  }

  const redirected = await cmsGetRedirect(slug);
  if (redirected && redirected !== slug) {
    permanentRedirect(`/learn/${redirected}`);
  }

  const cms = await getPublishedCmsPublicArticle(slug);
  const view = renderPublicArticle(slug, cms);
  if (!view) notFound();
  return view;
}
