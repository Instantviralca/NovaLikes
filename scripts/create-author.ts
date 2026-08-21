/**
 * Bootstrap a CMS author (never commit passwords).
 *
 *   CMS_AUTHOR_NAME="Jane" CMS_AUTHOR_EMAIL="jane@novalikes.com" CMS_AUTHOR_PASSWORD="..." npm run author:create
 */

import { isDatabaseConfigured, isProductionRuntime } from '@/lib/config/env';
import { loadAppEnvFiles } from './lib/load-env-file';

async function main() {
  loadAppEnvFiles();

  if (isProductionRuntime() && !isDatabaseConfigured()) {
    console.error('[cms:create-author] DATABASE_URL is required in production.');
    process.exit(1);
  }

  const name = process.env.CMS_AUTHOR_NAME?.trim();
  const email = process.env.CMS_AUTHOR_EMAIL?.trim().toLowerCase();
  const password = process.env.CMS_AUTHOR_PASSWORD ?? '';
  const role = process.env.CMS_AUTHOR_ROLE === 'admin' ? 'admin' : 'author';

  if (!name || !email || password.length < 12) {
    console.error(
      'Set CMS_AUTHOR_NAME, CMS_AUTHOR_EMAIL, and CMS_AUTHOR_PASSWORD (min 12 chars).',
    );
    process.exit(1);
  }

  const { hashPassword } = await import('@/lib/cms/passwords');
  const { createCmsId } = await import('@/lib/cms/ids');
  const { cmsGetUserByEmail, cmsInsertUser, cmsUpdateUser } = await import('@/lib/cms/store');

  const existing = await cmsGetUserByEmail(email);
  if (existing) {
    if (process.env.CMS_AUTHOR_RESET !== '1') {
      console.error('An account with that email already exists. Set CMS_AUTHOR_RESET=1 to update the password.');
      process.exit(1);
    }
    await cmsUpdateUser(existing.id, {
      name,
      passwordHash: await hashPassword(password),
      status: 'active',
      role,
    });
    console.log(`[cms:create-author] updated ${role} ${email} (${existing.id})`);
    return;
  }

  const now = new Date().toISOString();
  const user = await cmsInsertUser({
    id: createCmsId('usr'),
    name,
    email,
    passwordHash: await hashPassword(password),
    profileImage: null,
    bio: null,
    role,
    status: 'active',
    createdAt: now,
    updatedAt: now,
    lastLoginAt: null,
  });

  console.log(`[cms:create-author] created ${user.role} ${user.email} (${user.id})`);
}

main().catch((error) => {
  console.error('[cms:create-author]', error instanceof Error ? error.message : 'failed');
  process.exit(1);
});
