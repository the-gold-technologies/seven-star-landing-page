"use client";

import React from "react";
import Image from "next/image";
import { ReindeerIcon, HollyIcon } from "./Icons";
import { parseMarkdownLinks } from "@/utils/text";

interface IntroSectionProps {
  data?: {
    tagline?: string;
    heading?: string;
    headingHighlight?: string;
    description?: string;
    whyChooseHeading?: string;
    reason1?: string;
    reason2?: string;
    reason3?: string;
    showcaseImage?: string;
  };
}

export const IntroSection = ({ data }: IntroSectionProps) => {
  const tagline = data?.tagline || "Warmth & Festive Cheer";
  const heading = data?.heading || "Celebrate Christmas at";
  const headingHighlight =
    data?.headingHighlight || "Seven Stars in Marsh Baldon!";
  const description =
    data?.description ||
    "Are you looking for the perfect place to celebrate Christmas with your loved ones? Seven Stars located in Marsh Baldon, Oxford, is here to make your Christmas Day magical!";
  const whyChooseHeading = data?.whyChooseHeading || "Why Choose Seven Stars:";
  const reason1 =
    data?.reason1 ||
    "Cosy Pub with beautiful Christmas décor, spreading warmth and festive cheer.";
  const reason2 =
    data?.reason2 ||
    "Savor festive Christmas dishes prepared by our chefs for the occasion.";
  const reason3 =
    data?.reason3 ||
    "Our Pub serves wine, cocktails, and seasonal drinks to enhance Christmas joy.";
  const showcaseImage =
    data?.showcaseImage ||
    "https://sevenstarsatmarshbaldon.co.uk/wp-content/uploads/2025/09/christmas-santaclaus.webp";

  return (
    <section className="reveal-section py-24 bg-[#FDFBF7] border-b border-black/5 relative overflow-hidden">
      {/* Paper texture overlay */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none mix-blend-multiply bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* Left Column: Intro Copy */}
          <div className="lg:col-span-7 space-y-8">
            <span className="text-[10px] tracking-[0.4em] text-[#B91C1C] uppercase font-bold flex items-center gap-2">
              {tagline} <ReindeerIcon />
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif tracking-tight text-neutral-900 leading-[1.15]">
              {heading} <br />
              <span className="italic font-light text-[#B91C1C]">
                {headingHighlight}
              </span>
            </h2>
            <div className="w-16 h-[1px] bg-[#B91C1C] opacity-50" />

            <p className="text-lg text-neutral-600 leading-relaxed font-serif font-light">
              {parseMarkdownLinks(description)}
            </p>

            <div className="space-y-4 pt-4">
              <h3 className="text-sm tracking-wider uppercase font-bold text-[#B91C1C] flex items-center gap-2">
                <HollyIcon className="hidden md:block" /> {whyChooseHeading}
              </h3>
              <ul className="space-y-3 text-sm text-neutral-600 font-serif font-light">
                <li className="flex gap-3 items-start">
                  <span className="text-[#B91C1C] font-bold mt-0.5">✓</span>
                  <span>{parseMarkdownLinks(reason1)}</span>
                </li>
                <li className="flex gap-3 items-start">
                  <span className="text-[#B91C1C] font-bold mt-0.5">✓</span>
                  <span>{parseMarkdownLinks(reason2)}</span>
                </li>
                <li className="flex gap-3 items-start">
                  <span className="text-[#B91C1C] font-bold mt-0.5">✓</span>
                  <span>{parseMarkdownLinks(reason3)}</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column: Santa Claus Image Showcase */}
          <div className="lg:col-span-5 relative rounded-3xl overflow-hidden shadow-2xl h-[450px]">
            <Image
              src={showcaseImage}
              alt="Santa Claus at Seven Stars"
              fill
              className="object-cover hover:scale-105 transition-transform duration-[4000ms] ease-out"
              unoptimized
            />
          </div>
        </div>
      </div>
    </section>
  );
};
