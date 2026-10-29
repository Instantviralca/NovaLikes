import type { ServiceV2Content } from '../../types';

/** Brazilian Portuguese (/pt-br) — v2 service page copy for buy-instagram-likes. Primary keyword: "comprar curtidas instagram". Do not edit wording without the content owner. */
export const PT_BR_BUY_INSTAGRAM_LIKES_V2 = {
  meta: {
    slug: 'buy-instagram-likes',
    platform: 'Instagram',
    name: 'Curtidas no Instagram',
    unit: 'curtidas',
    unitSingular: 'curtida',
    inputKind: 'link',
    perUnit: 1000,
    tiers: false,
    keywords: {
      primary: 'comprar curtidas instagram',
      secondary: [
        'comprar curtidas para reels',
        'pacotes de curtidas instagram',
        'comprar likes instagram',
        'preço curtidas instagram',
      ],
      questions: [
        'é seguro comprar curtidas no instagram',
        'quanto custam curtidas no instagram',
        'dá para comprar curtidas para reels',
        'curtidas compradas somem',
        'vale a pena comprar curtidas',
      ],
    },
  },
  hero: {
    title: {
      lead: 'Comprar',
      highlight: 'curtidas no Instagram',
      tail: 'para posts e Reels que chamam atenção',
    },
    subtitle: 'Faça suas melhores fotos, carrosséis e Reels parecerem tão populares quanto merecem. Curtidas trazem prova social para qualquer post público, a partir de {fromPrice} e sem login.',
    trust: [
      'Sem senha',
      'Começa em 6–8 horas',
      '6 meses de reposição',
    ],
  },
  picker: {
    id: 'pricing-packages',
    title: 'Pacotes e preços de curtidas no Instagram',
    intro: 'Escolha um pacote. Preços em USD.',
    summaryName: '{quantity} curtidas no Instagram',
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
      highlight: 'curtidas no Instagram?',
    },
    items: [
      {
        icon: 'shield',
        tone: 'mint',
        title: 'Só um link, nunca a sua senha',
        body: 'Precisamos só do link público do post ou do Reel. Sem código de acesso e sem entrar na sua conta.',
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
        icon: 'image',
        tone: 'pink',
        title: 'Posts, carrosséis e Reels',
        body: 'Peça curtidas para qualquer foto, carrossel ou Reel público. Cada pedido cobre um post, para o seu melhor conteúdo receber exatamente o empurrão que você escolher.',
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
      highlight: 'curtidas no Instagram',
    },
    pill: 'Cerca de 2 minutos',
    intro: 'Pedir leva cinco passos curtos e cerca de dois minutos. Só precisamos do link de um post ou Reel público.',
    items: [
      {
        ui: 'public',
        title: 'Mantenha o post público',
        body: 'O post ou Reel precisa estar em uma conta pública até a entrega terminar. Não apague nem arquive durante o pedido.',
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
        title: 'Cole o link',
        body: 'Abra o post, toque nos três pontinhos ou em “Compartilhar”, escolha “Copiar link” e cole no pagamento, junto com seu e-mail.',
      },
      {
        ui: 'pay',
        title: 'Pague com segurança',
        body: 'Pague uma única vez com cartão, Apple Pay ou Google Pay, em dólares americanos. Não há assinatura.',
      },
    ],
    done: {
      title: 'Pronto!',
      count: 2500,
      unit: 'curtidas',
      body: 'A maioria dos pedidos começa em 6–8 horas após o pagamento e termina 4–6 horas depois do início. Acompanhe o andamento na página “Acompanhar pedido” com o número do pedido.',
    },
  },
  ui: {
    toggle: {
      label: 'Conta privada',
      sub: 'Desativada para chegar ao post',
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
      highlight: 'curtidas no Instagram',
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
    title: 'Reposição e garantia de reembolso para curtidas no Instagram',
    intro: 'As duas promessas estão na nossa política de reembolso, não só nesta página.',
    cards: [
      {
        chip: '6 meses',
        title: '6 meses de reposição',
        image: '/assets/images/illustrations/instagram-likes/instagram-likes-order-process.webp',
        body: 'Se as curtidas do seu pedido caírem nos 6 meses após a data de entrega, fale com a gente pelo WhatsApp ou e-mail com o número do pedido e repomos a diferença sem custo. Mantenha o post ou o Reel no ar e público enquanto a reposição é entregue.',
      },
      {
        chip: '30 dias',
        title: 'Garantia de reembolso de 30 dias',
        image: '/assets/images/illustrations/instagram-likes/instagram-likes-package-cta.webp',
        body: 'Pedidos elegíveis podem ser reembolsados em até 30 dias após a compra. A política de reembolso explica o que é elegível e como solicitar.',
      },
    ],
    link: {
      label: 'Ler a política de reembolso',
      href: '/refund-policy',
    },
  },
  cost: {
    id: 'instagram-likes-cost',
    title: {
      lead: 'Quanto custam as',
      highlight: 'curtidas no Instagram?',
    },
    intro: 'As curtidas começam em {fromPrice} por 50, e o preço por curtida cai conforme o pacote aumenta. Cada preço é um pagamento único em dólares americanos para um post ou Reel.',
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
    id: 'why-buy-instagram-likes',
    title: {
      lead: 'Por que as pessoas compram',
      highlight: 'curtidas no Instagram?',
    },
    intro: 'O número de curtidas é o sinal mais rápido que as pessoas leem em um post. Se parece baixo, um bom conteúdo passa batido. Um pacote de curtidas sobe esse número nos posts que mais importam para você.',
    items: [
      {
        title: 'Posts que fazem parar a rolagem',
        body: 'As pessoas veem as curtidas antes de ler a legenda. Um bom número faz uma foto ou um Reel merecer uma segunda olhada.',
      },
      {
        title: 'Apoio para lançamentos e ofertas',
        body: 'Lançamentos, cardápios novos e promoções começam melhor quando o post não fica com meia dúzia de curtidas.',
      },
      {
        title: 'Um perfil mais equilibrado',
        body: 'Posts antigos com poucas curtidas ao lado de outros com centenas deixam o perfil irregular. As curtidas equilibram isso.',
      },
    ],
    diagram: [
      'Para a rolagem',
      'Lançamentos',
      'Perfil equilibrado',
    ],
  },
  help: {
    id: 'does-buying-instagram-likes-help',
    title: {
      lead: 'Vale a pena comprar',
      highlight: 'curtidas no Instagram?',
    },
    intro: 'Curtidas mudam o número embaixo de um post. Sozinhas, não mudam como o Instagram posiciona esse post. Este é o resumo honesto.',
    no: {
      title: 'O que não muda',
      items: [
        'Seus seguidores, visualizações ou comentários',
        'O posicionamento no Explorar ou nos Reels por si só',
        'Vendas ou mensagens sem um bom post por trás',
      ],
    },
    yes: {
      title: 'O que muda',
      items: [
        'As curtidas do post ou Reel que você escolher',
        'O quanto o post parece popular para novos visitantes',
        'A primeira impressão de lançamentos e promoções',
      ],
      image: '/assets/images/illustrations/instagram-likes/instagram-likes-does-help.webp',
      altFallback: 'Ilustração: curtidas no Instagram',
    },
  },
  who: {
    id: 'who-orders',
    title: {
      lead: 'Quem compra',
      highlight: 'curtidas no Instagram',
    },
    cards: [
      {
        title: 'Criadores',
        body: 'Criadores adicionam curtidas aos Reels e carrosséis mais fortes, os que querem que os novos visitantes vejam primeiro.',
        image: '/assets/images/illustrations/instagram-likes/instagram-likes-best-practices.webp',
      },
      {
        title: 'Pequenos negócios',
        body: 'Lojas, salões e cafés usam curtidas em ofertas, cardápios novos e fotos de produto, para as promoções não parecerem ignoradas.',
        image: '/assets/images/illustrations/instagram-likes/instagram-likes-hero.webp',
      },
      {
        title: 'Marcas e agências',
        body: 'Marcas e agências adicionam curtidas a posts de campanha e parcerias, muitas vezes com entrega gradual.',
        image: '/assets/images/illustrations/instagram-likes/instagram-likes-why-buy.webp',
      },
    ],
    statement: 'Seja qual for o post, o pedido funciona do mesmo jeito: um link público, o pacote que você escolher e um número que costuma começar a subir em 6–8 horas. Ninguém precisa dos seus dados de acesso.',
  },
  vs: {
    id: 'instagram-likes-vs-other-services',
    title: {
      lead: 'Curtidas no Instagram x',
      highlight: 'seguidores, visualizações e comentários',
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
        slug: 'buy-instagram-likes',
        label: 'Curtidas',
        changes: 'As curtidas de um post ou Reel',
        needs: 'Um link para o post',
        current: true,
      },
      {
        slug: 'buy-instagram-followers',
        label: 'Seguidores',
        changes: 'O número de seguidores do seu perfil',
        needs: 'Seu @usuário público',
      },
      {
        slug: 'buy-instagram-views',
        label: 'Visualizações',
        changes: 'As visualizações de um Reel ou vídeo',
        needs: 'Um link para o Reel',
      },
      {
        slug: 'buy-instagram-comments',
        label: 'Comentários',
        changes: 'Comentários em um post público',
        needs: 'Um link para o post',
      },
    ],
    currentLabel: 'Esta página',
  },
  safe: {
    id: 'is-it-safe',
    title: {
      lead: 'É seguro comprar',
      highlight: 'curtidas no Instagram?',
    },
    lead: 'Depende de três coisas: sua conta, seu pagamento e sua privacidade. Veja como cada uma funciona na NovaLikes, além do único risco que nenhum vendedor consegue eliminar.',
    body: 'As Diretrizes da Comunidade do Instagram pedem para não conseguir curtidas, seguidores ou compartilhamentos de forma artificial, e o Instagram remove com frequência contas que considera inativas ou falsas. Por isso pode haver uma pequena queda após a entrega, e por isso todo pedido inclui 6 meses de reposição. Um tamanho adequado ao post e a entrega gradual parecem mais naturais.',
    cards: [
      {
        ui: 'nopass',
        title: 'Segurança da conta',
        body: 'Precisamos só do link público do post ou do Reel, então ninguém entra na sua conta nem muda nada. Nunca pedimos senha nem código de acesso. Se alguém dizendo ser da NovaLikes pedir, não somos nós.',
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
      highlight: 'curtidas no Instagram',
    },
    lead: 'Confira estes quatro pontos uma vez e seu pedido vai correr bem.',
    items: [
      {
        title: 'O post está público',
        body: 'Ele precisa estar em uma conta pública até a entrega terminar.',
      },
      {
        title: 'O link é do post',
        body: 'Copie o link do próprio post, não o do seu perfil. Ele é assim: instagram.com/p/… ou instagram.com/reel/….',
      },
      {
        title: 'O post continua no ar',
        body: 'Não apague nem arquive durante a entrega e os 6 meses de reposição.',
      },
      {
        title: 'As curtidas estão visíveis',
        body: 'Se você ocultou o número de curtidas, elas chegam do mesmo jeito, mas ninguém vê. Mostre o número de novo.',
      },
    ],
  },
  faq: {
    id: 'faq',
    kicker: 'Dúvidas antes de pedir?',
    title: 'Perguntas frequentes sobre curtidas no Instagram',
    intro: 'Não encontrou sua resposta? Fale com a gente no WhatsApp pelo +44 7454 758272, 24/7.',
    cta: 'Pergunte no WhatsApp',
    locale: {
      code: 'pt-br',
    },
    extra: [
      {
        id: 'pt-ig-likes-v2-1',
        question: 'Quantas curtidas no Instagram devo comprar?',
        answer: 'Escolha um número adequado ao post e à sua conta. Algumas centenas de curtidas combinam com a maioria dos posts de contas pequenas; contas grandes e campanhas comportam alguns milhares. Na dúvida, comece pequeno.',
      },
      {
        id: 'pt-ig-likes-v2-2',
        question: 'Posso dividir um pacote de curtidas entre vários posts?',
        answer: 'Não. Cada pedido cobre um post ou Reel, para a entrega e a reposição serem fáceis de acompanhar. Para vários posts, faça um pedido para cada um.',
      },
      {
        id: 'pt-ig-likes-v2-3',
        question: 'Posso pedir reembolso?',
        answer: 'Pedidos elegíveis têm a nossa garantia de reembolso de 30 dias, contados a partir da data da compra. A política de reembolso explica quais pedidos são elegíveis e como enviar a solicitação.',
      },
      {
        id: 'pt-ig-likes-v2-4',
        question: 'Quais formas de pagamento posso usar?',
        answer: 'Você pode pagar com cartão, Apple Pay ou Google Pay, em dólares americanos. É um pagamento único e nada se renova.',
      },
    ],
  },
  more: {
    id: 'related-services',
    title: 'Mais serviços para Instagram',
    intro: 'As curtidas mudam um número. Para fazer outro crescer, escolha um serviço.',
    services: [
      {
        slug: 'buy-instagram-followers',
        title: 'Comprar seguidores no Instagram',
        line: 'Faça seu perfil crescer',
        image: '/assets/images/illustrations/instagram-followers/instagram-followers-hero.webp',
      },
      {
        slug: 'buy-instagram-views',
        title: 'Comprar visualizações no Instagram',
        line: 'Mais olhos nos seus Reels',
        image: '/assets/images/illustrations/instagram-views/instagram-views-hero.webp',
      },
      {
        slug: 'buy-instagram-comments',
        title: 'Comprar comentários no Instagram',
        line: 'Comece a conversa em um post',
        image: '/assets/images/illustrations/instagram-comments/instagram-comments-hero.webp',
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
