"use client";

import React from "react";
import Image from "next/image";
import { parseMarkdownLinks } from "@/utils/text";

interface PartiesSectionProps {
  data?: {
    tagline?: string;
    heading?: string;
    headingHighlight?: string;
    features?: string[];
    image?: string;
    voucherTag?: string;
    voucherHeading?: string;
    voucherHighlight?: string;
    voucherText?: string;
    voucherNote?: string;
    ctaText?: string;
    ctaLink?: string;
  };
}

export const PartiesSection = ({ data }: PartiesSectionProps) => {
  const tagline = data?.tagline || "Exclusive Experiences";
  const heading = data?.heading || "Christmas Parties at";
  const headingHighlight = data?.headingHighlight || "Seven Stars";
  const features = data?.features?.length
    ? data.features
    : [
        "Special seating arrangements tailored for families and group bookings.",
        "Elegant options for private celebrations and large corporate or friend gatherings.",
        "Book before the end of October to secure a £20 voucher reward.",
      ];
  const image = data?.image || "/Christmas/ChristmasParty.jpg";

  const voucherTag = data?.voucherTag || "Early Booking Reward";
  const voucherHeading = data?.voucherHeading || "Secure a";
  const voucherHighlight = data?.voucherHighlight || "£20 Voucher";
  const voucherText =
    data?.voucherText ||
    "Book your Christmas party of 8 or more before the end of October to receive a thank-you voucher redeemable in the New Year. Minimum of 8 people dining.";
  const voucherNote = data?.voucherNote !== undefined ? data.voucherNote : "*Terms & conditions apply.";
  const ctaText = data?.ctaText || "Book Your Christmas Party";
  const ctaLink = data?.ctaLink || "https://www.opentable.co.uk/r/the-seven-stars-at-marsh-baldon-reservations-oxford?restref=459243&lang=en-GB&ot_source=Restaurant%20website";

  return (
    <section id="parties" className="reveal-section relative overflow-hidden py-24 lg:py-32 bg-[#0a192f]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] items-center gap-14 lg:gap-20">
        <figure className="relative h-[320px] sm:h-[420px] lg:h-[500px]">
          <Image
            src={image}
            alt="A Christmas party underway at a candlelit country pub"
            fill
            className="object-cover shadow-2xl"
          />
        </figure>

        <div>
          <span className="text-[11px] tracking-[0.3em] uppercase text-[#E3CE9A]">{tagline}</span>
          <span className="block w-12 h-px bg-[#C9A66B] mt-5" />
          <h2 className="mt-6 font-serif text-4xl sm:text-5xl leading-tight text-[#FAF6EC]">
            {heading} <span className="italic text-[#C9A66B]">{headingHighlight}</span>
          </h2>

          {features.length > 0 && (
            <ul className="mt-8 space-y-5">
              {features.map((f, i) => (
                <li key={i} className="flex gap-4 text-[#FAF6EC]/85">
                  <span className="mt-1 text-[#C9A66B]">★</span>
                  <span className="text-sm leading-relaxed">{parseMarkdownLinks(f)}</span>
                </li>
              ))}
            </ul>
          )}

          <div className="mt-10 border border-[#C9A66B]/45 bg-black/30 p-8">
            <span className="text-[11px] tracking-[0.3em] uppercase text-[#E3CE9A]">
              {voucherTag}
            </span>
            <h3 className="mt-3 font-serif text-3xl text-[#FAF6EC]">
              {voucherHeading} <span className="italic text-[#C9A66B]">{voucherHighlight}</span>
            </h3>
            {voucherText && (
              <p className="mt-4 text-sm leading-relaxed text-[#FAF6EC]/75">
                {parseMarkdownLinks(voucherText)}
              </p>
            )}
            {voucherNote && (
              <p className="mt-3 text-xs text-[#FAF6EC]/50">{voucherNote}</p>
            )}
            <a
              href={ctaLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-block w-full sm:w-auto text-center px-8 py-4 bg-[#C9A66B] hover:bg-[#DAB77E] text-[#0E2A1E] uppercase tracking-[0.2em] text-xs font-bold transition-colors"
            >
              {ctaText}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
