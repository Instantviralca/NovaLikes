/**
 * Wrap indented decorative text nodes (whitespace between tags) with d('…').
 */
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';

const dir = path.join(process.cwd(), 'components', 'illustrations');
const phrases = [
  'Checkout Summary',
  'Package Confirmed',
  'Package Selected',
  'Order Confirmed',
  'Order Complete',
  'Payment Confirmed',
  'Checkout Complete',
  'Order Processing',
  'Delivery Started',
  'Delivery Complete',
  'Enter Username',
  'Selected package',
  'Ready to track',
  'Just now',
  'On track',
  'Confirmed',
  'Pending',
  'Processing',
  'Delivering',
  'Tracking',
  'Checkout',
  'Status',
  'Package',
  'Complete',
  'Active',
  'Current',
  'Secure',
  'Selected',
  'Live',
  'Done',
  'Next',
  'Order',
].sort((a, b) => b.length - a.length);

function wrapFile(file) {
  let s = readFileSync(file, 'utf8');
  const needsHook = !s.includes('useDecorativeLocalizer');
  let changed = false;

  for (const p of phrases) {
    const esc = p.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    // >Phrase<
    {
      const re = new RegExp(`>${esc}<`, 'g');
      const next = s.replace(re, `>{d('${p}')}<`);
      if (next !== s) {
        s = next;
        changed = true;
      }
    }
    // >\n   Phrase\n
    {
      const re = new RegExp(`>(\\s*)${esc}(\\s*)<`, 'g');
      const next = s.replace(re, (`>$1{d('${p}')}$2<`));
      if (next !== s) {
        s = next;
        changed = true;
      }
    }
    // · Live (suffix)
    if (p === 'Live') {
      const re = new RegExp(`· Live`, 'g');
      const next = s.replace(re, `· {d('Live')}`);
      if (next !== s) {
        s = next;
        changed = true;
      }
    }
  }

  // value: 'Confirmed' etc rendered - ensure d(value) if pattern exists
  if (s.includes('{row.value}') && !s.includes('{d(row.value)}') && s.includes("value: '")) {
    s = s.split('{row.value}').join('{d(String(row.value))}');
    changed = true;
  }

  if (!changed) return false;

  if (needsHook && /export function \w+/.test(s)) {
    if (!s.includes("from '@/components/i18n/use-decorative-localizer'")) {
      s = s.replace(
        /('use client';\s*\n)/,
        `$1\nimport { useDecorativeLocalizer } from '@/components/i18n/use-decorative-localizer';\n`,
      );
    }
    s = s.replace(
      /(export function \w+\([^{]*\{)(\s*)/,
      `$1$2const d = useDecorativeLocalizer();$2`,
    );
  }

  // Avoid double-wrapping {d('{d('X')}')}
  s = s.replace(/\{d\('\{d\('([^']+)'\)\}'\)\}/g, "{d('$1')}");
  s = s.replace(/>\{d\('\{d\('([^']+)'\)\}'\)\}</g, ">{d('$1')}<");

  writeFileSync(file, s);
  return true;
}

let n = 0;
for (const name of readdirSync(dir)) {
  if (!name.endsWith('.tsx')) continue;
  if (wrapFile(path.join(dir, name))) {
    console.log('updated', name);
    n += 1;
  }
}
console.log('files', n);
