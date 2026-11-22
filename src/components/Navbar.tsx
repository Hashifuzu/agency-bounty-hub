'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { 
  Plus, 
  Menu, 
  X,
  Layers,
  ShieldCheck,
  UserCheck
} from 'lucide-react';
import CreateBountyModal from './CreateBountyModal';

export default function Navbar() {
  const pathname = usePathname();
  const { role, setRole } = useApp();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'SAYEMBARA', href: '/' },
    { name: 'ARSIP KARYA', href: '/hall-of-fame' },
    { name: 'LEADERBOARD', href: '/leaderboard' },
  ];

  return (
    <>
      {/* Top Navbar: Full-Width Solid #0057FF */}
      <header className="sticky top-0 z-40 w-full h-16 bg-[#0057FF] text-white shadow-md border-b-2 border-white/20">
        <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Left: Logo inside #060A13 box with thin white border + subtitle */}
          <div className="flex items-center gap-3 sm:gap-4">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="px-3 py-1.5 bg-[#060A13] border border-white text-white font-extrabold uppercase tracking-tight text-sm sm:text-base flex items-center gap-1.5 shadow-xs">
                <span className="w-2 h-2 bg-[#0057FF] inline-block" />
                <span>KREASIHUB</span>
              </div>
            </Link>
            <span className="hidden md:inline-block text-[11px] font-bold uppercase tracking-wider text-white/90 border-l border-white/30 pl-3">
              SISTEM SAYEMBARA & INOVASI AGENSI
            </span>
          </div>

          {/* Right Navigation & Tools */}
          <div className="hidden lg:flex items-center gap-2">
            {/* Desktop Navigation Links (Black #060A13 boxes with white borders) */}
            <nav className="flex items-center gap-1.5">
              {navLinks.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`px-3 py-1.5 text-xs font-extrabold uppercase tracking-wider transition-colors border ${
                      isActive
                        ? 'bg-white text-[#0057FF] border-white shadow-xs'
                        : 'bg-[#060A13] text-white border-white/80 hover:bg-white hover:text-[#0057FF]'
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </nav>

            {/* Role Switcher (KARYAWAN | ADMIN) */}
            <div className="flex items-center bg-[#060A13] border border-white p-0.5 ml-2">
              <button
                onClick={() => setRole('employee')}
                className={`px-2.5 py-1 text-[11px] font-extrabold uppercase tracking-wider transition-colors ${
                  role === 'employee'
                    ? 'bg-[#0057FF] text-white'
                    : 'text-[#8B95A5] hover:text-white'
                }`}
              >
                KARYAWAN
              </button>
              <button
                onClick={() => setRole('admin')}
                className={`px-2.5 py-1 text-[11px] font-extrabold uppercase tracking-wider transition-colors ${
                  role === 'admin'
                    ? 'bg-[#0057FF] text-white'
                    : 'text-[#8B95A5] hover:text-white'
                }`}
              >
                ADMIN
              </button>
            </div>

            {/* + Buat Sayembara Button */}
            {role === 'admin' ? (
              <button
                onClick={() => setIsCreateModalOpen(true)}
                className="ml-2 inline-flex items-center gap-1 px-3 py-1.5 text-xs font-extrabold uppercase tracking-wider bg-[#060A13] text-white border-2 border-white hover:bg-white hover:text-[#0057FF] transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>+ BUAT SAYEMBARA</span>
              </button>
            ) : (
              <button
                onClick={() => {
                  setRole('admin');
                  setIsCreateModalOpen(true);
                }}
                className="ml-2 inline-flex items-center gap-1 px-2.5 py-1.5 text-[11px] font-bold uppercase tracking-wider bg-[#060A13]/60 text-white/80 border border-white/40 hover:bg-[#060A13] hover:text-white transition-colors"
              >
                <span>+ SAYEMBARA (ADMIN)</span>
              </button>
            )}
          </div>

          {/* Mobile menu trigger */}
          <div className="flex items-center gap-2 lg:hidden">
            {/* Mobile Role Switcher */}
            <div className="flex items-center bg-[#060A13] border border-white p-0.5 text-[10px]">
              <button
                onClick={() => setRole('employee')}
                className={`px-2 py-0.5 font-bold uppercase ${
                  role === 'employee' ? 'bg-[#0057FF] text-white' : 'text-[#8B95A5]'
                }`}
              >
                TALENT
              </button>
              <button
                onClick={() => setRole('admin')}
                className={`px-2 py-0.5 font-bold uppercase ${
                  role === 'admin' ? 'bg-[#0057FF] text-white' : 'text-[#8B95A5]'
                }`}
              >
                ADMIN
              </button>
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-8 h-8 bg-[#060A13] border border-white flex items-center justify-center text-white"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-b-2 border-white bg-[#060A13] p-4 space-y-2">
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2 text-xs font-bold uppercase tracking-wider border ${
                  pathname === item.href
                    ? 'bg-[#0057FF] text-white border-white'
                    : 'bg-[#0B0F17] text-white border-[#232D3F]'
                }`}
              >
                {item.name}
              </Link>
            ))}

            {role === 'admin' && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsCreateModalOpen(true);
                }}
                className="w-full mt-2 py-2 px-3 text-xs font-bold uppercase tracking-wider bg-[#0057FF] text-white border border-white flex items-center justify-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                BUAT SAYEMBARA BARU
              </button>
            )}
          </div>
        )}
      </header>

      {/* Create Bounty Modal */}
      <CreateBountyModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </>
  );
}
