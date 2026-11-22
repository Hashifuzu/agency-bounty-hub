'use client';

import React, { useState, useMemo } from 'react';
import { useApp } from '@/context/AppContext';
import CategoryFilter from '@/components/CategoryFilter';
import BountyCard from '@/components/BountyCard';
import CreateBountyModal from '@/components/CreateBountyModal';
import { Plus, Inbox, Layers } from 'lucide-react';

export default function HomePage() {
  const { bounties, submissions, role } = useApp();

  const [selectedCategory, setSelectedCategory] = useState('Semua Kategori');
  const [selectedStatus, setSelectedStatus] = useState('Semua Status');
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // Quick Stats
  const activeBountiesCount = bounties.filter((b) => b.status === 'Open').length;
  const totalSubmissionsCount = submissions.length;
  const adoptedAssetsCount = submissions.filter((s) => s.status === 'Winner').length;

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { 'Semua Kategori': bounties.length };
    bounties.forEach((b) => {
      counts[b.category] = (counts[b.category] || 0) + 1;
    });
    return counts;
  }, [bounties]);

  // Filtered bounties
  const filteredBounties = useMemo(() => {
    return bounties.filter((b) => {
      if (selectedCategory !== 'Semua Kategori' && b.category !== selectedCategory) {
        return false;
      }
      if (selectedStatus !== 'Semua Status' && b.status !== selectedStatus) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = b.title.toLowerCase().includes(q);
        const matchBrief = b.brief.toLowerCase().includes(q);
        const matchDept = b.department.toLowerCase().includes(q);
        if (!matchTitle && !matchBrief && !matchDept) return false;
      }
      return true;
    });
  }, [bounties, selectedCategory, selectedStatus, searchQuery]);

  return (
    <div className="min-h-screen">
      <main className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-10">
        {/* 1. Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-2 py-0.5 bg-[#0057FF] text-white text-[10px] font-black uppercase tracking-wider mb-2 rounded-none">
              AGENSI INOVASI // HUB
            </div>
            <h1 className="text-xl sm:text-3xl font-extrabold uppercase italic tracking-tight text-white">
              SAYEMBARA INTERNAL
            </h1>
            <p className="text-xs sm:text-sm text-[#8B95A5] mt-1 font-normal leading-relaxed">
              Kirimkan solusi, otomasi, atau template kerja untuk efisiensi operasional agensi.
            </p>
          </div>

          {role === 'admin' && (
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-[#0057FF] text-white text-xs font-black uppercase tracking-wider hover:bg-blue-600 transition-colors border border-white/20 rounded-none shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span>+ BUAT SAYEMBARA BARU</span>
            </button>
          )}
        </div>

        {/* 2. Quick Stats: 4 Flat Obsidian Cards (2x2 on mobile, 4 columns on desktop) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4 mb-6 sm:mb-8">
          <div className="p-3 sm:p-4 bg-[#0B0F17] border border-[#232D3F] border-r-4 border-r-[#0057FF] rounded-none">
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#8B95A5] block truncate">
              HADIAH AKTIF
            </span>
            <div className="text-base sm:text-xl lg:text-2xl font-black tracking-tight text-white mt-1 truncate">
              Rp 9.750.000
            </div>
          </div>

          <div className="p-3 sm:p-4 bg-[#0B0F17] border border-[#232D3F] border-r-4 border-r-[#0057FF] rounded-none">
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#8B95A5] block truncate">
              SAYEMBARA BUKA
            </span>
            <div className="text-base sm:text-xl lg:text-2xl font-black tracking-tight text-white mt-1">
              {activeBountiesCount}
            </div>
          </div>

          <div className="p-3 sm:p-4 bg-[#0B0F17] border border-[#232D3F] border-r-4 border-r-[#0057FF] rounded-none">
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#8B95A5] block truncate">
              KARYA MASUK
            </span>
            <div className="text-base sm:text-xl lg:text-2xl font-black tracking-tight text-white mt-1">
              {totalSubmissionsCount}
            </div>
          </div>

          <div className="p-3 sm:p-4 bg-[#0B0F17] border border-[#232D3F] border-r-4 border-r-[#0057FF] rounded-none">
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#8B95A5] block truncate">
              ASET TERADOPSI
            </span>
            <div className="text-base sm:text-xl lg:text-2xl font-black tracking-tight text-white mt-1">
              {adoptedAssetsCount}
            </div>
          </div>
        </div>

        {/* 3. Search & Filter Bar */}
        <CategoryFilter
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          selectedStatus={selectedStatus}
          onSelectStatus={setSelectedStatus}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          categoryCounts={categoryCounts}
        />

        {/* 4. Bounty Grid (1 column on mobile, 2 on tablet, 3 on desktop) */}
        {filteredBounties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-5">
            {filteredBounties.map((bounty) => (
              <BountyCard key={bounty.id} bounty={bounty} />
            ))}
          </div>
        ) : (
          <div className="py-16 text-center bg-[#0B0F17] border border-[#232D3F] p-8 rounded-none">
            <Inbox className="w-10 h-10 text-[#8B95A5] mx-auto mb-3" />
            <h3 className="text-base font-extrabold uppercase italic text-white">
              TIDAK ADA SAYEMBARA YANG COCOK
            </h3>
            <p className="text-xs text-[#8B95A5] mt-1 max-w-sm mx-auto">
              Coba sesuaikan kata kunci pencarian atau ubah filter kategori di atas.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('Semua Kategori');
                setSelectedStatus('Semua Status');
                setSearchQuery('');
              }}
              className="mt-4 px-3.5 py-2 bg-[#0F1521] border border-[#232D3F] hover:border-[#0057FF] text-xs font-bold uppercase text-white transition-colors rounded-none"
            >
              Reset Filter
            </button>
          </div>
        )}
      </main>

      {/* Admin Create Modal */}
      <CreateBountyModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </div>
  );
}
