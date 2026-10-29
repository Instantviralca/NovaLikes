import type { ServiceV2Content } from '../../types';

/** Spanish (/es) — v2 service page copy for buy-instagram-followers. Primary keyword: "comprar seguidores instagram". Do not edit wording without the content owner. */
export const ES_BUY_INSTAGRAM_FOLLOWERS_V2 = {
  meta: {
    slug: 'buy-instagram-followers',
    platform: 'Instagram',
    name: 'Seguidores de Instagram',
    unit: 'seguidores',
    unitSingular: 'seguidor',
    inputKind: 'username',
    perUnit: 1000,
    tiers: false,
    keywords: {
      primary: 'comprar seguidores instagram',
      secondary: [
        'comprar seguidores de instagram sin contraseña',
        'paquetes de seguidores de instagram',
        'precio seguidores instagram',
        'conseguir más seguidores en instagram',
      ],
      questions: [
        'es seguro comprar seguidores de instagram',
        'cuánto cuestan los seguidores de instagram',
        'me pueden banear por comprar seguidores',
        'por qué bajan mis seguidores',
        'sirve de algo comprar seguidores',
      ],
    },
  },
  hero: {
    title: {
      lead: 'Comprar',
      highlight: 'seguidores de Instagram',
      tail: 'para dar más credibilidad a tu perfil',
    },
    subtitle: 'Marcas, colaboradores y nuevos visitantes miran tu número de seguidores antes de seguirte. Crea un perfil que inspire confianza desde {fromPrice}, sin compartir tu contraseña de Instagram.',
    trust: [
      'Sin contraseña',
      'Empieza en 6–8 horas',
      '6 meses de reposición',
    ],
  },
  picker: {
    id: 'pricing-packages',
    title: 'Paquetes y precios de seguidores de Instagram',
    intro: 'Elige un paquete. Precios en USD.',
    summaryName: '{quantity} seguidores de Instagram',
    save: 'Ahorras',
    cta: 'Añadir al carrito',
    oneTime: 'Compra única. Sin suscripción.',
    secure: 'Pago seguro',
    methods: [
      'Tarjeta',
      'Apple Pay',
      'Google Pay',
    ],
    features: [
      {
        icon: 'shield',
        title: 'Sin contraseña',
        body: 'Solo el usuario',
      },
      {
        icon: 'clock',
        title: 'Empieza en 6–8 h',
        body: 'Termina 4–6 h después',
      },
      {
        icon: 'message-square',
        title: 'Te ayudamos',
        body: '24/7 por WhatsApp',
      },
    ],
  },
  why: {
    id: 'why-choose-novalikes',
    title: {
      lead: '¿Por qué elegir NovaLikes para',
      highlight: 'seguidores de Instagram?',
    },
    items: [
      {
        icon: 'shield',
        tone: 'mint',
        title: 'Tu usuario, nunca tu contraseña',
        body: 'Solo necesitamos tu nombre de usuario público. Sin código de acceso y sin entrar en tu cuenta.',
      },
      {
        icon: 'clock',
        tone: 'sun',
        title: 'Plazos claros de inicio y fin',
        body: 'La mayoría de los pedidos empiezan en 6–8 horas tras el pago y terminan 4–6 horas después de empezar. ¿Prefieres un ritmo más lento? Pide una entrega gradual.',
      },
      {
        icon: 'refresh-cw',
        tone: 'lilac',
        title: '6 meses de reposición',
        body: 'Si los seguidores de tu pedido bajan en los 6 meses posteriores a la entrega, envíanos tu número de pedido y los reponemos sin coste.',
      },
      {
        icon: 'badge-check',
        tone: 'peach',
        title: 'Garantía de devolución de 30 días',
        body: 'Los pedidos elegibles están cubiertos durante 30 días desde la fecha de compra. Nuestra política de reembolso explica qué incluye.',
      },
      {
        icon: 'message-square',
        tone: 'pink',
        title: 'Ayuda por WhatsApp, 24/7',
        body: '¿Dudas antes o después de pedir? Escribe al +44 7454 758272 con tu número de pedido, de día o de noche.',
      },
    ],
    promo: {
      eyebrow: '¿No sabes qué paquete elegir?',
      title: 'Pregúntanos antes de comprar',
      cta: 'Escríbenos por WhatsApp',
    },
  },
  steps: {
    id: 'how-it-works',
    title: {
      lead: 'Cómo comprar',
      highlight: 'seguidores de Instagram',
    },
    pill: 'Unos 2 minutos',
    intro: 'Pedir lleva cinco pasos cortos y unos dos minutos. La mayoría de los pedidos empiezan en 6–8 horas tras el pago.',
    items: [
      {
        ui: 'public',
        title: 'Pon tu perfil en público',
        body: 'Los seguidores solo se pueden entregar a un perfil público. Cuando termine el pedido puedes volver a ponerlo en privado.',
      },
      {
        ui: 'packages',
        title: 'Elige un paquete',
        body: 'Elige una cantidad de los paquetes de arriba. Cada paquete muestra el precio antes de decidir.',
      },
      {
        ui: 'cart',
        title: 'Añádelo al carrito',
        body: 'Pulsa «Añadir al carrito» y continúa al pago.',
      },
      {
        ui: 'username',
        title: 'Añade tu usuario',
        body: 'Escribe el @usuario público que recibirá los seguidores y tu email para el recibo y los avisos del pedido.',
      },
      {
        ui: 'pay',
        title: 'Paga de forma segura',
        body: 'Paga una sola vez con tarjeta, Apple Pay o Google Pay, en dólares estadounidenses. No hay suscripción.',
      },
    ],
    done: {
      title: '¡Listo!',
      count: 2000,
      unit: 'seguidores',
      body: 'La mayoría de los pedidos empiezan en 6–8 horas tras el pago y terminan 4–6 horas después de empezar. Sigue el progreso en la página «Seguir pedido» con tu número de pedido.',
    },
  },
  ui: {
    toggle: {
      label: 'Cuenta privada',
      sub: 'Desactivada, para poder llegar',
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
      placeholder: 'tuusuario',
    },
    safeChips: [
      'Solo el usuario',
      'Pago seguro',
    ],
    privacyTags: [
      '@usuario',
      'email',
    ],
  },
  compare: {
    id: 'spot-a-risky-seller',
    title: {
      lead: 'Cómo detectar un vendedor poco fiable de',
      highlight: 'seguidores de Instagram',
    },
    intro: 'Compres donde compres, revisa primero estos siete puntos.',
    us: 'NovaLikes',
    them: 'Vendedores poco fiables',
    rows: [
      {
        label: 'Datos de acceso',
        novalikes: 'Solo el usuario',
        riskySeller: 'Te piden la contraseña',
      },
      {
        label: 'Plazos',
        novalikes: 'Empieza en 6–8 horas',
        riskySeller: 'Sin plazo indicado',
      },
      {
        label: 'Bajadas',
        novalikes: '6 meses de reposición',
        riskySeller: 'Sin reposición',
      },
      {
        label: 'Reembolsos',
        novalikes: 'Devolución en 30 días*',
        riskySeller: 'Sin política escrita',
      },
      {
        label: 'Soporte',
        novalikes: 'WhatsApp 24/7',
        riskySeller: 'Difíciles de contactar',
      },
      {
        label: 'Precio',
        novalikes: 'En USD, visible antes',
        riskySeller: 'Cambia en el pago',
      },
      {
        label: 'Seguimiento',
        novalikes: 'Página «Seguir pedido»',
        riskySeller: 'Sin forma de comprobarlo',
      },
    ],
    note: '*En pedidos elegibles, según nuestra política de reembolso.',
  },
  promises: {
    id: 'our-promises',
    title: 'Reposición y garantía de devolución para seguidores de Instagram',
    intro: 'Ambas promesas están en nuestra política de reembolso, no solo en esta página.',
    cards: [
      {
        chip: '6 meses',
        title: '6 meses de reposición',
        image: '/assets/images/illustrations/instagram-followers/instagram-followers-order-process.webp',
        body: 'Si los seguidores de tu pedido bajan en los 6 meses posteriores a la fecha de entrega, escríbenos por WhatsApp o email con tu número de pedido y reponemos la diferencia sin coste. Mantén el mismo nombre de usuario y el perfil público mientras se entrega una reposición.',
      },
      {
        chip: '30 días',
        title: 'Garantía de devolución de 30 días',
        image: '/assets/images/illustrations/instagram-followers/instagram-followers-package-cta.webp',
        body: 'Los pedidos elegibles se pueden reembolsar en los 30 días siguientes a la compra. La política de reembolso explica qué es elegible y cómo solicitarlo.',
      },
    ],
    link: {
      label: 'Leer la política de reembolso',
      href: '/refund-policy',
    },
  },
  cost: {
    id: 'instagram-followers-cost',
    title: {
      lead: '¿Cuánto cuestan los',
      highlight: 'seguidores de Instagram?',
    },
    intro: 'Los paquetes empiezan desde {fromPrice} por 100 seguidores. Cuanto más grande es el paquete, menos pagas por seguidor, y cada precio es un pago único en dólares estadounidenses.',
    points: [
      'Los 6 meses de reposición están incluidos. No hay que añadir nada.',
      'Precios en dólares estadounidenses. Tu banco lo convierte a tu moneda y algunas tarjetas cobran una comisión por ello.',
      'Sin suscripción ni renovación. Pagas una vez por pedido.',
    ],
    cols: [
      'Paquete',
      'Precio',
      'Por 1.000',
    ],
    best: 'Mejor precio',
    note: 'Los precios salen de nuestros paquetes actuales. El precio que ves en el pago es el que pagas.',
  },
  whyBuy: {
    id: 'why-buy-instagram-followers',
    title: {
      lead: '¿Por qué la gente compra',
      highlight: 'seguidores de Instagram?',
    },
    intro: 'La mayoría de quienes piden no empiezan de cero. Tienen contenido en el que creen y un número de seguidores que no le hace justicia. Un paquete cambia el número que los visitantes ven primero, para que tus buenas publicaciones tengan una oportunidad más justa. Funciona mejor si sigues publicando con regularidad.',
    items: [
      {
        title: 'Una mejor primera impresión',
        body: 'Los visitantes miran el número de seguidores antes de leer un solo texto. Un perfil más completo recibe una primera mirada más justa.',
      },
      {
        title: 'Ventaja para una cuenta nueva',
        body: 'Una marca nueva, un proyecto paralelo o una cuenta de creador no tiene que quedarse en unas pocas decenas de seguidores mientras crece.',
      },
      {
        title: 'Apoyo para un lanzamiento o propuesta',
        body: 'Los equipos añaden seguidores antes de un lanzamiento, una campaña o una propuesta a una marca, junto a las publicaciones que hacen el trabajo real.',
      },
    ],
    diagram: [
      'Primera impresión',
      'Ventaja inicial',
      'Lanzamiento',
    ],
  },
  help: {
    id: 'does-buying-instagram-followers-help',
    title: {
      lead: '¿Sirve de algo comprar',
      highlight: 'seguidores de Instagram?',
    },
    intro: 'Ayuda con una cosa: el número que la gente ve en tu perfil. Este es el reparto honesto.',
    no: {
      title: 'Lo que no cambia',
      items: [
        'Likes, visualizaciones o comentarios de tus publicaciones',
        'Tu alcance o las recomendaciones de Explorar y Reels',
        'Ventas, registros o mensajes por sí solos',
      ],
    },
    yes: {
      title: 'Lo que cambia',
      items: [
        'El número de seguidores de tu perfil',
        'La primera impresión de los nuevos visitantes',
        'Lo consolidada que parece una cuenta nueva',
      ],
      image: '/assets/images/illustrations/instagram-followers/instagram-followers-does-help.webp',
      altFallback: 'Ilustración: seguidores de Instagram',
    },
  },
  who: {
    id: 'who-orders',
    title: {
      lead: 'Quién compra',
      highlight: 'seguidores de Instagram',
    },
    cards: [
      {
        title: 'Creadores',
        body: 'Los creadores usan seguidores para dar a una cuenta en crecimiento el perfil que merece mientras siguen publicando Reels e historias. Motivos habituales: una cuenta nueva, la primera propuesta a una marca o relanzar una cuenta.',
        image: '/assets/images/illustrations/instagram-followers/instagram-followers-best-practices.webp',
      },
      {
        title: 'Pequeños negocios',
        body: 'Tiendas, salones, cafeterías y servicios suelen conocer a sus clientes en Instagram antes que en su web. Un perfil activo ayuda cuando la gente te mira antes de una apertura o un lanzamiento.',
        image: '/assets/images/illustrations/instagram-followers/instagram-followers-hero.webp',
      },
      {
        title: 'Marcas y agencias',
        body: 'Marcas y agencias añaden seguidores a cuentas nuevas de país, producto o campaña, a menudo con entrega gradual para un crecimiento más estable.',
        image: '/assets/images/illustrations/instagram-followers/instagram-followers-why-buy.webp',
      },
    ],
    statement: 'Sea cual sea el motivo, el pedido funciona igual: tu usuario público, el paquete que elijas y un número que suele empezar a subir en 6–8 horas. Nadie necesita nunca tus datos de acceso.',
  },
  vs: {
    id: 'instagram-followers-vs-other-services',
    title: {
      lead: 'Seguidores de Instagram frente a',
      highlight: 'likes, visualizaciones y comentarios',
    },
    intro: 'Cada servicio cambia un número distinto. Elige el que encaja con lo que quieres que vea la gente.',
    cols: [
      'Servicio',
      'Qué cambia',
      'Qué nos das',
      'Desde',
    ],
    rows: [
      {
        slug: 'buy-instagram-followers',
        label: 'Seguidores',
        changes: 'El número de seguidores de tu perfil',
        needs: 'Tu @usuario público',
        current: true,
      },
      {
        slug: 'buy-instagram-likes',
        label: 'Likes',
        changes: 'Los likes de una publicación o Reel',
        needs: 'Un enlace a la publicación',
      },
      {
        slug: 'buy-instagram-views',
        label: 'Visualizaciones',
        changes: 'Las visualizaciones de un Reel o vídeo',
        needs: 'Un enlace al Reel',
      },
      {
        slug: 'buy-instagram-comments',
        label: 'Comentarios',
        changes: 'Comentarios en una publicación pública',
        needs: 'Un enlace a la publicación',
      },
    ],
    currentLabel: 'Esta página',
  },
  safe: {
    id: 'is-it-safe',
    title: {
      lead: '¿Es seguro comprar',
      highlight: 'seguidores de Instagram?',
    },
    lead: 'Depende de tres cosas: tu cuenta, tu pago y tu privacidad. Así funciona cada una en NovaLikes, más el único riesgo que ningún vendedor puede eliminar.',
    body: 'Las Normas comunitarias de Instagram piden no conseguir seguidores, likes ni compartidos de forma artificial, e Instagram elimina con regularidad cuentas que considera inactivas o falsas. Por eso puede haber alguna bajada tras la entrega, y por eso cada pedido incluye 6 meses de reposición. La entrega gradual y publicar con regularidad mantienen un crecimiento natural.',
    cards: [
      {
        ui: 'nopass',
        title: 'Seguridad de la cuenta',
        body: 'Solo necesitamos tu nombre de usuario público, así que nadie entra en tu cuenta ni cambia nada. Nunca pedimos un código de acceso. Si alguien que dice ser NovaLikes te lo pide, no somos nosotros.',
      },
      {
        ui: 'pay',
        title: 'Seguridad del pago',
        body: 'Pagas una sola vez en un pago seguro con tarjeta, Apple Pay o Google Pay, en dólares estadounidenses. No hay suscripción y nada se renueva.',
      },
      {
        ui: 'privacy',
        title: 'Privacidad',
        body: 'Tu usuario y tu email solo se usan para procesar el pedido y enviarte avisos, como explica nuestra [política de privacidad](/privacy-policy).',
      },
    ],
  },
  before: {
    id: 'delivery-and-safety',
    title: {
      lead: 'Antes de comprar',
      highlight: 'seguidores de Instagram',
    },
    lead: 'Revisa estos cuatro puntos una vez y tu pedido irá sin problemas.',
    items: [
      {
        title: 'Tu perfil es público',
        body: 'Mantenlo público hasta que termine la entrega. Un perfil privado impide que el pedido empiece o termine.',
      },
      {
        title: 'El usuario está bien escrito',
        body: 'Entregamos exactamente a lo que escribes. Cópialo directamente de tu perfil para ir sobre seguro.',
      },
      {
        title: 'El usuario no cambia',
        body: 'Mantén el mismo usuario durante la entrega y los 6 meses de reposición, o no podremos encontrar el perfil.',
      },
      {
        title: 'Sabes qué ritmo quieres',
        body: '¿Quieres que los seguidores lleguen poco a poco? Pide entrega gradual en el pago o por WhatsApp.',
      },
    ],
  },
  faq: {
    id: 'faq',
    kicker: '¿Dudas antes de pedir?',
    title: 'Preguntas frecuentes sobre seguidores de Instagram',
    intro: '¿No encuentras tu respuesta? Escríbenos por WhatsApp al +44 7454 758272, 24/7.',
    cta: 'Pregúntanos por WhatsApp',
    locale: {
      code: 'es',
    },
    extra: [
      {
        id: 'es-ig-followers-v2-1',
        question: '¿Es seguro comprar seguidores de Instagram?',
        answer: 'Con NovaLikes solo compartes tu usuario público, así que nadie entra en tu cuenta, y pagas en un proceso seguro. El único riesgo que ningún vendedor puede eliminar es Instagram: sus normas desaconsejan los seguidores artificiales y elimina con regularidad cuentas inactivas o falsas. Por eso cada pedido incluye 6 meses de reposición.',
      },
      {
        id: 'es-ig-followers-v2-2',
        question: '¿Cuánto cuestan los seguidores de Instagram?',
        answer: 'Los paquetes empiezan desde {fromPrice} por 100 seguidores, y el precio por seguidor baja cuanto más grande es el paquete. Todos los precios están en dólares estadounidenses y son un pago único sin suscripción.',
      },
      {
        id: 'es-ig-followers-v2-3',
        question: '¿Me pueden suspender la cuenta por comprar seguidores?',
        answer: 'Nunca iniciamos sesión en tu cuenta, así que por nuestra parte no cambia nada dentro de ella. Instagram puede eliminar seguidores que considere falsos y sus normas desaconsejan el crecimiento artificial, así que siempre hay algo de riesgo. Un tamaño acorde a tu perfil, la entrega gradual y publicar con regularidad son la forma sensata de usar un paquete.',
      },
      {
        id: 'es-ig-followers-v2-4',
        question: '¿Por qué bajó mi número de seguidores y qué cubre la reposición?',
        answer: 'Instagram elimina con regularidad cuentas inactivas o falsas, así que alguna bajada es normal. Si los seguidores de tu pedido bajan en los 6 meses posteriores a la entrega, escríbenos con tu número de pedido y reponemos la diferencia. Mantén el mismo usuario y el perfil público mientras se entrega la reposición.',
      },
      {
        id: 'es-ig-followers-v2-5',
        question: '¿Puedo pedir un reembolso?',
        answer: 'Los pedidos elegibles están cubiertos por nuestra garantía de devolución de 30 días, contados desde la fecha de compra. La política de reembolso explica qué pedidos son elegibles y cómo enviar la solicitud.',
      },
      {
        id: 'es-ig-followers-v2-6',
        question: '¿Cuántos seguidores de Instagram debería comprar?',
        answer: 'Elige un tamaño que se vea natural junto a tu número actual y a lo que publicas. Un paquete pequeño es un buen primer pedido y luego puedes añadir más. ¿No lo tienes claro? Escríbenos por WhatsApp.',
      },
      {
        id: 'es-ig-followers-v2-7',
        question: '¿Qué métodos de pago puedo usar?',
        answer: 'Puedes pagar con tarjeta, Apple Pay o Google Pay, en dólares estadounidenses. Es un pago único y nada se renueva.',
      },
    ],
  },
  more: {
    id: 'related-services',
    title: 'Más servicios de Instagram',
    intro: 'Los seguidores de Instagram cambian un número. Para hacer crecer otro, elige un servicio.',
    services: [
      {
        slug: 'buy-instagram-likes',
        title: 'Comprar likes de Instagram',
        line: 'Para publicaciones, carruseles y Reels',
        image: '/assets/images/illustrations/instagram-likes/instagram-likes-hero.webp',
      },
      {
        slug: 'buy-instagram-views',
        title: 'Comprar visualizaciones de Instagram',
        line: 'Más ojos en tus Reels',
        image: '/assets/images/illustrations/instagram-views/instagram-views-hero.webp',
      },
      {
        slug: 'buy-instagram-comments',
        title: 'Comprar comentarios de Instagram',
        line: 'Inicia la conversación en una publicación',
        image: '/assets/images/illustrations/instagram-comments/instagram-comments-hero.webp',
      },
    ],
    cardPrice: 'Desde {fromPrice}',
    guidesTitle: '',
    guides: [],
  },
  sticky: {
    label: 'Elegir paquete',
    href: '#pricing-packages',
  },
  whatsapp: {
    display: '+44 7454 758272',
    href: 'https://wa.me/447454758272',
  },
} satisfies ServiceV2Content;
