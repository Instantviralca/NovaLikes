import type { ServiceV2Content } from '../../types';

/** German (/de) — v2 service page copy for buy-instagram-views. Primary keyword: "instagram views kaufen". Do not edit wording without the content owner. */
export const DE_BUY_INSTAGRAM_VIEWS_V2 = {
  meta: {
    slug: 'buy-instagram-views',
    platform: 'Instagram',
    name: 'Instagram Views',
    unit: 'Views',
    unitSingular: 'View',
    inputKind: 'link',
    perUnit: 1000,
    tiers: false,
    keywords: {
      primary: 'instagram views kaufen',
      secondary: [
        'instagram aufrufe kaufen',
        'instagram reel views kaufen',
        'instagram video views kaufen',
        'instagram views preis',
      ],
      questions: [
        'ist es sicher instagram views zu kaufen',
        'was kosten instagram views',
        'helfen gekaufte views bei explore',
        'sinken instagram views wieder',
        'wie werden reels views gezählt',
      ],
    },
  },
  hero: {
    title: {
      lead: '',
      highlight: 'Instagram Views',
      tail: 'kaufen für einen stärkeren Reels-Start',
    },
    subtitle: 'Reels mit einer gesunden View-Zahl wirken sehenswert. Pushen Sie neue Reels, Produktvideos und Tutorials ab {fromPrice}, auf Wunsch mit schrittweiser Lieferung.',
    trust: [
      'Kein Passwort nötig',
      'Start in 6–8 Stunden',
      '6 Monate Nachfüllung',
    ],
  },
  picker: {
    id: 'pricing-packages',
    title: 'Instagram Views Pakete & Preise',
    intro: 'Wählen Sie ein Paket. Preise in USD.',
    summaryName: '{quantity} Instagram Views',
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
      highlight: 'Instagram Views?',
    },
    items: [
      {
        icon: 'shield',
        tone: 'mint',
        title: 'Nur ein Link, nie Ihr Passwort',
        body: 'Wir brauchen nur den öffentlichen Link zum Reel oder Video. Kein Anmeldecode und kein Zugriff auf Ihr Konto.',
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
        body: 'Wenn Views aus Ihrer Bestellung innerhalb von 6 Monaten nach der Lieferung zurückgehen, schicken Sie uns Ihre Bestellnummer und wir füllen kostenlos nach.',
      },
      {
        icon: 'badge-check',
        tone: 'peach',
        title: '30-Tage-Geld-zurück-Garantie',
        body: 'Berechtigte Bestellungen sind 30 Tage ab Kaufdatum abgedeckt. Unsere Erstattungsrichtlinie erklärt genau, was dazugehört.',
      },
      {
        icon: 'play',
        tone: 'pink',
        title: 'Reels und Videobeiträge',
        body: 'Bestellen Sie Views für jedes öffentliche Reel oder Video. Jede Bestellung gilt für ein Video.',
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
      highlight: 'Instagram Views',
    },
    pill: 'Etwa 2 Minuten',
    intro: 'Die Bestellung dauert fünf kurze Schritte und etwa zwei Minuten. Wir brauchen nur den Link zu einem öffentlichen Reel oder Video.',
    items: [
      {
        ui: 'public',
        title: 'Reel öffentlich lassen',
        body: 'Das Reel oder Video muss bis zum Ende der Lieferung auf einem öffentlichen Konto sein. Nicht löschen oder archivieren.',
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
        title: 'Reel-Link einfügen',
        body: 'Öffnen Sie das Reel, tippen Sie auf „Teilen“, wählen Sie „Link kopieren“ und fügen Sie ihn an der Kasse ein. Er sieht aus wie instagram.com/reel/….',
      },
      {
        ui: 'pay',
        title: 'Sicher bezahlen',
        body: 'Einmal mit Karte, Apple Pay oder Google Pay in US-Dollar bezahlen. Es gibt kein Abo.',
      },
    ],
    done: {
      title: 'Fertig!',
      count: 5000,
      unit: 'Views',
      body: 'Die meisten Bestellungen starten innerhalb von 6–8 Stunden nach der Zahlung und sind 4–6 Stunden nach dem Start abgeschlossen. Den Fortschritt sehen Sie auf der Seite „Bestellung verfolgen“ mit Ihrer Bestellnummer.',
    },
  },
  ui: {
    toggle: {
      label: 'Privates Konto',
      sub: 'Aus, damit wir das Reel erreichen',
    },
    chips: [
      '2.5K',
      '5K',
      '10K',
      '25K',
    ],
    chipOn: 1,
    input: {
      prefix: '',
      placeholder: 'instagram.com/reel/…',
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
      highlight: 'Anbieter für Instagram Views',
    },
    intro: 'Egal, wo Sie kaufen: Prüfen Sie zuerst diese sieben Punkte.',
    us: 'NovaLikes',
    them: 'Unseriöse Anbieter',
    rows: [
      {
        label: 'Zugangsdaten',
        novalikes: 'Nur Reel-Link',
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
    title: 'Nachfüllung und Geld-zurück-Versprechen für Instagram Views',
    intro: 'Beide Zusagen stehen in unserer Erstattungsrichtlinie, nicht nur auf dieser Seite.',
    cards: [
      {
        chip: '6 Monate',
        title: '6 Monate Nachfüllung',
        image: '/assets/images/illustrations/instagram-views/instagram-views-order-process.webp',
        body: 'Wenn Views aus Ihrer Bestellung innerhalb von 6 Monaten nach dem Liefertermin zurückgehen, schreiben Sie uns per WhatsApp oder E-Mail mit Ihrer Bestellnummer, und wir füllen die Differenz kostenlos auf. Lassen Sie das Reel oder Video online und öffentlich, während eine Nachfüllung geliefert wird.',
      },
      {
        chip: '30 Tage',
        title: '30-Tage-Geld-zurück-Garantie',
        image: '/assets/images/illustrations/instagram-views/instagram-views-package-cta.webp',
        body: 'Berechtigte Bestellungen können innerhalb von 30 Tagen ab Kaufdatum erstattet werden. Die Erstattungsrichtlinie erklärt, was berechtigt ist und wie Sie eine Anfrage stellen.',
      },
    ],
    link: {
      label: 'Erstattungsrichtlinie lesen',
      href: '/refund-policy',
    },
  },
  cost: {
    id: 'instagram-views-cost',
    title: {
      lead: 'Was kosten',
      highlight: 'Instagram Views?',
    },
    intro: 'Views starten ab {fromPrice} für 500, und der Preis pro 1.000 Views sinkt bei größeren Paketen deutlich. Jeder Preis ist eine Einmalzahlung in US-Dollar für ein Reel oder Video.',
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
    id: 'why-buy-instagram-views',
    title: {
      lead: 'Warum kaufen Menschen',
      highlight: 'Instagram Views?',
    },
    intro: 'Ein Reel mit ein paar Dutzend Views kann wirken, als hätte es niemanden interessiert, auch wenn es gut ist. Ein Views-Paket hebt die angezeigte Zahl, damit neue Zuschauer eher auf Play drücken.',
    items: [
      {
        title: 'Reels, die sehenswert wirken',
        body: 'Menschen schauen eher ein Reel an, das schon Views hat. Eine stärkere Zahl macht die erste Sekunde wertvoller.',
      },
      {
        title: 'Ein starker Start für Launches',
        body: 'Produktvideos, Tutorials und Ankündigungen wirken vom ersten Tag an etabliert statt bei null.',
      },
      {
        title: 'Beweis für Partner und Kunden',
        body: 'Eine gesunde View-Zahl hilft, wenn Sie Reels mit Marken, Kooperationspartnern oder Kunden teilen.',
      },
    ],
    diagram: [
      'Sehenswert',
      'Launch-Start',
      'Sozialer Beweis',
    ],
  },
  help: {
    id: 'does-buying-instagram-views-help',
    title: {
      lead: 'Bringt es etwas,',
      highlight: 'Instagram Views zu kaufen?',
    },
    intro: 'Views verändern die Zahl unter einem Reel. Die Reichweite entscheidet Instagram weiter danach, wie echte Zuschauer reagieren.',
    no: {
      title: 'Was sich nicht ändert',
      items: [
        'Wiedergabezeit, Shares oder Saves allein',
        'Platzierung in Explore oder im Reels-Tab allein',
        'Ihre Follower, Likes oder Kommentare',
      ],
    },
    yes: {
      title: 'Was sich ändert',
      items: [
        'Die View-Zahl des gewählten Reels oder Videos',
        'Wie sehenswert das Reel auf neue Zuschauer wirkt',
        'Den ersten Eindruck von Launches und Tutorials',
      ],
      image: '/assets/images/illustrations/instagram-views/instagram-views-does-help.webp',
      altFallback: 'Illustration: Instagram Views auf Instagram',
    },
  },
  who: {
    id: 'who-orders',
    title: {
      lead: 'Wer bestellt',
      highlight: 'Instagram Views',
    },
    cards: [
      {
        title: 'Creator',
        body: 'Creator ergänzen Views bei neuen Reels und Tutorials, damit ein frischer Upload nicht bei null steht, während der Algorithmus ihn testet.',
        image: '/assets/images/illustrations/instagram-views/instagram-views-best-practices.webp',
      },
      {
        title: 'Kleine Unternehmen',
        body: 'Unternehmen nutzen Views bei Produktdemos, Behind-the-Scenes-Clips und Aktions-Reels, die sie in Anzeigen, Bios und Nachrichten teilen.',
        image: '/assets/images/illustrations/instagram-views/instagram-views-hero.webp',
      },
      {
        title: 'Marken & Agenturen',
        body: 'Marken und Agenturen ergänzen Views bei Kampagnen-Reels und Kooperationen, oft mit schrittweiser Lieferung.',
        image: '/assets/images/illustrations/instagram-views/instagram-views-why-buy.webp',
      },
    ],
    statement: 'Egal welches Reel, die Bestellung läuft immer gleich: ein öffentlicher Link, ein Paket Ihrer Wahl und eine Zahl, die meist innerhalb von 6–8 Stunden zu steigen beginnt. Niemand braucht Ihre Zugangsdaten.',
  },
  vs: {
    id: 'instagram-views-vs-other-services',
    title: {
      lead: 'Instagram Views im Vergleich zu',
      highlight: 'Likes, Followern und Kommentaren',
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
        slug: 'buy-instagram-views',
        label: 'Views',
        changes: 'Die View-Zahl eines Reels oder Videos',
        needs: 'Ein Link zum öffentlichen Reel',
        current: true,
      },
      {
        slug: 'buy-instagram-followers',
        label: 'Follower',
        changes: 'Die Follower-Zahl in Ihrem Profil',
        needs: 'Ihr öffentlicher @Benutzername',
      },
      {
        slug: 'buy-instagram-likes',
        label: 'Likes',
        changes: 'Die Like-Zahl eines Beitrags oder Reels',
        needs: 'Ein Link zum öffentlichen Beitrag',
      },
      {
        slug: 'buy-instagram-comments',
        label: 'Kommentare',
        changes: 'Kommentare unter einem öffentlichen Beitrag',
        needs: 'Ein Link zum öffentlichen Beitrag',
      },
    ],
    currentLabel: 'Diese Seite',
  },
  safe: {
    id: 'is-it-safe',
    title: {
      lead: 'Ist es sicher,',
      highlight: 'Instagram Views zu kaufen?',
    },
    lead: 'Es kommt auf drei Dinge an: Ihr Konto, Ihre Zahlung und Ihre Daten. So funktioniert jedes davon bei NovaLikes, plus das eine Risiko, das kein Anbieter ausschließen kann.',
    body: 'Die Gemeinschaftsrichtlinien von Instagram bitten darum, Interaktionen nicht künstlich zu steigern, und Instagram entfernt regelmäßig Konten, die es für inaktiv oder unecht hält. Deshalb kann nach der Lieferung ein kleiner Rückgang auftreten, und deshalb enthält jede Bestellung 6 Monate Nachfüllung. Schrittweise Lieferung und Reels, die Menschen wirklich anschauen, wirken am natürlichsten.',
    cards: [
      {
        ui: 'nopass',
        title: 'Kontosicherheit',
        body: 'Wir brauchen nur den öffentlichen Link zum Reel oder Video, deshalb meldet sich niemand bei Ihrem Konto an und niemand ändert etwas. Wir fragen nie nach einem Passwort oder Anmeldecode. Wer sich als NovaLikes ausgibt und danach fragt, gehört nicht zu uns.',
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
      highlight: 'Instagram Views kaufen',
    },
    lead: 'Prüfen Sie diese vier Punkte einmal, dann läuft Ihre Bestellung reibungslos.',
    items: [
      {
        title: 'Das Reel ist öffentlich',
        body: 'Das Reel oder Video muss bis zum Ende der Lieferung auf einem öffentlichen Konto sein.',
      },
      {
        title: 'Der Link führt zum Reel',
        body: 'Kopieren Sie den Link aus dem Reel selbst. Er sieht aus wie instagram.com/reel/…, nicht wie Ihr Profillink.',
      },
      {
        title: 'Das Reel bleibt online',
        body: 'Löschen oder archivieren Sie es nicht während der Lieferung oder der 6 Monate Nachfüllung.',
      },
      {
        title: 'Die Zahlen passen zusammen',
        body: 'Zehntausende Views bei fast keinen Likes können seltsam wirken. Kombinieren Sie Views mit Likes oder wählen Sie eine passende Größe.',
      },
    ],
  },
  faq: {
    id: 'faq',
    kicker: 'Noch Fragen vor der Bestellung?',
    title: 'Instagram Views FAQ',
    intro: 'Keine Antwort gefunden? Schreiben Sie uns rund um die Uhr auf WhatsApp unter +44 7454 758272.',
    cta: 'Auf WhatsApp fragen',
    locale: {
      code: 'de',
    },
    extra: [
      {
        id: 'de-ig-views-v2-1',
        question: 'Wie viele Instagram Views sollte ich kaufen?',
        answer: 'Wählen Sie eine Größe, die zu Ihrem Konto und zum Reel passt. Einige Tausend Views passen zu den meisten Reels kleinerer Konten, größere Konten und Kampagnen nutzen 10.000 oder mehr. Im Zweifel klein anfangen.',
      },
      {
        id: 'de-ig-views-v2-2',
        question: 'Kann ich ein Views-Paket auf mehrere Reels aufteilen?',
        answer: 'Nein. Jede Bestellung gilt für ein Reel oder Video. Für mehrere Reels bestellen Sie jeweils einzeln.',
      },
      {
        id: 'de-ig-views-v2-3',
        question: 'Kann ich eine Erstattung bekommen?',
        answer: 'Berechtigte Bestellungen sind durch unsere 30-Tage-Geld-zurück-Garantie abgedeckt, gerechnet ab dem Kaufdatum. Die Erstattungsrichtlinie erklärt, welche Bestellungen berechtigt sind und wie Sie eine Anfrage stellen.',
      },
      {
        id: 'de-ig-views-v2-4',
        question: 'Welche Zahlungsarten kann ich nutzen?',
        answer: 'Sie können mit Karte, Apple Pay oder Google Pay in US-Dollar bezahlen. Es ist eine Einmalzahlung, nichts verlängert sich.',
      },
    ],
  },
  more: {
    id: 'related-services',
    title: 'Weitere Instagram-Services',
    intro: 'Instagram Views verändern eine Zahl. Für eine andere wählen Sie einen Service unten.',
    services: [
      {
        slug: 'buy-instagram-likes',
        title: 'Instagram Likes kaufen',
        line: 'Für Beiträge, Karussells und Reels',
        image: '/assets/images/illustrations/instagram-likes/instagram-likes-hero.webp',
      },
      {
        slug: 'buy-instagram-followers',
        title: 'Instagram Follower kaufen',
        line: 'Profil wachsen lassen',
        image: '/assets/images/illustrations/instagram-followers/instagram-followers-hero.webp',
      },
      {
        slug: 'buy-instagram-comments',
        title: 'Instagram Kommentare kaufen',
        line: 'Gespräche unter einem Beitrag starten',
        image: '/assets/images/illustrations/instagram-comments/instagram-comments-hero.webp',
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
