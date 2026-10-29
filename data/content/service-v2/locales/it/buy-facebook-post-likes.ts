import type { ServiceV2Content } from '../../types';

/** Italian (/it) — v2 service page copy for buy-facebook-post-likes. Primary keyword: "comprare like post facebook". Do not edit wording without the content owner. */
export const IT_BUY_FACEBOOK_POST_LIKES_V2 = {
  meta: {
    slug: 'buy-facebook-post-likes',
    platform: 'Facebook',
    name: 'Like per post Facebook',
    unit: 'like',
    unitSingular: 'like',
    inputKind: 'link',
    perUnit: 1000,
    tiers: false,
    keywords: {
      primary: 'comprare like post facebook',
      secondary: [
        'comprare like per post facebook',
        'comprare reazioni facebook',
        'prezzi like post facebook',
        'like per un post facebook',
      ],
      questions: [
        'posso scegliere love o altre reazioni',
        'il post deve essere pubblico',
        'quanto costano i like ai post',
        'è sicuro comprare like facebook',
        'posso dividere i like',
      ],
    },
  },
  hero: {
    title: {
      lead: 'Comprare',
      highlight: 'like per post Facebook',
      tail: 'che danno peso al tuo post migliore',
    },
    subtitle: 'Un evento, un’offerta o una grande notizia meritano più di un paio di reazioni. Dai a un post pubblico la risposta che merita. Da {fromPrice}, anche con «Love» e altre reazioni su richiesta.',
    trust: [
      'Nessuna password',
      'Avvio in 6–8 ore',
      'Refill di 6 mesi',
    ],
  },
  picker: {
    id: 'pricing-packages',
    title: 'Pacchetti di like per post Facebook e prezzi',
    intro: 'Scegli un pacchetto. Prezzi in USD.',
    summaryName: '{quantity} like per post Facebook',
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
      highlight: 'i tuoi like per post Facebook?',
    },
    items: [
      {
        icon: 'shield',
        tone: 'mint',
        title: 'Un link, nessun accesso da amministratore',
        body: 'Ci serve solo il link pubblico del post. Nessuna password, nessun ruolo da amministratore e nessun accesso al tuo account.',
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
        title: '«Love» e altre reazioni',
        body: 'Di base arrivano «Mi piace». Preferisci «Love» o un’altra reazione? Scrivilo nella nota dell’ordine prima dell’avvio.',
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
      highlight: 'like per post Facebook',
    },
    pill: 'Circa 2 minuti',
    intro: 'Ordinare richiede cinque brevi passaggi e circa due minuti. Ci serve solo il link a un post pubblico.',
    items: [
      {
        ui: 'public',
        title: 'Imposta il post su Pubblico',
        body: 'Cerca l’icona del mappamondo accanto alla data. I post per amici o per un elenco personalizzato non possono ricevere ordini.',
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
        title: 'Incolla il link del post',
        body: 'Apri il post, tocca «Condividi» e «Copia link», e incollalo al pagamento. Indica la reazione nella nota se non è «Mi piace».',
      },
      {
        ui: 'pay',
        title: 'Paga in modo sicuro',
        body: 'Paghi una sola volta con carta, Apple Pay o Google Pay, in dollari statunitensi. Nessun abbonamento.',
      },
    ],
    done: {
      title: 'Fatto!',
      count: 500,
      unit: 'like',
      body: 'La maggior parte degli ordini parte entro 6–8 ore dal pagamento e termina 4–6 ore dopo l’avvio. Segui l’avanzamento nella pagina «Traccia ordine» con il tuo numero d’ordine.',
    },
  },
  ui: {
    toggle: {
      label: 'Solo amici',
      sub: 'Disattivato per renderlo Pubblico',
    },
    chips: [
      '250',
      '500',
      '1K',
      '2.5K',
    ],
    chipOn: 1,
    input: {
      prefix: '',
      placeholder: 'facebook.com/…/posts/…',
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
      highlight: 'like per post Facebook',
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
    title: 'Refill e garanzia di rimborso per i tuoi like per post Facebook',
    intro: 'Entrambe le promesse sono scritte nella nostra politica di rimborso, non solo in questa pagina.',
    cards: [
      {
        chip: '6 mesi',
        title: 'Refill di 6 mesi',
        image: '/assets/images/illustrations/facebook-post-likes/facebook-post-likes-order-process.webp',
        body: 'Se i like del tuo ordine calano entro 6 mesi dalla data di consegna, scrivici su WhatsApp o via email con il numero d’ordine e reintegriamo la differenza gratis. Lascia il post online e pubblico mentre consegniamo un refill.',
      },
      {
        chip: '30 giorni',
        title: 'Garanzia di rimborso di 30 giorni',
        image: '/assets/images/illustrations/facebook-post-likes/facebook-post-likes-package-cta.webp',
        body: 'Gli ordini idonei possono essere rimborsati entro 30 giorni dall’acquisto. La politica di rimborso spiega cosa è idoneo e come fare richiesta.',
      },
    ],
    link: {
      label: 'Leggi la politica di rimborso',
      href: '/refund-policy',
    },
  },
  cost: {
    id: 'facebook-post-likes-cost',
    title: {
      lead: 'Quanto costano i',
      highlight: 'like per post Facebook?',
    },
    intro: 'I like ai post partono da {fromPrice} per 100, e il prezzo per like scende man mano che il pacchetto cresce. Ogni prezzo è un pagamento unico in dollari statunitensi per un post.',
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
    id: 'why-buy-facebook-post-likes',
    title: {
      lead: 'Perché comprare',
      highlight: 'like per post Facebook?',
    },
    intro: 'Su Facebook le reazioni sono il segnale più rapido che un post conta. Poche reazioni su un annuncio importante lo fanno sembrare ignorato, anche se dal vivo è piaciuto molto.',
    items: [
      {
        title: 'Eventi che sembrano affollati',
        body: 'Serate quiz, open day e iniziative benefiche attirano di più con tante reazioni.',
      },
      {
        title: 'Offerte che si notano',
        body: 'I post promozionali con un buon numero meritano un secondo sguardo.',
      },
      {
        title: 'Grandi notizie ben festeggiate',
        body: 'Aperture, anniversari e premi meritano una risposta all’altezza.',
      },
    ],
    diagram: [
      'Affollato',
      'Offerta visibile',
      'Festeggiato',
    ],
  },
  help: {
    id: 'does-buying-facebook-post-likes-help',
    title: {
      lead: 'Serve davvero comprare',
      highlight: 'like per post Facebook?',
    },
    intro: 'I like ai post cambiano le reazioni di un post pubblico. Ecco cosa fanno e cosa no.',
    no: {
      title: 'Cosa non cambia',
      items: [
        'Follower o like alla Pagina',
        'Commenti o condivisioni',
        'A quante persone Facebook mostra i tuoi prossimi post',
      ],
    },
    yes: {
      title: 'Cosa cambia',
      items: [
        'Le reazioni del post scelto',
        'Quanto appare popolare il post',
        'La prima impressione di eventi, offerte e annunci',
      ],
      image: '/assets/images/illustrations/facebook-post-likes/facebook-post-likes-does-help.webp',
      altFallback: 'Illustrazione: like per post Facebook',
    },
  },
  who: {
    id: 'who-orders',
    title: {
      lead: 'Chi compra',
      highlight: 'like per post Facebook',
    },
    cards: [
      {
        title: 'Bar e locali',
        body: 'Bar, club e locali aggiungono reazioni a serate quiz, musica dal vivo e partite.',
        image: '/assets/images/illustrations/facebook-post-likes/facebook-post-likes-best-practices.webp',
      },
      {
        title: 'Scuole, club e associazioni',
        body: 'Società sportive, comitati di genitori e associazioni aggiungono reazioni a iniziative benefiche e annunci.',
        image: '/assets/images/illustrations/facebook-post-likes/facebook-post-likes-hero.webp',
      },
      {
        title: 'Attività locali',
        body: 'Negozi e servizi aggiungono reazioni a offerte e inaugurazioni, a volte come «Love» invece di «Mi piace».',
        image: '/assets/images/illustrations/facebook-post-likes/facebook-post-likes-why-buy.webp',
      },
    ],
    statement: 'Qualunque sia il post, l’ordine funziona allo stesso modo: un link pubblico, il pacchetto e la reazione che scegli, e like che di solito partono entro 6–8 ore. Senza login.',
  },
  vs: {
    id: 'facebook-post-likes-vs-other-services',
    title: {
      lead: 'Like ai post o',
      highlight: 'follower e like alla Pagina',
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
        slug: 'buy-facebook-post-likes',
        label: 'Like ai post',
        changes: 'Le reazioni a un post pubblico',
        needs: 'Un link al post',
        current: true,
      },
      {
        slug: 'buy-facebook-followers',
        label: 'Follower',
        changes: 'I follower di una Pagina o di un profilo',
        needs: 'Un link alla Pagina o al profilo',
      },
      {
        slug: 'buy-facebook-page-likes',
        label: 'Like alla Pagina',
        changes: 'I like di una Pagina in formato classico',
        needs: 'Un link alla Pagina',
      },
    ],
    currentLabel: 'Questa pagina',
  },
  safe: {
    id: 'is-it-safe',
    title: {
      lead: 'È sicuro comprare',
      highlight: 'like per post Facebook?',
    },
    lead: 'Dipende da tre cose: il tuo account, il tuo pagamento e la tua privacy. Ecco come funziona ognuna con NovaLikes, più l’unico rischio che nessun venditore può eliminare.',
    body: 'Gli Standard della community di Facebook vietano i comportamenti non autentici, e Meta rimuove regolarmente gli account falsi o inattivi. Per questo dopo la consegna può esserci un piccolo calo, e per questo ogni ordine include 6 mesi di refill. Reazioni in proporzione al post sembrano più naturali.',
    cards: [
      {
        ui: 'nopass',
        title: 'Sicurezza dell’account',
        body: 'Ci serve solo il link pubblico del post: nessuno accede e non servono permessi da amministratore. Non chiediamo mai una password o un codice di accesso. Se qualcuno che dice di essere NovaLikes te lo chiede, non siamo noi.',
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
      highlight: 'like per post Facebook',
    },
    lead: 'Controlla questi quattro punti una volta e il tuo ordine andrà liscio.',
    items: [
      {
        title: 'Il post è pubblico',
        body: 'Cerca l’icona del mappamondo. Gli altri pubblici impediscono la consegna.',
      },
      {
        title: 'Il link è quello del post',
        body: 'Copialo da «Condividi» sul post, non il link della tua Pagina.',
      },
      {
        title: 'Hai scelto la reazione',
        body: '«Mi piace» è l’opzione predefinita. Per «Love» o un’altra, scrivilo nella nota prima dell’avvio.',
      },
      {
        title: 'Il post resta online',
        body: 'Non eliminarlo durante la consegna e i 6 mesi di refill.',
      },
    ],
  },
  faq: {
    id: 'faq',
    kicker: 'Domande prima di ordinare?',
    title: 'Domande frequenti sui like per post Facebook',
    intro: 'Non trovi la risposta? Scrivici su WhatsApp al +44 7454 758272, 24/7.',
    cta: 'Chiedici su WhatsApp',
    locale: {
      code: 'it',
    },
    extra: [
      {
        id: 'it-fb-post-likes-v2-1',
        question: 'Posso ricevere «Love» invece di «Mi piace»?',
        answer: 'Sì. Scrivi la reazione che vuoi nella nota dell’ordine prima dell’avvio, oppure mandacela su WhatsApp.',
      },
      {
        id: 'it-fb-post-likes-v2-2',
        question: 'Posso chiedere un rimborso?',
        answer: 'Gli ordini idonei sono coperti dalla nostra garanzia di rimborso di 30 giorni, a partire dalla data di acquisto. La politica di rimborso spiega quali ordini sono idonei e come inviare la richiesta.',
      },
      {
        id: 'it-fb-post-likes-v2-3',
        question: 'Quali metodi di pagamento posso usare?',
        answer: 'Puoi pagare con carta, Apple Pay o Google Pay, in dollari statunitensi. È un pagamento unico e nulla si rinnova.',
      },
    ],
  },
  more: {
    id: 'related-services',
    title: 'Altri servizi NovaLikes',
    intro: 'I like per post Facebook cambiano un solo numero. Per farne crescere un altro, scegli un servizio.',
    services: [
      {
        slug: 'buy-facebook-followers',
        title: 'Comprare follower Facebook',
        line: 'Per Pagine e profili pubblici',
        image: '/assets/images/illustrations/facebook-followers/facebook-followers-hero.webp',
      },
      {
        slug: 'buy-facebook-page-likes',
        title: 'Comprare like per Pagina Facebook',
        line: 'Per le Pagine che mostrano i like',
        image: '/assets/images/illustrations/facebook-page-likes/facebook-page-likes-hero.webp',
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
