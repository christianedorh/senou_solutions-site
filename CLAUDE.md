# Mission : transformer ce projet (modèle Verso) en site vitrine SENOU Solutions

Lis d'abord `senou-pack/BRIEF-CLAUDE-CODE.md` : c'est la source de vérité (étapes, correspondance des sections, charte).

## Contexte
- Entreprise : SENOU Solutions (Lomé, Togo), fintech et solutions digitales (web, mobile, intégration de paiement). Cible : PME et grands groupes.
- Domaine : senousolutions.com. Site bilingue FR (par défaut) et EN (`/en`).
- Ton : premium, sobre, « nous » (équipe), pas de photos de personnes.
- Langue de travail avec l'utilisateur : français.

## Règles
- Garder la stack : Next.js 15, React 19, TypeScript, Motion, Lenis, CSS Modules. Tout garder du modèle, mais le réadapter.
- Textes : `senou-pack/content/fr.ts` et `en.ts` remplacent `content/fr.ts` (créer `content/en.ts`). Les clés ont changé : adapter les composants, pas les textes.
- Couleurs : `senou-pack/brand/tokens.css` remplace le bloc `:root` de `app/globals.css`.
- Logos : utiliser les SVG de `senou-pack/brand/` (clair, sombre, icône). Ne pas redessiner le logo.
- Ne jamais inventer de témoignages, de chiffres ou de clients. Les mentions `À VALIDER` restent visibles dans les contenus.
- Ne jamais publier de RIB. Ne pas mettre en avant le numéro court ARCEP. Contact public principal : contact@senousolutions.com.
- Les pages légales (CGU, confidentialité) doivent être réécrites pour SENOU Solutions et signalées comme « à faire relire par un juriste ».

## Définition de « terminé »
`npm run build` passe sans erreur, les pages FR et EN s'affichent sur mobile et desktop, aucune mention de Verso, de carte, de cashback ou de store ne subsiste (`grep -ri "verso\|cashback\|app store"`).
