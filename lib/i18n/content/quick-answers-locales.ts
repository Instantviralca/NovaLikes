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
    'NovaLikes vende paquetes de seguidores de Instagram para perfiles públicos. Eliges la cantidad, introduces el usuario o URL pública en el pago y no compartes tu contraseña de Instagram. El pedido afecta al recuento de seguidores del perfil, no a likes, vistas o comentarios de publicaciones concretas.',
  'buy-instagram-likes':
    'NovaLikes vende paquetes de likes de Instagram para publicaciones y Reels públicos compatibles. Eliges un paquete, envías la URL pública del contenido y pagas sin tu contraseña de Instagram. Los likes se aplican a esa publicación concreta; no añaden seguidores del perfil ni vistas del vídeo.',
  'buy-instagram-views':
    'NovaLikes vende paquetes de vistas de Instagram para Reels y vídeos públicos compatibles. Seleccionas un paquete, proporcionas la URL pública del contenido y pagas sin contraseña. Las vistas se aplican solo a ese Reel o vídeo; no a seguidores del perfil, likes ni comentarios en otras publicaciones.',
  'buy-instagram-comments':
    'NovaLikes vende paquetes de comentarios de Instagram para publicaciones y Reels públicos compatibles. Eliges un paquete, introduces la URL pública y pagas sin contraseña. Los comentarios se aplican a esa publicación; no aumentan seguidores, likes ni vistas en otras partes del perfil.',
  'buy-tiktok-followers':
    'NovaLikes vende paquetes de seguidores de TikTok para cuentas públicas. Eliges la cantidad, introduces el usuario público en el pago y no compartes tu contraseña de TikTok. Los seguidores se aplican al recuento de la cuenta, no a likes ni vistas de vídeos individuales.',
  'buy-tiktok-likes':
    'NovaLikes vende paquetes de likes de TikTok para vídeos públicos compatibles. Eliges un paquete, pegas la URL pública del vídeo y pagas sin contraseña. Los likes se aplican a ese vídeo; no añaden seguidores del perfil ni cambian el recuento de vistas.',
  'buy-tiktok-views':
    'NovaLikes vende paquetes de vistas de TikTok para vídeos públicos en la página de reproducción compatible. Eliges un paquete, pegas la URL pública del vídeo y pagas sin contraseña. El pedido cambia el recuento de vistas publicado de ese vídeo; no los seguidores del perfil ni los likes del vídeo.',
  'buy-facebook-followers':
    'NovaLikes vende paquetes de seguidores de Facebook para Páginas públicas. Eliges la cantidad, envías la URL pública de la Página y pagas sin contraseña. Los seguidores aumentan el recuento de seguidores de la Página; no son Me gusta de la Página ni likes de una publicación concreta.',
  'buy-facebook-page-likes':
    'NovaLikes vende paquetes de Me gusta de Página de Facebook para Páginas públicas. Eliges la cantidad, introduces la URL pública de la Página y pagas sin contraseña. Los Me gusta de Página afectan a ese métrica de la Página; no añaden seguidores ni likes de una publicación individual.',
  'buy-facebook-post-likes':
    'NovaLikes vende paquetes de likes de publicación de Facebook para una publicación pública cada vez. Eliges un paquete, pegas la URL de la publicación y pagas sin contraseña. Los likes se aplican solo a esa publicación; no cambian los seguidores de la Página ni el total de Me gusta de la Página.',
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
    'NovaLikes verkauft Instagram-Likes-Pakete für unterstützte öffentliche Beiträge und Reels. Du wählst ein Paket, sendest die öffentliche Beitrags- oder Reel-URL und bezahlst ohne Instagram-Passwort. Likes gelten für diesen Beitrag — sie erhöhen keine Profil-Follower oder Video-Views.',
  'buy-instagram-views':
    'NovaLikes verkauft Instagram-Views-Pakete für unterstützte öffentliche Videos und Reels. Du wählst ein Paket, gibst die öffentliche Video-URL an und bezahlst ohne Passwort. Views gelten für dieses Video — getrennt von Profil-Followern, Beitrags-Likes und Kommentaren.',
  'buy-instagram-comments':
    'NovaLikes verkauft Instagram-Kommentar-Pakete für unterstützte öffentliche Beiträge und Reels. Du wählst ein Paket, gibst die öffentliche URL ein und bezahlst ohne Passwort. Kommentare gelten für diesen Beitrag — nicht für Follower, Likes oder Views anderswo auf dem Profil.',
  'buy-tiktok-followers':
    'NovaLikes verkauft TikTok-Follower-Pakete für öffentliche Konten. Du wählst eine Menge, gibst den öffentlichen TikTok-Benutzernamen beim Checkout ein und teilst kein TikTok-Passwort. Follower betreffen die Follower-Zahl des Kontos — nicht Likes oder Views einzelner Videos.',
  'buy-tiktok-likes':
    'NovaLikes verkauft TikTok-Likes-Pakete für unterstützte öffentliche Videos. Du wählst ein Paket, fügst die öffentliche Video-URL ein und bezahlst ohne Passwort. Likes gelten für dieses Video — sie erhöhen keine Profil-Follower und ändern nicht die View-Zahl.',
  'buy-tiktok-views':
    'NovaLikes verkauft TikTok-Views-Pakete für unterstützte öffentliche Videos. Du wählst ein Paket, gibst die Video-URL an und bezahlst ohne Passwort. Views gelten für dieses Video — getrennt von Profil-Followern und Video-Likes.',
  'buy-facebook-followers':
    'NovaLikes verkauft Facebook-Follower-Pakete für öffentliche Pages. Du wählst eine Menge, sendest die öffentliche Page-URL und bezahlst ohne Facebook-Passwort. Follower erhöhen die Follower-Zahl der Page — das sind keine Page Likes und keine Likes eines einzelnen Beitrags.',
  'buy-facebook-page-likes':
    'NovaLikes verkauft Facebook-Page-Likes-Pakete für öffentliche Pages. Du wählst eine Menge, gibst die öffentliche Page-URL ein und bezahlst ohne Passwort. Page Likes betreffen die Page-Like-Kennzahl der Page — nicht Page-Follower oder Likes eines Beitrags.',
  'buy-facebook-post-likes':
    'NovaLikes verkauft Facebook-Post-Likes-Pakete jeweils für einen öffentlichen Beitrag. Du wählst ein Paket, fügst die Beitrags-URL ein und bezahlst ohne Passwort. Post-Likes gelten nur für diesen Beitrag — sie ändern keine Page-Follower oder Page-Like-Gesamtzahl.',
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
    'NovaLikes vend des forfaits de likes Instagram pour publications et Reels publics pris en charge. Vous choisissez un forfait, envoyez l’URL publique du contenu et payez sans mot de passe Instagram. Les likes s’appliquent à cette publication — ils n’ajoutent pas d’abonnés au profil ni de vues vidéo.',
  'buy-instagram-views':
    'NovaLikes vend des forfaits de vues Instagram pour vidéos et Reels publics pris en charge. Vous choisissez un forfait, fournissez l’URL publique de la vidéo et payez sans mot de passe. Les vues s’appliquent à cette vidéo — distinctes des abonnés, likes et commentaires du profil.',
  'buy-instagram-comments':
    'NovaLikes vend des forfaits de commentaires Instagram pour publications et Reels publics pris en charge. Vous choisissez un forfait, saisissez l’URL publique et payez sans mot de passe. Les commentaires concernent cette publication — pas les abonnés, likes ou vues ailleurs sur le profil.',
  'buy-tiktok-followers':
    'NovaLikes vend des forfaits d’abonnés TikTok pour comptes publics. Vous choisissez une quantité, saisissez le nom d’utilisateur public au paiement et ne partagez pas votre mot de passe TikTok. Les abonnés concernent le compte — pas les likes ou vues d’une vidéo individuelle.',
  'buy-tiktok-likes':
    'NovaLikes vend des forfaits de likes TikTok pour vidéos publiques prises en charge. Vous choisissez un forfait, collez l’URL publique de la vidéo et payez sans mot de passe. Les likes s’appliquent à cette vidéo — ils n’ajoutent pas d’abonnés au profil ni ne modifient le nombre de vues.',
  'buy-tiktok-views':
    'NovaLikes vend des forfaits de vues TikTok pour vidéos publiques prises en charge. Vous choisissez un forfait, fournissez l’URL de la vidéo et payez sans mot de passe. Les vues s’appliquent à cette vidéo — distinctes des abonnés du profil et des likes de la vidéo.',
  'buy-facebook-followers':
    'NovaLikes vend des forfaits d’abonnés Facebook pour Pages publiques. Vous choisissez une quantité, envoyez l’URL publique de la Page et payez sans mot de passe Facebook. Les abonnés augmentent le total d’abonnés de la Page — ce ne sont pas des J’aime de Page ni des likes d’une publication.',
  'buy-facebook-page-likes':
    'NovaLikes vend des forfaits de J’aime de Page Facebook pour Pages publiques. Vous choisissez une quantité, saisissez l’URL publique de la Page et payez sans mot de passe. Les J’aime de Page concernent cette métrique de la Page — pas les abonnés ni les likes d’un seul post.',
  'buy-facebook-post-likes':
    'NovaLikes vend des forfaits de likes de publication Facebook pour une publication publique à la fois. Vous choisissez un forfait, collez l’URL de la publication et payez sans mot de passe. Les likes ne s’appliquent qu’à ce post — ils ne modifient pas les abonnés de la Page ni le total de J’aime de Page.',
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
    'NovaLikes vende pacchetti like Instagram per post e Reels pubblici supportati. Scegli un pacchetto, invia l’URL pubblico del contenuto e paga senza password Instagram. I like si applicano a quel post — non aggiungono follower al profilo né visualizzazioni video.',
  'buy-instagram-views':
    'NovaLikes vende pacchetti visualizzazioni Instagram per video e Reels pubblici supportati. Scegli un pacchetto, fornisci l’URL pubblico del video e paga senza password. Le visualizzazioni si applicano a quel video — distinte da follower, like e commenti del profilo.',
  'buy-instagram-comments':
    'NovaLikes vende pacchetti commenti Instagram per post e Reels pubblici supportati. Scegli un pacchetto, inserisci l’URL pubblico e paga senza password. I commenti si applicano a quel post — non aumentano follower, like o visualizzazioni altrove sul profilo.',
  'buy-tiktok-followers':
    'NovaLikes vende pacchetti follower TikTok per account pubblici. Scegli la quantità, inserisci l’username pubblico al checkout e non condividere la password TikTok. I follower riguardano il conto — non like o visualizzazioni dei singoli video.',
  'buy-tiktok-likes':
    'NovaLikes vende pacchetti like TikTok per video pubblici supportati. Scegli un pacchetto, incolla l’URL pubblico del video e paga senza password. I like si applicano a quel video — non aggiungono follower al profilo né cambiano le visualizzazioni.',
  'buy-tiktok-views':
    'NovaLikes vende pacchetti visualizzazioni TikTok per video pubblici supportati. Scegli un pacchetto, fornisci l’URL del video e paga senza password. Le visualizzazioni si applicano a quel video — distinte da follower del profilo e like del video.',
  'buy-facebook-followers':
    'NovaLikes vende pacchetti follower Facebook per Pagine pubbliche. Scegli la quantità, invia l’URL pubblico della Pagina e paga senza password Facebook. I follower aumentano il totale follower della Pagina — non sono Mi piace di Pagina né like di un singolo post.',
  'buy-facebook-page-likes':
    'NovaLikes vende pacchetti Mi piace di Pagina Facebook per Pagine pubbliche. Scegli la quantità, inserisci l’URL pubblico della Pagina e paga senza password. I Mi piace di Pagina riguardano quella metrica — non aggiungono follower di Pagina né like di un post.',
  'buy-facebook-post-likes':
    'NovaLikes vende pacchetti like di post Facebook per un post pubblico alla volta. Scegli un pacchetto, incolla l’URL del post e paga senza password. I like si applicano solo a quel post — non modificano follower di Pagina o totale Mi piace di Pagina.',
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
    'A NovaLikes vende pacotes de curtidas do Instagram para posts e Reels públicos compatíveis. Você escolhe um pacote, envia a URL pública do conteúdo e paga sem senha do Instagram. As curtidas se aplicam àquele post — não adicionam seguidores ao perfil nem visualizações do vídeo.',
  'buy-instagram-views':
    'A NovaLikes vende pacotes de visualizações do Instagram para vídeos e Reels públicos compatíveis. Você escolhe um pacote, informa a URL pública do vídeo e paga sem senha. As visualizações se aplicam àquele vídeo — separadas de seguidores, curtidas e comentários do perfil.',
  'buy-instagram-comments':
    'A NovaLikes vende pacotes de comentários do Instagram para posts e Reels públicos compatíveis. Você escolhe um pacote, informa a URL pública e paga sem senha. Os comentários se aplicam àquele post — não aumentam seguidores, curtidas ou visualizações em outras partes do perfil.',
  'buy-tiktok-followers':
    'A NovaLikes vende pacotes de seguidores do TikTok para contas públicas. Você escolhe a quantidade, informa o usuário público no checkout e não compartilha a senha do TikTok. Os seguidores afetam a contagem da conta — não curtidas ou visualizações de vídeos individuais.',
  'buy-tiktok-likes':
    'A NovaLikes vende pacotes de curtidas do TikTok para vídeos públicos compatíveis. Você escolhe um pacote, cola a URL pública do vídeo e paga sem senha. As curtidas se aplicam àquele vídeo — não adicionam seguidores ao perfil nem alteram a contagem de visualizações.',
  'buy-tiktok-views':
    'A NovaLikes vende pacotes de visualizações do TikTok para vídeos públicos compatíveis. Você escolhe um pacote, informa a URL do vídeo e paga sem senha. As visualizações se aplicam àquele vídeo — separadas dos seguidores do perfil e das curtidas do vídeo.',
  'buy-facebook-followers':
    'A NovaLikes vende pacotes de seguidores do Facebook para Páginas públicas. Você escolhe a quantidade, envia a URL pública da Página e paga sem senha do Facebook. Os seguidores aumentam a contagem de seguidores da Página — não são curtidas da Página nem curtidas de um post específico.',
  'buy-facebook-page-likes':
    'A NovaLikes vende pacotes de curtidas da Página do Facebook para Páginas públicas. Você escolhe a quantidade, informa a URL pública da Página e paga sem senha. As curtidas da Página afetam essa métrica da Página — não adicionam seguidores nem curtidas de um post individual.',
  'buy-facebook-post-likes':
    'A NovaLikes vende pacotes de curtidas de post do Facebook para um post público por vez. Você escolhe um pacote, cola a URL do post e paga sem senha. As curtidas se aplicam somente àquele post — não alteram seguidores da Página nem o total de curtidas da Página.',
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
    'NovaLikes تبيع حزم إعجابات Instagram للمنشورات وReels العامة المدعومة. تختار حزمة وترسل رابط المحتوى العام وتدفع دون كلمة مرور Instagram. تُطبَّق الإعجابات على ذلك المنشور — ولا تضيف متابعين للملف ولا مشاهدات للفيديو.',
  'buy-instagram-views':
    'NovaLikes تبيع حزم مشاهدات Instagram للفيديوهات وReels العامة المدعومة. تختار حزمة وتقدّم رابط الفيديو العام وتدفع دون كلمة مرور. تُطبَّق المشاهدات على ذلك الفيديو — منفصلة عن متابعي الملف والإعجابات والتعليقات.',
  'buy-instagram-comments':
    'NovaLikes تبيع حزم تعليقات Instagram للمنشورات وReels العامة المدعومة. تختار حزمة وتدخل الرابط العام وتدفع دون كلمة مرور. تُطبَّق التعليقات على ذلك المنشور — ولا تزيد المتابعين أو الإعجابات أو المشاهدات في أماكن أخرى من الملف.',
  'buy-tiktok-followers':
    'NovaLikes تبيع حزم متابعين TikTok للحسابات العامة. تختار الكمية وتدخل اسم المستخدم العام عند الدفع دون مشاركة كلمة مرور TikTok. يؤثر الطلب على عدد متابعي الحساب — وليس على إعجابات أو مشاهدات فيديوهات فردية.',
  'buy-tiktok-likes':
    'NovaLikes تبيع حزم إعجابات TikTok للفيديوهات العامة المدعومة. تختار حزمة وتلصق رابط الفيديو العام وتدفع دون كلمة مرور. تُطبَّق الإعجابات على ذلك الفيديو — ولا تضيف متابعين للملف ولا تغيّر عدد المشاهدات.',
  'buy-tiktok-views':
    'NovaLikes تبيع حزم مشاهدات TikTok للفيديوهات العامة المدعومة. تختار حزمة وتقدّم رابط الفيديو وتدفع دون كلمة مرور. تُطبَّق المشاهدات على ذلك الفيديو — منفصلة عن متابعي الملف وإعجابات الفيديو.',
  'buy-facebook-followers':
    'NovaLikes تبيع حزم متابعين Facebook للصفحات العامة. تختار الكمية وترسل رابط الصفحة العام وتدفع دون كلمة مرور Facebook. يزيد الطلب عدد متابعي الصفحة — وليس إعجابات الصفحة (Page Likes) ولا إعجابات منشور واحد.',
  'buy-facebook-page-likes':
    'NovaLikes تبيع حزم إعجابات صفحة Facebook للصفحات العامة. تختار الكمية وتدخل رابط الصفحة العام وتدفع دون كلمة مرور. تؤثر إعجابات الصفحة على مقياس Page Like للصفحة — ولا تضيف متابعين ولا إعجابات لمنشور محدد.',
  'buy-facebook-post-likes':
    'NovaLikes تبيع حزم إعجابات منشور Facebook لمنشور عام واحد في كل مرة. تختار حزمة وتلصق رابط المنشور وتدفع دون كلمة مرور. تُطبَّق الإعجابات على ذلك المنشور فقط — ولا تغيّر متابعي الصفحة ولا إجمالي إعجابات الصفحة.',
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
