import type { ServiceV2Content } from '../../types';

/** Italian (/it) — v2 service page copy for buy-instagram-views. Primary keyword: "comprare visualizzazioni instagram". Do not edit wording without the content owner. */
export const IT_BUY_INSTAGRAM_VIEWS_V2 = {
  meta: {
    slug: 'buy-instagram-views',
    platform: 'Instagram',
    name: 'Visualizzazioni Instagram',
    unit: 'visualizzazioni',
    unitSingular: 'visualizzazione',
    inputKind: 'link',
    perUnit: 1000,
    tiers: false,
    keywords: {
      primary: 'comprare visualizzazioni instagram',
      secondary: [
        'comprare visualizzazioni reel',
        'comprare views instagram',
        'pacchetti visualizzazioni instagram',
        'prezzi visualizzazioni instagram',
      ],
      questions: [
        'è sicuro comprare visualizzazioni instagram',
        'quanto costano le visualizzazioni',
        'le visualizzazioni aiutano a finire in esplora',
        'le visualizzazioni comprate calano',
        'come si contano le visualizzazioni dei reel',
      ],
    },
  },
  hero: {
    title: {
      lead: 'Comprare',
      highlight: 'visualizzazioni Instagram',
      tail: 'per far partire meglio i tuoi Reel',
    },
    subtitle: 'I Reel con un buon numero di visualizzazioni invitano a guardarli. Dai una spinta a nuovi Reel, video prodotto e tutorial da {fromPrice}, con consegna graduale se preferisci.',
    trust: [
      'Nessuna password',
      'Avvio in 6–8 ore',
      'Refill di 6 mesi',
    ],
  },
  picker: {
    id: 'pricing-packages',
    title: 'Pacchetti di visualizzazioni Instagram e prezzi',
    intro: 'Scegli un pacchetto. Prezzi in USD.',
    summaryName: '{quantity} visualizzazioni Instagram',
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
      highlight: 'le tue visualizzazioni Instagram?',
    },
    items: [
      {
        icon: 'shield',
        tone: 'mint',
        title: 'Un link, mai la tua password',
        body: 'Ci serve solo il link pubblico del Reel o del video. Nessun codice di accesso e nessun login nel tuo account.',
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
        icon: 'play',
        tone: 'pink',
        title: 'Reel e video',
        body: 'Ordina visualizzazioni per qualsiasi Reel o video pubblico. Ogni ordine copre un video.',
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
      highlight: 'visualizzazioni Instagram',
    },
    pill: 'Circa 2 minuti',
    intro: 'Ordinare richiede cinque brevi passaggi e circa due minuti. Ci serve solo il link a un Reel o a un video pubblico.',
    items: [
      {
        ui: 'public',
        title: 'Tieni il Reel pubblico',
        body: 'Il Reel o il video deve essere su un account pubblico fino alla fine della consegna. Non eliminarlo e non archiviarlo.',
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
        title: 'Incolla il link del Reel',
        body: 'Apri il Reel, tocca «Condividi», scegli «Copia link» e incollalo al pagamento. È fatto così: instagram.com/reel/….',
      },
      {
        ui: 'pay',
        title: 'Paga in modo sicuro',
        body: 'Paghi una sola volta con carta, Apple Pay o Google Pay, in dollari statunitensi. Nessun abbonamento.',
      },
    ],
    done: {
      title: 'Fatto!',
      count: 5000,
      unit: 'visualizzazioni',
      body: 'La maggior parte degli ordini parte entro 6–8 ore dal pagamento e termina 4–6 ore dopo l’avvio. Segui l’avanzamento nella pagina «Traccia ordine» con il tuo numero d’ordine.',
    },
  },
  ui: {
    toggle: {
      label: 'Account privato',
      sub: 'Disattivato per raggiungere il Reel',
    },
    chips: [
      '2.5K',
      '5K',
      '10K',
      '25K',
    ],
    chipOn: 1,
    input: {
      prefix: '',
      placeholder: 'instagram.com/reel/…',
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
      highlight: 'visualizzazioni Instagram',
    },
    intro: 'Ovunque tu compri, controlla prima questi sette punti.',
    us: 'NovaLikes',
    them: 'Venditori poco affidabili',
    rows: [
      {
        label: 'Dati di accesso',
        novalikes: 'Basta il link del Reel',
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
    title: 'Refill e garanzia di rimborso per le tue visualizzazioni Instagram',
    intro: 'Entrambe le promesse sono scritte nella nostra politica di rimborso, non solo in questa pagina.',
    cards: [
      {
        chip: '6 mesi',
        title: 'Refill di 6 mesi',
        image: '/assets/images/illustrations/instagram-views/instagram-views-order-process.webp',
        body: 'Se le visualizzazioni del tuo ordine calano entro 6 mesi dalla data di consegna, scrivici su WhatsApp o via email con il numero d’ordine e reintegriamo la differenza gratis. Lascia il Reel o il video online e pubblico mentre consegniamo un refill.',
      },
      {
        chip: '30 giorni',
        title: 'Garanzia di rimborso di 30 giorni',
        image: '/assets/images/illustrations/instagram-views/instagram-views-package-cta.webp',
        body: 'Gli ordini idonei possono essere rimborsati entro 30 giorni dall’acquisto. La politica di rimborso spiega cosa è idoneo e come fare richiesta.',
      },
    ],
    link: {
      label: 'Leggi la politica di rimborso',
      href: '/refund-policy',
    },
  },
  cost: {
    id: 'instagram-views-cost',
    title: {
      lead: 'Quanto costano le',
      highlight: 'visualizzazioni Instagram?',
    },
    intro: 'Le visualizzazioni partono da {fromPrice} per 500, e il prezzo per 1.000 scende molto nei pacchetti grandi. Ogni prezzo è un pagamento unico in dollari statunitensi per un Reel o un video.',
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
    id: 'why-buy-instagram-views',
    title: {
      lead: 'Perché comprare',
      highlight: 'visualizzazioni Instagram?',
    },
    intro: 'Un Reel con poche decine di visualizzazioni può sembrare che non abbia interessato nessuno, anche se è buono. Un pacchetto fa salire il numero visibile, così i nuovi spettatori premono play più volentieri.',
    items: [
      {
        title: 'Reel che invitano a guardare',
        body: 'La gente guarda più volentieri un Reel che ha già visualizzazioni. Un numero più alto fa contare il primo secondo.',
      },
      {
        title: 'Una buona partenza per i lanci',
        body: 'Video prodotto, tutorial e annunci sembrano avviati dal primo giorno invece di restare a zero.',
      },
      {
        title: 'Una prova per partner e clienti',
        body: 'Un buon numero di visualizzazioni aiuta quando condividi Reel con brand, collaboratori o clienti.',
      },
    ],
    diagram: [
      'Invita a guardare',
      'Lancio',
      'Riprova sociale',
    ],
  },
  help: {
    id: 'does-buying-instagram-views-help',
    title: {
      lead: 'Serve davvero comprare',
      highlight: 'visualizzazioni Instagram?',
    },
    intro: 'Le visualizzazioni cambiano il numero di un Reel. Instagram decide comunque la portata in base a come reagiscono gli spettatori.',
    no: {
      title: 'Cosa non cambia',
      items: [
        'Tempo di visione, condivisioni o salvataggi da soli',
        'Il posizionamento in Esplora o Reel da solo',
        'I tuoi follower, like o commenti',
      ],
    },
    yes: {
      title: 'Cosa cambia',
      items: [
        'Le visualizzazioni del Reel o del video che scegli',
        'Quanto appare interessante il Reel ai nuovi spettatori',
        'La prima impressione di lanci e tutorial',
      ],
      image: '/assets/images/illustrations/instagram-views/instagram-views-does-help.webp',
      altFallback: 'Illustrazione: visualizzazioni Instagram',
    },
  },
  who: {
    id: 'who-orders',
    title: {
      lead: 'Chi compra',
      highlight: 'visualizzazioni Instagram',
    },
    cards: [
      {
        title: 'Creator',
        body: 'I creator aggiungono visualizzazioni a nuovi Reel e tutorial, così un video appena pubblicato non resta a zero mentre l’algoritmo lo prova.',
        image: '/assets/images/illustrations/instagram-views/instagram-views-best-practices.webp',
      },
      {
        title: 'Piccole attività',
        body: 'Le attività le usano su demo di prodotto, dietro le quinte e Reel promozionali che condividono in annunci, bio e messaggi.',
        image: '/assets/images/illustrations/instagram-views/instagram-views-hero.webp',
      },
      {
        title: 'Brand e agenzie',
        body: 'Brand e agenzie aggiungono visualizzazioni a Reel di campagna e collaborazioni, spesso con consegna graduale.',
        image: '/assets/images/illustrations/instagram-views/instagram-views-why-buy.webp',
      },
    ],
    statement: 'Qualunque sia il Reel, l’ordine funziona allo stesso modo: un link pubblico, il pacchetto che scegli e un numero che di solito inizia a salire entro 6–8 ore. Nessuno ha bisogno dei tuoi dati di accesso.',
  },
  vs: {
    id: 'instagram-views-vs-other-services',
    title: {
      lead: 'Visualizzazioni Instagram o',
      highlight: 'like, follower e commenti',
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
        slug: 'buy-instagram-views',
        label: 'Visualizzazioni',
        changes: 'Le visualizzazioni di un Reel o video',
        needs: 'Un link al Reel',
        current: true,
      },
      {
        slug: 'buy-instagram-followers',
        label: 'Follower',
        changes: 'Il numero di follower del tuo profilo',
        needs: 'Il tuo @username pubblico',
      },
      {
        slug: 'buy-instagram-likes',
        label: 'Like',
        changes: 'I like di un post o di un Reel',
        needs: 'Un link al post',
      },
      {
        slug: 'buy-instagram-comments',
        label: 'Commenti',
        changes: 'I commenti di un post pubblico',
        needs: 'Un link al post',
      },
    ],
    currentLabel: 'Questa pagina',
  },
  safe: {
    id: 'is-it-safe',
    title: {
      lead: 'È sicuro comprare',
      highlight: 'visualizzazioni Instagram?',
    },
    lead: 'Dipende da tre cose: il tuo account, il tuo pagamento e la tua privacy. Ecco come funziona ognuna con NovaLikes, più l’unico rischio che nessun venditore può eliminare.',
    body: 'Le Linee guida della community di Instagram chiedono di non gonfiare le interazioni in modo artificiale, e Instagram rimuove regolarmente gli account che considera inattivi o falsi. Per questo dopo la consegna può esserci un piccolo calo, e per questo ogni ordine include 6 mesi di refill. La consegna graduale e Reel che la gente guarda davvero sembrano più naturali.',
    cards: [
      {
        ui: 'nopass',
        title: 'Sicurezza dell’account',
        body: 'Ci serve solo il link pubblico del Reel o del video: nessuno accede al tuo account e nulla viene modificato. Non chiediamo mai una password o un codice di accesso. Se qualcuno che dice di essere NovaLikes te lo chiede, non siamo noi.',
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
      highlight: 'visualizzazioni Instagram',
    },
    lead: 'Controlla questi quattro punti una volta e il tuo ordine andrà liscio.',
    items: [
      {
        title: 'Il Reel è pubblico',
        body: 'Deve essere su un account pubblico fino alla fine della consegna.',
      },
      {
        title: 'Il link è quello del Reel',
        body: 'Copialo dal Reel stesso. È fatto così: instagram.com/reel/…, non come il link del tuo profilo.',
      },
      {
        title: 'Il Reel resta online',
        body: 'Non eliminarlo e non archiviarlo durante la consegna e i 6 mesi di refill.',
      },
      {
        title: 'I numeri sono coerenti',
        body: 'Decine di migliaia di visualizzazioni con quasi nessun like possono sembrare strane. Abbinale ai like o scegli una dimensione adatta.',
      },
    ],
  },
  faq: {
    id: 'faq',
    kicker: 'Domande prima di ordinare?',
    title: 'Domande frequenti sulle visualizzazioni Instagram',
    intro: 'Non trovi la risposta? Scrivici su WhatsApp al +44 7454 758272, 24/7.',
    cta: 'Chiedici su WhatsApp',
    locale: {
      code: 'it',
    },
    extra: [
      {
        id: 'it-ig-views-v2-1',
        question: 'Quante visualizzazioni Instagram dovrei comprare?',
        answer: 'Scegli una dimensione adatta al tuo account e al Reel. Qualche migliaio va bene per la maggior parte dei Reel di account piccoli; account grandi e campagne usano 10.000 o più. Nel dubbio, parti in piccolo.',
      },
      {
        id: 'it-ig-views-v2-2',
        question: 'Posso dividere un pacchetto su più Reel?',
        answer: 'No. Ogni ordine copre un Reel o un video. Per più Reel, fai un ordine per ciascuno.',
      },
      {
        id: 'it-ig-views-v2-3',
        question: 'Posso chiedere un rimborso?',
        answer: 'Gli ordini idonei sono coperti dalla nostra garanzia di rimborso di 30 giorni, a partire dalla data di acquisto. La politica di rimborso spiega quali ordini sono idonei e come inviare la richiesta.',
      },
      {
        id: 'it-ig-views-v2-4',
        question: 'Quali metodi di pagamento posso usare?',
        answer: 'Puoi pagare con carta, Apple Pay o Google Pay, in dollari statunitensi. È un pagamento unico e nulla si rinnova.',
      },
    ],
  },
  more: {
    id: 'related-services',
    title: 'Altri servizi Instagram',
    intro: 'Le visualizzazioni Instagram cambiano un solo numero. Per farne crescere un altro, scegli un servizio.',
    services: [
      {
        slug: 'buy-instagram-likes',
        title: 'Comprare like Instagram',
        line: 'Per post, caroselli e Reel',
        image: '/assets/images/illustrations/instagram-likes/instagram-likes-hero.webp',
      },
      {
        slug: 'buy-instagram-followers',
        title: 'Comprare follower Instagram',
        line: 'Fai crescere il tuo profilo',
        image: '/assets/images/illustrations/instagram-followers/instagram-followers-hero.webp',
      },
      {
        slug: 'buy-instagram-comments',
        title: 'Comprare commenti Instagram',
        line: 'Avvia la conversazione sotto un post',
        image: '/assets/images/illustrations/instagram-comments/instagram-comments-hero.webp',
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
