/**
 * German homepage (/de) — same layout and shape as HOME_V5. All copy is final. Do not edit wording in code.
 * {fromPrice}: lowest active package price from the registry. Service links resolve to the German service routes.
 * getStarted.guides is intentionally empty (Learn is English-only): hide that group when it has no links.
 */

export const HOME_V5_DE = {
  hero: {
    eyebrow: 'Wachstum für Instagram & TikTok',
    title: {
      lead: '',
      highlight: 'Instagram & TikTok',
      tail: 'Follower, Likes und Views kaufen',
    },
    subtitle: 'Wählen Sie Plattform und Service, geben Sie Ihren öffentlichen Benutzernamen oder einen Beitragslink ein und bezahlen Sie in USD. Kein Passwort, Start meist innerhalb von 6–8 Stunden, und jede Bestellung enthält 6 Monate Nachfüllung.',
    tabs: {
      instagram: {
        label: 'Instagram',
        cards: [
          {
            slug: 'buy-instagram-followers',
            title: 'Follower',
            line: 'Profil wachsen lassen',
            icon: 'user-plus',
          },
          {
            slug: 'buy-instagram-likes',
            title: 'Likes',
            line: 'Für Beiträge und Reels',
            icon: 'heart',
          },
          {
            slug: 'buy-instagram-views',
            title: 'Views',
            line: 'Für Reels und Videos',
            icon: 'eye',
          },
          {
            slug: 'buy-instagram-comments',
            title: 'Kommentare',
            line: 'Gespräche starten',
            icon: 'message-circle',
          },
        ],
      },
      tiktok: {
        label: 'TikTok',
        cards: [
          {
            slug: 'buy-tiktok-followers',
            title: 'Follower',
            line: 'Profil wachsen lassen',
            icon: 'user-plus',
          },
          {
            slug: 'buy-tiktok-likes',
            title: 'Likes',
            line: 'Für ein Video',
            icon: 'heart',
          },
          {
            slug: 'buy-tiktok-views',
            title: 'Views',
            line: 'Für ein Video',
            icon: 'eye',
          },
        ],
      },
      facebook: {
        label: 'Facebook',
        cards: [
          {
            slug: 'buy-facebook-followers',
            title: 'Follower',
            line: 'Für Seiten und Profile',
            icon: 'user-plus',
          },
          {
            slug: 'buy-facebook-page-likes',
            title: 'Seiten-Likes',
            line: 'Für Seiten mit Like-Zahl',
            icon: 'thumbs-up',
          },
          {
            slug: 'buy-facebook-post-likes',
            title: 'Beitrags-Likes',
            line: 'Für einen öffentlichen Beitrag',
            icon: 'heart',
          },
        ],
      },
    },
    cardPrice: 'Ab {fromPrice}',
    trust: [
      'Kein Passwort nötig',
      'Start in 6–8 Stunden',
      '6 Monate Nachfüllung',
      'WhatsApp-Support 24/7',
      'Preise in USD',
    ],
  },
  marquee: [
    'Nie ein Passwort',
    'Start in 6–8 Stunden',
    '6 Monate Nachfüllung bei jeder Bestellung',
    'WhatsApp-Support 24/7',
    'Preise in USD',
    'Jede Bestellung verfolgen',
    'Schrittweise Lieferung auf Wunsch',
    'Sicherer Karten-Checkout',
  ],
  statement: {
    id: 'services',
    title: {
      lead: 'NovaLikes',
      highlight: 'Services',
    },
    body: 'NovaLikes bietet Follower, Likes, Views und Kommentare für Instagram und TikTok sowie einige Facebook-Services. Sie wählen ein Paket, fügen einen öffentlichen Benutzernamen oder Link ein und bezahlen in US-Dollar. Wir fragen nie nach Ihrem Passwort, die meisten Bestellungen starten innerhalb von 6–8 Stunden nach der Zahlung und sind 4–6 Stunden danach abgeschlossen, und jede Bestellung enthält 6 Monate Nachfüllung.',
  },
  stories: [
    {
      id: 'profile-numbers',
      title: {
        lead: 'Warum die Zahlen in Ihrem',
        highlight: 'Profil zählen',
      },
      body: 'Wer Ihr Profil oder einen Beitrag zum ersten Mal sieht, entscheidet schnell, ob er bleibt. Die Follower-Zahl und die Likes unter einem Beitrag gehören zu den ersten Dingen, die Menschen sehen, lange bevor sie eine Bildunterschrift lesen.',
      callout: 'Niedrige Zahlen lassen gute Inhalte ignoriert wirken, auch wenn sie es nicht sind. Genau diese Lücke soll ein Paket schließen.',
      visual: 'profile',
    },
    {
      id: 'stronger-start',
      title: {
        lead: 'Geben Sie Ihren besten Inhalten einen',
        highlight: 'stärkeren Start',
      },
      body: 'Ein Paket verändert die Zahl, die Menschen zuerst sehen, damit ein neues Konto, ein Launch oder Ihr bestes Reel nicht bei null beginnt. Was danach passiert, hängt weiter vom Inhalt ab: Instagram und TikTok entscheiden anhand dessen, wie Menschen zuschauen und reagieren.',
      callout: 'Nutzen Sie ein Paket, um Inhalte zu unterstützen, auf die Sie schon stolz sind, nicht, um sie zu ersetzen.',
      visual: 'growth',
    },
  ],
  services: [
    {
      slug: 'buy-instagram-followers',
      platform: 'instagram',
      metric: 'followers',
      title: {
        lead: '',
        highlight: 'Instagram Follower',
        tail: 'kaufen',
      },
      intro: 'Erhöhen Sie die Follower-Zahl eines öffentlichen Instagram-Kontos, die erste Zahl, die Besucher in Ihrem Profil prüfen.',
      bullets: [
        'Nur öffentlicher Benutzername, nie Ihr Passwort',
        'Pakete ab {fromPrice}, Preise in USD',
        'Start meist innerhalb von 6–8 Stunden',
        'Schrittweise Lieferung auf Wunsch',
        '6 Monate Nachfüllung ab Lieferung',
        'Bestellung mit Bestellnummer verfolgen',
      ],
      cta: 'Instagram Follower kaufen',
      why: {
        q: 'Warum sind Instagram Follower wichtig?',
        a: 'Die Follower-Zahl steht ganz oben in Ihrem Profil, neben Ihrem Namen. Neue Besucher beurteilen damit, zusammen mit Ihren Beiträgen, ob ein Konto aktiv ist und sich das Folgen lohnt. Eine sehr niedrige Zahl neben guten Inhalten kann ein neues oder umbenanntes Konto verlassen wirken lassen. Mehr Reichweite bringen Follower allein aber nicht: Die hängt weiter davon ab, wie Menschen auf jeden Beitrag reagieren.',
      },
      how: {
        q: 'Was brauchen Sie für eine Bestellung?',
        a: 'Nur Ihren öffentlichen Instagram-Benutzernamen. Lassen Sie das Konto öffentlich und den Namen unverändert, bis Lieferung und eventuelle Nachfüllung abgeschlossen sind. Wählen Sie ein Paket, das neben Ihren aktuellen Followern natürlich wirkt.',
      },
    },
    {
      slug: 'buy-instagram-likes',
      platform: 'instagram',
      metric: 'likes',
      title: {
        lead: '',
        highlight: 'Instagram Likes',
        tail: 'kaufen',
      },
      intro: 'Ergänzen Sie Likes bei einem öffentlichen Foto, Karussell oder Reel. Likes stehen direkt unter dem Beitrag und sind das schnellste Signal für neue Zuschauer.',
      bullets: [
        'Fotos, Karussells und Reels',
        'Beitragslink einfügen, kein Login',
        'Pakete ab {fromPrice}',
        'Start meist innerhalb von 6–8 Stunden',
        'Schrittweise Lieferung auf Wunsch',
        '6 Monate Nachfüllung ab Lieferung',
      ],
      cta: 'Instagram Likes kaufen',
      why: {
        q: 'Warum sind Instagram Likes wichtig?',
        a: 'Likes sind die erste Reaktion, die Menschen unter einem Beitrag sehen, noch vor Bildunterschrift und Kommentaren. Ein Beitrag mit gesunder Like-Zahl wirkt wie etwas, das anderen schon gefallen hat. Likes gelten nur für einen Beitrag und passen deshalb zu den Beiträgen, auf die Sie hinweisen: ein Launch, ein Angebot, eine Kooperation oder angepinnte Inhalte.',
      },
      how: {
        q: 'Was brauchen Sie für eine Bestellung?',
        a: 'Den öffentlichen Link zu einem Beitrag oder Reel. Jede Bestellung gilt nur für diesen Beitrag. Für mehrere Beiträge bestellen Sie jeweils einzeln.',
      },
    },
    {
      slug: 'buy-instagram-views',
      platform: 'instagram',
      metric: 'views',
      title: {
        lead: '',
        highlight: 'Instagram Views',
        tail: 'kaufen',
      },
      intro: 'Erhöhen Sie die View-Zahl eines öffentlichen Reels oder Videos, damit ein neuer Upload sehenswert wirkt, wenn Sie den Link teilen.',
      bullets: [
        'Reels und Videobeiträge',
        'Link einfügen, kein Passwort',
        'Pakete ab {fromPrice}',
        'Start meist innerhalb von 6–8 Stunden',
        'Schrittweise Lieferung auf Wunsch',
        '6 Monate Nachfüllung ab Lieferung',
      ],
      cta: 'Instagram Views kaufen',
      why: {
        q: 'Warum sind Instagram Views wichtig?',
        a: 'Instagram zeigt bei Reels die View-Zahl, und viele schauen darauf, bevor sie entscheiden, ob sie zusehen. Ein neues Reel mit sehr wenigen Views kann ignoriert wirken, auch wenn es gut ist. Views verändern nur die Zahl dieses Videos. Likes, Kommentare und neue Follower hängen weiter vom Inhalt ab.',
      },
      how: {
        q: 'Was brauchen Sie für eine Bestellung?',
        a: 'Den öffentlichen Link zum Reel oder Video. Lassen Sie es bis zum Ende der Lieferung öffentlich und bitten Sie bei Bedarf um schrittweise Lieferung.',
      },
    },
    {
      slug: 'buy-instagram-comments',
      platform: 'instagram',
      metric: 'comments',
      title: {
        lead: '',
        highlight: 'Instagram Kommentare',
        tail: 'kaufen',
      },
      intro: 'Ergänzen Sie Kommentare unter einem öffentlichen Beitrag oder Reel, damit er aktiv wirkt und andere zum Mitreden einlädt.',
      bullets: [
        'High-Quality- oder Premium-Kommentare',
        'Eigene Texte oder Sprache auf Wunsch',
        'Beitragslink einfügen, kein Login',
        'Pakete ab {fromPrice}',
        'Start meist innerhalb von 6–8 Stunden',
        '6 Monate Nachfüllung ab Lieferung',
      ],
      cta: 'Instagram Kommentare kaufen',
      why: {
        q: 'Warum sind Instagram Kommentare wichtig?',
        a: 'Kommentare zeigen, dass Menschen nicht nur weitergescrollt, sondern etwas gesagt haben. Ein Beitrag mit ein paar Kommentaren lädt andere zum Antworten ein, während ein leerer Kommentarbereich selbst einen beliebten Beitrag still wirken lässt. Premium-Kommentare werden passend zu Ihrem Beitrag geschrieben und klingen natürlich.',
      },
      how: {
        q: 'Was brauchen Sie für eine Bestellung?',
        a: 'Den öffentlichen Link zum Beitrag oder Reel. Wählen Sie auf der Service-Seite High Quality oder Premium und tragen Sie eigene Kommentare oder eine Sprache, etwa Deutsch, in den Bestellhinweis ein.',
      },
    },
    {
      slug: 'buy-tiktok-followers',
      platform: 'tiktok',
      metric: 'followers',
      title: {
        lead: '',
        highlight: 'TikTok Follower',
        tail: 'kaufen',
      },
      intro: 'Erhöhen Sie die Follower-Zahl eines öffentlichen TikTok-Kontos. Neue Zuschauer prüfen sie in Ihrem Profil, bevor sie folgen.',
      bullets: [
        'Nur Benutzername, kein Passwort',
        'Pakete ab {fromPrice}, Preise in USD',
        'Start meist innerhalb von 6–8 Stunden',
        'Schrittweise Lieferung auf Wunsch',
        '6 Monate Nachfüllung ab Lieferung',
        'Bestellung mit Bestellnummer verfolgen',
      ],
      cta: 'TikTok Follower kaufen',
      why: {
        q: 'Warum sind TikTok Follower wichtig?',
        a: 'Auf TikTok entdecken Menschen Sie oft über ein Video und tippen dann auf Ihr Profil. Die Follower-Zahl gehört dort zu den ersten Dingen, die sie sehen. Ein Profil mit sehr wenigen Followern neben guten Videos kann brandneu oder inaktiv wirken. Was TikTok empfiehlt, entscheiden Follower nicht: Die For-You-Seite richtet sich danach, wie Menschen jedes Video ansehen.',
      },
      how: {
        q: 'Was brauchen Sie für eine Bestellung?',
        a: 'Ihren öffentlichen TikTok-Benutzernamen. Lassen Sie das Konto öffentlich und den Namen unverändert, bis Lieferung und eventuelle Nachfüllung abgeschlossen sind.',
      },
    },
    {
      slug: 'buy-tiktok-likes',
      platform: 'tiktok',
      metric: 'likes',
      title: {
        lead: '',
        highlight: 'TikTok Likes',
        tail: 'kaufen',
      },
      intro: 'Ergänzen Sie Likes bei einem öffentlichen TikTok-Video, etwa einem Produktlaunch, einer Kooperation oder Ihrem besten Clip.',
      bullets: [
        'Ein Video pro Bestellung',
        'Videolink einfügen, kein Login',
        'Pakete ab {fromPrice}',
        'Start meist innerhalb von 6–8 Stunden',
        'Schrittweise Lieferung auf Wunsch',
        '6 Monate Nachfüllung ab Lieferung',
      ],
      cta: 'TikTok Likes kaufen',
      why: {
        q: 'Warum sind TikTok Likes wichtig?',
        a: 'Die Herz-Zahl steht rechts neben jedem TikTok-Video, Zuschauer sehen sie also während es läuft. Ein Video, das Sie außerhalb von TikTok teilen oder in Ihrem Profil anpinnen, wirkt stärker, wenn die Likes zu den Views passen. Likes gelten nur für dieses eine Video.',
      },
      how: {
        q: 'Was brauchen Sie für eine Bestellung?',
        a: 'Den öffentlichen Videolink. Die Likes gelten nur für dieses Video. Für mehrere Videos bestellen Sie pro Link.',
      },
    },
    {
      slug: 'buy-tiktok-views',
      platform: 'tiktok',
      metric: 'views',
      title: {
        lead: '',
        highlight: 'TikTok Views',
        tail: 'kaufen',
      },
      intro: 'Erhöhen Sie die View-Zahl eines öffentlichen TikTok-Videos. Eine niedrige Zahl kann ein gutes Video ignoriert wirken lassen, besonders bei neuen Uploads.',
      bullets: [
        'High-Quality- oder Premium-Views',
        'Videolink einfügen',
        'Pakete ab {fromPrice}',
        'Start meist innerhalb von 6–8 Stunden',
        'Schrittweise Lieferung auf Wunsch',
        '6 Monate Nachfüllung ab Lieferung',
      ],
      cta: 'TikTok Views kaufen',
      why: {
        q: 'Warum sind TikTok Views wichtig?',
        a: 'TikTok zeigt die View-Zahl in Ihrem Profilraster unter jedem Video. Ein Raster mit niedrigen Zahlen kann ein Konto inaktiv wirken lassen. Auf die For-You-Seite bringen Views ein Video nicht: Das entscheidet TikTok danach, wie Menschen zuschauen und reagieren.',
      },
      how: {
        q: 'Was brauchen Sie für eine Bestellung?',
        a: 'Den öffentlichen Videolink. Wählen Sie auf der Service-Seite High Quality oder Premium und lassen Sie das Video bis zum Ende der Lieferung öffentlich.',
      },
    },
  ],
  why: {
    id: 'why-novalikes',
    title: {
      lead: 'Warum',
      highlight: 'NovaLikes?',
    },
    intro: 'Viele Seiten verkaufen Follower und Likes. Das können Sie von uns erwarten.',
    items: [
      {
        title: 'Klare Antworten vor dem Kauf',
        icon: 'badge-check',
        body: 'Jede Service-Seite sagt genau, was ein Paket verändert und was nicht. Wir sagen Ihnen auch, wenn ein anderer Service besser passt, etwa Facebook Follower statt Seiten-Likes.',
      },
      {
        title: 'Ein echtes, erreichbares Unternehmen',
        icon: 'building',
        body: 'NovaLikes wird von der DMRUSH LIMITED betrieben, einem in Schottland registrierten Unternehmen (Nr. SC876437). Das Team bearbeitet seit 7–8 Jahren Social-Media-Bestellungen, zuerst als ViralMe und heute als NovaLikes, und ist auf WhatsApp (+44 7454 758272) rund um die Uhr erreichbar.',
      },
    ],
  },
  promises: {
    id: 'our-promises',
    title: {
      lead: 'Unsere',
      highlight: 'Versprechen',
    },
    intro: 'Diese vier Versprechen gelten für jede Bestellung auf Instagram, TikTok und Facebook.',
    items: [
      {
        key: 'password',
        title: 'Nie ein Passwort',
        body: 'Wir brauchen nur einen öffentlichen Benutzernamen oder Link. Wer nach Ihren Zugangsdaten fragt, egal auf welcher Seite, dem sollten Sie Ihr Konto nicht anvertrauen.',
        icon: 'shield',
        chip: 'Nur öffentlicher Link',
      },
      {
        key: 'speed',
        title: 'Start in 6–8 Stunden',
        body: 'Die meisten Bestellungen starten innerhalb von 6–8 Stunden nach der Zahlung und sind 4–6 Stunden nach dem Start abgeschlossen. Lieber langsamer? Bitten Sie im Bestellhinweis um schrittweise Lieferung.',
        icon: 'clock',
        chip: '6–8 Stunden',
      },
      {
        key: 'refill',
        title: '6 Monate Nachfüllung',
        body: 'Sinkt die Zahl innerhalb von 6 Monaten nach der Lieferung, schicken Sie Ihre Bestellnummer per WhatsApp, und wir füllen nach. Lassen Sie Profil oder Beitrag während der Nachfüllung öffentlich.',
        icon: 'refresh-cw',
        chip: '6 Monate',
      },
      {
        key: 'support',
        title: 'WhatsApp-Support 24/7',
        body: 'Schreiben Sie an +44 7454 758272, vor oder nach der Bestellung. Jede Bestellung können Sie auch auf der Seite „Bestellung verfolgen“ oder in Ihrem kostenlosen Kundenkonto verfolgen.',
        icon: 'message-circle',
        chip: '24/7',
      },
    ],
  },
  faq: {
    id: 'before-you-buy',
    title: {
      lead: 'Vor dem',
      highlight: 'Kauf',
    },
    intro: 'Die häufigsten Fragen vor der ersten Bestellung.',
    items: [
      {
        question: 'Mit welchem Service sollte ich anfangen?',
        answer: 'Mit der Zahl, die Besucher zuerst sehen. Wirkt Ihr Profil leer, sind es Follower. Für einen Beitrag oder ein Video, das Sie bewerben, sind es Likes oder Views auf genau diesem Beitrag.',
      },
      {
        question: 'Brauchen Sie mein Instagram- oder TikTok-Passwort?',
        answer: 'Nein. Für Follower brauchen wir Ihren öffentlichen Benutzernamen, für Likes, Views und Kommentare den öffentlichen Beitrags- oder Videolink. Geben Sie Ihr Passwort nie an einen Wachstums-Service weiter.',
      },
      {
        question: 'Muss mein Konto öffentlich sein?',
        answer: 'Ja, während der Lieferung. Ein privates Konto oder ein privater Beitrag kann die Lieferung stoppen. Danach können Sie wieder auf privat stellen.',
      },
      {
        question: 'Wie schnell startet meine Bestellung?',
        answer: 'Die meisten Bestellungen starten innerhalb von 6–8 Stunden nach bestätigter Zahlung und sind 4–6 Stunden nach dem Start abgeschlossen. Für ein langsameres Tempo bitten Sie im Bestellhinweis oder auf WhatsApp um schrittweise Lieferung.',
      },
      {
        question: 'Was passiert, wenn die Zahlen sinken?',
        answer: 'Jede Bestellung enthält 6 Monate Nachfüllung ab dem Liefertermin. Schreiben Sie uns auf WhatsApp (+44 7454 758272) mit Ihrer Bestellnummer, und wir füllen nach.',
      },
      {
        question: 'Kann der Kauf meinem Konto schaden?',
        answer: 'Die Regeln von Instagram und TikTok erlauben keinen Kauf von Interaktionen, und beide Plattformen können Aktivitäten entfernen, die sie für unecht halten. NovaLikes fragt nie nach Ihrem Passwort, aber kein Anbieter kann beeinflussen, wie eine Plattform ein Konto behandelt. Lesen Sie die Regeln der Plattform vor der Bestellung.',
      },
    ],
  },
  getStarted: {
    id: 'get-started',
    title: {
      lead: 'Jetzt',
      highlight: 'starten',
    },
    body: 'Wählen Sie unten eine Plattform. Jede Service-Seite zeigt die Pakete, den Preis in US-Dollar und genau, was Sie für eine Bestellung brauchen.',
    tools: {
      title: 'Kostenlose Tools',
      links: [
        {
          label: 'Instagram-Follower-Zähler',
          href: '/tools/instagram-follower-counter',
        },
        {
          label: 'Instagram-Profilanzeige',
          href: '/tools/instagram-profile-viewer',
        },
        {
          label: 'Instagram-Profilbild-Anzeige',
          href: '/tools/instagram-profile-picture-viewer',
        },
        {
          label: 'TikTok-Video-Downloader',
          href: '/tools/tiktok-video-downloader',
        },
        {
          label: 'Facebook-Video-Downloader',
          href: '/tools/facebook-video-downloader',
        },
      ],
    },
    guides: {
      title: '',
      links: [],
      cta: {
        label: '',
        href: '',
      },
    },
  },
  stickyCta: {
    label: 'Service wählen',
    href: '#homepage-hero',
  },
} as const;
