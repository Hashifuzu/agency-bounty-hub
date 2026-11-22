'use client';

import React, { useState, use } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { Submission, BountyStatus } from '@/types';
import SubmitWorkModal from '@/components/SubmitWorkModal';
import ReviewSubmissionModal from '@/components/ReviewSubmissionModal';
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  Users, 
  FileText, 
  ExternalLink, 
  Send, 
  Award, 
  MessageSquare, 
  ShieldCheck
} from 'lucide-react';

interface PageProps {
  params: Promise<{ id: string }>;
}

function formatDate(dateStr: string) {
  if (!dateStr) return '';
  const parts = dateStr.split('T')[0].split('-');
  if (parts.length < 3) return dateStr;
  const [year, month, day] = parts;
  const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
  return `${parseInt(day, 10)} ${months[parseInt(month, 10) - 1] || ''} ${year}`;
}

export default function BountyDetailPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const { id } = resolvedParams;
  const { bounties, submissions, role, updateBountyStatus } = useApp();

  const [activeTab, setActiveTab] = useState<'brief' | 'submissions'>('brief');
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [selectedSubmissionForReview, setSelectedSubmissionForReview] = useState<Submission | null>(null);

  const bounty = bounties.find((b) => b.id === id);

  if (!bounty) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h2 className="text-xl font-extrabold uppercase italic text-white">
          SAYEMBARA TIDAK DITEMUKAN
        </h2>
        <p className="mt-1 text-sm text-[#8B95A5]">
          ID sayembara &ldquo;{id}&rdquo; mungkin telah dihapus atau URL tidak valid.
        </p>
        <Link
          href="/"
          className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 bg-[#0057FF] text-white text-xs font-bold uppercase rounded-none"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> KEMBALI KE SAYEMBARA
        </Link>
      </div>
    );
  }

  const bountySubmissions = submissions.filter((s) => s.bountyId === bounty.id);
  const winnerSubmission = bountySubmissions.find((s) => s.status === 'Winner');
  const deadlineDate = formatDate(bounty.deadline);

  return (
    <div className="min-h-screen max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-10 pb-24 lg:pb-10">
      {/* Back button */}
      <div className="mb-4 sm:mb-6 flex items-center justify-between gap-2">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#8B95A5] hover:text-white transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">KEMBALI KE DAFTAR SAYEMBARA</span>
          <span className="sm:hidden">KEMBALI</span>
        </Link>

        {/* Status Badge */}
        <div>
          {bounty.status === 'Open' ? (
            <span className="px-2 sm:px-2.5 py-1 text-[11px] sm:text-xs font-black uppercase tracking-wider bg-[#0057FF] text-white rounded-none">
              STATUS: OPEN
            </span>
          ) : bounty.status === 'In Review' ? (
            <span className="px-2 sm:px-2.5 py-1 text-[11px] sm:text-xs font-black uppercase tracking-wider bg-[#D97706] text-white rounded-none">
              STATUS: IN REVIEW
            </span>
          ) : (
            <span className="px-2 sm:px-2.5 py-1 text-[11px] sm:text-xs font-black uppercase tracking-wider bg-[#334155] text-white rounded-none">
              STATUS: CLOSED
            </span>
          )}
        </div>
      </div>

      {/* Main Header Card (High-Contrast Cobalt & Obsidian) */}
      <div className="bg-[#0E1420]/85 backdrop-blur-sm border border-[#1E293B] border-b-4 border-b-[#0057FF] p-6 sm:p-8 mb-8 rounded-none">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="flex items-center gap-2 flex-wrap text-xs">
              <span className="px-2.5 py-0.5 bg-[#0057FF] text-white font-extrabold uppercase tracking-wider rounded-none">
                {bounty.category}
              </span>
              <span className="text-[#8B95A5] font-bold uppercase">
                DIVISI: {bounty.department}
              </span>
              <span className="text-[#8B95A5]">
                • DIPUBLIKASIKAN {formatDate(bounty.createdAt)}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold uppercase italic tracking-tight text-white leading-snug">
              {bounty.title}
            </h1>

            <p className="text-sm text-[#8B95A5] leading-relaxed font-normal">
              {bounty.brief}
            </p>
          </div>

          {/* Reward & Action Box */}
          <div className="lg:w-80 flex-shrink-0 flex flex-col justify-between p-5 bg-[#0A0F1A] border border-[#1E293B] rounded-none">
            <div className="space-y-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#8B95A5] block">
                  TOTAL HADIAH
                </span>
                <div className="text-2xl font-black tracking-tight text-white mt-0.5">
                  {bounty.rewardCash}
                </div>
                <span className="inline-block mt-1 px-2 py-0.5 bg-[#0C1C3D] border border-[#0057FF] text-white text-[11px] font-bold">
                  +{bounty.rewardPoints} POIN INOVASI
                </span>
              </div>

              <div className="pt-3 border-t border-[#1E293B] space-y-1.5 text-xs text-[#8B95A5]">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 font-bold uppercase text-[10px]">
                    <Calendar className="w-3.5 h-3.5 text-[#0057FF]" /> DEADLINE:
                  </span>
                  <strong className="text-white">{deadlineDate}</strong>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 font-bold uppercase text-[10px]">
                    <Users className="w-3.5 h-3.5 text-[#0057FF]" /> KARYA MASUK:
                  </span>
                  <strong className="text-white">{bountySubmissions.length} karya</strong>
                </div>
              </div>
            </div>

            {/* Action CTA */}
            <div className="mt-5">
              {bounty.status === 'Open' ? (
                <button
                  onClick={() => setIsSubmitModalOpen(true)}
                  className="w-full flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-black uppercase tracking-wider bg-[#0057FF] hover:bg-blue-600 text-white transition-colors rounded-none shadow-xs"
                >
                  <Send className="w-3.5 h-3.5" />
                  KIRIM KARYA
                </button>
              ) : (
                <div className="p-2.5 text-center bg-[#060A13] border border-[#1E293B] text-xs font-bold uppercase text-[#8B95A5] rounded-none">
                  PENERIMAAN KARYA DITUTUP
                </div>
              )}

              {/* Admin status switcher */}
              {role === 'admin' && (
                <div className="mt-3 pt-3 border-t border-[#1E293B]">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-[#8B95A5] mb-1.5">
                    MANAJEMEN STATUS:
                  </div>
                  <div className="grid grid-cols-3 gap-1">
                    {(['Open', 'In Review', 'Closed'] as BountyStatus[]).map((st) => (
                      <button
                        key={st}
                        onClick={() => updateBountyStatus(bounty.id, st)}
                        className={`px-2 py-1 text-[10px] font-extrabold uppercase rounded-none transition-colors border ${
                          bounty.status === st
                            ? 'bg-[#0057FF] text-white border-[#0057FF]'
                            : 'bg-[#0A0F1A] text-[#8B95A5] border-[#1E293B] hover:text-white'
                        }`}
                      >
                        {st}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Winner Banner if exists */}
      {winnerSubmission && (
        <div className="mb-8 p-5 bg-[#0C1C3D] border-2 border-[#0057FF] rounded-none flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#0057FF] text-white flex items-center justify-center flex-shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-[#0057FF] bg-white px-2 py-0.5 inline-block mb-1">
                KARYA PEMENANG RESMI
              </span>
              <h3 className="text-base font-extrabold uppercase italic text-white">
                {winnerSubmission.title}
              </h3>
              <p className="text-xs text-[#8B95A5]">
                Oleh <strong className="text-white">{winnerSubmission.authorName}</strong> ({winnerSubmission.authorRole})
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {winnerSubmission.assetLinks[0] && (
              <a
                href={winnerSubmission.assetLinks[0].url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold uppercase bg-[#0057FF] text-white hover:bg-blue-600 rounded-none transition-colors"
              >
                <span>BUKA ASET</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
            <Link
              href="/hall-of-fame"
              className="px-3 py-1.5 text-xs font-bold uppercase bg-[#0B0F17] border border-[#232D3F] text-white hover:border-[#0057FF] rounded-none"
            >
              ARSIP LENGKAP
            </Link>
          </div>
        </div>
      )}

      {/* Tabs (Full-width 2-column grid on mobile, flex on desktop) */}
      <div className="grid grid-cols-2 sm:flex items-center gap-1 sm:gap-2 border-b border-[#232D3F] mb-6">
        <button
          onClick={() => setActiveTab('brief')}
          className={`flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2.5 text-xs font-extrabold uppercase tracking-wider transition-colors border-b-2 rounded-none text-center ${
            activeTab === 'brief'
              ? 'border-[#0057FF] text-white bg-[#0C1C3D]'
              : 'border-transparent text-[#8B95A5] hover:text-white'
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          <span className="truncate">BRIEF & PENILAIAN</span>
        </button>

        <button
          onClick={() => setActiveTab('submissions')}
          className={`flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2.5 text-xs font-extrabold uppercase tracking-wider transition-colors border-b-2 rounded-none text-center ${
            activeTab === 'submissions'
              ? 'border-[#0057FF] text-white bg-[#0C1C3D]'
              : 'border-transparent text-[#8B95A5] hover:text-white'
          }`}
        >
          <Users className="w-3.5 h-3.5" />
          <span className="truncate">KARYA ({bountySubmissions.length})</span>
        </button>
      </div>

      {/* Tab 1: Brief & Assessment Criteria */}
      {activeTab === 'brief' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Objectives */}
            <div className="p-6 bg-[#0E1420]/85 backdrop-blur-sm border border-[#1E293B] rounded-none">
              <h3 className="text-sm font-extrabold uppercase italic tracking-tight text-white mb-3 flex items-center gap-2">
                <span className="w-2 h-2 bg-[#0057FF]" />
                TUJUAN & EKSPEKTASI SOLUSI
              </h3>
              <ul className="space-y-2">
                {bounty.objectives.map((obj, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#8B95A5]">
                    <CheckCircle2 className="w-4 h-4 text-[#0057FF] flex-shrink-0 mt-0.5" />
                    <span>{obj}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Assessment Criteria Matrix */}
            <div className="p-6 bg-[#0E1420]/85 backdrop-blur-sm border border-[#1E293B] rounded-none">
              <h3 className="text-sm font-extrabold uppercase italic tracking-tight text-white mb-3 flex items-center gap-2">
                <span className="w-2 h-2 bg-[#0057FF]" />
                KRITERIA PENILAIAN
              </h3>
              <div className="space-y-3">
                {bounty.criteria.map((item, i) => (
                  <div
                    key={i}
                    className="p-3.5 bg-[#0A0F1A] border border-[#1E293B] rounded-none"
                  >
                    <div className="flex items-center justify-between mb-1 text-xs">
                      <span className="font-bold uppercase text-white">
                        {item.name}
                      </span>
                      <span className="px-2 py-0.5 bg-[#0C1C3D] border border-[#0057FF] text-white font-extrabold text-[10px]">
                        BOBOT {item.weight}%
                      </span>
                    </div>
                    <p className="text-xs text-[#8B95A5]">
                      {item.desc}
                    </p>
                    <div className="w-full h-1.5 bg-[#060A13] mt-2">
                      <div
                        className="h-full bg-[#0057FF]"
                        style={{ width: `${item.weight}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Deliverables & References */}
          <div className="space-y-6">
            <div className="p-5 bg-[#0E1420]/85 backdrop-blur-sm border border-[#1E293B] rounded-none">
              <h3 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
                OUTPUT YANG DIHARAPKAN
              </h3>
              <div className="space-y-2">
                {bounty.deliverables.map((del, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-2 p-2.5 bg-[#0A0F1A] border border-[#1E293B] text-xs text-[#8B95A5] font-medium rounded-none"
                  >
                    <span className="w-4 h-4 bg-[#0057FF] text-white flex items-center justify-center text-[10px] font-bold flex-shrink-0">
                      {i + 1}
                    </span>
                    <span>{del}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-5 bg-[#0E1420]/85 backdrop-blur-sm border border-[#1E293B] rounded-none">
              <h3 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
                REFERENSI PENDUKUNG
              </h3>
              <div className="space-y-1.5">
                {bounty.references.map((ref, i) => (
                  <a
                    key={i}
                    href={ref.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-2.5 bg-[#0F1521] hover:border-[#0057FF] border border-[#232D3F] text-xs font-bold uppercase text-[#8B95A5] hover:text-white transition-colors rounded-none"
                  >
                    <span className="truncate">{ref.title}</span>
                    <ExternalLink className="w-3.5 h-3.5 text-[#0057FF] ml-2" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Submissions Gallery */}
      {activeTab === 'submissions' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-base font-extrabold uppercase italic text-white">
                DAFTAR KARYA YANG DIAJUKAN ({bountySubmissions.length})
              </h3>
              <p className="text-xs text-[#8B95A5]">
                {role === 'admin'
                  ? 'Sebagai Admin, Anda dapat meninjau, memberi catatan evaluasi, dan memilih pemenang.'
                  : 'Lihat ragam solusi inovasi yang diajukan oleh tim internal agensi.'}
              </p>
            </div>

            {bounty.status === 'Open' && (
              <button
                onClick={() => setIsSubmitModalOpen(true)}
                className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold uppercase bg-[#0057FF] text-white hover:bg-blue-600 transition-colors rounded-none shadow-xs"
              >
                <Send className="w-3.5 h-3.5" />
                SUBMIT KARYA ANDA
              </button>
            )}
          </div>

          {bountySubmissions.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {bountySubmissions.map((sub) => (
                <div
                  key={sub.id}
                  className={`p-5 bg-[#0B0F17] border flex flex-col justify-between transition-all rounded-none ${
                    sub.status === 'Winner'
                      ? 'border-2 border-[#0057FF] bg-[#0C1C3D]'
                      : 'border-[#232D3F]'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        {sub.status === 'Winner' ? (
                          <span className="px-2 py-0.5 text-[10px] font-black uppercase bg-[#0057FF] text-white rounded-none">
                            PEMENANG UTAMA
                          </span>
                        ) : sub.status === 'Approved' ? (
                          <span className="px-2 py-0.5 text-[10px] font-black uppercase bg-[#0C1C3D] border border-[#0057FF] text-white rounded-none">
                            APPROVED
                          </span>
                        ) : sub.status === 'Perlu Revisi' ? (
                          <span className="px-2 py-0.5 text-[10px] font-black uppercase bg-[#D97706] text-white rounded-none">
                            PERLU REVISI
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 text-[10px] font-black uppercase bg-[#334155] text-white rounded-none">
                            MENUNGGU REVIEW
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] text-[#8B95A5]">
                        {formatDate(sub.submittedAt)}
                      </span>
                    </div>

                    <h4 className="text-sm font-extrabold uppercase italic text-white mb-1">
                      {sub.title}
                    </h4>

                    <div className="flex items-center gap-2 mb-3 text-xs text-[#8B95A5]">
                      <img
                        src={sub.authorAvatar}
                        alt={sub.authorName}
                        className="w-5 h-5 rounded-none object-cover border border-[#232D3F]"
                      />
                      <span>
                        <strong className="text-white">{sub.authorName}</strong> • {sub.authorRole}
                      </span>
                    </div>

                    <p className="text-xs text-[#8B95A5] mb-3 leading-relaxed">
                      {sub.impactDescription}
                    </p>

                    <div className="space-y-1.5 mb-3">
                      {sub.assetLinks.map((link, idx) => (
                        <a
                          key={idx}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between px-3 py-1.5 bg-[#0F1521] border border-[#232D3F] text-xs font-bold uppercase text-[#8B95A5] hover:text-white hover:border-[#0057FF] transition-colors rounded-none"
                        >
                          <span className="truncate">{link.label}</span>
                          <ExternalLink className="w-3 h-3 text-[#0057FF]" />
                        </a>
                      ))}
                    </div>

                    {sub.feedback && (
                      <div className="p-3 bg-[#0F1521] border border-[#232D3F] text-xs mb-3 rounded-none">
                        <div className="flex items-center gap-1 font-bold text-white mb-1">
                          <MessageSquare className="w-3 h-3 text-[#0057FF]" />
                          <span>CATATAN REVIEWER ({sub.reviewedBy}):</span>
                        </div>
                        <p className="text-[#8B95A5] italic">
                          &ldquo;{sub.feedback}&rdquo;
                        </p>
                      </div>
                    )}
                  </div>

                  {role === 'admin' && (
                    <div className="pt-3 border-t border-[#232D3F]">
                      <button
                        onClick={() => setSelectedSubmissionForReview(sub)}
                        className="w-full flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-bold uppercase bg-[#0057FF] hover:bg-blue-600 text-white transition-colors rounded-none"
                      >
                        <ShieldCheck className="w-3.5 h-3.5" />
                        TINJAU & BERI NILAI
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center bg-[#0B0F17] border border-[#232D3F] text-xs text-[#8B95A5] rounded-none">
              Belum ada karya yang masuk untuk sayembara ini.
            </div>
          )}
        </div>
      )}

      {/* Mobile Sticky Action Bar */}
      {bounty.status === 'Open' && (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-[#0B0F17]/95 backdrop-blur-md border-t-2 border-[#0057FF] p-3 px-4 flex items-center justify-between shadow-2xl">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#8B95A5] block">
              TOTAL HADIAH
            </span>
            <div className="text-sm font-black text-white">
              {bounty.rewardCash}
            </div>
          </div>
          <button
            onClick={() => setIsSubmitModalOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2.5 text-xs font-black uppercase tracking-wider bg-[#0057FF] hover:bg-blue-600 text-white rounded-none shadow-md active:bg-blue-700 transition-colors"
          >
            <Send className="w-3.5 h-3.5" />
            <span>KIRIM KARYA</span>
          </button>
        </div>
      )}

      {/* Modals */}
      <SubmitWorkModal
        isOpen={isSubmitModalOpen}
        onClose={() => setIsSubmitModalOpen(false)}
        bounty={bounty}
      />

      <ReviewSubmissionModal
        isOpen={Boolean(selectedSubmissionForReview)}
        onClose={() => setSelectedSubmissionForReview(null)}
        submission={selectedSubmissionForReview}
      />
    </div>
  );
}
