import { ServiceItem, Testimonial, PricingPlan, FAQItem, NeedCategory } from '../types';

export const HERO_DATA = {
  eyebrow: "MASSOTHÉRAPIE À MONTRÉAL",
  title: "Libérez votre corps des tensions et retrouvez votre énergie",
  subtitle: "Soins personnalisés pour soulager la douleur, réduire le stress et retrouver votre bien-être à Montréal.",
  ctaPrimary: "Demander un rendez-vous",
  microTrust: ["Réponse rapide", "Ambiance apaisante", "Sur rendez-vous", "Reçus d'assurance fournis"],
  experienceYears: "25+ ans",
  experienceLabel: "d'expérience professionnelle",
};

export const BENEFITS_DATA = [
  {
    icon: "Moon",
    title: "Réduction du stress",
    description: "Relâchez les tensions mentales et physiques pour retrouver un calme intérieur profond et durable."
  },
  {
    icon: "HeartPulse",
    title: "Soulagement des douleurs",
    description: "Atténuez cibléement vos douleurs musculaires, articulaires et tensions cervicales chroniques."
  },
  {
    icon: "Sparkles",
    title: "Meilleure circulation",
    description: "Stimulez votre vitalité naturelle et retrouvez une sensation de légèreté et de bien-être."
  }
];

export const NEED_CATEGORIES: NeedCategory[] = [
  {
    id: "muscle-pain",
    title: "Douleurs musculaires",
    iconName: "HeartHandshake",
    recommendedServiceId: "therapeutic",
    description: "Soulagement ciblé des nuds, contractures, maux de dos et raideurs musculaires."
  },
  {
    id: "stress-fatigue",
    title: "Stress et fatigue",
    iconName: "Moon",
    recommendedServiceId: "relaxation",
    description: "Pause régénératrice profonde pour apaiser le système nerveux et récupérer de l'épuisement."
  },
  {
    id: "daily-tensions",
    title: "Tensions du quotidien",
    iconName: "ZapOff",
    recommendedServiceId: "therapeutic",
    description: "Relâchement postural des épaules, du cou et des lombaires liés au travail sur écran."
  },
  {
    id: "pregnancy",
    title: "Grossesse",
    iconName: "Baby",
    recommendedServiceId: "pregnancy-care",
    description: "Soin doux et sécuritaire adapté aux besoins de la femme enceinte (posture, jambes lourdes)."
  },
  {
    id: "sports-recovery",
    title: "Récupération sportive",
    iconName: "Activity",
    recommendedServiceId: "therapeutic",
    description: "Préparation musculaire et accélération de la récupération après l'effort intense."
  }
];

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: "therapeutic",
    category: "therapeutic",
    title: "Techniques thérapeutiques",
    description: "Approches ciblées pour traiter les tensions profondes, réaligner le corps et réduire les douleurs.",
    items: [
      "Massage thérapeutique",
      "Massage sportif",
      "Réflexologie",
      "Femme enceinte",
      "Massage suédois"
    ]
  },
  {
    id: "relaxation",
    category: "relaxation",
    title: "Relaxation profonde",
    description: "Soins enveloppants favorisant un lâcher-prise total et un rééquilibrage énergétique.",
    items: [
      "Lomi-Lomi (Hawaïen)",
      "Deep tissue (Tissus profonds)",
      "Shiatsu",
      "Massage pour Enfants",
      "Massage aux bâtons de Bamboo"
    ]
  },
  {
    id: "alternative",
    category: "alternative",
    title: "Soins alternatifs & Visage",
    description: "Techniques complémentaires combinant soin cutané, détente crânienne et myofasciale.",
    items: [
      "Myofit / Soins du visage",
      "Détente crânienne & cervicale",
      "Drainage lymphatique doux"
    ]
  }
];

export const PROCESS_STEPS = [
  {
    stepNumber: "1",
    title: "Prenez contact facilement",
    description: "Appelez directement au 514-746-5381 ou remplissez notre formulaire de contact selon votre préférence."
  },
  {
    stepNumber: "2",
    title: "Échange & confirmation",
    description: "Jitany convient avec vous du créneau idéal et prend le temps de comprendre vos besoins spécifiques."
  },
  {
    stepNumber: "3",
    title: "Votre soin au cabinet",
    description: "Profitez d'un moment de détente ou de soulagement au 3795 Rue Masson. Reçu d'assurance remis sur place."
  }
];

