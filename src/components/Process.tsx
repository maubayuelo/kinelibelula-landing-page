import React from 'react';
import { Calendar, PhoneCall, Sparkles } from 'lucide-react';
import type { LandingData } from '../adapters/normalizeLandingPage';

interface ProcessProps {
  data: LandingData['processSteps'];
}

export const Process: React.FC<ProcessProps> = ({ data }) => {
  const getStepIcon = (step: string) => {
    switch (step) {
      case "1":
        return <Calendar className="w-5 h-5" />;
      case "2":
        return <PhoneCall className="w-5 h-5" />;
      case "3":
        return <Sparkles className="w-5 h-5" />;
      default:
        return <Sparkles className="w-5 h-5" />;
    }
  };

  return (
    <section className="py-16 md:py-24 bg-[#F2F4F0] border-y border-[#E5E1D8]" id="process">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-[#E5E1D8] text-[#5A5A40] text-xs font-bold uppercase tracking-widest rounded-full">
            <Sparkles className="w-3.5 h-3.5 text-[#C85A28]" />
            <span>Simplicité & sérénité</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#2D312E] tracking-tight">
            Comment ça{' '}
            <span className="text-[#C85A28] italic font-serif">
              se passe ?
            </span>
          </h2>
          <p className="text-sm sm:text-base text-[#3E433F]">
            Un parcours simple et transparent en 3 étapes vers votre bien-être
          </p>
        </div>

        {/* 3 Step Cards with Seamlessly Integrated Number & Icon */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {data.map((step, idx) => (
            <div
              key={idx}
              className="bg-white border border-[#E5E1D8] rounded-2xl p-8 text-left flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 hover:border-[#C85A28]/40 transition-all duration-300 relative group"
              id={`process-step-${idx}`}
            >
              <div>
                {/* Integrated Header: Icon Box on Left + Single Step Pill on Right */}
                <div className="flex items-center justify-between mb-6 pb-6 border-b border-[#E5E1D8]">
                  <div className="w-12 h-12 rounded-xl bg-[#F2F4F0] border border-[#E5E1D8] text-[#C85A28] group-hover:bg-[#2D312E] group-hover:text-[#F9F8F6] group-hover:border-[#2D312E] flex items-center justify-center transition-all duration-300 shadow-2xs">
                    {getStepIcon(step.stepNumber)}
                  </div>

                  <span className="text-xs font-bold uppercase tracking-widest text-[#5A5A40] bg-[#F2F4F0] px-3.5 py-1.5 rounded-full border border-[#E5E1D8] group-hover:border-[#C85A28]/40 group-hover:text-[#C85A28] transition-colors">
                    Étape {step.stepNumber}
                  </span>
                </div>

                {/* Title & Description */}
                <h3 className="font-serif text-xl sm:text-2xl font-semibold text-[#2D312E] mb-3 leading-snug">
                  {step.title}
                </h3>
                <p className="text-sm text-[#3E433F] leading-relaxed">
                  {step.description}
                </p>
              </div>

              {/* Subtle bottom indicator */}
              <div className="mt-8 pt-4 border-t border-[#F2F4F0] flex items-center gap-2 text-xs font-semibold text-[#5A5A40]">
                <div className="w-2 h-2 rounded-full bg-[#C85A28]"></div>
                <span>
                  {idx === 0 && 'Échange initial sans engagement'}
                  {idx === 1 && 'Planification personnalisée'}
                  {idx === 2 && 'Reçu d’assurance sur place'}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

