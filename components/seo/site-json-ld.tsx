import { JsonLdScript } from '@/components/common/json-ld';
import { asJsonLdGraph } from '@/lib/seo/schema';
import { organizationSchema } from '@/schemas/organization';
import { websiteSchema } from '@/schemas/website';

/** Single Organization + WebSite graph for public layouts. */
export function SiteJsonLd() {
  return (
    <JsonLdScript
      id="site-jsonld"
      data={asJsonLdGraph([organizationSchema(), websiteSchema()])}
    />
  );
}
