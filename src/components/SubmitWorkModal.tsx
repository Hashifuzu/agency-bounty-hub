'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Bounty, AssetLink } from '@/types';
import { X, Plus, CheckCircle2 } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  bounty: Bounty;
}

const PRESET_PREVIEWS = [
  'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&auto=format&fit=crop&q=80',
];

export default function SubmitWorkModal({ isOpen, onClose, bounty }: Props) {
  const { addSubmission } = useApp();

  const [title, setTitle] = useState('');
  const [authorName, setAuthorName] = useState('Reza Pramana');
  const [authorRole, setAuthorRole] = useState('Creative Specialist');
  const [authorDepartment, setAuthorDepartment] = useState('Design & Production');
  const [impactDescription, setImpactDescription] = useState('');
  const [previewUrl, setPreviewUrl] = useState(PRESET_PREVIEWS[0]);
  const [tagsInput, setTagsInput] = useState('Template, Agensi, Efisiensi');
  
  const [links, setLinks] = useState<AssetLink[]>([
    { label: 'File Utama (Figma / Drive / GitHub)', url: '', type: 'drive' },
  ]);

  if (!isOpen) return null;

  const handleAddLink = () => {
    setLinks([...links, { label: 'Link Tambahan (Loom / Demo)', url: '', type: 'loom' }]);
  };

  const handleUpdateLink = (index: number, field: keyof AssetLink, value: string) => {
    const updated = [...links];
    updated[index] = { ...updated[index], [field]: value };
    setLinks(updated);
  };

  const handleRemoveLink = (index: number) => {
    if (links.length <= 1) return;
    setLinks(links.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !impactDescription.trim()) return;

    const validLinks = links.filter((l) => l.url.trim().length > 0);
    if (validLinks.length === 0) {
      validLinks.push({
        label: 'Aset Inovasi (Drive / Cloud)',
        url: 'https://drive.google.com/sample-agency-asset',
        type: 'drive',
      });
    }

    const tags = tagsInput
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    addSubmission({
      bountyId: bounty.id,
      bountyTitle: bounty.title,
      bountyCategory: bounty.category,
      authorId: 'emp-' + Math.floor(Math.random() * 100),
      authorName,
      authorAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      authorRole,
      authorDepartment,
      title,
      impactDescription,
      assetLinks: validLinks,
      previewUrl: previewUrl || PRESET_PREVIEWS[0],
      tags: tags.length > 0 ? tags : ['Inovasi', bounty.category],
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-xs animate-in fade-in">
      <div className="relative w-full max-w-xl max-h-[92dvh] overflow-y-auto rounded-none bg-[#0B0F17] border border-[#232D3F] border-b-4 border-b-[#0057FF] p-4 sm:p-6 text-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between pb-3.5 border-b border-[#232D3F]">
          <div>
            <div className="inline-block bg-[#0057FF] text-white text-[10px] font-extrabold uppercase px-1.5 py-0.5 mb-1 tracking-wider">
              KIRIM INOVASI
            </div>
            <h3 className="text-sm sm:text-base font-extrabold uppercase italic tracking-tight text-white">
              FORMULIR SUBMISSION KARYA
            </h3>
            <p className="text-[11px] sm:text-xs text-[#8B95A5] mt-0.5 line-clamp-1">
              Untuk: {bounty.title}
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Tutup modal"
            className="w-8 h-8 rounded-none border border-[#232D3F] bg-[#0F1521] flex items-center justify-center text-[#8B95A5] hover:text-white hover:border-[#0057FF] transition-colors shrink-0 ml-2"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-4 sm:mt-5 space-y-3.5 sm:space-y-4 text-xs sm:text-sm">
          {/* Work Title */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-tight text-white mb-1">
              Judul Inovasi / Nama Karya *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Contoh: AutoSlide v2: Script Otomasi Slides Agensi"
              className="w-full px-3 py-2 rounded-none bg-[#0F1521] border border-[#232D3F] text-base sm:text-xs text-white placeholder:text-[#8B95A5]/60 focus:outline-none focus:border-[#0057FF]"
            />
          </div>

          {/* Author Details */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold uppercase tracking-tight text-white mb-1">
                Nama Anda
              </label>
              <input
                type="text"
                required
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                className="w-full px-3 py-2 rounded-none bg-[#0F1521] border border-[#232D3F] text-base sm:text-xs text-white focus:outline-none focus:border-[#0057FF]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-tight text-white mb-1">
                Role / Jabatan
              </label>
              <input
                type="text"
                required
                value={authorRole}
                onChange={(e) => setAuthorRole(e.target.value)}
                className="w-full px-3 py-2 rounded-none bg-[#0F1521] border border-[#232D3F] text-base sm:text-xs text-white focus:outline-none focus:border-[#0057FF]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-tight text-white mb-1">
                Divisi
              </label>
              <input
                type="text"
                required
                value={authorDepartment}
                onChange={(e) => setAuthorDepartment(e.target.value)}
                className="w-full px-3 py-2 rounded-none bg-[#0F1521] border border-[#232D3F] text-base sm:text-xs text-white focus:outline-none focus:border-[#0057FF]"
              />
            </div>
          </div>

          {/* Impact Statement */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-tight text-white mb-1">
              Deskripsi Dampak untuk Agensi *
            </label>
            <textarea
              required
              rows={3}
              value={impactDescription}
              onChange={(e) => setImpactDescription(e.target.value)}
              placeholder="Jelaskan bagaimana inovasi ini menghemat jam kerja tim atau mempercepat project klien..."
              className="w-full px-3 py-2 rounded-none bg-[#0F1521] border border-[#232D3F] text-base sm:text-xs text-white placeholder:text-[#8B95A5]/60 focus:outline-none focus:border-[#0057FF]"
            />
          </div>

          {/* Asset & Demo Links */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold uppercase tracking-tight text-white">
                Link Asset / File / Demo *
              </label>
              <button
                type="button"
                onClick={handleAddLink}
                className="text-xs text-[#0057FF] hover:text-white flex items-center gap-1 font-bold uppercase py-1"
              >
                <Plus className="w-3.5 h-3.5" /> Tambah Link
              </button>
            </div>
            <div className="space-y-2">
              {links.map((link, idx) => (
                <div key={idx} className="flex gap-2 items-center">
                  <input
                    type="text"
                    value={link.label}
                    onChange={(e) => handleUpdateLink(idx, 'label', e.target.value)}
                    placeholder="Label (Figma, Repo)"
                    className="w-1/3 px-3 py-1.5 rounded-none bg-[#0F1521] border border-[#232D3F] text-base sm:text-xs text-white focus:outline-none focus:border-[#0057FF]"
                  />
                  <input
                    type="url"
                    value={link.url}
                    onChange={(e) => handleUpdateLink(idx, 'url', e.target.value)}
                    placeholder="https://..."
                    className="flex-1 px-3 py-1.5 rounded-none bg-[#0F1521] border border-[#232D3F] text-base sm:text-xs text-white focus:outline-none focus:border-[#0057FF]"
                  />
                  {links.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveLink(idx)}
                      className="text-[#8B95A5] hover:text-rose-500 text-xs p-2 font-bold shrink-0"
                    >
                      ✕
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Thumbnail / Preview Selector */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-tight text-white mb-1.5">
              Pilih Preview / Banner
            </label>
            <div className="flex items-center gap-2 overflow-x-auto pb-1 touch-pan-x scrollbar-none">
              {PRESET_PREVIEWS.map((img, i) => (
                <button
                  type="button"
                  key={i}
                  onClick={() => setPreviewUrl(img)}
                  className={`relative flex-shrink-0 w-16 h-11 rounded-none overflow-hidden border transition-all ${
                    previewUrl === img
                      ? 'border-[#0057FF] ring-2 ring-[#0057FF]'
                      : 'border-[#232D3F] opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="preview option" className="w-full h-full object-cover" />
                  {previewUrl === img && (
                    <div className="absolute inset-0 bg-[#0057FF]/40 flex items-center justify-center">
                      <CheckCircle2 className="w-4 h-4 text-white" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-tight text-white mb-1">
              Tag / Kata Kunci (Dipisah koma)
            </label>
            <input
              type="text"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              placeholder="Template, Motion, Figma, Automation"
              className="w-full px-3 py-2 rounded-none bg-[#0F1521] border border-[#232D3F] text-base sm:text-xs text-white focus:outline-none focus:border-[#0057FF]"
            />
          </div>

          {/* Submit Actions */}
          <div className="pt-3 border-t border-[#232D3F] flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto px-4 py-2.5 sm:py-2 rounded-none text-xs font-bold uppercase text-[#8B95A5] hover:text-white bg-[#0F1521] border border-[#232D3F] text-center"
            >
              Batal
            </button>
            <button
              type="submit"
              className="w-full sm:w-auto px-4 py-2.5 sm:py-2 rounded-none text-xs font-bold uppercase bg-[#0057FF] hover:bg-blue-600 text-white transition-colors text-center"
            >
              Kirim Karya
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
