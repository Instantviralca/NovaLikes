/**
 * Localized Quick Answer copy — intent-preserving translations (not literal English copies).
 */

import type { QuickAnswerPageId } from '@/data/quick-answers';
import type { LocalizedLocale } from '@/lib/i18n/config';

type LocaleQuickAnswers = Record<QuickAnswerPageId, string>;

const ES: LocaleQuickAnswers = {
  about:
    'NovaLikes es una plataforma en línea de paquetes de crecimiento para Instagram, TikTok y Facebook, además de herramientas públicas gratuitas. El sitio explica qué cambia cada servicio en un perfil o publicación y procesa pedidos sin pedir contraseñas de redes sociales en los flujos compatibles.',
  contact:
    'Contacta con NovaLikes para ayuda con pedidos, pagos, reembolsos y servicios mediante el formulario o el correo de soporte publicado en esta página. Incluye tu referencia de pedido cuando preguntes por una compra. NovaLikes no solicita contraseñas de redes sociales por soporte.',
  'buy-instagram-followers':
    'NovaLikes vende paquetes de seguidores de Instagram para perfiles públicos. Eliges la cantidad, introduces el usuario o URL pública en el pago y no compartes tu contraseña de Instagram. El pedido afecta al recuento de seguidores del perfil, no a Me gusta, visualizaciones o comentarios de publicaciones concretas.',
  'buy-instagram-likes':
    'NovaLikes vende Me gusta de Instagram para publicaciones de foto, carruseles y Reels públicos, desde US$ 2,99 por 100 (US$ 9,99 por 1.000). Cada pedido cubre una publicación: pegas su enlace y pagas en USD sin contraseña. La mayoría de los pedidos empiezan en 6–8 horas y se completan 4–6 horas después, con entrega gradual a petición. Los Me gusta suben solo el contador de esa publicación e incluyen una recarga de 6 meses.',
  'buy-instagram-views':
    'NovaLikes vende visualizaciones de Instagram para Reels y vídeos públicos desde US$ 1,99 por 100 (US$ 4,99 por 1.000). Pegas el enlace del Reel, pagas en USD y no compartes tu contraseña. La mayoría de los pedidos empiezan en 6–8 horas y terminan 4–6 horas después; hay entrega gradual a petición. Las visualizaciones proceden de cuentas realistas y solo suben el contador: no crean alcance, Me gusta ni seguidores. Cada pedido incluye una recarga de 6 meses.',
  'buy-instagram-comments':
    'NovaLikes vende comentarios de Instagram para publicaciones y Reels públicos en dos tipos: High Quality, comentarios cortos y positivos (desde US$ 13,47 por 10), y Premium, comentarios escritos sobre tu publicación (desde US$ 9,99 por 5). Puedes enviar tu propio texto o pedir otro idioma en la nota del pago, y no se necesita contraseña. La mayoría de los pedidos empiezan en 6–8 horas e incluyen una recarga de 6 meses.',
  'buy-tiktok-followers':
    'NovaLikes vende seguidores de TikTok para cuentas públicas, desde US$ 2,99 por 100 seguidores (US$ 14,99 por 1.000). Escribes tu usuario, pagas en USD y nunca compartes tu contraseña. La mayoría de los pedidos empiezan en 6–8 horas y terminan 4–6 horas después, con entrega gradual a petición y recarga de 6 meses. Los seguidores solo suben el contador del perfil: no llevan los vídeos a la página Para ti.',
  'buy-tiktok-likes':
    'NovaLikes vende Me gusta de TikTok para vídeos públicos, desde US$ 2,99 por 100 (US$ 14,99 por 1.000). Copia el enlace del vídeo con el botón Compartir de TikTok, paga en USD y no compartas tu contraseña. La mayoría de los pedidos empiezan en 6–8 horas y terminan 4–6 horas después, con entrega gradual a petición y recarga de 6 meses. Los Me gusta solo suben el contador de corazones; mantenlos por debajo de las visualizaciones para que los números se vean naturales.',
  'buy-tiktok-views':
    'NovaLikes vende visualizaciones de TikTok para vídeos públicos en dos opciones: High Quality desde US$ 1,99 por 1.000 y Premium desde US$ 3,99 por 1.000. Pega el enlace del vídeo, paga en USD y no compartas tu contraseña. La mayoría de los pedidos empiezan en 6–8 horas y terminan 4–6 horas después, con entrega gradual a petición y recarga de 6 meses. Las visualizaciones compradas solo suben el contador público; no son visualizaciones cualificadas de Creator Rewards.',
  'buy-facebook-followers':
    'NovaLikes vende seguidores de Facebook para páginas públicas y para perfiles personales con los seguidores públicos activados, desde US$ 4,99 por 100 (US$ 26,99 por 1.000). Pega el enlace de la página o del perfil, paga en USD y nunca compartas tu contraseña. La mayoría de los pedidos empiezan en 6–8 horas y terminan 4–6 horas después, con entrega gradual a petición y recarga de 6 meses. Los seguidores solo suben el número de seguidores, no las reacciones ni el alcance.',
  'buy-facebook-page-likes':
    'NovaLikes vende Me gusta de Página de Facebook para páginas públicas desde US$ 2,99 por 100 (US$ 14,99 por 1.000), pagados en USD y sin contraseña. Revisa tu página primero: las páginas nuevas de Facebook muestran seguidores en lugar de Me gusta, y Meta ahora muestra seguimientos en lugar de Me gusta de la página, así que quizá te convengan más los seguidores de Facebook. La mayoría de los pedidos empiezan en 6–8 horas, terminan 4–6 horas después e incluyen una recarga de 6 meses.',
  'buy-facebook-post-likes':
    'NovaLikes vende Me gusta para publicaciones públicas de Facebook, de páginas y de perfiles personales, desde US$ 2,99 por 100 (US$ 14,99 por 1.000). Pega el enlace de la publicación, paga en USD y no compartas tu contraseña. Se entregan como la reacción Me gusta, con Me encanta u otras a petición. La mayoría de los pedidos empiezan en 6–8 horas e incluyen una recarga de 6 meses. Cambian las reacciones de una publicación, no los seguidores ni los Me gusta de la página.',
  'instagram-profile-viewer':
    'Esta herramienta de NovaLikes muestra datos públicos de un perfil de Instagram — foto, nombre, biografía y recuentos publicados — para un usuario o URL que introduzcas. Lee información que Instagram ya expone en perfiles públicos. No accede a cuentas privadas y no pide tu contraseña de Instagram.',
  'instagram-profile-picture-viewer':
    'Esta herramienta muestra la foto de perfil que Instagram publica para un usuario o URL pública. Puedes ver o descargar esa imagen cuando Instagram la expone en la página pública. No admite cuentas privadas ni login obligatorio y no pide contraseña de Instagram.',
  'instagram-follower-counter':
    'Esta herramienta lee la etiqueta de seguidores que Instagram muestra en un perfil público, incluidas abreviaturas como 104M cuando así la publica Instagram. No estima totales ocultos, no accede a cuentas privadas y no requiere iniciar sesión en Instagram.',
  'instagram-video-downloader':
    'Esta herramienta comprueba una URL pública de Reel o vídeo de Instagram y devuelve un archivo descargable solo cuando Instagram expone uno en la página pública. No admite publicaciones privadas, Stories ni contenido solo con login. No pide contraseña de Instagram.',
  'tiktok-video-downloader':
    'Esta herramienta recupera un archivo de vídeo público de TikTok cuando TikTok expone media descargable para esa URL. Pega un enlace público; vídeos privados o restringidos no son compatibles. Se ejecuta en servidores de NovaLikes y no pide tu contraseña de TikTok.',
  'tiktok-profile-picture-downloader':
    'Esta herramienta muestra y permite guardar la foto de perfil que TikTok publica para un usuario o URL pública. Solo funciona cuando la foto es visible públicamente. No admite cuentas privadas y no requiere iniciar sesión en TikTok.',
  'facebook-video-downloader':
    'Esta herramienta de NovaLikes encuentra media descargable para una URL pública de vídeo de Facebook cuando Facebook expone el archivo en la página pública. No admite vídeos privados, grupos inaccesibles ni publicaciones solo con login. No se requiere contraseña ni inicio de sesión en Facebook.',
  'facebook-reels-downloader':
    'Esta herramienta comprueba una URL pública de Reel de Facebook y devuelve media descargable cuando Facebook la expone en la página pública. No admite Reels privados ni contenido solo con login. No necesitas iniciar sesión en Facebook para usar esta página.',
};

