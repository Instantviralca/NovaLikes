import type { ServiceV2Content } from '../../types';

/** Brazilian Portuguese (/pt-br) — v2 service page copy for buy-instagram-comments. Primary keyword: "comprar comentários instagram". Do not edit wording without the content owner. */
export const PT_BR_BUY_INSTAGRAM_COMMENTS_V2 = {
  meta: {
    slug: 'buy-instagram-comments',
    platform: 'Instagram',
    name: 'Comentários no Instagram',
    unit: 'comentários',
    unitSingular: 'comentário',
    inputKind: 'link',
    perUnit: 1,
    tiers: true,
    keywords: {
      primary: 'comprar comentários instagram',
      secondary: [
        'comprar comentários personalizados instagram',
        'comentários em português instagram',
        'comentários premium instagram',
        'preço comentários instagram',
      ],
      questions: [
        'é seguro comprar comentários no instagram',
        'quanto custam comentários',
        'posso escrever meus próprios comentários',
        'tem comentários em português',
        'high quality ou premium',
      ],
    },
  },
  hero: {
    title: {
      lead: 'Comprar',
      highlight: 'comentários no Instagram',
      tail: 'para começar a conversa',
    },
    subtitle: 'Um post com comentários parece vivo e convida outras pessoas a participar. Escolha comentários High Quality ou Premium escritos para o seu post, a partir de {fromPrice}. Você também pode enviar seus próprios textos, em português ou em outro idioma.',
    trust: [
      'Sem senha',
      'Começa em 6–8 horas',
      '6 meses de reposição',
    ],
  },
  picker: {
    id: 'pricing-packages',
    title: 'Pacotes e preços de comentários no Instagram',
    intro: 'Escolha um nível e um pacote. Preços em USD.',
    summaryName: '{quantity} comentários {tier} no Instagram',
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
        note: 'Comentários curtos e positivos que combinam com quase qualquer post.',
      },
      {
        label: 'Premium',
        note: 'Comentários escritos para o seu post, de contas com aparência mais realista.',
      },
    ],
  },
  why: {
    id: 'why-choose-novalikes',
    title: {
      lead: 'Por que escolher a NovaLikes para',
      highlight: 'comentários no Instagram?',
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
        body: 'Se os comentários do seu pedido caírem nos 6 meses após a entrega, mande o número do pedido e repomos a diferença sem custo.',
      },
      {
        icon: 'badge-check',
        tone: 'peach',
        title: 'Garantia de reembolso de 30 dias',
        body: 'Pedidos elegíveis têm cobertura de 30 dias a partir da data da compra. Nossa política de reembolso explica o que está incluído.',
      },
      {
        icon: 'pen',
        tone: 'pink',
        title: 'Seus textos ou os nossos',
        body: 'Envie seus próprios comentários na observação do pedido, um por linha, ou deixe nossa equipe escrever. Em português, se você pedir.',
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
      highlight: 'comentários no Instagram',
    },
    pill: 'Cerca de 2 minutos',
    intro: 'Pedir leva cinco passos curtos. Escolha High Quality ou Premium, cole o link de um post público e envie seus textos, se quiser.',
    items: [
      {
        ui: 'public',
        title: 'Abra os comentários para todos',
        body: 'O post precisa estar em uma conta pública, com os comentários abertos para todo mundo. Limites como “só seguidores” impedem o início.',
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
        title: 'Cole o link e seus textos',
        body: 'Cole o link do post ou Reel no pagamento. Escreva seus comentários na observação, um por linha, ou deixe com a gente.',
      },
      {
        ui: 'pay',
        title: 'Pague com segurança',
        body: 'Pague uma única vez com cartão, Apple Pay ou Google Pay, em dólares americanos. Não há assinatura.',
      },
    ],
    done: {
      title: 'Pronto!',
      count: 25,
      unit: 'comentários',
      body: 'A maioria dos pedidos começa em 6–8 horas após o pagamento e termina 4–6 horas depois do início. Acompanhe o andamento na página “Acompanhar pedido” com o número do pedido.',
    },
  },
  ui: {
    toggle: {
      label: 'Comentários limitados',
      sub: 'Desativado para poder comentar',
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
      highlight: 'comentários no Instagram',
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
    title: 'Reposição e garantia de reembolso para comentários no Instagram',
    intro: 'As duas promessas estão na nossa política de reembolso, não só nesta página.',
    cards: [
      {
        chip: '6 meses',
        title: '6 meses de reposição',
        image: '/assets/images/illustrations/instagram-comments/instagram-comments-order-process.webp',
        body: 'Se os comentários do seu pedido caírem nos 6 meses após a data de entrega, fale com a gente pelo WhatsApp ou e-mail com o número do pedido e repomos a diferença sem custo. Mantenha o post ou o Reel no ar e público enquanto a reposição é entregue.',
      },
      {
        chip: '30 dias',
        title: 'Garantia de reembolso de 30 dias',
        image: '/assets/images/illustrations/instagram-comments/instagram-comments-package-cta.webp',
        body: 'Pedidos elegíveis podem ser reembolsados em até 30 dias após a compra. A política de reembolso explica o que é elegível e como solicitar.',
      },
    ],
    link: {
      label: 'Ler a política de reembolso',
      href: '/refund-policy',
    },
  },
  cost: {
    id: 'instagram-comments-cost',
    title: {
      lead: 'Quanto custam os',
      highlight: 'comentários no Instagram?',
    },
    intro: 'Os pacotes começam em {fromPrice}. Comentários High Quality custam menos por unidade e os Premium um pouco mais, porque cada um é escrito para o seu post. Cada preço é um pagamento único em dólares americanos para um post ou Reel.',
    points: [
      'Os 6 meses de reposição estão incluídos. Não precisa adicionar nada.',
      'Preços em dólares americanos. Seu banco converte para a sua moeda e alguns cartões cobram uma taxa por isso.',
      'Sem assinatura nem renovação. Você paga uma vez por pedido.',
    ],
    cols: [
      'Pacote',
      'Preço',
      'Por unidade',
    ],
    best: 'Melhor preço',
    note: 'Os preços vêm dos nossos pacotes atuais. O preço que você vê no pagamento é o que você paga.',
  },
  whyBuy: {
    id: 'why-buy-instagram-comments',
    title: {
      lead: 'Por que as pessoas compram',
      highlight: 'comentários no Instagram?',
    },
    intro: 'Uma seção de comentários vazia deixa até um bom post com cara de parado. Alguns comentários relevantes mostram que as pessoas estão falando dele e animam a próxima pessoa a participar.',
    items: [
      {
        title: 'Posts que parecem ativos',
        body: 'Comentários são o sinal mais claro de que as pessoas se importam com um post.',
      },
      {
        title: 'Uma primeira resposta mais fácil',
        body: 'Ninguém gosta de comentar primeiro. Quando a conversa já começou, os visitantes participam mais.',
      },
      {
        title: 'Sua mensagem em destaque',
        body: 'Com seus próprios textos, os comentários destacam um detalhe do produto, uma pergunta ou uma reação.',
      },
    ],
    diagram: [
      'Post ativo',
      'Primeira resposta',
      'Sua mensagem',
    ],
  },
  help: {
    id: 'does-buying-instagram-comments-help',
    title: {
      lead: 'Vale a pena comprar',
      highlight: 'comentários no Instagram?',
    },
    intro: 'Comentários mudam o que aparece embaixo de um post. Sozinhos, não trazem seguidores nem alcance.',
    no: {
      title: 'O que não muda',
      items: [
        'Seus seguidores, curtidas ou visualizações',
        'O posicionamento no Explorar ou nos Reels por si só',
        'Respostas espontâneas que mantêm a conversa viva',
      ],
    },
    yes: {
      title: 'O que muda',
      items: [
        'A seção de comentários do post escolhido',
        'O quanto o post parece ativo para novos visitantes',
        'Quais pontos ganham destaque, se você enviar seus textos',
      ],
      image: '/assets/images/illustrations/instagram-comments/instagram-comments-does-help.webp',
      altFallback: 'Ilustração: comentários no Instagram',
    },
  },
  who: {
    id: 'who-orders',
    title: {
      lead: 'Quem compra',
      highlight: 'comentários no Instagram',
    },
    cards: [
      {
        title: 'Criadores',
        body: 'Criadores adicionam comentários a Reels e carrosséis que merecem mais conversa, muitas vezes com seus próprios textos.',
        image: '/assets/images/illustrations/instagram-comments/instagram-comments-best-practices.webp',
      },
      {
        title: 'Pequenos negócios',
        body: 'Negócios usam em posts de produto e ofertas, para perguntas e reações aparecerem onde os clientes olham.',
        image: '/assets/images/illustrations/instagram-comments/instagram-comments-hero.webp',
      },
      {
        title: 'Marcas e agências',
        body: 'Marcas e agências escolhem comentários Premium para campanhas, em que cada comentário precisa soar natural.',
        image: '/assets/images/illustrations/instagram-comments/instagram-comments-why-buy.webp',
      },
    ],
    statement: 'Seja qual for o post, o pedido funciona do mesmo jeito: um link público, o nível que você escolher, seus textos se quiser, e comentários que costumam começar em 6–8 horas. Ninguém precisa dos seus dados de acesso.',
  },
  vs: {
    id: 'instagram-comments-vs-other-services',
    title: {
      lead: 'Comentários no Instagram x',
      highlight: 'curtidas, visualizações e seguidores',
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
        slug: 'buy-instagram-comments',
        label: 'Comentários',
        changes: 'Comentários em um post público',
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
        slug: 'buy-instagram-likes',
        label: 'Curtidas',
        changes: 'As curtidas de um post ou Reel',
        needs: 'Um link para o post',
      },
      {
        slug: 'buy-instagram-views',
        label: 'Visualizações',
        changes: 'As visualizações de um Reel ou vídeo',
        needs: 'Um link para o Reel',
      },
    ],
    currentLabel: 'Esta página',
  },
  safe: {
    id: 'is-it-safe',
    title: {
      lead: 'É seguro comprar',
      highlight: 'comentários no Instagram?',
    },
    lead: 'Depende de três coisas: sua conta, seu pagamento e sua privacidade. Veja como cada uma funciona na NovaLikes, além do único risco que nenhum vendedor consegue eliminar.',
    body: 'As Diretrizes da Comunidade do Instagram pedem para não aumentar as interações de forma artificial, e os filtros dele podem ocultar comentários ou remover contas que considera falsas. Por isso alguns comentários podem sumir após a entrega, e por isso todo pedido inclui 6 meses de reposição. Comentários Premium ou seus próprios textos, em quantidade razoável, parecem mais naturais.',
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
      highlight: 'comentários no Instagram',
    },
    lead: 'Confira estes quatro pontos uma vez e seu pedido vai correr bem.',
    items: [
      {
        title: 'Os comentários estão abertos',
        body: 'Confira se estão ativados e não limitados a seguidores ou às contas que você segue.',
      },
      {
        title: 'O link é do post',
        body: 'Copie o link do próprio post ou Reel, não o do seu perfil.',
      },
      {
        title: 'Seus textos estão prontos',
        body: 'Quer seus próprios comentários ou comentários em português? Escreva na observação antes de o pedido começar.',
      },
      {
        title: 'O post continua no ar',
        body: 'Não apague nem arquive durante a entrega e os 6 meses de reposição.',
      },
    ],
  },
  faq: {
    id: 'faq',
    kicker: 'Dúvidas antes de pedir?',
    title: 'Perguntas frequentes sobre comentários no Instagram',
    intro: 'Não encontrou sua resposta? Fale com a gente no WhatsApp pelo +44 7454 758272, 24/7.',
    cta: 'Pergunte no WhatsApp',
    locale: {
      code: 'pt-br',
    },
    extra: [
      {
        id: 'pt-ig-comments-v2-1',
        question: 'Posso receber comentários em português?',
        answer: 'Sim. Escreva “português” na observação do pedido ou envie seus próprios comentários em português, um por linha, e vamos publicá-los do jeito que estão.',
      },
      {
        id: 'pt-ig-comments-v2-2',
        question: 'Quantos comentários no Instagram devo comprar?',
        answer: 'Ajuste o número ao post. De 10 a 25 comentários combinam com a maioria dos posts de contas pequenas. Um post com poucas curtidas e dezenas de comentários pode parecer estranho.',
      },
      {
        id: 'pt-ig-comments-v2-3',
        question: 'Posso pedir reembolso?',
        answer: 'Pedidos elegíveis têm a nossa garantia de reembolso de 30 dias, contados a partir da data da compra. A política de reembolso explica quais pedidos são elegíveis e como enviar a solicitação.',
      },
      {
        id: 'pt-ig-comments-v2-4',
        question: 'Quais formas de pagamento posso usar?',
        answer: 'Você pode pagar com cartão, Apple Pay ou Google Pay, em dólares americanos. É um pagamento único e nada se renova.',
      },
    ],
  },
  more: {
    id: 'related-services',
    title: 'Mais serviços para Instagram',
    intro: 'Os comentários mudam um número. Para fazer outro crescer, escolha um serviço.',
    services: [
      {
        slug: 'buy-instagram-likes',
        title: 'Comprar curtidas no Instagram',
        line: 'Para posts, carrosséis e Reels',
        image: '/assets/images/illustrations/instagram-likes/instagram-likes-hero.webp',
      },
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
