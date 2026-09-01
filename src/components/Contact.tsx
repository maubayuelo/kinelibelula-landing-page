import React from 'react';
import { MapPin, Phone, Mail, Clock, Sparkles, MessageSquare } from 'lucide-react';
import type { LandingData } from '../adapters/normalizeLandingPage';
import { HighlightedTitle } from './HighlightedTitle';

interface ContactProps {
  data: LandingData['practicalInfo'];
  onOpenBooking?: () => void;
}

export const Contact: React.FC<ContactProps> = ({ data, onOpenBooking }) => {
  return (
    <section id="contact" className="py-16 md:py-24 bg-[#F9F8F6]">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#F2F4F0] border border-[#E5E1D8] text-[#5A5A40] text-xs font-bold uppercase tracking-widest rounded-full">
            <Sparkles className="w-3.5 h-3.5 text-[#C85A28]" />
            <span>{data.eyebrow}</span>
          </div>
          <HighlightedTitle
            className="font-serif text-3xl sm:text-4xl font-normal text-[#2D312E] tracking-tight"
            title={data.title}
            highlight={data.titleHighlight}
          />
          <p className="text-sm sm:text-base text-[#3E433F]">
            {data.subtitle}
          </p>
        </div>

        {/* 2x2 Info & Location Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* Card 1: Adresse */}
          <div className="bg-white border border-[#E5E1D8] rounded-2xl p-8 text-left space-y-4 shadow-sm flex flex-col justify-between hover:shadow-xl transition-all duration-300">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#F2F4F0] border border-[#E5E1D8] text-[#C85A28] flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <h3 className="font-serif font-bold text-lg text-[#2D312E]">
                  {data.addressHeading}
                </h3>
              </div>

              <div className="text-sm text-[#3E433F] pt-4 border-t border-[#E5E1D8] space-y-1">
                <p className="font-semibold text-[#2D312E] text-base">{data.addressLine1}</p>
                <p className="text-sm font-medium text-[#2D312E]">{data.districtLabel}</p>
                <p className="text-sm font-medium text-[#2D312E]">{data.addressLine2}</p>
                <p className="text-xs text-[#3E433F] pt-3 leading-relaxed">
                  {data.accessNote}
                </p>
              </div>
            </div>
          </div>

          {/* Card 2: Embedded Google Map iframe next to address card */}
          <div className="bg-white border border-[#E5E1D8] rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 min-h-[260px] relative flex flex-col">
            <iframe
              title="Localisation Cabinet KinéLibelula — 3795 Rue Masson, Montréal, Québec H1X 1S7"
              src="https://maps.google.com/maps?q=3795+Rue+Masson,+Montr%C3%A9al,+QC+H1X+1S7&t=&z=15&ie=UTF8&iwloc=&output=embed"
              className="w-full h-full min-h-[260px] border-0 flex-1"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>

          {/* Card 3: Contact Direct (Texto, Email & Form) */}
          <div className="bg-white border-2 border-[#C85A28] rounded-2xl p-8 text-left space-y-4 shadow-md flex flex-col justify-between hover:shadow-xl transition-all duration-300">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#C85A28]/10 text-[#C85A28] flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-lg text-[#2D312E]">
                    {data.directHeading}
                  </h3>
                  <p className="text-xs text-[#3E433F]">{data.directSubheading}</p>
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t border-[#E5E1D8]">
                <a
                  href={`sms:${data.phoneDigits}`}
                  className="w-full py-3.5 px-4 bg-[#C85A28] text-white font-bold text-xs uppercase tracking-wider rounded-full hover:bg-[#2D312E] transition-all flex items-center justify-center gap-2 shadow-sm"
                  id="contact-sms-btn"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>{data.ctaPrimaryLabel} {data.phone}</span>
                </a>

                <a
                  href={`mailto:${data.email}`}
                  className="w-full py-3.5 px-4 bg-[#F2F4F0] text-[#2D312E] font-bold text-xs uppercase tracking-wider rounded-full border border-[#E5E1D8] hover:bg-[#2D312E] hover:text-[#F9F8F6] transition-all flex items-center justify-center gap-2"
                  id="contact-email-btn"
                >
                  <Mail className="w-4 h-4 text-[#C85A28]" />
                  <span>{data.ctaEmailLabel} {data.email}</span>
                </a>

                {onOpenBooking && (
                  <button
                    onClick={onOpenBooking}
                    className="w-full py-3.5 px-4 bg-[#F2F4F0] text-[#2D312E] font-bold text-xs uppercase tracking-wider rounded-full border border-[#E5E1D8] hover:bg-[#2D312E] hover:text-[#F9F8F6] transition-all flex items-center justify-center gap-2"
                    id="contact-form-btn"
                  >
                    <span>{data.ctaSecondaryLabel}</span>
                  </button>
                )}
              </div>
            </div>

            <p className="text-center text-[11px] text-[#3E433F] font-medium pt-2">
              {data.directNote}
            </p>
          </div>

          {/* Card 4: Heures d'ouverture */}
          <div className="bg-white border border-[#E5E1D8] rounded-2xl p-8 text-left space-y-4 shadow-sm flex flex-col justify-between hover:shadow-xl transition-all duration-300">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#F2F4F0] border border-[#E5E1D8] text-[#C85A28] flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-lg text-[#2D312E]">
                    {data.hoursHeading}
                  </h3>
                  <p className="text-xs text-[#3E433F]">{data.hoursNote}</p>
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t border-[#E5E1D8]">
                {data.hours.map((entry, idx) => (
                  <div key={idx} className="p-3.5 bg-[#F2F4F0] rounded-xl border border-[#E5E1D8]">
                    <div className="font-bold text-xs text-[#2D312E]">{entry.days}</div>
                    <div className="text-xs text-[#3E433F] font-medium">{entry.hours}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
