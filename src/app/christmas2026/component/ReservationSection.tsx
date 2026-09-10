"use client";

import React from "react";
import Image from "next/image";
import { parseMarkdownLinks } from "@/utils/text";

interface ReservationSectionProps {
  data?: {
    tagline?: string;
    heading?: string;
    headingHighlight?: string;
    description?: string;
    ctaText1?: string;
    ctaLink1?: string;
    ctaText2?: string;
    ctaLink2?: string;
    image?: string;
  };
}

export const ReservationSection = ({ data }: ReservationSectionProps) => {
  const tagline = data?.tagline || "Reserve Your Place";
  const heading = data?.heading || "This Christmas, make it";
  const headingHighlight = data?.headingHighlight || "one to remember.";
  const description =
    data?.description !== undefined
      ? data.description
      : "Early booking recommended for holiday parties — tables are filling fast.";
  const ctaText1 = data?.ctaText1 || "Book Your Christmas Table";
  const ctaLink1 = data?.ctaLink1 || "https://www.opentable.co.uk/r/the-seven-stars-at-marsh-baldon-reservations-oxford?restref=459243&lang=en-GB&ot_source=Restaurant%20website";
  const ctaText2 = data?.ctaText2 || "01865 343337";
  const ctaLink2 = data?.ctaLink2 || "tel:01865343337";
  const image = data?.image || "/Christmas/hero-fireplace.jpg";

  return (
    <section className="reveal-section relative overflow-hidden">
      <div className="relative h-[480px] lg:h-[600px]">
        <Image
          src={image}
          alt="Fireside at The Seven Stars decorated for Christmas"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 flex items-center justify-center px-6">
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-[11px] tracking-[0.3em] uppercase text-[#C9A66B]">
              {tagline}
            </span>
            <h2 className="mt-6 font-serif text-4xl sm:text-6xl leading-tight text-[#FAF6EC]">
              {heading} <span className="italic text-[#E3CE9A]">{headingHighlight}</span>
            </h2>
            {description && (
              <p className="mt-6 text-[#FAF6EC]/75">{parseMarkdownLinks(description)}</p>
            )}
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <a
                href={ctaLink1}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-[#C9A66B] hover:bg-[#DAB77E] text-[#0E2A1E] uppercase tracking-[0.2em] text-xs font-bold transition-colors"
              >
                {ctaText1}
              </a>
              <a
                href={ctaLink2}
                className="px-8 py-4 border border-[#FAF6EC]/60 text-[#FAF6EC] hover:bg-white/10 uppercase tracking-[0.2em] text-xs font-bold transition-colors"
              >
                {ctaText2}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
