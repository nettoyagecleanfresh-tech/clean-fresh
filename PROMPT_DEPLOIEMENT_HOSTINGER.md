# Prompt — Déploiement Clean&Fresh sur Hostinger

Copie-colle ce texte exactement à Claude pour qu'il gère le déploiement de bout en bout.

---

## PROMPT À COPIER :

```
Tu vas déployer mon site React (Clean&Fresh) sur Hostinger en remplaçant l'ancien WordPress.
Voici tout ce dont tu as besoin :

## Contexte
- Site React/Vite/TanStack Router dans le dossier : C:\Users\CHERK\Downloads\fresh-sparkle-toulouse-main\fresh-sparkle-toulouse-main
- Le fichier .htaccess est déjà dans public/ (inclus automatiquement dans le build)
- Domaine cible : cleanetfresh.fr
- Hébergeur : Hostinger (hPanel)
- L'ancien site est WordPress — tout supprimer dans public_html/ avant upload

## Ce que tu dois faire, dans l'ordre :

### ÉTAPE 1 — Builder le site
Lance dans le terminal :
cd "C:\Users\CHERK\Downloads\fresh-sparkle-toulouse-main\fresh-sparkle-toulouse-main"
npm run build

Vérifie que le dossier dist/ a bien été créé et contient index.html + assets/.
Vérifie aussi que dist/.htaccess est présent (copié depuis public/).

### ÉTAPE 2 — Se connecter à Hostinger
Ouvre https://hpanel.hostinger.com dans le navigateur.
Connecte-toi (je te donnerai mes identifiants si nécessaire).
Va dans : Hébergement → Gérer → Gestionnaire de fichiers → public_html/

### ÉTAPE 3 — Supprimer l'ancien WordPress
Dans public_html/, sélectionne TOUT et supprime tout.
Confirme que le dossier est vide avant de passer à l'étape suivante.

### ÉTAPE 4 — Uploader le contenu de dist/
Upload tout le contenu du dossier dist/ (et non le dossier dist lui-même)
directement dans public_html/.
Les fichiers attendus à la racine de public_html/ :
- index.html
- .htaccess
- sitemap.xml
- robots.txt
- dossier assets/

### ÉTAPE 5 — Activer le SSL
Dans hPanel → SSL → Active le certificat Let's Encrypt pour cleanetfresh.fr et www.cleanetfresh.fr.
Attends la confirmation d'activation.

### ÉTAPE 6 — Activer la redirection HTTPS dans .htaccess
Une fois le SSL confirmé, dans le Gestionnaire de fichiers, ouvre .htaccess et décommente ces lignes :
  RewriteCond %{HTTPS} off
  RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

### ÉTAPE 7 — Vérifier que le site fonctionne
Ouvre ces URLs et confirme que chacune charge correctement (pas de 404, pas de page blanche) :
- https://cleanetfresh.fr
- https://cleanetfresh.fr/nettoyage-canape-toulouse
- https://cleanetfresh.fr/nettoyage-toulouse
- https://cleanetfresh.fr/nettoyage-blagnac
- https://cleanetfresh.fr/formules

Si une URL donne 404 → le .htaccess n'est pas actif. Dis-moi ce que tu vois et corrige.

### ÉTAPE 8 — Soumettre le sitemap dans Google Search Console
Va sur https://search.google.com/search-console
Ajoute la propriété cleanetfresh.fr si elle n'existe pas encore.
Dans Sitemaps → entre sitemap.xml → Envoyer.
Demande l'indexation de ces 5 pages via l'outil Inspection URL :
- https://cleanetfresh.fr/
- https://cleanetfresh.fr/nettoyage-canape-toulouse
- https://cleanetfresh.fr/nettoyage-matelas-toulouse
- https://cleanetfresh.fr/nettoyage-tapis-toulouse
- https://cleanetfresh.fr/nettoyage-auto-a-domicile-toulouse

## Règles importantes
- Utilise les outils navigateur (Claude in Chrome) pour toutes les actions sur Hostinger et GSC
- Utilise le terminal (Bash) pour le build et la vérification des fichiers
- Ne me demande pas de confirmation pour les étapes techniques — avance et signale-moi uniquement si tu as besoin d'identifiants ou si tu rencontres une erreur bloquante
- À chaque étape, dis-moi brièvement ce que tu viens de faire et ce que tu fais ensuite
- Si quelque chose échoue, diagnostique et propose une solution immédiatement sans attendre ma réponse

Commence par l'ÉTAPE 1 maintenant.
```
