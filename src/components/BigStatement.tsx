import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

interface BigStatementProps {
  onOpenBooking: () => void;
}

export const BigStatement: React.FC<BigStatementProps> = ({ onOpenBooking }) => {
  return (
    <section className="py-16 md:py-24 bg-[#2D312E] text-[#F9F8F6] relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute -top-32 -left-32 w-80 h-80 rounded-full bg-[#C85A28]/20 blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-32 -right-32 w-80 h-80 rounded-full bg-[#5A5A40]/30 blur-3xl pointer-events-none"></div>

      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-8">
        
        {/* Top Eyebrow Tag */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 border border-white/15 rounded-full text-xs font-semibold text-[#E5E1D8] tracking-widest uppercase">
          <Sparkles className="w-3.5 h-3.5 text-[#C85A28]" />
          <span>L'engagement KinéLibelula</span>
        </div>

        {/* Large Editorial Headline */}
        <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl font-normal leading-snug tracking-tight text-white max-w-4xl mx-auto">
          "Un soin d'exception alliant{' '}
          <span className="text-[#C85A28] italic font-serif">
            rigueur thérapeutique
          </span>{' '}
          et écoute attentive pour libérer durablement vos douleurs."
        </h2>

        {/* Description Text */}
        <p className="text-sm sm:text-base text-[#C5BDB3] max-w-2xl mx-auto font-normal leading-relaxed">
          Chaque rendez-vous débute par un bilan personnalisé afin d'adapter précisément chaque pression, manœuvre et étirement à votre anatomie et à votre état de fatigue.
        </p>

        {/* Pill Button CTA */}
        <div className="pt-2">
          <button
            onClick={onOpenBooking}
            className="px-8 py-3.5 cta-gradient-hover text-white text-xs font-bold uppercase tracking-wider rounded-full transition-all shadow-lg inline-flex items-center gap-3 group hover:-translate-y-0.5"
          >
            <span>Prendre rendez-vous</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>
    </section>
  );
};
