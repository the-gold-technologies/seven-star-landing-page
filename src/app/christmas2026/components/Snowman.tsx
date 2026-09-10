"use client";

import React from "react";

export const Snowman = () => (
  <svg
    className="w-20 h-28 text-slate-100 drop-shadow-[0_10px_15px_rgba(0,0,0,0.15)] inline-block shrink-0 animate-bounce"
    fill="currentColor"
    viewBox="0 0 60 80"
    style={{ animationDuration: "4s" }}
  >
    {/* Hat */}
    <rect x="20" y="2" width="20" height="12" fill="#1A1A1A" rx="1" />
    <ellipse cx="30" cy="14" rx="16" ry="3" fill="#1A1A1A" />
    {/* Head */}
    <circle
      cx="30"
      cy="28"
      r="11"
      fill="#FFFFFF"
      stroke="#E2E8F0"
      strokeWidth="1.5"
    />
    {/* Eyes */}
    <circle cx="26" cy="26" r="1.5" fill="#1A1A1A" />
    <circle cx="34" cy="26" r="1.5" fill="#1A1A1A" />
    {/* Nose (Carrot) */}
    <polygon points="30,28 39,30 30,32" fill="#F97316" />
    {/* Smile */}
    <circle cx="26" cy="33" r="0.8" fill="#1A1A1A" />
    <circle cx="28" cy="34" r="0.8" fill="#1A1A1A" />
    <circle cx="30" cy="35" r="0.8" fill="#1A1A1A" />
    <circle cx="32" cy="34" r="0.8" fill="#1A1A1A" />
    <circle cx="34" cy="33" r="0.8" fill="#1A1A1A" />
    {/* Scarf */}
    <path d="M20 37 Q30 42 40 37 L38 41 Q30 46 22 41 Z" fill="#B91C1C" />
    <path d="M33 39 L35 50 L30 49 L30 39" fill="#B91C1C" />
    {/* Body */}
    <circle
      cx="30"
      cy="54"
      r="17"
      fill="#FFFFFF"
      stroke="#E2E8F0"
      strokeWidth="1.5"
    />
    {/* Buttons */}
    <circle cx="30" cy="46" r="2" fill="#1A1A1A" />
    <circle cx="30" cy="54" r="2" fill="#1A1A1A" />
    <circle cx="30" cy="62" r="2" fill="#1A1A1A" />
    {/* Sticks (Arms) */}
    <line
      x1="14"
      y1="46"
      x2="3"
      y2="40"
      stroke="#78350F"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <line
      x1="46"
      y1="46"
      x2="57"
      y2="40"
      stroke="#78350F"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);
