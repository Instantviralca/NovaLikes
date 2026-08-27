/**
 * Display-only localization for order dialog fields and validation messages.
 * Never mutates field names, IDs, validation rules, or API payload keys.
 */

import type { UiDictionary } from '@/lib/i18n/content/ui-english';
import type { OrderFieldDefinition } from '@/types/order-fields';

function fill(
  template: string,
  vars: Record<string, string | number>,
): string {
  let out = template;
  for (const [key, value] of Object.entries(vars)) {
    out = out.split(`{${key}}`).join(String(value));
  }
  return out;
}

export function localizeOrderFieldLabel(label: string, ui: UiDictionary): string {
  return ui.orderDialog.labels[label as keyof typeof ui.orderDialog.labels] ?? label;
}

export function localizeOrderFieldForDisplay(
  field: OrderFieldDefinition,
  ui: UiDictionary,
): OrderFieldDefinition {
  const labels = ui.orderDialog.labels as Record<string, string>;
  const placeholders = ui.orderDialog.placeholders as Record<string, string>;
  const help = ui.orderDialog.help as Record<string, string>;

  let helpText = field.helpText;
  if (helpText) {
    if (field.id === 'customComments' && /Provide exactly \d+ comments/.test(helpText)) {
      const qty = field.validation?.exactLineCount;
      helpText =
        qty !== undefined
          ? fill(ui.orderDialog.customCommentsHelp, { quantity: qty })
          : helpText;
    } else {
      helpText = help[helpText] ?? helpText;
    }
  }

  return {
    ...field,
    label: labels[field.label] ?? field.label,
    placeholder: field.placeholder
      ? (placeholders[field.placeholder] ?? field.placeholder)
      : field.placeholder,
    helpText,
  };
}

/** Translate English validation messages emitted by validateField. */
export function localizeValidationMessage(message: string, ui: UiDictionary): string {
  const v = ui.orderDialog.validation;
  const labels = ui.orderDialog.labels as Record<string, string>;

  const localizeEmbeddedLabel = (englishLabel: string) =>
    labels[englishLabel] ?? englishLabel;

  let m = /^(.+) is required\.$/.exec(message);
  if (m) return fill(v.isRequired, { label: localizeEmbeddedLabel(m[1]) });

  m = /^(.+) must be at least (\d+) characters\.$/.exec(message);
  if (m) return fill(v.minLength, { label: localizeEmbeddedLabel(m[1]), n: m[2] });

  m = /^(.+) must be at most (\d+) characters\.$/.exec(message);
  if (m) return fill(v.maxLength, { label: localizeEmbeddedLabel(m[1]), n: m[2] });

  m = /^(.+) format is invalid\.$/.exec(message);
  if (m) return fill(v.formatInvalid, { label: localizeEmbeddedLabel(m[1]) });

  if (message === 'Enter a username only (not a full profile URL).') return v.usernameOnly;
  if (message === 'Enter a valid username (letters, numbers, periods, underscores).')
    return v.usernameInvalid;
  if (message === 'Enter a valid Instagram post or Reel URL (instagram.com).')
    return v.instagramUrl;
  if (message === 'Enter a valid TikTok video URL (tiktok.com).') return v.tiktokUrl;
  if (message === 'Enter a valid Facebook page or profile URL (facebook.com).')
    return v.facebookUrl;
  if (message === 'Enter a valid Facebook post URL (facebook.com).') return v.facebookPostUrl;
  if (
    message ===
    'Enter a valid YouTube channel URL (youtube.com/@…, /channel/…, /c/…, or /user/…).'
  )
    return v.youtubeChannelUrl;
  if (message === 'Enter a valid YouTube video URL (youtube.com/watch?v=… or youtu.be/…).')
    return v.youtubeVideoUrl;
  if (message === 'Enter a valid URL starting with https://.') return v.genericUrl;

  m = /^Enter exactly (\d+) comments \(one per line\)\. You entered (\d+)\.$/.exec(message);
  if (m) return fill(v.exactComments, { exact: m[1], count: m[2] });

  m = /^Each comment must be at most (\d+) characters\.$/.exec(message);
  if (m) return fill(v.commentMaxLength, { n: m[1] });

  return message;
}

export function localizeOrderDescription(quantityLabel: string, ui: UiDictionary): string {
  return fill(ui.orderDialog.description, { quantity: quantityLabel });
}

export function localizeAddedToCart(
  qty: string,
  product: string,
  ui: UiDictionary,
): string {
  return fill(ui.orderDialog.addedToCart, { qty, product });
}
