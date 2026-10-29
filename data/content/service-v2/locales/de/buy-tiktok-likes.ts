import type { ServiceV2Content } from '../../types';

/** German (/de) — v2 service page copy for buy-tiktok-likes. Primary keyword: "tiktok likes kaufen". Do not edit wording without the content owner. */
export const DE_BUY_TIKTOK_LIKES_V2 = {
  meta: {
    slug: 'buy-tiktok-likes',
    platform: 'TikTok',
    name: 'TikTok Likes',
    unit: 'Likes',
    unitSingular: 'Like',
    inputKind: 'link',
    perUnit: 1000,
    tiers: false,
    keywords: {
      primary: 'tiktok likes kaufen',
      secondary: [
        'tiktok likes für videos kaufen',
        'tiktok likes pakete',
        'tiktok likes preis',
        'tiktok herzen kaufen',
      ],
      questions: [
        'ist es sicher tiktok likes zu kaufen',
        'was kosten tiktok likes',
        'machen likes ein video viral',
        'kann ich likes aufteilen',
        'sinken tiktok likes wieder',
      ],
    },
  },
  hero: {
    title: {
      lead: '',
      highlight: 'TikTok Likes',
      tail: 'kaufen für Ihr wichtigstes Video',
    },
    subtitle: 'Die Herzen stehen direkt neben Ihrem Video, während es läuft. Sorgen Sie dafür, dass Ihr Launch, Ihre Kooperation oder Ihr bester Clip eine passende Zahl zeigt. Ab {fromPrice}, nur mit dem Videolink.',
    trust: [
      'Kein Passwort nötig',
      'Start in 6–8 Stunden',
      '6 Monate Nachfüllung',
    ],
  },
  picker: {
    id: 'pricing-packages',
    title: 'TikTok Likes Pakete & Preise',
    intro: 'Wählen Sie ein Paket. Preise in USD.',
    summaryName: '{quantity} TikTok Likes',
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
      highlight: 'TikTok Likes?',
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
        title: 'Jedes öffentliche Video',
        body: 'Bestellen Sie Likes für jedes öffentliche TikTok-Video. Jede Bestellung gilt für ein Video.',
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
      highlight: 'TikTok Likes',
    },
    pill: 'Etwa 2 Minuten',
    intro: 'Die Bestellung dauert fünf kurze Schritte und etwa zwei Minuten. Wir brauchen nur den Link zu einem öffentlichen TikTok-Video.',
    items: [
      {
        ui: 'public',
        title: 'Video öffentlich lassen',
        body: 'Das Video muss bis zum Ende der Lieferung öffentlich auf einem öffentlichen Konto sein. Nicht löschen.',
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
      count: 1000,
      unit: 'Likes',
      body: 'Die meisten Bestellungen starten innerhalb von 6–8 Stunden nach der Zahlung und sind 4–6 Stunden nach dem Start abgeschlossen. Den Fortschritt sehen Sie auf der Seite „Bestellung verfolgen“ mit Ihrer Bestellnummer.',
    },
  },
  ui: {
    toggle: {
      label: 'Privates Video',
      sub: 'Aus, damit wir das Video erreichen',
    },
    chips: [
      '500',
      '1K',
      '2K',
      '5K',
    ],
    chipOn: 1,
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
      highlight: 'Anbieter für TikTok Likes',
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
    title: 'Nachfüllung und Geld-zurück-Versprechen für TikTok Likes',
    intro: 'Beide Zusagen stehen in unserer Erstattungsrichtlinie, nicht nur auf dieser Seite.',
    cards: [
      {
        chip: '6 Monate',
        title: '6 Monate Nachfüllung',
        image: '/assets/images/illustrations/tiktok-likes/tiktok-likes-order-process.webp',
        body: 'Wenn Likes aus Ihrer Bestellung innerhalb von 6 Monaten nach dem Liefertermin zurückgehen, schreiben Sie uns per WhatsApp oder E-Mail mit Ihrer Bestellnummer, und wir füllen die Differenz kostenlos auf. Lassen Sie das Video online und öffentlich, während eine Nachfüllung geliefert wird.',
      },
      {
        chip: '30 Tage',
        title: '30-Tage-Geld-zurück-Garantie',
        image: '/assets/images/illustrations/tiktok-likes/tiktok-likes-package-cta.webp',
        body: 'Berechtigte Bestellungen können innerhalb von 30 Tagen ab Kaufdatum erstattet werden. Die Erstattungsrichtlinie erklärt, was berechtigt ist und wie Sie eine Anfrage stellen.',
      },
    ],
    link: {
      label: 'Erstattungsrichtlinie lesen',
      href: '/refund-policy',
    },
  },
  cost: {
    id: 'tiktok-likes-cost',
    title: {
      lead: 'Was kosten',
      highlight: 'TikTok Likes?',
    },
    intro: 'Likes starten ab {fromPrice} für 100, und der Preis pro Like sinkt mit der Paketgröße. Jeder Preis ist eine Einmalzahlung in US-Dollar für ein Video.',
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
    id: 'why-buy-tiktok-likes',
    title: {
      lead: 'Warum kaufen Menschen',
      highlight: 'TikTok Likes?',
    },
    intro: 'Ein TikTok mit vielen Views, aber wenigen Herzen lässt Zuschauer zweifeln. Likes halten die Zahlen im Gleichgewicht, damit das Video so gut wirkt, wie es ist.',
    items: [
      {
        title: 'Videos, die gemocht wirken',
        body: 'Eine gesunde Herz-Zahl zeigt Zuschauern, dass anderen das Video gefallen hat.',
      },
      {
        title: 'Stärkere angepinnte Videos',
        body: 'Die angepinnten Videos in Ihrem Profil leisten viel. Likes lassen sie wie Ihre besten wirken.',
      },
      {
        title: 'Bessere Links außerhalb von TikTok',
        body: 'Wenn Sie ein TikTok per WhatsApp, Instagram oder E-Mail teilen, wirkt es mit solider Like-Zahl sehenswerter.',
      },
    ],
    diagram: [
      'Gemocht',
      'Angepinnt',
      'Geteilte Links',
    ],
  },
  help: {
    id: 'does-buying-tiktok-likes-help',
    title: {
      lead: 'Bringt es etwas,',
      highlight: 'TikTok Likes zu kaufen?',
    },
    intro: 'Likes verändern die Herz-Zahl eines Videos. Die Reichweite entscheidet TikTok weiter nach dem Verhalten echter Zuschauer.',
    no: {
      title: 'Was sich nicht ändert',
      items: [
        'Views oder Follower allein',
        'Platzierung auf der For-You-Seite allein',
        'Shares, Saves oder echte Kommentare',
      ],
    },
    yes: {
      title: 'Was sich ändert',
      items: [
        'Die Like-Zahl des gewählten Videos',
        'Wie gemocht das Video auf neue Zuschauer wirkt',
        'Wie stark angepinnte und geteilte Videos aussehen',
      ],
      image: '/assets/images/illustrations/tiktok-likes/tiktok-likes-does-help.webp',
      altFallback: 'Illustration: TikTok Likes auf TikTok',
    },
  },
  who: {
    id: 'who-orders',
    title: {
      lead: 'Wer bestellt',
      highlight: 'TikTok Likes',
    },
    cards: [
      {
        title: 'Produktverkäufer',
        body: 'Online-Shops ergänzen Likes bei Produktvideos, bevor sie diese als Anzeige schalten oder mit Händlern teilen.',
        image: '/assets/images/illustrations/tiktok-likes/tiktok-likes-best-practices.webp',
      },
      {
        title: 'Creator',
        body: 'Creator ergänzen Likes bei Kooperationsvideos und angepinnten Clips, damit das Profil mit beliebten Videos startet.',
        image: '/assets/images/illustrations/tiktok-likes/tiktok-likes-hero.webp',
      },
      {
        title: 'Locations und Events',
        body: 'Bars, Comedy-Clubs und Festivals ergänzen Likes bei Line-up- und Stimmungsvideos vor dem großen Termin.',
        image: '/assets/images/illustrations/tiktok-likes/tiktok-likes-why-buy.webp',
      },
    ],
    statement: 'Egal welches Video, die Bestellung läuft immer gleich: ein öffentlicher Videolink, ein Paket Ihrer Wahl und Likes, die meist innerhalb von 6–8 Stunden starten. Kein Login nötig.',
  },
  vs: {
    id: 'tiktok-likes-vs-other-services',
    title: {
      lead: 'TikTok Likes im Vergleich zu',
      highlight: 'Views und Followern',
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
        slug: 'buy-tiktok-likes',
        label: 'Likes',
        changes: 'Die Like-Zahl eines Videos',
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
      highlight: 'TikTok Likes zu kaufen?',
    },
    lead: 'Es kommt auf drei Dinge an: Ihr Konto, Ihre Zahlung und Ihre Daten. So funktioniert jedes davon bei NovaLikes, plus das eine Risiko, das kein Anbieter ausschließen kann.',
    body: 'Die Community-Richtlinien von TikTok erlauben keine gefälschten Interaktionen, und TikTok entfernt regelmäßig Konten, die es für inaktiv oder unecht hält. Deshalb kann nach der Lieferung ein kleiner Rückgang auftreten, und deshalb enthält jede Bestellung 6 Monate Nachfüllung. Likes im Verhältnis zu den Views wirken am natürlichsten.',
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
      highlight: 'TikTok Likes kaufen',
    },
    lead: 'Prüfen Sie diese vier Punkte einmal, dann läuft Ihre Bestellung reibungslos.',
    items: [
      {
        title: 'Das Video ist öffentlich',
        body: 'Likes erreichen kein privates Video und kein Video auf einem privaten Konto.',
      },
      {
        title: 'Der Link führt zum Video',
        body: 'Kopieren Sie ihn über „Teilen“. Er sieht aus wie tiktok.com/@name/video/…, nicht wie Ihr Profillink.',
      },
      {
        title: 'Das Video bleibt online',
        body: 'Löschen Sie es nicht während der Lieferung oder der 6 Monate Nachfüllung.',
      },
      {
        title: 'Likes passen zu den Views',
        body: 'Tausende Likes bei wenigen Hundert Views wirken unstimmig. Wählen Sie eine passende Größe oder ergänzen Sie Views.',
      },
    ],
  },
  faq: {
    id: 'faq',
    kicker: 'Noch Fragen vor der Bestellung?',
    title: 'TikTok Likes FAQ',
    intro: 'Keine Antwort gefunden? Schreiben Sie uns rund um die Uhr auf WhatsApp unter +44 7454 758272.',
    cta: 'Auf WhatsApp fragen',
    locale: {
      code: 'de',
    },
    extra: [
      {
        id: 'de-tt-likes-v2-1',
        question: 'Kann ich ein Likes-Paket auf mehrere Videos aufteilen?',
        answer: 'Nein. Jede Bestellung gilt für ein Video, damit Lieferung und Nachfüllung leicht nachvollziehbar bleiben.',
      },
      {
        id: 'de-tt-likes-v2-2',
        question: 'Kann ich eine Erstattung bekommen?',
        answer: 'Berechtigte Bestellungen sind durch unsere 30-Tage-Geld-zurück-Garantie abgedeckt, gerechnet ab dem Kaufdatum. Die Erstattungsrichtlinie erklärt, welche Bestellungen berechtigt sind und wie Sie eine Anfrage stellen.',
      },
      {
        id: 'de-tt-likes-v2-3',
        question: 'Welche Zahlungsarten kann ich nutzen?',
        answer: 'Sie können mit Karte, Apple Pay oder Google Pay in US-Dollar bezahlen. Es ist eine Einmalzahlung, nichts verlängert sich.',
      },
    ],
  },
  more: {
    id: 'related-services',
    title: 'Weitere NovaLikes-Services',
    intro: 'TikTok Likes verändern eine Zahl. Für eine andere wählen Sie einen Service unten.',
    services: [
      {
        slug: 'buy-tiktok-views',
        title: 'TikTok Views kaufen',
        line: 'Ein stärkerer Start für ein Video',
        image: '/assets/images/illustrations/tiktok-views/tiktok-views-hero.webp',
      },
      {
        slug: 'buy-tiktok-followers',
        title: 'TikTok Follower kaufen',
        line: 'Ihr TikTok-Profil wachsen lassen',
        image: '/assets/images/illustrations/tiktok-followers/tiktok-followers-hero.webp',
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
