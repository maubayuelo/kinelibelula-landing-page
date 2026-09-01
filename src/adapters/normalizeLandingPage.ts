import type { WpLandingPage, WpMediaEdge } from '../types/wordpress';
import {
  HERO_DATA,
  BENEFITS_DATA,
  NEED_CATEGORIES,
  SERVICES_DATA,
  PROCESS_STEPS,
  ABOUT_JITANY,
  TESTIMONIALS_DATA,
  PRICING_PLANS,
  PREGNANCY_SECTION,
  FAQ_DATA,
  PRACTICAL_INFO,
} from '../data/landingData';
import { getUiLabels, type UiLabels } from '../i18n/uiLabels';
import heroImg from '../assets/images/hero_massage_spa_1785157453784.jpg';
import therapistImg from '../assets/images/therapist_jitany_jara_1785157479499.jpg';
import pregnancyImg from '../assets/images/pregnancy_massage_nature_1785157465957.jpg';

export interface ResolvedImage {
  url: string;
  alt: string;
}

// A section heading: `titleHighlight`, when set, must occur verbatim inside
// `title` — the component styles that occurrence wherever it falls, never a
// hardcoded position. Sections with no live highlight field (process,
// pricing) just never set it. `eyebrow`/`subtitle` are independent,
// per-field fallbacks (unlike title/titleHighlight, they're not a matched
// pair with each other).
export interface SectionHeading {
  eyebrow: string;
  title: string;
  titleHighlight?: string;
  subtitle: string;
}

export type PricingPlanWithCta = (typeof PRICING_PLANS)[number] & { ctaLabel: string };
export type ServiceCardWithCta = (typeof SERVICES_DATA)[number] & { ctaLabel: string };
export type NeedCategoryWithCta = (typeof NEED_CATEGORIES)[number] & {
  recommendedLabel: string;
  recommendedDetails: string;
  ctaLabel: string;
};
export type ProcessStepWithNote = (typeof PROCESS_STEPS)[number] & { note: string };
export type TestimonialWithMeta = (typeof TESTIMONIALS_DATA)[number] & { meta: string };

export interface NavLink {
  label: string;
  anchor: string;
}

// Aggregate shape of everything the section components consume today, plus an
// `image` field per section that has one. The static consts in landingData.ts
// have no image field of their own (components import the local jpg directly),
// so the static fallback image is attached here instead of in landingData.ts.
export interface LandingData {
  // UI-only chrome text with no ACF field (fixed words, quote-mark
  // conventions) — see src/i18n/uiLabels.ts. Selected once here from
  // `wp.language?.code`, the same signal the old dayLabelsFor() used, so
  // components never branch on locale themselves.
  uiLabels: UiLabels;
  hero: typeof HERO_DATA & {
    titleHighlight?: string;
    ctaSecondaryLabel: string;
    insuranceLine: string;
    image: ResolvedImage;
  };
  benefits: typeof BENEFITS_DATA;
  benefitsHeading: SectionHeading;
  needCategories: NeedCategoryWithCta[];
  // No `needsTitleHighlight` field exists in the schema, unlike other
  // section headings — `title` renders plain, never a highlighted fragment.
  needsHeading: SectionHeading;
  needsCtaLabel: string;
  services: ServiceCardWithCta[];
  servicesHeading: SectionHeading;
  processSteps: ProcessStepWithNote[];
  processHeading: SectionHeading;
  aboutJitany: Omit<typeof ABOUT_JITANY, 'certifications'> & {
    titleHighlight?: string;
    eyebrow: string;
    imageCaption: string;
    imageCaptionAttribution: string;
    certEyebrow: string;
    certTitle: string;
    certSubtitle: string;
    certFootnote: string;
    certifications: ((typeof ABOUT_JITANY.certifications)[number] & { footnote: string })[];
    image: ResolvedImage;
  };
  testimonials: TestimonialWithMeta[];
  testimonialsHeading: SectionHeading;
  testimonialsSocialProof: string;
  testimonialsDisclaimer: string;
  pricingPlans: PricingPlanWithCta[];
  pricingHeading: SectionHeading;
  pricingFooterNote: string;
  pricingPaymentNote: string;
  pregnancy: typeof PREGNANCY_SECTION & {
    titleHighlight?: string;
    eyebrow: string;
    badgeNote: string;
    medicalNote: string;
    image: ResolvedImage;
  };
  faq: typeof FAQ_DATA;
  faqHeading: SectionHeading;
  // Field name kept as `practicalInfo` (not renamed to `contact`) even though
  // the component and ACF group are both now "Contact" — renaming this key
  // would also touch Header/Footer, which read `phone`/`addressLine1` from
  // the same object and weren't part of this batch's scope.
  practicalInfo: typeof PRACTICAL_INFO & {
    eyebrow: string;
    title: string;
    titleHighlight?: string;
    subtitle: string;
    addressHeading: string;
    districtLabel: string;
    accessNote: string;
    directHeading: string;
    directSubheading: string;
    directNote: string;
    ctaPrimaryLabel: string;
    ctaSecondaryLabel: string;
    ctaEmailLabel: string;
    phoneDigits: string;
    hoursHeading: string;
    hoursNote: string;
  };
  finalCta: {
    eyebrow: string;
    title: string;
    titleHighlight?: string;
    text: string;
    buttonLabel: string;
    buttonLink: string;
    insuranceNote: string;
  };
  global: {
    announcementText: string;
    insuranceDisclaimer: string;
    // Sourced from landingHeader.headerCtaLabel — the one generic "book
    // now" CTA label reused verbatim across ~9 components, not specific
    // to the header.
    ctaLabel: string;
  };
  header: {
    businessName: string;
    tagline: string;
    // headerNavItems is currently null in WP (repeater content didn't
    // carry over from the Options Page move) — degrades to the static
    // nav automatically; no code change needed once it's populated.
    navItems: NavLink[];
  };
  footer: {
    navHeading: string;
    navItems: NavLink[];
    bioText: string;
    contactHeading: string;
    copyright: string;
    legalLabel: string;
  };
}

