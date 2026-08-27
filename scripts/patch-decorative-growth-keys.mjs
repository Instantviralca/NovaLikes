/**
 * Add decorative growth/verified/analytics keys only — no broad content rewrite.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';

const ADDITIONS = {
  en: {
    growth: 'Growth',
    verified: 'Verified',
    profileVerified: 'Profile Verified',
    analytics: 'Analytics',
    growthOverview: 'Growth overview',
    growthChart: 'Growth chart',
    growthTimeline: 'Growth timeline',
    accountGrowth: 'Account growth',
  },
  es: {
    growth: 'Crecimiento',
    verified: 'Verificado',
    profileVerified: 'Perfil verificado',
    analytics: 'Analítica',
    growthOverview: 'Resumen de crecimiento',
    growthChart: 'Gráfico de crecimiento',
    growthTimeline: 'Cronología de crecimiento',
    accountGrowth: 'Crecimiento de la cuenta',
  },
  de: {
    growth: 'Wachstum',
    verified: 'Verifiziert',
    profileVerified: 'Profil verifiziert',
    analytics: 'Analytics',
    growthOverview: 'Wachstumsübersicht',
    growthChart: 'Wachstumsdiagramm',
    growthTimeline: 'Wachstumszeitachse',
    accountGrowth: 'Account-Wachstum',
  },
  fr: {
    growth: 'Croissance',
    verified: 'Vérifié',
    profileVerified: 'Profil vérifié',
    analytics: 'Analytique',
    growthOverview: 'Aperçu de la croissance',
    growthChart: 'Graphique de croissance',
    growthTimeline: 'Chronologie de croissance',
    accountGrowth: 'Croissance du compte',
  },
  it: {
    growth: 'Crescita',
    verified: 'Verificato',
    profileVerified: 'Profilo verificato',
    analytics: 'Analytics',
    growthOverview: 'Panoramica crescita',
    growthChart: 'Grafico di crescita',
    growthTimeline: 'Timeline di crescita',
    accountGrowth: 'Crescita account',
  },
  'pt-br': {
    growth: 'Crescimento',
    verified: 'Verificado',
    profileVerified: 'Perfil verificado',
    analytics: 'Analytics',
    growthOverview: 'Visão geral do crescimento',
    growthChart: 'Gráfico de crescimento',
    growthTimeline: 'Linha do tempo de crescimento',
    accountGrowth: 'Crescimento da conta',
  },
  ar: {
    growth: 'النمو',
    verified: 'موثّق',
    profileVerified: 'ملف موثّق',
    analytics: 'التحليلات',
    growthOverview: 'نظرة عامة على النمو',
    growthChart: 'مخطط النمو',
    growthTimeline: 'الجدول الزمني للنمو',
    accountGrowth: 'نمو الحساب',
  },
};

const targets = [
  ['_english', 'en'],
  ['es', 'es'],
  ['de', 'de'],
  ['fr', 'fr'],
  ['it', 'it'],
  ['pt-br', 'pt-br'],
  ['ar', 'ar'],
];

for (const [dir, locale] of targets) {
  const file = path.join(process.cwd(), 'content', 'locales', dir, 'ui.json');
  const ui = JSON.parse(readFileSync(file, 'utf8'));
  ui.decorative = { ...ui.decorative, ...ADDITIONS[locale] };
  writeFileSync(file, `${JSON.stringify(ui, null, 2)}\n`);
  console.log('patched', dir);
}
