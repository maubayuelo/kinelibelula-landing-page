import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Sparkles } from 'lucide-react';
import { FAQ_DATA } from '../data/landingData';

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 md:py-24 bg-[#F2F4F0] border-y border-[#E5E1D8]">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-[#E5E1D8] text-[#5A5A40] text-xs font-bold uppercase tracking-widest rounded-full">
            <HelpCircle className="w-3.5 h-3.5 text-[#C85A28]" />
            <span>Réponses à vos questions</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#2D312E] tracking-tight">
            Questions{' '}
            <span className="text-[#C85A28] italic font-serif">
              fréquentes
            </span>
          </h2>
          <p className="text-sm sm:text-base text-[#5E645D]">
            Tout ce que vous devez savoir avant de réserver votre soin
          </p>
        </div>

        {/* Accordion List */}
        <div className="max-w-3xl mx-auto space-y-4">
          {FAQ_DATA.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`bg-white border rounded-2xl overflow-hidden transition-all duration-300 ${
                  isOpen ? 'border-[#C85A28] shadow-md' : 'border-[#E5E1D8] shadow-2xs hover:border-[#2D312E]'
                }`}
                id={`faq-accordion-item-${idx}`}
              >
                <button
                  onClick={() => toggleAccordion(idx)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-[#F2F4F0]/50 transition-colors gap-4"
                  aria-expanded={isOpen}
                >
                  <span className="font-serif font-semibold text-base sm:text-lg text-[#2D312E]">
                    {item.question}
                  </span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all ${
                    isOpen ? 'bg-[#C85A28] text-white' : 'bg-[#F2F4F0] text-[#2D312E]'
                  }`}>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-300 ${
                        isOpen ? 'transform rotate-180' : ''
                      }`}
                    />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-2 text-xs sm:text-sm text-[#5E645D] leading-relaxed border-t border-[#E5E1D8] bg-[#F2F4F0]/30">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};


