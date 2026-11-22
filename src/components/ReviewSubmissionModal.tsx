'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Submission, SubmissionStatus } from '@/types';
import { fireCelebrationConfetti } from './ConfettiEffect';
import { 
  X, 
  CheckCircle, 
  AlertTriangle, 
  Clock, 
  Trophy, 
  ExternalLink, 
  MessageSquare
} from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  submission: Submission | null;
}

export default function ReviewSubmissionModal({ isOpen, onClose, submission }: Props) {
  const { reviewSubmission, declareWinner } = useApp();

  const [status, setStatus] = useState<SubmissionStatus>(submission?.status || 'Pending');
  const [feedback, setFeedback] = useState(submission?.feedback || '');
  const [reviewerName, setReviewerName] = useState('Manajemen Agensi');

  React.useEffect(() => {
    if (submission) {
      setStatus(submission.status);
      setFeedback(submission.feedback || '');
    }
  }, [submission]);

  if (!isOpen || !submission) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    if (status === 'Winner') {
      declareWinner(
        submission.id,
        feedback || 'Karya ini dinobatkan sebagai Pemenang Utama Sayembara Inovasi Agensi!',
        reviewerName
      );
      fireCelebrationConfetti();
    } else {
      reviewSubmission(
        submission.id,
        status,
        feedback || 'Status karya telah ditinjau oleh tim kurasi.',
        reviewerName
      );
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-xs animate-in fade-in">
      <div className="relative w-full max-w-2xl max-h-[92dvh] overflow-y-auto rounded-none bg-[#0B0F17] border border-[#232D3F] border-b-4 border-b-[#0057FF] p-4 sm:p-6 text-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between pb-3.5 border-b border-[#232D3F]">
          <div>
            <div className="inline-block bg-[#0057FF] text-white text-[10px] font-extrabold uppercase px-1.5 py-0.5 mb-1 tracking-wider">
              PANEL PENJURIAN
            </div>
            <h3 className="text-sm sm:text-base font-extrabold uppercase italic tracking-tight text-white">
              REVIEW & EVALUASI KARYA
            </h3>
            <p className="text-[11px] sm:text-xs text-[#8B95A5] mt-0.5 line-clamp-1">
              {submission.title}
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

        {/* Content Body */}
        <div className="mt-4 sm:mt-5 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 text-xs sm:text-sm">
          {/* Left Column: Details */}
          <div className="space-y-3">
            <div className="relative w-full h-32 sm:h-36 rounded-none overflow-hidden border border-[#232D3F] bg-[#0F1521]">
              <img
                src={submission.previewUrl}
                alt={submission.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex items-center gap-2.5 p-2.5 rounded-none bg-[#0F1521] border border-[#232D3F]">
              <img
                src={submission.authorAvatar}
                alt={submission.authorName}
                className="w-8 h-8 rounded-none object-cover border border-[#232D3F] shrink-0"
              />
              <div className="min-w-0">
                <h4 className="text-xs font-bold text-white uppercase tracking-tight truncate">
                  {submission.authorName}
                </h4>
                <p className="text-[11px] text-[#8B95A5] truncate">
                  {submission.authorRole} • {submission.authorDepartment}
                </p>
              </div>
            </div>

            <div className="p-3 rounded-none bg-[#0F1521] border border-[#232D3F]">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#0057FF] block mb-1">
                Dampak untuk Agensi:
              </span>
              <p className="text-xs text-[#8B95A5] leading-relaxed">
                {submission.impactDescription}
              </p>
            </div>

            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#8B95A5] block mb-1.5">
                Lampiran Aset:
              </span>
              <div className="space-y-1">
                {submission.assetLinks.map((link, idx) => (
                  <a
                    key={idx}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between px-2.5 py-2 rounded-none bg-[#0F1521] border border-[#232D3F] text-xs text-white hover:border-[#0057FF] transition-colors"
                  >
                    <span className="truncate mr-2">{link.label || 'Buka Link Aset'}</span>
                    <ExternalLink className="w-3.5 h-3.5 text-[#0057FF] shrink-0" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Review Controls */}
          <form onSubmit={handleSave} className="space-y-4 flex flex-col justify-between">
            <div className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold uppercase tracking-tight text-white mb-1.5">
                  Tentukan Keputusan Status *
                </label>
                <div className="grid grid-cols-2 gap-1.5">
                  <button
                    type="button"
                    onClick={() => setStatus('Approved')}
                    className={`flex items-center justify-center sm:justify-start gap-1.5 p-2.5 sm:p-2 rounded-none text-xs font-bold uppercase border transition-colors ${
                      status === 'Approved'
                        ? 'bg-[#10B981] text-white border-[#10B981]'
                        : 'bg-[#0F1521] border-[#232D3F] text-[#8B95A5] hover:border-[#0057FF]'
                    }`}
                  >
                    <CheckCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>Approved</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setStatus('Perlu Revisi')}
                    className={`flex items-center justify-center sm:justify-start gap-1.5 p-2.5 sm:p-2 rounded-none text-xs font-bold uppercase border transition-colors ${
                      status === 'Perlu Revisi'
                        ? 'bg-[#D97706] text-white border-[#D97706]'
                        : 'bg-[#0F1521] border-[#232D3F] text-[#8B95A5] hover:border-[#0057FF]'
                    }`}
                  >
                    <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                    <span>Revisi</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setStatus('Pending')}
                    className={`flex items-center justify-center sm:justify-start gap-1.5 p-2.5 sm:p-2 rounded-none text-xs font-bold uppercase border transition-colors ${
                      status === 'Pending'
                        ? 'bg-[#334155] text-white border-[#334155]'
                        : 'bg-[#0F1521] border-[#232D3F] text-[#8B95A5] hover:border-[#0057FF]'
                    }`}
                  >
                    <Clock className="w-3.5 h-3.5 shrink-0" />
                    <span>Pending</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setStatus('Winner')}
                    className={`flex items-center justify-center sm:justify-start gap-1.5 p-2.5 sm:p-2 rounded-none text-xs font-bold uppercase border transition-colors ${
                      status === 'Winner'
                        ? 'bg-[#0057FF] text-white border-[#0057FF]'
                        : 'bg-[#0F1521] border-[#232D3F] text-amber-400 hover:border-[#0057FF]'
                    }`}
                  >
                    <Trophy className="w-3.5 h-3.5 shrink-0" />
                    <span>Juara 🏆</span>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-tight text-white mb-1 flex items-center gap-1">
                  <MessageSquare className="w-3.5 h-3.5 text-[#0057FF]" /> Catatan Feedback Evaluasi *
                </label>
                <textarea
                  rows={3}
                  required
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Berikan masukan spesifik, poin kelebihan, atau hal yang perlu diperbaiki..."
                  className="w-full px-3 py-2 rounded-none bg-[#0F1521] border border-[#232D3F] text-base sm:text-xs text-white placeholder:text-[#8B95A5]/60 focus:outline-none focus:border-[#0057FF]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-tight text-white mb-1">
                  Nama Penilai
                </label>
                <input
                  type="text"
                  value={reviewerName}
                  onChange={(e) => setReviewerName(e.target.value)}
                  className="w-full px-3 py-2 sm:py-1.5 rounded-none bg-[#0F1521] border border-[#232D3F] text-base sm:text-xs text-white focus:outline-none focus:border-[#0057FF]"
                />
              </div>
            </div>

            <div className="pt-3 border-t border-[#232D3F] flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-2 mt-4">
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
                {status === 'Winner' ? 'Tetapkan Sebagai Pemenang' : 'Simpan Keputusan'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
