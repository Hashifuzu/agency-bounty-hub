'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { Layers, RotateCcw } from 'lucide-react';

export default function Footer() {
  const { role, resetToDefaultData } = useApp();

  return (
    <footer className="mt-20 border-t-2 border-[#0057FF] bg-[#060A13] text-[#8B95A5] text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="bg-[#060A13] border border-white/80 px-2 py-1 text-white font-extrabold italic uppercase tracking-wider text-xs">
                KREASIHUB
              </div>
              <span className="text-[11px] font-bold text-white uppercase tracking-tight">
                SISTEM SAYEMBARA & INOVASI
              </span>
            </div>
            <p className="max-w-md text-xs leading-relaxed text-[#8B95A5]">
              Platform sayembara & inovasi internal untuk agensi kreatif & digital. Menghubungkan tantangan operasional dengan solusi, template, dan otomatisasi dari talenta terbaik.
            </p>
            <div className="text-[11px] text-[#8B95A5]">
              Role Aktif: <span className="font-bold text-white uppercase">{role === 'admin' ? 'Manajemen (Admin)' : 'Karyawan (Talent)'}</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-extrabold uppercase tracking-tight text-white">
              Navigasi
            </h4>
            <ul className="space-y-1.5 text-xs text-[#8B95A5]">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Sayembara Aktif
                </Link>
              </li>
              <li>
                <Link href="/hall-of-fame" className="hover:text-white transition-colors">
                  Arsip Karya & Aset
                </Link>
              </li>
              <li>
                <Link href="/leaderboard" className="hover:text-white transition-colors">
                  Leaderboard Inovator
                </Link>
              </li>
            </ul>
          </div>

          {/* Testing & Reset Utilities */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-extrabold uppercase tracking-tight text-white">
              Sistem Data
            </h4>
            <p className="text-xs text-[#8B95A5] leading-normal">
              Perubahan tersimpan di browser lokal. Klik di bawah untuk mengembalikan data awal:
            </p>
            <button
              onClick={resetToDefaultData}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-none text-xs font-bold uppercase bg-[#0B0F17] hover:bg-[#0C1C3D] border border-[#232D3F] hover:border-[#0057FF] text-white transition-colors"
            >
              <RotateCcw className="w-3 h-3 text-[#0057FF]" />
              Reset Seed Data
            </button>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-[#232D3F] flex flex-col sm:flex-row items-center justify-between gap-3 text-[#8B95A5]">
          <p>© 2026 KreasiHub. Didesain untuk operasional agensi kreatif modern.</p>
          <div className="flex items-center gap-3 font-mono text-[11px]">
            <span>High-Contrast Cobalt & Obsidian</span>
            <span>•</span>
            <span>Next.js App Router</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
