/**
 * Bootstrap content/markets/us/ from Australia overlays (interim until US copy is supplied).
 * Run: npx tsx scripts/bootstrap-us-from-au.ts
 */
import { cpSync, existsSync, mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import path from 'node:path';

const SRC = path.join(process.cwd(), 'content/markets/au');
const DEST = path.join(process.cwd(), 'content/markets/us');

function transformText(value: string): string {
  return value
    .replaceAll('/au/', '/us/')
    .replaceAll('"/au"', '"/us"')
    .replaceAll("'au-", "'us-")
    .replaceAll('"au-', '"us-')
    .replaceAll('AUSTRALIA', 'UNITED STATES')
    .replaceAll('Australian', 'American')
    .replaceAll('Australia', 'United States');
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
