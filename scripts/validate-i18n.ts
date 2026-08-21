import { LOCALIZED_LOCALES } from '../lib/i18n/config';
import { collectLocaleOverlayIssues } from '../lib/i18n/content/load';

let failed = false;
for (const locale of LOCALIZED_LOCALES) {
  const issues = collectLocaleOverlayIssues(locale);
  console.log(`${locale}: ${issues.length} issues`);
  for (const issue of issues.slice(0, 25)) {
    console.log(`  - ${issue.path}: ${issue.message}`);
    failed = true;
  }
  if (issues.length > 25) console.log(`  ... ${issues.length - 25} more`);
}
if (failed) process.exit(1);
console.log('All locale overlays complete.');
