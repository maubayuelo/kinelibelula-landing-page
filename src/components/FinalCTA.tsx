import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import type { LandingData } from '../adapters/normalizeLandingPage';
import { HighlightedTitle } from './HighlightedTitle';

interface FinalCTAProps {
  data: LandingData['finalCta'];
  insuranceDisclaimer: string;
  onOpenBooking: () => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ data, insuranceDisclaimer, onOpenBooking }) => {
  return (
    <section className="bg-[#2D312E] text-[#F9F8F6] py-20 md:py-28 text-center relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-[#C85A28]/20 blur-3xl pointer-events-none"></div>

      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8">

        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 border border-white/20 text-[#F9F8F6] text-xs font-bold uppercase tracking-widest rounded-full">
          <Sparkles className="w-3.5 h-3.5 text-[#C85A28]" />
          <span>{data.eyebrow}</span>
        </div>

        <HighlightedTitle
          className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight leading-tight"
          title={data.title}
          highlight={data.titleHighlight}
        />

        <p className="text-base sm:text-lg text-[#A6AEA4] max-w-2xl mx-auto font-normal leading-relaxed">
          {data.text}
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={data.buttonLink}
            className="w-full sm:w-auto px-9 py-4 cta-gradient-hover text-white font-bold text-xs uppercase tracking-wider rounded-full transition-all duration-300 shadow-xl flex items-center justify-center gap-2 group hover:-translate-y-0.5"
            id="final-cta-btn"
          >
            <span>{data.buttonLabel}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        <div className="space-y-1 pt-2">
          <p className="text-xs text-[#A6AEA4] uppercase tracking-wider font-semibold">
            {data.insuranceNote}
          </p>
          <p className="text-[11px] text-[#A6AEA4]/80">
            {insuranceDisclaimer}
          </p>
        </div>
      </div>
    </section>
  );
};