const DE: LocaleQuickAnswers = {
  about:
    'NovaLikes ist eine Online-Plattform für Wachstumspakete auf Instagram, TikTok und Facebook sowie kostenlose öffentliche Lookup-Tools. Die Website erklärt, welche Kennzahl jedes Service auf Profil oder Beitrag ändert, und verarbeitet Bestellungen ohne Social-Media-Passwörter in unterstützten Checkout-Flows.',
  contact:
    'Kontaktiere NovaLikes bei Fragen zu Bestellungen, Zahlungen, Erstattungen und Services über das veröffentlichte Formular oder die Support-E-Mail auf dieser Seite. Gib deine Bestellreferenz an, wenn du eine Kaufanfrage stellst. NovaLikes fordert keine Social-Media-Passwörter im Support an.',
  'buy-instagram-followers':
    'NovaLikes verkauft Instagram-Follower-Pakete für öffentliche Profile. Du wählst eine Menge, gibst den öffentlichen Benutzernamen oder die Profil-URL beim Checkout ein und teilst kein Instagram-Passwort. Die Bestellung betrifft die Follower-Zahl des Profils — nicht Likes, Views oder Kommentare einzelner Beiträge.',
  'buy-instagram-likes':
    'NovaLikes verkauft Instagram Likes für öffentliche Fotobeiträge, Karussells und Reels ab 2,99 US-$ für 100 Likes (9,99 US-$ für 1.000). Jede Bestellung gilt für einen Beitrag: Link einfügen und in USD ohne Passwort bezahlen. Die meisten Bestellungen starten innerhalb von 6–8 Stunden und sind 4–6 Stunden später fertig; schrittweise Lieferung gibt es auf Wunsch. Likes erhöhen nur den Herz-Zähler dieses Beitrags und enthalten eine 6-monatige Nachfüllung.',
  'buy-instagram-views':
    'NovaLikes verkauft Instagram Views für öffentliche Reels und Videobeiträge ab 1,99 US-$ für 100 Views (4,99 US-$ für 1.000). Sie fügen den Reel-Link ein, zahlen in USD und behalten Ihr Passwort für sich. Die meisten Bestellungen starten innerhalb von 6–8 Stunden und sind 4–6 Stunden später fertig; schrittweise Lieferung gibt es auf Wunsch. Die Views kommen von realistischen Konten und erhöhen nur den Zähler – keine Reichweite, Likes oder Follower. Jede Bestellung enthält eine 6-monatige Nachfüllung.',
  'buy-instagram-comments':
    'NovaLikes verkauft Instagram-Kommentare für öffentliche Beiträge und Reels in zwei Typen: High Quality mit kurzen, positiven Kommentaren (ab 13,47 US-$ für 10) und Premium mit Kommentaren, die auf Ihren Beitrag eingehen (ab 9,99 US-$ für 5). Eigener Wortlaut oder eine andere Sprache ist über die Notiz möglich, ein Passwort ist nicht nötig. Die meisten Bestellungen starten innerhalb von 6–8 Stunden und enthalten eine 6-monatige Nachfüllung.',
  'buy-tiktok-followers':
    'NovaLikes verkauft TikTok Follower für öffentliche Konten ab 2,99 US-$ für 100 Follower (14,99 US-$ für 1.000). Sie geben Ihren Benutzernamen ein, zahlen in USD und teilen nie Ihr Passwort. Die meisten Bestellungen starten innerhalb von 6–8 Stunden und sind 4–6 Stunden später fertig, mit schrittweiser Lieferung auf Wunsch und 6-monatiger Nachfüllung. Follower erhöhen nur die Profilzahl – sie bringen Videos nicht auf die „Für dich“-Seite.',
  'buy-tiktok-likes':
    'NovaLikes verkauft TikTok Likes für öffentliche Videos ab 2,99 US-$ für 100 Likes (14,99 US-$ für 1.000). Kopieren Sie den Videolink über den Teilen-Button von TikTok, zahlen Sie in USD und behalten Sie Ihr Passwort für sich. Die meisten Bestellungen starten innerhalb von 6–8 Stunden und sind 4–6 Stunden später fertig, mit schrittweiser Lieferung auf Wunsch und 6-monatiger Nachfüllung. Likes erhöhen nur den Herz-Zähler; halten Sie sie unter den Aufrufen, damit die Zahlen natürlich wirken.',
  'buy-tiktok-views':
    'NovaLikes verkauft TikTok Views für öffentliche Videos in zwei Optionen: High Quality ab 1,99 US-$ für 1.000 Views und Premium ab 3,99 US-$ für 1.000. Videolink einfügen, in USD bezahlen, Passwort behalten. Die meisten Bestellungen starten innerhalb von 6–8 Stunden und sind 4–6 Stunden später fertig, mit schrittweiser Lieferung auf Wunsch und 6-monatiger Nachfüllung. Gekaufte Views erhöhen nur die öffentliche Zahl – sie sind keine qualifizierten Creator-Rewards-Aufrufe.',
  'buy-facebook-followers':
    'NovaLikes verkauft Facebook Follower für öffentliche Seiten und für persönliche Profile mit aktivierten öffentlichen Followern ab 4,99 US-$ für 100 (26,99 US-$ für 1.000). Seiten- oder Profillink einfügen, in USD bezahlen, Passwort nie teilen. Die meisten Bestellungen starten innerhalb von 6–8 Stunden und sind 4–6 Stunden später fertig, mit schrittweiser Lieferung auf Wunsch und 6-monatiger Nachfüllung. Follower erhöhen nur die Follower-Zahl – nicht Reaktionen oder Reichweite.',
  'buy-facebook-page-likes':
    'NovaLikes verkauft Facebook Seiten-Likes für öffentliche Seiten ab 2,99 US-$ für 100 (14,99 US-$ für 1.000), bezahlt in USD und ohne Passwort. Prüfen Sie zuerst Ihre Seite: Neuere Facebook-Seiten zeigen Follower statt Likes, und Meta zeigt inzwischen Follows statt Seiten-Likes – Facebook Follower passen daher womöglich besser. Die meisten Bestellungen starten innerhalb von 6–8 Stunden, sind 4–6 Stunden später fertig und enthalten eine 6-monatige Nachfüllung.',
  'buy-facebook-post-likes':
    'NovaLikes verkauft Facebook Beitrags-Likes für öffentliche Beiträge von Seiten und persönlichen Profilen ab 2,99 US-$ für 100 (14,99 US-$ für 1.000). Beitragslink einfügen, in USD bezahlen, Passwort für sich behalten. Geliefert wird als „Gefällt mir“, „Love“ oder andere Reaktionen auf Wunsch. Die meisten Bestellungen starten innerhalb von 6–8 Stunden und enthalten eine 6-monatige Nachfüllung. Beitrags-Likes ändern die Reaktionen eines Beitrags – nicht Follower oder Seiten-Likes.',
  'instagram-profile-viewer':
    'Dieses NovaLikes-Tool zeigt öffentliche Instagram-Profildaten — Foto, Name, Bio und veröffentlichte Kennzahlen — für einen eingegebenen Benutzernamen oder eine Profil-URL. Es liest Daten, die Instagram auf öffentlichen Profilen bereits ausliefert. Private Konten werden nicht umgangen; kein Instagram-Passwort nötig.',
  'instagram-profile-picture-viewer':
    'Dieses Tool zeigt das Profilfoto, das Instagram für einen öffentlichen Benutzernamen oder eine Profil-URL veröffentlicht. Du kannst das Bild ansehen oder herunterladen, wenn Instagram es auf der öffentlichen Seite bereitstellt. Private oder login-only Konten werden nicht unterstützt.',
  'instagram-follower-counter':
    'Dieses Tool liest die Follower-Bezeichnung, die Instagram auf einem öffentlichen Profil anzeigt — einschließlich Abkürzungen wie 104M, wenn Instagram so veröffentlicht. Es schätzt keine versteckten Totals, greift nicht auf private Konten zu und erfordert keinen Instagram-Login.',
  'instagram-video-downloader':
    'Dieses Tool prüft eine öffentliche Instagram-Reel- oder Video-URL und liefert eine Datei nur dann, wenn Instagram sie auf der öffentlichen Seite bereitstellt. Private Beiträge, Stories und login-only Medien werden nicht unterstützt. Kein Instagram-Passwort erforderlich.',
  'tiktok-video-downloader':
    'Dieses Tool ruft eine öffentliche TikTok-Videodatei ab, wenn TikTok herunterladbare Medien für diese URL bereitstellt. Füge einen öffentlichen Videolink ein; private oder eingeschränkte Videos werden nicht unterstützt. Es läuft auf NovaLikes-Servern und fragt kein TikTok-Passwort ab.',
  'tiktok-profile-picture-downloader':
    'Dieses Tool zeigt und speichert das Profilfoto, das TikTok für einen öffentlichen Benutzernamen oder eine Profil-URL veröffentlicht. Es funktioniert nur, wenn das Foto öffentlich sichtbar ist. Private Konten werden nicht unterstützt; kein TikTok-Login nötig.',
  'facebook-video-downloader':
    'Dieses Tool findet herunterladbare Medien für eine öffentliche Facebook-Video-URL, wenn Facebook die Datei öffentlich bereitstellt. Private Videos, unzugängliche Gruppen und login-only Beiträge werden nicht unterstützt. Kein Facebook-Passwort erforderlich.',
  'facebook-reels-downloader':
    'Dieses Tool prüft eine öffentliche Facebook-Reel-URL und liefert herunterladbare Medien, wenn Facebook sie auf der öffentlichen Seite bereitstellt. Private Reels und login-only Inhalte werden nicht unterstützt. Du musst dich nicht bei Facebook anmelden.',
};

