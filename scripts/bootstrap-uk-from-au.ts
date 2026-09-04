/**
 * Bootstrap content/markets/uk/ from Australia overlays (interim until UK copy is supplied).
 * Run: npx tsx scripts/bootstrap-uk-from-au.ts
 */
import { cpSync, existsSync, mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import path from 'node:path';

const SRC = path.join(process.cwd(), 'content/markets/au');
const DEST = path.join(process.cwd(), 'content/markets/uk');

function transformText(value: string): string {
  return value
    .replaceAll('/au/', '/uk/')
    .replaceAll('"/au"', '"/uk"')
    .replaceAll("'au-", "'uk-")
    .replaceAll('"au-', '"uk-')
    .replaceAll('FOR AUSTRALIA', 'FOR THE UK')
    .replaceAll('AUSTRALIA', 'UNITED KINGDOM')
    .replaceAll('Australian', 'British')
    .replaceAll('Australia', 'United Kingdom')
    .replaceAll('in United Kingdom', 'in the UK')
    .replaceAll('United Kingdomn', 'United Kingdom');
}

function copyAndTransform(srcDir: string, destDir: string): void {
  mkdirSync(destDir, { recursive: true });
  for (const entry of readdirSync(srcDir)) {
    const srcPath = path.join(srcDir, entry);
    const destPath = path.join(destDir, entry);
    if (statSync(srcPath).isDirectory()) {
      copyAndTransform(srcPath, destPath);
      continue;
    }
    if (!entry.endsWith('.json')) {
      cpSync(srcPath, destPath);
      continue;
    }
    const raw = readFileSync(srcPath, 'utf8');
    writeFileSync(destPath, `${transformText(raw)}\n`, 'utf8');
  }
}

if (!existsSync(SRC)) {
  throw new Error(`Missing source market content: ${SRC}`);
}

copyAndTransform(SRC, DEST);
console.log(`Bootstrapped ${DEST} from ${SRC}`);
