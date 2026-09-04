/** Quick read-only: story section IDs per market/service */
import { readFileSync } from 'node:fs';
import { CORE_SERVICE_SLUGS } from '../lib/i18n/config';

function ss(file: string) {
  const d = JSON.parse(readFileSync(file, 'utf8'));
  return (d.storySections ?? d.followersAuthority?.storySections ?? d.dummy?.storySections ?? []) as { id: string }[];
}

for (const slug of ['homepage', ...CORE_SERVICE_SLUGS]) {
  const file = slug === 'homepage' ? 'homepage.json' : `services/${slug}.json`;
  const counts = ['ca', 'us', 'au', 'uk'].map((m) => {
    const ids = ss(`content/markets/${m}/${file}`).map((s) => s.id);
    return `${m}:${ids.length}`;
  });
  console.log(slug, counts.join(' '));
  const usIds = ss(`content/markets/us/${file}`).map((s) => s.id);
  if (usIds.length) console.log('  US IDs:', usIds.join(', '));
}