export const ABOUT_JITANY = {
  title: "Une approche humaine et bienveillante",
  p1: "Depuis 25 ans, j'accompagne mes clients vers un mieux-être durable avec empathie, écoute attentive et un grand professionnalisme.",
  p2: "Formée au Mexique, j'ai développé une expertise unique dans le toucher thérapeutique et l'écoute bienveillante du corps. Chaque soin est entièrement personnalisé selon vos besoins physiques et émotionnels.",
  pCoaching: "{{COACHING_CREDENTIAL}}",
  p3: "Ma vocation : vous offrir un espace de détente chaleureux où vous vous sentirez véritablement écouté, respecté et accompagné.",
  badges: [
    { text: "25+ ans d'expérience", icon: "Award" },
    { text: "Approche personnalisée", icon: "Heart" },
    { text: "+100 clients satisfaits", icon: "Users" },
    { text: "Reçus d'assurance fournis", icon: "ShieldCheck" }
  ],
  certifications: [
    {
      id: "cert-1",
      title: "Association Professionnelle de Massothérapie",
      association: "{{CERTIFICATION_NAME}}",
      badge: "Reconnue pour Assurances",
      icon: "ShieldCheck"
    },
    {
      id: "cert-2",
      title: "Association Professionnelle",
      association: "{{CERTIFICATION_NAME}}",
      badge: "Thérapeute Certifiée",
      icon: "Award"
    },
    {
      id: "cert-3",
      title: "Regroupement des Soins Prénataux",
      association: "Spécialisation Maternité & Grossesse",
      badge: "Accréditation Spécialisée",
      icon: "FileCheck"
    }
  ]
};

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: "t1",
    name: "Sophie M.",
    treatment: "Massage Thérapeutique",
    quote: "Jitany est d'une écoute rare et son approche personnalisée m'a apporté un réel soulagement et une belle détente.",
    stars: 5
  },
  {
    id: "t2",
    name: "Camille L.",
    treatment: "Massage prénatal",
    quote: "Un soin prénatal exceptionnel. Je me suis sentie en totale confiance, détendue et beaucoup plus légère.",
    stars: 5
  },
  {
    id: "t3",
    name: "Marc-André T.",
    treatment: "Massage Thérapeutique & Deep Tissue",
    quote: "25 ans d'expérience qui se ressentent immédiatement dans la précision du geste. Le reçu d'assurance a été envoyé directement, très professionnel.",
    stars: 5
  },
  {
    id: "t4",
    name: "Éléonore B.",
    treatment: "Massage de Détente",
    quote: "L'ambiance au cabinet sur la rue Masson est apaisante et chaleureuse. On ressort régénéré et léger.",
    stars: 5
  }
];

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: "60-min",
    title: "Essentiel",
    price: 120,
    duration: "60 minutes",
    description: "Séance complète de massothérapie personnalisée",
    features: [
      "Consultation rapide de départ",
      "Massage ciblé de la zone de tension",
      "Technique personnalisée (Suédois/Deep)",
      "Reçu pour assurance disponible"
    ]
  },
  {
    id: "90-min",
    title: "Relaxation totale",
    price: 140,
    duration: "90 minutes",
    description: "Séance approfondie pour une relaxation totale du corps entier",
    highlight: "Le plus choisi",
    isPopular: true,
    features: [
      "Consultation approfondie offerte",
      "Soin corps entier + travail spécifique",
      "Combinaison de techniques sur-mesure",
      "Temps de détente et tisane apaisante",
      "Reçu pour assurance disponible"
    ]
  }
];

export const PREGNANCY_SECTION = {
  title: "Massothérapie durant la grossesse",
  description: "Un accompagnement sécuritaire et bienveillant spécialement adapté aux futures mamans à partir du 2e trimestre.",
  bulletPoints: [
    "Soulagement des tensions lombaires et musculaires",
    "Réduction de la sensation de lourdeur et détente articulaire",
    "Amélioration de la circulation et du sommeil réparateur",
    "Moment précieux de détente et de connexion avec votre bébé"
  ],
  ctaText: "Prendre rendez-vous"
};

export const FAQ_DATA: FAQItem[] = [
  {
    question: "Quel soin choisir ?",
    answer: "Le choix dépend de vos besoins du moment. Pour des tensions ciblées (dos, nuque), optez pour le massage thérapeutique ou le massage sportif. Pour la relaxation et le lâcher-prise, le massage suédois ou Lomi-Lomi est idéal. N'hésitez pas à me contacter par téléphone pour un conseil personnalisé !"
  },
  {
    question: "Le massage convient-il pendant la grossesse ?",
    answer: "Oui, tout à fait ! La massothérapie est très bénéfique pendant la grossesse dès le 2ème trimestre (à partir de 12 semaines). Les postures sont adaptées avec des coussins d'allaitement pour assurer votre confort et la sécurité totale du bébé."
  },
  {
    question: "Combien de temps dure une séance ?",
    answer: "Les séances durent généralement 60 minutes ou 90 minutes. La séance de 90 minutes est vivement recommandée si vous souhaitez travailler plusieurs zones en profondeur tout en profitant d'une relaxation générale du corps entier."
  },
  {
    question: "Délivrez-vous des reçus pour les assurances ?",
    answer: "Oui ! En tant que massothérapeute professionnelle agréée (membre d'association reconnue au Québec), je vous remets un reçu officiel pour votre assurance privée après chaque séance. Reçus valides selon votre couverture — vérifiez auprès de votre assureur."
  },
  {
    question: "Où êtes-vous situé ?",
    answer: "Le cabinet KinéLibelula est situé au 3795 Rue Masson, Montréal (Québec). L'espace est chaleureux, très calme, propre et facilement accessible en transport ou en voiture."
  },
  {
    question: "Comment prendre rendez-vous ?",
    answer: "Vous pouvez simplement m'envoyer une demande de rendez-vous via le formulaire en ligne ou m'appeler directement au 514-746-5381. Je vous recontacterai avec grand plaisir dans les plus brefs délais pour convenir ensemble du moment idéal."
  }
];

export const PRACTICAL_INFO = {
  addressTitle: "Adresse du cabinet",
  addressLine1: "3795 Rue Masson",
  addressLine2: "Montréal, Québec H1X 1S7",
  phone: "514-746-5381",
  email: "jitany.jara@kinelibelula.ca",
  hours: [
    { days: "Lundi à Jeudi", hours: "10h à 21h" },
    { days: "Vendredi", hours: "10h à 17h" },
    { days: "Samedi - Dimanche", hours: "Sur rendez-vous uniquement" }
  ]
};
