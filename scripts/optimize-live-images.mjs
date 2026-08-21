import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');

const LIVE_PNGS = [
  'public/assets/images/homepage/hero-social-growth.png',
  'public/assets/images/tools/hub/plane.png',
  'public/assets/images/tools/hub/gift.png',
  'public/assets/images/tools/hub/how-search.png',
  'public/assets/images/tools/hub/how-server.png',
  'public/assets/images/tools/hub/how-result.png',
  'public/assets/images/tools/instagram-profile-viewer/cta-growth.png',
  'public/assets/images/tools/instagram-profile-viewer/editorial-card.png',
  'public/assets/images/tools/instagram-profile-viewer/related-counter.png',
  'public/assets/images/tools/instagram-profile-viewer/related-picture.png',
  'public/assets/images/tools/instagram-profile-viewer/related-video.png',
  'public/assets/images/tools/instagram-profile-viewer/step-done.png',
  'public/assets/images/tools/instagram-profile-viewer/step-scan.png',
  'public/assets/images/tools/instagram-profile-viewer/step-search.png',
  'public/assets/images/tools/instagram-profile-viewer/see-photo.png',
  'public/assets/images/tools/instagram-profile-viewer/hero-portrait.png',
  'public/assets/images/tools/instagram-profile-viewer/see-followers.png',
  'public/assets/images/tools/instagram-profile-viewer/see-bio.png',
  'public/assets/images/tools/instagram-profile-viewer/see-posts.png',
];

async function convertPngToWebp(rel) {
  const input = path.join(root, rel);
  const output = input.replace(/\.png$/i, '.webp');
  const before = fs.statSync(input).size;
  const meta = await sharp(input).metadata();
  await sharp(input)
    .webp({ quality: 82, effort: 6 })
    .toFile(output);
  const after = fs.statSync(output).size;
  console.log(
    `${rel} ${before} -> ${path.relative(root, output)} ${after} (${meta.width}x${meta.height})`,
  );
}

async function compressOg() {
  const input = path.join(root, 'public/og-default.png');
  const tmp = path.join(root, 'public/og-default.tmp.png');
  const before = fs.statSync(input).size;
  const meta = await sharp(input).metadata();
  if (meta.width !== 1200 || meta.height !== 630) {
    throw new Error(`og-default.png is ${meta.width}x${meta.height}, expected 1200x630`);
  }
  await sharp(input)
    .png({ compressionLevel: 9, palette: true, quality: 85, effort: 10 })
    .toFile(tmp);
  const after = fs.statSync(tmp).size;
  if (after < before) {
    fs.renameSync(tmp, input);
    console.log(`og-default.png ${before} -> ${after} (1200x630 palette PNG)`);
  } else {
    fs.unlinkSync(tmp);
    console.log(`og-default.png left unchanged at ${before}`);
  }
}

(async () => {
  for (const rel of LIVE_PNGS) {
    await convertPngToWebp(rel);
  }
  await compressOg();
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
