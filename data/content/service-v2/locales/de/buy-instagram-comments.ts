import type { ServiceV2Content } from '../../types';

/** German (/de) — v2 service page copy for buy-instagram-comments. Primary keyword: "instagram kommentare kaufen". Do not edit wording without the content owner. */
export const DE_BUY_INSTAGRAM_COMMENTS_V2 = {
  meta: {
    slug: 'buy-instagram-comments',
    platform: 'Instagram',
    name: 'Instagram Kommentare',
    unit: 'Kommentare',
    unitSingular: 'Kommentar',
    inputKind: 'link',
    perUnit: 1,
    tiers: true,
    keywords: {
      primary: 'instagram kommentare kaufen',
      secondary: [
        'eigene instagram kommentare kaufen',
        'instagram kommentare deutsch kaufen',
        'premium instagram kommentare',
        'instagram kommentare preis',
      ],
      questions: [
        'ist es sicher instagram kommentare zu kaufen',
        'was kosten instagram kommentare',
        'kann ich eigene kommentare schreiben',
        'gibt es kommentare auf deutsch',
        'high quality oder premium kommentare',
      ],
    },
  },
  hero: {
    title: {
      lead: '',
      highlight: 'Instagram Kommentare',
      tail: 'kaufen und das Gespräch starten',
    },
    subtitle: 'Ein Beitrag mit Kommentaren wirkt lebendig und lädt andere zum Mitreden ein. Wählen Sie High-Quality-Kommentare oder Premium-Kommentare passend zu Ihrem Beitrag, ab {fromPrice}. Eigene Texte, auch auf Deutsch, sind möglich.',
    trust: [
      'Kein Passwort nötig',
      'Start in 6–8 Stunden',
      '6 Monate Nachfüllung',
    ],
  },
  picker: {
    id: 'pricing-packages',
    title: 'Instagram Kommentare Pakete & Preise',
    intro: 'Wählen Sie eine Stufe und ein Paket. Preise in USD.',
    summaryName: '{quantity} {tier} Instagram Kommentare',
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
        note: 'Kurze, positive Kommentare, die zu den meisten Beiträgen passen.',
      },
      {
        label: 'Premium',
        note: 'Kommentare passend zu Ihrem Beitrag, von realistischer wirkenden Konten.',
      },
    ],
  },
  why: {
    id: 'why-choose-novalikes',
    title: {
      lead: 'Warum NovaLikes für',
      highlight: 'Instagram Kommentare?',
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
        body: 'Wenn Kommentare aus Ihrer Bestellung innerhalb von 6 Monaten nach der Lieferung zurückgehen, schicken Sie uns Ihre Bestellnummer und wir füllen kostenlos nach.',
      },
      {
        icon: 'badge-check',
        tone: 'peach',
        title: '30-Tage-Geld-zurück-Garantie',
        body: 'Berechtigte Bestellungen sind 30 Tage ab Kaufdatum abgedeckt. Unsere Erstattungsrichtlinie erklärt genau, was dazugehört.',
      },
      {
        icon: 'pen',
        tone: 'pink',
        title: 'Ihre Texte oder unsere',
        body: 'Schicken Sie Ihre eigenen Kommentare im Bestellhinweis, einen pro Zeile, oder lassen Sie unser Team schreiben. Auf Wunsch auf Deutsch.',
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
      highlight: 'Instagram Kommentare',
    },
    pill: 'Etwa 2 Minuten',
    intro: 'Die Bestellung dauert fünf kurze Schritte. Wählen Sie High Quality oder Premium, fügen Sie den Link zu einem öffentlichen Beitrag ein und senden Sie bei Bedarf Ihre eigenen Texte.',
    items: [
      {
        ui: 'public',
        title: 'Kommentare für alle öffnen',
        body: 'Der Beitrag muss auf einem öffentlichen Konto sein und Kommentare für alle erlauben. Einschränkungen wie „nur Follower“ verhindern den Start.',
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
        title: 'Link und Texte einfügen',
        body: 'Fügen Sie den Link zum Beitrag oder Reel an der Kasse ein. Eigene Kommentare schreiben Sie in den Hinweis, einen pro Zeile, oder überlassen Sie es uns.',
      },
      {
        ui: 'pay',
        title: 'Sicher bezahlen',
        body: 'Einmal mit Karte, Apple Pay oder Google Pay in US-Dollar bezahlen. Es gibt kein Abo.',
      },
    ],
    done: {
      title: 'Fertig!',
      count: 25,
      unit: 'Kommentare',
      body: 'Die meisten Bestellungen starten innerhalb von 6–8 Stunden nach der Zahlung und sind 4–6 Stunden nach dem Start abgeschlossen. Den Fortschritt sehen Sie auf der Seite „Bestellung verfolgen“ mit Ihrer Bestellnummer.',
    },
  },
  ui: {
    toggle: {
      label: 'Kommentare eingeschränkt',
      sub: 'Aus, damit wir kommentieren können',
    },
    chips: [
      '10',
      '25',
      '50',
      '100',
    ],
    chipOn: 1,
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
      highlight: 'Anbieter für Instagram Kommentare',
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
    title: 'Nachfüllung und Geld-zurück-Versprechen für Instagram Kommentare',
    intro: 'Beide Zusagen stehen in unserer Erstattungsrichtlinie, nicht nur auf dieser Seite.',
    cards: [
      {
        chip: '6 Monate',
        title: '6 Monate Nachfüllung',
        image: '/assets/images/illustrations/instagram-comments/instagram-comments-order-process.webp',
        body: 'Wenn Kommentare aus Ihrer Bestellung innerhalb von 6 Monaten nach dem Liefertermin zurückgehen, schreiben Sie uns per WhatsApp oder E-Mail mit Ihrer Bestellnummer, und wir füllen die Differenz kostenlos auf. Lassen Sie den Beitrag oder das Reel online und öffentlich, während eine Nachfüllung geliefert wird.',
      },
      {
        chip: '30 Tage',
        title: '30-Tage-Geld-zurück-Garantie',
        image: '/assets/images/illustrations/instagram-comments/instagram-comments-package-cta.webp',
        body: 'Berechtigte Bestellungen können innerhalb von 30 Tagen ab Kaufdatum erstattet werden. Die Erstattungsrichtlinie erklärt, was berechtigt ist und wie Sie eine Anfrage stellen.',
      },
    ],
    link: {
      label: 'Erstattungsrichtlinie lesen',
      href: '/refund-policy',
    },
  },
  cost: {
    id: 'instagram-comments-cost',
    title: {
      lead: 'Was kosten',
      highlight: 'Instagram Kommentare?',
    },
    intro: 'Pakete starten ab {fromPrice}. High-Quality-Kommentare kosten weniger pro Stück, Premium-Kommentare mehr, weil jeder passend zu Ihrem Beitrag geschrieben wird. Jeder Preis ist eine Einmalzahlung in US-Dollar für einen Beitrag oder ein Reel.',
    points: [
      'Die 6 Monate Nachfüllung sind inklusive. Es kommt nichts dazu.',
      'Preise in US-Dollar. Ihre Bank rechnet in Euro um; manche Karten berechnen dafür ein Auslandseinsatzentgelt.',
      'Kein Abo und keine Verlängerung. Sie zahlen einmal pro Bestellung.',
    ],
    cols: [
      'Paket',
      'Preis',
      'Pro Stück',
    ],
    best: 'Bester Preis',
    note: 'Die Preise stammen aus unseren aktuellen Paketen. Der Preis an der Kasse ist der Preis, den Sie zahlen.',
  },
  whyBuy: {
    id: 'why-buy-instagram-comments',
    title: {
      lead: 'Warum kaufen Menschen',
      highlight: 'Instagram Kommentare?',
    },
    intro: 'Ein leerer Kommentarbereich lässt selbst einen guten Beitrag still wirken. Ein paar passende Kommentare zeigen, dass über den Beitrag gesprochen wird, und machen es der nächsten Person leichter, mitzumachen.',
    items: [
      {
        title: 'Beiträge, die aktiv wirken',
        body: 'Kommentare sind das deutlichste Zeichen, dass sich Menschen für einen Beitrag interessieren.',
      },
      {
        title: 'Eine leichtere erste Antwort',
        body: 'Niemand kommentiert gern als Erster. Läuft das Gespräch schon, steigen echte Besucher eher ein.',
      },
      {
        title: 'Ihre Botschaft im Blick',
        body: 'Mit eigenen Texten heben Kommentare ein Produktdetail, eine Frage oder eine Reaktion hervor.',
      },
    ],
    diagram: [
      'Aktiver Beitrag',
      'Erste Antwort',
      'Ihre Botschaft',
    ],
  },
  help: {
    id: 'does-buying-instagram-comments-help',
    title: {
      lead: 'Bringt es etwas,',
      highlight: 'Instagram Kommentare zu kaufen?',
    },
    intro: 'Kommentare verändern, was unter einem Beitrag steht. Follower oder Reichweite bringen sie allein nicht.',
    no: {
      title: 'Was sich nicht ändert',
      items: [
        'Ihre Follower, Likes oder Views',
        'Platzierung in Explore oder Reels allein',
        'Echte Antworten, die das Gespräch weiterführen',
      ],
    },
    yes: {
      title: 'Was sich ändert',
      items: [
        'Den Kommentarbereich des gewählten Beitrags',
        'Wie aktiv der Beitrag auf neue Besucher wirkt',
        'Welche Punkte auffallen, wenn Sie eigene Texte senden',
      ],
      image: '/assets/images/illustrations/instagram-comments/instagram-comments-does-help.webp',
      altFallback: 'Illustration: Instagram Kommentare auf Instagram',
    },
  },
  who: {
    id: 'who-orders',
    title: {
      lead: 'Wer bestellt',
      highlight: 'Instagram Kommentare',
    },
    cards: [
      {
        title: 'Creator',
        body: 'Creator ergänzen Kommentare bei Reels und Karussells, die mehr Gespräch verdienen, oft mit eigenen Texten.',
        image: '/assets/images/illustrations/instagram-comments/instagram-comments-best-practices.webp',
      },
      {
        title: 'Kleine Unternehmen',
        body: 'Unternehmen nutzen Kommentare bei Produkt- und Angebotsbeiträgen, damit Fragen und Reaktionen dort stehen, wo Kunden hinschauen.',
        image: '/assets/images/illustrations/instagram-comments/instagram-comments-hero.webp',
      },
      {
        title: 'Marken & Agenturen',
        body: 'Marken und Agenturen wählen Premium-Kommentare für Kampagnen, bei denen jeder Kommentar natürlich klingen muss.',
        image: '/assets/images/illustrations/instagram-comments/instagram-comments-why-buy.webp',
      },
    ],
    statement: 'Egal welcher Beitrag, die Bestellung läuft immer gleich: ein öffentlicher Link, Ihre gewählte Stufe, auf Wunsch Ihre eigenen Texte, und Kommentare, die meist innerhalb von 6–8 Stunden starten. Niemand braucht Ihre Zugangsdaten.',
  },
  vs: {
    id: 'instagram-comments-vs-other-services',
    title: {
      lead: 'Instagram Kommentare im Vergleich zu',
      highlight: 'Likes, Views und Followern',
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
        slug: 'buy-instagram-comments',
        label: 'Kommentare',
        changes: 'Kommentare unter einem öffentlichen Beitrag',
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
    ],
    currentLabel: 'Diese Seite',
  },
  safe: {
    id: 'is-it-safe',
    title: {
      lead: 'Ist es sicher,',
      highlight: 'Instagram Kommentare zu kaufen?',
    },
    lead: 'Es kommt auf drei Dinge an: Ihr Konto, Ihre Zahlung und Ihre Daten. So funktioniert jedes davon bei NovaLikes, plus das eine Risiko, das kein Anbieter ausschließen kann.',
    body: 'Die Gemeinschaftsrichtlinien von Instagram bitten darum, Interaktionen nicht künstlich zu steigern, und die Filter von Instagram können Kommentare ausblenden oder Konten entfernen, die es für unecht hält. Deshalb können nach der Lieferung einzelne Kommentare verschwinden, und deshalb enthält jede Bestellung 6 Monate Nachfüllung. Premium-Kommentare oder eigene Texte in passender Menge wirken am natürlichsten.',
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
      highlight: 'Instagram Kommentare kaufen',
    },
    lead: 'Prüfen Sie diese vier Punkte einmal, dann läuft Ihre Bestellung reibungslos.',
    items: [
      {
        title: 'Kommentare sind für alle offen',
        body: 'Prüfen Sie, dass Kommentare aktiviert und nicht auf Follower oder gefolgte Konten beschränkt sind.',
      },
      {
        title: 'Der Link führt zum Beitrag',
        body: 'Kopieren Sie den Link aus dem Beitrag oder Reel selbst, nicht Ihren Profillink.',
      },
      {
        title: 'Ihre Texte sind bereit',
        body: 'Eigene Kommentare oder Deutsch gewünscht? Tragen Sie es vor dem Start in den Bestellhinweis ein.',
      },
      {
        title: 'Der Beitrag bleibt online',
        body: 'Löschen oder archivieren Sie ihn nicht während der Lieferung oder der 6 Monate Nachfüllung.',
      },
    ],
  },
  faq: {
    id: 'faq',
    kicker: 'Noch Fragen vor der Bestellung?',
    title: 'Instagram Kommentare FAQ',
    intro: 'Keine Antwort gefunden? Schreiben Sie uns rund um die Uhr auf WhatsApp unter +44 7454 758272.',
    cta: 'Auf WhatsApp fragen',
    locale: {
      code: 'de',
    },
    extra: [
      {
        id: 'de-ig-comments-v2-1',
        question: 'Kann ich Kommentare auf Deutsch bekommen?',
        answer: 'Ja. Schreiben Sie „Deutsch“ in den Bestellhinweis oder senden Sie Ihre eigenen Kommentare auf Deutsch, einen pro Zeile. Wir posten sie genau so.',
      },
      {
        id: 'de-ig-comments-v2-2',
        question: 'Wie viele Instagram Kommentare sollte ich kaufen?',
        answer: 'Passen Sie die Zahl an den Beitrag an. Zehn bis 25 Kommentare passen zu den meisten Beiträgen kleinerer Konten. Ein Beitrag mit wenigen Likes und Dutzenden Kommentaren wirkt schnell unstimmig.',
      },
      {
        id: 'de-ig-comments-v2-3',
        question: 'Kann ich eine Erstattung bekommen?',
        answer: 'Berechtigte Bestellungen sind durch unsere 30-Tage-Geld-zurück-Garantie abgedeckt, gerechnet ab dem Kaufdatum. Die Erstattungsrichtlinie erklärt, welche Bestellungen berechtigt sind und wie Sie eine Anfrage stellen.',
      },
      {
        id: 'de-ig-comments-v2-4',
        question: 'Welche Zahlungsarten kann ich nutzen?',
        answer: 'Sie können mit Karte, Apple Pay oder Google Pay in US-Dollar bezahlen. Es ist eine Einmalzahlung, nichts verlängert sich.',
      },
    ],
  },
  more: {
    id: 'related-services',
    title: 'Weitere Instagram-Services',
    intro: 'Instagram Kommentare verändern eine Zahl. Für eine andere wählen Sie einen Service unten.',
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
