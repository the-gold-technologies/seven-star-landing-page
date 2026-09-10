"use client";

import React from "react";
import Image from "next/image";
import { Download } from "lucide-react";
import { HangingOrnamentsMenus } from "./HangingOrnaments";
import { SleighIcon, ReindeerIcon, SantaHatIcon } from "./Icons";
import { parseMarkdownLinks } from "@/utils/text";

interface MenuType {
  title: string;
  subtitle: string;
  description: string;
  link: string;
  image: string;
  highlights: string[];
}

interface MenusSectionProps {
  activeMenuTab: number;
  handleMenuTabChange: (idx: number) => void;
  tabsRef: React.RefObject<HTMLDivElement | null>;
  indicatorRef: React.RefObject<HTMLSpanElement | null>;
  menuContentRef: React.RefObject<HTMLDivElement | null>;
  data?: {
    tagline?: string;
    heading?: string;
    headingHighlight?: string;
    menusList?: MenuType[];
  };
}

export const MenusSection = ({
  activeMenuTab,
  handleMenuTabChange,
  tabsRef,
  indicatorRef,
  menuContentRef,
  data,
}: MenusSectionProps) => {
  const tagline = data?.tagline || "Culinary Delights";
  const heading = data?.heading || "Download Our";
  const headingHighlight = data?.headingHighlight || "Festive Menus";
  const menus = data?.menusList && data.menusList.length > 0 ? data.menusList : [];

  const currentMenu = menus[activeMenuTab] || menus[0] || {};
  const currentHighlights = currentMenu.highlights || [];

  return (
    <section
      id="menus"
      className="reveal-section py-24 bg-[#faf9f6] relative overflow-hidden"
    >
      <HangingOrnamentsMenus />
      {/* Large Christmas Bell Outline on the left (Top) */}
      <div className="absolute left-[-50px] lg:left-4 top-2 w-[320px] h-[320px] opacity-[0.12] text-[#B91C1C] pointer-events-none hidden md:block">
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
      <div className="absolute right-[-50px] lg:right-4 bottom-12 w-[320px] h-[320px] opacity-[0.12] text-[#B91C1C] pointer-events-none hidden md:block">
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-[10px] tracking-[0.4em] text-[#B91C1C] uppercase font-bold block">
            {tagline}
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif tracking-tight text-neutral-900">
            {heading}{" "}
            <span className="italic font-light text-[#B91C1C]">
              {headingHighlight}
            </span>
          </h2>
          <div className="w-12 h-[1px] bg-[#B91C1C] opacity-50 mx-auto mt-4" />
        </div>

        {/* Tab buttons */}
        <div className="flex justify-center border-b border-black/5 mb-12">
          <div
            ref={tabsRef}
            className="flex gap-4 sm:gap-8 overflow-x-auto pb-px relative"
          >
            {/* Sliding Indicator */}
            <span
              ref={indicatorRef}
              className="absolute bottom-0 h-[2px] bg-[#D4AF37] rounded-full z-10 pointer-events-none"
              style={{ left: 0, width: 0 }}
            />
            {menus.map((menu, idx) => (
              <button
                key={idx}
                onClick={() => handleMenuTabChange(idx)}
                className={`pb-4 text-xs sm:text-sm font-bold uppercase tracking-widest transition-colors duration-300 whitespace-nowrap cursor-pointer relative flex items-center gap-2 ${
                  activeMenuTab === idx
                    ? "text-[#B91C1C] font-extrabold"
                    : "text-neutral-400 hover:text-neutral-600"
                }`}
              >
                {idx === 0 && <SleighIcon />}
                {idx === 1 && <ReindeerIcon />}
                {idx === 2 && <SantaHatIcon />}
                {menu.title}
              </button>
            ))}
          </div>
        </div>

        {/* Tab content panel */}
        <div className="bg-[#FDFBF7] border border-black/5 rounded-3xl p-8 sm:p-12 shadow-sm relative overflow-hidden">
          {/* Natural paper texture overlay */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-multiply bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />

          <div
            ref={menuContentRef}
            className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10"
          >
            {/* Menu Details */}
            <div className="lg:col-span-7 space-y-6">
              <span className="text-[10px] uppercase font-bold text-[#B91C1C] tracking-widest flex items-center gap-2">
                {activeMenuTab === 0 && <SleighIcon />}
                {activeMenuTab === 1 && <ReindeerIcon />}
                {activeMenuTab === 2 && <SantaHatIcon />}
                {currentMenu.subtitle}
              </span>
              <h3 className="text-3xl font-serif text-neutral-950">
                {currentMenu.title}
              </h3>
              <p className="text-sm text-neutral-600 leading-relaxed font-serif font-light">
                {parseMarkdownLinks(currentMenu.description)}
              </p>

              <div className="space-y-3 pt-2">
                <h4 className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider">
                  Menu Highlights Include:
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-neutral-700 font-serif font-light">
                  {currentHighlights.map((item, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#B91C1C] opacity-70" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-6">
                <a
                  href={`/api/download?url=${encodeURIComponent(currentMenu.link)}`}
                  download
                  aria-label={`Download ${currentMenu.title || "Festive"} Menu (PDF Format)`}
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#B91C1C] hover:bg-[#990000] text-white uppercase tracking-widest text-[10px] font-bold rounded-full transition-all shadow-[0_0_15px_rgba(185,28,28,0.2)]"
                >
                  <Download size={14} /> Download PDF Menu <SleighIcon />
                </a>
              </div>
            </div>

            {/* Menu Cover Image */}
            <div className="lg:col-span-5 relative rounded-2xl overflow-hidden h-[300px] sm:h-[350px] shadow-md">
              {currentMenu.image && (
                <Image
                  src={currentMenu.image}
                  alt={currentMenu.title || "Menu cover"}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-[2000ms]"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
