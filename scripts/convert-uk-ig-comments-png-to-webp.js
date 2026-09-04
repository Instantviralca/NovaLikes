const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const srcDir =
  'C:\\Users\\HUSSNAIN.COM\\.cursor\\projects\\C-Users-HUSSNAIN-COM-AppData-Local-Temp-3c0007be-5bfe-4c94-b0b9-65c0f88a6100\\assets';
const destDir = path.join(
  __dirname,
  '..',
  'public',
  'assets',
  'images',
  'illustrations',
  'markets',
  'uk',
  'instagram-comments',
);

const map = {
  'uk-ig-comments-make-comments-fit.png': 'buy-instagram-comments-uk-make-comments-fit.webp',
  'uk-ig-comments-reply-genuine.png': 'buy-instagram-comments-uk-reply-genuine.webp',
  'uk-ig-comments-built-for-uk.png': 'buy-instagram-comments-uk-built-for-uk.webp',
  'uk-ig-comments-social-proof.png': 'buy-instagram-comments-uk-social-proof.webp',
  'uk-ig-comments-organic-reach.png': 'buy-instagram-comments-uk-organic-reach.webp',
  'uk-ig-comments-local-businesses.png': 'buy-instagram-comments-uk-local-businesses.webp',
  'uk-ig-comments-hero.png': 'buy-instagram-comments-uk-hero.webp',
  'uk-ig-comments-why-buy.png': 'buy-instagram-comments-uk-why-buy.webp',
  'uk-ig-comments-can-you-buy.png': 'buy-instagram-comments-uk-can-you-buy.webp',
  'uk-ig-comments-does-help.png': 'buy-instagram-comments-uk-does-buying-help.webp',
  'uk-ig-comments-final-cta.png': 'buy-instagram-comments-uk-final-cta.webp',
};

(async () => {
  for (const [src, dest] of Object.entries(map)) {
    const srcPath = path.join(srcDir, src);
    const destPath = path.join(destDir, dest);
    if (!fs.existsSync(srcPath)) {
      console.error('MISSING', srcPath);
      continue;
    }
    await sharp(srcPath)
      .resize(1536, 1152, { fit: 'cover', position: 'centre' })
      .webp({ quality: 82, effort: 6 })
      .toFile(destPath);
    const stat = fs.statSync(destPath);
    console.log(dest, `${Math.round(stat.size / 1024)}KB`);
  }
})();
