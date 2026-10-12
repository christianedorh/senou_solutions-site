// SENOU Solutions — inner pages and UI labels (EN). Must mirror pages.fr.ts key for key.
// « À VALIDER » marks what Senou must confirm before going live.
// Legal pages: drafts to be reviewed by a lawyer before going live.

export const pagesEn = {
  ui: {
    skip: "Skip to content",
    homeLabel: "SENOU Solutions, back to home",
    mainNav: "Main navigation",
    mobileNav: "Mobile navigation",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    langLabel: "Site language",
    langNames: { fr: "Français", en: "English" },
    proofLabel: "Our commitments",
    servicesLabel: "Our services",
    faqAll: "See all questions",
    workVisit: "Visit the site",
    workPrivate: "Private platform",
    workOpens: "(opens in a new tab)",
    partnersLabel: "Our partners",
    ctaCall: "Call",
    ctaWhatsapp: "Message us on WhatsApp",
    ctaEmail: "Email",
    ctaPhone: "Phone",
    footerFollow: "Follow us",
    footerAddress: "Address",
    toc: "Contents",
    legalReview: "Draft under review: this text must be reviewed by a lawyer before going live.",
    legalAsk: "A question about this document? Write to us from the",
    legalAskLink: "Contact page",
    faqSearch: "Search a question",
    faqTabs: "Categories",
    faqAllTab: "All",
    faqHelp: "Didn't find your answer?",
    faqHelpSupport: "Go to support",
    faqHelpContact: "Contact us",
    supportTopics: "Help topics",
    supportChannels: "Reach us",
    supportFaqAll: "Full FAQ",
    brandTagline: ["your digital", "partner"],
    servicesEyebrow: "Our services",
    serviceAsk: "Discuss this need",
    servicesCtaTitle: "A specific need?",
    servicesCtaText: "Tell us about your project: we will point you to the right solution.",
    servicesCtaButton: "Write to us",
    workEyebrow: "Work",
    workView: "View project",
    workShots: "Screenshots",
    workMobile: "Mobile version",
    workClose: "Close",
    workPrev: "Previous screenshot",
    workNext: "Next screenshot",
    workShotOf: "Screenshot of the website",
    workPrivateNote: "Private platform: screenshots available on request.",
    workCtaTitle: "Your project, next?",
    workCtaText: "Let's talk about what you want to build.",
    partnersEyebrow: "Partners",
    partnersIntro: "Companies and organisations we work with, in Togo and abroad.",
    partnersClients: "They trusted us with their online presence",
    partnersStory: "See the websites we built for our clients and partners.",
    partnersStoryCta: "View our work",
    faqEyebrow: "FAQ",
  },
  meta: {
    faq: { title: "FAQ — SENOU Solutions", description: "Answers to your questions about our services, our method, payment integration and project follow-up." },
    contact: { title: "Contact us — SENOU Solutions", description: "Tell us about your web, mobile or payment project. SENOU Solutions, Lomé, Togo." },
    support: { title: "Support — SENOU Solutions", description: "An issue with a platform, an app or a payment flow we delivered? Here is how to reach us." },
    terms: { title: "Terms — SENOU Solutions", description: "Terms of use and legal notice for senousolutions.com." },
    privacy: { title: "Privacy policy — SENOU Solutions", description: "How SENOU Solutions collects, uses and protects your personal data." },
  },
  faqPage: {
    pill: "Frequently asked questions",
    title: ["Your questions,", "our answers"],
    intro: "Everything you need to know before starting a project with us. If you can't find your answer, write to us.",
    searchPlaceholder: "Search a question…",
    empty: "No question matches your search.",
    categories: [
      {
        key: "services",
        title: "Our services",
        items: [
          { q: "What services do you offer?", a: "Web platforms, mobile apps, payment integration, digital consulting, digital marketing and business representation." },
          { q: "Who are your clients?", a: "SMEs and large groups, in Togo and abroad." },
          { q: "Do you work as a contractor or as a consultant?", a: "Both, depending on your needs: we can build the solution or advise you before you decide." },
          { q: "Do you offer SMS services?", a: "Yes. We hold ARCEP approvals for SMS services." },
        ],
      },
      {
        key: "projet",
        title: "How a project runs",
        items: [
          { q: "How do I start a project?", a: "Write to us or call us. We scope your needs, then send you a precise proposal." },
          { q: "How does a project unfold?", a: "In four steps: scoping, design, delivery and follow-up. You approve the scope before development, and we hold regular checkpoints." },
          { q: "How long does a project take?", a: "It depends on the scope. The schedule is set out in our proposal, once your needs are scoped." },
          { q: "Do you work remotely?", a: "Yes. Our organisation is built to work efficiently remotely, including with clients abroad." },
        ],
      },
      {
        key: "paiement",
        title: "Online payments",
        items: [
          { q: "Do you integrate payment solutions?", a: "Yes. We integrate payment solutions into your web and mobile platforms." },
          { q: "Can you add payments to an existing platform?", a: "Yes, after reviewing what is already in place. We tell you what is possible and any changes required." },
        ],
      },
      {
        key: "suivi",
        title: "Follow-up and support",
        items: [
          { q: "Do you provide support after launch?", a: "Yes. We remain available to fix, improve and evolve your solution." },
          { q: "How do I report an issue?", a: "Write to contact@senousolutions.com stating the project and the issue you noticed, or call us." },
        ],
      },
    ],
  },
  supportPage: {
    pill: "Support",
    title: ["We stay", "by your side"],
    intro: "Are you a client who needs help with a solution we delivered? Pick your topic or write to us directly.",
    topics: [
      { key: "web", title: "Website or web platform", text: "Downtime, display error, admin access.", href: "contact" },
      { key: "mobile", title: "Mobile app", text: "Bug, update, publishing to app marketplaces.", href: "contact" },
      { key: "paiement", title: "Integrated payments", text: "Blocked transaction, reconciliation, settings.", href: "contact" },
      { key: "evolution", title: "New features", text: "New feature, improvement, redesign.", href: "contact" },
      { key: "questions", title: "Frequent questions", text: "Our services, our method and project follow-up.", href: "faq" },
    ],
    urgent: {
      title: "A live service is down?",
      text: "Write to us stating the project, the issue you noticed and, if possible, a screenshot. For an emergency, call us.",
      cta: "Contact us",
    },
    channels: [
      { key: "email", title: "By email", text: "contact@senousolutions.com", href: "mailto:contact@senousolutions.com" },
      { key: "phone", title: "By phone", text: "+228 90 95 99 53", href: "tel:+22890959953" },
      { key: "whatsapp", title: "On WhatsApp", text: "+228 90 95 99 53", href: "https://wa.me/22890959953" }, // À VALIDER : WhatsApp actif sur ce numéro ?
      { key: "address", title: "Address", text: "Nyekonakpoe, Lomé, Togo" },
    ],
    faqTitle: "Most asked questions",
  },
  contactPage: {
    pill: "Contact",
    title: ["Let's talk about", "your project"],
    intro: "A web, mobile or payment project, or a need for advice? Describe what you need: we get back to you quickly with a clear proposal.",
    form: {
      name: "Your name",
      company: "Company (optional)",
      email: "Your email",
      subject: "Subject",
      subjects: ["New project", "Web platform", "Mobile app", "Payment integration", "Digital consulting", "Support", "Other"],
      message: "Your message",
      submit: "Send message",
      hint: "Sending this form opens your email app with the message ready to go.",
      errors: { name: "Please enter your name.", email: "Please enter a valid email.", message: "Please write your message (10 characters minimum)." },
      success: "Your email app has opened with your message. If it hasn't, write to us directly at contact@senousolutions.com.",
      mailSubject: "Message from",
      to: "contact@senousolutions.com",
    },
    details: [
      { key: "email", title: "Email", text: "contact@senousolutions.com", href: "mailto:contact@senousolutions.com" },
      { key: "phone", title: "Phone", text: "+228 90 95 99 53 · +33 7 45 33 29 53", href: "tel:+22890959953" },
      { key: "whatsapp", title: "WhatsApp", text: "+228 90 95 99 53", href: "https://wa.me/22890959953" }, // À VALIDER : WhatsApp actif sur ce numéro ?
      { key: "address", title: "Address", text: "Nyekonakpoe, Lomé, Togo" },
    ],
    socialsTitle: "Find us on",
  },
  termsPage: {
    pill: "Legal",
    title: ["Terms", "of use"],
    intro: "The terms of use of senousolutions.com and legal information about its publisher.",
    updated: "Last updated: [À VALIDER : date]",
    sections: [
      {
        id: "purpose",
        title: "1. Purpose",
        paragraphs: [
          "These terms of use (the “Terms”) govern access to and use of senousolutions.com (the “Site”), published by SENOU Solutions (“we”).",
          "The Site presents our services and our work, and lets you contact us. By browsing the Site, you accept these Terms.",
        ],
      },
      {
        id: "publisher",
        title: "2. Publisher",
        paragraphs: ["The Site is published by SENOU Solutions, headquartered in Nyekonakpoe, Lomé, Togo."],
        bullets: [
          "Tax ID (NIF): [À VALIDER : copy from invoice]",
          "Trade register (RCCM): [À VALIDER : copy from invoice]",
          "Publication director: [À VALIDER : name and position]",
          "Contact: contact@senousolutions.com",
        ],
      },
      {
        id: "hosting",
        title: "3. Hosting",
        paragraphs: ["The Site is hosted by [À VALIDER : hosting provider name, address and contact]."],
      },
      {
        id: "access",
        title: "4. Access to the Site",
        paragraphs: [
          "The Site is free to access. We do our best to keep it available, without being able to guarantee it at all times: it may be interrupted for maintenance, updates or reasons beyond our control.",
        ],
      },
      {
        id: "ip",
        title: "5. Intellectual property",
        paragraphs: [
          "The Site, its structure, texts, logo and graphics are the property of SENOU Solutions unless stated otherwise. Any reproduction or reuse without prior written permission is prohibited.",
          "The names, brands and websites of our clients and partners mentioned on the Site remain the property of their respective owners.",
        ],
      },
      {
        id: "links",
        title: "6. Links to other sites",
        paragraphs: [
          "The Site contains links to third-party sites, including our clients' websites. We do not control these sites and are not responsible for their content or availability.",
        ],
      },
      {
        id: "liability",
        title: "7. Liability",
        paragraphs: [
          "Information published on the Site is provided for guidance and may change. It is not a contractual offer: each project is covered by its own proposal and contract.",
          "We cannot be held liable for damage resulting from the use of the Site or from being unable to access it, within the limits set by law.",
        ],
      },
      {
        id: "data",
        title: "8. Personal data",
        paragraphs: ["How we process the data you send us is described in our Privacy policy."],
      },
      {
        id: "changes",
        title: "9. Changes to these terms",
        paragraphs: ["We may change these Terms at any time. The version in force is the one published on the Site on the date of your visit."],
      },
      {
        id: "law",
        title: "10. Governing law",
        paragraphs: [
          "These Terms are governed by Togolese law. In the event of a dispute, and failing an amicable settlement, the competent courts of Lomé shall have jurisdiction. [À VALIDER : jurisdiction]",
        ],
      },
    ],
  },
  privacyPage: {
    pill: "Legal",
    title: ["Privacy", "policy"],
    intro: "What data we receive when you contact us, why, and how we protect it.",
    updated: "Last updated: [À VALIDER : date]",
    sections: [
      {
        id: "controller",
        title: "1. Data controller",
        paragraphs: [
          "The data controller is SENOU Solutions, Nyekonakpoe, Lomé, Togo (NIF: [À VALIDER], RCCM: [À VALIDER]). For any question: contact@senousolutions.com.",
        ],
      },
      {
        id: "data",
        title: "2. Data we receive",
        paragraphs: ["The Site has no client area. We only receive the data you choose to send us:"],
        bullets: [
          "through the contact form, which prepares an email in your email app: name, company, email address, subject and message;",
          "by email, phone or WhatsApp: your contact details and the content of our exchanges;",
          "technical connection data (IP address, browser, pages viewed), logged by our hosting provider to run and secure the Site.",
        ],
      },
      {
        id: "purposes",
        title: "3. Why we use it",
        paragraphs: [],
        bullets: [
          "to answer your requests and send you a proposal;",
          "to prepare, carry out and follow up the projects entrusted to us;",
          "to keep the Site secure and working properly.",
        ],
      },
      {
        id: "basis",
        title: "4. Legal basis",
        paragraphs: [
          "We process your data on the basis of your request (pre-contractual steps), the performance of a contract when you are a client, and our legitimate interest in securing the Site.",
        ],
      },
      {
        id: "cookies",
        title: "5. Cookies and local storage",
        paragraphs: [
          "The Site uses no advertising cookies and no audience measurement tool. It only stores in your browser your display preference (light or white background) and whether the opening animation has already been shown. This information is not sent to us. [À VALIDER : update if an analytics tool is added]",
        ],
      },
      {
        id: "recipients",
        title: "6. Recipients",
        paragraphs: [
          "Your data is intended for the SENOU Solutions team. It may be processed on our behalf by our technical providers (hosting, email). We do not sell your data. [À VALIDER : list of providers]",
        ],
      },
      {
        id: "retention",
        title: "7. Retention",
        paragraphs: [
          "We keep your data for as long as needed to handle your request, then for [À VALIDER : duration] after our last exchange. Contract-related data is kept for the applicable legal period.",
        ],
      },
      {
        id: "transfers",
        title: "8. Transfers outside Togo",
        paragraphs: [
          "Some technical providers may be located outside Togo. In that case, we make sure your data benefits from an appropriate level of protection. [À VALIDER : hosting country]",
        ],
      },
      {
        id: "security",
        title: "9. Security",
        paragraphs: ["We apply reasonable technical and organisational measures to protect your data against loss, unauthorised access or disclosure."],
      },
      {
        id: "rights",
        title: "10. Your rights",
        paragraphs: [
          "Under Togolese personal data protection law (Law No. 2019-014 of 29 October 2019), you have the right to access, rectify, object to and delete your data.",
          "To exercise these rights, write to contact@senousolutions.com. You may also contact the competent data protection authority in Togo. [À VALIDER : legal references and authority, to be confirmed by the lawyer]",
        ],
      },
      {
        id: "updates",
        title: "11. Changes",
        paragraphs: ["We may update this policy. The version in force is the one published on the Site, with its last updated date."],
      },
    ],
  },
} as const;
