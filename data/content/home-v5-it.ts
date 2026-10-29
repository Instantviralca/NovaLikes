/**
 * Italian homepage (/it) — same layout and shape as HOME_V5. All copy is final. Do not edit wording in code.
 * {fromPrice}: lowest active package price from the registry. Service links resolve to the Italian service routes.
 * getStarted.guides is intentionally empty (Learn is English-only): hide that group when it has no links.
 */

export const HOME_V5_IT = {
  hero: {
    eyebrow: 'Crescita sui social',
    title: {
      lead: 'Comprare follower, like e visualizzazioni',
      highlight: 'Instagram & TikTok',
      tail: '',
    },
    subtitle: 'Scegli piattaforma e servizio, aggiungi il tuo username pubblico o il link di un post e paga in USD. Nessuna password, la maggior parte degli ordini parte entro 6–8 ore e ogni ordine include 6 mesi di refill.',
    tabs: {
      instagram: {
        label: 'Instagram',
        cards: [
          {
            slug: 'buy-instagram-followers',
            title: 'Follower',
            line: 'Fai crescere il tuo profilo',
            icon: 'user-plus',
          },
          {
            slug: 'buy-instagram-likes',
            title: 'Like',
            line: 'Per post e Reel',
            icon: 'heart',
          },
          {
            slug: 'buy-instagram-views',
            title: 'Visualizzazioni',
            line: 'Per Reel e video',
            icon: 'eye',
          },
          {
            slug: 'buy-instagram-comments',
            title: 'Commenti',
            line: 'Avvia la conversazione',
            icon: 'message-circle',
          },
        ],
      },
      tiktok: {
        label: 'TikTok',
        cards: [
          {
            slug: 'buy-tiktok-followers',
            title: 'Follower',
            line: 'Fai crescere il tuo profilo',
            icon: 'user-plus',
          },
          {
            slug: 'buy-tiktok-likes',
            title: 'Like',
            line: 'Per un video',
            icon: 'heart',
          },
          {
            slug: 'buy-tiktok-views',
            title: 'Visualizzazioni',
            line: 'Per un video',
            icon: 'eye',
          },
        ],
      },
      facebook: {
        label: 'Facebook',
        cards: [
          {
            slug: 'buy-facebook-followers',
            title: 'Follower',
            line: 'Per Pagine e profili',
            icon: 'user-plus',
          },
          {
            slug: 'buy-facebook-page-likes',
            title: 'Like alla Pagina',
            line: 'Per Pagine con i like',
            icon: 'thumbs-up',
          },
          {
            slug: 'buy-facebook-post-likes',
            title: 'Like ai post',
            line: 'Per un post pubblico',
            icon: 'heart',
          },
        ],
      },
    },
    cardPrice: 'Da {fromPrice}',
    trust: [
      'Nessuna password',
      'Avvio in 6–8 ore',
      'Refill di 6 mesi',
      'Assistenza WhatsApp 24/7',
      'Prezzi in USD',
    ],
  },
  marquee: [
    'Mai una password',
    'Avvio in 6–8 ore',
    'Refill di 6 mesi su ogni ordine',
    'Assistenza WhatsApp 24/7',
    'Prezzi in USD',
    'Traccia ogni ordine',
    'Consegna graduale su richiesta',
    'Pagamento sicuro con carta',
  ],
  statement: {
    id: 'services',
    title: {
      lead: 'I servizi',
      highlight: 'NovaLikes',
    },
    body: 'NovaLikes offre follower, like, visualizzazioni e commenti per Instagram e TikTok, più alcuni servizi Facebook. Scegli un pacchetto, aggiungi uno username o un link pubblico e paghi in dollari statunitensi. Non chiediamo mai la tua password, la maggior parte degli ordini parte entro 6–8 ore dal pagamento e termina 4–6 ore dopo, e ogni ordine include 6 mesi di refill.',
  },
  stories: [
    {
      id: 'profile-numbers',
      title: {
        lead: 'Perché contano i numeri del',
        highlight: 'tuo profilo',
      },
      body: 'Chi vede il tuo profilo o un post per la prima volta decide in fretta se restare. Il numero di follower e i like di un post sono tra le prime cose che si guardano, molto prima di leggere una didascalia.',
      callout: 'Numeri bassi fanno sembrare ignorato un buon contenuto, anche quando non lo è. È proprio questo divario che un pacchetto vuole colmare.',
      visual: 'profile',
    },
    {
      id: 'stronger-start',
      title: {
        lead: 'Dai ai tuoi contenuti migliori una',
        highlight: 'partenza più forte',
      },
      body: 'Un pacchetto cambia il numero che la gente vede per primo, così un account nuovo, un lancio o il tuo Reel migliore non partono da zero. Quello che succede dopo dipende sempre dal contenuto: Instagram e TikTok decidono in base a come la gente guarda e reagisce.',
      callout: 'Usa un pacchetto per sostenere contenuti di cui sei già fiero, non per sostituirli.',
      visual: 'growth',
    },
  ],
  services: [
    {
      slug: 'buy-instagram-followers',
      platform: 'instagram',
      metric: 'followers',
      title: {
        lead: 'Comprare',
        highlight: 'follower Instagram',
      },
      intro: 'Aumenta il numero di follower di un account Instagram pubblico, il primo numero che i visitatori guardano sul tuo profilo.',
      bullets: [
        'Solo lo username pubblico, mai la password',
        'Pacchetti da {fromPrice}, prezzi in USD',
        'Di solito parte entro 6–8 ore',
        'Consegna graduale su richiesta',
        '6 mesi di refill dalla consegna',
        'Traccia l’ordine con il numero d’ordine',
      ],
      cta: 'Comprare follower Instagram',
      why: {
        q: 'Perché contano i follower Instagram?',
        a: 'Il numero di follower è in alto sul tuo profilo, accanto al nome. I nuovi visitatori lo usano, insieme ai tuoi post, per capire se un account è attivo e vale la pena seguirlo. Un numero molto basso accanto a buoni contenuti può far sembrare abbandonato un account nuovo o rinominato. Ma i follower da soli non portano più portata: quella dipende sempre da come la gente reagisce a ogni post.',
      },
      how: {
        q: 'Cosa ti serve per ordinare?',
        a: 'Solo il tuo username Instagram pubblico. Tieni l’account pubblico e lo stesso username finché consegna ed eventuale refill non sono finiti. Scegli un pacchetto che sembri naturale accanto ai tuoi follower attuali.',
      },
    },
    {
      slug: 'buy-instagram-likes',
      platform: 'instagram',
      metric: 'likes',
      title: {
        lead: 'Comprare',
        highlight: 'like Instagram',
      },
      intro: 'Aggiungi like a una foto, un carosello o un Reel pubblico. I like sono subito sotto il post e sono il segnale più rapido per chi lo vede per la prima volta.',
      bullets: [
        'Foto, caroselli e Reel',
        'Incolla il link, senza login',
        'Pacchetti da {fromPrice}',
        'Di solito parte entro 6–8 ore',
        'Consegna graduale su richiesta',
        '6 mesi di refill dalla consegna',
      ],
      cta: 'Comprare like Instagram',
      why: {
        q: 'Perché contano i like Instagram?',
        a: 'I like sono la prima reazione che si vede sotto un post, prima della didascalia e dei commenti. Un post con un buon numero di like sembra già apprezzato da altri. I like vanno a un solo post, quindi sono adatti a quelli che vuoi mettere in evidenza: un lancio, un’offerta, una collaborazione o un contenuto fissato.',
      },
      how: {
        q: 'Cosa ti serve per ordinare?',
        a: 'Il link pubblico di un post o di un Reel. Ogni ordine va solo a quel post. Per più post, fai un ordine per ciascuno.',
      },
    },
    {
      slug: 'buy-instagram-views',
      platform: 'instagram',
      metric: 'views',
      title: {
        lead: 'Comprare',
        highlight: 'visualizzazioni Instagram',
      },
      intro: 'Aumenta le visualizzazioni di un Reel o di un video pubblico, così un nuovo contenuto invita a guardarlo quando condividi il link.',
      bullets: [
        'Reel e post video',
        'Incolla il link, senza password',
        'Pacchetti da {fromPrice}',
        'Di solito parte entro 6–8 ore',
        'Consegna graduale su richiesta',
        '6 mesi di refill dalla consegna',
      ],
      cta: 'Comprare visualizzazioni Instagram',
      why: {
        q: 'Perché contano le visualizzazioni Instagram?',
        a: 'Instagram mostra le visualizzazioni sui Reel, e molti le guardano prima di decidere se premere play. Un Reel nuovo con pochissime visualizzazioni può sembrare ignorato anche se è buono. Le visualizzazioni cambiano solo il numero di quel video. Like, commenti e nuovi follower dipendono sempre dal contenuto.',
      },
      how: {
        q: 'Cosa ti serve per ordinare?',
        a: 'Il link pubblico del Reel o del video. Tienilo pubblico fino alla fine della consegna e chiedi la consegna graduale se preferisci.',
      },
    },
    {
      slug: 'buy-instagram-comments',
      platform: 'instagram',
      metric: 'comments',
      title: {
        lead: 'Comprare',
        highlight: 'commenti Instagram',
      },
      intro: 'Aggiungi commenti a un post o a un Reel pubblico, così sembra attivo e invita gli altri a partecipare.',
      bullets: [
        'Commenti High Quality o Premium',
        'I tuoi testi o una lingua su richiesta',
        'Incolla il link, senza login',
        'Pacchetti da {fromPrice}',
        'Di solito parte entro 6–8 ore',
        '6 mesi di refill dalla consegna',
      ],
      cta: 'Comprare commenti Instagram',
      why: {
        q: 'Perché contano i commenti Instagram?',
        a: 'I commenti mostrano che la gente non ha solo scrollato, ma ha detto qualcosa. Un post con qualche commento invita gli altri a rispondere, mentre una sezione vuota fa sembrare silenzioso anche un post popolare. I commenti Premium sono scritti per il tuo post e suonano naturali.',
      },
      how: {
        q: 'Cosa ti serve per ordinare?',
        a: 'Il link pubblico del post o del Reel. Scegli High Quality o Premium nella pagina del servizio e scrivi i tuoi commenti o una lingua, come l’italiano, nella nota dell’ordine.',
      },
    },
    {
      slug: 'buy-tiktok-followers',
      platform: 'tiktok',
      metric: 'followers',
      title: {
        lead: 'Comprare',
        highlight: 'follower TikTok',
      },
      intro: 'Aumenta il numero di follower di un account TikTok pubblico. I nuovi spettatori lo controllano sul tuo profilo prima di seguirti.',
      bullets: [
        'Solo lo username, nessuna password',
        'Pacchetti da {fromPrice}, prezzi in USD',
        'Di solito parte entro 6–8 ore',
        'Consegna graduale su richiesta',
        '6 mesi di refill dalla consegna',
        'Traccia l’ordine con il numero d’ordine',
      ],
      cta: 'Comprare follower TikTok',
      why: {
        q: 'Perché contano i follower TikTok?',
        a: 'Su TikTok la gente spesso ti scopre da un video e poi tocca il tuo profilo. Il numero di follower è tra le prime cose che vede lì. Un profilo con pochissimi follower accanto a buoni video può sembrare nuovo di zecca o inattivo. I follower non decidono cosa consiglia TikTok: la pagina Per te dipende da come viene guardato ogni video.',
      },
      how: {
        q: 'Cosa ti serve per ordinare?',
        a: 'Il tuo username TikTok pubblico. Tieni l’account pubblico e lo stesso username finché consegna ed eventuale refill non sono finiti.',
      },
    },
    {
      slug: 'buy-tiktok-likes',
      platform: 'tiktok',
      metric: 'likes',
      title: {
        lead: 'Comprare',
        highlight: 'like TikTok',
      },
      intro: 'Aggiungi like a un video TikTok pubblico, come il lancio di un prodotto, una collaborazione o la tua clip migliore.',
      bullets: [
        'Un video per ordine',
        'Incolla il link del video, senza login',
        'Pacchetti da {fromPrice}',
        'Di solito parte entro 6–8 ore',
        'Consegna graduale su richiesta',
        '6 mesi di refill dalla consegna',
      ],
      cta: 'Comprare like TikTok',
      why: {
        q: 'Perché contano i like TikTok?',
        a: 'Il numero di cuori è a destra di ogni video TikTok, quindi la gente lo vede mentre il video scorre. Un video che condividi fuori da TikTok o che fissi sul profilo sembra più solido quando i like sono in linea con le visualizzazioni. I like vanno solo a quel video.',
      },
      how: {
        q: 'Cosa ti serve per ordinare?',
        a: 'Il link pubblico del video. I like vanno solo a quel video. Per più video, fai un ordine per link.',
      },
    },
    {
      slug: 'buy-tiktok-views',
      platform: 'tiktok',
      metric: 'views',
      title: {
        lead: 'Comprare',
        highlight: 'visualizzazioni TikTok',
      },
      intro: 'Aumenta le visualizzazioni di un video TikTok pubblico. Un numero basso può far sembrare ignorato un buon video, soprattutto se è appena uscito.',
      bullets: [
        'Visualizzazioni High Quality o Premium',
        'Incolla il link del video',
        'Pacchetti da {fromPrice}',
        'Di solito parte entro 6–8 ore',
        'Consegna graduale su richiesta',
        '6 mesi di refill dalla consegna',
      ],
      cta: 'Comprare visualizzazioni TikTok',
      why: {
        q: 'Perché contano le visualizzazioni TikTok?',
        a: 'TikTok mostra le visualizzazioni sotto ogni video nella griglia del tuo profilo. Una griglia con numeri bassi può far sembrare inattivo un account. Le visualizzazioni non portano un video nei Per te: lo decide TikTok in base a come la gente guarda e reagisce.',
      },
      how: {
        q: 'Cosa ti serve per ordinare?',
        a: 'Il link pubblico del video. Scegli High Quality o Premium nella pagina del servizio e tieni il video pubblico fino alla fine della consegna.',
      },
    },
  ],
  why: {
    id: 'why-novalikes',
    title: {
      lead: 'Perché',
      highlight: 'NovaLikes?',
    },
    intro: 'Molti siti vendono follower e like. Ecco cosa puoi aspettarti da noi.',
    items: [
      {
        title: 'Risposte chiare prima dell’acquisto',
        icon: 'badge-check',
        body: 'Ogni pagina di servizio dice esattamente cosa cambia un pacchetto e cosa no. Ti diciamo anche quando ti conviene un altro servizio, per esempio i follower Facebook invece dei like alla Pagina.',
      },
      {
        title: 'Un’azienda vera e raggiungibile',
        icon: 'building',
        body: 'NovaLikes è gestito da DMRUSH LIMITED, società registrata in Scozia (n. SC876437). Il team gestisce ordini social da 7–8 anni, prima come ViralMe e oggi come NovaLikes, e risponde su WhatsApp (+44 7454 758272) a qualsiasi ora.',
      },
    ],
  },
  promises: {
    id: 'our-promises',
    title: {
      lead: 'Le nostre',
      highlight: 'promesse',
    },
    intro: 'Queste quattro promesse valgono per ogni ordine Instagram, TikTok e Facebook.',
    items: [
      {
        key: 'password',
        title: 'Mai una password',
        body: 'Ci serve solo uno username o un link pubblico. Se un sito ti chiede i dati di accesso, qualunque sito sia, non affidargli il tuo account.',
        icon: 'shield',
        chip: 'Solo link pubblico',
      },
      {
        key: 'speed',
        title: 'Avvio in 6–8 ore',
        body: 'La maggior parte degli ordini parte entro 6–8 ore dal pagamento e termina 4–6 ore dopo l’avvio. Preferisci un ritmo più lento? Chiedi la consegna graduale nella nota dell’ordine.',
        icon: 'clock',
        chip: '6–8 ore',
      },
      {
        key: 'refill',
        title: 'Refill di 6 mesi',
        body: 'Se il numero cala entro 6 mesi dalla consegna, manda il numero d’ordine su WhatsApp e lo reintegriamo. Tieni il profilo o il post pubblico durante il refill.',
        icon: 'refresh-cw',
        chip: '6 mesi',
      },
      {
        key: 'support',
        title: 'Assistenza WhatsApp 24/7',
        body: 'Scrivi al +44 7454 758272, prima o dopo l’ordine. Puoi anche seguire ogni ordine nella pagina «Traccia ordine» o nel tuo account gratuito.',
        icon: 'message-circle',
        chip: '24/7',
      },
    ],
  },
  faq: {
    id: 'before-you-buy',
    title: {
      lead: 'Prima di',
      highlight: 'comprare',
    },
    intro: 'Le domande più frequenti prima del primo ordine.',
    items: [
      {
        question: 'Da quale servizio dovrei iniziare?',
        answer: 'Dal numero che i visitatori vedono per primo. Se il tuo profilo sembra vuoto, inizia dai follower. Per un post o un video che stai promuovendo, like o visualizzazioni su quel post.',
      },
      {
        question: 'Vi serve la mia password di Instagram o TikTok?',
        answer: 'No. Per i follower ci serve il tuo username pubblico; per like, visualizzazioni e commenti, il link pubblico del post o del video. Non dare mai la tua password a un servizio di crescita.',
      },
      {
        question: 'Il mio account deve essere pubblico?',
        answer: 'Sì, durante la consegna. Un account o un post privato può bloccare la consegna. Dopo puoi tornare al privato.',
      },
      {
        question: 'Quando parte il mio ordine?',
        answer: 'La maggior parte degli ordini parte entro 6–8 ore dalla conferma del pagamento e termina 4–6 ore dopo l’avvio. Per un ritmo più lento, chiedi la consegna graduale nella nota dell’ordine o su WhatsApp.',
      },
      {
        question: 'Cosa succede se i numeri calano?',
        answer: 'Ogni ordine include 6 mesi di refill dalla data di consegna. Scrivici su WhatsApp (+44 7454 758272) con il numero d’ordine e reintegriamo.',
      },
      {
        question: 'Può danneggiare il mio account?',
        answer: 'Le regole di Instagram e TikTok non consentono di comprare interazioni, ed entrambe le piattaforme possono rimuovere le attività che considerano non autentiche. NovaLikes non chiede mai la tua password, ma nessun fornitore controlla come una piattaforma tratta un account. Leggi le regole della piattaforma prima di ordinare.',
      },
    ],
  },
  getStarted: {
    id: 'get-started',
    title: {
      lead: 'Inizia',
      highlight: 'ora',
    },
    body: 'Scegli una piattaforma qui sotto. Ogni pagina di servizio mostra i pacchetti, il prezzo in dollari statunitensi ed esattamente cosa ti serve per ordinare.',
    tools: {
      title: 'Strumenti gratuiti',
      links: [
        {
          label: 'Contatore follower Instagram',
          href: '/tools/instagram-follower-counter',
        },
        {
          label: 'Visualizzatore profilo Instagram',
          href: '/tools/instagram-profile-viewer',
        },
        {
          label: 'Visualizzatore foto profilo Instagram',
          href: '/tools/instagram-profile-picture-viewer',
        },
        {
          label: 'Downloader video TikTok',
          href: '/tools/tiktok-video-downloader',
        },
        {
          label: 'Downloader video Facebook',
          href: '/tools/facebook-video-downloader',
        },
      ],
    },
    guides: {
      title: '',
      links: [],
      cta: {
        label: '',
        href: '',
      },
    },
  },
  stickyCta: {
    label: 'Scegli un servizio',
    href: '#homepage-hero',
  },
} as const;