// French fallback text for needCategories[].recommendedDetails, positional
// (matches NEED_CATEGORIES order) — no prior static slot combined a service
// name with its rationale into one sentence the way the live ACF field does,
// so this reconstructs that shape from the old hardcoded UI copy.
// French fallback text for processSteps[].note, positional (matches
// PROCESS_STEPS order) — previously hardcoded by fixed index in Process.tsx.
const PROCESS_STEP_NOTE_FALLBACK = [
  'Échange initial sans engagement',
  'Planification personnalisée',
  'Reçu d\'assurance sur place',
];

// French fallback for aboutJitany.certifications[].footnote, positional —
// previously a single hardcoded "Reçu officiel d'assurance fourni" repeated
// identically on all 3 cards in AboutJitany.tsx, ignoring certCardFootnote.
const CERT_CARD_FOOTNOTE_FALLBACK = [
  'Formation complétée au Québec',
  'Permet l\'émission de reçus d\'assurance en massothérapie',
  'Installations et coussins adaptés dès le 2e trimestre',
];

const NEED_RECOMMENDED_DETAILS_FALLBACK = [
  'Massage Thérapeutique — soin ciblé en profondeur pour relâcher les tensions musculaires et restaurer la mobilité.',
  'Massage Suédois ou Lomi-Lomi — technique enveloppante pour calmer le système nerveux, apaiser le corps et recharger vos batteries.',
  'Soin Cervico-Dorsal & Relâchement Postural — décompression ciblée des zones de tension quotidiennes pour retrouver confort et souplesse.',
  'Massage Prénatal Spécialisé — soin doux et sécurisé dès le 2e trimestre avec coussins adaptés pour un soulagement absolu.',
  'Soins Alternatifs & Détente — approche douce et revitalisante pour détendre le corps en profondeur et stimuler votre bien-être.',
  'Consultation & Massothérapie sur-mesure — évaluation personnalisée de vos tensions en début de séance pour adapter précisément la technique.',
];

