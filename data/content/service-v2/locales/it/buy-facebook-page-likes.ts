import type { ServiceV2Content } from '../../types';

/** Italian (/it) — v2 service page copy for buy-facebook-page-likes. Primary keyword: "comprare like pagina facebook". Do not edit wording without the content owner. */
export const IT_BUY_FACEBOOK_PAGE_LIKES_V2 = {
  meta: {
    slug: 'buy-facebook-page-likes',
    platform: 'Facebook',
    name: 'Like per Pagina Facebook',
    unit: 'like',
    unitSingular: 'like',
    inputKind: 'link',
    perUnit: 1000,
    tiers: false,
    keywords: {
      primary: 'comprare like pagina facebook',
      secondary: [
        'comprare like facebook',
        'comprare mi piace pagina facebook',
        'prezzi like pagina facebook',
        'like per fanpage facebook',
      ],
      questions: [
        'differenza tra like alla pagina e follower',
        'la mia pagina mostra ancora i like',
        'quanto costano i like alla pagina',
        'è sicuro comprare like facebook',
        'serve l’accesso da amministratore',
      ],
    },
  },
  hero: {
    title: {
      lead: 'Comprare',
      highlight: 'like per Pagina Facebook',
      tail: 'con un numero che si nota',
    },
    subtitle: 'Se la tua Pagina mostra ancora i «Mi piace» sotto il nome, è una delle prime cose che vedono i visitatori. Fallo salire da {fromPrice}, con il solo link della Pagina.',
    trust: [
      'Nessuna password',
      'Avvio in 6–8 ore',
      'Refill di 6 mesi',
    ],
  },
  picker: {
    id: 'pricing-packages',
    title: 'Pacchetti di like per Pagina Facebook e prezzi',
    intro: 'Scegli un pacchetto. Prezzi in USD.',
    summaryName: '{quantity} like per Pagina Facebook',
    save: 'Risparmi',
    cta: 'Aggiungi al carrello',
    oneTime: 'Acquisto unico. Nessun abbonamento.',
    secure: 'Pagamento sicuro',
    methods: [
      'Carta',
      'Apple Pay',
      'Google Pay',
    ],
    features: [
      {
        icon: 'shield',
        title: 'Nessuna password',
        body: 'Basta il link',
      },
      {
        icon: 'clock',
        title: 'Avvio in 6–8 ore',
        body: 'Fine 4–6 ore dopo',
      },
      {
        icon: 'message-square',
        title: 'Ti aiutiamo noi',
        body: '24/7 su WhatsApp',
      },
    ],
  },
  why: {
    id: 'why-choose-novalikes',
    title: {
      lead: 'Perché scegliere NovaLikes per',
      highlight: 'i tuoi like per Pagina Facebook?',
    },
    items: [
      {
        icon: 'shield',
        tone: 'mint',
        title: 'Un link, nessun accesso da amministratore',
        body: 'Ci serve solo il link pubblico della tua Pagina. Nessuna password, nessun ruolo da amministratore e nessun accesso al tuo account.',
      },
      {
        icon: 'clock',
        tone: 'sun',
        title: 'Tempi chiari di avvio e fine',
        body: 'La maggior parte degli ordini parte entro 6–8 ore dal pagamento e termina 4–6 ore dopo l’avvio. Preferisci un ritmo più lento? Chiedi la consegna graduale.',
      },
      {
        icon: 'refresh-cw',
        tone: 'lilac',
        title: 'Refill di 6 mesi',
        body: 'Se i like del tuo ordine calano entro 6 mesi dalla consegna, mandaci il numero d’ordine e reintegriamo la differenza gratis.',
      },
      {
        icon: 'badge-check',
        tone: 'peach',
        title: 'Garanzia di rimborso di 30 giorni',
        body: 'Gli ordini idonei sono coperti per 30 giorni dalla data di acquisto. La nostra politica di rimborso spiega cosa è incluso.',
      },
      {
        icon: 'thumbs-up',
        tone: 'pink',
        title: 'Per le Pagine con i like',
        body: 'I like alla Pagina servono alle Pagine che mostrano ancora i like sotto il nome. Le Pagine nuove mostrano i follower, quindi controlla prima la tua.',
      },
    ],
    promo: {
      eyebrow: 'Non sai quale pacchetto scegliere?',
      title: 'Chiedici prima di comprare',
      cta: 'Scrivici su WhatsApp',
    },
  },
  steps: {
    id: 'how-it-works',
    title: {
      lead: 'Come comprare',
      highlight: 'like per Pagina Facebook',
    },
    pill: 'Circa 2 minuti',
    intro: 'Ordinare richiede cinque brevi passaggi e circa due minuti. Controlla che la tua Pagina mostri i like e incolla il suo link pubblico.',
    items: [
      {
        ui: 'public',
        title: 'Controlla che la Pagina mostri i like',
        body: 'Apri la tua Pagina in una finestra privata. Se vedi «Mi piace» sotto il nome, i like alla Pagina vanno bene. Solo follower? Scegli i follower Facebook.',
      },
      {
        ui: 'packages',
        title: 'Scegli un pacchetto',
        body: 'Scegli una quantità tra i pacchetti qui sopra. Ogni pacchetto mostra il prezzo prima che tu decida.',
      },
      {
        ui: 'cart',
        title: 'Aggiungilo al carrello',
        body: 'Tocca «Aggiungi al carrello» e prosegui al pagamento.',
      },
      {
        ui: 'username',
        title: 'Incolla il link della Pagina',
        body: 'Copia il link pubblico della tua Pagina, per esempio facebook.com/tuapagina. I like alla Pagina funzionano solo sulle Pagine, non sui profili personali.',
      },
      {
        ui: 'pay',
        title: 'Paga in modo sicuro',
        body: 'Paghi una sola volta con carta, Apple Pay o Google Pay, in dollari statunitensi. Nessun abbonamento.',
      },
    ],
    done: {
      title: 'Fatto!',
      count: 1000,
      unit: 'like',
      body: 'La maggior parte degli ordini parte entro 6–8 ore dal pagamento e termina 4–6 ore dopo l’avvio. Segui l’avanzamento nella pagina «Traccia ordine» con il tuo numero d’ordine.',
    },
  },
  ui: {
    toggle: {
      label: 'Pagina non pubblicata',
      sub: 'Disattivato per essere trovata',
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
      placeholder: 'facebook.com/tuapagina',
    },
    safeChips: [
      'Basta il link',
      'Pagamento sicuro',
    ],
    privacyTags: [
      'link',
      'email',
    ],
  },
  compare: {
    id: 'spot-a-risky-seller',
    title: {
      lead: 'Come riconoscere un venditore poco affidabile di',
      highlight: 'like per Pagina Facebook',
    },
    intro: 'Ovunque tu compri, controlla prima questi sette punti.',
    us: 'NovaLikes',
    them: 'Venditori poco affidabili',
    rows: [
      {
        label: 'Dati di accesso',
        novalikes: 'Basta il link della Pagina',
        riskySeller: 'Chiedono la password',
      },
      {
        label: 'Tempi',
        novalikes: 'Avvio in 6–8 ore',
        riskySeller: 'Nessun tempo indicato',
      },
      {
        label: 'Cali',
        novalikes: 'Refill di 6 mesi',
        riskySeller: 'Nessun refill',
      },
      {
        label: 'Rimborsi',
        novalikes: 'Rimborso entro 30 giorni*',
        riskySeller: 'Nessuna politica scritta',
      },
      {
        label: 'Assistenza',
        novalikes: 'WhatsApp 24/7',
        riskySeller: 'Difficili da contattare',
      },
      {
        label: 'Prezzo',
        novalikes: 'In USD, visibile prima',
        riskySeller: 'Cambia al pagamento',
      },
      {
        label: 'Tracciamento',
        novalikes: 'Pagina «Traccia ordine»',
        riskySeller: 'Nessun modo di verificare',
      },
    ],
    note: '*Per gli ordini idonei, secondo la nostra politica di rimborso.',
  },
  promises: {
    id: 'our-promises',
    title: 'Refill e garanzia di rimborso per i tuoi like per Pagina Facebook',
    intro: 'Entrambe le promesse sono scritte nella nostra politica di rimborso, non solo in questa pagina.',
    cards: [
      {
        chip: '6 mesi',
        title: 'Refill di 6 mesi',
        image: '/assets/images/illustrations/facebook-page-likes/facebook-page-likes-order-process.webp',
        body: 'Se i like del tuo ordine calano entro 6 mesi dalla data di consegna, scrivici su WhatsApp o via email con il numero d’ordine e reintegriamo la differenza gratis. Mantieni lo stesso URL della Pagina e la Pagina pubblica mentre consegniamo un refill.',
      },
      {
        chip: '30 giorni',
        title: 'Garanzia di rimborso di 30 giorni',
        image: '/assets/images/illustrations/facebook-page-likes/facebook-page-likes-package-cta.webp',
        body: 'Gli ordini idonei possono essere rimborsati entro 30 giorni dall’acquisto. La politica di rimborso spiega cosa è idoneo e come fare richiesta.',
      },
    ],
    link: {
      label: 'Leggi la politica di rimborso',
      href: '/refund-policy',
    },
  },
  cost: {
    id: 'facebook-page-likes-cost',
    title: {
      lead: 'Quanto costano i',
      highlight: 'like per Pagina Facebook?',
    },
    intro: 'I like alla Pagina partono da {fromPrice} per 100, e il prezzo per like scende nei pacchetti grandi. Ogni prezzo è un pagamento unico in dollari statunitensi per una Pagina.',
    points: [
      'Il refill di 6 mesi è incluso. Non devi aggiungere nulla.',
      'Prezzi in dollari statunitensi. La tua banca converte nella tua valuta e alcune carte applicano una commissione.',
      'Nessun abbonamento né rinnovo. Paghi una volta per ordine.',
    ],
    cols: [
      'Pacchetto',
      'Prezzo',
      'Per 1.000',
    ],
    best: 'Miglior prezzo',
    note: 'I prezzi vengono dai nostri pacchetti attuali. Il prezzo che vedi al pagamento è quello che paghi.',
  },
  whyBuy: {
    id: 'why-buy-facebook-page-likes',
    title: {
      lead: 'Perché comprare',
      highlight: 'like per Pagina Facebook?',
    },
    intro: 'Molte attività consolidate hanno creato la loro Pagina Facebook anni fa, e mostra ancora i like. Se il numero è basso, anche un’attività conosciuta sembra piccola.',
    items: [
      {
        title: 'Una Pagina vecchia che sembra attuale',
        body: 'Una Pagina di anni fa con 80 like può sembrare dimenticata. I like rinnovano quella prima impressione.',
      },
      {
        title: 'Fiducia nel confronto',
        body: 'Chi confronta due attività della zona guarda spesso quale Pagina sembra più popolare.',
      },
      {
        title: 'Una base migliore per gli annunci',
        body: 'Le Pagine che fanno pubblicità su Facebook sono più credibili quando i like sono all’altezza della spesa.',
      },
    ],
    diagram: [
      'Sembra attuale',
      'Vince il confronto',
      'Pronta per gli annunci',
    ],
  },
  help: {
    id: 'does-buying-facebook-page-likes-help',
    title: {
      lead: 'Serve davvero comprare',
      highlight: 'like per Pagina Facebook?',
    },
    intro: 'I like alla Pagina cambiano il numero di una Pagina in formato classico. Ecco cosa fanno e cosa no.',
    no: {
      title: 'Cosa non cambia',
      items: [
        'Le reazioni a singoli post',
        'La tua portata organica da sola',
        'Le Pagine che mostrano solo i follower (scegli i follower)',
      ],
    },
    yes: {
      title: 'Cosa cambia',
      items: [
        'I like sotto il nome della tua Pagina',
        'Quanto appare popolare la Pagina ai nuovi visitatori',
        'La prima impressione nel confronto con altre attività',
      ],
      image: '/assets/images/illustrations/facebook-page-likes/facebook-page-likes-does-help.webp',
      altFallback: 'Illustrazione: like per Pagina Facebook',
    },
  },
  who: {
    id: 'who-orders',
    title: {
      lead: 'Chi compra',
      highlight: 'like per Pagina Facebook',
    },
    cards: [
      {
        title: 'Attività consolidate',
        body: 'Ristoranti, vivai e aziende di famiglia con Pagine vecchie aggiungono like perché il numero sia all’altezza della loro reputazione.',
        image: '/assets/images/illustrations/facebook-page-likes/facebook-page-likes-best-practices.webp',
      },
      {
        title: 'Negozi e saloni',
        body: 'Negozi e saloni fanno salire i like prima di un periodo intenso, come Natale o i saldi.',
        image: '/assets/images/illustrations/facebook-page-likes/facebook-page-likes-hero.webp',
      },
      {
        title: 'Agenzie',
        body: 'Le agenzie sistemano le Pagine dei clienti prima di una campagna o di un rebranding, spesso con consegna graduale.',
        image: '/assets/images/illustrations/facebook-page-likes/facebook-page-likes-why-buy.webp',
      },
    ],
    statement: 'Qualunque sia la Pagina, l’ordine funziona allo stesso modo: il link pubblico della tua Pagina, un pacchetto adatto e like che di solito partono entro 6–8 ore. Senza accesso da amministratore.',
  },
  vs: {
    id: 'facebook-page-likes-vs-other-services',
    title: {
      lead: 'Like alla Pagina o',
      highlight: 'follower e like ai post',
    },
    intro: 'Ogni servizio cambia un numero diverso. Scegli quello che corrisponde a ciò che vuoi far vedere.',
    cols: [
      'Servizio',
      'Cosa cambia',
      'Cosa ci serve',
      'Da',
    ],
    rows: [
      {
        slug: 'buy-facebook-page-likes',
        label: 'Like alla Pagina',
        changes: 'I like di una Pagina in formato classico',
        needs: 'Un link alla Pagina',
        current: true,
      },
      {
        slug: 'buy-facebook-followers',
        label: 'Follower',
        changes: 'I follower di una Pagina o di un profilo',
        needs: 'Un link alla Pagina o al profilo',
      },
      {
        slug: 'buy-facebook-post-likes',
        label: 'Like ai post',
        changes: 'Le reazioni a un post pubblico',
        needs: 'Un link al post',
      },
    ],
    currentLabel: 'Questa pagina',
  },
  safe: {
    id: 'is-it-safe',
    title: {
      lead: 'È sicuro comprare',
      highlight: 'like per Pagina Facebook?',
    },
    lead: 'Dipende da tre cose: il tuo account, il tuo pagamento e la tua privacy. Ecco come funziona ognuna con NovaLikes, più l’unico rischio che nessun venditore può eliminare.',
    body: 'Gli Standard della community di Facebook vietano i comportamenti non autentici, e Meta rimuove regolarmente gli account falsi o inattivi. Per questo dopo la consegna può esserci un piccolo calo, e per questo ogni ordine include 6 mesi di refill.',
    cards: [
      {
        ui: 'nopass',
        title: 'Sicurezza dell’account',
        body: 'Ci serve solo il link pubblico della tua Pagina: nessuno accede e non servono permessi da amministratore. Non chiediamo mai una password o un codice di accesso. Se qualcuno che dice di essere NovaLikes te lo chiede, non siamo noi.',
      },
      {
        ui: 'pay',
        title: 'Sicurezza del pagamento',
        body: 'Paghi una sola volta con un pagamento sicuro tramite carta, Apple Pay o Google Pay, in dollari statunitensi. Nessun abbonamento e nulla si rinnova.',
      },
      {
        ui: 'privacy',
        title: 'Privacy',
        body: 'Il tuo link e la tua email servono solo a gestire l’ordine e a inviarti aggiornamenti, come spiega la nostra [informativa sulla privacy](/privacy-policy).',
      },
    ],
  },
  before: {
    id: 'delivery-and-safety',
    title: {
      lead: 'Prima di comprare',
      highlight: 'like per Pagina Facebook',
    },
    lead: 'Controlla questi quattro punti una volta e il tuo ordine andrà liscio.',
    items: [
      {
        title: 'La Pagina mostra i like',
        body: 'Controllalo in una finestra privata. Se mostra solo i follower, i like alla Pagina non si vedranno: scegli i follower.',
      },
      {
        title: 'È una Pagina, non un profilo',
        body: 'I like alla Pagina funzionano solo sulle Pagine Facebook. I profili personali hanno bisogno di follower.',
      },
      {
        title: 'La Pagina è pubblicata',
        body: 'Una Pagina non pubblicata o con limitazioni impedisce l’avvio.',
      },
      {
        title: 'L’URL non cambia',
        body: 'Mantieni lo stesso indirizzo durante la consegna e i 6 mesi di refill.',
      },
    ],
  },
  faq: {
    id: 'faq',
    kicker: 'Domande prima di ordinare?',
    title: 'Domande frequenti sui like per Pagina Facebook',
    intro: 'Non trovi la risposta? Scrivici su WhatsApp al +44 7454 758272, 24/7.',
    cta: 'Chiedici su WhatsApp',
    locale: {
      code: 'it',
    },
    extra: [
      {
        id: 'it-fb-page-likes-v2-1',
        question: 'La mia Pagina mostra solo i follower. Cosa ordino?',
        answer: 'I follower Facebook. Le Pagine nuove mostrano i follower al posto dei like, quindi i like alla Pagina non si vedrebbero.',
      },
      {
        id: 'it-fb-page-likes-v2-2',
        question: 'Posso chiedere un rimborso?',
        answer: 'Gli ordini idonei sono coperti dalla nostra garanzia di rimborso di 30 giorni, a partire dalla data di acquisto. La politica di rimborso spiega quali ordini sono idonei e come inviare la richiesta.',
      },
      {
        id: 'it-fb-page-likes-v2-3',
        question: 'Quali metodi di pagamento posso usare?',
        answer: 'Puoi pagare con carta, Apple Pay o Google Pay, in dollari statunitensi. È un pagamento unico e nulla si rinnova.',
      },
    ],
  },
  more: {
    id: 'related-services',
    title: 'Altri servizi NovaLikes',
    intro: 'I like per Pagina Facebook cambiano un solo numero. Per farne crescere un altro, scegli un servizio.',
    services: [
      {
        slug: 'buy-facebook-followers',
        title: 'Comprare follower Facebook',
        line: 'Per Pagine e profili pubblici',
        image: '/assets/images/illustrations/facebook-followers/facebook-followers-hero.webp',
      },
      {
        slug: 'buy-facebook-post-likes',
        title: 'Comprare like per post Facebook',
        line: 'Reazioni a un post pubblico',
        image: '/assets/images/illustrations/facebook-post-likes/facebook-post-likes-hero.webp',
      },
      {
        slug: 'buy-instagram-followers',
        title: 'Comprare follower Instagram',
        line: 'Fai crescere il tuo profilo',
        image: '/assets/images/illustrations/instagram-followers/instagram-followers-hero.webp',
      },
    ],
    cardPrice: 'Da {fromPrice}',
    guidesTitle: '',
    guides: [],
  },
  sticky: {
    label: 'Scegli un pacchetto',
    href: '#pricing-packages',
  },
  whatsapp: {
    display: '+44 7454 758272',
    href: 'https://wa.me/447454758272',
  },
} satisfies ServiceV2Content;
