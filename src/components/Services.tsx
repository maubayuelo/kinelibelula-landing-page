import React from 'react';
import { Check, ArrowRight, Sparkles } from 'lucide-react';
import type { LandingData } from '../adapters/normalizeLandingPage';

interface ServicesProps {
  data: LandingData['services'];
  onOpenBooking: () => void;
}

export const Services: React.FC<ServicesProps> = ({ data, onOpenBooking }) => {
  return (
    <section id="services" className="py-16 md:py-24 bg-[#F2F4F0] border-y border-[#E5E1D8]">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-[#E5E1D8] text-[#5A5A40] text-xs font-bold uppercase tracking-widest rounded-full">
            <Sparkles className="w-3.5 h-3.5 text-[#C85A28]" />
            <span>Expertise & Massothérapie</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#2D312E] tracking-tight">
            Mes <span className="text-[#C85A28] italic font-serif">
              services
            </span>
          </h2>
          <p className="text-sm sm:text-base text-[#3E433F]">
            Des techniques thérapeutiques variées pour répondre à tous vos besoins
          </p>
        </div>

        {/* 3 Service Cards matching reference image layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {data.map((service) => (
            <div
              key={service.id}
              className="bg-white border border-[#E5E1D8] rounded-2xl p-8 flex flex-col justify-between hover:shadow-xl transition-all duration-300 text-left group"
              id={`service-card-${service.id}`}
            >
              <div className="space-y-6">
                <h3 className="font-serif text-2xl font-semibold text-[#2D312E] leading-snug">
                  {service.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#3E433F] leading-relaxed">
                  {service.description}
                </p>

                <ul className="space-y-3 pt-4 border-t border-[#E5E1D8]">
                  {service.items.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-sm text-[#2D312E]">
                      <span className="w-5 h-5 rounded-full bg-[#C85A28]/10 text-[#C85A28] flex items-center justify-center shrink-0">
                        <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                      </span>
                      <span className="font-medium text-xs sm:text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-8">
                <a
                  href="#contact"
                  className="w-full py-3 px-4 bg-[#F2F4F0] hover:bg-[#2D312E] hover:text-[#F9F8F6] text-[#2D312E] font-bold text-xs uppercase tracking-wider rounded-full border border-[#E5E1D8] transition-all flex items-center justify-center gap-2 group/btn"
                >
                  <span>Choisir ce soin</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform text-[#C85A28]" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Main Section CTA */}
        <div className="text-center">
          <a
            href="#contact"
            className="px-8 py-3.5 bg-[#C85A28] text-white font-bold text-xs uppercase tracking-wider rounded-full hover:bg-[#2D312E] transition-all shadow-md hover:shadow-lg inline-flex items-center gap-2 group"
            id="services-cta-btn"
          >
            <span>Prendre rendez-vous</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

      </div>
    </section>
  );
};

