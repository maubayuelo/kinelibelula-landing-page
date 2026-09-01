import React from 'react';
import { Star, ShieldCheck, ArrowRight, Sparkles, HeartHandshake } from 'lucide-react';
import type { LandingData } from '../adapters/normalizeLandingPage';
import { HighlightedTitle } from './HighlightedTitle';

interface HeroProps {
  data: LandingData['hero'];
  global: LandingData['global'];
  onOpenBooking: () => void;
}

export const Hero: React.FC<HeroProps> = ({ data, global, onOpenBooking }) => {
  return (
    <section id="top" className="relative pt-10 pb-16 md:pt-16 md:pb-24 overflow-hidden bg-gradient-to-b from-[#FAF8F5] via-[#F4F1EA]/80 to-[#F9F8F6]">
      {/* Background ambient light gradient glows (matching FinalCTA style in light warm tones) */}
      <div className="absolute -top-28 left-1/2 -translate-x-1/2 w-[700px] h-[350px] rounded-full bg-gradient-to-r from-[#C85A28]/12 via-[#D4A373]/15 to-[#5A5A40]/10 blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/3 -right-24 w-[450px] h-[300px] rounded-full bg-[#C85A28]/8 blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-10 -left-20 w-[400px] h-[250px] rounded-full bg-[#5A5A40]/10 blur-3xl pointer-events-none"></div>

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          
          {/* Text Column (Appears second on mobile, first on desktop) */}
          <div className="order-2 lg:order-1 lg:col-span-5 space-y-6 text-left">
            
            {/* Eyebrow Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#F2F4F0] border border-[#E5E1D8] text-[#5A5A40] text-xs font-bold uppercase tracking-widest rounded-full shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-[#C85A28]" />
              <span>{data.eyebrow}</span>
            </div>

            {/* Display Headline */}
            <HighlightedTitle
              as="h1"
              className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#2D312E] leading-[1.15] tracking-tight"
              highlightClassName="font-serif italic text-[#C85A28]"
              title={data.title}
              highlight={data.titleHighlight}
            />

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-[#5E645D] max-w-2xl font-normal leading-relaxed">
              {data.subtitle}
            </p>

            {/* Main Action CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              <button
                onClick={onOpenBooking}
                className="px-7 py-3.5 cta-gradient-hover text-white font-bold text-xs uppercase tracking-wider rounded-full transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 text-center flex items-center justify-center gap-3 group"
                id="hero-primary-cta-btn"
              >
                <span>{data.ctaPrimary}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-white" />
              </button>

              <a
                href="#services"
                className="px-6 py-3.5 bg-[#F2F4F0] border border-[#E5E1D8] text-[#2D312E] font-bold text-xs uppercase tracking-wider rounded-full hover:bg-white transition-all text-center"
              >
                {data.ctaSecondaryLabel}
              </a>
            </div>

            {/* Insurance Guarantee Badge & Disclaimer */}
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-[#E5E1D8] rounded-full text-xs text-[#2D312E] shadow-2xs">
                <ShieldCheck className="w-4 h-4 text-[#C85A28] shrink-0" />
                <span>{data.insuranceLine}</span>
              </div>
              <p className="text-[11px] text-[#5E645D] pl-1">
                {global.insuranceDisclaimer}
              </p>
            </div>

            {/* Micro Trust Bullet List */}
            <div className="pt-3 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs sm:text-sm text-[#5E645D] border-t border-[#E5E1D8]">
              {data.microTrust.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C85A28]"></span>
                  <span>{item}</span>
                </div>
              ))}
            </div>

            {/* Social Proof Rating */}
            <div className="pt-1 flex items-center gap-3">
              <div className="flex text-[#F2C94C]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#F2C94C] stroke-[#F2C94C]" />
                ))}
              </div>
              <span className="text-xs font-semibold text-[#2D312E]">
                Plus de 100 avis clients à Montréal
              </span>
            </div>

          </div>

          {/* Image Column (Appears first on mobile, second on desktop, 7 columns on desktop) */}
          <div className="order-1 lg:order-2 lg:col-span-7 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Subtle Warm Backdrop */}
              <div className="absolute -inset-2 bg-[#F2F4F0] rounded-3xl transform rotate-1 border border-[#E5E1D8]"></div>
              
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-[#E5E1D8] bg-white aspect-[4/3] sm:aspect-[16/11]">
                <img
                  src={data.image.url}
                  alt={data.image.alt}
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />

                {/* Dark gradient vignette at bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
              </div>

              {/* Floating Badge: 25+ ans d'expérience */}
              <div className="absolute -bottom-6 left-6 bg-white/95 backdrop-blur-md px-5 py-3.5 rounded-2xl shadow-xl border border-[#E5E1D8] flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#C85A28]/10 text-[#C85A28] flex items-center justify-center shrink-0">
                  <Star className="w-5 h-5 fill-[#C85A28] stroke-[#C85A28]" />
                </div>
                <div>
                  <div className="font-serif font-bold text-lg text-[#2D312E] leading-none">
                    {data.experienceYears}
                  </div>
                  <div className="text-xs text-[#5E645D] font-medium pt-1">
                    {data.experienceLabel}
                  </div>
                </div>
              </div>

              {/* Floating Top Badge: Montréal */}
              <div className="absolute -top-4 right-6 bg-[#2D312E] text-[#F9F8F6] px-4 py-2 rounded-full shadow-lg border border-[#3E433F] text-xs font-semibold flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#C85A28]"></span>
                <span>3795 Rue Masson, Montréal</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

