export type CustomerStatus = 'active' | 'disabled';

export type EmailCodePurpose = 'signup_verify' | 'login' | 'password_reset';

export type CustomerRecord = {
  id: string;
  email: string;
  name: string | null;
  passwordHash: string | null;
  emailVerifiedAt: string | null;
  status: CustomerStatus;
  marketingOptIn: boolean;
  whatsappNumber: string | null;
  tiktokUsername: string | null;
  instagramUsername: string | null;
  createdAt: string;
  updatedAt: string;
  lastLoginAt: string | null;
};

export type CustomerSessionRecord = {
  id: string;
  customerId: string;
  tokenHash: string;
  expiresAt: string;
  revokedAt: string | null;
  createdAt: string;
  lastSeenAt: string | null;
};

export type CustomerEmailCodeRecord = {
  id: string;
  email: string;
  purpose: EmailCodePurpose;
  codeHash: string;
  attempts: number;
  expiresAt: string;
  consumedAt: string | null;
  ipHash: string | null;
  createdAt: string;
};

export type CustomerPublic = {
  id: string;
  name: string | null;
  email: string;
  verified: boolean;
  hasPassword: boolean;
  marketingOptIn: boolean;
  whatsappNumber: string | null;
  tiktokUsername: string | null;
  instagramUsername: string | null;
};

export function toCustomerPublic(customer: CustomerRecord): CustomerPublic {
  return {
    id: customer.id,
    name: customer.name,
    email: customer.email,
    verified: Boolean(customer.emailVerifiedAt),
    hasPassword: Boolean(customer.passwordHash),
    marketingOptIn: customer.marketingOptIn,
    whatsappNumber: customer.whatsappNumber,
    tiktokUsername: customer.tiktokUsername,
    instagramUsername: customer.instagramUsername,
  };
}
