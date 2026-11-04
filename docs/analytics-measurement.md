# Mesure des demandes Clean&Fresh

Les clics `conversion_cta`, les étapes `booking_step_view` et les sorties
`booking_exit` restent des signaux de parcours. Une sortie n'est pas une
annulation, et une visite de `/reserver` n'est pas une réservation.

- `booking_complete` : réponse serveur réussie avec un ID Google Calendar.
  Le rendu de l'écran final ne produit plus la conversion. L'ID est utilisé
  uniquement dans l'onglet pour éviter de compter deux fois la même réponse ;
  il n'est pas transmis à GA4 ou à Vercel Web Analytics.
- `quote_submitted` : le serveur a reçu la confirmation d'acceptation de
  l'email de devis. Un identifiant aléatoire est conservé lors d'une nouvelle
  tentative du même envoi. Cela ne prouve ni la livraison finale du mail ni
  l'acceptation commerciale du devis.
- Aucune réservation ne produit d'événement `purchase` ou de chiffre d'affaires.

GA4 respecte toujours le choix de consentement. GA4, Vercel Analytics et Speed
Insights excluent les domaines de prévisualisation, les pages de gestion
privées et le mode test ; leurs URL ne contiennent ni requête ni fragment.

## Tests explicites

Ouvrir `https://cleanetfresh.fr/?analytics_test=1` avant un audit. Le mode suit
les navigations de cet onglet ; `?analytics_test=0` le désactive. Les nouvelles
réservations créées dans ce mode sont marquées `cfAnalyticsTest=true` dans les
propriétés privées de Calendar. Ce mode exclut la mesure ; **il ne simule pas
les réservations et ne désactive pas les emails**. Ne pas soumettre de vraie
réservation pendant un simple test de navigation.

Un test non marqué ne peut pas être identifié avec certitude automatiquement.

## Réservations conservées et annulations

Chaque création réussie et chaque annulation réussie sur le site écrit un
journal serveur structuré `cleanfresh-conversion-v1`. Il ne contient que le
type, la date, un ID haché et le marqueur de test, sans coordonnées client.
La fonction `reconcileConversions` déduplique les ID, retire les tests et
soustrait les annulations de leur réservation d'origine, même si les lignes
arrivent dans le désordre. Utiliser un export complet d'une même cohorte,
incluant les annulations jusqu'à la date de clôture du rapport. La rétention
des logs Vercel limite cette méthode ; ce journal n'est pas une nouvelle base
durable et ne reconstitue pas l'historique antérieur au déploiement.

Pour le nombre de rendez-vous encore conservés, `retainedWebsiteBookings`
compte les ID uniques dans un export Calendar complet du périmètre demandé,
en excluant les événements annulés et les tests. Les nouvelles réservations
du site portent `cfAnalyticsSource=website`. Cette lecture de l'état courant
prend aussi en compte une suppression manuelle dans Calendar. Les anciens
rendez-vous sans ce marqueur ne sont pas attribués automatiquement au site.

Les annulations ne retirent pas rétroactivement l'événement brut GA4
`booking_complete`. Le nombre net se lit dans Calendar ou se reconstruit à
partir du journal, séparément du parcours web. Une nouvelle réservation avec
un nouvel ID reste une nouvelle réservation ; aucun rapprochement hasardeux
par nom ou email n'est utilisé pour la supprimer des mesures.
