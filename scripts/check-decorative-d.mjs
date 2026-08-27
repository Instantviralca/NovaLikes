import { readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';

const dir = path.join(process.cwd(), 'components', 'illustrations');
for (const name of readdirSync(dir)) {
  if (!name.endsWith('.tsx')) continue;
  const s = readFileSync(path.join(dir, name), 'utf8');
  const uses = /\bd\(['"]/.test(s) || /\{d\(/.test(s);
  const def = /const d = useDecorativeLocalizer/.test(s);
  if (uses && !def) console.log('MISSING d:', name);
}
console.log('done');