const FR: LocaleQuickAnswers = {
  about:
    'NovaLikes est une plateforme en ligne de forfaits de croissance pour Instagram, TikTok et Facebook, ainsi que d’outils publics gratuits. Le site explique quelle métrique chaque service modifie sur un profil ou une publication et traite les commandes sans demander de mots de passe de réseaux sociaux pour les parcours pris en charge.',
  contact:
    'Contactez NovaLikes pour l’aide sur les commandes, paiements, remboursements et services via le formulaire ou l’e-mail de support publié sur cette page. Indiquez votre référence de commande pour une question d’achat. NovaLikes ne demande jamais de mots de passe de réseaux sociaux par le support.',
  'buy-instagram-followers':
    'NovaLikes vend des forfaits d’abonnés Instagram pour profils publics. Vous choisissez une quantité, saisissez le nom d’utilisateur ou l’URL publique au paiement, sans partager votre mot de passe Instagram. La commande concerne le nombre d’abonnés du profil — pas les likes, vues ou commentaires d’une publication.',
  'buy-instagram-likes':
    'NovaLikes vend des likes Instagram pour les posts photo, carrousels et Reels publics, à partir de 2,99 $ US les 100 likes (9,99 $ US les 1 000). Chaque commande concerne un post : collez son lien et payez en USD, sans mot de passe. La plupart des commandes démarrent sous 6 à 8 heures et sont terminées 4 à 6 heures plus tard, avec livraison progressive sur demande. Les likes n’augmentent que le compteur de ce post et incluent un refill de 6 mois.',
  'buy-instagram-views':
    'NovaLikes vend des vues Instagram pour les Reels et publications vidéo publics, à partir de 1,99 $ US pour 100 vues (4,99 $ US pour 1 000). Vous collez le lien du Reel, payez en USD et gardez votre mot de passe. La plupart des commandes démarrent sous 6 à 8 heures et se terminent 4 à 6 heures plus tard ; la livraison progressive est possible sur demande. Les vues viennent de comptes réalistes et n’augmentent que le compteur : pas de couverture, de likes ni d’abonnés. Chaque commande inclut un refill de 6 mois.',
  'buy-instagram-comments':
    'NovaLikes vend des commentaires Instagram pour les posts et Reels publics en deux types : High Quality, des commentaires courts et positifs (à partir de 13,47 $ US les 10), et Premium, des commentaires écrits autour de votre post (à partir de 9,99 $ US les 5). Vous pouvez envoyer votre propre texte ou demander une autre langue dans la note, sans mot de passe. La plupart des commandes démarrent sous 6 à 8 heures et incluent un refill de 6 mois.',
  'buy-tiktok-followers':
    'NovaLikes vend des abonnés TikTok pour les comptes publics, à partir de 2,99 $ US pour 100 abonnés (14,99 $ US pour 1 000). Vous saisissez votre nom d’utilisateur, payez en USD et ne partagez jamais votre mot de passe. La plupart des commandes démarrent sous 6 à 8 heures et se terminent 4 à 6 heures plus tard, avec livraison progressive sur demande et refill de 6 mois. Les abonnés n’augmentent que le compteur du profil : ils ne placent pas les vidéos sur la page Pour toi.',
  'buy-tiktok-likes':
    'NovaLikes vend des likes TikTok pour les vidéos publiques, à partir de 2,99 $ US pour 100 likes (14,99 $ US pour 1 000). Copiez le lien de la vidéo avec le bouton Partager de TikTok, payez en USD et gardez votre mot de passe pour vous. La plupart des commandes démarrent sous 6 à 8 heures et se terminent 4 à 6 heures plus tard, avec livraison progressive sur demande et refill de 6 mois. Les likes n’augmentent que le compteur de cœurs ; gardez-les sous les vues pour des chiffres naturels.',
  'buy-tiktok-views':
    'NovaLikes vend des vues TikTok pour les vidéos publiques en deux options : High Quality à partir de 1,99 $ US les 1 000 vues et Premium à partir de 3,99 $ US les 1 000. Collez le lien de la vidéo, payez en USD et gardez votre mot de passe. La plupart des commandes démarrent sous 6 à 8 heures et se terminent 4 à 6 heures plus tard, avec livraison progressive sur demande et refill de 6 mois. Les vues achetées n’augmentent que le compteur public : ce ne sont pas des vues qualifiées Creator Rewards.',
  'buy-facebook-followers':
    'NovaLikes vend des abonnés Facebook pour les Pages publiques et les profils personnels avec les abonnés publics activés, à partir de 4,99 $ US pour 100 (26,99 $ US pour 1 000). Collez le lien de la Page ou du profil, payez en USD et ne partagez jamais votre mot de passe. La plupart des commandes démarrent sous 6 à 8 heures et se terminent 4 à 6 heures plus tard, avec livraison progressive sur demande et refill de 6 mois. Les abonnés n’augmentent que le nombre d’abonnés, pas les réactions ni la portée.',
  'buy-facebook-page-likes':
    'NovaLikes vend des J’aime de Page Facebook pour les Pages publiques à partir de 2,99 $ US pour 100 (14,99 $ US pour 1 000), payés en USD et sans mot de passe. Vérifiez d’abord votre Page : les Pages Facebook récentes affichent des abonnés plutôt que des J’aime, et Meta affiche désormais des abonnements plutôt que des J’aime de Page, donc les abonnés Facebook vous conviendront peut-être mieux. La plupart des commandes démarrent sous 6 à 8 heures, se terminent 4 à 6 heures plus tard et incluent un refill de 6 mois.',
  'buy-facebook-post-likes':
    'NovaLikes vend des J’aime de publication Facebook pour les publications publiques de Pages et de profils personnels, à partir de 2,99 $ US pour 100 (14,99 $ US pour 1 000). Collez le lien de la publication, payez en USD et gardez votre mot de passe pour vous. Ils sont livrés en J’aime, avec J’adore ou d’autres réactions sur demande. La plupart des commandes démarrent sous 6 à 8 heures et incluent un refill de 6 mois. Ils changent les réactions d’une publication, pas les abonnés ni les J’aime de Page.',
  'instagram-profile-viewer':
    'Cet outil NovaLikes affiche les informations publiques d’un profil Instagram — photo, nom, bio et compteurs publiés — pour un nom d’utilisateur ou une URL saisis. Il lit les données qu’Instagram expose déjà sur les profils publics. Il ne contourne pas les comptes privés et ne demande pas de mot de passe Instagram.',
  'instagram-profile-picture-viewer':
    'Cet outil affiche la photo de profil qu’Instagram publie pour un nom d’utilisateur ou une URL publique. Vous pouvez la voir ou la télécharger lorsqu’Instagram l’expose sur la page publique. Les comptes privés ou réservés à la connexion ne sont pas pris en charge.',
  'instagram-follower-counter':
    'Cet outil lit le libellé d’abonnés qu’Instagram affiche sur un profil public — y compris des abréviations comme 104M lorsque c’est ainsi publié. Il n’estime pas de totaux cachés, n’accède pas aux comptes privés et ne nécessite pas de connexion Instagram.',
  'instagram-video-downloader':
    'Cet outil vérifie une URL publique de Reel ou vidéo Instagram et renvoie un fichier téléchargeable uniquement si Instagram l’expose sur la page publique. Publications privées, Stories et médias réservés à la connexion non pris en charge. Aucun mot de passe Instagram requis.',
  'tiktok-video-downloader':
    'Cet outil récupère un fichier vidéo TikTok public lorsque TikTok expose un média téléchargeable pour cette URL. Collez un lien public ; les vidéos privées ou restreintes ne sont pas prises en charge. Il s’exécute sur les serveurs NovaLikes et ne demande pas de mot de passe TikTok.',
  'tiktok-profile-picture-downloader':
    'Cet outil affiche et permet d’enregistrer la photo de profil que TikTok publie pour un nom d’utilisateur ou une URL publique. Il fonctionne seulement si la photo est visible publiquement. Comptes privés non pris en charge ; connexion TikTok non requise.',
  'facebook-video-downloader':
    'Cet outil trouve un média téléchargeable pour une URL de vidéo Facebook publique lorsque Facebook expose le fichier. Vidéos privées, groupes inaccessibles et publications réservées à la connexion non prises en charge. Aucun mot de passe Facebook requis.',
  'facebook-reels-downloader':
    'Cet outil vérifie une URL publique de Reel Facebook et renvoie un média téléchargeable lorsque Facebook l’expose sur la page publique. Reels privés et contenu réservé à la connexion non pris en charge. Vous n’avez pas besoin de vous connecter à Facebook.',
};

