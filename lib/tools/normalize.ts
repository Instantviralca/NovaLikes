const DOMAIN_LIKE =
  /^(www\.|vm\.|vt\.|m\.|web\.)?(tiktok\.com|instagram\.com|facebook\.com|fb\.watch)\b/i;

export function normalizeExternalInput(raw: string): string {
  let value = raw.trim().replace(/^['"`]+|['"`]+$/g, '');
  if (!value) return '';

  if (!/^[a-z][a-z0-9+.-]*:/i.test(value) && DOMAIN_LIKE.test(value)) {
    value = `https://${value}`;
  }

  return value;
}
