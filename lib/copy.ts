// Copie centralisée de la landing inawa.org.
// Voix : tutoiement, chaleureuse, sans jargon (cf. note fondatrice inawa-landing.md).
// Aucune chaîne marketing en dur dans les composants : tout passe par cet objet.

export const SITE = {
  name: "Inawa",
  founder: "Jan Tumpach",
  role: "Product Manager freelance",
  email: "jan@inawa.org",
  calendly: "https://calendly.com/jrth92/30min",
  baseUrl: "https://inawa.org",
  socials: {
    github: "https://github.com/japaris",
    instagram: "https://instagram.com/j_in_paris",
    facebook: "https://facebook.com/jan.r.tumpach",
    linkedin: "https://linkedin.com/in/jan-tumpach",
  },
} as const;

export const LANDING = {
  nav: [
    { label: "Comment on travaille", href: "#methode" },
    { label: "Les bonnes questions", href: "#questions" },
    { label: "Réalisations", href: "#realisations" },
    { label: "Parlons-en", href: "#contact" },
  ],

  hero: {
    eyebrow: "Product Manager freelance",
    title: "Tu as une idée. Construisons le projet.",
    lead: "Une idée ne manque jamais. Ce qui manque, c'est la structure qui la transforme en projet qui tient debout. C'est mon métier.",
    sub: "Je t'accompagne, du pourquoi profond jusqu'au premier pas concret, pour que ton projet avance dans le bon ordre.",
    ctaPrimary: "Réserver un échange de 30 minutes",
    ctaSecondary: "M'écrire un message",
    note: "À la fin de l'échange : une vision claire de tes prochaines étapes.",
  },

  pourQui: {
    title: "Pour qui ?",
    body: "Pour le porteur de projet qui a une intuition forte mais pas encore de cap clair. Que ton idée soit encore floue ou déjà en route, quel que soit ton domaine : une boutique en ligne, une activité de yoga ou de reiki, une application, ou vivre de ton contenu.",
  },

  promesse: {
    title: "La promesse",
    body: "Je t'aide à poser ton projet dans le bon ordre, du pourquoi profond jusqu'au premier pas concret. Tu repars avec un document fondateur clair, qui te sert de boussole quand le doute revient.",
    quote: "Je ne me contente pas de recommander. Je construis.",
  },

  methode: {
    title: "Comment on travaille",
    intro:
      "Je ne lis pas deux porteurs de la même manière. D'abord, je comprends où tu en es : la nature de ton projet, ton rapport à la structure, le stade de ton idée, et ce qui te pousse à te lancer maintenant. Ensuite, on descend ensemble, strate par strate.",
    strates: [
      {
        num: "01",
        name: "Vision",
        body: "Le changement que tu veux voir dans le monde.",
      },
      {
        num: "02",
        name: "Mission",
        body: "Ce que tu proposes, à qui, et pour quel bénéfice.",
      },
      {
        num: "03",
        name: "Stratégie",
        body: "Pourquoi on te choisira toi, et comment ton projet dure.",
      },
      {
        num: "04",
        name: "Tactique",
        body: "Les grands chantiers pour démarrer.",
      },
      {
        num: "05",
        name: "Opérationnel",
        body: "Ce que tu fais dès cette semaine.",
      },
    ],
  },

  questions: {
    title: "On commence par les bonnes questions",
    intro:
      "Avant de parler de logo, de prix ou de site web, voici le genre de questions qu'on se pose ensemble :",
    items: [
      "Quel changement veux-tu voir dans la vie des personnes que tu veux servir ?",
      "Pour qui fais-tu cela, précisément, et quel manque viens-tu combler ?",
      "Pourquoi te choisira-t-on toi plutôt qu'une autre solution ?",
      "Quelles sont les trois choses à mettre en place pour démarrer ?",
      "Quelle est la toute première chose que tu peux faire dès cette semaine ?",
    ],
    closing:
      "Si ces questions te donnent envie d'y répondre sérieusement, on est faits pour travailler ensemble.",
  },

  // Placeholders assumés : à remplacer par de vrais témoignages (cf. brief, Lot 2).
  temoignages: {
    title: "Ils ont posé leur projet avec moi",
    note: "Témoignages en cours de collecte.",
    items: [
      {
        quote:
          "Témoignage à venir. Cet espace accueillera le retour d'un porteur de projet accompagné, avec un résultat concret.",
        author: "Prénom N.",
        context: "Projet accompagné",
        placeholder: true,
      },
      {
        quote:
          "Témoignage à venir. Cet espace accueillera le retour d'un porteur de projet accompagné, avec un résultat concret.",
        author: "Prénom N.",
        context: "Projet accompagné",
        placeholder: true,
      },
      {
        quote:
          "Témoignage à venir. Cet espace accueillera le retour d'un porteur de projet accompagné, avec un résultat concret.",
        author: "Prénom N.",
        context: "Projet accompagné",
        placeholder: true,
      },
    ],
  },

  realisations: {
    title: "Des projets que j'ai construits",
    intro:
      "Des produits que je porte ou que j'ai accompagnés, de la vision jusqu'à la mise en marché.",
    items: [
      {
        name: "TandaBuilder",
        tag: "Logiciel macOS",
        body: "Outil professionnel pour les DJs de tango : structuration métier et exécution produit.",
        href: "https://tandabuilder.com/",
      },
      {
        name: "MediaLuna",
        tag: "Plateforme web",
        body: "Gestion d'événements de tango en modèle admission-first : pré-inscription, sélection, paiement.",
        href: "https://medialuna.org/",
      },
      {
        name: "Lexiqo",
        tag: "Jeu multi-plateformes",
        body: "Jeu sémantique pensé pour durer : vision claire, parcours sobre, lancement réel.",
        href: null,
      },
      {
        name: "Us",
        tag: "Application iOS et Android",
        body: "Espace privé pour une relation : vision claire, parcours sobre, lancement réel.",
        href: null,
      },
    ],
  },

  contact: {
    title: "Parlons de ton projet",
    body: "Repars avec une vision claire de tes prochaines priorités. Je te dirai honnêtement si je peux t'aider.",
    ctaCalendly: "Réserver 30 minutes",
    formIntro: "Tu préfères écrire d'abord ? Laisse-moi un mot.",
    fields: {
      name: "Ton nom",
      email: "Ton email",
      idea: "Ton projet en quelques mots",
      submit: "Envoyer",
    },
    stages: {
      legend: "Où en es-tu ?",
      options: [
        { value: "clarifier", label: "Clarifier la vision" },
        { value: "structurer", label: "Structurer le projet" },
        { value: "lancer", label: "Lancer ou itérer" },
      ],
    },
  },

  footer: {
    values: "Clarté · Structure · Exécution · Fiabilité",
    legal: "Mentions légales",
    rights: "Tous droits réservés.",
  },
} as const;
