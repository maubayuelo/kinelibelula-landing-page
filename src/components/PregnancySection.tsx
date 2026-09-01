import React from 'react';
import { Heart, Baby, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import type { LandingData } from '../adapters/normalizeLandingPage';
import { HighlightedTitle } from './HighlightedTitle';

interface PregnancyProps {
  data: LandingData['pregnancy'];
  onOpenBooking?: () => void;
}

export const PregnancySection: React.FC<PregnancyProps> = ({ data, onOpenBooking }) => {
  return (
    <section id="pregnancy" className="py-16 md:py-24 bg-[#F9F8F6]">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-white border border-[#E5E1D8] rounded-3xl p-8 sm:p-12 shadow-xl overflow-hidden relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Text Content */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#F2F4F0] border border-[#E5E1D8] text-[#5A5A40] text-xs font-bold uppercase tracking-widest rounded-full">
                <Baby className="w-4 h-4 text-[#C85A28]" />
                <span>{data.eyebrow}</span>
              </div>

              <HighlightedTitle
                className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#2D312E] leading-tight"
                title={data.title}
                highlight={data.titleHighlight}
              />

              <p className="text-sm sm:text-base text-[#5E645D] leading-relaxed">
                {data.description}
              </p>

              <ul className="space-y-3 pt-2">
                {data.bulletPoints.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-[#2D312E]">
                    <span className="p-1 rounded-full bg-[#C85A28]/10 text-[#C85A28] mt-0.5 shrink-0">
                      <Heart className="w-3.5 h-3.5 fill-[#C85A28]" />
                    </span>
                    <span className="font-medium leading-normal">{point}</span>
                  </li>
                ))}
              </ul>

              <p className="text-sm text-[#3E433F] leading-relaxed border-l-2 border-[#E5E1D8] pl-4">
                {data.medicalNote}
              </p>

              <div className="pt-4">
                <button
                  onClick={onOpenBooking}
                  className="px-8 py-3.5 bg-[#2D312E] text-[#F9F8F6] font-bold text-xs uppercase tracking-wider rounded-full hover:bg-[#C85A28] transition-all shadow-md inline-flex items-center gap-2 group"
                  id="pregnancy-cta-btn"
                >
                  <span>{data.ctaText}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-[#C85A28] group-hover:text-white" />
                </button>
              </div>
            </div>

            {/* Right Column Image */}
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl overflow-hidden shadow-xl border border-[#E5E1D8] aspect-square max-w-md mx-auto group">
                <img
                  src={data.image.url}
                  alt={data.image.alt}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                
                {/* Micro Badge Overlay */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl border border-[#E5E1D8] shadow-sm flex items-center gap-3">
                  <ShieldCheck className="w-5 h-5 text-[#C85A28] shrink-0" />
                  <div className="text-left text-xs text-[#2D312E] font-medium">
                    {data.badgeNote}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

