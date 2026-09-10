"use client";

import React from "react";
import Image from "next/image";

interface GalleryImage {
  image?: string;
  alt?: string;
  span?: string;
}

interface GallerySectionProps {
  data?: {
    tagline?: string;
    heading?: string;
    headingHighlight?: string;
    images?: GalleryImage[];
  };
}

export const GallerySection = ({ data }: GallerySectionProps) => {
  const tagline = data?.tagline || "Visual Feast";
  const heading = data?.heading || "Christmas Looks Good at";
  const headingHighlight = data?.headingHighlight || "Seven Stars";

  const defaultImages: GalleryImage[] = [
    {
      image: "/Christmas/partyPub.jpg",
      alt: "The pub interior glowing on a frosty winter evening",
      span: "col-span-2 row-span-2",
    },
    { image: "/Christmas/Christamas3.jpg", alt: "Chrismas celebration beer on the table" },
    { image: "/Christmas/Christmas-party-new.jpg", alt: "Christmas party table" },
    { image: "/Christmas/chrismasCelebration.jpg", alt: "Mulled wine with orange and cinnamon on the bar" },
    { image: "/Christmas/ChristmasDay.jpg", alt: "Christmas Day table setting with candles and a decorated tree" },
    { image: "/Christmas/FirePlace.jpg", alt: "The fireside snug decorated for Christmas" },
    { image: "/Christmas/ChrismasBeer.jpg", alt: "Christmas lunch table" },
    {
      image: "/Christmas/party-pub.jpg",
      alt: "Friends toasting at a Christmas party in the pub",
      span: "col-span-2 lg:col-span-2",
    },
  ];

  const images = data?.images?.length ? data.images : defaultImages;

  return (
    <section id="gallery" className="reveal-section py-24 lg:py-32 bg-[#FAF6EC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="max-w-2xl mx-auto text-center">
          <span className="text-[11px] tracking-[0.3em] uppercase font-bold text-[#7A2530]">
            {tagline}
          </span>
          <span className="block w-12 h-px bg-[#C9A66B] mx-auto mt-5" />
          <h2 className="mt-6 font-serif text-4xl sm:text-5xl leading-tight text-[#0E2A1E]">
            {heading} <span className="italic text-[#C9A66B]">{headingHighlight}</span>
          </h2>
        </div>

        <div className="mt-16 grid auto-rows-[200px] sm:auto-rows-[250px] grid-cols-2 lg:grid-cols-4 gap-5">
          {images.map((g, i) => (
            <figure
              key={i}
              className={`group relative overflow-hidden ${g.span || ""}`}
            >
              <Image
                src={g.image || "/Christmas/hero-fireplace.jpg"}
                alt={g.alt || "Seven Stars Christmas"}
                fill
                className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
              />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};
