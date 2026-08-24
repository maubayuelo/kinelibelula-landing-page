import React, { useState } from 'react';
import { Phone, Menu, X, ShieldCheck, ArrowRight } from 'lucide-react';
import type { LandingData } from '../adapters/normalizeLandingPage';
import type { SupportedLocale } from '../services/queries';

interface HeaderProps {
  data: LandingData['practicalInfo'];
  locale: SupportedLocale;
  onLocaleChange: (locale: SupportedLocale) => void;
  onOpenBooking: () => void;
}

type DisplayLang = 'FR' | 'EN' | 'ES';

const LOCALE_TO_DISPLAY: Record<SupportedLocale, DisplayLang> = { fr: 'FR', en: 'EN', es: 'ES' };
const DISPLAY_TO_LOCALE: Record<DisplayLang, SupportedLocale> = { FR: 'fr', EN: 'en', ES: 'es' };

export const Header: React.FC<HeaderProps> = ({ data, locale, onLocaleChange, onOpenBooking }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const currentLang = LOCALE_TO_DISPLAY[locale];

  const languages: Array<{ code: DisplayLang; label: string; flag: string }> = [
    { code: 'FR', label: 'FR', flag: '🇫🇷' },
    { code: 'EN', label: 'EN', flag: '🇨🇦' },
    { code: 'ES', label: 'ES', flag: '🇲🇽' },
  ];

  const handleNavClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#F9F8F6]/95 backdrop-blur-md border-b border-[#E5E1D8] transition-all">
      {/* Top Meta & Insurance Announcement Banner */}
      <div className="bg-[#2D312E] text-[#F9F8F6] py-2 px-4 text-xs font-medium border-b border-[#3E433F]">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 mx-auto sm:mx-0">
            <span className="w-2 h-2 rounded-full bg-[#C85A28] animate-pulse"></span>
            <span className="tracking-wide text-center sm:text-left">
              Massothérapie professionnelle à Montréal — <span className="text-[#E5E1D8] font-semibold">Reçus d'assurance fournis</span>
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-4 text-[11px] text-[#A6AEA4]">
            <span className="flex items-center gap-1 text-[#F9F8F6]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#C85A28]" />
              25+ ans d'expérience
            </span>
            <span>•</span>
            <a
              href={`tel:${data.phone}`}
              className="hover:text-white underline underline-offset-2 flex items-center gap-1 font-semibold"
            >
              <Phone className="w-3 h-3 text-[#C85A28]" />
              {data.phone}
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#" className="flex flex-col group shrink-0" id="header-logo-link">
          <span className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#2D312E] group-hover:text-[#C85A28] transition-colors">
            KinéLibelula
          </span>
          <span className="text-[10px] sm:text-[11px] text-[#5A5A40] font-sans tracking-widest uppercase font-semibold">
            Jitany Jara • Massothérapie Montréal
          </span>
        </a>

        {/* Desktop Navigation Links (Visible on Wide Desktop ≥ 1280px) */}
        <nav className="hidden xl:flex items-center space-x-7 text-sm font-medium text-[#2D312E]">
          <a href="#services" className="hover:text-[#C85A28] transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#C85A28] hover:after:w-full after:transition-all">Services</a>
          <a href="#tarifs" className="hover:text-[#C85A28] transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#C85A28] hover:after:w-full after:transition-all">Tarifs</a>
          <a href="#grossesse" className="hover:text-[#C85A28] transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#C85A28] hover:after:w-full after:transition-all">Grossesse</a>
          <a href="#a-propos" className="hover:text-[#C85A28] transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#C85A28] hover:after:w-full after:transition-all">À propos</a>
          <a href="#contact" className="hover:text-[#C85A28] transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#C85A28] hover:after:w-full after:transition-all">Contact</a>
        </nav>

        {/* Desktop Right Actions (Visible on Wide Desktop ≥ 1280px) */}
        <div className="hidden xl:flex items-center space-x-3 shrink-0">
          {/* 3-Language Switcher */}
          <div className="flex items-center bg-[#F2F4F0] p-1 border border-[#E5E1D8] rounded-full text-xs font-bold text-[#2D312E]">
            <div className="flex items-center gap-0.5">
              {languages.map((lang) => {
                const isActive = currentLang === lang.code;
                return (
                  <button
                    key={lang.code}
                    onClick={() => onLocaleChange(DISPLAY_TO_LOCALE[lang.code])}
                    className={`px-2 py-1 rounded-full text-[11px] font-bold transition-all ${
                      isActive
                        ? 'bg-[#C85A28] text-white shadow-2xs'
                        : 'text-[#5E645D] hover:text-[#2D312E] hover:bg-white/60'
                    }`}
                    title={`Langue: ${lang.code}`}
                    id={`lang-switcher-${lang.code.toLowerCase()}`}
                  >
                    {lang.code}
                  </button>
                );
              })}
            </div>
          </div>

          <a
            href={`tel:${data.phone}`}
            className="flex items-center gap-2 text-xs font-semibold text-[#2D312E] hover:text-[#C85A28] transition-all px-3.5 py-2 rounded-full border border-[#E5E1D8] bg-[#F2F4F0]/60 hover:bg-white whitespace-nowrap"
            id="header-phone-link"
          >
            <Phone className="w-3.5 h-3.5 text-[#C85A28]" />
            <span>{data.phone}</span>
          </a>

          <a
            href="#contact"
            className="px-5 py-2.5 cta-gradient-hover text-white text-xs font-bold uppercase tracking-wider rounded-full transition-all shadow-sm hover:shadow-md flex items-center gap-2 group whitespace-nowrap"
            id="header-book-btn"
          >
            <span>Prendre rendez-vous</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        {/* Tablet & Mobile Controls (Visible on < 1280px: iPads, Tablets, Phones) */}
        <div className="flex xl:hidden items-center gap-2 sm:gap-3 shrink-0">
          {/* Compact Language Switcher */}
          <div className="flex items-center bg-[#F2F4F0] p-0.5 sm:p-1 border border-[#E5E1D8] rounded-full text-[11px] font-bold">
            <div className="flex items-center gap-0.5">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => onLocaleChange(DISPLAY_TO_LOCALE[lang.code])}
                  className={`px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full font-bold transition-all text-[10px] sm:text-[11px] ${
                    currentLang === lang.code
                      ? 'bg-[#C85A28] text-white shadow-2xs'
                      : 'text-[#5E645D] hover:text-[#2D312E]'
                  }`}
                  aria-label={`Choisir la langue ${lang.label}`}
                >
                  {lang.code}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Call Button on Tablet */}
          <a
            href={`tel:${data.phone}`}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#F2F4F0] hover:bg-white border border-[#E5E1D8] text-[#2D312E] text-xs font-semibold rounded-full transition-all whitespace-nowrap"
            title="Appeler le cabinet"
          >
            <Phone className="w-3.5 h-3.5 text-[#C85A28]" />
            <span className="hidden md:inline">{data.phone}</span>
            <span className="md:hidden">Appeler</span>
          </a>

          {/* Quick Request Button on Tablet */}
          <a
            href="#contact"
            className="hidden sm:inline-flex px-3.5 py-1.5 cta-gradient-hover text-white text-xs font-semibold rounded-full shadow-2xs"
            id="tablet-quick-booking"
          >
            Prendre rendez-vous
          </a>

          {/* Hamburger Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 sm:p-2.5 bg-[#F2F4F0] hover:bg-[#E5E1D8]/60 border border-[#E5E1D8] rounded-full text-[#2D312E] hover:text-[#C85A28] transition-colors flex items-center justify-center"
            aria-label="Ouvrir le menu de navigation"
            id="tablet-menu-toggle"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Tablet & Mobile Drawer / Slide-out Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#F9F8F6] border-b border-[#E5E1D8] px-6 py-6 space-y-5 animate-fadeIn shadow-xl">
          {/* Navigation Links */}
          <nav className="flex flex-col space-y-3 font-serif text-lg text-[#2D312E]">
            <a 
              href="#services" 
              onClick={handleNavClick} 
              className="py-1.5 hover:text-[#C85A28] border-b border-[#E5E1D8]/50 transition-colors"
            >
              Services & Techniques
            </a>
            <a 
              href="#tarifs" 
              onClick={handleNavClick} 
              className="py-1.5 hover:text-[#C85A28] border-b border-[#E5E1D8]/50 transition-colors"
            >
              Tarifs & Formules
            </a>
            <a 
              href="#grossesse" 
              onClick={handleNavClick} 
              className="py-1.5 hover:text-[#C85A28] border-b border-[#E5E1D8]/50 transition-colors"
            >
              Massage Prénatal (Grossesse)
            </a>
            <a 
              href="#a-propos" 
              onClick={handleNavClick} 
              className="py-1.5 hover:text-[#C85A28] border-b border-[#E5E1D8]/50 transition-colors"
            >
              À propos de Jitany
            </a>
            <a 
              href="#contact" 
              onClick={handleNavClick} 
              className="py-1.5 hover:text-[#C85A28] transition-colors"
            >
              Contact & Accès
            </a>
          </nav>

          {/* Action CTAs inside Drawer */}
          <div className="pt-3 border-t border-[#E5E1D8] flex flex-col sm:flex-row gap-3">
            <a
              href={`tel:${data.phone}`}
              className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-[#F2F4F0] border border-[#E5E1D8] text-[#2D312E] font-semibold rounded-full text-xs uppercase tracking-wider hover:bg-white transition-all"
            >
              <Phone className="w-4 h-4 text-[#C85A28]" />
              <span>Appeler le {data.phone}</span>
            </a>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="flex-1 py-3 px-6 cta-gradient-hover text-white font-bold rounded-full text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all text-center"
            >
              Prendre rendez-vous
            </a>
          </div>
        </div>
      )}
    </header>
  );
};