const IT: LocaleQuickAnswers = {
  about:
    'NovaLikes è una piattaforma online di pacchetti di crescita per Instagram, TikTok e Facebook, oltre a strumenti pubblici gratuiti. Il sito spiega quale metrica modifica ogni servizio su profilo o post ed elabora ordini senza richiedere password dei social nei flussi supportati.',
  contact:
    'Contatta NovaLikes per assistenza su ordini, pagamenti, rimborsi e servizi tramite il modulo o l’e-mail di supporto pubblicata in questa pagina. Includi il riferimento ordine per domande su un acquisto. NovaLikes non chiede password dei social via supporto.',
  'buy-instagram-followers':
    'NovaLikes vende pacchetti follower Instagram per profili pubblici. Scegli la quantità, inserisci username o URL pubblico al checkout e non condividere la password Instagram. L’ordine riguarda il conteggio follower del profilo — non like, visualizzazioni o commenti dei singoli post.',
  'buy-instagram-likes':
    'NovaLikes vende like Instagram per post foto, caroselli e Reel pubblici, a partire da 2,99 USD per 100 like (9,99 USD per 1.000). Ogni ordine copre un post: incolli il link e paghi in USD senza password. La maggior parte degli ordini parte entro 6–8 ore e si completa 4–6 ore dopo, con consegna graduale su richiesta. I like alzano solo il contatore di quel post e includono un refill di 6 mesi.',
  'buy-instagram-views':
    'NovaLikes vende visualizzazioni Instagram per Reels e post video pubblici a partire da 1,99 USD per 100 (4,99 USD per 1.000). Incolli il link del Reel, paghi in USD e tieni per te la password. La maggior parte degli ordini parte entro 6–8 ore e finisce 4–6 ore dopo; la consegna graduale è disponibile su richiesta. Le visualizzazioni arrivano da account realistici e alzano solo il contatore: non creano copertura, like o follower. Ogni ordine include un refill di 6 mesi.',
  'buy-instagram-comments':
    'NovaLikes vende commenti Instagram per post e Reel pubblici in due tipi: High Quality, commenti brevi e positivi (da 13,47 USD per 10), e Premium, commenti scritti sul tuo post (da 9,99 USD per 5). Puoi inviare il tuo testo o chiedere un’altra lingua nella nota al pagamento, senza password. La maggior parte degli ordini parte entro 6–8 ore e include un refill di 6 mesi.',
  'buy-tiktok-followers':
    'NovaLikes vende follower TikTok per account pubblici a partire da 2,99 USD per 100 follower (14,99 USD per 1.000). Inserisci il nome utente, paghi in USD e non condividi mai la password. La maggior parte degli ordini parte entro 6–8 ore e finisce 4–6 ore dopo, con consegna graduale su richiesta e refill di 6 mesi. I follower alzano solo il contatore del profilo: non portano i video nella pagina Per te.',
  'buy-tiktok-likes':
    'NovaLikes vende like TikTok per video pubblici a partire da 2,99 USD per 100 like (14,99 USD per 1.000). Copia il link del video con il pulsante Condividi di TikTok, paga in USD e tieni per te la password. La maggior parte degli ordini parte entro 6–8 ore e finisce 4–6 ore dopo, con consegna graduale su richiesta e refill di 6 mesi. I like alzano solo il contatore dei cuori; tienili sotto le visualizzazioni perché i numeri sembrino naturali.',
  'buy-tiktok-views':
    'NovaLikes vende visualizzazioni TikTok per video pubblici in due opzioni: High Quality da 1,99 USD per 1.000 visualizzazioni e Premium da 3,99 USD per 1.000. Incolla il link del video, paga in USD e tieni la password per te. La maggior parte degli ordini parte entro 6–8 ore e finisce 4–6 ore dopo, con consegna graduale su richiesta e refill di 6 mesi. Le visualizzazioni acquistate alzano solo il contatore pubblico: non sono visualizzazioni qualificate Creator Rewards.',
  'buy-facebook-followers':
    'NovaLikes vende follower Facebook per Pagine pubbliche e per profili personali con i follower pubblici attivi, a partire da 4,99 USD per 100 (26,99 USD per 1.000). Incolla il link della Pagina o del profilo, paga in USD e non condividere mai la password. La maggior parte degli ordini parte entro 6–8 ore e finisce 4–6 ore dopo, con consegna graduale su richiesta e refill di 6 mesi. I follower alzano solo il numero di follower, non le reazioni né la copertura.',
  'buy-facebook-page-likes':
    'NovaLikes vende Mi piace Pagina Facebook per Pagine pubbliche a partire da 2,99 USD per 100 (14,99 USD per 1.000), pagati in USD e senza password. Controlla prima la tua Pagina: le Pagine Facebook più recenti mostrano i follower invece dei Mi piace, e Meta ora mostra i follow invece dei Mi piace della Pagina, quindi i follower Facebook potrebbero essere più adatti. La maggior parte degli ordini parte entro 6–8 ore, finisce 4–6 ore dopo e include un refill di 6 mesi.',
  'buy-facebook-post-likes':
    'NovaLikes vende Mi piace per post Facebook pubblici di Pagine e profili personali, a partire da 2,99 USD per 100 (14,99 USD per 1.000). Incolla il link del post, paga in USD e tieni per te la password. Vengono consegnati come Mi piace, con Love o altre reazioni su richiesta. La maggior parte degli ordini parte entro 6–8 ore e include un refill di 6 mesi. Cambiano le reazioni di un post, non i follower né i Mi piace della Pagina.',
  'instagram-profile-viewer':
    'Questo strumento NovaLikes mostra dettagli pubblici di un profilo Instagram — foto, nome, bio e conteggi pubblicati — per username o URL inseriti. Legge dati che Instagram espone già sui profili pubblici. Non aggira account privati e non chiede password Instagram.',
  'instagram-profile-picture-viewer':
    'Questo strumento mostra la foto profilo che Instagram pubblica per un username o URL pubblico. Puoi visualizzarla o scaricarla quando Instagram la espone sulla pagina pubblica. Account privati o solo con login non supportati.',
  'instagram-follower-counter':
    'Questo strumento legge l’etichetta follower che Instagram mostra su un profilo pubblico — incluse abbreviazioni come 104M se pubblicate così. Non stima totali nascosti, non accede ad account privati e non richiede login Instagram.',
  'instagram-video-downloader':
    'Questo strumento verifica un URL pubblico di Reel o video Instagram e restituisce un file scaricabile solo se Instagram lo espone sulla pagina pubblica. Post privati, Stories e media solo con login non supportati. Nessuna password Instagram richiesta.',
  'tiktok-video-downloader':
    'Questo strumento recupera un file video TikTok pubblico quando TikTok espone media scaricabili per quell’URL. Incolla un link pubblico; video privati o limitati non supportati. Funziona sui server NovaLikes e non chiede password TikTok.',
  'tiktok-profile-picture-downloader':
    'Questo strumento mostra e consente di salvare la foto profilo che TikTok pubblica per username o URL pubblico. Funziona solo se la foto è visibile pubblicamente. Account privati non supportati; login TikTok non richiesto.',
  'facebook-video-downloader':
    'Questo strumento trova media scaricabili per un URL video Facebook pubblico quando Facebook espone il file. Video privati, gruppi inaccessibili e post solo con login non supportati. Nessuna password Facebook richiesta.',
  'facebook-reels-downloader':
    'Questo strumento verifica un URL Reel Facebook pubblico e restituisce media scaricabile quando Facebook lo espone sulla pagina pubblica. Reel privati e contenuti solo con login non supportati. Non serve accedere a Facebook.',
};

