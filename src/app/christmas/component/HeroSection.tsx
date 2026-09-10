"use client";

import React from "react";
import Image from "next/image";
import { parseMarkdownLinks } from "@/utils/text";
import HeroEnquiryForm from "./HeroEnquiryForm";

interface HeroSectionProps {
  heroRef: React.RefObject<HTMLElement | null>;
  heroBgRef: React.RefObject<HTMLDivElement | null>;
  data?: {
    tagline?: string;
    headingPart1?: string;
    headingItalicHighlight?: string;
    headingPart2?: string;
    description?: string;
    descriptionSecondary?: string;
    ctaText1?: string;
    ctaLink1?: string;
    ctaText2?: string;
    ctaLink2?: string;
    backgroundImage?: string;
    headingTag?: string;
  };
}

export const HeroSection = ({ heroRef, heroBgRef, data }: HeroSectionProps) => {
  const headingTag = data?.headingTag || "h1";
  const HeadingTag = (headingTag || "h1") as "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

  const tagline = data?.tagline || "Festive Season · Marsh Baldon, Oxford";
  const headingPart1 = data?.headingPart1 || "Christmas at";
  const headingItalicHighlight = data?.headingItalicHighlight || "Seven Stars";
  const headingPart2 = data?.headingPart2 || "";
  const description = data?.description !== undefined ? data.description : "Make this Christmas one to remember.";
  const descriptionSecondary =
    data?.descriptionSecondary !== undefined
      ? data.descriptionSecondary
      : "Step into the warmth of our decorated countryside pub — festive menus, glowing fireplaces and a proper village welcome.";
  const ctaText1 = data?.ctaText1 || "Book Your Christmas Table";
  const ctaLink1 = data?.ctaLink1 || "https://www.opentable.co.uk/r/the-seven-stars-at-marsh-baldon-reservations-oxford?restref=459243&lang=en-GB&ot_source=Restaurant%20website";
  const ctaText2 = data?.ctaText2 || "View Festive Menus";
  const ctaLink2 = data?.ctaLink2 || "#menus";
  const backgroundImage = data?.backgroundImage || "/Christmas/Christmas-hero-new-image.jpg";

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-end overflow-hidden bg-[#0E2A1E]"
    >
      {/* Background Image */}
      <div ref={heroBgRef} className="absolute inset-0 z-0">
        <Image
          src={backgroundImage}
          alt="Fireside seating decorated for Christmas in a countryside pub"
          fill
          className="object-cover"
          priority
        />
        {/* Dark veil — heavier at the bottom where the text sits, fading up */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/10 z-10" />
      </div>

      {/* Content Layer floating on top */}
      <div className="relative z-20 max-w-7xl mx-auto w-full px-6 pt-40 pb-24 lg:px-12 lg:pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-end">
          {/* Left: Heading / description / CTAs */}
          <div className="lg:col-span-7">
            <span className="text-[11px] tracking-[0.3em] uppercase text-[#C9A66B]">
              {tagline}
            </span>

            <HeadingTag className="christmas-hero-title mt-6 font-serif text-5xl leading-[0.98] text-[#FAF6EC] sm:text-7xl lg:text-8xl">
              {headingPart1}
              <span className="block italic text-[#E3CE9A]">{headingItalicHighlight}</span>
              {headingPart2 && (
                <>
                  <br />
                  {headingPart2}
                </>
              )}
            </HeadingTag>

            {description && (
              <p className="christmas-hero-desc mt-7 max-w-xl text-lg font-light leading-relaxed text-[#FAF6EC]/85 sm:text-xl">
                {parseMarkdownLinks(description)}
              </p>
            )}

            {descriptionSecondary && (
              <p className="christmas-hero-desc mt-4 max-w-xl text-base font-light leading-relaxed text-[#FAF6EC]/70">
                {parseMarkdownLinks(descriptionSecondary)}
              </p>
            )}

            <div className="christmas-hero-cta mt-10 flex flex-wrap gap-4">
              <a
                href={ctaLink1}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-[#C9A66B] hover:bg-[#DAB77E] text-[#0E2A1E] uppercase tracking-[0.2em] text-xs font-bold transition-colors text-center"
              >
                {ctaText1}
              </a>
              <a
                href={ctaLink2}
                className="px-8 py-4 border border-[#FAF6EC]/60 text-[#FAF6EC] hover:bg-white/10 uppercase tracking-[0.2em] text-xs font-bold transition-colors text-center"
              >
                {ctaText2}
              </a>
            </div>
          </div>

          {/* Right: Enquiry form */}
          <div className="lg:col-span-5">
            <HeroEnquiryForm />
          </div>
        </div>
      </div>
    </section>
  );
};
