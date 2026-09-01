import React from 'react';
import { Award, Heart, Users, ShieldCheck, Star, Sparkles, ArrowRight, CheckCircle2, FileCheck, Building2 } from 'lucide-react';
import type { LandingData } from '../adapters/normalizeLandingPage';
import { HighlightedTitle } from './HighlightedTitle';

interface AboutJitanyProps {
  data: LandingData['aboutJitany'];
  global: LandingData['global'];
  uiLabels: LandingData['uiLabels'];
  onOpenBooking: () => void;
}

export const AboutJitany: React.FC<AboutJitanyProps> = ({ data, global, uiLabels, onOpenBooking }) => {
  return (
    <section id="about" className="py-16 md:py-24 bg-[#F9F8F6]">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Visual Profile Card & Photo */}
          <div className="lg:col-span-5 relative">
            <div className="relative max-w-md mx-auto">
              
              {/* Decorative warm background shape */}
              <div className="absolute -inset-3 bg-[#F2F4F0] border border-[#E5E1D8] rounded-3xl transform -rotate-1"></div>
              
              {/* Main Photo Card */}
              <div className="relative bg-white rounded-3xl overflow-hidden border border-[#E5E1D8] shadow-xl p-4">
                <div className="aspect-[4/5] rounded-2xl overflow-hidden relative">
                  <img
                    src={data.image.url}
                    alt={data.image.alt}
                    className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Floating Experience Badge */}
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-4 py-2 rounded-full shadow-md border border-[#E5E1D8] flex items-center gap-2">
                    <Star className="w-4 h-4 text-[#C85A28] fill-[#C85A28]" />
                    <span className="font-serif font-bold text-xs text-[#2D312E]">25+ ans d'expertise</span>
                  </div>
                </div>

                {/* Micro Quote Banner under photo */}
                <div className="p-4 pt-5 text-left space-y-1">
                  <div className="font-serif italic text-sm text-[#2D312E]">
                    {uiLabels.quoteOpen}{data.imageCaption}{uiLabels.quoteClose}
                  </div>
                  <div className="text-xs text-[#5E645D] font-medium">
                    — {data.imageCaptionAttribution}
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Narrative & Key Highlights */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Category Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#F2F4F0] border border-[#E5E1D8] text-[#5A5A40] text-xs font-bold uppercase tracking-widest rounded-full">
              <Sparkles className="w-3.5 h-3.5 text-[#C85A28]" />
              <span>{data.eyebrow}</span>
            </div>

            {/* Main Heading */}
            <HighlightedTitle
              className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#2D312E] leading-tight"
              title={data.title}
              highlight={data.titleHighlight}
            />

            {/* Paragraphs */}
            <div className="space-y-4 text-sm sm:text-base leading-relaxed">
              <p className="font-medium text-[#2D312E] text-base sm:text-lg">
                {data.p1}
              </p>
              <p className="text-[#2D312E] font-medium">
                {data.p2}
              </p>
              <p className="text-[#3E433F]">
                {data.pCoaching}
              </p>
              <p className="font-serif font-normal text-[#2D312E] border-l-2 border-[#C85A28] pl-4 py-2 bg-[#F2F4F0] rounded-r-xl not-italic">
                {uiLabels.quoteOpen}{data.p3}{uiLabels.quoteClose}
              </p>
            </div>

            {/* Highlights Grid — driven by data.badges; a badge with no real
                text (blank, or a raw "[PENDIENTE...]" placeholder the WP
                field hasn't been filled in for yet) is skipped rather than
                printed literally. */}
            <div className="grid grid-cols-2 gap-3 pt-3">
              {data.badges
                .filter((badge) => badge.text.trim() !== '' && !/^\[.*\]$/.test(badge.text.trim()))
                .map((badge, idx) => (
                  <div key={idx} className="p-3.5 bg-white border border-[#E5E1D8] rounded-xl flex items-center gap-3 shadow-2xs">
                    <div className="w-9 h-9 rounded-full bg-[#C85A28]/10 text-[#C85A28] flex items-center justify-center shrink-0">
                      {badge.icon === 'Heart' && <Heart className="w-4 h-4" />}
                      {badge.icon === 'Users' && <Users className="w-4 h-4" />}
                      {badge.icon === 'ShieldCheck' && <ShieldCheck className="w-4 h-4" />}
                      {badge.icon === 'Award' && <Award className="w-4 h-4" />}
                    </div>
                    <div>
                      <div className="font-serif font-bold text-sm text-[#2D312E]">{badge.text}</div>
                    </div>
                  </div>
                ))}
            </div>

            {/* CTA Button */}
            <div className="pt-4">
              <a
                href="#contact"
                className="px-8 py-3.5 cta-gradient-hover text-white font-bold text-xs uppercase tracking-wider rounded-full transition-all shadow-md inline-flex items-center gap-3 group"
                id="about-cta-btn"
              >
                <span>{global.ctaLabel}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

          </div>

        </div>

        {/* 3 Certifications / Therapist Associations Block */}
        <div className="mt-16 pt-12 border-t border-[#E5E1D8]">
          <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#5A5A40]">
              <Building2 className="w-4 h-4 text-[#C85A28]" />
              <span>{data.certEyebrow}</span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#2D312E]">
              {data.certTitle}
            </h3>
            <p className="text-xs sm:text-sm text-[#3E433F]">
              {data.certSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {data.certifications.map((cert) => (
              <div 
                key={cert.id} 
                className="bg-white border border-[#E5E1D8] hover:border-[#C85A28]/40 rounded-2xl p-6 transition-all shadow-2xs hover:shadow-md flex flex-col justify-between group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-16 h-16 bg-[#F2F4F0] rounded-bl-3xl -z-0 group-hover:bg-[#C85A28]/10 transition-colors"></div>
                
                <div className="relative z-10 space-y-4 text-left">
                  <div className="w-12 h-12 rounded-2xl bg-[#F2F4F0] group-hover:bg-[#C85A28] text-[#C85A28] group-hover:text-white flex items-center justify-center transition-colors">
                    {cert.icon === 'ShieldCheck' && <ShieldCheck className="w-6 h-6" />}
                    {cert.icon === 'Award' && <Award className="w-6 h-6" />}
                    {cert.icon === 'FileCheck' && <FileCheck className="w-6 h-6" />}
                  </div>

                  <div>
                    <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-[#C85A28] bg-[#C85A28]/10 px-2.5 py-1 rounded-full mb-2">
                      {cert.badge}
                    </span>
                    <h4 className="font-serif font-bold text-lg text-[#2D312E] leading-snug">
                      {cert.title}
                    </h4>
                    <p className="text-sm text-[#3E433F] font-medium mt-1.5 leading-relaxed">
                      {cert.association}
                    </p>
                  </div>
                </div>

                <div className="relative z-10 pt-4 mt-4 border-t border-[#F2F4F0] flex items-center gap-2 text-[11px] font-semibold text-[#5A5A40]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#C85A28]" />
                  <span>{cert.footnote}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Short note below certifications */}
          <div className="text-center mt-6 space-y-1">
            <p className="text-xs text-[#5E645D]">
              {data.certFootnote}
            </p>
            <p className="text-[11px] text-[#5A5A40]">
              {global.insuranceDisclaimer}
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};


