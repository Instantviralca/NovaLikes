import type { MetadataRoute } from 'next';

import { brand } from '@/config/brand';
import { site } from '@/config/site';

/**
 * Web app manifest — square icons + maskable for install/SERP branding.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: brand.name,
    short_name: brand.name,
    description: site.defaultMetadata.description,
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#E85D04',
    icons: [
      {
        src: '/icons/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icons/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icons/icon-512-maskable.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  };
}
