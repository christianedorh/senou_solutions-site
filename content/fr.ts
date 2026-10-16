// SENOU Solutions — contenus FR. Même arborescence pour en.ts (parité obligatoire).
// Les commentaires « À VALIDER » marquent ce que Senou doit confirmer avant mise en ligne.
export const fr = {
  meta: {
    title: "SENOU Solutions — Solutions digitales et fintech sur mesure",
    description:
      "SENOU Solutions conçoit et livre des plateformes web, des applications mobiles et des intégrations de paiement pour les PME et les grands groupes, au Togo et à l'international.",
  },
  preloader: { words: ["Concevoir", "Intégrer", "Livrer"], brand: "SENOU" },
  nav: {
    links: [
      { label: "Services", href: "/#services" },
      { label: "Méthode", href: "/#methode" },
      { label: "Réalisations", href: "/#realisations" },
      { label: "Partenaires", href: "/#partenaires" },
      { label: "FAQ", href: "/faq" },
    ],
    cta: "Démarrer un projet",
    lang: ["FR", "EN"],
    theme: { toWhite: "Passer au fond blanc", toPaper: "Passer au fond clair" },
  },
  hero: {
    pill: "Fintech et solutions digitales · Lomé, Togo",
    titleLines: ["Le digital sur mesure, simple et utile,", "avec vous où que vous soyez."],
    before: "Nous construisons",
    rotating: ["vos plateformes web", "vos applications mobiles", "vos paiements intégrés"],
    text: "SENOU Solutions conçoit et livre des solutions digitales à valeur ajoutée pour les PME et les grands groupes, au Togo comme à l'international. Prestataire ou consultant, selon votre besoin.",
    proof: "5 ans d'expérience · plus de 40 projets depuis 2021",
    cta: { primary: "Démarrer un projet", secondary: "Voir nos réalisations" },
  },
  proof: {
    items: ["Plus de 40 projets depuis 2021", "9 grands projets livrés ou en cours", "Équipe réactive, travail 100 % à distance"],
    marquee: ["Web", "Mobile", "Paiement", "SMS", "Fintech", "Plateformes de gestion", "Conseil", "International"],
  },
  services: {
    title: ["Ce que nous", "faisons pour vous"],
    items: [
      { key: "web", title: "Plateformes web", text: "Sites, portails et plateformes de gestion sur mesure, pensés pour votre activité et prêts à évoluer." },
      { key: "mobile", title: "Applications mobiles", text: "Des applications fluides, de la conception à la publication, pour vos clients et vos équipes." },
      { key: "paiement", title: "Intégration de paiement", text: "Nous intégrons des solutions de paiement à vos plateformes pour encaisser simplement et en sécurité." }, // À VALIDER : citer les opérateurs/solutions intégrés
      { key: "conseil", title: "Conseil digital", text: "Cadrage, cahier des charges, choix techniques : nous vous aidons à décider avant de construire." },
      { key: "consultation", title: "Consultation", text: "Un regard expert sur vos projets digitaux : audit de l'existant, recommandations et accompagnement de vos équipes." }, // À VALIDER : texte
      { key: "marketing", title: "Marketing digital", text: "Réseaux sociaux, référencement, campagnes en ligne : nous rendons votre activité visible auprès des bonnes personnes." }, // À VALIDER : texte
      { key: "representation", title: "Représentation commerciale", text: "Nous représentons vos produits et services auprès de vos prospects et partenaires, pour développer votre activité." }, // À VALIDER : texte et zones couvertes
    ],
  },
  capabilities: {
    pill: "Une équipe, toute la chaîne",
    title: ["Du besoin", "à la mise en ligne"],
    tiles: {
      remote: { title: "100 % à distance", text: "Nous travaillons efficacement avec des clients du monde entier, sans déplacements inutiles." },
      reactive: { title: "Réactivité", text: "Nous anticipons vos problèmes et lançons la solution dès que le cadre est posé." },
      sms: { title: "Services SMS", text: "Des solutions d'envoi de SMS pour vos communications avec vos clients." },
      payments: { title: "Paiements intégrés", text: "Des parcours de paiement intégrés directement dans vos plateformes." },
      platforms: { title: "Plateformes de gestion", text: "Stock et ventes, pressings, suivi agropastoral : des outils métier concrets." },
      flexible: { title: "Méthode souple", text: "Un cadre clair, mais assez de souplesse pour s'adapter à votre réalité." },
    },
  },
  method: {
    id: "methode",
    title: ["Une méthode", "simple et claire"],
    text: "Vous posez le cadre, nous nous occupons du reste, et nous gardons le contact tout au long du projet.",
    steps: [
      { n: "01", title: "Cadrage", text: "Nous comprenons votre besoin, vos contraintes et vos objectifs." },
      { n: "02", title: "Conception", text: "Nous proposons une solution et un périmètre précis, que vous validez." },
      { n: "03", title: "Livraison", text: "Nous développons, testons et mettons en ligne, avec des points d'étape réguliers." },
      { n: "04", title: "Suivi", text: "Nous restons disponibles pour corriger, améliorer et faire évoluer." },
    ],
  },
  work: {
    id: "realisations",
    title: ["Quelques", "réalisations"],
    text: "Des plateformes en production, pour des clients au Togo et à l'international.",
    items: [
      { name: "CentralResource", url: "https://centralresource.net", tag: "Plateforme web", text: "Plateforme avec espaces administrateur, client et prestataire." },
      { name: "GESFARM", url: "https://gesfarm-frontend.vercel.app/", tag: "Agritech", text: "Plateforme de gestion et de suivi agropastoral." },
      { name: "Gestion de pressings", url: "https://pressing.senousolutions.com/login", tag: "Plateforme de gestion", text: "Plateforme de gestion de multipressings." },
      { name: "Stock et ventes", url: "https://teststock.senousolutions.com/signin", tag: "Plateforme de gestion", text: "Plateforme de gestion de stock et de vente." },
      { name: "KDA PRO EVENTS", url: "https://kdaproevents.com", tag: "Site web", text: "Présence en ligne de KDA PRO EVENTS." }, // À VALIDER : description
      { name: "Africa Ascent", url: "https://africaascent.org", tag: "Site web", text: "Site de la Fondation Africa Ascent." }, // À VALIDER : description
      { name: "KA Events", url: "https://kaevents.net", tag: "Site web", text: "Site événementiel." }, // À VALIDER : description
      { name: "Chris Can Companies", url: "https://chriscancompanies.com", tag: "Site web", text: "Site institutionnel." }, // À VALIDER : description
      { name: "Mamoutofu", url: "https://mamoutofu.com", tag: "Site web", text: "Site vitrine." }, // À VALIDER : description
    ],
  },
  numbers: {
    title: "Des chiffres, pas des promesses.",
    stats: [
      { value: 5, suffix: " ans", label: "d'expérience" },
      { value: 40, suffix: "+", label: "projets depuis 2021" },
      { value: 9, suffix: "", label: "grands projets" },
    ],
    note: "En 2026 : 4 grands projets, dont 3 déjà livrés.",
  },
  partners: {
    id: "partenaires",
    title: ["Ils nous", "font confiance"],
    items: [
      { name: "LAFRICAMOBILE", url: null },
      { name: "KDA PRO EVENTS", url: "https://kdaproevents.com" },
      { name: "Fondation Africa Ascent", url: "https://africaascent.org" },
      { name: "SPARK CORPORATION", url: null },
    ],
    // Pas de témoignages inventés : à ajouter seulement quand de vrais avis sont disponibles.
  },
  faq: {
    title: ["Questions", "fréquentes"],
    items: [
      { q: "Quels services proposez-vous ?", a: "Des plateformes web, des applications mobiles, l'intégration de solutions de paiement, du conseil et de la consultation digitale, du marketing digital et de la représentation commerciale." },
      { q: "Travaillez-vous à distance ?", a: "Oui. Notre organisation est pensée pour travailler efficacement à distance, y compris avec des clients à l'international." },
      { q: "Pour quels types de clients ?", a: "Des PME et des grands groupes, au Togo et à l'international." },
      { q: "Comment démarrer un projet ?", a: "Écrivez-nous ou appelez-nous. Nous cadrons votre besoin, puis nous vous envoyons une proposition précise." },
      { q: "Intégrez-vous des solutions de paiement ?", a: "Oui. Nous intégrons des solutions de paiement dans vos plateformes web et mobiles." },
      { q: "Intervenez-vous comme prestataire ou comme consultant ?", a: "Les deux, selon votre besoin : nous pouvons construire la solution ou vous conseiller avant de décider." },
    ],
  },
  finalCta: {
    title: ["Parlons de", "votre projet."],
    text: "Dites-nous ce que vous voulez construire. Nous revenons vers vous rapidement avec une proposition claire.",
    primary: "Nous écrire",
    email: "contact@senousolutions.com",
    phones: ["+228 90 95 99 53", "+33 7 45 33 29 53"],
    whatsapp: "https://wa.me/22890959953", // À VALIDER : WhatsApp actif sur ce numéro ?
  },
  footer: {
    tagline: "Le digital sur mesure, simple et utile, avec vous où que vous soyez.",
    columns: [
      { title: "Entreprise", links: [{ label: "Services", href: "/#services" }, { label: "Méthode", href: "/#methode" }, { label: "Réalisations", href: "/#realisations" }, { label: "Partenaires", href: "/#partenaires" }, { label: "FAQ", href: "/faq" }] },
      { title: "Légal", links: [{ label: "Conditions générales", href: "/conditions-generales" }, { label: "Politique de confidentialité", href: "/politique-de-confidentialite" }] },
      { title: "Contact", links: [{ label: "Nous contacter", href: "/contact" }, { label: "Support", href: "/support" }] },
    ],
    address: "Nyekonakpoe, Lomé, Togo",
    socials: ["LinkedIn"], // À VALIDER : comptes à afficher
    copyright: "© 2026 SENOU Solutions. Tous droits réservés.",
  },
} as const;

export type Fr = typeof fr;
