"use client";

import React from "react";

// Hanging Ornament Parts
export const ReindeerOrnament = ({ x, y }: { x: number; y: number }) => (
  <g
    transform={`translate(${x - 15}, ${y})`}
    className="text-[#D4AF37] drop-shadow-[0_4px_6px_rgba(0,0,0,0.3)]"
  >
    <line
      x1="15"
      y1="-120"
      x2="15"
      y2="0"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeDasharray="3 3"
    />
    <ellipse
      cx="15"
      cy="20"
      rx="10"
      ry="7"
      fill="#8B5A2B"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <circle cx="15" cy="22" r="3" fill="#B91C1C" />
    <circle cx="11" cy="18" r="1.2" fill="#FFFFFF" />
    <circle cx="19" cy="18" r="1.2" fill="#FFFFFF" />
    <path
      d="M7 14 Q3 5 9 8 M7 11 Q1 9 5 6"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      fill="none"
    />
    <path
      d="M23 14 Q27 5 21 8 M23 11 Q29 9 25 6"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      fill="none"
    />
  </g>
);

export const SantaHatOrnament = ({ x, y }: { x: number; y: number }) => (
  <g
    transform={`translate(${x - 15}, ${y})`}
    className="text-[#B91C1C] drop-shadow-[0_4px_6px_rgba(0,0,0,0.3)]"
  >
    <line
      x1="15"
      y1="-120"
      x2="15"
      y2="0"
      stroke="#D4AF37"
      strokeWidth="1.5"
      strokeDasharray="3 3"
    />
    <path
      d="M5 22 L15 5 L25 22 Z"
      fill="#B91C1C"
      stroke="#D4AF37"
      strokeWidth="1.5"
    />
    <rect
      x="3"
      y="21"
      width="24"
      height="4"
      fill="#FFFFFF"
      rx="1"
      stroke="#D4AF37"
      strokeWidth="1"
    />
    <circle
      cx="15"
      cy="4"
      r="3"
      fill="#FFFFFF"
      stroke="#D4AF37"
      strokeWidth="1"
    />
  </g>
);

export const SnowmanOrnament = ({ x, y }: { x: number; y: number }) => (
  <g
    transform={`translate(${x - 15}, ${y})`}
    className="text-[#D4AF37] drop-shadow-[0_4px_6px_rgba(0,0,0,0.3)]"
  >
    <line
      x1="15"
      y1="-120"
      x2="15"
      y2="0"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeDasharray="3 3"
    />
    <circle
      cx="15"
      cy="10"
      r="7"
      fill="#FFFFFF"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <circle
      cx="15"
      cy="24"
      r="10"
      fill="#FFFFFF"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <path
      d="M10 16 L20 16"
      stroke="#B91C1C"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
    <rect x="10" y="0" width="10" height="4" fill="#1A1A1A" />
    <line x1="7" y1="4" x2="23" y2="4" stroke="#1A1A1A" strokeWidth="1.5" />
  </g>
);

export const StarOrnament = ({ x, y }: { x: number; y: number }) => (
  <g
    transform={`translate(${x - 15}, ${y})`}
    className="text-[#D4AF37] drop-shadow-[0_4px_6px_rgba(0,0,0,0.3)]"
  >
    <line
      x1="15"
      y1="-120"
      x2="15"
      y2="0"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeDasharray="3 3"
    />
    <path
      d="M15 2 L18 10 L27 10 L20 15 L23 23 L15 18 L7 23 L10 15 L3 10 L12 10 Z"
      fill="#D4AF37"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
  </g>
);

export const BellOrnament = ({ x, y }: { x: number; y: number }) => (
  <g
    transform={`translate(${x - 15}, ${y})`}
    className="text-[#D4AF37] drop-shadow-[0_4px_6px_rgba(0,0,0,0.3)]"
  >
    <line
      x1="15"
      y1="-120"
      x2="15"
      y2="0"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeDasharray="3 3"
    />
    <path
      d="M10 8 Q15 2 20 8 Q23 15 24 20 L6 20 Q7 15 10 8 Z"
      fill="#D4AF37"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <rect
      x="4"
      y="19"
      width="22"
      height="3"
      fill="#D4AF37"
      rx="1"
      stroke="currentColor"
      strokeWidth="1"
    />
    <circle cx="15" cy="23" r="2.5" fill="#B91C1C" />
  </g>
);

