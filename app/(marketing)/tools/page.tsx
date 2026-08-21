import type { Metadata } from 'next';

import { JsonLdScript } from '@/components/common/json-ld';
import { ToolsHubView } from '@/components/tools/tools-hub-view';
import { routes } from '@/config/routes';
import { TOOLS } from '@/data/tools/registry';
import { asJsonLdGraph } from '@/lib/seo/schema';
import { absoluteUrl } from '@/seo/canonical';
import { breadcrumbSchema } from '@/schemas/breadcrumb';
import { itemListSchema } from '@/schemas/web-application';
import { collectionPageSchema } from '@/schemas/website';
import { descriptions } from '@/seo/descriptions';
import { titles } from '@/seo/titles';
import { toolsHubMetadata } from '@/seo/metadata';

export function generateMetadata(): Metadata {
  return toolsHubMetadata();
}

export default function ToolsHubPage() {
  const graph = asJsonLdGraph([
    collectionPageSchema({
      title: titles.toolsHub(),
      description: descriptions.toolsHub(),
      path: routes.tools,
    }),
    itemListSchema(
      TOOLS.map((tool) => ({
        name: tool.name,
        url: absoluteUrl(tool.href),
      })),
    ),
    breadcrumbSchema([
      { label: 'Home', href: routes.home },
      { label: 'Tools', href: routes.tools },
    ]),
  ]);

  return (
    <>
      <JsonLdScript id="tools-hub-jsonld" data={graph} />
      <ToolsHubView />
    </>
  );
}
