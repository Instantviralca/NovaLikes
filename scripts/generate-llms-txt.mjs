/**
 * llms.txt is served dynamically by app/llms.txt/route.ts.
 * Do not write public/llms.txt — a static file would shadow the App Router route.
 *
 * Historical public/llms-full.txt is no longer generated (it listed unsupported
 * YouTube services). Run `npx tsc` / tests against lib/seo/llms-txt.ts instead.
 */
import fs from 'node:fs';
import path from 'node:path';

const publicDir = path.join(process.cwd(), 'public');
for (const name of ['llms.txt', 'llms-full.txt']) {
  const file = path.join(publicDir, name);
  if (fs.existsSync(file)) {
    fs.unlinkSync(file);
    console.log(`Removed shadowed static file: public/${name}`);
  }
}

console.log(
  JSON.stringify(
    {
      llmsTxt: 'app/llms.txt/route.ts',
      staticPublicFiles: [],
    },
    null,
    2,
  ),
);
