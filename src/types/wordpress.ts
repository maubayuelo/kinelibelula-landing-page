/**
 * Types matching the CONFIRMED live WPGraphQL schema at VITE_GRAPHQL_ENDPOINT.
 * Reconciled by live introspection on 2026-08-20 — see Phase 1 notes for diffs
 * vs. the original field-name reference doc.
 */

export interface WpMediaNode {
  sourceUrl: string;
  altText: string;
}

export interface WpMediaEdge {
  node: WpMediaNode;
}

// ── translation index (GET_LANDING_TRANSLATIONS) ────────────────────────────
// The queried node never includes itself in `translations` — confirmed live
// both directions (en→[fr,es], fr→[en,es]) — so callers must add the node's
// own {languageCode, databaseId} to the map separately.
export interface WpTranslationRef {
  databaseId: number;
  languageCode: string;
}

export interface WpTranslationIndex {
  databaseId: number;
  languageCode: string;
  translations: WpTranslationRef[] | null;
}

// ── landingGlobal ──────────────────────────────────────────────────────────
export interface LandingGlobal {
  globalAnnouncementText: string | null;
  globalContactPhone: string | null;
  globalContactEmail: string | null;
  globalAddressLine1: string | null;
  globalAddressLine2: string | null;
  globalDistrictLabel: string | null;
  globalAccessNote: string | null;
  globalHoursMonThu: string | null;
  globalHoursFri: string | null;
  globalHoursWeekend: string | null;
  globalMapsEmbed: string | null;
  globalInsuranceDisclaimer: string | null;
}

// ── landingHeader ───────────────────────────────────────────────────────────
export interface LandingHeaderNavItem {
  headerNavLabel: string | null;
  headerNavAnchor: string | null;
}

export interface LandingHeader {
  headerBusinessName: string | null;
  headerBusinessTagline: string | null;
  headerCtaLabel: string | null;
  headerCtaLink: string | null;
  headerNavItems: LandingHeaderNavItem[] | null;
}

// ── landingHero ─────────────────────────────────────────────────────────────
export interface LandingHeroTrustItem {
  heroTrustItem: string | null;
}

export interface LandingHero {
  heroEyebrow: string | null;
  heroTitle: string | null;
  heroTitleHighlight: string | null;
  heroSubtitle: string | null;
  heroCtaPrimaryLabel: string | null;
  heroCtaPrimaryLink: string | null;
  heroCtaSecondaryLabel: string | null;
  heroCtaSecondaryLink: string | null;
  heroInsuranceLine: string | null;
  heroTrustItems: LandingHeroTrustItem[] | null;
  heroExperienceYears: string | null;
  heroExperienceLabel: string | null;
  heroSocialProof: string | null;
  heroAddressBadge: string | null;
  heroImage: WpMediaEdge | null;
}

// ── landingBenefits ─────────────────────────────────────────────────────────
export interface LandingBenefitCard {
  benefitCardIcon: string[] | null;
  benefitCardTitle: string | null;
  benefitCardDescription: string | null;
}

export interface LandingBenefits {
  benefitsEyebrow: string | null;
  benefitsTitle: string | null;
  benefitsTitleHighlight: string | null;
  benefitsSubtitle: string | null;
  benefitsCards: LandingBenefitCard[] | null;
}

// ── landingNeeds ─────────────────────────────────────────────────────────────
export interface LandingNeedItem {
  needKey: string | null;
  needIcon: string[] | null;
  needTitle: string | null;
  needDescription: string | null;
  needRecommendedLabel: string | null;
  needRecommendedDetails: string | null;
  needCtaLabel: string | null;
}

export interface LandingNeeds {
  needsEyebrow: string | null;
  needsTitle: string | null;
  needsSubtitle: string | null;
  needsList: LandingNeedItem[] | null;
  needsCtaLabel: string | null;
}

// ── landingServices ─────────────────────────────────────────────────────────
export interface LandingServiceCategoryItem {
  serviceItemName: string | null;
}

export interface LandingServiceCard {
  serviceCategoryTitle: string | null;
  serviceCategoryDescription: string | null;
  categoryCtaLabel: string | null;
  items: LandingServiceCategoryItem[] | null;
}

export interface LandingServices {
  servicesEyebrow: string | null;
  servicesTitle: string | null;
  servicesTitleHighlight: string | null;
  servicesSubtitle: string | null;
  servicesCards: LandingServiceCard[] | null;
}

// ── landingProcess ───────────────────────────────────────────────────────────
export interface LandingProcessStep {
  processStepNumber: string | null;
  processStepIcon: string[] | null;
  processStepTitle: string | null;
  processStepDescription: string | null;
  processStepNote: string | null;
}

export interface LandingProcess {
  processEyebrow: string | null;
  processTitle: string | null;
  processSubtitle: string | null;
  processSteps: LandingProcessStep[] | null;
}

// ── landingAbout ─────────────────────────────────────────────────────────────
export interface LandingAboutStat {
  aboutStatIcon: string[] | null;
  aboutStatValue: string | null;
  aboutStatLabel: string | null;
}

export interface LandingAbout {
  aboutEyebrow: string | null;
  aboutTitle: string | null;
  aboutTitleHighlight: string | null;
  aboutParagraph1: string | null;
  aboutParagraph2: string | null;
  coachingCredential: string | null;
  aboutQuote: string | null;
  aboutImage: WpMediaEdge | null;
  aboutImageCaption: string | null;
  aboutImageCaptionAttribution: string | null;
  aboutStats: LandingAboutStat[] | null;
  aboutCtaLabel: string | null;
}

