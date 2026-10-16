# Éléments à valider avant mise en ligne

Recherchez `À VALIDER` dans `content/` et `components/` pour retrouver chaque point.

## Contenus de l'accueil (`fr.ts`, `en.ts`)
- Service « Intégration de paiement » : citer les opérateurs et solutions de paiement intégrés.
- Réalisations : descriptions de KDA PRO EVENTS, Africa Ascent, KA Events, Chris Can Companies et Mamoutofu.
- CTA final, Contact, Support : WhatsApp actif sur le +228 90 95 99 53 ?
- Réseaux sociaux : comptes à afficher et leurs URL (`SOCIAL_URLS` dans `components/sections/Footer.tsx`). Tant qu'une URL vaut `null`, le réseau n'est pas affiché.

## Nouveaux contenus (octobre 2026)
- Services « Consultation », « Marketing digital » et « Représentation commerciale » : textes provisoires à valider (et zones couvertes pour la représentation).
- Réalisations : logos et captures récupérés sur les sites publics des clients. Accord de chaque client pour l'affichage de son logo : confirmé par SENOU Solutions (12/10/2026). Les captures montrent des photos de personnes issues des sites clients.
- « Gestion de pressings » et « Stock et ventes » : plateformes privées, sans capture publique. Fournir des captures anonymisées si vous souhaitez les montrer.

## Pages légales (`pages.fr.ts`, `pages.en.ts`) — à faire relire par un juriste
- NIF, RCCM et directeur de la publication (Senou EDORH) : validés. **Ne jamais publier le RIB.**
- Hébergeur (nom, adresse, contact) : à compléter. La date de mise à jour est automatique : c'est la date du dernier build/déploiement.
- Durée de conservation des données, liste des prestataires techniques, pays d'hébergement.
- Références légales togolaises (loi n° 2019-014) et autorité de protection des données : à confirmer.
- Juridiction compétente.
- Le bandeau « à relire par un juriste » a été retiré des deux pages légales.

## Divers
- Formulaire de contact : il ouvre la messagerie du visiteur (mailto) vers contact@senousolutions.com. Un envoi côté serveur pourra être branché plus tard.
