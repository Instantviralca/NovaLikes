import type { Metadata } from 'next';

import { CartPage } from '@/components/commerce/cart';
import { preloadHomeDisplayFont } from '@/components/marketing/home-v5/fonts';
import { cartMetadata } from '@/seo/metadata';

export const metadata: Metadata = cartMetadata();

export default function CartRoutePage() {
  preloadHomeDisplayFont();
  return <CartPage />;
}
