import React from 'react';
import { ChevronUp, Phone, MapPin, ArrowRight, ShieldCheck } from 'lucide-react';
import { PRACTICAL_INFO } from '../data/landingData';
interface FooterProps {
  onOpenBooking: () => void;
  onOpenLegal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenBooking, onOpenLegal }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#2D312E] text-[#F9F8F6] pt-16 pb-28 md:pb-16 border-t border-[#3E433F]">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#3E433F]">
          
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-3 text-left">
            <h3 className="font-serif text-2xl font-semibold text-[#F9F8F6] tracking-tight">
              KinéLibelula
            </h3>
            <p className="text-xs text-[#C85A28] uppercase tracking-wider font-bold">
              Jitany Jara — Massothérapeute Agréée
            </p>
            <p className="text-xs text-[#A6AEA4] max-w-sm pt-2 leading-relaxed">
              25 ans d'expérience à Montréal en massothérapie thérapeutique, relaxation profonde et accompagnement prénatal personnalisé.
            </p>
            <div className="pt-2 space-y-1">
              <div className="flex items-center gap-2 text-[11px] text-[#A6AEA4]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C85A28]" />
                <span>Reçus d'assurance massothérapie</span>
              </div>
              <p className="text-[10px] text-[#A6AEA4]/80">
                Reçus valides selon votre couverture — vérifiez auprès de votre assureur.
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-3 space-y-3 text-left">
            <div className="font-serif font-bold text-sm text-[#F9F8F6] uppercase tracking-wider">
              Navigation
            </div>
            <ul className="space-y-2 text-xs text-[#A6AEA4]">
              <li><a href="#services" className="hover:text-white transition-colors">Services & Soins</a></li>
              <li><a href="#tarifs" className="hover:text-white transition-colors">Tarifs & Formules</a></li>
              <li><a href="#grossesse" className="hover:text-white transition-colors">Soin Prénatal</a></li>
              <li><a href="#a-propos" className="hover:text-white transition-colors">À propos de Jitany</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">Informations pratiques</a></li>
            </ul>
          </div>

          {/* Contact & CTA */}
          <div className="md:col-span-4 space-y-4 text-left">
            <div className="font-serif font-bold text-sm text-[#F9F8F6] uppercase tracking-wider">
              Coordonnées
            </div>
            <div className="space-y-2.5 text-xs text-[#A6AEA4]">
              <p className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-[#C85A28] shrink-0" />
                <span>{PRACTICAL_INFO.addressLine1}, {PRACTICAL_INFO.addressLine2}</span>
              </p>
              <p className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#C85A28] shrink-0" />
                <span>{PRACTICAL_INFO.phone}</span>
              </p>
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenBooking}
                className="px-6 py-2.5 bg-[#C85A28] text-white text-xs font-bold uppercase tracking-wider rounded-full hover:bg-white hover:text-[#2D312E] transition-all flex items-center gap-2 group"
                id="footer-book-btn"
              >
                <span>Demander un rendez-vous</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Legal Links & Copyright & Back to top */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-[#A6AEA4] gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-6 text-center sm:text-left">
            <p>© {new Date().getFullYear()} KinéLibelula — Jitany Jara. Tous droits réservés.</p>
            
            <div className="flex items-center gap-3 sm:gap-4 text-[11px]">
              <button
                onClick={onOpenLegal}
                className="hover:text-white underline transition-colors"
                id="footer-legal-btn"
              >
                Mentions légales & Confidentialité
              </button>
            </div>
          </div>
          
          <button
            onClick={scrollToTop}
            className="p-3 bg-[#3E433F] hover:bg-[#C85A28] text-white rounded-full transition-colors flex items-center justify-center group"
            aria-label="Retour en haut de page"
            id="back-to-top-btn"
          >
            <ChevronUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
};

