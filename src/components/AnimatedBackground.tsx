'use client';

import React from 'react';

export default function AnimatedBackground() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none bg-[#03060F]"
    >
      {/* 1. Base Dark Canvas */}
      <div className="absolute inset-0 bg-[#03060F]" />

      {/* 2. Animated Moving Cobalt Dot Matrix Grid (18px Spacing, Seamless Drift) */}
      <div className="cobalt-dot-grid-animated absolute inset-0 pointer-events-none opacity-80" />

      {/* 3. Deep Radial Ambient Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[700px] bg-[#0057FF]/20 rounded-full blur-[140px] animate-ambient-glow" />

      {/* 4. Primary Left Light Shaft (Crisp & High-Contrast like reference) */}
      <div className="cobalt-shaft-left absolute -top-[30%] left-[-40px] sm:left-[2%] w-[240px] sm:w-[320px] h-[170%] pointer-events-none" />

      {/* 5. Secondary Right Light Shaft (Wide atmospheric beam) */}
      <div className="cobalt-shaft-right absolute -top-[25%] right-[-60px] sm:right-[4%] w-[320px] sm:w-[480px] h-[160%] pointer-events-none" />

      {/* 6. Center-Left Dynamic Accent Beam */}
      <div className="cobalt-shaft-center absolute -top-[40%] left-[32%] w-[160px] sm:w-[220px] h-[180%] pointer-events-none" />

      {/* 7. Slow Sweeping Shimmer Beam */}
      <div className="cobalt-shaft-sweep absolute -top-[30%] -left-[20%] w-[360px] h-[170%] pointer-events-none" />

      {/* 8. Subtle Corner Vignette */}
      <div className="absolute inset-0 bg-radial-vignette pointer-events-none" />
    </div>
  );
}
