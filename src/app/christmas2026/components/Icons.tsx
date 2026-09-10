"use client";

import React from "react";

export const SleighIcon = () => (
  <svg
    className="w-4 h-4 text-[#B91C1C] inline-block shrink-0"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth="1.5"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3 10c0-2.5 2-4.5 4.5-4.5H15c2.5 0 4.5 2 4.5 4.5v2c0 2-1.5 3.5-3.5 3.5H5.5C3.5 15.5 2 14 2 12v-2z M2 15.5h20 M4 15.5v3a2 2 0 002 2h12a2 2 0 002-2v-3"
    />
  </svg>
);

export const ReindeerIcon = () => (
  <svg
    className="w-4 h-4 text-[#B91C1C] inline-block shrink-0"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth="1.5"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 4v6 M12 6l-3-3 M12 8l-2-2 M12 6l3-3 M12 8l2-2 M12 10c0 3 2 5 5 5h2 M12 10c0 3-2 5-5 5H7 M9 15v5 M15 15v5"
    />
  </svg>
);

export const SantaHatIcon = () => (
  <svg
    className="w-4 h-4 text-red-500 inline-block shrink-0 animate-bounce"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth="1.5"
    style={{ animationDuration: "3s" }}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 3a2 2 0 100 4 2 2 0 000-4z M12 7c-3.5 0-7 3-7 7v1c0 1 1 2 2 2h10c1 0 2-1 2-2v-1c0-4-3.5-7-7-7z M4 18h16a2 2 0 012 2v1H2v-1a2 2 0 012-2z"
    />
  </svg>
);

export const HollyIcon = ({ className }: { className: string }) => (
  <svg
    className={`${className} w-5 h-5 text-emerald-600 inline-block shrink-0`}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth="1.5"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 12c-2-2-4-1-6 0 1 2 3 3 6 0z M12 12c2-2 4-1 6 0-1 2-3 3-6 0z M12 12c-1 3-3 4-4 6 2-1 3-3 4-6z M12 12c1 3 3 4 4 6-2-1-3-3-4-6z M12 12a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"
    />
  </svg>
);

export const GiftIcon = () => (
  <svg
    className="w-5 h-5 text-[#B91C1C] inline-block shrink-0"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth="1.5"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M20 12v8H4v-8M22 7H2v5h20V7z M12 7V4a2 2 0 00-2-2H8a2 2 0 00-2 2v3 M12 7V4a2 2 0 012-2h2a2 2 0 012 2v3 M12 22V7"
    />
  </svg>
);