export const STATIC_FALLBACK: LandingData = {
  uiLabels: getUiLabels(null),
  hero: {
    ...HERO_DATA,
    ctaSecondaryLabel: 'Découvrir les soins',
    insuranceLine: 'Reçus d\'assurance massothérapie fournis',
    image: { url: heroImg, alt: 'Soin de massothérapie relaxant à Montréal chez KinéLibelula' },
  },
  benefits: BENEFITS_DATA,
  benefitsHeading: {
    eyebrow: 'Les bienfaits concrets',
    title: 'Pourquoi choisir la massothérapie ?',
    titleHighlight: 'massothérapie ?',
    subtitle: 'Une approche holistique reconnue pour ses bienfaits',
  },
  needCategories: NEED_CATEGORIES.map((need, idx) => ({
    ...need,
    recommendedLabel: 'Soin recommandé :',
    recommendedDetails: NEED_RECOMMENDED_DETAILS_FALLBACK[idx] ?? '',
    ctaLabel: 'Choisir ce soin',
  })),
  needsHeading: {
    eyebrow: 'Diagnostic rapide',
    title: 'Je peux vous aider si...',
    subtitle: 'Sélectionnez votre besoin principal pour découvrir le soin le plus adapté',
  },
  needsCtaLabel: 'Prendre rendez-vous',
  services: SERVICES_DATA.map((service) => ({ ...service, ctaLabel: 'Choisir ce soin' })),
  servicesHeading: {
    eyebrow: 'Expertise & Massothérapie',
    title: 'Mes services',
    titleHighlight: 'services',
    subtitle: 'Des techniques thérapeutiques variées pour répondre à tous vos besoins',
  },
  processSteps: PROCESS_STEPS.map((step, idx) => ({
    ...step,
    note: PROCESS_STEP_NOTE_FALLBACK[idx] ?? '',
  })),
  processHeading: {
    eyebrow: 'Simplicité & sérénité',
    title: 'Comment ça se passe ?',
    titleHighlight: 'se passe ?',
    subtitle: 'Un parcours simple et transparent en 3 étapes vers votre bien-être',
  },
  aboutJitany: {
    ...ABOUT_JITANY,
    eyebrow: 'À propos de votre thérapeute',
    imageCaption: 'Chaque corps a une histoire, chaque soin est personnalisé.',
    imageCaptionAttribution: 'Jitany Jara, Massothérapeute agréée',
    certEyebrow: 'Accréditations & Ordres Professionnels',
    certTitle: 'Certifications & Associations Professionnelles',
    certSubtitle: 'Thérapeute agréée auprès des associations reconnues pour l\'émission de reçus d\'assurances.',
    certFootnote: 'Membre des associations professionnelles reconnues au Québec.',
    certifications: ABOUT_JITANY.certifications.map((cert, idx) => ({
      ...cert,
      footnote: CERT_CARD_FOOTNOTE_FALLBACK[idx] ?? 'Reçu officiel d\'assurance fourni',
    })),
    image: { url: therapistImg, alt: 'Jitany Jara Massothérapeute à Montréal' },
  },
  testimonials: TESTIMONIALS_DATA.map((testimonial) => ({ ...testimonial, meta: 'Montréal' })),
  testimonialsHeading: {
    eyebrow: 'Témoignages de nos clients',
    title: 'Ce que disent mes clients',
    titleHighlight: 'mes clients',
    subtitle: 'Leurs témoignages authentiques reflètent mon engagement pour votre soulagement',
  },
  testimonialsSocialProof: 'Plus de 100 avis à Montréal · Cabinet KinéLibelula • Rosemont',
  testimonialsDisclaimer: 'Témoignages personnels partagés avec le consentement des personnes concernées. Les expériences individuelles ne constituent pas une preuve d\'efficacité et ne remplacent pas l\'avis d\'un médecin.',
  pricingPlans: PRICING_PLANS.map((plan) => ({ ...plan, ctaLabel: `Choisir la formule ${plan.duration}` })),
  pricingHeading: {
    eyebrow: 'Tarification transparente',
    title: 'Tarifs & Formules de Soins',
    titleHighlight: 'Tarifs',
    subtitle: 'Des soins personnalisés avec reçu d\'assurance massothérapie inclus',
  },
  pricingFooterNote: 'Séances sur rendez-vous — contactez Jitany pour planifier votre moment de soin',
  pricingPaymentNote: 'Reçus d\'assurance remis immédiatement • Paiement sur place',
  pregnancy: {
    ...PREGNANCY_SECTION,
    eyebrow: 'Soin Spécialisé Future Maman',
    badgeNote: 'Installations & coussins adaptés pour un confort total dès le 2e trimestre.',
    medicalNote: 'Ce soin ne remplace pas le suivi de votre médecin ou de votre sage-femme. En cas de grossesse à risque, de symptôme persistant ou de doute, parlez-en d\'abord à votre professionnel de la santé — l\'accompagnement en massothérapie peut se poursuivre en parallèle.',
    image: { url: pregnancyImg, alt: 'Massage prénatal et détente durant la grossesse à Montréal' },
  },
  faq: FAQ_DATA,
  faqHeading: {
    eyebrow: 'Réponses à vos questions',
    title: 'Questions fréquentes',
    titleHighlight: 'fréquentes',
    subtitle: 'Tout ce que vous devez savoir avant de réserver votre soin',
  },
  practicalInfo: {
    ...PRACTICAL_INFO,
    eyebrow: 'Localisation & Prise de Contact',
    title: 'Informations pratiques',
    titleHighlight: 'pratiques',
    subtitle: 'Contactez directement Jitany par téléphone ou via le formulaire pour votre rendez-vous',
    addressHeading: PRACTICAL_INFO.addressTitle,
    // No prior static slot for this — never shown before contactAddressHeading
    // etc. existed. Using the real, factual district name rather than
    // inventing marketing copy.
    districtLabel: 'Rosemont – La Petite-Patrie',
    accessNote: 'Stationnement gratuit sur rue disponible à proximité et accès facile en transport en commun (Rosemont - La Petite-Patrie).',
    directHeading: 'Contact direct',
    directSubheading: 'Par texto ou par formulaire',
    directNote: 'Réponse rapide garantie par Jitany Jara',
    ctaPrimaryLabel: 'Texto :',
    ctaSecondaryLabel: 'Demande en ligne',
    ctaEmailLabel: 'Écrire à :',
    phoneDigits: PRACTICAL_INFO.phone.replace(/\D/g, ''),
    hoursHeading: 'Heures d\'ouverture',
    hoursNote: 'Sur rendez-vous uniquement',
  },
  finalCta: {
    eyebrow: 'Séance individuelle sur-mesure',
    title: 'Offrez à votre corps le soin qu\'il mérite',
    titleHighlight: 'mérite',
    text: 'Prenez un moment pour vous, libérez vos tensions musculaires accumulées et retrouvez votre mobilité naturelle dès aujourd\'hui.',
    buttonLabel: 'Prendre rendez-vous',
    buttonLink: '#contact',
    insuranceNote: 'Reçus d\'assurance massothérapie fournis',
  },
  global: {
    announcementText: 'Massothérapie professionnelle à Montréal — Reçus d\'assurance fournis',
    insuranceDisclaimer: 'Reçus valides selon votre couverture — vérifiez auprès de votre assureur.',
    ctaLabel: 'Prendre rendez-vous',
  },
  header: {
    businessName: 'KinéLibelula',
    tagline: 'Jitany Jara • Massothérapie Montréal',
    navItems: [
      { label: 'Services', anchor: '#services' },
      { label: 'Tarifs', anchor: '#pricing' },
      { label: 'Grossesse', anchor: '#pregnancy' },
      { label: 'À propos', anchor: '#about' },
      { label: 'Questions', anchor: '#faq' },
      { label: 'Contact', anchor: '#contact' },
    ],
  },
  footer: {
    navHeading: 'Navigation',
    navItems: [
      { label: 'Services & Soins', anchor: '#services' },
      { label: 'Tarifs & Formules', anchor: '#pricing' },
      { label: 'Soin Prénatal', anchor: '#pregnancy' },
      { label: 'À propos de Jitany', anchor: '#about' },
      { label: 'Questions fréquentes', anchor: '#faq' },
      { label: 'Informations pratiques', anchor: '#contact' },
    ],
    bioText: '25 ans d\'expérience à Montréal en massothérapie thérapeutique, relaxation profonde et accompagnement prénatal personnalisé.',
    contactHeading: 'Coordonnées',
    copyright: 'KinéLibelula — Jitany Jara. Tous droits réservés.',
    legalLabel: 'Mentions légales & Confidentialité',
  },
};

