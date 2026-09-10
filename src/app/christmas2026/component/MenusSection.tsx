"use client";

import React from "react";

export const MenusSection = () => {
  return (
    <section id="menus" className="reveal-section py-24 lg:py-32 bg-[#F1EADC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <span className="text-[11px] tracking-[0.3em] uppercase font-bold text-[#7A2530]">
            Download Our Menus
          </span>
          <span className="block w-12 h-px bg-[#C9A66B] mx-auto mt-5" />
          <h2 className="mt-6 font-serif text-4xl sm:text-5xl leading-tight text-[#0E2A1E]">
            Our Christmas <span className="italic text-[#C9A66B]">Menus</span>
          </h2>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* Card 1: Christmas Day Menu */}
          <a
            href="Christmas/ChristmasFestiveMenuFinal.pdf"
            target="_blank"
            rel="noreferrer"
            className="flex h-full flex-col border border-[#C9A66B]/40 bg-white p-9 transition-colors duration-500 hover:border-[#C9A66B]"
          >
            <span className="font-serif text-4xl italic text-[#C9A66B]/70">✦</span>
            <h3 className="mt-6 font-serif text-2xl text-[#0E2A1E]">Christmas Festive Menu</h3>
            <p className="mt-4 flex-1 text-sm leading-relaxed text-neutral-500">
              The full Christmas Day menu, served in our decorated dining rooms.
            </p>
            <span className="mt-8 text-[11px] uppercase tracking-[0.2em] text-[#7A2530]">
              View menu →
            </span>
          </a>

          {/* Card 2: Christmas Children's Day Menu */}
          <a
            href="#"
            target="_blank"
            rel="noreferrer"
            className="flex h-full flex-col border border-[#C9A66B]/40 bg-white p-9 transition-colors duration-500 hover:border-[#C9A66B]"
          >
            <span className="font-serif text-4xl italic text-[#C9A66B]/70">✦</span>
            <h3 className="mt-6 font-serif text-2xl text-[#0E2A1E]">
              Christmas Children&apos;s Day Menu
            </h3>
            <p className="mt-4 flex-1 text-sm leading-relaxed text-neutral-500">
              Christmas Day menu for little ones — smaller plates, same festive spirit.
            </p>
            <span className="mt-8 text-[11px] uppercase tracking-[0.2em] text-[#7A2530]">
              View menu →
            </span>
          </a>

          {/* Card 3: Boxing Day Menu */}
          <a
            href="#"
            target="_blank"
            rel="noreferrer"
            className="flex h-full flex-col border border-[#C9A66B]/40 bg-white p-9 transition-colors duration-500 hover:border-[#C9A66B]"
          >
            <span className="font-serif text-4xl italic text-[#C9A66B]/70">✦</span>
            <h3 className="mt-6 font-serif text-2xl text-[#0E2A1E]">Boxing Day Menu</h3>
            <p className="mt-4 flex-1 text-sm leading-relaxed text-neutral-500">
              A relaxed Boxing Day menu — hearty plates for the day after.
            </p>
            <span className="mt-8 text-[11px] uppercase tracking-[0.2em] text-[#7A2530]">
              View menu →
            </span>
          </a>
        </div>

        <p className="mt-14 text-center text-sm text-neutral-500">
          Our festive menu is here — book your table and enjoy holiday favourites.
        </p>
      </div>
    </section>
  );
};
