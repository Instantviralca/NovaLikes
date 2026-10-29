import type { ServiceV2Content } from '../../types';

/** Italian (/it) — v2 service page copy for buy-tiktok-likes. Primary keyword: "comprare like tiktok". Do not edit wording without the content owner. */
export const IT_BUY_TIKTOK_LIKES_V2 = {
  meta: {
    slug: 'buy-tiktok-likes',
    platform: 'TikTok',
    name: 'Like TikTok',
    unit: 'like',
    unitSingular: 'like',
    inputKind: 'link',
    perUnit: 1000,
    tiers: false,
    keywords: {
      primary: 'comprare like tiktok',
      secondary: [
        'comprare like per video tiktok',
        'pacchetti like tiktok',
        'prezzi like tiktok',
        'comprare cuori tiktok',
      ],
      questions: [
        'è sicuro comprare like tiktok',
        'quanto costano i like tiktok',
        'i like rendono virale un video',
        'posso dividere i like',
        'i like comprati calano',
      ],
    },
  },
  hero: {
    title: {
      lead: 'Comprare',
      highlight: 'like TikTok',
      tail: 'per il tuo video più importante',
    },
    subtitle: 'I cuori compaiono accanto al tuo video mentre scorre. Fai in modo che il tuo lancio, la tua collaborazione o la tua clip migliore mostri un numero all’altezza. Da {fromPrice}, con il solo link del video.',
    trust: [
      'Nessuna password',
      'Avvio in 6–8 ore',
      'Refill di 6 mesi',
    ],
  },
  picker: {
    id: 'pricing-packages',
    title: 'Pacchetti di like TikTok e prezzi',
    intro: 'Scegli un pacchetto. Prezzi in USD.',
    summaryName: '{quantity} like TikTok',
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
      highlight: 'i tuoi like TikTok?',
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
        body: 'Se i like del tuo ordine calano entro 6 mesi dalla consegna, mandaci il numero d’ordine e reintegriamo la differenza gratis.',
      },
      {
        icon: 'badge-check',
        tone: 'peach',
        title: 'Garanzia di rimborso di 30 giorni',
        body: 'Gli ordini idonei sono coperti per 30 giorni dalla data di acquisto. La nostra politica di rimborso spiega cosa è incluso.',
      },
      {
        icon: 'heart',
        tone: 'pink',
        title: 'Qualsiasi video pubblico',
        body: 'Ordina like per qualsiasi video TikTok pubblico. Ogni ordine copre un video.',
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
      highlight: 'like TikTok',
    },
    pill: 'Circa 2 minuti',
    intro: 'Ordinare richiede cinque brevi passaggi e circa due minuti. Ci serve solo il link a un video TikTok pubblico.',
    items: [
      {
        ui: 'public',
        title: 'Tieni il video pubblico',
        body: 'Il video deve essere pubblico, su un account pubblico, fino alla fine della consegna. Non eliminarlo.',
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
      count: 1000,
      unit: 'like',
      body: 'La maggior parte degli ordini parte entro 6–8 ore dal pagamento e termina 4–6 ore dopo l’avvio. Segui l’avanzamento nella pagina «Traccia ordine» con il tuo numero d’ordine.',
    },
  },
  ui: {
    toggle: {
      label: 'Video privato',
      sub: 'Disattivato per raggiungere il video',
    },
    chips: [
      '500',
      '1K',
      '2K',
      '5K',
    ],
    chipOn: 1,
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
      highlight: 'like TikTok',
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
    title: 'Refill e garanzia di rimborso per i tuoi like TikTok',
    intro: 'Entrambe le promesse sono scritte nella nostra politica di rimborso, non solo in questa pagina.',
    cards: [
      {
        chip: '6 mesi',
        title: 'Refill di 6 mesi',
        image: '/assets/images/illustrations/tiktok-likes/tiktok-likes-order-process.webp',
        body: 'Se i like del tuo ordine calano entro 6 mesi dalla data di consegna, scrivici su WhatsApp o via email con il numero d’ordine e reintegriamo la differenza gratis. Lascia il video online e pubblico mentre consegniamo un refill.',
      },
      {
        chip: '30 giorni',
        title: 'Garanzia di rimborso di 30 giorni',
        image: '/assets/images/illustrations/tiktok-likes/tiktok-likes-package-cta.webp',
        body: 'Gli ordini idonei possono essere rimborsati entro 30 giorni dall’acquisto. La politica di rimborso spiega cosa è idoneo e come fare richiesta.',
      },
    ],
    link: {
      label: 'Leggi la politica di rimborso',
      href: '/refund-policy',
    },
  },
  cost: {
    id: 'tiktok-likes-cost',
    title: {
      lead: 'Quanto costano i',
      highlight: 'like TikTok?',
    },
    intro: 'I like partono da {fromPrice} per 100, e il prezzo per like scende man mano che il pacchetto cresce. Ogni prezzo è un pagamento unico in dollari statunitensi per un video.',
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
    id: 'why-buy-tiktok-likes',
    title: {
      lead: 'Perché comprare',
      highlight: 'like TikTok?',
    },
    intro: 'Un TikTok con molte visualizzazioni ma pochi cuori fa esitare chi lo guarda. I like tengono i numeri in equilibrio, così il video sembra bello quanto è.',
    items: [
      {
        title: 'Video che sembrano apprezzati',
        body: 'Un buon numero di cuori mostra che ad altri il video è piaciuto.',
      },
      {
        title: 'Video fissati più forti',
        body: 'I video fissati sul tuo profilo lavorano molto. I like li fanno sembrare i tuoi migliori.',
      },
      {
        title: 'Link migliori fuori da TikTok',
        body: 'Quando condividi un TikTok su WhatsApp, Instagram o via email, è più invitante con un buon numero di like.',
      },
    ],
    diagram: [
      'Apprezzato',
      'Video fissati',
      'Link condivisi',
    ],
  },
  help: {
    id: 'does-buying-tiktok-likes-help',
    title: {
      lead: 'Serve davvero comprare',
      highlight: 'like TikTok?',
    },
    intro: 'I like cambiano i cuori di un video. TikTok decide comunque la portata in base a come lo guardano gli spettatori.',
    no: {
      title: 'Cosa non cambia',
      items: [
        'Visualizzazioni o follower da soli',
        'Il posizionamento nei Per te da solo',
        'Condivisioni, salvataggi o commenti spontanei',
      ],
    },
    yes: {
      title: 'Cosa cambia',
      items: [
        'I like del video che scegli',
        'Quanto appare apprezzato il video ai nuovi spettatori',
        'La forza dei video fissati e condivisi',
      ],
      image: '/assets/images/illustrations/tiktok-likes/tiktok-likes-does-help.webp',
      altFallback: 'Illustrazione: like TikTok',
    },
  },
  who: {
    id: 'who-orders',
    title: {
      lead: 'Chi compra',
      highlight: 'like TikTok',
    },
    cards: [
      {
        title: 'Venditori online',
        body: 'I negozi online aggiungono like ai video prodotto prima di usarli come annunci o di condividerli con i rivenditori.',
        image: '/assets/images/illustrations/tiktok-likes/tiktok-likes-best-practices.webp',
      },
      {
        title: 'Creator',
        body: 'I creator aggiungono like ai video di collaborazione e alle clip fissate, così il profilo si apre con video popolari.',
        image: '/assets/images/illustrations/tiktok-likes/tiktok-likes-hero.webp',
      },
      {
        title: 'Locali ed eventi',
        body: 'Bar, serate comedy e festival aggiungono like ai video del programma e dell’atmosfera prima della grande data.',
        image: '/assets/images/illustrations/tiktok-likes/tiktok-likes-why-buy.webp',
      },
    ],
    statement: 'Qualunque sia il video, l’ordine funziona allo stesso modo: un link pubblico, il pacchetto che scegli e like che di solito partono entro 6–8 ore. Senza login.',
  },
  vs: {
    id: 'tiktok-likes-vs-other-services',
    title: {
      lead: 'Like TikTok o',
      highlight: 'visualizzazioni e follower',
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
        slug: 'buy-tiktok-likes',
        label: 'Like',
        changes: 'I like di un video',
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
      highlight: 'like TikTok?',
    },
    lead: 'Dipende da tre cose: il tuo account, il tuo pagamento e la tua privacy. Ecco come funziona ognuna con NovaLikes, più l’unico rischio che nessun venditore può eliminare.',
    body: 'Le Linee guida della community di TikTok vietano le interazioni false, e TikTok rimuove regolarmente gli account che considera inattivi o falsi. Per questo dopo la consegna può esserci un piccolo calo, e per questo ogni ordine include 6 mesi di refill. Like in proporzione alle visualizzazioni sembrano più naturali.',
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
      highlight: 'like TikTok',
    },
    lead: 'Controlla questi quattro punti una volta e il tuo ordine andrà liscio.',
    items: [
      {
        title: 'Il video è pubblico',
        body: 'I like non arrivano a un video privato né a un video di un account privato.',
      },
      {
        title: 'Il link è quello del video',
        body: 'Copialo da «Condividi». È fatto così: tiktok.com/@nome/video/…, non come il link del tuo profilo.',
      },
      {
        title: 'Il video resta online',
        body: 'Non eliminarlo durante la consegna e i 6 mesi di refill.',
      },
      {
        title: 'I like sono coerenti con le visualizzazioni',
        body: 'Migliaia di like con poche centinaia di visualizzazioni sembrano strani. Scegli una dimensione adatta o aggiungi visualizzazioni.',
      },
    ],
  },
  faq: {
    id: 'faq',
    kicker: 'Domande prima di ordinare?',
    title: 'Domande frequenti sui like TikTok',
    intro: 'Non trovi la risposta? Scrivici su WhatsApp al +44 7454 758272, 24/7.',
    cta: 'Chiedici su WhatsApp',
    locale: {
      code: 'it',
    },
    extra: [
      {
        id: 'it-tt-likes-v2-1',
        question: 'Posso dividere un pacchetto di like su più video?',
        answer: 'No. Ogni ordine copre un video, così consegna e refill sono facili da seguire.',
      },
      {
        id: 'it-tt-likes-v2-2',
        question: 'Posso chiedere un rimborso?',
        answer: 'Gli ordini idonei sono coperti dalla nostra garanzia di rimborso di 30 giorni, a partire dalla data di acquisto. La politica di rimborso spiega quali ordini sono idonei e come inviare la richiesta.',
      },
      {
        id: 'it-tt-likes-v2-3',
        question: 'Quali metodi di pagamento posso usare?',
        answer: 'Puoi pagare con carta, Apple Pay o Google Pay, in dollari statunitensi. È un pagamento unico e nulla si rinnova.',
      },
    ],
  },
  more: {
    id: 'related-services',
    title: 'Altri servizi NovaLikes',
    intro: 'I like TikTok cambiano un solo numero. Per farne crescere un altro, scegli un servizio.',
    services: [
      {
        slug: 'buy-tiktok-views',
        title: 'Comprare visualizzazioni TikTok',
        line: 'Una partenza migliore per un video',
        image: '/assets/images/illustrations/tiktok-views/tiktok-views-hero.webp',
      },
      {
        slug: 'buy-tiktok-followers',
        title: 'Comprare follower TikTok',
        line: 'Fai crescere il tuo profilo TikTok',
        image: '/assets/images/illustrations/tiktok-followers/tiktok-followers-hero.webp',
      },
      {
        slug: 'buy-instagram-likes',
        title: 'Comprare like Instagram',
        line: 'Per post, caroselli e Reel',
        image: '/assets/images/illustrations/instagram-likes/instagram-likes-hero.webp',
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
