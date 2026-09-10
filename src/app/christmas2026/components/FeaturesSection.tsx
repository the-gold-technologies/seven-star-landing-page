"use client";

import React from "react";
import { HangingOrnamentsFeatures } from "./HangingOrnaments";
import { GiftIcon } from "./Icons";

interface FeaturesSectionProps {
  data?: {
    tagline?: string;
    heading?: string;
    headingHighlight?: string;
    feature1?: string;
    feature2?: string;
    feature3?: string;
    cardBadge?: string;
    cardTitle?: string;
    cardTitleHighlight?: string;
    cardDescription?: string;
    cardTnc?: string;
    cardFooterNote?: string;
    ctaText?: string;
    ctaLink?: string;
  };
}

export const FeaturesSection = ({ data }: FeaturesSectionProps) => {
  const tagline = data?.tagline || "Exclusive Experiences";
  const heading = data?.heading || "Special Christmas";
  const headingHighlight = data?.headingHighlight || "Party Features";
  const feature1 = data?.feature1 || "Special Seating arrangements tailored for families and group bookings.";
  const feature2 = data?.feature2 || "Elegant options for Private Celebrations and large corporate/friend gatherings.";
  const feature3 = data?.feature3 || "Book Before October to secure a £20 Voucher reward.";
  const cardBadge = data?.cardBadge || "Early Booking Reward";
  const cardTitle = data?.cardTitle || "Secure a";
  const cardTitleHighlight = data?.cardTitleHighlight || "£20 Voucher";
  const cardDescription = data?.cardDescription || "Book your party of 8 or more before the end of October to receive a thank-you voucher redeemable in the New Year.";
  const cardTnc = data?.cardTnc || "*Terms & Conditions apply.";
  const cardFooterNote = data?.cardFooterNote || "Tables are filling fast – don't miss your chance to make this Christmas unforgettable!";
  const ctaText = data?.ctaText || "Book your Christmas Party Now!";
  const ctaLink = data?.ctaLink || "https://sevenstarsatmarshbaldon.co.uk/book-a-table/";

  return (
    <section className="reveal-section py-20 bg-[#0a192f] text-white border-y border-white/5 relative overflow-hidden">
      <HangingOrnamentsFeatures />
      {/* Soft radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(185,28,28,0.2),transparent_60%)]" />
      {/* Paper texture overlay */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Special features */}
          <div className="lg:col-span-7 space-y-6">
            <span className="text-[10px] tracking-[0.4em] text-[#D4AF37] uppercase font-bold flex items-center gap-2">
              {tagline} <GiftIcon />
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif tracking-tight text-white leading-tight">
              {heading} <br />
              <span className="italic font-light text-[#D4AF37]">
                {headingHighlight}
              </span>
            </h2>
            <div className="w-12 h-[1px] bg-[#D4AF37] opacity-50" />

            <ul className="space-y-4 text-base text-slate-300 font-serif font-light pt-2">
              <li className="flex gap-3 items-start">
                <span className="text-[#D4AF37] font-bold mt-0.5">★</span>
                <span>{feature1}</span>
              </li>
              <li className="flex gap-3 items-start">
                <span className="text-[#D4AF37] font-bold mt-0.5">★</span>
                <span>{feature2}</span>
              </li>
              <li className="flex gap-3 items-start">
                <span className="text-[#D4AF37] font-bold mt-0.5">★</span>
                <span>{feature3}</span>
              </li>
            </ul>
          </div>

          {/* Right Column: Early Booking Card & CTA */}
          <div className="lg:col-span-5 bg-white/5 border border-white/10 backdrop-blur-md rounded-3xl p-8 space-y-6 shadow-xl">
            <div className="space-y-2">
              <div className="inline-block px-3 py-1 rounded-full bg-[#B91C1C]/20 text-[#FFAAAA] border border-[#B91C1C]/30 text-[10px] font-bold uppercase tracking-widest">
                {cardBadge}
              </div>
              <h3 className="text-xl font-serif text-white">
                {cardTitle}{" "}
                <span className="text-[#D4AF37] italic font-semibold">
                  {cardTitleHighlight}
                </span>
              </h3>
              <p
                className="text-sm text-slate-300 font-serif font-light leading-relaxed"
                style={{ color: "#cbd5e1" }}
              >
                {cardDescription}
              </p>
              <div
                className="text-[10px] text-slate-400 italic"
                style={{ color: "#94a3b8" }}
              >
                {cardTnc}
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-white/10">
              <p
                className="text-xs text-slate-400 font-serif font-light"
                style={{ color: "#94a3b8" }}
              >
                {cardFooterNote}
              </p>
              <a
                href={ctaLink}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full px-6 py-4 bg-[#B91C1C] hover:bg-[#990000] uppercase tracking-widest text-xs font-bold text-white rounded-full transition-all shadow-[0_0_15px_rgba(185,28,28,0.3)] hover:shadow-lg text-center"
              >
                {ctaText}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
