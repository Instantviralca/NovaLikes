/**
 * One-shot: merge orderDialog + decorative + commerce.off into locale ui.json files.
 * Does not touch routes, IDs, prices, or service content.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';

const root = process.cwd();

const OFF = {
  en: 'OFF',
  es: 'DTO',
  de: 'Rabatt',
  fr: 'de réduction',
  it: 'di sconto',
  'pt-br': 'OFF',
  ar: 'خصم',
};

function orderDialog(locale) {
  const t = {
    en: {
      title: 'Order details',
      description: 'Enter the information needed to fulfill {quantity}.',
      delivery: 'Delivery',
      noPasswordRequired: 'No password required',
      fixHighlighted: 'Please fix the highlighted fields.',
      addedToCart: '{qty} {product} added to your cart.',
      selectPlaceholder: 'Select…',
      paymentReassuranceAria: 'Payment reassurance',
      secureCheckoutEncrypted: 'Secure checkout · Encrypted payment',
      moneyBackGuarantee: '30-Day Money-Back Guarantee',
      labels: {
        'Instagram username': 'Instagram username',
        'TikTok username': 'TikTok username',
        'Account username': 'Account username',
        'Instagram Username': 'Instagram Username',
        'TikTok Username': 'TikTok Username',
        'Facebook Username': 'Facebook Username',
        'YouTube Username': 'YouTube Username',
        'Account Username': 'Account Username',
        'TikTok video URL': 'TikTok video URL',
        'Facebook page or profile URL': 'Facebook page or profile URL',
        'Facebook page URL': 'Facebook page URL',
        'Facebook post URL': 'Facebook post URL',
        'YouTube channel URL': 'YouTube channel URL',
        'Instagram post or Reel URL': 'Instagram post or Reel URL',
        'YouTube video URL': 'YouTube video URL',
        'Post URL': 'Post URL',
        'Page URL': 'Page URL',
        'Video URL': 'Video URL',
        'Channel URL': 'Channel URL',
        'Order Notes': 'Order Notes',
        'Custom Comments': 'Custom Comments',
      },
      placeholders: {
        '@username': '@username',
        'Optional instructions for fulfillment': 'Optional instructions for fulfillment',
        'Enter one comment per line': 'Enter one comment per line',
      },
      help: {
        'Enter the public Instagram username that should receive the followers.':
          'Enter the public Instagram username that should receive the followers.',
        'Enter the public TikTok username that should receive the followers.':
          'Enter the public TikTok username that should receive the followers.',
        'Paste the public TikTok video URL that should receive the likes.':
          'Paste the public TikTok video URL that should receive the likes.',
        'Paste the public Facebook page or profile URL.':
          'Paste the public Facebook page or profile URL.',
        'Paste the public Facebook page URL that should receive the likes.':
          'Paste the public Facebook page URL that should receive the likes.',
        'Paste the public Facebook post URL that should receive the likes.':
          'Paste the public Facebook post URL that should receive the likes.',
        'Paste the public YouTube channel URL that should receive the subscribers.':
          'Paste the public YouTube channel URL that should receive the subscribers.',
        'Paste the public Instagram post or Reel URL that should receive the likes.':
          'Paste the public Instagram post or Reel URL that should receive the likes.',
        'Paste the public Instagram video or Reel URL that should receive the views.':
          'Paste the public Instagram video or Reel URL that should receive the views.',
        'Paste the public Instagram post or Reel URL that should receive the comments.':
          'Paste the public Instagram post or Reel URL that should receive the comments.',
        'Paste the public TikTok video URL that should receive the views.':
          'Paste the public TikTok video URL that should receive the views.',
        'Paste the public YouTube video URL that should receive the views.':
          'Paste the public YouTube video URL that should receive the views.',
      },
      customCommentsHelp:
        'Provide exactly {quantity} comments, one per line. Blank lines are removed.',
      validation: {
        isRequired: '{label} is required.',
        minLength: '{label} must be at least {n} characters.',
        maxLength: '{label} must be at most {n} characters.',
        formatInvalid: '{label} format is invalid.',
        usernameOnly: 'Enter a username only (not a full profile URL).',
        usernameInvalid: 'Enter a valid username (letters, numbers, periods, underscores).',
        instagramUrl: 'Enter a valid Instagram post or Reel URL (instagram.com).',
        tiktokUrl: 'Enter a valid TikTok video URL (tiktok.com).',
        facebookUrl: 'Enter a valid Facebook page or profile URL (facebook.com).',
        facebookPostUrl: 'Enter a valid Facebook post URL (facebook.com).',
        youtubeChannelUrl:
          'Enter a valid YouTube channel URL (youtube.com/@…, /channel/…, /c/…, or /user/…).',
        youtubeVideoUrl: 'Enter a valid YouTube video URL (youtube.com/watch?v=… or youtu.be/…).',
        genericUrl: 'Enter a valid URL starting with https://.',
        exactComments: 'Enter exactly {exact} comments (one per line). You entered {count}.',
        commentMaxLength: 'Each comment must be at most {n} characters.',
      },
    },
    es: {
      title: 'Detalles del pedido',
      description: 'Introduce la información necesaria para completar {quantity}.',
      delivery: 'Entrega',
      noPasswordRequired: 'Sin contraseña',
      fixHighlighted: 'Corrige los campos marcados.',
      addedToCart: '{qty} {product} añadido a tu carrito.',
      selectPlaceholder: 'Seleccionar…',
      paymentReassuranceAria: 'Garantías de pago',
      secureCheckoutEncrypted: 'Pago seguro · Pago cifrado',
      moneyBackGuarantee: 'Garantía de reembolso de 30 días',
      labels: {
        'Instagram username': 'Nombre de usuario de Instagram',
        'TikTok username': 'Nombre de usuario de TikTok',
        'Account username': 'Nombre de usuario de la cuenta',
        'Instagram Username': 'Nombre de usuario de Instagram',
        'TikTok Username': 'Nombre de usuario de TikTok',
        'Facebook Username': 'Nombre de usuario de Facebook',
        'YouTube Username': 'Nombre de usuario de YouTube',
        'Account Username': 'Nombre de usuario de la cuenta',
        'TikTok video URL': 'URL del vídeo de TikTok',
        'Facebook page or profile URL': 'URL de página o perfil de Facebook',
        'Facebook page URL': 'URL de Página de Facebook',
        'Facebook post URL': 'URL de publicación de Facebook',
        'YouTube channel URL': 'URL del canal de YouTube',
        'Instagram post or Reel URL': 'URL de publicación o Reel de Instagram',
        'YouTube video URL': 'URL del vídeo de YouTube',
        'Post URL': 'URL de la publicación',
        'Page URL': 'URL de la página',
        'Video URL': 'URL del vídeo',
        'Channel URL': 'URL del canal',
        'Order Notes': 'Notas del pedido',
        'Custom Comments': 'Comentarios personalizados',
      },
      placeholders: {
        '@username': '@usuario',
        'Optional instructions for fulfillment': 'Instrucciones opcionales para el cumplimiento',
        'Enter one comment per line': 'Escribe un comentario por línea',
      },
      help: {
        'Enter the public Instagram username that should receive the followers.':
          'Introduce el nombre de usuario público de Instagram que debe recibir los seguidores.',
        'Enter the public TikTok username that should receive the followers.':
          'Introduce el nombre de usuario público de TikTok que debe recibir los seguidores.',
        'Paste the public TikTok video URL that should receive the likes.':
          'Pega la URL pública del vídeo de TikTok que debe recibir los Me gusta.',
        'Paste the public Facebook page or profile URL.':
          'Pega la URL pública de la página o perfil de Facebook.',
        'Paste the public Facebook page URL that should receive the likes.':
          'Pega la URL pública de la Página de Facebook que debe recibir los Me gusta.',
        'Paste the public Facebook post URL that should receive the likes.':
          'Pega la URL pública de la publicación de Facebook que debe recibir los Me gusta.',
        'Paste the public YouTube channel URL that should receive the subscribers.':
          'Pega la URL pública del canal de YouTube que debe recibir los suscriptores.',
        'Paste the public Instagram post or Reel URL that should receive the likes.':
          'Pega la URL pública de la publicación o Reel de Instagram que debe recibir los Me gusta.',
        'Paste the public Instagram video or Reel URL that should receive the views.':
          'Pega la URL pública del vídeo o Reel de Instagram que debe recibir las visualizaciones.',
        'Paste the public Instagram post or Reel URL that should receive the comments.':
          'Pega la URL pública de la publicación o Reel de Instagram que debe recibir los comentarios.',
        'Paste the public TikTok video URL that should receive the views.':
          'Pega la URL pública del vídeo de TikTok que debe recibir las visualizaciones.',
        'Paste the public YouTube video URL that should receive the views.':
          'Pega la URL pública del vídeo de YouTube que debe recibir las visualizaciones.',
      },
      customCommentsHelp:
        'Proporciona exactamente {quantity} comentarios, uno por línea. Se eliminan las líneas en blanco.',
      validation: {
        isRequired: '{label} es obligatorio.',
        minLength: '{label} debe tener al menos {n} caracteres.',
        maxLength: '{label} debe tener como máximo {n} caracteres.',
        formatInvalid: 'El formato de {label} no es válido.',
        usernameOnly: 'Introduce solo un nombre de usuario (no una URL completa del perfil).',
        usernameInvalid:
          'Introduce un nombre de usuario válido (letras, números, puntos y guiones bajos).',
        instagramUrl: 'Introduce una URL válida de publicación o Reel de Instagram (instagram.com).',
        tiktokUrl: 'Introduce una URL válida de vídeo de TikTok (tiktok.com).',
        facebookUrl: 'Introduce una URL válida de página o perfil de Facebook (facebook.com).',
        facebookPostUrl: 'Introduce una URL válida de publicación de Facebook (facebook.com).',
        youtubeChannelUrl:
          'Introduce una URL válida de canal de YouTube (youtube.com/@…, /channel/…, /c/… o /user/…).',
        youtubeVideoUrl:
          'Introduce una URL válida de vídeo de YouTube (youtube.com/watch?v=… o youtu.be/…).',
        genericUrl: 'Introduce una URL válida que empiece por https://.',
        exactComments:
          'Introduce exactamente {exact} comentarios (uno por línea). Has introducido {count}.',
        commentMaxLength: 'Cada comentario debe tener como máximo {n} caracteres.',
      },
    },
    de: {
      title: 'Bestelldetails',
      description: 'Gib die Angaben ein, die für {quantity} benötigt werden.',
      delivery: 'Lieferung',
      noPasswordRequired: 'Kein Passwort erforderlich',
      fixHighlighted: 'Bitte korrigiere die markierten Felder.',
      addedToCart: '{qty} {product} wurden dem Warenkorb hinzugefügt.',
      selectPlaceholder: 'Auswählen…',
      paymentReassuranceAria: 'Zahlungssicherheit',
      secureCheckoutEncrypted: 'Sicherer Checkout · Verschlüsselte Zahlung',
      moneyBackGuarantee: '30-Tage-Geld-zurück-Garantie',
      labels: {
        'Instagram username': 'Instagram-Benutzername',
        'TikTok username': 'TikTok-Benutzername',
        'Account username': 'Konto-Benutzername',
        'Instagram Username': 'Instagram-Benutzername',
        'TikTok Username': 'TikTok-Benutzername',
        'Facebook Username': 'Facebook-Benutzername',
        'YouTube Username': 'YouTube-Benutzername',
        'Account Username': 'Konto-Benutzername',
        'TikTok video URL': 'TikTok-Video-URL',
        'Facebook page or profile URL': 'Facebook-Seiten- oder Profil-URL',
        'Facebook page URL': 'Facebook-Seiten-URL',
        'Facebook post URL': 'Facebook-Beitrags-URL',
        'YouTube channel URL': 'YouTube-Kanal-URL',
        'Instagram post or Reel URL': 'Instagram-Beitrags- oder Reel-URL',
        'YouTube video URL': 'YouTube-Video-URL',
        'Post URL': 'Beitrags-URL',
        'Page URL': 'Seiten-URL',
        'Video URL': 'Video-URL',
        'Channel URL': 'Kanal-URL',
        'Order Notes': 'Bestellnotizen',
        'Custom Comments': 'Eigene Kommentare',
      },
      placeholders: {
        '@username': '@benutzername',
        'Optional instructions for fulfillment': 'Optionale Hinweise zur Erfüllung',
        'Enter one comment per line': 'Einen Kommentar pro Zeile eingeben',
      },
      help: {
        'Enter the public Instagram username that should receive the followers.':
          'Gib den öffentlichen Instagram-Benutzernamen ein, der die Follower erhalten soll.',
        'Enter the public TikTok username that should receive the followers.':
          'Gib den öffentlichen TikTok-Benutzernamen ein, der die Follower erhalten soll.',
        'Paste the public TikTok video URL that should receive the likes.':
          'Füge die öffentliche TikTok-Video-URL ein, die die Likes erhalten soll.',
        'Paste the public Facebook page or profile URL.':
          'Füge die öffentliche Facebook-Seiten- oder Profil-URL ein.',
        'Paste the public Facebook page URL that should receive the likes.':
          'Füge die öffentliche Facebook-Seiten-URL ein, die die Likes erhalten soll.',
        'Paste the public Facebook post URL that should receive the likes.':
          'Füge die öffentliche Facebook-Beitrags-URL ein, die die Likes erhalten soll.',
        'Paste the public YouTube channel URL that should receive the subscribers.':
          'Füge die öffentliche YouTube-Kanal-URL ein, die die Abonnenten erhalten soll.',
        'Paste the public Instagram post or Reel URL that should receive the likes.':
          'Füge die öffentliche Instagram-Beitrags- oder Reel-URL ein, die die Likes erhalten soll.',
        'Paste the public Instagram video or Reel URL that should receive the views.':
          'Füge die öffentliche Instagram-Video- oder Reel-URL ein, die die Aufrufe erhalten soll.',
        'Paste the public Instagram post or Reel URL that should receive the comments.':
          'Füge die öffentliche Instagram-Beitrags- oder Reel-URL ein, die die Kommentare erhalten soll.',
        'Paste the public TikTok video URL that should receive the views.':
          'Füge die öffentliche TikTok-Video-URL ein, die die Aufrufe erhalten soll.',
        'Paste the public YouTube video URL that should receive the views.':
          'Füge die öffentliche YouTube-Video-URL ein, die die Aufrufe erhalten soll.',
      },
      customCommentsHelp:
        'Gib genau {quantity} Kommentare ein, einen pro Zeile. Leere Zeilen werden entfernt.',
      validation: {
        isRequired: '{label} ist erforderlich.',
        minLength: '{label} muss mindestens {n} Zeichen haben.',
        maxLength: '{label} darf höchstens {n} Zeichen haben.',
        formatInvalid: 'Das Format von {label} ist ungültig.',
        usernameOnly: 'Gib nur einen Benutzernamen ein (keine vollständige Profil-URL).',
        usernameInvalid:
          'Gib einen gültigen Benutzernamen ein (Buchstaben, Zahlen, Punkte, Unterstriche).',
        instagramUrl: 'Gib eine gültige Instagram-Beitrags- oder Reel-URL ein (instagram.com).',
        tiktokUrl: 'Gib eine gültige TikTok-Video-URL ein (tiktok.com).',
        facebookUrl: 'Gib eine gültige Facebook-Seiten- oder Profil-URL ein (facebook.com).',
        facebookPostUrl: 'Gib eine gültige Facebook-Beitrags-URL ein (facebook.com).',
        youtubeChannelUrl:
          'Gib eine gültige YouTube-Kanal-URL ein (youtube.com/@…, /channel/…, /c/… oder /user/…).',
        youtubeVideoUrl:
          'Gib eine gültige YouTube-Video-URL ein (youtube.com/watch?v=… oder youtu.be/…).',
        genericUrl: 'Gib eine gültige URL ein, die mit https:// beginnt.',
        exactComments:
          'Gib genau {exact} Kommentare ein (einen pro Zeile). Du hast {count} eingegeben.',
        commentMaxLength: 'Jeder Kommentar darf höchstens {n} Zeichen haben.',
      },
    },
    fr: {
      title: 'Détails de la commande',
      description: 'Saisissez les informations nécessaires pour traiter {quantity}.',
      delivery: 'Livraison',
      noPasswordRequired: 'Aucun mot de passe requis',
      fixHighlighted: 'Veuillez corriger les champs signalés.',
      addedToCart: '{qty} {product} ajouté à votre panier.',
      selectPlaceholder: 'Sélectionner…',
      paymentReassuranceAria: 'Garanties de paiement',
      secureCheckoutEncrypted: 'Paiement sécurisé · Paiement chiffré',
      moneyBackGuarantee: 'Garantie satisfait ou remboursé 30 jours',
      labels: {
        'Instagram username': "Nom d'utilisateur Instagram",
        'TikTok username': "Nom d'utilisateur TikTok",
        'Account username': "Nom d'utilisateur du compte",
        'Instagram Username': "Nom d'utilisateur Instagram",
        'TikTok Username': "Nom d'utilisateur TikTok",
        'Facebook Username': "Nom d'utilisateur Facebook",
        'YouTube Username': "Nom d'utilisateur YouTube",
        'Account Username': "Nom d'utilisateur du compte",
        'TikTok video URL': 'URL de la vidéo TikTok',
        'Facebook page or profile URL': 'URL de page ou de profil Facebook',
        'Facebook page URL': 'URL de Page Facebook',
        'Facebook post URL': 'URL de publication Facebook',
        'YouTube channel URL': 'URL de la chaîne YouTube',
        'Instagram post or Reel URL': 'URL de publication ou Reel Instagram',
        'YouTube video URL': 'URL de la vidéo YouTube',
        'Post URL': 'URL de la publication',
        'Page URL': 'URL de la page',
        'Video URL': 'URL de la vidéo',
        'Channel URL': 'URL de la chaîne',
        'Order Notes': 'Notes de commande',
        'Custom Comments': 'Commentaires personnalisés',
      },
      placeholders: {
        '@username': '@identifiant',
        'Optional instructions for fulfillment': 'Instructions optionnelles pour le traitement',
        'Enter one comment per line': 'Saisissez un commentaire par ligne',
      },
      help: {
        'Enter the public Instagram username that should receive the followers.':
          "Saisissez le nom d'utilisateur Instagram public qui doit recevoir les abonnés.",
        'Enter the public TikTok username that should receive the followers.':
          "Saisissez le nom d'utilisateur TikTok public qui doit recevoir les abonnés.",
        'Paste the public TikTok video URL that should receive the likes.':
          'Collez l’URL publique de la vidéo TikTok qui doit recevoir les likes.',
        'Paste the public Facebook page or profile URL.':
          'Collez l’URL publique de la page ou du profil Facebook.',
        'Paste the public Facebook page URL that should receive the likes.':
          'Collez l’URL publique de la Page Facebook qui doit recevoir les likes.',
        'Paste the public Facebook post URL that should receive the likes.':
          'Collez l’URL publique de la publication Facebook qui doit recevoir les likes.',
        'Paste the public YouTube channel URL that should receive the subscribers.':
          'Collez l’URL publique de la chaîne YouTube qui doit recevoir les abonnés.',
        'Paste the public Instagram post or Reel URL that should receive the likes.':
          'Collez l’URL publique de la publication ou du Reel Instagram qui doit recevoir les likes.',
        'Paste the public Instagram video or Reel URL that should receive the views.':
          'Collez l’URL publique de la vidéo ou du Reel Instagram qui doit recevoir les vues.',
        'Paste the public Instagram post or Reel URL that should receive the comments.':
          'Collez l’URL publique de la publication ou du Reel Instagram qui doit recevoir les commentaires.',
        'Paste the public TikTok video URL that should receive the views.':
          'Collez l’URL publique de la vidéo TikTok qui doit recevoir les vues.',
        'Paste the public YouTube video URL that should receive the views.':
          'Collez l’URL publique de la vidéo YouTube qui doit recevoir les vues.',
      },
      customCommentsHelp:
        'Fournissez exactement {quantity} commentaires, un par ligne. Les lignes vides sont supprimées.',
      validation: {
        isRequired: '{label} est obligatoire.',
        minLength: '{label} doit contenir au moins {n} caractères.',
        maxLength: '{label} doit contenir au plus {n} caractères.',
        formatInvalid: 'Le format de {label} n’est pas valide.',
        usernameOnly: 'Saisissez uniquement un nom d’utilisateur (pas une URL complète).',
        usernameInvalid:
          'Saisissez un nom d’utilisateur valide (lettres, chiffres, points, underscores).',
        instagramUrl: 'Saisissez une URL Instagram de publication ou Reel valide (instagram.com).',
        tiktokUrl: 'Saisissez une URL de vidéo TikTok valide (tiktok.com).',
        facebookUrl: 'Saisissez une URL de page ou de profil Facebook valide (facebook.com).',
        facebookPostUrl: 'Saisissez une URL de publication Facebook valide (facebook.com).',
        youtubeChannelUrl:
          'Saisissez une URL de chaîne YouTube valide (youtube.com/@…, /channel/…, /c/… ou /user/…).',
        youtubeVideoUrl:
          'Saisissez une URL de vidéo YouTube valide (youtube.com/watch?v=… ou youtu.be/…).',
        genericUrl: 'Saisissez une URL valide commençant par https://.',
        exactComments:
          'Saisissez exactement {exact} commentaires (un par ligne). Vous en avez saisi {count}.',
        commentMaxLength: 'Chaque commentaire doit contenir au plus {n} caractères.',
      },
    },
    it: {
      title: 'Dettagli dell’ordine',
      description: 'Inserisci le informazioni necessarie per evadere {quantity}.',
      delivery: 'Consegna',
      noPasswordRequired: 'Nessuna password richiesta',
      fixHighlighted: 'Correggi i campi evidenziati.',
      addedToCart: '{qty} {product} aggiunto al carrello.',
      selectPlaceholder: 'Seleziona…',
      paymentReassuranceAria: 'Garanzie di pagamento',
      secureCheckoutEncrypted: 'Checkout sicuro · Pagamento crittografato',
      moneyBackGuarantee: 'Garanzia soddisfatti o rimborsati 30 giorni',
      labels: {
        'Instagram username': 'Username Instagram',
        'TikTok username': 'Username TikTok',
        'Account username': 'Username dell’account',
        'Instagram Username': 'Username Instagram',
        'TikTok Username': 'Username TikTok',
        'Facebook Username': 'Username Facebook',
        'YouTube Username': 'Username YouTube',
        'Account Username': 'Username dell’account',
        'TikTok video URL': 'URL video TikTok',
        'Facebook page or profile URL': 'URL di pagina o profilo Facebook',
        'Facebook page URL': 'URL Pagina Facebook',
        'Facebook post URL': 'URL post Facebook',
        'YouTube channel URL': 'URL canale YouTube',
        'Instagram post or Reel URL': 'URL post o Reel Instagram',
        'YouTube video URL': 'URL video YouTube',
        'Post URL': 'URL del post',
        'Page URL': 'URL della pagina',
        'Video URL': 'URL del video',
        'Channel URL': 'URL del canale',
        'Order Notes': 'Note sull’ordine',
        'Custom Comments': 'Commenti personalizzati',
      },
      placeholders: {
        '@username': '@username',
        'Optional instructions for fulfillment': 'Istruzioni facoltative per l’evasione',
        'Enter one comment per line': 'Inserisci un commento per riga',
      },
      help: {
        'Enter the public Instagram username that should receive the followers.':
          'Inserisci lo username pubblico Instagram che deve ricevere i follower.',
        'Enter the public TikTok username that should receive the followers.':
          'Inserisci lo username pubblico TikTok che deve ricevere i follower.',
        'Paste the public TikTok video URL that should receive the likes.':
          'Incolla l’URL pubblico del video TikTok che deve ricevere i like.',
        'Paste the public Facebook page or profile URL.':
          'Incolla l’URL pubblico della pagina o del profilo Facebook.',
        'Paste the public Facebook page URL that should receive the likes.':
          'Incolla l’URL pubblico della Pagina Facebook che deve ricevere i like.',
        'Paste the public Facebook post URL that should receive the likes.':
          'Incolla l’URL pubblico del post Facebook che deve ricevere i like.',
        'Paste the public YouTube channel URL that should receive the subscribers.':
          'Incolla l’URL pubblico del canale YouTube che deve ricevere gli iscritti.',
        'Paste the public Instagram post or Reel URL that should receive the likes.':
          'Incolla l’URL pubblico del post o Reel Instagram che deve ricevere i like.',
        'Paste the public Instagram video or Reel URL that should receive the views.':
          'Incolla l’URL pubblico del video o Reel Instagram che deve ricevere le visualizzazioni.',
        'Paste the public Instagram post or Reel URL that should receive the comments.':
          'Incolla l’URL pubblico del post o Reel Instagram che deve ricevere i commenti.',
        'Paste the public TikTok video URL that should receive the views.':
          'Incolla l’URL pubblico del video TikTok che deve ricevere le visualizzazioni.',
        'Paste the public YouTube video URL that should receive the views.':
          'Incolla l’URL pubblico del video YouTube che deve ricevere le visualizzazioni.',
      },
      customCommentsHelp:
        'Fornisci esattamente {quantity} commenti, uno per riga. Le righe vuote vengono rimosse.',
      validation: {
        isRequired: '{label} è obbligatorio.',
        minLength: '{label} deve avere almeno {n} caratteri.',
        maxLength: '{label} può avere al massimo {n} caratteri.',
        formatInvalid: 'Il formato di {label} non è valido.',
        usernameOnly: 'Inserisci solo uno username (non un URL completo del profilo).',
        usernameInvalid:
          'Inserisci uno username valido (lettere, numeri, punti, underscore).',
        instagramUrl: 'Inserisci un URL valido di post o Reel Instagram (instagram.com).',
        tiktokUrl: 'Inserisci un URL valido di video TikTok (tiktok.com).',
        facebookUrl: 'Inserisci un URL valido di pagina o profilo Facebook (facebook.com).',
        facebookPostUrl: 'Inserisci un URL valido di post Facebook (facebook.com).',
        youtubeChannelUrl:
          'Inserisci un URL valido di canale YouTube (youtube.com/@…, /channel/…, /c/… o /user/…).',
        youtubeVideoUrl:
          'Inserisci un URL valido di video YouTube (youtube.com/watch?v=… o youtu.be/…).',
        genericUrl: 'Inserisci un URL valido che inizi con https://.',
        exactComments:
          'Inserisci esattamente {exact} commenti (uno per riga). Ne hai inseriti {count}.',
        commentMaxLength: 'Ogni commento può avere al massimo {n} caratteri.',
      },
    },
    'pt-br': {
      title: 'Detalhes do pedido',
      description: 'Insira as informações necessárias para processar {quantity}.',
      delivery: 'Entrega',
      noPasswordRequired: 'Nenhuma senha necessária',
      fixHighlighted: 'Corrija os campos destacados.',
      addedToCart: '{qty} {product} adicionado ao seu carrinho.',
      selectPlaceholder: 'Selecionar…',
      paymentReassuranceAria: 'Garantias de pagamento',
      secureCheckoutEncrypted: 'Checkout seguro · Pagamento criptografado',
      moneyBackGuarantee: 'Garantia de reembolso de 30 dias',
      labels: {
        'Instagram username': 'Nome de usuário do Instagram',
        'TikTok username': 'Nome de usuário do TikTok',
        'Account username': 'Nome de usuário da conta',
        'Instagram Username': 'Nome de usuário do Instagram',
        'TikTok Username': 'Nome de usuário do TikTok',
        'Facebook Username': 'Nome de usuário do Facebook',
        'YouTube Username': 'Nome de usuário do YouTube',
        'Account Username': 'Nome de usuário da conta',
        'TikTok video URL': 'URL do vídeo do TikTok',
        'Facebook page or profile URL': 'URL de página ou perfil do Facebook',
        'Facebook page URL': 'URL da Página do Facebook',
        'Facebook post URL': 'URL da publicação do Facebook',
        'YouTube channel URL': 'URL do canal do YouTube',
        'Instagram post or Reel URL': 'URL de publicação ou Reel do Instagram',
        'YouTube video URL': 'URL do vídeo do YouTube',
        'Post URL': 'URL da publicação',
        'Page URL': 'URL da página',
        'Video URL': 'URL do vídeo',
        'Channel URL': 'URL do canal',
        'Order Notes': 'Notas do pedido',
        'Custom Comments': 'Comentários personalizados',
      },
      placeholders: {
        '@username': '@usuario',
        'Optional instructions for fulfillment': 'Instruções opcionais para o processamento',
        'Enter one comment per line': 'Digite um comentário por linha',
      },
      help: {
        'Enter the public Instagram username that should receive the followers.':
          'Insira o nome de usuário público do Instagram que deve receber os seguidores.',
        'Enter the public TikTok username that should receive the followers.':
          'Insira o nome de usuário público do TikTok que deve receber os seguidores.',
        'Paste the public TikTok video URL that should receive the likes.':
          'Cole a URL pública do vídeo do TikTok que deve receber as curtidas.',
        'Paste the public Facebook page or profile URL.':
          'Cole a URL pública da página ou perfil do Facebook.',
        'Paste the public Facebook page URL that should receive the likes.':
          'Cole a URL pública da Página do Facebook que deve receber as curtidas.',
        'Paste the public Facebook post URL that should receive the likes.':
          'Cole a URL pública da publicação do Facebook que deve receber as curtidas.',
        'Paste the public YouTube channel URL that should receive the subscribers.':
          'Cole a URL pública do canal do YouTube que deve receber os inscritos.',
        'Paste the public Instagram post or Reel URL that should receive the likes.':
          'Cole a URL pública da publicação ou Reel do Instagram que deve receber as curtidas.',
        'Paste the public Instagram video or Reel URL that should receive the views.':
          'Cole a URL pública do vídeo ou Reel do Instagram que deve receber as visualizações.',
        'Paste the public Instagram post or Reel URL that should receive the comments.':
          'Cole a URL pública da publicação ou Reel do Instagram que deve receber os comentários.',
        'Paste the public TikTok video URL that should receive the views.':
          'Cole a URL pública do vídeo do TikTok que deve receber as visualizações.',
        'Paste the public YouTube video URL that should receive the views.':
          'Cole a URL pública do vídeo do YouTube que deve receber as visualizações.',
      },
      customCommentsHelp:
        'Forneça exatamente {quantity} comentários, um por linha. Linhas em branco são removidas.',
      validation: {
        isRequired: '{label} é obrigatório.',
        minLength: '{label} deve ter pelo menos {n} caracteres.',
        maxLength: '{label} deve ter no máximo {n} caracteres.',
        formatInvalid: 'O formato de {label} é inválido.',
        usernameOnly: 'Insira apenas um nome de usuário (não uma URL completa do perfil).',
        usernameInvalid:
          'Insira um nome de usuário válido (letras, números, pontos e sublinhados).',
        instagramUrl: 'Insira uma URL válida de publicação ou Reel do Instagram (instagram.com).',
        tiktokUrl: 'Insira uma URL válida de vídeo do TikTok (tiktok.com).',
        facebookUrl: 'Insira uma URL válida de página ou perfil do Facebook (facebook.com).',
        facebookPostUrl: 'Insira uma URL válida de publicação do Facebook (facebook.com).',
        youtubeChannelUrl:
          'Insira uma URL válida de canal do YouTube (youtube.com/@…, /channel/…, /c/… ou /user/…).',
        youtubeVideoUrl:
          'Insira uma URL válida de vídeo do YouTube (youtube.com/watch?v=… ou youtu.be/…).',
        genericUrl: 'Insira uma URL válida começando com https://.',
        exactComments:
          'Insira exatamente {exact} comentários (um por linha). Você inseriu {count}.',
        commentMaxLength: 'Cada comentário deve ter no máximo {n} caracteres.',
      },
    },
    ar: {
      title: 'تفاصيل الطلب',
      description: 'أدخل المعلومات اللازمة لتنفيذ {quantity}.',
      delivery: 'التسليم',
      noPasswordRequired: 'لا حاجة لكلمة مرور',
      fixHighlighted: 'يرجى تصحيح الحقول المميزة.',
      addedToCart: 'تمت إضافة {qty} {product} إلى سلتك.',
      selectPlaceholder: 'اختر…',
      paymentReassuranceAria: 'ضمانات الدفع',
      secureCheckoutEncrypted: 'دفع آمن · دفع مشفّر',
      moneyBackGuarantee: 'ضمان استرداد خلال 30 يومًا',
      labels: {
        'Instagram username': 'اسم مستخدم Instagram',
        'TikTok username': 'اسم مستخدم TikTok',
        'Account username': 'اسم مستخدم الحساب',
        'Instagram Username': 'اسم مستخدم Instagram',
        'TikTok Username': 'اسم مستخدم TikTok',
        'Facebook Username': 'اسم مستخدم Facebook',
        'YouTube Username': 'اسم مستخدم YouTube',
        'Account Username': 'اسم مستخدم الحساب',
        'TikTok video URL': 'رابط فيديو TikTok',
        'Facebook page or profile URL': 'رابط صفحة أو ملف Facebook',
        'Facebook page URL': 'رابط صفحة Facebook',
        'Facebook post URL': 'رابط منشور Facebook',
        'YouTube channel URL': 'رابط قناة YouTube',
        'Instagram post or Reel URL': 'رابط منشور أو Reel على Instagram',
        'YouTube video URL': 'رابط فيديو YouTube',
        'Post URL': 'رابط المنشور',
        'Page URL': 'رابط الصفحة',
        'Video URL': 'رابط الفيديو',
        'Channel URL': 'رابط القناة',
        'Order Notes': 'ملاحظات الطلب',
        'Custom Comments': 'تعليقات مخصصة',
      },
      placeholders: {
        '@username': '@اسم_المستخدم',
        'Optional instructions for fulfillment': 'تعليمات اختيارية للتنفيذ',
        'Enter one comment per line': 'أدخل تعليقًا واحدًا في كل سطر',
      },
      help: {
        'Enter the public Instagram username that should receive the followers.':
          'أدخل اسم مستخدم Instagram العام الذي يجب أن يستلم المتابعين.',
        'Enter the public TikTok username that should receive the followers.':
          'أدخل اسم مستخدم TikTok العام الذي يجب أن يستلم المتابعين.',
        'Paste the public TikTok video URL that should receive the likes.':
          'الصق رابط فيديو TikTok العام الذي يجب أن يستلم الإعجابات.',
        'Paste the public Facebook page or profile URL.':
          'الصق رابط صفحة أو ملف Facebook العام.',
        'Paste the public Facebook page URL that should receive the likes.':
          'الصق رابط صفحة Facebook العامة التي يجب أن تستلم الإعجابات.',
        'Paste the public Facebook post URL that should receive the likes.':
          'الصق رابط منشور Facebook العام الذي يجب أن يستلم الإعجابات.',
        'Paste the public YouTube channel URL that should receive the subscribers.':
          'الصق رابط قناة YouTube العامة التي يجب أن تستلم المشتركين.',
        'Paste the public Instagram post or Reel URL that should receive the likes.':
          'الصق رابط منشور أو Reel العام على Instagram الذي يجب أن يستلم الإعجابات.',
        'Paste the public Instagram video or Reel URL that should receive the views.':
          'الصق رابط فيديو أو Reel العام على Instagram الذي يجب أن يستلم المشاهدات.',
        'Paste the public Instagram post or Reel URL that should receive the comments.':
          'الصق رابط منشور أو Reel العام على Instagram الذي يجب أن يستلم التعليقات.',
        'Paste the public TikTok video URL that should receive the views.':
          'الصق رابط فيديو TikTok العام الذي يجب أن يستلم المشاهدات.',
        'Paste the public YouTube video URL that should receive the views.':
          'الصق رابط فيديو YouTube العام الذي يجب أن يستلم المشاهدات.',
      },
      customCommentsHelp:
        'قدّم بالضبط {quantity} تعليقًا، تعليقًا واحدًا في كل سطر. تُحذف الأسطر الفارغة.',
      validation: {
        isRequired: '{label} مطلوب.',
        minLength: 'يجب أن يحتوي {label} على {n} أحرف على الأقل.',
        maxLength: 'يجب ألا يتجاوز {label} {n} أحرف.',
        formatInvalid: 'تنسيق {label} غير صالح.',
        usernameOnly: 'أدخل اسم مستخدم فقط (وليس رابط الملف الشخصي بالكامل).',
        usernameInvalid: 'أدخل اسم مستخدم صالحًا (أحرف وأرقام ونقاط وشرطات سفلية).',
        instagramUrl: 'أدخل رابط منشور أو Reel صالحًا على Instagram (instagram.com).',
        tiktokUrl: 'أدخل رابط فيديو TikTok صالحًا (tiktok.com).',
        facebookUrl: 'أدخل رابط صفحة أو ملف Facebook صالحًا (facebook.com).',
        facebookPostUrl: 'أدخل رابط منشور Facebook صالحًا (facebook.com).',
        youtubeChannelUrl:
          'أدخل رابط قناة YouTube صالحًا (youtube.com/@… أو /channel/… أو /c/… أو /user/…).',
        youtubeVideoUrl:
          'أدخل رابط فيديو YouTube صالحًا (youtube.com/watch?v=… أو youtu.be/…).',
        genericUrl: 'أدخل رابطًا صالحًا يبدأ بـ https://.',
        exactComments: 'أدخل بالضبط {exact} تعليقًا (تعليقًا واحدًا في كل سطر). أدخلت {count}.',
        commentMaxLength: 'يجب ألا يتجاوز كل تعليق {n} أحرف.',
      },
    },
  };
  return t[locale] ?? t.en;
}

function decorative(locale) {
  const t = {
    en: {
      live: 'Live',
      checkout: 'Checkout',
      status: 'Status',
      confirmed: 'Confirmed',
      pending: 'Pending',
      processing: 'Processing',
      order: 'Order',
      secure: 'Secure',
      save: 'Save',
      selected: 'Selected',
      active: 'Active',
      complete: 'Complete',
      package: 'Package',
      tracking: 'Tracking',
      delivering: 'Delivering',
      current: 'Current',
      done: 'Done',
      next: 'Next',
      orderConfirmed: 'Order Confirmed',
      orderComplete: 'Order Complete',
      packageConfirmed: 'Package Confirmed',
      packageSelected: 'Package Selected',
      paymentConfirmed: 'Payment Confirmed',
      checkoutComplete: 'Checkout Complete',
      checkoutSummary: 'Checkout Summary',
      orderProcessing: 'Order Processing',
      deliveryStarted: 'Delivery Started',
      deliveryComplete: 'Delivery Complete',
      enterUsername: 'Enter Username',
      selectedPackage: 'Selected package',
      onTrack: 'On track',
      justNow: 'Just now',
      readyToTrack: 'Ready to track',
    },
    es: {
      live: 'En vivo',
      checkout: 'Pago',
      status: 'Estado',
      confirmed: 'Confirmado',
      pending: 'Pendiente',
      processing: 'Procesando',
      order: 'Pedido',
      secure: 'Seguro',
      save: 'Guardar',
      selected: 'Seleccionado',
      active: 'Activo',
      complete: 'Completo',
      package: 'Paquete',
      tracking: 'Seguimiento',
      delivering: 'Entregando',
      current: 'Actual',
      done: 'Hecho',
      next: 'Siguiente',
      orderConfirmed: 'Pedido confirmado',
      orderComplete: 'Pedido completo',
      packageConfirmed: 'Paquete confirmado',
      packageSelected: 'Paquete seleccionado',
      paymentConfirmed: 'Pago confirmado',
      checkoutComplete: 'Pago completado',
      checkoutSummary: 'Resumen del pago',
      orderProcessing: 'Procesando pedido',
      deliveryStarted: 'Entrega iniciada',
      deliveryComplete: 'Entrega completa',
      enterUsername: 'Introducir usuario',
      selectedPackage: 'Paquete seleccionado',
      onTrack: 'En curso',
      justNow: 'Ahora mismo',
      readyToTrack: 'Listo para seguir',
    },
    de: {
      live: 'Live',
      checkout: 'Checkout',
      status: 'Status',
      confirmed: 'Bestätigt',
      pending: 'Ausstehend',
      processing: 'In Bearbeitung',
      order: 'Bestellung',
      secure: 'Sicher',
      save: 'Speichern',
      selected: 'Ausgewählt',
      active: 'Aktiv',
      complete: 'Abgeschlossen',
      package: 'Paket',
      tracking: 'Tracking',
      delivering: 'Wird geliefert',
      current: 'Aktuell',
      done: 'Erledigt',
      next: 'Weiter',
      orderConfirmed: 'Bestellung bestätigt',
      orderComplete: 'Bestellung abgeschlossen',
      packageConfirmed: 'Paket bestätigt',
      packageSelected: 'Paket ausgewählt',
      paymentConfirmed: 'Zahlung bestätigt',
      checkoutComplete: 'Checkout abgeschlossen',
      checkoutSummary: 'Checkout-Zusammenfassung',
      orderProcessing: 'Bestellung wird verarbeitet',
      deliveryStarted: 'Lieferung gestartet',
      deliveryComplete: 'Lieferung abgeschlossen',
      enterUsername: 'Benutzername eingeben',
      selectedPackage: 'Ausgewähltes Paket',
      onTrack: 'Im Plan',
      justNow: 'Gerade eben',
      readyToTrack: 'Bereit zum Verfolgen',
    },
    fr: {
      live: 'En direct',
      checkout: 'Paiement',
      status: 'Statut',
      confirmed: 'Confirmé',
      pending: 'En attente',
      processing: 'Traitement',
      order: 'Commande',
      secure: 'Sécurisé',
      save: 'Enregistrer',
      selected: 'Sélectionné',
      active: 'Actif',
      complete: 'Terminé',
      package: 'Forfait',
      tracking: 'Suivi',
      delivering: 'Livraison',
      current: 'En cours',
      done: 'Fait',
      next: 'Suivant',
      orderConfirmed: 'Commande confirmée',
      orderComplete: 'Commande terminée',
      packageConfirmed: 'Forfait confirmé',
      packageSelected: 'Forfait sélectionné',
      paymentConfirmed: 'Paiement confirmé',
      checkoutComplete: 'Paiement terminé',
      checkoutSummary: 'Récapitulatif du paiement',
      orderProcessing: 'Traitement de la commande',
      deliveryStarted: 'Livraison démarrée',
      deliveryComplete: 'Livraison terminée',
      enterUsername: 'Saisir le nom d’utilisateur',
      selectedPackage: 'Forfait sélectionné',
      onTrack: 'En bonne voie',
      justNow: 'À l’instant',
      readyToTrack: 'Prêt à suivre',
    },
    it: {
      live: 'Live',
      checkout: 'Checkout',
      status: 'Stato',
      confirmed: 'Confermato',
      pending: 'In attesa',
      processing: 'In elaborazione',
      order: 'Ordine',
      secure: 'Sicuro',
      save: 'Salva',
      selected: 'Selezionato',
      active: 'Attivo',
      complete: 'Completato',
      package: 'Pacchetto',
      tracking: 'Tracciamento',
      delivering: 'In consegna',
      current: 'Attuale',
      done: 'Fatto',
      next: 'Avanti',
      orderConfirmed: 'Ordine confermato',
      orderComplete: 'Ordine completato',
      packageConfirmed: 'Pacchetto confermato',
      packageSelected: 'Pacchetto selezionato',
      paymentConfirmed: 'Pagamento confermato',
      checkoutComplete: 'Checkout completato',
      checkoutSummary: 'Riepilogo checkout',
      orderProcessing: 'Elaborazione ordine',
      deliveryStarted: 'Consegna avviata',
      deliveryComplete: 'Consegna completata',
      enterUsername: 'Inserisci username',
      selectedPackage: 'Pacchetto selezionato',
      onTrack: 'In linea',
      justNow: 'Proprio ora',
      readyToTrack: 'Pronto per il tracking',
    },
    'pt-br': {
      live: 'Ao vivo',
      checkout: 'Checkout',
      status: 'Status',
      confirmed: 'Confirmado',
      pending: 'Pendente',
      processing: 'Processando',
      order: 'Pedido',
      secure: 'Seguro',
      save: 'Salvar',
      selected: 'Selecionado',
      active: 'Ativo',
      complete: 'Concluído',
      package: 'Pacote',
      tracking: 'Rastreamento',
      delivering: 'Entregando',
      current: 'Atual',
      done: 'Concluído',
      next: 'Próximo',
      orderConfirmed: 'Pedido confirmado',
      orderComplete: 'Pedido concluído',
      packageConfirmed: 'Pacote confirmado',
      packageSelected: 'Pacote selecionado',
      paymentConfirmed: 'Pagamento confirmado',
      checkoutComplete: 'Checkout concluído',
      checkoutSummary: 'Resumo do checkout',
      orderProcessing: 'Processando pedido',
      deliveryStarted: 'Entrega iniciada',
      deliveryComplete: 'Entrega concluída',
      enterUsername: 'Inserir nome de usuário',
      selectedPackage: 'Pacote selecionado',
      onTrack: 'No prazo',
      justNow: 'Agora mesmo',
      readyToTrack: 'Pronto para rastrear',
    },
    ar: {
      live: 'مباشر',
      checkout: 'الدفع',
      status: 'الحالة',
      confirmed: 'مؤكد',
      pending: 'قيد الانتظار',
      processing: 'قيد المعالجة',
      order: 'طلب',
      secure: 'آمن',
      save: 'حفظ',
      selected: 'محدد',
      active: 'نشط',
      complete: 'مكتمل',
      package: 'باقة',
      tracking: 'التتبع',
      delivering: 'جارٍ التسليم',
      current: 'الحالي',
      done: 'تم',
      next: 'التالي',
      orderConfirmed: 'تم تأكيد الطلب',
      orderComplete: 'اكتمل الطلب',
      packageConfirmed: 'تم تأكيد الباقة',
      packageSelected: 'تم اختيار الباقة',
      paymentConfirmed: 'تم تأكيد الدفع',
      checkoutComplete: 'اكتمل الدفع',
      checkoutSummary: 'ملخص الدفع',
      orderProcessing: 'معالجة الطلب',
      deliveryStarted: 'بدأ التسليم',
      deliveryComplete: 'اكتمل التسليم',
      enterUsername: 'أدخل اسم المستخدم',
      selectedPackage: 'الباقة المحددة',
      onTrack: 'على المسار',
      justNow: 'الآن',
      readyToTrack: 'جاهز للتتبع',
    },
  };
  return t[locale] ?? t.en;
}

const targets = [
  ['_english', 'en'],
  ['es', 'es'],
  ['de', 'de'],
  ['fr', 'fr'],
  ['it', 'it'],
  ['pt-br', 'pt-br'],
  ['ar', 'ar'],
];

for (const [dir, locale] of targets) {
  const file = path.join(root, 'content', 'locales', dir, 'ui.json');
  const ui = JSON.parse(readFileSync(file, 'utf8'));
  ui.commerce = { ...ui.commerce, off: OFF[locale] };
  ui.orderDialog = orderDialog(locale);
  ui.decorative = decorative(locale);
  writeFileSync(file, `${JSON.stringify(ui, null, 2)}\n`);
  console.log('patched', dir);
}
