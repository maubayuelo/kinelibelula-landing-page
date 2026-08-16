import React from 'react';
import { Moon, HeartPulse, Sparkles, ArrowRight } from 'lucide-react';
import { BENEFITS_DATA } from '../data/landingData';

interface BenefitsProps {
  onOpenBooking: () => void;
}

export const Benefits: React.FC<BenefitsProps> = ({ onOpenBooking }) => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'Moon':
        return <Moon className="w-6 h-6 text-[#C85A28]" />;
      case 'HeartPulse':
        return <HeartPulse className="w-6 h-6 text-[#C85A28]" />;
      case 'Sparkles':
        return <Sparkles className="w-6 h-6 text-[#C85A28]" />;
      default:
        return <Sparkles className="w-6 h-6 text-[#C85A28]" />;
    }
  };

  return (
    <section className="py-16 md:py-24 bg-[#F2F4F0] border-y border-[#E5E1D8]">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-[#E5E1D8] text-[#5A5A40] text-xs font-bold uppercase tracking-widest rounded-full">
            <Sparkles className="w-3.5 h-3.5 text-[#C85A28]" />
            <span>Les bienfaits concrets</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#2D312E] tracking-tight">
            Pourquoi choisir la{' '}
            <span className="text-[#C85A28] italic font-serif">
              massothérapie ?
            </span>
          </h2>
          <p className="text-sm sm:text-base text-[#3E433F]">
            Une approche holistique reconnue pour ses bienfaits
          </p>
        </div>

        {/* 3 Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {BENEFITS_DATA.map((item, idx) => (
            <div
              key={idx}
              className="bg-white border border-[#E5E1D8] p-8 rounded-2xl text-left transition-all hover:shadow-xl duration-300 flex flex-col justify-between group"
              id={`benefit-card-${idx}`}
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-[#F2F4F0] border border-[#E5E1D8] flex items-center justify-center mb-5 group-hover:bg-[#C85A28]/10 transition-colors">
                  {getIcon(item.icon)}
                </div>
                <h3 className="font-serif text-2xl font-semibold text-[#2D312E]">
                  {item.title}
                </h3>
                <p className="text-sm text-[#3E433F] leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="pt-8 border-t border-[#E5E1D8] mt-6">
                <a
                  href="#contact"
                  className="w-full py-2.5 px-4 bg-[#F2F4F0] hover:bg-[#2D312E] hover:text-[#F9F8F6] text-[#2D312E] font-bold text-xs uppercase tracking-wider rounded-full border border-[#E5E1D8] transition-all flex items-center justify-center gap-2 group/btn"
                >
                  <span>Découvrir les soins</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform text-[#C85A28]" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Section CTA */}
        <div className="text-center">
          <a
            href="#contact"
            className="px-8 py-3.5 bg-[#C85A28] text-white font-bold text-xs uppercase tracking-wider rounded-full hover:bg-[#2D312E] transition-all shadow-md hover:shadow-lg inline-flex items-center gap-2 group"
            id="benefits-cta-btn"
          >
            <span>Prendre rendez-vous</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
};

