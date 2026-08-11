import type { Metadata } from 'next';

import { JsonLdScript } from '@/components/common/json-ld';
import { TrackOrderPage } from '@/components/tracking';
import { routes } from '@/config/routes';
import { asJsonLdGraph } from '@/lib/seo/schema';
import { getMetadataByRoute } from '@/lib/seo/metadata';
import { breadcrumbSchema } from '@/schemas/breadcrumb';
import { webPageSchema } from '@/schemas/website';
import { trackOrderMetadata } from '@/seo/metadata';

/** Public Track Order form may be indexable; private results must never be. */
export const metadata: Metadata = trackOrderMetadata();

export default function TrackOrderRoute() {
  const entry = getMetadataByRoute(routes.trackOrder);
  const graph = asJsonLdGraph([
    webPageSchema({
      title: entry?.title ?? 'Track Order | NovaLikes',
      description:
        entry?.description ??
        'Track your NovaLikes order status using your order details.',
      path: routes.trackOrder,
    }),
    breadcrumbSchema([
      { label: 'Home', href: routes.home },
      { label: 'Track Order', href: routes.trackOrder },
    ]),
  ]);

  return (
    <>
      <JsonLdScript id="track-order-jsonld" data={graph} />
      <TrackOrderPage />
    </>
  );
}
