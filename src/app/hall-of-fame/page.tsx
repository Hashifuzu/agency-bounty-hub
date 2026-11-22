'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { Submission } from '@/types';
import { 
  Award, 
  ExternalLink, 
  Search, 
  CheckCircle2, 
  FolderDown,
  Inbox
} from 'lucide-react';

export default function HallOfFamePage() {
  const { submissions, incrementDownload, showToast } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua Kategori');

  const hallOfFameItems = useMemo(() => {
    return submissions
      .filter((s) => s.status === 'Winner' || s.status === 'Approved')
      .filter((s) => {
        if (selectedCategory !== 'Semua Kategori' && s.bountyCategory !== selectedCategory) {
          return false;
        }
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchTitle = s.title.toLowerCase().includes(q);
          const matchAuthor = s.authorName.toLowerCase().includes(q);
          const matchImpact = s.impactDescription.toLowerCase().includes(q);
          const matchTags = s.tags.some((t) => t.toLowerCase().includes(q));
          if (!matchTitle && !matchAuthor && !matchImpact && !matchTags) return false;
        }
        return true;
      });
  }, [submissions, selectedCategory, searchQuery]);

  const handleUseAsset = (item: Submission, linkUrl: string) => {
    incrementDownload(item.id);
    showToast(`Membuka aset "${item.title}". Aset telah dicatat ke riwayat penggunaan!`, 'success');
    window.open(linkUrl, '_blank');
  };

  const categories = [
    'Semua Kategori',
    'Tech & Automation',
    'Video & Motion',
    'Desain & Template',
    'SOP & Workflow',
    'Pitch & Strategi',
  ];

  return (
    <div className="min-h-screen max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-10 pb-16">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <div className="inline-flex items-center gap-2 px-2 py-0.5 bg-[#0057FF] text-white text-[10px] font-black uppercase tracking-wider mb-2 rounded-none">
          PERPUSTAKAAN ASET INTERNAL
        </div>
        <h1 className="text-xl sm:text-3xl font-extrabold uppercase italic tracking-tight text-white">
          ARSIP KARYA & ASET AGENSI
        </h1>
        <p className="text-xs sm:text-sm text-[#8B95A5] mt-1 font-normal leading-relaxed">
          Koleksi template, script otomatisasi, dan SOP terverifikasi yang siap dipakai seluruh tim agensi.
        </p>
      </div>

      {/* Search & Filter Controls */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-6">
        {/* Search */}
        <div className="relative flex-1 sm:max-w-xs md:max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8B95A5]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari aset (Figma, Slide, Script)..."
            className="w-full pl-9 pr-3 py-2 text-base sm:text-xs md:text-sm bg-[#0F1521] border border-[#232D3F] text-white placeholder:text-[#8B95A5] focus:outline-none focus:border-[#0057FF] rounded-none"
          />
        </div>

        {/* Category Pills (Touch-pan-x) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none touch-pan-x -mx-1 px-1">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-2 sm:py-1.5 text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-colors rounded-none border shrink-0 ${
                  isSelected
                    ? 'bg-[#0C1C3D] border-2 border-[#0057FF] text-white'
                    : 'bg-[#0B0F17] border-[#232D3F] hover:border-[#0057FF] text-[#8B95A5] hover:text-white'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Asset Cards Grid */}
      {hallOfFameItems.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {hallOfFameItems.map((item) => (
            <div
              key={item.id}
              className="bg-[#0E1420]/85 backdrop-blur-sm border border-[#1E293B] border-b-4 border-b-[#0057FF] flex flex-col justify-between overflow-hidden hover:border-[#0057FF] transition-all rounded-none"
            >
              <div>
                {/* Preview Thumbnail */}
                <div className="relative w-full h-44 bg-[#0A0F1A] overflow-hidden">
                  <img
                    src={item.previewUrl}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Status Tag */}
                  <div className="absolute top-2.5 left-2.5">
                    {item.status === 'Winner' ? (
                      <span className="px-2 py-0.5 text-[10px] font-black uppercase tracking-wider bg-[#0057FF] text-white rounded-none">
                        PEMENANG SAYEMBARA
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 text-[10px] font-black uppercase tracking-wider bg-[#0C1C3D] border border-[#0057FF] text-white rounded-none">
                        APPROVED
                      </span>
                    )}
                  </div>

                  {/* Usage Counter */}
                  <div className="absolute top-2.5 right-2.5 px-2 py-0.5 bg-[#060A13] border border-[#1E293B] text-[10px] font-bold text-white flex items-center gap-1 rounded-none">
                    <FolderDown className="w-3 h-3 text-[#0057FF]" />
                    <span>{item.downloadsCount}X DIGUNAKAN</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 sm:p-5">
                  <span className="px-2 py-0.5 bg-[#0057FF] text-white text-[10px] font-extrabold uppercase tracking-wider inline-block mb-2 rounded-none">
                    {item.bountyCategory}
                  </span>

                  <h3 className="text-base font-extrabold uppercase italic tracking-tight text-white leading-snug line-clamp-1 mb-1.5">
                    {item.title}
                  </h3>

                  <div className="flex items-center gap-1.5 mb-3 text-xs text-[#8B95A5]">
                    <img
                      src={item.authorAvatar}
                      alt={item.authorName}
                      className="w-4 h-4 rounded-none object-cover border border-[#232D3F]"
                    />
                    <span>
                      Oleh <strong className="text-white font-bold">{item.authorName}</strong>
                    </span>
                  </div>

                  <p className="text-xs text-[#8B95A5] line-clamp-2 leading-relaxed mb-3">
                    {item.impactDescription}
                  </p>

                  {/* Tags */}
                  <div className="flex items-center gap-1 flex-wrap">
                    {item.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="text-[10px] px-1.5 py-0.5 bg-[#0F1521] border border-[#232D3F] text-[#8B95A5] font-bold uppercase rounded-none"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-4 sm:p-5 pt-0 space-y-2">
                {item.assetLinks.map((link, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleUseAsset(item, link.url)}
                    className="w-full flex items-center justify-between px-3 py-2 text-xs font-bold uppercase bg-[#0057FF] hover:bg-blue-600 text-white transition-colors rounded-none"
                  >
                    <span className="truncate">{link.label}</span>
                    <ExternalLink className="w-3 h-3 text-white ml-1.5 flex-shrink-0" />
                  </button>
                ))}

                <Link
                  href={`/bounty/${item.bountyId}`}
                  className="block text-center text-[11px] font-bold uppercase text-[#8B95A5] hover:text-white pt-1"
                >
                  LIHAT SAYEMBARA TERKAIT →
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-12 text-center bg-[#0B0F17] border border-[#232D3F] rounded-none">
          <Inbox className="w-8 h-8 text-[#8B95A5] mx-auto mb-2" />
          <h3 className="text-sm font-bold uppercase text-white">
            TIDAK ADA ASET DITEMUKAN
          </h3>
          <p className="text-xs text-[#8B95A5] mt-1">
            Silakan pilih kategori lain atau sesuaikan kata kunci pencarian.
          </p>
        </div>
      )}
    </div>
  );
}
