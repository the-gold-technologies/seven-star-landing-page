"use client";

import React from "react";
import { Phone, Mail } from "lucide-react";
import { parseMarkdownLinks } from "@/utils/text";

interface ReservationSectionProps {
  data?: {
    heading?: string;
    headingHighlight?: string;
    description?: string;
    phone?: string;
    email?: string;
    ctaText?: string;
    ctaLink?: string;
  };
}

export const ReservationSection = ({ data }: ReservationSectionProps) => {
  const heading = data?.heading || "Reserve Your Place at the";
  const headingHighlight = data?.headingHighlight || "Christmas Table";
  const description = data?.description || "Tables fill up very fast during the Christmas season. Reserve your lunch or party early to avoid missing out.";
  const phone = data?.phone || "01865 343337";
  const email = data?.email || "info@sevenstarsatmb.co.uk";
  const ctaText = data?.ctaText || "Book Table Online";
  const ctaLink = data?.ctaLink || "https://www.opentable.co.uk/r/the-seven-stars-at-marsh-baldon-reservations-oxford?restref=459243&lang=en-GB&ot_source=Restaurant%20website";
  return (
    <section className="reveal-section py-20 bg-[#FDFBF7] border-t border-black/5 relative overflow-hidden">
      {/* Large Christmas Bell Outline on the left (Top) */}
      <div className="absolute left-[-50px] lg:left-4 -top-4 w-[320px] h-[320px] opacity-[0.12] text-[#B91C1C] pointer-events-none hidden md:block">
        <svg
          viewBox="0 0 100 100"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-full h-full"
        >
          <path d="M50 30C45 20 30 20 38 32C42 38 48 34 50 34C52 34 58 38 62 32C70 20 55 20 50 30Z" />
          <circle cx="50" cy="32" r="3" fill="currentColor" />
          <path d="M47 34C40 42 35 55 38 60" />
          <path d="M53 34C60 42 65 55 62 60" />
          <path d="M50 34C40 34 34 44 34 56C34 68 24 74 24 74H76C76 74 66 68 66 56C66 44 60 34 50 34Z" />
          <circle cx="50" cy="78" r="5" fill="currentColor" />
          <path d="M26 71C35 73 65 73 74 71" />
        </svg>
      </div>

      {/* Large Snowman Outline on the right (Bottom) */}
      <div className="absolute right-[-50px] lg:right-4 -bottom-3 w-[320px] h-[320px] opacity-[0.12] text-[#B91C1C] pointer-events-none hidden md:block">
        <svg
          viewBox="0 0 100 100"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-full h-full"
        >
          {/* Top hat */}
          <rect x="38" y="10" width="24" height="12" fill="none" />
          <line x1="30" y1="22" x2="70" y2="22" />

          {/* Head */}
          <circle cx="50" cy="35" r="12" fill="none" />
          {/* Eyes */}
          <circle cx="46" cy="33" r="1.2" fill="currentColor" />
          <circle cx="54" cy="33" r="1.2" fill="currentColor" />
          {/* Nose */}
          <polygon points="50,35 59,37 50,39" fill="currentColor" />

          {/* Scarf */}
          <path d="M40 45 Q50 49 60 45" />
          <path d="M53 47 L55 58 L50 57 L49 47" />

          {/* Body */}
          <circle cx="50" cy="67" r="20" fill="none" />
          {/* Buttons */}
          <circle cx="50" cy="57" r="1.5" fill="currentColor" />
          <circle cx="50" cy="67" r="1.5" fill="currentColor" />
          <circle cx="50" cy="77" r="1.5" fill="currentColor" />

          {/* Arms */}
          <line x1="31" y1="60" x2="16" y2="52" />
          <line x1="69" y1="60" x2="84" y2="52" />
        </svg>
      </div>

      <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 space-y-8 relative z-10">
        <h2 className="text-3xl sm:text-4xl font-serif text-neutral-900 tracking-tight leading-none">
          {heading} <br className="hidden sm:inline" />
          <span className="italic font-light text-[#B91C1C]">
            {headingHighlight}
          </span>
        </h2>
        <p className="text-base text-neutral-500 font-serif font-light max-w-xl mx-auto leading-relaxed">
          {parseMarkdownLinks(description)}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-4 text-neutral-700">
          <a
            href={`tel:${phone.replace(/\s+/g, "")}`}
            className="flex items-center gap-2 text-xs uppercase tracking-widest font-bold hover:text-[#B91C1C] transition-colors"
          >
            <Phone size={14} className="text-[#B91C1C]" /> {phone}
          </a>
          <span className="hidden sm:inline text-neutral-300">|</span>
          <a
            href={`mailto:${email}`}
            className="flex items-center gap-2 text-xs uppercase tracking-widest font-bold hover:text-[#B91C1C] transition-colors"
          >
            <Mail size={14} className="text-[#B91C1C]" /> {email}
          </a>
        </div>

        <div className="pt-4">
          <a
            href={ctaLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-10 py-5 bg-[#B91C1C] hover:bg-[#990000] uppercase tracking-widest text-xs font-bold text-white rounded-full transition-all shadow-[0_0_15px_rgba(185,28,28,0.25)] hover:shadow-lg"
          >
            {ctaText}
          </a>
        </div>
      </div>
    </section>
  );
};
