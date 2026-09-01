import React from 'react';
import { HeartHandshake, Moon, ZapOff, Baby, Activity, HelpCircle, ArrowRight, Sparkles } from 'lucide-react';
import type { LandingData } from '../adapters/normalizeLandingPage';

interface NeedsSelectorProps {
  data: LandingData['needCategories'];
  heading: LandingData['needsHeading'];
  ctaLabel: LandingData['needsCtaLabel'];
  onOpenBookingWithService?: (serviceName: string) => void;
}

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  HeartHandshake,
  Moon,
  ZapOff,
  Baby,
  Activity,
  HelpCircle,
  Sparkles,
};

const getNeedIcon = (iconName: string) => {
  const Icon = ICONS[iconName] ?? HeartHandshake;
  return <Icon className="w-5 h-5 text-[#C85A28]" />;
};

export const NeedsSelector: React.FC<NeedsSelectorProps> = ({ data, heading, ctaLabel, onOpenBookingWithService }) => {
  return (
    <section className="py-16 md:py-24 bg-[#F9F8F6]">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#F2F4F0] border border-[#E5E1D8] text-[#5A5A40] text-xs font-bold uppercase tracking-widest rounded-full">
            <Sparkles className="w-3.5 h-3.5 text-[#C85A28]" />
            <span>{heading.eyebrow}</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#2D312E] tracking-tight">
            {heading.title}
          </h2>
          <p className="text-sm sm:text-base text-[#3E433F]">
            {heading.subtitle}
          </p>
        </div>

        {/* 6-card Recommendation Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {data.map((item) => (
            <div
              key={item.id}
              className={`bg-white border rounded-2xl p-6 sm:p-7 flex flex-col justify-between text-left space-y-5 hover:shadow-xl transition-all duration-300 ${
                item.id === 'sur-mesure' ? 'border-[#C85A28] bg-[#FAF8F3] shadow-md' : 'border-[#E5E1D8]'
              }`}
              id={`need-card-${item.id}`}
            >
              <div className="space-y-4">
                {/* Header with Icon and Title */}
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#F2F4F0] border border-[#E5E1D8] flex items-center justify-center shrink-0">
                    {getNeedIcon(item.iconName)}
                  </div>
                  <h3 className="font-serif text-xl font-bold text-[#2D312E]">
                    {item.title}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-[#3E433F] leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Recommendation Box */}
              <div className="pt-4 border-t border-[#E5E1D8] bg-[#F2F4F0] -mx-6 sm:-mx-7 -mb-6 sm:-mb-7 p-5 rounded-b-2xl space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#C85A28] uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{item.recommendedLabel}</span>
                </div>
                <p className="text-xs text-[#3E433F] leading-relaxed">
                  {item.recommendedDetails}
                </p>

                <div className="pt-2">
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#2D312E] hover:text-[#C85A28] transition-colors group/link"
                    id={`need-book-link-${item.id}`}
                  >
                    <span>{item.ctaLabel}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform text-[#C85A28]" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Section Bottom CTA */}
        <div className="text-center">
          <a
            href="#contact"
            className="px-8 py-3.5 bg-[#2D312E] text-[#F9F8F6] font-bold text-xs uppercase tracking-wider rounded-full hover:bg-[#C85A28] transition-all shadow-md hover:shadow-lg inline-flex items-center gap-2 group"
            id="needs-main-cta-btn"
          >
            <span>{ctaLabel}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-[#C85A28] group-hover:text-white" />
          </a>
        </div>

      </div>
    </section>
  );
};
