'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { 
  Sparkles, 
  Flame, 
  Trophy, 
  Clock, 
  ArrowUpRight, 
  Zap, 
  Layers, 
  TrendingUp, 
  Users,
  Target,
  ShieldAlert
} from 'lucide-react';

export default function BentoHero() {
  const { bounties, submissions, role, setRole } = useApp();

  const activeBountiesCount = bounties.filter((b) => b.status === 'Open').length;
  const winnersCount = submissions.filter((s) => s.status === 'Winner').length;
  const totalSubmissions = submissions.length;

  return (
    <div className="relative pt-6 pb-12 overflow-hidden">
      {/* Background ambient water glow and moon rays */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-500/20 via-blue-900/10 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute top-1/4 -right-20 w-80 h-80 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 -left-20 w-80 h-80 bg-cyan-400/10 rounded-full blur-3xl pointer-events-none" />

      {/* Hero Header */}
      <div className="text-center max-w-4xl mx-auto mb-10 px-4 relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 p3-slant bg-[#040e24] border border-cyan-400/50 text-cyan-300 font-p3 text-xs font-black uppercase tracking-widest mb-4 shadow-[0_0_15px_rgba(0,210,255,0.3)]">
          <span className="p3-unslant flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            // DARK HOUR INNOVATION PROTOCOL // PHASE 03
          </span>
        </div>

        <h1 className="font-p3 text-4xl sm:text-5xl md:text-6xl font-black uppercase italic tracking-tighter text-white leading-[1.05] drop-shadow-[0_2px_20px_rgba(0,210,255,0.4)]">
          RELOAD YOUR{' '}
          <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500 bg-clip-text text-transparent p3-text-glow">
            INNOVATION & BOUNTY
          </span>
        </h1>

        <p className="mt-4 text-sm sm:text-base text-slate-300 font-medium max-w-2xl mx-auto leading-relaxed">
          Platform sayembara agensi kreatif. Buka tantangan operasional, kumpulkan inovasi otomatisasi dan template terbaik, raih reward tunai & poin S-Rank.
        </p>

        {/* Quick Demo switcher banner in P3 tactical style */}
        <div className="mt-6 inline-flex items-center gap-3 p-1.5 pl-4 pr-2 p3-slant bg-[#020712] border border-cyan-500/50 text-xs shadow-[0_0_18px_rgba(0,210,255,0.25)]">
          <span className="p3-unslant text-cyan-300/80 font-p3 font-semibold uppercase tracking-wider text-[11px]">
            CURRENT STATUS:{' '}
            <strong className="text-cyan-400 font-black">
              [{role === 'admin' ? 'MANAGEMENT // S-RANK ADMIN' : 'OPERATIVE // TALENT'}]
            </strong>
          </span>
          <button
            onClick={() => setRole(role === 'admin' ? 'employee' : 'admin')}
            className="p3-unslant px-3 py-1 font-p3 font-black uppercase italic text-[11px] bg-gradient-to-r from-cyan-400 to-blue-600 text-slate-950 hover:shadow-[0_0_12px_#00d2ff] transition-all"
          >
            SWITCH TO {role === 'admin' ? 'TALENT' : 'ADMIN'}
          </button>
        </div>
      </div>

      {/* Bento Grid Metrics in Persona 3 Reload aesthetic */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Card 1: Total Bounty Pool (Persona 3 High Glow) */}
        <div className="relative overflow-hidden p-6 p3-card p3-border-glow text-white group hover:scale-[1.02] transition-all duration-300">
          <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/15 rounded-full blur-2xl group-hover:scale-125 transition-transform" />
          <div className="flex items-center justify-between mb-3">
            <span className="font-p3 font-black text-xs uppercase tracking-widest text-cyan-400 italic">
              // REWARD POOL ACTIVE
            </span>
            <div className="w-8 h-8 p3-slant bg-cyan-400/20 border border-cyan-400/50 flex items-center justify-center text-cyan-400">
              <Zap className="w-4 h-4 p3-unslant" />
            </div>
          </div>
          <div className="font-p3 text-3xl sm:text-4xl font-black italic tracking-tight text-white p3-text-glow">
            Rp 9.750.000+
          </div>
          <p className="mt-1 text-xs text-cyan-200/70 font-medium">
            Alokasi anggaran inovasi Q4 manajemen
          </p>
        </div>

        {/* Card 2: Active Bounties */}
        <div className="relative overflow-hidden p-6 p3-card p3-border text-white group hover:scale-[1.02] transition-all duration-300">
          <div className="flex items-center justify-between mb-3">
            <span className="font-p3 font-black text-xs uppercase tracking-widest text-slate-400 italic">
              // ACTIVE MISSIONS
            </span>
            <div className="w-8 h-8 p3-slant bg-blue-500/20 border border-blue-400/50 flex items-center justify-center text-blue-400">
              <Flame className="w-4 h-4 p3-unslant" />
            </div>
          </div>
          <div className="font-p3 text-3xl sm:text-4xl font-black italic tracking-tight text-cyan-400">
            {activeBountiesCount} TARGET
          </div>
          <div className="mt-1 flex items-center gap-1.5 text-xs text-cyan-400 font-semibold font-p3 uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            Open for all agency talents
          </div>
        </div>

        {/* Card 3: Inovasi Teradopsi / Hall of Fame */}
        <Link
          href="/hall-of-fame"
          className="relative overflow-hidden p-6 p3-card border border-amber-400/40 text-white group hover:scale-[1.02] hover:border-amber-400 transition-all duration-300"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="font-p3 font-black text-xs uppercase tracking-widest text-amber-400 italic">
              // WINNERS & ARCHIVE
            </span>
            <div className="w-8 h-8 p3-slant bg-amber-500/20 border border-amber-400/50 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
              <Trophy className="w-4 h-4 p3-unslant" />
            </div>
          </div>
          <div className="font-p3 text-3xl sm:text-4xl font-black italic tracking-tight text-white flex items-center justify-between">
            <span className="text-amber-300 p3-text-glow-yellow">{winnersCount} ASSETS</span>
            <ArrowUpRight className="w-5 h-5 text-amber-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </div>
          <p className="mt-1 text-xs text-slate-400 font-medium">
            Diadopsi resmi di project klien aktif
          </p>
        </Link>

        {/* Card 4: Submissions / Partisipasi */}
        <div className="relative overflow-hidden p-6 p3-card p3-border text-white group hover:scale-[1.02] transition-all duration-300">
          <div className="flex items-center justify-between mb-3">
            <span className="font-p3 font-black text-xs uppercase tracking-widest text-slate-400 italic">
              // INTEL SUBMITTED
            </span>
            <div className="w-8 h-8 p3-slant bg-cyan-500/20 border border-cyan-400/50 flex items-center justify-center text-cyan-400">
              <Users className="w-4 h-4 p3-unslant" />
            </div>
          </div>
          <div className="font-p3 text-3xl sm:text-4xl font-black italic tracking-tight text-white">
            {totalSubmissions} KARYA
          </div>
          <p className="mt-1 text-xs text-slate-400 font-medium">
            Dari 6 divisi agensi berbeda
          </p>
        </div>
      </div>
    </div>
  );
}
