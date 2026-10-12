# SENOU Solutions — site web

Site vitrine bilingue de SENOU Solutions (senousolutions.com) : accueil one-page, pages FAQ, Support, Nous contacter, Conditions générales et Politique de confidentialité. Français à la racine (`/`), anglais sous `/en`.

## Technologies

- Next.js 15 (App Router), React 19, TypeScript
- Motion (animations), Lenis (défilement fluide)
- CSS Modules + variables CSS (tokens), police Plus Jakarta Sans via `next/font`
- Icônes Phosphor
- Tests : Vitest

## Lancer le projet

Prérequis : Node.js 20 ou plus récent.

```bash
npm install
npm run dev
```

Le site est alors disponible sur http://localhost:3000 (FR) et http://localhost:3000/en (EN).

## Mettre en production

```bash
npm run build
npm start
```

Le site se déploie tel quel sur Vercel (hôte recommandé pour Next.js) ou sur tout serveur Node.js.

### Déployer sur Vercel

```bash
npx vercel login      # une seule fois, ouvre le navigateur
npx vercel            # préversion privée (URL *.vercel.app)
npx vercel --prod     # mise en production
```

Les dossiers de travail (`senou-pack/`, `CLAUDE.md`, `PREMIER-PROMPT.md`) ne sont pas envoyés (`.vercelignore`).

**Préversion et indexation :** tant que la variable d'environnement `SITE_LIVE` ne vaut pas `1`, le site envoie un en-tête `noindex` et `robots.txt` bloque les moteurs de recherche. Au lancement officiel (pages légales validées) : dans Vercel, Settings → Environment Variables, ajouter `SITE_LIVE = 1` (Production), puis redéployer. Le sitemap est alors annoncé dans `robots.txt`.

**Domaine :** dans Vercel, Settings → Domains, ajouter `senousolutions.com` et `www.senousolutions.com`, puis reporter chez le registraire les enregistrements DNS indiqués par Vercel.

## Où modifier quoi

| Besoin | Fichier |
|---|---|
| Textes de l'accueil (hero, services, réalisations, FAQ, pied de page…) | `content/fr.ts` et `content/en.ts` |
| Textes des pages intérieures, libellés d'interface, pages légales | `content/pages.fr.ts` et `content/pages.en.ts` |
| Routes FR ↔ EN, hreflang | `content/i18n.ts` |
| Couleurs, rayons, ombres, thème clair / blanc | `app/globals.css` (tokens issus de `senou-pack/brand/tokens.css`) |
| Logos | `public/brand/` (clair, sombre, icône) ; favicon `app/icon.svg` |
| Logos et captures des réalisations et partenaires | `public/logos/`, `public/work/`, liés dans `content/media.ts` |
| Sections de l'accueil | `components/sections/` |
| Composants réutilisables (boutons, pastilles, accordéon…) | `components/ui/` |

Les fichiers FR et EN doivent garder exactement les mêmes clés : `npm run build` échoue sinon.

## Modifier la FAQ sans toucher au code

La FAQ (accueil, page FAQ, page Support) peut être gérée dans une feuille Google Sheets :

1. Dans Google Sheets : Fichier → Importer → `content/faq-modele.csv` (la FAQ actuelle, en FR et en EN).
2. Colonnes : `langue` (fr ou en), `categorie`, `question`, `reponse`, `accueil` (« oui » pour l'afficher sur la page d'accueil), `ordre` (facultatif).
3. Fichier → Partager → Publier sur le web → choisir la feuille et le format **CSV** → Publier. Copier le lien.
4. Dans Vercel : Settings → Environment Variables → `FAQ_SHEET_URL` = ce lien, puis redéployer une fois.

Ensuite, chaque modification de la feuille apparaît sur le site en 5 minutes environ, sans redéploiement. Si la feuille est vide, mal remplie ou injoignable, le site affiche la FAQ de `content/` : il n'y a jamais de page vide.

## Langues

- Routes FR : `app/(fr)/` ; routes EN : `app/(en)/en/`. Chaque groupe a son propre `<html lang>`.
- Le sélecteur FR | EN de la navigation renvoie vers la page équivalente dans l'autre langue.

## Points à compléter avant mise en ligne

La liste des contenus à valider (opérateurs de paiement, descriptions des réalisations, WhatsApp, réseaux sociaux, mentions légales) se trouve dans `content/placeholders.md`. Les pages légales doivent être relues par un juriste.

## Thème clair / blanc

Un bouton rond fixé sur le bord droit de l'écran permet de basculer entre le fond clair bleuté (par défaut) et le fond blanc. Le choix est mémorisé dans le navigateur du visiteur. Pour imposer un seul fond, retirer `<ThemeToggle />` dans `components/layout/RootDocument.tsx`.
