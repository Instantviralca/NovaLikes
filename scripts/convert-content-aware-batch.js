/**
 * Convert generated PNGs in the Cursor assets folder into market WebP destinations.
 * Usage: node scripts/convert-content-aware-batch.js <batch-json>
 * batch-json: [{ "png": "absolute-or-basename.png", "dest": "public/assets/.../file.webp" }, ...]
 */
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const ROOT = path.join(__dirname, '..');
const ASSETS =
  process.env.CURSOR_ASSETS ||
  'C:\\Users\\HUSSNAIN.COM\\.cursor\\projects\\C-Users-HUSSNAIN-COM-AppData-Local-Temp-3c0007be-5bfe-4c94-b0b9-65c0f88a6100\\assets';

async function convertOne(pngPath, destRel) {
  const dest = path.isAbsolute(destRel) ? destRel : path.join(ROOT, destRel);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  await sharp(pngPath)
    .resize(1536, 1152, { fit: 'cover', position: 'centre' })
    .webp({ quality: 82, effort: 6 })
    .toFile(dest);
  const kb = Math.round(fs.statSync(dest).size / 1024);
  console.log(`OK ${kb}KB -> ${path.relative(ROOT, dest)}`);
}

async function main() {
  const arg = process.argv[2];
  if (!arg) {
    console.error('Need batch json path or inline');
    process.exit(1);
  }
  const batch = JSON.parse(fs.readFileSync(arg, 'utf8'));
  for (const row of batch) {
    let png = row.png;
    if (!path.isAbsolute(png)) png = path.join(ASSETS, png);
    if (!fs.existsSync(png)) {
      console.error('MISSING', png);
      continue;
    }
    await convertOne(png, row.dest);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
