'use client';

import React, { useState, useMemo } from 'react';
import { useApp } from '@/context/AppContext';
import { Trophy, Search, Award } from 'lucide-react';

export default function LeaderboardPage() {
  const { leaderboard } = useApp();
  const [searchQuery, setSearchQuery] = useState('');

  const sortedLeaderboard = useMemo(() => {
    return [...leaderboard].sort((a, b) => {
      if (b.totalPoints !== a.totalPoints) {
        return b.totalPoints - a.totalPoints;
      }
      return b.winsCount - a.winsCount;
    });
  }, [leaderboard]);

  const filteredLeaderboard = useMemo(() => {
    if (!searchQuery.trim()) return sortedLeaderboard;
    const q = searchQuery.toLowerCase();
    return sortedLeaderboard.filter(
      (emp) =>
        emp.name.toLowerCase().includes(q) ||
        emp.role.toLowerCase().includes(q) ||
        emp.department.toLowerCase().includes(q) ||
        emp.badge.toLowerCase().includes(q)
    );
  }, [sortedLeaderboard, searchQuery]);

  const top1 = sortedLeaderboard[0];
  const top2 = sortedLeaderboard[1];
  const top3 = sortedLeaderboard[2];

  return (
    <div className="min-h-screen max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-10 pb-16">
      {/* Page Header */}
      <div className="mb-6 sm:mb-8">
        <div className="inline-flex items-center gap-2 px-2 py-0.5 bg-[#0057FF] text-white text-[10px] font-black uppercase tracking-wider mb-2 rounded-none">
          PERINGKAT TALENTA INOVATIF
        </div>
        <h1 className="text-xl sm:text-3xl font-extrabold uppercase italic tracking-tight text-white">
          LEADERBOARD INOVATOR
        </h1>
        <p className="text-xs sm:text-sm text-[#8B95A5] mt-1 font-normal leading-relaxed">
          Apresiasi bagi karyawan paling kontributif dalam sayembara inovasi dan efisiensi operasional agensi.
        </p>
      </div>

      {/* Top 3 Cards in High-Contrast Obsidian & Cobalt (Mobile order: 1 -> 2 -> 3) */}
      {!searchQuery && top1 && top2 && top3 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4 mb-6 sm:mb-8">
          {/* Rank 1 (Top Champion: First on Mobile, Center on Desktop) */}
          <div className="order-1 md:order-2 p-5 bg-[#0C1C3D] border-2 border-[#0057FF] border-b-4 border-b-[#0057FF] rounded-none flex flex-col justify-between shadow-xs">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="w-6 h-6 bg-[#0057FF] text-white text-xs font-black flex items-center justify-center rounded-none">
                  1
                </span>
                <span className="text-[10px] font-black uppercase tracking-widest text-[#0057FF] bg-white px-2 py-0.5">
                  TOP INOVATOR 👑
                </span>
              </div>
              <div className="flex items-center gap-3 mb-3">
                <img
                  src={top1.avatar}
                  alt={top1.name}
                  className="w-12 h-12 rounded-none object-cover border-2 border-[#0057FF]"
                />
                <div>
                  <h3 className="text-base font-extrabold uppercase italic text-white">{top1.name}</h3>
                  <p className="text-xs text-blue-200">{top1.role}</p>
                </div>
              </div>
              <span className="inline-block px-2 py-0.5 bg-[#0057FF] text-white text-[11px] font-extrabold uppercase mb-4 rounded-none">
                {top1.badge}
              </span>
            </div>

            <div className="pt-3 border-t border-[#0057FF]/40 grid grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-[10px] uppercase font-bold text-blue-200 block">TOTAL POIN</span>
                <strong className="text-lg font-black text-white">{top1.totalPoints} PTS</strong>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-blue-200 block">KEMENANGAN</span>
                <strong className="text-lg font-black text-white">{top1.winsCount}X JUARA</strong>
              </div>
            </div>
          </div>

          {/* Rank 2 (Second on Mobile, Left on Desktop) */}
          <div className="order-2 md:order-1 p-5 bg-[#0B0F17] border border-[#232D3F] border-b-4 border-b-[#8B95A5] rounded-none flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="w-6 h-6 bg-[#0F1521] border border-[#232D3F] text-white text-xs font-black flex items-center justify-center rounded-none">
                  2
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#8B95A5]">PERINGKAT 2</span>
              </div>
              <div className="flex items-center gap-3 mb-3">
                <img
                  src={top2.avatar}
                  alt={top2.name}
                  className="w-12 h-12 rounded-none object-cover border border-[#232D3F]"
                />
                <div>
                  <h3 className="text-sm font-extrabold uppercase italic text-white">{top2.name}</h3>
                  <p className="text-xs text-[#8B95A5]">{top2.role}</p>
                </div>
              </div>
              <span className="inline-block px-2 py-0.5 bg-[#0F1521] border border-[#232D3F] text-[11px] font-bold text-[#8B95A5] uppercase mb-4 rounded-none">
                {top2.badge}
              </span>
            </div>

            <div className="pt-3 border-t border-[#232D3F] grid grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-[10px] uppercase font-bold text-[#8B95A5] block">TOTAL POIN</span>
                <strong className="text-base font-black text-white">{top2.totalPoints} PTS</strong>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-[#8B95A5] block">KEMENANGAN</span>
                <strong className="text-base font-black text-white">{top2.winsCount}X JUARA</strong>
              </div>
            </div>
          </div>

          {/* Rank 3 (Third on Mobile, Right on Desktop) */}
          <div className="order-3 p-5 bg-[#0B0F17] border border-[#232D3F] border-b-4 border-b-[#8B95A5] rounded-none flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="w-6 h-6 bg-[#0F1521] border border-[#232D3F] text-white text-xs font-black flex items-center justify-center rounded-none">
                  3
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#8B95A5]">PERINGKAT 3</span>
              </div>
              <div className="flex items-center gap-3 mb-3">
                <img
                  src={top3.avatar}
                  alt={top3.name}
                  className="w-12 h-12 rounded-none object-cover border border-[#232D3F]"
                />
                <div>
                  <h3 className="text-sm font-extrabold uppercase italic text-white">{top3.name}</h3>
                  <p className="text-xs text-[#8B95A5]">{top3.role}</p>
                </div>
              </div>
              <span className="inline-block px-2 py-0.5 bg-[#0F1521] border border-[#232D3F] text-[11px] font-bold text-[#8B95A5] uppercase mb-4 rounded-none">
                {top3.badge}
              </span>
            </div>

            <div className="pt-3 border-t border-[#232D3F] grid grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-[10px] uppercase font-bold text-[#8B95A5] block">TOTAL POIN</span>
                <strong className="text-base font-black text-white">{top3.totalPoints} PTS</strong>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-[#8B95A5] block">KEMENANGAN</span>
                <strong className="text-base font-black text-white">{top3.winsCount}X JUARA</strong>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Rankings Table & Mobile Card List */}
      <div className="bg-[#0B0F17] border border-[#232D3F] rounded-none overflow-hidden">
        {/* Table Search Header */}
        <div className="p-3.5 sm:p-4 border-b border-[#232D3F] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <h3 className="text-xs sm:text-sm font-extrabold uppercase italic text-white">
            TABEL PERINGKAT LENGKAP
          </h3>

          <div className="relative w-full sm:w-56">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#8B95A5]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari nama karyawan..."
              className="w-full pl-8 pr-3 py-1.5 text-base sm:text-xs bg-[#0F1521] border border-[#232D3F] text-white placeholder:text-[#8B95A5] focus:outline-none focus:border-[#0057FF] rounded-none"
            />
          </div>
        </div>

        {/* 1. Mobile Cards View (Visible on < 640px) */}
        <div className="sm:hidden divide-y divide-[#232D3F]">
          {filteredLeaderboard.map((emp, index) => {
            const rank = index + 1;
            return (
              <div key={emp.id} className="p-3.5 flex items-center justify-between gap-3 hover:bg-[#0F1521]/60 transition-colors">
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className={`w-6 h-6 text-xs font-black flex items-center justify-center shrink-0 ${
                    rank === 1 ? 'bg-[#0057FF] text-white' : 'bg-[#0F1521] border border-[#232D3F] text-[#8B95A5]'
                  }`}>
                    #{rank}
                  </span>
                  <img
                    src={emp.avatar}
                    alt={emp.name}
                    className="w-9 h-9 rounded-none object-cover border border-[#232D3F] shrink-0"
                  />
                  <div className="min-w-0">
                    <div className="font-extrabold uppercase italic text-white text-xs truncate">
                      {emp.name}
                    </div>
                    <div className="text-[10px] text-[#8B95A5] truncate">
                      {emp.role}
                    </div>
                    <span className="inline-block px-1.5 py-0.2 bg-[#0F1521] border border-[#232D3F] text-[9px] font-bold uppercase text-[#8B95A5] mt-1">
                      {emp.badge}
                    </span>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <div className="text-xs font-black text-[#0057FF]">
                    {emp.totalPoints} PTS
                  </div>
                  <div className="text-[10px] font-bold text-white mt-0.5">
                    {emp.winsCount}x Juara
                  </div>
                  <div className="text-[10px] text-[#8B95A5]">
                    {emp.totalCashWon}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* 2. Desktop Full Table View (Visible on >= 640px) */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-[#0F1521] border-b border-[#232D3F] text-[#8B95A5] text-[10px] font-black uppercase tracking-wider">
              <tr>
                <th className="px-5 py-3 w-16">RANK</th>
                <th className="px-5 py-3">NAMA KARYAWAN</th>
                <th className="px-5 py-3">GELAR / BADGE</th>
                <th className="px-5 py-3 text-center">MENANG</th>
                <th className="px-5 py-3 text-center">APPROVED</th>
                <th className="px-5 py-3 text-right">POIN</th>
                <th className="px-5 py-3 text-right">TOTAL HADIAH</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#232D3F]">
              {filteredLeaderboard.map((emp, index) => {
                const rank = index + 1;
                return (
                  <tr key={emp.id} className="hover:bg-[#0F1521]/60 transition-colors">
                    <td className="px-5 py-3.5 font-black text-white">
                      #{rank}
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={emp.avatar}
                          alt={emp.name}
                          className="w-7 h-7 rounded-none object-cover border border-[#232D3F]"
                        />
                        <div>
                          <div className="font-extrabold uppercase italic text-white">
                            {emp.name}
                          </div>
                          <div className="text-[11px] text-[#8B95A5]">
                            {emp.role} • {emp.department}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="inline-flex px-2 py-0.5 bg-[#0F1521] border border-[#232D3F] text-[10px] font-bold uppercase text-[#8B95A5] rounded-none">
                        {emp.badge}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-center font-black text-white">
                      {emp.winsCount}x
                    </td>
                    <td className="px-5 py-3.5 text-center text-[#8B95A5] font-bold">
                      {emp.approvedCount}
                    </td>
                    <td className="px-5 py-3.5 text-right font-black text-[#0057FF]">
                      {emp.totalPoints} PTS
                    </td>
                    <td className="px-5 py-3.5 text-right font-bold text-white">
                      {emp.totalCashWon}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