// Static placeholder tokens (e.g. "{{COACHING_CREDENTIAL}}") that were never
// filled in must never render literally — treated as blank on either side,
// falling all the way to '' if the static value is itself a placeholder.
const PLACEHOLDER_PATTERN = /\{\{.*?\}\}/;

function isPlaceholder(value: string | null | undefined): boolean {
  return !!value && PLACEHOLDER_PATTERN.test(value);
}

function str(wp: string | null | undefined, fallback: string): string {
  const safeFallback = isPlaceholder(fallback) ? '' : fallback;
  if (!wp || wp.trim() === '' || isPlaceholder(wp)) return safeFallback;
  return wp;
}

// Title and its highlight are a matched pair: if WP's title is missing/empty/
// placeholder, use the fallback pair whole (never mix a live title with a
// static highlight, or vice versa). An empty WP highlight is a valid "no
// highlight" state, not something to fall back on.
function sectionHeading(
  wpTitle: string | null | undefined,
  wpHighlight: string | null | undefined,
  fallback: Pick<SectionHeading, 'title' | 'titleHighlight'>,
): Pick<SectionHeading, 'title' | 'titleHighlight'> {
  if (!wpTitle || wpTitle.trim() === '' || isPlaceholder(wpTitle)) return fallback;
  return {
    title: wpTitle,
    titleHighlight: wpHighlight && wpHighlight.trim() !== '' && !isPlaceholder(wpHighlight) ? wpHighlight : undefined,
  };
}

function clampStars(wp: number | null | undefined, fallback: number): number {
  const value = wp ?? fallback;
  if (value == null || Number.isNaN(value)) return fallback;
  return Math.min(5, Math.max(1, Math.round(value)));
}

function resolveImage(wp: WpMediaEdge | null | undefined, fallback: ResolvedImage): ResolvedImage {
  const url = wp?.node?.sourceUrl;
  if (!url) return fallback;
  return { url, alt: wp?.node?.altText || fallback.alt };
}

// Every icon name the components' own switch statements already know how to
// render (Benefits, NeedsSelector, Process, AboutJitany). ACF icon fields come
// back as string[]; we take the first value and only accept it if it's a name
// a component can actually resolve to a Lucide icon — anything unknown or
// empty falls back to the static icon so nothing ever fails to render.
const KNOWN_ICON_NAMES = new Set([
  'Moon', 'HeartPulse', 'Sparkles', 'HeartHandshake', 'ZapOff', 'Baby',
  'Activity', 'HelpCircle', 'Award', 'Heart', 'Users', 'ShieldCheck',
  'FileCheck', 'Calendar', 'PhoneCall',
]);

// ACF returns icon slugs in kebab-case (e.g. "heart-handshake"); the
// component-facing icon names are PascalCase Lucide component names.
function kebabToPascal(value: string): string {
  return value
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
}

function resolveIcon(wp: string[] | null | undefined, fallback: string): string {
  const candidate = wp?.[0];
  if (!candidate) return fallback;
  const pascalCandidate = kebabToPascal(candidate);
  return KNOWN_ICON_NAMES.has(pascalCandidate) ? pascalCandidate : fallback;
}

// WPGraphQL repeater fields have no id shared with the static data, so items are
// merged by array position — index N from WordPress overrides index N of the
// static fallback. If WordPress has no items (or the field errored), the static
// array is used untouched.
function mergeList<W, S>(
  wpList: W[] | null | undefined,
  staticList: S[],
  mapItem: (wp: W, staticItem: S | undefined, idx: number) => S,
): S[] {
  if (!wpList || wpList.length === 0) return staticList;
  return wpList.map((wp, idx) => mapItem(wp, staticList[idx], idx));
}

/**
 * Converts the WPGraphQL response into the exact shape the section components
 * already consume (landingData.ts is the schema of record). `fallback` is
 * used whole when `wp` is null, and per-field when `wp` is present but a
 * given field/array is missing or empty — content should never render blank.
 */
