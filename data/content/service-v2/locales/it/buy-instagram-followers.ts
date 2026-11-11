import type { ServiceV2Content } from '../../types';

/** Italian (/it) — v2 service page copy for buy-instagram-followers. Primary keyword: "comprare follower instagram". Do not edit wording without the content owner. */
export const IT_BUY_INSTAGRAM_FOLLOWERS_V2 = {
  meta: {
    slug: 'buy-instagram-followers',
    platform: 'Instagram',
    name: 'Follower Instagram',
    unit: 'follower',
    unitSingular: 'follower',
    inputKind: 'username',
    perUnit: 1000,
    tiers: false,
    keywords: {
      primary: 'comprare follower instagram',
      secondary: [
        'comprare follower instagram senza password',
        'pacchetti follower instagram',
        'prezzi follower instagram',
        'avere più follower su instagram',
      ],
      questions: [
        'è sicuro comprare follower instagram',
        'quanto costano i follower instagram',
        'si rischia il ban comprando follower',
        'perché i miei follower calano',
        'serve comprare follower',
      ],
    },
  },
  hero: {
    title: {
      lead: 'Comprare',
      highlight: 'follower Instagram',
      tail: 'per un profilo più credibile',
    },
    subtitle: 'Brand, collaboratori e nuovi visitatori guardano il numero di follower prima di seguirti. Dai al tuo profilo un numero che ispira fiducia da {fromPrice}, senza condividere la tua password di Instagram.',
    trust: [
      'Nessuna password',
      'Avvio in 6–8 ore',
      'Refill di 6 mesi',
    ],
  },
  picker: {
    id: 'pricing-packages',
    title: 'Pacchetti di follower Instagram e prezzi',
    intro: 'Scegli un pacchetto. Prezzi in USD.',
    summaryName: '{quantity} follower Instagram',
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
      highlight: 'i tuoi follower Instagram?',
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
        icon: 'message-square',
        tone: 'pink',
        title: 'Aiuto su WhatsApp, 24/7',
        body: 'Domande prima o dopo l’ordine? Scrivi al +44 7454 758272 con il tuo numero d’ordine, di giorno o di notte.',
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
      highlight: 'follower Instagram',
    },
    pill: 'Circa 2 minuti',
    intro: 'Ordinare richiede cinque brevi passaggi e circa due minuti. La maggior parte degli ordini parte entro 6–8 ore dal pagamento.',
    items: [
      {
        ui: 'public',
        title: 'Rendi pubblico il profilo',
        body: 'I follower si possono consegnare solo a un profilo pubblico. Quando l’ordine è finito, puoi tornare al profilo privato.',
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
        body: 'Scrivi l’@username pubblico che riceverà i follower e la tua email per la ricevuta e gli aggiornamenti dell’ordine.',
      },
      {
        ui: 'pay',
        title: 'Paga in modo sicuro',
        body: 'Paghi una sola volta con carta, Apple Pay o Google Pay, in dollari statunitensi. Nessun abbonamento.',
      },
    ],
    done: {
      title: 'Fatto!',
      count: 2000,
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
      '1K',
      '2K',
      '5K',
      '10K',
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
      highlight: 'follower Instagram',
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
    title: 'Refill e garanzia di rimborso per i tuoi follower Instagram',
    intro: 'Entrambe le promesse sono scritte nella nostra politica di rimborso, non solo in questa pagina.',
    cards: [
      {
        chip: '6 mesi',
        title: 'Refill di 6 mesi',
        image: '/assets/images/illustrations/instagram-followers/instagram-followers-buying-process.webp',
        body: 'Se i follower del tuo ordine calano entro 6 mesi dalla data di consegna, scrivici su WhatsApp o via email con il numero d’ordine e reintegriamo la differenza gratis. Mantieni lo stesso username e il profilo pubblico mentre consegniamo un refill.',
      },
      {
        chip: '30 giorni',
        title: 'Garanzia di rimborso di 30 giorni',
        image: '/assets/images/illustrations/instagram-followers/instagram-followers-package-cta.webp',
        body: 'Gli ordini idonei possono essere rimborsati entro 30 giorni dall’acquisto. La politica di rimborso spiega cosa è idoneo e come fare richiesta.',
      },
    ],
    link: {
      label: 'Leggi la politica di rimborso',
      href: '/refund-policy',
    },
  },
  cost: {
    id: 'instagram-followers-cost',
    title: {
      lead: 'Quanto costano i',
      highlight: 'follower Instagram?',
    },
    intro: 'I pacchetti partono da {fromPrice} per 100 follower. Più grande è il pacchetto, meno paghi per follower, e ogni prezzo è un pagamento unico in dollari statunitensi.',
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
    id: 'why-buy-instagram-followers',
    title: {
      lead: 'Perché comprare',
      highlight: 'follower Instagram?',
    },
    intro: 'Chi ordina di solito non parte da zero. Ha contenuti in cui crede e un numero di follower che non gli rende giustizia. Un pacchetto cambia il numero che i visitatori vedono per primo, così i tuoi post migliori hanno una possibilità più equa. Funziona meglio se continui a pubblicare con regolarità.',
    items: [
      {
        title: 'Una prima impressione migliore',
        body: 'I visitatori guardano il numero di follower prima di leggere una sola didascalia. Un profilo più pieno ottiene un primo sguardo più giusto.',
      },
      {
        title: 'Una spinta per un account nuovo',
        body: 'Un nuovo brand, un progetto parallelo o un account da creator non deve restare a poche decine di follower mentre cresce.',
      },
      {
        title: 'Supporto per un lancio o una proposta',
        body: 'I team aggiungono follower prima di un lancio, una campagna o una proposta a un brand, accanto ai post che fanno il vero lavoro.',
      },
    ],
    diagram: [
      'Prima impressione',
      'Spinta iniziale',
      'Lancio',
    ],
  },
  help: {
    id: 'does-buying-instagram-followers-help',
    title: {
      lead: 'Serve davvero comprare',
      highlight: 'follower Instagram?',
    },
    intro: 'Aiutano con una cosa: il numero che la gente vede sul tuo profilo. Ecco il quadro onesto.',
    no: {
      title: 'Cosa non cambia',
      items: [
        'Like, visualizzazioni o commenti dei tuoi post',
        'La tua portata o i suggerimenti di Esplora e Reel',
        'Vendite, iscrizioni o messaggi da soli',
      ],
    },
    yes: {
      title: 'Cosa cambia',
      items: [
        'Il numero di follower del tuo profilo',
        'La prima impressione dei nuovi visitatori',
        'Quanto appare avviato un account nuovo',
      ],
      image: '/assets/images/illustrations/instagram-followers/instagram-followers-does-help.webp',
      altFallback: 'Illustrazione: follower Instagram',
    },
  },
  who: {
    id: 'who-orders',
    title: {
      lead: 'Chi compra',
      highlight: 'follower Instagram',
    },
    cards: [
      {
        title: 'Creator',
        body: 'I creator usano i follower per dare a un account in crescita il profilo che merita, mentre continuano a pubblicare Reel e storie. Motivi frequenti: un account nuovo, la prima proposta a un brand o un rilancio.',
        image: '/assets/images/illustrations/instagram-followers/instagram-followers-best-practices.webp',
      },
      {
        title: 'Piccole attività',
        body: 'Negozi, saloni, bar e professionisti spesso incontrano i clienti su Instagram prima che sul sito. Un profilo attivo aiuta quando la gente ti cerca prima di un’apertura o di un lancio.',
        image: '/assets/images/illustrations/instagram-followers/instagram-followers-hero.webp',
      },
      {
        title: 'Brand e agenzie',
        body: 'Brand e agenzie aggiungono follower ad account nuovi per paese, prodotto o campagna, spesso con consegna graduale per una crescita costante.',
        image: '/assets/images/illustrations/instagram-followers/instagram-followers-why-buy.webp',
      },
    ],
    statement: 'Qualunque sia il motivo, l’ordine funziona allo stesso modo: il tuo username pubblico, il pacchetto che scegli e un numero che di solito inizia a salire entro 6–8 ore. Nessuno ha mai bisogno dei tuoi dati di accesso.',
  },
  vs: {
    id: 'instagram-followers-vs-other-services',
    title: {
      lead: 'Follower Instagram o',
      highlight: 'like, visualizzazioni e commenti',
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
        slug: 'buy-instagram-followers',
        label: 'Follower',
        changes: 'Il numero di follower del tuo profilo',
        needs: 'Il tuo @username pubblico',
        current: true,
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
      highlight: 'follower Instagram?',
    },
    lead: 'Dipende da tre cose: il tuo account, il tuo pagamento e la tua privacy. Ecco come funziona ognuna con NovaLikes, più l’unico rischio che nessun venditore può eliminare.',
    body: 'Le Linee guida della community di Instagram chiedono di non ottenere follower, like o condivisioni in modo artificiale, e Instagram rimuove regolarmente gli account che considera inattivi o falsi. Per questo dopo la consegna può esserci un piccolo calo, e per questo ogni ordine include 6 mesi di refill. La consegna graduale e post regolari mantengono una crescita naturale.',
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
      highlight: 'follower Instagram',
    },
    lead: 'Controlla questi quattro punti una volta e il tuo ordine andrà liscio.',
    items: [
      {
        title: 'Il profilo è pubblico',
        body: 'Tienilo pubblico fino alla fine della consegna. Un profilo privato impedisce all’ordine di partire o di finire.',
      },
      {
        title: 'Lo username è corretto',
        body: 'Consegniamo esattamente a ciò che scrivi. Copialo direttamente dal tuo profilo per stare tranquillo.',
      },
      {
        title: 'Lo username non cambia',
        body: 'Mantieni lo stesso username durante la consegna e i 6 mesi di refill, altrimenti non troveremo il profilo.',
      },
      {
        title: 'Sai che ritmo vuoi',
        body: 'Vuoi che i follower arrivino poco alla volta? Chiedi la consegna graduale al pagamento o su WhatsApp.',
      },
    ],
  },
  faq: {
    id: 'faq',
    kicker: 'Domande prima di ordinare?',
    title: 'Domande frequenti sui follower Instagram',
    intro: 'Non trovi la risposta? Scrivici su WhatsApp al +44 7454 758272, 24/7.',
    cta: 'Chiedici su WhatsApp',
    locale: {
      code: 'it',
    },
    extra: [
      {
        id: 'it-ig-followers-v2-1',
        question: 'È sicuro comprare follower Instagram?',
        answer: 'Con NovaLikes condividi solo il tuo username pubblico, quindi nessuno accede al tuo account, e paghi con un pagamento sicuro. L’unico rischio che nessun venditore può eliminare è Instagram: le sue regole scoraggiano i follower artificiali e rimuove regolarmente gli account inattivi o falsi. Per questo ogni ordine include 6 mesi di refill.',
      },
      {
        id: 'it-ig-followers-v2-2',
        question: 'Quanto costano i follower Instagram?',
        answer: 'I pacchetti partono da {fromPrice} per 100 follower, e il prezzo per follower scende quando il pacchetto cresce. Tutti i prezzi sono in dollari statunitensi, con pagamento unico e senza abbonamento.',
      },
      {
        id: 'it-ig-followers-v2-3',
        question: 'Il mio account può essere sospeso se compro follower?',
        answer: 'Non accediamo mai al tuo account, quindi dalla nostra parte non cambia nulla al suo interno. Instagram può rimuovere i follower che considera falsi e le sue regole scoraggiano la crescita artificiale, quindi un certo rischio c’è sempre. Una dimensione adatta al profilo, la consegna graduale e post regolari sono il modo sensato di usare un pacchetto.',
      },
      {
        id: 'it-ig-followers-v2-4',
        question: 'Perché il numero di follower è calato e cosa copre il refill?',
        answer: 'Instagram rimuove regolarmente gli account inattivi o falsi, quindi un piccolo calo è normale. Se i follower del tuo ordine calano entro 6 mesi dalla consegna, scrivici con il numero d’ordine e reintegriamo la differenza. Mantieni lo stesso username e il profilo pubblico mentre consegniamo il refill.',
      },
      {
        id: 'it-ig-followers-v2-5',
        question: 'Posso chiedere un rimborso?',
        answer: 'Gli ordini idonei sono coperti dalla nostra garanzia di rimborso di 30 giorni, a partire dalla data di acquisto. La politica di rimborso spiega quali ordini sono idonei e come inviare la richiesta.',
      },
      {
        id: 'it-ig-followers-v2-6',
        question: 'Quanti follower Instagram dovrei comprare?',
        answer: 'Scegli una dimensione che sembri naturale accanto al tuo numero attuale e a ciò che pubblichi. Un pacchetto piccolo è un buon primo ordine, poi puoi aggiungerne altri. Hai dubbi? Scrivici su WhatsApp.',
      },
      {
        id: 'it-ig-followers-v2-7',
        question: 'Quali metodi di pagamento posso usare?',
        answer: 'Puoi pagare con carta, Apple Pay o Google Pay, in dollari statunitensi. È un pagamento unico e nulla si rinnova.',
      },
    ],
  },
  more: {
    id: 'related-services',
    title: 'Altri servizi Instagram',
    intro: 'I follower Instagram cambiano un solo numero. Per farne crescere un altro, scegli un servizio.',
    services: [
      {
        slug: 'buy-instagram-likes',
        title: 'Comprare like Instagram',
        line: 'Per post, caroselli e Reel',
        image: '/assets/images/illustrations/instagram-likes/instagram-likes-hero.webp',
      },
      {
        slug: 'buy-instagram-views',
        title: 'Comprare visualizzazioni Instagram',
        line: 'Più occhi sui tuoi Reel',
        image: '/assets/images/illustrations/instagram-views/instagram-views-hero.webp',
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
