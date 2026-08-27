/**
 * Restore technical faqIds + serviceSlugs in ES service JSON from English source.
 * Does NOT touch visible question/answer/title copy.
 */
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const EN = 'content/locales/_english/services';
const ES = 'content/locales/es/services';

let restored = 0;
for (const name of readdirSync(ES)) {
  if (!name.endsWith('.json')) continue;
  const esPath = join(ES, name);
  const enPath = join(EN, name);
  const es = JSON.parse(readFileSync(esPath, 'utf8'));
  const en = JSON.parse(readFileSync(enPath, 'utf8'));

  let changed = false;

  // faq.faqIds
  if (en?.faq?.faqIds && es?.faq?.faqIds) {
    const before = JSON.stringify(es.faq.faqIds);
    es.faq.faqIds = [...en.faq.faqIds];
    if (JSON.stringify(es.faq.faqIds) !== before) {
      changed = true;
      console.log(`Restored faqIds: ${name}`);
    }
  }

  // relatedServices.serviceSlugs
  if (en?.relatedServices?.serviceSlugs && es?.relatedServices?.serviceSlugs) {
    const before = JSON.stringify(es.relatedServices.serviceSlugs);
    es.relatedServices.serviceSlugs = [...en.relatedServices.serviceSlugs];
    if (JSON.stringify(es.relatedServices.serviceSlugs) !== before) {
      changed = true;
      console.log(`Restored serviceSlugs: ${name}`);
    }
  }

  if (changed) {
    writeFileSync(esPath, `${JSON.stringify(es, null, 2)}\n`, 'utf8');
    restored += 1;
  }
}
console.log({ filesUpdated: restored });
