# Brief d'adaptation — site SENOU Solutions (base : modèle Verso, Next.js 15)

## Objectif
Transformer le site Verso (app grand public) en site vitrine premium pour SENOU Solutions : **crédibilité et visibilité en ligne**. Bilingue FR/EN. Domaine : senousolutions.com.

## À ne pas casser
Garder la stack et le comportement : Next 15, React 19, Motion, Lenis, CSS Modules, preloader, défilement fluide, bento, bascule de thème. Tout garder, mais réadapter.

## Étapes
1. Copier `content/fr.ts` et `content/en.ts` dans `content/` (remplace le contenu Verso).
2. Remplacer le bloc `:root` de `app/globals.css` par `brand/tokens.css`. Remplacer les anciennes variables (`--palm`, `--mint`, `--mango`, `--lilac`, `--sky`) dans les CSS Modules : `--palm`→`--navy`, `--palm-2`→`--navy-2`, `--mint`→`--cyan`, `--mango`→`--gold`, `--lilac`→`--blue`, `--sky`→`--mist`.
3. Mettre en place la police : titres Sora (ou Plus Jakarta Sans), texte Inter, via `next/font`.
4. Intégrer `brand/*.svg` (Nav, Footer, `app/icon.svg` = `senou-icon.svg`). Version sombre sur fonds navy.
5. i18n : routes `/` (FR) et `/en` (EN), sélecteur FR/EN dans la Nav, `hreflang` et métadonnées par langue.
6. Pages : Accueil, FAQ, Contact, Support, Conditions générales, Politique de confidentialité (EN : `/en/faq`, `/en/contact`, `/en/support`, `/en/terms`, `/en/privacy`).

## Correspondance des sections
| Section Verso (clé `fr.ts`) | Section SENOU (nouvelle clé) | Travail côté composant |
|---|---|---|
| `hero` (carte + chips) | `hero` | Retirer la carte Visa et les chips ; garder le texte rotatif ; remplacer le visuel par une composition abstraite (rubans du logo). |
| `proof` | `proof` | Retirer note store et badges ; garder la marquee. |
| `verbs` | `services` | 4 cartes de services. |
| `bento` | `capabilities` | 6 tuiles sans mockups d'appli (supprimer le graphique budget 50/30/20). |
| `turnPage` | `method` | 4 étapes numérotées. |
| `card` | `work` | Grille de réalisations avec lien externe quand `url` n'est pas `null`. |
| `transparency` | `numbers` | Compteurs animés conservés. |
| `testimonials` | `partners` | Bande de logos/noms de partenaires. **Aucun témoignage inventé.** |
| `faq`, `finalCta`, `footer` | idem | Retirer badges stores et QR code ; CTA = e-mail, téléphone, WhatsApp. |

Supprimer : `ThemeToggle` seulement si le fond clair unique est préféré ; badges et QR dans `public/images/`.

## Charte (résumé)
- **Positionnement :** premium, sobre, fiable. Ton : « nous » (équipe), direct, sans jargon. Pas de photos de personnes pour le moment.
- **Couleurs :** bleu nuit `#0a1b3d`, bleu `#1f6fe0`, cyan `#1fb5f0`, fond `#f5f8fc`, accent or `#f2b441` (un seul accent par écran, rare).
- **Logo :** le logo d'origine de SENOU Solutions (typographie et dessin conservés), vectorisé et recoloré avec la nouvelle palette. Tout est déjà en tracés, aucune police à charger. Fichiers : `brand/senou-logo-light.svg` (fonds clairs), `senou-logo-dark.svg` (fonds navy), `senou-icon.svg` (le S seul, pour favicon et app icon). Versions HD à fond transparent : `senou-logo-light-4000px.png`, `senou-logo-dark-4000px.png`, `senou-icon-1024px.png`. Le « O » de ENOU et les deux « o » de « olutions » sont de vrais cercles ; le reste est un tracé lissé de l'original.
- **Mouvement :** celui de Verso, plus lent et moins ludique (pas de stickers).

## Points « À VALIDER » avant mise en ligne
Cherchez `À VALIDER` dans `content/` : opérateurs de paiement à citer, descriptions des sites clients, comptes de réseaux sociaux, WhatsApp actif sur +228 90 95 99 53.
Mentions légales : le NIF et le RCCM de l'entreprise vont dans les pages légales (à copier depuis la facture). **Ne jamais publier le RIB.** Le numéro court attribué par l'ARCEP n'est pas à mettre en avant.
Les pages CGU et confidentialité ont besoin d'un texte adapté à SENOU Solutions (celui de Verso concerne une appli de paiement) : à faire relire par un juriste.
