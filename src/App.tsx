import React, { useState } from 'react';
import { useLandingContent } from './hooks/useLandingContent';
import type { SupportedLocale } from './services/queries';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Benefits } from './components/Benefits';
import { NeedsSelector } from './components/NeedsSelector';
import { Services } from './components/Services';
import { Process } from './components/Process';
import { AboutJitany } from './components/AboutJitany';
import { Testimonials } from './components/Testimonials';
import { Pricing } from './components/Pricing';
import { PregnancySection } from './components/PregnancySection';
import { FAQ } from './components/FAQ';
import { Contact } from './components/Contact';
import { FinalCTA } from './components/FinalCTA';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { StickyBookingBar } from './components/StickyBookingBar';
import { ScrollReveal } from './components/ScrollReveal';
import { LegalModal } from './components/LegalModal';
import { CookieBanner } from './components/CookieBanner';

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedPlanId, setSelectedPlanId] = useState('90-min');
  const [isLegalOpen, setIsLegalOpen] = useState(false);
  const [locale, setLocale] = useState<SupportedLocale>('en');
  const { data } = useLandingContent(locale);

  const handleOpenBooking = (planId = '90-min') => {
    setSelectedPlanId(planId);
    setIsBookingOpen(true);
  };

  const handleCloseBooking = () => {
    setIsBookingOpen(false);
  };

  const handleOpenLegal = () => {
    setIsLegalOpen(true);
  };

  const handleCloseLegal = () => {
    setIsLegalOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#F9F8F6] text-[#2D312E] font-sans antialiased flex flex-col">
      {/* Header with Nav & Quick Call */}
      <Header
        data={data.practicalInfo}
        global={data.global}
        header={data.header}
        locale={locale}
        onLocaleChange={setLocale}
        onOpenBooking={() => handleOpenBooking('90-min')}
      />

      {/* Main Landing Sections with smooth scroll animations */}
      <main className="flex-1">
        {/* 1. Hero Section */}
        <ScrollReveal duration={0.8} distance={20}>
          <Hero data={data.hero} global={data.global} onOpenBooking={() => handleOpenBooking('90-min')} />
        </ScrollReveal>

        {/* 2. Les bienfaits */}
        <ScrollReveal duration={0.7}>
          <Benefits data={data.benefits} heading={data.benefitsHeading} global={data.global} onOpenBooking={() => handleOpenBooking('90-min')} />
        </ScrollReveal>

        {/* 3. Je peux vous aider si... (Interactive need selector) */}
        <ScrollReveal duration={0.7}>
          <NeedsSelector
            data={data.needCategories}
            heading={data.needsHeading}
            ctaLabel={data.needsCtaLabel}
            onOpenBookingWithService={() => handleOpenBooking('90-min')}
          />
        </ScrollReveal>

        {/* 4. Mes services */}
        <ScrollReveal duration={0.7}>
          <Services data={data.services} heading={data.servicesHeading} global={data.global} onOpenBooking={() => handleOpenBooking('90-min')} />
        </ScrollReveal>

        {/* 5. Comment ça se passe ? (1-2-3 steps) */}
        <ScrollReveal duration={0.7}>
          <Process data={data.processSteps} heading={data.processHeading} stepLabel={data.uiLabels.stepLabel} />
        </ScrollReveal>

        {/* 6. Une approche humaine et bienveillante (About Jitany) */}
        <ScrollReveal duration={0.7}>
          <AboutJitany data={data.aboutJitany} global={data.global} uiLabels={data.uiLabels} onOpenBooking={() => handleOpenBooking('90-min')} />
        </ScrollReveal>

        {/* 7. Ce que disent mes clients (Testimonials with star ratings) */}
        <ScrollReveal duration={0.7}>
          <Testimonials
            data={data.testimonials}
            heading={data.testimonialsHeading}
            socialProof={data.testimonialsSocialProof}
            disclaimer={data.testimonialsDisclaimer}
            uiLabels={data.uiLabels}
          />
        </ScrollReveal>

        {/* 8. Tarifs (60min / 90min with "Le plus choisi" badge) */}
        <ScrollReveal duration={0.7}>
          <Pricing
            data={data.pricingPlans}
            heading={data.pricingHeading}
            global={data.global}
            footerNote={data.pricingFooterNote}
            paymentNote={data.pricingPaymentNote}
            onOpenBookingWithPlan={(planId) => handleOpenBooking(planId)}
          />
        </ScrollReveal>

        {/* 9. Massothérapie durant la grossesse */}
        <ScrollReveal duration={0.7}>
          <PregnancySection data={data.pregnancy} onOpenBooking={() => handleOpenBooking('60-min')} />
        </ScrollReveal>

        {/* 10. Questions fréquentes (FAQ) */}
        <ScrollReveal duration={0.7}>
          <FAQ data={data.faq} heading={data.faqHeading} />
        </ScrollReveal>

        {/* 11. Informations pratiques (Address, Phone & Contact Form) */}
        <ScrollReveal duration={0.7}>
          <Contact data={data.practicalInfo} onOpenBooking={() => handleOpenBooking('90-min')} />
        </ScrollReveal>

        {/* 12. Offrez à votre corps le soin qu'il mérite (Final CTA) */}
        <ScrollReveal duration={0.8}>
          <FinalCTA
            data={data.finalCta}
            insuranceDisclaimer={data.global.insuranceDisclaimer}
            onOpenBooking={() => handleOpenBooking('90-min')}
          />
        </ScrollReveal>
      </main>

      {/* Footer */}
      <Footer
        data={data.practicalInfo}
        global={data.global}
        footer={data.footer}
        onOpenBooking={() => handleOpenBooking('90-min')}
        onOpenLegal={handleOpenLegal}
      />

      {/* Sticky Conversion Bar (Mobile & Desktop) */}
      <StickyBookingBar
        data={data.practicalInfo}
        global={data.global}
        header={data.header}
        onOpenBooking={() => handleOpenBooking('90-min')}
      />

      {/* Cookie Policy Banner */}
      <CookieBanner onOpenLegal={handleOpenLegal} />

      {/* Appointment & Contact Request Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={handleCloseBooking}
        defaultPlanId={selectedPlanId}
      />

      {/* Mentions Légales & Confidentialité Modal */}
      <LegalModal
        isOpen={isLegalOpen}
        onClose={handleCloseLegal}
      />
    </div>
  );
}

