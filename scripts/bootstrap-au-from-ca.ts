/**
 * Bootstrap content/markets/au/ from Canada overlays (interim until AU copy is supplied).
 * Run: npx tsx scripts/bootstrap-au-from-ca.ts
 */
import { cpSync, existsSync, mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import path from 'node:path';

const SRC = path.join(process.cwd(), 'content/markets/ca');
const DEST = path.join(process.cwd(), 'content/markets/au');

function transformText(value: string): string {
  return value
    .replaceAll('/ca/', '/au/')
    .replaceAll('"/ca"', '"/au"')
    .replaceAll("'ca-", "'au-")
    .replaceAll('"ca-', '"au-')
    .replaceAll('CANADA', 'AUSTRALIA')
    .replaceAll('Canadian', 'Australian')
    .replaceAll('Canada', 'Australia');
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
