"use client";

import React from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Snowflake } from "lucide-react";
import { SleighIcon, ReindeerIcon, SantaHatIcon, HollyIcon } from "./Icons";
import { parseMarkdownLinks } from "@/utils/text";

interface DishType {
  name: string;
  tagline: string;
  description: string;
  image: string;
}

interface DishesCarouselProps {
  activeDishIdx: number;
  prevDish: () => void;
  nextDish: () => void;
  handleDishChange: (idx: number) => void;
  dishContentRef: React.RefObject<HTMLDivElement | null>;
  setIsAutoplayPaused: (paused: boolean) => void;
  data?: {
    tagline?: string;
    heading?: string;
    headingHighlight?: string;
    dishesList?: DishType[];
  };
}

export const DishesCarousel = ({
  activeDishIdx,
  prevDish,
  nextDish,
  handleDishChange,
  dishContentRef,
  setIsAutoplayPaused,
  data,
}: DishesCarouselProps) => {
  const tagline = data?.tagline || "Visual Feast";
  const heading = data?.heading || "Our Christmas";
  const headingHighlight = data?.headingHighlight || "Special Dishes";
  const dishes =
    data?.dishesList && data.dishesList.length > 0 ? data.dishesList : [];

  const currentDish = dishes[activeDishIdx] || dishes[0] || {};

  return (
    <section className="reveal-section py-24 bg-[#FDFBF7] border-t border-black/5 relative overflow-hidden">
      {/* Decorative accent */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-multiply bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />

      {/* Large Christmas Tree Outline on the right */}
      <div className="absolute right-[-40px] lg:right-6 top-8 w-[340px] h-[340px] opacity-[0.08] text-[#1E3F20] pointer-events-none hidden md:block">
        <svg
          viewBox="0 0 100 100"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-full h-full"
        >
          {/* Star on top */}
          <path
            d="M50 5 L52 11 L58 11 L53 14 L55 20 L50 16 L45 20 L47 14 L42 11 L48 11 Z"
            fill="currentColor"
          />
          {/* Tree branches */}
          <path d="M50 16 L35 36 L42 36 L25 56 L35 56 L15 76 L85 76 L65 56 L75 56 L58 36 L65 36 Z" />
          {/* Trunk */}
          <rect x="46" y="76" width="8" height="12" />
          {/* Details/Decorations */}
          <circle cx="50" cy="30" r="1.5" fill="currentColor" />
          <circle cx="43" cy="45" r="1.5" fill="currentColor" />
          <circle cx="57" cy="45" r="1.5" fill="currentColor" />
          <circle cx="35" cy="65" r="1.5" fill="currentColor" />
          <circle cx="50" cy="60" r="1.5" fill="currentColor" />
          <circle cx="65" cy="65" r="1.5" fill="currentColor" />
        </svg>
      </div>

      {/* Large Christmas Tree Outline on the left (Bottom) */}
      <div className="absolute left-[-40px] lg:left-6 bottom-8 w-[280px] h-[280px] opacity-[0.08] text-[#1E3F20] pointer-events-none hidden md:block">
        <svg
          viewBox="0 0 100 100"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-full h-full"
        >
          <path d="M50 10 L38 28 L44 28 L30 46 L38 46 L20 66 L80 66 L62 46 L70 46 L56 28 L62 28 Z" />
          <rect x="47" y="66" width="6" height="10" />
          <circle cx="50" cy="22" r="1.5" fill="currentColor" />
          <circle cx="42" cy="38" r="1.5" fill="currentColor" />
          <circle cx="58" cy="38" r="1.5" fill="currentColor" />
          <circle cx="32" cy="56" r="1.5" fill="currentColor" />
          <circle cx="50" cy="52" r="1.5" fill="currentColor" />
          <circle cx="68" cy="56" r="1.5" fill="currentColor" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-16 gap-4">
          <div className="space-y-4">
            <span className="text-[10px] tracking-[0.4em] text-[#B91C1C] uppercase font-bold block">
              {tagline}
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif tracking-tight text-neutral-900 flex items-center gap-3 max-[650px]:gap-0">
              {heading}{" "}
              <span className="italic font-light text-[#B91C1C]">
                {headingHighlight}
              </span>{" "}
              <HollyIcon className="hidden md:block" />
              <Snowflake
                className="w-5 h-5 text-[#D4AF37] animate-spin hidden md:block"
                style={{ animationDuration: "12s" }}
              />
            </h2>
          </div>

          {/* Carousel navigation controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={prevDish}
              aria-label="Previous Dish"
              className="w-12 h-12 rounded-full border border-black/10 flex items-center justify-center text-neutral-700 hover:text-white hover:bg-[#B91C1C] hover:border-[#B91C1C] transition-all cursor-pointer shadow-sm"
              title="Previous Dish"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={nextDish}
              aria-label="Next Dish"
              className="w-12 h-12 rounded-full border border-black/10 flex items-center justify-center text-neutral-700 hover:text-white hover:bg-[#B91C1C] hover:border-[#B91C1C] transition-all cursor-pointer shadow-sm"
              title="Next Dish"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Dish Detail Carousel Item */}
        <div
          tabIndex={0}
          role="region"
          aria-label="Dishes Carousel. Use Left and Right arrow keys to navigate."
          className="bg-white rounded-3xl p-8 sm:p-12 border border-black/5 shadow-sm overflow-hidden relative focus:outline-none focus:ring-2 focus:ring-[#B91C1C]"
          onMouseEnter={() => setIsAutoplayPaused(true)}
          onMouseLeave={() => setIsAutoplayPaused(false)}
          onFocus={() => setIsAutoplayPaused(true)}
          onBlur={() => setIsAutoplayPaused(false)}
          onKeyDown={(e) => {
            if (e.key === "ArrowLeft") {
              e.preventDefault();
              prevDish();
            } else if (e.key === "ArrowRight") {
              e.preventDefault();
              nextDish();
            }
          }}
        >
          <div
            ref={dishContentRef}
            className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
          >
            {/* Image Side */}
            <div className="lg:col-span-6 relative rounded-2xl overflow-hidden h-[300px] sm:h-[400px] shadow-inner">
              {currentDish.image && (
                <Image
                  src={currentDish.image}
                  alt={currentDish.name || "Dish image"}
                  fill
                  className="object-cover transition-opacity duration-500 ease-in-out"
                />
              )}
            </div>

            {/* Description Side */}
            <div className="lg:col-span-6 space-y-6">
              <span className="text-[10px] uppercase font-bold text-[#B91C1C] tracking-widest flex items-center gap-2">
                {activeDishIdx === 0 && <SleighIcon />}
                {activeDishIdx === 1 && <ReindeerIcon />}
                {activeDishIdx === 2 && <SantaHatIcon />}
                {currentDish.tagline}
              </span>
              <h3 className="text-3xl sm:text-4xl font-serif text-neutral-900 tracking-tight transition-all duration-300">
                {currentDish.name}
              </h3>
              <div className="w-12 h-[1px] bg-[#B91C1C]/30" />
              <p className="text-base text-neutral-600 leading-relaxed font-serif font-light">
                {parseMarkdownLinks(currentDish.description)}
              </p>

              {/* Spots/Indicators */}
              <div className="flex gap-2.5 pt-4">
                {dishes.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleDishChange(idx)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      activeDishIdx === idx
                        ? "w-8 bg-[#B91C1C]"
                        : "w-1.5 bg-neutral-200"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
