import { getRequestLocale } from '@/lib/i18n/request-locale';
import { loadUi } from '@/lib/i18n/content/load';

export async function getSiteChrome() {
  const locale = await getRequestLocale();
  return { locale, ui: loadUi(locale) };
}
