import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { JsonLdScript } from '@/components/common/json-ld';
import { InstagramProfileViewerPage } from '@/components/tools/instagram-profile-viewer/page-view';
import { ToolPageView } from '@/components/tools/tool-page-view';
import { routes } from '@/config/routes';
import { TOOL_PAGE_COPY } from '@/data/tools/copy';
import { TOOLS, getToolBySlug } from '@/data/tools/registry';
import { getMetadataByRoute } from '@/lib/seo/metadata';
import { asJsonLdGraph } from '@/lib/seo/schema';
import { breadcrumbSchema } from '@/schemas/breadcrumb';
import { webApplicationSchema } from '@/schemas/web-application';
import { toolPageMetadata } from '@/seo/metadata';

type ToolPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return TOOLS.map((tool) => ({ slug: tool.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: ToolPageProps): Promise<Metadata> {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) return {};
  return toolPageMetadata(tool.slug);
}

export default async function ToolPage({ params }: ToolPageProps) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  const copy = TOOL_PAGE_COPY[tool?.slug as keyof typeof TOOL_PAGE_COPY];
  if (!tool || !copy) notFound();

  const entry = getMetadataByRoute(tool.href);

  const graph = asJsonLdGraph([
    webApplicationSchema({
      name: tool.name,
      description: entry?.description ?? tool.shortDescription,
      path: tool.href,
    }),
    breadcrumbSchema([
      { label: 'Home', href: routes.home },
      { label: 'Tools', href: routes.tools },
      { label: tool.name, href: tool.href },
    ]),
  ]);

  return (
    <>
      <JsonLdScript id={`tool-${tool.slug}-jsonld`} data={graph} />
      {tool.slug === 'instagram-profile-viewer' ? (
        <InstagramProfileViewerPage tool={tool} copy={copy} />
      ) : (
        <ToolPageView tool={tool} copy={copy} />
      )}
    </>
  );
}
