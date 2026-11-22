'use client';

import React from 'react';
import { Search } from 'lucide-react';

interface Props {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  selectedStatus: string;
  onSelectStatus: (status: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  categoryCounts: Record<string, number>;
}

const CATEGORIES = [
  'Semua Kategori',
  'Tech & Automation',
  'Video & Motion',
  'Desain & Template',
  'SOP & Workflow',
  'Pitch & Strategi',
];

const STATUS_ITEMS = ['Semua Status', 'Open', 'In Review', 'Closed'];

export default function CategoryFilter({
  selectedCategory,
  onSelectCategory,
  selectedStatus,
  onSelectStatus,
  searchQuery,
  onSearchChange,
  categoryCounts,
}: Props) {
  return (
    <div className="space-y-3 mb-6">
      {/* Top Search & Status Segment */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Search Bar */}
        <div className="relative flex-1 sm:max-w-xs md:max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8B95A5]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Cari sayembara..."
            className="w-full pl-9 pr-8 py-2 text-base sm:text-xs md:text-sm bg-[#0E1420]/85 backdrop-blur-sm border border-[#1E293B] text-white placeholder:text-[#8B95A5] focus:outline-none focus:border-[#0057FF] transition-colors rounded-none"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center text-xs text-[#8B95A5] hover:text-white"
            >
              ✕
            </button>
          )}
        </div>

        {/* Status Segmented Control (Grid on mobile, flex on tablet/desktop) */}
        <div className="grid grid-cols-4 sm:flex items-center bg-[#0E1420]/85 backdrop-blur-sm border border-[#1E293B] p-0.5">
          {STATUS_ITEMS.map((st) => {
            const isSelected = selectedStatus === st;
            return (
              <button
                key={st}
                onClick={() => onSelectStatus(st)}
                className={`py-1.5 px-1 sm:px-3 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-center transition-colors rounded-none ${
                  isSelected
                    ? 'bg-[#0057FF] text-white'
                    : 'text-[#8B95A5] hover:text-white'
                }`}
              >
                {st === 'Open' ? 'OPEN' : st === 'In Review' ? 'REVIEW' : st === 'Closed' ? 'CLOSED' : 'SEMUA'}
              </button>
            );
          })}
        </div>
      </div>

      {/* Category Pills (Touch-optimized horizontal scrollbar on mobile) */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none touch-pan-x -mx-1 px-1">
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat;
          const count = categoryCounts[cat] || 0;

          return (
            <button
              key={cat}
              onClick={() => onSelectCategory(cat)}
              className={`flex items-center gap-1.5 px-3 py-2 sm:py-1.5 text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-colors rounded-none border shrink-0 ${
                isSelected
                  ? 'bg-[#0057FF]/25 border-2 border-[#0057FF] text-white'
                  : 'bg-[#0E1420]/85 backdrop-blur-sm border border-[#1E293B] hover:border-[#0057FF] text-[#8B95A5] hover:text-white'
              }`}
            >
              <span>{cat}</span>
              {count > 0 && (
                <span
                  className={`text-[10px] px-1.5 py-0.2 font-extrabold ${
                    isSelected ? 'bg-[#0057FF] text-white' : 'bg-[#0E1420] text-[#8B95A5]'
                  }`}
                >
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
