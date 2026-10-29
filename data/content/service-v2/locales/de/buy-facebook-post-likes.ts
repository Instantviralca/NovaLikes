import type { ServiceV2Content } from '../../types';

/** German (/de) — v2 service page copy for buy-facebook-post-likes. Primary keyword: "facebook post likes kaufen". Do not edit wording without the content owner. */
export const DE_BUY_FACEBOOK_POST_LIKES_V2 = {
  meta: {
    slug: 'buy-facebook-post-likes',
    platform: 'Facebook',
    name: 'Facebook Post Likes',
    unit: 'Likes',
    unitSingular: 'Like',
    inputKind: 'link',
    perUnit: 1000,
    tiers: false,
    keywords: {
      primary: 'facebook post likes kaufen',
      secondary: [
        'facebook beitrag likes kaufen',
        'facebook reaktionen kaufen',
        'facebook beitrags likes preis',
        'likes für facebook beitrag',
      ],
      questions: [
        'kann ich love oder andere reaktionen wählen',
        'muss der beitrag öffentlich sein',
        'was kosten facebook beitrags likes',
        'ist es sicher facebook likes zu kaufen',
        'kann ich likes aufteilen',
      ],
    },
  },
  hero: {
    title: {
      lead: '',
      highlight: 'Facebook Post Likes',
      tail: 'kaufen für Ihren wichtigsten Beitrag',
    },
    subtitle: 'Ein Event, ein Angebot oder große Neuigkeiten verdienen mehr als ein paar Reaktionen. Geben Sie einem öffentlichen Beitrag die Resonanz, die er verdient. Ab {fromPrice}, auf Wunsch auch mit „Love“ und anderen Reaktionen.',
    trust: [
      'Kein Passwort nötig',
      'Start in 6–8 Stunden',
      '6 Monate Nachfüllung',
    ],
  },
  picker: {
    id: 'pricing-packages',
    title: 'Facebook Post Likes Pakete & Preise',
    intro: 'Wählen Sie ein Paket. Preise in USD.',
    summaryName: '{quantity} Facebook Post Likes',
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
      highlight: 'Facebook Post Likes?',
    },
    items: [
      {
        icon: 'shield',
        tone: 'mint',
        title: 'Nur ein Link, kein Admin-Zugang',
        body: 'Wir brauchen nur den öffentlichen Link zum Beitrag. Kein Passwort, keine Admin-Rolle und kein Zugang zu Ihrem Konto.',
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
        icon: 'heart',
        tone: 'pink',
        title: '„Love“ und andere Reaktionen',
        body: 'Standardmäßig kommen „Gefällt mir“-Angaben. Lieber „Love“ oder eine andere Reaktion? Schreiben Sie es vor dem Start in den Bestellhinweis.',
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
      highlight: 'Facebook Post Likes',
    },
    pill: 'Etwa 2 Minuten',
    intro: 'Die Bestellung dauert fünf kurze Schritte und etwa zwei Minuten. Wir brauchen nur den Link zu einem öffentlichen Beitrag.',
    items: [
      {
        ui: 'public',
        title: 'Beitrag auf Öffentlich stellen',
        body: 'Achten Sie auf das Globus-Symbol neben dem Datum. Beiträge für Freunde oder eine eigene Liste können keine Bestellung erhalten.',
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
        title: 'Beitragslink einfügen',
        body: 'Öffnen Sie den Beitrag, tippen Sie auf „Teilen“ und „Link kopieren“ und fügen Sie ihn an der Kasse ein. Gewünschte Reaktion bei Bedarf in den Hinweis.',
      },
      {
        ui: 'pay',
        title: 'Sicher bezahlen',
        body: 'Einmal mit Karte, Apple Pay oder Google Pay in US-Dollar bezahlen. Es gibt kein Abo.',
      },
    ],
    done: {
      title: 'Fertig!',
      count: 500,
      unit: 'Likes',
      body: 'Die meisten Bestellungen starten innerhalb von 6–8 Stunden nach der Zahlung und sind 4–6 Stunden nach dem Start abgeschlossen. Den Fortschritt sehen Sie auf der Seite „Bestellung verfolgen“ mit Ihrer Bestellnummer.',
    },
  },
  ui: {
    toggle: {
      label: 'Nur Freunde',
      sub: 'Aus, damit der Beitrag öffentlich ist',
    },
    chips: [
      '250',
      '500',
      '1K',
      '2.5K',
    ],
    chipOn: 1,
    input: {
      prefix: '',
      placeholder: 'facebook.com/…/posts/…',
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
      highlight: 'Anbieter für Facebook Post Likes',
    },
    intro: 'Egal, wo Sie kaufen: Prüfen Sie zuerst diese sieben Punkte.',
    us: 'NovaLikes',
    them: 'Unseriöse Anbieter',
    rows: [
      {
        label: 'Zugangsdaten',
        novalikes: 'Nur Beitragslink',
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
    title: 'Nachfüllung und Geld-zurück-Versprechen für Facebook Post Likes',
    intro: 'Beide Zusagen stehen in unserer Erstattungsrichtlinie, nicht nur auf dieser Seite.',
    cards: [
      {
        chip: '6 Monate',
        title: '6 Monate Nachfüllung',
        image: '/assets/images/illustrations/facebook-post-likes/facebook-post-likes-order-process.webp',
        body: 'Wenn Likes aus Ihrer Bestellung innerhalb von 6 Monaten nach dem Liefertermin zurückgehen, schreiben Sie uns per WhatsApp oder E-Mail mit Ihrer Bestellnummer, und wir füllen die Differenz kostenlos auf. Lassen Sie den Beitrag online und öffentlich, während eine Nachfüllung geliefert wird.',
      },
      {
        chip: '30 Tage',
        title: '30-Tage-Geld-zurück-Garantie',
        image: '/assets/images/illustrations/facebook-post-likes/facebook-post-likes-package-cta.webp',
        body: 'Berechtigte Bestellungen können innerhalb von 30 Tagen ab Kaufdatum erstattet werden. Die Erstattungsrichtlinie erklärt, was berechtigt ist und wie Sie eine Anfrage stellen.',
      },
    ],
    link: {
      label: 'Erstattungsrichtlinie lesen',
      href: '/refund-policy',
    },
  },
  cost: {
    id: 'facebook-post-likes-cost',
    title: {
      lead: 'Was kosten',
      highlight: 'Facebook Post Likes?',
    },
    intro: 'Beitrags-Likes starten ab {fromPrice} für 100, und der Preis pro Like sinkt mit der Paketgröße. Jeder Preis ist eine Einmalzahlung in US-Dollar für einen Beitrag.',
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
    id: 'why-buy-facebook-post-likes',
    title: {
      lead: 'Warum kaufen Menschen',
      highlight: 'Facebook Post Likes?',
    },
    intro: 'Reaktionen sind auf Facebook das schnellste Zeichen, dass ein Beitrag zählt. Wenige Reaktionen unter einer wichtigen Nachricht lassen sie ignoriert wirken, auch wenn sie im echten Leben gut ankam.',
    items: [
      {
        title: 'Events, die gut besucht wirken',
        body: 'Quizabende, Tage der offenen Tür und Benefizaktionen wirken mit vielen Reaktionen einladender.',
      },
      {
        title: 'Angebote, die auffallen',
        body: 'Aktionsbeiträge mit gesunder Zahl sind einen zweiten Blick wert.',
      },
      {
        title: 'Große Neuigkeiten, die gefeiert wirken',
        body: 'Eröffnungen, Jubiläen und Auszeichnungen verdienen eine passende Resonanz.',
      },
    ],
    diagram: [
      'Gut besucht',
      'Angebot fällt auf',
      'Gefeiert',
    ],
  },
  help: {
    id: 'does-buying-facebook-post-likes-help',
    title: {
      lead: 'Bringt es etwas,',
      highlight: 'Facebook Post Likes zu kaufen?',
    },
    intro: 'Beitrags-Likes verändern die Reaktionen auf einen öffentlichen Beitrag. Das bewirken sie und das nicht.',
    no: {
      title: 'Was sich nicht ändert',
      items: [
        'Follower oder Seiten-Likes',
        'Kommentare oder Shares',
        'Wie vielen Menschen Facebook spätere Beiträge zeigt',
      ],
    },
    yes: {
      title: 'Was sich ändert',
      items: [
        'Die Reaktionszahl des gewählten Beitrags',
        'Wie beliebt der Beitrag auf Besucher wirkt',
        'Den ersten Eindruck von Events, Angeboten und Neuigkeiten',
      ],
      image: '/assets/images/illustrations/facebook-post-likes/facebook-post-likes-does-help.webp',
      altFallback: 'Illustration: Facebook Post Likes auf Facebook',
    },
  },
  who: {
    id: 'who-orders',
    title: {
      lead: 'Wer bestellt',
      highlight: 'Facebook Post Likes',
    },
    cards: [
      {
        title: 'Gastronomie und Locations',
        body: 'Kneipen, Clubs und Locations ergänzen Reaktionen bei Quizabenden, Live-Musik und Spieltagen.',
        image: '/assets/images/illustrations/facebook-post-likes/facebook-post-likes-best-practices.webp',
      },
      {
        title: 'Schulen, Vereine und Initiativen',
        body: 'Sportvereine, Elternbeiräte und gemeinnützige Gruppen ergänzen Reaktionen bei Benefizaktionen und Ankündigungen.',
        image: '/assets/images/illustrations/facebook-post-likes/facebook-post-likes-hero.webp',
      },
      {
        title: 'Lokale Unternehmen',
        body: 'Geschäfte und Dienstleister ergänzen Reaktionen bei Angeboten und Eröffnungen, manchmal als „Love“ statt „Gefällt mir“.',
        image: '/assets/images/illustrations/facebook-post-likes/facebook-post-likes-why-buy.webp',
      },
    ],
    statement: 'Egal welcher Beitrag, die Bestellung läuft immer gleich: ein öffentlicher Link, Paket und Reaktion Ihrer Wahl und Likes, die meist innerhalb von 6–8 Stunden starten. Kein Login nötig.',
  },
  vs: {
    id: 'facebook-post-likes-vs-other-services',
    title: {
      lead: 'Facebook Post Likes im Vergleich zu',
      highlight: 'Followern und Seiten-Likes',
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
        slug: 'buy-facebook-post-likes',
        label: 'Beitrags-Likes',
        changes: 'Reaktionen auf einen öffentlichen Beitrag',
        needs: 'Ein Link zum öffentlichen Beitrag',
        current: true,
      },
      {
        slug: 'buy-facebook-followers',
        label: 'Follower',
        changes: 'Die Follower-Zahl einer Seite oder eines Profils',
        needs: 'Ein Link zur Seite oder zum Profil',
      },
      {
        slug: 'buy-facebook-page-likes',
        label: 'Seiten-Likes',
        changes: 'Die Like-Zahl einer Seite im klassischen Layout',
        needs: 'Ein Link zur Seite',
      },
    ],
    currentLabel: 'Diese Seite',
  },
  safe: {
    id: 'is-it-safe',
    title: {
      lead: 'Ist es sicher,',
      highlight: 'Facebook Post Likes zu kaufen?',
    },
    lead: 'Es kommt auf drei Dinge an: Ihr Konto, Ihre Zahlung und Ihre Daten. So funktioniert jedes davon bei NovaLikes, plus das eine Risiko, das kein Anbieter ausschließen kann.',
    body: 'Die Gemeinschaftsstandards von Facebook erlauben kein unauthentisches Verhalten, und Meta entfernt regelmäßig gefälschte oder inaktive Konten. Deshalb kann nach der Lieferung ein kleiner Rückgang auftreten, und deshalb enthält jede Bestellung 6 Monate Nachfüllung. Reaktionen im Verhältnis zum Beitrag wirken am natürlichsten.',
    cards: [
      {
        ui: 'nopass',
        title: 'Kontosicherheit',
        body: 'Wir brauchen nur den öffentlichen Link zum Beitrag, deshalb meldet sich niemand an und niemand braucht Admin-Rechte. Wir fragen nie nach einem Passwort oder Anmeldecode. Wer sich als NovaLikes ausgibt und danach fragt, gehört nicht zu uns.',
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
      highlight: 'Facebook Post Likes kaufen',
    },
    lead: 'Prüfen Sie diese vier Punkte einmal, dann läuft Ihre Bestellung reibungslos.',
    items: [
      {
        title: 'Der Beitrag ist öffentlich',
        body: 'Achten Sie auf das Globus-Symbol. Andere Zielgruppen verhindern die Lieferung.',
      },
      {
        title: 'Der Link führt zum Beitrag',
        body: 'Kopieren Sie ihn über „Teilen“ am Beitrag, nicht den Link Ihrer Seite.',
      },
      {
        title: 'Die Reaktion ist gewählt',
        body: '„Gefällt mir“ ist Standard. Für „Love“ oder eine andere Reaktion tragen Sie es vor dem Start in den Hinweis ein.',
      },
      {
        title: 'Der Beitrag bleibt online',
        body: 'Löschen Sie ihn nicht während der Lieferung oder der 6 Monate Nachfüllung.',
      },
    ],
  },
  faq: {
    id: 'faq',
    kicker: 'Noch Fragen vor der Bestellung?',
    title: 'Facebook Post Likes FAQ',
    intro: 'Keine Antwort gefunden? Schreiben Sie uns rund um die Uhr auf WhatsApp unter +44 7454 758272.',
    cta: 'Auf WhatsApp fragen',
    locale: {
      code: 'de',
    },
    extra: [
      {
        id: 'de-fb-post-likes-v2-1',
        question: 'Kann ich „Love“ statt „Gefällt mir“ bekommen?',
        answer: 'Ja. Schreiben Sie die gewünschte Reaktion vor dem Start in den Bestellhinweis oder schicken Sie sie uns auf WhatsApp.',
      },
      {
        id: 'de-fb-post-likes-v2-2',
        question: 'Kann ich eine Erstattung bekommen?',
        answer: 'Berechtigte Bestellungen sind durch unsere 30-Tage-Geld-zurück-Garantie abgedeckt, gerechnet ab dem Kaufdatum. Die Erstattungsrichtlinie erklärt, welche Bestellungen berechtigt sind und wie Sie eine Anfrage stellen.',
      },
      {
        id: 'de-fb-post-likes-v2-3',
        question: 'Welche Zahlungsarten kann ich nutzen?',
        answer: 'Sie können mit Karte, Apple Pay oder Google Pay in US-Dollar bezahlen. Es ist eine Einmalzahlung, nichts verlängert sich.',
      },
    ],
  },
  more: {
    id: 'related-services',
    title: 'Weitere NovaLikes-Services',
    intro: 'Facebook Post Likes verändern eine Zahl. Für eine andere wählen Sie einen Service unten.',
    services: [
      {
        slug: 'buy-facebook-followers',
        title: 'Facebook Follower kaufen',
        line: 'Für Seiten und öffentliche Profile',
        image: '/assets/images/illustrations/facebook-followers/facebook-followers-hero.webp',
      },
      {
        slug: 'buy-facebook-page-likes',
        title: 'Facebook Fanpage Likes kaufen',
        line: 'Für Seiten mit Like-Zahl',
        image: '/assets/images/illustrations/facebook-page-likes/facebook-page-likes-hero.webp',
      },
      {
        slug: 'buy-instagram-likes',
        title: 'Instagram Likes kaufen',
        line: 'Für Beiträge, Karussells und Reels',
        image: '/assets/images/illustrations/instagram-likes/instagram-likes-hero.webp',
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
