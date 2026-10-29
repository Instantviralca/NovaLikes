import type { ServiceV2Content } from '../../types';

/** Italian (/it) — v2 service page copy for buy-instagram-likes. Primary keyword: "comprare like instagram". Do not edit wording without the content owner. */
export const IT_BUY_INSTAGRAM_LIKES_V2 = {
  meta: {
    slug: 'buy-instagram-likes',
    platform: 'Instagram',
    name: 'Like Instagram',
    unit: 'like',
    unitSingular: 'like',
    inputKind: 'link',
    perUnit: 1000,
    tiers: false,
    keywords: {
      primary: 'comprare like instagram',
      secondary: [
        'comprare like per reel',
        'pacchetti like instagram',
        'comprare mi piace instagram',
        'prezzi like instagram',
      ],
      questions: [
        'è sicuro comprare like instagram',
        'quanto costano i like instagram',
        'si possono comprare like per i reel',
        'i like comprati spariscono',
        'serve comprare like',
      ],
    },
  },
  hero: {
    title: {
      lead: 'Comprare',
      highlight: 'like Instagram',
      tail: 'per post e Reel che si fanno notare',
    },
    subtitle: 'Fai sembrare le tue foto, i caroselli e i Reel migliori popolari quanto meritano. I like danno riprova sociale a qualsiasi post pubblico, da {fromPrice} e senza login.',
    trust: [
      'Nessuna password',
      'Avvio in 6–8 ore',
      'Refill di 6 mesi',
    ],
  },
  picker: {
    id: 'pricing-packages',
    title: 'Pacchetti di like Instagram e prezzi',
    intro: 'Scegli un pacchetto. Prezzi in USD.',
    summaryName: '{quantity} like Instagram',
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
      highlight: 'i tuoi like Instagram?',
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
        body: 'Se i like del tuo ordine calano entro 6 mesi dalla consegna, mandaci il numero d’ordine e reintegriamo la differenza gratis.',
      },
      {
        icon: 'badge-check',
        tone: 'peach',
        title: 'Garanzia di rimborso di 30 giorni',
        body: 'Gli ordini idonei sono coperti per 30 giorni dalla data di acquisto. La nostra politica di rimborso spiega cosa è incluso.',
      },
      {
        icon: 'image',
        tone: 'pink',
        title: 'Post, caroselli e Reel',
        body: 'Ordina like per qualsiasi foto, carosello o Reel pubblico. Ogni ordine copre un post, così il tuo contenuto migliore riceve esattamente la spinta che scegli.',
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
      highlight: 'like Instagram',
    },
    pill: 'Circa 2 minuti',
    intro: 'Ordinare richiede cinque brevi passaggi e circa due minuti. Ci serve solo il link a un post o a un Reel pubblico.',
    items: [
      {
        ui: 'public',
        title: 'Tieni il post pubblico',
        body: 'Il post o il Reel deve essere su un account pubblico fino alla fine della consegna. Non eliminarlo e non archiviarlo durante l’ordine.',
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
        title: 'Incolla il link',
        body: 'Apri il post, tocca i tre puntini o «Condividi», scegli «Copia link» e incollalo al pagamento, insieme alla tua email.',
      },
      {
        ui: 'pay',
        title: 'Paga in modo sicuro',
        body: 'Paghi una sola volta con carta, Apple Pay o Google Pay, in dollari statunitensi. Nessun abbonamento.',
      },
    ],
    done: {
      title: 'Fatto!',
      count: 2500,
      unit: 'like',
      body: 'La maggior parte degli ordini parte entro 6–8 ore dal pagamento e termina 4–6 ore dopo l’avvio. Segui l’avanzamento nella pagina «Traccia ordine» con il tuo numero d’ordine.',
    },
  },
  ui: {
    toggle: {
      label: 'Account privato',
      sub: 'Disattivato per raggiungere il post',
    },
    chips: [
      '500',
      '1K',
      '2.5K',
      '5K',
    ],
    chipOn: 2,
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
      highlight: 'like Instagram',
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
    title: 'Refill e garanzia di rimborso per i tuoi like Instagram',
    intro: 'Entrambe le promesse sono scritte nella nostra politica di rimborso, non solo in questa pagina.',
    cards: [
      {
        chip: '6 mesi',
        title: 'Refill di 6 mesi',
        image: '/assets/images/illustrations/instagram-likes/instagram-likes-order-process.webp',
        body: 'Se i like del tuo ordine calano entro 6 mesi dalla data di consegna, scrivici su WhatsApp o via email con il numero d’ordine e reintegriamo la differenza gratis. Lascia il post o il Reel online e pubblico mentre consegniamo un refill.',
      },
      {
        chip: '30 giorni',
        title: 'Garanzia di rimborso di 30 giorni',
        image: '/assets/images/illustrations/instagram-likes/instagram-likes-package-cta.webp',
        body: 'Gli ordini idonei possono essere rimborsati entro 30 giorni dall’acquisto. La politica di rimborso spiega cosa è idoneo e come fare richiesta.',
      },
    ],
    link: {
      label: 'Leggi la politica di rimborso',
      href: '/refund-policy',
    },
  },
  cost: {
    id: 'instagram-likes-cost',
    title: {
      lead: 'Quanto costano i',
      highlight: 'like Instagram?',
    },
    intro: 'I like partono da {fromPrice} per 50, e il prezzo per like scende man mano che il pacchetto cresce. Ogni prezzo è un pagamento unico in dollari statunitensi per un post o un Reel.',
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
    id: 'why-buy-instagram-likes',
    title: {
      lead: 'Perché comprare',
      highlight: 'like Instagram?',
    },
    intro: 'Il numero di like è il segnale più rapido che la gente legge su un post. Se sembra basso, un buon contenuto passa inosservato. Un pacchetto di like fa salire quel numero sui post che contano di più per te.',
    items: [
      {
        title: 'Post che fermano lo scroll',
        body: 'La gente vede i like prima di leggere la didascalia. Un buon numero fa meritare a una foto o a un Reel un secondo sguardo.',
      },
      {
        title: 'Supporto per lanci e offerte',
        body: 'Lanci, nuovi menu e promozioni partono meglio se il post non resta a una manciata di like.',
      },
      {
        title: 'Un profilo più equilibrato',
        body: 'Post vecchi con pochi like accanto ad altri con centinaia rendono il profilo disomogeneo. I like lo riequilibrano.',
      },
    ],
    diagram: [
      'Ferma lo scroll',
      'Lanci',
      'Profilo equilibrato',
    ],
  },
  help: {
    id: 'does-buying-instagram-likes-help',
    title: {
      lead: 'Serve davvero comprare',
      highlight: 'like Instagram?',
    },
    intro: 'I like cambiano il numero sotto un post. Da soli non cambiano il modo in cui Instagram lo posiziona. Ecco il quadro onesto.',
    no: {
      title: 'Cosa non cambia',
      items: [
        'I tuoi follower, visualizzazioni o commenti',
        'Il posizionamento in Esplora o Reel da solo',
        'Vendite o messaggi senza un buon post alle spalle',
      ],
    },
    yes: {
      title: 'Cosa cambia',
      items: [
        'I like del post o del Reel che scegli',
        'Quanto appare popolare il post ai nuovi visitatori',
        'La prima impressione di lanci e promozioni',
      ],
      image: '/assets/images/illustrations/instagram-likes/instagram-likes-does-help.webp',
      altFallback: 'Illustrazione: like Instagram',
    },
  },
  who: {
    id: 'who-orders',
    title: {
      lead: 'Chi compra',
      highlight: 'like Instagram',
    },
    cards: [
      {
        title: 'Creator',
        body: 'I creator aggiungono like ai Reel e ai caroselli più forti, quelli che vogliono far vedere per primi ai nuovi visitatori.',
        image: '/assets/images/illustrations/instagram-likes/instagram-likes-best-practices.webp',
      },
      {
        title: 'Piccole attività',
        body: 'Negozi, saloni e bar usano i like su offerte, nuovi menu e foto prodotto, così le promozioni non sembrano ignorate.',
        image: '/assets/images/illustrations/instagram-likes/instagram-likes-hero.webp',
      },
      {
        title: 'Brand e agenzie',
        body: 'Brand e agenzie aggiungono like a post di campagna e collaborazioni, spesso con consegna graduale.',
        image: '/assets/images/illustrations/instagram-likes/instagram-likes-why-buy.webp',
      },
    ],
    statement: 'Qualunque sia il post, l’ordine funziona allo stesso modo: un link pubblico, il pacchetto che scegli e un numero che di solito inizia a salire entro 6–8 ore. Nessuno ha bisogno dei tuoi dati di accesso.',
  },
  vs: {
    id: 'instagram-likes-vs-other-services',
    title: {
      lead: 'Like Instagram o',
      highlight: 'follower, visualizzazioni e commenti',
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
        slug: 'buy-instagram-likes',
        label: 'Like',
        changes: 'I like di un post o di un Reel',
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
      highlight: 'like Instagram?',
    },
    lead: 'Dipende da tre cose: il tuo account, il tuo pagamento e la tua privacy. Ecco come funziona ognuna con NovaLikes, più l’unico rischio che nessun venditore può eliminare.',
    body: 'Le Linee guida della community di Instagram chiedono di non ottenere like, follower o condivisioni in modo artificiale, e Instagram rimuove regolarmente gli account che considera inattivi o falsi. Per questo dopo la consegna può esserci un piccolo calo, e per questo ogni ordine include 6 mesi di refill. Una dimensione adatta al post e la consegna graduale sembrano più naturali.',
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
      highlight: 'like Instagram',
    },
    lead: 'Controlla questi quattro punti una volta e il tuo ordine andrà liscio.',
    items: [
      {
        title: 'Il post è pubblico',
        body: 'Deve essere su un account pubblico fino alla fine della consegna.',
      },
      {
        title: 'Il link è quello del post',
        body: 'Copia il link del post stesso, non quello del tuo profilo. È fatto così: instagram.com/p/… o instagram.com/reel/….',
      },
      {
        title: 'Il post resta online',
        body: 'Non eliminarlo e non archiviarlo durante la consegna e i 6 mesi di refill.',
      },
      {
        title: 'I like sono visibili',
        body: 'Se hai nascosto il numero di like, arrivano comunque ma nessuno li vede. Rendilo di nuovo visibile.',
      },
    ],
  },
  faq: {
    id: 'faq',
    kicker: 'Domande prima di ordinare?',
    title: 'Domande frequenti sui like Instagram',
    intro: 'Non trovi la risposta? Scrivici su WhatsApp al +44 7454 758272, 24/7.',
    cta: 'Chiedici su WhatsApp',
    locale: {
      code: 'it',
    },
    extra: [
      {
        id: 'it-ig-likes-v2-1',
        question: 'Quanti like Instagram dovrei comprare?',
        answer: 'Scegli un numero adatto al post e al tuo account. Qualche centinaio di like va bene per la maggior parte dei post di account piccoli; account grandi e campagne reggono qualche migliaio. Nel dubbio, parti in piccolo.',
      },
      {
        id: 'it-ig-likes-v2-2',
        question: 'Posso dividere un pacchetto di like su più post?',
        answer: 'No. Ogni ordine copre un post o un Reel, così consegna e refill sono facili da seguire. Per più post, fai un ordine per ciascuno.',
      },
      {
        id: 'it-ig-likes-v2-3',
        question: 'Posso chiedere un rimborso?',
        answer: 'Gli ordini idonei sono coperti dalla nostra garanzia di rimborso di 30 giorni, a partire dalla data di acquisto. La politica di rimborso spiega quali ordini sono idonei e come inviare la richiesta.',
      },
      {
        id: 'it-ig-likes-v2-4',
        question: 'Quali metodi di pagamento posso usare?',
        answer: 'Puoi pagare con carta, Apple Pay o Google Pay, in dollari statunitensi. È un pagamento unico e nulla si rinnova.',
      },
    ],
  },
  more: {
    id: 'related-services',
    title: 'Altri servizi Instagram',
    intro: 'I like Instagram cambiano un solo numero. Per farne crescere un altro, scegli un servizio.',
    services: [
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
