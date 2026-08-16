import React, { useState } from 'react';
import { X, Phone, Mail, CheckCircle2, ShieldCheck, Sparkles, Send, MessageSquare, Clock, User } from 'lucide-react';
import { PRACTICAL_INFO } from '../data/landingData';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultPlanId?: string;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [selectedService, setSelectedService] = useState('Massage Thérapeutique (Soulagement des douleurs)');
  const [availability, setAvailability] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2D312E]/70 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-xl bg-[#F9F8F6] rounded-3xl shadow-2xl border border-[#E5E1D8] overflow-hidden max-h-[92vh] flex flex-col"
        id="booking-modal-container"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-5 bg-[#F2F4F0] border-b border-[#E5E1D8]">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#C85A28] animate-pulse"></span>
            <div>
              <h3 className="font-serif text-lg sm:text-xl font-bold text-[#2D312E]">
                Prendre rendez-vous & Contact
              </h3>
              <p className="text-[11px] text-[#5E645D]">
                Jitany Jara • Massothérapeute agréée
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[#5E645D] hover:text-[#2D312E] hover:bg-[#E5E1D8]/50 rounded-full transition-colors"
            aria-label="Fermer la fenêtre"
            id="close-booking-modal-btn"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-7 overflow-y-auto space-y-5">
          {isSubmitted ? (
            <div className="py-6 text-center space-y-4">
              <div className="w-16 h-16 mx-auto bg-[#C85A28]/10 text-[#C85A28] rounded-full flex items-center justify-center border border-[#C85A28]/20">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="font-serif text-2xl font-bold text-[#2D312E]">Message transmis avec succès !</h4>
              
              <div className="max-w-md mx-auto space-y-2 text-sm text-[#5E645D] leading-relaxed">
                <p>
                  Merci <span className="font-bold text-[#2D312E]">{fullName}</span>. Votre demande a bien été reçue par Jitany.
                </p>
                <p>
                  Elle vous contactera très rapidement au <span className="font-bold text-[#2D312E]">{phone}</span> {email ? `ou à ${email}` : ''} pour confirmer le moment idéal de votre séance.
                </p>
              </div>

              {/* Summary Card */}
              <div className="p-4 bg-[#F2F4F0] rounded-2xl border border-[#E5E1D8] text-xs text-[#5E645D] max-w-md mx-auto space-y-2 text-left">
                <div className="flex items-center gap-2 text-[#2D312E] font-bold pb-1 border-b border-[#E5E1D8]">
                  <Sparkles className="w-4 h-4 text-[#C85A28]" />
                  <span>{selectedService}</span>
                </div>
                <div className="flex items-center gap-2 text-[#2D312E] font-semibold pt-1">
                  <ShieldCheck className="w-4 h-4 text-[#C85A28]" />
                  Reçu d'assurance officiel remis sur place
                </div>
                <p className="text-[#5E645D]">📍 Cabinet : 3795 Rue Masson, Montréal</p>
              </div>

              {/* Direct Phone Call Reminder */}
              <div className="pt-2">
                <p className="text-xs text-[#5E645D] mb-2">
                  Besoin d'une réponse immédiate ?
                </p>
                <a
                  href={`tel:${PRACTICAL_INFO.phone}`}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-[#E5E1D8] text-[#2D312E] hover:border-[#C85A28] rounded-full text-xs font-bold uppercase tracking-wider transition-all shadow-xs"
                >
                  <Phone className="w-3.5 h-3.5 text-[#C85A28]" />
                  <span>Appeler au {PRACTICAL_INFO.phone}</span>
                </a>
              </div>

              <div className="pt-2">
                <button
                  onClick={handleReset}
                  className="px-8 py-3 bg-[#2D312E] text-[#F9F8F6] font-bold text-xs uppercase tracking-wider rounded-full hover:bg-[#C85A28] transition-colors shadow-md"
                  id="modal-finish-btn"
                >
                  Fermer
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-5">
              {/* How it Works / Brief Instructions Banner */}
              <div className="bg-[#F2F4F0] p-4 rounded-2xl border border-[#E5E1D8] space-y-2.5 text-xs text-[#2D312E]">
                <div className="flex items-center justify-between">
                  <span className="font-bold uppercase tracking-wider text-[11px] text-[#5A5A40] flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#C85A28]" />
                    Comment fixer votre rendez-vous :
                  </span>
                  <span className="text-[#C85A28] font-bold text-[11px]">2 options simples</span>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] pt-1 border-t border-[#E5E1D8]/60">
                  <a 
                    href={`tel:${PRACTICAL_INFO.phone}`}
                    className="p-2.5 bg-white rounded-xl border border-[#E5E1D8] hover:border-[#C85A28] transition-all flex items-center gap-2 group"
                  >
                    <div className="w-7 h-7 rounded-full bg-[#C85A28]/10 text-[#C85A28] flex items-center justify-center shrink-0">
                      <Phone className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <div className="font-bold text-[#2D312E] group-hover:text-[#C85A28]">Par téléphone</div>
                      <div className="text-[#5E645D]">{PRACTICAL_INFO.phone} (Direct)</div>
                    </div>
                  </a>

                  <div className="p-2.5 bg-white rounded-xl border border-[#E5E1D8] flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-[#5A5A40]/10 text-[#5A5A40] flex items-center justify-center shrink-0">
                      <Mail className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <div className="font-bold text-[#2D312E]">Par formulaire</div>
                      <div className="text-[#5E645D]">Réponse rapide par courriel/tél</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4 text-left">
                {/* 1. Contact Info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="relative">
                    <User className="w-4 h-4 text-[#A6AEA4] absolute left-3.5 top-3.5" />
                    <input
                      type="text"
                      required
                      placeholder="Votre nom complet *"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-white border border-[#E5E1D8] rounded-2xl text-sm text-[#2D312E] focus:outline-none focus:border-[#C85A28]"
                      id="booking-fullname-input"
                    />
                  </div>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-[#A6AEA4] absolute left-3.5 top-3.5" />
                    <input
                      type="tel"
                      required
                      placeholder="Téléphone (ex: 514-...) *"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-white border border-[#E5E1D8] rounded-2xl text-sm text-[#2D312E] focus:outline-none focus:border-[#C85A28]"
                      id="booking-phone-input"
                    />
                  </div>
                </div>

                <div className="relative">
                  <Mail className="w-4 h-4 text-[#A6AEA4] absolute left-3.5 top-3.5" />
                  <input
                    type="email"
                    required
                    placeholder="Votre adresse courriel *"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white border border-[#E5E1D8] rounded-2xl text-sm text-[#2D312E] focus:outline-none focus:border-[#C85A28]"
                    id="booking-email-input"
                  />
                </div>

                {/* 2. Soin souhaité */}
                <div>
                  <label className="block text-xs font-bold tracking-wider text-[#2D312E] uppercase mb-1.5">
                    Soin ou motif de consultation
                  </label>
                  <select
                    value={selectedService}
                    onChange={(e) => setSelectedService(e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-[#E5E1D8] rounded-2xl text-sm text-[#2D312E] font-medium focus:outline-none focus:border-[#C85A28]"
                    id="select-service-type"
                  >
                    <option value="Massage Thérapeutique (Soulagement des douleurs)">Massage Thérapeutique (Douleurs & Tensions)</option>
                    <option value="Massage Prénatal / Grossesse (Future maman)">Massage Prénatal / Grossesse (Spécialité Future Maman)</option>
                    <option value="Massage Suédois (Détente & Tonification)">Massage Suédois (Détente globale & Circulation)</option>
                    <option value="Deep Tissue (Tissus profonds & tensions intenses)">Deep Tissue (Tissus profonds)</option>
                    <option value="Lomi-Lomi / Relaxation enveloppante">Lomi-Lomi / Soin relaxant</option>
                    <option value="Réflexologie / Soins du visage (Myofit)">Réflexologie / Soins du visage</option>
                    <option value="Soin personnalisé (À définir avec Jitany selon mes besoins)">Soin personnalisé (À définir avec Jitany selon mes besoins)</option>
                  </select>
                </div>

                {/* 3. Disponibilités idéales */}
                <div className="relative">
                  <Clock className="w-4 h-4 text-[#A6AEA4] absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    placeholder="Vos disponibilités ou jours préférés (ex: cette semaine, fin de journée...)"
                    value={availability}
                    onChange={(e) => setAvailability(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white border border-[#E5E1D8] rounded-2xl text-sm text-[#2D312E] focus:outline-none focus:border-[#C85A28]"
                    id="booking-availability-input"
                  />
                </div>

                {/* 4. Message / Précisions */}
                <div className="relative">
                  <MessageSquare className="w-4 h-4 text-[#A6AEA4] absolute left-3.5 top-3.5" />
                  <textarea
                    rows={2}
                    placeholder="Précisions sur vos douleurs, besoins particuliers ou questions..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white border border-[#E5E1D8] rounded-2xl text-sm text-[#2D312E] focus:outline-none focus:border-[#C85A28] resize-none"
                    id="booking-notes-input"
                  ></textarea>
                </div>

                {/* Submit CTA */}
                <div className="pt-2 space-y-2">
                  <button
                    type="submit"
                    className="w-full py-4 px-6 cta-gradient-hover text-white font-bold text-xs uppercase tracking-wider rounded-full transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 group"
                    id="confirm-booking-submit-btn"
                  >
                    <Send className="w-4 h-4 text-white" />
                    <span>Envoyer ma demande</span>
                  </button>
                  <div className="flex items-center justify-center gap-3 text-[11px] text-[#5E645D] text-center pt-1">
                    <span className="flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#C85A28]" />
                      Reçus d'assurance fournis
                    </span>
                    <span>•</span>
                    <span>Paiement sur place</span>
                    <span>•</span>
                    <span>Sans engagement</span>
                  </div>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

