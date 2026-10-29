import type { ServiceV2Content } from '../../types';

/** Italian (/it) — v2 service page copy for buy-instagram-comments. Primary keyword: "comprare commenti instagram". Do not edit wording without the content owner. */
export const IT_BUY_INSTAGRAM_COMMENTS_V2 = {
  meta: {
    slug: 'buy-instagram-comments',
    platform: 'Instagram',
    name: 'Commenti Instagram',
    unit: 'commenti',
    unitSingular: 'commento',
    inputKind: 'link',
    perUnit: 1,
    tiers: true,
    keywords: {
      primary: 'comprare commenti instagram',
      secondary: [
        'comprare commenti personalizzati instagram',
        'commenti instagram in italiano',
        'commenti premium instagram',
        'prezzi commenti instagram',
      ],
      questions: [
        'è sicuro comprare commenti instagram',
        'quanto costano i commenti',
        'posso scrivere i miei commenti',
        'ci sono commenti in italiano',
        'high quality o premium',
      ],
    },
  },
  hero: {
    title: {
      lead: 'Comprare',
      highlight: 'commenti Instagram',
      tail: 'per avviare la conversazione',
    },
    subtitle: 'Un post con commenti sembra vivo e invita gli altri a partecipare. Scegli commenti High Quality o Premium scritti per il tuo post, da {fromPrice}. Puoi anche inviare i tuoi testi, in italiano o in un’altra lingua.',
    trust: [
      'Nessuna password',
      'Avvio in 6–8 ore',
      'Refill di 6 mesi',
    ],
  },
  picker: {
    id: 'pricing-packages',
    title: 'Pacchetti di commenti Instagram e prezzi',
    intro: 'Scegli un livello e un pacchetto. Prezzi in USD.',
    summaryName: '{quantity} commenti Instagram {tier}',
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
        note: 'Commenti brevi e positivi che vanno bene per quasi tutti i post.',
      },
      {
        label: 'Premium',
        note: 'Commenti scritti per il tuo post, da account dall’aspetto più realistico.',
      },
    ],
  },
  why: {
    id: 'why-choose-novalikes',
    title: {
      lead: 'Perché scegliere NovaLikes per',
      highlight: 'i tuoi commenti Instagram?',
    },
    items: [
      {
        icon: 'shield',
        tone: 'mint',
        title: 'Un link, mai la tua password',
        body: 'Ci serve solo il link pubblico del post o del Reel. Nessun codice di accesso e nessun login nel tuo account.',
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
        body: 'Se i commenti del tuo ordine calano entro 6 mesi dalla consegna, mandaci il numero d’ordine e reintegriamo la differenza gratis.',
      },
      {
        icon: 'badge-check',
        tone: 'peach',
        title: 'Garanzia di rimborso di 30 giorni',
        body: 'Gli ordini idonei sono coperti per 30 giorni dalla data di acquisto. La nostra politica di rimborso spiega cosa è incluso.',
      },
      {
        icon: 'pen',
        tone: 'pink',
        title: 'I tuoi testi o i nostri',
        body: 'Invia i tuoi commenti nella nota dell’ordine, uno per riga, oppure lascia che li scriva il nostro team. In italiano se lo chiedi.',
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
      highlight: 'commenti Instagram',
    },
    pill: 'Circa 2 minuti',
    intro: 'Ordinare richiede cinque brevi passaggi. Scegli High Quality o Premium, incolla il link a un post pubblico e invia i tuoi testi se vuoi.',
    items: [
      {
        ui: 'public',
        title: 'Apri i commenti a tutti',
        body: 'Il post deve essere su un account pubblico, con i commenti aperti a tutti. Limiti come «solo follower» impediscono l’avvio.',
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
        title: 'Incolla il link e i tuoi testi',
        body: 'Incolla il link al post o al Reel al pagamento. Scrivi i tuoi commenti nella nota, uno per riga, oppure lascia fare a noi.',
      },
      {
        ui: 'pay',
        title: 'Paga in modo sicuro',
        body: 'Paghi una sola volta con carta, Apple Pay o Google Pay, in dollari statunitensi. Nessun abbonamento.',
      },
    ],
    done: {
      title: 'Fatto!',
      count: 25,
      unit: 'commenti',
      body: 'La maggior parte degli ordini parte entro 6–8 ore dal pagamento e termina 4–6 ore dopo l’avvio. Segui l’avanzamento nella pagina «Traccia ordine» con il tuo numero d’ordine.',
    },
  },
  ui: {
    toggle: {
      label: 'Commenti limitati',
      sub: 'Disattivato per poter commentare',
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
      highlight: 'commenti Instagram',
    },
    intro: 'Ovunque tu compri, controlla prima questi sette punti.',
    us: 'NovaLikes',
    them: 'Venditori poco affidabili',
    rows: [
      {
        label: 'Dati di accesso',
        novalikes: 'Basta il link',
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
    title: 'Refill e garanzia di rimborso per i tuoi commenti Instagram',
    intro: 'Entrambe le promesse sono scritte nella nostra politica di rimborso, non solo in questa pagina.',
    cards: [
      {
        chip: '6 mesi',
        title: 'Refill di 6 mesi',
        image: '/assets/images/illustrations/instagram-comments/instagram-comments-order-process.webp',
        body: 'Se i commenti del tuo ordine calano entro 6 mesi dalla data di consegna, scrivici su WhatsApp o via email con il numero d’ordine e reintegriamo la differenza gratis. Lascia il post o il Reel online e pubblico mentre consegniamo un refill.',
      },
      {
        chip: '30 giorni',
        title: 'Garanzia di rimborso di 30 giorni',
        image: '/assets/images/illustrations/instagram-comments/instagram-comments-package-cta.webp',
        body: 'Gli ordini idonei possono essere rimborsati entro 30 giorni dall’acquisto. La politica di rimborso spiega cosa è idoneo e come fare richiesta.',
      },
    ],
    link: {
      label: 'Leggi la politica di rimborso',
      href: '/refund-policy',
    },
  },
  cost: {
    id: 'instagram-comments-cost',
    title: {
      lead: 'Quanto costano i',
      highlight: 'commenti Instagram?',
    },
    intro: 'I pacchetti partono da {fromPrice}. I commenti High Quality costano meno al pezzo e i Premium un po’ di più, perché ognuno è scritto per il tuo post. Ogni prezzo è un pagamento unico in dollari statunitensi per un post o un Reel.',
    points: [
      'Il refill di 6 mesi è incluso. Non devi aggiungere nulla.',
      'Prezzi in dollari statunitensi. La tua banca converte nella tua valuta e alcune carte applicano una commissione.',
      'Nessun abbonamento né rinnovo. Paghi una volta per ordine.',
    ],
    cols: [
      'Pacchetto',
      'Prezzo',
      'Per unità',
    ],
    best: 'Miglior prezzo',
    note: 'I prezzi vengono dai nostri pacchetti attuali. Il prezzo che vedi al pagamento è quello che paghi.',
  },
  whyBuy: {
    id: 'why-buy-instagram-comments',
    title: {
      lead: 'Perché comprare',
      highlight: 'commenti Instagram?',
    },
    intro: 'Una sezione commenti vuota fa sembrare spento anche un buon post. Qualche commento pertinente mostra che se ne parla e spinge la persona successiva a unirsi.',
    items: [
      {
        title: 'Post che sembrano attivi',
        body: 'I commenti sono il segnale più chiaro che alla gente interessa un post.',
      },
      {
        title: 'Una prima risposta più facile',
        body: 'A nessuno piace commentare per primo. Quando la conversazione è già iniziata, i visitatori partecipano più volentieri.',
      },
      {
        title: 'Il tuo messaggio in evidenza',
        body: 'Con i tuoi testi, i commenti mettono in risalto un dettaglio del prodotto, una domanda o una reazione.',
      },
    ],
    diagram: [
      'Post attivo',
      'Prima risposta',
      'Il tuo messaggio',
    ],
  },
  help: {
    id: 'does-buying-instagram-comments-help',
    title: {
      lead: 'Serve davvero comprare',
      highlight: 'commenti Instagram?',
    },
    intro: 'I commenti cambiano ciò che appare sotto un post. Da soli non portano follower né portata.',
    no: {
      title: 'Cosa non cambia',
      items: [
        'I tuoi follower, like o visualizzazioni',
        'Il posizionamento in Esplora o Reel da solo',
        'Risposte spontanee che tengono viva la conversazione',
      ],
    },
    yes: {
      title: 'Cosa cambia',
      items: [
        'La sezione commenti del post scelto',
        'Quanto appare attivo il post ai nuovi visitatori',
        'I punti messi in evidenza, se invii i tuoi testi',
      ],
      image: '/assets/images/illustrations/instagram-comments/instagram-comments-does-help.webp',
      altFallback: 'Illustrazione: commenti Instagram',
    },
  },
  who: {
    id: 'who-orders',
    title: {
      lead: 'Chi compra',
      highlight: 'commenti Instagram',
    },
    cards: [
      {
        title: 'Creator',
        body: 'I creator aggiungono commenti a Reel e caroselli che meritano più conversazione, spesso con i propri testi.',
        image: '/assets/images/illustrations/instagram-comments/instagram-comments-best-practices.webp',
      },
      {
        title: 'Piccole attività',
        body: 'Le attività li usano sui post di prodotto e sulle offerte, così domande e reazioni compaiono dove guardano i clienti.',
        image: '/assets/images/illustrations/instagram-comments/instagram-comments-hero.webp',
      },
      {
        title: 'Brand e agenzie',
        body: 'Brand e agenzie scelgono i commenti Premium per le campagne, dove ogni commento deve suonare naturale.',
        image: '/assets/images/illustrations/instagram-comments/instagram-comments-why-buy.webp',
      },
    ],
    statement: 'Qualunque sia il post, l’ordine funziona allo stesso modo: un link pubblico, il livello che scegli, i tuoi testi se vuoi, e commenti che di solito partono entro 6–8 ore. Nessuno ha bisogno dei tuoi dati di accesso.',
  },
  vs: {
    id: 'instagram-comments-vs-other-services',
    title: {
      lead: 'Commenti Instagram o',
      highlight: 'like, visualizzazioni e follower',
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
        slug: 'buy-instagram-comments',
        label: 'Commenti',
        changes: 'I commenti di un post pubblico',
        needs: 'Un link al post',
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
        slug: 'buy-instagram-views',
        label: 'Visualizzazioni',
        changes: 'Le visualizzazioni di un Reel o video',
        needs: 'Un link al Reel',
      },
    ],
    currentLabel: 'Questa pagina',
  },
  safe: {
    id: 'is-it-safe',
    title: {
      lead: 'È sicuro comprare',
      highlight: 'commenti Instagram?',
    },
    lead: 'Dipende da tre cose: il tuo account, il tuo pagamento e la tua privacy. Ecco come funziona ognuna con NovaLikes, più l’unico rischio che nessun venditore può eliminare.',
    body: 'Le Linee guida della community di Instagram chiedono di non gonfiare le interazioni in modo artificiale, e i suoi filtri possono nascondere commenti o rimuovere account che considera falsi. Per questo alcuni commenti possono sparire dopo la consegna, e per questo ogni ordine include 6 mesi di refill. I commenti Premium o i tuoi testi, in quantità ragionevole, sembrano più naturali.',
    cards: [
      {
        ui: 'nopass',
        title: 'Sicurezza dell’account',
        body: 'Ci serve solo il link pubblico del post o del Reel: nessuno accede al tuo account e nulla viene modificato. Non chiediamo mai una password o un codice di accesso. Se qualcuno che dice di essere NovaLikes te lo chiede, non siamo noi.',
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
      highlight: 'commenti Instagram',
    },
    lead: 'Controlla questi quattro punti una volta e il tuo ordine andrà liscio.',
    items: [
      {
        title: 'I commenti sono aperti',
        body: 'Controlla che siano attivi e non limitati ai follower o agli account che segui.',
      },
      {
        title: 'Il link è quello del post',
        body: 'Copia il link del post o del Reel stesso, non quello del tuo profilo.',
      },
      {
        title: 'I tuoi testi sono pronti',
        body: 'Vuoi i tuoi commenti o commenti in italiano? Scrivilo nella nota prima dell’avvio.',
      },
      {
        title: 'Il post resta online',
        body: 'Non eliminarlo e non archiviarlo durante la consegna e i 6 mesi di refill.',
      },
    ],
  },
  faq: {
    id: 'faq',
    kicker: 'Domande prima di ordinare?',
    title: 'Domande frequenti sui commenti Instagram',
    intro: 'Non trovi la risposta? Scrivici su WhatsApp al +44 7454 758272, 24/7.',
    cta: 'Chiedici su WhatsApp',
    locale: {
      code: 'it',
    },
    extra: [
      {
        id: 'it-ig-comments-v2-1',
        question: 'Posso ricevere commenti in italiano?',
        answer: 'Sì. Scrivi «italiano» nella nota dell’ordine oppure invia i tuoi commenti in italiano, uno per riga, e li pubblicheremo così come sono.',
      },
      {
        id: 'it-ig-comments-v2-2',
        question: 'Quanti commenti Instagram dovrei comprare?',
        answer: 'Adatta il numero al post. Da 10 a 25 commenti vanno bene per la maggior parte dei post di account piccoli. Un post con pochi like e decine di commenti può sembrare strano.',
      },
      {
        id: 'it-ig-comments-v2-3',
        question: 'Posso chiedere un rimborso?',
        answer: 'Gli ordini idonei sono coperti dalla nostra garanzia di rimborso di 30 giorni, a partire dalla data di acquisto. La politica di rimborso spiega quali ordini sono idonei e come inviare la richiesta.',
      },
      {
        id: 'it-ig-comments-v2-4',
        question: 'Quali metodi di pagamento posso usare?',
        answer: 'Puoi pagare con carta, Apple Pay o Google Pay, in dollari statunitensi. È un pagamento unico e nulla si rinnova.',
      },
    ],
  },
  more: {
    id: 'related-services',
    title: 'Altri servizi Instagram',
    intro: 'I commenti Instagram cambiano un solo numero. Per farne crescere un altro, scegli un servizio.',
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
