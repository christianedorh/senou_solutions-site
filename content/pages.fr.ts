// SENOU Solutions — pages intérieures et libellés d'interface (FR). Même arborescence que pages.en.ts.
// Les mentions « À VALIDER » marquent ce que Senou doit confirmer avant mise en ligne.
// Pages légales : trames à faire relire par un juriste avant mise en ligne.

export type LegalSection = { id: string; title: string; paragraphs: readonly string[]; bullets?: readonly string[] };

export const pagesFr = {
  ui: {
    skip: "Aller au contenu",
    homeLabel: "SENOU Solutions, retour à l'accueil",
    mainNav: "Navigation principale",
    mobileNav: "Navigation mobile",
    openMenu: "Ouvrir le menu",
    closeMenu: "Fermer le menu",
    langLabel: "Langue du site",
    langNames: { fr: "Français", en: "English" },
    proofLabel: "Nos engagements",
    servicesLabel: "Nos services",
    faqAll: "Voir toutes les questions",
    workVisit: "Voir le site",
    workPrivate: "Plateforme privée",
    workOpens: "(s'ouvre dans un nouvel onglet)",
    partnersLabel: "Nos partenaires",
    ctaCall: "Appeler",
    ctaWhatsapp: "Écrire sur WhatsApp",
    ctaEmail: "E-mail",
    ctaPhone: "Téléphone",
    footerFollow: "Nous suivre",
    footerAddress: "Adresse",
    toc: "Sommaire",
    legalReview: "Document en cours de validation : ce texte doit être relu par un juriste avant mise en ligne.",
    legalAsk: "Une question sur ce document ? Écrivez-nous depuis la page",
    legalAskLink: "Nous contacter",
    faqSearch: "Rechercher une question",
    faqTabs: "Catégories",
    faqAllTab: "Tout",
    faqHelp: "Vous n'avez pas trouvé votre réponse ?",
    faqHelpSupport: "Voir le support",
    faqHelpContact: "Nous contacter",
    supportTopics: "Sujets d'aide",
    supportChannels: "Nous joindre",
    supportFaqAll: "Toute la FAQ",
    brandTagline: ["votre partenaire", "digital"],
    servicesEyebrow: "Nos services",
    serviceAsk: "Parler de ce besoin",
    servicesCtaTitle: "Un besoin spécifique ?",
    servicesCtaText: "Décrivez-nous votre projet : nous vous orientons vers la bonne solution.",
    servicesCtaButton: "Nous écrire",
    workEyebrow: "Réalisations",
    workView: "Voir le projet",
    workShots: "Captures d'écran",
    workMobile: "Version mobile",
    workClose: "Fermer",
    workPrev: "Capture précédente",
    workNext: "Capture suivante",
    workShotOf: "Capture d'écran du site",
    workPrivateNote: "Plateforme privée : captures disponibles sur demande.",
    workCtaTitle: "Votre projet, le prochain ?",
    workCtaText: "Parlons de ce que vous voulez construire.",
    partnersEyebrow: "Partenaires",
    partnersIntro: "Des entreprises et des organisations avec lesquelles nous travaillons, au Togo et à l'international.",
    partnersClients: "Ils nous ont confié leur présence en ligne",
    partnersStory: "Découvrez les sites que nous avons réalisés pour nos clients et partenaires.",
    partnersStoryCta: "Voir les réalisations",
    faqEyebrow: "FAQ",
  },
  meta: {
    faq: { title: "FAQ — SENOU Solutions", description: "Les réponses à vos questions sur nos services, notre méthode, l'intégration de paiement et le suivi de vos projets." },
    contact: { title: "Nous contacter — SENOU Solutions", description: "Parlez-nous de votre projet web, mobile ou de paiement. SENOU Solutions, Lomé, Togo." },
    support: { title: "Support — SENOU Solutions", description: "Un souci sur une plateforme, une application ou un paiement que nous avons livré ? Voici comment nous joindre." },
    terms: { title: "Conditions générales — SENOU Solutions", description: "Conditions générales d'utilisation et mentions légales du site senousolutions.com." },
    privacy: { title: "Politique de confidentialité — SENOU Solutions", description: "Comment SENOU Solutions collecte, utilise et protège vos données personnelles." },
  },
  faqPage: {
    pill: "Questions fréquentes",
    title: ["Vos questions,", "nos réponses"],
    intro: "Tout ce qu'il faut savoir avant de démarrer un projet avec nous. Si vous ne trouvez pas votre réponse, écrivez-nous.",
    searchPlaceholder: "Rechercher une question…",
    empty: "Aucune question ne correspond à votre recherche.",
    categories: [
      {
        key: "services",
        title: "Nos services",
        items: [
          { q: "Quels services proposez-vous ?", a: "Des plateformes web, des applications mobiles, l'intégration de solutions de paiement, du conseil et de la consultation digitale, du marketing digital et de la représentation commerciale." },
          { q: "Pour quels types de clients ?", a: "Des PME et des grands groupes, au Togo et à l'international." },
          { q: "Intervenez-vous comme prestataire ou comme consultant ?", a: "Les deux, selon votre besoin : nous pouvons construire la solution ou vous conseiller avant de décider." },
          { q: "Proposez-vous des services SMS ?", a: "Oui. Nous disposons des agréments de l'ARCEP pour les services SMS." },
        ],
      },
      {
        key: "projet",
        title: "Déroulé d'un projet",
        items: [
          { q: "Comment démarrer un projet ?", a: "Écrivez-nous ou appelez-nous. Nous cadrons votre besoin, puis nous vous envoyons une proposition précise." },
          { q: "Comment se déroule un projet ?", a: "En quatre étapes : cadrage, conception, livraison et suivi. Vous validez le périmètre avant le développement, et nous faisons des points d'étape réguliers." },
          { q: "Combien de temps prend un projet ?", a: "Cela dépend du périmètre. Le planning est précisé dans notre proposition, une fois votre besoin cadré." },
          { q: "Travaillez-vous à distance ?", a: "Oui. Notre organisation est pensée pour travailler efficacement à distance, y compris avec des clients à l'international." },
        ],
      },
      {
        key: "paiement",
        title: "Paiement en ligne",
        items: [
          { q: "Intégrez-vous des solutions de paiement ?", a: "Oui. Nous intégrons des solutions de paiement dans vos plateformes web et mobiles." },
          { q: "Pouvez-vous ajouter le paiement à une plateforme existante ?", a: "Oui, après une étude de l'existant. Nous vous indiquons ce qui est possible et les éventuelles adaptations nécessaires." },
        ],
      },
      {
        key: "suivi",
        title: "Suivi et support",
        items: [
          { q: "Assurez-vous le suivi après la mise en ligne ?", a: "Oui. Nous restons disponibles pour corriger, améliorer et faire évoluer votre solution." },
          { q: "Comment signaler un problème ?", a: "Écrivez-nous à contact@senousolutions.com en précisant le projet concerné et le problème constaté, ou appelez-nous." },
        ],
      },
    ],
  },
  supportPage: {
    pill: "Support",
    title: ["Nous restons", "à vos côtés"],
    intro: "Vous êtes client et vous avez besoin d'aide sur une solution que nous avons livrée ? Choisissez votre sujet ou écrivez-nous directement.",
    topics: [
      { key: "web", title: "Site ou plateforme web", text: "Indisponibilité, erreur d'affichage, accès administrateur.", href: "contact" },
      { key: "mobile", title: "Application mobile", text: "Bug, mise à jour, publication sur les boutiques d'applications.", href: "contact" },
      { key: "paiement", title: "Paiements intégrés", text: "Transaction bloquée, rapprochement, paramétrage.", href: "contact" },
      { key: "evolution", title: "Évolutions", text: "Nouvelle fonctionnalité, amélioration, refonte.", href: "contact" },
      { key: "questions", title: "Questions fréquentes", text: "Nos services, notre méthode et le suivi des projets.", href: "faq" },
    ],
    urgent: {
      title: "Un service en production est bloqué ?",
      text: "Écrivez-nous en précisant le projet concerné, le problème constaté et, si possible, une capture d'écran. Pour une urgence, appelez-nous.",
      cta: "Nous contacter",
    },
    channels: [
      { key: "email", title: "Par e-mail", text: "contact@senousolutions.com", href: "mailto:contact@senousolutions.com" },
      { key: "phone", title: "Par téléphone", text: "+228 90 95 99 53", href: "tel:+22890959953" },
      { key: "whatsapp", title: "Sur WhatsApp", text: "+228 90 95 99 53", href: "https://wa.me/22890959953" }, // À VALIDER : WhatsApp actif sur ce numéro ?
      { key: "address", title: "Adresse", text: "Nyekonakpoe, Lomé, Togo" },
    ],
    faqTitle: "Les questions les plus posées",
  },
  contactPage: {
    pill: "Contact",
    title: ["Parlons de", "votre projet"],
    intro: "Un projet web, mobile ou de paiement, un besoin de conseil ? Décrivez-nous votre besoin : nous revenons vers vous rapidement avec une proposition claire.",
    form: {
      name: "Votre nom",
      company: "Entreprise (facultatif)",
      email: "Votre e-mail",
      subject: "Sujet",
      subjects: ["Nouveau projet", "Plateforme web", "Application mobile", "Intégration de paiement", "Conseil digital", "Support", "Autre"],
      message: "Votre message",
      submit: "Envoyer le message",
      hint: "En envoyant ce formulaire, votre messagerie s'ouvre avec le message prêt à partir.",
      errors: { name: "Indiquez votre nom.", email: "Indiquez un e-mail valide.", message: "Écrivez votre message (10 caractères minimum)." },
      success: "Votre messagerie s'est ouverte avec votre message. Si ce n'est pas le cas, écrivez-nous directement à contact@senousolutions.com.",
      mailSubject: "Message de",
      to: "contact@senousolutions.com",
    },
    details: [
      { key: "email", title: "E-mail", text: "contact@senousolutions.com", href: "mailto:contact@senousolutions.com" },
      { key: "phone", title: "Téléphone", text: "+228 90 95 99 53 · +33 7 45 33 29 53", href: "tel:+22890959953" },
      { key: "whatsapp", title: "WhatsApp", text: "+228 90 95 99 53", href: "https://wa.me/22890959953" }, // À VALIDER : WhatsApp actif sur ce numéro ?
      { key: "address", title: "Adresse", text: "Nyekonakpoe, Lomé, Togo" },
    ],
    socialsTitle: "Retrouvez-nous aussi sur",
  },
  termsPage: {
    pill: "Légal",
    title: ["Conditions", "générales"],
    intro: "Les conditions d'utilisation du site senousolutions.com et les informations légales sur son éditeur.",
    updated: "Dernière mise à jour : [À VALIDER : date]",
    sections: [
      {
        id: "objet",
        title: "1. Objet",
        paragraphs: [
          "Les présentes conditions générales d'utilisation (les « Conditions ») encadrent l'accès et l'utilisation du site senousolutions.com (le « Site »), édité par SENOU Solutions (« nous »).",
          "Le Site présente nos services et nos réalisations, et permet de nous contacter. En naviguant sur le Site, vous acceptez les présentes Conditions.",
        ],
      },
      {
        id: "editeur",
        title: "2. Éditeur du site",
        paragraphs: ["Le Site est édité par SENOU Solutions, dont le siège est situé à Nyekonakpoe, Lomé, Togo."],
        bullets: [
          "NIF : [À VALIDER : à copier depuis la facture]",
          "RCCM : [À VALIDER : à copier depuis la facture]",
          "Directeur de la publication : [À VALIDER : nom et fonction]",
          "Contact : contact@senousolutions.com",
        ],
      },
      {
        id: "hebergement",
        title: "3. Hébergement",
        paragraphs: ["Le Site est hébergé par [À VALIDER : nom, adresse et contact de l'hébergeur]."],
      },
      {
        id: "acces",
        title: "4. Accès au site",
        paragraphs: [
          "Le Site est accessible gratuitement. Nous faisons notre possible pour qu'il reste disponible, sans pouvoir le garantir en permanence : il peut être interrompu pour maintenance, mise à jour ou pour des raisons indépendantes de notre volonté.",
        ],
      },
      {
        id: "propriete",
        title: "5. Propriété intellectuelle",
        paragraphs: [
          "Le Site, sa structure, ses textes, son logo et ses éléments graphiques sont la propriété de SENOU Solutions, sauf mention contraire. Toute reproduction ou réutilisation sans autorisation écrite préalable est interdite.",
          "Les noms, marques et sites de nos clients et partenaires cités sur le Site restent la propriété de leurs titulaires respectifs.",
        ],
      },
      {
        id: "liens",
        title: "6. Liens vers d'autres sites",
        paragraphs: [
          "Le Site contient des liens vers des sites tiers, notamment les réalisations de nos clients. Nous n'avons pas la maîtrise de ces sites et ne sommes pas responsables de leur contenu ni de leur disponibilité.",
        ],
      },
      {
        id: "responsabilite",
        title: "7. Responsabilité",
        paragraphs: [
          "Les informations publiées sur le Site sont données à titre indicatif et peuvent évoluer. Elles ne constituent pas une offre contractuelle : chaque projet fait l'objet d'une proposition et d'un contrat dédiés.",
          "Nous ne saurions être tenus responsables des dommages résultant de l'utilisation du Site ou de l'impossibilité d'y accéder, dans les limites prévues par la loi.",
        ],
      },
      {
        id: "donnees",
        title: "8. Données personnelles",
        paragraphs: ["Le traitement des données que vous nous transmettez est décrit dans notre Politique de confidentialité."],
      },
      {
        id: "modification",
        title: "9. Modification des conditions",
        paragraphs: ["Nous pouvons modifier les présentes Conditions à tout moment. La version en vigueur est celle publiée sur le Site à la date de votre visite."],
      },
      {
        id: "droit",
        title: "10. Droit applicable",
        paragraphs: [
          "Les présentes Conditions sont soumises au droit togolais. En cas de litige, et à défaut d'accord amiable, les tribunaux compétents de Lomé seront saisis. [À VALIDER : juridiction]",
        ],
      },
    ],
  },
  privacyPage: {
    pill: "Légal",
    title: ["Politique de", "confidentialité"],
    intro: "Quelles données nous recevons quand vous nous contactez, pourquoi, et comment nous les protégeons.",
    updated: "Dernière mise à jour : [À VALIDER : date]",
    sections: [
      {
        id: "responsable",
        title: "1. Responsable du traitement",
        paragraphs: [
          "Le responsable du traitement est SENOU Solutions, Nyekonakpoe, Lomé, Togo (NIF : [À VALIDER], RCCM : [À VALIDER]). Pour toute question : contact@senousolutions.com.",
        ],
      },
      {
        id: "donnees",
        title: "2. Données que nous recevons",
        paragraphs: ["Le Site ne comporte pas d'espace client. Nous recevons uniquement les données que vous choisissez de nous transmettre :"],
        bullets: [
          "par le formulaire de contact, qui prépare un e-mail dans votre messagerie : nom, entreprise, adresse e-mail, sujet et message ;",
          "par e-mail, téléphone ou WhatsApp : vos coordonnées et le contenu de vos échanges ;",
          "des données techniques de connexion (adresse IP, navigateur, pages consultées), enregistrées par notre hébergeur pour assurer le fonctionnement et la sécurité du Site.",
        ],
      },
      {
        id: "finalites",
        title: "3. Pourquoi nous les utilisons",
        paragraphs: [],
        bullets: [
          "répondre à vos demandes et vous envoyer une proposition ;",
          "préparer, exécuter et suivre les projets qui nous sont confiés ;",
          "assurer la sécurité et le bon fonctionnement du Site.",
        ],
      },
      {
        id: "base",
        title: "4. Base légale",
        paragraphs: [
          "Nous traitons vos données sur la base de votre demande (mesures précontractuelles), de l'exécution d'un contrat lorsque vous êtes client, et de notre intérêt légitime à sécuriser le Site.",
        ],
      },
      {
        id: "cookies",
        title: "5. Cookies et stockage local",
        paragraphs: [
          "Le Site n'utilise pas de cookies publicitaires ni d'outil de mesure d'audience. Il enregistre seulement dans votre navigateur votre préférence d'affichage (fond clair ou blanc) et le fait que l'animation d'ouverture a déjà été vue. Ces informations ne nous sont pas transmises. [À VALIDER : à mettre à jour si un outil de mesure d'audience est ajouté]",
        ],
      },
      {
        id: "destinataires",
        title: "6. Destinataires",
        paragraphs: [
          "Vos données sont destinées à l'équipe de SENOU Solutions. Elles peuvent être traitées par nos prestataires techniques (hébergement, messagerie) pour notre compte. Nous ne vendons pas vos données. [À VALIDER : liste des prestataires]",
        ],
      },
      {
        id: "duree",
        title: "7. Durée de conservation",
        paragraphs: [
          "Nous conservons vos données le temps nécessaire au traitement de votre demande, puis pendant [À VALIDER : durée] à compter de notre dernier échange. Les données liées à un contrat sont conservées pendant la durée légale applicable.",
        ],
      },
      {
        id: "transferts",
        title: "8. Transferts hors du Togo",
        paragraphs: [
          "Certains prestataires techniques peuvent être situés hors du Togo. Dans ce cas, nous veillons à ce que vos données bénéficient d'un niveau de protection adapté. [À VALIDER : pays d'hébergement]",
        ],
      },
      {
        id: "securite",
        title: "9. Sécurité",
        paragraphs: ["Nous mettons en place des mesures techniques et organisationnelles raisonnables pour protéger vos données contre la perte, l'accès non autorisé ou la divulgation."],
      },
      {
        id: "droits",
        title: "10. Vos droits",
        paragraphs: [
          "Conformément à la réglementation togolaise sur la protection des données à caractère personnel (loi n° 2019-014 du 29 octobre 2019), vous disposez d'un droit d'accès, de rectification, d'opposition et de suppression de vos données.",
          "Pour les exercer, écrivez-nous à contact@senousolutions.com. Vous pouvez également saisir l'autorité de protection des données compétente au Togo. [À VALIDER : références légales et autorité, à confirmer par le juriste]",
        ],
      },
      {
        id: "modifications",
        title: "11. Modifications",
        paragraphs: ["Nous pouvons faire évoluer cette politique. La version en vigueur est celle publiée sur le Site, avec sa date de mise à jour."],
      },
    ],
  },
} as const;
