import React, { useState } from 'react';
import { Star, Quote, CheckCircle2, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { TESTIMONIALS_DATA } from '../data/landingData';

export const Testimonials: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | string>('all');

  return (
    <section className="py-16 md:py-24 bg-[#F9F8F6]">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-14">
          <div className="text-left max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#F2F4F0] border border-[#E5E1D8] text-[#5A5A40] text-xs font-bold uppercase tracking-widest rounded-full">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#C85A28]" />
              <span>Témoignages de nos clients</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#2D312E] tracking-tight">
              Ce que disent{' '}
              <span className="text-[#C85A28] italic font-serif">
                mes clients
              </span>
            </h2>
            <p className="text-sm sm:text-base text-[#3E433F]">
              Leurs témoignages authentiques reflètent mon engagement pour votre soulagement
            </p>
          </div>

          {/* Social Proof Box */}
          <div className="bg-white border border-[#E5E1D8] p-4 rounded-2xl flex items-center gap-3 shadow-sm shrink-0">
            <div className="w-9 h-9 rounded-full bg-[#C85A28]/10 text-[#C85A28] flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div className="text-xs text-[#3E433F] font-medium text-left">
              <div className="font-bold text-[#2D312E]">Plus de 100 avis à Montréal</div>
              <div>Cabinet KinéLibelula • Rosemont</div>
            </div>
          </div>
        </div>

        {/* Bento Grid Layout for Testimonial Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {TESTIMONIALS_DATA.map((item, index) => {
            let colSpan = 'lg:col-span-6';
            let isFeatured = false;

            if (index === 0) {
              colSpan = 'lg:col-span-6';
              isFeatured = true;
            } else if (index === 1) {
              colSpan = 'lg:col-span-6';
            }

            return (
              <div
                key={item.id}
                className={`bg-white border rounded-2xl p-7 flex flex-col justify-between text-left space-y-6 hover:shadow-xl transition-all duration-300 relative ${colSpan} ${
                  isFeatured
                    ? 'border-[#C85A28] ring-1 ring-[#C85A28]/20 bg-gradient-to-br from-white to-[#F2F4F0]'
                    : 'border-[#E5E1D8]'
                }`}
                id={`testimonial-card-${item.id}`}
              >
                <div className="space-y-4">
                  {/* Top Bar: Quote Icon & Treatment Pill */}
                  <div className="flex items-center justify-between">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#F2F4F0] border border-[#E5E1D8] text-[#C85A28] text-[11px] font-bold uppercase tracking-wider rounded-full">
                      {item.treatment}
                    </div>
                    <Quote className="w-8 h-8 text-[#C85A28]/20" />
                  </div>

                  {/* Quote Text */}
                  <p className={`text-[#2D312E] leading-[1.6] not-italic font-serif font-normal ${
                    isFeatured ? 'text-base sm:text-lg' : 'text-xs sm:text-sm'
                  }`}>
                    "{item.quote}"
                  </p>
                </div>

                {/* Bottom Section: Stars & Client Info */}
                <div className="pt-4 border-t border-[#E5E1D8] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {/* Avatar Initials Circle */}
                    <div className="w-10 h-10 rounded-full bg-[#2D312E] text-[#F9F8F6] font-serif font-bold text-sm flex items-center justify-center shrink-0">
                      {item.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-bold text-sm text-[#2D312E]">
                        {item.name}
                      </div>
                      <div className="text-[11px] text-[#A6AEA4] font-medium">
                        Client • Montréal
                      </div>
                    </div>
                  </div>

                  {/* 5 Yellow Stars */}
                  <div className="flex text-[#F2C94C] gap-0.5">
                    {[...Array(item.stars)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#F2C94C] stroke-[#F2C94C]" />
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};


