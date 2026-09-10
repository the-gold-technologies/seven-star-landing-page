"use client";

import React from "react";
import { parseMarkdownLinks } from "@/utils/text";

interface IntroSectionProps {
  data?: {
    tagline?: string;
    heading?: string;
    headingHighlight?: string;
    description?: string;
  };
}

export const IntroSection = ({ data }: IntroSectionProps) => {
  const tagline = data?.tagline || "Warmth & Festive Cheer";
  const heading = data?.heading || "Christmas is";
  const headingHighlight = data?.headingHighlight || "Better Together";
  const description =
    data?.description ||
    "Tucked away in the village of Marsh Baldon, The Seven Stars is community-owned and community-run — and at Christmas the whole place glows.";

  return (
    <section className="reveal-section py-24 lg:py-32 bg-[#FAF6EC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Centered intro copy */}
        <div className="max-w-2xl mx-auto text-center">
          <span className="text-[11px] tracking-[0.3em] uppercase font-bold text-[#7A2530]">
            {tagline}
          </span>
          <span className="block w-12 h-px bg-[#C9A66B] mx-auto mt-5" />
          <h2 className="mt-6 font-serif text-4xl sm:text-5xl leading-tight text-[#0E2A1E]">
            {heading} <span className="italic text-[#C9A66B]">{headingHighlight}</span>
          </h2>
          {description && (
            <p className="mt-6 text-base leading-relaxed text-neutral-500">
              {parseMarkdownLinks(description)}
            </p>
          )}
        </div>
      </div>
    </section>
  );
};
