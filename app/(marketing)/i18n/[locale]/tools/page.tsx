import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { JsonLdScript } from '@/components/common/json-ld';
import { ToolsHubView } from '@/components/tools/tools-hub-view';
import { routes } from '@/config/routes';
import { isLocalizedLocale } from '@/lib/i18n/config';
import { loadMetadataBundle, loadToolsBundle, loadUi } from '@/lib/i18n/content/load';
import { buildLocaleMetadata } from '@/lib/i18n/metadata';
import { localizeHref } from '@/lib/i18n/paths';
import { asJsonLdGraph } from '@/lib/seo/schema';
import { absoluteUrl } from '@/seo/canonical';
import { breadcrumbSchema } from '@/schemas/breadcrumb';
import { itemListSchema } from '@/schemas/web-application';
import { collectionPageSchema } from '@/schemas/website';
import { TOOLS } from '@/data/tools/registry';

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocalizedLocale(locale)) return {};
  const meta = loadMetadataBundle(locale).toolsHub;
  return buildLocaleMetadata({
    locale,
    pathname: '/tools',
    title: meta.title,
    description: meta.description,
  });
}

export default async function LocalizedToolsHubPage({ params }: PageProps) {
  const { locale } = await params;
  if (!isLocalizedLocale(locale)) notFound();

  const ui = loadUi(locale);
  const bundle = loadToolsBundle(locale);
  const meta = loadMetadataBundle(locale).toolsHub;
  const toolsHref = localizeHref(routes.tools, locale);

  const graph = asJsonLdGraph([
    collectionPageSchema({
      title: meta.title,
      description: meta.description,
      path: toolsHref,
    }),
    itemListSchema(
      TOOLS.map((tool) => ({
        name: bundle.registry[tool.slug].name,
        url: absoluteUrl(localizeHref(tool.href, locale)),
      })),
    ),
    breadcrumbSchema([
      { label: ui.breadcrumbs.home, href: localizeHref(routes.home, locale) },
      { label: ui.breadcrumbs.tools, href: toolsHref },
    ]),
  ]);

  return (
    <>
      <JsonLdScript id="tools-hub-jsonld" data={graph} />
      <ToolsHubView
        locale={locale}
        bundle={bundle}
        homeLabel={ui.breadcrumbs.home}
        toolsLabel={ui.breadcrumbs.tools}
      />
    </>
  );
}
