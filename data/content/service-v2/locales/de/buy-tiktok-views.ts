import type { ServiceV2Content } from '../../types';

/** German (/de) — v2 service page copy for buy-tiktok-views. Primary keyword: "tiktok views kaufen". Do not edit wording without the content owner. */
export const DE_BUY_TIKTOK_VIEWS_V2 = {
  meta: {
    slug: 'buy-tiktok-views',
    platform: 'TikTok',
    name: 'TikTok Views',
    unit: 'Views',
    unitSingular: 'View',
    inputKind: 'link',
    perUnit: 1000,
    tiers: true,
    keywords: {
      primary: 'tiktok views kaufen',
      secondary: [
        'tiktok aufrufe kaufen',
        'tiktok views pakete',
        'tiktok views preis',
        'views für tiktok videos kaufen',
      ],
      questions: [
        'ist es sicher tiktok views zu kaufen',
        'was kosten tiktok views',
        'zählen gekaufte views für creator rewards',
        'high quality oder premium views',
        'warum hat mein tiktok 0 views',
      ],
    },
  },
  hero: {
    title: {
      lead: '',
      highlight: 'TikTok Views',
      tail: 'kaufen für einen stärkeren Start',
    },
    subtitle: 'Ein neuer Upload mit ein paar Hundert Views wird schnell weggewischt, egal wie gut er ist. Geben Sie ihm von Anfang an eine stärkere Zahl. High-Quality- oder Premium-Views ab {fromPrice}.',
    trust: [
      'Kein Passwort nötig',
      'Start in 6–8 Stunden',
      '6 Monate Nachfüllung',
    ],
  },
  picker: {
    id: 'pricing-packages',
    title: 'TikTok Views Pakete & Preise',
    intro: 'Wählen Sie eine Stufe und ein Paket. Preise in USD.',
    summaryName: '{quantity} {tier} TikTok Views',
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
    tiers: [
      {
        label: 'High Quality',
        note: 'Unser günstigster Preis pro View.',
      },
      {
        label: 'Premium',
        note: 'Unsere höherwertige Views-Option.',
      },
    ],
  },
  why: {
    id: 'why-choose-novalikes',
    title: {
      lead: 'Warum NovaLikes für',
      highlight: 'TikTok Views?',
    },
    items: [
      {
        icon: 'shield',
        tone: 'mint',
        title: 'Nur ein Link, nie Ihr Passwort',
        body: 'Wir brauchen nur den öffentlichen Link zum Video. Kein Anmeldecode und kein Zugriff auf Ihr Konto.',
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
        icon: 'layers',
        tone: 'pink',
        title: 'Zwei Qualitätsstufen',
        body: 'High Quality ist unser günstigster Preis pro View, Premium unsere höherwertige Option. Beide haben dieselben Lieferzeiten und 6 Monate Nachfüllung.',
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
      highlight: 'TikTok Views',
    },
    pill: 'Etwa 2 Minuten',
    intro: 'Die Bestellung dauert fünf kurze Schritte. Wählen Sie High Quality oder Premium, eine Menge und fügen Sie den Link zu einem öffentlichen Video ein.',
    items: [
      {
        ui: 'public',
        title: 'Video öffentlich lassen',
        body: 'Das Video muss bis zum Ende der Lieferung öffentlich auf einem öffentlichen Konto sein. Nicht löschen.',
      },
      {
        ui: 'packages',
        title: 'Stufe und Paket wählen',
        body: 'Wählen Sie High Quality oder Premium und dann eine Menge. Jedes Paket zeigt den Preis, bevor Sie sich festlegen.',
      },
      {
        ui: 'cart',
        title: 'In den Warenkorb',
        body: 'Klicken Sie auf „In den Warenkorb“ und gehen Sie dann zur Kasse.',
      },
      {
        ui: 'username',
        title: 'Videolink einfügen',
        body: 'Öffnen Sie das Video in TikTok, tippen Sie auf „Teilen“, wählen Sie „Link kopieren“ und fügen Sie ihn an der Kasse ein.',
      },
      {
        ui: 'pay',
        title: 'Sicher bezahlen',
        body: 'Einmal mit Karte, Apple Pay oder Google Pay in US-Dollar bezahlen. Es gibt kein Abo.',
      },
    ],
    done: {
      title: 'Fertig!',
      count: 10000,
      unit: 'Views',
      body: 'Die meisten Bestellungen starten innerhalb von 6–8 Stunden nach der Zahlung und sind 4–6 Stunden nach dem Start abgeschlossen. Den Fortschritt sehen Sie auf der Seite „Bestellung verfolgen“ mit Ihrer Bestellnummer.',
    },
  },
  ui: {
    toggle: {
      label: 'Privates Video',
      sub: 'Aus, damit wir das Video erreichen',
    },
    chips: [
      '2K',
      '5K',
      '10K',
      '50K',
    ],
    chipOn: 2,
    input: {
      prefix: '',
      placeholder: 'tiktok.com/@…/video/…',
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
      highlight: 'Anbieter für TikTok Views',
    },
    intro: 'Egal, wo Sie kaufen: Prüfen Sie zuerst diese sieben Punkte.',
    us: 'NovaLikes',
    them: 'Unseriöse Anbieter',
    rows: [
      {
        label: 'Zugangsdaten',
        novalikes: 'Nur Videolink',
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
    title: 'Nachfüllung und Geld-zurück-Versprechen für TikTok Views',
    intro: 'Beide Zusagen stehen in unserer Erstattungsrichtlinie, nicht nur auf dieser Seite.',
    cards: [
      {
        chip: '6 Monate',
        title: '6 Monate Nachfüllung',
        image: '/assets/images/illustrations/tiktok-views/tiktok-views-order-process.webp',
        body: 'Wenn Views aus Ihrer Bestellung innerhalb von 6 Monaten nach dem Liefertermin zurückgehen, schreiben Sie uns per WhatsApp oder E-Mail mit Ihrer Bestellnummer, und wir füllen die Differenz kostenlos auf. Lassen Sie das Video online und öffentlich, während eine Nachfüllung geliefert wird.',
      },
      {
        chip: '30 Tage',
        title: '30-Tage-Geld-zurück-Garantie',
        image: '/assets/images/illustrations/tiktok-views/tiktok-views-package-cta.webp',
        body: 'Berechtigte Bestellungen können innerhalb von 30 Tagen ab Kaufdatum erstattet werden. Die Erstattungsrichtlinie erklärt, was berechtigt ist und wie Sie eine Anfrage stellen.',
      },
    ],
    link: {
      label: 'Erstattungsrichtlinie lesen',
      href: '/refund-policy',
    },
  },
  cost: {
    id: 'tiktok-views-cost',
    title: {
      lead: 'Was kosten',
      highlight: 'TikTok Views?',
    },
    intro: 'Views starten ab {fromPrice}. High Quality hat den günstigsten Preis pro 1.000 Views, Premium kostet etwas mehr. Jeder Preis ist eine Einmalzahlung in US-Dollar für ein Video.',
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
    id: 'why-buy-tiktok-views',
    title: {
      lead: 'Warum kaufen Menschen',
      highlight: 'TikTok Views?',
    },
    intro: 'Auf TikTok wird schnell gewischt, und die View-Zahl gehört zu den wenigen Dingen, die Zuschauer vorher wahrnehmen. Views lassen ein neues Video so wirken, als würde es schon angeschaut.',
    items: [
      {
        title: 'Neue Uploads nicht bei null',
        body: 'Ein frisches Video mit solider Zahl ist ein paar Sekunden Aufmerksamkeit wert.',
      },
      {
        title: 'Werbung, die überzeugt',
        body: 'Produkt- und Aktionsvideos wirken überzeugender, wenn die Zahl zeigt, dass sie gesehen wurden.',
      },
      {
        title: 'Ein stärkeres Portfolio',
        body: 'Creator, die sich bei Marken bewerben, können auf Videos mit gesunden View-Zahlen verweisen.',
      },
    ],
    diagram: [
      'Nicht bei null',
      'Überzeugende Werbung',
      'Portfolio',
    ],
  },
  help: {
    id: 'does-buying-tiktok-views-help',
    title: {
      lead: 'Bringt es etwas,',
      highlight: 'TikTok Views zu kaufen?',
    },
    intro: 'Views verändern die Zahl eines Videos. Was TikTok pusht, entscheidet weiter die Wiedergabezeit und echte Reaktionen.',
    no: {
      title: 'Was sich nicht ändert',
      items: [
        'Wiedergabezeit, Likes oder Shares allein',
        'Platzierung auf der For-You-Seite allein',
        'Einnahmen aus Creator Rewards',
      ],
    },
    yes: {
      title: 'Was sich ändert',
      items: [
        'Die View-Zahl des gewählten Videos',
        'Wie gesehen das Video auf neue Zuschauer wirkt',
        'Den ersten Eindruck von Launches und Aktionen',
      ],
      image: '/assets/images/illustrations/tiktok-views/tiktok-views-does-help.webp',
      altFallback: 'Illustration: TikTok Views auf TikTok',
    },
  },
  who: {
    id: 'who-orders',
    title: {
      lead: 'Wer bestellt',
      highlight: 'TikTok Views',
    },
    cards: [
      {
        title: 'Lokale Unternehmen',
        body: 'Imbisse, Salons und Werkstätten ergänzen Views bei Aktionsvideos, die sie in Bio, Anzeigen und WhatsApp teilen.',
        image: '/assets/images/illustrations/tiktok-views/tiktok-views-best-practices.webp',
      },
      {
        title: 'Creator mit Nische',
        body: 'Creator ergänzen Views bei neuen Formaten und Serienstarts, während sie herausfinden, was ihr Publikum mag.',
        image: '/assets/images/illustrations/tiktok-views/tiktok-views-hero.webp',
      },
      {
        title: 'Agenturen',
        body: 'Agenturen ergänzen Views bei Launch-Videos von Kampagnen, oft mit schrittweiser Lieferung.',
        image: '/assets/images/illustrations/tiktok-views/tiktok-views-why-buy.webp',
      },
    ],
    statement: 'Egal welches Video, die Bestellung läuft immer gleich: ein öffentlicher Videolink, Stufe und Menge Ihrer Wahl und Views, die meist innerhalb von 6–8 Stunden starten. Kein Login nötig.',
  },
  vs: {
    id: 'tiktok-views-vs-other-services',
    title: {
      lead: 'TikTok Views im Vergleich zu',
      highlight: 'Likes und Followern',
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
        slug: 'buy-tiktok-views',
        label: 'Views',
        changes: 'Die View-Zahl eines Videos',
        needs: 'Ein Link zum öffentlichen Video',
        current: true,
      },
      {
        slug: 'buy-tiktok-followers',
        label: 'Follower',
        changes: 'Die Follower-Zahl in Ihrem Profil',
        needs: 'Ihr öffentlicher Benutzername',
      },
      {
        slug: 'buy-tiktok-likes',
        label: 'Likes',
        changes: 'Die Like-Zahl eines Videos',
        needs: 'Ein Link zum öffentlichen Video',
      },
    ],
    currentLabel: 'Diese Seite',
  },
  safe: {
    id: 'is-it-safe',
    title: {
      lead: 'Ist es sicher,',
      highlight: 'TikTok Views zu kaufen?',
    },
    lead: 'Es kommt auf drei Dinge an: Ihr Konto, Ihre Zahlung und Ihre Daten. So funktioniert jedes davon bei NovaLikes, plus das eine Risiko, das kein Anbieter ausschließen kann.',
    body: 'Die Community-Richtlinien von TikTok erlauben keine gefälschten Interaktionen, und Creator Rewards zahlt nur für Views, die TikTok als qualifiziert zählt. Kaufen Sie Views also nie, um Geld zu verdienen. TikTok entfernt außerdem inaktive Konten, deshalb kann nach der Lieferung ein kleiner Rückgang auftreten, und jede Bestellung enthält 6 Monate Nachfüllung.',
    cards: [
      {
        ui: 'nopass',
        title: 'Kontosicherheit',
        body: 'Wir brauchen nur den öffentlichen Link zum Video, deshalb meldet sich niemand bei Ihrem Konto an und niemand ändert etwas. Wir fragen nie nach einem Passwort oder Anmeldecode. Wer sich als NovaLikes ausgibt und danach fragt, gehört nicht zu uns.',
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
      highlight: 'TikTok Views kaufen',
    },
    lead: 'Prüfen Sie diese vier Punkte einmal, dann läuft Ihre Bestellung reibungslos.',
    items: [
      {
        title: 'Das Video ist öffentlich',
        body: 'Views erreichen kein privates Video und kein Video auf einem privaten Konto.',
      },
      {
        title: 'Der Link führt zum Video',
        body: 'Kopieren Sie ihn über „Teilen“, nicht Ihren Profillink.',
      },
      {
        title: 'Das Video bleibt online',
        body: 'Lassen Sie es während der Lieferung und der 6 Monate Nachfüllung online.',
      },
      {
        title: 'Sie haben eine Stufe gewählt',
        body: 'High Quality ist der günstigere Preis pro View, Premium die höherwertige Option. Unsicher? Fragen Sie uns auf WhatsApp.',
      },
    ],
  },
  faq: {
    id: 'faq',
    kicker: 'Noch Fragen vor der Bestellung?',
    title: 'TikTok Views FAQ',
    intro: 'Keine Antwort gefunden? Schreiben Sie uns rund um die Uhr auf WhatsApp unter +44 7454 758272.',
    cta: 'Auf WhatsApp fragen',
    locale: {
      code: 'de',
    },
    extra: [
      {
        id: 'de-tt-views-v2-1',
        question: 'Zählen gekaufte Views für Creator Rewards?',
        answer: 'Kaufen Sie Views nicht dafür. Creator Rewards zahlt nur für Views, die TikTok als qualifiziert zählt, und die Regeln verbieten gefälschte Interaktionen. Gekaufte Views bringen also kein Geld und können das Konto gefährden.',
      },
      {
        id: 'de-tt-views-v2-2',
        question: 'Kann ich eine Erstattung bekommen?',
        answer: 'Berechtigte Bestellungen sind durch unsere 30-Tage-Geld-zurück-Garantie abgedeckt, gerechnet ab dem Kaufdatum. Die Erstattungsrichtlinie erklärt, welche Bestellungen berechtigt sind und wie Sie eine Anfrage stellen.',
      },
      {
        id: 'de-tt-views-v2-3',
        question: 'Welche Zahlungsarten kann ich nutzen?',
        answer: 'Sie können mit Karte, Apple Pay oder Google Pay in US-Dollar bezahlen. Es ist eine Einmalzahlung, nichts verlängert sich.',
      },
    ],
  },
  more: {
    id: 'related-services',
    title: 'Weitere NovaLikes-Services',
    intro: 'TikTok Views verändern eine Zahl. Für eine andere wählen Sie einen Service unten.',
    services: [
      {
        slug: 'buy-tiktok-likes',
        title: 'TikTok Likes kaufen',
        line: 'Mehr Herzen für ein Video',
        image: '/assets/images/illustrations/tiktok-likes/tiktok-likes-hero.webp',
      },
      {
        slug: 'buy-tiktok-followers',
        title: 'TikTok Follower kaufen',
        line: 'Ihr TikTok-Profil wachsen lassen',
        image: '/assets/images/illustrations/tiktok-followers/tiktok-followers-hero.webp',
      },
      {
        slug: 'buy-instagram-views',
        title: 'Instagram Views kaufen',
        line: 'Mehr Views für Ihre Reels',
        image: '/assets/images/illustrations/instagram-views/instagram-views-hero.webp',
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
