"use client";

import React from "react";
import Image from "next/image";
import { parseMarkdownLinks } from "@/utils/text";

interface CelebrateCard {
  image?: string;
  alt?: string;
  title?: string;
  text?: string;
  link?: string;
  label?: string;
  external?: boolean;
}

interface CelebrateSectionProps {
  data?: {
    tagline?: string;
    heading?: string;
    headingHighlight?: string;
    cards?: CelebrateCard[];
  };
}

export const CelebrateSection = ({ data }: CelebrateSectionProps) => {
  const tagline = data?.tagline || "Ways to Celebrate";
  const heading = data?.heading || "How Will You";
  const headingHighlight = data?.headingHighlight || "Celebrate?";

  const defaultCards: CelebrateCard[] = [
    {
      image: "/Christmas/Party.jpg",
      alt: "Friends raising a toast at a Christmas party in the pub",
      title: "Christmas Festive",
      text: "Special seating arrangements for families and group bookings, plus elegant options for private and corporate celebrations.",
      link: "/Christmas/ChristmasFestiveMenu.pdf",
      label: "Christmas Festive Menu",
    },
    {
      image: "/Christmas/merrychristmas.jpg",
      alt: "Christmas Day table setting with candles and a decorated tree",
      title: "Christmas Day",
      text: "Christmas Day at Seven Stars: candlelight, a warm room, and a menu made for the one day of the year that deserves it.",
      link: "/Christmas/SevenstarsChristmasDaykidsMenus.pdf",
      label: "Christmas Day Menu",
    },
    {
      image: "/Christmas/BoxingDay.jpg",
      alt: "A relaxed Boxing Day spread at the pub",
      title: "Boxing Day",
      text: "Wind down the day after with a relaxed pub lunch, local ales and a fireside seat for the family.",
      link: "#",
      label: "Coming Soon",
    },
    {
      image: "/Christmas/NewYearEve.jpg",
      alt: "Friends celebrating New Year's Eve at the pub",
      title: "New Year's Eve",
      text: "See in the New Year with us — good drinks, good company and a toast at midnight.",
      link: "#",
      label: "Coming Soon",
      external: true,
    },
  ];

  const cards = data?.cards?.length ? data.cards : defaultCards;

  return (
    <section className="reveal-section py-24 lg:py-32 bg-[#0E2A1E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <span className="text-[11px] tracking-[0.3em] uppercase font-bold text-[#E3CE9A]">
            {tagline}
          </span>
          <span className="block w-12 h-px bg-[#C9A66B] mx-auto mt-5" />
          <h2 className="mt-6 font-serif text-4xl sm:text-5xl leading-tight text-[#FAF6EC]">
            {heading} <span className="italic text-[#C9A66B]">{headingHighlight}</span>
          </h2>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((c, i) => (
            <article key={i} className="group">
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image
                  src={c.image || "/Christmas/christmas-day.jpg"}
                  alt={c.alt || c.title || "Christmas celebration"}
                  fill
                  className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                />
              </div>
              <h3 className="mt-7 font-serif text-3xl text-[#FAF6EC]">{c.title}</h3>
              <span className="block w-12 h-px bg-[#C9A66B] mt-4" />
              {c.text && (
                <p className="mt-5 text-sm leading-relaxed text-[#FAF6EC]/70">
                  {parseMarkdownLinks(c.text)}
                </p>
              )}
              {c.link && (
                <a
                  href={c.link}
                  target={c.external ? "_blank" : undefined}
                  rel={c.external ? "noreferrer" : undefined}
                  className="mt-6 inline-block text-[11px] uppercase tracking-[0.2em] text-[#C9A66B] transition-colors hover:text-[#E3CE9A]"
                >
                  {c.label} →
                </a>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
