import type { ServiceV2Content } from '../../types';

/** Brazilian Portuguese (/pt-br) — v2 service page copy for buy-tiktok-views. Primary keyword: "comprar visualizações tiktok". Do not edit wording without the content owner. */
export const PT_BR_BUY_TIKTOK_VIEWS_V2 = {
  meta: {
    slug: 'buy-tiktok-views',
    platform: 'TikTok',
    name: 'Visualizações no TikTok',
    unit: 'visualizações',
    unitSingular: 'visualização',
    inputKind: 'link',
    perUnit: 1000,
    tiers: true,
    keywords: {
      primary: 'comprar visualizações tiktok',
      secondary: [
        'comprar views tiktok',
        'pacotes de visualizações tiktok',
        'preço visualizações tiktok',
        'comprar visualizações para vídeo do tiktok',
      ],
      questions: [
        'é seguro comprar visualizações no tiktok',
        'quanto custam visualizações no tiktok',
        'contam para o creator rewards',
        'high quality ou premium',
        'por que meu tiktok tem 0 visualizações',
      ],
    },
  },
  hero: {
    title: {
      lead: 'Comprar',
      highlight: 'visualizações no TikTok',
      tail: 'para um começo mais forte',
    },
    subtitle: 'Um vídeo novo com poucas centenas de visualizações passa rápido, por melhor que seja. Dê a ele um número mais forte desde o início. Visualizações High Quality ou Premium a partir de {fromPrice}.',
    trust: [
      'Sem senha',
      'Começa em 6–8 horas',
      '6 meses de reposição',
    ],
  },
  picker: {
    id: 'pricing-packages',
    title: 'Pacotes e preços de visualizações no TikTok',
    intro: 'Escolha um nível e um pacote. Preços em USD.',
    summaryName: '{quantity} visualizações {tier} no TikTok',
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
    tiers: [
      {
        label: 'High Quality',
        note: 'Nosso menor preço por visualização.',
      },
      {
        label: 'Premium',
        note: 'Nossa opção de visualizações de nível superior.',
      },
    ],
  },
  why: {
    id: 'why-choose-novalikes',
    title: {
      lead: 'Por que escolher a NovaLikes para',
      highlight: 'visualizações no TikTok?',
    },
    items: [
      {
        icon: 'shield',
        tone: 'mint',
        title: 'Só um link, nunca a sua senha',
        body: 'Precisamos só do link público do vídeo. Sem código de acesso e sem entrar na sua conta.',
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
        body: 'Se as visualizações do seu pedido caírem nos 6 meses após a entrega, mande o número do pedido e repomos a diferença sem custo.',
      },
      {
        icon: 'badge-check',
        tone: 'peach',
        title: 'Garantia de reembolso de 30 dias',
        body: 'Pedidos elegíveis têm cobertura de 30 dias a partir da data da compra. Nossa política de reembolso explica o que está incluído.',
      },
      {
        icon: 'layers',
        tone: 'pink',
        title: 'Dois níveis de qualidade',
        body: 'High Quality é o nosso menor preço por visualização e Premium a nossa opção superior. Os dois têm os mesmos prazos e 6 meses de reposição.',
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
      highlight: 'visualizações no TikTok',
    },
    pill: 'Cerca de 2 minutos',
    intro: 'Pedir leva cinco passos curtos. Escolha High Quality ou Premium, uma quantidade e cole o link de um vídeo público.',
    items: [
      {
        ui: 'public',
        title: 'Mantenha o vídeo público',
        body: 'O vídeo precisa ser público, em uma conta pública, até a entrega terminar. Não apague.',
      },
      {
        ui: 'packages',
        title: 'Escolha nível e pacote',
        body: 'Escolha High Quality ou Premium e depois uma quantidade. Cada pacote mostra o preço antes de você decidir.',
      },
      {
        ui: 'cart',
        title: 'Adicione ao carrinho',
        body: 'Toque em “Adicionar ao carrinho” e siga para o pagamento.',
      },
      {
        ui: 'username',
        title: 'Cole o link do vídeo',
        body: 'Abra o vídeo no TikTok, toque em “Compartilhar”, escolha “Copiar link” e cole no pagamento.',
      },
      {
        ui: 'pay',
        title: 'Pague com segurança',
        body: 'Pague uma única vez com cartão, Apple Pay ou Google Pay, em dólares americanos. Não há assinatura.',
      },
    ],
    done: {
      title: 'Pronto!',
      count: 10000,
      unit: 'visualizações',
      body: 'A maioria dos pedidos começa em 6–8 horas após o pagamento e termina 4–6 horas depois do início. Acompanhe o andamento na página “Acompanhar pedido” com o número do pedido.',
    },
  },
  ui: {
    toggle: {
      label: 'Vídeo privado',
      sub: 'Desativado para chegar ao vídeo',
    },
    chips: [
      '2K',
      '5K',
      '10K',
      '50K',
    ],
    chipOn: 2,
    input: {
      prefix: '',
      placeholder: 'tiktok.com/@…/video/…',
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
      highlight: 'visualizações no TikTok',
    },
    intro: 'Onde quer que você compre, confira primeiro estes sete pontos.',
    us: 'NovaLikes',
    them: 'Vendedores pouco confiáveis',
    rows: [
      {
        label: 'Dados de acesso',
        novalikes: 'Só o link do vídeo',
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
    title: 'Reposição e garantia de reembolso para visualizações no TikTok',
    intro: 'As duas promessas estão na nossa política de reembolso, não só nesta página.',
    cards: [
      {
        chip: '6 meses',
        title: '6 meses de reposição',
        image: '/assets/images/illustrations/tiktok-views/tiktok-views-order-process.webp',
        body: 'Se as visualizações do seu pedido caírem nos 6 meses após a data de entrega, fale com a gente pelo WhatsApp ou e-mail com o número do pedido e repomos a diferença sem custo. Mantenha o vídeo no ar e público enquanto a reposição é entregue.',
      },
      {
        chip: '30 dias',
        title: 'Garantia de reembolso de 30 dias',
        image: '/assets/images/illustrations/tiktok-views/tiktok-views-package-cta.webp',
        body: 'Pedidos elegíveis podem ser reembolsados em até 30 dias após a compra. A política de reembolso explica o que é elegível e como solicitar.',
      },
    ],
    link: {
      label: 'Ler a política de reembolso',
      href: '/refund-policy',
    },
  },
  cost: {
    id: 'tiktok-views-cost',
    title: {
      lead: 'Quanto custam as',
      highlight: 'visualizações no TikTok?',
    },
    intro: 'As visualizações começam em {fromPrice}. High Quality tem o menor preço por 1.000 e Premium custa um pouco mais. Cada preço é um pagamento único em dólares americanos para um vídeo.',
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
    id: 'why-buy-tiktok-views',
    title: {
      lead: 'Por que as pessoas compram',
      highlight: 'visualizações no TikTok?',
    },
    intro: 'No TikTok a rolagem é rápida, e o número de visualizações é uma das poucas coisas que as pessoas notam antes de decidir. As visualizações fazem um vídeo novo parecer que já está sendo assistido.',
    items: [
      {
        title: 'Vídeos novos que não começam do zero',
        body: 'Um vídeo recém-postado com um número sólido merece alguns segundos de atenção.',
      },
      {
        title: 'Anúncios que convencem',
        body: 'Vídeos de produto e promoção convencem mais quando o número mostra que foram vistos.',
      },
      {
        title: 'Um portfólio mais forte',
        body: 'Criadores que se apresentam a marcas podem mostrar vídeos com boas visualizações.',
      },
    ],
    diagram: [
      'Não do zero',
      'Anúncios',
      'Portfólio',
    ],
  },
  help: {
    id: 'does-buying-tiktok-views-help',
    title: {
      lead: 'Vale a pena comprar',
      highlight: 'visualizações no TikTok?',
    },
    intro: 'Visualizações mudam o número de um vídeo. O que o TikTok impulsiona continua dependendo do tempo de exibição e das reações dos espectadores.',
    no: {
      title: 'O que não muda',
      items: [
        'Tempo de exibição, curtidas ou compartilhamentos por si só',
        'O posicionamento no Para Você por si só',
        'Ganhos no Creator Rewards',
      ],
    },
    yes: {
      title: 'O que muda',
      items: [
        'As visualizações do vídeo que você escolher',
        'O quanto o vídeo parece assistido para novos espectadores',
        'A primeira impressão de lançamentos e promoções',
      ],
      image: '/assets/images/illustrations/tiktok-views/tiktok-views-does-help.webp',
      altFallback: 'Ilustração: visualizações no TikTok',
    },
  },
  who: {
    id: 'who-orders',
    title: {
      lead: 'Quem compra',
      highlight: 'visualizações no TikTok',
    },
    cards: [
      {
        title: 'Negócios locais',
        body: 'Restaurantes, salões e oficinas adicionam visualizações a vídeos promocionais que compartilham na bio, em anúncios e no WhatsApp.',
        image: '/assets/images/illustrations/tiktok-views/tiktok-views-best-practices.webp',
      },
      {
        title: 'Criadores de nicho',
        body: 'Criadores adicionam visualizações a formatos novos e estreias de séries enquanto descobrem do que o público gosta.',
        image: '/assets/images/illustrations/tiktok-views/tiktok-views-hero.webp',
      },
      {
        title: 'Agências',
        body: 'Agências adicionam visualizações a vídeos de lançamento de campanhas, muitas vezes com entrega gradual.',
        image: '/assets/images/illustrations/tiktok-views/tiktok-views-why-buy.webp',
      },
    ],
    statement: 'Seja qual for o vídeo, o pedido funciona do mesmo jeito: um link público, o nível e a quantidade que você escolher, e visualizações que costumam começar em 6–8 horas. Sem login.',
  },
  vs: {
    id: 'tiktok-views-vs-other-services',
    title: {
      lead: 'Visualizações no TikTok x',
      highlight: 'curtidas e seguidores',
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
        slug: 'buy-tiktok-views',
        label: 'Visualizações',
        changes: 'As visualizações de um vídeo',
        needs: 'Um link para o vídeo público',
        current: true,
      },
      {
        slug: 'buy-tiktok-followers',
        label: 'Seguidores',
        changes: 'O número de seguidores do seu perfil',
        needs: 'Seu usuário público',
      },
      {
        slug: 'buy-tiktok-likes',
        label: 'Curtidas',
        changes: 'As curtidas de um vídeo',
        needs: 'Um link para o vídeo público',
      },
    ],
    currentLabel: 'Esta página',
  },
  safe: {
    id: 'is-it-safe',
    title: {
      lead: 'É seguro comprar',
      highlight: 'visualizações no TikTok?',
    },
    lead: 'Depende de três coisas: sua conta, seu pagamento e sua privacidade. Veja como cada uma funciona na NovaLikes, além do único risco que nenhum vendedor consegue eliminar.',
    body: 'As Diretrizes da Comunidade do TikTok proíbem interações falsas, e o Creator Rewards só paga pelas visualizações que o TikTok considera válidas. Então nunca compre visualizações para ganhar dinheiro. O TikTok também remove contas inativas, por isso pode haver uma pequena queda após a entrega, e todo pedido inclui 6 meses de reposição.',
    cards: [
      {
        ui: 'nopass',
        title: 'Segurança da conta',
        body: 'Precisamos só do link público do vídeo, então ninguém entra na sua conta nem muda nada. Nunca pedimos senha nem código de acesso. Se alguém dizendo ser da NovaLikes pedir, não somos nós.',
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
      highlight: 'visualizações no TikTok',
    },
    lead: 'Confira estes quatro pontos uma vez e seu pedido vai correr bem.',
    items: [
      {
        title: 'O vídeo está público',
        body: 'As visualizações não chegam a um vídeo privado nem a um vídeo de uma conta privada.',
      },
      {
        title: 'O link é do vídeo',
        body: 'Copie em “Compartilhar”, não o link do seu perfil.',
      },
      {
        title: 'O vídeo continua no ar',
        body: 'Mantenha no ar durante a entrega e os 6 meses de reposição.',
      },
      {
        title: 'Você escolheu um nível',
        body: 'High Quality é o menor preço por visualização e Premium a opção superior. Dúvidas? Pergunte no WhatsApp.',
      },
    ],
  },
  faq: {
    id: 'faq',
    kicker: 'Dúvidas antes de pedir?',
    title: 'Perguntas frequentes sobre visualizações no TikTok',
    intro: 'Não encontrou sua resposta? Fale com a gente no WhatsApp pelo +44 7454 758272, 24/7.',
    cta: 'Pergunte no WhatsApp',
    locale: {
      code: 'pt-br',
    },
    extra: [
      {
        id: 'pt-tt-views-v2-1',
        question: 'Visualizações compradas contam para o Creator Rewards?',
        answer: 'Não compre para isso. O Creator Rewards só paga pelas visualizações que o TikTok considera válidas, e as regras dele proíbem interações falsas. Visualizações compradas não geram dinheiro e podem colocar a conta em risco.',
      },
      {
        id: 'pt-tt-views-v2-2',
        question: 'Posso pedir reembolso?',
        answer: 'Pedidos elegíveis têm a nossa garantia de reembolso de 30 dias, contados a partir da data da compra. A política de reembolso explica quais pedidos são elegíveis e como enviar a solicitação.',
      },
      {
        id: 'pt-tt-views-v2-3',
        question: 'Quais formas de pagamento posso usar?',
        answer: 'Você pode pagar com cartão, Apple Pay ou Google Pay, em dólares americanos. É um pagamento único e nada se renova.',
      },
    ],
  },
  more: {
    id: 'related-services',
    title: 'Mais serviços da NovaLikes',
    intro: 'As visualizações mudam um número. Para fazer outro crescer, escolha um serviço.',
    services: [
      {
        slug: 'buy-tiktok-likes',
        title: 'Comprar curtidas no TikTok',
        line: 'Mais corações em um vídeo',
        image: '/assets/images/illustrations/tiktok-likes/tiktok-likes-hero.webp',
      },
      {
        slug: 'buy-tiktok-followers',
        title: 'Comprar seguidores no TikTok',
        line: 'Faça seu perfil no TikTok crescer',
        image: '/assets/images/illustrations/tiktok-followers/tiktok-followers-hero.webp',
      },
      {
        slug: 'buy-instagram-views',
        title: 'Comprar visualizações no Instagram',
        line: 'Mais olhos nos seus Reels',
        image: '/assets/images/illustrations/instagram-views/instagram-views-hero.webp',
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