export const CandyCaneOrnament = ({ x, y }: { x: number; y: number }) => (
  <g
    transform={`translate(${x - 15}, ${y})`}
    className="text-[#B91C1C] drop-shadow-[0_4px_6px_rgba(0,0,0,0.3)]"
  >
    <line
      x1="15"
      y1="-120"
      x2="15"
      y2="0"
      stroke="#D4AF37"
      strokeWidth="1.5"
      strokeDasharray="3 3"
    />
    <path
      d="M10 25 L10 10 A5 5 0 0 1 20 10 L20 13"
      fill="none"
      stroke="#B91C1C"
      strokeWidth="4.5"
      strokeLinecap="round"
    />
    <path
      d="M10 25 L10 10 A5 5 0 0 1 20 10 L20 13"
      fill="none"
      stroke="#FFFFFF"
      strokeWidth="4.5"
      strokeLinecap="round"
      strokeDasharray="3 3"
    />
  </g>
);

export const StockingOrnament = ({ x, y }: { x: number; y: number }) => (
  <g
    transform={`translate(${x - 15}, ${y})`}
    className="text-[#B91C1C] drop-shadow-[0_4px_6px_rgba(0,0,0,0.3)]"
  >
    <line
      x1="15"
      y1="-120"
      x2="15"
      y2="0"
      stroke="#D4AF37"
      strokeWidth="1.5"
      strokeDasharray="3 3"
    />
    <path
      d="M10 6 L18 6 L18 16 L24 22 L17 25 L9 18 Z"
      fill="#B91C1C"
      stroke="#D4AF37"
      strokeWidth="1.5"
    />
    <rect
      x="8"
      y="4"
      width="12"
      height="4"
      rx="1"
      fill="#FFFFFF"
      stroke="#D4AF37"
      strokeWidth="1"
    />
  </g>
);

// Hanging Christmas Ornaments Components
export const HangingOrnamentsHero = () => (
  <div className="absolute top-0 right-10 left-10 z-30 pointer-events-none flex justify-between opacity-80 h-36">
    <svg className="w-16 h-full" viewBox="0 0 30 120" fill="none">
      <ReindeerOrnament x={15} y={60} />
    </svg>
    <svg
      className="w-16 h-full hidden sm:block"
      viewBox="0 0 30 120"
      fill="none"
    >
      <SantaHatOrnament x={15} y={45} />
    </svg>
    <svg className="w-16 h-full" viewBox="0 0 30 120" fill="none">
      <SnowmanOrnament x={15} y={70} />
    </svg>
  </div>
);

export const HangingOrnamentsFeatures = () => (
  <div className="absolute top-0 right-10 left-10 z-30 pointer-events-none flex justify-between opacity-80 h-36">
    <svg className="w-16 h-full" viewBox="0 0 30 120" fill="none">
      <StarOrnament x={15} y={65} />
    </svg>
    <svg
      className="w-16 h-full hidden sm:block"
      viewBox="0 0 30 120"
      fill="none"
    >
      <BellOrnament x={15} y={50} />
    </svg>
    <svg className="w-16 h-full" viewBox="0 0 30 120" fill="none">
      <CandyCaneOrnament x={15} y={75} />
    </svg>
  </div>
);

export const HangingOrnamentsMenus = () => (
  <div className="absolute top-0 right-10 left-10 z-30 pointer-events-none flex justify-between opacity-80 h-36">
    <svg className="w-16 h-full" viewBox="0 0 30 120" fill="none">
      <StockingOrnament x={15} y={60} />
    </svg>
    <svg
      className="w-16 h-full hidden sm:block"
      viewBox="0 0 30 120"
      fill="none"
    >
      <StarOrnament x={15} y={45} />
    </svg>
    <svg className="w-16 h-full" viewBox="0 0 30 120" fill="none">
      <ReindeerOrnament x={15} y={70} />
    </svg>
  </div>
);

export const HangingOrnamentsTransition = () => (
  <div className="absolute top-0 right-10 left-10 z-30 pointer-events-none flex justify-between opacity-80 h-36">
    <svg className="w-16 h-full" viewBox="0 0 30 120" fill="none">
      <SnowmanOrnament x={15} y={65} />
    </svg>
    <svg
      className="w-16 h-full hidden sm:block"
      viewBox="0 0 30 120"
      fill="none"
    >
      <BellOrnament x={15} y={50} />
    </svg>
    <svg className="w-16 h-full" viewBox="0 0 30 120" fill="none">
      <SantaHatOrnament x={15} y={75} />
    </svg>
  </div>
);