const PT_BR: LocaleQuickAnswers = {
  about:
    'A NovaLikes é uma plataforma online de pacotes de crescimento para Instagram, TikTok e Facebook, além de ferramentas públicas gratuitas. O site explica qual métrica cada serviço altera em um perfil ou post e processa pedidos sem exigir senhas de redes sociais nos fluxos compatíveis.',
  contact:
    'Entre em contato com a NovaLikes para ajuda com pedidos, pagamentos, reembolsos e serviços pelo formulário ou e-mail de suporte publicado nesta página. Inclua a referência do pedido ao perguntar sobre uma compra. A NovaLikes não solicita senhas de redes sociais pelo suporte.',
  'buy-instagram-followers':
    'A NovaLikes vende pacotes de seguidores do Instagram para perfis públicos. Você escolhe a quantidade, informa o usuário ou URL pública no checkout e não compartilha a senha do Instagram. O pedido afeta a contagem de seguidores do perfil — não curtidas, visualizações ou comentários de posts individuais.',
  'buy-instagram-likes':
    'A NovaLikes vende curtidas no Instagram para posts de foto, carrosséis e Reels públicos, a partir de US$ 2,99 por 100 curtidas (US$ 9,99 por 1.000). Cada pedido vale para um post: você cola o link e paga em USD sem senha. A maioria dos pedidos começa em 6–8 horas e termina 4–6 horas depois, com entrega gradual sob pedido. As curtidas aumentam só o contador daquele post e incluem reposição de 6 meses.',
  'buy-instagram-views':
    'A NovaLikes vende visualizações no Instagram para Reels e posts de vídeo públicos a partir de US$ 1,99 por 100 (US$ 4,99 por 1.000). Você cola o link do Reel, paga em USD e não compartilha sua senha. A maioria dos pedidos começa em 6–8 horas e termina 4–6 horas depois; há entrega gradual sob pedido. As visualizações vêm de contas realistas e aumentam só o contador: não geram alcance, curtidas nem seguidores. Todo pedido inclui reposição de 6 meses.',
  'buy-instagram-comments':
    'A NovaLikes vende comentários no Instagram para posts e Reels públicos em dois tipos: High Quality, comentários curtos e positivos (a partir de US$ 13,47 por 10), e Premium, comentários escritos sobre o seu post (a partir de US$ 9,99 por 5). Você pode enviar seu próprio texto ou pedir outro idioma na observação do checkout, sem senha. A maioria dos pedidos começa em 6–8 horas e inclui reposição de 6 meses.',
  'buy-tiktok-followers':
    'A NovaLikes vende seguidores no TikTok para contas públicas, a partir de US$ 2,99 por 100 seguidores (US$ 14,99 por 1.000). Você digita o nome de usuário, paga em USD e nunca compartilha a senha. A maioria dos pedidos começa em 6–8 horas e termina 4–6 horas depois, com entrega gradual sob pedido e reposição de 6 meses. Seguidores aumentam só o contador do perfil: não levam os vídeos para a página Para Você.',
  'buy-tiktok-likes':
    'A NovaLikes vende curtidas no TikTok para vídeos públicos, a partir de US$ 2,99 por 100 curtidas (US$ 14,99 por 1.000). Copie o link do vídeo pelo botão Compartilhar do TikTok, pague em USD e não compartilhe sua senha. A maioria dos pedidos começa em 6–8 horas e termina 4–6 horas depois, com entrega gradual sob pedido e reposição de 6 meses. As curtidas aumentam só o contador de corações; mantenha-as abaixo das visualizações para os números parecerem naturais.',
  'buy-tiktok-views':
    'A NovaLikes vende visualizações no TikTok para vídeos públicos em duas opções: High Quality a partir de US$ 1,99 por 1.000 visualizações e Premium a partir de US$ 3,99 por 1.000. Cole o link do vídeo, pague em USD e guarde sua senha. A maioria dos pedidos começa em 6–8 horas e termina 4–6 horas depois, com entrega gradual sob pedido e reposição de 6 meses. Visualizações compradas aumentam só o contador público: não são visualizações qualificadas do Creator Rewards.',
  'buy-facebook-followers':
    'A NovaLikes vende seguidores no Facebook para Páginas públicas e para perfis pessoais com seguidores públicos ativados, a partir de US$ 4,99 por 100 (US$ 26,99 por 1.000). Cole o link da Página ou do perfil, pague em USD e nunca compartilhe sua senha. A maioria dos pedidos começa em 6–8 horas e termina 4–6 horas depois, com entrega gradual sob pedido e reposição de 6 meses. Os seguidores aumentam só o número de seguidores, não as reações nem o alcance.',
  'buy-facebook-page-likes':
    'A NovaLikes vende curtidas de Página no Facebook para Páginas públicas a partir de US$ 2,99 por 100 (US$ 14,99 por 1.000), pagas em USD e sem senha. Confira sua Página primeiro: Páginas mais novas do Facebook mostram seguidores em vez de curtidas, e a Meta agora mostra seguimentos em vez de curtidas da Página, então seguidores no Facebook podem combinar mais com você. A maioria dos pedidos começa em 6–8 horas, termina 4–6 horas depois e inclui reposição de 6 meses.',
  'buy-facebook-post-likes':
    'A NovaLikes vende curtidas de publicação no Facebook para posts públicos de Páginas e perfis pessoais, a partir de US$ 2,99 por 100 (US$ 14,99 por 1.000). Cole o link do post, pague em USD e guarde sua senha. Elas chegam como a reação Curtir, com Amei ou outras sob pedido. A maioria dos pedidos começa em 6–8 horas e inclui reposição de 6 meses. Elas mudam as reações de um post, não os seguidores nem as curtidas da Página.',
  'instagram-profile-viewer':
    'Esta ferramenta NovaLikes mostra detalhes públicos de um perfil do Instagram — foto, nome, bio e contagens publicadas — para um usuário ou URL informados. Ela lê dados que o Instagram já expõe em perfis públicos. Não contorna contas privadas e não pede senha do Instagram.',
  'instagram-profile-picture-viewer':
    'Esta ferramenta exibe a foto de perfil que o Instagram publica para um usuário ou URL pública. Você pode ver ou baixar a imagem quando o Instagram a expõe na página pública. Contas privadas ou somente com login não são compatíveis.',
  'instagram-follower-counter':
    'Esta ferramenta lê o rótulo de seguidores que o Instagram mostra em um perfil público — incluindo abreviações como 104M quando publicadas assim. Não estima totais ocultos, não acessa contas privadas e não exige login no Instagram.',
  'instagram-video-downloader':
    'Esta ferramenta verifica uma URL pública de Reel ou vídeo do Instagram e retorna um arquivo para download somente quando o Instagram o expõe na página pública. Posts privados, Stories e mídia somente com login não são compatíveis. Não é necessária senha do Instagram.',
  'tiktok-video-downloader':
    'Esta ferramenta recupera um arquivo de vídeo público do TikTok quando o TikTok expõe mídia para download nessa URL. Cole um link público; vídeos privados ou restritos não são compatíveis. Executa nos servidores NovaLikes e não pede senha do TikTok.',
  'tiktok-profile-picture-downloader':
    'Esta ferramenta exibe e permite salvar a foto de perfil que o TikTok publica para um usuário ou URL pública. Funciona apenas quando a foto é visível publicamente. Contas privadas não são compatíveis; login no TikTok não é necessário.',
  'facebook-video-downloader':
    'Esta ferramenta encontra mídia para download em uma URL pública de vídeo do Facebook quando o Facebook expõe o arquivo. Vídeos privados, grupos inacessíveis e posts somente com login não são compatíveis. Não é necessária senha do Facebook.',
  'facebook-reels-downloader':
    'Esta ferramenta verifica uma URL pública de Reel do Facebook e retorna mídia para download quando o Facebook a expõe na página pública. Reels privados e conteúdo somente com login não são compatíveis. Você não precisa entrar no Facebook.',
};

