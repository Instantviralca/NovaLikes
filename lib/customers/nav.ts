import { cookies } from 'next/headers';

import {
  CUSTOMER_SESSION_COOKIE,
  verifyCustomerSessionTokenEdge,
} from '@/lib/customers/auth-edge';
import { ACCOUNT_NAV } from '@/lib/customers/messages';
import { isDbReady } from '@/lib/customers/ready';

export type AccountNavState = {
  href: string;
  label: string;
} | null;

export async function getAccountNavState(): Promise<AccountNavState> {
  if (!isDbReady()) return null;
  const jar = await cookies();
  const token = jar.get(CUSTOMER_SESSION_COOKIE)?.value;
  const signedIn = await verifyCustomerSessionTokenEdge(token);
  if (signedIn) {
    return { href: '/dashboard', label: ACCOUNT_NAV.dashboard };
  }
  return { href: '/login', label: ACCOUNT_NAV.signIn };
}
