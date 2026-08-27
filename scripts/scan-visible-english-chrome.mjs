/**
 * Scan rendered localized pages for visible English UI chrome.
 */
const BASE = process.argv[2] ?? 'http://localhost:3000';
const LOCALES = ['es', 'de', 'fr', 'it', 'pt-br', 'ar'];

const PHRASES = [
  'Add to Cart',
  'Best Selling',
  'Most Popular',
  'Best Value',
  'Buy Now',
  'Get Started',
  'Track Order',
  'Order Now',
  'Select Package',
  'Choose Package',
  'Choose a Package',
  'Recommended',
  'Secure Checkout',
  'Customer Reviews',
  'Try Again',
  'Something went wrong',
  'You Save',
  'Order details',
  'No password required',
  'Please fix the highlighted fields.',
  'Secure checkout · Encrypted payment',
  '30-Day Money-Back Guarantee',
  'Order Notes',
  'Custom Comments',
  'Package Confirmed',
  'Order Confirmed',
  'Payment Confirmed',
  'Checkout Summary',
];

const WORD_PHRASES = ['Live', 'Checkout', 'Status', 'Confirmed', 'Selected', 'OFF', 'Continue', 'Popular'];


const SLUGS = {
  es: {
    home: '/es',
    igLikes: '/es/comprar-likes-instagram',
    igViews: '/es/comprar-vistas-instagram',
    tools: '/es/herramientas',
    faq: '/es/preguntas-frecuentes',
    contact: '/es/contacto',
    about: '/es/about',
    reviews: '/es/reviews',
  },
  de: {
    home: '/de',
    igLikes: '/de/instagram-likes-kaufen',
    igViews: '/de/instagram-aufrufe-kaufen',
    tools: '/de/tools',
    faq: '/de/haeufige-fragen',
    contact: '/de/kontakt',
    about: '/de/about',
    reviews: '/de/reviews',
  },
  fr: {
    home: '/fr',
    igLikes: '/fr/acheter-likes-instagram',
    igViews: '/fr/acheter-vues-instagram',
    tools: '/fr/outils',
    faq: '/fr/questions-frequentes',
    contact: '/fr/contact',
    about: '/fr/about',
    reviews: '/fr/reviews',
  },
  it: {
    home: '/it',
    igLikes: '/it/comprare-like-instagram',
    igViews: '/it/comprare-visualizzazioni-instagram',
    tools: '/it/strumenti',
    faq: '/it/domande-frequenti',
    contact: '/it/contatti',
    about: '/it/about',
    reviews: '/it/reviews',
  },
  'pt-br': {
    home: '/pt-br',
    igLikes: '/pt-br/comprar-curtidas-instagram',
    igViews: '/pt-br/comprar-visualizacoes-instagram',
    tools: '/pt-br/ferramentas',
    faq: '/pt-br/perguntas-frequentes',
    contact: '/pt-br/contato',
    about: '/pt-br/about',
    reviews: '/pt-br/reviews',
  },
  ar: {
    home: '/ar',
    igLikes: '/ar/buy-instagram-likes',
    igViews: '/ar/buy-instagram-views',
    tools: '/ar/tools',
    faq: '/ar/faq',
    contact: '/ar/contact',
    about: '/ar/about',
    reviews: '/ar/reviews',
  },
};

function visibleText(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

const findings = [];

async function scan(locale, key, path) {
  let html;
  try {
    const res = await fetch(`${BASE}${path}`, { redirect: 'follow' });
    html = await res.text();
    if (res.status !== 200) {
      findings.push({ locale, key, path, phrase: `HTTP ${res.status}`, kind: 'FETCH' });
      return;
    }
  } catch (e) {
    findings.push({ locale, key, path, phrase: e.message, kind: 'FETCH' });
    return;
  }
  const text = visibleText(html);
  for (const phrase of PHRASES) {
    if (text.includes(phrase)) {
      const i = text.indexOf(phrase);
      findings.push({
        locale,
        key,
        path,
        phrase,
        kind: 'VISIBLE',
        ctx: text.slice(Math.max(0, i - 24), i + phrase.length + 24),
      });
    }
  }
  for (const phrase of WORD_PHRASES) {
    const re = new RegExp(`(?<![A-Za-zÀ-ÿ])${phrase}(?![A-Za-zÀ-ÿ])`, 'g');
    let m;
    while ((m = re.exec(text))) {
      const ctx = text.slice(Math.max(0, m.index - 28), m.index + phrase.length + 28);
      if (phrase === 'Continue' && /Continuez|Continue |Continue\./i.test(ctx) && !/\bContinue\b/.test(ctx.replace(/Continuez|Continuar|Continua/gi, ''))) {
        // FR Continuez / PT Continue body verbs — skip if not standalone English CTA
      }
      if (phrase === 'Continue' && /(Continuez|Continuar|Continue a |Continue criando|Continue publicando)/i.test(ctx)) {
        continue;
      }
      if (phrase === 'Popular' && /Popular Services|Servicios populares|Beliebte|populaires|popolari|populares/i.test(ctx)) {
        continue;
      }
      // DE intentional "Checkout" loanword may remain in decorative DE translations — still report
      findings.push({ locale, key, path, phrase, kind: 'VISIBLE', ctx });
    }
  }
}

async function main() {
  for (const locale of LOCALES) {
    const pages = SLUGS[locale];
    for (const [key, path] of Object.entries(pages)) {
      await scan(locale, key, path);
    }
  }
  const byLocale = {};
  for (const f of findings) {
    byLocale[f.locale] ??= {};
    byLocale[f.locale][f.phrase] ??= 0;
    byLocale[f.locale][f.phrase] += 1;
  }
  console.log(JSON.stringify({ total: findings.length, byLocale, samples: findings.slice(0, 40) }, null, 2));
}

main();
