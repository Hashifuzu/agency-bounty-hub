'use client';

import React from 'react';
import Link from 'next/link';
import { Bounty } from '@/types';
import { Clock, ArrowRight } from 'lucide-react';

interface Props {
  bounty: Bounty;
}

export default function BountyCard({ bounty }: Props) {
  const [deadlineText, setDeadlineText] = React.useState<string>('Memuat...');
  const [isUrgent, setIsUrgent] = React.useState<boolean>(false);

  React.useEffect(() => {
    const diff = new Date(bounty.deadline).getTime() - Date.now();
    if (diff <= 0) {
      setDeadlineText('Ditutup');
      return;
    }
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    const text = days === 1 ? 'Hari terakhir' : `${days} hari lagi`;
    setDeadlineText(text);
    setIsUrgent(days <= 2);
  }, [bounty.deadline]);

  return (
    <Link
      href={`/bounty/${bounty.id}`}
      className="group relative flex flex-col justify-between p-5 bg-[#0B0F17] border border-[#232D3F] border-b-4 border-b-[#0057FF] hover:border-[#0057FF] transition-all rounded-none"
    >
      <div>
        {/* Top Badges Row */}
        <div className="flex items-center justify-between gap-2 mb-3">
          {/* Category Box solid #0057FF with bold white text */}
          <span className="px-2 py-0.5 bg-[#0057FF] text-white text-[11px] font-extrabold uppercase tracking-wider rounded-none">
            {bounty.category}
          </span>

          {/* Status Badge solid contrast */}
          <div>
            {bounty.status === 'Open' ? (
              <span className="inline-flex items-center px-2 py-0.5 text-[10px] font-black uppercase tracking-wider bg-[#0057FF] text-white rounded-none">
                OPEN
              </span>
            ) : bounty.status === 'In Review' ? (
              <span className="inline-flex items-center px-2 py-0.5 text-[10px] font-black uppercase tracking-wider bg-[#D97706] text-white rounded-none">
                IN REVIEW
              </span>
            ) : (
              <span className="inline-flex items-center px-2 py-0.5 text-[10px] font-black uppercase tracking-wider bg-[#334155] text-white rounded-none">
                CLOSED
              </span>
            )}
          </div>
        </div>

        {/* Title: Sans-Serif font-extrabold uppercase italic tracking-tight */}
        <h3 className="font-extrabold text-base uppercase italic tracking-tight text-white group-hover:text-[#0057FF] transition-colors leading-snug line-clamp-1 mb-1.5">
          {bounty.title}
        </h3>

        {/* Description: Normal text, readable, slate gray #8B95A5 */}
        <p className="text-xs text-[#8B95A5] line-clamp-2 leading-relaxed">
          {bounty.brief}
        </p>
      </div>

      {/* Bottom Row: Nominal Hadiah & Sisa Waktu */}
      <div className="mt-5 pt-3.5 border-t border-[#232D3F] flex items-center justify-between">
        <div>
          <span className="text-[10px] uppercase font-bold text-[#8B95A5] block tracking-wider">
            TOTAL HADIAH
          </span>
          <div className="text-base font-black text-white tracking-tight">
            {bounty.rewardCash}
          </div>
        </div>

        <div className="text-right">
          <span className="text-[10px] uppercase font-bold text-[#8B95A5] block tracking-wider">
            BATAS WAKTU
          </span>
          <span className={`inline-flex items-center gap-1 text-xs font-bold ${
            isUrgent && bounty.status === 'Open'
              ? 'text-rose-400 font-extrabold'
              : 'text-[#8B95A5]'
          }`}>
            <Clock className="w-3 h-3 text-[#0057FF]" />
            {bounty.status === 'Closed' ? 'Selesai' : deadlineText}
          </span>
        </div>
      </div>
    </Link>
  );
}
