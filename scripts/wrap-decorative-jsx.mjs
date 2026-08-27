/**
 * Wrap visible decorative JSX text nodes with d('…') where useDecorativeLocalizer exists.
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
  if (!s.includes('useDecorativeLocalizer')) return false;
  if (!/const d = useDecorativeLocalizer/.test(s)) return false;
  let changed = false;

  for (const p of phrases) {
    const esc = p.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    // Avoid double-wrapping: >{d('Phrase')}<
    const bare = new RegExp(`(?<!d\\('${esc}'\\))>${esc}<`, 'g');
    // Simpler: only replace >Phrase< when not already d(
    const simple = new RegExp(`>${esc}<`, 'g');
    if (simple.test(s) && !s.includes(`>{d('${p}')}<`)) {
      // reset lastIndex
      const re = new RegExp(`>${esc}<`, 'g');
      const next = s.replace(re, `>{d('${p}')}<`);
      if (next !== s) {
        s = next;
        changed = true;
      }
    } else if (simple.test(s)) {
      // may already be partially wrapped; replace remaining bare
      const re = new RegExp(`>(?!\\{d\\('${esc}'\\)\\})${esc}<`, 'g');
      const next = s.replace(re, `>{d('${p}')}<`);
      if (next !== s) {
        s = next;
        changed = true;
      }
    }
  }

  const replacements = [
    ['{step.label}', '{d(step.label)}'],
    ['{row.label}', '{d(row.label)}'],
    ['{item.label}', '{d(item.label)}'],
  ];
  for (const [from, to] of replacements) {
    if (s.includes(from) && !s.includes(to)) {
      s = s.split(from).join(to);
      changed = true;
    }
  }

  if (changed) {
    writeFileSync(file, s);
    return true;
  }
  return false;
}

let n = 0;
for (const name of readdirSync(dir)) {
  if (!name.endsWith('.tsx')) continue;
  const file = path.join(dir, name);
  if (wrapFile(file)) {
    console.log('updated', name);
    n += 1;
  }
}
console.log('files', n);
