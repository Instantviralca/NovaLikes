import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (name.endsWith('.json')) out.push(p);
  }
  return out;
}

for (const f of walk('content/locales/es')) {
  const t = readFileSync(f, 'utf8');
  const blocks = t.match(/"faqIds"\s*:\s*\[[^\]]*\]/g) ?? [];
  for (const b of blocks) {
    if (/Me gusta|visualizaciones/.test(b)) {
      console.log(f);
      console.log(b);
      console.log('---');
    }
  }
}
