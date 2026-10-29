import type { ServiceV2Content } from '../../types';

/** German (/de) — v2 service page copy for buy-tiktok-followers. Primary keyword: "tiktok follower kaufen". Do not edit wording without the content owner. */
export const DE_BUY_TIKTOK_FOLLOWERS_V2 = {
  meta: {
    slug: 'buy-tiktok-followers',
    platform: 'TikTok',
    name: 'TikTok Follower',
    unit: 'Follower',
    unitSingular: 'Follower',
    inputKind: 'username',
    perUnit: 1000,
    tiers: false,
    keywords: {
      primary: 'tiktok follower kaufen',
      secondary: [
        'tiktok follower kaufen ohne passwort',
        'tiktok follower pakete',
        'tiktok follower preis',
        'mehr tiktok follower bekommen',
      ],
      questions: [
        'ist es sicher tiktok follower zu kaufen',
        'was kosten tiktok follower',
        'helfen gekaufte follower bei creator rewards',
        'warum sinken tiktok follower',
        'bringt es etwas tiktok follower zu kaufen',
      ],
    },
  },
  hero: {
    title: {
      lead: '',
      highlight: 'TikTok Follower',
      tail: 'kaufen für ein Profil, das überzeugt',
    },
    subtitle: 'Wer eines Ihrer Videos mag, schaut zuerst auf Ihr Profil. Eine glaubwürdige Follower-Zahl macht das Folgen leichter. Ab {fromPrice}, nur mit Ihrem Benutzernamen.',
    trust: [
      'Kein Passwort nötig',
      'Start in 6–8 Stunden',
      '6 Monate Nachfüllung',
    ],
  },
  picker: {
    id: 'pricing-packages',
    title: 'TikTok Follower Pakete & Preise',
    intro: 'Wählen Sie ein Paket. Preise in USD.',
    summaryName: '{quantity} TikTok Follower',
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
        body: 'Nur Benutzername',
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
      highlight: 'TikTok Follower?',
    },
    items: [
      {
        icon: 'shield',
        tone: 'mint',
        title: 'Ihr Benutzername, nie Ihr Passwort',
        body: 'Wir brauchen nur Ihren öffentlichen Benutzernamen. Kein Anmeldecode und kein Zugriff auf Ihr Konto.',
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
        body: 'Wenn Follower aus Ihrer Bestellung innerhalb von 6 Monaten nach der Lieferung zurückgehen, schicken Sie uns Ihre Bestellnummer und wir füllen kostenlos nach.',
      },
      {
        icon: 'badge-check',
        tone: 'peach',
        title: '30-Tage-Geld-zurück-Garantie',
        body: 'Berechtigte Bestellungen sind 30 Tage ab Kaufdatum abgedeckt. Unsere Erstattungsrichtlinie erklärt genau, was dazugehört.',
      },
      {
        icon: 'user-plus',
        tone: 'pink',
        title: 'Nur Benutzername',
        body: 'Geben Sie Ihren TikTok-Benutzernamen ohne @ ein. Wir fragen nie nach Login, Code oder Zugang zu Ihrem Konto.',
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
      highlight: 'TikTok Follower',
    },
    pill: 'Etwa 2 Minuten',
    intro: 'Die Bestellung dauert fünf kurze Schritte und etwa zwei Minuten. Wir brauchen nur Ihren öffentlichen TikTok-Benutzernamen.',
    items: [
      {
        ui: 'public',
        title: 'Profil öffentlich schalten',
        body: 'Follower können nur an ein öffentliches TikTok-Konto geliefert werden. Danach können Sie wieder auf privat stellen.',
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
        title: 'Benutzernamen eingeben',
        body: 'Geben Sie Ihren Benutzernamen ohne @ und Ihre E-Mail für Beleg und Updates ein. Prüfen Sie die Schreibweise vor der Zahlung.',
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
      unit: 'Follower',
      body: 'Die meisten Bestellungen starten innerhalb von 6–8 Stunden nach der Zahlung und sind 4–6 Stunden nach dem Start abgeschlossen. Den Fortschritt sehen Sie auf der Seite „Bestellung verfolgen“ mit Ihrer Bestellnummer.',
    },
  },
  ui: {
    toggle: {
      label: 'Privates Konto',
      sub: 'Aus, damit wir Sie erreichen',
    },
    chips: [
      '500',
      '1K',
      '2K',
      '5K',
    ],
    chipOn: 1,
    input: {
      prefix: '@',
      placeholder: 'benutzername',
    },
    safeChips: [
      'Nur Benutzername',
      'Sicherer Checkout',
    ],
    privacyTags: [
      '@Benutzername',
      'E-Mail',
    ],
  },
  compare: {
    id: 'spot-a-risky-seller',
    title: {
      lead: 'So erkennen Sie einen unseriösen',
      highlight: 'Anbieter für TikTok Follower',
    },
    intro: 'Egal, wo Sie kaufen: Prüfen Sie zuerst diese sieben Punkte.',
    us: 'NovaLikes',
    them: 'Unseriöse Anbieter',
    rows: [
      {
        label: 'Zugangsdaten',
        novalikes: 'Nur Benutzername',
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
    title: 'Nachfüllung und Geld-zurück-Versprechen für TikTok Follower',
    intro: 'Beide Zusagen stehen in unserer Erstattungsrichtlinie, nicht nur auf dieser Seite.',
    cards: [
      {
        chip: '6 Monate',
        title: '6 Monate Nachfüllung',
        image: '/assets/images/illustrations/tiktok-followers/tiktok-followers-order-process.webp',
        body: 'Wenn Follower aus Ihrer Bestellung innerhalb von 6 Monaten nach dem Liefertermin zurückgehen, schreiben Sie uns per WhatsApp oder E-Mail mit Ihrer Bestellnummer, und wir füllen die Differenz kostenlos auf. Behalten Sie denselben Benutzernamen und lassen Sie das Profil öffentlich, während eine Nachfüllung geliefert wird.',
      },
      {
        chip: '30 Tage',
        title: '30-Tage-Geld-zurück-Garantie',
        image: '/assets/images/illustrations/tiktok-followers/tiktok-followers-package-cta.webp',
        body: 'Berechtigte Bestellungen können innerhalb von 30 Tagen ab Kaufdatum erstattet werden. Die Erstattungsrichtlinie erklärt, was berechtigt ist und wie Sie eine Anfrage stellen.',
      },
    ],
    link: {
      label: 'Erstattungsrichtlinie lesen',
      href: '/refund-policy',
    },
  },
  cost: {
    id: 'tiktok-followers-cost',
    title: {
      lead: 'Was kosten',
      highlight: 'TikTok Follower?',
    },
    intro: 'Follower starten ab {fromPrice} für 100, und der Preis pro Follower sinkt mit der Paketgröße. Jeder Preis ist eine Einmalzahlung in US-Dollar für ein Konto.',
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
    id: 'why-buy-tiktok-followers',
    title: {
      lead: 'Warum kaufen Menschen',
      highlight: 'TikTok Follower?',
    },
    intro: 'Auf TikTok entdecken Menschen Sie meist über ein Video und tippen dann auf Ihr Profil. Eine etablierte Follower-Zahl macht die Entscheidung zum Folgen leichter.',
    items: [
      {
        title: 'Ein Profil, das zum Video passt',
        body: 'Ein Video mit Tausenden Views neben einem Profil mit 40 Followern wirkt seltsam. Follower schließen diese Lücke.',
      },
      {
        title: 'Ein Start für neue Konten',
        body: 'Ein neues Marken- oder Nebenprojekt-Konto muss nicht bei null stehen, während Sie Ihr Format finden.',
      },
      {
        title: 'Leichtere Gespräche mit Marken',
        body: 'Marken und Agenturen schauen oft auf die Follower-Zahl, bevor sie einem Creator antworten.',
      },
    ],
    diagram: [
      'Passt zum Video',
      'Neustart',
      'Marken-ready',
    ],
  },
  help: {
    id: 'does-buying-tiktok-followers-help',
    title: {
      lead: 'Bringt es etwas,',
      highlight: 'TikTok Follower zu kaufen?',
    },
    intro: 'Follower verändern die Zahl in Ihrem Profil. Was TikTok empfiehlt, entscheidet weiter das Verhalten der Zuschauer.',
    no: {
      title: 'Was sich nicht ändert',
      items: [
        'Views oder Likes Ihrer Videos',
        'Platzierung auf der For-You-Seite allein',
        'Berechtigung für Creator Rewards oder andere bezahlte Funktionen',
      ],
    },
    yes: {
      title: 'Was sich ändert',
      items: [
        'Die Follower-Zahl in Ihrem TikTok-Profil',
        'Wie etabliert das Konto auf neue Besucher wirkt',
        'Den ersten Eindruck bei Marken und Kooperationen',
      ],
      image: '/assets/images/illustrations/tiktok-followers/tiktok-followers-does-help.webp',
      altFallback: 'Illustration: TikTok Follower auf TikTok',
    },
  },
  who: {
    id: 'who-orders',
    title: {
      lead: 'Wer bestellt',
      highlight: 'TikTok Follower',
    },
    cards: [
      {
        title: 'Kleine Unternehmen',
        body: 'Bäckereien, Barbershops und Boutiquen ergänzen Follower, damit ihr TikTok so lebendig wirkt wie ihre Videos.',
        image: '/assets/images/illustrations/tiktok-followers/tiktok-followers-best-practices.webp',
      },
      {
        title: 'Aufstrebende Creator',
        body: 'Comedy-, Gaming- und Lifestyle-Creator nutzen Follower, um etabliert zu wirken, während sie regelmäßig posten.',
        image: '/assets/images/illustrations/tiktok-followers/tiktok-followers-hero.webp',
      },
      {
        title: 'Musik und Nachtleben',
        body: 'DJs, Bands und Clubs bauen Follower vor einem Release, einem Tourtermin oder einer großen Nacht auf.',
        image: '/assets/images/illustrations/tiktok-followers/tiktok-followers-why-buy.webp',
      },
    ],
    statement: 'Egal aus welchem Grund, die Bestellung läuft immer gleich: Ihr Benutzername, ein passendes Paket und Follower, die meist innerhalb von 6–8 Stunden zu kommen beginnen. Wir fragen nie nach Ihrem Passwort.',
  },
  vs: {
    id: 'tiktok-followers-vs-other-services',
    title: {
      lead: 'TikTok Follower im Vergleich zu',
      highlight: 'Likes und Views',
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
        slug: 'buy-tiktok-followers',
        label: 'Follower',
        changes: 'Die Follower-Zahl in Ihrem Profil',
        needs: 'Ihr öffentlicher Benutzername',
        current: true,
      },
      {
        slug: 'buy-tiktok-likes',
        label: 'Likes',
        changes: 'Die Like-Zahl eines Videos',
        needs: 'Ein Link zum öffentlichen Video',
      },
      {
        slug: 'buy-tiktok-views',
        label: 'Views',
        changes: 'Die View-Zahl eines Videos',
        needs: 'Ein Link zum öffentlichen Video',
      },
    ],
    currentLabel: 'Diese Seite',
  },
  safe: {
    id: 'is-it-safe',
    title: {
      lead: 'Ist es sicher,',
      highlight: 'TikTok Follower zu kaufen?',
    },
    lead: 'Es kommt auf drei Dinge an: Ihr Konto, Ihre Zahlung und Ihre Daten. So funktioniert jedes davon bei NovaLikes, plus das eine Risiko, das kein Anbieter ausschließen kann.',
    body: 'Die Community-Richtlinien von TikTok erlauben keine gefälschten Interaktionen, und TikTok entfernt regelmäßig Konten, die es für inaktiv oder unecht hält. Deshalb kann nach der Lieferung ein Rückgang auftreten, und deshalb enthält jede Bestellung 6 Monate Nachfüllung. Kaufen Sie nie Follower, um sich für Creator Rewards zu qualifizieren: Das verstößt gegen die Regeln von TikTok.',
    cards: [
      {
        ui: 'nopass',
        title: 'Kontosicherheit',
        body: 'Wir brauchen nur Ihren öffentlichen Benutzernamen, deshalb meldet sich niemand bei Ihrem Konto an und niemand ändert etwas. Wir fragen nie nach einem Anmeldecode. Wer sich als NovaLikes ausgibt und danach fragt, gehört nicht zu uns.',
      },
      {
        ui: 'pay',
        title: 'Zahlungssicherheit',
        body: 'Sie zahlen einmal über einen sicheren Checkout mit Karte, Apple Pay oder Google Pay in US-Dollar. Es gibt kein Abo und nichts verlängert sich.',
      },
      {
        ui: 'privacy',
        title: 'Datenschutz',
        body: 'Ihr Benutzername und Ihre E-Mail-Adresse werden nur genutzt, um die Bestellung zu bearbeiten und Ihnen Updates zu senden, wie in unserer [Datenschutzerklärung](/privacy-policy) beschrieben.',
      },
    ],
  },
  before: {
    id: 'delivery-and-safety',
    title: {
      lead: 'Bevor Sie',
      highlight: 'TikTok Follower kaufen',
    },
    lead: 'Prüfen Sie diese vier Punkte einmal, dann läuft Ihre Bestellung reibungslos.',
    items: [
      {
        title: 'Das Konto ist öffentlich',
        body: 'Ein privates Konto verhindert den Start der Bestellung. Bleiben Sie bis zum Ende der Lieferung öffentlich.',
      },
      {
        title: 'Der Benutzername stimmt',
        body: 'Prüfen Sie jeden Buchstaben, Punkt und Unterstrich. Follower gehen genau an den eingegebenen Namen.',
      },
      {
        title: 'Der Benutzername bleibt gleich',
        body: 'Behalten Sie denselben Namen während der Lieferung und der 6 Monate Nachfüllung.',
      },
      {
        title: 'Die Größe passt zum Konto',
        body: 'Wählen Sie ein Paket, das neben Ihren Views und aktuellen Followern natürlich wirkt.',
      },
    ],
  },
  faq: {
    id: 'faq',
    kicker: 'Noch Fragen vor der Bestellung?',
    title: 'TikTok Follower FAQ',
    intro: 'Keine Antwort gefunden? Schreiben Sie uns rund um die Uhr auf WhatsApp unter +44 7454 758272.',
    cta: 'Auf WhatsApp fragen',
    locale: {
      code: 'de',
    },
    extra: [
      {
        id: 'de-tt-followers-v2-1',
        question: 'Helfen gekaufte Follower bei TikTok Creator Rewards?',
        answer: 'Nein, und Sie sollten es nicht versuchen. Die Regeln von TikTok verbieten gefälschte Interaktionen, und künstlich erhöhte Follower für bezahlte Programme können das Konto gefährden.',
      },
      {
        id: 'de-tt-followers-v2-2',
        question: 'Kann ich eine Erstattung bekommen?',
        answer: 'Berechtigte Bestellungen sind durch unsere 30-Tage-Geld-zurück-Garantie abgedeckt, gerechnet ab dem Kaufdatum. Die Erstattungsrichtlinie erklärt, welche Bestellungen berechtigt sind und wie Sie eine Anfrage stellen.',
      },
      {
        id: 'de-tt-followers-v2-3',
        question: 'Welche Zahlungsarten kann ich nutzen?',
        answer: 'Sie können mit Karte, Apple Pay oder Google Pay in US-Dollar bezahlen. Es ist eine Einmalzahlung, nichts verlängert sich.',
      },
    ],
  },
  more: {
    id: 'related-services',
    title: 'Weitere NovaLikes-Services',
    intro: 'TikTok Follower verändern eine Zahl. Für eine andere wählen Sie einen Service unten.',
    services: [
      {
        slug: 'buy-tiktok-likes',
        title: 'TikTok Likes kaufen',
        line: 'Mehr Herzen für ein Video',
        image: '/assets/images/illustrations/tiktok-likes/tiktok-likes-hero.webp',
      },
      {
        slug: 'buy-tiktok-views',
        title: 'TikTok Views kaufen',
        line: 'Ein stärkerer Start für ein Video',
        image: '/assets/images/illustrations/tiktok-views/tiktok-views-hero.webp',
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
