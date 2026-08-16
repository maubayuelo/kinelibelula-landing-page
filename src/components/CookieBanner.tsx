import React, { useState, useEffect } from 'react';
import { Cookie, ShieldCheck } from 'lucide-react';

interface CookieBannerProps {
  onOpenLegal: () => void;
}

export const CookieBanner: React.FC<CookieBannerProps> = ({ onOpenLegal }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user already made a choice
    const consent = localStorage.getItem('kinelibelula_cookie_consent');
    if (!consent) {
      // Small delay for smooth entry
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('kinelibelula_cookie_consent', 'accepted');
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('kinelibelula_cookie_consent', 'declined');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div 
      className="fixed bottom-0 left-0 right-0 z-40 p-4 sm:p-5 pointer-events-none animate-fadeInUp"
      id="cookie-policy-banner"
    >
      <div className="w-full max-w-5xl mx-auto bg-[#F9F8F6] border border-[#E5E1D8] shadow-2xl rounded-2xl sm:rounded-3xl p-4 sm:p-6 pointer-events-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-6 backdrop-blur-md">
        
        {/* Text & Icon */}
        <div className="flex items-start gap-3.5 text-left">
          <div className="w-9 h-9 rounded-full bg-[#C85A28]/10 text-[#C85A28] flex items-center justify-center shrink-0 mt-0.5">
            <Cookie className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <h4 className="font-serif text-sm font-bold text-[#2D312E] flex items-center gap-2">
              Respect de votre vie privée & Témoins (Cookies)
              <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-sans font-semibold text-[#5A5A40] bg-[#F2F4F0] px-2 py-0.5 rounded-full border border-[#E5E1D8]">
                <ShieldCheck className="w-3 h-3 text-[#C85A28]" />
                Loi 25 Québec
              </span>
            </h4>
            <p className="text-xs text-[#5E645D] leading-relaxed max-w-2xl">
              Nous utilisons des témoins essentiels pour assurer le bon fonctionnement du site et garantir la sécurité de vos échanges. 
              Consultez nos{' '}
              <button
                type="button"
                onClick={onOpenLegal}
                className="font-bold text-[#C85A28] hover:underline inline-block"
                id="cookie-banner-learn-more-btn"
              >
                mentions légales
              </button>{' '}
              pour en savoir plus sur la protection de vos renseignements et notre politique de cookies.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5 w-full md:w-auto shrink-0 justify-end">
          <button
            onClick={handleDecline}
            className="px-4 py-2.5 bg-white border border-[#E5E1D8] text-[#5E645D] hover:text-[#2D312E] hover:border-[#2D312E] text-xs font-bold uppercase tracking-wider rounded-full transition-all shadow-2xs"
            id="decline-cookies-btn"
          >
            Refuser
          </button>
          <button
            onClick={handleAccept}
            className="px-6 py-2.5 bg-[#2D312E] hover:bg-[#C85A28] text-white text-xs font-bold uppercase tracking-wider rounded-full transition-all shadow-md"
            id="accept-cookies-btn"
          >
            Accepter
          </button>
        </div>

      </div>
    </div>
  );
};
