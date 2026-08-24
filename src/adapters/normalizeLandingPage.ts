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
import heroImg from '../assets/images/hero_massage_spa_1785157453784.jpg';
import therapistImg from '../assets/images/therapist_jitany_jara_1785157479499.jpg';
import pregnancyImg from '../assets/images/pregnancy_massage_nature_1785157465957.jpg';

export interface ResolvedImage {
  url: string;
  alt: string;
}

// Aggregate shape of everything the section components consume today, plus an
// `image` field per section that has one. The static consts in landingData.ts
// have no image field of their own (components import the local jpg directly),
// so the static fallback image is attached here instead of in landingData.ts.
export interface LandingData {
  hero: typeof HERO_DATA & { image: ResolvedImage };
  benefits: typeof BENEFITS_DATA;
  needCategories: typeof NEED_CATEGORIES;
  services: typeof SERVICES_DATA;
  processSteps: typeof PROCESS_STEPS;
  aboutJitany: typeof ABOUT_JITANY & { image: ResolvedImage };
  testimonials: typeof TESTIMONIALS_DATA;
  pricingPlans: typeof PRICING_PLANS;
  pregnancy: typeof PREGNANCY_SECTION & { image: ResolvedImage };
  faq: typeof FAQ_DATA;
  practicalInfo: typeof PRACTICAL_INFO;
}

