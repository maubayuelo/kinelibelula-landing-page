import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

interface FinalCTAProps {
  onOpenBooking: () => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ onOpenBooking }) => {
  return (
    <section className="bg-[#2D312E] text-[#F9F8F6] py-20 md:py-28 text-center relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-[#C85A28]/20 blur-3xl pointer-events-none"></div>

      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8">
        
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 border border-white/20 text-[#F9F8F6] text-xs font-bold uppercase tracking-widest rounded-full">
          <Sparkles className="w-3.5 h-3.5 text-[#C85A28]" />
          <span>Séance individuelle sur-mesure</span>
        </div>

        <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight leading-tight">
          Offrez à votre corps le soin qu'il{' '}
          <span className="text-[#C85A28] italic font-serif">
            mérite
          </span>
        </h2>

        <p className="text-base sm:text-lg text-[#A6AEA4] max-w-2xl mx-auto font-normal leading-relaxed">
          Prenez un moment pour vous, libérez vos tensions musculaires accumulées et retrouvez votre mobilité naturelle dès aujourd'hui.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#contact"
            className="w-full sm:w-auto px-9 py-4 cta-gradient-hover text-white font-bold text-xs uppercase tracking-wider rounded-full transition-all duration-300 shadow-xl flex items-center justify-center gap-2 group hover:-translate-y-0.5"
            id="final-cta-btn"
          >
            <span>Prendre rendez-vous</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        <div className="space-y-1 pt-2">
          <p className="text-xs text-[#A6AEA4] uppercase tracking-wider font-semibold">
            Reçus d'assurance massothérapie fournis
          </p>
          <p className="text-[11px] text-[#A6AEA4]/80">
            Reçus valides selon votre couverture — vérifiez auprès de votre assureur.
          </p>
        </div>
      </div>
    </section>
  );
};

