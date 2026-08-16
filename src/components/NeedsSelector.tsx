import React from 'react';
import { HeartHandshake, Moon, ZapOff, Baby, Activity, HelpCircle, ArrowRight, Sparkles } from 'lucide-react';

interface NeedsSelectorProps {
  onOpenBookingWithService?: (serviceName: string) => void;
}

export const NEEDS_RECOMMENDATIONS = [
  {
    id: "muscle-pain",
    title: "Douleurs musculaires",
    iconName: "HeartHandshake",
    description: "Nœuds, contractures, maux de dos ou raideurs cervicales accumulées.",
    recommendedService: "Massage Thérapeutique",
    recommendationDetails: "Soin ciblé en profondeur pour relâcher les tensions musculaires et restaurer la mobilité.",
  },
  {
    id: "stress-fatigue",
    title: "Stress et fatigue",
    iconName: "Moon",
    description: "Épuisement physique ou mental, besoin d'une pause régénératrice pour apaiser l'esprit.",
    recommendedService: "Massage Suédois ou Lomi-Lomi",
    recommendationDetails: "Technique enveloppante pour calmer le système nerveux, apaiser le corps et recharger vos batteries.",
  },
  {
    id: "daily-tensions",
    title: "Tensions du quotidien",
    iconName: "ZapOff",
    description: "Raideurs posturales des épaules, de la nuque et des lombaires liées au travail de bureau.",
    recommendedService: "Soin Cervico-Dorsal & Relâchement Postural",
    recommendationDetails: "Décompression ciblée des zones de tension quotidiennes pour retrouver confort et souplesse.",
  },
  {
    id: "pregnancy",
    title: "Grossesse & Future Maman",
    iconName: "Baby",
    description: "Inconforts liés à la grossesse (tensions lombaires, jambes lourdes, fatigue).",
    recommendedService: "Massage Prénatal Spécialisé",
    recommendationDetails: "Soin doux et sécurisé dès le 2e trimestre avec coussins adaptés pour un soulagement absolu.",
  },
  {
    id: "vitality-lightness",
    title: "Vitalité & Légèreté",
    iconName: "Sparkles",
    description: "Besoin de relancer votre énergie corporelle et de retrouver une sensation de légèreté.",
    recommendedService: "Soins Alternatifs & Détente",
    recommendationDetails: "Approche douce et revitalisante pour détendre le corps en profondeur et stimuler votre bien-être.",
  },
  {
    id: "custom-consultation",
    title: "Conseil personnalisé",
    iconName: "HelpCircle",
    description: "Pas d'inquiétude ! Nous évaluerons vos besoins spécifiques ensemble au début de votre séance.",
    recommendedService: "Consultation & Massothérapie sur-mesure",
    recommendationDetails: "Évaluation personnalisée de vos tensions en début de séance pour adapter précisément la technique.",
    isSpecial: true,
  }
];

export const NeedsSelector: React.FC<NeedsSelectorProps> = ({ onOpenBookingWithService }) => {
  const getNeedIcon = (iconName: string) => {
    switch (iconName) {
      case 'HeartHandshake':
        return <HeartHandshake className="w-5 h-5 text-[#C85A28]" />;
      case 'Moon':
        return <Moon className="w-5 h-5 text-[#C85A28]" />;
      case 'ZapOff':
        return <ZapOff className="w-5 h-5 text-[#C85A28]" />;
      case 'Baby':
        return <Baby className="w-5 h-5 text-[#C85A28]" />;
      case 'Activity':
        return <Activity className="w-5 h-5 text-[#C85A28]" />;
      case 'HelpCircle':
        return <HelpCircle className="w-5 h-5 text-[#C85A28]" />;
      default:
        return <HeartHandshake className="w-5 h-5 text-[#C85A28]" />;
    }
  };

  return (
    <section className="py-16 md:py-24 bg-[#F9F8F6]">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#F2F4F0] border border-[#E5E1D8] text-[#5A5A40] text-xs font-bold uppercase tracking-widest rounded-full">
            <Sparkles className="w-3.5 h-3.5 text-[#C85A28]" />
            <span>Diagnostic rapide</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#2D312E] tracking-tight">
            Je peux vous aider{' '}
            <span className="text-[#C85A28] italic font-serif">
              si...
            </span>
          </h2>
          <p className="text-sm sm:text-base text-[#3E433F]">
            Sélectionnez votre besoin principal pour découvrir le soin le plus adapté
          </p>
        </div>

        {/* 6-card Recommendation Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {NEEDS_RECOMMENDATIONS.map((item) => (
            <div
              key={item.id}
              className={`bg-white border rounded-2xl p-6 sm:p-7 flex flex-col justify-between text-left space-y-5 hover:shadow-xl transition-all duration-300 ${
                item.isSpecial ? 'border-[#C85A28] bg-[#FAF8F3] shadow-md' : 'border-[#E5E1D8]'
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
                  <span>Soin recommandé :</span>
                </div>
                <div className="font-serif font-semibold text-sm text-[#2D312E]">
                  {item.recommendedService}
                </div>
                <p className="text-xs text-[#3E433F] leading-relaxed">
                  {item.recommendationDetails}
                </p>

                <div className="pt-2">
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#2D312E] hover:text-[#C85A28] transition-colors group/link"
                    id={`need-book-link-${item.id}`}
                  >
                    <span>Choisir ce soin</span>
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
            <span>Prendre rendez-vous</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-[#C85A28] group-hover:text-white" />
          </a>
        </div>

      </div>
    </section>
  );
};

