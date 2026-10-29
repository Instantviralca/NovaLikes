import type { ServiceV2Content } from '../../types';

/** Spanish (/es) — v2 service page copy for buy-facebook-followers. Primary keyword: "comprar seguidores facebook". Do not edit wording without the content owner. */
export const ES_BUY_FACEBOOK_FOLLOWERS_V2 = {
  meta: {
    slug: 'buy-facebook-followers',
    platform: 'Facebook',
    name: 'Seguidores de Facebook',
    unit: 'seguidores',
    unitSingular: 'seguidor',
    inputKind: 'link',
    perUnit: 1000,
    tiers: false,
    keywords: {
      primary: 'comprar seguidores facebook',
      secondary: [
        'comprar seguidores para página de facebook',
        'paquetes de seguidores de facebook',
        'precio seguidores facebook',
        'hacer crecer página de facebook',
      ],
      questions: [
        'es seguro comprar seguidores de facebook',
        'cuánto cuestan los seguidores de facebook',
        'necesitan acceso de administrador',
        'funciona con un perfil personal',
        'por qué bajan los seguidores',
      ],
    },
  },
  hero: {
    title: {
      lead: 'Comprar',
      highlight: 'seguidores de Facebook',
      tail: 'para una Página que inspire confianza',
    },
    subtitle: 'Mucha gente mira la Página de Facebook de un negocio antes de llamar, reservar o ir. Consigue un número de seguidores que genere confianza. Desde {fromPrice}, solo con el enlace de la Página.',
    trust: [
      'Sin contraseña',
      'Empieza en 6–8 horas',
      '6 meses de reposición',
    ],
  },
  picker: {
    id: 'pricing-packages',
    title: 'Paquetes y precios de seguidores de Facebook',
    intro: 'Elige un paquete. Precios en USD.',
    summaryName: '{quantity} seguidores de Facebook',
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
        body: 'Solo el enlace',
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
      highlight: 'seguidores de Facebook?',
    },
    items: [
      {
        icon: 'shield',
        tone: 'mint',
        title: 'Solo un enlace, sin acceso de administrador',
        body: 'Solo necesitamos el enlace público de tu Página o perfil. Sin contraseña, sin rol de administrador y sin acceso a tu cuenta.',
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
        icon: 'users',
        tone: 'pink',
        title: 'Páginas y perfiles públicos',
        body: 'Funciona con Páginas de Facebook y con perfiles personales que tengan «Quién puede seguirme» en Público. Sin acceso de administrador.',
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
      highlight: 'seguidores de Facebook',
    },
    pill: 'Unos 2 minutos',
    intro: 'Pedir lleva cinco pasos cortos y unos dos minutos. Solo necesitamos el enlace público de tu Página o perfil.',
    items: [
      {
        ui: 'public',
        title: 'Permite que te sigan',
        body: 'Mantén la Página publicada. En un perfil personal, pon «Quién puede seguirme» en Público dentro de «Seguidores y contenido público».',
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
        title: 'Pega el enlace de tu Página',
        body: 'Copia el enlace de tu Página o perfil, por ejemplo facebook.com/tupagina, y pégalo en el pago.',
      },
      {
        ui: 'pay',
        title: 'Paga de forma segura',
        body: 'Paga una sola vez con tarjeta, Apple Pay o Google Pay, en dólares estadounidenses. No hay suscripción.',
      },
    ],
    done: {
      title: '¡Listo!',
      count: 1000,
      unit: 'seguidores',
      body: 'La mayoría de los pedidos empiezan en 6–8 horas tras el pago y terminan 4–6 horas después de empezar. Sigue el progreso en la página «Seguir pedido» con tu número de pedido.',
    },
  },
  ui: {
    toggle: {
      label: 'Página sin publicar',
      sub: 'Desactivada, para que la encuentren',
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
      placeholder: 'facebook.com/tupagina',
    },
    safeChips: [
      'Solo el enlace',
      'Pago seguro',
    ],
    privacyTags: [
      'enlace',
      'email',
    ],
  },
  compare: {
    id: 'spot-a-risky-seller',
    title: {
      lead: 'Cómo detectar un vendedor poco fiable de',
      highlight: 'seguidores de Facebook',
    },
    intro: 'Compres donde compres, revisa primero estos siete puntos.',
    us: 'NovaLikes',
    them: 'Vendedores poco fiables',
    rows: [
      {
        label: 'Datos de acceso',
        novalikes: 'Solo el enlace de la Página',
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
    title: 'Reposición y garantía de devolución para seguidores de Facebook',
    intro: 'Ambas promesas están en nuestra política de reembolso, no solo en esta página.',
    cards: [
      {
        chip: '6 meses',
        title: '6 meses de reposición',
        image: '/assets/images/illustrations/facebook-followers/facebook-followers-order-process.webp',
        body: 'Si los seguidores de tu pedido bajan en los 6 meses posteriores a la fecha de entrega, escríbenos por WhatsApp o email con tu número de pedido y reponemos la diferencia sin coste. Mantén la misma URL de la Página y la Página pública mientras se entrega una reposición.',
      },
      {
        chip: '30 días',
        title: 'Garantía de devolución de 30 días',
        image: '/assets/images/illustrations/facebook-followers/facebook-followers-package-cta.webp',
        body: 'Los pedidos elegibles se pueden reembolsar en los 30 días siguientes a la compra. La política de reembolso explica qué es elegible y cómo solicitarlo.',
      },
    ],
    link: {
      label: 'Leer la política de reembolso',
      href: '/refund-policy',
    },
  },
  cost: {
    id: 'facebook-followers-cost',
    title: {
      lead: '¿Cuánto cuestan los',
      highlight: 'seguidores de Facebook?',
    },
    intro: 'Los seguidores empiezan desde {fromPrice} por 100, y el precio por 1.000 baja a medida que crece el paquete. Cada precio es un pago único en dólares estadounidenses por una Página o perfil.',
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
    id: 'why-buy-facebook-followers',
    title: {
      lead: '¿Por qué la gente compra',
      highlight: 'seguidores de Facebook?',
    },
    intro: 'Facebook sigue siendo donde mucha gente consulta horarios, novedades y negocios locales. Un buen número de seguidores hace que tu Página parezca activa a primera vista.',
    items: [
      {
        title: 'Una Página que parece abierta',
        body: 'Una Página con 60 seguidores puede parecer abandonada aunque el negocio vaya bien.',
      },
      {
        title: 'Confianza antes de la primera llamada',
        body: 'Profesionales de oficios, clínicas y salones se revisan en Facebook antes de que alguien contacte.',
      },
      {
        title: 'Ventaja para Páginas nuevas',
        body: 'Negocios nuevos, segundos locales y cambios de marca no empiezan desde cero.',
      },
    ],
    diagram: [
      'Parece abierta',
      'Confianza',
      'Página nueva',
    ],
  },
  help: {
    id: 'does-buying-facebook-followers-help',
    title: {
      lead: '¿Sirve de algo comprar',
      highlight: 'seguidores de Facebook?',
    },
    intro: 'Los seguidores cambian el número de tu Página o perfil. Por sí solos no cambian quién ve tus publicaciones.',
    no: {
      title: 'Lo que no cambia',
      items: [
        'Reacciones o comentarios en tus publicaciones',
        'Tu alcance orgánico por sí solo',
        'Consultas sin publicaciones útiles y datos de contacto claros',
      ],
    },
    yes: {
      title: 'Lo que cambia',
      items: [
        'El número de seguidores de tu Página o perfil',
        'Lo consolidada que parece la Página a nuevos visitantes',
        'La primera impresión antes de una llamada o reserva',
      ],
      image: '/assets/images/illustrations/facebook-followers/facebook-followers-does-help.webp',
      altFallback: 'Ilustración: seguidores de Facebook',
    },
  },
  who: {
    id: 'who-orders',
    title: {
      lead: 'Quién compra',
      highlight: 'seguidores de Facebook',
    },
    cards: [
      {
        title: 'Profesionales de oficios',
        body: 'Fontaneros, electricistas y constructores añaden seguidores para que su Página se vea tan fiable como su trabajo.',
        image: '/assets/images/illustrations/facebook-followers/facebook-followers-best-practices.webp',
      },
      {
        title: 'Servicios locales',
        body: 'Clínicas, peluquerías caninas y autoescuelas hacen crecer su Página antes de una oferta o de abrir nuevas citas.',
        image: '/assets/images/illustrations/facebook-followers/facebook-followers-hero.webp',
      },
      {
        title: 'Asociaciones y grupos',
        body: 'Clubes, mercados y asociaciones añaden seguidores para que su Página parezca activa a nuevos miembros.',
        image: '/assets/images/illustrations/facebook-followers/facebook-followers-why-buy.webp',
      },
    ],
    statement: 'Sea cual sea la Página, el pedido funciona igual: un enlace público, un paquete adecuado y seguidores que suelen empezar en 6–8 horas. Sin acceso de administrador ni contraseña.',
  },
  vs: {
    id: 'facebook-followers-vs-other-services',
    title: {
      lead: 'Seguidores de Facebook frente a',
      highlight: 'likes de Página y de publicación',
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
        slug: 'buy-facebook-followers',
        label: 'Seguidores',
        changes: 'Seguidores de una Página o perfil',
        needs: 'Un enlace a la Página o perfil',
        current: true,
      },
      {
        slug: 'buy-facebook-page-likes',
        label: 'Likes de Página',
        changes: 'Los likes de una Página con diseño clásico',
        needs: 'Un enlace a la Página',
      },
      {
        slug: 'buy-facebook-post-likes',
        label: 'Likes de publicación',
        changes: 'Reacciones en una publicación pública',
        needs: 'Un enlace a la publicación',
      },
    ],
    currentLabel: 'Esta página',
  },
  safe: {
    id: 'is-it-safe',
    title: {
      lead: '¿Es seguro comprar',
      highlight: 'seguidores de Facebook?',
    },
    lead: 'Depende de tres cosas: tu cuenta, tu pago y tu privacidad. Así funciona cada una en NovaLikes, más el único riesgo que ningún vendedor puede eliminar.',
    body: 'Las Normas comunitarias de Facebook no permiten el comportamiento no auténtico, y Meta elimina con regularidad cuentas falsas o inactivas. Por eso puede haber alguna bajada tras la entrega, y por eso cada pedido incluye 6 meses de reposición. La entrega gradual y publicar con regularidad mantienen un crecimiento natural.',
    cards: [
      {
        ui: 'nopass',
        title: 'Seguridad de la cuenta',
        body: 'Solo necesitamos el enlace público de tu Página o perfil, así que nadie inicia sesión ni necesita permisos de administrador. Nunca pedimos una contraseña ni un código de acceso. Si alguien que dice ser NovaLikes te lo pide, no somos nosotros.',
      },
      {
        ui: 'pay',
        title: 'Seguridad del pago',
        body: 'Pagas una sola vez en un pago seguro con tarjeta, Apple Pay o Google Pay, en dólares estadounidenses. No hay suscripción y nada se renueva.',
      },
      {
        ui: 'privacy',
        title: 'Privacidad',
        body: 'Tu enlace y tu email solo se usan para procesar el pedido y enviarte avisos, como explica nuestra [política de privacidad](/privacy-policy).',
      },
    ],
  },
  before: {
    id: 'delivery-and-safety',
    title: {
      lead: 'Antes de comprar',
      highlight: 'seguidores de Facebook',
    },
    lead: 'Revisa estos cuatro puntos una vez y tu pedido irá sin problemas.',
    items: [
      {
        title: 'Se puede seguir',
        body: 'La Página debe estar publicada o el perfil debe permitir seguidores públicos.',
      },
      {
        title: 'El enlace es correcto',
        body: 'Copia el enlace de la Página o perfil, por ejemplo facebook.com/tupagina, no el de una publicación.',
      },
      {
        title: 'La URL no cambia',
        body: 'Mantén la misma dirección durante la entrega y los 6 meses de reposición.',
      },
      {
        title: 'El tamaño encaja',
        body: 'Elige un paquete que se vea natural junto a tus seguidores actuales y a lo que publicas.',
      },
    ],
  },
  faq: {
    id: 'faq',
    kicker: '¿Dudas antes de pedir?',
    title: 'Preguntas frecuentes sobre seguidores de Facebook',
    intro: '¿No encuentras tu respuesta? Escríbenos por WhatsApp al +44 7454 758272, 24/7.',
    cta: 'Pregúntanos por WhatsApp',
    locale: {
      code: 'es',
    },
    extra: [
      {
        id: 'es-fb-followers-v2-1',
        question: '¿Necesitáis acceso de administrador a mi Página?',
        answer: 'No. Solo necesitamos el enlace público. No des a nadie acceso de administrador ni tu contraseña de Facebook para conseguir seguidores.',
      },
      {
        id: 'es-fb-followers-v2-2',
        question: '¿Puedo pedir un reembolso?',
        answer: 'Los pedidos elegibles están cubiertos por nuestra garantía de devolución de 30 días, contados desde la fecha de compra. La política de reembolso explica qué pedidos son elegibles y cómo enviar la solicitud.',
      },
      {
        id: 'es-fb-followers-v2-3',
        question: '¿Qué métodos de pago puedo usar?',
        answer: 'Puedes pagar con tarjeta, Apple Pay o Google Pay, en dólares estadounidenses. Es un pago único y nada se renueva.',
      },
    ],
  },
  more: {
    id: 'related-services',
    title: 'Más servicios de NovaLikes',
    intro: 'Los seguidores de Facebook cambian un número. Para hacer crecer otro, elige un servicio.',
    services: [
      {
        slug: 'buy-facebook-page-likes',
        title: 'Comprar likes para Página de Facebook',
        line: 'Para Páginas con número de likes',
        image: '/assets/images/illustrations/facebook-page-likes/facebook-page-likes-hero.webp',
      },
      {
        slug: 'buy-facebook-post-likes',
        title: 'Comprar likes para publicaciones de Facebook',
        line: 'Reacciones en una publicación pública',
        image: '/assets/images/illustrations/facebook-post-likes/facebook-post-likes-hero.webp',
      },
      {
        slug: 'buy-instagram-followers',
        title: 'Comprar seguidores de Instagram',
        line: 'Haz crecer tu perfil',
        image: '/assets/images/illustrations/instagram-followers/instagram-followers-hero.webp',
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