const AR: LocaleQuickAnswers = {
  about:
    'NovaLikes منصة إلكترونية لحزم النمو على Instagram وTikTok وFacebook، إضافة إلى أدوات عامة مجانية. يشرح الموقع أي مقياس يغيّره كل خدمة على الملف أو المنشور ويعالج الطلبات دون طلب كلمات مرور حسابات التواصل في مسارات الدفع المدعومة.',
  contact:
    'تواصل مع NovaLikes للمساعدة في الطلبات والمدفوعات والاسترداد والخدمات عبر النموذج أو البريد المنشور في هذه الصفحة. أرفق مرجع الطلب عند السؤال عن عملية شراء. NovaLikes لا تطلب كلمات مرور حسابات التواصل عبر الدعم.',
  'buy-instagram-followers':
    'NovaLikes تبيع حزم متابعين Instagram للملفات العامة. تختار الكمية وتدخل اسم المستخدم أو رابط الملف العام عند الدفع دون مشاركة كلمة مرور Instagram. يؤثر الطلب على عدد متابعي الملف — وليس على الإعجابات أو المشاهدات أو التعليقات على منشورات محددة.',
  'buy-instagram-likes':
    'تبيع NovaLikes إعجابات إنستغرام لمنشورات الصور والكاروسيل والريلز العامة، ابتداءً من 2.99 دولار أمريكي لكل 100 إعجاب (9.99 دولار لكل 1,000). كل طلب يخص منشوراً واحداً: تلصق رابطه وتدفع بالدولار دون كلمة مرور. تبدأ معظم الطلبات خلال 6–8 ساعات وتكتمل بعد 4–6 ساعات، والتسليم التدريجي متاح عند الطلب. الإعجابات ترفع عدد ذلك المنشور فقط وتشمل إعادة تعبئة لمدة 6 أشهر.',
  'buy-instagram-views':
    'تبيع NovaLikes مشاهدات إنستغرام للريلز ومنشورات الفيديو العامة ابتداءً من 1.99 دولار أمريكي لكل 100 مشاهدة (4.99 دولار لكل 1,000). تلصق رابط الريل، وتدفع بالدولار، وتحتفظ بكلمة مرورك. تبدأ معظم الطلبات خلال 6–8 ساعات وتكتمل بعد 4–6 ساعات، والتسليم التدريجي متاح عند الطلب. تأتي المشاهدات من حسابات واقعية وترفع العدد فقط، فلا تصنع وصولاً أو إعجابات أو متابعين. كل طلب يشمل إعادة تعبئة لمدة 6 أشهر.',
  'buy-instagram-comments':
    'تبيع NovaLikes تعليقات إنستغرام للمنشورات والريلز العامة بنوعين: High Quality بتعليقات قصيرة وإيجابية (ابتداءً من 13.47 دولار أمريكي لكل 10)، وPremium بتعليقات مكتوبة حول منشورك (ابتداءً من 9.99 دولار لكل 5). يمكنك إرسال صياغتك الخاصة أو طلب لغة أخرى في ملاحظة الدفع، دون كلمة مرور. تبدأ معظم الطلبات خلال 6–8 ساعات وتشمل إعادة تعبئة لمدة 6 أشهر.',
  'buy-tiktok-followers':
    'تبيع NovaLikes متابعين تيك توك للحسابات العامة، ابتداءً من 2.99 دولار أمريكي لكل 100 متابع (14.99 دولار لكل 1,000). تُدخل اسم المستخدم، وتدفع بالدولار، ولا تشارك كلمة مرورك أبداً. تبدأ معظم الطلبات خلال 6–8 ساعات وتنتهي بعد 4–6 ساعات، مع تسليم تدريجي عند الطلب وإعادة تعبئة لمدة 6 أشهر. المتابعون يرفعون عدد الملف الشخصي فقط ولا يضعون الفيديوهات في صفحة «For You».',
  'buy-tiktok-likes':
    'تبيع NovaLikes إعجابات تيك توك للفيديوهات العامة، ابتداءً من 2.99 دولار أمريكي لكل 100 إعجاب (14.99 دولار لكل 1,000). انسخ رابط الفيديو من زر المشاركة في تيك توك، وادفع بالدولار، واحتفظ بكلمة مرورك لنفسك. تبدأ معظم الطلبات خلال 6–8 ساعات وتنتهي بعد 4–6 ساعات، مع تسليم تدريجي عند الطلب وإعادة تعبئة لمدة 6 أشهر. الإعجابات ترفع عدد القلوب فقط، فأبقِها أقل من المشاهدات لتبدو الأرقام طبيعية.',
  'buy-tiktok-views':
    'تبيع NovaLikes مشاهدات تيك توك للفيديوهات العامة بخيارين: High Quality ابتداءً من 1.99 دولار أمريكي لكل 1,000 مشاهدة، وPremium ابتداءً من 3.99 دولار لكل 1,000. الصق رابط الفيديو، وادفع بالدولار، واحتفظ بكلمة مرورك. تبدأ معظم الطلبات خلال 6–8 ساعات وتنتهي بعد 4–6 ساعات، مع تسليم تدريجي عند الطلب وإعادة تعبئة لمدة 6 أشهر. المشاهدات المشتراة ترفع العدد العام فقط، وليست مشاهدات مؤهلة في Creator Rewards.',
  'buy-facebook-followers':
    'تبيع NovaLikes متابعين فيسبوك للصفحات العامة وللملفات الشخصية التي فُعّل فيها المتابعون العامون، ابتداءً من 4.99 دولار أمريكي لكل 100 (26.99 دولار لكل 1,000). الصق رابط الصفحة أو الملف، وادفع بالدولار، ولا تشارك كلمة مرورك أبداً. تبدأ معظم الطلبات خلال 6–8 ساعات وتنتهي بعد 4–6 ساعات، مع تسليم تدريجي عند الطلب وإعادة تعبئة لمدة 6 أشهر. المتابعون يرفعون عدد المتابعين فقط، لا التفاعلات ولا الوصول.',
  'buy-facebook-page-likes':
    'تبيع NovaLikes إعجابات صفحة فيسبوك للصفحات العامة ابتداءً من 2.99 دولار أمريكي لكل 100 (14.99 دولار لكل 1,000)، بالدفع بالدولار ودون كلمة مرور. تحقّق من صفحتك أولاً: صفحات فيسبوك الأحدث تعرض المتابعين بدلاً من الإعجابات، وتعرض Meta الآن المتابعات بدلاً من إعجابات الصفحة، لذا قد يناسبك شراء متابعين فيسبوك أكثر. تبدأ معظم الطلبات خلال 6–8 ساعات وتنتهي بعد 4–6 ساعات وتشمل إعادة تعبئة لمدة 6 أشهر.',
  'buy-facebook-post-likes':
    'تبيع NovaLikes إعجابات منشور فيسبوك للمنشورات العامة من الصفحات والملفات الشخصية، ابتداءً من 2.99 دولار أمريكي لكل 100 (14.99 دولار لكل 1,000). الصق رابط المنشور، وادفع بالدولار، واحتفظ بكلمة مرورك لنفسك. تصل الإعجابات بتفاعل «أعجبني»، مع «أحببته» أو غيره عند الطلب. تبدأ معظم الطلبات خلال 6–8 ساعات وتشمل إعادة تعبئة لمدة 6 أشهر. إنها تغيّر تفاعلات منشور واحد، لا المتابعين ولا إعجابات الصفحة.',
  'instagram-profile-viewer':
    'تعرض أداة NovaLikes هذه تفاصيل ملف Instagram العام — الصورة والاسم والسيرة والأعداد المنشورة — لاسم مستخدم أو رابط تدخله. تقرأ بيانات يعرضها Instagram أصلًا على الملفات العامة. لا تتجاوز الحسابات الخاصة ولا تطلب كلمة مرور Instagram.',
  'instagram-profile-picture-viewer':
    'تعرض هذه الأداة صورة الملف التي ينشرها Instagram لاسم مستخدم أو رابط عام. يمكنك عرض الصورة أو تنزيلها عندما يعرضها Instagram على الصفحة العامة. الحسابات الخاصة أو التي تتطلب تسجيل الدخول غير مدعومة.',
  'instagram-follower-counter':
    'تقرأ هذه الأداة تسمية المتابعين التي يعرضها Instagram على ملف عام — بما في ذلك اختصارات مثل 104M إذا كان Instagram ينشرها بهذا الشكل. لا تقدّر أعدادًا مخفية ولا تصل إلى حسابات خاصة ولا تتطلب تسجيل الدخول إلى Instagram.',
  'instagram-video-downloader':
    'تتحقق هذه الأداة من رابط Reel أو فيديو Instagram عام وتُرجع ملفًا للتنزيل فقط عندما يعرض Instagram ملفًا على الصفحة العامة. المنشورات الخاصة وStories والوسائط التي تتطلب تسجيل الدخول غير مدعومة. لا يلزم كلمة مرور Instagram.',
  'tiktok-video-downloader':
    'تسترجع هذه الأداة ملف فيديو TikTok عامًا عندما يعرض TikTok وسائط قابلة للتنزيل لذلك الرابط. الصق رابطًا عامًا؛ الفيديوهات الخاصة أو المقيّدة غير مدعومة. تعمل على خوادم NovaLikes ولا تطلب كلمة مرور TikTok.',
  'tiktok-profile-picture-downloader':
    'تعرض هذه الأداة صورة الملف التي ينشرها TikTok لاسم مستخدم أو رابط عام وتتيح حفظها. تعمل فقط عندما تكون الصورة مرئية علنًا. الحسابات الخاصة غير مدعومة؛ تسجيل الدخول إلى TikTok غير مطلوب.',
  'facebook-video-downloader':
    'تجد هذه الأداة وسائطًا قابلة للتنزيل لرابط فيديو Facebook عام عندما يعرض Facebook الملف علنًا. الفيديوهات الخاصة والمجموعات غير المتاحة والمنشورات التي تتطلب تسجيل الدخول غير مدعومة. لا يلزم كلمة مرور Facebook.',
  'facebook-reels-downloader':
    'تتحقق هذه الأداة من رابط Reel Facebook عام وتُرجع وسائطًا للتنزيل عندما يعرض Facebook ذلك على الصفحة العامة. Reels الخاصة والمحتوى الذي يتطلب تسجيل الدخول غير مدعوم. لا تحتاج إلى تسجيل الدخول إلى Facebook.',
};

export const LOCALIZED_QUICK_ANSWERS: Record<LocalizedLocale, LocaleQuickAnswers> = {
  es: ES,
  de: DE,
  fr: FR,
  it: IT,
  'pt-br': PT_BR,
  ar: AR,
};

export function getLocalizedQuickAnswer(
  locale: LocalizedLocale,
  pageId: QuickAnswerPageId,
): string {
  return LOCALIZED_QUICK_ANSWERS[locale][pageId];
}
