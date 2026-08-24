import { gql } from '@apollo/client';

export type SupportedLocale = 'en' | 'fr' | 'es';

// idType: URI is NOT WPML-locale-aware — every locale-prefixed URI resolves
// to the same default-language post. This is only ever used to locate the
// translation group (see GET_LANDING_TRANSLATIONS); per-locale content is
// always fetched afterwards by DATABASE_ID (see GET_LANDING_PAGE).
export const LANDING_PAGE_URI = '/landing';

// Cheap, no content fields — used once per session to build a
// {locale: databaseId} map from the translation group.
export const GET_LANDING_TRANSLATIONS = gql`
  query GetLandingTranslations($uri: ID!) {
    page(id: $uri, idType: URI) {
      databaseId
      languageCode
      translations {
        databaseId
        languageCode
      }
    }
  }
`;

const MEDIA_FIELDS = gql`
  fragment MediaFields on AcfMediaItemConnectionEdge {
    node {
      sourceUrl
      altText
    }
  }
`;

export const GET_LANDING_PAGE = gql`
  ${MEDIA_FIELDS}
  query GetLandingPage($databaseId: ID!) {
    page(id: $databaseId, idType: DATABASE_ID) {
      id
      title
      slug
      language {
        code
      }

      landingGlobal {
        globalAnnouncementText
        globalContactPhone
        globalContactEmail
        globalAddressLine1
        globalAddressLine2
        globalDistrictLabel
        globalAccessNote
        globalHoursMonThu
        globalHoursFri
        globalHoursWeekend
        globalMapsEmbed
        globalInsuranceDisclaimer
      }

      landingHeader {
        headerBusinessName
        headerBusinessTagline
        headerCtaLabel
        headerCtaLink
        headerNavItems {
          headerNavLabel
          headerNavAnchor
        }
      }

      landingHero {
        heroEyebrow
        heroTitle
        heroTitleHighlight
        heroSubtitle
        heroCtaPrimaryLabel
        heroCtaPrimaryLink
        heroCtaSecondaryLabel
        heroCtaSecondaryLink
        heroInsuranceLine
        heroTrustItems {
          heroTrustItem
        }
        heroExperienceYears
        heroExperienceLabel
        heroSocialProof
        heroAddressBadge
        heroImage {
          ...MediaFields
        }
      }

      landingBenefits {
        benefitsEyebrow
        benefitsTitle
        benefitsTitleHighlight
        benefitsSubtitle
        benefitsCards {
          benefitCardIcon
          benefitCardTitle
          benefitCardDescription
        }
      }

      landingNeeds {
        needsEyebrow
        needsTitle
        needsSubtitle
        needsList {
          needKey
          needIcon
          needTitle
          needDescription
          needRecommendedLabel
          needRecommendedDetails
          needCtaLabel
        }
        needsCtaLabel
      }

      landingServices {
        servicesEyebrow
        servicesTitle
        servicesTitleHighlight
        servicesSubtitle
        servicesCards {
          serviceCategoryTitle
          serviceCategoryDescription
          categoryCtaLabel
          items {
            serviceItemName
          }
        }
      }

      landingProcess {
        processEyebrow
        processTitle
        processSubtitle
        processSteps {
          processStepNumber
          processStepIcon
          processStepTitle
          processStepDescription
          processStepNote
        }
      }

      landingAbout {
        aboutEyebrow
        aboutTitle
        aboutTitleHighlight
        aboutParagraph1
        aboutParagraph2
        coachingCredential
        aboutQuote
        aboutImage {
          ...MediaFields
        }
        aboutImageCaption
        aboutStats {
          aboutStatIcon
          aboutStatValue
          aboutStatLabel
        }
        aboutCtaLabel
      }

      landingCertifications {
        certEyebrow
        certTitle
        certSubtitle
        certCards {
          certCardIcon
          certCardBadge
          certCardTitle
          certCardAssociation
          certCardFootnote
        }
        certFootnote
      }

      landingTestimonials {
        testimonialsEyebrow
        testimonialsTitle
        testimonialsTitleHighlight
        testimonialsSubtitle
        testimonialsRatingValue
        testimonialsSocialProof
        testimonialsList {
          testimonialCategory
          testimonialQuote
          testimonialClientName
          testimonialClientMeta
          testimonialStars
        }
      }

      landingPricing {
        pricingEyebrow
        pricingTitle
        pricingSubtitle
        pricingPlans {
          planKey
          planBadge
          planPrice
          planCurrency
          planDuration
          planDescription
          planIsPopular
          planPopularBadge
          planFeatures {
            planFeatureText
          }
          planCtaLabel
        }
        pricingFooterNote
        pricingPaymentNote
      }

      landingPregnancy {
        pregnancyEyebrow
        pregnancyTitle
        pregnancyTitleHighlight
        pregnancyDescription
        pregnancyBullets {
          pregnancyBulletText
        }
        pregnancyCtaLabel
        pregnancyImage {
          ...MediaFields
        }
        pregnancyBadgeNote
      }

      landingFaq {
        faqEyebrow
        faqTitle
        faqTitleHighlight
        faqSubtitle
        faqItems {
          faqQuestion
          faqAnswer
        }
      }

      landingFinalCta {
        finalCtaEyebrow
        finalCtaTitle
        finalCtaTitleHighlight
        finalCtaText
        finalCtaButtonLabel
        finalCtaButtonLink
        finalCtaInsuranceNote
      }

      landingFooter {
        footerBioText
        footerNavHeading
        footerNavItems {
          footerNavLabel
          footerNavAnchor
        }
        footerContactHeading
        footerCopyright
        footerLegalLabel
        footerLegalUrl
      }
    }
  }
`;
