"use client";

import React from "react";
import Image from "next/image";
import { parseMarkdownLinks } from "@/utils/text";

interface FeastSectionProps {
  data?: {
    tagline?: string;
    heading?: string;
    headingHighlight?: string;
    description?: string;
    dishesList?: string[];
    ctaText1?: string;
    ctaLink1?: string;
    ctaText2?: string;
    ctaLink2?: string;
    image?: string;
  };
}

export const FeastSection = ({ data }: FeastSectionProps) => {
  const tagline = data?.tagline || "Culinary Delights";
  const heading = data?.heading || "The Festive";
  const headingHighlight = data?.headingHighlight || "Feast";
  const description =
    data?.description ||
    "Savour festive dishes prepared by our chefs for the occasion — from a smoked salmon starter to traditional roast turkey and spiced plum pudding. Every plate is served the way a great British pub should serve it.";
  const dishesList = data?.dishesList?.length
    ? data.dishesList
    : ["Smoked Salmon Starter", "Traditional Roast Turkey", "Spiced Plum Pudding"];
  const ctaText1 = data?.ctaText1 || "View the Festive Menu";
  const ctaLink1 = data?.ctaLink1 || "#menus";
  const ctaText2 = data?.ctaText2 || "Book Your Table";
  const ctaLink2 = data?.ctaLink2 || "https://www.opentable.co.uk/r/the-seven-stars-at-marsh-baldon-reservations-oxford?restref=459243&lang=en-GB&ot_source=Restaurant%20website";
  const image = data?.image || "/Christmas/festive-feast.jpg";

  return (
    <section id="dining" className="reveal-section py-24 lg:py-32 bg-[#0E2A1E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 items-center gap-14 lg:gap-20">
        <figure className="relative order-2 lg:order-1 h-[320px] sm:h-[420px]">
          <Image
            src={image}
            alt="A festive roast turkey dinner with all the trimmings on a pub table"
            fill
            className="object-cover shadow-2xl"
          />
        </figure>

        <div className="order-1 lg:order-2 max-w-2xl">
          <span className="text-[11px] tracking-[0.3em] uppercase text-[#E3CE9A]">
            {tagline}
          </span>
          <span className="block w-12 h-px bg-[#C9A66B] mt-5" />
          <h2 className="mt-6 font-serif text-4xl sm:text-5xl leading-tight text-[#FAF6EC]">
            {heading} <span className="italic text-[#C9A66B]">{headingHighlight}</span>
          </h2>
          {description && (
            <p className="mt-6 text-base leading-relaxed text-[#FAF6EC]/75">
              {parseMarkdownLinks(description)}
            </p>
          )}

          {dishesList.length > 0 && (
            <ul className="mt-9 space-y-4">
              {dishesList.map((item, i) => (
                <li key={i} className="flex items-baseline gap-4 border-b border-white/15 pb-4">
                  <span className="text-[#C9A66B]">✦</span>
                  <span className="text-lg font-light text-[#FAF6EC]/90">
                    {parseMarkdownLinks(item)}
                  </span>
                </li>
              ))}
            </ul>
          )}

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href={ctaLink1}
              className="px-8 py-4 bg-[#C9A66B] hover:bg-[#DAB77E] text-[#0E2A1E] uppercase tracking-[0.2em] text-xs font-bold transition-colors text-center"
            >
              {ctaText1}
            </a>
            <a
              href={ctaLink2}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 border border-[#FAF6EC]/60 text-[#FAF6EC] hover:bg-white/10 uppercase tracking-[0.2em] text-xs font-bold transition-colors text-center"
            >
              {ctaText2}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
