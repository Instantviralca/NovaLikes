import type { ServiceV2Content } from '../../types';

/** Brazilian Portuguese (/pt-br) — v2 service page copy for buy-facebook-post-likes. Primary keyword: "comprar curtidas post facebook". Do not edit wording without the content owner. */
export const PT_BR_BUY_FACEBOOK_POST_LIKES_V2 = {
  meta: {
    slug: 'buy-facebook-post-likes',
    platform: 'Facebook',
    name: 'Curtidas em post do Facebook',
    unit: 'curtidas',
    unitSingular: 'curtida',
    inputKind: 'link',
    perUnit: 1000,
    tiers: false,
    keywords: {
      primary: 'comprar curtidas post facebook',
      secondary: [
        'comprar curtidas em post do facebook',
        'comprar reações facebook',
        'preço curtidas post facebook',
        'curtidas para publicação do facebook',
      ],
      questions: [
        'posso escolher amei ou outras reações',
        'o post precisa ser público',
        'quanto custam curtidas em post',
        'é seguro comprar curtidas no facebook',
        'posso dividir as curtidas',
      ],
    },
  },
  hero: {
    title: {
      lead: 'Comprar',
      highlight: 'curtidas em post do Facebook',
      tail: 'que dão peso ao seu melhor post',
    },
    subtitle: 'Um evento, uma oferta ou uma grande notícia merecem mais do que meia dúzia de reações. Dê a um post público a resposta que ele merece. A partir de {fromPrice}, também com “Amei” e outras reações se você pedir.',
    trust: [
      'Sem senha',
      'Começa em 6–8 horas',
      '6 meses de reposição',
    ],
  },
  picker: {
    id: 'pricing-packages',
    title: 'Pacotes e preços de curtidas em post do Facebook',
    intro: 'Escolha um pacote. Preços em USD.',
    summaryName: '{quantity} curtidas em post do Facebook',
    save: 'Você economiza',
    cta: 'Adicionar ao carrinho',
    oneTime: 'Compra única. Sem assinatura.',
    secure: 'Pagamento seguro',
    methods: [
      'Cartão',
      'Apple Pay',
      'Google Pay',
    ],
    features: [
      {
        icon: 'shield',
        title: 'Sem senha',
        body: 'Só o link',
      },
      {
        icon: 'clock',
        title: 'Começa em 6–8 h',
        body: 'Termina 4–6 h depois',
      },
      {
        icon: 'message-square',
        title: 'A gente ajuda',
        body: '24/7 pelo WhatsApp',
      },
    ],
  },
  why: {
    id: 'why-choose-novalikes',
    title: {
      lead: 'Por que escolher a NovaLikes para',
      highlight: 'curtidas em post do Facebook?',
    },
    items: [
      {
        icon: 'shield',
        tone: 'mint',
        title: 'Só um link, sem acesso de administrador',
        body: 'Precisamos só do link público do post. Sem senha, sem função de administrador e sem acesso à sua conta.',
      },
      {
        icon: 'clock',
        tone: 'sun',
        title: 'Prazos claros de início e fim',
        body: 'A maioria dos pedidos começa em 6–8 horas após o pagamento e termina 4–6 horas depois do início. Prefere um ritmo mais lento? Peça entrega gradual.',
      },
      {
        icon: 'refresh-cw',
        tone: 'lilac',
        title: '6 meses de reposição',
        body: 'Se as curtidas do seu pedido caírem nos 6 meses após a entrega, mande o número do pedido e repomos a diferença sem custo.',
      },
      {
        icon: 'badge-check',
        tone: 'peach',
        title: 'Garantia de reembolso de 30 dias',
        body: 'Pedidos elegíveis têm cobertura de 30 dias a partir da data da compra. Nossa política de reembolso explica o que está incluído.',
      },
      {
        icon: 'heart',
        tone: 'pink',
        title: '“Amei” e outras reações',
        body: 'Por padrão chegam “Curtir”. Prefere “Amei” ou outra reação? Escreva na observação do pedido antes de ele começar.',
      },
    ],
    promo: {
      eyebrow: 'Não sabe qual pacote escolher?',
      title: 'Pergunte antes de comprar',
      cta: 'Fale com a gente no WhatsApp',
    },
  },
  steps: {
    id: 'how-it-works',
    title: {
      lead: 'Como comprar',
      highlight: 'curtidas em post do Facebook',
    },
    pill: 'Cerca de 2 minutos',
    intro: 'Pedir leva cinco passos curtos e cerca de dois minutos. Só precisamos do link de um post público.',
    items: [
      {
        ui: 'public',
        title: 'Deixe o post em Público',
        body: 'Procure o ícone do globo ao lado da data. Posts para amigos ou para uma lista personalizada não podem receber pedidos.',
      },
      {
        ui: 'packages',
        title: 'Escolha um pacote',
        body: 'Escolha uma quantidade nos pacotes acima. Cada pacote mostra o preço antes de você decidir.',
      },
      {
        ui: 'cart',
        title: 'Adicione ao carrinho',
        body: 'Toque em “Adicionar ao carrinho” e siga para o pagamento.',
      },
      {
        ui: 'username',
        title: 'Cole o link do post',
        body: 'Abra o post, toque em “Compartilhar” e “Copiar link”, e cole no pagamento. Indique a reação na observação se não for “Curtir”.',
      },
      {
        ui: 'pay',
        title: 'Pague com segurança',
        body: 'Pague uma única vez com cartão, Apple Pay ou Google Pay, em dólares americanos. Não há assinatura.',
      },
    ],
    done: {
      title: 'Pronto!',
      count: 500,
      unit: 'curtidas',
      body: 'A maioria dos pedidos começa em 6–8 horas após o pagamento e termina 4–6 horas depois do início. Acompanhe o andamento na página “Acompanhar pedido” com o número do pedido.',
    },
  },
  ui: {
    toggle: {
      label: 'Só amigos',
      sub: 'Desativado para ficar Público',
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
      'Só o link',
      'Pagamento seguro',
    ],
    privacyTags: [
      'link',
      'e-mail',
    ],
  },
  compare: {
    id: 'spot-a-risky-seller',
    title: {
      lead: 'Como identificar um vendedor pouco confiável de',
      highlight: 'curtidas em post do Facebook',
    },
    intro: 'Onde quer que você compre, confira primeiro estes sete pontos.',
    us: 'NovaLikes',
    them: 'Vendedores pouco confiáveis',
    rows: [
      {
        label: 'Dados de acesso',
        novalikes: 'Só o link',
        riskySeller: 'Pedem a senha',
      },
      {
        label: 'Prazos',
        novalikes: 'Começa em 6–8 horas',
        riskySeller: 'Sem prazo informado',
      },
      {
        label: 'Quedas',
        novalikes: '6 meses de reposição',
        riskySeller: 'Sem reposição',
      },
      {
        label: 'Reembolsos',
        novalikes: 'Reembolso em 30 dias*',
        riskySeller: 'Sem política escrita',
      },
      {
        label: 'Suporte',
        novalikes: 'WhatsApp 24/7',
        riskySeller: 'Difíceis de contatar',
      },
      {
        label: 'Preço',
        novalikes: 'Em USD, visível antes',
        riskySeller: 'Muda no pagamento',
      },
      {
        label: 'Acompanhamento',
        novalikes: 'Página “Acompanhar pedido”',
        riskySeller: 'Sem como conferir',
      },
    ],
    note: '*Em pedidos elegíveis, conforme nossa política de reembolso.',
  },
  promises: {
    id: 'our-promises',
    title: 'Reposição e garantia de reembolso para curtidas em post do Facebook',
    intro: 'As duas promessas estão na nossa política de reembolso, não só nesta página.',
    cards: [
      {
        chip: '6 meses',
        title: '6 meses de reposição',
        image: '/assets/images/illustrations/facebook-post-likes/facebook-post-likes-order-process.webp',
        body: 'Se as curtidas do seu pedido caírem nos 6 meses após a data de entrega, fale com a gente pelo WhatsApp ou e-mail com o número do pedido e repomos a diferença sem custo. Mantenha o post no ar e público enquanto a reposição é entregue.',
      },
      {
        chip: '30 dias',
        title: 'Garantia de reembolso de 30 dias',
        image: '/assets/images/illustrations/facebook-post-likes/facebook-post-likes-package-cta.webp',
        body: 'Pedidos elegíveis podem ser reembolsados em até 30 dias após a compra. A política de reembolso explica o que é elegível e como solicitar.',
      },
    ],
    link: {
      label: 'Ler a política de reembolso',
      href: '/refund-policy',
    },
  },
  cost: {
    id: 'facebook-post-likes-cost',
    title: {
      lead: 'Quanto custam as',
      highlight: 'curtidas em post do Facebook?',
    },
    intro: 'As curtidas em post começam em {fromPrice} por 100, e o preço por curtida cai conforme o pacote aumenta. Cada preço é um pagamento único em dólares americanos para um post.',
    points: [
      'Os 6 meses de reposição estão incluídos. Não precisa adicionar nada.',
      'Preços em dólares americanos. Seu banco converte para a sua moeda e alguns cartões cobram uma taxa por isso.',
      'Sem assinatura nem renovação. Você paga uma vez por pedido.',
    ],
    cols: [
      'Pacote',
      'Preço',
      'Por 1.000',
    ],
    best: 'Melhor preço',
    note: 'Os preços vêm dos nossos pacotes atuais. O preço que você vê no pagamento é o que você paga.',
  },
  whyBuy: {
    id: 'why-buy-facebook-post-likes',
    title: {
      lead: 'Por que as pessoas compram',
      highlight: 'curtidas em post do Facebook?',
    },
    intro: 'No Facebook, as reações são o sinal mais rápido de que um post importa. Poucas reações em um anúncio importante fazem ele parecer ignorado, mesmo que tenha agradado muito ao vivo.',
    items: [
      {
        title: 'Eventos que parecem cheios',
        body: 'Noites de quiz, portas abertas e ações beneficentes atraem mais com muitas reações.',
      },
      {
        title: 'Ofertas que chamam atenção',
        body: 'Posts de promoção com um bom número merecem uma segunda olhada.',
      },
      {
        title: 'Grandes notícias bem comemoradas',
        body: 'Inaugurações, aniversários e prêmios merecem uma resposta à altura.',
      },
    ],
    diagram: [
      'Cheio',
      'Oferta visível',
      'Comemorado',
    ],
  },
  help: {
    id: 'does-buying-facebook-post-likes-help',
    title: {
      lead: 'Vale a pena comprar',
      highlight: 'curtidas em post do Facebook?',
    },
    intro: 'Curtidas em post mudam as reações de um post público. Veja o que fazem e o que não fazem.',
    no: {
      title: 'O que não muda',
      items: [
        'Seguidores ou curtidas na Página',
        'Comentários ou compartilhamentos',
        'Para quantas pessoas o Facebook mostra seus próximos posts',
      ],
    },
    yes: {
      title: 'O que muda',
      items: [
        'As reações do post escolhido',
        'O quanto o post parece popular',
        'A primeira impressão de eventos, ofertas e notícias',
      ],
      image: '/assets/images/illustrations/facebook-post-likes/facebook-post-likes-does-help.webp',
      altFallback: 'Ilustração: curtidas em post do Facebook',
    },
  },
  who: {
    id: 'who-orders',
    title: {
      lead: 'Quem compra',
      highlight: 'curtidas em post do Facebook',
    },
    cards: [
      {
        title: 'Bares e casas de show',
        body: 'Bares, clubes e casas de show adicionam reações a noites de quiz, música ao vivo e dias de jogo.',
        image: '/assets/images/illustrations/facebook-post-likes/facebook-post-likes-best-practices.webp',
      },
      {
        title: 'Escolas, clubes e associações',
        body: 'Clubes esportivos, associações de pais e ONGs adicionam reações a ações beneficentes e comunicados.',
        image: '/assets/images/illustrations/facebook-post-likes/facebook-post-likes-hero.webp',
      },
      {
        title: 'Negócios locais',
        body: 'Lojas e serviços adicionam reações a ofertas e inaugurações, às vezes como “Amei” em vez de “Curtir”.',
        image: '/assets/images/illustrations/facebook-post-likes/facebook-post-likes-why-buy.webp',
      },
    ],
    statement: 'Seja qual for o post, o pedido funciona do mesmo jeito: um link público, o pacote e a reação que você escolher, e curtidas que costumam começar em 6–8 horas. Sem login.',
  },
  vs: {
    id: 'facebook-post-likes-vs-other-services',
    title: {
      lead: 'Curtidas em post x',
      highlight: 'seguidores e curtidas na Página',
    },
    intro: 'Cada serviço muda um número diferente. Escolha o que combina com o que você quer que as pessoas vejam.',
    cols: [
      'Serviço',
      'O que muda',
      'O que precisamos',
      'A partir de',
    ],
    rows: [
      {
        slug: 'buy-facebook-post-likes',
        label: 'Curtidas em post',
        changes: 'Reações em um post público',
        needs: 'Um link para o post',
        current: true,
      },
      {
        slug: 'buy-facebook-followers',
        label: 'Seguidores',
        changes: 'Seguidores de uma Página ou perfil',
        needs: 'Um link para a Página ou perfil',
      },
      {
        slug: 'buy-facebook-page-likes',
        label: 'Curtidas na Página',
        changes: 'As curtidas de uma Página no formato clássico',
        needs: 'Um link para a Página',
      },
    ],
    currentLabel: 'Esta página',
  },
  safe: {
    id: 'is-it-safe',
    title: {
      lead: 'É seguro comprar',
      highlight: 'curtidas em post do Facebook?',
    },
    lead: 'Depende de três coisas: sua conta, seu pagamento e sua privacidade. Veja como cada uma funciona na NovaLikes, além do único risco que nenhum vendedor consegue eliminar.',
    body: 'Os Padrões da Comunidade do Facebook proíbem comportamento não autêntico, e a Meta remove com frequência contas falsas ou inativas. Por isso pode haver uma pequena queda após a entrega, e por isso todo pedido inclui 6 meses de reposição. Reações proporcionais ao post parecem mais naturais.',
    cards: [
      {
        ui: 'nopass',
        title: 'Segurança da conta',
        body: 'Precisamos só do link público do post, então ninguém faz login e não é preciso permissão de administrador. Nunca pedimos senha nem código de acesso. Se alguém dizendo ser da NovaLikes pedir, não somos nós.',
      },
      {
        ui: 'pay',
        title: 'Segurança do pagamento',
        body: 'Você paga uma única vez em um pagamento seguro com cartão, Apple Pay ou Google Pay, em dólares americanos. Não há assinatura e nada se renova.',
      },
      {
        ui: 'privacy',
        title: 'Privacidade',
        body: 'Seu link e seu e-mail são usados só para processar o pedido e enviar avisos, como explica nossa [política de privacidade](/privacy-policy).',
      },
    ],
  },
  before: {
    id: 'delivery-and-safety',
    title: {
      lead: 'Antes de comprar',
      highlight: 'curtidas em post do Facebook',
    },
    lead: 'Confira estes quatro pontos uma vez e seu pedido vai correr bem.',
    items: [
      {
        title: 'O post está público',
        body: 'Procure o ícone do globo. Outros públicos impedem a entrega.',
      },
      {
        title: 'O link é do post',
        body: 'Copie em “Compartilhar” no post, e não o link da sua Página.',
      },
      {
        title: 'Você escolheu a reação',
        body: '“Curtir” é a opção padrão. Para “Amei” ou outra, escreva na observação antes de começar.',
      },
      {
        title: 'O post continua no ar',
        body: 'Não apague durante a entrega e os 6 meses de reposição.',
      },
    ],
  },
  faq: {
    id: 'faq',
    kicker: 'Dúvidas antes de pedir?',
    title: 'Perguntas frequentes sobre curtidas em post do Facebook',
    intro: 'Não encontrou sua resposta? Fale com a gente no WhatsApp pelo +44 7454 758272, 24/7.',
    cta: 'Pergunte no WhatsApp',
    locale: {
      code: 'pt-br',
    },
    extra: [
      {
        id: 'pt-fb-post-likes-v2-1',
        question: 'Posso receber “Amei” em vez de “Curtir”?',
        answer: 'Sim. Escreva a reação que você quer na observação do pedido antes de ele começar, ou mande pra gente no WhatsApp.',
      },
      {
        id: 'pt-fb-post-likes-v2-2',
        question: 'Posso pedir reembolso?',
        answer: 'Pedidos elegíveis têm a nossa garantia de reembolso de 30 dias, contados a partir da data da compra. A política de reembolso explica quais pedidos são elegíveis e como enviar a solicitação.',
      },
      {
        id: 'pt-fb-post-likes-v2-3',
        question: 'Quais formas de pagamento posso usar?',
        answer: 'Você pode pagar com cartão, Apple Pay ou Google Pay, em dólares americanos. É um pagamento único e nada se renova.',
      },
    ],
  },
  more: {
    id: 'related-services',
    title: 'Mais serviços da NovaLikes',
    intro: 'As curtidas mudam um número. Para fazer outro crescer, escolha um serviço.',
    services: [
      {
        slug: 'buy-facebook-followers',
        title: 'Comprar seguidores no Facebook',
        line: 'Para Páginas e perfis públicos',
        image: '/assets/images/illustrations/facebook-followers/facebook-followers-hero.webp',
      },
      {
        slug: 'buy-facebook-page-likes',
        title: 'Comprar curtidas para Página do Facebook',
        line: 'Para Páginas com número de curtidas',
        image: '/assets/images/illustrations/facebook-page-likes/facebook-page-likes-hero.webp',
      },
      {
        slug: 'buy-instagram-likes',
        title: 'Comprar curtidas no Instagram',
        line: 'Para posts, carrosséis e Reels',
        image: '/assets/images/illustrations/instagram-likes/instagram-likes-hero.webp',
      },
    ],
    cardPrice: 'A partir de {fromPrice}',
    guidesTitle: '',
    guides: [],
  },
  sticky: {
    label: 'Escolher pacote',
    href: '#pricing-packages',
  },
  whatsapp: {
    display: '+44 7454 758272',
    href: 'https://wa.me/447454758272',
  },
} satisfies ServiceV2Content;
