import type { Metadata } from 'next';

import { JsonLdScript } from '@/components/common/json-ld';
import { TrackOrderPage } from '@/components/tracking';
import { routes } from '@/config/routes';
import { asJsonLdGraph } from '@/lib/seo/schema';
import { webPageSchema } from '@/schemas/website';
import { descriptions } from '@/seo/descriptions';
import { titles } from '@/seo/titles';
import { trackOrderMetadata } from '@/seo/metadata';

export const metadata: Metadata = trackOrderMetadata();

export default function TrackOrderRoute() {
  const graph = asJsonLdGraph([
    webPageSchema({
      title: titles.trackOrder(),
      description: descriptions.trackOrder(),
      path: routes.trackOrder,
    }),
  ]);

  return (
    <>
      <JsonLdScript id="track-order-jsonld" data={graph} />
      <TrackOrderPage />
    </>
  );
}
