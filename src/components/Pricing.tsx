import React from 'react';
import { Check, Sparkles, ShieldCheck, ArrowRight } from 'lucide-react';
import { PRICING_PLANS } from '../data/landingData';

interface PricingProps {
  onOpenBookingWithPlan?: (planId: string) => void;
}

export const Pricing: React.FC<PricingProps> = ({ onOpenBookingWithPlan }) => {
  return (
    <section id="tarifs" className="py-16 md:py-24 bg-[#F2F4F0] border-y border-[#E5E1D8]">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-[#E5E1D8] text-[#5A5A40] text-xs font-bold uppercase tracking-widest rounded-full">
            <Sparkles className="w-3.5 h-3.5 text-[#C85A28]" />
            <span>Tarification transparente</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#2D312E] tracking-tight">
            <span className="text-[#C85A28] italic font-serif">
              Tarifs
            </span>{' '}
            & Formules de Soins
          </h2>
          <p className="text-sm sm:text-base text-[#3E433F]">
            Des soins personnalisés avec reçu d'assurance massothérapie inclus
          </p>
        </div>

        {/* 2 Pricing Cards matching reference image layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-10">
          {PRICING_PLANS.map((plan) => (
            <div
              key={plan.id}
              className={`relative bg-white rounded-2xl p-8 flex flex-col justify-between text-left transition-all duration-300 hover:shadow-2xl ${
                plan.isPopular
                  ? 'border-2 border-[#C85A28] shadow-xl ring-1 ring-[#C85A28]/20'
                  : 'border border-[#E5E1D8] shadow-sm'
              }`}
              id={`pricing-card-${plan.id}`}
            >
              {/* "Le plus choisi" Badge on top border */}
              {plan.isPopular && (
                <div className="absolute -top-3.5 right-6 px-4 py-1 bg-[#C85A28] text-white text-[10px] font-bold uppercase tracking-widest rounded-full shadow-md">
                  {plan.highlight}
                </div>
              )}

              <div className="space-y-6">
                {/* Category Pill */}
                <div className="inline-block px-3 py-1 bg-[#F2F4F0] border border-[#E5E1D8] text-[#5A5A40] text-[10px] font-bold uppercase tracking-widest rounded-full">
                  {plan.title}
                </div>

                {/* Price & Duration */}
                <div className="space-y-1">
                  <div className="flex items-baseline gap-1">
                    <span className="font-serif text-5xl font-normal text-[#C85A28]">
                      {plan.price}$
                    </span>
                  </div>
                  <div className="font-serif text-xl font-semibold text-[#2D312E]">
                    {plan.duration}
                  </div>
                  <p className="text-xs text-[#3E433F] font-medium pt-1">
                    {plan.description}
                  </p>
                </div>

                {/* Features list */}
                <ul className="space-y-3 pt-4 border-t border-[#E5E1D8] text-xs sm:text-sm text-[#2D312E]">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2.5">
                      <span className="w-4 h-4 rounded-full bg-[#C85A28]/10 text-[#C85A28] flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Select Plan Action */}
              <div className="pt-8">
                <a
                  href="#contact"
                  className={`w-full py-3.5 px-6 rounded-full font-bold text-xs uppercase tracking-wider transition-all text-center flex items-center justify-center gap-2 group ${
                    plan.isPopular
                      ? 'cta-gradient-hover text-white shadow-md'
                      : 'bg-[#F2F4F0] hover:bg-[#2D312E] hover:text-[#F9F8F6] text-[#2D312E] border border-[#E5E1D8]'
                  }`}
                  id={`select-pricing-btn-${plan.id}`}
                >
                  <span>Choisir la formule {plan.duration}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>

            </div>
          ))}
        </div>

        {/* Micro text & Main CTA */}
        <div className="text-center space-y-4">
          <p className="text-xs text-[#3E433F] font-medium italic">
            Séances sur rendez-vous — contactez Jitany pour planifier votre moment de soin
          </p>

          <div>
            <a
              href="#contact"
              className="px-8 py-3.5 cta-gradient-hover text-white font-bold text-xs uppercase tracking-wider rounded-full transition-all shadow-md hover:shadow-lg inline-flex items-center gap-2 group"
              id="pricing-main-cta-btn"
            >
              <span>Prendre rendez-vous</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          <div className="space-y-1">
            <p className="text-[11px] text-[#A6AEA4] uppercase tracking-wider font-semibold">
              Reçus d'assurance remis immédiatement • Paiement sur place
            </p>
            <p className="text-[11px] text-[#5A5A40]">
              Reçus valides selon votre couverture — vérifiez auprès de votre assureur.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