// ── landingCertifications ───────────────────────────────────────────────────
export interface LandingCertCard {
  certCardIcon: string[] | null;
  certCardBadge: string | null;
  certCardTitle: string | null;
  certCardAssociation: string | null;
  certCardFootnote: string | null;
}

export interface LandingCertifications {
  certEyebrow: string | null;
  certTitle: string | null;
  certSubtitle: string | null;
  certCards: LandingCertCard[] | null;
  certFootnote: string | null;
}

// ── landingTestimonials ─────────────────────────────────────────────────────
export interface LandingTestimonialItem {
  testimonialCategory: string | null;
  testimonialQuote: string | null;
  testimonialClientName: string | null;
  testimonialClientMeta: string | null;
  testimonialStars: number | null;
}

export interface LandingTestimonials {
  testimonialsEyebrow: string | null;
  testimonialsTitle: string | null;
  testimonialsTitleHighlight: string | null;
  testimonialsSubtitle: string | null;
  testimonialsSocialProof: string | null;
  testimonialsDisclaimer: string | null;
  testimonialsList: LandingTestimonialItem[] | null;
}

// ── landingPricing ───────────────────────────────────────────────────────────
export interface LandingPlanFeature {
  planFeatureText: string | null;
}

export interface LandingPricingPlan {
  planKey: string | null;
  planBadge: string | null;
  planPrice: number | null;
  planCurrency: string | null;
  planDuration: string | null;
  planDescription: string | null;
  planIsPopular: boolean | null;
  planPopularBadge: string | null;
  planFeatures: LandingPlanFeature[] | null;
  planCtaLabel: string | null;
}

export interface LandingPricing {
  pricingEyebrow: string | null;
  pricingTitle: string | null;
  pricingSubtitle: string | null;
  pricingPlans: LandingPricingPlan[] | null;
  pricingFooterNote: string | null;
  pricingPaymentNote: string | null;
}

// ── landingPregnancy ─────────────────────────────────────────────────────────
export interface LandingPregnancyBullet {
  pregnancyBulletText: string | null;
}

export interface LandingPregnancy {
  pregnancyEyebrow: string | null;
  pregnancyTitle: string | null;
  pregnancyTitleHighlight: string | null;
  pregnancyDescription: string | null;
  pregnancyBullets: LandingPregnancyBullet[] | null;
  pregnancyCtaLabel: string | null;
  pregnancyImage: WpMediaEdge | null;
  pregnancyBadgeNote: string | null;
  pregnancyMedicalNote: string | null;
}

// ── landingFaq ───────────────────────────────────────────────────────────────
export interface LandingFaqItem {
  faqQuestion: string | null;
  faqAnswer: string | null; // WYSIWYG HTML — sanitize on render
}

export interface LandingFaq {
  faqEyebrow: string | null;
  faqTitle: string | null;
  faqTitleHighlight: string | null;
  faqSubtitle: string | null;
  faqItems: LandingFaqItem[] | null;
}

// ── landingContact ───────────────────────────────────────────────────────────
export interface LandingContact {
  contactEyebrow: string | null;
  contactTitle: string | null;
  contactTitleHighlight: string | null;
  contactSubtitle: string | null;
  contactAddressHeading: string | null;
  contactDirectHeading: string | null;
  contactDirectSubheading: string | null;
  contactDirectNote: string | null;
  contactCtaPrimaryLabel: string | null;
  contactCtaSecondaryLabel: string | null;
  contactCtaEmailLabel: string | null;
  contactHoursHeading: string | null;
  contactHoursNote: string | null;
  contactHoursMonThuLabel: string | null;
  contactHoursFriLabel: string | null;
  contactHoursWeekendLabel: string | null;
}

// ── landingFinalCta ──────────────────────────────────────────────────────────
export interface LandingFinalCta {
  finalCtaEyebrow: string | null;
  finalCtaTitle: string | null;
  finalCtaTitleHighlight: string | null;
  finalCtaText: string | null;
  finalCtaButtonLabel: string | null;
  finalCtaButtonLink: string | null;
  finalCtaInsuranceNote: string | null;
}

// ── landingFooter ─────────────────────────────────────────────────────────────
export interface LandingFooterNavItem {
  footerNavLabel: string | null;
  footerNavAnchor: string | null;
}

export interface LandingFooter {
  footerBioText: string | null;
  footerNavHeading: string | null;
  footerNavItems: LandingFooterNavItem[] | null;
  footerContactHeading: string | null;
  footerCopyright: string | null;
  footerLegalLabel: string | null;
  footerLegalUrl: string | null;
}

// ── Page-level aggregate ──────────────────────────────────────────────────────
export interface WpLandingPage {
  id: string;
  title: string;
  slug: string;
  // Queried (see queries.ts) but was never declared here — used to
  // locale-select the practicalInfo.hours day labels, which have no ACF
  // field of their own.
  language: { code: string } | null;
  landingGlobal: LandingGlobal | null;
  landingHeader: LandingHeader | null;
  landingHero: LandingHero | null;
  landingBenefits: LandingBenefits | null;
  landingNeeds: LandingNeeds | null;
  landingServices: LandingServices | null;
  landingProcess: LandingProcess | null;
  landingAbout: LandingAbout | null;
  landingCertifications: LandingCertifications | null;
  landingTestimonials: LandingTestimonials | null;
  landingPricing: LandingPricing | null;
  landingPregnancy: LandingPregnancy | null;
  landingFaq: LandingFaq | null;
  landingContact: LandingContact | null;
  landingFinalCta: LandingFinalCta | null;
  landingFooter: LandingFooter | null;
}

export interface WpLandingPageResponse {
  data?: {
    page: WpLandingPage | null;
  };
  errors?: Array<{ message: string }>;
}
