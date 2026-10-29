import type { ServiceV2Content } from '../../types';

/** German (/de) — v2 service page copy for buy-facebook-followers. Primary keyword: "facebook follower kaufen". Do not edit wording without the content owner. */
export const DE_BUY_FACEBOOK_FOLLOWERS_V2 = {
  meta: {
    slug: 'buy-facebook-followers',
    platform: 'Facebook',
    name: 'Facebook Follower',
    unit: 'Follower',
    unitSingular: 'Follower',
    inputKind: 'link',
    perUnit: 1000,
    tiers: false,
    keywords: {
      primary: 'facebook follower kaufen',
      secondary: [
        'facebook seiten follower kaufen',
        'facebook follower pakete',
        'facebook follower preis',
        'facebook seite wachsen lassen',
      ],
      questions: [
        'ist es sicher facebook follower zu kaufen',
        'was kosten facebook follower',
        'brauchen sie admin zugang',
        'geht das für ein privates profil',
        'warum sinken facebook follower',
      ],
    },
  },
  hero: {
    title: {
      lead: '',
      highlight: 'Facebook Follower',
      tail: 'kaufen für eine glaubwürdige Seite',
    },
    subtitle: 'Viele Menschen prüfen die Facebook-Seite eines Unternehmens, bevor sie anrufen, buchen oder vorbeikommen. Sorgen Sie für eine Follower-Zahl, die Vertrauen schafft. Ab {fromPrice}, nur mit dem Seitenlink.',
    trust: [
      'Kein Passwort nötig',
      'Start in 6–8 Stunden',
      '6 Monate Nachfüllung',
    ],
  },
  picker: {
    id: 'pricing-packages',
    title: 'Facebook Follower Pakete & Preise',
    intro: 'Wählen Sie ein Paket. Preise in USD.',
    summaryName: '{quantity} Facebook Follower',
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
      highlight: 'Facebook Follower?',
    },
    items: [
      {
        icon: 'shield',
        tone: 'mint',
        title: 'Nur ein Link, kein Admin-Zugang',
        body: 'Wir brauchen nur den öffentlichen Link zu Ihrer Seite oder Ihrem Profil. Kein Passwort, keine Admin-Rolle und kein Zugang zu Ihrem Konto.',
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
        icon: 'users',
        tone: 'pink',
        title: 'Seiten und öffentliche Profile',
        body: 'Funktioniert für Facebook-Seiten und für persönliche Profile, bei denen „Wer kann mir folgen“ auf Öffentlich steht. Kein Admin-Zugang nötig.',
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
      highlight: 'Facebook Follower',
    },
    pill: 'Etwa 2 Minuten',
    intro: 'Die Bestellung dauert fünf kurze Schritte und etwa zwei Minuten. Wir brauchen nur den öffentlichen Link zu Ihrer Seite oder Ihrem Profil.',
    items: [
      {
        ui: 'public',
        title: 'Folgen öffentlich erlauben',
        body: 'Lassen Sie die Seite veröffentlicht. Bei einem persönlichen Profil stellen Sie „Wer kann mir folgen“ unter „Follower und öffentliche Inhalte“ auf Öffentlich.',
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
        body: 'Kopieren Sie den Link zu Ihrer Seite oder Ihrem Profil, etwa facebook.com/ihreseite, und fügen Sie ihn an der Kasse ein.',
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
      highlight: 'Anbieter für Facebook Follower',
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
    title: 'Nachfüllung und Geld-zurück-Versprechen für Facebook Follower',
    intro: 'Beide Zusagen stehen in unserer Erstattungsrichtlinie, nicht nur auf dieser Seite.',
    cards: [
      {
        chip: '6 Monate',
        title: '6 Monate Nachfüllung',
        image: '/assets/images/illustrations/facebook-followers/facebook-followers-order-process.webp',
        body: 'Wenn Follower aus Ihrer Bestellung innerhalb von 6 Monaten nach dem Liefertermin zurückgehen, schreiben Sie uns per WhatsApp oder E-Mail mit Ihrer Bestellnummer, und wir füllen die Differenz kostenlos auf. Behalten Sie dieselbe Seiten-URL und lassen Sie die Seite öffentlich, während eine Nachfüllung geliefert wird.',
      },
      {
        chip: '30 Tage',
        title: '30-Tage-Geld-zurück-Garantie',
        image: '/assets/images/illustrations/facebook-followers/facebook-followers-package-cta.webp',
        body: 'Berechtigte Bestellungen können innerhalb von 30 Tagen ab Kaufdatum erstattet werden. Die Erstattungsrichtlinie erklärt, was berechtigt ist und wie Sie eine Anfrage stellen.',
      },
    ],
    link: {
      label: 'Erstattungsrichtlinie lesen',
      href: '/refund-policy',
    },
  },
  cost: {
    id: 'facebook-followers-cost',
    title: {
      lead: 'Was kosten',
      highlight: 'Facebook Follower?',
    },
    intro: 'Follower starten ab {fromPrice} für 100, und der Preis pro 1.000 sinkt mit der Paketgröße. Jeder Preis ist eine Einmalzahlung in US-Dollar für eine Seite oder ein Profil.',
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
    id: 'why-buy-facebook-followers',
    title: {
      lead: 'Warum kaufen Menschen',
      highlight: 'Facebook Follower?',
    },
    intro: 'Facebook ist für viele immer noch der Ort, an dem sie Öffnungszeiten, Neuigkeiten und lokale Unternehmen prüfen. Eine gesunde Follower-Zahl lässt Ihre Seite auf den ersten Blick aktiv wirken.',
    items: [
      {
        title: 'Eine Seite, die geöffnet wirkt',
        body: 'Eine Seite mit 60 Followern kann verlassen wirken, auch wenn das Geschäft gut läuft.',
      },
      {
        title: 'Vertrauen vor dem ersten Anruf',
        body: 'Handwerker, Praxen und Salons werden oft auf Facebook geprüft, bevor sich jemand meldet.',
      },
      {
        title: 'Ein Vorsprung für neue Seiten',
        body: 'Neue Unternehmen, Zweitstandorte und Rebrandings starten nicht bei null.',
      },
    ],
    diagram: [
      'Wirkt geöffnet',
      'Vertrauen',
      'Neue Seite',
    ],
  },
  help: {
    id: 'does-buying-facebook-followers-help',
    title: {
      lead: 'Bringt es etwas,',
      highlight: 'Facebook Follower zu kaufen?',
    },
    intro: 'Follower verändern die Zahl auf Ihrer Seite oder Ihrem Profil. Wer Ihre Beiträge sieht, ändern sie allein nicht.',
    no: {
      title: 'Was sich nicht ändert',
      items: [
        'Reaktionen oder Kommentare unter Ihren Beiträgen',
        'Ihre organische Reichweite allein',
        'Anfragen ohne nützliche Beiträge und klare Kontaktdaten',
      ],
    },
    yes: {
      title: 'Was sich ändert',
      items: [
        'Die Follower-Zahl Ihrer Seite oder Ihres Profils',
        'Wie etabliert die Seite auf neue Besucher wirkt',
        'Den ersten Eindruck vor einem Anruf oder einer Buchung',
      ],
      image: '/assets/images/illustrations/facebook-followers/facebook-followers-does-help.webp',
      altFallback: 'Illustration: Facebook Follower auf Facebook',
    },
  },
  who: {
    id: 'who-orders',
    title: {
      lead: 'Wer bestellt',
      highlight: 'Facebook Follower',
    },
    cards: [
      {
        title: 'Handwerksbetriebe',
        body: 'Installateure, Elektriker und Bauunternehmen ergänzen Follower, damit ihre Seite so zuverlässig wirkt wie ihre Arbeit.',
        image: '/assets/images/illustrations/facebook-followers/facebook-followers-best-practices.webp',
      },
      {
        title: 'Lokale Dienstleister',
        body: 'Praxen, Hundesalons und Fahrschulen bauen ihre Seite vor einem Angebot oder neuen Terminen auf.',
        image: '/assets/images/illustrations/facebook-followers/facebook-followers-hero.webp',
      },
      {
        title: 'Vereine und Initiativen',
        body: 'Vereine, Märkte und gemeinnützige Gruppen ergänzen Follower, damit ihre Seite auf neue Mitglieder aktiv wirkt.',
        image: '/assets/images/illustrations/facebook-followers/facebook-followers-why-buy.webp',
      },
    ],
    statement: 'Egal welche Seite, die Bestellung läuft immer gleich: ein öffentlicher Link, ein passendes Paket und Follower, die meist innerhalb von 6–8 Stunden starten. Kein Admin-Zugang, kein Passwort.',
  },
  vs: {
    id: 'facebook-followers-vs-other-services',
    title: {
      lead: 'Facebook Follower im Vergleich zu',
      highlight: 'Seiten-Likes und Beitrags-Likes',
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
        slug: 'buy-facebook-followers',
        label: 'Follower',
        changes: 'Die Follower-Zahl einer Seite oder eines Profils',
        needs: 'Ein Link zur Seite oder zum Profil',
        current: true,
      },
      {
        slug: 'buy-facebook-page-likes',
        label: 'Seiten-Likes',
        changes: 'Die Like-Zahl einer Seite im klassischen Layout',
        needs: 'Ein Link zur Seite',
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
      highlight: 'Facebook Follower zu kaufen?',
    },
    lead: 'Es kommt auf drei Dinge an: Ihr Konto, Ihre Zahlung und Ihre Daten. So funktioniert jedes davon bei NovaLikes, plus das eine Risiko, das kein Anbieter ausschließen kann.',
    body: 'Die Gemeinschaftsstandards von Facebook erlauben kein unauthentisches Verhalten, und Meta entfernt regelmäßig gefälschte oder inaktive Konten. Deshalb kann nach der Lieferung ein Rückgang auftreten, und deshalb enthält jede Bestellung 6 Monate Nachfüllung. Schrittweise Lieferung und regelmäßiges Posten halten das Wachstum natürlich.',
    cards: [
      {
        ui: 'nopass',
        title: 'Kontosicherheit',
        body: 'Wir brauchen nur den öffentlichen Link zu Ihrer Seite oder Ihrem Profil, deshalb meldet sich niemand an und niemand braucht Admin-Rechte. Wir fragen nie nach einem Passwort oder Anmeldecode. Wer sich als NovaLikes ausgibt und danach fragt, gehört nicht zu uns.',
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
      highlight: 'Facebook Follower kaufen',
    },
    lead: 'Prüfen Sie diese vier Punkte einmal, dann läuft Ihre Bestellung reibungslos.',
    items: [
      {
        title: 'Folgen ist erlaubt',
        body: 'Die Seite muss veröffentlicht sein, oder das Profil muss Follower aus der Öffentlichkeit zulassen.',
      },
      {
        title: 'Der Link stimmt',
        body: 'Kopieren Sie den Link zur Seite oder zum Profil selbst, etwa facebook.com/ihreseite, nicht zu einem Beitrag.',
      },
      {
        title: 'Die Seiten-URL bleibt gleich',
        body: 'Behalten Sie dieselbe Adresse während der Lieferung und der 6 Monate Nachfüllung.',
      },
      {
        title: 'Die Größe passt zur Seite',
        body: 'Wählen Sie ein Paket, das neben Ihren aktuellen Followern und Ihrer Posting-Frequenz natürlich wirkt.',
      },
    ],
  },
  faq: {
    id: 'faq',
    kicker: 'Noch Fragen vor der Bestellung?',
    title: 'Facebook Follower FAQ',
    intro: 'Keine Antwort gefunden? Schreiben Sie uns rund um die Uhr auf WhatsApp unter +44 7454 758272.',
    cta: 'Auf WhatsApp fragen',
    locale: {
      code: 'de',
    },
    extra: [
      {
        id: 'de-fb-followers-v2-1',
        question: 'Brauchen Sie Admin-Zugang zu meiner Seite?',
        answer: 'Nein. Wir brauchen nur den öffentlichen Link. Geben Sie niemandem Admin-Zugang oder Ihr Facebook-Passwort, um Follower zu bekommen.',
      },
      {
        id: 'de-fb-followers-v2-2',
        question: 'Kann ich eine Erstattung bekommen?',
        answer: 'Berechtigte Bestellungen sind durch unsere 30-Tage-Geld-zurück-Garantie abgedeckt, gerechnet ab dem Kaufdatum. Die Erstattungsrichtlinie erklärt, welche Bestellungen berechtigt sind und wie Sie eine Anfrage stellen.',
      },
      {
        id: 'de-fb-followers-v2-3',
        question: 'Welche Zahlungsarten kann ich nutzen?',
        answer: 'Sie können mit Karte, Apple Pay oder Google Pay in US-Dollar bezahlen. Es ist eine Einmalzahlung, nichts verlängert sich.',
      },
    ],
  },
  more: {
    id: 'related-services',
    title: 'Weitere NovaLikes-Services',
    intro: 'Facebook Follower verändern eine Zahl. Für eine andere wählen Sie einen Service unten.',
    services: [
      {
        slug: 'buy-facebook-page-likes',
        title: 'Facebook Fanpage Likes kaufen',
        line: 'Für Seiten mit Like-Zahl',
        image: '/assets/images/illustrations/facebook-page-likes/facebook-page-likes-hero.webp',
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
