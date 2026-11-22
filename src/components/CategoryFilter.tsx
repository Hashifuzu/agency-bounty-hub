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
        {/* Search */}
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8B95A5]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Cari sayembara..."
            className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-[#0F1521] border border-[#232D3F] text-white placeholder:text-[#8B95A5] focus:outline-none focus:border-[#0057FF] focus:border-2 transition-colors rounded-none"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#8B95A5] hover:text-white"
            >
              ✕
            </button>
          )}
        </div>

        {/* Status Segmented Control */}
        <div className="flex items-center bg-[#0B0F17] border border-[#232D3F] p-0.5">
          {STATUS_ITEMS.map((st) => {
            const isSelected = selectedStatus === st;
            return (
              <button
                key={st}
                onClick={() => onSelectStatus(st)}
                className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider transition-colors rounded-none ${
                  isSelected
                    ? 'bg-[#0057FF] text-white'
                    : 'text-[#8B95A5] hover:text-white'
                }`}
              >
                {st === 'Open' ? 'OPEN' : st === 'In Review' ? 'IN REVIEW' : st === 'Closed' ? 'CLOSED' : 'SEMUA'}
              </button>
            );
          })}
        </div>
      </div>

      {/* Category Pills (High-Contrast Cobalt & Obsidian) */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat;
          const count = categoryCounts[cat] || 0;

          return (
            <button
              key={cat}
              onClick={() => onSelectCategory(cat)}
              className={`flex items-center gap-2 px-3 py-1.5 text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-colors rounded-none border ${
                isSelected
                  ? 'bg-[#0C1C3D] border-2 border-[#0057FF] text-white'
                  : 'bg-[#0B0F17] border-[#232D3F] hover:border-[#0057FF] text-[#8B95A5] hover:text-white'
              }`}
            >
              <span>{cat}</span>
              {count > 0 && (
                <span
                  className={`text-[10px] px-1.5 py-0.2 font-extrabold ${
                    isSelected
                      ? 'bg-[#0057FF] text-white'
                      : 'bg-[#0F1521] text-[#8B95A5] border border-[#232D3F]'
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
