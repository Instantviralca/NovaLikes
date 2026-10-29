import type { ServiceV2Content } from '../../types';

/** German (/de) — v2 service page copy for buy-facebook-page-likes. Primary keyword: "facebook fanpage likes kaufen". Do not edit wording without the content owner. */
export const DE_BUY_FACEBOOK_PAGE_LIKES_V2 = {
  meta: {
    slug: 'buy-facebook-page-likes',
    platform: 'Facebook',
    name: 'Facebook Fanpage Likes',
    unit: 'Likes',
    unitSingular: 'Like',
    inputKind: 'link',
    perUnit: 1000,
    tiers: false,
    keywords: {
      primary: 'facebook fanpage likes kaufen',
      secondary: [
        'facebook likes kaufen',
        'facebook seiten likes kaufen',
        'facebook seiten likes preis',
        'facebook likes für unternehmensseite',
      ],
      questions: [
        'unterschied seiten likes und follower',
        'zeigt meine seite noch likes',
        'was kosten facebook seiten likes',
        'ist es sicher facebook likes zu kaufen',
        'brauchen sie admin zugang',
      ],
    },
  },
  hero: {
    title: {
      lead: '',
      highlight: 'Facebook Fanpage Likes',
      tail: 'kaufen für eine beliebtere Seite',
    },
    subtitle: 'Zeigt Ihre Seite unter dem Namen noch „Gefällt mir“-Angaben, gehört diese Zahl zu dem, was Besucher zuerst sehen. Erhöhen Sie sie ab {fromPrice}, nur mit Ihrem Seitenlink.',
    trust: [
      'Kein Passwort nötig',
      'Start in 6–8 Stunden',
      '6 Monate Nachfüllung',
    ],
  },
  picker: {
    id: 'pricing-packages',
    title: 'Facebook Fanpage Likes Pakete & Preise',
    intro: 'Wählen Sie ein Paket. Preise in USD.',
    summaryName: '{quantity} Facebook Fanpage Likes',
    save: 'Sie sparen',
    cta: 'In den Warenkorb',
    oneTime: 'Einmalkauf. Kein Abo.',
    secure: 'Sicherer Checkout',
    methods: [
      'Karte',
      'Apple Pay',
      'Google Pay',
    ],
    features: [
      {
        icon: 'shield',
        title: 'Kein Passwort',
        body: 'Nur Link',
      },
      {
        icon: 'clock',
        title: 'Start in 6–8 Std.',
        body: 'Fertig 4–6 Std. später',
      },
      {
        icon: 'message-square',
        title: 'Für Sie da',
        body: '24/7 auf WhatsApp',
      },
    ],
  },
  why: {
    id: 'why-choose-novalikes',
    title: {
      lead: 'Warum NovaLikes für',
      highlight: 'Facebook Fanpage Likes?',
    },
    items: [
      {
        icon: 'shield',
        tone: 'mint',
        title: 'Nur ein Link, kein Admin-Zugang',
        body: 'Wir brauchen nur den öffentlichen Link zu Ihrer Seite. Kein Passwort, keine Admin-Rolle und kein Zugang zu Ihrem Konto.',
      },
      {
        icon: 'clock',
        tone: 'sun',
        title: 'Klare Start- und Endzeiten',
        body: 'Die meisten Bestellungen starten innerhalb von 6–8 Stunden nach der Zahlung und sind 4–6 Stunden nach dem Start abgeschlossen. Lieber langsamer? Bitten Sie um eine schrittweise Lieferung.',
      },
      {
        icon: 'refresh-cw',
        tone: 'lilac',
        title: '6 Monate Nachfüllung',
        body: 'Wenn Likes aus Ihrer Bestellung innerhalb von 6 Monaten nach der Lieferung zurückgehen, schicken Sie uns Ihre Bestellnummer und wir füllen kostenlos nach.',
      },
      {
        icon: 'badge-check',
        tone: 'peach',
        title: '30-Tage-Geld-zurück-Garantie',
        body: 'Berechtigte Bestellungen sind 30 Tage ab Kaufdatum abgedeckt. Unsere Erstattungsrichtlinie erklärt genau, was dazugehört.',
      },
      {
        icon: 'thumbs-up',
        tone: 'pink',
        title: 'Für Seiten mit Like-Zahl',
        body: 'Seiten-Likes passen zu Seiten, die unter dem Namen noch Likes zeigen. Neuere Seiten zeigen stattdessen Follower, prüfen Sie Ihre also zuerst.',
      },
    ],
    promo: {
      eyebrow: 'Unsicher, welches Paket passt?',
      title: 'Fragen Sie uns vor dem Kauf',
      cta: 'Auf WhatsApp schreiben',
    },
  },
  steps: {
    id: 'how-it-works',
    title: {
      lead: 'So kaufen Sie',
      highlight: 'Facebook Fanpage Likes',
    },
    pill: 'Etwa 2 Minuten',
    intro: 'Die Bestellung dauert fünf kurze Schritte und etwa zwei Minuten. Prüfen Sie, ob Ihre Seite Likes zeigt, und fügen Sie dann den öffentlichen Link ein.',
    items: [
      {
        ui: 'public',
        title: 'Prüfen, ob Ihre Seite Likes zeigt',
        body: 'Öffnen Sie Ihre Seite in einem privaten Fenster. Steht unter dem Namen „Gefällt mir“, passen Seiten-Likes. Nur Follower? Dann wählen Sie Facebook Follower.',
      },
      {
        ui: 'packages',
        title: 'Paket wählen',
        body: 'Wählen Sie eine Menge aus den Paketen oben. Jedes Paket zeigt den Preis, bevor Sie sich festlegen.',
      },
      {
        ui: 'cart',
        title: 'In den Warenkorb',
        body: 'Klicken Sie auf „In den Warenkorb“ und gehen Sie dann zur Kasse.',
      },
      {
        ui: 'username',
        title: 'Seitenlink einfügen',
        body: 'Kopieren Sie den öffentlichen Link Ihrer Seite, etwa facebook.com/ihreseite. Seiten-Likes funktionieren nur bei Seiten, nicht bei persönlichen Profilen.',
      },
      {
        ui: 'pay',
        title: 'Sicher bezahlen',
        body: 'Einmal mit Karte, Apple Pay oder Google Pay in US-Dollar bezahlen. Es gibt kein Abo.',
      },
    ],
    done: {
      title: 'Fertig!',
      count: 1000,
      unit: 'Likes',
      body: 'Die meisten Bestellungen starten innerhalb von 6–8 Stunden nach der Zahlung und sind 4–6 Stunden nach dem Start abgeschlossen. Den Fortschritt sehen Sie auf der Seite „Bestellung verfolgen“ mit Ihrer Bestellnummer.',
    },
  },
  ui: {
    toggle: {
      label: 'Unveröffentlichte Seite',
      sub: 'Aus, damit Besucher sie finden',
    },
    chips: [
      '250',
      '500',
      '1K',
      '2.5K',
    ],
    chipOn: 2,
    input: {
      prefix: '',
      placeholder: 'facebook.com/ihreseite',
    },
    safeChips: [
      'Nur Link',
      'Sicherer Checkout',
    ],
    privacyTags: [
      'Link',
      'E-Mail',
    ],
  },
  compare: {
    id: 'spot-a-risky-seller',
    title: {
      lead: 'So erkennen Sie einen unseriösen',
      highlight: 'Anbieter für Facebook Fanpage Likes',
    },
    intro: 'Egal, wo Sie kaufen: Prüfen Sie zuerst diese sieben Punkte.',
    us: 'NovaLikes',
    them: 'Unseriöse Anbieter',
    rows: [
      {
        label: 'Zugangsdaten',
        novalikes: 'Nur Seitenlink',
        riskySeller: 'Fragen nach Ihrem Passwort',
      },
      {
        label: 'Zeitrahmen',
        novalikes: 'Start in 6–8 Stunden',
        riskySeller: 'Keine Zeitangabe',
      },
      {
        label: 'Rückgang',
        novalikes: '6 Monate Nachfüllung',
        riskySeller: 'Keine Nachfüllung',
      },
      {
        label: 'Erstattung',
        novalikes: '30-Tage-Geld-zurück*',
        riskySeller: 'Keine schriftliche Regelung',
      },
      {
        label: 'Support',
        novalikes: '24/7 auf WhatsApp',
        riskySeller: 'Schwer erreichbar',
      },
      {
        label: 'Preis',
        novalikes: 'Vorab in USD angezeigt',
        riskySeller: 'Ändert sich an der Kasse',
      },
      {
        label: 'Verfolgung',
        novalikes: 'Seite „Bestellung verfolgen“',
        riskySeller: 'Keine Kontrolle möglich',
      },
    ],
    note: '*Für berechtigte Bestellungen, wie in unserer Erstattungsrichtlinie beschrieben.',
  },
  promises: {
    id: 'our-promises',
    title: 'Nachfüllung und Geld-zurück-Versprechen für Facebook Fanpage Likes',
    intro: 'Beide Zusagen stehen in unserer Erstattungsrichtlinie, nicht nur auf dieser Seite.',
    cards: [
      {
        chip: '6 Monate',
        title: '6 Monate Nachfüllung',
        image: '/assets/images/illustrations/facebook-page-likes/facebook-page-likes-order-process.webp',
        body: 'Wenn Likes aus Ihrer Bestellung innerhalb von 6 Monaten nach dem Liefertermin zurückgehen, schreiben Sie uns per WhatsApp oder E-Mail mit Ihrer Bestellnummer, und wir füllen die Differenz kostenlos auf. Behalten Sie dieselbe Seiten-URL und lassen Sie die Seite öffentlich, während eine Nachfüllung geliefert wird.',
      },
      {
        chip: '30 Tage',
        title: '30-Tage-Geld-zurück-Garantie',
        image: '/assets/images/illustrations/facebook-page-likes/facebook-page-likes-package-cta.webp',
        body: 'Berechtigte Bestellungen können innerhalb von 30 Tagen ab Kaufdatum erstattet werden. Die Erstattungsrichtlinie erklärt, was berechtigt ist und wie Sie eine Anfrage stellen.',
      },
    ],
    link: {
      label: 'Erstattungsrichtlinie lesen',
      href: '/refund-policy',
    },
  },
  cost: {
    id: 'facebook-page-likes-cost',
    title: {
      lead: 'Was kosten',
      highlight: 'Facebook Fanpage Likes?',
    },
    intro: 'Seiten-Likes starten ab {fromPrice} für 100, und der Preis pro Like sinkt bei größeren Paketen. Jeder Preis ist eine Einmalzahlung in US-Dollar für eine Seite.',
    points: [
      'Die 6 Monate Nachfüllung sind inklusive. Es kommt nichts dazu.',
      'Preise in US-Dollar. Ihre Bank rechnet in Euro um; manche Karten berechnen dafür ein Auslandseinsatzentgelt.',
      'Kein Abo und keine Verlängerung. Sie zahlen einmal pro Bestellung.',
    ],
    cols: [
      'Paket',
      'Preis',
      'Pro 1.000',
    ],
    best: 'Bester Preis',
    note: 'Die Preise stammen aus unseren aktuellen Paketen. Der Preis an der Kasse ist der Preis, den Sie zahlen.',
  },
  whyBuy: {
    id: 'why-buy-facebook-page-likes',
    title: {
      lead: 'Warum kaufen Menschen',
      highlight: 'Facebook Fanpage Likes?',
    },
    intro: 'Viele etablierte Unternehmen haben ihre Facebook-Seite vor Jahren angelegt, und sie zeigt noch eine Like-Zahl. Ist diese niedrig, wirkt selbst ein bekanntes Unternehmen klein.',
    items: [
      {
        title: 'Eine ältere Seite, die aktuell wirkt',
        body: 'Eine Seite, die seit Jahren besteht, aber 80 Likes zeigt, kann vergessen wirken. Likes frischen den ersten Eindruck auf.',
      },
      {
        title: 'Vertrauen im Vergleich',
        body: 'Wer zwei lokale Unternehmen vergleicht, achtet oft darauf, welche Seite beliebter wirkt.',
      },
      {
        title: 'Eine stärkere Basis für Werbung',
        body: 'Seiten mit Facebook-Werbung wirken glaubwürdiger, wenn die Like-Zahl zum Budget passt.',
      },
    ],
    diagram: [
      'Wirkt aktuell',
      'Gewinnt den Vergleich',
      'Werbe-ready',
    ],
  },
  help: {
    id: 'does-buying-facebook-page-likes-help',
    title: {
      lead: 'Bringt es etwas,',
      highlight: 'Facebook Fanpage Likes zu kaufen?',
    },
    intro: 'Seiten-Likes verändern die Like-Zahl einer Seite im klassischen Layout. Das bewirken sie und das nicht.',
    no: {
      title: 'Was sich nicht ändert',
      items: [
        'Reaktionen auf einzelne Beiträge',
        'Ihre organische Reichweite allein',
        'Seiten, die nur Follower zeigen (dann Follower wählen)',
      ],
    },
    yes: {
      title: 'Was sich ändert',
      items: [
        'Die Like-Zahl unter Ihrem Seitennamen',
        'Wie beliebt die Seite auf neue Besucher wirkt',
        'Den ersten Eindruck im Vergleich mit anderen Unternehmen',
      ],
      image: '/assets/images/illustrations/facebook-page-likes/facebook-page-likes-does-help.webp',
      altFallback: 'Illustration: Facebook Fanpage Likes auf Facebook',
    },
  },
  who: {
    id: 'who-orders',
    title: {
      lead: 'Wer bestellt',
      highlight: 'Facebook Fanpage Likes',
    },
    cards: [
      {
        title: 'Etablierte lokale Unternehmen',
        body: 'Gasthäuser, Gärtnereien und Familienbetriebe mit älteren Seiten ergänzen Likes, damit die Zahl zu ihrem Ruf passt.',
        image: '/assets/images/illustrations/facebook-page-likes/facebook-page-likes-best-practices.webp',
      },
      {
        title: 'Handel und Salons',
        body: 'Geschäfte und Salons erhöhen ihre Seiten-Likes vor einer Saison, etwa Weihnachten oder einem Sommerschlussverkauf.',
        image: '/assets/images/illustrations/facebook-page-likes/facebook-page-likes-hero.webp',
      },
      {
        title: 'Agenturen',
        body: 'Agenturen bringen Kundenseiten vor einer Kampagne oder einem Rebranding in Form, oft mit schrittweiser Lieferung.',
        image: '/assets/images/illustrations/facebook-page-likes/facebook-page-likes-why-buy.webp',
      },
    ],
    statement: 'Egal welche Seite, die Bestellung läuft immer gleich: Ihr öffentlicher Seitenlink, ein passendes Paket und Likes, die meist innerhalb von 6–8 Stunden starten. Kein Admin-Zugang nötig.',
  },
  vs: {
    id: 'facebook-page-likes-vs-other-services',
    title: {
      lead: 'Facebook Fanpage Likes im Vergleich zu',
      highlight: 'Followern und Beitrags-Likes',
    },
    intro: 'Jeder Service verändert eine andere Zahl. Wählen Sie den, der zu dem passt, was Besucher sehen sollen.',
    cols: [
      'Service',
      'Was sich ändert',
      'Was Sie uns geben',
      'Ab',
    ],
    rows: [
      {
        slug: 'buy-facebook-page-likes',
        label: 'Seiten-Likes',
        changes: 'Die Like-Zahl einer Seite im klassischen Layout',
        needs: 'Ein Link zur Seite',
        current: true,
      },
      {
        slug: 'buy-facebook-followers',
        label: 'Follower',
        changes: 'Die Follower-Zahl einer Seite oder eines Profils',
        needs: 'Ein Link zur Seite oder zum Profil',
      },
      {
        slug: 'buy-facebook-post-likes',
        label: 'Beitrags-Likes',
        changes: 'Reaktionen auf einen öffentlichen Beitrag',
        needs: 'Ein Link zum öffentlichen Beitrag',
      },
    ],
    currentLabel: 'Diese Seite',
  },
  safe: {
    id: 'is-it-safe',
    title: {
      lead: 'Ist es sicher,',
      highlight: 'Facebook Fanpage Likes zu kaufen?',
    },
    lead: 'Es kommt auf drei Dinge an: Ihr Konto, Ihre Zahlung und Ihre Daten. So funktioniert jedes davon bei NovaLikes, plus das eine Risiko, das kein Anbieter ausschließen kann.',
    body: 'Die Gemeinschaftsstandards von Facebook erlauben kein unauthentisches Verhalten, und Meta entfernt regelmäßig gefälschte oder inaktive Konten. Deshalb kann nach der Lieferung ein kleiner Rückgang auftreten, und deshalb enthält jede Bestellung 6 Monate Nachfüllung.',
    cards: [
      {
        ui: 'nopass',
        title: 'Kontosicherheit',
        body: 'Wir brauchen nur den öffentlichen Link zu Ihrer Seite, deshalb meldet sich niemand an und niemand braucht Admin-Rechte. Wir fragen nie nach einem Passwort oder Anmeldecode. Wer sich als NovaLikes ausgibt und danach fragt, gehört nicht zu uns.',
      },
      {
        ui: 'pay',
        title: 'Zahlungssicherheit',
        body: 'Sie zahlen einmal über einen sicheren Checkout mit Karte, Apple Pay oder Google Pay in US-Dollar. Es gibt kein Abo und nichts verlängert sich.',
      },
      {
        ui: 'privacy',
        title: 'Datenschutz',
        body: 'Ihr Link und Ihre E-Mail-Adresse werden nur genutzt, um die Bestellung zu bearbeiten und Ihnen Updates zu senden, wie in unserer [Datenschutzerklärung](/privacy-policy) beschrieben.',
      },
    ],
  },
  before: {
    id: 'delivery-and-safety',
    title: {
      lead: 'Bevor Sie',
      highlight: 'Facebook Fanpage Likes kaufen',
    },
    lead: 'Prüfen Sie diese vier Punkte einmal, dann läuft Ihre Bestellung reibungslos.',
    items: [
      {
        title: 'Ihre Seite zeigt Likes',
        body: 'Prüfen Sie es in einem privaten Fenster. Zeigt sie nur Follower, sind Seiten-Likes nicht sichtbar. Wählen Sie dann Follower.',
      },
      {
        title: 'Es ist eine Seite, kein Profil',
        body: 'Seiten-Likes funktionieren nur bei Facebook-Seiten. Persönliche Profile brauchen Facebook Follower.',
      },
      {
        title: 'Die Seite ist veröffentlicht',
        body: 'Eine unveröffentlichte oder eingeschränkte Seite verhindert den Start.',
      },
      {
        title: 'Die Seiten-URL bleibt gleich',
        body: 'Behalten Sie dieselbe Adresse während der Lieferung und der 6 Monate Nachfüllung.',
      },
    ],
  },
  faq: {
    id: 'faq',
    kicker: 'Noch Fragen vor der Bestellung?',
    title: 'Facebook Fanpage Likes FAQ',
    intro: 'Keine Antwort gefunden? Schreiben Sie uns rund um die Uhr auf WhatsApp unter +44 7454 758272.',
    cta: 'Auf WhatsApp fragen',
    locale: {
      code: 'de',
    },
    extra: [
      {
        id: 'de-fb-page-likes-v2-1',
        question: 'Meine Seite zeigt nur Follower. Was soll ich bestellen?',
        answer: 'Facebook Follower. Neuere Seiten zeigen Follower statt Likes, Seiten-Likes wären dort nicht sichtbar.',
      },
      {
        id: 'de-fb-page-likes-v2-2',
        question: 'Kann ich eine Erstattung bekommen?',
        answer: 'Berechtigte Bestellungen sind durch unsere 30-Tage-Geld-zurück-Garantie abgedeckt, gerechnet ab dem Kaufdatum. Die Erstattungsrichtlinie erklärt, welche Bestellungen berechtigt sind und wie Sie eine Anfrage stellen.',
      },
      {
        id: 'de-fb-page-likes-v2-3',
        question: 'Welche Zahlungsarten kann ich nutzen?',
        answer: 'Sie können mit Karte, Apple Pay oder Google Pay in US-Dollar bezahlen. Es ist eine Einmalzahlung, nichts verlängert sich.',
      },
    ],
  },
  more: {
    id: 'related-services',
    title: 'Weitere NovaLikes-Services',
    intro: 'Facebook Fanpage Likes verändern eine Zahl. Für eine andere wählen Sie einen Service unten.',
    services: [
      {
        slug: 'buy-facebook-followers',
        title: 'Facebook Follower kaufen',
        line: 'Für Seiten und öffentliche Profile',
        image: '/assets/images/illustrations/facebook-followers/facebook-followers-hero.webp',
      },
      {
        slug: 'buy-facebook-post-likes',
        title: 'Facebook Post Likes kaufen',
        line: 'Reaktionen auf einen öffentlichen Beitrag',
        image: '/assets/images/illustrations/facebook-post-likes/facebook-post-likes-hero.webp',
      },
      {
        slug: 'buy-instagram-followers',
        title: 'Instagram Follower kaufen',
        line: 'Profil wachsen lassen',
        image: '/assets/images/illustrations/instagram-followers/instagram-followers-hero.webp',
      },
    ],
    cardPrice: 'Ab {fromPrice}',
    guidesTitle: '',
    guides: [],
  },
  sticky: {
    label: 'Paket wählen',
    href: '#pricing-packages',
  },
  whatsapp: {
    display: '+44 7454 758272',
    href: 'https://wa.me/447454758272',
  },
} satisfies ServiceV2Content;