export const STATIC_FALLBACK: LandingData = {
  hero: {
    ...HERO_DATA,
    image: { url: heroImg, alt: 'Soin de massothérapie relaxant à Montréal chez KinéLibelula' },
  },
  benefits: BENEFITS_DATA,
  needCategories: NEED_CATEGORIES,
  services: SERVICES_DATA,
  processSteps: PROCESS_STEPS,
  aboutJitany: {
    ...ABOUT_JITANY,
    image: { url: therapistImg, alt: 'Jitany Jara Massothérapeute à Montréal' },
  },
  testimonials: TESTIMONIALS_DATA,
  pricingPlans: PRICING_PLANS,
  pregnancy: {
    ...PREGNANCY_SECTION,
    image: { url: pregnancyImg, alt: 'Massage prénatal et détente durant la grossesse à Montréal' },
  },
  faq: FAQ_DATA,
  practicalInfo: PRACTICAL_INFO,
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

function resolveIcon(wp: string[] | null | undefined, fallback: string): string {
  const candidate = wp?.[0];
  return candidate && KNOWN_ICON_NAMES.has(candidate) ? candidate : fallback;
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

  const wpHero = wp.landingHero;
  const wpAbout = wp.landingAbout;
  const wpCert = wp.landingCertifications;
  const wpPregnancy = wp.landingPregnancy;
  const wpGlobal = wp.landingGlobal;

  const hero: LandingData['hero'] = {
    eyebrow: str(wpHero?.heroEyebrow, fallback.hero.eyebrow),
    title: str(wpHero?.heroTitle, fallback.hero.title),
    subtitle: str(wpHero?.heroSubtitle, fallback.hero.subtitle),
    ctaPrimary: str(wpHero?.heroCtaPrimaryLabel, fallback.hero.ctaPrimary),
    microTrust:
      wpHero?.heroTrustItems && wpHero.heroTrustItems.length > 0
        ? wpHero.heroTrustItems.map((t) => t.heroTrustItem ?? '').filter(Boolean)
        : fallback.hero.microTrust,
    experienceYears: str(wpHero?.heroExperienceYears, fallback.hero.experienceYears),
    experienceLabel: str(wpHero?.heroExperienceLabel, fallback.hero.experienceLabel),
    image: resolveImage(wpHero?.heroImage, fallback.hero.image),
  };

  const benefits = mergeList(wp.landingBenefits?.benefitsCards, fallback.benefits, (w, s) => ({
    icon: resolveIcon(w.benefitCardIcon, s?.icon ?? 'Sparkles'),
    title: str(w.benefitCardTitle, s?.title ?? ''),
    description: str(w.benefitCardDescription, s?.description ?? ''),
  }));

  // NOTE: NeedsSelector.tsx currently renders its own hardcoded list and does
  // not read NEED_CATEGORIES, so this normalized data has no visible effect
  // until that component is wired up (out of scope for Phase 3).
  const needCategories = mergeList(wp.landingNeeds?.needsList, fallback.needCategories, (w, s) => ({
    id: w.needKey ?? s?.id ?? '',
    title: str(w.needTitle, s?.title ?? ''),
    iconName: resolveIcon(w.needIcon, s?.iconName ?? 'Sparkles'),
    recommendedServiceId: s?.recommendedServiceId ?? '',
    description: str(w.needDescription, s?.description ?? ''),
  }));

  const services = mergeList(wp.landingServices?.servicesCards, fallback.services, (w, s) => ({
    id: s?.id ?? (w.serviceCategoryTitle?.toLowerCase().trim().replace(/\s+/g, '-') || ''),
    category: s?.category ?? 'therapeutic',
    title: str(w.serviceCategoryTitle, s?.title ?? ''),
    description: str(w.serviceCategoryDescription, s?.description ?? ''),
    items:
      w.items && w.items.length > 0
        ? w.items.map((i) => i.serviceItemName ?? '').filter(Boolean)
        : (s?.items ?? []),
  }));

  const processSteps = mergeList(wp.landingProcess?.processSteps, fallback.processSteps, (w, s) => ({
    stepNumber: w.processStepNumber ?? s?.stepNumber ?? '',
    title: str(w.processStepTitle, s?.title ?? ''),
    description: str(w.processStepDescription, s?.description ?? ''),
  }));

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
  }));

  const aboutJitany: LandingData['aboutJitany'] = {
    title: str(wpAbout?.aboutTitle, fallback.aboutJitany.title),
    p1: str(wpAbout?.aboutParagraph1, fallback.aboutJitany.p1),
    p2: str(wpAbout?.aboutParagraph2, fallback.aboutJitany.p2),
    pCoaching: str(wpAbout?.coachingCredential, fallback.aboutJitany.pCoaching),
    p3: str(wpAbout?.aboutQuote, fallback.aboutJitany.p3),
    badges,
    certifications,
    image: resolveImage(wpAbout?.aboutImage, fallback.aboutJitany.image),
  };

  const testimonials = mergeList(
    wp.landingTestimonials?.testimonialsList,
    fallback.testimonials,
    (w, s, idx) => ({
      id: s?.id ?? `testimonial-${idx + 1}`,
      name: str(w.testimonialClientName, s?.name ?? ''),
      treatment: str(w.testimonialCategory, s?.treatment ?? ''),
      quote: str(w.testimonialQuote, s?.quote ?? ''),
      stars: clampStars(w.testimonialStars, s?.stars ?? 5),
    }),
  );

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
  }));

  const pregnancy: LandingData['pregnancy'] = {
    title: str(wpPregnancy?.pregnancyTitle, fallback.pregnancy.title),
    description: str(wpPregnancy?.pregnancyDescription, fallback.pregnancy.description),
    bulletPoints:
      wpPregnancy?.pregnancyBullets && wpPregnancy.pregnancyBullets.length > 0
        ? wpPregnancy.pregnancyBullets.map((b) => b.pregnancyBulletText ?? '').filter(Boolean)
        : fallback.pregnancy.bulletPoints,
    ctaText: str(wpPregnancy?.pregnancyCtaLabel, fallback.pregnancy.ctaText),
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

  const practicalInfo: LandingData['practicalInfo'] = {
    addressTitle: fallback.practicalInfo.addressTitle,
    addressLine1: str(wpGlobal?.globalAddressLine1, fallback.practicalInfo.addressLine1),
    addressLine2: str(wpGlobal?.globalAddressLine2, fallback.practicalInfo.addressLine2),
    phone: str(wpGlobal?.globalContactPhone, fallback.practicalInfo.phone),
    email: str(wpGlobal?.globalContactEmail, fallback.practicalInfo.email),
    hours: [
      {
        days: fallback.practicalInfo.hours[0].days,
        hours: str(wpGlobal?.globalHoursMonThu, fallback.practicalInfo.hours[0].hours),
      },
      {
        days: fallback.practicalInfo.hours[1].days,
        hours: str(wpGlobal?.globalHoursFri, fallback.practicalInfo.hours[1].hours),
      },
      {
        days: fallback.practicalInfo.hours[2].days,
        hours: str(wpGlobal?.globalHoursWeekend, fallback.practicalInfo.hours[2].hours),
      },
    ],
  };

  return {
    hero,
    benefits,
    needCategories,
    services,
    processSteps,
    aboutJitany,
    testimonials,
    pricingPlans,
    pregnancy,
    faq,
    practicalInfo,
  };
}
