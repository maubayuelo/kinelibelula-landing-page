import React from 'react';
import { Phone, Calendar, ArrowRight } from 'lucide-react';
import { PRACTICAL_INFO } from '../data/landingData';

interface StickyBookingBarProps {
  onOpenBooking: () => void;
}

export const StickyBookingBar: React.FC<StickyBookingBarProps> = ({ onOpenBooking }) => {
  return (
    <aside className="fixed bottom-0 left-0 right-0 z-40 bg-[#F9F8F6]/95 backdrop-blur-md border-t border-[#E5E1D8] shadow-2xl py-3 px-4 transition-all">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-3">
        {/* Left Info: Guarantee */}
        <div className="hidden md:flex items-center gap-3 text-xs text-[#2D312E]">
          <div className="flex items-center gap-2 font-bold">
            <span className="w-2.5 h-2.5 rounded-full bg-[#C85A28] animate-pulse"></span>
            <span>KinéLibelula — Jitany Jara</span>
          </div>
          <span className="text-[#E5E1D8]">|</span>
          <span className="text-[#5E645D]">Reçus d'assurance fournis</span>
        </div>

        {/* Center / Actions */}
        <div className="flex items-center justify-between w-full md:w-auto gap-2 sm:gap-3">
          {/* Direct Call Button */}
          <a
            href={`tel:${PRACTICAL_INFO.phone}`}
            className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2.5 bg-[#F2F4F0] border border-[#E5E1D8] text-[#2D312E] hover:border-[#C85A28] hover:bg-white rounded-full text-xs font-bold uppercase tracking-wider transition-all"
            id="sticky-phone-btn"
          >
            <Phone className="w-3.5 h-3.5 text-[#C85A28]" />
            <span>{PRACTICAL_INFO.phone}</span>
          </a>

          {/* Main Appointment Request Button */}
          <a
            href="#contact"
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2.5 cta-gradient-hover text-white rounded-full text-xs font-bold uppercase tracking-wider transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
            id="sticky-book-now-btn"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Prendre rendez-vous</span>
          </a>
        </div>
      </div>
    </aside>
  );
};