export function normalizeLandingPage(
  wp: WpLandingPage | null,
  fallback: LandingData = STATIC_FALLBACK,
): LandingData {
  if (!wp) return fallback;

  const uiLabels = getUiLabels(wp.language?.code);

  const wpHero = wp.landingHero;
  const wpAbout = wp.landingAbout;
  const wpCert = wp.landingCertifications;
  const wpPregnancy = wp.landingPregnancy;
  const wpGlobal = wp.landingGlobal;

  const heroHeading = sectionHeading(wpHero?.heroTitle, wpHero?.heroTitleHighlight, {
    title: fallback.hero.title,
    titleHighlight: fallback.hero.titleHighlight,
  });

  const hero: LandingData['hero'] = {
    eyebrow: str(wpHero?.heroEyebrow, fallback.hero.eyebrow),
    title: heroHeading.title,
    titleHighlight: heroHeading.titleHighlight,
    subtitle: str(wpHero?.heroSubtitle, fallback.hero.subtitle),
    ctaPrimary: str(wpHero?.heroCtaPrimaryLabel, fallback.hero.ctaPrimary),
    microTrust:
      wpHero?.heroTrustItems && wpHero.heroTrustItems.length > 0
        ? wpHero.heroTrustItems.map((t) => t.heroTrustItem ?? '').filter(Boolean)
        : fallback.hero.microTrust,
    experienceYears: str(wpHero?.heroExperienceYears, fallback.hero.experienceYears),
    experienceLabel: str(wpHero?.heroExperienceLabel, fallback.hero.experienceLabel),
    ctaSecondaryLabel: str(wpHero?.heroCtaSecondaryLabel, fallback.hero.ctaSecondaryLabel),
    insuranceLine: str(wpHero?.heroInsuranceLine, fallback.hero.insuranceLine),
    image: resolveImage(wpHero?.heroImage, fallback.hero.image),
  };

  const benefits = mergeList(wp.landingBenefits?.benefitsCards, fallback.benefits, (w, s) => ({
    icon: resolveIcon(w.benefitCardIcon, s?.icon ?? 'Sparkles'),
    title: str(w.benefitCardTitle, s?.title ?? ''),
    description: str(w.benefitCardDescription, s?.description ?? ''),
  }));
  const benefitsHeading: SectionHeading = {
    ...sectionHeading(wp.landingBenefits?.benefitsTitle, wp.landingBenefits?.benefitsTitleHighlight, fallback.benefitsHeading),
    eyebrow: str(wp.landingBenefits?.benefitsEyebrow, fallback.benefitsHeading.eyebrow),
    subtitle: str(wp.landingBenefits?.benefitsSubtitle, fallback.benefitsHeading.subtitle),
  };

  const needCategories: NeedCategoryWithCta[] = mergeList(wp.landingNeeds?.needsList, fallback.needCategories, (w, s) => ({
    id: w.needKey ?? s?.id ?? '',
    title: str(w.needTitle, s?.title ?? ''),
    iconName: resolveIcon(w.needIcon, s?.iconName ?? 'Sparkles'),
    recommendedServiceId: s?.recommendedServiceId ?? '',
    description: str(w.needDescription, s?.description ?? ''),
    recommendedLabel: str(w.needRecommendedLabel, s?.recommendedLabel ?? ''),
    recommendedDetails: str(w.needRecommendedDetails, s?.recommendedDetails ?? ''),
    ctaLabel: str(w.needCtaLabel, s?.ctaLabel ?? ''),
  }));
  const needsHeading: SectionHeading = {
    eyebrow: str(wp.landingNeeds?.needsEyebrow, fallback.needsHeading.eyebrow),
    title: str(wp.landingNeeds?.needsTitle, fallback.needsHeading.title),
    subtitle: str(wp.landingNeeds?.needsSubtitle, fallback.needsHeading.subtitle),
  };
  const needsCtaLabel = str(wp.landingNeeds?.needsCtaLabel, fallback.needsCtaLabel);

  const services = mergeList(wp.landingServices?.servicesCards, fallback.services, (w, s) => ({
    id: s?.id ?? (w.serviceCategoryTitle?.toLowerCase().trim().replace(/\s+/g, '-') || ''),
    category: s?.category ?? 'therapeutic',
    title: str(w.serviceCategoryTitle, s?.title ?? ''),
    description: str(w.serviceCategoryDescription, s?.description ?? ''),
    items:
      w.items && w.items.length > 0
        ? w.items.map((i) => i.serviceItemName ?? '').filter(Boolean)
        : (s?.items ?? []),
    ctaLabel: str(w.categoryCtaLabel, s?.ctaLabel ?? ''),
  }));
  const servicesHeading: SectionHeading = {
    ...sectionHeading(wp.landingServices?.servicesTitle, wp.landingServices?.servicesTitleHighlight, fallback.servicesHeading),
    eyebrow: str(wp.landingServices?.servicesEyebrow, fallback.servicesHeading.eyebrow),
    subtitle: str(wp.landingServices?.servicesSubtitle, fallback.servicesHeading.subtitle),
  };

  const processSteps: ProcessStepWithNote[] = mergeList(wp.landingProcess?.processSteps, fallback.processSteps, (w, s) => ({
    stepNumber: w.processStepNumber ?? s?.stepNumber ?? '',
    title: str(w.processStepTitle, s?.title ?? ''),
    description: str(w.processStepDescription, s?.description ?? ''),
    note: str(w.processStepNote, s?.note ?? ''),
  }));
  // No live highlight field for this section — sectionHeading naturally
  // degrades to a plain title whenever WP supplies the title.
  const processHeading: SectionHeading = {
    ...sectionHeading(wp.landingProcess?.processTitle, null, fallback.processHeading),
    eyebrow: str(wp.landingProcess?.processEyebrow, fallback.processHeading.eyebrow),
    subtitle: str(wp.landingProcess?.processSubtitle, fallback.processHeading.subtitle),
  };

  const badges =
    wpAbout?.aboutStats && wpAbout.aboutStats.length > 0
      ? wpAbout.aboutStats.map((stat, idx) => ({
          text:
            [stat.aboutStatValue, stat.aboutStatLabel].filter(Boolean).join(' ') ||
            fallback.aboutJitany.badges[idx]?.text ||
            '',
          icon: resolveIcon(stat.aboutStatIcon, fallback.aboutJitany.badges[idx]?.icon ?? 'Award'),
        }))
      : fallback.aboutJitany.badges;

  const certifications = mergeList(wpCert?.certCards, fallback.aboutJitany.certifications, (w, s, idx) => ({
    id: s?.id ?? `cert-${idx + 1}`,
    title: str(w.certCardTitle, s?.title ?? ''),
    association: str(w.certCardAssociation, s?.association ?? ''),
    badge: str(w.certCardBadge, s?.badge ?? ''),
    icon: resolveIcon(w.certCardIcon, s?.icon ?? 'ShieldCheck'),
    footnote: str(w.certCardFootnote, s?.footnote ?? ''),
  }));

  const aboutHeading = sectionHeading(wpAbout?.aboutTitle, wpAbout?.aboutTitleHighlight, {
    title: fallback.aboutJitany.title,
    titleHighlight: fallback.aboutJitany.titleHighlight,
  });

  const aboutJitany: LandingData['aboutJitany'] = {
    title: aboutHeading.title,
    titleHighlight: aboutHeading.titleHighlight,
    eyebrow: str(wpAbout?.aboutEyebrow, fallback.aboutJitany.eyebrow),
    p1: str(wpAbout?.aboutParagraph1, fallback.aboutJitany.p1),
    p2: str(wpAbout?.aboutParagraph2, fallback.aboutJitany.p2),
    pCoaching: str(wpAbout?.coachingCredential, fallback.aboutJitany.pCoaching),
    p3: str(wpAbout?.aboutQuote, fallback.aboutJitany.p3),
    imageCaption: str(wpAbout?.aboutImageCaption, fallback.aboutJitany.imageCaption),
    imageCaptionAttribution: str(wpAbout?.aboutImageCaptionAttribution, fallback.aboutJitany.imageCaptionAttribution),
    badges,
    certifications,
    certEyebrow: str(wpCert?.certEyebrow, fallback.aboutJitany.certEyebrow),
    certTitle: str(wpCert?.certTitle, fallback.aboutJitany.certTitle),
    certSubtitle: str(wpCert?.certSubtitle, fallback.aboutJitany.certSubtitle),
    certFootnote: str(wpCert?.certFootnote, fallback.aboutJitany.certFootnote),
    image: resolveImage(wpAbout?.aboutImage, fallback.aboutJitany.image),
  };

  const testimonials: TestimonialWithMeta[] = mergeList(
    wp.landingTestimonials?.testimonialsList,
    fallback.testimonials,
    (w, s, idx) => ({
      id: s?.id ?? `testimonial-${idx + 1}`,
      name: str(w.testimonialClientName, s?.name ?? ''),
      treatment: str(w.testimonialCategory, s?.treatment ?? ''),
      quote: str(w.testimonialQuote, s?.quote ?? ''),
      stars: clampStars(w.testimonialStars, s?.stars ?? 5),
      meta: str(w.testimonialClientMeta, s?.meta ?? ''),
    }),
  );
  const testimonialsHeading: SectionHeading = {
    ...sectionHeading(
      wp.landingTestimonials?.testimonialsTitle,
      wp.landingTestimonials?.testimonialsTitleHighlight,
      fallback.testimonialsHeading,
    ),
    eyebrow: str(wp.landingTestimonials?.testimonialsEyebrow, fallback.testimonialsHeading.eyebrow),
    subtitle: str(wp.landingTestimonials?.testimonialsSubtitle, fallback.testimonialsHeading.subtitle),
  };
  const testimonialsSocialProof = str(wp.landingTestimonials?.testimonialsSocialProof, fallback.testimonialsSocialProof);
  const testimonialsDisclaimer = str(wp.landingTestimonials?.testimonialsDisclaimer, fallback.testimonialsDisclaimer);

  const pricingPlans = mergeList(wp.landingPricing?.pricingPlans, fallback.pricingPlans, (w, s, idx) => ({
    // planCurrency exists on the WP schema but the static shape (and Pricing.tsx,
    // which hardcodes a "$" suffix) has no currency field — left unmapped
    // per the "static file is the schema of record" rule.
    id: w.planKey ?? s?.id ?? `plan-${idx + 1}`,
    title: str(w.planBadge, s?.title ?? ''),
    price: w.planPrice ?? s?.price ?? 0,
    duration: str(w.planDuration, s?.duration ?? ''),
    description: str(w.planDescription, s?.description ?? ''),
    highlight: w.planPopularBadge ?? s?.highlight,
    isPopular: w.planIsPopular ?? s?.isPopular ?? false,
    features:
      w.planFeatures && w.planFeatures.length > 0
        ? w.planFeatures.map((f) => f.planFeatureText ?? '').filter(Boolean)
        : (s?.features ?? []),
    ctaLabel: str(w.planCtaLabel, s?.ctaLabel ?? ''),
  }));
  // No live highlight field for this section.
  const pricingHeading: SectionHeading = {
    ...sectionHeading(wp.landingPricing?.pricingTitle, null, fallback.pricingHeading),
    eyebrow: str(wp.landingPricing?.pricingEyebrow, fallback.pricingHeading.eyebrow),
    subtitle: str(wp.landingPricing?.pricingSubtitle, fallback.pricingHeading.subtitle),
  };
  const pricingFooterNote = str(wp.landingPricing?.pricingFooterNote, fallback.pricingFooterNote);
  const pricingPaymentNote = str(wp.landingPricing?.pricingPaymentNote, fallback.pricingPaymentNote);

  const pregnancyHeading = sectionHeading(wpPregnancy?.pregnancyTitle, wpPregnancy?.pregnancyTitleHighlight, {
    title: fallback.pregnancy.title,
    titleHighlight: fallback.pregnancy.titleHighlight,
  });

  const pregnancy: LandingData['pregnancy'] = {
    title: pregnancyHeading.title,
    titleHighlight: pregnancyHeading.titleHighlight,
    eyebrow: str(wpPregnancy?.pregnancyEyebrow, fallback.pregnancy.eyebrow),
    description: str(wpPregnancy?.pregnancyDescription, fallback.pregnancy.description),
    bulletPoints:
      wpPregnancy?.pregnancyBullets && wpPregnancy.pregnancyBullets.length > 0
        ? wpPregnancy.pregnancyBullets.map((b) => b.pregnancyBulletText ?? '').filter(Boolean)
        : fallback.pregnancy.bulletPoints,
    ctaText: str(wpPregnancy?.pregnancyCtaLabel, fallback.pregnancy.ctaText),
    badgeNote: str(wpPregnancy?.pregnancyBadgeNote, fallback.pregnancy.badgeNote),
    medicalNote: str(wpPregnancy?.pregnancyMedicalNote, fallback.pregnancy.medicalNote),
    image: resolveImage(wpPregnancy?.pregnancyImage, fallback.pregnancy.image),
  };

  // faqAnswer is WYSIWYG HTML from WordPress. FAQ.tsx currently renders
  // `{item.answer}` as plain text, not dangerouslySetInnerHTML, so any markup
  // in a live answer will show as literal tags until that component is
  // updated — flagged here, not fixed (out of scope for the adapter).
  const faq = mergeList(wp.landingFaq?.faqItems, fallback.faq, (w, s) => ({
    question: str(w.faqQuestion, s?.question ?? ''),
    answer: str(w.faqAnswer, s?.answer ?? ''),
  }));
  const faqHeading: SectionHeading = {
    ...sectionHeading(wp.landingFaq?.faqTitle, wp.landingFaq?.faqTitleHighlight, fallback.faqHeading),
    eyebrow: str(wp.landingFaq?.faqEyebrow, fallback.faqHeading.eyebrow),
    subtitle: str(wp.landingFaq?.faqSubtitle, fallback.faqHeading.subtitle),
  };

  const wpContact = wp.landingContact;
  const contactPhone = str(wpGlobal?.globalContactPhone, fallback.practicalInfo.phone);
  const contactHeading = sectionHeading(wpContact?.contactTitle, wpContact?.contactTitleHighlight, {
    title: fallback.practicalInfo.title,
    titleHighlight: fallback.practicalInfo.titleHighlight,
  });

  const practicalInfo: LandingData['practicalInfo'] = {
    addressTitle: fallback.practicalInfo.addressTitle,
    addressLine1: str(wpGlobal?.globalAddressLine1, fallback.practicalInfo.addressLine1),
    addressLine2: str(wpGlobal?.globalAddressLine2, fallback.practicalInfo.addressLine2),
    phone: contactPhone,
    email: str(wpGlobal?.globalContactEmail, fallback.practicalInfo.email),
    hours: [
      {
        days: str(wpContact?.contactHoursMonThuLabel, fallback.practicalInfo.hours[0].days),
        hours: str(wpGlobal?.globalHoursMonThu, fallback.practicalInfo.hours[0].hours),
      },
      {
        days: str(wpContact?.contactHoursFriLabel, fallback.practicalInfo.hours[1].days),
        hours: str(wpGlobal?.globalHoursFri, fallback.practicalInfo.hours[1].hours),
      },
      {
        days: str(wpContact?.contactHoursWeekendLabel, fallback.practicalInfo.hours[2].days),
        hours: str(wpGlobal?.globalHoursWeekend, fallback.practicalInfo.hours[2].hours),
      },
    ],
    eyebrow: str(wpContact?.contactEyebrow, fallback.practicalInfo.eyebrow),
    title: contactHeading.title,
    titleHighlight: contactHeading.titleHighlight,
    subtitle: str(wpContact?.contactSubtitle, fallback.practicalInfo.subtitle),
    addressHeading: str(wpContact?.contactAddressHeading, fallback.practicalInfo.addressHeading),
    districtLabel: str(wpGlobal?.globalDistrictLabel, fallback.practicalInfo.districtLabel),
    accessNote: str(wpGlobal?.globalAccessNote, fallback.practicalInfo.accessNote),
    directHeading: str(wpContact?.contactDirectHeading, fallback.practicalInfo.directHeading),
    directSubheading: str(wpContact?.contactDirectSubheading, fallback.practicalInfo.directSubheading),
    directNote: str(wpContact?.contactDirectNote, fallback.practicalInfo.directNote),
    ctaPrimaryLabel: str(wpContact?.contactCtaPrimaryLabel, fallback.practicalInfo.ctaPrimaryLabel),
    ctaSecondaryLabel: str(wpContact?.contactCtaSecondaryLabel, fallback.practicalInfo.ctaSecondaryLabel),
    ctaEmailLabel: str(wpContact?.contactCtaEmailLabel, fallback.practicalInfo.ctaEmailLabel),
    phoneDigits: contactPhone.replace(/\D/g, ''),
    hoursHeading: str(wpContact?.contactHoursHeading, fallback.practicalInfo.hoursHeading),
    hoursNote: str(wpContact?.contactHoursNote, fallback.practicalInfo.hoursNote),
  };

  const wpFinalCta = wp.landingFinalCta;
  const finalCtaHeading = sectionHeading(wpFinalCta?.finalCtaTitle, wpFinalCta?.finalCtaTitleHighlight, {
    title: fallback.finalCta.title,
    titleHighlight: fallback.finalCta.titleHighlight,
  });
  const finalCta: LandingData['finalCta'] = {
    eyebrow: str(wpFinalCta?.finalCtaEyebrow, fallback.finalCta.eyebrow),
    title: finalCtaHeading.title,
    titleHighlight: finalCtaHeading.titleHighlight,
    text: str(wpFinalCta?.finalCtaText, fallback.finalCta.text),
    buttonLabel: str(wpFinalCta?.finalCtaButtonLabel, fallback.finalCta.buttonLabel),
    buttonLink: str(wpFinalCta?.finalCtaButtonLink, fallback.finalCta.buttonLink),
    insuranceNote: str(wpFinalCta?.finalCtaInsuranceNote, fallback.finalCta.insuranceNote),
  };

  const global: LandingData['global'] = {
    announcementText: str(wpGlobal?.globalAnnouncementText, fallback.global.announcementText),
    insuranceDisclaimer: str(wpGlobal?.globalInsuranceDisclaimer, fallback.global.insuranceDisclaimer),
    ctaLabel: str(wp.landingHeader?.headerCtaLabel, fallback.global.ctaLabel),
  };

  const wpHeader = wp.landingHeader;
  const header: LandingData['header'] = {
    businessName: str(wpHeader?.headerBusinessName, fallback.header.businessName),
    tagline: str(wpHeader?.headerBusinessTagline, fallback.header.tagline),
    navItems:
      wpHeader?.headerNavItems && wpHeader.headerNavItems.length > 0
        ? wpHeader.headerNavItems.map((item, idx) => ({
            label: str(item.headerNavLabel, fallback.header.navItems[idx]?.label ?? ''),
            anchor: str(item.headerNavAnchor, fallback.header.navItems[idx]?.anchor ?? '#'),
          }))
        : fallback.header.navItems,
  };

  const wpFooter = wp.landingFooter;
  const footer: LandingData['footer'] = {
    navHeading: str(wpFooter?.footerNavHeading, fallback.footer.navHeading),
    navItems:
      wpFooter?.footerNavItems && wpFooter.footerNavItems.length > 0
        ? wpFooter.footerNavItems.map((item, idx) => ({
            label: str(item.footerNavLabel, fallback.footer.navItems[idx]?.label ?? ''),
            anchor: str(item.footerNavAnchor, fallback.footer.navItems[idx]?.anchor ?? '#'),
          }))
        : fallback.footer.navItems,
    bioText: str(wpFooter?.footerBioText, fallback.footer.bioText),
    contactHeading: str(wpFooter?.footerContactHeading, fallback.footer.contactHeading),
    // NOTE: WP's current value contains a literal "[PENDIENTE]" placeholder
    // mid-sentence ("KinéLibelula — Jitany Jara [PENDIENTE]. All rights
    // reserved.") — the placeholder guard only catches a value that IS a
    // bracket token, not one embedded in a longer sentence, so this will
    // render literally until the WP content itself is finalized.
    copyright: str(wpFooter?.footerCopyright, fallback.footer.copyright),
    legalLabel: str(wpFooter?.footerLegalLabel, fallback.footer.legalLabel),
  };

  return {
    uiLabels,
    hero,
    benefits,
    benefitsHeading,
    needCategories,
    needsHeading,
    needsCtaLabel,
    services,
    servicesHeading,
    processSteps,
    processHeading,
    aboutJitany,
    testimonials,
    testimonialsHeading,
    testimonialsSocialProof,
    testimonialsDisclaimer,
    pricingPlans,
    pricingHeading,
    pricingFooterNote,
    pricingPaymentNote,
    pregnancy,
    faq,
    faqHeading,
    practicalInfo,
    finalCta,
    global,
    header,
    footer,
  };
}
