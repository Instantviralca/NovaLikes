import type { ServiceV2Content } from '../../types';

/** Italian (/it) — v2 service page copy for buy-tiktok-followers. Primary keyword: "comprare follower tiktok". Do not edit wording without the content owner. */
export const IT_BUY_TIKTOK_FOLLOWERS_V2 = {
  meta: {
    slug: 'buy-tiktok-followers',
    platform: 'TikTok',
    name: 'Follower TikTok',
    unit: 'follower',
    unitSingular: 'follower',
    inputKind: 'username',
    perUnit: 1000,
    tiers: false,
    keywords: {
      primary: 'comprare follower tiktok',
      secondary: [
        'comprare follower tiktok senza password',
        'pacchetti follower tiktok',
        'prezzi follower tiktok',
        'avere più follower su tiktok',
      ],
      questions: [
        'è sicuro comprare follower tiktok',
        'quanto costano i follower tiktok',
        'servono per creator rewards',
        'perché i miei follower tiktok calano',
        'serve comprare follower',
      ],
    },
  },
  hero: {
    title: {
      lead: 'Comprare',
      highlight: 'follower TikTok',
      tail: 'per un profilo che convince',
    },
    subtitle: 'Chi apprezza uno dei tuoi video guarda prima il tuo profilo. Un numero di follower credibile rende più facile seguirti. Da {fromPrice}, con il solo username.',
    trust: [
      'Nessuna password',
      'Avvio in 6–8 ore',
      'Refill di 6 mesi',
    ],
  },
  picker: {
    id: 'pricing-packages',
    title: 'Pacchetti di follower TikTok e prezzi',
    intro: 'Scegli un pacchetto. Prezzi in USD.',
    summaryName: '{quantity} follower TikTok',
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
        body: 'Basta lo username',
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
      highlight: 'i tuoi follower TikTok?',
    },
    items: [
      {
        icon: 'shield',
        tone: 'mint',
        title: 'Il tuo username, mai la tua password',
        body: 'Ci serve solo il tuo username pubblico. Nessun codice di accesso e nessun login nel tuo account.',
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
        body: 'Se i follower del tuo ordine calano entro 6 mesi dalla consegna, mandaci il numero d’ordine e reintegriamo la differenza gratis.',
      },
      {
        icon: 'badge-check',
        tone: 'peach',
        title: 'Garanzia di rimborso di 30 giorni',
        body: 'Gli ordini idonei sono coperti per 30 giorni dalla data di acquisto. La nostra politica di rimborso spiega cosa è incluso.',
      },
      {
        icon: 'user-plus',
        tone: 'pink',
        title: 'Basta il tuo username',
        body: 'Scrivi il tuo username TikTok senza la @. Non chiediamo mai i tuoi dati di accesso, un codice o di entrare nel tuo account.',
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
      highlight: 'follower TikTok',
    },
    pill: 'Circa 2 minuti',
    intro: 'Ordinare richiede cinque brevi passaggi e circa due minuti. Ci serve solo il tuo username TikTok pubblico.',
    items: [
      {
        ui: 'public',
        title: 'Rendi pubblico il profilo',
        body: 'I follower si possono consegnare solo a un account TikTok pubblico. Poi puoi tornare al profilo privato.',
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
        title: 'Inserisci il tuo username',
        body: 'Scrivi il tuo username senza la @ e la tua email per la ricevuta e gli aggiornamenti. Controlla come è scritto prima di pagare.',
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
      unit: 'follower',
      body: 'La maggior parte degli ordini parte entro 6–8 ore dal pagamento e termina 4–6 ore dopo l’avvio. Segui l’avanzamento nella pagina «Traccia ordine» con il tuo numero d’ordine.',
    },
  },
  ui: {
    toggle: {
      label: 'Account privato',
      sub: 'Disattivato per la consegna',
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
      placeholder: 'tuousername',
    },
    safeChips: [
      'Basta lo username',
      'Pagamento sicuro',
    ],
    privacyTags: [
      '@username',
      'email',
    ],
  },
  compare: {
    id: 'spot-a-risky-seller',
    title: {
      lead: 'Come riconoscere un venditore poco affidabile di',
      highlight: 'follower TikTok',
    },
    intro: 'Ovunque tu compri, controlla prima questi sette punti.',
    us: 'NovaLikes',
    them: 'Venditori poco affidabili',
    rows: [
      {
        label: 'Dati di accesso',
        novalikes: 'Basta lo username',
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
    title: 'Refill e garanzia di rimborso per i tuoi follower TikTok',
    intro: 'Entrambe le promesse sono scritte nella nostra politica di rimborso, non solo in questa pagina.',
    cards: [
      {
        chip: '6 mesi',
        title: 'Refill di 6 mesi',
        image: '/assets/images/illustrations/tiktok-followers/tiktok-followers-order-process.webp',
        body: 'Se i follower del tuo ordine calano entro 6 mesi dalla data di consegna, scrivici su WhatsApp o via email con il numero d’ordine e reintegriamo la differenza gratis. Mantieni lo stesso username e il profilo pubblico mentre consegniamo un refill.',
      },
      {
        chip: '30 giorni',
        title: 'Garanzia di rimborso di 30 giorni',
        image: '/assets/images/illustrations/tiktok-followers/tiktok-followers-package-cta.webp',
        body: 'Gli ordini idonei possono essere rimborsati entro 30 giorni dall’acquisto. La politica di rimborso spiega cosa è idoneo e come fare richiesta.',
      },
    ],
    link: {
      label: 'Leggi la politica di rimborso',
      href: '/refund-policy',
    },
  },
  cost: {
    id: 'tiktok-followers-cost',
    title: {
      lead: 'Quanto costano i',
      highlight: 'follower TikTok?',
    },
    intro: 'I follower partono da {fromPrice} per 100, e il prezzo per follower scende man mano che il pacchetto cresce. Ogni prezzo è un pagamento unico in dollari statunitensi per un account.',
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
    id: 'why-buy-tiktok-followers',
    title: {
      lead: 'Perché comprare',
      highlight: 'follower TikTok?',
    },
    intro: 'Su TikTok la gente spesso ti scopre da un video e poi apre il tuo profilo. Un numero di follower consolidato rende più facile decidere di seguirti.',
    items: [
      {
        title: 'Un profilo all’altezza del video',
        body: 'Un video con migliaia di visualizzazioni accanto a un profilo con 40 follower stona. I follower colmano quel divario.',
      },
      {
        title: 'Una partenza per gli account nuovi',
        body: 'Un nuovo account di brand o di progetto non deve restare a zero mentre trovi il tuo formato.',
      },
      {
        title: 'Rapporti più facili con i brand',
        body: 'Brand e agenzie spesso guardano il numero di follower prima di rispondere a un creator.',
      },
    ],
    diagram: [
      'All’altezza',
      'Partenza',
      'Pronto per i brand',
    ],
  },
  help: {
    id: 'does-buying-tiktok-followers-help',
    title: {
      lead: 'Serve davvero comprare',
      highlight: 'follower TikTok?',
    },
    intro: 'I follower cambiano il numero del tuo profilo. Ciò che TikTok consiglia dipende sempre da come vengono guardati i tuoi video.',
    no: {
      title: 'Cosa non cambia',
      items: [
        'Visualizzazioni o like dei tuoi video',
        'Il posizionamento nei Per te da solo',
        'L’accesso a Creator Rewards o ad altre funzioni a pagamento',
      ],
    },
    yes: {
      title: 'Cosa cambia',
      items: [
        'Il numero di follower del tuo profilo TikTok',
        'Quanto appare avviato l’account ai nuovi visitatori',
        'La prima impressione con brand e collaborazioni',
      ],
      image: '/assets/images/illustrations/tiktok-followers/tiktok-followers-does-help.webp',
      altFallback: 'Illustrazione: follower TikTok',
    },
  },
  who: {
    id: 'who-orders',
    title: {
      lead: 'Chi compra',
      highlight: 'follower TikTok',
    },
    cards: [
      {
        title: 'Piccole attività',
        body: 'Panetterie, barbieri e negozi aggiungono follower perché il loro TikTok sembri vivo quanto i loro video.',
        image: '/assets/images/illustrations/tiktok-followers/tiktok-followers-best-practices.webp',
      },
      {
        title: 'Creator emergenti',
        body: 'Creator di comicità, gaming e lifestyle usano i follower per sembrare avviati mentre pubblicano con costanza.',
        image: '/assets/images/illustrations/tiktok-followers/tiktok-followers-hero.webp',
      },
      {
        title: 'Musica e vita notturna',
        body: 'DJ, band e locali aggiungono follower prima di un’uscita, di una data del tour o di una grande serata.',
        image: '/assets/images/illustrations/tiktok-followers/tiktok-followers-why-buy.webp',
      },
    ],
    statement: 'Qualunque sia il motivo, l’ordine funziona allo stesso modo: il tuo username, un pacchetto adatto e follower che di solito iniziano ad arrivare entro 6–8 ore. Non chiediamo mai la tua password.',
  },
  vs: {
    id: 'tiktok-followers-vs-other-services',
    title: {
      lead: 'Follower TikTok o',
      highlight: 'like e visualizzazioni',
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
        slug: 'buy-tiktok-followers',
        label: 'Follower',
        changes: 'Il numero di follower del tuo profilo',
        needs: 'Il tuo username pubblico',
        current: true,
      },
      {
        slug: 'buy-tiktok-likes',
        label: 'Like',
        changes: 'I like di un video',
        needs: 'Un link al video pubblico',
      },
      {
        slug: 'buy-tiktok-views',
        label: 'Visualizzazioni',
        changes: 'Le visualizzazioni di un video',
        needs: 'Un link al video pubblico',
      },
    ],
    currentLabel: 'Questa pagina',
  },
  safe: {
    id: 'is-it-safe',
    title: {
      lead: 'È sicuro comprare',
      highlight: 'follower TikTok?',
    },
    lead: 'Dipende da tre cose: il tuo account, il tuo pagamento e la tua privacy. Ecco come funziona ognuna con NovaLikes, più l’unico rischio che nessun venditore può eliminare.',
    body: 'Le Linee guida della community di TikTok vietano le interazioni false, e TikTok rimuove regolarmente gli account che considera inattivi o falsi. Per questo dopo la consegna può esserci un piccolo calo, e per questo ogni ordine include 6 mesi di refill. Non comprare mai follower per accedere a Creator Rewards: è contro le regole di TikTok.',
    cards: [
      {
        ui: 'nopass',
        title: 'Sicurezza dell’account',
        body: 'Ci serve solo il tuo username pubblico: nessuno accede al tuo account e nulla viene modificato. Non chiediamo mai un codice di accesso. Se qualcuno che dice di essere NovaLikes te lo chiede, non siamo noi.',
      },
      {
        ui: 'pay',
        title: 'Sicurezza del pagamento',
        body: 'Paghi una sola volta con un pagamento sicuro tramite carta, Apple Pay o Google Pay, in dollari statunitensi. Nessun abbonamento e nulla si rinnova.',
      },
      {
        ui: 'privacy',
        title: 'Privacy',
        body: 'Il tuo username e la tua email servono solo a gestire l’ordine e a inviarti aggiornamenti, come spiega la nostra [informativa sulla privacy](/privacy-policy).',
      },
    ],
  },
  before: {
    id: 'delivery-and-safety',
    title: {
      lead: 'Prima di comprare',
      highlight: 'follower TikTok',
    },
    lead: 'Controlla questi quattro punti una volta e il tuo ordine andrà liscio.',
    items: [
      {
        title: 'L’account è pubblico',
        body: 'Un account privato impedisce all’ordine di partire. Tienilo pubblico fino alla fine della consegna.',
      },
      {
        title: 'Lo username è corretto',
        body: 'Controlla ogni lettera, punto e trattino basso. I follower vanno esattamente allo username che scrivi.',
      },
      {
        title: 'Lo username non cambia',
        body: 'Mantieni lo stesso username durante la consegna e i 6 mesi di refill.',
      },
      {
        title: 'La dimensione è adatta',
        body: 'Scegli un pacchetto che sembri naturale accanto alle tue visualizzazioni e ai tuoi follower attuali.',
      },
    ],
  },
  faq: {
    id: 'faq',
    kicker: 'Domande prima di ordinare?',
    title: 'Domande frequenti sui follower TikTok',
    intro: 'Non trovi la risposta? Scrivici su WhatsApp al +44 7454 758272, 24/7.',
    cta: 'Chiedici su WhatsApp',
    locale: {
      code: 'it',
    },
    extra: [
      {
        id: 'it-tt-followers-v2-1',
        question: 'I follower comprati contano per Creator Rewards di TikTok?',
        answer: 'No, e non dovresti provarci. Le regole di TikTok vietano le interazioni false, e gonfiare i follower per accedere a programmi a pagamento può mettere a rischio l’account.',
      },
      {
        id: 'it-tt-followers-v2-2',
        question: 'Posso chiedere un rimborso?',
        answer: 'Gli ordini idonei sono coperti dalla nostra garanzia di rimborso di 30 giorni, a partire dalla data di acquisto. La politica di rimborso spiega quali ordini sono idonei e come inviare la richiesta.',
      },
      {
        id: 'it-tt-followers-v2-3',
        question: 'Quali metodi di pagamento posso usare?',
        answer: 'Puoi pagare con carta, Apple Pay o Google Pay, in dollari statunitensi. È un pagamento unico e nulla si rinnova.',
      },
    ],
  },
  more: {
    id: 'related-services',
    title: 'Altri servizi NovaLikes',
    intro: 'I follower TikTok cambiano un solo numero. Per farne crescere un altro, scegli un servizio.',
    services: [
      {
        slug: 'buy-tiktok-likes',
        title: 'Comprare like TikTok',
        line: 'Più cuori su un video',
        image: '/assets/images/illustrations/tiktok-likes/tiktok-likes-hero.webp',
      },
      {
        slug: 'buy-tiktok-views',
        title: 'Comprare visualizzazioni TikTok',
        line: 'Una partenza migliore per un video',
        image: '/assets/images/illustrations/tiktok-views/tiktok-views-hero.webp',
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
