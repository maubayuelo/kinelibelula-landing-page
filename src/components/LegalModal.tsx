import React from 'react';
import { X, ShieldCheck, Building, Lock, Cookie, FileText } from 'lucide-react';
import { PRACTICAL_INFO } from '../data/landingData';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({
  isOpen,
  onClose
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2D312E]/75 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-2xl bg-[#F9F8F6] rounded-3xl shadow-2xl border border-[#E5E1D8] overflow-hidden max-h-[90vh] flex flex-col"
        id="legal-modal-container"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 bg-[#F2F4F0] border-b border-[#E5E1D8]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#C85A28]/10 text-[#C85A28] flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif text-lg sm:text-xl font-bold text-[#2D312E]">
                Mentions légales
              </h3>
              <p className="text-[11px] text-[#5E645D]">
                KinéLibelula • Pratique professionnelle à Montréal (Québec)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[#5E645D] hover:text-[#2D312E] hover:bg-[#E5E1D8] rounded-full transition-colors"
            aria-label="Fermer"
            id="close-legal-modal-btn"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body - Single continuous text without sub-navigation */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-left text-xs sm:text-sm text-[#5E645D] leading-relaxed">
          
          {/* 1. Identification */}
          <section className="space-y-2">
            <h4 className="font-serif text-base sm:text-lg font-bold text-[#2D312E] flex items-center gap-2">
              <Building className="w-4 h-4 text-[#C85A28]" />
              1. Identification de l'entreprise & Thérapeute
            </h4>
            <p>
              Le présent site web (<strong className="text-[#2D312E]">KinéLibelula</strong>) est édité et exploité par :
            </p>
            <div className="bg-[#F2F4F0] p-4 rounded-2xl border border-[#E5E1D8] space-y-1.5 text-xs text-[#2D312E]">
              <p><strong>Thérapeute :</strong> Jitany Jara — Massothérapeute certifiée</p>
              <p><strong>Activité :</strong> Massothérapie thérapeutique, soins prénataux et détente</p>
              <p><strong>Adresse du cabinet :</strong> {PRACTICAL_INFO.addressLine1}, {PRACTICAL_INFO.addressLine2}</p>
              <p><strong>Téléphone :</strong> {PRACTICAL_INFO.phone}</p>
              <p><strong>Reçus d'assurance :</strong> Émis pour chaque soin conformément aux normes des associations professionnelles de massothérapie du Québec.</p>
            </div>
          </section>

          {/* 2. Nature des soins & Avertissement santé */}
          <section className="space-y-2">
            <h4 className="font-serif text-base sm:text-lg font-bold text-[#2D312E] flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#C85A28]" />
              2. Nature des soins & Avertissement santé
            </h4>
            <p>
              Les soins dispensés par Jitany Jara visent la détente, le bien-être, le soulagement des tensions musculaires et l'amélioration de la mobilité corporelle.
            </p>
            <p>
              Ces prestations <strong className="text-[#2D312E]">ne constituent en aucun cas un diagnostic médical ni un acte médical ou chirurgical</strong>. Elles ne se substituent aucunement aux recommandations ou aux traitements prescrits par un médecin ou un professionnel de la santé qualifié.
            </p>
          </section>

          {/* 3. Confidentialité & Protection des renseignements personnels (Loi 25 QC) */}
          <section className="space-y-2">
            <h4 className="font-serif text-base sm:text-lg font-bold text-[#2D312E] flex items-center gap-2">
              <Lock className="w-4 h-4 text-[#C85A28]" />
              3. Protection des renseignements personnels (Loi 25 - Québec)
            </h4>
            <p>
              KinéLibelula s'engage à assurer la sécurité et la confidentialité de vos informations personnelles conformément aux exigences de la <strong className="text-[#2D312E]">Loi 25 du Québec</strong>.
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
              <li>
                <strong>Collecte limitée :</strong> Les renseignements recueillis via le formulaire de contact (nom, téléphone, courriel, disponibilités et motif) sont strictement réservés à l'organisation de vos séances et à la communication directe avec Jitany Jara.
              </li>
              <li>
                <strong>Non-divulgation absolue :</strong> Vos renseignements ne sont en aucun cas vendus, échangés, loués ou partagés avec des tiers à des fins commerciales.
              </li>
              <li>
                <strong>Droit d'accès et rectification :</strong> Vous pouvez demander à tout moment la consultation, la modification ou la suppression des renseignements vous concernant en contactant directement Jitany Jara au {PRACTICAL_INFO.phone}.
              </li>
            </ul>
          </section>

          {/* 4. Politique des témoins (Cookies) */}
          <section className="space-y-2">
            <h4 className="font-serif text-base sm:text-lg font-bold text-[#2D312E] flex items-center gap-2">
              <Cookie className="w-4 h-4 text-[#C85A28]" />
              4. Politique relative aux témoins de navigation (Cookies)
            </h4>
            <p>
              Ce site web utilise uniquement des témoins techniques nécessaires à son bon fonctionnement (mémorisation de vos choix de langue, gestion de votre consentement et navigation sécurisée). 
            </p>
            <p>
              Aucun témoin publicitaire intrusif ou de pistage invasif n'est installé. Vous pouvez à tout moment accepter ou refuser ces témoins via la bannière de consentement ou les réglages de votre navigateur.
            </p>
          </section>

          {/* 5. Propriété intellectuelle & Annulation */}
          <section className="space-y-2">
            <h4 className="font-serif text-base sm:text-lg font-bold text-[#2D312E]">
              5. Propriété intellectuelle & Rendez-vous
            </h4>
            <p>
              Tous les éléments du site (textes, images, visuels, identité de marque KinéLibelula) sont protégés par le droit d'auteur. Toute reproduction sans autorisation préalable est interdite.
            </p>
            <p>
              <strong className="text-[#2D312E]">Politique d'annulation :</strong> Par respect pour l'horaire du cabinet, tout changement ou annulation doit être notifié au moins 24 heures à l'avance par téléphone.
            </p>
          </section>

        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 bg-[#F2F4F0] border-t border-[#E5E1D8] flex items-center justify-between">
          <p className="text-[11px] text-[#5E645D]">
            Dernière mise à jour : {new Date().toLocaleDateString('fr-CA', { year: 'numeric', month: 'long' })}
          </p>
          <button
            onClick={onClose}
            className="px-6 py-2 bg-[#2D312E] hover:bg-[#C85A28] text-white text-xs font-bold uppercase tracking-wider rounded-full transition-colors shadow-xs"
            id="close-legal-modal-footer-btn"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
};
