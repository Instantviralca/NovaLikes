import { getRequestLocale } from '@/lib/i18n/request-locale';
import { loadUi } from '@/lib/i18n/content/load';
import { getRequestMarket } from '@/lib/market/request-market';

export async function getSiteChrome() {
  const [locale, market] = await Promise.all([getRequestLocale(), getRequestMarket()]);
  return { locale, market, ui: loadUi(locale) };
}
