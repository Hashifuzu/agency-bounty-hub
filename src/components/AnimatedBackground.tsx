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

      {/* 3. Top Ambient Glow (Soft Cobalt radial fade directly beneath navbar, full width with zero cutoffs) */}
      <div className="top-ambient-glow absolute top-0 inset-x-0 w-full h-[500px] pointer-events-none" />
    </div>
  );
}
