import type { ServiceV2Content } from '../../types';

/** Italian (/it) — v2 service page copy for buy-facebook-followers. Primary keyword: "comprare follower facebook". Do not edit wording without the content owner. */
export const IT_BUY_FACEBOOK_FOLLOWERS_V2 = {
  meta: {
    slug: 'buy-facebook-followers',
    platform: 'Facebook',
    name: 'Follower Facebook',
    unit: 'follower',
    unitSingular: 'follower',
    inputKind: 'link',
    perUnit: 1000,
    tiers: false,
    keywords: {
      primary: 'comprare follower facebook',
      secondary: [
        'comprare follower per pagina facebook',
        'pacchetti follower facebook',
        'prezzi follower facebook',
        'far crescere una pagina facebook',
      ],
      questions: [
        'è sicuro comprare follower facebook',
        'quanto costano i follower facebook',
        'serve l’accesso da amministratore',
        'funziona con un profilo personale',
        'perché i follower calano',
      ],
    },
  },
  hero: {
    title: {
      lead: 'Comprare',
      highlight: 'follower Facebook',
      tail: 'per una Pagina che ispira fiducia',
    },
    subtitle: 'Molte persone guardano la Pagina Facebook di un’attività prima di chiamare, prenotare o passare. Ottieni un numero di follower che rassicura. Da {fromPrice}, con il solo link della Pagina.',
    trust: [
      'Nessuna password',
      'Avvio in 6–8 ore',
      'Refill di 6 mesi',
    ],
  },
  picker: {
    id: 'pricing-packages',
    title: 'Pacchetti di follower Facebook e prezzi',
    intro: 'Scegli un pacchetto. Prezzi in USD.',
    summaryName: '{quantity} follower Facebook',
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
      highlight: 'i tuoi follower Facebook?',
    },
    items: [
      {
        icon: 'shield',
        tone: 'mint',
        title: 'Un link, nessun accesso da amministratore',
        body: 'Ci serve solo il link pubblico della tua Pagina o del tuo profilo. Nessuna password, nessun ruolo da amministratore e nessun accesso al tuo account.',
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
        icon: 'users',
        tone: 'pink',
        title: 'Pagine e profili pubblici',
        body: 'Funziona con le Pagine Facebook e con i profili personali che hanno «Chi può seguirmi» impostato su Pubblico. Senza accesso da amministratore.',
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
      highlight: 'follower Facebook',
    },
    pill: 'Circa 2 minuti',
    intro: 'Ordinare richiede cinque brevi passaggi e circa due minuti. Ci serve solo il link pubblico della tua Pagina o del tuo profilo.',
    items: [
      {
        ui: 'public',
        title: 'Permetti di seguirti',
        body: 'Tieni la Pagina pubblicata. Su un profilo personale, imposta «Chi può seguirmi» su Pubblico in «Follower e contenuti pubblici».',
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
        body: 'Copia il link della tua Pagina o del tuo profilo, per esempio facebook.com/tuapagina, e incollalo al pagamento.',
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
      highlight: 'follower Facebook',
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
    title: 'Refill e garanzia di rimborso per i tuoi follower Facebook',
    intro: 'Entrambe le promesse sono scritte nella nostra politica di rimborso, non solo in questa pagina.',
    cards: [
      {
        chip: '6 mesi',
        title: 'Refill di 6 mesi',
        image: '/assets/images/illustrations/facebook-followers/facebook-followers-order-process.webp',
        body: 'Se i follower del tuo ordine calano entro 6 mesi dalla data di consegna, scrivici su WhatsApp o via email con il numero d’ordine e reintegriamo la differenza gratis. Mantieni lo stesso URL della Pagina e la Pagina pubblica mentre consegniamo un refill.',
      },
      {
        chip: '30 giorni',
        title: 'Garanzia di rimborso di 30 giorni',
        image: '/assets/images/illustrations/facebook-followers/facebook-followers-package-cta.webp',
        body: 'Gli ordini idonei possono essere rimborsati entro 30 giorni dall’acquisto. La politica di rimborso spiega cosa è idoneo e come fare richiesta.',
      },
    ],
    link: {
      label: 'Leggi la politica di rimborso',
      href: '/refund-policy',
    },
  },
  cost: {
    id: 'facebook-followers-cost',
    title: {
      lead: 'Quanto costano i',
      highlight: 'follower Facebook?',
    },
    intro: 'I follower partono da {fromPrice} per 100, e il prezzo per 1.000 scende man mano che il pacchetto cresce. Ogni prezzo è un pagamento unico in dollari statunitensi per una Pagina o un profilo.',
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
    id: 'why-buy-facebook-followers',
    title: {
      lead: 'Perché comprare',
      highlight: 'follower Facebook?',
    },
    intro: 'Facebook è ancora il posto dove molti controllano orari, novità e attività della zona. Un buon numero di follower fa sembrare attiva la tua Pagina a prima vista.',
    items: [
      {
        title: 'Una Pagina che sembra aperta',
        body: 'Una Pagina con 60 follower può sembrare abbandonata anche quando l’attività va bene.',
      },
      {
        title: 'Fiducia prima della prima chiamata',
        body: 'Artigiani, studi medici e saloni vengono controllati su Facebook prima che qualcuno li contatti.',
      },
      {
        title: 'Una spinta per le Pagine nuove',
        body: 'Attività nuove, seconde sedi e rebranding non partono da zero.',
      },
    ],
    diagram: [
      'Sembra aperta',
      'Fiducia',
      'Pagina nuova',
    ],
  },
  help: {
    id: 'does-buying-facebook-followers-help',
    title: {
      lead: 'Serve davvero comprare',
      highlight: 'follower Facebook?',
    },
    intro: 'I follower cambiano il numero della tua Pagina o del tuo profilo. Da soli non cambiano chi vede i tuoi post.',
    no: {
      title: 'Cosa non cambia',
      items: [
        'Reazioni o commenti ai tuoi post',
        'La tua portata organica da sola',
        'Richieste senza post utili e contatti chiari',
      ],
    },
    yes: {
      title: 'Cosa cambia',
      items: [
        'Il numero di follower della tua Pagina o del tuo profilo',
        'Quanto appare avviata la Pagina ai nuovi visitatori',
        'La prima impressione prima di una chiamata o una prenotazione',
      ],
      image: '/assets/images/illustrations/facebook-followers/facebook-followers-does-help.webp',
      altFallback: 'Illustrazione: follower Facebook',
    },
  },
  who: {
    id: 'who-orders',
    title: {
      lead: 'Chi compra',
      highlight: 'follower Facebook',
    },
    cards: [
      {
        title: 'Artigiani',
        body: 'Idraulici, elettricisti e imprese edili aggiungono follower perché la loro Pagina sembri affidabile quanto il loro lavoro.',
        image: '/assets/images/illustrations/facebook-followers/facebook-followers-best-practices.webp',
      },
      {
        title: 'Servizi locali',
        body: 'Studi, toelettature e autoscuole fanno crescere la Pagina prima di un’offerta o dell’apertura di nuovi appuntamenti.',
        image: '/assets/images/illustrations/facebook-followers/facebook-followers-hero.webp',
      },
      {
        title: 'Associazioni e gruppi',
        body: 'Club, mercati e associazioni aggiungono follower perché la loro Pagina sembri attiva ai nuovi membri.',
        image: '/assets/images/illustrations/facebook-followers/facebook-followers-why-buy.webp',
      },
    ],
    statement: 'Qualunque sia la Pagina, l’ordine funziona allo stesso modo: un link pubblico, un pacchetto adatto e follower che di solito partono entro 6–8 ore. Né accesso da amministratore né password.',
  },
  vs: {
    id: 'facebook-followers-vs-other-services',
    title: {
      lead: 'Follower Facebook o',
      highlight: 'like alla Pagina e ai post',
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
        slug: 'buy-facebook-followers',
        label: 'Follower',
        changes: 'I follower di una Pagina o di un profilo',
        needs: 'Un link alla Pagina o al profilo',
        current: true,
      },
      {
        slug: 'buy-facebook-page-likes',
        label: 'Like alla Pagina',
        changes: 'I like di una Pagina in formato classico',
        needs: 'Un link alla Pagina',
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
      highlight: 'follower Facebook?',
    },
    lead: 'Dipende da tre cose: il tuo account, il tuo pagamento e la tua privacy. Ecco come funziona ognuna con NovaLikes, più l’unico rischio che nessun venditore può eliminare.',
    body: 'Gli Standard della community di Facebook vietano i comportamenti non autentici, e Meta rimuove regolarmente gli account falsi o inattivi. Per questo dopo la consegna può esserci un piccolo calo, e per questo ogni ordine include 6 mesi di refill. La consegna graduale e post regolari mantengono una crescita naturale.',
    cards: [
      {
        ui: 'nopass',
        title: 'Sicurezza dell’account',
        body: 'Ci serve solo il link pubblico della tua Pagina o del tuo profilo: nessuno accede e non servono permessi da amministratore. Non chiediamo mai una password o un codice di accesso. Se qualcuno che dice di essere NovaLikes te lo chiede, non siamo noi.',
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
      highlight: 'follower Facebook',
    },
    lead: 'Controlla questi quattro punti una volta e il tuo ordine andrà liscio.',
    items: [
      {
        title: 'Si può seguire',
        body: 'La Pagina deve essere pubblicata, oppure il profilo deve accettare follower pubblici.',
      },
      {
        title: 'Il link è giusto',
        body: 'Copia il link della Pagina o del profilo, per esempio facebook.com/tuapagina, non quello di un post.',
      },
      {
        title: 'L’URL non cambia',
        body: 'Mantieni lo stesso indirizzo durante la consegna e i 6 mesi di refill.',
      },
      {
        title: 'La dimensione è adatta',
        body: 'Scegli un pacchetto che sembri naturale accanto ai tuoi follower attuali e a ciò che pubblichi.',
      },
    ],
  },
  faq: {
    id: 'faq',
    kicker: 'Domande prima di ordinare?',
    title: 'Domande frequenti sui follower Facebook',
    intro: 'Non trovi la risposta? Scrivici su WhatsApp al +44 7454 758272, 24/7.',
    cta: 'Chiedici su WhatsApp',
    locale: {
      code: 'it',
    },
    extra: [
      {
        id: 'it-fb-followers-v2-1',
        question: 'Vi serve l’accesso da amministratore alla mia Pagina?',
        answer: 'No. Ci serve solo il link pubblico. Non dare a nessuno l’accesso da amministratore o la tua password di Facebook per ottenere follower.',
      },
      {
        id: 'it-fb-followers-v2-2',
        question: 'Posso chiedere un rimborso?',
        answer: 'Gli ordini idonei sono coperti dalla nostra garanzia di rimborso di 30 giorni, a partire dalla data di acquisto. La politica di rimborso spiega quali ordini sono idonei e come inviare la richiesta.',
      },
      {
        id: 'it-fb-followers-v2-3',
        question: 'Quali metodi di pagamento posso usare?',
        answer: 'Puoi pagare con carta, Apple Pay o Google Pay, in dollari statunitensi. È un pagamento unico e nulla si rinnova.',
      },
    ],
  },
  more: {
    id: 'related-services',
    title: 'Altri servizi NovaLikes',
    intro: 'I follower Facebook cambiano un solo numero. Per farne crescere un altro, scegli un servizio.',
    services: [
      {
        slug: 'buy-facebook-page-likes',
        title: 'Comprare like per Pagina Facebook',
        line: 'Per le Pagine che mostrano i like',
        image: '/assets/images/illustrations/facebook-page-likes/facebook-page-likes-hero.webp',
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
