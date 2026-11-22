'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Category, Bounty } from '@/types';
import { X, CheckCircle2 } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const CATEGORIES: Category[] = [
  'Desain & Template',
  'Video & Motion',
  'Tech & Automation',
  'SOP & Workflow',
  'Pitch & Strategi',
];

export default function CreateBountyModal({ isOpen, onClose }: Props) {
  const { addBounty } = useApp();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<Category>('Tech & Automation');
  const [rewardCash, setRewardCash] = useState('Rp 2.000.000');
  const [rewardPoints, setRewardPoints] = useState(250);
  const [department, setDepartment] = useState('Creative Tech & Ops');
  const [deadline, setDeadline] = useState('2026-12-25');
  const [brief, setBrief] = useState('');
  const [deliverableInput, setDeliverableInput] = useState('');
  const [deliverables, setDeliverables] = useState<string[]>([
    'File source / template siap pakai',
    'Panduan dokumentasi singkat 1 lembar',
  ]);

  if (!isOpen) return null;

  const handleAddDeliverable = () => {
    if (!deliverableInput.trim()) return;
    setDeliverables([...deliverables, deliverableInput.trim()]);
    setDeliverableInput('');
  };

  const handleRemoveDeliverable = (index: number) => {
    setDeliverables(deliverables.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !brief.trim()) return;

    const slug = title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-');

    const newBountyData: Omit<Bounty, 'id' | 'createdAt' | 'submissionsCount'> = {
      title,
      slug,
      category,
      rewardCash: rewardCash.startsWith('Rp') ? rewardCash : `Rp ${rewardCash}`,
      rewardPoints: Number(rewardPoints) || 100,
      deadline: new Date(deadline).toISOString(),
      status: 'Open',
      department,
      brief,
      objectives: [
        'Meningkatkan efisiensi kerja tim agensi',
        'Menjadi aset standar internal yang reusable',
      ],
      deliverables: deliverables.length > 0 ? deliverables : ['Aset final siap pakai'],
      criteria: [
        { name: 'Kualitas & Fungsionalitas', weight: 40, desc: 'Karya siap diaplikasikan langsung ke alur kerja agensi' },
        { name: 'Dampak & Efisiensi', weight: 35, desc: 'Menghemat waktu atau menaikkan standar output tim' },
        { name: 'Kerapian & Dokumentasi', weight: 25, desc: 'File rapi, naming convention teratur dan panduan jelas' },
      ],
      references: [
        { title: 'Panduan Standar Desain Agensi', url: 'https://figma.com/agency-standards', type: 'figma' },
      ],
      featured: false,
    };

    addBounty(newBountyData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-in fade-in">
      <div className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-none bg-[#0B0F17] border border-[#232D3F] border-b-4 border-b-[#0057FF] p-6 text-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between pb-3.5 border-b border-[#232D3F]">
          <div>
            <div className="inline-block bg-[#0057FF] text-white text-[10px] font-extrabold uppercase px-1.5 py-0.5 mb-1 tracking-wider">
              FORMULIR MANAJEMEN
            </div>
            <h3 className="text-base font-extrabold uppercase italic tracking-tight text-white">
              BUAT SAYEMBARA BARU
            </h3>
            <p className="text-xs text-[#8B95A5] mt-0.5">
              Buka tantangan inovasi untuk memecahkan bottleneck operasional agensi.
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-none border border-[#232D3F] bg-[#0F1521] flex items-center justify-center text-[#8B95A5] hover:text-white hover:border-[#0057FF] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-5 space-y-4 text-xs sm:text-sm">
          {/* Title */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-tight text-white mb-1">
              Judul Sayembara *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Contoh: Otomasi Export Carousel Instagram ke Form Klien"
              className="w-full px-3 py-2 rounded-none bg-[#0F1521] border border-[#232D3F] text-xs sm:text-sm text-white placeholder:text-[#8B95A5]/60 focus:outline-none focus:border-[#0057FF]"
            />
          </div>

          {/* Category & Department */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold uppercase tracking-tight text-white mb-1">
                Kategori *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as Category)}
                className="w-full px-3 py-2 rounded-none bg-[#0F1521] border border-[#232D3F] text-xs sm:text-sm text-white focus:outline-none focus:border-[#0057FF]"
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c} className="bg-[#0B0F17] text-white">
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-tight text-white mb-1">
                Divisi / Squad
              </label>
              <input
                type="text"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                placeholder="Misal: Creative & Production"
                className="w-full px-3 py-2 rounded-none bg-[#0F1521] border border-[#232D3F] text-xs sm:text-sm text-white placeholder:text-[#8B95A5]/60 focus:outline-none focus:border-[#0057FF]"
              />
            </div>
          </div>

          {/* Reward & Deadline */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold uppercase tracking-tight text-white mb-1">
                Hadiah Tunai *
              </label>
              <input
                type="text"
                required
                value={rewardCash}
                onChange={(e) => setRewardCash(e.target.value)}
                placeholder="Rp 2.000.000"
                className="w-full px-3 py-2 rounded-none bg-[#0F1521] border border-[#232D3F] text-xs sm:text-sm text-white placeholder:text-[#8B95A5]/60 focus:outline-none focus:border-[#0057FF]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-tight text-white mb-1">
                Poin Inovasi
              </label>
              <input
                type="number"
                value={rewardPoints}
                onChange={(e) => setRewardPoints(Number(e.target.value))}
                placeholder="250"
                className="w-full px-3 py-2 rounded-none bg-[#0F1521] border border-[#232D3F] text-xs sm:text-sm text-white placeholder:text-[#8B95A5]/60 focus:outline-none focus:border-[#0057FF]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-tight text-white mb-1">
                Deadline *
              </label>
              <input
                type="date"
                required
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className="w-full px-3 py-2 rounded-none bg-[#0F1521] border border-[#232D3F] text-xs sm:text-sm text-white focus:outline-none focus:border-[#0057FF]"
              />
            </div>
          </div>

          {/* Brief */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-tight text-white mb-1">
              Brief & Kebutuhan *
            </label>
            <textarea
              required
              rows={3}
              value={brief}
              onChange={(e) => setBrief(e.target.value)}
              placeholder="Jelaskan masalah yang dihadapi dan hasil yang diharapkan..."
              className="w-full px-3 py-2 rounded-none bg-[#0F1521] border border-[#232D3F] text-xs sm:text-sm text-white placeholder:text-[#8B95A5]/60 focus:outline-none focus:border-[#0057FF]"
            />
          </div>

          {/* Deliverables */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-tight text-white mb-1">
              Output yang Diharapkan
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={deliverableInput}
                onChange={(e) => setDeliverableInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddDeliverable();
                  }
                }}
                placeholder="Tambah output (misal: File .MOGRT, template Notion)"
                className="flex-1 px-3 py-1.5 rounded-none bg-[#0F1521] border border-[#232D3F] text-xs text-white placeholder:text-[#8B95A5]/60 focus:outline-none focus:border-[#0057FF]"
              />
              <button
                type="button"
                onClick={handleAddDeliverable}
                className="px-3 py-1.5 rounded-none bg-[#0F1521] border border-[#232D3F] hover:border-[#0057FF] text-xs font-bold uppercase text-white"
              >
                + Tambah
              </button>
            </div>
            <div className="space-y-1.5">
              {deliverables.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between px-3 py-1.5 rounded-none bg-[#0F1521] border border-[#232D3F] text-xs text-[#8B95A5]"
                >
                  <span className="flex items-center gap-2 text-white">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#0057FF]" />
                    {item}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleRemoveDeliverable(idx)}
                    className="text-[#8B95A5] hover:text-rose-500 font-bold"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="pt-3 border-t border-[#232D3F] flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-none text-xs font-bold uppercase text-[#8B95A5] hover:text-white bg-[#0F1521] border border-[#232D3F]"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-none text-xs font-bold uppercase bg-[#0057FF] hover:bg-blue-600 text-white transition-colors"
            >
              Publikasikan Sayembara
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
