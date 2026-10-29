import type { ServiceV2Content } from '../../types';

/** German (/de) — v2 service page copy for buy-instagram-likes. Primary keyword: "instagram likes kaufen". Do not edit wording without the content owner. */
export const DE_BUY_INSTAGRAM_LIKES_V2 = {
  meta: {
    slug: 'buy-instagram-likes',
    platform: 'Instagram',
    name: 'Instagram Likes',
    unit: 'Likes',
    unitSingular: 'Like',
    inputKind: 'link',
    perUnit: 1000,
    tiers: false,
    keywords: {
      primary: 'instagram likes kaufen',
      secondary: [
        'instagram likes für reels kaufen',
        'instagram likes pakete',
        'likes auf instagram beiträge kaufen',
        'instagram likes preis',
      ],
      questions: [
        'ist es sicher instagram likes zu kaufen',
        'was kosten instagram likes',
        'kann man likes für reels kaufen',
        'verschwinden gekaufte likes wieder',
        'bringt es etwas likes zu kaufen',
      ],
    },
  },
  hero: {
    title: {
      lead: '',
      highlight: 'Instagram Likes',
      tail: 'kaufen für Beiträge und Reels, die auffallen',
    },
    subtitle: 'Lassen Sie Ihre besten Fotos, Karussells und Reels so beliebt aussehen, wie sie es verdienen. Likes sorgen für sozialen Beweis unter jedem öffentlichen Beitrag, ab {fromPrice} und ohne Login.',
    trust: [
      'Kein Passwort nötig',
      'Start in 6–8 Stunden',
      '6 Monate Nachfüllung',
    ],
  },
  picker: {
    id: 'pricing-packages',
    title: 'Instagram Likes Pakete & Preise',
    intro: 'Wählen Sie ein Paket. Preise in USD.',
    summaryName: '{quantity} Instagram Likes',
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
      highlight: 'Instagram Likes?',
    },
    items: [
      {
        icon: 'shield',
        tone: 'mint',
        title: 'Nur ein Link, nie Ihr Passwort',
        body: 'Wir brauchen nur den öffentlichen Link zum Beitrag oder Reel. Kein Anmeldecode und kein Zugriff auf Ihr Konto.',
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
        icon: 'image',
        tone: 'pink',
        title: 'Beiträge, Karussells und Reels',
        body: 'Bestellen Sie Likes für jedes öffentliche Foto, Karussell oder Reel. Jede Bestellung gilt für einen Beitrag, damit Ihr bester Inhalt genau den gewünschten Schub bekommt.',
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
      highlight: 'Instagram Likes',
    },
    pill: 'Etwa 2 Minuten',
    intro: 'Die Bestellung dauert fünf kurze Schritte und etwa zwei Minuten. Wir brauchen nur den Link zu einem öffentlichen Beitrag oder Reel.',
    items: [
      {
        ui: 'public',
        title: 'Beitrag öffentlich lassen',
        body: 'Der Beitrag oder das Reel muss bis zum Ende der Lieferung öffentlich auf einem öffentlichen Konto sein. Nicht löschen oder archivieren.',
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
        body: 'Öffnen Sie den Beitrag, tippen Sie auf die drei Punkte oder „Teilen“, wählen Sie „Link kopieren“ und fügen Sie ihn an der Kasse ein. Dazu Ihre E-Mail für Beleg und Updates.',
      },
      {
        ui: 'pay',
        title: 'Sicher bezahlen',
        body: 'Einmal mit Karte, Apple Pay oder Google Pay in US-Dollar bezahlen. Es gibt kein Abo.',
      },
    ],
    done: {
      title: 'Fertig!',
      count: 2500,
      unit: 'Likes',
      body: 'Die meisten Bestellungen starten innerhalb von 6–8 Stunden nach der Zahlung und sind 4–6 Stunden nach dem Start abgeschlossen. Den Fortschritt sehen Sie auf der Seite „Bestellung verfolgen“ mit Ihrer Bestellnummer.',
    },
  },
  ui: {
    toggle: {
      label: 'Privates Konto',
      sub: 'Aus, damit wir den Beitrag erreichen',
    },
    chips: [
      '500',
      '1K',
      '2.5K',
      '5K',
    ],
    chipOn: 2,
    input: {
      prefix: '',
      placeholder: 'instagram.com/p/…',
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
      highlight: 'Anbieter für Instagram Likes',
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
    title: 'Nachfüllung und Geld-zurück-Versprechen für Instagram Likes',
    intro: 'Beide Zusagen stehen in unserer Erstattungsrichtlinie, nicht nur auf dieser Seite.',
    cards: [
      {
        chip: '6 Monate',
        title: '6 Monate Nachfüllung',
        image: '/assets/images/illustrations/instagram-likes/instagram-likes-order-process.webp',
        body: 'Wenn Likes aus Ihrer Bestellung innerhalb von 6 Monaten nach dem Liefertermin zurückgehen, schreiben Sie uns per WhatsApp oder E-Mail mit Ihrer Bestellnummer, und wir füllen die Differenz kostenlos auf. Lassen Sie den Beitrag oder das Reel online und öffentlich, während eine Nachfüllung geliefert wird.',
      },
      {
        chip: '30 Tage',
        title: '30-Tage-Geld-zurück-Garantie',
        image: '/assets/images/illustrations/instagram-likes/instagram-likes-package-cta.webp',
        body: 'Berechtigte Bestellungen können innerhalb von 30 Tagen ab Kaufdatum erstattet werden. Die Erstattungsrichtlinie erklärt, was berechtigt ist und wie Sie eine Anfrage stellen.',
      },
    ],
    link: {
      label: 'Erstattungsrichtlinie lesen',
      href: '/refund-policy',
    },
  },
  cost: {
    id: 'instagram-likes-cost',
    title: {
      lead: 'Was kosten',
      highlight: 'Instagram Likes?',
    },
    intro: 'Likes starten ab {fromPrice} für 50, und der Preis pro Like sinkt mit der Paketgröße. Jeder Preis ist eine Einmalzahlung in US-Dollar für einen Beitrag oder ein Reel.',
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
    id: 'why-buy-instagram-likes',
    title: {
      lead: 'Warum kaufen Menschen',
      highlight: 'Instagram Likes?',
    },
    intro: 'Die Like-Zahl ist das schnellste Signal, das Menschen bei einem Beitrag wahrnehmen. Wirkt sie niedrig, wird guter Inhalt überscrollt. Ein Likes-Paket hebt diese Zahl bei den Beiträgen, die Ihnen am wichtigsten sind.',
    items: [
      {
        title: 'Beiträge, bei denen man stehen bleibt',
        body: 'Die Like-Zahl fällt vor der Bildunterschrift auf. Eine gesunde Zahl lässt ein Foto oder Reel einen zweiten Blick wert erscheinen.',
      },
      {
        title: 'Unterstützung für Launches und Angebote',
        body: 'Produktdrops, neue Karten und Aktionen starten stärker, wenn der Beitrag nicht bei einer Handvoll Likes steht.',
      },
      {
        title: 'Ein einheitliches Profilraster',
        body: 'Ältere Beiträge mit wenigen Likes neben neueren mit Hunderten wirken unausgewogen. Likes gleichen das aus.',
      },
    ],
    diagram: [
      'Bleibt hängen',
      'Launch-Hilfe',
      'Einheitliches Raster',
    ],
  },
  help: {
    id: 'does-buying-instagram-likes-help',
    title: {
      lead: 'Bringt es etwas,',
      highlight: 'Instagram Likes zu kaufen?',
    },
    intro: 'Likes verändern die Zahl unter einem Beitrag. Wie Instagram ihn einordnet, ändern sie allein nicht. Hier die ehrliche Aufteilung.',
    no: {
      title: 'Was sich nicht ändert',
      items: [
        'Ihre Follower, Views oder Kommentare',
        'Platzierung in Explore oder Reels allein',
        'Verkäufe oder Nachrichten ohne starken Beitrag',
      ],
    },
    yes: {
      title: 'Was sich ändert',
      items: [
        'Die Like-Zahl des gewählten Beitrags oder Reels',
        'Wie beliebt der Beitrag auf neue Besucher wirkt',
        'Den ersten Eindruck von Launches und Aktionen',
      ],
      image: '/assets/images/illustrations/instagram-likes/instagram-likes-does-help.webp',
      altFallback: 'Illustration: Instagram Likes auf Instagram',
    },
  },
  who: {
    id: 'who-orders',
    title: {
      lead: 'Wer bestellt',
      highlight: 'Instagram Likes',
    },
    cards: [
      {
        title: 'Creator',
        body: 'Creator ergänzen Likes bei ihren stärksten Reels und Karussells, also den Beiträgen, die neue Besucher zuerst sehen sollen.',
        image: '/assets/images/illustrations/instagram-likes/instagram-likes-best-practices.webp',
      },
      {
        title: 'Kleine Unternehmen',
        body: 'Läden, Salons und Cafés nutzen Likes bei Angeboten, neuen Karten und Produktfotos, damit Aktionen nicht ignoriert wirken.',
        image: '/assets/images/illustrations/instagram-likes/instagram-likes-hero.webp',
      },
      {
        title: 'Marken & Agenturen',
        body: 'Marken und Agenturen ergänzen Likes bei Kampagnen und Kooperationen, oft mit schrittweiser Lieferung.',
        image: '/assets/images/illustrations/instagram-likes/instagram-likes-why-buy.webp',
      },
    ],
    statement: 'Egal welcher Beitrag, die Bestellung läuft immer gleich: ein öffentlicher Link, ein Paket Ihrer Wahl und eine Zahl, die meist innerhalb von 6–8 Stunden zu steigen beginnt. Niemand braucht Ihre Zugangsdaten.',
  },
  vs: {
    id: 'instagram-likes-vs-other-services',
    title: {
      lead: 'Instagram Likes im Vergleich zu',
      highlight: 'Followern, Views und Kommentaren',
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
        slug: 'buy-instagram-likes',
        label: 'Likes',
        changes: 'Die Like-Zahl eines Beitrags oder Reels',
        needs: 'Ein Link zum öffentlichen Beitrag',
        current: true,
      },
      {
        slug: 'buy-instagram-followers',
        label: 'Follower',
        changes: 'Die Follower-Zahl in Ihrem Profil',
        needs: 'Ihr öffentlicher @Benutzername',
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
      highlight: 'Instagram Likes zu kaufen?',
    },
    lead: 'Es kommt auf drei Dinge an: Ihr Konto, Ihre Zahlung und Ihre Daten. So funktioniert jedes davon bei NovaLikes, plus das eine Risiko, das kein Anbieter ausschließen kann.',
    body: 'Die Gemeinschaftsrichtlinien von Instagram bitten darum, Likes, Follower oder Shares nicht künstlich zu sammeln, und Instagram entfernt regelmäßig Konten, die es für inaktiv oder unecht hält. Deshalb kann nach der Lieferung ein kleiner Rückgang auftreten, und deshalb enthält jede Bestellung 6 Monate Nachfüllung. Eine passende Größe und schrittweise Lieferung wirken am natürlichsten.',
    cards: [
      {
        ui: 'nopass',
        title: 'Kontosicherheit',
        body: 'Wir brauchen nur den öffentlichen Link zum Beitrag oder Reel, deshalb meldet sich niemand bei Ihrem Konto an und niemand ändert etwas. Wir fragen nie nach einem Passwort oder Anmeldecode. Wer sich als NovaLikes ausgibt und danach fragt, gehört nicht zu uns.',
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
      highlight: 'Instagram Likes kaufen',
    },
    lead: 'Prüfen Sie diese vier Punkte einmal, dann läuft Ihre Bestellung reibungslos.',
    items: [
      {
        title: 'Der Beitrag ist öffentlich',
        body: 'Der Beitrag oder das Reel muss bis zum Ende der Lieferung auf einem öffentlichen Konto sein.',
      },
      {
        title: 'Der Link führt zum Beitrag',
        body: 'Kopieren Sie den Link aus dem Beitrag selbst, nicht Ihren Profillink. Er sieht aus wie instagram.com/p/… oder instagram.com/reel/….',
      },
      {
        title: 'Der Beitrag bleibt online',
        body: 'Löschen oder archivieren Sie ihn nicht während der Lieferung oder der 6 Monate Nachfüllung.',
      },
      {
        title: 'Like-Zahlen sind sichtbar',
        body: 'Wenn Sie die Like-Zahl ausgeblendet haben, kommen die Likes trotzdem an, aber Besucher sehen sie nicht. Blenden Sie sie wieder ein.',
      },
    ],
  },
  faq: {
    id: 'faq',
    kicker: 'Noch Fragen vor der Bestellung?',
    title: 'Instagram Likes FAQ',
    intro: 'Keine Antwort gefunden? Schreiben Sie uns rund um die Uhr auf WhatsApp unter +44 7454 758272.',
    cta: 'Auf WhatsApp fragen',
    locale: {
      code: 'de',
    },
    extra: [
      {
        id: 'de-ig-likes-v2-1',
        question: 'Wie viele Instagram Likes sollte ich kaufen?',
        answer: 'Wählen Sie eine Zahl, die zum Beitrag und zu Ihrem Konto passt. Einige Hundert Likes passen zu den meisten Beiträgen kleinerer Konten, größere Konten und Kampagnen vertragen ein paar Tausend. Im Zweifel klein anfangen.',
      },
      {
        id: 'de-ig-likes-v2-2',
        question: 'Kann ich ein Likes-Paket auf mehrere Beiträge aufteilen?',
        answer: 'Nein. Jede Bestellung gilt für einen Beitrag oder ein Reel, damit Lieferung und Nachfüllung leicht nachvollziehbar bleiben. Für mehrere Beiträge bestellen Sie jeweils einzeln.',
      },
      {
        id: 'de-ig-likes-v2-3',
        question: 'Kann ich eine Erstattung bekommen?',
        answer: 'Berechtigte Bestellungen sind durch unsere 30-Tage-Geld-zurück-Garantie abgedeckt, gerechnet ab dem Kaufdatum. Die Erstattungsrichtlinie erklärt, welche Bestellungen berechtigt sind und wie Sie eine Anfrage stellen.',
      },
      {
        id: 'de-ig-likes-v2-4',
        question: 'Welche Zahlungsarten kann ich nutzen?',
        answer: 'Sie können mit Karte, Apple Pay oder Google Pay in US-Dollar bezahlen. Es ist eine Einmalzahlung, nichts verlängert sich.',
      },
    ],
  },
  more: {
    id: 'related-services',
    title: 'Weitere Instagram-Services',
    intro: 'Instagram Likes verändern eine Zahl. Für eine andere wählen Sie einen Service unten.',
    services: [
      {
        slug: 'buy-instagram-followers',
        title: 'Instagram Follower kaufen',
        line: 'Profil wachsen lassen',
        image: '/assets/images/illustrations/instagram-followers/instagram-followers-hero.webp',
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
