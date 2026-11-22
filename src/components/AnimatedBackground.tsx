'use client';

import React from 'react';

export default function AnimatedBackground() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none bg-[#060A13]"
    >
      {/* 1. Base Dark Background (#060A13) */}
      <div className="absolute inset-0 bg-[#060A13]" />

      {/* 2. Subtle Dot Grid Pattern (#1E293B 1px, 24px x 24px) */}
      <div className="subtle-dot-grid absolute inset-0 pointer-events-none" />

      {/* 3. Top Ambient Glow (Soft 10% #0057FF radial fade directly beneath navbar) */}
      <div className="top-ambient-glow absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-[450px] pointer-events-none" />
    </div>
  );
}
