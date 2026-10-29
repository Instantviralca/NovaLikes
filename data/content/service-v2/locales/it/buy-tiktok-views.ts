import type { ServiceV2Content } from '../../types';

/** Italian (/it) — v2 service page copy for buy-tiktok-views. Primary keyword: "comprare visualizzazioni tiktok". Do not edit wording without the content owner. */
export const IT_BUY_TIKTOK_VIEWS_V2 = {
  meta: {
    slug: 'buy-tiktok-views',
    platform: 'TikTok',
    name: 'Visualizzazioni TikTok',
    unit: 'visualizzazioni',
    unitSingular: 'visualizzazione',
    inputKind: 'link',
    perUnit: 1000,
    tiers: true,
    keywords: {
      primary: 'comprare visualizzazioni tiktok',
      secondary: [
        'comprare views tiktok',
        'pacchetti visualizzazioni tiktok',
        'prezzi visualizzazioni tiktok',
        'comprare visualizzazioni per un video tiktok',
      ],
      questions: [
        'è sicuro comprare visualizzazioni tiktok',
        'quanto costano le visualizzazioni tiktok',
        'contano per creator rewards',
        'high quality o premium',
        'perché il mio tiktok ha 0 visualizzazioni',
      ],
    },
  },
  hero: {
    title: {
      lead: 'Comprare',
      highlight: 'visualizzazioni TikTok',
      tail: 'per una partenza più forte',
    },
    subtitle: 'Un video nuovo con poche centinaia di visualizzazioni viene superato in fretta, per quanto sia buono. Dagli un numero più forte fin dall’inizio. Visualizzazioni High Quality o Premium da {fromPrice}.',
    trust: [
      'Nessuna password',
      'Avvio in 6–8 ore',
      'Refill di 6 mesi',
    ],
  },
  picker: {
    id: 'pricing-packages',
    title: 'Pacchetti di visualizzazioni TikTok e prezzi',
    intro: 'Scegli un livello e un pacchetto. Prezzi in USD.',
    summaryName: '{quantity} visualizzazioni TikTok {tier}',
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
    tiers: [
      {
        label: 'High Quality',
        note: 'Il nostro prezzo più basso per visualizzazione.',
      },
      {
        label: 'Premium',
        note: 'La nostra opzione di visualizzazioni di fascia alta.',
      },
    ],
  },
  why: {
    id: 'why-choose-novalikes',
    title: {
      lead: 'Perché scegliere NovaLikes per',
      highlight: 'le tue visualizzazioni TikTok?',
    },
    items: [
      {
        icon: 'shield',
        tone: 'mint',
        title: 'Un link, mai la tua password',
        body: 'Ci serve solo il link pubblico del video. Nessun codice di accesso e nessun login nel tuo account.',
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
        body: 'Se le visualizzazioni del tuo ordine calano entro 6 mesi dalla consegna, mandaci il numero d’ordine e reintegriamo la differenza gratis.',
      },
      {
        icon: 'badge-check',
        tone: 'peach',
        title: 'Garanzia di rimborso di 30 giorni',
        body: 'Gli ordini idonei sono coperti per 30 giorni dalla data di acquisto. La nostra politica di rimborso spiega cosa è incluso.',
      },
      {
        icon: 'layers',
        tone: 'pink',
        title: 'Due livelli di qualità',
        body: 'High Quality è il nostro prezzo più basso per visualizzazione e Premium la nostra opzione di fascia alta. Entrambi hanno gli stessi tempi e 6 mesi di refill.',
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
      highlight: 'visualizzazioni TikTok',
    },
    pill: 'Circa 2 minuti',
    intro: 'Ordinare richiede cinque brevi passaggi. Scegli High Quality o Premium, una quantità, e incolla il link a un video pubblico.',
    items: [
      {
        ui: 'public',
        title: 'Tieni il video pubblico',
        body: 'Il video deve essere pubblico, su un account pubblico, fino alla fine della consegna. Non eliminarlo.',
      },
      {
        ui: 'packages',
        title: 'Scegli livello e pacchetto',
        body: 'Scegli High Quality o Premium e poi una quantità. Ogni pacchetto mostra il prezzo prima che tu decida.',
      },
      {
        ui: 'cart',
        title: 'Aggiungilo al carrello',
        body: 'Tocca «Aggiungi al carrello» e prosegui al pagamento.',
      },
      {
        ui: 'username',
        title: 'Incolla il link del video',
        body: 'Apri il video su TikTok, tocca «Condividi», scegli «Copia link» e incollalo al pagamento.',
      },
      {
        ui: 'pay',
        title: 'Paga in modo sicuro',
        body: 'Paghi una sola volta con carta, Apple Pay o Google Pay, in dollari statunitensi. Nessun abbonamento.',
      },
    ],
    done: {
      title: 'Fatto!',
      count: 10000,
      unit: 'visualizzazioni',
      body: 'La maggior parte degli ordini parte entro 6–8 ore dal pagamento e termina 4–6 ore dopo l’avvio. Segui l’avanzamento nella pagina «Traccia ordine» con il tuo numero d’ordine.',
    },
  },
  ui: {
    toggle: {
      label: 'Video privato',
      sub: 'Disattivato per raggiungere il video',
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
      highlight: 'visualizzazioni TikTok',
    },
    intro: 'Ovunque tu compri, controlla prima questi sette punti.',
    us: 'NovaLikes',
    them: 'Venditori poco affidabili',
    rows: [
      {
        label: 'Dati di accesso',
        novalikes: 'Basta il link del video',
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
    title: 'Refill e garanzia di rimborso per le tue visualizzazioni TikTok',
    intro: 'Entrambe le promesse sono scritte nella nostra politica di rimborso, non solo in questa pagina.',
    cards: [
      {
        chip: '6 mesi',
        title: 'Refill di 6 mesi',
        image: '/assets/images/illustrations/tiktok-views/tiktok-views-order-process.webp',
        body: 'Se le visualizzazioni del tuo ordine calano entro 6 mesi dalla data di consegna, scrivici su WhatsApp o via email con il numero d’ordine e reintegriamo la differenza gratis. Lascia il video online e pubblico mentre consegniamo un refill.',
      },
      {
        chip: '30 giorni',
        title: 'Garanzia di rimborso di 30 giorni',
        image: '/assets/images/illustrations/tiktok-views/tiktok-views-package-cta.webp',
        body: 'Gli ordini idonei possono essere rimborsati entro 30 giorni dall’acquisto. La politica di rimborso spiega cosa è idoneo e come fare richiesta.',
      },
    ],
    link: {
      label: 'Leggi la politica di rimborso',
      href: '/refund-policy',
    },
  },
  cost: {
    id: 'tiktok-views-cost',
    title: {
      lead: 'Quanto costano le',
      highlight: 'visualizzazioni TikTok?',
    },
    intro: 'Le visualizzazioni partono da {fromPrice}. High Quality ha il prezzo più basso per 1.000 e Premium costa un po’ di più. Ogni prezzo è un pagamento unico in dollari statunitensi per un video.',
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
    id: 'why-buy-tiktok-views',
    title: {
      lead: 'Perché comprare',
      highlight: 'visualizzazioni TikTok?',
    },
    intro: 'Su TikTok si scorre in fretta, e il numero di visualizzazioni è una delle poche cose che si notano prima di decidere. Le visualizzazioni fanno sembrare un video nuovo già guardato.',
    items: [
      {
        title: 'Video nuovi che non partono da zero',
        body: 'Un video appena pubblicato con un numero solido merita qualche secondo di attenzione.',
      },
      {
        title: 'Annunci che convincono',
        body: 'I video prodotto e promozionali convincono di più quando il numero mostra che sono stati visti.',
      },
      {
        title: 'Un portfolio più solido',
        body: 'I creator che si propongono ai brand possono mostrare video con buone visualizzazioni.',
      },
    ],
    diagram: [
      'Non da zero',
      'Annunci',
      'Portfolio',
    ],
  },
  help: {
    id: 'does-buying-tiktok-views-help',
    title: {
      lead: 'Serve davvero comprare',
      highlight: 'visualizzazioni TikTok?',
    },
    intro: 'Le visualizzazioni cambiano il numero di un video. Ciò che TikTok spinge dipende sempre dal tempo di visione e dalle reazioni degli spettatori.',
    no: {
      title: 'Cosa non cambia',
      items: [
        'Tempo di visione, like o condivisioni da soli',
        'Il posizionamento nei Per te da solo',
        'Guadagni da Creator Rewards',
      ],
    },
    yes: {
      title: 'Cosa cambia',
      items: [
        'Le visualizzazioni del video che scegli',
        'Quanto appare visto il video ai nuovi spettatori',
        'La prima impressione di lanci e promozioni',
      ],
      image: '/assets/images/illustrations/tiktok-views/tiktok-views-does-help.webp',
      altFallback: 'Illustrazione: visualizzazioni TikTok',
    },
  },
  who: {
    id: 'who-orders',
    title: {
      lead: 'Chi compra',
      highlight: 'visualizzazioni TikTok',
    },
    cards: [
      {
        title: 'Attività locali',
        body: 'Ristoranti, saloni e officine aggiungono visualizzazioni ai video promozionali che condividono in bio, annunci e su WhatsApp.',
        image: '/assets/images/illustrations/tiktok-views/tiktok-views-best-practices.webp',
      },
      {
        title: 'Creator di nicchia',
        body: 'I creator aggiungono visualizzazioni a nuovi formati e all’inizio di nuove serie, mentre scoprono cosa piace al loro pubblico.',
        image: '/assets/images/illustrations/tiktok-views/tiktok-views-hero.webp',
      },
      {
        title: 'Agenzie',
        body: 'Le agenzie aggiungono visualizzazioni ai video di lancio delle campagne, spesso con consegna graduale.',
        image: '/assets/images/illustrations/tiktok-views/tiktok-views-why-buy.webp',
      },
    ],
    statement: 'Qualunque sia il video, l’ordine funziona allo stesso modo: un link pubblico, il livello e la quantità che scegli, e visualizzazioni che di solito partono entro 6–8 ore. Senza login.',
  },
  vs: {
    id: 'tiktok-views-vs-other-services',
    title: {
      lead: 'Visualizzazioni TikTok o',
      highlight: 'like e follower',
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
        slug: 'buy-tiktok-views',
        label: 'Visualizzazioni',
        changes: 'Le visualizzazioni di un video',
        needs: 'Un link al video pubblico',
        current: true,
      },
      {
        slug: 'buy-tiktok-followers',
        label: 'Follower',
        changes: 'Il numero di follower del tuo profilo',
        needs: 'Il tuo username pubblico',
      },
      {
        slug: 'buy-tiktok-likes',
        label: 'Like',
        changes: 'I like di un video',
        needs: 'Un link al video pubblico',
      },
    ],
    currentLabel: 'Questa pagina',
  },
  safe: {
    id: 'is-it-safe',
    title: {
      lead: 'È sicuro comprare',
      highlight: 'visualizzazioni TikTok?',
    },
    lead: 'Dipende da tre cose: il tuo account, il tuo pagamento e la tua privacy. Ecco come funziona ognuna con NovaLikes, più l’unico rischio che nessun venditore può eliminare.',
    body: 'Le Linee guida della community di TikTok vietano le interazioni false, e Creator Rewards paga solo le visualizzazioni che TikTok considera valide. Quindi non comprare mai visualizzazioni per guadagnare. TikTok rimuove anche gli account inattivi: dopo la consegna può esserci un piccolo calo, e ogni ordine include 6 mesi di refill.',
    cards: [
      {
        ui: 'nopass',
        title: 'Sicurezza dell’account',
        body: 'Ci serve solo il link pubblico del video: nessuno accede al tuo account e nulla viene modificato. Non chiediamo mai una password o un codice di accesso. Se qualcuno che dice di essere NovaLikes te lo chiede, non siamo noi.',
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
      highlight: 'visualizzazioni TikTok',
    },
    lead: 'Controlla questi quattro punti una volta e il tuo ordine andrà liscio.',
    items: [
      {
        title: 'Il video è pubblico',
        body: 'Le visualizzazioni non arrivano a un video privato né a un video di un account privato.',
      },
      {
        title: 'Il link è quello del video',
        body: 'Copialo da «Condividi», non il link del tuo profilo.',
      },
      {
        title: 'Il video resta online',
        body: 'Tienilo online durante la consegna e i 6 mesi di refill.',
      },
      {
        title: 'Hai scelto un livello',
        body: 'High Quality è il prezzo più basso per visualizzazione e Premium l’opzione di fascia alta. Dubbi? Chiedici su WhatsApp.',
      },
    ],
  },
  faq: {
    id: 'faq',
    kicker: 'Domande prima di ordinare?',
    title: 'Domande frequenti sulle visualizzazioni TikTok',
    intro: 'Non trovi la risposta? Scrivici su WhatsApp al +44 7454 758272, 24/7.',
    cta: 'Chiedici su WhatsApp',
    locale: {
      code: 'it',
    },
    extra: [
      {
        id: 'it-tt-views-v2-1',
        question: 'Le visualizzazioni comprate contano per Creator Rewards?',
        answer: 'Non comprarle per questo. Creator Rewards paga solo le visualizzazioni che TikTok considera valide, e le sue regole vietano le interazioni false. Le visualizzazioni comprate non fanno guadagnare e possono mettere a rischio l’account.',
      },
      {
        id: 'it-tt-views-v2-2',
        question: 'Posso chiedere un rimborso?',
        answer: 'Gli ordini idonei sono coperti dalla nostra garanzia di rimborso di 30 giorni, a partire dalla data di acquisto. La politica di rimborso spiega quali ordini sono idonei e come inviare la richiesta.',
      },
      {
        id: 'it-tt-views-v2-3',
        question: 'Quali metodi di pagamento posso usare?',
        answer: 'Puoi pagare con carta, Apple Pay o Google Pay, in dollari statunitensi. È un pagamento unico e nulla si rinnova.',
      },
    ],
  },
  more: {
    id: 'related-services',
    title: 'Altri servizi NovaLikes',
    intro: 'Le visualizzazioni TikTok cambiano un solo numero. Per farne crescere un altro, scegli un servizio.',
    services: [
      {
        slug: 'buy-tiktok-likes',
        title: 'Comprare like TikTok',
        line: 'Più cuori su un video',
        image: '/assets/images/illustrations/tiktok-likes/tiktok-likes-hero.webp',
      },
      {
        slug: 'buy-tiktok-followers',
        title: 'Comprare follower TikTok',
        line: 'Fai crescere il tuo profilo TikTok',
        image: '/assets/images/illustrations/tiktok-followers/tiktok-followers-hero.webp',
      },
      {
        slug: 'buy-instagram-views',
        title: 'Comprare visualizzazioni Instagram',
        line: 'Più occhi sui tuoi Reel',
        image: '/assets/images/illustrations/instagram-views/instagram-views-hero.webp',
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
