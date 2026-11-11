import type { ServiceV2Content } from '../../types';

/** German (/de) — v2 service page copy for buy-instagram-followers. Primary keyword: "instagram follower kaufen". Do not edit wording without the content owner. */
export const DE_BUY_INSTAGRAM_FOLLOWERS_V2 = {
  meta: {
    slug: 'buy-instagram-followers',
    platform: 'Instagram',
    name: 'Instagram Follower',
    unit: 'Follower',
    unitSingular: 'Follower',
    inputKind: 'username',
    perUnit: 1000,
    tiers: false,
    keywords: {
      primary: 'instagram follower kaufen',
      secondary: [
        'instagram follower kaufen ohne passwort',
        'instagram follower pakete',
        'instagram follower preis',
        'mehr instagram follower bekommen',
        'deutsche instagram follower kaufen (only answered honestly: packages are not sold as followers from a country)',
      ],
      questions: [
        'ist es sicher instagram follower zu kaufen',
        'was kosten instagram follower',
        'kann mein konto gesperrt werden',
        'warum sinkt meine follower zahl',
        'bringt es etwas follower zu kaufen',
      ],
    },
  },
  hero: {
    title: {
      lead: '',
      highlight: 'Instagram Follower',
      tail: 'kaufen für ein glaubwürdigeres Profil',
    },
    subtitle: 'Marken, Kooperationspartner und neue Besucher schauen auf Ihre Follower-Zahl, bevor sie folgen. Bauen Sie ein Profil auf, das vertrauenswürdig wirkt, ab {fromPrice} und ohne Ihr Instagram-Passwort.',
    trust: [
      'Kein Passwort nötig',
      'Start in 6–8 Stunden',
      '6 Monate Nachfüllung',
    ],
  },
  picker: {
    id: 'pricing-packages',
    title: 'Instagram Follower Pakete & Preise',
    intro: 'Wählen Sie ein Paket. Preise in USD.',
    summaryName: '{quantity} Instagram Follower',
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
      highlight: 'Instagram Follower?',
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
        icon: 'message-square',
        tone: 'pink',
        title: 'Hilfe auf WhatsApp, 24/7',
        body: 'Fragen vor oder nach der Bestellung? Schreiben Sie an +44 7454 758272 mit Ihrer Bestellnummer, Tag und Nacht.',
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
      highlight: 'Instagram Follower',
    },
    pill: 'Etwa 2 Minuten',
    intro: 'Die Bestellung dauert fünf kurze Schritte und etwa zwei Minuten. Die meisten Bestellungen starten innerhalb von 6–8 Stunden nach der Zahlung.',
    items: [
      {
        ui: 'public',
        title: 'Profil öffentlich schalten',
        body: 'Follower können nur an ein öffentliches Profil geliefert werden. Nach Abschluss der Bestellung können Sie wieder auf privat stellen.',
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
        body: 'Geben Sie den öffentlichen @Benutzernamen ein, der die Follower bekommen soll, dazu Ihre E-Mail für Beleg und Updates.',
      },
      {
        ui: 'pay',
        title: 'Sicher bezahlen',
        body: 'Einmal mit Karte, Apple Pay oder Google Pay in US-Dollar bezahlen. Es gibt kein Abo.',
      },
    ],
    done: {
      title: 'Fertig!',
      count: 2000,
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
      '1K',
      '2K',
      '5K',
      '10K',
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
      highlight: 'Anbieter für Instagram Follower',
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
    title: 'Nachfüllung und Geld-zurück-Versprechen für Instagram Follower',
    intro: 'Beide Zusagen stehen in unserer Erstattungsrichtlinie, nicht nur auf dieser Seite.',
    cards: [
      {
        chip: '6 Monate',
        title: '6 Monate Nachfüllung',
        image: '/assets/images/illustrations/instagram-followers/instagram-followers-buying-process.webp',
        body: 'Wenn Follower aus Ihrer Bestellung innerhalb von 6 Monaten nach dem Liefertermin zurückgehen, schreiben Sie uns per WhatsApp oder E-Mail mit Ihrer Bestellnummer, und wir füllen die Differenz kostenlos auf. Behalten Sie denselben Benutzernamen und lassen Sie das Profil öffentlich, während eine Nachfüllung geliefert wird.',
      },
      {
        chip: '30 Tage',
        title: '30-Tage-Geld-zurück-Garantie',
        image: '/assets/images/illustrations/instagram-followers/instagram-followers-package-cta.webp',
        body: 'Berechtigte Bestellungen können innerhalb von 30 Tagen ab Kaufdatum erstattet werden. Die Erstattungsrichtlinie erklärt, was berechtigt ist und wie Sie eine Anfrage stellen.',
      },
    ],
    link: {
      label: 'Erstattungsrichtlinie lesen',
      href: '/refund-policy',
    },
  },
  cost: {
    id: 'instagram-followers-cost',
    title: {
      lead: 'Was kosten',
      highlight: 'Instagram Follower?',
    },
    intro: 'Pakete starten ab {fromPrice} für 100 Follower. Je größer das Paket, desto weniger zahlen Sie pro Follower, und jeder Preis ist eine Einmalzahlung in US-Dollar.',
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
    id: 'why-buy-instagram-followers',
    title: {
      lead: 'Warum kaufen Menschen',
      highlight: 'Instagram Follower?',
    },
    intro: 'Die meisten, die bestellen, fangen nicht bei null an. Sie haben Inhalte, hinter denen sie stehen, und eine Follower-Zahl, die das nicht widerspiegelt. Ein Paket verändert die Zahl, die Besucher zuerst sehen, damit gute Beiträge eine fairere Chance bekommen. Am besten funktioniert das zusammen mit regelmäßigen Posts.',
    items: [
      {
        title: 'Ein stärkerer erster Eindruck',
        body: 'Besucher sehen die Follower-Zahl, bevor sie eine einzige Bildunterschrift lesen. Ein volleres Profil bekommt einen faireren ersten Blick.',
      },
      {
        title: 'Ein Vorsprung für neue Konten',
        body: 'Eine neue Marke, ein Nebenprojekt oder ein Creator-Konto muss nicht bei ein paar Dutzend Followern stehen bleiben, während Sie es aufbauen.',
      },
      {
        title: 'Unterstützung für Launch oder Pitch',
        body: 'Teams ergänzen Follower vor einem Produktlaunch, einer Kampagne oder einem Marken-Pitch, zusammen mit den Beiträgen, die die eigentliche Arbeit machen.',
      },
    ],
    diagram: [
      'Erster Eindruck',
      'Vorsprung',
      'Launch-Hilfe',
    ],
  },
  help: {
    id: 'does-buying-instagram-followers-help',
    title: {
      lead: 'Bringt es etwas,',
      highlight: 'Instagram Follower zu kaufen?',
    },
    intro: 'Es hilft bei einer Sache: der Zahl, die Menschen in Ihrem Profil sehen. Hier die ehrliche Aufteilung.',
    no: {
      title: 'Was sich nicht ändert',
      items: [
        'Likes, Views oder Kommentare unter Ihren Beiträgen',
        'Ihre Reichweite, Explore- oder Reels-Empfehlungen',
        'Verkäufe, Anmeldungen oder Nachrichten von allein',
      ],
    },
    yes: {
      title: 'Was sich ändert',
      items: [
        'Die Follower-Zahl in Ihrem Profil',
        'Den ersten Eindruck bei neuen Besuchern',
        'Wie etabliert ein neues Konto wirkt',
      ],
      image: '/assets/images/illustrations/instagram-followers/instagram-followers-does-help.webp',
      altFallback: 'Illustration: Instagram Follower auf Instagram',
    },
  },
  who: {
    id: 'who-orders',
    title: {
      lead: 'Wer bestellt',
      highlight: 'Instagram Follower',
    },
    cards: [
      {
        title: 'Creator',
        body: 'Creator geben einem wachsenden Konto das Profil, das es verdient, während sie weiter Reels und Stories posten. Typische Anlässe: ein neues Konto, der erste Marken-Pitch oder ein Relaunch.',
        image: '/assets/images/illustrations/instagram-followers/instagram-followers-best-practices.webp',
      },
      {
        title: 'Kleine Unternehmen',
        body: 'Läden, Salons, Cafés und Dienstleister treffen Kunden oft zuerst auf Instagram. Ein aktiv wirkendes Profil hilft, wenn Menschen Sie vor einer Eröffnung oder einem Launch prüfen.',
        image: '/assets/images/illustrations/instagram-followers/instagram-followers-hero.webp',
      },
      {
        title: 'Marken & Agenturen',
        body: 'Marken und Agenturen ergänzen Follower für neue Länder-, Produkt- oder Kampagnenkonten, oft mit schrittweiser Lieferung für einen gleichmäßigen Verlauf.',
        image: '/assets/images/illustrations/instagram-followers/instagram-followers-why-buy.webp',
      },
    ],
    statement: 'Egal aus welchem Grund, die Bestellung läuft immer gleich: Ihr öffentlicher Benutzername, ein Paket Ihrer Wahl und eine Zahl, die meist innerhalb von 6–8 Stunden zu steigen beginnt. Niemand braucht jemals Ihre Zugangsdaten.',
  },
  vs: {
    id: 'instagram-followers-vs-other-services',
    title: {
      lead: 'Instagram Follower im Vergleich zu',
      highlight: 'Likes, Views und Kommentaren',
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
        slug: 'buy-instagram-followers',
        label: 'Follower',
        changes: 'Die Follower-Zahl in Ihrem Profil',
        needs: 'Ihr öffentlicher @Benutzername',
        current: true,
      },
      {
        slug: 'buy-instagram-likes',
        label: 'Likes',
        changes: 'Die Like-Zahl eines Beitrags oder Reels',
        needs: 'Ein Link zum öffentlichen Beitrag',
      },
      {
        slug: 'buy-instagram-views',
        label: 'Views',
        changes: 'Die View-Zahl eines Reels oder Videos',
        needs: 'Ein Link zum öffentlichen Reel',
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
      highlight: 'Instagram Follower zu kaufen?',
    },
    lead: 'Es kommt auf drei Dinge an: Ihr Konto, Ihre Zahlung und Ihre Daten. So funktioniert jedes davon bei NovaLikes, plus das eine Risiko, das kein Anbieter ausschließen kann.',
    body: 'Die Gemeinschaftsrichtlinien von Instagram bitten darum, Follower, Likes oder Shares nicht künstlich zu sammeln, und Instagram entfernt regelmäßig Konten, die es für inaktiv oder unecht hält. Deshalb kann es nach der Lieferung einen Rückgang geben, und deshalb enthält jede Bestellung 6 Monate Nachfüllung. Schrittweise Lieferung und regelmäßiges Posten halten das Wachstum natürlich.',
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
      highlight: 'Instagram Follower kaufen',
    },
    lead: 'Prüfen Sie diese vier Punkte einmal, dann läuft Ihre Bestellung reibungslos.',
    items: [
      {
        title: 'Ihr Profil ist öffentlich',
        body: 'Lassen Sie es öffentlich, bis die Lieferung abgeschlossen ist. Ein privates Profil verhindert Start oder Abschluss der Bestellung.',
      },
      {
        title: 'Der Benutzername stimmt',
        body: 'Wir liefern genau an das, was Sie eingeben. Kopieren Sie ihn am besten direkt aus Ihrem Profil.',
      },
      {
        title: 'Der Benutzername bleibt gleich',
        body: 'Behalten Sie denselben Benutzernamen während der Lieferung und der 6 Monate Nachfüllung, sonst finden wir das Profil nicht.',
      },
      {
        title: 'Sie wissen, welches Tempo Sie möchten',
        body: 'Sollen die Follower langsam kommen? Bitten Sie an der Kasse oder auf WhatsApp um schrittweise Lieferung.',
      },
    ],
  },
  faq: {
    id: 'faq',
    kicker: 'Noch Fragen vor der Bestellung?',
    title: 'Instagram Follower FAQ',
    intro: 'Keine Antwort gefunden? Schreiben Sie uns rund um die Uhr auf WhatsApp unter +44 7454 758272.',
    cta: 'Auf WhatsApp fragen',
    locale: {
      code: 'de',
    },
    extra: [
      {
        id: 'de-ig-followers-v2-1',
        question: 'Ist es sicher, Instagram Follower zu kaufen?',
        answer: 'Bei NovaLikes teilen Sie nur Ihren öffentlichen Benutzernamen, niemand gelangt in Ihr Konto, und Sie zahlen über einen sicheren Checkout. Das eine Risiko, das kein Anbieter ausschließen kann, ist Instagram selbst: Die Richtlinien sprechen gegen künstliche Follower, und Instagram entfernt regelmäßig Konten, die es für inaktiv oder unecht hält. Deshalb enthält jede Bestellung 6 Monate Nachfüllung.',
      },
      {
        id: 'de-ig-followers-v2-2',
        question: 'Was kosten Instagram Follower?',
        answer: 'Pakete starten ab {fromPrice} für 100 Follower, und der Preis pro Follower sinkt mit der Paketgröße. Alle Preise sind in US-Dollar und eine Einmalzahlung ohne Abo.',
      },
      {
        id: 'de-ig-followers-v2-3',
        question: 'Kann mein Konto wegen gekaufter Follower gesperrt werden?',
        answer: 'Wir melden uns nie in Ihrem Konto an, auf unserer Seite ändert sich darin also nichts. Instagram kann Follower trotzdem entfernen, die es für unecht hält, und die Regeln sprechen gegen künstliches Wachstum, ein Restrisiko bleibt also. Eine passende Paketgröße, schrittweise Lieferung und regelmäßiges Posten sind der vernünftige Weg.',
      },
      {
        id: 'de-ig-followers-v2-4',
        question: 'Warum ist meine Follower-Zahl gesunken, und was deckt die Nachfüllung ab?',
        answer: 'Instagram entfernt regelmäßig Konten, die es für inaktiv oder unecht hält, daher ist ein gewisser Rückgang normal. Gehen Follower aus Ihrer Bestellung innerhalb von 6 Monaten nach der Lieferung zurück, schreiben Sie uns mit Ihrer Bestellnummer, und wir füllen die Differenz auf. Behalten Sie denselben Benutzernamen und lassen Sie das Profil während der Nachfüllung öffentlich.',
      },
      {
        id: 'de-ig-followers-v2-5',
        question: 'Kann ich eine Erstattung bekommen?',
        answer: 'Berechtigte Bestellungen sind durch unsere 30-Tage-Geld-zurück-Garantie abgedeckt, gerechnet ab dem Kaufdatum. Die Erstattungsrichtlinie erklärt, welche Bestellungen berechtigt sind und wie Sie eine Anfrage stellen.',
      },
      {
        id: 'de-ig-followers-v2-6',
        question: 'Wie viele Instagram Follower sollte ich kaufen?',
        answer: 'Wählen Sie eine Größe, die neben Ihrer aktuellen Zahl und Ihrer Posting-Frequenz natürlich wirkt. Ein kleineres Paket ist ein guter erster Schritt, und Sie können später mehr bestellen. Unsicher? Schreiben Sie uns auf WhatsApp.',
      },
      {
        id: 'de-ig-followers-v2-7',
        question: 'Welche Zahlungsarten kann ich nutzen?',
        answer: 'Sie können mit Karte, Apple Pay oder Google Pay in US-Dollar bezahlen. Es ist eine Einmalzahlung, nichts verlängert sich.',
      },
    ],
  },
  more: {
    id: 'related-services',
    title: 'Weitere Instagram-Services',
    intro: 'Instagram Follower verändern eine Zahl. Für eine andere wählen Sie einen Service unten.',
    services: [
      {
        slug: 'buy-instagram-likes',
        title: 'Instagram Likes kaufen',
        line: 'Für Beiträge, Karussells und Reels',
        image: '/assets/images/illustrations/instagram-likes/instagram-likes-hero.webp',
      },
      {
        slug: 'buy-instagram-views',
        title: 'Instagram Views kaufen',
        line: 'Mehr Views für Ihre Reels',
        image: '/assets/images/illustrations/instagram-views/instagram-views-hero.webp',
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
