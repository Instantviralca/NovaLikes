import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { JsonLdScript } from '@/components/common/json-ld';
import { InstagramProfileViewerPage } from '@/components/tools/instagram-profile-viewer/page-view';
import { ToolPageView } from '@/components/tools/tool-page-view';
import { routes } from '@/config/routes';
import { getRelatedTools, getToolBySlug, type ToolDefinition } from '@/data/tools/registry';
import { TOOL_SLUGS, isLocalizedLocale, isToolSlug, type Locale } from '@/lib/i18n/config';
import { loadMetadataBundle, loadToolsBundle, loadUi } from '@/lib/i18n/content/load';
import { buildLocaleMetadata } from '@/lib/i18n/metadata';
import { localizeHref } from '@/lib/i18n/paths';
import { asJsonLdGraph } from '@/lib/seo/schema';
import { breadcrumbSchema } from '@/schemas/breadcrumb';
import { webApplicationSchema } from '@/schemas/web-application';
import type { ToolsBundle } from '@/lib/i18n/content/tools-english';

type PageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return TOOL_SLUGS.map((slug) => ({ slug }));
}

export const dynamicParams = false;

function localizeTool(tool: ToolDefinition, locale: Locale, bundle: ToolsBundle): ToolDefinition {
  const overlay = bundle.registry[tool.slug];
  return {
    ...tool,
    name: overlay.name,
    shortDescription: overlay.shortDescription,
    placeholder: overlay.placeholder,
    actionLabel: overlay.actionLabel,
    availabilityLabel: overlay.availabilityLabel,
    href: localizeHref(tool.href, locale),
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocalizedLocale(locale) || !isToolSlug(slug)) return {};
  const meta = loadMetadataBundle(locale).tools[slug];
  if (!meta) return {};
  return buildLocaleMetadata({
    locale,
    pathname: `/tools/${slug}`,
    title: meta.title,
    description: meta.description,
  });
}

export default async function LocalizedToolPage({ params }: PageProps) {
  const { locale, slug } = await params;
  if (!isLocalizedLocale(locale) || !isToolSlug(slug)) notFound();

  const tool = getToolBySlug(slug);
  if (!tool) notFound();

  const ui = loadUi(locale);
  const bundle = loadToolsBundle(locale);
  const copy = bundle.pages[tool.slug];
  const meta = loadMetadataBundle(locale).tools[slug];
  const localizedTool = localizeTool(tool, locale, bundle);
  const relatedTools = getRelatedTools(tool.slug).map((item) => localizeTool(item, locale, bundle));
  const localizedUrl = localizeHref(tool.href, locale);

  const graph = asJsonLdGraph([
    webApplicationSchema({
      name: localizedTool.name,
      description: meta?.description ?? localizedTool.shortDescription,
      path: localizedUrl,
    }),
    breadcrumbSchema([
      { label: ui.breadcrumbs.home, href: localizeHref(routes.home, locale) },
      { label: ui.breadcrumbs.tools, href: localizeHref(routes.tools, locale) },
      { label: localizedTool.name, href: localizedUrl },
    ]),
  ]);

  const shared = {
    tool: localizedTool,
    copy,
    locale,
    chrome: bundle.chrome,
    relatedTools,
    homeLabel: ui.breadcrumbs.home,
    toolsLabel: ui.breadcrumbs.tools,
    toolsHref: localizeHref(routes.tools, locale),
  };

  return (
    <>
      <JsonLdScript id={`tool-${tool.slug}-jsonld`} data={graph} />
      {tool.slug === 'instagram-profile-viewer' ? (
        <InstagramProfileViewerPage {...shared} profileViewer={bundle.profileViewer} />
      ) : (
        <ToolPageView
          {...shared}
          layoutCopy={bundle.layout[tool.slug as keyof typeof bundle.layout]}
        />
      )}
    </>
  );
}
